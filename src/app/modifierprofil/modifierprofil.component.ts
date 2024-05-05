import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Utilisateur } from '../Entites/Utilisateur.Entites';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-modifierprofil',
  templateUrl: './modifierprofil.component.html',
  styleUrls: ['./modifierprofil.component.css']
})
export class ModifierprofilComponent implements OnInit {
  updateForm: FormGroup;
  id: number;
  currentUtilisateur = new Utilisateur()
  userFile: any;
  public message!: string;
  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    let formControles = {
      nom: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"), 
        Validators.minLength(4),
      ]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      mdp: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      confirmPassword: ['', Validators.required],
    role: ['', Validators.required],
     
    };
    this.updateForm = this.fb.group(formControles);
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get prenom() {
    return this.updateForm.get('prenom');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get mdp() {
    return this.updateForm.get('mdp');
  }
  get adresse() {
    return this.updateForm.get('adresse');
  }
  get telephone() {
    return this.updateForm.get('telephone');
  }
get role() { return this.updateForm.get('role'); }


  
  ngOnInit(): void {
    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    this.service.findUtilisateurById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        nom: event.nom,
        prenom: event.prenom,
        email: event.email,
        telephone: event.telephone,
        adresse: event.adresse,
        mdp: event.mdp,
        role: event.role, });}); }
  updateUtilisateur() {
    let data = this.updateForm.value;
    let utilisateur =new Utilisateur(
      this.id,
      data.nom,
      data.prenom,
      data.email,
      data.date_de_naissance,
      data.telephone,
      data.adresse,
      data.mdp, 
      data.role,);
    console.log(utilisateur);
    console.log(data);
    this.service.updateUtilisateur(this.id,utilisateur).subscribe((res) => {
      console.log(res);
      this.route.navigate(['/profil'])}); }

}
