import { Menu } from "./Menu";

export class Header {
    constructor(show, game) {
        this.show = show;
        this.game = game;
    }
    init() {
        const fragment = document.createDocumentFragment();
        const menuBtn = document.createElement('button');
        const burger = document.createElement('div');
        const header = document.createElement('header');
        const labelToGame = document.createElement('p');
        const container = document.createElement('div');
        const gameName = document.createElement('p');
        const gameControlArea = document.createElement('div');
        const gameBtn = document.createElement('button');

        /* game control */
        const gameControl = document.createDocumentFragment();
        labelToGame.textContent = 'Play game';
        labelToGame.className = 'game_text';
        gameControlArea.className = 'game_ctrl-area';
        gameBtn.className = 'game_btn';
        gameControlArea.append(gameBtn);
        gameControl.append(gameControlArea)
        labelToGame.append(gameControlArea);

        /* Logic  */

        menuBtn.addEventListener('click', this.show);
        labelToGame.addEventListener('click', this.game);

        /*  */

        gameName.className = 'game_name';
        gameName.textContent = 'English for kids';
        burger.className = 'menu-btn_burger';
        menuBtn.className = 'header_btn menu-btn';
        header.className = 'header';
        container.className = 'container';
        menuBtn.append(burger);
        container.append(menuBtn, gameName, labelToGame)
        header.append(container);
        fragment.append(header);
        return fragment
    }
}