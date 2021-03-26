import axios, { AxiosResponse } from "axios";
import Cookies from 'cookies'
import client from "@/utils/api/client";
import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";
import { FormValues } from "../pages/signup";
import { GetServerSidePropsContext } from "next";
import SSRHelper from "@/helpers/ssr-helper";

export default class UserService {

    static async loginUser(email: string, password: string): Promise<LoginResponse> {
        const response = await client.post(ApiRoutes.authenticate, { email, password });
        if (response.status !== 200) {
            if (response.status === 404) return "invalid_credentials";
            return "invalid_error";
        }

        // save tokens
        AuthHelper.tokens = response.data;
        return "ok";
    }

    static async signupUser(data: FormValues): Promise<SignupResponse> {
        const response = await client.post(ApiRoutes.signup, data);
        if (response.status !== 200) {
            if (response.status === 400 && response.data.error === "email-already-exists-error") {
                return "email_not_unique_error";
            }
            return "invalid_error";
        }

        // save tokens
        AuthHelper.tokens = response.data;
        return "ok";
    }

    static async fetchUser(uid: number): Promise<User | "forbidden"> {
        const response = await client.get(ApiRoutes.getUser(uid));
        if (!response || response.status === 401 || !response.data) return "forbidden";
        return response.data;
    }

    static async fetchUserServerSide(context: GetServerSidePropsContext): Promise<User> {
        const cookies = new Cookies(context.req, context.res);

        let response = await axios.get(ApiRoutes.getUser(cookies.get("uid") as string), {
            headers: { Authorization: `Bearer ${cookies.get("accessToken") as string}` }
        }).catch(e => e.response);

        // if 401 --> trying get new tokens
        if (!response || response.status === 401) {
            response = await axios.post(ApiRoutes.updateToken, {
                uid: cookies.get("uid"),
                tokens: {
                    access: cookies.get("accessToken"),
                    refresh: cookies.get("refreshToken"),
                }
            })
              .then(async res => {
                  // Save tokens and trying to rerun action
                  cookies.set("accessToken", res.data.tokens.access);
                  cookies.set("refreshToken", res.data.tokens.refresh);
                  return axios.get(ApiRoutes.getUser(cookies.get("uid") as string), {
                      headers: { Authorization: `Bearer ${res.data.tokens.access}` }
                  }).then(data => data).catch(e => e.response)
              })
              .catch(err => err.response);

            if (response) return response.data;
            else {
                context.res.writeHead(302, { Location: '/login' });
                context.res.end();
                // @ts-ignore;
                return null as User;
            }
        }

        if (response) return response.data;
        else {
            context.res.writeHead(302, { Location: '/login' });
            context.res.end();
            // @ts-ignore;
            return null as User;
        }
    }

    static async setAvatar(id: number, file: File): Promise<SetAvatarResponse> {
        const form = new FormData();
        form.append("image", file);
        const response = await client.post(ApiRoutes.changeUserAvatar(id), form);

        if (typeof response.data === "string") return "ok";
        if (response.data.error === "invalid-image-size-error") return "invalid_size"
        return "invalid_error";
    }
}


export type LoginResponse = "ok" | "invalid_credentials" | "invalid_error";
export type SignupResponse = "ok" | "email_not_unique_error" | "invalid_error";
export type SetAvatarResponse = "ok" | "invalid_size" | "invalid_error";
