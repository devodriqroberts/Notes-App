const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
// Note title options
const titleOptions = {
    describe: 'Title of note.',
    demand: true,
    alias: 't'
};
//Note body options
const bodyOptions = {
    describe: 'Body of note.',
    demand: true,
    alias: 'b'
};


const argv = yargs
.command('add', 'Add a new note.', {
    title: titleOptions,
    body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note.', {
    title: titleOptions
})
.command('delete', 'Delete a note.', {
    title: titleOptions
})
.help()
.argv;

let command = argv._[0];
let message;

let file = process.argv[3];


if (command === "add") {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log("Note has been created!");
        notes.logNote(note);
    } else {
        console.log("Note taken.")
    };

} else if (command === 'list') {
    let listNotes = notes.getAll();

} else if (command === "read") {
    let selected = notes.readNote(argv.title);
     message = selected ? `Opening: ${selected.title}` : "Note not found";
     console.log(message);
     notes.logNote(selected);


} else if (command === "delete") {
   let noteRemoved = notes.delNote(argv.title);
     message = noteRemoved ? `Note has been removed.` : `Note not found`;
    console.log(message);


} else {
    console.log("Not recognized");
}




