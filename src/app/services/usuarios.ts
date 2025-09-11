import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Usuarios {
  private baseUrl = 'http://localhost:3000/api/usuarios'; 
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

   login(nombre: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { nombre, contrasena }).pipe(
      tap(res => {
        if (res?.usuario) {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
        }
      })
    );
  }

  registrar(data: { nombre: string; contrasena: string; rol?: string }) {
  return this.http.post<any>(this.baseUrl, {
    nombre: data.nombre,
    contrasena: data.contrasena,
    tipo_usuario: data.rol || 'lector'
  });
}


  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  estaLogueado(): boolean {
    return !!this.getUsuario();
  }
}
