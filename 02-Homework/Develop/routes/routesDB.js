const { response } = require("express");
const { get } = require("http");
const path = require("path");
const router = require('router');

router.get('/notes', (req, res) => {
    //add the db, save to a variable, and then attach it to the get notes
    getNotes().then(notes)=>{
        return res.json(notes)
    }.catch(function(error) {                        // catch
        console.log('Request failed', error);
      });
    
});


router.post('/note', (req, res) => {
   saveNote().then(note)=>{
       res.json(note)
   }.catch(function(error) {                        // catch
    console.log('Request failed', error);
    });
});


module.exports = router
