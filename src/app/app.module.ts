import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { Header2Component } from './header2/header2.component';
import { RegisterComponent } from './register/register.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { ProfilComponent } from './profil/profil.component';
import { Header3Component } from './header3/header3.component';
import { AboutComponent } from './about/about.component';
import { ListeAnnonceComponent } from './liste-annonce/liste-annonce.component';
import { ChatComponent } from './chat/chat.component';
import { ListeAnnoncesPublicComponent } from './liste-annonces-public/liste-annonces-public.component';
import { VerificationEmailComponent } from './verification-email/verification-email.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';
import { ModifierprofilComponent } from './modifierprofil/modifierprofil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    Header2Component,
    RegisterComponent,
    AnnonceComponent,
    ProfilComponent,
    Header3Component,
    AboutComponent,
    ListeAnnonceComponent,
    ChatComponent,
    ListeAnnoncesPublicComponent,
    VerificationEmailComponent,
    ChangerMotDePasseComponent,
    ModifierprofilComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
