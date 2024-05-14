import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

import { Receita } from '../models/receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private baseUrl: string = "http://localhost:3000";

  private receitasService: Receita[] = [];

  constructor(private http: HttpClient) { }

  addReceita(receita: Receita) {
    return this.http.post<any>(`${this.baseUrl}/receitas`, receita).pipe(
      map((response: any) => {
        const receitaObject = response.receita;
        const receitaModel = new Receita(receitaObject.descricao, receitaObject.valor, receitaObject.data, receitaObject._id)
        this.receitasService.push(receitaModel);
        return receitaModel;
      }),
      catchError((error) => this.errorHandler(error, "addReceita()"))
    );
  }

  getReceitas() {
    return this.http.get<any>(`${this.baseUrl}/receitas`).pipe(
      map((response: any) => {
        let transformedReceitasModel: Receita[] = [];
        for(let receita of response) {
          transformedReceitasModel.push(
            new Receita(receita.descricao, receita.valor, receita.data, receita._id)
          );
        }
        this.receitasService = [...transformedReceitasModel];
        response = this.receitasService;
        
        return response
      }),
      catchError((error) => this.errorHandler(error, "getReceitas()"))
    );
  }

  deleteReceita(receita: Receita) {
    this.receitasService.splice(this.receitasService.indexOf(receita), 1);
    this.http.delete<any>(`${this.baseUrl}/receitas/${receita.id}`).subscribe();
  }

  errorHandler(error: any, info: string): Observable<any> {
    throw({
      info_extra: info,
      error_SS: error,
      error_CS: "Client-Side: errorHandler: Ocorreu um erro!" 
    });
  }
}
