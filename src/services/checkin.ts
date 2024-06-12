import { UsersRepository } from "@/repositories/@types/user-repository";
import { badRequest } from "./helpers/HTTPHelpers";
import { ResourcesNotFound } from "./errors/ResourcesNotFound";
import { CheckInRepository } from "@/repositories/@types/check-in-repository";
import { GymRepository } from "@/repositories/@types/gym-repository";
import { getDistanceBetweenCoordinates } from "./helpers/getDistanceBetweenCoordinates";
import { MaxDistance } from "./errors/MaxDistance";
import { MaxCheckInsPerDay } from "./errors/MaxCheckInsPerDay";

interface CheckInServiceRequest{
    userId: string
    gymId: string
    userLat: number,
    userLong: number
}

const maxDistanceUserBetweenGym = 0.1 // km

export class CheckInService{
    constructor(
        private userRepository: UsersRepository,
        private checkInRepository: CheckInRepository,
        private gymsRepository: GymRepository
    ){}

    async handle({userId, gymId, userLat, userLong}: CheckInServiceRequest){
        const user = await this.userRepository.findById(userId)

        if(!user){
            throw badRequest(new ResourcesNotFound())
        }

        const gym = await this.gymsRepository.findById(gymId)


        if(!gym){
            throw badRequest(new ResourcesNotFound())
        }

        const userDistanceBetweenGym = getDistanceBetweenCoordinates(
            {lat: userLat, long: userLong}, 
            {lat: gym.latitude.toNumber(), long: gym.longitude.toNumber()}
        )

        if(userDistanceBetweenGym > maxDistanceUserBetweenGym){
            throw badRequest(new MaxDistance())
        }

        const doesCheckInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())   
        
        if(doesCheckInOnSameDay){
            throw badRequest(new MaxCheckInsPerDay())
        }

        const checkIn = await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn
        }
    }
}