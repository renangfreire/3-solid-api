export class UserAlreadyExists extends Error{
    constructor(){
        super("Already User exists!")
    }
}