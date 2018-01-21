import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MiservicioService {
    apiurl = 'http://montalbot.esy.es/api/?u=';

    constructor(private http: Http){}

    getNoticias(): Observable<any> {
        var header = new Headers;
        header.append('content-type','application/xml');
        return this.http.get("https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/mundo/rss.xml")
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    register(datos:object): Observable<any>{
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        let body = JSON.stringify(datos);
        return this.http.post(this.apiurl+"auth/signIn", body, {headers: headers}).map(response => response.json());
    }

    login(datos:object): Observable<any>{
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        let body = JSON.stringify(datos);
        return this.http.post(this.apiurl+"auth/logIn", body, {headers: headers}).map(response => response.json());
    }

    post(url:string,datos:object): Observable<any>{
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        let body = JSON.stringify(datos);
        return this.http.post(this.apiurl+url, body, {headers: headers}).map(response => response.json());
    }
}
