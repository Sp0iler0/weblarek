import type { IProduct } from '../../types';

export class ProductCatalog {
  private products: IProduct[] = [];
  private selected: IProduct | null = null;

  constructor(initialProducts: IProduct[] = []) {
    this.products = initialProducts.slice();
  }

  public setProducts(products: IProduct[]): void {
    this.products = products.slice();
  }

  public getProducts(): IProduct[] {
    return this.products.slice();
  }

  public getProductById(id: string): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  public setSelectedProduct(product: IProduct | null): void {
    this.selected = product;
  }

  public getSelectedProduct(): IProduct | null {
    return this.selected;
  }
}