import type {
  IApi,
  IOrderRequest,
  IOrderResponse,
  IProduct,
  IProductsResponse,
} from '../../types';

export class ShopApi {
  constructor(private api: IApi) {}

  /**
   * Получает список товаров с сервера
   * GET /product
   */
  public getProducts(): Promise<IProduct[]> {
    return this.api
      .get<IProductsResponse>('/product')
      .then((response) => response.items);
  }

  /**
   * Отправляет заказ на сервер
   * POST /order
   */
  public createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order', order);
  }
}