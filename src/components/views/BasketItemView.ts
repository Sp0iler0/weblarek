import { BaseCard } from './BaseCard';

export class BasketItemView extends BaseCard {
    private indexEl: HTMLElement;
    private removeButton: HTMLButtonElement;

    constructor(container: HTMLElement, onRemove: () => void) {
        super(container);

        this.indexEl = container.querySelector('.basket__item-index')!;
        this.removeButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;

        this.removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            onRemove();
        });
    }

    setIndex(index: number): void {
        this.indexEl.textContent = String(index);
    }
}