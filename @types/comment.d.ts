declare type ReviewComment = {
    id: number;
    author: Ref<User>;
    content: string;
    createdAt: Date;
}
