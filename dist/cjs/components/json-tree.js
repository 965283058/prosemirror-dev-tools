"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = JSONTreeWrapper;
var _react = _interopRequireDefault(require("react"));
var _reactJsonTree = require("react-json-tree");
var _theme = require("../theme");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function JSONTreeWrapper(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactJsonTree.JSONTree, _extends({
    invertTheme: false,
    theme: _theme.jsonTreeTheme,
    hideRoot: true
  }, props));
}