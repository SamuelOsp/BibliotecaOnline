import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Libro {
  id_libro?: number;
  titulo: string;
  autor: string;
  editorial?: string;
  disponibilidad?: string;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private baseUrl = 'http://localhost:3000/api/libros';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Libro[]> { return this.http.get<Libro[]>(this.baseUrl); }
  get(id: number): Observable<Libro> { return this.http.get<Libro>(`${this.baseUrl}/${id}`); }
  create(data: Libro) { return this.http.post(this.baseUrl, data); }
  update(id: number, data: Libro) { return this.http.put(`${this.baseUrl}/${id}`, data); }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
  buscar(termino: string) {
  return this.http.get<any[]>(`${this.baseUrl}/buscar/${termino}`);
}


}
