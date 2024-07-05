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


    it("should be able to register user", async () => {
        const response = await request(app.server)
            .post("/user")
            .send({
                name: "John Doe",
                email: "johndoe@example.com",
                password: "1234567"
            })

            expect(response.statusCode).toEqual(201)
    })
})