import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import taskRoutes from './routes/taskRoutes';



const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Tasks', url: '/tasks' }
  ];
  next();
});

app.use('/', taskRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});