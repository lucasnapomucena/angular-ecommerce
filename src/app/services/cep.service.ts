import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cep } from './../core/models/cep.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient) {}

  cepConsult(cep: string): Observable<Cep> {
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.http.get<Cep>(`//viacep.com.br/ws/${cep}/json`);
      }
    }
  }
}
