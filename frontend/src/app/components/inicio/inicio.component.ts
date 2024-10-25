import { Component, OnInit } from '@angular/core';
import { ResumoService } from '../../services/resumo.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorControlComponent } from '../error-control/error-control.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ErrorControlComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  form!: FormGroup;
  anos: number[] = [];
  meses: number[] = [];

  constructor(private resumoService: ResumoService) {
    this.form = new FormGroup({
      receitas: new FormControl(null),
      despesas: new FormControl(null),
      resumo: new FormControl(null),
      mes: new FormControl(null, Validators.required),
      ano: new FormControl(null, Validators.required),
    });

    const anoAtual = new Date().getFullYear();
    for (let i = 2000; i <= anoAtual; i++) {
      this.anos.push(i);
    }
    
    for (let i = 1; i <= 12; i++) {
      this.meses.push(i);
    }
  }

  ngOnInit(): void {
    const anoControl = this.form.get('ano');
    const mesControl = this.form.get('mes');

    if (anoControl && mesControl) {
      combineLatest([
        anoControl.valueChanges,
        mesControl.valueChanges
      ])
      .subscribe(([ano, mes]: [number, number]) => {
        if (ano && mes) {
          this.fetchResumoMensal(ano, mes);
        }
      }, error => {
        console.error('Error observing form changes', error);
      });
    }
  }

  fetchResumoMensal(ano: number, mes: number) {
    this.resumoService.getResumoMensal(ano, mes).subscribe(response => {
      this.form.patchValue({
        receitas: response.Receitas,
        despesas: response.Despesas,
        resumo: response.ResumoMensal
      });
      console.log(response);
    }, error => {
      console.error('Error fetching monthly summary', error);
      this.limparFormulario();
      alert('Não foram encontrados registros para a data selecionada.');
    });
  }

  limparFormulario() {
    this.form.get("receitas")?.setValue(null);
    this.form.get("despesas")?.setValue(null);
    this.form.get("resumo")?.setValue(null);
  }

  isInvalid(field: string): boolean {
    return (!this.form.get(field)?.valid && this.form.get(field)?.touched) ?? false;
  }
}
