const express = require('express')
const multer  = require('multer')
const path = require('path');

const result = require('dotenv').config()
if (result.error) {
    console.error('Don\'t forget to create the .env file with:\n\
HTTP_PORT=3003')
    process.exit(1)
  }


const app = express()

app.use(express.static('public')) // Middleware to serve static files
//app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.json()); // Middleware to parse JSON data
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.locals.uploadDir = '/uploads/';


const upload = multer({
    storage: multer.diskStorage({
        destination: '../dummy02/public/uploads/', // Save files to dummy02/public/uploads/
        filename: (req, file, cb) => {
            const randomName = Math.random().toString(36).substring(2, 15);
            const ext = file.originalname.split('.').pop();
            const newFileName = `${randomName}.${ext}`;
            cb(null, newFileName);
        }
    })
});

app.post('/upload/:id', upload.single('uploaded_file'), (req, res) => {
    const { id } = req.params;
    const file = req.file;
    const fileUri = `/uploads/${file.filename}`;

    const query = 'UPDATE todo SET todo_ImageURL = ? WHERE todo_ID = ?';
    db.query(query, [fileUri, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Todo not found' });
        res.json({ success: true, fileUri });
    });
});

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/listImages.html', (req, res) => {
  const fileName = req.query.name;
  console.log('File name:', fileName);
  res.render('listImages', { fileName: fileName });
})

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Example app listening on port ${process.env.HTTP_PORT}`)
})
