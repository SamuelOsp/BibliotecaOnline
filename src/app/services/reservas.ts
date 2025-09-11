import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Reservas {
  private api = 'http://localhost:3000/api/reservas';

  constructor(private http: HttpClient) {}

  getByUsuario(id_usuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/usuario/${id_usuario}`);
  }

  create(id_usuario: number, id_libro: number): Observable<any> {
    return this.http.post<any>(this.api, { id_usuario, id_libro });
  }
}
