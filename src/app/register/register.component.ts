import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { NgToastService } from 'ng-angular-popup';
import { Utilisateur } from '../Entites/Utilisateur.Entites';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  UtilisateurForm: FormGroup;

  constructor(private service: CrudService, private router: Router, private formBuilder: FormBuilder, private toast: NgToastService) { }

  ngOnInit(): void {
    this.UtilisateurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      mdp: ['', Validators.required],
      confirmPassword: ['', Validators.required], // Ajouter le champ confirmPassword
      role: ['', Validators.required],
  
      telephone: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator // Utilisez this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('mdp').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }

  addNewUtilisateur() {
    let data = this.UtilisateurForm.value;
    console.log(data);
    let utilisateur = new Utilisateur(undefined, data.nom, data.prenom, data.email,null, data.telephone, data.adresse, data.mdp, data.role,data.etat);
    console.log(utilisateur);

    if (
      data.nom == 0 ||
      data.prenom == 0 ||
      data.email == 0 ||
      data.adresse == 0 ||
      data.mdp == 0 ||
      data.telephone == 0 ||
      data.role == 0
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
      this.service.addUtilisateur(utilisateur).subscribe(
        res => {
          console.log(res);
          this.toast.success({
            detail: 'Succes Message',
            summary: data.role + ' est ajouté avec succés',
          });

          
        },
        err => {
          console.log(err);
          this.router.navigate(['/verification_email']);
        }
      );
    }
  }
}
