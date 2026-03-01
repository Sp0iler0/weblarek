import type { IApi, IOrderRequest, IOrderResponse, IProduct, IProductsResponse } from '../../types';

export class ShopApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  public getProducts(): Promise<IProduct[]> {
    return this.api.get<IProductsResponse>('/api/weblarek/product').then((r) => r.items);
  }

  public createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/api/weblarek/order', order);
  }
}