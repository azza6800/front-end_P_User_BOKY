import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Annonce } from '../Entites/Annonce.Entites';

@Component({
  selector: 'app-liste-annonces-public',
  templateUrl: './liste-annonces-public.component.html',
  styleUrls: ['./liste-annonces-public.component.css']
})
export class ListeAnnoncesPublicComponent {
 
  listAnnonce: Annonce[];
  p:number=1;
  collection:any[]
  constructor(private service:CrudService,private router:Router ) { }
 
 
  
  detailannonce(id: number): void {
    this.router.navigate(['/detailannonce', id]);
  }
 
 
  ngOnInit(): void {
    this.service.getAnnonce().subscribe(annonce => {
      this.listAnnonce = annonce
    })
  }

}
