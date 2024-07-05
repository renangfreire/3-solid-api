import { FastifyInstance } from "fastify";
import { createGym } from "../controllers/gyms/create";
import { fetchNearByGym } from "../controllers/gyms/nearby";
import { searchGym } from "../controllers/gyms/search";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyUserRole } from "../middlewares/verifyUserRole";


export async function gymRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt)

    app.post("/", {
        onRequest: verifyUserRole("ADMIN")
    }, createGym)
    app.get("/nearby", fetchNearByGym)
    app.get("/search", searchGym)
} 