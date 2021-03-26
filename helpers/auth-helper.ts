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
        cookies.set('accessToken', data.tokens.access, {path: '/', expires: new Date(Date.now()+2592000)});
        cookies.set('refreshToken', data.tokens.refresh, {path: '/', expires: new Date(Date.now()+2592000)});
        cookies.set('uid', data.id, {path: '/', expires: new Date(Date.now()+2592000)});

        // localStorage.setItem("accessToken", data.tokens.access);
        // localStorage.setItem("refreshToken", data.tokens.refresh);
        // localStorage.setItem("uid", data.id);
    }

    static get header() {
        if (typeof window === "undefined") return "";
        return `Bearer ${AuthHelper.accessToken}`;
    }

    static get tokensBody() {
        const cookies = SSRHelper.getCookiesClient();

        console.log(cookies);

        return {
            tokens: {
                access: cookies["accessToken"] as string,
                refresh: cookies["refreshToken"] as string,
            },
            uid: cookies["uid"] as string,
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
    id: string;
}
