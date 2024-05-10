export class Utilisateur{
    constructor(
        public id?:number,
        public nom?:string,
        public prenom?:string,
        public email?:string,
        public date_de_naissance?:string,
        public telephone?:string,
        public adresse?:string,
        public mdp?:string,
        public role?:string,
        public etat?:boolean ,
        public photo?:string
    ){}
}