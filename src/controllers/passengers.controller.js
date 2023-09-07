import { stripHtml } from "string-strip-html";
import { SalveName, getPassengers, getPassengersByName, getPassengersByNamePage, getPassengersByPage } from "../repository/passengers.repository.js";

export async function postPassengers(req, res) {

    const { firstName, lastName } = req.body;

    const sanitizedfirstName = stripHtml(firstName).result.trim();
    const sanitizedlastName = stripHtml(lastName).result.trim();

    try {

        await SalveName(sanitizedfirstName, sanitizedlastName);

        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function getAllPassengersAndYourTravels(req, res) {
    try {
        const nameFilter = req.query.name;
        let page = parseInt(req.query.page);

        console.log(page);

        const limit = 10; // Define o limite de resultados por página.

        let passengers;

        if (nameFilter && page){
            passengers = await getPassengersByNamePage(nameFilter, limit, page);
        } else if (nameFilter && !page){
            passengers = await getPassengersByName(nameFilter);
        } else if(!nameFilter && page){
            passengers = await getPassengersByPage(limit, page);
        } else if(!nameFilter && !page) {
            passengers = await getPassengers();
        }

        if (passengers.rows.length > 10) {
            res.status(500).send("Too many results");
        } else {
            res.send(passengers.rows);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}
