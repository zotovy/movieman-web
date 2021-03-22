import { local } from "store2";

export default class AuthHelper {

    static get accessToken() {
        return localStorage.getItem("access-token");
    }

    static set tokens(data: TokensBody) {
        localStorage.setItem("access-token", data.tokens.access);
        localStorage.setItem("refresh-token", data.tokens.refresh);
        localStorage.setItem("uid", data.id);
    }

    static get header() {
        return `Bearer ${AuthHelper.accessToken}`;
    }

    static get tokensBody(): TokensBody {
        return {
            tokens: {
                access: localStorage.getItem("access-token") as string,
                refresh: localStorage.getItem("refresh-token") as string,
            },
            id: localStorage.getItem("uid") as string,
        }
    }

    static destroyTokens(): void {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("uid");
    }
}

export type TokensBody = {
    tokens: {
        access: string;
        refresh: string;
    },
    id: string;
}
