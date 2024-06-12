import { prisma } from "@/main/config/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../@types/user-repository";

export class PrismaUserRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput){   
        const user = await prisma.user.create({ 
            data
        })

        return user;
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    }
    async findById(id: string){
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return user
    }
}