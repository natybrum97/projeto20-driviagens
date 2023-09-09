import { db } from "../database/database.connection.js";

function SalveFlights(origin, destination, sanitizedDate) {

    const result = db.query('INSERT INTO flights ( origin, destination, date ) VALUES ($1, $2, $3)',[origin, destination, sanitizedDate]);

    return result;
    
} 

function idExistsOrigin (origin) {

    const resultado = db.query('SELECT * FROM cities WHERE id = $1;', [origin]);

    return resultado;

}

function idExistsDestination (destination) {

    const resultado = db.query('SELECT * FROM cities WHERE id = $1;', [destination]);

    return resultado;

} 


function getFlightsByOrder() {
    const resultado = db.query(`
    SELECT
    td.id AS id,
    origin_city.name AS origin,
    destination_city.name AS destination,
    TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
FROM
    flights AS td
JOIN
    cities AS origin_city ON td.origin = origin_city.id
JOIN
    cities AS destination_city ON td.destination = destination_city.id
ORDER BY
    td.date ASC
;`);

    return resultado;
}

function SearchFlightsByOrigin (originCity) {
    const queryString = `
    SELECT
        td.id AS id,
        origin_city.name AS origin,
        destination_city.name AS destination,
        TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
    FROM
        flights AS td
    JOIN
        cities AS origin_city ON td.origin = origin_city.id
    JOIN
        cities AS destination_city ON td.destination = destination_city.id
    WHERE 
        origin_city.name ILIKE $1
    ORDER BY
        td.date ASC;
    `;
  
    const result = db.query(queryString, [`%${originCity}%`]);
    return result;
}

function SearchFlightsByDestination(destinationCity) {
    const queryString = `
    SELECT
        td.id AS id,
        origin_city.name AS origin,
        destination_city.name AS destination,
        TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
    FROM
        flights AS td
    JOIN
        cities AS origin_city ON td.origin = origin_city.id
    JOIN
        cities AS destination_city ON td.destination = destination_city.id
    WHERE 
        destination_city.name ILIKE $1
    ORDER BY
        td.date ASC;
    `;
  
    const result = db.query(queryString, [`%${destinationCity}%`]);
    return result;
} 

function SearchFlightsByDestinationOrder(originCity,destinationCity) {
    const queryString = `
    SELECT
        td.id AS id,
        origin_city.name AS origin,
        destination_city.name AS destination,
        TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
    FROM
        flights AS td
    JOIN
        cities AS origin_city ON td.origin = origin_city.id
    JOIN
        cities AS destination_city ON td.destination = destination_city.id
    WHERE 
        origin_city.name ILIKE $1
    AND 
        destination_city.name ILIKE $2
    ORDER BY
        td.date ASC;
    `;
  
    const result = db.query(queryString, [`%${originCity}%`,`%${destinationCity}%`]);
    return result;
}

function SearchFlightsByBiggerSmaller(smallerDateString,biggerDateString) {
    const queryString = `
        SELECT
            td.id AS id,
            origin_city.name AS origin,
            destination_city.name AS destination,
            TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
        FROM
            flights AS td
        JOIN
            cities AS origin_city ON td.origin = origin_city.id
        JOIN
            cities AS destination_city ON td.destination = destination_city.id
        WHERE
            td.date >= $1
        AND 
            td.date <= $2
        ORDER BY
            td.date ASC;
    `;

    const result = db.query(queryString, [smallerDateString,biggerDateString]);
    return result;
} 

function SearchFlightsByDestinationOrderBiggerSmaller(originCity, destinationCity, smallerDateString,biggerDateString) {
    const queryString = `
        SELECT
            td.id AS id,
            origin_city.name AS origin,
            destination_city.name AS destination,
            TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
        FROM
            flights AS td
        JOIN
            cities AS origin_city ON td.origin = origin_city.id
        JOIN
            cities AS destination_city ON td.destination = destination_city.id
        WHERE 
            origin_city.name ILIKE $1
        AND 
            destination_city.name ILIKE $2
        AND 
            td.date >= $3
        AND 
            td.date <= $4
        ORDER BY
            td.date ASC;
    `;

    const result = db.query(queryString, [originCity, destinationCity,smallerDateString,biggerDateString]);
    return result;
} 

function SearchFlightsByDestinationBiggerSmaller(destinationCity, smallerDateString, biggerDateString) {
    const queryString = `
        SELECT
            td.id AS id,
            origin_city.name AS origin,
            destination_city.name AS destination,
            TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
        FROM
            flights AS td
        JOIN
            cities AS origin_city ON td.origin = origin_city.id
        JOIN
            cities AS destination_city ON td.destination = destination_city.id
        WHERE 
            destination_city.name ILIKE $1
        AND 
            td.date >= $2
        AND 
            td.date <= $3
        ORDER BY
            td.date ASC;
    `;

    const result = db.query(queryString, [destinationCity,smallerDateString,biggerDateString]);
    return result;
} 

function SearchFlightsByOriginBiggerSmaller(originCity, smallerDateString, biggerDateString) {
    const queryString = `
        SELECT
            td.id AS id,
            origin_city.name AS origin,
            destination_city.name AS destination,
            TO_CHAR(td.date, 'DD-MM-YYYY') AS formatted_date
        FROM
            flights AS td
        JOIN
            cities AS origin_city ON td.origin = origin_city.id
        JOIN
            cities AS destination_city ON td.destination = destination_city.id
        WHERE 
            origin_city.name ILIKE $1
        AND 
            td.date >= $2
        AND 
            td.date <= $3
        ORDER BY
            td.date ASC;
    `;

    const result = db.query(queryString, [originCity, smallerDateString,biggerDateString]);
    return result;
} 

export const flightsRepository = {
    SalveFlights, 
    idExistsOrigin, 
    idExistsDestination, 
    getFlightsByOrder, 
    SearchFlightsByOrigin, 
    SearchFlightsByDestination, 
    SearchFlightsByDestinationOrder, 
    SearchFlightsByBiggerSmaller, 
    SearchFlightsByDestinationOrderBiggerSmaller, 
    SearchFlightsByDestinationBiggerSmaller,
    SearchFlightsByOriginBiggerSmaller
};

