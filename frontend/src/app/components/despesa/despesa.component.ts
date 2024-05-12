import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DespesaService } from '../../services/despesa.service';

@Component({
  selector: 'app-despesa',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    DespesaService
  ],
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.css'
})
export class DespesaComponent {

  form!: FormGroup;

  constructor(private despesaService: DespesaService) {

  }


}
