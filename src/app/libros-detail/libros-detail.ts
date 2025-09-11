import { Component, OnInit } from '@angular/core';
import { Libro, LibrosService } from '../services/libros';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-libros-detail',
  imports: [ RouterModule, CommonModule],
  templateUrl: './libros-detail.html',
  styleUrl: './libros-detail.css',
  standalone: true
})
export class LibrosDetail implements OnInit{
  libro?: Libro;
  constructor(private s: LibrosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.s.get(id).subscribe(l => this.libro = l);
  }

  
}
