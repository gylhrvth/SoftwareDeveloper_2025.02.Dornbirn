
import express from 'express';

type Note = {
    id: number;
    text: string;
}

let notes: Note[] = [
    { id: 1, text: 'First note' },
    { id: 2, text: 'Second note' },
    { id: 3, text: 'Third note' }
]

const app = express();
const PORT = process.env.PORT || 3001;

//Simple route to test the server
app.get('/', (req, res) => {
    res.send('Hi, Whaddup!');
});

// Middleware for static files
app.use(express.static('public'));

// Example with REST API (Get request)
app.get('/api/data', (req, res) => {
    res.json({ message: 'I\'m a REST API answer, yipeee!' });
});

// REST API: Get all notes -> (Get request)
app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);