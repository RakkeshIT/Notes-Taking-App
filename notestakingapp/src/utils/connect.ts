import { MongoClient } from "mongodb";

// Mongo DB URI Variable
const URI = process.env.MongoDB_URI as string;

// Throw Error for MongoDB Connection is not Connect Properly
if(!URI) throw new Error("Please Connect MongoDB Properly !!!!!!")

    const globalWithMongo = global as typeof globalThis & {_mongoClient?: MongoClient};
    
// Extend the global object to include _mongoClient for caching
const client = globalWithMongo._mongoClient ?? new MongoClient(URI);

if(process.env.NODE_ENV === "development")globalWithMongo._mongoClient = client;

export default client.connect();