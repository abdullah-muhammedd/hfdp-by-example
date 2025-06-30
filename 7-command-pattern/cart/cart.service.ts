export class CartService {
  private items = new Map<string, number>();

  // These methods are meant to be used only by commands
  _addRaw(productId: string, qty: number) {
    const current = this.items.get(productId) || 0;
    this.items.set(productId, current + qty);
  }

  _removeRaw(productId: string, qty: number) {
    const current = this.items.get(productId) || 0;
    const newQty = current - qty;
    if (newQty <= 0) this.items.delete(productId);
    else this.items.set(productId, newQty);
  }

  getItems(): Map<string, number> {
    return new Map(this.items);
  }
}
