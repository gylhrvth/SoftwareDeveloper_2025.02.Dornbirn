import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import data from './data.json';
import * as fs from "node:fs";

dotenv.config();
const app: express.Application = express();
const PORT: string | undefined = process.env.PORT;

type DataItem = {
    id: number;
    city: string;
    country: string;
};

const typedData: DataItem[] = data as DataItem[];
let lastId: number = typedData.length > 0 ? typedData[typedData.length - 1].id : 0;
const filePath: string = path.join(__dirname, "data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
    if (!typedData || typedData.length === 0) {
        return res.status(404).render('error', { title: 'No data available' });
    }
    // Render the index view with data
    res.render('index', { title: 'Home', data: typedData });
});

app.get('/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    const idNumber: number = parseInt(id); // Ensure id is a number
    const item: DataItem | undefined = typedData.find((d: DataItem) => d.id === idNumber);

    if (!item) {
        return res.status(404).render('error', { title: 'Item not found' });
    }

    // Render the item view with the found item
    res.render('details', { title: `Item ${id}`, item });
})

app.post('/create', (req: Request, res: Response) => {
    const { city, country }: { city: string; country: string } = req.body;
    let id: number = ++lastId; // Neue ID generieren

    // Datei lesen, Daten hinzufügen und zurückschreiben
    fs.readFile(filePath, "utf8", (err: NodeJS.ErrnoException | null, fileData: string) => {
        if (err) {
            console.error("Fehler beim Lesen der Datei:", err);
            return res.status(500).json({error: "Interner Serverfehler"});
        }

        const jsonData: DataItem[] = JSON.parse(fileData);
        jsonData.push({id, city, country});

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8", (err: NodeJS.ErrnoException | null) => {
            if (err) {
                console.error("Fehler beim Schreiben der Datei:", err);
                return res.status(500).json({error: "Interner Serverfehler"});
            }
            res.redirect('/');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
