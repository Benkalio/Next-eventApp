import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils';

async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;

    try {
        client = await connectDatabase();
    } catch (error) {
        res.status(500).json({ message: 'failed to connect to db' });
        return;
    }

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
            client.close();
            return;
        }

        const newComment = {
            // id: new Date().toISOString(),
            email,
            name,
            text,
            eventId
        };

        let result;

        try {
            result = await insertDocument(client, collection, document);
            newComment._id = result.insertedId;
            res.status(201).json({
                message: 'Added comment.',
                comment: newComment
            });
        } catch (error) {
            res.status(500).json({ message: 'comment insertion failed!' });
        }
    

    }   
    if (req.method === "GET") {
        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 });
            res.status(200).json({comments: documents})
        } catch (error) {
            res.status(500).json({ message: "Failed to get document" });
        }
    }

    //CLOSE DATABASE CONNECTION ***
    client.close();
}

export default handler;
