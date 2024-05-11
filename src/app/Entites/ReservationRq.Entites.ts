export class ReservationRq{
    constructor(
        public id?:number,
        public id_client?:number,
        public id_annonce?:number,
        public date_arrivee?:string,
        public date_depart?:string,
        public nb_nuit?:number,
        public nb_vacancier?:number,
        
    ){}
}