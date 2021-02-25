"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeTheme = changeTheme;
exports.clearCardArea = clearCardArea;

function changeTheme(e) {
  var el = e.target.dataset.id;
  return el;
}

function clearCardArea(target) {
  target.innerHTML = '';
}