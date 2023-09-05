import { stripHtml } from "string-strip-html";
import { SalveName } from "../repository/passengers.repository.js";

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