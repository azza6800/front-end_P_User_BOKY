import { Component, OnInit } from '@angular/core';
import { Annonce} from '../Entites/Annonce.Entites';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Utilisateur } from '../Entites/Utilisateur.Entites';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.component.html',
  styleUrls: ['./liste-annonce.component.css']
})
export class ListeAnnonceComponent implements OnInit {
  listeAnnonce: Annonce[] = [];
  userDetails: Utilisateur;
  updateForm: FormGroup;
  p: number = 1;
  id: number;
  annonceur: Utilisateur;
  annonce: Annonce;
  nbannonce: number;

  constructor(
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userDetails = this.service.getUserDetails();

    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
      console.log(this.userDetails.id);

      
      this.service.listeAnnonceByAnnonceur(this.userDetails.id).subscribe(annonce => {
        this.listeAnnonce = annonce;
        this.nbannonce = annonce.length;
        console.log("hatha list annonce:", this.listeAnnonce);
      });

      this.service.getAnnonceById(this.annonce.id).subscribe(annonce => {
        this.annonce = annonce;
        console.log("hatha id annonce :", annonce.id);
        console.log("hatha annonceur :", this.annonceur);
      });
    });
  }

  // Supprimer une annonce
  deleteAnnonce(annonce: Annonce): void {
    if (confirm("Voulez-vous supprimer cette annonce avec l'ID " + annonce.id + " ?")) {
      this.service.onDeleteAnnonce(annonce.id).subscribe(() => {
        this.router.navigate(['/liste_annonce']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  // Modifier une annonce
  modifierAnnonce(id: number): void {
    this.router.navigate(['/modifierannonce', id]);
  }
  updateAnnoncetat(annonce:Annonce)
  {
    console.log(annonce);
    let index=this.listeAnnonce.indexOf(annonce);
    if(annonce.accorde_user==true)
      { if(confirm("Voulez vous disactiver annonce : " + annonce.titre + " ?")) 
        {let newannonce =new Annonce(annonce.id,annonce.type_d_hebergement,annonce.nb_voyageur,
          annonce.nb_chamber,annonce.nb_lits,annonce.nb_salles,annonce.equipement,annonce.equipement_specail,annonce.equipement_securite,
          annonce.image,annonce.titre,annonce.description,  annonce.reduction_semaine,annonce.reduction_mois,annonce.prix,annonce.pays,
          annonce.etat,annonce.ville,annonce.code_postale,annonce.heure_depart,annonce.heure_arriver,annonce.verification,
          false,annonce.date)
  
      this.service.updateAnnonce(annonce.id,newannonce).subscribe
  (
    res=>{console.log(res)
    this.listeAnnonce[index]=newannonce
    this.router.navigate(['/liste_annonce']).then(() => {
      window.location.reload();
    });
    },
    err=>console.log(err)
  )}

    
  }else 
  {
    if(confirm("Voulez vous activer annonce :" + annonce.titre + " ?")) {
      let newannonce =new Annonce(annonce.id,annonce.type_d_hebergement,annonce.nb_voyageur,
        annonce.nb_chamber,annonce.nb_lits,annonce.nb_salles,annonce.equipement,annonce.equipement_specail,annonce.equipement_securite,
        annonce.image,annonce.titre,annonce.description,  annonce.reduction_semaine,annonce.reduction_mois,annonce.prix,annonce.pays,
        annonce.etat,annonce.ville,annonce.code_postale,annonce.heure_depart,annonce.heure_arriver,annonce.verification,
        true,annonce.date)
        console.log("***************",newannonce)
      this.service.updateAnnonce(annonce.id,newannonce).subscribe
    (
      res=>{console.log(res)
        console.log("***************",newannonce)
        this.listeAnnonce[index]=newannonce
        this.router.navigate(['//liste_annonce']).then(() => {
          window.location.reload();
        });
      },
      err=>console.log(err)
    )}
  }
  }
}
