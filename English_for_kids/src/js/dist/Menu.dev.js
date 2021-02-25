"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu =
/*#__PURE__*/
function () {
  function Menu(data, func) {
    _classCallCheck(this, Menu);

    this.height = '100vh';
    this.width = '250px';
    this.data = data;
    this.func = func;
  }

  _createClass(Menu, [{
    key: "showMenu",
    value: function showMenu(target, target2) {
      target.classList.toggle('opened');
      target2.classList.toggle('opened');
      document.body.classList.toggle('no-scroll');
    }
  }, {
    key: "closeMenu",
    value: function closeMenu(target, target2) {
      target.classList.remove('opened');
      target2.classList.remove('opened');
      document.body.classList.remove('no-scroll');
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      var fragment = document.createDocumentFragment();
      var menu = document.createElement('div');
      var wrapper = document.createElement('div');
      wrapper.className = 'overlay';
      wrapper.addEventListener('click', function (target) {
        return _this.closeMenu(wrapper, menu);
      });
      menu.className = 'menu'; // button to close/open menu

      var menuBtn = document.createElement('button');
      var burger = document.createElement('div');
      burger.className = 'menu_burger';
      menuBtn.className = 'menu_btn';
      menuBtn.addEventListener('click', function (target) {
        return _this.showMenu(wrapper, menu);
      });
      var menuFragment = document.createDocumentFragment();
      var menuList = document.createElement('div');
      menuList.className = 'menu_list';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var item = _step.value;
          var menuItem = document.createElement('button');
          menuItem.textContent = item.theme;
          menuItem.className = menuItem.textContent == 'Main Page' ? 'menu_item menu_item--active' : 'menu_item';
          menuItem.dataset.id = item.theme;
          menuItem.addEventListener('click', function () {
            document.querySelectorAll('.menu_item').forEach(function (item) {
              return item.classList.remove('menu_item--active');
            });
            menuItem.classList.add('menu_item--active');
          });
          menuItem.addEventListener('click', _this.func);
          menuFragment.append(menuItem);
        };

        for (var _iterator = this.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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

      menuBtn.append(burger);
      menu.append(menuBtn, menuFragment);
      fragment.append(wrapper, menu);
      document.body.append(fragment);
    }
  }]);

  return Menu;
}();

exports.Menu = Menu;