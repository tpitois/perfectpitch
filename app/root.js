const audio = require('nativescript-audio');
const getViewById = require("tns-core-modules/ui/core/view").getViewById;

const player = new audio.TNSPlayer();

const number_to_note = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const note_to_number = {'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6};

let note_number = null;
let number = null;

exports.listen = function() {
    if (note_number != null) {
        player.playFromUrl({
            audioFile: 'https://raw.githubusercontent.com/tpitois/perfectpitch/master/sounds/'+number_to_note[note_number].toLowerCase()+'.mp3',
            loop: false});
    }
}

exports.generate = function(arg) {
    var lbl = arg.object.parent.parent.getViewById('label');
    lbl.text = '';
    note_number = Math.floor((Math.random() * 7));
    console.log(number_to_note[note_number]);
    player.playFromUrl({
        audioFile: 'https://raw.githubusercontent.com/tpitois/perfectpitch/master/sounds/'+number_to_note[note_number].toLowerCase()+'.mp3',
        loop: false});
}

exports.onTap = function(arg) {
    var lbl = arg.object.parent.parent.getViewById('label');
    number = note_to_number[arg.object.text];
    if (number == note_number) {
        lbl.text = 'Perfect ! It was a '+number_to_note[number]+'.';
        lbl.className = 'green';
    } else if (note_number == null) {
        lbl.text = 'Please generate a note.'
    } else {
        lbl.className = 'red';
        lbl.text = 'Not the correct note.'
    }
    player.playFromUrl({
        audioFile: 'https://raw.githubusercontent.com/tpitois/perfectpitch/master/sounds/'+number_to_note[number].toLowerCase()+'.mp3',
        loop: false});
}

