import { Routes } from '@angular/router';
import { LibrosList } from './libros-list/libros-list';
import { LibrosForm } from './libros-form/libros-form';
import { LibrosDetail } from './libros-detail/libros-detail';
import { authGuard } from './guards/auth-guard';
import { Perfil } from './components/perfil/perfil';
import { Login } from './auth/login/login';
import { Register } from './components/register/register';
import { ReservasList } from './reservas/reservas-list/reservas-list';
import { PrestamosList } from './prestamos/prestamos-list/prestamos-list';

export const routes: Routes = [
  { path: 'login', component: Login }, 
  { path: 'register', component: Register },
  { path: '', component: LibrosList, canActivate: [authGuard] }, 
  { path: 'nuevo', component: LibrosForm, canActivate: [authGuard] },
  { path: 'libros/:id', component: LibrosDetail, canActivate: [authGuard] },
  { path: 'libros/edit/:id', component: LibrosForm, canActivate: [authGuard] },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: 'reservas', component: ReservasList, canActivate: [authGuard] },
{ path: 'prestamos', component: PrestamosList, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
