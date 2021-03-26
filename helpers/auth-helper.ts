export default class AuthHelper {

    static get accessToken() {
        return document.cookie.split(";").find(x => x.startsWith("access-token="))?.split("=")[1] as string;
        // return localStorage.getItem("access-token");
    }

    static set tokens(data: TokensBody) {
        // document.cookie = `access-token=${data.tokens.access}; refresh-token=${data.tokens.refresh}; uid=${data.id}`;
        document.cookie = `access-token=${data.tokens.access}`;
        document.cookie = `refresh-token=${data.tokens.refresh}`;
        document.cookie = `uid=${data.id}`;
        // localStorage.setItem("access-token", data.tokens.access);
        // localStorage.setItem("refresh-token", data.tokens.refresh);
        // localStorage.setItem("uid", data.id);
    }

    static get header() {
        if (typeof window === "undefined") return "";
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
