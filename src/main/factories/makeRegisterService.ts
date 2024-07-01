import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUserService } from "../../services/registerUser";

export function makeRegisterService(){
    const userRepository = new PrismaUserRepository();

    const registerUserService = new RegisterUserService(userRepository);
    
    return registerUserService
}