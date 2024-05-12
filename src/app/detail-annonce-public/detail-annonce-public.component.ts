import { Component } from '@angular/core';
import { Annonce } from '../Entites/Annonce.Entites';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Utilisateur } from '../Entites/Utilisateur.Entites';
import { ReservationRq } from '../Entites/ReservationRq.Entites';


@Component({
  selector: 'app-detail-annonce-public',
  templateUrl: './detail-annonce-public.component.html',
  styleUrls: ['./detail-annonce-public.component.css']
})
export class DetailAnnoncePublicComponent {
  messageCommande="";
  annonce: Annonce;
  listAnnonce: Utilisateur[];
  annonceur:Utilisateur;
  p:number=1;
  nbannonce:number;
  id: number;
  collection:any[]
  enableForm: boolean = true;
  currentDateArrivee: string;
  currentDateDepart:String;
  numberOfNights: number;
  prix:number;
  checkoutParentGroup: FormGroup;
  prixsemaine: number;
  prixmois: number;
  reservation:ReservationRq;
  paymentHandler: any = null;
  IsloggedIn:boolean

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private route: Router,
    private router: ActivatedRoute,private toast:NgToastService,
    

  ) { 
    let formControls = {
      date_arrivee: new FormControl('',[
        Validators.required,
        
      ]),
      date_depart: new FormControl('',[
        Validators.required,
        
      ]),
      nb_vacancier: new FormControl('',[
        Validators.required,
        
      ])
    }
    this.checkoutParentGroup = this.fb.group(formControls)
    this.checkoutParentGroup.controls['date_arrivee'].valueChanges.subscribe((value) => {
      this.currentDateArrivee = value;
      this.calculateNumberOfNights();

    });
    this.checkoutParentGroup.controls['date_depart'].valueChanges.subscribe((value) => {
      this.currentDateDepart = value;
      this.calculateNumberOfNights();

    });
  }
  get date_arrivee() { return this.checkoutParentGroup.get('date_arrivee') }
   get date_depart() { return this.checkoutParentGroup.get('date_depart') }
   get nb_vacancier(){
    return this.checkoutParentGroup.get('nb_vacancier')
  }
  done() {
    let data = this.checkoutParentGroup.value;
    
    if (
      !this.IsloggedIn
      
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Authentifiez-vous avant de réserver.',
      });
      this.connexion();
      
    } else
     { 
      if (data.date_arrivée == 0 ||
        data.date_depart==0 ||
        data.nb_vacancier ==0) 
        {
          this.toast.info({
            detail: 'Error Message',
            summary: 'Remplir votre champs',
          });
       }else {
        const dateArrivee = this.date_arrivee?.value;
        const dateDepart = this.date_depart?.value;
        const nbVacancier = this.nb_vacancier?.value;
        // Passer les valeurs extraites au constructeur de ReservationRq
        this.reservation = new ReservationRq(null, this.annonceur.id, this.annonce.id, dateArrivee, dateDepart, this.numberOfNights, nbVacancier);
        console.log("nchlh temchy : ",this.reservation);
        this.enableForm = false;
      }
      
    }
    }
  reserver(event:any)
  {
    this.messageCommande=`<div class="alert alert-primary" role="alert">
    Veuillez patienter ...
  </div>`
    console.log(event)
    let datas=this.service.getUserInfo()
    let rq:any={}
    rq.id_client=datas?.id 
    rq.id_annonce=event.id
   
    console.log(rq,"what we senddddd")
    this.service.reserverFromApi(rq).subscribe((data:any)=>{
      this.route.navigate(['mes-reservations'])
    
      this.messageCommande=`<div class="alert alert-success" role="alert">
    Réservé avec succès
  </div>`
    }, err=>{
      this.messageCommande=`<div class="alert alert-warning" role="alert">
     Erreur, Veuillez réssayer !! 
    </div>`

    })
    setTimeout(() => {
      this.messageCommande=""
    }, 3000);
  }

    connexion()
    {
      this.route.navigate(['/login'])
    }
    calculateTotalPrice(price: number, numberOfNights: number) {
      this.prixsemaine = price * numberOfNights;
    }
    calculateNumberOfNights() {
      if (this.currentDateArrivee && this.currentDateDepart) {
        const arrivalDate = new Date(this.currentDateArrivee);
        const departureDate = new Date(this.currentDateDepart.toString());
        const differenceInTime = departureDate.getTime() - arrivalDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        this.numberOfNights = differenceInDays;
       
        const price = parseFloat(this.annonce.prix);
        console.log("prix hatha" ,price)
        this.prix =price*this.numberOfNights;
        this.prixsemaine=this.prix-(this.prix*7)/100;
        this.prixmois=this.prix-(this.prix*15)/100;
    console.log("prix totale  hatha" ,price * this.numberOfNights)
        
      }
    }
    
    
  ngOnInit(): void {
    this.IsloggedIn=this.service.isLoggedIn();

    let idEvent = this.router.snapshot.params['id'];
    this.id = idEvent;
    console.log(this.id);
    console.log("hatha annonceur :",this.annonceur)
    
    console.log("hatha list annonce:",this.listAnnonce)
    
    this.service.getUtilisateurByAnnonce(this.id).subscribe(annonceur => {
      this.annonceur = annonceur;
      this.service.listeAnnonceByAnnonceur(annonceur.id).subscribe(listAnnonce => {
      
        this.nbannonce = listAnnonce.length;
        console.log("hatha list annonce:",this.listAnnonce)
      })
      console.log("hatha annonceur :",annonceur)
    })
    this.service.getAnnonceById(this.id).subscribe(annonce => {
      this.annonce = annonce
      console.log("hatha id annonce :",annonce.id)
      console.log("hatha annonceur :",this.annonceur)
      
    })
    this.invokeStripe();

    
    
  
}
makePayment() {
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51PFI24F29zVOYaoLNwA55lQnMETgMsgILXooIySTysEtaUYck09EzbfHklFnfQQm2zmmtZam1Ss796gimwKUNUv4006HgVUZXa',
    locale: 'auto',
    token: function (stripeToken: any) {
      console.log(stripeToken);
      alert('Stripe token generated!');
    },
  });
  paymentHandler.open({
    name: '',
    description: '',
 
  });
}
invokeStripe() {
  if (!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement('script');
    script.id = 'stripe-script';
    script.type = 'text/javascript';
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51PFI24F29zVOYaoLNwA55lQnMETgMsgILXooIySTysEtaUYck09EzbfHklFnfQQm2zmmtZam1Ss796gimwKUNUv4006HgVUZXa',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          alert('Payment effectuée avec success!');
          this.reserver(this.reservation);
        },
      });
    };
    window.document.body.appendChild(script);
  }
}
}
