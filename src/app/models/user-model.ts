export class User {
    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private deliveryAdress: {
        street: string;
        postalcode: number;
        contry: string;
        state: string;
    }
}