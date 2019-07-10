import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription, interval} from 'rxjs'
import {trigger, state, style, transition, animate} from '@angular/animations'
import {Imagem} from './imagem.model'
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations:[
    trigger('banner', [
      state('escondido', style({
        'opacity':'0'
      })),
      state('visivel', style({
        'opacity':'1'
      })),
      transition('escondido<=>visivel', animate('1s ease-in')),
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado:number = 0;
  private tempoSubscription:Subscription;
  public imagens:Imagem[] = [
    {estado:'visivel', url:'../../../assets/banner-acesso/img_1.png'},
    {estado:'escondido', url:'../../../assets/banner-acesso/img_2.png'},
    {estado:'escondido', url:'../../../assets/banner-acesso/img_3.png'},
    {estado:'escondido', url:'../../../assets/banner-acesso/img_4.png'},
    {estado:'escondido', url:'../../../assets/banner-acesso/img_5.png'}
  ]
  constructor() { }

  ngOnInit() {
    let intervalo= interval(3000);

    this.tempoSubscription = intervalo.subscribe(
      ()=>{ this.logicaRotacao()}
    );
  }

  ngOnDestroy() {
    this.tempoSubscription.unsubscribe();
  }

  public logicaRotacao():void {
    this.imagens[this.estado].estado = 'escondido';
    this.estado++;
    if(this.estado == this.imagens.length) {
      this.estado = 0;
    }
    this.imagens[this.estado].estado = 'visivel';

  }
}
