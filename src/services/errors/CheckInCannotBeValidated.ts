export class CheckInCannotBeValidated extends Error{
    constructor(){
        super("Check-in caan only be validated until 20 minutes after creation")
    }
}