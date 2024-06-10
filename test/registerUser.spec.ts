import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExists } from "@/services/errors/UserAlreadyExists";
import { RegisterUserService } from "@/services/registerUser";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";


describe("RegisterUser Service", () => {
    it("Should be able to register", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerService = new RegisterUserService(inMemoryUserRepository);

        const { user } = await registerService.handle({
            name: "John Doe",
            email: "Johndoe@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("Should hash user password upon registration", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerService = new RegisterUserService(inMemoryUserRepository);

        const { user } = await registerService.handle({
            name: "John Doe",
            email: "Johndoe@example.com",
            password: "123456"
        })

        const isPasswordHash = await compare('123456', user.password_hash);

        expect(isPasswordHash).toBe(true)
    })

    it("Should not be able to register with the same email twice", async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerService = new RegisterUserService(inMemoryUserRepository);

        await registerService.handle({
            name: "John Doe",
            email: "Johndoe@example.com",
            password: "123456"
        })

        await expect(() => 
            registerService.handle({
                name: "John Doe",
                email: "Johndoe@example.com",
                password: "123456"
            })
        ).rejects.toStrictEqual({status: 409, body: new UserAlreadyExists()})
    })
})