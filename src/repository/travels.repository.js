import { db } from "../database/database.connection.js";

export function SalveTravels(passengerId, flightId) {

    const result = db.query('INSERT INTO travels ( "passengerId", "flightId" ) VALUES ($1, $2)',[passengerId, flightId]);

    return result;
    
}

export function idExistsPassengerId (passengerId) {

    const resultado = db.query('SELECT * FROM passengers WHERE id = $1;', [passengerId]);

    return resultado;

}

export function idExistsFlightId (flightId) {

    const resultado = db.query('SELECT * FROM flights WHERE id = $1;', [flightId]);

    return resultado;

}