import express, { Request, Response } from "express";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

app.get("/api/data", (req: Request, res: Response) => {
    res.json({ message: "This is some sample data." });
})

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
