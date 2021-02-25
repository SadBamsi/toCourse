export class Congrat {
    constructor(correctAnswer, incorrectAnswer) {
        this.correctAnswer = correctAnswer;
        this.incorrectAnswer = incorrectAnswer;
    }


    init() {
        let fragment = document.createDocumentFragment();
        let congratBlock = document.createElement('div');
        let ststisticBlock = document.createElement('div');
        let statisticDescr = document.createElement('p');
        
        congratBlock.className = 'congrat';
        statisticDescr.className = 'congrat_text';
        ststisticBlock.className = 'congrat_statistic-block statistic-block';

        statisticDescr.textContent = `You answered ${this.correctAnswer} question(s) correctly. ${this.correctAnswer > (this.correctAnswer + this.incorrectAnswer) / 2 ? 'Good job' : 'Try again'}`;


        for (let i = 0; i < this.correctAnswer + this.incorrectAnswer; i++) {
            let statisticIcon = document.createElement('object');
            statisticIcon.className = 'statistic-block_icon';
            statisticIcon.data = i > this.correctAnswer - 1 ? './../img/icons/star-empty.svg' : './../img/icons/star.svg';
            ststisticBlock.append(statisticIcon);
        }

        congratBlock.append(statisticDescr,ststisticBlock);
        fragment.append(congratBlock);
        document.body.append(fragment);
    }
}