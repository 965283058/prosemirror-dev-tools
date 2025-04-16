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
import React, { useCallback, useState } from "react";
import { InfoPanel } from "../components/info-panel";
import { Heading } from "../components/heading";
import JSONTree from "../components/json-tree";
import { List } from "../components/list";
import { SplitView, SplitViewCol } from "../components/split-view";
import { useAtomValue } from "jotai";
import { editorStateAtom } from "../state/editor-state";
import SearchBar from "../components/search-bar";
import Button from "../components/button";
export function valueRenderer(raw) {
  if (typeof (arguments.length <= 1 ? undefined : arguments[1]) === "function") {
    return "func";
  }
  return raw;
}
export function PluginState(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Heading, null, "Plugin State"), /*#__PURE__*/React.createElement(JSONTree, {
    data: props.pluginState,
    valueRenderer: valueRenderer,
    sortObjectKeys: true
  }));
}

// TODO: replace isDimmed with useCallback once EditorStateContainer is decomposed
export default function PluginsTab() {
  var state = useAtomValue(editorStateAtom);
  if (!state) return null;
  var _useState = useState(state.plugins[0]),
    _useState2 = _slicedToArray(_useState, 2),
    selectedPlugin = _useState2[0],
    setSelectedPlugin = _useState2[1];
  var _useState3 = useState(state.plugins),
    _useState4 = _slicedToArray(_useState3, 2),
    pluginsLocal = _useState4[0],
    setPluginsLocal = _useState4[1];
  var _useState5 = useState(true),
    _useState6 = _slicedToArray(_useState5, 2),
    sortAsc = _useState6[0],
    setSortOrder = _useState6[1];
  var handleOnListItemClick = React.useCallback(function (_plugin) {
    return setSelectedPlugin(_plugin);
  }, []);
  var selectedPluginState = selectedPlugin.getState(state);
  var handleSearch = useCallback(function (input) {
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
  return /*#__PURE__*/React.createElement(SplitView, {
    testId: "__prosemirror_devtools_tabs_plugins__"
  }, /*#__PURE__*/React.createElement(SplitViewCol, {
    noPaddings: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      marginLeft: 6,
      marginRight: 6,
      marginBottom: 3,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    onSearch: handleSearch
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: handleClickSort
  }, "SORT ", sortAsc ? "DES" : "ASC")), /*#__PURE__*/React.createElement(List, {
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
  })), /*#__PURE__*/React.createElement(SplitViewCol, {
    grow: true,
    sep: true
  }, selectedPluginState ? /*#__PURE__*/React.createElement(PluginState, {
    pluginState: selectedPluginState
  }) : /*#__PURE__*/React.createElement(InfoPanel, null, "Plugin doesn't have any state")));
}