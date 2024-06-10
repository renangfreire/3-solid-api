import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/registerUser";
import { authenticateUserController } from "../controllers/authenticateUser";

export async function userRoutes(app: FastifyInstance){
    app.post("/", registerUserController)
    app.post("/authenticate", authenticateUserController)
} 