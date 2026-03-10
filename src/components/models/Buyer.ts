import type { IBuyer, TPayment } from '../../types';
import type { IEvents } from '../base/Events';

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer {
  private payment: TPayment | null = null;
  private address = '';
  private phone = '';
  private email = '';

  constructor(private events: IEvents) {}

  /**
   * Сохраняет данные покупателя. Поддерживает частичное обновление:
   * можно передать только одно поле и не потерять остальные.
   */
  public setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.email !== undefined) this.email = data.email;

    this.events.emit('buyer:changed');
  }

  /**
   * Возвращает все данные покупателя (как текущее состояние модели).
   * Проверка корректности выполняется отдельно методом validate().
   */
  public getData(): IBuyer {
    return {
      payment: (this.payment ?? '') as TPayment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  public clear(): void {
    this.payment = null;
    this.address = '';
    this.phone = '';
    this.email = '';

    this.events.emit('buyer:changed');
  }

  /**
   * Валидация по ТЗ: поле валидно, если оно не пустое.
   * Возвращает объект ошибок: ключи — поля, значения — текст ошибки.
   * Если ошибок нет — возвращается пустой объект.
   */
  public validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.payment) errors.payment = 'Не выбран вид оплаты';
    if (!this.email.trim()) errors.email = 'Укажите email';
    if (!this.phone.trim()) errors.phone = 'Укажите телефон';
    if (!this.address.trim()) errors.address = 'Укажите адрес';

    return errors;
  }
}