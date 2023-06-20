// express.js will be imported
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();const notes = require('./notes');
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes 

 //index.html file will be recevied from here
 app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "public/index.html"));
 });

 // html.file wil be requesting from here
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    );

app.get("/api/notes", (req, res) => {
   var getNotes = fs.readFileSync("./db/db.json");
   var showNotes = JSON.parse(getNotes);
   return res.json(showNotes);
 });
 
 
 app.post("/api/notes", (req, res) => {
   const {title, text} = req.body;
   const id = notes();
   const addNote = {
      title, 
      text, 
      id};
 
   var storeNotes = fs.readFileSync("./db/db.json");
   var savedArr = JSON.parse(storeNotes);
 
   savedArr.push(addNote);
 
   var addData = JSON.stringify(savedArr);
   fs.writeFile("./db/db.json", addData, (err) => {
     err ? console.error("Error") : console.log("Success");
   });
   res.json("Notes were added.");
 });

 // Updates and deletes notes
//not sure how to do it clearly. will come back and try to change it


// localhost where the app will be listenting
app.listen(PORT, () =>
  console.log(`The app is listening at http://localhost:${PORT}`)
);

