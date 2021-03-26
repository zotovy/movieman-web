import { GetServerSidePropsContext } from "next";
import cookie from "cookie";

export default class SSRHelper {


    static getCookies<T extends {[p: string]: string} = {[p: string]: string}>(ctx: GetServerSidePropsContext): T {
        return cookie.parse(ctx.req.headers.cookie as string) as T;
    }

    static getCookiesClient<T extends {[p: string]: string} = {[p: string]: string}>(): T {

        console.log(document.cookie)

        return document.cookie
          .split(';')
          .reduce((res, c) => {
              const [key, val] = c.trim().split('=').map(decodeURIComponent)
              try {
                  return Object.assign(res, { [key]: JSON.parse(val) })
              } catch (e) {
                  return Object.assign(res, { [key]: val })
              }
          }, {}) as T;
    }
}
