import { GymRepository } from "@/repositories/@types/gym-repository";

interface SearchGymRequest {
    query: string,
    page: number
}      

// D - Dependency Inversion Principle
export class SearchGymService{
    // Agora o serviço que recebe sua dependecia
    constructor(private gymRepository: GymRepository){}

    async handle({query, page}: SearchGymRequest) {
        const gyms = await this.gymRepository.searchMany(query, page);

        return { 
            gyms
        }
    }
}