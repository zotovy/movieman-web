declare type User = {
    id: number;
    name: string;
    movies: Ref<Movie>[];
    reviews: Ref<Review>[];
    comments: Ref<Comment>[];
    email: string;
    password: string;
    createdAt: Date;
    profileImagePath?: string;
}
