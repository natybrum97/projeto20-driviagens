import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaTravels } from "../schemas/travels.schemas.js";
import { postTravels } from "../controllers/travels.controller.js";

const travelsRouter = Router();

travelsRouter.post("/travels", validateSchema(schemaTravels), postTravels );

export default travelsRouter;