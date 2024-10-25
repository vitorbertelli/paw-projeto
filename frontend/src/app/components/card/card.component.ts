import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Receita } from '../../models/receita';
import { Despesa } from '../../models/despesa';
import { ReceitaService } from '../../services/receita.service';
import { DespesaService } from './../../services/despesa.service';

type transctionType = "receita" | "despesa"

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
  CommonModule
  ],
  providers: [
    ReceitaService,
    DespesaService
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() item!: Receita | Despesa;
  @Input() type: transctionType = "receita";

  @Output() delete: EventEmitter<Receita> = new EventEmitter<Receita>();

  constructor(private receitaService: ReceitaService, private despesaService: DespesaService) { }

  onDelete() {
    const confirmation = confirm('Você tem certeza que deseja deletar este item?');
  
    if (confirmation) {
      if(this.type == "despesa") {
        this.despesaService.deleteDespesa(this.item);
      } else {
        this.receitaService.deleteReceita(this.item);
      }
      this.delete.emit(this.item);
    } else {
      console.log('Deleção cancelada pelo usuário.');
    }
  }

  setStyle() {
    if(this.type == "despesa") {
      return { "despesa": true }
    }
    return { "receita": true }
  }
}
