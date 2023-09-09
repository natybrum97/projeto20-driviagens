import { db } from "../database/database.connection.js";

function cityexists (sanitizedName) {

    const resultado = db.query('SELECT * FROM cities WHERE name = $1;', [sanitizedName]);

    return resultado;

}

function SalveCities(sanitizedName) {

    const result = db.query('INSERT INTO cities ( name ) VALUES ($1)',[sanitizedName]);

    return result;
    
}

export const citiesRepository = {
    cityexists,
    SalveCities
};