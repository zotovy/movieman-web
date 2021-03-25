import client from "@/utils/api/client";
import AuthHelper from "@/helpers/auth-helper";
import ApiRoutes from "@/utils/api/routes";

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
}


type LoginResponse = "ok" | "invalid_credentials" | "invalid_error";
