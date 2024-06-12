import { hash } from "bcryptjs"
import { conflict } from "./helpers/HTTPHelpers";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { GymRepository } from "@/repositories/@types/gym-repository";

interface CreateGymRequest {
    title: string,
    description?: string | null,
    phone?: string | null,
    latitude: number,
    longitude: number,
}      

// D - Dependency Inversion Principle
export class CreateGymService{
    // Agora o serviço que recebe sua dependecia
    constructor(private gymRepository: GymRepository){}

    async handle({title, description, phone, longitude, latitude}: CreateGymRequest) {

        const gym = await this.gymRepository.create({title, description, phone, longitude, latitude});

        return { 
            gym
        }
    }
}