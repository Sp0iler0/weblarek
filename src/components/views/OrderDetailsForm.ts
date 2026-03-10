import { BaseForm } from './BaseForm';

export class OrderDetailsForm extends BaseForm {
    private addressInput: HTMLInputElement;
    private buttons: NodeListOf<HTMLButtonElement>;

    constructor(
        form: HTMLFormElement,
        onChange: (data: { payment?: string; address?: string }) => void,
        onSubmit: () => void
    ) {
        super(form);

        this.addressInput = form.elements.namedItem('address') as HTMLInputElement;
        this.buttons = form.querySelectorAll('.order__buttons .button');

        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.buttons.forEach((btn) => btn.classList.remove('button_alt-active'));
                button.classList.add('button_alt-active');
                onChange({ payment: button.name });
            });
        });

        this.addressInput.addEventListener('input', () => {
            onChange({ address: this.addressInput.value });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            onSubmit();
        });
    }

    setPayment(value: string): void {
        this.buttons.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === value);
        });
    }

    setAddress(value: string): void {
        this.addressInput.value = value;
    }
}