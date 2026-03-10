import type { IProduct } from '../../types';
import type { IEvents } from '../base/Events';

export class ProductCatalog {
  private products: IProduct[] = [];
  private selected: IProduct | null = null;

  constructor(private events: IEvents, initialProducts: IProduct[] = []) {
    this.products = initialProducts.slice();
  }

  public setProducts(products: IProduct[]): void {
    this.products = products.slice();
    this.events.emit('catalog:changed');
  }

  public getProducts(): IProduct[] {
    return this.products.slice();
  }

  public getProductById(id: string): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  public setSelectedProduct(product: IProduct | null): void {
    this.selected = product;
    this.events.emit('preview:changed');
  }

  public getSelectedProduct(): IProduct | null {
    return this.selected;
  }
}