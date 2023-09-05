import { Router } from "express";
import { schemaPassengers } from "../schemas/passengers.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postPassengers } from "../controllers/passengers.controller.js";

const passengersRouter = Router();

passengersRouter.post("/passengers", validateSchema(schemaPassengers), postPassengers );

export default passengersRouter;