import { badRequest, unauthorized } from "./helpers/HTTPHelpers";
import { ResourcesNotFound } from "./errors/ResourcesNotFound";
import { CheckInRepository } from "@/repositories/@types/check-in-repository";
import { CheckInCannotBeValidated } from "./errors/CheckInCannotBeValidated";
import dayjs from "dayjs";

interface ValidateCheckInServiceRequest{
    checkInId: string
}

const maxTimeToValidate = 20 // 20m

export class ValidateCheckInService{
    constructor(
        private checkInRepository: CheckInRepository,
    ){}

    async handle({checkInId}: ValidateCheckInServiceRequest){
        const checkIn = await this.checkInRepository.findById(checkInId)

        if(!checkIn){
            throw badRequest(new ResourcesNotFound())
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, "minutes")

        if(distanceInMinutesFromCheckInCreation > maxTimeToValidate){
            throw unauthorized(new CheckInCannotBeValidated())
        }

        checkIn.validated_at = new Date()

        const checkInValidated = await this.checkInRepository.save(checkIn)

        return {
            checkInValidated
        }
    }
}