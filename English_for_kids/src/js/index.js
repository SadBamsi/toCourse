import style from './../styles/style.scss';
import data from './../js/data.JSON';
import {
    Menu
} from './Menu.js';
import {
    application,
    createGame,
    drawArea,
    refreshCardsArea,
    showMenu,
} from './helpers';
import { Header } from './Header';
import { Footer } from './Footer';





const header = new Header(showMenu, createGame).init();
document.body.append(header);

const menu = new Menu(data, (e, target) => refreshCardsArea(e, application));
menu.init();

/* First Draw */

document.body.append(drawArea(data));

/*  */



const footer = Footer.init();
document.body.append(footer);

