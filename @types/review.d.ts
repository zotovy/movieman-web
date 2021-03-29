declare type Review = {
    id: number;
    movie: Movie;
    author: User;
    comments: ReviewComment[];
    content: string;
    rating: number;
    createdAt: Date;
}
