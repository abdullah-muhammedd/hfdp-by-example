import { CommandInvokerService } from '../command-invoker/command-invoker.service.ts';
import { ProductService } from '../product/product.service.js';
import { CartService } from './cart.service.js';
import { AddItemToCartCommand } from './commands/add-item-to-cart.command';
import { ChangeQuantityCommand } from './commands/change-quantity.command';
import { RemoveItemFromCartCommand } from './commands/remove-item-from-cart.command';

export class CartController {
  constructor(
    private cart: CartService,
    private products: ProductService,
    private invoker: CommandInvokerService,
  ) {}

  // ✅ Add item to cart
  add(productId: string, qty: number) {
    const command = new AddItemToCartCommand(this.cart, this.products, productId, qty);
    this.invoker.execute(command);
  }

  // ✅ Change quantity of item in cart
  changeQuantity(productId: string, qty: number) {
    const command = new ChangeQuantityCommand(this.cart, this.products, productId, qty);
    this.invoker.execute(command);
  }

  // ✅ Remove item completely from cart
  remove(productId: string) {
    const command = new RemoveItemFromCartCommand(this.cart, this.products, productId);
    this.invoker.execute(command);
  }

  // ✅ Undo the last command
  undoLast() {
    this.invoker.undoLast();
  }

  // ✅ Read-only view of the cart
  getCart() {
    return this.cart.getItems();
  }
}
