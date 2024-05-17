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
}
