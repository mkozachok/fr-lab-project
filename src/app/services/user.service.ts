import { Injectable } from '@angular/core'

@Injectable()
export class UserService {
    getUser(){
        return {
            id: 1,
            firstName: 'Tom',
            lastName: 'Smith',
            email: 'tom.smith@gmail.com',
            avatar: '/assets/images/avatars/myAvatar.png',
            products: ['T-shirt with label cat', 'Green cup with name']
        }    
    }
}