import View from './classes/View';
import { playMusic } from './sound';

const VIEW = new View();

const divShell = document.getElementById('shell');
showSell();
// document.fullscreenEnabled -> true / false
// document.fullscreenElement -> null / element
// document.body.requestFullscreen();

let isRendering = true;
let isCanvasVisible = false;

document.body.onresize = () => {
    VIEW.resize();
    if (document.fullscreenEnabled
    && !document.fullscreenElement) {
        stopRender();
    }
};

divShell.onclick = () => {
    startRender()
    if (document.fullscreenEnabled
    && !document.fullscreenElement) {
        document.body.requestFullscreen();
    }

    if (!isCanvasVisible) {
        isCanvasVisible = true;
        VIEW.canvas.style.opacity = 1;
    }
};

document.body.onblur = stopRender;

function showSell() {
    divShell.style.display = 'flex';
    divShell.innerHTML = '<div><nobr>CLICK SCREEN</nobr> FOR <nobr>START GAME</nobr></div>';
    playMusic(false);
}

function hideSell() {
    divShell.style.display = 'none';
    playMusic();
}

function startRender() {
    hideSell()
    isRendering = true;
    previousTime = performance.now();
    renderId = requestAnimationFrame(render);

    console.log('start render');
}

function stopRender() {
    showSell()
    isRendering = false;
    cancelAnimationFrame(renderId);
    console.log('stop render');
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