import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/user/register";
import { authenticateUserController } from "../controllers/user/authenticate";
import { refreshController } from "../controllers/user/refresh";

export async function userRoutes(app: FastifyInstance){
    app.post("/", registerUserController)
    app.post("/authenticate", authenticateUserController)
    app.patch("/token/refresh", refreshController)
} 