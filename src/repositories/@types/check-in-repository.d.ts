import { CheckIn } from "@prisma/client";
import { Prisma } from "@prisma/client";


export interface CheckInRepository{
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findById(id: string): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
    findManyCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    save(checkIn: CheckIn): Promise<CheckIn>
}