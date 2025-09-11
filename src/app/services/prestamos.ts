import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Prestamos {
  private api = 'http://localhost:3000/api/prestamos';

  constructor(private http: HttpClient) {}

  delete(id: number) { return this.http.delete(`${this.api}/${id}`); }

  getHistorial(id_usuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/usuario/${id_usuario}`);
  }


  create(data: { id_libro: number; id_usuario: number }): Observable<any> {
    return this.http.post<any>(this.api, data);
  }
}
