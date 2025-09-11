import { Component } from '@angular/core';
import { Prestamos } from '../../services/prestamos';
import { Navbar } from '../../navbar/navbar';
import { CommonModule } from '@angular/common';
export interface Prestamo {
  id_prestamo?: number;
  id_libro: number;
  id_usuario: number;
  fecha_prestamo?: string;
  fecha_devolucion?: string;
  estado?: 'activo' | 'devuelto';
}
@Component({
  selector: 'app-prestamos-list',
  imports: [Navbar, CommonModule],
  templateUrl: './prestamos-list.html',
  styleUrl: './prestamos-list.css',
  standalone: true,
})
export class PrestamosList {
  prestamos: Prestamo[] = [];
  usuario: { id_usuario?: number } | null = null;

  constructor(private prestamosService: Prestamos) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('usuario');
    if (userString) {
      const parsed = JSON.parse(userString);
      this.usuario = { id_usuario: parsed.id_usuario ?? parsed.id ?? parsed.uuid };
    }
    if (this.usuario?.id_usuario) {
      this.load();
    }
  }


  load() {
    if (!this.usuario?.id_usuario) return;
      this.prestamosService.getHistorial(this.usuario.id_usuario).subscribe({
        next: (data) => (this.prestamos = data),
      error: (err) => console.error('Error cargando prestamos:', err),
      });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar Prestamo?')) return;
    this.prestamosService.delete(id).subscribe(() => this.load());
  }

}
