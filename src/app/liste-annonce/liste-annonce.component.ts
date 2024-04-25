import { Component } from '@angular/core';
<<<<<<< HEAD
import { Annonce} from '../Entites/Annonce.Entites';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
=======
>>>>>>> 5d8133e23d99fc9fb55deeb7bcc3fb467b2fc047

@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.component.html',
  styleUrls: ['./liste-annonce.component.css']
})
export class ListeAnnonceComponent {
<<<<<<< HEAD
  listeAnnonce:Annonce[];
  Annonce:any
  p:number=1;
  collection:any[]
  constructor(private service:CrudService,private router:Router ) { }
  //supprimer
  Deleteannonce(annonce: Annonce){
    if(confirm("Voulez vous supprimer cet annonce avec l'ID " + annonce.id + " ?")) {
     
      this.service.onDeleteAnnonce(annonce.id).subscribe(() => {
        this.router.navigate(['/liste_annonce']).then(() => {
          window.location.reload()
        })
      })
   
  }
=======

>>>>>>> 5d8133e23d99fc9fb55deeb7bcc3fb467b2fc047
}
  ngOnInit(): void {
    this.service.getAnnonce().subscribe(annonce => {
      this.listeAnnonce = annonce
    })
  }
}

