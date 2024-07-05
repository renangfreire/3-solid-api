import { FastifyInstance } from "fastify";
import { verifyJwt } from "../middlewares/verifyJwt";
import { createCheckIn } from "../controllers/checkins/create";
import { validateCheckIn } from "../controllers/checkins/validate";
import { getUserHistory } from "../controllers/checkins/history";
import { getUserMetrics } from "../controllers/checkins/metrics";
import { verifyUserRole } from "../middlewares/verifyUserRole";


export async function checkInRoutes(app: FastifyInstance){
    app.addHook("onRequest", verifyJwt)

    app.post("/:gymId", createCheckIn)
    app.patch("/:checkInId/validate", {
        onRequest: verifyUserRole("ADMIN")
    }, validateCheckIn)
    app.get("/history", getUserHistory)
    app.get("/metrics", getUserMetrics)
} 