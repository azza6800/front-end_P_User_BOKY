import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../Entites/Utilisateur.Entites';
import { CrudService } from '../service/crud.service';
import { Planning } from '../Entites/Planning.Entites';
import { forkJoin } from 'rxjs'; // Importer forkJoin

@Component({
  selector: 'app-servicenettoyage',
  templateUrl: './servicenettoyage.component.html',
  styleUrls: ['./servicenettoyage.component.css']
})
export class ServicenettoyageComponent implements OnInit {
  listeplanning: Planning[] = [];
  listeutilisateur: Utilisateur[] = [];
  user: Utilisateur[] = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    console.log("hatha utilisateur  :", this.listeutilisateur);
    console.log("hatha list planning:", this.listeplanning);

    this.crudService.getPlanning().subscribe((planning: Planning[]) => {
      this.listeplanning = planning;
   
      // Créer un tableau d'observables pour récupérer les listeutilisateur associés aux plannings
      const observables = this.listeplanning.map(i =>
        this.crudService.getUtilisateurByPlanning(i.id));
      // Utiliser forkJoin pour attendre que toutes les requêtes soient terminées
      forkJoin(observables).subscribe(results => {
        this.listeutilisateur = results;
        console.log("Liste des listeutilisateur après ajout :", this.listeutilisateur);
      });
    });
  

    console.log("hatha list planning après chargement:", this.listeplanning);
    

    this.getUtilisateursParRole('Femme de menage');
  }

  getUtilisateursParRole(role: string): void {
    this.crudService.getUtilisateursParRole(role)
      .subscribe(user => this.user = user);
  }
}
