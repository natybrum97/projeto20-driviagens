import httpStatus from "http-status";
import { travelsServices } from "../services/travels.services.js";

export async function postTravels(req, res) {

    const { passengerId, flightId } = req.body;

    await travelsServices.postTravels(passengerId, flightId);

    res.sendStatus(httpStatus.CREATED);
}