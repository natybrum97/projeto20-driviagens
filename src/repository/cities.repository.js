import { db } from "../database/database.connection.js";

export function cityexists (sanitizedName) {

    const resultado = db.query('SELECT * FROM cities WHERE name = $1;', [sanitizedName]);

    return resultado;

}

export function SalveCities(sanitizedName) {

    const result = db.query('INSERT INTO cities ( name ) VALUES ($1)',[sanitizedName]);

    return result;
    
}