import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { ResourcesNotFound } from "@/services/errors/ResourcesNotFound";
import { GetUserProfileService } from "@/services/getUserProfile";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserProfileService;

describe("Get Profile User Service", () => {

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository();
        sut = new GetUserProfileService(inMemoryUserRepository);
    })

    it("Should be able to get profile", async () => {
        const { id: userId } = await inMemoryUserRepository.create({
            name: "John Doe",
            email: "Johndoe@example.com",
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.handle({
            userId
        })

        expect(user.id).toEqual(expect.any(String));
    })

    it("Should not able to get profile with wrong id", async () => {
        await expect(() => 
            sut.handle({
                userId: "non-exists-id"
            }
        )).rejects.toStrictEqual({status: 400, body: new ResourcesNotFound()})
    })
})

