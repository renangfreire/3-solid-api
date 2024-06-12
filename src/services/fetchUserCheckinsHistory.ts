import { CheckInRepository } from "@/repositories/@types/check-in-repository";


interface FetchMemberCheckInsHistoryRequest{
    userId: string;
    page?: number;
}

export class FetchMemberCheckInsHistoryService{
    constructor(private checkInRepository: CheckInRepository){}

    async handle({userId, page}: FetchMemberCheckInsHistoryRequest){

        const checkIns = await this.checkInRepository.findManyCheckInsByUserId(userId, page || 1)
        
        return { 
            checkIns
        }
    }
}