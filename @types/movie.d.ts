declare type Movie = {
    id: number;
    kpId: number;
    reviews: Ref<any>[],
    poster: string;
    genres: string[];
    rating: number;
    title: string;
    year: string;
}
