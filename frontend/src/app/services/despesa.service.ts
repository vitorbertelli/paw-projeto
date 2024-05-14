import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { Despesa } from '../models/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private baseUrl: string = "http://localhost:3000";

  private despesasService: Despesa[] = [];

  constructor(private http: HttpClient) { }

  addDespesa(despesa: Despesa) {
    return this.http.post<any>(`${this.baseUrl}/despesas`, despesa).pipe(
      map((response: any) => {
        const despesaObject = response.despesa;
        const despesaModel = new Despesa(despesaObject.descricao, despesaObject.valor, despesaObject.data, despesaObject._id)
        this.despesasService.push(despesaModel);
        return despesaModel;
      }),
      catchError((error) => this.errorHandler(error, "addDespesa()"))
    );
  }

  getDespesas() {
    return this.http.get<any>(`${this.baseUrl}/despesas`).pipe(
      map((response: any) => {
        let transformedDespesasModel: Despesa[] = [];
        for(let despesa of response) {
          transformedDespesasModel.push(
            new Despesa(despesa.descricao, despesa.valor, despesa.data, despesa._id)
          );
        }
        this.despesasService = [...transformedDespesasModel];
        response = this.despesasService;
        
        return response
      }),
      catchError((error) => this.errorHandler(error, "getDespesas()"))
    );
  }

  deleteDespesa(despesa: Despesa) {
    this.despesasService.splice(this.despesasService.indexOf(despesa), 1);
    this.http.delete<any>(`${this.baseUrl}/despesas/${despesa.id}`).subscribe();
  }

  errorHandler(error: any, info: string): Observable<any> {
    throw({
      info_extra: info,
      error_SS: error,
      error_CS: "Client-Side: errorHandler: Ocorreu um erro!" 
    });
  }
}
