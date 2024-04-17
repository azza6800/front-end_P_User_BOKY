import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Contact } from '../Entites/Contact.Entites';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  ContactForm:FormGroup
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      email: new FormControl('',[
          Validators.required,
        Validators.email]),
        sujet: new FormControl( '', [
          Validators.required,]),
          msg: new FormControl( '', [
            Validators.required,]),
    telephone: new FormControl( '', [
      Validators.required,]),}
     this.ContactForm = this.fb.group(formControls)
   }
   get email() {return this.ContactForm.get('email');}
  get sujet() {return this.ContactForm.get('sujet');}
  get msg() {return this.ContactForm.get('msg');}
  get telephone() { return this.ContactForm.get('telephone');}

   addNewContact() {
    let data = this.ContactForm.value;
    console.log(data);
    let contact = new Contact(
     undefined, data.email,data.sujet,data.msg,data.telephone,data.date);
    console.log(contact);

    if (
      data.email == 0 ||
      data.sujet == 0 ||
      data.msg == 0 ||
      data.telephone ==0
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Votre champs est obligatoire',
      });
    } else {
    this.service.addContact(contact).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Contact est ajouté avec succés',
        });

        this.router.navigate(['/listContact']);
      },
      err=>{
        console.log(err);
        this.toast.error({
          detail: 'Error Message',
          summary: 'Probléme de Serveur',
        }); }
    )

    }
  }

  //supprimer

    ngOnInit(): void {
    }



}
