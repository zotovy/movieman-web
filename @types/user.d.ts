declare type User = {
    id: number;
    name: string;
    movies: (Movie | number)[];
    reviews: (Review | number)[];
    comments: (Comment | number)[];
    email: string;
    password: string;
    createdAt: Date;
    profileImagePath?: string;
}
