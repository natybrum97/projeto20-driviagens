import { db } from "../database/database.connection.js";

export function SalveName(sanitizedfirstName, sanitizedlastName) {

    const result = db.query('INSERT INTO passengers ("firstName", "lastName" ) VALUES ($1, $2)',[sanitizedfirstName, sanitizedlastName]);

    return result;
    
}