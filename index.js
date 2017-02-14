let audioContext = new (window.AudioContext || window.webkitAudioContext);
let oscList = [];
let masterGainNode = null;
let keyboard = document.querySelector(".keyboard");
let wavePicker = document.querySelector("select[name='waveform']");
let volumeControl = document.querySelector("input[name='volume']");
let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;

function createNoteTable() {
	noteFreq = [];
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

function createKey(note, octave, freq) {
	let keyElement = document.createElement('div');
	let labelElement = document.createElement('div');

	if (note.length === 1) {
		keyElement.className = "key";
	} else {
		keyElement.className = "black key";
	}
	keyElement.dataset["octave"] = octave;
	keyElement.dataset["note"] = note;
	keyElement.dataset["frequency"] = freq;

	labelElement.innerHTML = note + "<sub>" + octave + "</sub>";
	keyElement.appendChild(labelElement);

	keyElement.addEventListener("mousedown", notePressed, false);
	keyElement.addEventListener("mouseup", noteReleased, false);
	keyElement.addEventListener("mouseover", notePressed, false);
	keyElement.addEventListener("mouseleave", noteReleased, false);

	return keyElement;
}

var changeVolume = (event) => {
	masterGainNode.gain.value = volumeControl.value;
};

function setup() {
	noteFreq = createNoteTable();

	volumeControl.addEventListener("change", changeVolume, false);

	masterGainNode = audioContext.createGain();
	masterGainNode.connect(audioContext.destination);
	masterGainNode.gain.value = volumeControl.value;

	noteFreq.forEach((keys, idx) => {
		let keyList = Object.entries(keys);
		console.log(keyList);
		let octaveElem = document.createElement("div");
		octaveElem.className = "octave";

		keyList.forEach((key) => {
			octaveElem.appendChild(createKey(key[0], idx, key[1]));
		});

		keyboard.appendChild(octaveElem);
	});

	document.querySelector("div[data-note='B'][data-octave='5']").scrollIntoView(false);

	sineTerms = new Float32Array([0, 0, 1, 0, 1]);
	cosineTerms = new Float32Array(sineTerms.length);
	customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

	for (i=0; i<9; i++) {
		oscList[i] = [];
	}
}

var playTone = (freq) => {
	let osc = audioContext.createOscillator(); // create a new OscillatorNode
	osc.connect(masterGainNode); // tell OscillatorNode where to send its output

};

setup();



