export default class AppRoutes {

    static homepage = "/";
    static profile = "/profile";
    static signup = "/profile";
    static login = "/profile";
    static movieDetail = (id: number | string) => `/movie/${id}`;
    static writeReview = (id: number | string) => `/movie/${id}/review`;
    static reviewDetail = (mid: number | string, rid: number | string) => `/movie/${mid}/review/${rid}`;

    static authorLinks = {
        instagram: "https://www.instagram.com/_zotovy/"
    }
}
