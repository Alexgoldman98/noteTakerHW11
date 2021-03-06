//require
const express = require('express');
const fs = require(`fs`)
const uuidv1 = require('uuidv1');

let db = JSON.parse(fs.readFileSync("db/db.json", "utf8"));

//give access to express
const app = express();
app.use( express.static( 'public' ) )

//let it parse data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const PORT = process.env.PORT || 8080;

//CREATE API ROUTES
//`GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
//get notes from db file
app.get('/api/notes', (req, res) => {
    console.log('requesting notes from db', req.body);
    res.send(db);
});


//delete notes from the db file
app.delete('/api/notes/:id', (req, res) => {
    let deleteNote = req.params.id;
    db = db.filter((note) => note.id != deleteNote);
    res.end();
});

//add notes to db file
app.post('/api/notes', (req, res) => {
    console.log("adding notes", req.body)
    db.push( {id: uuidv1(), title:req.body.title, text:req.body.text} );
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    res.end();
});


// start server
app.listen( PORT, () => {
    console.log(`listening: ${PORT}`)
})

