import { UsersRepository } from "@/repositories/@types/user-repository"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { GetUserProfileService } from "@/services/getUserProfile"

export function makeGetUserProfile(){
    const userRepository: UsersRepository = new PrismaUserRepository()

    return new GetUserProfileService(userRepository)
}