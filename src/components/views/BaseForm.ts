export class BaseForm {
    protected submitButton: HTMLButtonElement;
    protected errorsEl: HTMLElement;

    constructor(protected form: HTMLFormElement) {
        this.submitButton = form.querySelector('[type="submit"]') as HTMLButtonElement;
        this.errorsEl = form.querySelector('.form__errors')!;
    }

    setErrors(errors: Record<string, string>): void {
        this.errorsEl.textContent = Object.values(errors)
            .filter(Boolean)
            .join(', ');
    }

    setDisabled(disabled: boolean): void {
        this.submitButton.disabled = disabled;
    }
}