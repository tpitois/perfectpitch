const audio = require("nativescript-audio");
const applicationSettingsModule = require("tns-core-modules/application-settings")

const player = new audio.TNSPlayer();

const number_to_note = ["C", "D", "E", "F", "G", "A", "B"];
const note_to_number = {"C": 0, "D": 1, "E": 2, "F": 3, "G": 4, "A": 5, "B": 6};

let note_number = null;
let octave = null;
let number = null;
let attempts = applicationSettingsModule.getString("attempts", "");
attempts = attempts.split(",");
attempts = attempts.filter(Boolean);
let attempt = null;
let count_attempts = false;

exports.listen = function() {
    if (note_number != null) {
        player.playFromUrl({
            audioFile: "https://raw.githubusercontent.com/tpitois/perfectpitch/master/sounds/"+number_to_note[note_number].toLowerCase()+String(octave)+".mp3",
            loop: false});
    }
}

exports.generate = function(arg) {
    attempt = 0;
    var lbl = arg.object.parent.parent.getViewById("msg_label");
    lbl.text = "";
    note_number = Math.floor((Math.random() * 7));
    octave = Math.floor((Math.random() * 3)-1);
    console.log(number_to_note[note_number]);
    console.log(octave);
    player.playFromUrl({
        audioFile: "https://raw.githubusercontent.com/tpitois/perfectpitch/master/sounds/"+number_to_note[note_number].toLowerCase()+String(octave)+".mp3",
        loop: false});
}

exports.onTap = function(arg) {
    if (note_number != null && count_attempts == true) {
        attempt++;
    }
    var lbl = arg.object.parent.parent.getViewById("msg_label");
    number = note_to_number[arg.object.text];
    if (number == note_number) {
        lbl.text = "Perfect ! It was a "+number_to_note[number]+".";
        lbl.className = "green";
        if (note_number != null && count_attempts == true) {
            attempts.push(String(attempt));
            applicationSettingsModule.setString("attempts", String(attempts));
        }
    } else if (note_number == null) {
        lbl.text = "Please generate a note."
    } else {
        lbl.className = "red";
        lbl.text = "Not the correct note."
    }
    player.playFromUrl({
        audioFile: "https://raw.githubusercontent.com/tpitois/perfectpitch/master/sounds/"+number_to_note[number].toLowerCase()+"0.mp3",
        loop: false});
}

exports.onSwitchLoaded = function(argsloaded) {
    var mySwitch = argsloaded.object;
    mySwitch.on("checkedChange", (args) => {
        var sw = args.object;
        var isChecked = sw.checked;
        count_attempts = isChecked;
    });
}

