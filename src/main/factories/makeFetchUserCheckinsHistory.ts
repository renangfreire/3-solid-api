import { CheckInRepository } from "@/repositories/@types/check-in-repository"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { FetchUserCheckInsHistoryService } from "@/services/fetchUserCheckinsHistory"

export function makeFetchUserCheckInsHistory(){
    const checkInRepository: CheckInRepository = new PrismaCheckInRepository()

    return new FetchUserCheckInsHistoryService(checkInRepository)
}