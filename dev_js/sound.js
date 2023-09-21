import { SOUNDS, MUSIC_PATH } from "./assets";

const soundState = {
    music: true,
    effects: true,
}

const music = [
    'bgm_western_0.mp3',
    'bgm_western_1.mp3',
    'bgm_western_2.mp3',
    'bgm_western_3.mp3',
    'bgm_western_4.mp3',
]
music.sort(() => Math.random() - 0.5);
let musicIndex = Math.floor(Math.random() * music.length);

const backgroundMusic = new Audio();
let backgroundMusicTime = 0;
backgroundMusic.addEventListener('ended', playMusic);

export function setSoundState(state) {
    const previousMusicState = soundState.music;
    soundState.music = state.music;
    soundState.effects = state.effects;
    if (previousMusicState !== soundState.music) {
        if (soundState.music) playMusic();
        else playMusic(false);
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

export function playMusic(isAvailable = true) {
    if (!isAvailable) {
        backgroundMusicTime = backgroundMusic.currentTime;
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        return;
    }

    if (backgroundMusicTime) {
        backgroundMusic.currentTime = backgroundMusicTime;
    }

    backgroundMusic.src = MUSIC_PATH + music[musicIndex];
    backgroundMusic.volume = 0.4;
    backgroundMusic.play();

    musicIndex++;
    if(musicIndex === music.length) musicIndex = 0;
}