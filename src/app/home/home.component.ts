import { Component } from '@angular/core';
import { Annonce } from '../Entites/Annonce.Entites';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
