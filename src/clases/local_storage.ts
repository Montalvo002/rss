export class LS{
    static set(nombre:string,objeto:object)
    {
        localStorage.setItem(nombre,JSON.stringify(objeto));
    }
    static get(nombre:string):object
    {
        return JSON.parse(localStorage.getItem(nombre));
    }
    static remove(nombre:string)
    {
        localStorage.removeItem(nombre);
    }
}