import { stripHtml } from "string-strip-html";
import { SalveTravels, idExistsFlightId, idExistsPassengerId } from "../repository/travels.repository.js";

export async function postTravels(req, res) {

    const { passengerId, flightId } = req.body;

    try {

        const idPassengerId = await idExistsPassengerId (passengerId);

        if (idPassengerId.rows.length === 0) return res.status(404).send("O id do passageiro deve ser um id existente!");

        const idFlightId = await idExistsFlightId (flightId);

        if (idFlightId.rows.length === 0) return res.status(404).send("O id do voo deve ser um id existente!");

        await SalveTravels(passengerId, flightId);

        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}