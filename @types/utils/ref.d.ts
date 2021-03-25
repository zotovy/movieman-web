declare interface IRef<T> {
    id: number;
    model?: T;

    isPopulated: () => boolean;
    readonly pModel: T;
}
