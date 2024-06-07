import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/registerUser";

export async function userRoutes(app: FastifyInstance){
    app.post("/", registerUserController)
} 