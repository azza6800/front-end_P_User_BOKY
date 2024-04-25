import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';
import { Annonce } from '../Entites/Annonce.Entites';
import {Saveannonce} from '../Entites/Saveannonce.Entites';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent {
  messageCommande = ""
  AnnonceForm: FormGroup;
  imagePath: any
  imgURL: any
  userFile: any
  message = ""
  listeAnnonce: Annonce[]

  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      type_d_hebergement: new FormControl( '', [
          Validators.required,]),
      nb_voyageur: new FormControl( '', [
            Validators.required,]),
      nb_chamber: new FormControl( '', [
      Validators.required,]),
      nb_lits: new FormControl( '', [
      Validators.required,]),
      nb_salles: new FormControl( '', [
        Validators.required,]),
      equipement: new FormControl( '', [
          Validators.required,]),
      equipement_specail: new FormControl( '', [
            Validators.required,]),
      equipement_securite: new FormControl( '', [
              Validators.required,]),
      image: new FormControl( '', [
                Validators.required,]),
       titre: new FormControl( '', [
             Validators.required,]),
       description: new FormControl( '', [
              Validators.required,]),
       mode_de_confirmation: new FormControl( '', [
               Validators.required,]),
      frais_de_service: new FormControl( '', [
               Validators.required,]),
      reduction_semaine: new FormControl( '', [
              Validators.required,]),
      reduction_mois: new FormControl( '', [
              Validators.required,]),
      prix: new FormControl( '', [
              Validators.required,]),
      pays: new FormControl( '', [
              Validators.required,]),
      etat: new FormControl( '', [
             Validators.required,]),
      libelle_de_voie: new FormControl( '', [
              Validators.required,]),
      code_postale: new FormControl( '', [
                Validators.required,]),
       heure_depart: new FormControl( '', [
                Validators.required,]),
      heure_arriver: new FormControl( '', [
                    Validators.required,]),}
     this.AnnonceForm = this.fb.group(formControls)
   }

  
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  get type_d_hebergement() { return this.AnnonceForm.get('type_d_hebergement'); }
  get nb_voyageur() { return this.AnnonceForm.get('nb_voyageur'); }
  get nb_chamber() { return this.AnnonceForm.get('nb_chamber'); }
  get nb_lits() { return this.AnnonceForm.get('nb_lits'); }
  get nb_salles() { return this.AnnonceForm.get('nb_salles'); }
  get equipement() { return this.AnnonceForm.get('equipement'); }
  get equipement_specail() { return this.AnnonceForm.get('equipement_specail'); }
  get equipement_securite() { return this.AnnonceForm.get('equipement_securite'); } 
  get image() { return this.AnnonceForm.get('image'); }
  get titre() { return this.AnnonceForm.get('titre'); }
  get description() { return this.AnnonceForm.get('descriptionl'); }
  get mode_de_confirmation() { return this.AnnonceForm.get('mode_de_confirmation'); }
  get frais_de_service() { return this.AnnonceForm.get('frais_de_service'); }
  get reduction_semaine() { return this.AnnonceForm.get('reduction_semaine'); }
  get reduction_mois() { return this.AnnonceForm.get('reduction_mois'); }
  get prix() { return this.AnnonceForm.get('prix'); }
  get pays() { return this.AnnonceForm.get('pays'); }
  get etat() { return this.AnnonceForm.get('etat'); }
  get libelle_de_voie() { return this.AnnonceForm.get('libelle_de_voie'); }
  get code_postale() { return this.AnnonceForm.get('code_postale'); }
  get heure_depart() { return this.AnnonceForm.get('heure_depart'); }
  get heure_arriver() { return this.AnnonceForm.get('heure_arriver'); }
 
  addNewAnnonce() {
    let datas=this.service.getUserInfo();
    let data = this.AnnonceForm.value;
    console.log(data);
    let model: Saveannonce= new Saveannonce();
    model.id = null;
    model.type_d_hebergement=data.type_d_hebergement;
       model.nb_voyageur= data.nb_voyageur;
       model.nb_chamber=data.nb_chamber;
       model.nb_lits=data.nb_lits;
       model.nb_salles=data.nb_salles;
      model.equipement=data.equipement;
       model.equipement_specail=data.equipement_specail;
      model.equipement_securite=data.equipement_securite;
      model.image = this.imgURL;
      model.titre=data.titre;
      model.description=data.description;
      model.mode_de_confirmation=data.mode_de_confirmation;
      model.frais_de_service=data.frais_de_service;
      model.reduction_semaine=data.reduction_semaine;
      model.reduction_mois=data.reduction_mois;
      model.prix=data.prix;
      model.pays=data.pays;
      model.etat=data.etat;
      model.libelle_de_voie=data.libelle_de_voie;
      model.code_postale=data.code_postale;
      model.heure_depart=data.heure_depart;
      model.heure_arriver=data.heure_arriver;
      model.Id_utilisateur=datas?.id;
      console.log(model.Id_utilisateur);
  
      if (
      data.type_d_hebergement == 0 ||
      data.nb_voyageur == 0 ||
      data.nb_chamber == 0 ||
      data.nb_lits == 0 ||
      data.nb_salles == 0 ||
      data.equipement == 0 ||
      data.equipement_specail == 0 ||
      data.equipement_securite == 0 ||
      data.image == 0 ||
      data.titre == 0 ||
      data.description == 0 ||
      data.mode_de_confirmation == 0 ||
      data.frais_de_service == 0 ||
      data.reduction_semaine == 0 ||
      data.reduction_mois == 0 ||
      data.prix == 0 ||
      data.pays == 0 ||
      data.etat == 0 ||
      data.libelle_de_voie == 0 ||
      data.code_postale == 0 ||
      data.heure_depart == 0 ||
      data.heure_arriver == 0 
      ) {
        this.messageCommande = `<div class="alert alert-danger" role="alert">
      remplir votre champ 
    </div>`
    } else {
   
      this.service.addAnnonce(model).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
        Message envoyer avec succe
      </div>`

          this.router.navigate(['/listeAnnonce']).then(()=>{window.location.reload()})
            ;
        },
        err => {
          this.messageCommande = `<div class="alert alert-warning" role="alert">
        service en panne!!!! 
      </div>`

        })
      setTimeout(() => {
        this.messageCommande = ""
      }, 3000);

    }
  }


  ngOnInit(): void {

  }
  onPropertyTypeChange(event: Event) {
    // Vous pouvez ajouter votre logique de traitement ici
    console.log('Type de propriété changé :', (event.target as HTMLInputElement).value);
  }
}
