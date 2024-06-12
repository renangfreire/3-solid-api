import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { GetUserMetricsService } from "@/services/getUserMetrics";
import {beforeEach, describe, expect, it } from "vitest";

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsService

async function defaultCreate(){
    const checkIn = await checkInRepository.create({
        user_id: "user-1",
        gym_id: "gym-1",
    })

    return {
        checkIn
    }
}

describe("Get User Metrics Service", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new GetUserMetricsService(checkInRepository);
    })  
        
    it("Should be able to get check ins count from metric", async () => {
        for(let i = 0; i < 4; i++){
            await checkInRepository.create({
                user_id: "user-1",
                gym_id: `gym-${i+1}`,
            })
        }

        const { checkInsCount } = await sut.handle({
            userId: "user-1", 
        })

        expect(checkInsCount).toEqual(4)
    })
})