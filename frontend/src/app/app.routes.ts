import { Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { ReceitaComponent } from './components/receita/receita.component';
import { DespesaComponent } from './components/despesa/despesa.component';

export const routes: Routes = [
  { path: "", redirectTo: "/receita", pathMatch: "full" },
  { path: "inicio", title: "Início", component: InicioComponent },
  { path: "receita", title: "Receita", component: ReceitaComponent },
  { path: "despesa", title: "Despesa", component: DespesaComponent }
];
