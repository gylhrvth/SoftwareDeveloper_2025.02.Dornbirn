import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

type Product = {
    id: number
    name: string;
    price: number;
    description?: string;
    image?: string;
}

let products: Product[] = [
    {
        id: 1,
        name: 'Apfel',
        price: 1.99,
        description: 'Frischer, knackiger Apfel aus der Region.',
        image: 'apfel.jpg'
    },
    {
        id: 2,
        name: 'Banane',
        price: 0.99,
        description: 'Süße Banane, perfekt für den Snack zwischendurch.',
        image: 'banane.jpg'
    },
    {
        id: 3,
        name: 'Birne',
        price: 1.49,
        image: 'birne.jpg'
    },
    {
        id: 4,
        name: 'Kiwi',
        price: 1.49,
        description: 'Saftiges Kiwi, reich an Vitamin C',
        image: 'kiwi.jpg'
    }
];

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.nav = [
        { name: 'Produkte', url: '/'},
        { name: 'Produkte hinzufügen', url: '/add'}
    ];
    next();
});

app.get('/', (req: Request, res: Response) => {
  res.render('index', { products, title: 'Produkte' });
});

// Produkt hinzufügen - Formular anzeigen
app.get('/add', (req: Request, res: Response) => {
   res.render('add', { error: null, title: 'Produkt hinzufügen' });
});

// Produkt hinzufügen - Formular verarbeiten
app.post('/add', (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  if (!name || !price || isNaN(Number(price))) {
    return res.render('add', { error: 'Bitte gültigen Namen und Preis eingeben!' });
  }
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  products.push({
    id: newId,
    name,
    price: parseFloat(price),
    description: description || undefined,
    image: req.body.image || 'placeholder.png'
  });
  res.redirect('/');
});

app.get('/api/products', (req: Request, res: Response) => {
    res.json(products);
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Produkt nicht gefunden' });
    return 
  }
  products.splice(index, 1);
  res.json({ success: true });
});

// 404 Fehlerseite
app.use((req: Request, res: Response) => {
  res.status(404).render('404', { title: '404' });
});

// 500 Fehlerseite
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render('500', { error: err, title: '500'  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
