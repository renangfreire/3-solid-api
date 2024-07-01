import { GymRepository } from "@/repositories/@types/gym-repository"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository"
import { SearchGymService } from "@/services/searchGyms"

export function makeSearchGym(){
    const gymsRepository: GymRepository = new PrismaGymRepository()

    return new SearchGymService(gymsRepository)
}