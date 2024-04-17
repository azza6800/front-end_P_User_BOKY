import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { AnnonceComponent } from './annonce/annonce.component';

const routes: Routes = [  
{path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'Contact',component:ContactComponent},
{path:'register',component:RegisterComponent},
{path:'annonce',component:AnnonceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
