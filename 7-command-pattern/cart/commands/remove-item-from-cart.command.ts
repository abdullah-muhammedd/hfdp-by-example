import { CartService } from '../cart.service';
import { ProductService } from '../../product/product.service';

export class RemoveItemFromCartCommand implements Command {
  private previousQuantity: number = 0;

  constructor(
    private cart: CartService,
    private productService: ProductService,
    private productId: string,
  ) {}

  execute(): void {
    const currentItems = this.cart.getItems();
    this.previousQuantity = currentItems.get(this.productId) || 0;

    if (this.previousQuantity > 0) {
      this.cart._removeRaw(this.productId, this.previousQuantity);
      this.productService.increaseStock(this.productId, this.previousQuantity);
    }
  }

  undo(): void {
    if (this.previousQuantity > 0) {
      this.productService.reduceStock(this.productId, this.previousQuantity);
      this.cart._addRaw(this.productId, this.previousQuantity);
    }
  }
}
