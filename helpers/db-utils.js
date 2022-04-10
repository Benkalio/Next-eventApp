import { MongoClient } from 'mongodb';
//FOR CONNECTION
export async function connectDatabase() {
    //CONNECT TO DATABASE
    const client = await MongoClient.connect(
        'mongodb+srv://tennyson:nextjscourse@cluster0.0ntge.mongodb.net/events?retryWrites=true&w=majority'
    );
    return client;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection, sort, filter={}){
    const db = client.db();

    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .toArray();
    return documents;
}