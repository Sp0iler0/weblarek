import { BaseCard } from './BaseCard';

export class PreviewCard extends BaseCard {
    private textEl: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.textEl = container.querySelector('.card__text')!;
    }

    setDescription(text: string): void {
        this.textEl.textContent = text;
    }
}