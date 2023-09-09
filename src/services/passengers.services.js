import { passengersRepository } from "../repository/passengers.repository.js";
import { errors } from "../erros/erros.js";

export async function getAllPassengersAndYourTravels(nameFilter,page) {

        const limit = 2; // Define o limite de resultados por página.

        let passengers;

        if (nameFilter && page){
            passengers = await passengersRepository.getPassengersByNamePage(nameFilter, limit, page);
        } else if (nameFilter && !page){
            passengers = await passengersRepository.getPassengersByName(nameFilter);
        } else if(!nameFilter && page){
            passengers = await passengersRepository.getPassengersByPage(limit, page);
        } else if(!nameFilter && !page) {
            passengers = await passengersRepository.getPassengers();
        }

        if (passengers.rows.length > 10) throw errors.InternalServerError();

        return passengers;
}

export const passengersServices = { getAllPassengersAndYourTravels };