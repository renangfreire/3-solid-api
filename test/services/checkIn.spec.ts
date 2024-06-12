import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { CheckInService } from "@/services/checkin";
import { MaxCheckInsPerDay } from "@/services/errors/MaxCheckInsPerDay";
import { MaxDistance } from "@/services/errors/MaxDistance";
import { ResourcesNotFound } from "@/services/errors/ResourcesNotFound";
import { hash } from "bcryptjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let checkInRepository: InMemoryCheckInRepository
let userRepository: InMemoryUserRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInService

async function defaultCreate(){
    const gym = await gymRepository.create({
        latitude: -23.5447319,
        longitude: -46.8737503,
        title: "John doe Gym",
    })

    const user = await userRepository.create({
        name: "John Doe",
        email: "Johndoe@example.com",
        password_hash: await hash('123456', 6)
    })

    return {
        gym,
        user
    }
}

describe("CheckIns Service", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        userRepository = new InMemoryUserRepository();
        gymRepository = new InMemoryGymRepository();
        sut = new CheckInService(userRepository, checkInRepository, gymRepository);

        vi.useFakeTimers()

    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("Should be able to check in", async () => {
        vi.setSystemTime(new Date(2024, 5, 10, 12, 0, 0))

       const { user, gym } = await defaultCreate()

        const { checkIn } = await sut.handle({userId: user.id, gymId: gym.id, userLat: -23.5447319, userLong: -46.8737503})

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("Should not able to check in without user", async () => {
        vi.setSystemTime(new Date(2024, 5, 10, 12, 0, 0))

        await expect(() => sut.handle({userId: "non-exist-user-id", gymId: "gym-id", userLat: -23.5447319, userLong: -46.8737503}))
        .rejects.toStrictEqual(
            {
                status: 400, 
                body: new ResourcesNotFound()
            })
    })

    it("Should not able to create two check ins on same day", async () => {
        vi.setSystemTime(new Date(2024, 5, 10, 12, 0, 0))

        const { user, gym } = await defaultCreate()
        
        await sut.handle({userId: user.id, gymId: gym.id, userLat: -23.5447319, userLong: -46.8737503})

        await expect(() => sut.handle({userId: user.id, gymId: gym.id, userLat: -23.5447319, userLong: -46.8737503})).rejects.toStrictEqual({status: 400, body: new MaxCheckInsPerDay()})
    })

    it("Should be able to create two check ins but in different days", async () => {
        vi.setSystemTime(new Date(2024, 5, 10, 12, 0, 0))

        const { user, gym } = await defaultCreate()
        
        await sut.handle({userId: user.id, gymId: gym.id, userLat: -23.5447319, userLong: -46.8737503})

        vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0))

        const { checkIn } = await sut.handle({userId: user.id, gymId: gym.id, userLat: -23.5447319, userLong: -46.8737503})

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("Should not able to create check in on distant gym", async () => {
        vi.setSystemTime(new Date(2024, 5, 15, 12, 0, 0))

        const { user, gym } = await defaultCreate()

        await expect(() => sut.handle({userId: user.id, gymId: gym.id, userLat: -23.5198664, userLong: -46.8459137})).rejects.toStrictEqual({status: 400, body: new MaxDistance()})
    })
})