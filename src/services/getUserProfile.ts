import { UsersRepository } from "@/repositories/@types/user-repository";
import { badRequest } from "./helpers/HTTPHelpers";
import { ResourcesNotFound } from "./errors/ResourcesNotFound";

interface GetUserProfileServiceRequest{
    userId: string
}

export class GetUserProfileService{
    constructor(
        private userRepository: UsersRepository
    ){}

    async handle({userId}: GetUserProfileServiceRequest){
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw badRequest(new ResourcesNotFound())
        }

        return {
            user
        }
    }
}