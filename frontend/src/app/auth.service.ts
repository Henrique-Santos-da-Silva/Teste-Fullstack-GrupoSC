import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/clientes/login';

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.loginUrl, { usuario, senha }, { headers })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
