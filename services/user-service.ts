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

        console.log(response.status)

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
                  const opts = {
                      expires: new Date(Date.now() + (10 * 365 * 24 * 60 * 60))
                  }

                  cookies.set("accessToken", res.data.tokens.access, opts);
                  cookies.set("refreshToken", res.data.tokens.refresh, opts);
                  cookies.set("uid", res.data.tokens.uid, opts);

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

    static async updateUser(id: number, data: User | { email?: string, password?: string }): Promise<UpdateUserResponse> {
        const response = await client.put(ApiRoutes.updateUser(id), data);

        if (response.status === 200) return "ok";
        if (response.data.errors) {
            const errors = response.data.errors as ApiValidationError[];
            if (errors.find(x => x.path === "name")) return "name_too_long";
            if (errors.find(x => x.path === "email")) return "email_format_error";
            return "invalid_error";
        }
        console.log(response.data.error);
        if (response.data.error === "email-unique-error") return "email_not_unique_error";
        return "invalid_error";
    }
}

type ApiValidationError = {
    path: string;
    error: string;
    message?: string;
}
export type LoginResponse = "ok" | "invalid_credentials" | "invalid_error";
export type SignupResponse = "ok" | "email_not_unique_error" | "invalid_error";
export type SetAvatarResponse = "ok" | "invalid_size" | "invalid_error";
export type UpdateUserResponse = "ok" | "email_not_unique_error" | "email_format_error" | "name_too_long" | "invalid_error";
