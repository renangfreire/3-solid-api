import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUserService } from "@/services/authenticateUser";
import { InvalidCredentials } from "@/services/errors/InvalidCredentials";
import { compare, hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryUserRepository: InMemoryUserRepository
let sut: AuthenticateUserService;

describe("Authenticate User Service", () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository();
        sut = new AuthenticateUserService(inMemoryUserRepository);
    })

    it("Should be able to authenticate", async () => {
        /*
            Ponto importante: Como aqui estamos lidando com casos unitários, não podemos testar 2 pontos do app ao mesmo tempo, ou seja, para testar a authenticação chamar o serviço de Register, 
            não é interessante isso, a forma ideal envir os dados de forma direta para o repositório, 
        */

       
        // sut => (System under test) Pattern - Váriavel que está sendo testada nesse caso.

        const userCreated = await inMemoryUserRepository.create({
            name: "John Doe",
            email: "Johndoe@example.com",
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.handle({
            email: "Johndoe@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(userCreated.id);
    })

    it("Should not able to authenticate with wrong password", async () => {
        await inMemoryUserRepository.create({
            name: "John Doe",
            email: "Johndoe@example.com",
            password_hash: await hash('123456', 6)
        })

        await expect(() => 
            sut.handle({
                email: "Johndoe@example.com",
                password: "isWrongPassword"
            })
        ).rejects.toStrictEqual({status: 400, body: new InvalidCredentials()})
    })

    it("Should not able to authenticate with wrong email", async () => {
        await expect(() => 
            sut.handle({
                email: "Johndoe@example.com",
                password: "123456"
            })
        ).rejects.toStrictEqual({status: 400, body: new InvalidCredentials()})
    })
})