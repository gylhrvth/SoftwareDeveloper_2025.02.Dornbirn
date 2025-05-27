import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cityRoutes from './routes/cityRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.locals.user = (req as any).oidc?.user;
  next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use('/', cityRoutes);

app.use((_req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`✅ Server: http://localhost:${port}`);
});