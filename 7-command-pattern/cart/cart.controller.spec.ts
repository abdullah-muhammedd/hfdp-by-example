import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { CommandInvokerService } from '../command-invoker/command-invoker.service.ts';

describe('CartController (Integration)', () => {
  let controller: CartController;
  let cartService: CartService;
  let productService: ProductService;
  let invoker: CommandInvokerService;

  beforeEach(() => {
    cartService = new CartService();
    productService = new ProductService();
    invoker = new CommandInvokerService();
    controller = new CartController(cartService, productService, invoker);
  });

  afterEach(() => {
    invoker.clear();
  });

  it('adds an item to the cart', () => {
    controller.add('apple', 3);

    const cart = controller.getCart();
    expect(cart.get('apple')).toBe(3);

    const product = productService.getProduct('apple');
    expect(product?.stock).toBe(97); // 100 - 3
  });

  it('changes the quantity of an item', () => {
    controller.add('banana', 2);
    controller.changeQuantity('banana', 5);

    const cart = controller.getCart();
    expect(cart.get('banana')).toBe(5);

    const product = productService.getProduct('banana');
    expect(product?.stock).toBe(45); // 50 - 5
  });

  it('removes an item from the cart', () => {
    controller.add('orange', 4);
    controller.remove('orange');

    const cart = controller.getCart();
    expect(cart.has('orange')).toBe(false);

    const product = productService.getProduct('orange');
    expect(product?.stock).toBe(75); // back to original
  });

  it('undoes the last operation', () => {
    controller.add('apple', 2);
    controller.undoLast();

    const cart = controller.getCart();
    expect(cart.has('apple')).toBe(false);

    const product = productService.getProduct('apple');
    expect(product?.stock).toBe(100); // back to full
  });

  it('supports multiple commands and undo chain', () => {
    controller.add('apple', 1);
    controller.add('banana', 2);
    controller.changeQuantity('banana', 5);

    let cart = controller.getCart();
    expect(cart.get('apple')).toBe(1);
    expect(cart.get('banana')).toBe(5);

    controller.undoLast(); // undo change quantity
    controller.undoLast(); // undo add banana

    cart = controller.getCart();
    expect(cart.get('apple')).toBe(1);
    expect(cart.has('banana')).toBe(false);

    const banana = productService.getProduct('banana');
    expect(banana?.stock).toBe(50); // back to full
  });
});
