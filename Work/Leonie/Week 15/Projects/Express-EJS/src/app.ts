import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import data from './data.json';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('index', { title: 'Home', data });
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
