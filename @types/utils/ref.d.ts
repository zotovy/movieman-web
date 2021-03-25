declare interface Ref<T> {
    id: number;
    model?: T;

    isPopulated: () => boolean;
}
