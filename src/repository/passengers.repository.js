import { db } from "../database/database.connection.js";

function SalveName(sanitizedfirstName, sanitizedlastName) {

    const result = db.query('INSERT INTO passengers ("firstName", "lastName" ) VALUES ($1, $2)',[sanitizedfirstName, sanitizedlastName]);

    return result;
    
}

function getPassengers() {

    const query = `
    SELECT CONCAT(p."firstName", ' ', p."lastName") AS passenger, COUNT(t."passengerId") AS travels
    FROM passengers p
    LEFT JOIN travels t ON p.id = t."passengerId"
    GROUP BY passenger
    ORDER BY travels DESC
;`;

const result = db.query(query);
return result;
    
} 

function getPassengersByName(nameFilter) {

    const query = `
    SELECT CONCAT(p."firstName", ' ', p."lastName") AS passenger, COUNT(t."passengerId") AS travels
    FROM passengers p
    LEFT JOIN travels t ON p.id = t."passengerId"
    WHERE CONCAT(p."firstName", ' ', p."lastName") ILIKE $1
    GROUP BY passenger
    ORDER BY travels DESC
;`;

const result = db.query(query, [`%${nameFilter}%`]);
return result;
    
}

function getPassengersByPage(limit, page) {

    const offset = (page - 1) * limit;

    const query = `
    SELECT CONCAT(p."firstName", ' ', p."lastName") AS passenger, COUNT(t."passengerId") AS travels
    FROM passengers p
    LEFT JOIN travels t ON p.id = t."passengerId"
    GROUP BY passenger
    ORDER BY travels DESC
    LIMIT $1 OFFSET $2
;`;

const result = db.query(query, [limit, offset]);
return result;
    
} 

function getPassengersByNamePage(nameFilter, limit, page) {

    const offset = (page - 1) * limit;

    const query = `
    SELECT CONCAT(p."firstName", ' ', p."lastName") AS passenger, COUNT(t."passengerId") AS travels
    FROM passengers p
    LEFT JOIN travels t ON p.id = t."passengerId"
    WHERE CONCAT(p."firstName", ' ', p."lastName") ILIKE $1
    GROUP BY passenger
    ORDER BY travels DESC
    LIMIT $2 OFFSET $3
;`;

const result = db.query(query, [`%${nameFilter}%`, limit, offset]);
return result;
    
}

export const passengersRepository = {
    SalveName,
    getPassengers,
    getPassengersByName, 
    getPassengersByPage, 
    getPassengersByNamePage
};