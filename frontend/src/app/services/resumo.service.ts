import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumoService {
  private baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getResumoMensal(ano: number, mes: number) {
    return this.http.get<{Receitas: number, Despesas: number, ResumoMensal: number}>(`${this.baseUrl}/resumo/${ano}/${mes}`).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => this.errorHandler(error, "getResumoMensal()"))
    );
  }

  errorHandler(error: any, info: string): Observable<any> {
    throw({
      info_extra: info,
      error_SS: error,
      error_CS: "Client-Side: errorHandler: Ocorreu um erro!" 
    });
  }
}
