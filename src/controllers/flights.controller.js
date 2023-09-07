import { stripHtml } from "string-strip-html";
import { SalveFlights, SearchFlightsByBiggerSmaller, SearchFlightsByDestination, SearchFlightsByDestinationBiggerSmaller, SearchFlightsByDestinationOrder, SearchFlightsByDestinationOrderBiggerSmaller, SearchFlightsByOrigin, SearchFlightsByOriginBiggerSmaller, getFlightsByOrder, idExistsDestination, idExistsOrigin } from "../repository/flights.repository.js";
import Joi from "joi";

export async function postFlights(req, res) {

  const { origin, destination, date } = req.body;

  const sanitizedDate = stripHtml(date).result.trim();

  try {

    const idOrigin = await idExistsOrigin(origin);

    if (idOrigin.rows.length === 0) return res.status(404).send("A cidades de origem e destino devem ser ids de cidades que existem na tabela cities!");

    const idDestination = await idExistsDestination(destination);

    if (idDestination.rows.length === 0) return res.status(404).send("A cidades de origem e destino devem ser ids de cidades que existem na tabela cities!");

    if (origin === destination) return res.status(409).send("Origem e destino devem ser diferentes!");

    const currentDate = new Date();

    const flightDate = new Date(sanitizedDate);

    if (flightDate <= currentDate) return res.status(422).send("A data do voo deve ser maior que a data atual");

    await SalveFlights(origin, destination, sanitizedDate);

    res.sendStatus(201);

  } catch (err) {

    res.status(500).send(err.message);

  }

}

export async function getFlights(req, res) {

  try {

    const biggerDate = new Date(req.query['bigger-date']);
    const smallerDate = new Date(req.query['smaller-date']);
    const originCity = req.query.origin;
    const destinationCity = req.query.destination;

    if (req.query.smallerDate && req.query.biggerDate && req.query.smallerDate > req.query.biggerDate) {

      return res.status(400).send("Bad request");

    }


    if (req.query.smallerDate && !req.query.biggerDate || req.query.biggerDate && !req.query.smallerDate) {

      return res.status(422).send("Unprocessable Entity");

    }
  
    let flights;

    if(originCity && req.query.smallerDate && req.query.biggerDate && destinationCity){

      flights = await SearchFlightsByDestinationOrderBiggerSmaller(originCity,destinationCity,req.query.smallerDate,req.query.biggerDate);
      console.log(flights.rows.length, "SearchFlightsByDestinationOrderBiggerSmaller");

    } else if(req.query.smallerDate && req.query.biggerDate && destinationCity && !originCity){

      flights = await SearchFlightsByDestinationBiggerSmaller(destinationCity,req.query.smallerDate,req.query.biggerDate);
      console.log(flights.rows.length, "SearchFlightsByDestinationBiggerSmaller");

    }  else if(originCity && req.query.smallerDate && req.query.biggerDate && !destinationCity){

      flights = await SearchFlightsByOriginBiggerSmaller (originCity, req.query.smallerDate,req.query.biggerDate);
      console.log(flights.rows.length, "SearchFlightsByOriginBiggerSmaller");

    } else if(originCity && destinationCity && !req.query.smallerDate && !req.query.biggerDate){

      flights = await SearchFlightsByDestinationOrder(originCity,destinationCity);
      console.log(flights.rows.length, "SearchFlightsByDestinationOrder");

    }  else if(req.query.smallerDate && req.query.biggerDate && !originCity && !destinationCity){

      flights = await SearchFlightsByBiggerSmaller (req.query.smallerDate,req.query.biggerDate);
      console.log(flights.rows.length, "SearchFlightsByBiggerSmaller");

    } else if (originCity && !destinationCity && !req.query.biggerDate && !req.query.smallerDate){

      flights = await SearchFlightsByOrigin (originCity);
      console.log(flights.rows.length, "SearchFlightsByOrigin");

    } else if(destinationCity && !req.query.smallerDate && !originCity && !req.query.biggerDate){

      flights = await SearchFlightsByDestination (destinationCity);
      console.log(flights.rows.length, "SearchFlightsByDestination");

    } else if(!destinationCity && !req.query.smallerDate && !originCity && !req.query.biggerDate) {

      flights = await getFlightsByOrder();
      console.log(flights.rows.length, "getFlightsByOrder");

    }

    if (flights.rows.length === 0) {
      return res.status(404).send([]); // Retorna um array vazio se nenhum voo for encontrado
    }

   console.log(flights.rows.length);

    return res.status(200).send(flights.rows);



  } catch (err) {
    return res.status(500).send(err.message);
  }
}