import { stripHtml } from "string-strip-html";
import { SalveFlights, getFlightsByOrder, idExistsDestination, idExistsOrigin } from "../repository/flights.repository.js";

export async function postFlights(req, res) {

    const { origin, destination, date } = req.body;

    const sanitizedDate = stripHtml(date).result.trim();

    try {

        const idOrigin = await idExistsOrigin (origin);

        if (idOrigin.rows.length === 0) return res.status(404).send("A cidades de origem e destino devem ser ids de cidades que existem na tabela cities!");

        const idDestination = await idExistsDestination (destination);

        if (idDestination.rows.length === 0) return res.status(404).send("A cidades de origem e destino devem ser ids de cidades que existem na tabela cities!");

        if(origin === destination) return res.status(409).send("Origem e destino devem ser diferentes!");

        const currentDate = new Date();

        const flightDate = new Date(sanitizedDate);
        
        if (flightDate <= currentDate) return res.status(422).send("A data do voo deve ser maior que a data atual");

        await SalveFlights(origin, destination, sanitizedDate);

        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function getFlights (req, res) {
  
    try {
      const flights = await getFlightsByOrder();

    return res.status(200).send(flights.rows);
  
  
      
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }