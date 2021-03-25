declare type Review = {
    id: number;
    movie: Ref<Movie>;
    author: Ref<Author>;
    comments: Ref<Comment>[];
    content: string;
    rating: number;
    createdAt: Date;
}
