import { CheckInRepository } from "@/repositories/@types/check-in-repository";


interface FetchUserCheckInsHistoryRequest{
    userId: string;
    page?: number;
}

export class FetchUserCheckInsHistoryService{
    constructor(private checkInRepository: CheckInRepository){}

    async handle({userId, page}: FetchUserCheckInsHistoryRequest){

        const checkIns = await this.checkInRepository.findManyCheckInsByUserId(userId, page || 1)
        
        return { 
            checkIns
        }
    }
}