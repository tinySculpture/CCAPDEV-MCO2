import { MongoClient } from "mongodb"

export const db_url = "mongodb+srv://josiah:josiahmari1@edurevs.4cnhyvi.mongodb.net/prof2pick?retryWrites=true&w=majority&appName=EduRevs"

const client = new MongoClient(db_url)
let connection = await client.connect();
let db = connection.db("prof2pick")
export default db