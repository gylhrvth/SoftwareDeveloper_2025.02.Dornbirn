import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import recipeRoutes from './routes/recipeRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB-Verbindung fehlgeschlagen:', err));

// API-Routen
app.use('/api/recipes', recipeRoutes);

// // Test-Route
// app.get('/', (req: Request, res: Response) => {
//   res.json({message: 'Hello from Express + TypeScript!'});
// });

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Server konnte nicht gestartet werden:', err.message);
});
