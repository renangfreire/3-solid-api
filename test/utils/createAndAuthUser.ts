import { app } from "@/main/config/app"
import { prisma } from "@/main/config/prisma"
import { hash } from "bcryptjs"
import request from "supertest"
import { z } from "zod"

const authResponseSchema = z.object({
    token: z.string()
})

export async function createAndAuthUser(isAdmin = false){
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("1234567", 7),
            role: isAdmin ? "ADMIN" : "MEMBER"
        }
    })

    const authResponse = await request(app.server)
        .post("/user/authenticate")
        .send({
            email: "johndoe@example.com",
            password: "1234567"
        })

    const { token } = authResponseSchema.parse(authResponse.body)

    return {
        token
    }
}