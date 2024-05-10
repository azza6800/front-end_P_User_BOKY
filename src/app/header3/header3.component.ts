import { Component } from '@angular/core';
import { Utilisateur } from '../Entites/Utilisateur.Entites';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.css']
})
export class Header3Component {
  userDetails: Utilisateur; // Type spécifique pour userDetails
  profil: Utilisateur[];
  p:number=1;
  collection:any[]
  utilisateur: any;
  isProprietaire:boolean
  IsUtilisateurIn:boolean
  userDetails1: any;

 
  constructor(private service:CrudService,private router:Router) { }

  ngOnInit(): void {
    this.IsUtilisateurIn=this.service.isUtilisateurInIn();
    this.isProprietaire=this.service.isProprietaire();
    this.userDetails1 = this.service.getUserDetails();

    console.log(this.userDetails);
    this.service.getUtilisateur().subscribe(utilisateurs => {
      this.profil = utilisateurs.filter(user => user.id === this.userDetails.id);
    });
    
  
  }
  Deleteutilisateur(utilisateur: Utilisateur){
    if(confirm("Voulez vous supprimer cet utilisateur avec l'ID " + utilisateur.id + " ?")) {
     
      this.service.onDeleteUtilisateur(utilisateur.id).subscribe(() => {
        this.router.navigate(['/profil']).then(() => {
          window.location.reload()
        })
      })
   
    }
  }

 
 
  logout(): void {
    console.log("logout");
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  modifierProfil(id: number): void {
    this.router.navigate(['/modifierprofil', id]);
  }

}
