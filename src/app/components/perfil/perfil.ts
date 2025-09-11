import { Component } from '@angular/core';
import { Usuarios } from '../../services/usuarios';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-perfil',
  imports: [NgIf],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {
  usuario: any;

  constructor(private usuarios: Usuarios, private router: Router) {
    this.usuario = this.usuarios.getUsuario();
  }

  logout() {
    this.usuarios.logout();
    this.router.navigateByUrl('/login');
  }
}
