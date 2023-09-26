import { SPRITES } from "./assets";
import { showDiv, hideDiv } from "./render";

const sideLeftDiv = document.querySelector(".top-left");
const sideBottomDiv = document.querySelector(".bottom-right");

const helpDiv = document.getElementById('help');
const helpContentDiv = document.getElementById('helpContent');
const imageHelpDiv = document.getElementById('imageHelp');
const closeHelpDiv = document.getElementById('closeHelp');

let helpArr = [];
let helpIndex = 0;

let helpButton = document.createElement('div');
helpButton.id = "helpButtonDiv";
helpButton.onclick = showHelp;

export function initHelp() {
    helpArr = [
        SPRITES.help1, SPRITES.help2, SPRITES.help3, SPRITES.help4, SPRITES.help5,
        SPRITES.help6, SPRITES.help7, SPRITES.help8, SPRITES.help9, SPRITES.help10,
        SPRITES.help11, SPRITES.help12,
    ];

    helpButton.append(SPRITES.helpBook);
}

export function resetHelpButton(sides) {
    if (sides.side === 'top') sideBottomDiv.append(helpButton);
    else sideLeftDiv.append(helpButton);
}

closeHelpDiv.onclick = hideHelp;
helpContentDiv.onclick = nextHelp;

function showHelp() {
    nextHelp();
    showDiv(helpDiv);
}

export function hideHelp() {
    hideDiv(helpDiv);
}

function nextHelp() {
    imageHelpDiv.innerHTML = '';
    imageHelpDiv.append(helpArr[helpIndex]);

    helpIndex++;
    if (helpIndex === helpArr.length) helpIndex = 0;
}