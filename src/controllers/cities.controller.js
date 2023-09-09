import { stripHtml } from "string-strip-html";
import { citiesServices } from "../services/cities.services.js";
import httpStatus from "http-status";

export async function postCities(req, res) {

    const { name } = req.body;

    const sanitizedName = stripHtml(name).result.trim();

    await citiesServices.postCities(sanitizedName);

    res.sendStatus(httpStatus.CREATED);

}