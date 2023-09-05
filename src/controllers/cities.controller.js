import { stripHtml } from "string-strip-html";
import { SalveCities, cityexists } from "../repository/cities.repository.js";

export async function postCities(req, res) {

    const { name } = req.body;

    const sanitizedName = stripHtml(name).result.trim();

    try {

        const city = await cityexists (sanitizedName);
      
        if (city.rows.length > 0) return res.status(409).send("Não é permitido adicionar cidades com nomes repetidos!");

        await SalveCities(sanitizedName);

        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}