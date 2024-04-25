import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Annonce } from '../Entites/Annonce.Entites';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent 
{
  messageCommande = ""
  AnnonceForm: FormGroup
  userFile: any
  message = ""
  imagePath: any
  imgURL: any
  listannonces: Annonce[]
  constructor(private services: CrudService, private router: Router, private fb: FormBuilder) {
    let formControls = {
      image: new FormControl('', [
        Validators.required,]),
      
      description: new FormControl('', [
        Validators.required,]),
      nom: new FormControl('', [
        Validators.required,]),

      prix: new FormControl('', [
        Validators.required,]),
        
   
     

    }
    this.CourForm = this.fb.group(formControls)
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
  get image() { return this.CourForm.get('image'); }
  get description() { return this.CourForm.get('description'); }

  get nom() { return this.CourForm.get('nom'); }

 
  get prix() { return this.CourForm.get('prix'); }
 
  addNewCour() {
    let datas=this.services.getUserInfo();
    let data = this.CourForm.value;
    console.log(data);
    let model: savecour= new savecour();
    model.id = null;
    model.image = this.imgURL;
    model.description = data.description;
    model.nom = data.nom;
    model.prix = data.prix;
    model.idFormateur =datas?.id
    console.log(model.idFormateur);
    if (
      data.image == 0 ||
      data.description == 0 ||
      data.nom==0||
      data.prix == 0 
      
      
    ) {
      this.messageCommande = `<div class="alert alert-danger" role="alert">
      remplir votre champ 
    </div>`


    
    } else {
   
      this.services.addCour(model).subscribe(
        res => {
          console.log(res);
          this.messageCommande = `<div class="alert alert-success" role="alert">
        Message envoyer avec succe
      </div>`

          this.router.navigate(['/listcours']).then(()=>{window.location.reload()})
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

}
