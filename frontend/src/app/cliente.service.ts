import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Cliente} from "./models/cliente";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(cnpj: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/${cnpj}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}`, cliente);
  }

  updateCliente(cnpj: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${cnpj}`, cliente);
  }

  deleteCliente(cnpj: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cnpj}`);
  }
}
