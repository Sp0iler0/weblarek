export class Modal {
    private contentEl: HTMLElement;
    private closeBtn: HTMLButtonElement;

    constructor(private container: HTMLElement, onClose?: () => void) {
        this.contentEl = container.querySelector('.modal__content')!;
        this.closeBtn = container.querySelector('.modal__close') as HTMLButtonElement;

        const close = (): void => {
            this.close();
            onClose?.();
        };

        this.closeBtn.addEventListener('click', close);

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                close();
            }
        });
    }

    open(content: HTMLElement): void {
        this.contentEl.replaceChildren(content);
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.contentEl.replaceChildren();
    }
}