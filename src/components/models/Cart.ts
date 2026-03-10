import type { IProduct } from '../../types';
import type { IEvents } from '../base/Events';

export class Cart {
  private items: IProduct[] = [];

  constructor(private events: IEvents, initialItems: IProduct[] = []) {
    this.items = initialItems.slice();
  }

  public getItems(): IProduct[] {
    return this.items.slice();
  }

  public addItem(product: IProduct): void {
    this.items.push(product);
    this.events.emit('cart:changed');
  }

  public removeItem(product: IProduct): void {
    this.items = this.items.filter((p) => p.id !== product.id);
    this.events.emit('cart:changed');
  }

  public clear(): void {
    this.items = [];
    this.events.emit('cart:changed');
  }

  public getTotal(): number {
    return this.items.reduce((sum, p) => sum + (p.price ?? 0), 0);
  }

  public getCount(): number {
    return this.items.length;
  }

  public hasItem(id: string): boolean {
    return this.items.some((p) => p.id === id);
  }
}