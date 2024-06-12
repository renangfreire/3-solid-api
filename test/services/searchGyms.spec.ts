import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymService } from "@/services/createGym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { SearchGymService } from "@/services/searchGyms";

let sut: SearchGymService;
let inMemoryGymRepository: InMemoryGymRepository

describe("Search Gyms Service", () => {

    beforeEach(() => {
        inMemoryGymRepository = new InMemoryGymRepository()
        sut = new SearchGymService(inMemoryGymRepository)
    })


    it("Should be able to search for gyms by title", async () => {
        await inMemoryGymRepository.create({
                latitude: -23.5447319,
                longitude: -46.8737503,
                title: "John doe Gym",
        })

        const { gyms } = await sut.handle({query: "John doe", page: 1})

        expect(gyms).toEqual([
            expect.objectContaining({
                title: "John doe Gym",
            })
        ])
    })

    it("Should be able fetch paginated gyms by title", async () => {
        for(let i = 0; i < 22; i++){
            await inMemoryGymRepository.create({
                title: `John Doe Gym ${i+1}`,
                latitude: -23.5447319,
                longitude: -46.8737503,
            })
        }

        const { gyms } = await sut.handle({query: "John Doe", page: 2})

        expect(gyms).toEqual([
            expect.objectContaining({
                title: "John Doe Gym 21",
            }),
            expect.objectContaining({
                title: "John Doe Gym 22",
            }),
        ])

        expect(gyms).toHaveLength(2)
    })
})