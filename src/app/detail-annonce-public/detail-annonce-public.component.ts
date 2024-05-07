import { Component } from '@angular/core';
import { Annonce } from '../Entites/Annonce.Entites';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-annonce-public',
  templateUrl: './detail-annonce-public.component.html',
  styleUrls: ['./detail-annonce-public.component.css']
})
export class DetailAnnoncePublicComponent {
  messageCommande="";
  annonce: Annonce;
  p:number=1;
  id: number;
  collection:any[]
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) { }
 
 
  reserver(event:any)
  {
    this.messageCommande=`<div class="alert alert-primary" role="alert">
    Veuillez patienter ...
  </div>`
    console.log(event)
    let datas=this.service.getUserInfo()
    let rq:any={}
    rq.id_client=datas?.id 
    rq.id_annonce=event.id
   
    console.log(rq,"what we senddddd")
    this.service.reserverFromApi(rq).subscribe((data:any)=>{
      this.route.navigate(['mes-reservations'])
    
      this.messageCommande=`<div class="alert alert-success" role="alert">
    Réservé avec succès
  </div>`
    }, err=>{
      this.messageCommande=`<div class="alert alert-warning" role="alert">
     Erreur, Veuillez réssayer !! 
    </div>`

    })
    setTimeout(() => {
      this.messageCommande=""
    }, 3000);
  }

    connexion()
    {
      this.route.navigate(['/login'])
    }
 
 
  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    console.log(this.id);
    this.service.getAnnonceById(this.id).subscribe(annonce => {
      this.annonce = annonce
    })
  }
}
