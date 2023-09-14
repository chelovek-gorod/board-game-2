import { SOUNDS, MUSIC_PATH } from "./assets";

const soundState = {
    music: true,
    effects: true,
}

const music = [
    'bgm_tavern_1.mp3',
    'bgm_tavern_2.mp3',
    'bgm_tavern_3.mp3',
    'bgm_tavern_4.mp3',
    'bgm_tavern_5.mp3',
]
let musicIndex = Math.floor(Math.random() * music.length);

const backgroundMusic = new Audio();
backgroundMusic.addEventListener('ended', playMusic);

export function setSoundState(state) {
    soundState.music = state.music;
    soundState.effects = state.effects;
    if (soundState.music) playMusic();
    else playMusic(false);
}

let stepSoundIndex = Math.floor(Math.random() * 4);
export function playSound(sound) {
    if (!soundState.effects) return;

    if (!sound) {
        SOUNDS['step' + stepSoundIndex].play();
        stepSoundIndex++;
        if (stepSoundIndex > 3) stepSoundIndex = 0;
    } else {
        sound.currentTime = 0;
        sound.play();
    }
}

export function playMusic(isAvailable = true) {
    if (!isAvailable) {
        backgroundMusic.pause();
        return;
    }

    backgroundMusic.src = MUSIC_PATH + music[musicIndex];
    backgroundMusic.volume = 0.1;
    backgroundMusic.play();

    musicIndex++;
    if(musicIndex === music.length) musicIndex = 0;
}