import { Component, OnInit } from '@angular/core';
import { Libro, LibrosService } from '../services/libros';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-libros-form',
  imports: [Navbar, CommonModule, FormsModule,  RouterModule],
  templateUrl: './libros-form.html',
  styleUrl: './libros-form.css',
  standalone:true
})
export class LibrosForm implements OnInit{
  model: Libro = { titulo: '', autor: '', editorial: '', disponibilidad: 'disponible' };
  editMode = false;

  constructor(
    private s: LibrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.s.get(+id).subscribe(l => this.model = l);
    }
  }

  save() {
    if (this.editMode && this.model.id_libro) {
      this.s.update(this.model.id_libro, this.model).subscribe(()=> this.router.navigateByUrl('/'));
    } else {
      this.s.create(this.model).subscribe(()=> this.router.navigateByUrl('/'));
    }
  }
}
