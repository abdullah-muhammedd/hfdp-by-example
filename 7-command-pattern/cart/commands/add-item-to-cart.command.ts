import { CartService } from '../cart.service';
import { ProductService } from '../../product/product.service';

export class AddItemToCartCommand implements Command {
  constructor(
    private cart: CartService,
    private productService: ProductService,
    private productId: string,
    private quantity: number,
  ) {}

  execute(): void {
    if (!this.productService.isInStock(this.productId, this.quantity)) {
      throw new Error('Not enough stock');
    }

    this.productService.reduceStock(this.productId, this.quantity);
    this.cart._addRaw(this.productId, this.quantity); // internal method
  }

  undo(): void {
    this.cart._removeRaw(this.productId, this.quantity); // internal method
    this.productService.increaseStock(this.productId, this.quantity);
  }
}
