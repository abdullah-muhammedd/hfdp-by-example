import { Product } from '../types/product.type';

export class ProductService {
  private products: Map<string, Product> = new Map([
    ['apple', { id: 'apple', name: 'Apple', price: 5, stock: 100 }],
    ['banana', { id: 'banana', name: 'Banana', price: 3, stock: 50 }],
    ['orange', { id: 'orange', name: 'Orange', price: 4, stock: 75 }],
  ]);

  getProduct(id: string): Product | undefined {
    return this.products.get(id);
  }

  getAllProducts(): Product[] {
    return Array.from(this.products.values());
  }

  isInStock(id: string, quantity: number): boolean {
    const product = this.products.get(id);
    return !!product && product.stock >= quantity;
  }

  reduceStock(id: string, quantity: number): boolean {
    const product = this.products.get(id);
    if (!product || product.stock < quantity) return false;
    product.stock -= quantity;
    return true;
  }

  increaseStock(id: string, quantity: number): boolean {
    const product = this.products.get(id);
    if (!product) return false;
    product.stock += quantity;
    return true;
  }
}
