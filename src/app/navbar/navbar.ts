import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuarios } from '../services/usuarios';

@Component({
  selector: 'app-navbar',
  imports: [ RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  usuario: any;

  constructor(private usuarios: Usuarios, private router: Router) {
    this.usuario = this.usuarios.getUsuario();
  }

  logout() {
    this.usuarios.logout();
    this.router.navigateByUrl('/login');
  }
}
