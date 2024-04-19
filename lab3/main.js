let isRecording = false;
let currentChannel = 0;
let channels = [[], [], [], []];
let metronomeInterval;
let isMetronomePlaying = false;
let recordStartTime;
let lastNoteTime = 0; 

document.getElementById('recordBtn').addEventListener('click', () => {
    isRecording = !isRecording;
    if (isRecording) {
        currentChannel = parseInt(document.getElementById('channelSelect').value, 10);
        recordStartTime = Date.now();
        if (channels[currentChannel].length > 0) {
            lastNoteTime = channels[currentChannel][channels[currentChannel].length - 1].time;
        } else {
            lastNoteTime = 0;
        }
        console.log(`Recording started on channel: ${currentChannel + 1}`);
    } else {
        console.log('Recording stopped');
    }
});


document.getElementById('playBtn').addEventListener('click', () => {
    const playbackStartTime = Date.now();
    const selectedChannels = Array.from(document.querySelectorAll('.channelCheckbox:checked')).map(cb => parseInt(cb.value, 10));
    selectedChannels.forEach(channelIndex => {
        channels[channelIndex].forEach(note => {
            setTimeout(() => {
                const sound = document.querySelector(`#${note.sound}`);
                sound.currentTime = 0;
                sound.play();
                console.log(`Play sound: ${note.sound} on channel: ${channelIndex + 1}`);
            }, note.time);
        });
    });
});


document.getElementById('metronomeBtn').addEventListener('click', () => {
    if (isMetronomePlaying) {
        clearInterval(metronomeInterval);
        isMetronomePlaying = false;
        console.log('Metronome stopped');
    } else {
        const bpm = parseInt(document.getElementById('bpm').value, 10);
        const intervalTime = 60000 / bpm;
        metronomeInterval = setInterval(() => {
            metronomeSound.currentTime = 0;
            metronomeSound.play();
            console.log('Tick');
        }, intervalTime);
        isMetronomePlaying = true;
        console.log('Metronome started');
    }
});

const metronomeSound = new Audio('./sounds/tink.wav');
const sounds = {
    'a': document.querySelector('#clap'),
    's': document.querySelector('#boom'),
    'd': document.querySelector('#hihat')
};

document.addEventListener('keypress', ev => {
    const sound = sounds[ev.key];
    if (!sound) return;
    
    sound.currentTime = 0;
    sound.play();
    const timeOffset = Date.now() - recordStartTime + lastNoteTime; 
    if (isRecording) {
        channels[currentChannel].push({
            sound: sound.id,
            time: timeOffset
        });
    }
});
