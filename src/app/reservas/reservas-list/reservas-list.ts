import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservas } from '../../services/reservas';
import { Navbar } from '../../navbar/navbar';

export interface Reserva {
  id_reserva?: number;
  id_libro: number;
  id_usuario: number;
  fecha_reserva?: string;
  estado?: 'activa' | 'cancelada' | 'finalizada';
}

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './reservas-list.html',
  styleUrls: ['./reservas-list.css'],
})
export class ReservasList {
  reservas: Reserva[] = [];
  usuario: { id_usuario?: number } | null = null;

  constructor(private reservasService: Reservas) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('usuario');
    if (userString) {
      const parsed = JSON.parse(userString);
      this.usuario = { id_usuario: parsed.id_usuario ?? parsed.id ?? parsed.uuid };
    }
    if (this.usuario?.id_usuario) {
      this.loadReservas();
    }
  }

  loadReservas() {
    if (!this.usuario?.id_usuario) return;
    this.reservasService.getByUsuario(this.usuario.id_usuario).subscribe({
      next: (data) => (this.reservas = data),
      error: (err) => console.error('Error cargando reservas:', err),
    });
  }

  reservar(id_libro?: number) {
    if (!id_libro || !this.usuario?.id_usuario) {
      return alert('ID de usuario o libro no válido');
    }

    this.reservasService.create(this.usuario.id_usuario, id_libro).subscribe({
      next: () => this.loadReservas(),
      error: (err) => alert(err?.error?.message || 'Error al reservar'),
    });
  }
}
