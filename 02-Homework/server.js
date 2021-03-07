const express = require('express');

//give access to express
const app = express();
app.use( express.static( 'public' ) )

//let it parse data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//require fs
const fs = require(`fs`)
//const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 8080;

let db = JSON.parse(fs.readFileSync('./db/db.json'));



//use fs module to store and retrieve db

//CREATE HTML ROUTES
//`GET /notes` should return the `notes.html` file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

//`GET *` should return the `index.html` file.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


//CREATE API ROUTES
//`GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
require('/api/notes')(app);

app.get('/api/notes' , function(req, res){
    res.send(fs.existsSync('./.db/.db.json') ?
    JSON.parse(fs.readFileSync('./.db/.db.json')) : [])
})
//`POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into `npm` packages that could do this for you). 
