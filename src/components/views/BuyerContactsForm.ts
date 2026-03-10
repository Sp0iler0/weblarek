import { BaseForm } from './BaseForm';

export class BuyerContactsForm extends BaseForm {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;

    constructor(
        form: HTMLFormElement,
        onChange: (data: { email?: string; phone?: string }) => void,
        onSubmit: () => void
    ) {
        super(form);

        this.emailInput = form.elements.namedItem('email') as HTMLInputElement;
        this.phoneInput = form.elements.namedItem('phone') as HTMLInputElement;

        this.emailInput.addEventListener('input', () => {
            onChange({ email: this.emailInput.value });
        });

        this.phoneInput.addEventListener('input', () => {
            onChange({ phone: this.phoneInput.value });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            onSubmit();
        });
    }

    setEmail(value: string): void {
        this.emailInput.value = value;
    }

    setPhone(value: string): void {
        this.phoneInput.value = value;
    }
}