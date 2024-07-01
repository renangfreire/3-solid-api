import { CheckInRepository } from "@/repositories/@types/check-in-repository"
import { GymRepository } from "@/repositories/@types/gym-repository"
import { UsersRepository } from "@/repositories/@types/user-repository"
import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { CheckInService } from "@/services/checkin"

export function makeCheckInService(){
    const userRepository: UsersRepository = new PrismaUserRepository()
    const checkInRepository: CheckInRepository = new PrismaCheckInRepository()
    const gymsRepository: GymRepository = new PrismaGymRepository()

    return new CheckInService(userRepository, checkInRepository, gymsRepository)
}