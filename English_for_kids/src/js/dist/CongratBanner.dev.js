"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Congrat = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Congrat =
/*#__PURE__*/
function () {
  function Congrat(correctAnswer, incorrectAnswer) {
    _classCallCheck(this, Congrat);

    this.correctAnswer = correctAnswer;
    this.incorrectAnswer = incorrectAnswer;
  }

  _createClass(Congrat, [{
    key: "init",
    value: function init() {
      var fragment = document.createDocumentFragment();
      var congratBlock = document.createElement('div');
      var ststisticBlock = document.createElement('div');
      var statisticDescr = document.createElement('p');
      var newGameBtn = document.createElement('button');
      congratBlock.className = 'congrat';
      statisticDescr.className = 'congrat_text';
      newGameBtn.className = 'congrat_btn';
      ststisticBlock.className = 'congrat_statistic-block statistic-block';
      statisticDescr.textContent = "You answered ".concat(this.correctAnswer, " question(s) correctly. ").concat(this.correctAnswer > (this.correctAnswer + this.incorrectAnswer) / 2 ? 'Good job' : 'Try again');
      newGameBtn.textContent = "New Game";

      for (var i = 0; i < this.correctAnswer + this.incorrectAnswer; i++) {
        var statisticIcon = document.createElement('object');
        statisticIcon.className = 'statistic-block_icon';
        statisticIcon.data = i > this.correctAnswer - 1 ? './../img/icons/star-empty.svg' : './../img/icons/star.svg';
        ststisticBlock.append(statisticIcon);
      }

      congratBlock.append(statisticDescr, ststisticBlock, newGameBtn);
      fragment.append(congratBlock);
      document.body.append(fragment);
    }
  }]);

  return Congrat;
}();

exports.Congrat = Congrat;