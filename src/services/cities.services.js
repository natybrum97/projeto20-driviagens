import { citiesRepository } from "../repository/cities.repository.js";
import { errors } from "../erros/erros.js";

export async function postCities(sanitizedName) {

        const city = await citiesRepository.cityexists (sanitizedName);
      
        if (city.rows.length > 0) throw errors.conflict("Essa cidade")

        //return res.status(409).send("Não é permitido adicionar cidades com nomes repetidos!");

        await citiesRepository.SalveCities(sanitizedName);

}

export const citiesServices = { postCities };