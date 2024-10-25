import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DespesaService } from '../../services/despesa.service';
import { Despesa } from '../../models/despesa';
import { CardComponent } from '../card/card.component';
import { ErrorControlComponent } from '../error-control/error-control.component';
import { MoneyMaskDirective } from '../../utils/money-mask.directive';

@Component({
  selector: 'app-despesa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CommonModule,
    ErrorControlComponent,
    MoneyMaskDirective
  ],
  providers: [
    DespesaService
  ],
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.css'
})
export class DespesaComponent {

  form!: FormGroup;
  despesas: Despesa[] = []

  constructor(private despesaService: DespesaService) {
    this.form = new FormGroup({
      descricao: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.despesaService.getDespesas().subscribe({
      next: (response: any) => {
        this.despesas = response;
      },
      error: (error) => {
        console.log(`$== !!Error (subscribe): - ${error.info_extra} ==`);
        console.log(error);
      }
    });
  }

  onSubmit() {
    console.log("Descrição: " + this.form.get("descricao")?.value);
    console.log("Valor: " + this.form.get("valor")?.value);
    console.log("Data: " + this.form.get("data")?.value);
  
    this.form.markAllAsTouched();
  
    if (this.form.valid) {
      const descricao = this.form.get("descricao")?.value;
      const valorBruto = this.form.get("valor")?.value as string;
      const data = this.form.get("data")?.value;
  
      const valorLimpo = this.limparValorMonetario(valorBruto);
  
      const despesaModel = new Despesa(descricao, valorLimpo, data);
  
      this.despesaService.addDespesa(despesaModel).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.log(`Erro ao adicionar despesa: ${error.message}`);
        }
      });
  
      this.form.reset();
    }
  }
  
  private limparValorMonetario(valor: string): number {
    const valorNumerico = valor.replace(/[R$\.,\s]/g, '').replace(',', '.');
    return parseFloat(valorNumerico) / 100;
  }

  isInvalid(field: string): boolean {
    return (!this.form.get(field)?.valid && this.form.get(field)?.touched) ?? false;
  }

  useErrorStyle(field: string) {
    return {
      "is-invalid": this.isInvalid(field),
    }
  }

  onDelete(despesa: Despesa) {
    this.despesas.splice(this.despesas.indexOf(despesa), 1);
  }
}
