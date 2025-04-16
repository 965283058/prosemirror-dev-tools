"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devToolsSizeAtom = exports.devToolsOpenedAtom = exports.devToolTabIndexAtom = void 0;
var _jotai = require("jotai");
var devToolsOpenedAtom = exports.devToolsOpenedAtom = (0, _jotai.atom)(false);
var devToolsSizeAtom = exports.devToolsSizeAtom = (0, _jotai.atom)(0.5);
var devToolTabIndexAtom = exports.devToolTabIndexAtom = (0, _jotai.atom)("state");