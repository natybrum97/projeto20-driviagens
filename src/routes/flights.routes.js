import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaFlights, schemaGetFlights } from "../schemas/flights.schemas.js";
import { getFlights, postFlights } from "../controllers/flights.controller.js";
import { validateSchemaQuery } from "../middlewares/validateSchemaQuery.js";

const flightsRouter = Router();

flightsRouter.post("/flights", validateSchema(schemaFlights), postFlights );
flightsRouter.get("/flights", validateSchemaQuery(schemaGetFlights), getFlights);

export default flightsRouter;