"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResizeDocument = useResizeDocument;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function useResizeDocument(isOpen, defaultSize) {
  _react["default"].useEffect(function () {
    if (!isOpen) {
      document.querySelector("html").style.marginBottom = "";
    } else {
      var size = defaultSize * window.innerHeight;
      document.querySelector("html").style.marginBottom = "".concat(size, "px");
    }
  }, [defaultSize, isOpen]);
}