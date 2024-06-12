export class MaxCheckInsPerDay extends Error{
    constructor(){
        super("Max number of check ins reached")
    }
}