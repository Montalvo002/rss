import {ToastController} from 'ionic-angular';
export class Utiles{
    constructor(public toastCtrl:ToastController)
    {

    }
    toast(mensaje:string,segundos:number){
        let toast = this.toastCtrl.create({
            message:mensaje,
            duration:segundos*1000
        });
        toast.present();
        console.log('desde clase');
    }
}