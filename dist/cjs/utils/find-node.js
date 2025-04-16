"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = findNodeIn;
exports.findNodeJSON = findNodeJSON;
exports.findPMNode = findPMNode;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function findNode(fullPath, currentNode, nodeToFind) {
  if (nodeToFind === currentNode) {
    return fullPath;
  }
  var fragment = currentNode.content;
  if (!fragment || !fragment.content) return null;
  var res = fragment.content.map(function (currentNode, i) {
    return findNode([].concat(_toConsumableArray(fullPath), ["content", i]), currentNode, nodeToFind);
  }).filter(function (res) {
    return Array.isArray(res) && res.length;
  })[0];
  return res;
}
function findNodeIn(doc, node) {
  var path = findNode([], doc, node);
  if (path) {
    return path.reduce(function (newPath, item) {
      // [0, content, content, 0] => [0, content, 0]
      // Because JSON representation a bit different from actual DOC.
      if (item === "content" && newPath[newPath.length - 1] === "content") {
        return newPath;
      }
      newPath.push(item);
      return newPath;
    }, []);
  }
}
function findNodeJSON(fullPath, currentNode, nodeToFind) {
  if (nodeToFind === currentNode) {
    return fullPath;
  }
  if (!currentNode.content) return [];
  if (currentNode.content === nodeToFind) {
    return fullPath.concat("content");
  }
  var res = currentNode.content.map(function (currentNode, i) {
    return findNodeJSON([].concat(_toConsumableArray(fullPath), ["content", i]), currentNode, nodeToFind);
  }).filter(function (res) {
    return Array.isArray(res) && res.length;
  })[0];
  return res;
}
function findPMNode(domNode) {
  var node;
  var target = domNode;
  while (!node && target) {
    if (target.pmViewDesc) {
      node = target;
    }
    target = target.parentNode;
  }
  return node;
}