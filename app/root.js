const audio = require('nativescript-audio');
const getViewById = require("tns-core-modules/ui/core/view").getViewById;

const player = new audio.TNSPlayer();

const number_to_note = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const note_to_number = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6};

let note_number;

exports.generate = function() {
    note_number = Math.floor((Math.random() * 7));
    console.log(number_to_note[note_number]);
    player.playFromUrl({
        audioFile: 'https://raw.githubusercontent.com/tpitois/perfectpitch/master/sounds/'+number_to_note[note_number].toLowerCase()+'.mp3',
        loop: false});
}

exports.onTap = function(arg) {
    var lbl = arg.object.parent.parent.getViewById('Label');
    var number = note_to_number[arg.object.text];
    if (number == note_number) {
        lbl.text = 'Perfect ! It was a '+number_to_note[number]+'.';
        lbl.className = 'green';
    } else {
        lbl.className = 'red';
        if (number > note_number) {
            lbl.text = 'Too high';
        } else {
            lbl.text = 'Too low';
        }
    }
}

