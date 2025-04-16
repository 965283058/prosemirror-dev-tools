import React from "react";
import DevTools from "./dev-tools";
import { createRoot } from "react-dom/client";
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
  root = createRoot(place);
  root.render(/*#__PURE__*/React.createElement(DevTools, {
    editorView: editorView,
    diffWorker: props === null || props === void 0 ? void 0 : props.diffWorker
  }));
  return function () {
    root.unmount();
  };
}
export default applyDevTools;
export { applyDevTools };