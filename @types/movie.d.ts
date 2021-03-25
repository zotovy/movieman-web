declare type Movie = {
    id: number;
    kpId: number;
    reviews: Ref<ReviewComment>[],
    poster: string;
    genres: string[];
    rating: number;
    title: string;
    year: string;
}

declare type MovieGenre = keyof {
    "Action": "",
    "Adventure": "",
    "Animation": "",
    "Comedy": "",
    "Crime": "",
    "Documentary": "",
    "Drama": "",
    "Family": "",
    "Fantasy": "",
    "History": "",
    "Horror": "",
    "Music": "",
    "Mystery": "",
    "Romance": "",
    "Science Fiction": "",
    "TV Movie": "",
    "Thriller": "",
    "War": "",
    "Western": "",
}
