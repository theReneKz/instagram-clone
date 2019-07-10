export class ProgressoService {
    public status:string = 'pendente';
    public estado:any
    public porcentagem:number = 0;

    public restartProgresso():void {
        this.status = 'pendente';
    }

    public progressoEmAndamento():void {
        this.status = 'andamento';
    }

    public finalizarProgresso():void {
        this.status = 'completo';
    }

    public erroProcesso():void {
        this.status = 'erro';
    }

}