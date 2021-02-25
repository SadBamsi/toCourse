import { Card } from "./Card";
import { Congrat } from "./CongratBanner";
import data from './../js/data.JSON';
import { SmileZone } from './SmileZone';



export let activePage = 'Main Page';
export let application;
export let isGame = false;

let wordToPlay = null;
let correct = 0,
    incorrect = 0;
let randomWordsArray;



export function changeTheme (e) {
    const el = e.target.dataset.id;
    return el
}

export function clearCardArea(target) {
    target.remove();
}

export function stylyzeGameButton() {
    document.querySelector('.game_text').classList.toggle('hidden');
    document.querySelector('.game_ctrl-area').classList.toggle('game_ctrl-area--play');
}

export function showMenu() { 
    document.querySelector('.menu').classList.toggle('opened');
    document.querySelector('.overlay').classList.toggle('opened');
    document.querySelector('.menu-btn').classList.toggle('menu-btn--opened');
    document.querySelector('.overlay').addEventListener('click', showMenu);
    const menuItems = document.querySelectorAll('.menu_item');
    menuItems.forEach((item) => item.className = activePage === item.dataset.id ? 'menu_item menu_item--active' : 'menu_item')
}

export function newGameInit() {
    document.querySelector('.congrat').remove();
    document.querySelector('.smile-area').remove();
    stylzeGameArea(application)
    clearCardArea(application);
    activePage = 'Main Page';
    document.body.append(drawArea(data))
}

export function initConfig(data) {
    const config = data.find((el) => el.theme == activePage);
    return config;
}

export function drawArea(data) {
    let fragment = document.createDocumentFragment();
    let app = document.createElement('div');
    app.className = 'app';
    app.addEventListener('click', (e) => refreshCardsArea(e, app));
    app.addEventListener('click', (e) => checkCorrectWord(e, randomWordsArray));

    const config = initConfig(data);
    if (Array.isArray(config.cards)) {
        for (let item of config.cards) {
            const card = new Card(item, activePage).init();
            fragment.append(card)
        }
    } else {
        for (let key in config.cards) {
            const card = new Card(key, activePage, config.cards[key], isGame).init();
            fragment.append(card)
        }
    }

    app.append(fragment);
    application = app;
    return app;

}

function stylzeGameArea(target) {
        isGame = !isGame ;
        stylizeGameAttribute();
        stylyzeGameButton();
        document.querySelector('.game_repeat-btn').remove();
}

export function refreshCardsArea(e, target) {
    if (e.target.classList.contains('card') && activePage == 'Main Page' || e.target.classList.contains('menu_item')) {
        if(isGame) { 
            stylzeGameArea(target)
        }
        activePage = changeTheme(e);
        clearCardArea(target);
        document.body.append(drawArea(data))
        if(e.target.classList.contains('menu_item')) {
            showMenu()
        }
    }
}

export async function playSound(voice) {
    const sound = await import(`./../audio/${voice}.mp3`);
    let audio = new Audio(sound.default);
    audio.play();
}

export function changeWord(arr) {
    return arr.pop();
}

export async function checkCorrectWord(e, words) {
    if (isGame && e.target.classList.contains('card')) {
        if (isCongrat()) {
            return;
        }
        if ( e.target.dataset.id == wordToPlay) {
            await playSound('trueAnswer');
            e.target.classList.add('correct-answer');
            correct += 1;
            addIconToSmileZone(true);
            playNextWord(words);
        } else {
            await playSound('falseAnswer');
            addIconToSmileZone(false);
            incorrect += 1;
        }    
    }
}

export function playNextWord(words) {
    wordToPlay = changeWord(words);
    if (isCongrat()) {
        return;
    }
    setTimeout(() => playSound(wordToPlay), 1000);
}

export function stylizeGameAttribute() {
    document.querySelector('.game_ctrl-area').classList.toggle('game_ctrl-area--play');
    document.body.classList.toggle('game-play');
}

export function createGame () {
    if (activePage !== 'Main Page') {
        if (document.querySelector('.start-btn')) {
            document.querySelector('.start-btn').remove();
        } else {
            let startBtn = document.createElement('button');
            startBtn.className = 'game_repeat-btn start-btn';
            startBtn.textContent = 'Start Game';
            startBtn.addEventListener('click', playGame);
            document.body.append(startBtn);
        }
        stylizeGameAttribute();
    }
    if (isGame) {
        clearCardArea(application);
        isGame = !isGame;
        document.body.append(drawArea(data))
    }
}

function createStartGameButton() {
    document.querySelector('.start-btn') ? document.querySelector('.start-btn').remove() : false;
    const wordRepeatBtn = document.createElement('button');
    wordRepeatBtn.className = 'game_repeat-btn game_repeat-btn--game';
    wordRepeatBtn.textContent = 'Repeat Word';
    wordRepeatBtn.addEventListener('click', (voice) => playSound(wordToPlay));
    document.body.append(wordRepeatBtn)
}

function createSmileZone() {
    const smileArea = SmileZone.init();
    document.body.append(smileArea)
}

function addIconToSmileZone(el) {
    document.querySelector('.smile-area').append(createIconToSmileZone(el))
}

function createIconToSmileZone(el) {
    const smile = document.createElement('img')
    smile.className = 'smile-zone_pict';
    smile.src = el ? './img/icons/smile.svg' : './img/icons/sad.svg';
    return smile;
}


export function playGame() {
    createStartGameButton();
    stylyzeGameButton();
    isGame = !isGame;
    correct = 0, incorrect = 0;
    randomWordsArray = Object.keys(initConfig(data).cards).sort(() => Math.random() - .5);
    clearCardArea(application);
    document.body.append(drawArea(data));
    createSmileZone();
    if (isGame) {
        setTimeout(() => playSound(wordToPlay), 500);
    }
    wordToPlay = changeWord(randomWordsArray);
}

export function isCongrat() {
    if (typeof wordToPlay === 'undefined') {
        clearCardArea(application);
        const congrat = new Congrat(correct, incorrect).init();
        setTimeout(newGameInit, 5000);
        return true;
    }
    return false;
}