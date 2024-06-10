import { env } from "@/main/config";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUserService } from "@/services/authenticateUser";

export function makeRegisterService(){
    const userRepository = env.NODE_ENV === "test" ? new InMemoryUserRepository() : new PrismaUserRepository();

    const authenticateUserService = new AuthenticateUserService(userRepository);

    return authenticateUserService
}