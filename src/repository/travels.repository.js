import { db } from "../database/database.connection.js";

function SalveTravels(passengerId, flightId) {

    const result = db.query('INSERT INTO travels ( "passengerId", "flightId" ) VALUES ($1, $2)',[passengerId, flightId]);

    return result;
    
}

function idExistsPassengerId (passengerId) {

    const resultado = db.query('SELECT * FROM passengers WHERE id = $1;', [passengerId]);

    return resultado;

}
function idExistsFlightId (flightId) {

    const resultado = db.query('SELECT * FROM flights WHERE id = $1;', [flightId]);

    return resultado;

}

export const travelsRepository = {
    SalveTravels,
    idExistsPassengerId,
    idExistsFlightId
};