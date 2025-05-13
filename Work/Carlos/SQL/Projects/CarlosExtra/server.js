const express = require('express');
const path = require('path');

const port = 3333;

const app = express();
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Home', 
        names: [
            { name: 'Carlos', age: 30 },
            { name: 'John', age: 25 },
            { name: 'Jane', age: 28 },
            { name: 'Alice', age: 22 },
            { name: 'Bob', age: 35 }
        ],
    });
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})