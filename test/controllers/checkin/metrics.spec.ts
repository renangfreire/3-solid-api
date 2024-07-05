import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { app } from "@/main/config/app"
import request from "supertest";
import { createAndAuthUser } from "test/utils/createAndAuthUser";

let token: string
describe("Metrics (e2e)", () => {
    beforeAll(async () => {
        await app.ready()

        const response = await createAndAuthUser(true)
        token = response.token
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to get user metrics", async () => {
        const gymResponse = await request(app.server)
        .post("/gym")
        .send({
            latitude: -23.5447319,
            longitude: -46.8737503,
            title: "John doe Gym",
        }).set("Authorization", `Bearer ${token}`)

        const { gym } = gymResponse.body
        
        await request(app.server)
            .post(`/checkin/${gym.id}`)
            .send({
                latitude: -23.5447339,
                longitude: -46.8737503,
            }).set("Authorization", `Bearer ${token}`)
            
        const response = await request(app.server)
            .get("/checkin/metrics")
            .send()
            .set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkInsCount).toEqual(1)
    })
})