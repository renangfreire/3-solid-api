import { CheckInRepository } from "@/repositories/@types/check-in-repository";

interface GetUserMetricsRequest{
    userId: string;
}

export class GetUserMetricsService {
    constructor(private checkInRepository: CheckInRepository) {
    }

    async handle({ userId}: GetUserMetricsRequest) {
        const checkInsCount = await this.checkInRepository.countByUserId(userId);

        return {
            checkInsCount
        };
    }
}