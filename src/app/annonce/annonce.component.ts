import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  @ViewChild('quantityInput1') quantityInput1!: ElementRef;
  @ViewChild('quantityInput2') quantityInput2!: ElementRef;
  @ViewChild('quantityInput3') quantityInput3!: ElementRef;
  listeAnnonce: Annonce[]
  enableForm: boolean = true;
  enableForm2: boolean = true;
  Partie1Form: FormGroup;
  Partie2Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,private toast:NgToastService
  ) {
    let formControlP1= {
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
      description: new FormControl( '', [
        Validators.required,]),
    }
    let formControlP2 = {
      equipement: new FormControl( '', [
        Validators.required,]),
    equipement_specail: new FormControl( '', [
          Validators.required,]),
    equipement_securite: new FormControl( '', [
            Validators.required,]),
            image: new FormControl( '', [
              Validators.required,]),
      
    }
    let formControls = {
 
      
      
       titre: new FormControl( '', [
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
      ville: new FormControl( '', [
          Validators.required,]),
      code_postale: new FormControl( '', [
          Validators.required,]),
       heure_depart: new FormControl( '', [
          Validators.required,]),
      heure_arriver: new FormControl( '', [
          Validators.required,]),}
                    
    this.AnnonceForm = this.fb.group(formControls)
    this.Partie1Form = this.fb.group(formControlP1)
    this.Partie2Form = this.fb.group(formControlP2)
     
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
  get type_d_hebergement() { return this.Partie1Form.get('type_d_hebergement'); }
  get nb_voyageur() 
  { const value = this.quantityInput.nativeElement.value;
    return value; }
  get nb_chamber() { const value = this.quantityInput1 ? this.quantityInput1.nativeElement.value : '';
    return value; }
  get nb_lits() { const value = this.quantityInput2.nativeElement.value;
    return value;}
  get nb_salles() { const value = this.quantityInput3 ? this.quantityInput1.nativeElement.value : ''
    return value; }
  get description() { return this.Partie1Form.get('description'); }
  get equipement() { return this.Partie2Form.get('equipement'); }
  get equipement_specail() { return this.Partie2Form.get('equipement_specail'); }
  get equipement_securite() { return this.Partie2Form.get('equipement_securite'); } 
  get image() { return this.AnnonceForm.get('image'); }
  get titre() { return this.AnnonceForm.get('titre'); }
  get mode_de_confirmation() { return this.AnnonceForm.get('mode_de_confirmation'); }
  get frais_de_service() { return this.AnnonceForm.get('frais_de_service'); }
  get reduction_semaine() { return this.AnnonceForm.get('reduction_semaine'); }
  get reduction_mois() { return this.AnnonceForm.get('reduction_mois'); }
  get prix() { return this.AnnonceForm.get('prix'); }
  get pays() { return this.AnnonceForm.get('pays'); }
  get etat() { return this.AnnonceForm.get('etat'); }
  get ville() { return this.AnnonceForm.get('ville'); }
  get code_postale() { return this.AnnonceForm.get('code_postale'); }
  get heure_depart() { return this.AnnonceForm.get('heure_depart'); }
  get heure_arriver() { return this.AnnonceForm.get('heure_arriver'); }

  done() {
    let data = this.Partie1Form.value;
    
    console.log("data avant "+data);
    console.log(data.type_d_hebergement,this.nb_voyageur,this.nb_chamber,this.nb_lits,this.nb_salles,data.description);
    console.log("data apres : "+ data);
    if (
      data.type_d_hebergement == 0 ||
      
      data.description ==0
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
  
      this.enableForm = false
      console.log(this.enableForm);
    }
  }
    

  // Méthode pour récupérer la valeur de l'input
  getValue(): number {
    const value = this.quantityInput.nativeElement.value;
    return value; // ou utilisez la valeur comme vous le souhaitez
  }
  addNewAnnonce() {
    let datas=this.service.getUserInfo();
    let data = this.AnnonceForm.value;
    let data1 = this.Partie1Form.value;
    let data2 = this.Partie2Form.value;
    console.log(data);
    console.log(data1);
    console.log(data2);
    let model: Saveannonce= new Saveannonce();
    model.id = null;
    model.type_d_hebergement=data1.type_d_hebergement;
       model.nb_voyageur= data1.nb_voyageur;
       model.nb_chamber=data1.nb_chamber;
       model.nb_lits=data1.nb_lits;
       model.nb_salles=data1.nb_salles;
      model.equipement=data2.equipement;
       model.equipement_specail=data2.equipement_specail;
      model.equipement_securite=data2.equipement_securite;
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
      model.ville=data.ville;
      model.code_postale=data.code_postale;
      model.heure_depart=data.heure_depart;
      model.heure_arriver=data.heure_arriver;
      model.id_annonceur=datas?.id;
      console.log(model.id_annonceur);
  
      if (
      data1.type_d_hebergement == 0 ||
      data1.nb_voyageur == 0 ||
      data1.nb_chamber == 0 ||
      data1.nb_lits == 0 ||
      data1.nb_salles == 0 ||
      data2.equipement == 0 ||
      data2.equipement_specail == 0 ||
      data2.equipement_securite == 0 ||
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
      data.ville == 0 ||
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
