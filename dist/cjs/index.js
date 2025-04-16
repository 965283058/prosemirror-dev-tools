"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyDevTools = applyDevTools;
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _devTools = _interopRequireDefault(require("./dev-tools"));
var _client = require("react-dom/client");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DEVTOOLS_CLASS_NAME = "__prosemirror-dev-tools__";
var root;
function createPlace() {
  var place = document.querySelector(".".concat(DEVTOOLS_CLASS_NAME));
  if (!place) {
    place = document.createElement("div");
    place.className = DEVTOOLS_CLASS_NAME;
    document.body.appendChild(place);
  } else {
    // eslint-disable-next-line react/no-deprecated
    root.unmount();
    place.innerHTML = "";
  }
  return place;
}
function applyDevTools(editorView, props) {
  var place = createPlace();
  root = (0, _client.createRoot)(place);
  root.render(/*#__PURE__*/_react["default"].createElement(_devTools["default"], {
    editorView: editorView,
    diffWorker: props === null || props === void 0 ? void 0 : props.diffWorker
  }));
  return function () {
    root.unmount();
  };
}
var _default = exports["default"] = applyDevTools;