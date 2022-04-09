import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        //VALIDATE EMAIL ~ RECOMMENDED  
        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' });
            return;
        }

        //CONNECT TO DATABASE
        const client = await MongoClient.connect(
            'mongodb+srv://tennyson:nextjscourse@cluster0.0ntge.mongodb.net/events?retryWrites=true&w=majority'
        );
        const db = client.db();

        await db.collection('newsletter').insertOne({ email: userEmail })
        
        //DISCONNECT 
        client.close();
        res.status(201).json({message: 'Signed up!'})
    }
}

export default handler;
