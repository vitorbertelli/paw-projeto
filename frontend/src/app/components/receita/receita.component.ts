import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceitaService } from '../../services/receita.service';
import { Receita } from '../../models/receita';
import { CardComponent } from '../card/card.component';
import { ErrorControlComponent } from '../error-control/error-control.component';
import { MoneyMaskDirective } from '../../utils/money-mask.directive';

@Component({
  selector: 'app-receita',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CommonModule,
    ErrorControlComponent,
    MoneyMaskDirective
  ],
  providers: [
    ReceitaService
  ],
  templateUrl: './receita.component.html',
  styleUrl: './receita.component.css'
})
export class ReceitaComponent implements OnInit {

  form!: FormGroup;
  receitas: Receita[] = []

  constructor(private receitaService: ReceitaService) {
    this.form = new FormGroup({
      descricao: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.receitaService.getReceitas().subscribe({
      next: (response: any) => {
        this.receitas = response;
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
  
      const receitaModel = new Receita(descricao, valorLimpo, data);
  
      this.receitaService.addReceita(receitaModel).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.log(`Erro ao adicionar receita: ${error.message}`);
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

  onDelete(receita: Receita) {
    this.receitas.splice(this.receitas.indexOf(receita), 1);
  }

}
