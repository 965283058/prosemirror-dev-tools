"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DevTools;
var _react = _interopRequireDefault(require("react"));
var _jotai = require("jotai");
var _global = require("./state/global");
var _devToolsCollapsed = _interopRequireDefault(require("./dev-tools-collapsed"));
var _devToolsExpanded = _interopRequireDefault(require("./dev-tools-expanded"));
var _useResizeDocument = require("./hooks/use-resize-document");
var _useSubscribeToEditorView = require("./hooks/use-subscribe-to-editor-view");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function DevTools(props) {
  var _useAtom = (0, _jotai.useAtom)(_global.devToolsOpenedAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    isOpen = _useAtom2[0],
    setIsOpen = _useAtom2[1];
  var defaultSize = (0, _jotai.useAtomValue)(_global.devToolsSizeAtom);
  var editorView = props.editorView;
  var toggleOpen = _react["default"].useCallback(function () {
    return setIsOpen(!isOpen);
  }, [isOpen]);
  (0, _useResizeDocument.useResizeDocument)(isOpen, defaultSize);
  (0, _useSubscribeToEditorView.useSubscribeToEditorView)(editorView, props.diffWorker);
  if (isOpen) {
    return /*#__PURE__*/_react["default"].createElement(_devToolsExpanded["default"], null);
  }
  return /*#__PURE__*/_react["default"].createElement(_devToolsCollapsed["default"], {
    onClick: toggleOpen
  });
}