import { env } from "@/main/config";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUserService } from "../../services/registerUser";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";

export function makeRegisterService(){
    const userRepository = env.NODE_ENV === "test" ? new InMemoryUserRepository() : new PrismaUserRepository();

    const registerUserService = new RegisterUserService(userRepository);
    
    return registerUserService
}