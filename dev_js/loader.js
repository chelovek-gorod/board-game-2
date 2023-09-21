import { SPRITES_PATH, SPRITES, SOUNDS_PATH, SOUNDS } from './assets';

const loadState = {
    files : 0,
    loaded : 0,
}

export function loader(callbackDone, callbackProgress) {
    let assetsNumber = Object.keys(SPRITES).length + Object.keys(SOUNDS).length;
    loadState.files = assetsNumber;
    
    for (const sprite in SPRITES) {
        try {
            const image = new Image();
            image.src = SPRITES_PATH + SPRITES[sprite];
            image.onload = () => {
                console.log(SPRITES[sprite], 'LOADED')
                SPRITES[sprite] = image;
                updateLoadingState();
            }
        }
        catch(e) {
            console.log('ERROR ON ', SPRITES[sprite])
        }
    }
    
    for (const sound in SOUNDS) {
        try {
            const se = new Audio( SOUNDS_PATH + SOUNDS[sound] );
            se.oncanplaythrough = (event) => {
                event.target.oncanplaythrough = null;
                console.log(SOUNDS[sound], 'LOADED')
                SOUNDS[sound] = se;
                updateLoadingState();
            }
        }
        catch(e) {
            console.log('ERROR ON ', SOUNDS[sound])
        }
    }

    function updateLoadingState() {
        loadState.loaded++;
        callbackProgress(loadState);
        assetsNumber--;
        if (!assetsNumber) callbackDone();
    }
};