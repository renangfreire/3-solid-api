import { UserAlreadyExists } from "@/services/errors/UserAlreadyExists";
import { makeRegisterService } from "@/main/factories/makeRegisterService";
import { RegisterUserService } from "@/services/registerUser";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let sut: RegisterUserService;

describe("RegisterUser Service", () => {

    beforeEach(() => {
        sut = makeRegisterService()
    })


    it("Should be able to register", async () => {
        const { user } = await sut.handle({
            name: "John Doe",
            email: "Johndoe@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("Should hash user password upon registration", async () => {
        const { user } = await sut.handle({
            name: "John Doe",
            email: "Johndoe@example.com",
            password: "123456"
        })

        const isPasswordHash = await compare('123456', user.password_hash);

        expect(isPasswordHash).toBe(true)
    })

    it("Should not be able to register with the same email twice", async () => {
        await sut.handle({
            name: "John Doe",
            email: "Johndoe@example.com",
            password: "123456"
        })

        await expect(() => 
            sut.handle({
                name: "John Doe",
                email: "Johndoe@example.com",
                password: "123456"
            })
        ).rejects.toStrictEqual({status: 409, body: new UserAlreadyExists()})
    })
})