import { db } from "../database/database.connection.js";

export function SalveFlights(origin, destination, sanitizedDate) {

    const result = db.query('INSERT INTO flights ( origin, destination, date ) VALUES ($1, $2, $3)',[origin, destination, sanitizedDate]);

    return result;
    
}

export function idExistsOrigin (origin) {

    const resultado = db.query('SELECT * FROM cities WHERE id = $1;', [origin]);

    return resultado;

}

export function idExistsDestination (destination) {

    const resultado = db.query('SELECT * FROM cities WHERE id = $1;', [destination]);

    return resultado;

}


export function getFlightsByOrder() {
    const resultado = db.query(`
    SELECT
        td.id AS id,
        origin_city.name AS origin,
        destination_city.name AS destination,
        td.date AS date
    FROM
        flights AS td
    JOIN
        cities AS origin_city ON td.origin = origin_city.id
    JOIN
        cities AS destination_city ON td.destination = destination_city.id
    ORDER BY
        STR_TO_DATE(td.date, '%d-%m-%Y') ASC;`);

    return resultado;
}

export function SearchFlightsByOrigin (query) {
    const queryString = `
    SELECT
        td.id AS id,
        origin_city.name AS origin,
        destination_city.name AS destination,
        td.date AS date
    FROM
        flights AS td
    JOIN
        cities AS origin_city ON td.origin = origin_city.id
    JOIN
        cities AS destination_city ON td.destination = destination_city.id
    WHERE 
        origin_city.name ILIKE $1
    ORDER BY
        STR_TO_DATE(td.date, '%d-%m-%Y') ASC;
    `;
  
    const result = db.query(queryString, [`%${query}%`]);
    return result;
}

export function SearchFlightsByDestination(query) {
    const queryString = `
    SELECT
        td.id AS id,
        origin_city.name AS origin,
        destination_city.name AS destination,
        td.date AS date
    FROM
        flights AS td
    JOIN
        cities AS origin_city ON td.origin = origin_city.id
    JOIN
        cities AS destination_city ON td.destination = destination_city.id
    WHERE 
        destination_city.name ILIKE $1
    ORDER BY
        STR_TO_DATE(td.date, '%d-%m-%Y') ASC;
    `;
  
    const result = db.query(queryString, [`%${query}%`]);
    return result;
}
