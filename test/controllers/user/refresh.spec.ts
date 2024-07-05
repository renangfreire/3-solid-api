import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/main/config/app"
import request from "supertest";

describe("Refresh Token (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to refresh token", async () => {
        await request(app.server)
            .post("/user")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "1234567"
            })

        const authRes = await request(app.server)
            .post("/user/authenticate")
            .send({
                email: "johndoe@example.com",
                password: "1234567"
            })

            const cookies = authRes.get("Set-Cookie") || []

            const response = await request(app.server)
            .patch("/user/token/refresh")
            .set("Cookie", cookies)
            .send()

            expect(response.statusCode).toEqual(200)
            expect(response.body).toStrictEqual({
                token: expect.any(String)
            })
            expect(response.get("Set-Cookie")).toEqual([
                expect.stringContaining("refreshToken=")
            ])

    })
})