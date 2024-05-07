import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Utilisateur } from '../Entites/Utilisateur.Entites';

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.css']
})
export class ChangerMotDePasseComponent {
  enableForm: boolean = true;
  checkoutParentGroup: FormGroup;
  checkoutParentGroupReset: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,private toast:NgToastService
  ) {
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
        
      ])
    }
    let formControlsReset = {
      code: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    }

    this.checkoutParentGroup = this.fb.group(formControls)
    this.checkoutParentGroupReset = this.fb.group(formControlsReset )
   }
   get email() { return this.checkoutParentGroup.get('email') }
   get password() { return this.checkoutParentGroupReset.get('password') }
   get code(){
    return this.checkoutParentGroupReset.get('code')
  }
   ngOnInit(): void { 
   }
  
  done() {
    let data = this.checkoutParentGroup.value;
    
    console.log(data);
    let utilisateur = new Utilisateur(null,null,null,data.email,null,null,null,null,null);
    console.log(utilisateur);
    if (
  
      data.email == 0 
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
  
      this.service.checkEmail(utilisateur).subscribe(
        res=>{
          console.log(res);
          this.enableForm = false
      },
        err=>{
          {
            console.log(err);
            alert("Email n'existe pas")
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
  
  
  resetNewPassword()
  {
    let data = this.checkoutParentGroupReset.value;
    let data1 = this.checkoutParentGroup.value;
    console.log(data);
    console.log(data1.email,data.code,data.password);
    if (
  
      data.code == 0 || data.password == 0
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
  
      this.service.resetPassword(data1.email,data.code,data.password).subscribe(
        res=>{
          console.log(res);
          
          this.router.navigate(['/login']).then(()=>window.location.reload());
      },
        err=>{
          {
            console.log(err);
            alert("Code incorrecte")
          } 
        }
      )
    }
  }
}
