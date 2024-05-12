import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ReceitaService } from '../../services/receita.service';

@Component({
  selector: 'app-receita',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    ReceitaService
  ],
  templateUrl: './receita.component.html',
  styleUrl: './receita.component.css'
})
export class ReceitaComponent {

  form!: FormGroup;

  constructor(private receitaService: ReceitaService) {
    this.form = new FormGroup({
      descricao: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      data: new FormControl(null)
    });
  }

  onSubmit() {
    console.log("Descricao: " + this.form.get("descricao")?.value);
    console.log("Valor: " + this.form.get("valor")?.value);
    console.log("Data: " + this.form.get("data")?.value);
    this.form.reset();
  }

}
