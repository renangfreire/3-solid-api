import { GymRepository } from "@/repositories/@types/gym-repository"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym.repository"
import { FetchNearByGymsService } from "@/services/fetchNearByGyms"

export function makeFetchNearByGyms(){
    const gymsRepository: GymRepository = new PrismaGymRepository()

    return new FetchNearByGymsService(gymsRepository)
}