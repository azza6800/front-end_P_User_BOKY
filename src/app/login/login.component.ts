import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { NgToastService } from 'ng-angular-popup';
import { Utilisateur} from '../Entites/Utilisateur.Entites';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,private toast:NgToastService
  ) { 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
        
      ]),
      mdp: new FormControl('',[
        Validators.required,
       
      ])
    }

    this.loginForm = this.fb.group(formControls)
  }

  get email() { return this.loginForm.get('email') }
  get mdp() { return this.loginForm.get('mdp') }
  ngOnInit(): void { 
  }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    let utilisateur = new Utilisateur(null,null,null,data.email,null,null,null,data.mdp,null,null,null);
    console.log(utilisateur);
    if (
  
      data.email == 0 ||
      data.mdp == 0
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
  
      this.service.loginUtilisateur(utilisateur).subscribe(
        res=>{
          console.log(res);
          let token = res.token;
          localStorage.setItem("myToken",res.token);
          localStorage.setItem("role",res.role);
          if (res.role == "Femme de menage"){
            this.router.navigate(['/profilfemme']).then(()=>window.location.reload());
          }else
          {
            this.router.navigate(['/']).then(()=>window.location.reload());

          }
      },
       
        err=>{
          {
            console.log(err);
            if (err.error.message === "Utilisateur not found !") 
            {
              this.toast.error({
                detail: 'Utilisateur non trouvé',
                summary: 'Erreur',
              });
            } 
            else if (err.error.message === "Incorrect password !") 
            {
              this.toast.error({
                detail: 'Mot de passe incorrect',
                summary: 'Erreur',
              });
            } 
            else if (err.error.message === "Account is not activated !")
            {
              this.toast.error({
                detail: 'Le compte n\'est pas activé',
                summary: 'Erreur',
              });
            } 
            else 
            {
              this.toast.error({
                detail: 'Problème de serveur',
                summary: 'Erreur',
              });
            }
          }
          
        }
      )
      
    }
    }
  isLoggedIn(){

    let token = localStorage.getItem("myToken");
  
    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  


}
