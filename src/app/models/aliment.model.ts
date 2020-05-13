export class Aliment {

    maxQuantity?: number;
    minQuantity?: number;
    
    constructor(public name: string, public quantity:number) {
        this.maxQuantity = 0;
        this.minQuantity = 0;
    }
}