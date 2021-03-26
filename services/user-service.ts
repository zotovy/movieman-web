import axios, { AxiosResponse } from "axios";
import client from "@/utils/api/client";
import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";
import { FormValues } from "../pages/signup";

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

    static async fetchUser(uid: number, accessToken?: string, refreshToken?: string): Promise<User | "forbidden"> {
        let response: AxiosResponse | undefined;

        // Used on server side where axios client haven't bearer token
        if (accessToken) {
            response = await axios.get(ApiRoutes.getUser(uid), {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).catch(e => e.response);

            // if 401 --> trying get new tokens
            if (!response || response.status === 401) {
                response = await axios.post(ApiRoutes.updateToken, {
                    uid,
                    tokens: {
                        access: accessToken,
                        refresh: refreshToken,
                    }
                })
                  .then(async res => {
                      // Save tokens and trying to rerun action
                      AuthHelper.tokens = res.data;
                      return await axios.get(ApiRoutes.getUser(uid), {
                          headers: { Authorization: `Bearer ${accessToken}` }
                      }).catch(e => e.response);
                  })
                  .catch(err => err.response);
            }
        } else {
            response = await client.get(ApiRoutes.getUser(uid));
        }

        if (!response || response.status === 401 || !response.data) return "forbidden";
        return response.data;
    }
}


type LoginResponse = "ok" | "invalid_credentials" | "invalid_error";
type SignupResponse = "ok" | "email_not_unique_error" | "invalid_error";
