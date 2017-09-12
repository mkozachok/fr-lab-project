import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserService {

    constructor(private _http: Http){}
/*     getUser(){
        return {
            id: 1,
            firstName: 'Tom',
            lastName: 'Smith',
            email: 'tom.smith@gmail.com',
            avatar: '/assets/images/avatars/myAvatar.png',
            products: ['T-shirt with label cat', 'Green cup with name']
        }    
    } */
    getUser(){
        return this._http.get('https://kolibri-7dd6a.firebaseio.com/user.json')
            .map(response => response.json());
    }

    setUser(firstName: string, lastName:string){
        const body = JSON.stringify({firstName: firstName, lastName: lastName});
        return this._http.put('https://kolibri-7dd6a.firebaseio.com/user.json', body)
            .map(response => response.json());
    }
}