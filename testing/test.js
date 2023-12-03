import { configDotenv } from 'dotenv';
import { connectToDatabase } from './database.js';
configDotenv();

(async () => {
  const { db, err } = await connectToDatabase();

  if (!err) {
    const collection = db.collection('testing');
    const result = await collection.insertOne({ message: 'Hello World' });
    db.console.log(result);
  }
})();
