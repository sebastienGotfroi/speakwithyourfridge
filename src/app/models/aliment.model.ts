export class Aliment {

    maxQuantity?: number;
    minQuantity?: number;
    quantityToBuy?: number;
    isAutomatic: boolean;
    quantityToBuyChangeByUser: boolean;
    
    constructor(public name: string, public quantity:number) {
        this.maxQuantity = 0;
        this.minQuantity = 0;
        this.quantityToBuyChangeByUser = false;
        this.isAutomatic = false;
    }
    addOneQuantityToBuy(positive?: boolean) {
        if(positive){
          this.quantityToBuy++;
        } else {
          if(this.quantityToBuy !== 0) {
            this.quantityToBuy--;
          }
        }
    }

    addOneQuantityInTheFridge(positive: boolean) {
        if(positive){
          this.quantity++;
        } else {
          if(this.quantity !== 0) {
            this.quantity--;
          }
        }
      }
}