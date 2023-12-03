import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = new MongoClient(process.env.DATABASE_URL_ROOT);

  try {
    await client.connect();
    client.db().command({ ping: 1 });
    console.log('Connected successfully to server');

    const db = client.db();
    return { db: db, err: null };
  } catch (err) {
    await client.close();
    console.log(err);
    return { db: null, err: err };
  }
}
