let isRecording = false;
let currentChannel = 0; 
let channels = [[], [], [], []]; 
let metronomeInterval;
let isMetronomePlaying = false;

document.getElementById('recordBtn').addEventListener('click', () => {
    isRecording = !isRecording;
    if (isRecording) {
        currentChannel = parseInt(document.getElementById('channelSelect').value, 10);
        channels[currentChannel] = []; 
        console.log(`Recording started on channel: ${currentChannel + 1}`);
    } else {
        console.log('Recording stopped');
    }
});

document.getElementById('playBtn').addEventListener('click', () => {
    const selectedChannels = Array.from(document.querySelectorAll('.channelCheckbox:checked')).map(cb => parseInt(cb.value, 10));
    selectedChannels.forEach(channelIndex => {
        channels[channelIndex].forEach(note => {
            setTimeout(() => {
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

//dzwięki

const clap = document.querySelector('#clap')
const boom = document.querySelector('#boom')
const hihat = document.querySelector('#hihat')
const metronomeSound = new Audio('./sounds/tink.wav');

const sounds = {
    'a': clap,
    's': boom,
    'd': hihat
}

document.addEventListener('keypress', ev =>{
    console.log(ev)
    const sound = sounds[ev.key]
    sound.currentTime = 0
    sound.play()
    // switch(ev.key){
    //     case 'a':
    //         sound1.currentTime = 0
    //         sound1.play()
    //         break
    //     case 's':
    //         sound2.currentTime = 0
    //         sound2.play()
    //         break       
    //     case 'd':
    //         sound3.currentTime = 0
    //         sound3.play()
    //         break
    // }
})