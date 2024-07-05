import { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/userRoutes";
import { profileRoutes } from "./routes/profileRoutes";
import { gymRoutes } from "./routes/gymRoutes";
import { checkInRoutes } from "./routes/checkInRoutes";

export async function appRoutes(app: FastifyInstance){
    app.register(userRoutes, {
        prefix: "user"
    })

    app.register(profileRoutes, {
        prefix: "profile",
    })

    app.register(gymRoutes, {
        prefix: "gym"
    })

    app.register(checkInRoutes, {
        prefix: "checkin"
    })
}