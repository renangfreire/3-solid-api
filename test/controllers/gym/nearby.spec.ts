import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/main/config/app"
import request from "supertest";
import { createAndAuthUser } from "test/utils/createAndAuthUser";

let token: string

describe("NearBy (e2e)", () => {
    beforeAll(async () => {
        await app.ready()

        const response = await createAndAuthUser(true)
        token = response.token
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to fetch nearby gyms", async () => {
        await request(app.server)
            .post("/gym")
            .send({
                latitude: -23.5447319,
                longitude: -46.8737503,
                title: "John doe Gym (Near Gym)",
            }).set("Authorization", `Bearer ${token}`)

        await request(app.server)
            .post("/gym")
            .send({
                latitude: -23.4447319,
                longitude: -46.5737503,
                title: "John doe Gym (Far Gym)",
            }).set("Authorization", `Bearer ${token}`)

            const response = await request(app.server)
            .get("/gym/nearby")
            .query({
                latitude: -23.5447319,
                longitude: -46.8737503
            })
            .set("Authorization", `Bearer ${token}`)
            .send()

            expect(response.statusCode).toEqual(200)
            expect(response.body.gyms).toHaveLength(1)
            expect(response.body.gyms).toEqual([
                expect.objectContaining({
                    title: "John doe Gym (Near Gym)"
                })
        ])
    })

})