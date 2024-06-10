import { UsersRepository } from "@/repositories/@types/user-repository";
import { badRequest } from "./helpers/HTTPHelpers";
import { InvalidCredentials } from "./errors/InvalidCredentials";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest{
    email: string
    password: string
}

export class AuthenticateUserService{
    constructor(
        private userRepository: UsersRepository
    ){}

    async handle({email, password}: AuthenticateServiceRequest){
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw badRequest(new InvalidCredentials())
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if(!doesPasswordMatches){
            throw badRequest(new InvalidCredentials())
        }

        return {
            user
        }
    }
}