export class Card {
    constructor (id, page = undefined, translate, gameState) {
        this.id = id;
        this.translate = translate;
        this.page = page;
        this.gameState = gameState;
    }
    
    rotateBack (item) {

        item.target.classList.remove('card--rotated');
        item.target.removeEventListener('mouseleave', this.rotateBack);
    }

    async playSound(e) {
        if (!e.target.classList.contains('card') || e.target.classList.contains('card--rotated')) return
        const sound = await import (`./../audio/${e.target.dataset.id}.mp3`);
        let audio =  new Audio(sound.default);
        audio.play();
    }

    rotateCard(e) {
        let item = e.target.parentElement;
        item.classList.add('card--rotated');
        item.addEventListener('mouseleave', (item) => this.rotateBack(item))
    }
 
    init() {
        let card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = this.id;

        let cardPict = document.createElement('img');
        cardPict.className = 'card_picture';
        cardPict.src = `./img/${this.id}.png`;

        let cardDescr = document.createElement('p');
        cardDescr.className = 'card_description';
        cardDescr.textContent = this.id;

        let btnToRotate = document.createElement('button');
        btnToRotate.className = 'card_btn';
        btnToRotate.addEventListener('click', (e) => this.rotateCard(e))

        let translatedCardDescr = document.createElement('p');
        translatedCardDescr.className = 'card_translation';
        translatedCardDescr.textContent = this.translate;

        card.append(cardPict);
        if (!this.gameState) {card.append(cardDescr)}
        if (this.page != "Main Page" && !this.gameState) {
            card.append(btnToRotate, translatedCardDescr);
            card.addEventListener('click', (e) => this.playSound(e))
        }
        return card;
    }
    
}