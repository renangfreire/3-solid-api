import { FastifyInstance } from "fastify";
import { userProfile } from "../controllers/user/profile";
import { verifyJwt } from "../middlewares/verifyJwt";

export async function profileRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt)
    
    app.get("/", userProfile)
} 