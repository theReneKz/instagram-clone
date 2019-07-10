import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'
import { delay } from 'q';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        'opacity':'1'
      })),
      state('erro', style({
        'opacity':'1'
      })),
      
      transition('void=>criado', [
        style({
          'opacity':'0',
          'transform':'translate(-50px,0px)'
        }),
        animate('500ms 0s ease-in-out')
      ]),
      
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        'opacity':'1'
      })),
      state('erro', style({
        'opacity':'1'
      })),
      transition('criado<=>erro',[
        style({
          'opacity':'1',
        }),
        animate('400ms 0s ease-in-out', keyframes([
          style({'offset':'0.14', 'opacity':'1', 'transform':'translateY(-10px)'}),
          style({'offset':'0.28', 'opacity':'1', 'transform':'translateY(10px)'}),
          style({'offset':'0.42', 'opacity':'1', 'transform':'translateY(-10px)'}),
          style({'offset':'0.56', 'opacity':'1', 'transform':'translateY(10px)'}),
          style({'offset':'0.70', 'opacity':'1', 'transform':'translateY(-10px)'}),
          style({'offset':'0.84', 'opacity':'1', 'transform':'translateY(10px)'}),
          style({'offset':'1',    'opacity':'1', 'transform':'translateX(0px)'})
        ]))
      ]),
      transition('void=>criado', [
        style({
          'opacity':'0',
          'transform':'translate(50px,0)'
        }),
        animate('1500ms 0s ease-in-out')
      ])
      
    ]),
  ]
})
export class AcessoComponent implements OnInit {
  public estadoBanner:string = 'criado';
  public estadoPainel:string = 'criado';

  public cadastro:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event:boolean):void {
    this.cadastro = event;
  }

  public chacoalha(event:boolean):void {
    if(this.estadoPainel == 'erro') {
      this.estadoPainel = 'criado'
    } else {
      this.estadoPainel = 'erro';
    }
    
    
    //this.estadoPainel = 'criado';
  }
}
