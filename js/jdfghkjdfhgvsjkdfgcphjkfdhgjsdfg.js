/*!
 * clipboard.js v1.5.10
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT Â© Zeno Rocha
 */
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t()
    }
}(function() {
    var t, e, n;
    return function t(e, n, o) {
        function i(c, a) {
            if (!n[c]) {
                if (!e[c]) {
                    var s = "function" == typeof require && require;
                    if (!a && s) return s(c, !0);
                    if (r) return r(c, !0);
                    var l = new Error("Cannot find module '" + c + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var u = n[c] = {
                    exports: {}
                };
                e[c][0].call(u.exports, function(t) {
                    var n = e[c][1][t];
                    return i(n ? n : t)
                }, u, u.exports, t, e, n, o)
            }
            return n[c].exports
        }
        for (var r = "function" == typeof require && require, c = 0; c < o.length; c++) i(o[c]);
        return i
    }({
        1: [function(t, e, n) {
            var o = t("matches-selector");
            e.exports = function(t, e, n) {
                for (var i = n ? t : t.parentNode; i && i !== document;) {
                    if (o(i, e)) return i;
                    i = i.parentNode
                }
            }
        }, {
            "matches-selector": 5
        }],
        2: [function(t, e, n) {
            function o(t, e, n, o, r) {
                var c = i.apply(this, arguments);
                return t.addEventListener(n, c, r), {
                    destroy: function() {
                        t.removeEventListener(n, c, r)
                    }
                }
            }

            function i(t, e, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, e, !0), n.delegateTarget && o.call(t, n)
                }
            }
            var r = t("closest");
            e.exports = o
        }, {
            closest: 1
        }],
        3: [function(t, e, n) {
            n.node = function(t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }, n.nodeList = function(t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
            }, n.string = function(t) {
                return "string" == typeof t || t instanceof String
            }, n.fn = function(t) {
                var e = Object.prototype.toString.call(t);
                return "[object Function]" === e
            }
        }, {}],
        4: [function(t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!a.string(e)) throw new TypeError("Second argument must be a String");
                if (!a.fn(n)) throw new TypeError("Third argument must be a Function");
                if (a.node(t)) return i(t, e, n);
                if (a.nodeList(t)) return r(t, e, n);
                if (a.string(t)) return c(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function i(t, e, n) {
                return t.addEventListener(e, n), {
                    destroy: function() {
                        t.removeEventListener(e, n)
                    }
                }
            }

            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function(t) {
                    t.addEventListener(e, n)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(t, function(t) {
                            t.removeEventListener(e, n)
                        })
                    }
                }
            }

            function c(t, e, n) {
                return s(document.body, t, e, n)
            }
            var a = t("./is"),
                s = t("delegate");
            e.exports = o
        }, {
            "./is": 3,
            delegate: 2
        }],
        5: [function(t, e, n) {
            function o(t, e) {
                if (r) return r.call(t, e);
                for (var n = t.parentNode.querySelectorAll(e), o = 0; o < n.length; ++o)
                    if (n[o] == t) return !0;
                return !1
            }
            var i = Element.prototype,
                r = i.matchesSelector || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
            e.exports = o
        }, {}],
        6: [function(t, e, n) {
            function o(t) {
                var e;
                if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) t.focus(), t.setSelectionRange(0, t.value.length), e = t.value;
                else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var n = window.getSelection(),
                        o = document.createRange();
                    o.selectNodeContents(t), n.removeAllRanges(), n.addRange(o), e = n.toString()
                }
                return e
            }
            e.exports = o
        }, {}],
        7: [function(t, e, n) {
            function o() {}
            o.prototype = {
                on: function(t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({
                        fn: e,
                        ctx: n
                    }), this
                },
                once: function(t, e, n) {
                    function o() {
                        i.off(t, o), e.apply(n, arguments)
                    }
                    var i = this;
                    return o._ = e, this.on(t, o, n)
                },
                emit: function(t) {
                    var e = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[t] || []).slice(),
                        o = 0,
                        i = n.length;
                    for (o; i > o; o++) n[o].fn.apply(n[o].ctx, e);
                    return this
                },
                off: function(t, e) {
                    var n = this.e || (this.e = {}),
                        o = n[t],
                        i = [];
                    if (o && e)
                        for (var r = 0, c = o.length; c > r; r++) o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t], this
                }
            }, e.exports = o
        }, {}],
        8: [function(e, n, o) {
            ! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "select"], r);
                else if ("undefined" != typeof o) r(n, e("select"));
                else {
                    var c = {
                        exports: {}
                    };
                    r(c, i.select), i.clipboardAction = c.exports
                }
            }(this, function(t, e) {
                "use strict";

                function n(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                var i = n(e),
                    r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
                    },
                    c = function() {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                            }
                        }
                        return function(e, n, o) {
                            return n && t(e.prototype, n), o && t(e, o), e
                        }
                    }(),
                    a = function() {
                        function t(e) {
                            o(this, t), this.resolveOptions(e), this.initSelection()
                        }
                        return t.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = e.action, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                        }, t.prototype.initSelection = function t() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }, t.prototype.selectFake = function t() {
                            var e = this,
                                n = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandler = document.body.addEventListener("click", function() {
                                return e.removeFake()
                            }), this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "fixed", this.fakeElem.style[n ? "right" : "left"] = "-9999px", this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                        }, t.prototype.removeFake = function t() {
                            this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                        }, t.prototype.selectTarget = function t() {
                            this.selectedText = (0, i.default)(this.target), this.copyText()
                        }, t.prototype.copyText = function t() {
                            var e = void 0;
                            try {
                                e = document.execCommand(this.action)
                            } catch (n) {
                                e = !1
                            }
                            this.handleResult(e)
                        }, t.prototype.handleResult = function t(e) {
                            e ? this.emitter.emit("success", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            }) : this.emitter.emit("error", {
                                action: this.action,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }, t.prototype.clearSelection = function t() {
                            this.target && this.target.blur(), window.getSelection().removeAllRanges()
                        }, t.prototype.destroy = function t() {
                            this.removeFake()
                        }, c(t, [{
                            key: "action",
                            set: function t() {
                                var e = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                                if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            },
                            get: function t() {
                                return this._action
                            }
                        }, {
                            key: "target",
                            set: function t(e) {
                                if (void 0 !== e) {
                                    if (!e || "object" !== ("undefined" == typeof e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = e
                                }
                            },
                            get: function t() {
                                return this._target
                            }
                        }]), t
                    }();
                t.exports = a
            })
        }, {
            select: 6
        }],
        9: [function(e, n, o) {
            ! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if ("undefined" != typeof o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener"));
                else {
                    var c = {
                        exports: {}
                    };
                    r(c, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = c.exports
                }
            }(this, function(t, e, n, o) {
                "use strict";

                function i(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function c(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function s(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n)) return e.getAttribute(n)
                }
                var l = i(e),
                    u = i(n),
                    f = i(o),
                    d = function(t) {
                        function e(n, o) {
                            r(this, e);
                            var i = c(this, t.call(this));
                            return i.resolveOptions(o), i.listenClick(n), i
                        }
                        return a(e, t), e.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText
                        }, e.prototype.listenClick = function t(e) {
                            var n = this;
                            this.listener = (0, f.default)(e, "click", function(t) {
                                return n.onClick(t)
                            })
                        }, e.prototype.onClick = function t(e) {
                            var n = e.delegateTarget || e.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({
                                action: this.action(n),
                                target: this.target(n),
                                text: this.text(n),
                                trigger: n,
                                emitter: this
                            })
                        }, e.prototype.defaultAction = function t(e) {
                            return s("action", e)
                        }, e.prototype.defaultTarget = function t(e) {
                            var n = s("target", e);
                            return n ? document.querySelector(n) : void 0
                        }, e.prototype.defaultText = function t(e) {
                            return s("text", e)
                        }, e.prototype.destroy = function t() {
                            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                        }, e
                    }(u.default);
                t.exports = d
            })
        }, {
            "./clipboard-action": 8,
            "good-listener": 4,
            "tiny-emitter": 7
        }]
    }, {}, [9])(9)
});