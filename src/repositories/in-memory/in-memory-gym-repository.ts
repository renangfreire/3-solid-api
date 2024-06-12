import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { FindManyNearByParams, GymRepository } from "../@types/gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCoordinates } from "@/services/helpers/getDistanceBetweenCoordinates";

interface GymWithDistanceProps extends Gym{
    distance: number
}

interface dbProps {
    gym: Gym[],
}

export class InMemoryGymRepository implements GymRepository {
    private db: dbProps = {
        gym: []
    };

    async create({title, latitude, longitude, description, phone}: Prisma.GymUncheckedCreateInput): Promise<Gym> {
        const gymData = {
            id: randomUUID(),
            title,
            description: description ?? null,
            phone: phone ?? null,
            latitude: new Decimal(latitude.toString()),
            longitude: new Decimal(longitude.toString()),
        }

        this.db.gym.push(gymData);

        return gymData;
    }

    async findById(id: string) {
        const gym = this.db.gym.find(gym => gym.id === id);

        if(!gym){
            return null
        }

        return gym
    }

    async searchMany(query: string, page: number) {
        const gyms = this.db.gym.filter(gym => gym.title.includes(query)).slice((page - 1) * 20, page * 20)

        return gyms
    }

    async findManyNearBy({latitude, longitude, page}: FindManyNearByParams) {
        const gyms = this.db.gym.reduce((acc: GymWithDistanceProps[], gym) => {
            const distance = getDistanceBetweenCoordinates({lat: latitude, long: longitude}, {lat: gym.latitude.toNumber(), long: gym.longitude.toNumber()})

            if(distance < 10){
                const gymWithDistance = {
                    ...gym,
                    distance: distance
                }

                acc.push(gymWithDistance)
            }

            return acc
            
        }, []).slice((page - 1) * 20, page * 20)

        return gyms
    }

}