import { travelsRepository } from "../repository/travels.repository.js";
import { errors } from "../erros/erros.js";


async function postTravels(passengerId, flightId) {

        const idPassengerId = await travelsRepository.idExistsPassengerId (passengerId);

        if (idPassengerId.rows.length === 0) throw errors.notFound("O id do passageiro");

        const idFlightId = await travelsRepository.idExistsFlightId (flightId);

        if (idFlightId.rows.length === 0) throw errors.notFound("O id do voo");

        await travelsRepository.SalveTravels(passengerId, flightId);

}

export const travelsServices = { postTravels };