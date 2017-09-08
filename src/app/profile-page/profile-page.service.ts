import { Injectable } from '@angular/core'

@Injectable()
export class ProfilePageService {
    getUser(){
        return {
            id: 1,
            firstName: 'Tom',
            lastName: 'Smith',
            email: 'tom.smith@gmail.com',
            products: ['T-shirt with label cat', 'Green cup with name']
        }    
    }
}