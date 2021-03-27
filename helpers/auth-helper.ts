import SSRHelper from "@/helpers/ssr-helper";
import Cookies from 'universal-cookie';


export default class AuthHelper {

    static get accessToken() {
        const cookies = new Cookies();
        return cookies.get("accessToken");
        // return localStorage.getItem("accessToken");
    }

    static set tokens(data: TokensBody) {
        const cookies = new Cookies();

        if (typeof window === "undefined") return;
        // document.cookie = `accessToken=${data.tokens.access}; refreshToken=${data.tokens.refresh}; uid=${data.id}`;
        // document.cookie = `accessToken=${data.tokens.access}`;
        // document.cookie = `refreshToken=${data.tokens.refresh}`;
        // document.cookie = `uid=${data.id}`;

        const opts = {
            expires: new Date(Date.now() + (10 * 365 * 24 * 60 * 60)),
            httpOnly: false,
        }



        cookies.set('accessToken', data.tokens.access, opts);
        cookies.set('refreshToken', data.tokens.refresh, opts);
        cookies.set('uid', data.uid, opts);

        // localStorage.setItem("accessToken", data.tokens.access);
        // localStorage.setItem("refreshToken", data.tokens.refresh);
        // localStorage.setItem("uid", data.id);
    }

    static get header() {
        if (typeof window === "undefined") return "";
        return `Bearer ${AuthHelper.accessToken}`;
    }

    static get tokensBody() {
        const cookies = new Cookies();

        return {
            tokens: {
                access: cookies.get("accessToken") as string,
                refresh: cookies.get("refreshToken") as string,
            },
            uid: cookies.get("uid") as string,
        }
    }

    static destroyTokens(): void {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("uid");
    }
}

export type TokensBody = {
    tokens: {
        access: string;
        refresh: string;
    },
    uid: string;
}
