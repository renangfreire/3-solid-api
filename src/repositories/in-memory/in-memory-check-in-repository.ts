import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { CheckInRepository } from "../@types/check-in-repository";
import dayjs from "dayjs";

interface dbProps {
    checkIn: CheckIn[],
}

export class InMemoryCheckInRepository implements CheckInRepository {
    private db: dbProps = {
        checkIn: []
    };

    async create({user_id, gym_id, validated_at}: Prisma.CheckInUncheckedCreateInput){
        const checkInData = {
            id: randomUUID(),
            created_at: new Date(),
            user_id,
            gym_id,
            validated_at: validated_at ? new Date(validated_at) : null
        }

        this.db.checkIn.push(checkInData);

        return checkInData;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf("date")
        const endOfTheDay = dayjs(date).endOf("date")
        
        const checkIn = this.db.checkIn.find(checkIn => {
            const checkInDate = dayjs(checkIn.created_at)
            const checkInOnSameDay = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && checkInOnSameDay
        });

        if(!checkIn){
            return null
        }

        return checkIn
    }

    async findManyCheckInsByUserId(userId: string, page: number){
        return this.db.checkIn.filter(checkIn => checkIn.user_id === userId).slice((page - 1) * 20, page * 20)
    }

    async countByUserId(userId: string): Promise<number> {
        return this.db.checkIn.filter(checkIn => checkIn.user_id === userId).length
    }

    async findById(id: string){
        return this.db.checkIn.find(checkIn => checkIn.id === id) || null
    }

    async save(checkIn: CheckIn){
        const checkInIndex = this.db.checkIn.findIndex(checkIn => checkIn.id === checkIn.id)

        if(checkInIndex > 0){
            this.db.checkIn[checkInIndex] = checkIn
        }

        return checkIn
    }
}