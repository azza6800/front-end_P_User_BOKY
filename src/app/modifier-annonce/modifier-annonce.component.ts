import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';
import { Annonce } from '../Entites/Annonce.Entites';
import { Utilisateur } from '../Entites/Utilisateur.Entites';

interface EquipementInterface {
  name: string;
  checked: boolean;
}

const equipement_bd = [
  { name: 'Wi-Fi', checked: false },
  { name: 'Cuisine', checked: false },
  // Ajoutez d'autres équipements si nécessaire
];

const equipement_special_bd = [
  { name: 'Piscine privée', checked: false },
  { name: 'Jacuzzi', checked: false },
  // Ajoutez d'autres équipements spéciaux si nécessaire
];

const equipement_securite_bd = [
  { name: 'Système alarme', checked: false },
  { name: 'Caméras de surveillance', checked: false },
  // Ajoutez d'autres équipements de sécurité si nécessaire
];

@Component({
  selector: 'app-modifier-annonce',
  templateUrl: './modifier-annonce.component.html',
  styleUrls: ['./modifier-annonce.component.css']
})
export class ModifierAnnonceComponent {
  AnnonceForm: FormGroup;
  id: number;
  imagePath: any;
  imgURL: any;
  userFile: any;
  message = '';
  selectedFile: File | null = null;
  form: FormGroup;
  equipments: EquipementInterface[];
  equipmentsSpecail: EquipementInterface[];
  equipmentsSecurite: EquipementInterface[];
  result: {
    selectedEquip: EquipementInterface[];
  } = { selectedEquip: [] };
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  @ViewChild('quantityInput1') quantityInput1!: ElementRef;
  @ViewChild('quantityInput2') quantityInput2!: ElementRef;
  @ViewChild('quantityInput3') quantityInput3!: ElementRef;
  listeAnnonce: Annonce[]
  enableForm: boolean = true;
  enableForm2: boolean = true;
  Partie1Form: FormGroup;
  Partie2Form: FormGroup;
  selectedEquipNames:string[];
  selectedEquipSpecailNames: any;
  selectedEquipSecuriteNames: any;
  listtest:number[];

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {
    this.form = this.fb.group({
      equipments: this.fb.array([]),
      equipmentsSpecail: this.fb.array([]),
      equipmentsSecurite: this.fb.array([]),
    });
    this.createForms();
    this.loadAnnonceData();
  }

  ngOnInit(): void {
    this.equipments = equipement_bd;
    this.equipmentsSpecail = equipement_special_bd;
    this.equipmentsSecurite = equipement_securite_bd;
    // build reactive form skeleton
    this.form = new FormGroup({
      // control for Checkbox exemple
      equipments: new FormArray([]),
      equipmentsSpecail: new FormArray([]),
      equipmentsSecurite: new FormArray([]),
    });
    // bind existing value to form control
    this._patchValues(this.equipments, 'equipments');
    this._patchValues(this.equipmentsSpecail, 'equipmentsSpecail');
    this._patchValues(this.equipmentsSecurite, 'equipmentsSecurite');
  }

  createForms() {
    this.AnnonceForm = this.fb.group({
      titre: ['', Validators.required],
      reduction_semaine: [false, Validators.required],
      reduction_mois: [false, Validators.required],
      prix: ['', Validators.required],
      pays: ['', Validators.required],
      ville: ['', Validators.required],
      code_postale: ['', Validators.required],
      heure_depart: ['', Validators.required],
      heure_arriver: ['', Validators.required],
      // Add other form controls as needed
    });
  }
  
  loadAnnonceData() {
    const idEvent = this.route.snapshot.params['id'];
    this.id = idEvent;
    this.service.findAnnonceById(idEvent).subscribe((result) => {
      const event = result as Annonce;
      this.AnnonceForm.patchValue(event);
    });
  }

  updateAnnonce() {
    if (this.AnnonceForm.valid) {
      let data = this.AnnonceForm.value;
      // Handle updating the announcement
      // You can access form values using 'data'
    } else {
      this.toast.warning({ summary: 'Validation Error', detail: 'Please check your form fields.' });
    }
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
  
  get image() { return this.form.get('image'); }
  get titre() { return this.AnnonceForm.get('titre'); }
  get reduction_semaine() { return this.AnnonceForm.get('reduction_semaine'); }
  get reduction_mois() { return this.AnnonceForm.get('reduction_mois'); }
  get prix() { return this.AnnonceForm.get('prix'); }
  get pays() { return this.AnnonceForm.get('pays'); }
  get ville() { return this.AnnonceForm.get('ville'); }
  get code_postale() { return this.AnnonceForm.get('code_postale'); }
  get heure_depart() { return this.AnnonceForm.get('heure_depart'); }
  get heure_arriver() { return this.AnnonceForm.get('heure_arriver'); }


  // Méthodes get pour accéder aux contrôles du formulaire

  submitForm(): void {
    const { value } = this.form;
    // get selected equip from FormGroup value
    const selectedEquip = value?.equipments?.filter((f: EquipementInterface) => f.checked) || [];
    const selectedEquipSpecail = value?.equipmentsSpecail?.filter((f: EquipementInterface) => f.checked) || [];
    const selectedEquipSecurite = value?.equipmentsSecurite?.filter((f: EquipementInterface) => f.checked) || [];

    // Créer une nouvelle liste contenant uniquement les noms des équipements sélectionnés
    this.selectedEquipNames = selectedEquip.map((equip: EquipementInterface) => equip.name);
    this.selectedEquipSpecailNames = selectedEquipSpecail.map((equip: EquipementInterface) => equip.name);
    this.selectedEquipSecuriteNames = selectedEquipSecurite.map((equip: EquipementInterface) => equip.name);

    // Afficher la nouvelle liste de noms d'équipements sélectionnés
    console.log('selected equipment names: ', this.selectedEquipNames);
    console.log('selected equipment selectedEquipSpecailNames: ', this.selectedEquipSpecailNames);
    console.log('selected equipment selectedEquipSecuriteNames: ', this.selectedEquipSecuriteNames);
  }

  private _patchValues(equipments: EquipementInterface[], formControlName: string): void {
    // get array control
    const formArray = this.form.get(formControlName) as FormArray;
    // loop for each existing value
    equipments.forEach((equip) => {
      // add new control to FormArray
      formArray.push(
        // here the new FormControl with item value from equipement_bd
        new FormGroup({
          name: new FormControl(equip.name),
          checked: new FormControl(equip.checked),
        })
      );
    });
  }
  done() {
    this.submitForm();
    let data = this.Partie1Form.value;
    
    console.log("data avant "+data);
    this.listtest=[this.nb_chamber,this.nb_lits,this.nb_salles,this.nb_voyageur];
    console.log(data.type_d_hebergement,this.nb_voyageur,this.nb_chamber,this.nb_lits,this.nb_salles,data.description,);
    console.log("liste test: "+ this.listtest);
    console.log("image hathy : ",this.imgURL)
    
    if (
      data.type_d_hebergement == 0 ||
      data.description ==0 ||
      this.selectedEquipNames.length == 0 ||
      this.selectedEquipSpecailNames.length == 0 ||
      this.selectedEquipSecuriteNames.length == 0 
      

    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
      
  this.enableForm=false
      
      console.log(this.enableForm);
    }
  }
  onPropertyTypeChange(event: Event) {
    // Vous pouvez ajouter votre logique de traitement ici
    console.log('Type de propriété changé :', (event.target as HTMLInputElement).value);
  }
}
