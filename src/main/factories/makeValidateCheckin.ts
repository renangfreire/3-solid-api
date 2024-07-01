import { CheckInRepository } from "@/repositories/@types/check-in-repository"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { ValidateCheckInService } from "@/services/validateCheckIn"

export function makeValidateCheckIn(){
    const checkInRepository: CheckInRepository = new PrismaCheckInRepository()

    return new ValidateCheckInService(checkInRepository)
}