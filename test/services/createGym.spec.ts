import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymService } from "@/services/createGym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";

let sut: CreateGymService;
let inMemoryGymRepository: InMemoryGymRepository

describe("Create Gym Service", () => {

    beforeEach(() => {
        inMemoryGymRepository = new InMemoryGymRepository()
        sut = new CreateGymService(inMemoryGymRepository)
    })


    it("Should be able to create gym", async () => {
        const { gym } = await sut.handle({
            latitude: -23.5447319,
            longitude: -46.8737503,
            title: "John doe Gym",
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})