import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postCities } from "../controllers/cities.controller.js";
import { schemaCities } from "../schemas/cities.schemas.js";

const citiesRouter = Router();

citiesRouter.post("/cities", validateSchema(schemaCities), postCities );

export default citiesRouter;