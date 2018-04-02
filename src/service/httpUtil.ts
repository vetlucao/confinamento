import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpUtil {
    constructor(private http: HttpClient) {

    }

    get(url: string, headers: any, callbackSucess, callbackError) {
        this.http.get(url, headers).subscribe(data => {
            callbackSucess(data);
        }, error => {
            callbackError(error);
        });
    }

    post(url: string, body: any, headers: any, callbackSucess, callbackError) {
        this.http.post(url, body, headers).subscribe(data => {
            callbackSucess(data);
        }, error => {
            callbackError(error);
        });
    }

    put(url: string, body: any, headers: any, callbackSucess, callbackError) {
        this.http.put(url, body, headers).subscribe(data => {
            callbackSucess(data);
        }, error => {
            callbackError(error);
        });
    }

    delete(url: string, params: any, headers: any, callbackSucess, callbackError) {
        this.http.delete(url, headers).subscribe(data => {
            callbackSucess(data);
        }, error => {
            callbackError(error);
        });
    }
}