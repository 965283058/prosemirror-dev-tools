function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";
import { JSONTree } from "react-json-tree";
import { jsonTreeTheme } from "../theme";
export default function JSONTreeWrapper(props) {
  return /*#__PURE__*/React.createElement(JSONTree, _extends({
    invertTheme: false,
    theme: jsonTreeTheme,
    hideRoot: true
  }, props));
}