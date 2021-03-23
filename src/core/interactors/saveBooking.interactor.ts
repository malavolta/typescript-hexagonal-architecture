import Passenger from "../entities/Passenger";
import Trip from "../entities/Trip";
import TripRepository from "../repositories/trip.repository";
import Ticket from '../entities/Ticket';
import NotifierRepository from "../repositories/notifier.repository";

const saveBooking = (
    tripRepository: TripRepository,
    notifierRepository: NotifierRepository,
    ) => async (
        passenger: Passenger,
         tripId: String
    ):Promise<Ticket> =>   {
    //get trip by id
        const trip: Trip = await tripRepository.getById(tripId);
    //crear ticket

    const ticket: Ticket = {
        tripId: trip.id,
        tripName: trip.name,
        arrivalTime: trip.arrivalTime,
        departureTime: trip.departureTime,
        passengerName: passenger.name,
        passengerSurname: passenger.surname
    }

    //Notificar pasajero 
    notifierRepository.notify(ticket, passenger.email);
    // Devuelve ticket
    return ticket

}