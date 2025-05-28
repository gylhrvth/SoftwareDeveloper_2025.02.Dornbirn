import express from 'express';
import { dbConnect } from './db';
import initRouteCountry from './routerCountry';


const app = express();
const port = 3000;


dbConnect()



app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index', { title: 'Mondial EJS Example' });
});

initRouteCountry(app);

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});