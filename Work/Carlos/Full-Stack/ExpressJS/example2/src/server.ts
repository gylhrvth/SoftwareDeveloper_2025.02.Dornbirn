
import express from 'express';
import { Request, Response } from 'express';

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

// JSON Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3001;

//Simple route to test the server
app.get('/', (_req: Request, res: Response) => {
    res.send('Hi, Whaddup!');
});

// Middleware for static files
app.use(express.static('public'));

// Example with REST API (Get request)
app.get('/api/data', (_req: Request, res: Response) => {
    res.json({ message: 'I\'m a REST API answer, yipeee!' });
});

// REST API: Get all notes -> (Get request)
// http://localhost:3001/api/notes
app.get('/api/notes', (req: Request, res: Response) => {
    console.log('/api/notes', req.query);
    res.json(notes);
});

// REST API: Get a specific note by ID -> (Get request)
// Example: http://localhost:3001/api/notes/2
app.get('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id, 10);
    const note = notes.find(n => n.id === noteId);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});


// REST API: Create a new note -> (Post request)
app.post('/api/notes', (req: Request, res: Response): void => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
    }
    const newNote: Note = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
        text
    };
    notes.push(newNote); // You can also use: notes = [...notes, newNote];
    res.status(201).json(newNote);
});

// POST Example with Curl:
/*
curl -X POST http://localhost:3001/api/notes \
    -H "Content-Type: application/json" \
    -d '{"text":"Le Charles was da"}'
*/

// REST API: Update a note by ID -> (Put request)

// REST API: Update a note by ID -> (Put request)
app.put('/api/notes/:id', (req: Request, res: Response):void => {
    const noteId = parseInt(req.params.id, 10);
    const { text } = req.body;
    const noteIndex = notes.findIndex(n => n.id === noteId);

    if (noteIndex === -1) {
        res.status(404).json({ error: 'Note not found' });
        return 
    }
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return 
    }

    // Replace the entire note object
    notes[noteIndex] = { id: noteId, text };
    res.json({ message: 'Note replaced', note: notes[noteIndex] });
});

// Example with Put request using Curl:
/*
curl -X PUT http://localhost:3001/api/notes/2 \
    -H "Content-Type: application/json" \
    -d '{"text":"This note is fully replaced!"}'
*/

// REST API: Update a note by ID -> (Patch request)
app.patch('/api/notes/:id', (req: Request, res: Response):void => {
    const noteId = parseInt(req.params.id, 10);
    const { text } = req.body;
    const note = notes.find(n => n.id === noteId);

    if (!note) {
        res.status(404).json({ error: 'Note not found' });
        return;
    }
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return 
    }

    note.text = text;
    res.json({ message: 'Note updated', note });
});

// Example with Patch request using Curl:
/*
curl -X PATCH http://localhost:3001/api/notes/2 \
  -H "Content-Type: application/json" \
  -d '{"text":"This note was updated!"}'
*/


// REST API: Delete a note by ID -> (Delete request)
app.delete('/api/notes/:id', (req: Request, res: Response): void => {
    const noteId = parseInt(req.params.id, 10);
    const noteIndex = notes.findIndex(n => n.id === noteId);
    if (noteIndex === -1) {
        res.status(404).json({ error: 'Note not found' });
        return;
    }
    const deletedNote = notes[noteIndex];
    notes = notes.filter(n => n.id !== noteId);
    res.json({ message: 'Note deleted', note: deletedNote });
});

// Example with Delete request using Curl:
// curl -X DELETE http://localhost:3001/api/notes/2


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});