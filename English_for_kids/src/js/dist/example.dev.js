"use strict";

var _style = _interopRequireDefault(require("./../styles/style.scss"));

var _data = _interopRequireDefault(require("./../js/data.JSON"));

var _Menu = require("./Menu.js");

var _Card = require("./Card.js");

var _functions = require("./functions");

var _CongratBanner = require("./CongratBanner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var activePage = 'Main Page';
var isGame = false;
/* Create elements to project */

var app = document.createElement('div');
var gameControl = document.createDocumentFragment();
var gameControlArea = document.createElement('div');
var gameBtn = document.createElement('button');
var wordRepeatBtn = document.createElement('button');
var wordToPlay = null;
var correct = 0,
    incorrect = 0;
var menu = new _Menu.Menu(_data["default"], function (e, target) {
  return refreshCardsArea(e, app);
});
/* Game control inizialization */

gameControlArea.className = 'game_ctrl-area';
gameBtn.className = 'game_btn';
gameControlArea.addEventListener('click', createGame);
gameControlArea.append(gameBtn);
gameControl.append(gameControlArea);
document.body.append(gameControl);
/* Menu initialization */

menu.init();
/* First Draw */

app.className = 'app';
app.append(drawArea(_data["default"]));
app.addEventListener('click', function (e) {
  return refreshCardsArea(e, app);
});
document.body.append(app);
/* repeat word */

wordRepeatBtn.className = 'game_repeat-btn';
wordRepeatBtn.addEventListener('click', function (voice) {
  return playSound(wordToPlay);
});
document.body.append(wordRepeatBtn);
/* Functions */

function initConfig(data) {
  var config = data.find(function (el) {
    return el.theme == activePage;
  });
  return config;
}

function drawArea(data) {
  var fragment = document.createDocumentFragment();
  var config = initConfig(data);

  if (Array.isArray(config.cards)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = config.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        var card = new _Card.Card(item, activePage).init();
        fragment.append(card);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    for (var key in config.cards) {
      var _card = new _Card.Card(key, activePage, config.cards[key], isGame).init();

      fragment.append(_card);
    }
  }

  return fragment;
}

function refreshCardsArea(e, target) {
  if (e.target.classList.contains('card') && activePage == 'Main Page' || e.target.classList.contains('menu_item')) {
    activePage = (0, _functions.changeTheme)(e);
    (0, _functions.clearCardArea)(target);
    target.append(drawArea(_data["default"]));
  }
}

function playSound(voice) {
  var sound, audio;
  return regeneratorRuntime.async(function playSound$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Promise.resolve().then(function () {
            return _interopRequireWildcard(require("./../audio/".concat(voice, ".mp3")));
          }));

        case 2:
          sound = _context.sent;
          audio = new Audio(sound["default"]);
          return _context.abrupt("return", audio.play());

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function changeWord(arr) {
  return arr.shift();
}

function checkCorrectWord(e, words) {
  return regeneratorRuntime.async(function checkCorrectWord$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!isCongrat()) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return");

        case 2:
          if (!(e.target.classList.contains('card') && e.target.dataset.id == wordToPlay)) {
            _context2.next = 9;
            break;
          }

          console.log('tut');
          _context2.next = 6;
          return regeneratorRuntime.awrap(playSound('trueAnswer'));

        case 6:
          correct++;
          _context2.next = 12;
          break;

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(playSound('falseAnswer'));

        case 11:
          incorrect++;

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(playSound(wordToPlay));

        case 14:
          playNextWord(words);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function isCongrat() {
  if (typeof wordToPlay === 'undefined') {
    (0, _functions.clearCardArea)(app);
    var congrat = new _CongratBanner.Congrat(correct, incorrect).init();
    return true;
  }

  return false;
}

function playNextWord(words) {
  wordToPlay = changeWord(words);

  if (isCongrat()) {
    return;
  }

  setTimeout(function () {
    return playSound(wordToPlay);
  }, 1000);
}

function createGame() {
  isGame = !isGame;
  gameControlArea.classList.toggle('game_ctrl-area--play');
  (0, _functions.clearCardArea)(app);
  wordRepeatBtn.classList.toggle('show');
  app.append(drawArea(_data["default"]));
  var config = Object.keys(initConfig(_data["default"]).cards).sort(function () {
    return Math.random() - .5;
  });
  wordToPlay = changeWord(config);
  setTimeout(function () {
    return playSound(wordToPlay);
  }, 500);
  app.addEventListener('click', function (e, arr) {
    return checkCorrectWord(e, config);
  });
}