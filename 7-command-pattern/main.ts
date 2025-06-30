import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CommandInvokerService } from './command-invoker/command-invoker.service.ts';
import { ProductService } from './product/product.service';

console.log('\n🛒 Starting Cart Simulation\n');

// Initialize services
const cartService = new CartService();
const productService = new ProductService();
const commandInvoker = new CommandInvokerService();

// Initialize controller
const cartController = new CartController(cartService, productService, commandInvoker);

// Add items
console.log('➡️ Adding 2 apples');
cartController.add('apple', 2);
console.log(cartController.getCart());

console.log('\n➡️ Adding 3 bananas');
cartController.add('banana', 3);
console.log(cartController.getCart());

// Change quantity
console.log('\n✏️ Changing bananas quantity to 5');
cartController.changeQuantity('banana', 5);
console.log(cartController.getCart());

// Remove item
console.log('\n🗑️ Removing apples from cart');
cartController.remove('apple');
console.log(cartController.getCart());

// Undo remove
console.log('\n↩️ Undo last action (remove apple)');
cartController.undoLast();
console.log(cartController.getCart());

// Undo change quantity
console.log('\n↩️ Undo last action (change banana qty)');
cartController.undoLast();
console.log(cartController.getCart());

// Undo add banana
console.log('\n↩️ Undo last action (add banana)');
cartController.undoLast();
console.log(cartController.getCart());

// Final cart state
console.log('\n🧾 Final Cart Contents:');
console.log(cartController.getCart());
