import { Gym, Prisma } from "@prisma/client";
import { FindManyNearByParams, GymRepository } from "../@types/gym-repository";
import { prisma } from "@/main/config/prisma";

export class PrismaGymRepository implements GymRepository {
    async create(data: Prisma.GymUncheckedCreateInput) {
        const gym = await prisma.gym.create({
            data
        })
        
        return gym
    }
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id
            }
        })

        return gym
    }

    async findManyNearBy({latitude, longitude, page}: FindManyNearByParams) {
        // Melhorar aqui: Adicionar de forma virtual os elementos de distancia, realizar o filtro, trazer de forma ordenada e paginada para o front end
        // Codigo base para utilizar
        
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }

    async searchMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            take: 20,
            skip: (page-1) * 20
        })

        return gyms
    }
}