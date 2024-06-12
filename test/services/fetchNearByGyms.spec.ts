import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { MaxCheckInsPerDay } from "@/services/errors/MaxCheckInsPerDay";
import { MaxDistance } from "@/services/errors/MaxDistance";
import { ResourcesNotFound } from "@/services/errors/ResourcesNotFound";
import { FetchNearByGymsService } from "@/services/fetchNearByGyms";
import { hash } from "bcryptjs";
import {beforeEach, describe, expect, it } from "vitest";

let gymRepository: InMemoryGymRepository
let sut: FetchNearByGymsService

async function defaultCreate(){
    await gymRepository.create({
        latitude: -23.5487319,
        longitude: -46.8437503,
        title: "John doe Gym (Near Gym)",
    })

    await gymRepository.create({
        latitude: -23.5447319,
        longitude: -46.8737503,
        title: "Javascript Gym (Near Gym)",
    })

    await gymRepository.create({
        latitude: -23.4447319,
        longitude: -46.5737503,
        title: "John doe Gym (Far Gym)",
    })

}

describe("Fetch Near By Gyms Service", () => {
    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository();
        sut = new FetchNearByGymsService(gymRepository);

    })

    it("Should be able to fetch near gyms", async () => {

       await defaultCreate()

        const { gyms } = await sut.handle({userLat: -23.54327319, userLong: -46.8537503, page: 1})
    
        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "John doe Gym (Near Gym)",
            }),
            expect.objectContaining({
                title: "Javascript Gym (Near Gym)",
            }),
        ])
    })

    it("Should not be able to fetch gyms with higher distance", async () => {
       await defaultCreate()

        const { gyms } = await sut.handle({userLat: -23.04327319, userLong: -46.0537503, page: 1})
    
        expect(gyms).toHaveLength(0)
    })
})