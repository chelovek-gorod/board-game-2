import { SPRITES_PATH, SPRITES, SOUNDS_PATH, SOUNDS } from './assets';

const loadState = {
    files : 0,
    loaded : 0,
}

export function loader(callbackDone, callbackProgress) {
    let assetsNumber = Object.keys(SPRITES).length + Object.keys(SOUNDS).length;
    loadState.files = assetsNumber;
    
    for (const sprite in SPRITES) {
        const image = new Image();
        image.src = SPRITES_PATH + SPRITES[sprite];
        image.onload = () => {
            SPRITES[sprite] = image;
            updateLoadingState();
        }
    }
    
    for (const sound in SOUNDS) {
        const se = new Audio( SOUNDS_PATH + SOUNDS[sound] );
        se.oncanplaythrough = (event) => {
            event.target.oncanplaythrough = null;
            SOUNDS[sound] = se;
            updateLoadingState();
        }
        // for IOS and safari
        se.load();
    }

    function updateLoadingState() {
        loadState.loaded++;
        callbackProgress(loadState);
        assetsNumber--;
        if (!assetsNumber) callbackDone();
    }
};