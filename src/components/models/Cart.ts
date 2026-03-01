import type { IProduct } from '../../types';

export class Cart {
  private items: IProduct[] = [];

  constructor(initialItems: IProduct[] = []) {
    this.items = initialItems.slice();
  }

  public getItems(): IProduct[] {
    return this.items.slice();
  }

  public addItem(product: IProduct): void {
    this.items.push(product);
  }

  public removeItem(product: IProduct): void {
    this.items = this.items.filter((p) => p.id !== product.id);
  }

  public clear(): void {
    this.items = [];
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