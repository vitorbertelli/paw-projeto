import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMoneyMask]',
  standalone: true
})
export class MoneyMaskDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value.replace(/[^0-9]/g, '');
    let formattedInputValue = this.formatCurrency(inputValue);
    this.el.nativeElement.value = formattedInputValue;
  }

  private formatCurrency(value: string): string {
    if (!value) return '';
    let num = parseInt(value, 10);

    if (!isFinite(num)) return '';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(num / 100);
  }

}
