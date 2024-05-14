import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DespesaService } from '../../services/despesa.service';
import { Despesa } from '../../models/despesa';
import { CardComponent } from '../card/card.component';
import { ErrorControlComponent } from '../error-control/error-control.component';

@Component({
  selector: 'app-despesa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CommonModule,
    ErrorControlComponent
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
    console.log("Descricao: " + this.form.get("descricao")?.value);
    console.log("Valor: " + this.form.get("valor")?.value);
    console.log("Data: " + this.form.get("data")?.value);

    this.form.markAllAsTouched();
    
    if(this.form.valid) {
      const despesaModel: Despesa = new Despesa(
        this.form.get("descricao")?.value, this.form.get("valor")?.value, this.form.get("data")?.value
      );
  
      this.despesaService.addDespesa(despesaModel).subscribe({
        error: (error) => {
          console.log(`$== !!Error (subscribe): - ${error.info_extra} ==`);
          console.log(error);
        }
      });

      this.form.reset();
    }
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
