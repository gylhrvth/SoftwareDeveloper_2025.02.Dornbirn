import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cityRoutes from './routes/cityRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', cityRoutes);

app.use((_req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});