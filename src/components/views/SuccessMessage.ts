export class SuccessMessage {
    private titleEl: HTMLElement;
    private descEl: HTMLElement;
    private closeBtn: HTMLButtonElement;

    constructor(private container: HTMLElement) {
        this.titleEl = container.querySelector('.order-success__title')!;
        this.descEl = container.querySelector('.order-success__description')!;
        this.closeBtn = container.querySelector('.order-success__close') as HTMLButtonElement;
    }

    setTitle(text: string): void {
        this.titleEl.textContent = text;
    }

    setDescription(text: string): void {
        this.descEl.textContent = text;
    }

    onClose(handler: () => void): void {
        this.closeBtn.addEventListener('click', handler);
    }

    render(): HTMLElement {
        return this.container;
    }
}