import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/main/config/app"
import request from "supertest";
import { createAndAuthUser } from "test/utils/createAndAuthUser";

let token: string


describe("Create (e2e)", () => {
    beforeAll(async () => {
        await app.ready()

        const response = await createAndAuthUser(true)
        token = response.token
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to create check-in", async () => {
        const gymResponse = await request(app.server)
        .post("/gym")
        .send({
            latitude: -23.5447319,
            longitude: -46.8737503,
            title: "John doe Gym",
        }).set("Authorization", `Bearer ${token}`)

    const { gym } = gymResponse.body

    const response = await request(app.server)
        .post(`/checkin/${gym.id}`)
        .send({
            latitude: -23.5447319,
            longitude: -46.8737503,
        }).set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toEqual(201)
        expect(response.body.checkIn).toEqual(expect.objectContaining({
            id: expect.any(String)
        }))
    })
})