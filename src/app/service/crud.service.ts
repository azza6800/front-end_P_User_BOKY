import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Utilisateur } from '../Entites/Utilisateur.Entites';
import { Contact } from '../Entites/Contact.Entites';
import  {Observable} from 'rxjs';
import { Annonce } from '../Entites/Annonce.Entites';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  loginUserUrl="http://localhost:8081/api/Utilisateur/Login"
  apiUrl="http://localhost:8081/api"
  constructor(private http:HttpClient) { }
  //UtilisateurCrud
  addUtilisateur(utilisateur:Utilisateur)
   {
    return this.http.post<any>(this.apiUrl+"/Utilisateur/register",utilisateur);
   }
  loginUtilisateur(utilisateur:Utilisateur){
    return this.http.post<any>(this.loginUserUrl, utilisateur);
  }
  checkEmail(utilisateur:Utilisateur)
  {
    return this.http.post<any>(this.apiUrl+"/Utilisateur/checkEmail", utilisateur);
  }
  resetPassword(email:string,code:string,password:string)
  {
    return this.http.post<any>(this.apiUrl+"/Utilisateur/resetPassword", {email,code,password});
  }

  //ContactCrud
  addContact(contact:Contact)
   {
    return this.http.post<any>(this.apiUrl+"/Contact",contact);
   }
  onDeleteContact(id : number){
    const url =`${this.apiUrl+"/Contact"}/${id}` 
    return this.http.delete(url)
  }
  getContact(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl + "/Contact");
  }
  isLoggedIn(){

    let token = localStorage.getItem("myToken");

    if (token) {
      return true ;
    } else {
      return false;
    }
  }
  addAnnonce(annonce:Annonce)
   {
    return this.http.post<any>(this.apiUrl+"/annonce",annonce);
   }
   getAnnonce(): Observable<Annonce[]>{
    return this.http.get<Annonce[]>(this.apiUrl + "/annonce");
  }
  onDeleteAnnonce(id : number){
    const url =`${this.apiUrl+"/annonce"}/${id}` 
    return this.http.delete(url)
  }

  getUserInfo() {
    var token = localStorage.getItem("myToken");
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    var decoded: any
    return decodedToken?.data
  }
  isUtilisateurInIn(){

    let token = localStorage.getItem("myToken");
    if (token) {
      return true ;
    } else {
      return false;
    }
  }
}
