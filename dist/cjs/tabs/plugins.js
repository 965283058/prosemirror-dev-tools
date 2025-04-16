"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginState = PluginState;
exports["default"] = PluginsTab;
exports.valueRenderer = valueRenderer;
var _react = _interopRequireWildcard(require("react"));
var _infoPanel = require("../components/info-panel");
var _heading = require("../components/heading");
var _jsonTree = _interopRequireDefault(require("../components/json-tree"));
var _list = require("../components/list");
var _splitView = require("../components/split-view");
var _jotai = require("jotai");
var _editorState = require("../state/editor-state");
var _searchBar = _interopRequireDefault(require("../components/search-bar"));
var _button = _interopRequireDefault(require("../components/button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function valueRenderer(raw) {
  if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === "function") {
    return "func";
  }
  return raw;
}
function PluginState(props) {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_heading.Heading, null, "Plugin State"), /*#__PURE__*/_react["default"].createElement(_jsonTree["default"], {
    data: props.pluginState,
    valueRenderer: valueRenderer,
    sortObjectKeys: true
  }));
}

// TODO: replace isDimmed with useCallback once EditorStateContainer is decomposed
function PluginsTab() {
  var state = (0, _jotai.useAtomValue)(_editorState.editorStateAtom);
  if (!state) return null;
  var _useState = (0, _react.useState)(state.plugins[0]),
    _useState2 = _slicedToArray(_useState, 2),
    selectedPlugin = _useState2[0],
    setSelectedPlugin = _useState2[1];
  var _useState3 = (0, _react.useState)(state.plugins),
    _useState4 = _slicedToArray(_useState3, 2),
    pluginsLocal = _useState4[0],
    setPluginsLocal = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    sortAsc = _useState6[0],
    setSortOrder = _useState6[1];
  var handleOnListItemClick = _react["default"].useCallback(function (_plugin) {
    return setSelectedPlugin(_plugin);
  }, []);
  var selectedPluginState = selectedPlugin.getState(state);
  var handleSearch = (0, _react.useCallback)(function (input) {
    var filteredPlugins = state.plugins.filter(function (plugin) {
      return plugin.key.toLowerCase().includes(input.toLowerCase());
    });
    setPluginsLocal(filteredPlugins);
  }, [state.plugins]);
  var handleClickSort = function handleClickSort() {
    setSortOrder(!sortAsc);
  };
  var handleSortAsc = function handleSortAsc(plugins) {
    return _toConsumableArray(plugins).sort(function (a, b) {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    });
  };
  var handleSortDes = function handleSortDes(plugins) {
    return _toConsumableArray(plugins).sort(function (a, b) {
      if (a.key < b.key) {
        return 1;
      }
      if (a.key > b.key) {
        return -1;
      }
      return 0;
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_splitView.SplitView, {
    testId: "__prosemirror_devtools_tabs_plugins__"
  }, /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
    noPaddings: true
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      marginLeft: 6,
      marginRight: 6,
      marginBottom: 3,
      marginTop: 3
    }
  }, /*#__PURE__*/_react["default"].createElement(_searchBar["default"], {
    onSearch: handleSearch
  }), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    onClick: handleClickSort
  }, "SORT ", sortAsc ? "DES" : "ASC")), /*#__PURE__*/_react["default"].createElement(_list.List, {
    items: sortAsc ? handleSortAsc(pluginsLocal) : handleSortDes(pluginsLocal),
    getKey: function getKey(plugin) {
      return plugin.key;
    },
    title: function title(plugin) {
      return plugin.key;
    },
    isDimmed: function isDimmed(plugin) {
      return !plugin.getState(state);
    },
    onListItemClick: handleOnListItemClick
  })), /*#__PURE__*/_react["default"].createElement(_splitView.SplitViewCol, {
    grow: true,
    sep: true
  }, selectedPluginState ? /*#__PURE__*/_react["default"].createElement(PluginState, {
    pluginState: selectedPluginState
  }) : /*#__PURE__*/_react["default"].createElement(_infoPanel.InfoPanel, null, "Plugin doesn't have any state")));
}