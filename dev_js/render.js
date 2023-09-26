import View from './classes/View';
import { hideHelp, resetHelpButton } from './help';
import { playMusic, stopMusic } from './sound';

const VIEW = new View();

export const shellDiv = document.getElementById('shell');
const gameDiv = document.getElementById('gameDiv');
let isGameDivShown = false;
let isRendering = true;

function getSideSizes() {
    if (gameDiv.offsetWidth > gameDiv.offsetHeight) {
        return {
            width: gameDiv.offsetWidth - VIEW.canvas.offsetWidth,
            height: VIEW.canvas.offsetHeight,
            yandexWidth: screen.availWidth - gameDiv.offsetWidth,
            yandexHeight: VIEW.canvas.offsetHeight,
            side: 'right',
        };
    } else {
        return {
            width: VIEW.canvas.offsetWidth,
            height: gameDiv.offsetHeight - VIEW.canvas.offsetHeight,
            yandexWidth: VIEW.canvas.offsetWidth,
            yandexHeight: screen.availHeight - gameDiv.offsetHeight,
            side: 'top',
        };
    }
}

document.body.onresize = () => {
    VIEW.resize();
    if (document.fullscreenEnabled && !document.fullscreenElement) {
        stopRender();
    }

    hideHelp();
    if (isGameDivShown) resetHelpButton(getSideSizes());
};

shellDiv.onclick = () => {
    startRender();

    if (document.fullscreenEnabled
    && !document.fullscreenElement) {
        document.body.requestFullscreen();
    }

    if (!isGameDivShown) {
        isGameDivShown = true;
        showDiv(gameDiv);
        resetHelpButton(getSideSizes());
    }
};

export function showDiv(div, innerData) {
    if (innerData) div.innerHTML = innerData;

    div.style.display = "flex";
    setTimeout(() => div.style.opacity = 1, 0);
}

export function hideDiv(div, innerData) {
    if (innerData) div.innerHTML = innerData;

    div.style.opacity = 0;
    setTimeout(() => div.style.display = 'none', 1200);
}

document.body.onblur = stopRender;

function startRender() {
    hideDiv(shellDiv);
    playMusic();
    isRendering = true;
    previousTime = performance.now();
    renderId = requestAnimationFrame(render);
}

function stopRender() {
    stopMusic();
    showDiv(shellDiv);
    isRendering = false;
    cancelAnimationFrame(renderId);
}

let previousTime = performance.now();
let renderId = requestAnimationFrame(render);
function render(time) {
    const deltaTime = time - previousTime;
    previousTime = time;
    VIEW.context.clearRect(0, 0, VIEW.width, VIEW.height);
    VIEW.layers.forEach( layer => layer.update(deltaTime) );
    if (isRendering) renderId = requestAnimationFrame(render);
}

export default VIEW;