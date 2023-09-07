import { Router } from "express";
import { schemaPassengers } from "../schemas/passengers.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { getAllPassengersAndYourTravels, postPassengers } from "../controllers/passengers.controller.js";

const passengersRouter = Router();

passengersRouter.post("/passengers", validateSchema(schemaPassengers), postPassengers );
passengersRouter.get("/passengers/travels", getAllPassengersAndYourTravels);

export default passengersRouter;