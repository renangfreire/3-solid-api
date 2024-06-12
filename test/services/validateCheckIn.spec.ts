import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInCannotBeValidated } from "@/services/errors/CheckInCannotBeValidated";
import { ResourcesNotFound } from "@/services/errors/ResourcesNotFound";
import { ValidateCheckInService } from "@/services/validateCheckIn";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService

async function defaultCreate(){
    const checkIn = await checkInRepository.create({
        gym_id: "gym-1",
        user_id: "user-1"

       
    })

    return {
        checkIn
    }
}

describe("CheckIns Service", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new ValidateCheckInService(checkInRepository);

        vi.useFakeTimers()
    })

    afterEach(async () => {
        vi.useRealTimers()
    })

    it("Should be able to validate the check-in", async () => {
       const { checkIn } = await defaultCreate()

        const { checkInValidated } = await sut.handle({checkInId: checkIn.id})

        expect(checkInValidated.validated_at).toEqual(expect.any(Date))
    })

    it("Should not able to validate an inexistent check-in", async () => {
       await expect(() => sut.handle({checkInId: "inexistent-id"})).rejects.toStrictEqual({status: 400, body: new ResourcesNotFound()})
    })

    it("Should not able to validate the check-i after 20 minutes of creation", async () => {
        vi.setSystemTime(new Date(2024, 5, 10, 12, 0, 0))

        const { checkIn } = await defaultCreate()

        // vi.setSystemTime(new Date(2024, 5, 10, 12, 21, 0)) // Pode ser feita assim ou como a linha baixo
        vi.advanceTimersByTime(1000 * 60 * 21) // 21m

       await expect(() => sut.handle({checkInId: checkIn.id})).rejects.toStrictEqual({status: 401, body: new CheckInCannotBeValidated()})
    })
})