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
  helper=new JwtHelperService()
  //UtilisateurCrud
  addUtilisateur(utilisateur:Utilisateur)
   {
    return this.http.post<any>(this.apiUrl+"/Utilisateur",utilisateur);
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
    return this.http.get<Annonce[]>(this.apiUrl + "/Annonce");
  }
  getAnnonceById(id:number): Observable<Annonce>{
    return this.http.get<Annonce>(this.apiUrl + "/Annonce/"+id);
  }
  onDeleteAnnonce(id : number){
    const url =`${this.apiUrl+"/Annonce"}/${id}` 
    return this.http.delete(url)
  }
  getUtilisateur(): Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.apiUrl + "/Utilisateur");
  }
  updateUtilisateur(id:number,utilisateur: Utilisateur) {
    const url = `${this.apiUrl+"/Utilisateur"}/${id}`
    return this.http.put<any>(url, utilisateur);
  }
  findUtilisateurById(id : number): Observable<Utilisateur> {
    const url =`${this.apiUrl+"/Utilisateur"}/${id}`
    return this.http.get<Utilisateur>(url)
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
  
  userDetails(){
    let token:any=localStorage.getItem('myToken');
    let decodeToken= this.helper.decodeToken(token);
     return decodeToken.data;
   }
   
   onDeleteUtilisateur(id : number){
    const url =`${this.apiUrl+"/Utilisateur"}/${id}`
    return this.http.delete(url)
  }
  reserverFromApi(rq:any){
    return this.http.post<any>( "http://localhost:8081/api/Reservation" ,rq );
 }
  
}
