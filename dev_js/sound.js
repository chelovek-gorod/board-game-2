import { SOUNDS, MUSIC_PATH } from "./assets";
const { Howl } = require('howler');

// SOUND EFFECTS

const soundState = {
    music: true,
    effects: true,
}

export function setSoundState(state) {
    const previousMusicState = soundState.music;
    soundState.music = state.music;
    soundState.effects = state.effects;
    if (previousMusicState !== soundState.music) {
        if (soundState.music) backgroundTrack.play();
        //else backgroundTrack.stop();
        else backgroundTrack.pause();
    }
}

let stepSoundIndex = Math.floor(Math.random() * 4);
let toiletSoundIndex = Math.floor(Math.random() * 4);

export function playSound(sound) {
    if (!soundState.effects) return;

    if (typeof sound === 'string') {
        switch (sound) {
            case 'step' : 
                SOUNDS['step' + stepSoundIndex].play();
                stepSoundIndex++;
                if (stepSoundIndex > 3) stepSoundIndex = 0;
                break;
            case 'toilet' : 
                SOUNDS['toilet' + toiletSoundIndex].play();
                toiletSoundIndex++;
                if (toiletSoundIndex > 3) toiletSoundIndex = 0;
                break;
        }
        return;
    }

    sound.currentTime = 0;
    sound.play();
}

// BACKGROUND MUSIC

const backgroundTracksArr = [
    'bgm_western_0.mp3',
    'bgm_western_1.mp3',
    'bgm_western_2.mp3',
    'bgm_western_3.mp3',
    'bgm_western_4.mp3',
];
let backgroundTrackIndex = Math.floor(Math.random() * backgroundTracksArr.length);
let backgroundTrack = null;

function nextTrack() {
    backgroundTrackIndex++;
    if (backgroundTrackIndex === backgroundTracksArr.length) backgroundTrackIndex = 0;

    const track = backgroundTracksArr[backgroundTrackIndex];
    backgroundTrack = getTrack(track);
    backgroundTrack.play();
}

function getTrack(track) {
    return new Howl({
        src: [MUSIC_PATH + track],
        volume: 0.5,
        onend: nextTrack,
    });
}

export function playMusic() {
    if (!soundState.music) return;

    if (backgroundTrack) backgroundTrack.play();
    else nextTrack();
}

export function stopMusic() {
    backgroundTrack.pause();
}