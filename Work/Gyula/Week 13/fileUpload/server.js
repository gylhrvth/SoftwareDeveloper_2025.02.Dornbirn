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
        destination: 'public/uploads/',
        filename: (req, file, cb) => {
            // Save file without extension
            const randomName = Math.random().toString(36).substring(2, 15);
            const ext = file.originalname.split('.').pop();
            const newFileName = `${randomName}.${ext}`;
            cb(null, newFileName);
        }
    })
})

app.post('/upload', upload.single('uploaded_file'), (req, res) => {
  const file = req.file; // Access the uploaded file
  const fileUri = `/uploads/${file.filename}`;
  console.log('File URI:', fileUri);

  res.redirect('/listImages.html?name=' + encodeURIComponent(fileUri)); // Send success response
})

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
