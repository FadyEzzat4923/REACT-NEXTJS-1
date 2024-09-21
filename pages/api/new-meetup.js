import { MongoClient } from "mongodb"
export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://fadyezzat2483:FadyEzzat4923@cluster0.canm9.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0")
        const db = client.db();

        const meetupCollection = db.collection("meetups")

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();
        res.status(201).json({ message: "Meetup inserted" });
    }
}