export class HeaderView {
    private counterEl: HTMLElement;
    private basketButton: HTMLElement;

    constructor(container: HTMLElement, onOpenCart: () => void) {
        this.counterEl = container.querySelector('.header__basket-counter')!;
        this.basketButton = container.querySelector('.header__basket')!;

        this.basketButton.addEventListener('click', onOpenCart);
    }

    setCounter(count: number): void {
        this.counterEl.textContent = String(count);
    }
}