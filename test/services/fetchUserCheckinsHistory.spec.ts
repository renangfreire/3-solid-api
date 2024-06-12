import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { FetchMemberCheckInsHistoryService } from "@/services/fetchUserCheckinsHistory";
import {beforeEach, describe, expect, it } from "vitest";

let checkInRepository: InMemoryCheckInRepository
let sut: FetchMemberCheckInsHistoryService

async function defaultCreate(){
    const checkIn = await checkInRepository.create({
        user_id: "user-1",
        gym_id: "gym-1",
    })

    return {
        checkIn
    }
}

describe("Fetch CheckIn history Service", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new FetchMemberCheckInsHistoryService(checkInRepository);
        })  
        
    it("Should be able to user fetch all check ins", async () => {
        await defaultCreate()

        const { checkIns } = await sut.handle({userId: "user-1"})

        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: "gym-1",
            })
        ])

        expect(checkIns).toHaveLength(1)
    })

    it("Should be able fetch paginated check ins history", async () => {
        for(let i = 0; i < 22; i++){
            await checkInRepository.create({
                user_id: "user-1",
                gym_id: `gym-${i+1}`,
            })
        }

        const { checkIns } = await sut.handle({
            userId: "user-1", 
            page: 2
        })

        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: "gym-21",
            }),
            expect.objectContaining({
                gym_id: "gym-22",
            })
        ])

        expect(checkIns).toHaveLength(2)
    })
})