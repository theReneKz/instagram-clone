export class Publicacao {
    public email:string;
    public titulo:string;
    public data:number;
    public imagem:any;
    public url:string;
    public usuario:string;

    public getData():Date {
        if(this.data === undefined) {
            return new Date()
        } else {
            return new Date(this.data)
        }
    }
}