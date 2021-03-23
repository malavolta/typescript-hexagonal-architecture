import Trip from "../entities/Trip";

export default interface TripRepository {
    getById(id: String): Promise<Trip>;
}