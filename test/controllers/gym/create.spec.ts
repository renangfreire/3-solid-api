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

    it("should be able to register gym", async () => {
        const response = await request(app.server)
            .post("/gym")
            .send({
                latitude: -23.5447319,
                longitude: -46.8737503,
                title: "John doe Gym",
            }).set("Authorization", `Bearer ${token}`)

            expect(response.statusCode).toEqual(201)
            expect(response.body.gym).toEqual(expect.objectContaining({
                id: expect.any(String)
            }))
    })
})