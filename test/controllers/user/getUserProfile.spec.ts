import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/main/config/app"
import request from "supertest";

describe("Register (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to get user profile", async () => {
        await request(app.server)
            .post("/user")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "1234567"
            })

        const authResponse = await request(app.server)
            .post("/user/authenticate")
            .send({
                email: "johndoe@example.com",
                password: "1234567"
            })

        const { token } = authResponse.body

        const response = await request(app.server)
            .get("/profile")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "johndoe@example.com",
                password: "1234567"
            })

            expect(response.statusCode).toEqual(200)
            expect(response.body.user).toEqual(expect.objectContaining({
                email: "johndoe@example.com"
            }))
    })
})