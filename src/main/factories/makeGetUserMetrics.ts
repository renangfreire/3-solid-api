import { CheckInRepository } from "@/repositories/@types/check-in-repository"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { GetUserMetricsService } from "@/services/getUserMetrics"

export function makeGetUserMetrics(){
    const checkInRepository: CheckInRepository = new PrismaCheckInRepository()

    return new GetUserMetricsService(checkInRepository)
}