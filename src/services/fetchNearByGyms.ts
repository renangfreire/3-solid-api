import { GymRepository } from "@/repositories/@types/gym-repository";

interface FetchNearByGymsRequest {
    userLat: number,
    userLong: number,
    page: number
}      

// D - Dependency Inversion Principle
export class FetchNearByGymsService{
    // Agora o serviço que recebe sua dependecia
    constructor(private gymRepository: GymRepository){}

    async handle({userLat, userLong, page}: FetchNearByGymsRequest) {
        const gyms = await this.gymRepository.findManyNearBy({latitude: userLat, longitude: userLong, page});

        return { 
            gyms
        }
    }
}