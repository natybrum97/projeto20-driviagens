import { stripHtml } from "string-strip-html";
import { flightsServices } from "../services/flights.services.js";
import httpStatus from "http-status";

export async function postFlights(req, res) {

  const { origin, destination, date } = req.body;

  const sanitizedDate = stripHtml(date).result.trim();

  await flightsServices.postFlights(origin, destination, sanitizedDate);

  res.sendStatus(httpStatus.CREATED);

}

export async function getFlights(req, res) {

    const originCity = req.query.origin;
    const destinationCity = req.query.destination;

    const flights = await flightsServices.getFlights(req, originCity, destinationCity);

    return res.status(httpStatus.OK).send(flights.rows);

}