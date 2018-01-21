export class Noticia{
    title:string;
    image:string;
    link:string;
    description:string;
    date:string;
    like=false;
    likes=[];
    comentary=[];
    constructor(title:string,image:string,link:string,description:string,date:string){
        this.title = title;
        this.image = image;
        this.link = link;
        this.description = description;
        this.date = date;
    }
}