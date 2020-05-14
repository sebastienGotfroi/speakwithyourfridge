export class Aliment {

    maxQuantity?: number;
    minQuantity?: number;
    quantityToBuy?: number;
    quantityToBuyChangeByUser: boolean;
    
    constructor(public name: string, public quantity:number) {
        this.maxQuantity = 0;
        this.minQuantity = 0;
        this.quantityToBuyChangeByUser = false;
    }
}