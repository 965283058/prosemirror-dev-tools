"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSubscribeToEditorView = useSubscribeToEditorView;
var _jotai = require("jotai");
var _react = _interopRequireDefault(require("react"));
var _editorState = require("../state/editor-state");
var _editorView = require("../state/editor-view");
var _history = require("../state/history");
var _subscribeOnUpdates = _interopRequireDefault(require("../utils/subscribe-on-updates"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function useSubscribeToEditorView(editorView, diffWorkerInstance) {
  var setEditorView = (0, _jotai.useSetAtom)(_editorView.editorViewAtom);
  var historyDispatcher = (0, _jotai.useSetAtom)(_history.historyWriteAtom);
  var setEditorState = (0, _jotai.useSetAtom)(_editorState.editorStateAtom);
  var diffWorker = diffWorkerInstance ? Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../state/json-diff-worker"));
  }).then(function (_ref) {
    var JsonDiffWorker = _ref.JsonDiffWorker;
    return new JsonDiffWorker(diffWorkerInstance);
  }) : Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../state/json-diff-main"));
  }).then(function (_ref2) {
    var JsonDiffMain = _ref2.JsonDiffMain;
    return new JsonDiffMain();
  });
  _react["default"].useEffect(function () {
    // set initial editor state
    setEditorState(editorView.state);

    // store editor view reference
    setEditorView(editorView);

    // historyDispatcher({ type: "reset", payload: { state: editorView.state } });

    (0, _subscribeOnUpdates["default"])(editorView, function (tr, oldState, newState) {
      setEditorState(newState);

      // historyDispatcher({
      //   type: "update",
      //   payload: {
      //     oldState,
      //     newState,
      //     tr,
      //     diffWorker,
      //   },
      // });
    });
  }, [editorView, diffWorker]);
}