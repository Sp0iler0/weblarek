export class BasketView {
    private listEl: HTMLElement;
    private totalEl: HTMLElement;
    private submitBtn: HTMLButtonElement;

    constructor(private container: HTMLElement, onSubmit: () => void) {
        this.listEl = container.querySelector('.basket__list')!;
        this.totalEl = container.querySelector('.basket__price')!;
        this.submitBtn = container.querySelector('.basket__button') as HTMLButtonElement;

        this.submitBtn.addEventListener('click', onSubmit);
    }

    render(items: HTMLElement[], total: number): HTMLElement {
        if (items.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'basket__item basket__empty';
            empty.textContent = 'Корзина пуста';
            this.listEl.replaceChildren(empty);
        } else {
            this.listEl.replaceChildren(...items);
        }

        this.totalEl.textContent = `${total} синапсов`;
        return this.container;
    }

    setSubmitDisabled(disabled: boolean): void {
        this.submitBtn.disabled = disabled;
    }
}