declare type ReviewComment = {
    id: number;
    author: User | number;
    content: string;
    createdAt: Date;
    review: Review | number;
}
