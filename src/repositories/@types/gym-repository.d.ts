import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearByParams{
    latitude: number, 
    longitude: number, 
    page: number
}

export interface GymRepository{
    create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>
    findById(id: string): Promise<Gym | null>
    searchMany(query: string, page: number): Promise<Gym[]>,
    findManyNearBy(params: FindManyNearByParams): Promise<Gym[]>
}