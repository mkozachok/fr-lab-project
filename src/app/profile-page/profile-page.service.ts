import { Injectable } from '@angular/core'

@Injectable()
export class ProfilePageService {
    getUser(){
        return {
            id: 1,
            firstName: 'Tom',
            lastName: 'Smith',
            email: 'tom.smith@gmail.com',
            password: 'qwerty123',
            deliveryAdress: {
                street: 'Baker',
                postalcode: 12598,
                contry: 'USA',
                state: 'Texas',
            }
        }    
    }
}