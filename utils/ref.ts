export default class Ref<T> implements IRef<T>{
    id: number;
    model?: T;

    constructor(id: number, model = undefined) {
        this.id = id;
        this.model = model;
    }

    isPopulated(): boolean {
        return false;
    }

}

export interface IRef<T> {
    id: number;
    model?: T;

    isPopulated: () => boolean;
}
