import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaFlights } from "../schemas/flights.schemas.js";
import { postFlights } from "../controllers/flights.controller.js";

const flightsRouter = Router();

flightsRouter.post("/flights", validateSchema(schemaFlights), postFlights );

export default flightsRouter;