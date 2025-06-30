import { CartService } from '../cart.service';
import { ProductService } from '../../product/product.service';

export class ChangeQuantityCommand implements Command {
  private previousQuantity: number = 0;

  constructor(
    private cart: CartService,
    private productService: ProductService,
    private productId: string,
    private newQuantity: number,
  ) {}

  execute(): void {
    const currentItems = this.cart.getItems();
    this.previousQuantity = currentItems.get(this.productId) || 0;

    const diff = this.newQuantity - this.previousQuantity;

    if (diff > 0) {
      if (!this.productService.isInStock(this.productId, diff)) {
        throw new Error('Not enough stock');
      }
      this.productService.reduceStock(this.productId, diff);
    } else {
      this.productService.increaseStock(this.productId, -diff);
    }

    if (this.newQuantity === 0) {
      this.cart._removeRaw(this.productId, this.previousQuantity);
    } else {
      this.cart._addRaw(this.productId, -this.previousQuantity + this.newQuantity);
    }
  }

  undo(): void {
    const diff = this.previousQuantity - this.newQuantity;

    if (diff > 0) {
      this.productService.reduceStock(this.productId, diff);
    } else {
      this.productService.increaseStock(this.productId, -diff);
    }

    if (this.previousQuantity === 0) {
      this.cart._removeRaw(this.productId, this.newQuantity);
    } else {
      this.cart._addRaw(this.productId, -this.newQuantity + this.previousQuantity);
    }
  }
}
