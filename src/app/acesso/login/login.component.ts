import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {AutenticacaoService} from '../../autenticacao.service'
import mensagens from '../../../assets/json/mensagens.json'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() public exibirPainel:EventEmitter<boolean> = new EventEmitter();
  @Output() public erroValidacao:EventEmitter<boolean> = new EventEmitter();

  public formulario:FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  });
  constructor(private autenticacaoService:AutenticacaoService) {}

  ngOnInit() {
  }

  public exibirPainelCadastro():void {
    this.exibirPainel.emit(true);
  }

  public autenticar():void {
    if(this.formulario.valid) {
      this.autenticacaoService.autenticar(
        this.formulario.value.email, 
        this.formulario.value.senha);  
    } else {
      this.erroValidacao.emit(true);
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key).markAsTouched();
      });
    }
    
  }

  public possuiMensagemErro():boolean {
    return this.autenticacaoService.codigoErro != null;
  }

  public getMensagemErro():string {
    if(this.possuiMensagemErro()) {
      return mensagens[this.autenticacaoService.codigoErro];
    } else {
      return ''
    }
  }
}
