import { Component } from '@angular/core';
import { Annonce } from '../Entites/Annonce.Entites';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

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
  enableForm: boolean = true;
  checkoutParentGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute,private toast:NgToastService
  ) { 
    let formControls = {
      date_arrivée: new FormControl('',[
        Validators.required,
        
      ]),
      date_depart: new FormControl('',[
        Validators.required,
        
      ]),
      nb_vacancier: new FormControl('',[
        Validators.required,
        
      ])
    }
    this.checkoutParentGroup = this.fb.group(formControls)
  }
 
  done() {
    let data = this.checkoutParentGroup.value;
    
    
    if (
  
      data.date_arrivée == 0 ||
      data.date_depart==0 ||
      data.nb_vacancier ==0
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
      this.enableForm = false
    }
    }
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
