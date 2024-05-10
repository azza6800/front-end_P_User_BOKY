import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../Entites/Utilisateur.Entites';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  IsloggedIn:boolean
  IsUtilisateurIn:boolean
  isProprietaire:boolean
  userDetails: any;

 
  constructor(private service:CrudService,private router:Router) { }

  ngOnInit(): void {
    this.userDetails = this.service.getUserDetails();
    this.IsloggedIn=this.service.isLoggedIn();
    this.IsUtilisateurIn=this.service.isUtilisateurInIn();
    this.isProprietaire=this.service.isProprietaire();
    
  }
  ModifierRole(){
    let utilisateur =new Utilisateur(
      this.userDetails.id,
      this.userDetails.nom,
      this.userDetails.prenom,
      this.userDetails.email,
      this.userDetails.date_de_naissance,
      this.userDetails.telephone,
      this.userDetails.adresse,
      this.userDetails.mdp, 
      this.userDetails.role="Propriétaire",
      true,
      this.userDetails.imgURL);
    if(confirm("Voulez-vous passer en mode propriétaire ?")) {
     console.log(utilisateur)
      this.service.updateUtilisateur(this.userDetails.id,utilisateur).subscribe(() => {
        localStorage.clear()
        this.router.navigate(['/Login']).then(() => {
          window.location.reload()
        })
      })
   
  }}

  logout(){
    console.log("logout");
    localStorage.clear()
    this.router.navigate(['/']).then(() => {
      window.location.reload()
    })
    
  }
}
