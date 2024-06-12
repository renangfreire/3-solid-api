import { env } from "@/main/config";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUserService } from "@/services/authenticateUser";

export function makeAuthenticateService(){
    // Pode não valer  a pena realizar esse ternário abaixo, motivo as vezes queremos testar de forma isolada alguma coisa, necessitando da conexão com o InMemory
    // Dentro do proprio teste, com isso perdemos o acesso ao inMemory, se quiser ver um exemplo vai no authenticateUser spec.
    const userRepository = env.NODE_ENV === "test" ? new InMemoryUserRepository() : new PrismaUserRepository();

    const authenticateUserService = new AuthenticateUserService(userRepository);

    return authenticateUserService
}