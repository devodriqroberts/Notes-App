const fs = require('fs');

const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('note-data.json');
        return JSON.parse(notesString);
    } catch (err) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
};



let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

    let duplicateNotes = notes.filter( (note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    };
};

let getAll = () => {
    let notes = fetchNotes();

    for (let i = 0; i < notes.length; i++) {
        console.log("-----");
        console.log(notes[i].title);
        console.log(notes[i].body);
        console.log("-----");
    };
};

let readNote = (title) => {
    let notes = fetchNotes();
    filteredNote = notes.filter((note => note.title === title));
    return filteredNote[0];
};

let delNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes)
    return notes.length != filteredNotes.length;
};

let logNote = (note) => {
    debugger;
    console.log("---");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log("---");
};

module.exports = {
    //same as addNote: addNote
    addNote,
    getAll,
    readNote,
    delNote,
    logNote,
};



