import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { MiservicioService } from '../../services/miservicio.service';

//Clases
import {Noticia} from '../../clases/noticia';
import {LS} from '../../clases/local_storage';

import { Text } from '@angular/compiler';
import { RegisterPage } from '../register/register';

import {GlobalVars} from '../../clases/global';
import { LoginPage } from '../login/login';
import { NoticiaPage } from '../noticia/noticia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  noticias = Array<Noticia>();

  constructor(public navCtrl: NavController,public globalVars:GlobalVars, private miservicio: MiservicioService, public alertCtrl: AlertController) {
    this.getNoticias();
  }

  getNoticias()
  {
    this.miservicio.getNoticias()
    .subscribe(
        data=> {
            data.items.forEach(ele => {
              this.noticias.push(new Noticia(
                ele.title,
                // data.feed.image,
                ele.thumbnail,
                ele.link,
                ele.description,
                ele.pubDate
              ));
            });
            this.getLikes();
        },
        error=>console.log('Server Error')
    );
  }

  getLikes()
  {
    let enviar = {
      id_usuario:(LS.get('token')?LS.get('token')['id']:-1),
      noticias:[]
    };
    this.noticias.forEach(ele=>{
      enviar.noticias.push(ele.link);
    });
    this.miservicio.post('getLikes',enviar).subscribe(
      data=>{
        data.noticias.forEach((item,indecs) => {
          this.noticias[indecs].likes = item;
          this.noticias[indecs].comentary = data.comentarios[indecs];
          item.forEach(subitem=>{
            if(subitem.usuario == 1)
            {
              this.noticias[indecs].like = true;
            }
          });
        });
      },
      error=>console.log('error D:')
    );
  }

  like(noticia:Noticia)
  {
    if(LS.get('token') == null)
    {
      /*No logueado*/
      let confirm = this.alertCtrl.create({
        title:'Ups.',
        message:'Inicia sesión para poder indicar que te gusta',
        buttons:[
          {
            text:'Mas tarde',
            handler:()=>{}
          },
          {
            text:'Iniciar Sesión',
            handler:()=>{
              this.navCtrl.push(LoginPage);
            }
          }
        ]
      });
      confirm.present();
    }
    else
    {
      let usuario = LS.get('token');
      this.miservicio.post('auth/like',{id_usuario:usuario['id'],link:noticia.link}).subscribe(
        data=>{
          noticia.likes.push({usuario:usuario['nombre']});
          noticia.like = true;
        },
        error=>{
          console.log('Error D:');
        }
      );
    }
  }

  dislike(noticia:Noticia)
  {
    let usuario = LS.get('token');
    this.miservicio.post('auth/dislike',{id_usuario:usuario['id'],link:noticia.link}).subscribe(
      data=>{
        noticia.likes.pop();
        noticia.like = false;
        console.log(data);
      },
      error=>{
        console.log('Error D:');
      }
    );
  }

  comentar(noticia:Noticia)
  {
    if(LS.get('token') == null)
    {
      /*No logueado*/
      let confirm = this.alertCtrl.create({
        title:'Ups.',
        message:'Inicia sesión para poder leer y hacer comentarios',
        buttons:[
          {
            text:'Mas tarde',
            handler:()=>{}
          },
          {
            text:'Iniciar Sesión',
            handler:()=>{
              this.navCtrl.push(LoginPage);
            }
          }
        ]
      });
      confirm.present();
    }
    else
    {
      this.navCtrl.push(NoticiaPage,{noticia:noticia});
    }
  }
}
