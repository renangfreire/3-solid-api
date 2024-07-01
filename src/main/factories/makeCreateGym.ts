import { GymRepository } from "@/repositories/@types/gym-repository"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository"
import { CreateGymService } from "@/services/createGym"

export function makeCreateGym(){
    const gymsRepository: GymRepository = new PrismaGymRepository()

    return new CreateGymService(gymsRepository)
}