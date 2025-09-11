import { Component } from '@angular/core';
import { Usuarios } from '../../services/usuarios';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  nombre = '';
  contrasena = '';
  error = '';

  constructor(private usuariosService: Usuarios, private router: Router) {}

  login() {
    this.usuariosService.login(this.nombre, this.contrasena).subscribe({
      next: (res: any) => {
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigateByUrl('/');
      },
      error: () => this.error = 'Usuario o contraseña incorrectos'
    });
  }


  irARegistro() {
    this.router.navigateByUrl('/register');
  }

}
