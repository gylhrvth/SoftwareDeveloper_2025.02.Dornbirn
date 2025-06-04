import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.static(__dirname + '/../public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, world!' });
});
app.get('/about', (req, res) => {
    res.render('about', 
        { 
            count: 42, 
            skills: [
                "JavaScript (JS) & TypeScript (TS)",
                "Node.js & Express.js",
                "EJS templating",
                "mySQL & relational databases",
                "RESTful API development",
                "HTML5, CSS3",
                "Version control with Git"
                ] 
        });
});

app.get('/kursanmeldung', (req, res) => { 
    res.render('kursanmeldung', { 
        training: {
            name: "Software Developer Kurs"
        }
    });
})

app.get('/kursteilnehmer', (req, res) => { 
    res.render('kursanmeldung', { 
        training: {
            name: "Software Developer Kurs"
        },
        trainees: [
            {
                name: "Alp",
                mail: ""
            }
        ]
    });
})


app.post('/register', (req, res) => {
    const { name, email, phone, experience } = req.body;
    // Hier können Sie die Anmeldedaten verarbeiten, z.B. in einer Datenbank speichern
    console.log('Neue Anmeldung:', { name, email, phone, experience });
    res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});