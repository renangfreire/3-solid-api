import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UsersRepository } from "@/repositories/@types/user-repository";
import { hash } from "bcryptjs"
import { conflict } from "./helpers/HTTPHelpers";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";

interface RegisterUserServiceRequest {
    name: string,
    email: string,
    password: string
}

// D - Dependency Inversion Principle
export class RegisterUserService{
    // Agora o serviço que recebe sua dependecia
    constructor(private userRepository: UsersRepository){}

    async handle({name, email, password}: RegisterUserServiceRequest) {
        const password_hash = await hash(password, 6);

        const existsUserWithSameEmail = await this.userRepository.findByEmail(email);

        if(existsUserWithSameEmail){
            throw conflict(new UserAlreadyExists())
        }
    
        const user = await this.userRepository.create({name, email, password_hash});

        return { 
            user
        }
    }
}