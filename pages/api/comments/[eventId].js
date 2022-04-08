
function handler(req, res) {
    const eventId = req.query.eventId;

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
            id: new Date().toISOString(),
            email,
            name,
            text
        };

        console.log(newComment);
        res.status(201).json({
            message: 'Added comment.',
            comment: newComment
        });
    }   
    if (req.method === "GET") {
        const dummyList = [
            {
                id: 'c1',
                name: 'Tenny',
                text: 'Testing comments 1'
            },
            {
                id: 'c2',
                name: 'Pasc',
                text: 'Testing comments 22'
            },
        ];
        res.status(200).json({comments: dummyList})
    }
}

export default handler;
