import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Utilisateur } from '../Entites/Utilisateur.Entites';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userDetails: Utilisateur; // Type spécifique pour userDetails
  profil: Utilisateur[];
  p:number=1;
  collection:any[]
  utilisateur: any;
  IsloggedIn: boolean;
  IsUtilisateurIn: boolean;
  isProprietaire: boolean;

  constructor(private router: Router, private service: CrudService) {
    this.userDetails = this.service.getUserInfo();
    console.log(this.userDetails); 
    this.IsloggedIn=this.service.isLoggedIn();
    this.IsUtilisateurIn=this.service.isUtilisateurInIn();
    this.isProprietaire=this.service.isProprietaire();
  }
  updateUtilisateuretat(utilisateur: Utilisateur){
    if(confirm("Cette action ne vous permettra pas de vous reconnecter ultérieurement sans contacter notre service client. Souhaitez-vous toujours supprimer ce compte ? " )) {
      let newUtilisateur=new Utilisateur(utilisateur.id,utilisateur.nom,utilisateur.prenom,utilisateur.email,utilisateur.date_de_naissance,utilisateur.telephone,utilisateur.adresse,utilisateur.mdp,utilisateur.role,false,utilisateur.photo)

      this.service.updateUtilisateur(utilisateur.id,newUtilisateur).subscribe(() => {
        this.logout();
      })
   
    }
  }
  

  ngOnInit(): void {
    console.log(this.userDetails);
    this.service.getUtilisateur().subscribe(utilisateurs => {
      this.profil = utilisateurs.filter(user => user.id === this.userDetails.id);
    });
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
