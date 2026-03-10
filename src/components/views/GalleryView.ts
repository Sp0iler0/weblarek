export class GalleryView {
    constructor(private container: HTMLElement) {}

    render(items: HTMLElement[]): HTMLElement {
        this.container.replaceChildren(...items);
        return this.container;
    }

    clear(): void {
        this.container.replaceChildren();
    }
}