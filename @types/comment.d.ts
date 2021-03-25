declare type Comment = {
    id: number;
    author: Ref<User>;
    content: string;
    createdAt: Date;
}
