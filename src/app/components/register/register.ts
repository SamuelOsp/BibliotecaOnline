import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuarios } from '../../services/usuarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  nombre = '';
  contrasena = '';
  rol = 'lector';
  error = '';
  mensaje = '';

  constructor(private usuariosService: Usuarios, private router: Router) {}

  registrar() {
  this.usuariosService.registrar({
    nombre: this.nombre,
    contrasena: this.contrasena,
    rol: this.rol
  }).subscribe({
    next: (res: any) => {
      localStorage.setItem('usuario', JSON.stringify(res));
      this.router.navigateByUrl('/');
    },
    error: () => this.error = 'Error al registrar el usuario'
  });
}

}
