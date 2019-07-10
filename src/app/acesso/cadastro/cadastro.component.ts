import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {AutenticacaoService} from '../../autenticacao.service'
import {Usuario} from '../usuario.model'
import mensagens from '../../../assets/json/mensagens.json'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  @Output() public exibirPainel:EventEmitter<boolean> = new EventEmitter();
  @Output() public erroValidacao:EventEmitter<boolean> = new EventEmitter();

  public formulario:FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'nome_completo': new FormControl(null, [Validators.required]),
    'nome_usuario': new FormControl(null, Validators.required),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  });

  constructor(private autenticacaoService:AutenticacaoService) { }

  ngOnInit() {
  }
  public exibirPainelLogin():void {
    this.exibirPainel.emit(false);
  }

  public cadastrarUsuario():void {
    if(this.formulario.valid) {
      let usuario:Usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nome_completo,
        this.formulario.value.nome_usuario,
        this.formulario.value.senha
      );
      this.autenticacaoService.cadastrarUsuario(usuario)
        .then((resposta:any)=>{
          if(this.autenticacaoService.codigoErro == null) {
            this.exibirPainelLogin();
          }
        })
        .catch((erro:any)=>{console.log(erro)});
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
