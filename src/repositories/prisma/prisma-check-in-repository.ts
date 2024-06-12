import { prisma } from "@/main/config/prisma";
import { Prisma } from "@prisma/client";
import { CheckInRepository } from "../@types/check-in-repository";

export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput){   
        const checkIn = await prisma.checkIn.create({ 
            data
        })

        return checkIn;
    }
}