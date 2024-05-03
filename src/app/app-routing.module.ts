import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { ProfilComponent } from './profil/profil.component';
import { AboutComponent } from './about/about.component';
import { ChatComponent } from './chat/chat.component';
import { ListeAnnonceComponent } from './liste-annonce/liste-annonce.component';
import { ListeAnnoncesPublicComponent } from './liste-annonces-public/liste-annonces-public.component';
import { VerificationEmailComponent } from './verification-email/verification-email.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';

const routes: Routes = [  
{path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'Contact',component:ContactComponent},
{path:'register',component:RegisterComponent},
{path:'annonce',component:AnnonceComponent},
{path:'profil',component:ProfilComponent},
{path:'about',component:AboutComponent},
{path:'liste_annonce',component:ListeAnnonceComponent},
{path:"chat",component:ChatComponent},
{path:"liste_annonces_public",component:ListeAnnoncesPublicComponent},
{path:"verification_email",component:VerificationEmailComponent},
{path:"reset_mdp",component:ChangerMotDePasseComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
