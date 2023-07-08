import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load variables
dotenv.config();

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri)

let connection;

try {
    connection = await client.connect();
} catch(e) {
    console.error(e)
}

let ewcDatabase = connection.db("EWCDatabase")

export default ewcDatabase;