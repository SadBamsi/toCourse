"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Card =
/*#__PURE__*/
function () {
  function Card(id) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var translate = arguments.length > 2 ? arguments[2] : undefined;
    var gameState = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, Card);

    this.id = id;
    this.translate = translate;
    this.page = page;
    this.gameState = gameState;
  }

  _createClass(Card, [{
    key: "rotateBack",
    value: function rotateBack(item) {
      item.target.classList.remove('card--rotated');
      item.target.removeEventListener('mouseleave', this.rotateBack);
    }
  }, {
    key: "playSound",
    value: function playSound(e) {
      var sound, audio;
      return regeneratorRuntime.async(function playSound$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!e.target.classList.contains('card') || e.target.classList.contains('card--rotated'))) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(Promise.resolve().then(function () {
                return _interopRequireWildcard(require("./../audio/".concat(e.target.dataset.id, ".mp3")));
              }));

            case 4:
              sound = _context.sent;
              audio = new Audio(sound["default"]);
              audio.play();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "rotateCard",
    value: function rotateCard(e) {
      var _this = this;

      var item = e.target.parentElement;
      item.classList.add('card--rotated');
      item.addEventListener('mouseleave', function (item) {
        return _this.rotateBack(item);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      var card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = this.id;
      var cardPict = document.createElement('img');
      cardPict.className = 'card_picture';
      cardPict.src = "./img/".concat(this.id, ".png");
      var cardDescr = document.createElement('p');
      cardDescr.className = 'card_description';
      cardDescr.textContent = this.id;
      var btnToRotate = document.createElement('button');
      btnToRotate.className = 'card_btn';
      btnToRotate.addEventListener('click', function (e) {
        return _this2.rotateCard(e);
      });
      var translatedCardDescr = document.createElement('p');
      translatedCardDescr.className = 'card_translation';
      translatedCardDescr.textContent = this.translate;
      card.append(cardPict);

      if (!this.gameState) {
        card.append(cardDescr);
      }

      if (this.page != "Main Page" && !this.gameState) {
        card.append(btnToRotate, translatedCardDescr);
        card.addEventListener('click', function (e) {
          return _this2.playSound(e);
        });
      }

      return card;
    }
  }]);

  return Card;
}();

exports.Card = Card;