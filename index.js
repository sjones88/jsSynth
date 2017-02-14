let audioContext = new (window.AudioContext || window.webkitAudioContext);
let oscList = [];
let masterGainNode = null;
let keyboard = document.querySelector(".keyboard");
let wavePicker = document.querySelector("select[name='waveform']");
let volumeControl = document.querySelector("input[name='volume']");
let noteFreq = [];
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;

function createNoteTable() {
	let a = 2 ** (1/12);
	let n = -57;
	let notes = ["C", "C#", "D", "D#", "E",
							 "F", "F#", "G", "G#", "A", "A#", "B"];

	for (let i=0; i<9; i++) {
		noteFreq[i] = [];
		for (let j=0; j<notes.length; j++) {
			noteFreq[i][notes[j]] = 440*(a**n);
			n++;
		}
	}

	return noteFreq;
}

