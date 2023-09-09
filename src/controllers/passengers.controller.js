import { stripHtml } from "string-strip-html";
import { passengersRepository } from "../repository/passengers.repository.js";
import { passengersServices } from "../services/passengers.services.js";
import httpStatus from "http-status";

export async function postPassengers(req, res) {

        const { firstName, lastName } = req.body;

        const sanitizedfirstName = stripHtml(firstName).result.trim();
        const sanitizedlastName = stripHtml(lastName).result.trim();

        await passengersRepository.SalveName(sanitizedfirstName, sanitizedlastName);

        res.sendStatus(httpStatus.CREATED);

}

export async function getAllPassengersAndYourTravels(req, res) {

        const nameFilter = req.query.name;
        let page = parseInt(req.query.page);

        const passengers = await passengersServices.getAllPassengersAndYourTravels(nameFilter, page);

        return res.status(httpStatus.OK).send(passengers.rows);
}
