import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

// new route for /hello
app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello World!')
});

// API route for /api/data (GET only)
app.get('/api/data', (req: Request, res: Response) => {
    const result = { message: 'Dies ist eine Beispiel-API-Antwort', data: [1, 2, 3] }
    console.log(result)
    res.json(result);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});


