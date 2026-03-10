import { Component } from '../base/Component';
import { categoryMap } from '../../utils/constants';

type CardFields = {
  title?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  price?: number | null;
  disabled?: boolean;
};

export class BaseCard extends Component<CardFields> {
  protected titleEl?: HTMLElement;
  protected imageEl?: HTMLImageElement;
  protected categoryEl?: HTMLElement;
  protected priceEl?: HTMLElement;
  protected buttonEl?: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleEl = container.querySelector('.card__title') ?? undefined;
    this.imageEl = container.querySelector('.card__image') ?? undefined;
    this.categoryEl = container.querySelector('.card__category') ?? undefined;
    this.priceEl = container.querySelector('.card__price') ?? undefined;
    this.buttonEl = container.querySelector('.card__button') ?? undefined;
  }

  setTitle(title: string): void {
    if (this.titleEl) {
      this.titleEl.textContent = title;
    }
  }

setCardImage(src: string, alt?: string): void {
  if (!this.imageEl) return;
  super.setImage(this.imageEl, src, alt);
}

setCategory(category: string): void {
  if (!this.categoryEl) return;

  this.categoryEl.textContent = category;

  const className = categoryMap[category as keyof typeof categoryMap];

  this.categoryEl.className = `card__category ${className ?? ''}`.trim();
}

  setPrice(price: number | null): void {
    if (!this.priceEl) return;

    if (price === null) {
      this.priceEl.textContent = 'Недоступно';
      this.setDisabled(true);
    } else {
      this.priceEl.textContent = `${price} синапсов`;
      this.setDisabled(false);
    }
  }

  setDisabled(disabled: boolean): void {
    if (this.buttonEl) {
      this.buttonEl.disabled = disabled;
    }
  }

  onButtonClick(handler: () => void): void {
    this.buttonEl?.addEventListener('click', handler);
  }
}