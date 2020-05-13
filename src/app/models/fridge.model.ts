import { Aliment } from './aliment.model';

export class Fridge {

    isFull:boolean;
    uid:any;

    constructor(public aliments: Aliment[]) {
        this.isFull=true;
    }
}