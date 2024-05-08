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

  constructor(private router: Router, private service: CrudService) {
    this.userDetails = this.service.getUserInfo();
    console.log(this.userDetails); 
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
