export default class AppRoutes {

    static homepage = "/";
    static profile = "/profile";
    static signup = "/signup";
    static login = "/login";
    static movieDetail = (id: number | string) => `/movie/${id}`;
    static writeReview = (id: number | string) => `/movie/${id}/review`;
    static reviewDetail = (mid: number | string, rid: number | string) => `/movie/${mid}/review/${rid}`;
    static error404 = "/404"
    static error500 = "/500"

    static authorLinks = {
        instagram: "https://www.instagram.com/_zotovy/"
    }
}
