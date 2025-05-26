import express, { Request, Response } from "express";
import 'dotenv/config';
import data from './data.json';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT;
const filePath = path.join(__dirname, "data.json");
let lastId: number = data.length > 0 ? data[data.length - 1].id : 0;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

app.get("/api/data", (req: Request, res: Response) => {
    res.json({ message: "This is some sample data." });
});

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/api/city", (req: Request, res: Response) => {
    res.json(data);
});

app.get("/api/city/:id", (req: Request, res: Response) => {
    const cityId: string = req.params.id;
    const cityIdNumber = parseInt(cityId, 10);
    const city = data.find((item: { id: number }) => item.id === cityIdNumber);

    if (city) {
        res.json(city);
    } else {
        res.status(404).json({ error: "City not found" });
    }
});

app.post("/submit", (req: Request, res: Response) => {
    const { city, country } = req.body;
    let id: number = ++lastId; // Neue ID generieren

    // Datei lesen, Daten hinzufügen und zurückschreiben
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Fehler beim Lesen der Datei:", err);
            return res.status(500).json({error: "Interner Serverfehler"});
        }


        const jsonData = JSON.parse(data);
        jsonData.push({id, city, country});

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
            if (err) {
                console.error("Fehler beim Schreiben der Datei:", err);
                return res.status(500).json({error: "Interner Serverfehler"});
            }

            res.status(201).json({message: "Stadt erfolgreich hinzugefügt", data: {id, city, country}});
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});