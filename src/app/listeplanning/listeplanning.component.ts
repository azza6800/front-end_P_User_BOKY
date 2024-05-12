import { Component } from '@angular/core';
import { Planning } from '../Entites/Planning.Entites';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-listeplanning',
  templateUrl: './listeplanning.component.html',
  styleUrls: ['./listeplanning.component.css']
})
export class ListeplanningComponent {

  listeplanning: Planning[];
  p: number = 1;
  planning: any;
  PlanningForm: FormGroup;
  updateForm: FormGroup;
  id: number;
  userDetails: any;

  constructor(
    private service: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute, // Utilisation d'ActivatedRoute
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {
    
    let formControles = {
      heureDisponible: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z A-Z .'-]+"),
        Validators.minLength(4),
      ]),
      jour: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      prixParHeure:new FormControl(['', Validators.required]) ,
    };
    this.updateForm = this.formBuilder.group(formControles);
  }
  get heureDisponible() {
    return this.updateForm.get('heureDisponible');
  }
  get jour() {
    return this.updateForm.get('jour');
  }
  get adresse() {
    return this.updateForm.get('adresse');
  }
  get prixParHeure() {
    return this.updateForm.get('prixParHeure');
  }
  
 

  ngOnInit(): void {
    this.userDetails = this.service.getUserInfo();
    let idEvent = this.activatedRoute.snapshot.params['id'];
    this.id = idEvent;
    this.service.findPlanningById(idEvent).subscribe((result) => {
      let event = result;
      console.log(event);
      this.updateForm.patchValue({
        heureDisponible: event.heureDisponible,
        jour: event.jour,
        adresse: event.adresse,
        prixParHeure: event.prixParHeure,
      });
    });
    this.PlanningForm = this.formBuilder.group({
      heureDisponible: ['', Validators.required], // Heure disponible
      jour: ['', Validators.required], // Jour
      adresse: ['', Validators.required], // Adresse
      prixParHeure: ['', Validators.required] // Prix par heure
    });
    this.service.listePlanificationByFdm(this.userDetails.id).subscribe(planning => {
      this.listeplanning = planning; 
    });
    

  }
  
  updateplanning(id: number, planning: Planning) {
    if (planning && planning.heureDisponible && planning.jour && planning.adresse && parseInt(planning.prixParHeure) > 0) {
        // Mettez à jour les valeurs dans votre formulaire
        this.updateForm.patchValue({
            heureDisponible: planning.heureDisponible,
            jour: planning.jour,
            adresse: planning.adresse,
            prixParHeure: planning.prixParHeure,
        });

        console.log("Planning avant modification :", planning); // Ajoutez cette ligne
        this.service.updatePlanning(id, planning).subscribe((res) => {
            console.log(res);
            this.router.navigate(['/listeplanning']);
        });
    } else {
        console.error("L'objet planning ou certaines propriétés nécessaires sont undefined ou invalides.");
    }
}

  
  


  logout(): void {
    console.log("logout");
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  modifierProfil(id: number): void {
    this.router.navigate(['/modifierprofil', id]);
  }
  DeletePlanning(planning: Planning) {
    if (confirm("Voulez-vous supprimer votre planning ?")) {
      this.service.onDeletePlanning(planning.id).subscribe(() => {
        this.router.navigate(['/listeplanning']).then(() => {
          window.location.reload();
        });
      });
    }
  }
  addNewPlanning() {
    if (this.PlanningForm.valid) {
      const data = this.PlanningForm.value;
      const planning = new Planning(undefined, data.heureDisponible, data.jour, data.adresse, data.prixParHeure,this.userDetails.id);

      this.service.addPlanning(planning).subscribe(
        () => {
          this.router.navigate(['/listeplanning']).then(() => {
            window.location.reload();
          });
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Le planning est ajouté avec succès',
          });
          
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error Message',
            summary: 'Problème de Serveur',
          });
        }
      );
    } else {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Veuillez remplir tous les champs obligatoires.',
      });
    }
  }
}
