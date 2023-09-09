import { flightsRepository } from "../repository/flights.repository.js";
import { errors } from "../erros/erros.js";

async function postFlights(origin, destination,sanitizedDate) {
  
      const idOrigin = await flightsRepository.idExistsOrigin(origin);
  
      if (idOrigin.rows.length === 0) throw errors.notFound("A cidades de origem");
  
      const idDestination = await flightsRepository.idExistsDestination(destination);
  
      if (idDestination.rows.length === 0) throw errors.notFound("A cidades de destino"); 

      if (origin === destination) throw errors.conflictForBeingEqual("Origem e destino");
  
      const currentDate = new Date();
  
      const flightDate = new Date(sanitizedDate);
  
      if (flightDate <= currentDate) throw errors.UnprocessableEntityforDate();
  
      await flightsRepository.SalveFlights(origin, destination, sanitizedDate);
  
  }

  export async function getFlights(req, originCity, destinationCity) {
  
      if (req.query.smallerDate && req.query.biggerDate && req.query.smallerDate > req.query.biggerDate) throw errors.BadRequest();
  
      if (req.query.smallerDate && !req.query.biggerDate || req.query.biggerDate && !req.query.smallerDate) throw errors.UnprocessableEntity();
  
      let flights;
  
      if (originCity && req.query.smallerDate && req.query.biggerDate && destinationCity) {
  
        flights = await flightsRepository.SearchFlightsByDestinationOrderBiggerSmaller(originCity, destinationCity, req.query.smallerDate, req.query.biggerDate);
        console.log(flights.rows.length, "SearchFlightsByDestinationOrderBiggerSmaller");
  
      } else if (req.query.smallerDate && req.query.biggerDate && destinationCity && !originCity) {
  
        flights = await flightsRepository.SearchFlightsByDestinationBiggerSmaller(destinationCity, req.query.smallerDate, req.query.biggerDate);
        console.log(flights.rows.length, "SearchFlightsByDestinationBiggerSmaller");
  
      } else if (originCity && req.query.smallerDate && req.query.biggerDate && !destinationCity) {
  
        flights = await flightsRepository.SearchFlightsByOriginBiggerSmaller(originCity, req.query.smallerDate, req.query.biggerDate);
        console.log(flights.rows.length, "SearchFlightsByOriginBiggerSmaller");
  
      } else if (originCity && destinationCity && !req.query.smallerDate && !req.query.biggerDate) {
  
        flights = await flightsRepository.SearchFlightsByDestinationOrder(originCity, destinationCity);
        console.log(flights.rows.length, "SearchFlightsByDestinationOrder");
  
      } else if (req.query.smallerDate && req.query.biggerDate && !originCity && !destinationCity) {
  
        flights = await flightsRepository.SearchFlightsByBiggerSmaller(req.query.smallerDate, req.query.biggerDate);
        console.log(flights.rows.length, "SearchFlightsByBiggerSmaller");
  
      } else if (originCity && !destinationCity && !req.query.biggerDate && !req.query.smallerDate) {
  
        flights = await flightsRepository.SearchFlightsByOrigin(originCity);
        console.log(flights.rows.length, "SearchFlightsByOrigin");
  
      } else if (destinationCity && !req.query.smallerDate && !originCity && !req.query.biggerDate) {
  
        flights = await flightsRepository.SearchFlightsByDestination(destinationCity);
        console.log(flights.rows.length, "SearchFlightsByDestination");
  
      } else if (!destinationCity && !req.query.smallerDate && !originCity && !req.query.biggerDate) {
  
        flights = await flightsRepository.getFlightsByOrder();
        console.log(flights.rows.length, "getFlightsByOrder");
  
      }
  
      if (flights.rows.length === 0) throw errors.notFound("Voo", []);
  
      console.log(flights.rows.length);
  
      return flights;
  }

  export const flightsServices = { postFlights, getFlights };