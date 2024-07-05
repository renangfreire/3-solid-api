import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/main/config/app"
import request from "supertest";

describe("Authenticate (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to authenticate user", async () => {
        await request(app.server)
            .post("/user")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "1234567"
            })

        const response = await request(app.server)
            .post("/user/authenticate")
            .send({
                email: "johndoe@example.com",
                password: "1234567"
            })

            expect(response.statusCode).toEqual(200)
            expect(response.body).toStrictEqual({
                token: expect.any(String)
            })

    })
})