import { Component, OnInit } from '@angular/core';
import { Libro, LibrosService } from '../services/libros';
import { Router, RouterModule } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reservas } from '../services/reservas';   
import { Prestamos } from '../services/prestamos'; 
@Component({
  selector: 'app-libros-list',
  standalone: true,
  imports: [Navbar, RouterModule, CommonModule, FormsModule],
  templateUrl: './libros-list.html',
  styleUrl: './libros-list.css'
})
export class LibrosList implements OnInit {
  libros: Libro[] = [];
  loading = true;
  termino: string = '';   
  usuario :any;
  constructor(private s: LibrosService, private router: Router, private reservasService: Reservas, private prestamosService: Prestamos,) {}

  ngOnInit() {
    this.load();
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); 
  }

  load() {
    this.loading = true;
    this.s.getAll().subscribe(r => {
      this.libros = r;
      this.loading = false;
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar libro?')) return;
    this.s.delete(id).subscribe(() => this.load());
  }

  buscar() {
    if (this.termino.trim() === '') {
      this.load();
    } else {
      this.s.buscar(this.termino).subscribe(data => this.libros = data);
    }
  }

  reservar(id_libro?: number) {
  const id_usuario = this.usuario?.id_usuario ?? this.usuario?.id ?? this.usuario?.uuid;
  if (!id_libro || !id_usuario) {
    alert('ID inválido');
    return;
  }

  this.reservasService.create(Number(id_usuario), Number(id_libro)).subscribe({
    next: () => {
      alert('Reserva realizada');
      this.load();  
      this.router.navigate(['/reservas']);
    },
    error: (err) => console.error('Error al reservar:', err)
  });
}


prestar(id_libro?: number) {
  if (!id_libro) return alert('ID del libro no válido');

  const id_usuario = this.usuario?.id_usuario ?? this.usuario?.id ?? this.usuario?.uuid;
  if (!id_usuario) {
    alert('Usuario no válido');
    return;
  }

  this.prestamosService.create({
    id_libro: Number(id_libro),
    id_usuario: Number(id_usuario)
  }).subscribe({
    next: () => {
      alert('Préstamo realizado');
      this.load(); 
      this.router.navigate(['/prestamos']);
    },
    error: (err) => {
      console.error('❌ Error al prestar:', err);
      alert(err.error?.error || 'Error en el préstamo');
    }
  });
}







}
