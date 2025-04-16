"use strict";

var _jsondiffpatch = require("jsondiffpatch");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var diffPatcher = new _jsondiffpatch.DiffPatcher({
  arrays: {
    detectMove: false,
    includeValueOnMove: false
  },
  textDiff: {
    minLength: 1
  }
});
self.addEventListener("message", function (e) {
  if (!e.data.id || !e.data.method || !e.data.args) {
    return;
  }
  switch (e.data.method) {
    case "diff":
      {
        var _e$data$args = _slicedToArray(e.data.args, 1),
          _e$data$args$ = _e$data$args[0],
          a = _e$data$args$.a,
          b = _e$data$args$.b,
          id = _e$data$args$.id;
        self.postMessage({
          id: e.data.id,
          returns: {
            id: id,
            delta: diffPatcher.diff(a, b)
          }
        });
        break;
      }
    default:
      throw new Error("unknown method: " + e.data.method);
  }
});