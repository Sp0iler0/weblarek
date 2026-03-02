export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'online' | 'offline';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

/**
 * Ответ сервера при запросе каталога
 */
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

/**
 * Данные, отправляемые на сервер при создании заказа
 */
export interface IOrderRequest extends IBuyer {
  items: string[];
  total: number;
}

/**
 * Ответ сервера при создании заказа
 */
export interface IOrderResponse {
  id: string;
  total: number;
}