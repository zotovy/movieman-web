export default class Ref<T> implements Ref<T>{
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
