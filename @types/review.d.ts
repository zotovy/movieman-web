declare type Review = {
    id: number;
    movie: Ref<Movie>;
    author: Ref<User>;
    comments: Ref<ReviewComment>[];
    content: string;
    rating: number;
    createdAt: Date;
}
