import TripRepository from '../core/repositories/trip.repository';
import Trip from '../core/entities/Trip';
import MongoClient from 'mongodb';

class TripMongo implements TripRepository {
  public async getById(id: string): Promise<Trip> {
    const collection = await this.getCollection();
    const trip: Trip = await collection.findOne({ id });
    return trip;
  }

  /// COllection per request
  private async getCollection() {
    const MONGO_PASSWORD=process.env.MONGO_PASSWORD;
    const url = `mongodb://expense_app:${MONGO_PASSWORD}@spender-shard-00-00.slwwv.mongodb.net:27017,spender-shard-00-01.slwwv.mongodb.net:27017,spender-shard-00-02.slwwv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Spender-shard-0&authSource=admin&retryWrites=true&w=majority`;
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });

    const db = client.db('ticketing');
    return db.collection('trips');
  }
}
export default TripMongo;