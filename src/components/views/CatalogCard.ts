import { BaseCard } from './BaseCard';

export class CatalogCard extends BaseCard {
    constructor(container: HTMLElement, onOpen: () => void, onToggle?: () => void) {
        super(container);

        container.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            if (target.closest('.card__button')) {
                onToggle?.();
                return;
            }

            onOpen();
        });
    }
}