import { MongoClient } from 'mongodb';

async function handler(req, res) {
    const eventId = req.query.eventId;

    const client = await MongoClient.connect('mongodb+srv://tennyson:nextjscourse@cluster0.0ntge.mongodb.net/events?retryWrites=true&w=majority')

    if (req.method === "POST") {
        //ADD SERVER SIDE VALIDATION
        const { email, name, text } = req.body;
        if (!email.includes('@') || 
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        const newComment = {
            // id: new Date().toISOString(),
            email,
            name,
            text,
            eventId
        };

        const db = client.db();
        const result = await db.collection('comments').insertOne(newComment);

        console.log(result);

        newComment.id = result.insertedId;

        res.status(201).json({
            message: 'Added comment.',
            comment: newComment
        });
    }   
    if (req.method === "GET") {
        const db = client.db();

        const documents = await db
            .collection('comments')
            .find(filter)
            .sort({ _id: -1 })
            .toArray();
        res.status(200).json({comments: documents})
    }

    //CLOSE DATABASE CONNECTION ***
    client.close();
}

export default handler;