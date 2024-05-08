import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component {
  IsloggedIn:boolean
  IsUtilisateurIn:boolean
  isProprietaire:boolean

 
  constructor(private service:CrudService,private router:Router) { }

  ngOnInit(): void {
    this.IsloggedIn=this.service.isLoggedIn();
    this.IsUtilisateurIn=this.service.isUtilisateurInIn();
    this.isProprietaire=this.service.isProprietaire();
    
  
  }
 

  logout(){
    console.log("logout");
    localStorage.clear()
    this.router.navigate(['/']).then(() => {
      window.location.reload()
    })
    
  }
}
