declare type Review = {
    id: number;
    movie: Movie | number;
    author: User | number;
    comments: (ReviewComment | number)[];
    content: string;
    rating: number;
    createdAt: Date;
}
