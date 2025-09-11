import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Usuarios } from '../services/usuarios';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarios = inject(Usuarios);
  const router = inject(Router);

  if (usuarios.estaLogueado()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
