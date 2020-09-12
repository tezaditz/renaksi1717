/*
 Highmaps JS v8.2.0 (2020-08-20)

 (c) 2011-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (U, M) {
    "object" === typeof module && module.exports ? (M["default"] = M, module.exports = U.document ? M(U) : M) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function () {
        return M(U)
    }) : (U.Highcharts && U.Highcharts.error(16, !0), U.Highcharts = M(U))
})("undefined" !== typeof window ? window : this, function (U) {
    function M(l, b, Q, z) {
        l.hasOwnProperty(b) || (l[b] = z.apply(null, Q))
    }
    var q = {};
    M(q, "Core/Globals.js", [], function () {
        var l = "undefined" !== typeof U ? U : "undefined" !== typeof window ? window : {},
            b = l.document,
            Q = l.navigator && l.navigator.userAgent || "",
            z = b && b.createElementNS && !!b.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            w = /(edge|msie|trident)/i.test(Q) && !l.opera,
            C = -1 !== Q.indexOf("Firefox"),
            F = -1 !== Q.indexOf("Chrome"),
            H = C && 4 > parseInt(Q.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "8.2.0",
            deg2rad: 2 * Math.PI / 360,
            doc: b,
            hasBidiBug: H,
            hasTouch: !!l.TouchEvent,
            isMS: w,
            isWebKit: -1 !== Q.indexOf("AppleWebKit"),
            isFirefox: C,
            isChrome: F,
            isSafari: !F && -1 !== Q.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(Q),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: z,
            win: l,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {},
            charts: [],
            dateFormats: {}
        }
    });
    M(q, "Core/Utilities.js", [q["Core/Globals.js"]], function (l) {
        function b(c, d, f, e) {
            var a = d ? "Highcharts error" : "Highcharts warning";
            32 === c && (c = a + ": Deprecated member");
            var g = D(c),
                k = g ? a + " #" + c + ": www.highcharts.com/errors/" + c + "/" : c.toString();
            a = function () {
                if (d) throw Error(k);
                y.console && -1 === b.messages.indexOf(k) &&
                    console.log(k)
            };
            if ("undefined" !== typeof e) {
                var h = "";
                g && (k += "?");
                q(e, function (c, d) {
                    h += "\n - " + d + ": " + c;
                    g && (k += encodeURI(d) + "=" + encodeURI(c))
                });
                k += h
            }
            f ? ca(f, "displayError", {
                code: c,
                message: k,
                params: e
            }, a) : a();
            b.messages.push(k)
        }

        function Q() {
            var c, d = arguments,
                f = {},
                e = function (c, d) {
                    "object" !== typeof c && (c = {});
                    q(d, function (f, a) {
                        !z(f, !0) || v(f) || n(f) ? c[a] = d[a] : c[a] = e(c[a] || {}, f)
                    });
                    return c
                };
            !0 === d[0] && (f = d[1], d = Array.prototype.slice.call(d, 2));
            var a = d.length;
            for (c = 0; c < a; c++) f = e(f, d[c]);
            return f
        }

        function z(c,
            d) {
            return !!c && "object" === typeof c && (!d || !t(c))
        }

        function w(c, d, f) {
            var a;
            E(d) ? m(f) ? c.setAttribute(d, f) : c && c.getAttribute && ((a = c.getAttribute(d)) || "class" !== d || (a = c.getAttribute(d + "Name"))) : q(d, function (d, f) {
                c.setAttribute(f, d)
            });
            return a
        }

        function C() {
            for (var c = arguments, d = c.length, f = 0; f < d; f++) {
                var a = c[f];
                if ("undefined" !== typeof a && null !== a) return a
            }
        }

        function F(c, d) {
            if (!c) return d;
            var f = c.split(".").reverse();
            if (1 === f.length) return d[c];
            for (c = f.pop();
                "undefined" !== typeof c && "undefined" !== typeof d && null !==
                d;) d = d[c], c = f.pop();
            return d
        }
        l.timers = [];
        var H = l.charts,
            I = l.doc,
            y = l.win;
        (b || (b = {})).messages = [];
        l.error = b;
        var A = function () {
            function c(c, d, f) {
                this.options = d;
                this.elem = c;
                this.prop = f
            }
            c.prototype.dSetter = function () {
                var c = this.paths,
                    d = c && c[0];
                c = c && c[1];
                var f = [],
                    a = this.now || 0;
                if (1 !== a && d && c)
                    if (d.length === c.length && 1 > a)
                        for (var e = 0; e < c.length; e++) {
                            for (var g = d[e], k = c[e], h = [], L = 0; L < k.length; L++) {
                                var N = g[L],
                                    m = k[L];
                                h[L] = "number" === typeof N && "number" === typeof m && ("A" !== k[0] || 4 !== L && 5 !== L) ? N + a * (m - N) : m
                            }
                            f.push(h)
                        } else f =
                            c;
                    else f = this.toD || [];
                this.elem.attr("d", f, void 0, !0)
            };
            c.prototype.update = function () {
                var c = this.elem,
                    d = this.prop,
                    f = this.now,
                    a = this.options.step;
                if (this[d + "Setter"]) this[d + "Setter"]();
                else c.attr ? c.element && c.attr(d, f, null, !0) : c.style[d] = f + this.unit;
                a && a.call(c, f, this)
            };
            c.prototype.run = function (c, d, f) {
                var a = this,
                    e = a.options,
                    g = function (c) {
                        return g.stopped ? !1 : a.step(c)
                    },
                    k = y.requestAnimationFrame || function (c) {
                        setTimeout(c, 13)
                    },
                    h = function () {
                        for (var c = 0; c < l.timers.length; c++) l.timers[c]() || l.timers.splice(c--,
                            1);
                        l.timers.length && k(h)
                    };
                c !== d || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = c, this.end = d, this.unit = f, this.now = this.start, this.pos = 0, g.elem = this.elem, g.prop = this.prop, g() && 1 === l.timers.push(g) && k(h)) : (delete e.curAnim[this.prop], e.complete && 0 === Object.keys(e.curAnim).length && e.complete.call(this.elem))
            };
            c.prototype.step = function (c) {
                var d = +new Date,
                    f = this.options,
                    a = this.elem,
                    e = f.complete,
                    g = f.duration,
                    k = f.curAnim;
                if (a.attr && !a.element) c = !1;
                else if (c || d >= g + this.startTime) {
                    this.now =
                        this.end;
                    this.pos = 1;
                    this.update();
                    var h = k[this.prop] = !0;
                    q(k, function (c) {
                        !0 !== c && (h = !1)
                    });
                    h && e && e.call(a);
                    c = !1
                } else this.pos = f.easing((d - this.startTime) / g), this.now = this.start + (this.end - this.start) * this.pos, this.update(), c = !0;
                return c
            };
            c.prototype.initPath = function (c, d, f) {
                function a(c, d) {
                    for (; c.length < u;) {
                        var f = c[0],
                            a = d[u - c.length];
                        a && "M" === f[0] && (c[0] = "C" === a[0] ? ["C", f[1], f[2], f[1], f[2], f[1], f[2]] : ["L", f[1], f[2]]);
                        c.unshift(f);
                        h && c.push(c[c.length - 1])
                    }
                }

                function e(c, d) {
                    for (; c.length < u;)
                        if (d = c[c.length /
                                L - 1].slice(), "C" === d[0] && (d[1] = d[5], d[2] = d[6]), h) {
                            var f = c[c.length / L].slice();
                            c.splice(c.length / 2, 0, d, f)
                        } else c.push(d)
                }
                var g = c.startX,
                    k = c.endX;
                d = d && d.slice();
                f = f.slice();
                var h = c.isArea,
                    L = h ? 2 : 1;
                if (!d) return [f, f];
                if (g && k) {
                    for (c = 0; c < g.length; c++)
                        if (g[c] === k[0]) {
                            var N = c;
                            break
                        } else if (g[0] === k[k.length - g.length + c]) {
                        N = c;
                        var m = !0;
                        break
                    } else if (g[g.length - 1] === k[k.length - g.length + c]) {
                        N = g.length - c;
                        break
                    }
                    "undefined" === typeof N && (d = [])
                }
                if (d.length && D(N)) {
                    var u = f.length + N * L;
                    m ? (a(d, f), e(f, d)) : (a(f, d), e(d, f))
                }
                return [d,
                    f
                ]
            };
            c.prototype.fillSetter = function () {
                c.prototype.strokeSetter.apply(this, arguments)
            };
            c.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, l.color(this.start).tweenTo(l.color(this.end), this.pos), null, !0)
            };
            return c
        }();
        l.Fx = A;
        l.merge = Q;
        var p = l.pInt = function (c, d) {
                return parseInt(c, d || 10)
            },
            E = l.isString = function (c) {
                return "string" === typeof c
            },
            t = l.isArray = function (c) {
                c = Object.prototype.toString.call(c);
                return "[object Array]" === c || "[object Array Iterator]" === c
            };
        l.isObject = z;
        var n = l.isDOMElement = function (c) {
                return z(c) &&
                    "number" === typeof c.nodeType
            },
            v = l.isClass = function (c) {
                var d = c && c.constructor;
                return !(!z(c, !0) || n(c) || !d || !d.name || "Object" === d.name)
            },
            D = l.isNumber = function (c) {
                return "number" === typeof c && !isNaN(c) && Infinity > c && -Infinity < c
            },
            r = l.erase = function (c, d) {
                for (var f = c.length; f--;)
                    if (c[f] === d) {
                        c.splice(f, 1);
                        break
                    }
            },
            m = l.defined = function (c) {
                return "undefined" !== typeof c && null !== c
            };
        l.attr = w;
        var a = l.splat = function (c) {
                return t(c) ? c : [c]
            },
            h = l.syncTimeout = function (c, d, f) {
                if (0 < d) return setTimeout(c, d, f);
                c.call(0, f);
                return -1
            },
            k = l.clearTimeout = function (c) {
                m(c) && clearTimeout(c)
            },
            g = l.extend = function (c, d) {
                var f;
                c || (c = {});
                for (f in d) c[f] = d[f];
                return c
            };
        l.pick = C;
        var e = l.css = function (c, d) {
                l.isMS && !l.svg && d && "undefined" !== typeof d.opacity && (d.filter = "alpha(opacity=" + 100 * d.opacity + ")");
                g(c.style, d)
            },
            x = l.createElement = function (c, d, f, a, k) {
                c = I.createElement(c);
                d && g(c, d);
                k && e(c, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                });
                f && e(c, f);
                a && a.appendChild(c);
                return c
            },
            u = l.extendClass = function (c, d) {
                var f = function () {};
                f.prototype = new c;
                g(f.prototype,
                    d);
                return f
            },
            B = l.pad = function (c, d, f) {
                return Array((d || 2) + 1 - String(c).replace("-", "").length).join(f || "0") + c
            },
            O = l.relativeLength = function (c, d, f) {
                return /%$/.test(c) ? d * parseFloat(c) / 100 + (f || 0) : parseFloat(c)
            },
            G = l.wrap = function (c, d, f) {
                var a = c[d];
                c[d] = function () {
                    var c = Array.prototype.slice.call(arguments),
                        d = arguments,
                        e = this;
                    e.proceed = function () {
                        a.apply(e, arguments.length ? arguments : d)
                    };
                    c.unshift(a);
                    c = f.apply(this, c);
                    e.proceed = null;
                    return c
                }
            },
            K = l.format = function (c, d, f) {
                var a = "{",
                    e = !1,
                    g = [],
                    k = /f$/,
                    h = /\.([0-9])/,
                    L = l.defaultOptions.lang,
                    N = f && f.time || l.time;
                for (f = f && f.numberFormatter || Y; c;) {
                    var m = c.indexOf(a);
                    if (-1 === m) break;
                    var u = c.slice(0, m);
                    if (e) {
                        u = u.split(":");
                        a = F(u.shift() || "", d);
                        if (u.length && "number" === typeof a)
                            if (u = u.join(":"), k.test(u)) {
                                var x = parseInt((u.match(h) || ["", "-1"])[1], 10);
                                null !== a && (a = f(a, x, L.decimalPoint, -1 < u.indexOf(",") ? L.thousandsSep : ""))
                            } else a = N.dateFormat(u, a);
                        g.push(a)
                    } else g.push(u);
                    c = c.slice(m + 1);
                    a = (e = !e) ? "}" : "{"
                }
                g.push(c);
                return g.join("")
            },
            P = l.getMagnitude = function (c) {
                return Math.pow(10,
                    Math.floor(Math.log(c) / Math.LN10))
            },
            J = l.normalizeTickInterval = function (c, d, f, a, e) {
                var g = c;
                f = C(f, 1);
                var k = c / f;
                d || (d = e ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === a && (1 === f ? d = d.filter(function (c) {
                    return 0 === c % 1
                }) : .1 >= f && (d = [1 / f])));
                for (a = 0; a < d.length && !(g = d[a], e && g * f >= c || !e && k <= (d[a] + (d[a + 1] || d[a])) / 2); a++);
                return g = S(g * f, -Math.round(Math.log(.001) / Math.LN10))
            },
            f = l.stableSort = function (c, d) {
                var f = c.length,
                    a, e;
                for (e = 0; e < f; e++) c[e].safeI = e;
                c.sort(function (c, f) {
                    a = d(c, f);
                    return 0 === a ? c.safeI - f.safeI :
                        a
                });
                for (e = 0; e < f; e++) delete c[e].safeI
            },
            d = l.arrayMin = function (c) {
                for (var d = c.length, f = c[0]; d--;) c[d] < f && (f = c[d]);
                return f
            },
            c = l.arrayMax = function (c) {
                for (var d = c.length, f = c[0]; d--;) c[d] > f && (f = c[d]);
                return f
            },
            L = l.destroyObjectProperties = function (c, d) {
                q(c, function (f, a) {
                    f && f !== d && f.destroy && f.destroy();
                    delete c[a]
                })
            },
            N = l.discardElement = function (c) {
                var d = l.garbageBin;
                d || (d = x("div"));
                c && d.appendChild(c);
                d.innerHTML = ""
            },
            S = l.correctFloat = function (c, d) {
                return parseFloat(c.toPrecision(d || 14))
            },
            aa = l.setAnimation =
            function (c, d) {
                d.renderer.globalAnimation = C(c, d.options.chart.animation, !0)
            },
            Z = l.animObject = function (c) {
                return z(c) ? l.merge({
                    duration: 500,
                    defer: 0
                }, c) : {
                    duration: c ? 500 : 0,
                    defer: 0
                }
            },
            ba = l.timeUnits = {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            Y = l.numberFormat = function (c, d, f, a) {
                c = +c || 0;
                d = +d;
                var e = l.defaultOptions.lang,
                    g = (c.toString().split(".")[1] || "").split("e")[0].length,
                    k = c.toString().split("e");
                if (-1 === d) d = Math.min(g, 20);
                else if (!D(d)) d = 2;
                else if (d &&
                    k[1] && 0 > k[1]) {
                    var h = d + +k[1];
                    0 <= h ? (k[0] = (+k[0]).toExponential(h).split("e")[0], d = h) : (k[0] = k[0].split(".")[0] || 0, c = 20 > d ? (k[0] * Math.pow(10, k[1])).toFixed(d) : 0, k[1] = 0)
                }
                var L = (Math.abs(k[1] ? k[0] : c) + Math.pow(10, -Math.max(d, g) - 1)).toFixed(d);
                g = String(p(L));
                h = 3 < g.length ? g.length % 3 : 0;
                f = C(f, e.decimalPoint);
                a = C(a, e.thousandsSep);
                c = (0 > c ? "-" : "") + (h ? g.substr(0, h) + a : "");
                c += g.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + a);
                d && (c += f + L.slice(-d));
                k[1] && 0 !== +c && (c += "e" + k[1]);
                return c
            };
        Math.easeInOutSine = function (c) {
            return -.5 *
                (Math.cos(Math.PI * c) - 1)
        };
        var W = l.getStyle = function (c, d, f) {
                if ("width" === d) return d = Math.min(c.offsetWidth, c.scrollWidth), f = c.getBoundingClientRect && c.getBoundingClientRect().width, f < d && f >= d - 1 && (d = Math.floor(f)), Math.max(0, d - l.getStyle(c, "padding-left") - l.getStyle(c, "padding-right"));
                if ("height" === d) return Math.max(0, Math.min(c.offsetHeight, c.scrollHeight) - l.getStyle(c, "padding-top") - l.getStyle(c, "padding-bottom"));
                y.getComputedStyle || b(27, !0);
                if (c = y.getComputedStyle(c, void 0)) c = c.getPropertyValue(d),
                    C(f, "opacity" !== d) && (c = p(c));
                return c
            },
            R = l.getDeferredAnimation = function (c, d, f) {
                var a = Z(d),
                    e = 0,
                    g = 0;
                (f ? [f] : c.series).forEach(function (c) {
                    c = Z(c.options.animation);
                    e = d && m(d.defer) ? a.defer : Math.max(e, c.duration + c.defer);
                    g = Math.min(a.duration, c.duration)
                });
                c.renderer.forExport && (e = 0);
                return {
                    defer: Math.max(0, e - g),
                    duration: Math.min(e, g)
                }
            },
            T = l.inArray = function (c, d, f) {
                b(32, !1, void 0, {
                    "Highcharts.inArray": "use Array.indexOf"
                });
                return d.indexOf(c, f)
            },
            X = l.find = Array.prototype.find ? function (c, d) {
                return c.find(d)
            } :
            function (c, d) {
                var f, a = c.length;
                for (f = 0; f < a; f++)
                    if (d(c[f], f)) return c[f]
            };
        l.keys = function (c) {
            b(32, !1, void 0, {
                "Highcharts.keys": "use Object.keys"
            });
            return Object.keys(c)
        };
        var V = l.offset = function (c) {
                var d = I.documentElement;
                c = c.parentElement || c.parentNode ? c.getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: c.top + (y.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                    left: c.left + (y.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
                }
            },
            da = l.stop = function (c, d) {
                for (var f = l.timers.length; f--;) l.timers[f].elem !== c || d && d !==
                    l.timers[f].prop || (l.timers[f].stopped = !0)
            },
            q = l.objectEach = function (c, d, f) {
                for (var a in c) Object.hasOwnProperty.call(c, a) && d.call(f || c[a], c[a], a, c)
            };
        q({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function (c, d) {
            l[d] = function (f) {
                var a;
                b(32, !1, void 0, (a = {}, a["Highcharts." + d] = "use Array." + c, a));
                return Array.prototype[c].apply(f, [].slice.call(arguments, 1))
            }
        });
        var ha = l.addEvent = function (c, d, f, a) {
                void 0 === a && (a = {});
                var e = c.addEventListener || l.addEventListenerPolyfill;
                var g = "function" ===
                    typeof c && c.prototype ? c.prototype.protoEvents = c.prototype.protoEvents || {} : c.hcEvents = c.hcEvents || {};
                l.Point && c instanceof l.Point && c.series && c.series.chart && (c.series.chart.runTrackerClick = !0);
                e && e.call(c, d, f, !1);
                g[d] || (g[d] = []);
                g[d].push({
                    fn: f,
                    order: "number" === typeof a.order ? a.order : Infinity
                });
                g[d].sort(function (c, d) {
                    return c.order - d.order
                });
                return function () {
                    ea(c, d, f)
                }
            },
            ea = l.removeEvent = function (c, d, f) {
                function a(d, f) {
                    var a = c.removeEventListener || l.removeEventListenerPolyfill;
                    a && a.call(c, d, f, !1)
                }

                function e(f) {
                    var e;
                    if (c.nodeName) {
                        if (d) {
                            var g = {};
                            g[d] = !0
                        } else g = f;
                        q(g, function (c, d) {
                            if (f[d])
                                for (e = f[d].length; e--;) a(d, f[d][e].fn)
                        })
                    }
                }
                var g;
                ["protoEvents", "hcEvents"].forEach(function (k, h) {
                    var L = (h = h ? c : c.prototype) && h[k];
                    L && (d ? (g = L[d] || [], f ? (L[d] = g.filter(function (c) {
                        return f !== c.fn
                    }), a(d, f)) : (e(L), L[d] = [])) : (e(L), h[k] = {}))
                })
            },
            ca = l.fireEvent = function (c, d, f, a) {
                var e;
                f = f || {};
                if (I.createEvent && (c.dispatchEvent || c.fireEvent)) {
                    var k = I.createEvent("Events");
                    k.initEvent(d, !0, !0);
                    g(k, f);
                    c.dispatchEvent ?
                        c.dispatchEvent(k) : c.fireEvent(d, k)
                } else f.target || g(f, {
                        preventDefault: function () {
                            f.defaultPrevented = !0
                        },
                        target: c,
                        type: d
                    }),
                    function (d, a) {
                        void 0 === d && (d = []);
                        void 0 === a && (a = []);
                        var g = 0,
                            k = 0,
                            h = d.length + a.length;
                        for (e = 0; e < h; e++) !1 === (d[g] ? a[k] ? d[g].order <= a[k].order ? d[g++] : a[k++] : d[g++] : a[k++]).fn.call(c, f) && f.preventDefault()
                    }(c.protoEvents && c.protoEvents[d], c.hcEvents && c.hcEvents[d]);
                a && !f.defaultPrevented && a.call(c, f)
            },
            ia = l.animate = function (c, d, f) {
                var a, e = "",
                    g, k;
                if (!z(f)) {
                    var h = arguments;
                    f = {
                        duration: h[2],
                        easing: h[3],
                        complete: h[4]
                    }
                }
                D(f.duration) || (f.duration = 400);
                f.easing = "function" === typeof f.easing ? f.easing : Math[f.easing] || Math.easeInOutSine;
                f.curAnim = Q(d);
                q(d, function (h, L) {
                    da(c, L);
                    k = new A(c, f, L);
                    g = null;
                    "d" === L && t(d.d) ? (k.paths = k.initPath(c, c.pathArray, d.d), k.toD = d.d, a = 0, g = 1) : c.attr ? a = c.attr(L) : (a = parseFloat(W(c, L)) || 0, "opacity" !== L && (e = "px"));
                    g || (g = h);
                    g && g.match && g.match("px") && (g = g.replace(/px/g, ""));
                    k.run(a, g, e)
                })
            },
            ja = l.seriesType = function (c, d, f, a, e) {
                var g = fa(),
                    k = l.seriesTypes;
                g.plotOptions[c] =
                    Q(g.plotOptions[d], f);
                k[c] = u(k[d] || function () {}, a);
                k[c].prototype.type = c;
                e && (k[c].prototype.pointClass = u(l.Point, e));
                return k[c]
            },
            M, ka = l.uniqueKey = function () {
                var c = Math.random().toString(36).substring(2, 9) + "-",
                    d = 0;
                return function () {
                    return "highcharts-" + (M ? "" : c) + d++
                }
            }(),
            la = l.useSerialIds = function (c) {
                return M = C(c, M)
            },
            ma = l.isFunction = function (c) {
                return "function" === typeof c
            },
            fa = l.getOptions = function () {
                return l.defaultOptions
            },
            na = l.setOptions = function (c) {
                l.defaultOptions = Q(!0, l.defaultOptions, c);
                (c.time ||
                    c.global) && l.time.update(Q(l.defaultOptions.global, l.defaultOptions.time, c.global, c.time));
                return l.defaultOptions
            };
        y.jQuery && (y.jQuery.fn.highcharts = function () {
            var c = [].slice.call(arguments);
            if (this[0]) return c[0] ? (new(l[E(c[0]) ? c.shift() : "Chart"])(this[0], c[0], c[1]), this) : H[w(this[0], "data-highcharts-chart")]
        });
        return {
            Fx: l.Fx,
            addEvent: ha,
            animate: ia,
            animObject: Z,
            arrayMax: c,
            arrayMin: d,
            attr: w,
            clamp: function (c, d, f) {
                return c > d ? c < f ? c : f : d
            },
            clearTimeout: k,
            correctFloat: S,
            createElement: x,
            css: e,
            defined: m,
            destroyObjectProperties: L,
            discardElement: N,
            erase: r,
            error: b,
            extend: g,
            extendClass: u,
            find: X,
            fireEvent: ca,
            format: K,
            getDeferredAnimation: R,
            getMagnitude: P,
            getNestedProperty: F,
            getOptions: fa,
            getStyle: W,
            inArray: T,
            isArray: t,
            isClass: v,
            isDOMElement: n,
            isFunction: ma,
            isNumber: D,
            isObject: z,
            isString: E,
            merge: Q,
            normalizeTickInterval: J,
            numberFormat: Y,
            objectEach: q,
            offset: V,
            pad: B,
            pick: C,
            pInt: p,
            relativeLength: O,
            removeEvent: ea,
            seriesType: ja,
            setAnimation: aa,
            setOptions: na,
            splat: a,
            stableSort: f,
            stop: da,
            syncTimeout: h,
            timeUnits: ba,
            uniqueKey: ka,
            useSerialIds: la,
            wrap: G
        }
    });
    M(q, "Core/Color.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.isNumber,
            z = b.merge,
            w = b.pInt;
        b = function () {
            function b(l) {
                this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (b) {
                        return [w(b[1]), w(b[2]), w(b[3]), parseFloat(b[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (b) {
                        return [w(b[1]), w(b[2]), w(b[3]), 1]
                    }
                }];
                this.rgba = [];
                if (!(this instanceof b)) return new b(l);
                this.init(l)
            }
            b.parse = function (l) {
                return new b(l)
            };
            b.prototype.init = function (l) {
                var H, I;
                if ((this.input = l = b.names[l && l.toLowerCase ? l.toLowerCase() : ""] || l) && l.stops) this.stops = l.stops.map(function (p) {
                    return new b(p[1])
                });
                else {
                    if (l && l.charAt && "#" === l.charAt()) {
                        var y = l.length;
                        l = parseInt(l.substr(1), 16);
                        7 === y ? H = [(l & 16711680) >> 16, (l & 65280) >> 8, l & 255, 1] : 4 === y && (H = [(l & 3840) >> 4 | (l & 3840) >> 8, (l & 240) >> 4 | l & 240, (l & 15) << 4 | l & 15, 1])
                    }
                    if (!H)
                        for (I = this.parsers.length; I-- && !H;) {
                            var A =
                                this.parsers[I];
                            (y = A.regex.exec(l)) && (H = A.parse(y))
                        }
                }
                this.rgba = H || []
            };
            b.prototype.get = function (b) {
                var l = this.input,
                    I = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var y = z(l);
                    y.stops = [].concat(y.stops);
                    this.stops.forEach(function (A, p) {
                        y.stops[p] = [y.stops[p][0], A.get(b)]
                    })
                } else y = I && q(I[0]) ? "rgb" === b || !b && 1 === I[3] ? "rgb(" + I[0] + "," + I[1] + "," + I[2] + ")" : "a" === b ? I[3] : "rgba(" + I.join(",") + ")" : l;
                return y
            };
            b.prototype.brighten = function (b) {
                var l, I = this.rgba;
                if (this.stops) this.stops.forEach(function (l) {
                    l.brighten(b)
                });
                else if (q(b) && 0 !== b)
                    for (l = 0; 3 > l; l++) I[l] += w(255 * b), 0 > I[l] && (I[l] = 0), 255 < I[l] && (I[l] = 255);
                return this
            };
            b.prototype.setOpacity = function (b) {
                this.rgba[3] = b;
                return this
            };
            b.prototype.tweenTo = function (b, l) {
                var I = this.rgba,
                    y = b.rgba;
                y.length && I && I.length ? (b = 1 !== y[3] || 1 !== I[3], l = (b ? "rgba(" : "rgb(") + Math.round(y[0] + (I[0] - y[0]) * (1 - l)) + "," + Math.round(y[1] + (I[1] - y[1]) * (1 - l)) + "," + Math.round(y[2] + (I[2] - y[2]) * (1 - l)) + (b ? "," + (y[3] + (I[3] - y[3]) * (1 - l)) : "") + ")") : l = b.input || "none";
                return l
            };
            b.names = {
                white: "#ffffff",
                black: "#000000"
            };
            return b
        }();
        l.Color = b;
        l.color = b.parse;
        return l.Color
    });
    M(q, "Core/Renderer/SVG/SVGElement.js", [q["Core/Color.js"], q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b, q) {
        var z = b.deg2rad,
            w = b.doc,
            C = b.hasTouch,
            F = b.isFirefox,
            H = b.noop,
            I = b.svg,
            y = b.SVG_NS,
            A = b.win,
            p = q.animate,
            E = q.animObject,
            t = q.attr,
            n = q.createElement,
            v = q.css,
            D = q.defined,
            r = q.erase,
            m = q.extend,
            a = q.fireEvent,
            h = q.isArray,
            k = q.isFunction,
            g = q.isNumber,
            e = q.isString,
            x = q.merge,
            u = q.objectEach,
            B = q.pick,
            O = q.pInt,
            G = q.stop,
            K = q.syncTimeout,
            P = q.uniqueKey;
        "";
        q = function () {
            function J() {
                this.height = this.element = void 0;
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = y;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ");
                this.width = void 0
            }
            J.prototype._defaultGetter = function (f) {
                f = B(this[f + "Value"], this[f], this.element ? this.element.getAttribute(f) : null, 0);
                /^[\-0-9\.]+$/.test(f) && (f = parseFloat(f));
                return f
            };
            J.prototype._defaultSetter = function (f, d, c) {
                c.setAttribute(d, f)
            };
            J.prototype.add = function (f) {
                var d = this.renderer,
                    c = this.element;
                f && (this.parentGroup = f);
                this.parentInverted = f && f.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && d.buildText(this);
                this.added = !0;
                if (!f || f.handleZ || this.zIndex) var a = this.zIndexSetter();
                a || (f ? f.element : d.box).appendChild(c);
                if (this.onAdd) this.onAdd();
                return this
            };
            J.prototype.addClass = function (f, d) {
                var c = d ? "" : this.attr("class") || "";
                f = (f || "").split(/ /g).reduce(function (d, f) {
                    -1 === c.indexOf(f) && d.push(f);
                    return d
                }, c ? [c] : []).join(" ");
                f !== c && this.attr("class",
                    f);
                return this
            };
            J.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            };
            J.prototype.align = function (f, d, c) {
                var a, g = {};
                var k = this.renderer;
                var h = k.alignedObjects;
                var m, u;
                if (f) {
                    if (this.alignOptions = f, this.alignByTranslate = d, !c || e(c)) this.alignTo = a = c || "renderer", r(h, this), h.push(this), c = void 0
                } else f = this.alignOptions, d = this.alignByTranslate, a = this.alignTo;
                c = B(c, k[a], k);
                a = f.align;
                k = f.verticalAlign;
                h = (c.x || 0) + (f.x || 0);
                var x = (c.y || 0) + (f.y || 0);
                "right" === a ? m = 1 :
                    "center" === a && (m = 2);
                m && (h += (c.width - (f.width || 0)) / m);
                g[d ? "translateX" : "x"] = Math.round(h);
                "bottom" === k ? u = 1 : "middle" === k && (u = 2);
                u && (x += (c.height - (f.height || 0)) / u);
                g[d ? "translateY" : "y"] = Math.round(x);
                this[this.placed ? "animate" : "attr"](g);
                this.placed = !0;
                this.alignAttr = g;
                return this
            };
            J.prototype.alignSetter = function (f) {
                var d = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                d[f] && (this.alignValue = f, this.element.setAttribute("text-anchor", d[f]))
            };
            J.prototype.animate = function (f, d, c) {
                var a = this,
                    e = E(B(d, this.renderer.globalAnimation,
                        !0));
                d = e.defer;
                B(w.hidden, w.msHidden, w.webkitHidden, !1) && (e.duration = 0);
                0 !== e.duration ? (c && (e.complete = c), K(function () {
                    a.element && p(a, f, e)
                }, d)) : (this.attr(f, void 0, c), u(f, function (c, d) {
                    e.step && e.step.call(this, c, {
                        prop: d,
                        pos: 1
                    })
                }, this));
                return this
            };
            J.prototype.applyTextOutline = function (f) {
                var d = this.element,
                    c; - 1 !== f.indexOf("contrast") && (f = f.replace(/contrast/g, this.renderer.getContrast(d.style.fill)));
                f = f.split(" ");
                var a = f[f.length - 1];
                if ((c = f[0]) && "none" !== c && b.svg) {
                    this.fakeTS = !0;
                    f = [].slice.call(d.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function (c, d, f) {
                        return 2 * d + f
                    });
                    this.removeTextOutline(f);
                    var e = d.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(d.textContent) : !1;
                    var g = d.firstChild;
                    f.forEach(function (f, k) {
                        0 === k && (f.setAttribute("x", d.getAttribute("x")), k = d.getAttribute("y"), f.setAttribute("y", k || 0), null === k && d.setAttribute("y", 0));
                        k = f.cloneNode(!0);
                        t(e && !F ? f : k, {
                            "class": "highcharts-text-outline",
                            fill: a,
                            stroke: a,
                            "stroke-width": c,
                            "stroke-linejoin": "round"
                        });
                        d.insertBefore(k, g)
                    });
                    e && F && f[0] && (f = f[0].cloneNode(!0), f.textContent = " ", d.insertBefore(f, g))
                }
            };
            J.prototype.attr = function (f, d, c, a) {
                var e = this.element,
                    g, k = this,
                    h, L, m = this.symbolCustomAttribs;
                if ("string" === typeof f && "undefined" !== typeof d) {
                    var x = f;
                    f = {};
                    f[x] = d
                }
                "string" === typeof f ? k = (this[f + "Getter"] || this._defaultGetter).call(this, f, e) : (u(f, function (c, d) {
                    h = !1;
                    a || G(this, d);
                    this.symbolName && -1 !== m.indexOf(d) && (g || (this.symbolAttr(f), g = !0), h = !0);
                    !this.rotation || "x" !== d && "y" !== d || (this.doTransform = !0);
                    h || (L = this[d + "Setter"] || this._defaultSetter, L.call(this, c, d, e), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d) && this.updateShadows(d, c, L))
                }, this), this.afterSetters());
                c && c.call(this);
                return k
            };
            J.prototype.clip = function (f) {
                return this.attr("clip-path", f ? "url(" + this.renderer.url + "#" + f.id + ")" : "none")
            };
            J.prototype.crisp = function (f, d) {
                d = d || f.strokeWidth || 0;
                var c = Math.round(d) % 2 / 2;
                f.x = Math.floor(f.x || this.x || 0) + c;
                f.y = Math.floor(f.y || this.y || 0) + c;
                f.width = Math.floor((f.width ||
                    this.width || 0) - 2 * c);
                f.height = Math.floor((f.height || this.height || 0) - 2 * c);
                D(f.strokeWidth) && (f.strokeWidth = d);
                return f
            };
            J.prototype.complexColor = function (f, d, c) {
                var e = this.renderer,
                    g, k, m, n, v, r, B, G, K, p, V = [],
                    t;
                a(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    f.radialGradient ? k = "radialGradient" : f.linearGradient && (k = "linearGradient");
                    if (k) {
                        m = f[k];
                        v = e.gradients;
                        r = f.stops;
                        K = c.radialReference;
                        h(m) && (f[k] = m = {
                            x1: m[0],
                            y1: m[1],
                            x2: m[2],
                            y2: m[3],
                            gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === k && K &&
                            !D(m.gradientUnits) && (n = m, m = x(m, e.getRadialAttr(K, n), {
                                gradientUnits: "userSpaceOnUse"
                            }));
                        u(m, function (c, d) {
                            "id" !== d && V.push(d, c)
                        });
                        u(r, function (c) {
                            V.push(c)
                        });
                        V = V.join(",");
                        if (v[V]) p = v[V].attr("id");
                        else {
                            m.id = p = P();
                            var a = v[V] = e.createElement(k).attr(m).add(e.defs);
                            a.radAttr = n;
                            a.stops = [];
                            r.forEach(function (c) {
                                0 === c[1].indexOf("rgba") ? (g = l.parse(c[1]), B = g.get("rgb"), G = g.get("a")) : (B = c[1], G = 1);
                                c = e.createElement("stop").attr({
                                    offset: c[0],
                                    "stop-color": B,
                                    "stop-opacity": G
                                }).add(a);
                                a.stops.push(c)
                            })
                        }
                        t = "url(" +
                            e.url + "#" + p + ")";
                        c.setAttribute(d, t);
                        c.gradient = V;
                        f.toString = function () {
                            return t
                        }
                    }
                })
            };
            J.prototype.css = function (f) {
                var d = this.styles,
                    c = {},
                    a = this.element,
                    e = "",
                    g = !d,
                    k = ["textOutline", "textOverflow", "width"];
                f && f.color && (f.fill = f.color);
                d && u(f, function (f, a) {
                    d && d[a] !== f && (c[a] = f, g = !0)
                });
                if (g) {
                    d && (f = m(d, c));
                    if (f)
                        if (null === f.width || "auto" === f.width) delete this.textWidth;
                        else if ("text" === a.nodeName.toLowerCase() && f.width) var h = this.textWidth = O(f.width);
                    this.styles = f;
                    h && !I && this.renderer.forExport && delete f.width;
                    if (a.namespaceURI === this.SVG_NS) {
                        var x = function (c, d) {
                            return "-" + d.toLowerCase()
                        };
                        u(f, function (c, d) {
                            -1 === k.indexOf(d) && (e += d.replace(/([A-Z])/g, x) + ":" + c + ";")
                        });
                        e && t(a, "style", e)
                    } else v(a, f);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), f && f.textOutline && this.applyTextOutline(f.textOutline))
                }
                return this
            };
            J.prototype.dashstyleSetter = function (f) {
                var d = this["stroke-width"];
                "inherit" === d && (d = 1);
                if (f = f && f.toLowerCase()) {
                    var c = f.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot",
                        "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (f = c.length; f--;) c[f] = "" + O(c[f]) * B(d, NaN);
                    f = c.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", f)
                }
            };
            J.prototype.destroy = function () {
                var f = this,
                    d = f.element || {},
                    c = f.renderer,
                    a = c.isSVG && "SPAN" === d.nodeName && f.parentGroup || void 0,
                    e = d.ownerSVGElement;
                d.onclick = d.onmouseout = d.onmouseover = d.onmousemove = d.point =
                    null;
                G(f);
                if (f.clipPath && e) {
                    var g = f.clipPath;
                    [].forEach.call(e.querySelectorAll("[clip-path],[CLIP-PATH]"), function (c) {
                        -1 < c.getAttribute("clip-path").indexOf(g.element.id) && c.removeAttribute("clip-path")
                    });
                    f.clipPath = g.destroy()
                }
                if (f.stops) {
                    for (e = 0; e < f.stops.length; e++) f.stops[e].destroy();
                    f.stops.length = 0;
                    f.stops = void 0
                }
                f.safeRemoveChild(d);
                for (c.styledMode || f.destroyShadows(); a && a.div && 0 === a.div.childNodes.length;) d = a.parentGroup, f.safeRemoveChild(a.div), delete a.div, a = d;
                f.alignTo && r(c.alignedObjects,
                    f);
                u(f, function (c, d) {
                    f[d] && f[d].parentGroup === f && f[d].destroy && f[d].destroy();
                    delete f[d]
                })
            };
            J.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (f) {
                    this.safeRemoveChild(f)
                }, this);
                this.shadows = void 0
            };
            J.prototype.destroyTextPath = function (f, d) {
                var c = f.getElementsByTagName("text")[0];
                if (c) {
                    if (c.removeAttribute("dx"), c.removeAttribute("dy"), d.element.setAttribute("id", ""), this.textPathWrapper && c.getElementsByTagName("textPath").length) {
                        for (f = this.textPathWrapper.element.childNodes; f.length;) c.appendChild(f[0]);
                        c.removeChild(this.textPathWrapper.element)
                    }
                } else if (f.getAttribute("dx") || f.getAttribute("dy")) f.removeAttribute("dx"), f.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            };
            J.prototype.dSetter = function (f, d, c) {
                h(f) && ("string" === typeof f[0] && (f = this.renderer.pathToSegments(f)), this.pathArray = f, f = f.reduce(function (c, d, f) {
                    return d && d.join ? (f ? c + " " : "") + d.join(" ") : (d || "").toString()
                }, ""));
                /(NaN| {2}|^$)/.test(f) && (f = "M 0 0");
                this[d] !== f && (c.setAttribute(d,
                    f), this[d] = f)
            };
            J.prototype.fadeOut = function (f) {
                var d = this;
                d.animate({
                    opacity: 0
                }, {
                    duration: B(f, 150),
                    complete: function () {
                        d.attr({
                            y: -9999
                        }).hide()
                    }
                })
            };
            J.prototype.fillSetter = function (f, d, c) {
                "string" === typeof f ? c.setAttribute(d, f) : f && this.complexColor(f, d, c)
            };
            J.prototype.getBBox = function (f, d) {
                var c, a = this.renderer,
                    e = this.element,
                    g = this.styles,
                    h = this.textStr,
                    u = a.cache,
                    x = a.cacheKeys,
                    n = e.namespaceURI === this.SVG_NS;
                d = B(d, this.rotation, 0);
                var v = a.styledMode ? e && J.prototype.getStyle.call(e, "font-size") : g && g.fontSize;
                if (D(h)) {
                    var r = h.toString(); - 1 === r.indexOf("<") && (r = r.replace(/[0-9]/g, "0"));
                    r += ["", d, v, this.textWidth, g && g.textOverflow, g && g.fontWeight].join()
                }
                r && !f && (c = u[r]);
                if (!c) {
                    if (n || a.forExport) {
                        try {
                            var G = this.fakeTS && function (c) {
                                [].forEach.call(e.querySelectorAll(".highcharts-text-outline"), function (d) {
                                    d.style.display = c
                                })
                            };
                            k(G) && G("none");
                            c = e.getBBox ? m({}, e.getBBox()) : {
                                width: e.offsetWidth,
                                height: e.offsetHeight
                            };
                            k(G) && G("")
                        } catch (X) {
                            ""
                        }
                        if (!c || 0 > c.width) c = {
                            width: 0,
                            height: 0
                        }
                    } else c = this.htmlGetBBox();
                    a.isSVG &&
                        (f = c.width, a = c.height, n && (c.height = a = {
                            "11px,17": 14,
                            "13px,20": 16
                        } [g && g.fontSize + "," + Math.round(a)] || a), d && (g = d * z, c.width = Math.abs(a * Math.sin(g)) + Math.abs(f * Math.cos(g)), c.height = Math.abs(a * Math.cos(g)) + Math.abs(f * Math.sin(g))));
                    if (r && 0 < c.height) {
                        for (; 250 < x.length;) delete u[x.shift()];
                        u[r] || x.push(r);
                        u[r] = c
                    }
                }
                return c
            };
            J.prototype.getStyle = function (f) {
                return A.getComputedStyle(this.element || this, "").getPropertyValue(f)
            };
            J.prototype.hasClass = function (f) {
                return -1 !== ("" + this.attr("class")).split(" ").indexOf(f)
            };
            J.prototype.hide = function (f) {
                f ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            };
            J.prototype.htmlGetBBox = function () {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            };
            J.prototype.init = function (f, d) {
                this.element = "span" === d ? n(d) : w.createElementNS(this.SVG_NS, d);
                this.renderer = f;
                a(this, "afterInit")
            };
            J.prototype.invert = function (f) {
                this.inverted = f;
                this.updateTransform();
                return this
            };
            J.prototype.on = function (f, d) {
                var c, a, e = this.element,
                    g;
                C && "click" === f ? (e.ontouchstart = function (d) {
                    c = d.touches[0].clientX;
                    a =
                        d.touches[0].clientY
                }, e.ontouchend = function (f) {
                    c && 4 <= Math.sqrt(Math.pow(c - f.changedTouches[0].clientX, 2) + Math.pow(a - f.changedTouches[0].clientY, 2)) || d.call(e, f);
                    g = !0;
                    f.preventDefault()
                }, e.onclick = function (c) {
                    g || d.call(e, c)
                }) : e["on" + f] = d;
                return this
            };
            J.prototype.opacitySetter = function (f, d, c) {
                this[d] = f;
                c.setAttribute(d, f)
            };
            J.prototype.removeClass = function (f) {
                return this.attr("class", ("" + this.attr("class")).replace(e(f) ? new RegExp("(^| )" + f + "( |$)") : f, " ").replace(/ +/g, " ").trim())
            };
            J.prototype.removeTextOutline =
                function (f) {
                    for (var d = f.length, c; d--;) c = f[d], "highcharts-text-outline" === c.getAttribute("class") && r(f, this.element.removeChild(c))
                };
            J.prototype.safeRemoveChild = function (f) {
                var d = f.parentNode;
                d && d.removeChild(f)
            };
            J.prototype.setRadialReference = function (f) {
                var d = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = f;
                d && d.radAttr && d.animate(this.renderer.getRadialAttr(f, d.radAttr));
                return this
            };
            J.prototype.setTextPath = function (f, d) {
                var c = this.element,
                    a = {
                        textAnchor: "text-anchor"
                    },
                    e = !1,
                    k = this.textPathWrapper,
                    h = !k;
                d = x(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, d);
                var m = d.attributes;
                if (f && d && d.enabled) {
                    k && null === k.element.parentNode ? (h = !0, k = k.destroy()) : k && this.removeTextOutline.call(k.parentGroup, [].slice.call(c.getElementsByTagName("tspan")));
                    this.options && this.options.padding && (m.dx = -this.options.padding);
                    k || (this.textPathWrapper = k = this.renderer.createElement("textPath"), e = !0);
                    var n = k.element;
                    (d = f.element.getAttribute("id")) || f.element.setAttribute("id",
                        d = P());
                    if (h)
                        for (f = c.getElementsByTagName("tspan"); f.length;) f[0].setAttribute("y", 0), g(m.dx) && f[0].setAttribute("x", -m.dx), n.appendChild(f[0]);
                    e && k && k.add({
                        element: this.text ? this.text.element : c
                    });
                    n.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + d);
                    D(m.dy) && (n.parentNode.setAttribute("dy", m.dy), delete m.dy);
                    D(m.dx) && (n.parentNode.setAttribute("dx", m.dx), delete m.dx);
                    u(m, function (c, d) {
                        n.setAttribute(a[d] || d, c)
                    });
                    c.removeAttribute("transform");
                    this.removeTextOutline.call(k,
                        [].slice.call(c.getElementsByTagName("tspan")));
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = H
                } else k && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(c, f), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            };
            J.prototype.shadow = function (f, d, c) {
                var a = [],
                    e = this.element,
                    g = !1,
                    k = this.oldShadowOptions;
                var h = {
                    color: "#000000",
                    offsetX: 1,
                    offsetY: 1,
                    opacity: .15,
                    width: 3
                };
                var x;
                !0 === f ? x = h : "object" === typeof f && (x = m(h, f));
                x && (x && k && u(x, function (c, d) {
                    c !== k[d] && (g = !0)
                }), g && this.destroyShadows(), this.oldShadowOptions = x);
                if (!x) this.destroyShadows();
                else if (!this.shadows) {
                    var n = x.opacity / x.width;
                    var r = this.parentInverted ? "translate(-1,-1)" : "translate(" + x.offsetX + ", " + x.offsetY + ")";
                    for (h = 1; h <= x.width; h++) {
                        var v = e.cloneNode(!1);
                        var G = 2 * x.width + 1 - 2 * h;
                        t(v, {
                            stroke: f.color || "#000000",
                            "stroke-opacity": n * h,
                            "stroke-width": G,
                            transform: r,
                            fill: "none"
                        });
                        v.setAttribute("class", (v.getAttribute("class") || "") + " highcharts-shadow");
                        c && (t(v, "height", Math.max(t(v, "height") - G, 0)), v.cutHeight = G);
                        d ? d.element.appendChild(v) : e.parentNode && e.parentNode.insertBefore(v, e);
                        a.push(v)
                    }
                    this.shadows = a
                }
                return this
            };
            J.prototype.show = function (f) {
                return this.attr({
                    visibility: f ? "inherit" : "visible"
                })
            };
            J.prototype.strokeSetter = function (f, d, c) {
                this[d] = f;
                this.stroke && this["stroke-width"] ? (J.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width",
                    this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === d && 0 === f && this.hasStroke ? (c.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
            };
            J.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var f = this.getStyle("stroke-width"),
                    d = 0;
                if (f.indexOf("px") === f.length - 2) d = O(f);
                else if ("" !== f) {
                    var c = w.createElementNS(y, "rect");
                    t(c, {
                        width: f,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(c);
                    d = c.getBBox().width;
                    c.parentNode.removeChild(c)
                }
                return d
            };
            J.prototype.symbolAttr = function (f) {
                var d = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (c) {
                    d[c] = B(f[c], d[c])
                });
                d.attr({
                    d: d.renderer.symbols[d.symbolName](d.x, d.y, d.width, d.height, d)
                })
            };
            J.prototype.textSetter = function (f) {
                f !== this.textStr && (delete this.textPxLength, this.textStr = f, this.added && this.renderer.buildText(this))
            };
            J.prototype.titleSetter = function (f) {
                var d =
                    this.element.getElementsByTagName("title")[0];
                d || (d = w.createElementNS(this.SVG_NS, "title"), this.element.appendChild(d));
                d.firstChild && d.removeChild(d.firstChild);
                d.appendChild(w.createTextNode(String(B(f, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            };
            J.prototype.toFront = function () {
                var f = this.element;
                f.parentNode.appendChild(f);
                return this
            };
            J.prototype.translate = function (f, d) {
                return this.attr({
                    translateX: f,
                    translateY: d
                })
            };
            J.prototype.updateShadows = function (f, d, c) {
                var a = this.shadows;
                if (a)
                    for (var e = a.length; e--;) c.call(a[e], "height" === f ? Math.max(d - (a[e].cutHeight || 0), 0) : "d" === f ? this.d : d, f, a[e])
            };
            J.prototype.updateTransform = function () {
                var f = this.translateX || 0,
                    d = this.translateY || 0,
                    c = this.scaleX,
                    a = this.scaleY,
                    e = this.inverted,
                    g = this.rotation,
                    k = this.matrix,
                    h = this.element;
                e && (f += this.width, d += this.height);
                f = ["translate(" + f + "," + d + ")"];
                D(k) && f.push("matrix(" + k.join(",") + ")");
                e ? f.push("rotate(90) scale(-1,1)") : g && f.push("rotate(" + g + " " + B(this.rotationOriginX, h.getAttribute("x"), 0) + " " +
                    B(this.rotationOriginY, h.getAttribute("y") || 0) + ")");
                (D(c) || D(a)) && f.push("scale(" + B(c, 1) + " " + B(a, 1) + ")");
                f.length && h.setAttribute("transform", f.join(" "))
            };
            J.prototype.visibilitySetter = function (f, d, c) {
                "inherit" === f ? c.removeAttribute(d) : this[d] !== f && c.setAttribute(d, f);
                this[d] = f
            };
            J.prototype.xGetter = function (f) {
                "circle" === this.element.nodeName && ("x" === f ? f = "cx" : "y" === f && (f = "cy"));
                return this._defaultGetter(f)
            };
            J.prototype.zIndexSetter = function (f, d) {
                var c = this.renderer,
                    a = this.parentGroup,
                    e = (a || c).element ||
                    c.box,
                    g = this.element,
                    k = !1;
                c = e === c.box;
                var h = this.added;
                var m;
                D(f) ? (g.setAttribute("data-z-index", f), f = +f, this[d] === f && (h = !1)) : D(this[d]) && g.removeAttribute("data-z-index");
                this[d] = f;
                if (h) {
                    (f = this.zIndex) && a && (a.handleZ = !0);
                    d = e.childNodes;
                    for (m = d.length - 1; 0 <= m && !k; m--) {
                        a = d[m];
                        h = a.getAttribute("data-z-index");
                        var u = !D(h);
                        if (a !== g)
                            if (0 > f && u && !c && !m) e.insertBefore(g, d[m]), k = !0;
                            else if (O(h) <= f || u && (!D(f) || 0 <= f)) e.insertBefore(g, d[m + 1] || null), k = !0
                    }
                    k || (e.insertBefore(g, d[c ? 3 : 0] || null), k = !0)
                }
                return k
            };
            return J
        }();
        q.prototype["stroke-widthSetter"] = q.prototype.strokeSetter;
        q.prototype.yGetter = q.prototype.xGetter;
        q.prototype.matrixSetter = q.prototype.rotationOriginXSetter = q.prototype.rotationOriginYSetter = q.prototype.rotationSetter = q.prototype.scaleXSetter = q.prototype.scaleYSetter = q.prototype.translateXSetter = q.prototype.translateYSetter = q.prototype.verticalAlignSetter = function (a, f) {
            this[f] = a;
            this.doTransform = !0
        };
        b.SVGElement = q;
        return b.SVGElement
    });
    M(q, "Core/Renderer/SVG/SVGLabel.js", [q["Core/Renderer/SVG/SVGElement.js"],
        q["Core/Utilities.js"]
    ], function (l, b) {
        var q = this && this.__extends || function () {
                var b = function (l, A) {
                    b = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (p, b) {
                        p.__proto__ = b
                    } || function (p, b) {
                        for (var t in b) b.hasOwnProperty(t) && (p[t] = b[t])
                    };
                    return b(l, A)
                };
                return function (l, A) {
                    function p() {
                        this.constructor = l
                    }
                    b(l, A);
                    l.prototype = null === A ? Object.create(A) : (p.prototype = A.prototype, new p)
                }
            }(),
            z = b.defined,
            w = b.extend,
            C = b.isNumber,
            F = b.merge,
            H = b.removeEvent;
        return function (b) {
            function y(A, p, l, t, n, v, D,
                r, m, a) {
                var h = b.call(this) || this;
                h.init(A, "g");
                h.textStr = p;
                h.x = l;
                h.y = t;
                h.anchorX = v;
                h.anchorY = D;
                h.baseline = m;
                h.className = a;
                "button" !== a && h.addClass("highcharts-label");
                a && h.addClass("highcharts-" + a);
                h.text = A.text("", 0, 0, r).attr({
                    zIndex: 1
                });
                if ("string" === typeof n) {
                    var k = /^url\((.*?)\)$/.test(n);
                    if (h.renderer.symbols[n] || k) h.symbolKey = n
                }
                h.bBox = y.emptyBBox;
                h.padding = 3;
                h.paddingLeft = 0;
                h.baselineOffset = 0;
                h.needsBox = A.styledMode || k;
                h.deferredAttr = {};
                h.alignFactor = 0;
                return h
            }
            q(y, b);
            y.prototype.alignSetter =
                function (b) {
                    b = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [b];
                    b !== this.alignFactor && (this.alignFactor = b, this.bBox && C(this.xSetting) && this.attr({
                        x: this.xSetting
                    }))
                };
            y.prototype.anchorXSetter = function (b, p) {
                this.anchorX = b;
                this.boxAttr(p, Math.round(b) - this.getCrispAdjust() - this.xSetting)
            };
            y.prototype.anchorYSetter = function (b, p) {
                this.anchorY = b;
                this.boxAttr(p, b - this.ySetting)
            };
            y.prototype.boxAttr = function (b, p) {
                this.box ? this.box.attr(b, p) : this.deferredAttr[b] = p
            };
            y.prototype.css = function (b) {
                if (b) {
                    var p = {};
                    b = F(b);
                    y.textProps.forEach(function (t) {
                        "undefined" !==
                        typeof b[t] && (p[t] = b[t], delete b[t])
                    });
                    this.text.css(p);
                    var A = "fontSize" in p || "fontWeight" in p;
                    if ("width" in p || A) this.updateBoxSize(), A && this.updateTextPadding()
                }
                return l.prototype.css.call(this, b)
            };
            y.prototype.destroy = function () {
                H(this.element, "mouseenter");
                H(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                l.prototype.destroy.call(this)
            };
            y.prototype.fillSetter = function (b, p) {
                b && (this.needsBox = !0);
                this.fill = b;
                this.boxAttr(p, b)
            };
            y.prototype.getBBox =
                function () {
                    var b = this.bBox,
                        p = this.padding;
                    return {
                        width: b.width + 2 * p,
                        height: b.height + 2 * p,
                        x: b.x - p,
                        y: b.y - p
                    }
                };
            y.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
            };
            y.prototype.heightSetter = function (b) {
                this.heightSetting = b
            };
            y.prototype.on = function (b, p) {
                var A = this,
                    t = A.text,
                    n = t && "SPAN" === t.element.tagName ? t : void 0;
                if (n) {
                    var v = function (v) {
                        ("mouseenter" === b || "mouseleave" === b) && v.relatedTarget instanceof
                        Element && (A.element.contains(v.relatedTarget) || n.element.contains(v.relatedTarget)) || p.call(A.element, v)
                    };
                    n.on(b, v)
                }
                l.prototype.on.call(A, b, v || p);
                return A
            };
            y.prototype.onAdd = function () {
                var b = this.textStr;
                this.text.add(this);
                this.attr({
                    text: z(b) ? b : "",
                    x: this.x,
                    y: this.y
                });
                this.box && z(this.anchorX) && this.attr({
                    anchorX: this.anchorX,
                    anchorY: this.anchorY
                })
            };
            y.prototype.paddingSetter = function (b) {
                z(b) && b !== this.padding && (this.padding = b, this.updateTextPadding())
            };
            y.prototype.paddingLeftSetter = function (b) {
                z(b) &&
                    b !== this.paddingLeft && (this.paddingLeft = b, this.updateTextPadding())
            };
            y.prototype.rSetter = function (b, p) {
                this.boxAttr(p, b)
            };
            y.prototype.shadow = function (b) {
                b && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(b));
                return this
            };
            y.prototype.strokeSetter = function (b, p) {
                this.stroke = b;
                this.boxAttr(p, b)
            };
            y.prototype["stroke-widthSetter"] = function (b, p) {
                b && (this.needsBox = !0);
                this["stroke-width"] = b;
                this.boxAttr(p, b)
            };
            y.prototype["text-alignSetter"] = function (b) {
                this.textAlign = b
            };
            y.prototype.textSetter =
                function (b) {
                    "undefined" !== typeof b && this.text.attr({
                        text: b
                    });
                    this.updateBoxSize();
                    this.updateTextPadding()
                };
            y.prototype.updateBoxSize = function () {
                var b = this.text.element.style,
                    p = {},
                    l = this.padding,
                    t = this.paddingLeft,
                    n = C(this.widthSetting) && C(this.heightSetting) && !this.textAlign || !z(this.text.textStr) ? y.emptyBBox : this.text.getBBox();
                this.width = (this.widthSetting || n.width || 0) + 2 * l + t;
                this.height = (this.heightSetting || n.height || 0) + 2 * l;
                this.baselineOffset = l + Math.min(this.renderer.fontMetrics(b && b.fontSize,
                    this.text).b, n.height || Infinity);
                this.needsBox && (this.box || (b = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), b.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), b.add(this), b = this.getCrispAdjust(), p.x = b, p.y = (this.baseline ? -this.baselineOffset : 0) + b), p.width = Math.round(this.width), p.height = Math.round(this.height), this.box.attr(w(p, this.deferredAttr)), this.deferredAttr = {});
                this.bBox = n
            };
            y.prototype.updateTextPadding =
                function () {
                    var b = this.text,
                        p = this.baseline ? 0 : this.baselineOffset,
                        l = this.paddingLeft + this.padding;
                    z(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (l += {
                        center: .5,
                        right: 1
                    } [this.textAlign] * (this.widthSetting - this.bBox.width));
                    if (l !== b.x || p !== b.y) b.attr("x", l), b.hasBoxWidthChanged && (this.bBox = b.getBBox(!0), this.updateBoxSize()), "undefined" !== typeof p && b.attr("y", p);
                    b.x = l;
                    b.y = p
                };
            y.prototype.widthSetter = function (b) {
                this.widthSetting = C(b) ? b : void 0
            };
            y.prototype.xSetter =
                function (b) {
                    this.x = b;
                    this.alignFactor && (b -= this.alignFactor * ((this.widthSetting || this.bBox.width) + 2 * this.padding), this["forceAnimate:x"] = !0);
                    this.xSetting = Math.round(b);
                    this.attr("translateX", this.xSetting)
                };
            y.prototype.ySetter = function (b) {
                this.ySetting = this.y = Math.round(b);
                this.attr("translateY", this.ySetting)
            };
            y.emptyBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            y.textProps = "color cursor direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return y
        }(l)
    });
    M(q, "Core/Renderer/SVG/SVGRenderer.js", [q["Core/Color.js"], q["Core/Globals.js"], q["Core/Renderer/SVG/SVGElement.js"], q["Core/Renderer/SVG/SVGLabel.js"], q["Core/Utilities.js"]], function (l, b, q, z, w) {
        var C = w.addEvent,
            F = w.attr,
            H = w.createElement,
            I = w.css,
            y = w.defined,
            A = w.destroyObjectProperties,
            p = w.extend,
            E = w.isArray,
            t = w.isNumber,
            n = w.isObject,
            v = w.isString,
            D = w.merge,
            r = w.objectEach,
            m = w.pick,
            a = w.pInt,
            h = w.splat,
            k = w.uniqueKey,
            g = b.charts,
            e = b.deg2rad,
            x = b.doc,
            u = b.isFirefox,
            B = b.isMS,
            O = b.isWebKit;
        w =
            b.noop;
        var G = b.svg,
            K = b.SVG_NS,
            P = b.symbolSizes,
            J = b.win,
            f = function () {
                function d(c, d, f, a, e, g, k) {
                    this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                    this.init(c, d, f, a, e, g, k)
                }
                d.prototype.init = function (c, d, f, a, e, g, k) {
                    var h = this.createElement("svg").attr({
                        version: "1.1",
                        "class": "highcharts-root"
                    });
                    k || h.css(this.getStyle(a));
                    a = h.element;
                    c.appendChild(a);
                    F(c, "dir", "ltr"); - 1 === c.innerHTML.indexOf("xmlns") && F(a, "xmlns", this.SVG_NS);
                    this.isSVG = !0;
                    this.box = a;
                    this.boxWrapper = h;
                    this.alignedObjects = [];
                    this.url = (u || O) && x.getElementsByTagName("base").length ? J.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                    this.createElement("desc").add().element.appendChild(x.createTextNode("Created with Highcharts 8.2.0"));
                    this.defs = this.createElement("defs").add();
                    this.allowHTML = g;
                    this.forExport = e;
                    this.styledMode = k;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount = 0;
                    this.setSize(d, f, !1);
                    var m;
                    u && c.getBoundingClientRect && (d = function () {
                        I(c, {
                            left: 0,
                            top: 0
                        });
                        m = c.getBoundingClientRect();
                        I(c, {
                            left: Math.ceil(m.left) - m.left + "px",
                            top: Math.ceil(m.top) - m.top + "px"
                        })
                    }, d(), this.unSubPixelFix = C(J, "resize", d))
                };
                d.prototype.definition = function (c) {
                    function d(c, a) {
                        var e;
                        h(c).forEach(function (c) {
                            var g = f.createElement(c.tagName),
                                k = {};
                            r(c, function (c, d) {
                                "tagName" !== d && "children" !== d && "textContent" !== d && (k[d] = c)
                            });
                            g.attr(k);
                            g.add(a || f.defs);
                            c.textContent && g.element.appendChild(x.createTextNode(c.textContent));
                            d(c.children || [], g);
                            e = g
                        });
                        return e
                    }
                    var f = this;
                    return d(c)
                };
                d.prototype.getStyle = function (c) {
                    return this.style = p({
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    }, c)
                };
                d.prototype.setStyle = function (c) {
                    this.boxWrapper.css(this.getStyle(c))
                };
                d.prototype.isHidden = function () {
                    return !this.boxWrapper.getBBox().width
                };
                d.prototype.destroy = function () {
                    var c = this.defs;
                    this.box =
                        null;
                    this.boxWrapper = this.boxWrapper.destroy();
                    A(this.gradients || {});
                    this.gradients = null;
                    c && (this.defs = c.destroy());
                    this.unSubPixelFix && this.unSubPixelFix();
                    return this.alignedObjects = null
                };
                d.prototype.createElement = function (c) {
                    var d = new this.Element;
                    d.init(this, c);
                    return d
                };
                d.prototype.getRadialAttr = function (c, d) {
                    return {
                        cx: c[0] - c[2] / 2 + d.cx * c[2],
                        cy: c[1] - c[2] / 2 + d.cy * c[2],
                        r: d.r * c[2]
                    }
                };
                d.prototype.truncate = function (c, d, f, a, e, g, k) {
                    var h = this,
                        m = c.rotation,
                        L, u = a ? 1 : 0,
                        N = (f || a).length,
                        n = N,
                        v = [],
                        r = function (c) {
                            d.firstChild &&
                                d.removeChild(d.firstChild);
                            c && d.appendChild(x.createTextNode(c))
                        },
                        G = function (g, m) {
                            m = m || g;
                            if ("undefined" === typeof v[m])
                                if (d.getSubStringLength) try {
                                    v[m] = e + d.getSubStringLength(0, a ? m + 1 : m)
                                } catch (oa) {
                                    ""
                                } else h.getSpanWidth && (r(k(f || a, g)), v[m] = e + h.getSpanWidth(c, d));
                            return v[m]
                        },
                        S;
                    c.rotation = 0;
                    var B = G(d.textContent.length);
                    if (S = e + B > g) {
                        for (; u <= N;) n = Math.ceil((u + N) / 2), a && (L = k(a, n)), B = G(n, L && L.length - 1), u === N ? u = N + 1 : B > g ? N = n - 1 : u = n;
                        0 === N ? r("") : f && N === f.length - 1 || r(L || k(f || a, n))
                    }
                    a && a.splice(0, n);
                    c.actualWidth =
                        B;
                    c.rotation = m;
                    return S
                };
                d.prototype.buildText = function (c) {
                    var d = c.element,
                        f = this,
                        e = f.forExport,
                        g = m(c.textStr, "").toString(),
                        k = -1 !== g.indexOf("<"),
                        h = d.childNodes,
                        u, n = F(d, "x"),
                        B = c.styles,
                        b = c.textWidth,
                        D = B && B.lineHeight,
                        p = B && B.textOutline,
                        t = B && "ellipsis" === B.textOverflow,
                        O = B && "nowrap" === B.whiteSpace,
                        l = B && B.fontSize,
                        J, y = h.length;
                    B = b && !c.added && this.box;
                    var P = function (c) {
                            var e;
                            f.styledMode || (e = /(px|em)$/.test(c && c.style.fontSize) ? c.style.fontSize : l || f.style.fontSize || 12);
                            return D ? a(D) : f.fontMetrics(e,
                                c.getAttribute("style") ? c : d).h
                        },
                        A = function (c, d) {
                            r(f.escapes, function (f, a) {
                                d && -1 !== d.indexOf(f) || (c = c.toString().replace(new RegExp(f, "g"), a))
                            });
                            return c
                        },
                        E = function (c, d) {
                            var f = c.indexOf("<");
                            c = c.substring(f, c.indexOf(">") - f);
                            f = c.indexOf(d + "=");
                            if (-1 !== f && (f = f + d.length + 1, d = c.charAt(f), '"' === d || "'" === d)) return c = c.substring(f + 1), c.substring(0, c.indexOf(d))
                        },
                        q = /<br.*?>/g;
                    var w = [g, t, O, D, p, l, b].join();
                    if (w !== c.textCache) {
                        for (c.textCache = w; y--;) d.removeChild(h[y]);
                        k || p || t || b || -1 !== g.indexOf(" ") && (!O ||
                            q.test(g)) ? (B && B.appendChild(d), k ? (g = f.styledMode ? g.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g, '<span class="highcharts-emphasized">') : g.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), g = g.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(q)) : g = [g], g = g.filter(function (c) {
                            return "" !== c
                        }), g.forEach(function (a, g) {
                            var k = 0,
                                h = 0;
                            a = a.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g,
                                "</span>|||");
                            var m = a.split("|||");
                            m.forEach(function (a) {
                                if ("" !== a || 1 === m.length) {
                                    var L = {},
                                        N = x.createElementNS(f.SVG_NS, "tspan"),
                                        v, r;
                                    (v = E(a, "class")) && F(N, "class", v);
                                    if (v = E(a, "style")) v = v.replace(/(;| |^)color([ :])/, "$1fill$2"), F(N, "style", v);
                                    if ((r = E(a, "href")) && !e && -1 === r.split(":")[0].toLowerCase().indexOf("javascript")) {
                                        var B = x.createElementNS(f.SVG_NS, "a");
                                        F(B, "href", r);
                                        F(N, "class", "highcharts-anchor");
                                        B.appendChild(N);
                                        f.styledMode || I(N, {
                                            cursor: "pointer"
                                        })
                                    }
                                    a = A(a.replace(/<[a-zA-Z\/](.|\n)*?>/g,
                                        "") || " ");
                                    if (" " !== a) {
                                        N.appendChild(x.createTextNode(a));
                                        k ? L.dx = 0 : g && null !== n && (L.x = n);
                                        F(N, L);
                                        d.appendChild(B || N);
                                        !k && J && (!G && e && I(N, {
                                            display: "block"
                                        }), F(N, "dy", P(N)));
                                        if (b) {
                                            var S = a.replace(/([^\^])-/g, "$1- ").split(" ");
                                            L = !O && (1 < m.length || g || 1 < S.length);
                                            B = 0;
                                            r = P(N);
                                            if (t) u = f.truncate(c, N, a, void 0, 0, Math.max(0, b - parseInt(l || 12, 10)), function (c, d) {
                                                return c.substring(0, d) + "\u2026"
                                            });
                                            else if (L)
                                                for (; S.length;) S.length && !O && 0 < B && (N = x.createElementNS(K, "tspan"), F(N, {
                                                    dy: r,
                                                    x: n
                                                }), v && F(N, "style", v), N.appendChild(x.createTextNode(S.join(" ").replace(/- /g,
                                                    "-"))), d.appendChild(N)), f.truncate(c, N, null, S, 0 === B ? h : 0, b, function (c, d) {
                                                    return S.slice(0, d).join(" ").replace(/- /g, "-")
                                                }), h = c.actualWidth, B++
                                        }
                                        k++
                                    }
                                }
                            });
                            J = J || d.childNodes.length
                        }), t && u && c.attr("title", A(c.textStr || "", ["&lt;", "&gt;"])), B && B.removeChild(d), v(p) && c.applyTextOutline && c.applyTextOutline(p)) : d.appendChild(x.createTextNode(A(g)))
                    }
                };
                d.prototype.getContrast = function (c) {
                    c = l.parse(c).rgba;
                    c[0] *= 1;
                    c[1] *= 1.2;
                    c[2] *= .5;
                    return 459 < c[0] + c[1] + c[2] ? "#000000" : "#FFFFFF"
                };
                d.prototype.button = function (c,
                    d, f, a, e, g, k, h, m, u) {
                    var L = this.label(c, d, f, m, void 0, void 0, u, void 0, "button"),
                        N = 0,
                        x = this.styledMode;
                    c = (e = e ? D(e) : e) && e.style || {};
                    e && e.style && delete e.style;
                    L.attr(D({
                        padding: 8,
                        r: 2
                    }, e));
                    if (!x) {
                        e = D({
                            fill: "#f7f7f7",
                            stroke: "#cccccc",
                            "stroke-width": 1,
                            style: {
                                color: "#333333",
                                cursor: "pointer",
                                fontWeight: "normal"
                            }
                        }, {
                            style: c
                        }, e);
                        var n = e.style;
                        delete e.style;
                        g = D(e, {
                            fill: "#e6e6e6"
                        }, g);
                        var v = g.style;
                        delete g.style;
                        k = D(e, {
                            fill: "#e6ebf5",
                            style: {
                                color: "#000000",
                                fontWeight: "bold"
                            }
                        }, k);
                        var r = k.style;
                        delete k.style;
                        h =
                            D(e, {
                                style: {
                                    color: "#cccccc"
                                }
                            }, h);
                        var G = h.style;
                        delete h.style
                    }
                    C(L.element, B ? "mouseover" : "mouseenter", function () {
                        3 !== N && L.setState(1)
                    });
                    C(L.element, B ? "mouseout" : "mouseleave", function () {
                        3 !== N && L.setState(N)
                    });
                    L.setState = function (c) {
                        1 !== c && (L.state = N = c);
                        L.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][c || 0]);
                        x || L.attr([e, g, k, h][c || 0]).css([n, v, r, G][c || 0])
                    };
                    x || L.attr(e).css(p({
                        cursor: "default"
                    }, n));
                    return L.on("click",
                        function (c) {
                            3 !== N && a.call(L, c)
                        })
                };
                d.prototype.crispLine = function (c, d, f) {
                    void 0 === f && (f = "round");
                    var a = c[0],
                        e = c[1];
                    a[1] === e[1] && (a[1] = e[1] = Math[f](a[1]) - d % 2 / 2);
                    a[2] === e[2] && (a[2] = e[2] = Math[f](a[2]) + d % 2 / 2);
                    return c
                };
                d.prototype.path = function (c) {
                    var d = this.styledMode ? {} : {
                        fill: "none"
                    };
                    E(c) ? d.d = c : n(c) && p(d, c);
                    return this.createElement("path").attr(d)
                };
                d.prototype.circle = function (c, d, f) {
                    c = n(c) ? c : "undefined" === typeof c ? {} : {
                        x: c,
                        y: d,
                        r: f
                    };
                    d = this.createElement("circle");
                    d.xSetter = d.ySetter = function (c, d, f) {
                        f.setAttribute("c" +
                            d, c)
                    };
                    return d.attr(c)
                };
                d.prototype.arc = function (c, d, f, a, e, g) {
                    n(c) ? (a = c, d = a.y, f = a.r, c = a.x) : a = {
                        innerR: a,
                        start: e,
                        end: g
                    };
                    c = this.symbol("arc", c, d, f, f, a);
                    c.r = f;
                    return c
                };
                d.prototype.rect = function (c, d, f, a, e, g) {
                    e = n(c) ? c.r : e;
                    var k = this.createElement("rect");
                    c = n(c) ? c : "undefined" === typeof c ? {} : {
                        x: c,
                        y: d,
                        width: Math.max(f, 0),
                        height: Math.max(a, 0)
                    };
                    this.styledMode || ("undefined" !== typeof g && (c.strokeWidth = g, c = k.crisp(c)), c.fill = "none");
                    e && (c.r = e);
                    k.rSetter = function (c, d, f) {
                        k.r = c;
                        F(f, {
                            rx: c,
                            ry: c
                        })
                    };
                    k.rGetter = function () {
                        return k.r
                    };
                    return k.attr(c)
                };
                d.prototype.setSize = function (c, d, f) {
                    var a = this.alignedObjects,
                        e = a.length;
                    this.width = c;
                    this.height = d;
                    for (this.boxWrapper.animate({
                            width: c,
                            height: d
                        }, {
                            step: function () {
                                this.attr({
                                    viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                                })
                            },
                            duration: m(f, !0) ? void 0 : 0
                        }); e--;) a[e].align()
                };
                d.prototype.g = function (c) {
                    var d = this.createElement("g");
                    return c ? d.attr({
                        "class": "highcharts-" + c
                    }) : d
                };
                d.prototype.image = function (c, d, f, a, e, g) {
                    var k = {
                            preserveAspectRatio: "none"
                        },
                        h = function (c, d) {
                            c.setAttributeNS ?
                                c.setAttributeNS("http://www.w3.org/1999/xlink", "href", d) : c.setAttribute("hc-svg-href", d)
                        },
                        m = function (d) {
                            h(u.element, c);
                            g.call(u, d)
                        };
                    1 < arguments.length && p(k, {
                        x: d,
                        y: f,
                        width: a,
                        height: e
                    });
                    var u = this.createElement("image").attr(k);
                    g ? (h(u.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), k = new J.Image, C(k, "load", m), k.src = c, k.complete && m({})) : h(u.element, c);
                    return u
                };
                d.prototype.symbol = function (c, d, f, a, e, k) {
                    var h = this,
                        u = /^url\((.*?)\)$/,
                        L = u.test(c),
                        N = !L && (this.symbols[c] ?
                            c : "circle"),
                        n = N && this.symbols[N],
                        v;
                    if (n) {
                        "number" === typeof d && (v = n.call(this.symbols, Math.round(d || 0), Math.round(f || 0), a || 0, e || 0, k));
                        var r = this.path(v);
                        h.styledMode || r.attr("fill", "none");
                        p(r, {
                            symbolName: N,
                            x: d,
                            y: f,
                            width: a,
                            height: e
                        });
                        k && p(r, k)
                    } else if (L) {
                        var B = c.match(u)[1];
                        r = this.image(B);
                        r.imgwidth = m(P[B] && P[B].width, k && k.width);
                        r.imgheight = m(P[B] && P[B].height, k && k.height);
                        var G = function () {
                            r.attr({
                                width: r.width,
                                height: r.height
                            })
                        };
                        ["width", "height"].forEach(function (c) {
                            r[c + "Setter"] = function (c, d) {
                                var f = {},
                                    a = this["img" + d],
                                    e = "width" === d ? "translateX" : "translateY";
                                this[d] = c;
                                y(a) && (k && "within" === k.backgroundSize && this.width && this.height && (a = Math.round(a * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(d, a), this.alignByTranslate || (f[e] = ((this[d] || 0) - a) / 2, this.attr(f)))
                            }
                        });
                        y(d) && r.attr({
                            x: d,
                            y: f
                        });
                        r.isImg = !0;
                        y(r.imgwidth) && y(r.imgheight) ? G() : (r.attr({
                            width: 0,
                            height: 0
                        }), H("img", {
                            onload: function () {
                                var c = g[h.chartIndex];
                                0 === this.width && (I(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), x.body.appendChild(this));
                                P[B] = {
                                    width: this.width,
                                    height: this.height
                                };
                                r.imgwidth = this.width;
                                r.imgheight = this.height;
                                r.element && G();
                                this.parentNode && this.parentNode.removeChild(this);
                                h.imgCount--;
                                if (!h.imgCount && c && !c.hasLoaded) c.onload()
                            },
                            src: B
                        }), this.imgCount++)
                    }
                    return r
                };
                d.prototype.clipRect = function (c, d, f, a) {
                    var e = k() + "-",
                        g = this.createElement("clipPath").attr({
                            id: e
                        }).add(this.defs);
                    c = this.rect(c, d, f, a, 0).add(g);
                    c.id = e;
                    c.clipPath = g;
                    c.count = 0;
                    return c
                };
                d.prototype.text = function (c, d,
                    f, a) {
                    var e = {};
                    if (a && (this.allowHTML || !this.forExport)) return this.html(c, d, f);
                    e.x = Math.round(d || 0);
                    f && (e.y = Math.round(f));
                    y(c) && (e.text = c);
                    c = this.createElement("text").attr(e);
                    a || (c.xSetter = function (c, d, f) {
                        var a = f.getElementsByTagName("tspan"),
                            e = f.getAttribute(d),
                            g;
                        for (g = 0; g < a.length; g++) {
                            var k = a[g];
                            k.getAttribute(d) === e && k.setAttribute(d, c)
                        }
                        f.setAttribute(d, c)
                    });
                    return c
                };
                d.prototype.fontMetrics = function (c, d) {
                    c = !this.styledMode && /px/.test(c) || !J.getComputedStyle ? c || d && d.style && d.style.fontSize ||
                        this.style && this.style.fontSize : d && q.prototype.getStyle.call(d, "font-size");
                    c = /px/.test(c) ? a(c) : 12;
                    d = 24 > c ? c + 3 : Math.round(1.2 * c);
                    return {
                        h: d,
                        b: Math.round(.8 * d),
                        f: c
                    }
                };
                d.prototype.rotCorr = function (c, d, f) {
                    var a = c;
                    d && f && (a = Math.max(a * Math.cos(d * e), 4));
                    return {
                        x: -c / 3 * Math.sin(d * e),
                        y: a
                    }
                };
                d.prototype.pathToSegments = function (c) {
                    for (var d = [], f = [], a = {
                            A: 8,
                            C: 7,
                            H: 2,
                            L: 3,
                            M: 3,
                            Q: 5,
                            S: 5,
                            T: 3,
                            V: 2
                        }, e = 0; e < c.length; e++) v(f[0]) && t(c[e]) && f.length === a[f[0].toUpperCase()] && c.splice(e, 0, f[0].replace("M", "L").replace("m", "l")),
                        "string" === typeof c[e] && (f.length && d.push(f.slice(0)), f.length = 0), f.push(c[e]);
                    d.push(f.slice(0));
                    return d
                };
                d.prototype.label = function (c, d, f, a, e, g, k, h, m) {
                    return new z(this, c, d, f, a, e, g, k, h, m)
                };
                return d
            }();
        f.prototype.Element = q;
        f.prototype.SVG_NS = K;
        f.prototype.draw = w;
        f.prototype.escapes = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        };
        f.prototype.symbols = {
            circle: function (d, c, f, a) {
                return this.arc(d + f / 2, c + a / 2, f / 2, a / 2, {
                    start: .5 * Math.PI,
                    end: 2.5 * Math.PI,
                    open: !1
                })
            },
            square: function (d, c, f, a) {
                return [
                    ["M",
                        d, c
                    ],
                    ["L", d + f, c],
                    ["L", d + f, c + a],
                    ["L", d, c + a],
                    ["Z"]
                ]
            },
            triangle: function (d, c, f, a) {
                return [
                    ["M", d + f / 2, c],
                    ["L", d + f, c + a],
                    ["L", d, c + a],
                    ["Z"]
                ]
            },
            "triangle-down": function (d, c, f, a) {
                return [
                    ["M", d, c],
                    ["L", d + f, c],
                    ["L", d + f / 2, c + a],
                    ["Z"]
                ]
            },
            diamond: function (d, c, f, a) {
                return [
                    ["M", d + f / 2, c],
                    ["L", d + f, c + a / 2],
                    ["L", d + f / 2, c + a],
                    ["L", d, c + a / 2],
                    ["Z"]
                ]
            },
            arc: function (d, c, f, a, e) {
                var g = [];
                if (e) {
                    var k = e.start || 0,
                        h = e.end || 0,
                        u = e.r || f;
                    f = e.r || a || f;
                    var x = .001 > Math.abs(h - k - 2 * Math.PI);
                    h -= .001;
                    a = e.innerR;
                    x = m(e.open, x);
                    var L = Math.cos(k),
                        N = Math.sin(k),
                        n = Math.cos(h),
                        r = Math.sin(h);
                    k = m(e.longArc, .001 > h - k - Math.PI ? 0 : 1);
                    g.push(["M", d + u * L, c + f * N], ["A", u, f, 0, k, m(e.clockwise, 1), d + u * n, c + f * r]);
                    y(a) && g.push(x ? ["M", d + a * n, c + a * r] : ["L", d + a * n, c + a * r], ["A", a, a, 0, k, y(e.clockwise) ? 1 - e.clockwise : 0, d + a * L, c + a * N]);
                    x || g.push(["Z"])
                }
                return g
            },
            callout: function (d, c, f, a, e) {
                var g = Math.min(e && e.r || 0, f, a),
                    k = g + 6,
                    h = e && e.anchorX || 0;
                e = e && e.anchorY || 0;
                var m = [
                    ["M", d + g, c],
                    ["L", d + f - g, c],
                    ["C", d + f, c, d + f, c, d + f, c + g],
                    ["L", d + f, c + a - g],
                    ["C", d + f, c + a, d + f, c + a, d + f - g, c + a],
                    ["L", d + g, c + a],
                    ["C", d, c + a,
                        d, c + a, d, c + a - g
                    ],
                    ["L", d, c + g],
                    ["C", d, c, d, c, d + g, c]
                ];
                h && h > f ? e > c + k && e < c + a - k ? m.splice(3, 1, ["L", d + f, e - 6], ["L", d + f + 6, e], ["L", d + f, e + 6], ["L", d + f, c + a - g]) : m.splice(3, 1, ["L", d + f, a / 2], ["L", h, e], ["L", d + f, a / 2], ["L", d + f, c + a - g]) : h && 0 > h ? e > c + k && e < c + a - k ? m.splice(7, 1, ["L", d, e + 6], ["L", d - 6, e], ["L", d, e - 6], ["L", d, c + g]) : m.splice(7, 1, ["L", d, a / 2], ["L", h, e], ["L", d, a / 2], ["L", d, c + g]) : e && e > a && h > d + k && h < d + f - k ? m.splice(5, 1, ["L", h + 6, c + a], ["L", h, c + a + 6], ["L", h - 6, c + a], ["L", d + g, c + a]) : e && 0 > e && h > d + k && h < d + f - k && m.splice(1, 1, ["L", h - 6, c], ["L",
                    h, c - 6
                ], ["L", h + 6, c], ["L", f - g, c]);
                return m
            }
        };
        b.SVGRenderer = f;
        b.Renderer = b.SVGRenderer;
        return b.Renderer
    });
    M(q, "Core/Renderer/HTML/HTML.js", [q["Core/Globals.js"], q["Core/Renderer/SVG/SVGElement.js"], q["Core/Renderer/SVG/SVGRenderer.js"], q["Core/Utilities.js"]], function (l, b, q, z) {
        var w = z.attr,
            C = z.createElement,
            F = z.css,
            H = z.defined,
            I = z.extend,
            y = z.pick,
            A = z.pInt,
            p = l.isFirefox,
            E = l.isMS,
            t = l.isWebKit,
            n = l.win;
        I(b.prototype, {
            htmlCss: function (n) {
                var v = "SPAN" === this.element.tagName && n && "width" in n,
                    r = y(v && n.width,
                        void 0);
                if (v) {
                    delete n.width;
                    this.textWidth = r;
                    var m = !0
                }
                n && "ellipsis" === n.textOverflow && (n.whiteSpace = "nowrap", n.overflow = "hidden");
                this.styles = I(this.styles, n);
                F(this.element, n);
                m && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function () {
                var n = this.element;
                return {
                    x: n.offsetLeft,
                    y: n.offsetTop,
                    width: n.offsetWidth,
                    height: n.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var n = this.renderer,
                        b = this.element,
                        r = this.translateX || 0,
                        m = this.translateY || 0,
                        a = this.x || 0,
                        h = this.y || 0,
                        k = this.textAlign ||
                        "left",
                        g = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [k],
                        e = this.styles,
                        x = e && e.whiteSpace;
                    F(b, {
                        marginLeft: r,
                        marginTop: m
                    });
                    !n.styledMode && this.shadows && this.shadows.forEach(function (a) {
                        F(a, {
                            marginLeft: r + 1,
                            marginTop: m + 1
                        })
                    });
                    this.inverted && [].forEach.call(b.childNodes, function (a) {
                        n.invertChild(a, b)
                    });
                    if ("SPAN" === b.tagName) {
                        e = this.rotation;
                        var u = this.textWidth && A(this.textWidth),
                            B = [e, k, b.innerHTML, this.textWidth, this.textAlign].join(),
                            p;
                        (p = u !== this.oldTextWidth) && !(p = u > this.oldTextWidth) && ((p = this.textPxLength) || (F(b, {
                            width: "",
                            whiteSpace: x || "nowrap"
                        }), p = b.offsetWidth), p = p > u);
                        p && (/[ \-]/.test(b.textContent || b.innerText) || "ellipsis" === b.style.textOverflow) ? (F(b, {
                            width: u + "px",
                            display: "block",
                            whiteSpace: x || "normal"
                        }), this.oldTextWidth = u, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        B !== this.cTT && (x = n.fontMetrics(b.style.fontSize, b).b, !H(e) || e === (this.oldRotation || 0) && k === this.oldAlign || this.setSpanRotation(e, g, x), this.getSpanCorrection(!H(e) && this.textPxLength || b.offsetWidth, x, g, e, k));
                        F(b, {
                            left: a + (this.xCorr || 0) + "px",
                            top: h + (this.yCorr || 0) + "px"
                        });
                        this.cTT = B;
                        this.oldRotation = e;
                        this.oldAlign = k
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (n, b, r) {
                var m = {},
                    a = this.renderer.getTransformKey();
                m[a] = m.transform = "rotate(" + n + "deg)";
                m[a + (p ? "Origin" : "-origin")] = m.transformOrigin = 100 * b + "% " + r + "px";
                F(this.element, m)
            },
            getSpanCorrection: function (n, b, r) {
                this.xCorr = -n * r;
                this.yCorr = -b
            }
        });
        I(q.prototype, {
            getTransformKey: function () {
                return E && !/Edge/.test(n.navigator.userAgent) ? "-ms-transform" : t ? "-webkit-transform" : p ? "MozTransform" :
                    n.opera ? "-o-transform" : ""
            },
            html: function (n, p, r) {
                var m = this.createElement("span"),
                    a = m.element,
                    h = m.renderer,
                    k = h.isSVG,
                    g = function (a, g) {
                        ["opacity", "visibility"].forEach(function (e) {
                            a[e + "Setter"] = function (k, h, m) {
                                var u = a.div ? a.div.style : g;
                                b.prototype[e + "Setter"].call(this, k, h, m);
                                u && (u[h] = k)
                            }
                        });
                        a.addedSetters = !0
                    };
                m.textSetter = function (e) {
                    e !== a.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                    this.textStr = e;
                    a.innerHTML = y(e, "");
                    m.doTransform = !0
                };
                k && g(m, m.element.style);
                m.xSetter = m.ySetter = m.alignSetter =
                    m.rotationSetter = function (a, g) {
                        "align" === g ? m.alignValue = m.textAlign = a : m[g] = a;
                        m.doTransform = !0
                    };
                m.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                m.attr({
                    text: n,
                    x: Math.round(p),
                    y: Math.round(r)
                }).css({
                    position: "absolute"
                });
                h.styledMode || m.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                a.style.whiteSpace = "nowrap";
                m.css = m.htmlCss;
                k && (m.add = function (e) {
                    var k = h.box.parentNode,
                        u = [];
                    if (this.parentGroup = e) {
                        var n = e.div;
                        if (!n) {
                            for (; e;) u.push(e),
                                e = e.parentGroup;
                            u.reverse().forEach(function (a) {
                                function e(e, f) {
                                    a[f] = e;
                                    "translateX" === f ? x.left = e + "px" : x.top = e + "px";
                                    a.doTransform = !0
                                }
                                var h = w(a.element, "class");
                                n = a.div = a.div || C("div", h ? {
                                    className: h
                                } : void 0, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, n || k);
                                var x = n.style;
                                I(a, {
                                    classSetter: function (a) {
                                        return function (f) {
                                            this.element.setAttribute("class", f);
                                            a.className = f
                                        }
                                    }(n),
                                    on: function () {
                                        u[0].div &&
                                            m.on.apply({
                                                element: u[0].div
                                            }, arguments);
                                        return a
                                    },
                                    translateXSetter: e,
                                    translateYSetter: e
                                });
                                a.addedSetters || g(a)
                            })
                        }
                    } else n = k;
                    n.appendChild(a);
                    m.added = !0;
                    m.alignOnAdd && m.htmlUpdateTransform();
                    return m
                });
                return m
            }
        })
    });
    M(q, "Core/Axis/Tick.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.clamp,
            z = b.correctFloat,
            w = b.defined,
            C = b.destroyObjectProperties,
            F = b.extend,
            H = b.fireEvent,
            I = b.isNumber,
            y = b.merge,
            A = b.objectEach,
            p = b.pick,
            E = l.deg2rad;
        b = function () {
            function b(n, v, b, r, m) {
                this.isNewLabel =
                    this.isNew = !0;
                this.axis = n;
                this.pos = v;
                this.type = b || "";
                this.parameters = m || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                H(this, "init");
                b || r || this.addLabel()
            }
            b.prototype.addLabel = function () {
                var n = this,
                    v = n.axis,
                    b = v.options,
                    r = v.chart,
                    m = v.categories,
                    a = v.logarithmic,
                    h = v.names,
                    k = n.pos,
                    g = p(n.options && n.options.labels, b.labels),
                    e = v.tickPositions,
                    x = k === e[0],
                    u = k === e[e.length - 1];
                h = this.parameters.category || (m ? p(m[k], h[k], k) : k);
                var B = n.label;
                m = (!g.step || 1 === g.step) &&
                    1 === v.tickInterval;
                e = e.info;
                var t, G;
                if (v.dateTime && e) {
                    var K = r.time.resolveDTLFormat(b.dateTimeLabelFormats[!b.grid && e.higherRanks[k] || e.unitName]);
                    var l = K.main
                }
                n.isFirst = x;
                n.isLast = u;
                n.formatCtx = {
                    axis: v,
                    chart: r,
                    isFirst: x,
                    isLast: u,
                    dateTimeLabelFormat: l,
                    tickPositionInfo: e,
                    value: a ? z(a.lin2log(h)) : h,
                    pos: k
                };
                b = v.labelFormatter.call(n.formatCtx, this.formatCtx);
                if (G = K && K.list) n.shortenLabel = function () {
                    for (t = 0; t < G.length; t++)
                        if (B.attr({
                                text: v.labelFormatter.call(F(n.formatCtx, {
                                    dateTimeLabelFormat: G[t]
                                }))
                            }),
                            B.getBBox().width < v.getSlotWidth(n) - 2 * p(g.padding, 5)) return;
                    B.attr({
                        text: ""
                    })
                };
                m && v._addedPlotLB && n.moveLabel(b, g);
                w(B) || n.movedLabel ? B && B.textStr !== b && !m && (!B.textWidth || g.style && g.style.width || B.styles.width || B.css({
                    width: null
                }), B.attr({
                    text: b
                }), B.textPxLength = B.getBBox().width) : (n.label = B = n.createLabel({
                    x: 0,
                    y: 0
                }, b, g), n.rotation = 0)
            };
            b.prototype.createLabel = function (n, b, p) {
                var r = this.axis,
                    m = r.chart;
                if (n = w(b) && p.enabled ? m.renderer.text(b, n.x, n.y, p.useHTML).add(r.labelGroup) : null) m.styledMode || n.css(y(p.style)),
                    n.textPxLength = n.getBBox().width;
                return n
            };
            b.prototype.destroy = function () {
                C(this, this.axis)
            };
            b.prototype.getPosition = function (n, b, p, r) {
                var m = this.axis,
                    a = m.chart,
                    h = r && a.oldChartHeight || a.chartHeight;
                n = {
                    x: n ? z(m.translate(b + p, null, null, r) + m.transB) : m.left + m.offset + (m.opposite ? (r && a.oldChartWidth || a.chartWidth) - m.right - m.left : 0),
                    y: n ? h - m.bottom + m.offset - (m.opposite ? m.height : 0) : z(h - m.translate(b + p, null, null, r) - m.transB)
                };
                n.y = q(n.y, -1E5, 1E5);
                H(this, "afterGetPosition", {
                    pos: n
                });
                return n
            };
            b.prototype.getLabelPosition =
                function (n, b, p, r, m, a, h, k) {
                    var g = this.axis,
                        e = g.transA,
                        x = g.isLinked && g.linkedParent ? g.linkedParent.reversed : g.reversed,
                        u = g.staggerLines,
                        v = g.tickRotCorr || {
                            x: 0,
                            y: 0
                        },
                        t = m.y,
                        G = r || g.reserveSpaceDefault ? 0 : -g.labelOffset * ("center" === g.labelAlign ? .5 : 1),
                        K = {};
                    w(t) || (t = 0 === g.side ? p.rotation ? -8 : -p.getBBox().height : 2 === g.side ? v.y + 8 : Math.cos(p.rotation * E) * (v.y - p.getBBox(!1, 0).height / 2));
                    n = n + m.x + G + v.x - (a && r ? a * e * (x ? -1 : 1) : 0);
                    b = b + t - (a && !r ? a * e * (x ? 1 : -1) : 0);
                    u && (p = h / (k || 1) % u, g.opposite && (p = u - p - 1), b += g.labelOffset / u * p);
                    K.x =
                        n;
                    K.y = Math.round(b);
                    H(this, "afterGetLabelPosition", {
                        pos: K,
                        tickmarkOffset: a,
                        index: h
                    });
                    return K
                };
            b.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            };
            b.prototype.getMarkPath = function (n, b, p, r, m, a) {
                return a.crispLine([
                    ["M", n, b],
                    ["L", n + (m ? 0 : -p), b + (m ? p : 0)]
                ], r)
            };
            b.prototype.handleOverflow = function (n) {
                var b = this.axis,
                    t = b.options.labels,
                    r = n.x,
                    m = b.chart.chartWidth,
                    a = b.chart.spacing,
                    h = p(b.labelLeft, Math.min(b.pos, a[3]));
                a = p(b.labelRight, Math.max(b.isRadial ?
                    0 : b.pos + b.len, m - a[1]));
                var k = this.label,
                    g = this.rotation,
                    e = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [b.labelAlign || k.attr("align")],
                    x = k.getBBox().width,
                    u = b.getSlotWidth(this),
                    B = u,
                    l = 1,
                    G, K = {};
                if (g || "justify" !== p(t.overflow, "justify")) 0 > g && r - e * x < h ? G = Math.round(r / Math.cos(g * E) - h) : 0 < g && r + e * x > a && (G = Math.round((m - r) / Math.cos(g * E)));
                else if (m = r + (1 - e) * x, r - e * x < h ? B = n.x + B * (1 - e) - h : m > a && (B = a - n.x + B * e, l = -1), B = Math.min(u, B), B < u && "center" === b.labelAlign && (n.x += l * (u - B - e * (u - Math.min(x, B)))), x > B || b.autoRotation && (k.styles || {}).width) G =
                    B;
                G && (this.shortenLabel ? this.shortenLabel() : (K.width = Math.floor(G) + "px", (t.style || {}).textOverflow || (K.textOverflow = "ellipsis"), k.css(K)))
            };
            b.prototype.moveLabel = function (n, b) {
                var v = this,
                    r = v.label,
                    m = !1,
                    a = v.axis,
                    h = a.reversed;
                r && r.textStr === n ? (v.movedLabel = r, m = !0, delete v.label) : A(a.ticks, function (a) {
                    m || a.isNew || a === v || !a.label || a.label.textStr !== n || (v.movedLabel = a.label, m = !0, a.labelPos = v.movedLabel.xy, delete a.label)
                });
                if (!m && (v.labelPos || r)) {
                    var k = v.labelPos || r.xy;
                    r = a.horiz ? h ? 0 : a.width + a.left : k.x;
                    a = a.horiz ? k.y : h ? a.width + a.left : 0;
                    v.movedLabel = v.createLabel({
                        x: r,
                        y: a
                    }, n, b);
                    v.movedLabel && v.movedLabel.attr({
                        opacity: 0
                    })
                }
            };
            b.prototype.render = function (n, b, t) {
                var r = this.axis,
                    m = r.horiz,
                    a = this.pos,
                    h = p(this.tickmarkOffset, r.tickmarkOffset);
                a = this.getPosition(m, a, h, b);
                h = a.x;
                var k = a.y;
                r = m && h === r.pos + r.len || !m && k === r.pos ? -1 : 1;
                t = p(t, 1);
                this.isActive = !0;
                this.renderGridLine(b, t, r);
                this.renderMark(a, t, r);
                this.renderLabel(a, b, t, n);
                this.isNew = !1;
                H(this, "afterRender")
            };
            b.prototype.renderGridLine = function (n, b, t) {
                var r =
                    this.axis,
                    m = r.options,
                    a = this.gridLine,
                    h = {},
                    k = this.pos,
                    g = this.type,
                    e = p(this.tickmarkOffset, r.tickmarkOffset),
                    x = r.chart.renderer,
                    u = g ? g + "Grid" : "grid",
                    B = m[u + "LineWidth"],
                    v = m[u + "LineColor"];
                m = m[u + "LineDashStyle"];
                a || (r.chart.styledMode || (h.stroke = v, h["stroke-width"] = B, m && (h.dashstyle = m)), g || (h.zIndex = 1), n && (b = 0), this.gridLine = a = x.path().attr(h).addClass("highcharts-" + (g ? g + "-" : "") + "grid-line").add(r.gridGroup));
                if (a && (t = r.getPlotLinePath({
                        value: k + e,
                        lineWidth: a.strokeWidth() * t,
                        force: "pass",
                        old: n
                    }))) a[n ||
                    this.isNew ? "attr" : "animate"]({
                    d: t,
                    opacity: b
                })
            };
            b.prototype.renderMark = function (n, b, t) {
                var r = this.axis,
                    m = r.options,
                    a = r.chart.renderer,
                    h = this.type,
                    k = h ? h + "Tick" : "tick",
                    g = r.tickSize(k),
                    e = this.mark,
                    x = !e,
                    u = n.x;
                n = n.y;
                var B = p(m[k + "Width"], !h && r.isXAxis ? 1 : 0);
                m = m[k + "Color"];
                g && (r.opposite && (g[0] = -g[0]), x && (this.mark = e = a.path().addClass("highcharts-" + (h ? h + "-" : "") + "tick").add(r.axisGroup), r.chart.styledMode || e.attr({
                    stroke: m,
                    "stroke-width": B
                })), e[x ? "attr" : "animate"]({
                    d: this.getMarkPath(u, n, g[0], e.strokeWidth() *
                        t, r.horiz, a),
                    opacity: b
                }))
            };
            b.prototype.renderLabel = function (n, b, t, r) {
                var m = this.axis,
                    a = m.horiz,
                    h = m.options,
                    k = this.label,
                    g = h.labels,
                    e = g.step;
                m = p(this.tickmarkOffset, m.tickmarkOffset);
                var x = !0,
                    u = n.x;
                n = n.y;
                k && I(u) && (k.xy = n = this.getLabelPosition(u, n, k, a, g, m, r, e), this.isFirst && !this.isLast && !p(h.showFirstLabel, 1) || this.isLast && !this.isFirst && !p(h.showLastLabel, 1) ? x = !1 : !a || g.step || g.rotation || b || 0 === t || this.handleOverflow(n), e && r % e && (x = !1), x && I(n.y) ? (n.opacity = t, k[this.isNewLabel ? "attr" : "animate"](n), this.isNewLabel = !1) : (k.attr("y", -9999), this.isNewLabel = !0))
            };
            b.prototype.replaceMovedLabel = function () {
                var n = this.label,
                    b = this.axis,
                    p = b.reversed;
                if (n && !this.isNew) {
                    var r = b.horiz ? p ? b.left : b.width + b.left : n.xy.x;
                    p = b.horiz ? n.xy.y : p ? b.width + b.top : b.top;
                    n.animate({
                        x: r,
                        y: p,
                        opacity: 0
                    }, void 0, n.destroy);
                    delete this.label
                }
                b.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            };
            return b
        }();
        l.Tick = b;
        return l.Tick
    });
    M(q, "Core/Time.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.defined,
            z = b.error,
            w = b.extend,
            C = b.isObject,
            F = b.merge,
            H = b.objectEach,
            I = b.pad,
            y = b.pick,
            A = b.splat,
            p = b.timeUnits,
            E = l.win;
        b = function () {
            function b(n) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = E.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(n)
            }
            b.prototype.get = function (n, b) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var v = b.getTime(),
                        r = v - this.getTimezoneOffset(b);
                    b.setTime(r);
                    n = b["getUTC" + n]();
                    b.setTime(v);
                    return n
                }
                return this.useUTC ? b["getUTC" + n]() : b["get" + n]()
            };
            b.prototype.set =
                function (b, v, p) {
                    if (this.variableTimezone || this.timezoneOffset) {
                        if ("Milliseconds" === b || "Seconds" === b || "Minutes" === b) return v["setUTC" + b](p);
                        var n = this.getTimezoneOffset(v);
                        n = v.getTime() - n;
                        v.setTime(n);
                        v["setUTC" + b](p);
                        b = this.getTimezoneOffset(v);
                        n = v.getTime() + b;
                        return v.setTime(n)
                    }
                    return this.useUTC ? v["setUTC" + b](p) : v["set" + b](p)
                };
            b.prototype.update = function (b) {
                var n = y(b && b.useUTC, !0);
                this.options = b = F(!0, this.options || {}, b);
                this.Date = b.Date || E.Date || Date;
                this.timezoneOffset = (this.useUTC = n) && b.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = !(n && !b.getTimezoneOffset && !b.timezone)
            };
            b.prototype.makeTime = function (b, v, p, r, m, a) {
                if (this.useUTC) {
                    var h = this.Date.UTC.apply(0, arguments);
                    var k = this.getTimezoneOffset(h);
                    h += k;
                    var g = this.getTimezoneOffset(h);
                    k !== g ? h += g - k : k - 36E5 !== this.getTimezoneOffset(h - 36E5) || l.isSafari || (h -= 36E5)
                } else h = (new this.Date(b, v, y(p, 1), y(r, 0), y(m, 0), y(a, 0))).getTime();
                return h
            };
            b.prototype.timezoneOffsetFunction = function () {
                var b = this,
                    v = this.options,
                    p = v.moment || E.moment;
                if (!this.useUTC) return function (b) {
                    return 6E4 * (new Date(b.toString())).getTimezoneOffset()
                };
                if (v.timezone) {
                    if (p) return function (b) {
                        return 6E4 * -p.tz(b, v.timezone).utcOffset()
                    };
                    z(25)
                }
                return this.useUTC && v.getTimezoneOffset ? function (b) {
                    return 6E4 * v.getTimezoneOffset(b.valueOf())
                } : function () {
                    return 6E4 * (b.timezoneOffset || 0)
                }
            };
            b.prototype.dateFormat = function (b, p, t) {
                var n;
                if (!q(p) || isNaN(p)) return (null === (n = l.defaultOptions.lang) || void 0 === n ? void 0 : n.invalidDate) || "";
                b = y(b, "%Y-%m-%d %H:%M:%S");
                var m = this;
                n = new this.Date(p);
                var a = this.get("Hours", n),
                    h = this.get("Day", n),
                    k = this.get("Date", n),
                    g = this.get("Month", n),
                    e = this.get("FullYear", n),
                    x = l.defaultOptions.lang,
                    u = null === x || void 0 === x ? void 0 : x.weekdays,
                    B = null === x || void 0 === x ? void 0 : x.shortWeekdays;
                n = w({
                    a: B ? B[h] : u[h].substr(0, 3),
                    A: u[h],
                    d: I(k),
                    e: I(k, 2, " "),
                    w: h,
                    b: x.shortMonths[g],
                    B: x.months[g],
                    m: I(g + 1),
                    o: g + 1,
                    y: e.toString().substr(2, 2),
                    Y: e,
                    H: I(a),
                    k: a,
                    I: I(a % 12 || 12),
                    l: a % 12 || 12,
                    M: I(this.get("Minutes", n)),
                    p: 12 > a ? "AM" : "PM",
                    P: 12 > a ? "am" : "pm",
                    S: I(n.getSeconds()),
                    L: I(Math.floor(p % 1E3), 3)
                }, l.dateFormats);
                H(n, function (a, e) {
                    for (; - 1 !== b.indexOf("%" + e);) b = b.replace("%" + e, "function" === typeof a ? a.call(m, p) : a)
                });
                return t ? b.substr(0, 1).toUpperCase() + b.substr(1) : b
            };
            b.prototype.resolveDTLFormat = function (b) {
                return C(b, !0) ? b : (b = A(b), {
                    main: b[0],
                    from: b[1],
                    to: b[2]
                })
            };
            b.prototype.getTimeTicks = function (b, v, t, r) {
                var m = this,
                    a = [],
                    h = {};
                var k = new m.Date(v);
                var g = b.unitRange,
                    e = b.count || 1,
                    x;
                r = y(r, 1);
                if (q(v)) {
                    m.set("Milliseconds", k, g >= p.second ? 0 : e * Math.floor(m.get("Milliseconds", k) /
                        e));
                    g >= p.second && m.set("Seconds", k, g >= p.minute ? 0 : e * Math.floor(m.get("Seconds", k) / e));
                    g >= p.minute && m.set("Minutes", k, g >= p.hour ? 0 : e * Math.floor(m.get("Minutes", k) / e));
                    g >= p.hour && m.set("Hours", k, g >= p.day ? 0 : e * Math.floor(m.get("Hours", k) / e));
                    g >= p.day && m.set("Date", k, g >= p.month ? 1 : Math.max(1, e * Math.floor(m.get("Date", k) / e)));
                    if (g >= p.month) {
                        m.set("Month", k, g >= p.year ? 0 : e * Math.floor(m.get("Month", k) / e));
                        var u = m.get("FullYear", k)
                    }
                    g >= p.year && m.set("FullYear", k, u - u % e);
                    g === p.week && (u = m.get("Day", k), m.set("Date",
                        k, m.get("Date", k) - u + r + (u < r ? -7 : 0)));
                    u = m.get("FullYear", k);
                    r = m.get("Month", k);
                    var n = m.get("Date", k),
                        l = m.get("Hours", k);
                    v = k.getTime();
                    m.variableTimezone && (x = t - v > 4 * p.month || m.getTimezoneOffset(v) !== m.getTimezoneOffset(t));
                    v = k.getTime();
                    for (k = 1; v < t;) a.push(v), v = g === p.year ? m.makeTime(u + k * e, 0) : g === p.month ? m.makeTime(u, r + k * e) : !x || g !== p.day && g !== p.week ? x && g === p.hour && 1 < e ? m.makeTime(u, r, n, l + k * e) : v + g * e : m.makeTime(u, r, n + k * e * (g === p.day ? 1 : 7)), k++;
                    a.push(v);
                    g <= p.hour && 1E4 > a.length && a.forEach(function (a) {
                        0 === a % 18E5 &&
                            "000000000" === m.dateFormat("%H%M%S%L", a) && (h[a] = "day")
                    })
                }
                a.info = w(b, {
                    higherRanks: h,
                    totalRange: g * e
                });
                return a
            };
            return b
        }();
        l.Time = b;
        return l.Time
    });
    M(q, "Core/Options.js", [q["Core/Globals.js"], q["Core/Time.js"], q["Core/Color.js"], q["Core/Utilities.js"]], function (l, b, q, z) {
        q = q.parse;
        z = z.merge;
        l.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0
            },
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            caption: {
                margin: 15,
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: l.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: l.isTouchDevice ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: q("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        "";
        l.time = new b(z(l.defaultOptions.global, l.defaultOptions.time));
        l.dateFormat = function (b, q, z) {
            return l.time.dateFormat(b, q, z)
        };
        return {
            dateFormat: l.dateFormat,
            defaultOptions: l.defaultOptions,
            time: l.time
        }
    });
    M(q, "Core/Axis/Axis.js", [q["Core/Color.js"], q["Core/Globals.js"], q["Core/Axis/Tick.js"], q["Core/Utilities.js"], q["Core/Options.js"]], function (l, b, q, z, w) {
        var C = z.addEvent,
            F = z.animObject,
            H = z.arrayMax,
            I = z.arrayMin,
            y = z.clamp,
            A = z.correctFloat,
            p = z.defined,
            E = z.destroyObjectProperties,
            t = z.error,
            n = z.extend,
            v = z.fireEvent,
            D = z.format,
            r = z.getMagnitude,
            m = z.isArray,
            a = z.isFunction,
            h = z.isNumber,
            k = z.isString,
            g = z.merge,
            e = z.normalizeTickInterval,
            x = z.objectEach,
            u = z.pick,
            B = z.relativeLength,
            O = z.removeEvent,
            G = z.splat,
            K = z.syncTimeout,
            P = w.defaultOptions,
            J = b.deg2rad;
        z = function () {
            function f(d, c) {
                this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks =
                    this.overlap = this.options = this.oldMin = this.oldMax = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                this.init(d, c)
            }
            f.prototype.init = function (d, c) {
                var f = c.isX,
                    e = this;
                e.chart = d;
                e.horiz = d.inverted && !e.isZAxis ? !f : f;
                e.isXAxis =
                    f;
                e.coll = e.coll || (f ? "xAxis" : "yAxis");
                v(this, "init", {
                    userOptions: c
                });
                e.opposite = c.opposite;
                e.side = c.side || (e.horiz ? e.opposite ? 0 : 2 : e.opposite ? 1 : 3);
                e.setOptions(c);
                var g = this.options,
                    k = g.type;
                e.labelFormatter = g.labels.formatter || e.defaultLabelFormatter;
                e.userOptions = c;
                e.minPixelPadding = 0;
                e.reversed = g.reversed;
                e.visible = !1 !== g.visible;
                e.zoomEnabled = !1 !== g.zoomEnabled;
                e.hasNames = "category" === k || !0 === g.categories;
                e.categories = g.categories || e.hasNames;
                e.names || (e.names = [], e.names.keys = {});
                e.plotLinesAndBandsGroups = {};
                e.positiveValuesOnly = !!e.logarithmic;
                e.isLinked = p(g.linkedTo);
                e.ticks = {};
                e.labelEdge = [];
                e.minorTicks = {};
                e.plotLinesAndBands = [];
                e.alternateBands = {};
                e.len = 0;
                e.minRange = e.userMinRange = g.minRange || g.maxZoom;
                e.range = g.range;
                e.offset = g.offset || 0;
                e.max = null;
                e.min = null;
                e.crosshair = u(g.crosshair, G(d.options.tooltip.crosshairs)[f ? 0 : 1], !1);
                c = e.options.events; - 1 === d.axes.indexOf(e) && (f ? d.axes.splice(d.xAxis.length, 0, e) : d.axes.push(e), d[e.coll].push(e));
                e.series = e.series || [];
                d.inverted && !e.isZAxis && f && "undefined" ===
                    typeof e.reversed && (e.reversed = !0);
                e.labelRotation = e.options.labels.rotation;
                x(c, function (c, d) {
                    a(c) && C(e, d, c)
                });
                v(this, "afterInit")
            };
            f.prototype.setOptions = function (d) {
                this.options = g(f.defaultOptions, "yAxis" === this.coll && f.defaultYAxisOptions, [f.defaultTopAxisOptions, f.defaultRightAxisOptions, f.defaultBottomAxisOptions, f.defaultLeftAxisOptions][this.side], g(P[this.coll], d));
                v(this, "afterSetOptions", {
                    userOptions: d
                })
            };
            f.prototype.defaultLabelFormatter = function () {
                var d = this.axis,
                    c = h(this.value) ? this.value :
                    NaN,
                    f = d.chart.time,
                    a = d.categories,
                    e = this.dateTimeLabelFormat,
                    g = P.lang,
                    k = g.numericSymbols;
                g = g.numericSymbolMagnitude || 1E3;
                var m = k && k.length,
                    u = d.options.labels.format;
                d = d.logarithmic ? Math.abs(c) : d.tickInterval;
                var x = this.chart,
                    b = x.numberFormatter;
                if (u) var n = D(u, this, x);
                else if (a) n = "" + this.value;
                else if (e) n = f.dateFormat(e, c);
                else if (m && 1E3 <= d)
                    for (; m-- && "undefined" === typeof n;) f = Math.pow(g, m + 1), d >= f && 0 === 10 * c % f && null !== k[m] && 0 !== c && (n = b(c / f, -1) + k[m]);
                "undefined" === typeof n && (n = 1E4 <= Math.abs(c) ? b(c, -1) :
                    b(c, -1, void 0, ""));
                return n
            };
            f.prototype.getSeriesExtremes = function () {
                var d = this,
                    c = d.chart,
                    f;
                v(this, "getSeriesExtremes", null, function () {
                    d.hasVisibleSeries = !1;
                    d.dataMin = d.dataMax = d.threshold = null;
                    d.softThreshold = !d.isXAxis;
                    d.stacking && d.stacking.buildStacks();
                    d.series.forEach(function (a) {
                        if (a.visible || !c.options.chart.ignoreHiddenSeries) {
                            var e = a.options,
                                g = e.threshold;
                            d.hasVisibleSeries = !0;
                            d.positiveValuesOnly && 0 >= g && (g = null);
                            if (d.isXAxis) {
                                if (e = a.xData, e.length) {
                                    e = d.logarithmic ? e.filter(d.validatePositiveValue) :
                                        e;
                                    f = a.getXExtremes(e);
                                    var k = f.min;
                                    var m = f.max;
                                    h(k) || k instanceof Date || (e = e.filter(h), f = a.getXExtremes(e), k = f.min, m = f.max);
                                    e.length && (d.dataMin = Math.min(u(d.dataMin, k), k), d.dataMax = Math.max(u(d.dataMax, m), m))
                                }
                            } else if (a = a.applyExtremes(), h(a.dataMin) && (k = a.dataMin, d.dataMin = Math.min(u(d.dataMin, k), k)), h(a.dataMax) && (m = a.dataMax, d.dataMax = Math.max(u(d.dataMax, m), m)), p(g) && (d.threshold = g), !e.softThreshold || d.positiveValuesOnly) d.softThreshold = !1
                        }
                    })
                });
                v(this, "afterGetSeriesExtremes")
            };
            f.prototype.translate =
                function (d, c, f, a, e, g) {
                    var k = this.linkedParent || this,
                        m = 1,
                        u = 0,
                        x = a ? k.oldTransA : k.transA;
                    a = a ? k.oldMin : k.min;
                    var b = k.minPixelPadding;
                    e = (k.isOrdinal || k.brokenAxis && k.brokenAxis.hasBreaks || k.logarithmic && e) && k.lin2val;
                    x || (x = k.transA);
                    f && (m *= -1, u = k.len);
                    k.reversed && (m *= -1, u -= m * (k.sector || k.len));
                    c ? (d = (d * m + u - b) / x + a, e && (d = k.lin2val(d))) : (e && (d = k.val2lin(d)), d = h(a) ? m * (d - a) * x + u + m * b + (h(g) ? x * g : 0) : void 0);
                    return d
                };
            f.prototype.toPixels = function (d, c) {
                return this.translate(d, !1, !this.horiz, null, !0) + (c ? 0 : this.pos)
            };
            f.prototype.toValue = function (d, c) {
                return this.translate(d - (c ? 0 : this.pos), !0, !this.horiz, null, !0)
            };
            f.prototype.getPlotLinePath = function (d) {
                function c(c, d, f) {
                    if ("pass" !== n && c < d || c > f) n ? c = y(c, d, f) : l = !0;
                    return c
                }
                var f = this,
                    a = f.chart,
                    e = f.left,
                    g = f.top,
                    k = d.old,
                    m = d.value,
                    x = d.translatedValue,
                    b = d.lineWidth,
                    n = d.force,
                    r, B, p, G, K = k && a.oldChartHeight || a.chartHeight,
                    t = k && a.oldChartWidth || a.chartWidth,
                    l, J = f.transB;
                d = {
                    value: m,
                    lineWidth: b,
                    old: k,
                    force: n,
                    acrossPanes: d.acrossPanes,
                    translatedValue: x
                };
                v(this, "getPlotLinePath",
                    d,
                    function (d) {
                        x = u(x, f.translate(m, null, null, k));
                        x = y(x, -1E5, 1E5);
                        r = p = Math.round(x + J);
                        B = G = Math.round(K - x - J);
                        h(x) ? f.horiz ? (B = g, G = K - f.bottom, r = p = c(r, e, e + f.width)) : (r = e, p = t - f.right, B = G = c(B, g, g + f.height)) : (l = !0, n = !1);
                        d.path = l && !n ? null : a.renderer.crispLine([
                            ["M", r, B],
                            ["L", p, G]
                        ], b || 1)
                    });
                return d.path
            };
            f.prototype.getLinearTickPositions = function (d, c, f) {
                var a = A(Math.floor(c / d) * d);
                f = A(Math.ceil(f / d) * d);
                var e = [],
                    g;
                A(a + d) === a && (g = 20);
                if (this.single) return [c];
                for (c = a; c <= f;) {
                    e.push(c);
                    c = A(c + d, g);
                    if (c === k) break;
                    var k = c
                }
                return e
            };
            f.prototype.getMinorTickInterval = function () {
                var d = this.options;
                return !0 === d.minorTicks ? u(d.minorTickInterval, "auto") : !1 === d.minorTicks ? null : d.minorTickInterval
            };
            f.prototype.getMinorTickPositions = function () {
                var d = this.options,
                    c = this.tickPositions,
                    f = this.minorTickInterval,
                    a = [],
                    e = this.pointRangePadding || 0,
                    g = this.min - e;
                e = this.max + e;
                var k = e - g;
                if (k && k / f < this.len / 3) {
                    var h = this.logarithmic;
                    if (h) this.paddedTicks.forEach(function (c, d, e) {
                        d && a.push.apply(a, h.getLogTickPositions(f, e[d - 1], e[d],
                            !0))
                    });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval()) a = a.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(f), g, e, d.startOfWeek));
                    else
                        for (d = g + (c[0] - g) % f; d <= e && d !== a[0]; d += f) a.push(d)
                }
                0 !== a.length && this.trimTicks(a);
                return a
            };
            f.prototype.adjustForMinRange = function () {
                var d = this.options,
                    c = this.min,
                    f = this.max,
                    a = this.logarithmic,
                    e, g, k, h, m;
                this.isXAxis && "undefined" === typeof this.minRange && !a && (p(d.min) || p(d.max) ? this.minRange = null : (this.series.forEach(function (c) {
                    h = c.xData;
                    for (g = m = c.xIncrement ? 1 : h.length - 1; 0 < g; g--)
                        if (k = h[g] - h[g - 1], "undefined" === typeof e || k < e) e = k
                }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                if (f - c < this.minRange) {
                    var x = this.dataMax - this.dataMin >= this.minRange;
                    var b = this.minRange;
                    var n = (b - f + c) / 2;
                    n = [c - n, u(d.min, c - n)];
                    x && (n[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                    c = H(n);
                    f = [c + b, u(d.max, c + b)];
                    x && (f[2] = a ? a.log2lin(this.dataMax) : this.dataMax);
                    f = I(f);
                    f - c < b && (n[0] = f - b, n[1] = u(d.min, f - b), c = H(n))
                }
                this.min = c;
                this.max =
                    f
            };
            f.prototype.getClosest = function () {
                var d;
                this.categories ? d = 1 : this.series.forEach(function (c) {
                    var f = c.closestPointRange,
                        a = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                    !c.noSharedTooltip && p(f) && a && (d = p(d) ? Math.min(d, f) : f)
                });
                return d
            };
            f.prototype.nameToX = function (d) {
                var c = m(this.categories),
                    f = c ? this.categories : this.names,
                    a = d.options.x;
                d.series.requireSorting = !1;
                p(a) || (a = !1 === this.options.uniqueNames ? d.series.autoIncrement() : c ? f.indexOf(d.name) : u(f.keys[d.name], -1));
                if (-1 === a) {
                    if (!c) var e = f.length
                } else e =
                    a;
                "undefined" !== typeof e && (this.names[e] = d.name, this.names.keys[d.name] = e);
                return e
            };
            f.prototype.updateNames = function () {
                var d = this,
                    c = this.names;
                0 < c.length && (Object.keys(c.keys).forEach(function (d) {
                    delete c.keys[d]
                }), c.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (c) {
                    c.xIncrement = null;
                    if (!c.points || c.isDirtyData) d.max = Math.max(d.max, c.xData.length - 1), c.processData(), c.generatePoints();
                    c.data.forEach(function (f, a) {
                        if (f && f.options && "undefined" !== typeof f.name) {
                            var e = d.nameToX(f);
                            "undefined" !== typeof e && e !== f.x && (f.x = e, c.xData[a] = e)
                        }
                    })
                }))
            };
            f.prototype.setAxisTranslation = function (d) {
                var c = this,
                    f = c.max - c.min,
                    a = c.axisPointRange || 0,
                    e = 0,
                    g = 0,
                    h = c.linkedParent,
                    m = !!c.categories,
                    x = c.transA,
                    b = c.isXAxis;
                if (b || m || a) {
                    var n = c.getClosest();
                    h ? (e = h.minPointOffset, g = h.pointRangePadding) : c.series.forEach(function (d) {
                        var f = m ? 1 : b ? u(d.options.pointRange, n, 0) : c.axisPointRange || 0,
                            h = d.options.pointPlacement;
                        a = Math.max(a, f);
                        if (!c.single || m) d = d.is("xrange") ? !b : b, e = Math.max(e, d && k(h) ? 0 : f / 2), g = Math.max(g,
                            d && "on" === h ? 0 : f)
                    });
                    h = c.ordinal && c.ordinal.slope && n ? c.ordinal.slope / n : 1;
                    c.minPointOffset = e *= h;
                    c.pointRangePadding = g *= h;
                    c.pointRange = Math.min(a, c.single && m ? 1 : f);
                    b && (c.closestPointRange = n)
                }
                d && (c.oldTransA = x);
                c.translationSlope = c.transA = x = c.staticScale || c.len / (f + g || 1);
                c.transB = c.horiz ? c.left : c.bottom;
                c.minPixelPadding = x * e;
                v(this, "afterSetAxisTranslation")
            };
            f.prototype.minFromRange = function () {
                return this.max - this.range
            };
            f.prototype.setTickInterval = function (d) {
                var c = this,
                    f = c.chart,
                    a = c.logarithmic,
                    g = c.options,
                    k = c.isXAxis,
                    m = c.isLinked,
                    x = g.maxPadding,
                    b = g.minPadding,
                    n = g.tickInterval,
                    B = g.tickPixelInterval,
                    G = c.categories,
                    K = h(c.threshold) ? c.threshold : null,
                    l = c.softThreshold;
                c.dateTime || G || m || this.getTickAmount();
                var J = u(c.userMin, g.min);
                var O = u(c.userMax, g.max);
                if (m) {
                    c.linkedParent = f[c.coll][g.linkedTo];
                    var D = c.linkedParent.getExtremes();
                    c.min = u(D.min, D.dataMin);
                    c.max = u(D.max, D.dataMax);
                    g.type !== c.linkedParent.options.type && t(11, 1, f)
                } else {
                    if (l && p(K))
                        if (c.dataMin >= K) D = K, b = 0;
                        else if (c.dataMax <= K) {
                        var y = K;
                        x = 0
                    }
                    c.min =
                        u(J, D, c.dataMin);
                    c.max = u(O, y, c.dataMax)
                }
                a && (c.positiveValuesOnly && !d && 0 >= Math.min(c.min, u(c.dataMin, c.min)) && t(10, 1, f), c.min = A(a.log2lin(c.min), 16), c.max = A(a.log2lin(c.max), 16));
                c.range && p(c.max) && (c.userMin = c.min = J = Math.max(c.dataMin, c.minFromRange()), c.userMax = O = c.max, c.range = null);
                v(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(G || c.axisPointRange || c.stacking && c.stacking.usePercentage || m) && p(c.min) && p(c.max) && (f = c.max - c.min) && (!p(J) && b && (c.min -= f * b), !p(O) && x && (c.max +=
                    f * x));
                h(c.userMin) || (h(g.softMin) && g.softMin < c.min && (c.min = J = g.softMin), h(g.floor) && (c.min = Math.max(c.min, g.floor)));
                h(c.userMax) || (h(g.softMax) && g.softMax > c.max && (c.max = O = g.softMax), h(g.ceiling) && (c.max = Math.min(c.max, g.ceiling)));
                l && p(c.dataMin) && (K = K || 0, !p(J) && c.min < K && c.dataMin >= K ? c.min = c.options.minRange ? Math.min(K, c.max - c.minRange) : K : !p(O) && c.max > K && c.dataMax <= K && (c.max = c.options.minRange ? Math.max(K, c.min + c.minRange) : K));
                c.tickInterval = c.min === c.max || "undefined" === typeof c.min || "undefined" ===
                    typeof c.max ? 1 : m && !n && B === c.linkedParent.options.tickPixelInterval ? n = c.linkedParent.tickInterval : u(n, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (c.max - c.min) * B / Math.max(c.len, B));
                k && !d && c.series.forEach(function (d) {
                    d.processData(c.min !== c.oldMin || c.max !== c.oldMax)
                });
                c.setAxisTranslation(!0);
                v(this, "initialAxisTranslation");
                c.pointRange && !n && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                d = u(g.minTickInterval, c.dateTime && !c.series.some(function (c) {
                        return c.noSharedTooltip
                    }) ?
                    c.closestPointRange : 0);
                !n && c.tickInterval < d && (c.tickInterval = d);
                c.dateTime || c.logarithmic || n || (c.tickInterval = e(c.tickInterval, void 0, r(c.tickInterval), u(g.allowDecimals, .5 > c.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            };
            f.prototype.setTickPositions = function () {
                var d = this.options,
                    c = d.tickPositions;
                var f = this.getMinorTickInterval();
                var a = d.tickPositioner,
                    e = this.hasVerticalPanning(),
                    g = "colorAxis" === this.coll,
                    k = (g ||
                        !e) && d.startOnTick;
                e = (g || !e) && d.endOnTick;
                this.tickmarkOffset = this.categories && "between" === d.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === f && this.tickInterval ? this.tickInterval / 5 : f;
                this.single = this.min === this.max && p(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== d.allowDecimals);
                this.tickPositions = f = c && c.slice();
                !f && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? f = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval,
                    d.units), this.min, this.max, d.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (f = [this.min, this.max], t(19, !1, this.chart)), f.length > this.len && (f = [f[0], f.pop()], f[0] === f[1] && (f.length = 1)), this.tickPositions = f, a && (a = a.apply(this, [this.min, this.max]))) && (this.tickPositions = f = a);
                this.paddedTicks = f.slice(0);
                this.trimTicks(f,
                    k, e);
                this.isLinked || (this.single && 2 > f.length && !this.categories && !this.series.some(function (c) {
                    return c.is("heatmap") && "between" === c.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), c || a || this.adjustTickAmount());
                v(this, "afterSetTickPositions")
            };
            f.prototype.trimTicks = function (d, c, f) {
                var a = d[0],
                    e = d[d.length - 1],
                    g = !this.isOrdinal && this.minPointOffset || 0;
                v(this, "trimTicks");
                if (!this.isLinked) {
                    if (c && -Infinity !== a) this.min = a;
                    else
                        for (; this.min - g > d[0];) d.shift();
                    if (f) this.max = e;
                    else
                        for (; this.max + g <
                            d[d.length - 1];) d.pop();
                    0 === d.length && p(a) && !this.options.tickPositions && d.push((e + a) / 2)
                }
            };
            f.prototype.alignToOthers = function () {
                var d = {},
                    c, f = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === f.alignTicks || !1 === f.startOnTick || !1 === f.endOnTick || this.logarithmic || this.chart[this.coll].forEach(function (f) {
                    var a = f.options;
                    a = [f.horiz ? a.left : a.top, a.width, a.height, a.pane].join();
                    f.series.length && (d[a] ? c = !0 : d[a] = 1)
                });
                return c
            };
            f.prototype.getTickAmount = function () {
                var d = this.options,
                    c = d.tickAmount,
                    f = d.tickPixelInterval;
                !p(d.tickInterval) && !c && this.len < f && !this.isRadial && !this.logarithmic && d.startOnTick && d.endOnTick && (c = 2);
                !c && this.alignToOthers() && (c = Math.ceil(this.len / f) + 1);
                4 > c && (this.finalTickAmt = c, c = 5);
                this.tickAmount = c
            };
            f.prototype.adjustTickAmount = function () {
                var d = this.options,
                    c = this.tickInterval,
                    f = this.tickPositions,
                    a = this.tickAmount,
                    e = this.finalTickAmt,
                    g = f && f.length,
                    k = u(this.threshold, this.softThreshold ? 0 : null),
                    h;
                if (this.hasData()) {
                    if (g < a) {
                        for (h = this.min; f.length < a;) f.length % 2 || h ===
                            k ? f.push(A(f[f.length - 1] + c)) : f.unshift(A(f[0] - c));
                        this.transA *= (g - 1) / (a - 1);
                        this.min = d.startOnTick ? f[0] : Math.min(this.min, f[0]);
                        this.max = d.endOnTick ? f[f.length - 1] : Math.max(this.max, f[f.length - 1])
                    } else g > a && (this.tickInterval *= 2, this.setTickPositions());
                    if (p(e)) {
                        for (c = d = f.length; c--;)(3 === e && 1 === c % 2 || 2 >= e && 0 < c && c < d - 1) && f.splice(c, 1);
                        this.finalTickAmt = void 0
                    }
                }
            };
            f.prototype.setScale = function () {
                var d, c = !1,
                    f = !1;
                this.series.forEach(function (d) {
                    var a;
                    c = c || d.isDirtyData || d.isDirty;
                    f = f || (null === (a = d.xAxis) ||
                        void 0 === a ? void 0 : a.isDirty) || !1
                });
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (d = this.len !== this.oldAxisLength) || c || f || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = d || this.min !== this.oldMin ||
                    this.max !== this.oldMax)) : this.stacking && this.stacking.cleanStacks();
                c && this.panningState && (this.panningState.isDirty = !0);
                v(this, "afterSetScale")
            };
            f.prototype.setExtremes = function (d, c, f, a, e) {
                var g = this,
                    k = g.chart;
                f = u(f, !0);
                g.series.forEach(function (c) {
                    delete c.kdTree
                });
                e = n(e, {
                    min: d,
                    max: c
                });
                v(g, "setExtremes", e, function () {
                    g.userMin = d;
                    g.userMax = c;
                    g.eventArgs = e;
                    f && k.redraw(a)
                })
            };
            f.prototype.zoom = function (d, c) {
                var f = this,
                    a = this.dataMin,
                    e = this.dataMax,
                    g = this.options,
                    k = Math.min(a, u(g.min, a)),
                    h = Math.max(e,
                        u(g.max, e));
                d = {
                    newMin: d,
                    newMax: c
                };
                v(this, "zoom", d, function (c) {
                    var d = c.newMin,
                        g = c.newMax;
                    if (d !== f.min || g !== f.max) f.allowZoomOutside || (p(a) && (d < k && (d = k), d > h && (d = h)), p(e) && (g < k && (g = k), g > h && (g = h))), f.displayBtn = "undefined" !== typeof d || "undefined" !== typeof g, f.setExtremes(d, g, !1, void 0, {
                        trigger: "zoom"
                    });
                    c.zoomed = !0
                });
                return d.zoomed
            };
            f.prototype.setAxisSize = function () {
                var d = this.chart,
                    c = this.options,
                    f = c.offsets || [0, 0, 0, 0],
                    a = this.horiz,
                    e = this.width = Math.round(B(u(c.width, d.plotWidth - f[3] + f[1]), d.plotWidth)),
                    g = this.height = Math.round(B(u(c.height, d.plotHeight - f[0] + f[2]), d.plotHeight)),
                    k = this.top = Math.round(B(u(c.top, d.plotTop + f[0]), d.plotHeight, d.plotTop));
                c = this.left = Math.round(B(u(c.left, d.plotLeft + f[3]), d.plotWidth, d.plotLeft));
                this.bottom = d.chartHeight - g - k;
                this.right = d.chartWidth - e - c;
                this.len = Math.max(a ? e : g, 0);
                this.pos = a ? c : k
            };
            f.prototype.getExtremes = function () {
                var d = this.logarithmic;
                return {
                    min: d ? A(d.lin2log(this.min)) : this.min,
                    max: d ? A(d.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            };
            f.prototype.getThreshold = function (d) {
                var c = this.logarithmic,
                    f = c ? c.lin2log(this.min) : this.min;
                c = c ? c.lin2log(this.max) : this.max;
                null === d || -Infinity === d ? d = f : Infinity === d ? d = c : f > d ? d = f : c < d && (d = c);
                return this.translate(d, 0, 1, 0, 1)
            };
            f.prototype.autoLabelAlign = function (d) {
                var c = (u(d, 0) - 90 * this.side + 720) % 360;
                d = {
                    align: "center"
                };
                v(this, "autoLabelAlign", d, function (d) {
                    15 < c && 165 > c ? d.align = "right" : 195 < c && 345 > c && (d.align = "left")
                });
                return d.align
            };
            f.prototype.tickSize = function (d) {
                var c =
                    this.options,
                    f = c["tick" === d ? "tickLength" : "minorTickLength"],
                    a = u(c["tick" === d ? "tickWidth" : "minorTickWidth"], "tick" === d && this.isXAxis && !this.categories ? 1 : 0);
                if (a && f) {
                    "inside" === c[d + "Position"] && (f = -f);
                    var e = [f, a]
                }
                d = {
                    tickSize: e
                };
                v(this, "afterTickSize", d);
                return d.tickSize
            };
            f.prototype.labelMetrics = function () {
                var d = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[d] && this.ticks[d].label)
            };
            f.prototype.unsquish =
                function () {
                    var d = this.options.labels,
                        c = this.horiz,
                        f = this.tickInterval,
                        a = f,
                        e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f),
                        g, k = d.rotation,
                        h = this.labelMetrics(),
                        m, x = Number.MAX_VALUE,
                        b, n = this.max - this.min,
                        r = function (c) {
                            var d = c / (e || 1);
                            d = 1 < d ? Math.ceil(d) : 1;
                            d * f > n && Infinity !== c && Infinity !== e && n && (d = Math.ceil(n / f));
                            return A(d * f)
                        };
                    c ? (b = !d.staggerLines && !d.step && (p(k) ? [k] : e < u(d.autoRotationLimit, 80) && d.autoRotation)) && b.forEach(function (c) {
                        if (c === k || c && -90 <= c && 90 >= c) {
                            m = r(Math.abs(h.h / Math.sin(J * c)));
                            var d = m + Math.abs(c / 360);
                            d < x && (x = d, g = c, a = m)
                        }
                    }) : d.step || (a = r(h.h));
                    this.autoRotation = b;
                    this.labelRotation = u(g, k);
                    return a
                };
            f.prototype.getSlotWidth = function (d) {
                var c, f = this.chart,
                    a = this.horiz,
                    e = this.options.labels,
                    g = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    k = f.margin[3];
                if (d && h(d.slotWidth)) return d.slotWidth;
                if (a && e && 2 > (e.step || 0)) return e.rotation ? 0 : (this.staggerLines || 1) * this.len / g;
                if (!a) {
                    d = null === (c = null === e || void 0 === e ? void 0 : e.style) || void 0 === c ? void 0 : c.width;
                    if (void 0 !== d) return parseInt(d,
                        10);
                    if (k) return k - f.spacing[3]
                }
                return .33 * f.chartWidth
            };
            f.prototype.renderUnsquish = function () {
                var d = this.chart,
                    c = d.renderer,
                    f = this.tickPositions,
                    a = this.ticks,
                    e = this.options.labels,
                    g = e && e.style || {},
                    h = this.horiz,
                    m = this.getSlotWidth(),
                    u = Math.max(1, Math.round(m - 2 * (e.padding || 5))),
                    x = {},
                    b = this.labelMetrics(),
                    n = e.style && e.style.textOverflow,
                    r = 0;
                k(e.rotation) || (x.rotation = e.rotation || 0);
                f.forEach(function (c) {
                    c = a[c];
                    c.movedLabel && c.replaceMovedLabel();
                    c && c.label && c.label.textPxLength > r && (r = c.label.textPxLength)
                });
                this.maxLabelLength = r;
                if (this.autoRotation) r > u && r > b.h ? x.rotation = this.labelRotation : this.labelRotation = 0;
                else if (m) {
                    var B = u;
                    if (!n) {
                        var p = "clip";
                        for (u = f.length; !h && u--;) {
                            var G = f[u];
                            if (G = a[G].label) G.styles && "ellipsis" === G.styles.textOverflow ? G.css({
                                textOverflow: "clip"
                            }) : G.textPxLength > m && G.css({
                                width: m + "px"
                            }), G.getBBox().height > this.len / f.length - (b.h - b.f) && (G.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                x.rotation && (B = r > .5 * d.chartHeight ? .33 * d.chartHeight : r, n || (p = "ellipsis"));
                if (this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation)) x.align =
                    this.labelAlign;
                f.forEach(function (c) {
                    var d = (c = a[c]) && c.label,
                        f = g.width,
                        e = {};
                    d && (d.attr(x), c.shortenLabel ? c.shortenLabel() : B && !f && "nowrap" !== g.whiteSpace && (B < d.textPxLength || "SPAN" === d.element.tagName) ? (e.width = B + "px", n || (e.textOverflow = d.specificTextOverflow || p), d.css(e)) : d.styles && d.styles.width && !e.width && !f && d.css({
                        width: null
                    }), delete d.specificTextOverflow, c.rotation = x.rotation)
                }, this);
                this.tickRotCorr = c.rotCorr(b.b, this.labelRotation || 0, 0 !== this.side)
            };
            f.prototype.hasData = function () {
                return this.series.some(function (d) {
                        return d.hasData()
                    }) ||
                    this.options.showEmpty && p(this.min) && p(this.max)
            };
            f.prototype.addTitle = function (d) {
                var c = this.chart.renderer,
                    f = this.horiz,
                    a = this.opposite,
                    e = this.options.title,
                    k, h = this.chart.styledMode;
                this.axisTitle || ((k = e.textAlign) || (k = (f ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: a ? "right" : "left",
                        middle: "center",
                        high: a ? "left" : "right"
                    })[e.align]), this.axisTitle = c.text(e.text, 0, 0, e.useHTML).attr({
                        zIndex: 7,
                        rotation: e.rotation || 0,
                        align: k
                    }).addClass("highcharts-axis-title"), h || this.axisTitle.css(g(e.style)), this.axisTitle.add(this.axisGroup),
                    this.axisTitle.isNew = !0);
                h || e.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len + "px"
                });
                this.axisTitle[d ? "show" : "hide"](d)
            };
            f.prototype.generateTick = function (d) {
                var c = this.ticks;
                c[d] ? c[d].addLabel() : c[d] = new q(this, d)
            };
            f.prototype.getOffset = function () {
                var d = this,
                    c = d.chart,
                    f = c.renderer,
                    a = d.options,
                    e = d.tickPositions,
                    g = d.ticks,
                    k = d.horiz,
                    h = d.side,
                    m = c.inverted && !d.isZAxis ? [1, 0, 3, 2][h] : h,
                    b, n = 0,
                    r = 0,
                    B = a.title,
                    G = a.labels,
                    K = 0,
                    t = c.axisOffset;
                c = c.clipOffset;
                var l = [-1, 1, 1, -1][h],
                    J = a.className,
                    O = d.axisParent;
                var D = d.hasData();
                d.showAxis = b = D || u(a.showEmpty, !0);
                d.staggerLines = d.horiz && G.staggerLines;
                d.axisGroup || (d.gridGroup = f.g("grid").attr({
                    zIndex: a.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (J || "")).add(O), d.axisGroup = f.g("axis").attr({
                    zIndex: a.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (J || "")).add(O), d.labelGroup = f.g("axis-labels").attr({
                    zIndex: G.zIndex || 7
                }).addClass("highcharts-" + d.coll.toLowerCase() + "-labels " + (J || "")).add(O));
                D || d.isLinked ? (e.forEach(function (c,
                    f) {
                    d.generateTick(c, f)
                }), d.renderUnsquish(), d.reserveSpaceDefault = 0 === h || 2 === h || {
                    1: "left",
                    3: "right"
                } [h] === d.labelAlign, u(G.reserveSpace, "center" === d.labelAlign ? !0 : null, d.reserveSpaceDefault) && e.forEach(function (c) {
                    K = Math.max(g[c].getLabelSize(), K)
                }), d.staggerLines && (K *= d.staggerLines), d.labelOffset = K * (d.opposite ? -1 : 1)) : x(g, function (c, d) {
                    c.destroy();
                    delete g[d]
                });
                if (B && B.text && !1 !== B.enabled && (d.addTitle(b), b && !1 !== B.reserveSpace)) {
                    d.titleOffset = n = d.axisTitle.getBBox()[k ? "height" : "width"];
                    var y = B.offset;
                    r = p(y) ? 0 : u(B.margin, k ? 5 : 10)
                }
                d.renderLine();
                d.offset = l * u(a.offset, t[h] ? t[h] + (a.margin || 0) : 0);
                d.tickRotCorr = d.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                f = 0 === h ? -d.labelMetrics().h : 2 === h ? d.tickRotCorr.y : 0;
                r = Math.abs(K) + r;
                K && (r = r - f + l * (k ? u(G.y, d.tickRotCorr.y + 8 * l) : G.x));
                d.axisTitleMargin = u(y, r);
                d.getMaxLabelDimensions && (d.maxLabelDimensions = d.getMaxLabelDimensions(g, e));
                k = this.tickSize("tick");
                t[h] = Math.max(t[h], d.axisTitleMargin + n + l * d.offset, r, e && e.length && k ? k[0] + l * d.offset : 0);
                a = a.offset ? 0 : 2 * Math.floor(d.axisLine.strokeWidth() /
                    2);
                c[m] = Math.max(c[m], a);
                v(this, "afterGetOffset")
            };
            f.prototype.getLinePath = function (d) {
                var c = this.chart,
                    f = this.opposite,
                    a = this.offset,
                    e = this.horiz,
                    g = this.left + (f ? this.width : 0) + a;
                a = c.chartHeight - this.bottom - (f ? this.height : 0) + a;
                f && (d *= -1);
                return c.renderer.crispLine([
                    ["M", e ? this.left : g, e ? a : this.top],
                    ["L", e ? c.chartWidth - this.right : g, e ? a : c.chartHeight - this.bottom]
                ], d)
            };
            f.prototype.renderLine = function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.chart.styledMode || this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
            };
            f.prototype.getTitlePosition = function () {
                var d = this.horiz,
                    c = this.left,
                    f = this.top,
                    a = this.len,
                    e = this.options.title,
                    g = d ? c : f,
                    k = this.opposite,
                    h = this.offset,
                    m = e.x || 0,
                    u = e.y || 0,
                    x = this.axisTitle,
                    b = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, x);
                x = Math.max(x.getBBox(null, 0).height - b.h - 1, 0);
                a = {
                    low: g + (d ? 0 : a),
                    middle: g + a / 2,
                    high: g + (d ? a : 0)
                } [e.align];
                c = (d ? f + this.height : c) + (d ? 1 : -1) *
                    (k ? -1 : 1) * this.axisTitleMargin + [-x, x, b.f, -x][this.side];
                d = {
                    x: d ? a + m : c + (k ? this.width : 0) + h + m,
                    y: d ? c + u - (k ? this.height : 0) + h : a + u
                };
                v(this, "afterGetTitlePosition", {
                    titlePosition: d
                });
                return d
            };
            f.prototype.renderMinorTick = function (d) {
                var c = this.chart.hasRendered && h(this.oldMin),
                    f = this.minorTicks;
                f[d] || (f[d] = new q(this, d, "minor"));
                c && f[d].isNew && f[d].render(null, !0);
                f[d].render(null, !1, 1)
            };
            f.prototype.renderTick = function (d, c) {
                var f = this.isLinked,
                    a = this.ticks,
                    e = this.chart.hasRendered && h(this.oldMin);
                if (!f || d >=
                    this.min && d <= this.max) a[d] || (a[d] = new q(this, d)), e && a[d].isNew && a[d].render(c, !0, -1), a[d].render(c)
            };
            f.prototype.render = function () {
                var d = this,
                    c = d.chart,
                    f = d.logarithmic,
                    a = d.options,
                    e = d.isLinked,
                    g = d.tickPositions,
                    k = d.axisTitle,
                    m = d.ticks,
                    u = d.minorTicks,
                    n = d.alternateBands,
                    r = a.stackLabels,
                    B = a.alternateGridColor,
                    G = d.tickmarkOffset,
                    p = d.axisLine,
                    t = d.showAxis,
                    l = F(c.renderer.globalAnimation),
                    J, O;
                d.labelEdge.length = 0;
                d.overlap = !1;
                [m, u, n].forEach(function (c) {
                    x(c, function (c) {
                        c.isActive = !1
                    })
                });
                if (d.hasData() ||
                    e) d.minorTickInterval && !d.categories && d.getMinorTickPositions().forEach(function (c) {
                    d.renderMinorTick(c)
                }), g.length && (g.forEach(function (c, f) {
                    d.renderTick(c, f)
                }), G && (0 === d.min || d.single) && (m[-1] || (m[-1] = new q(d, -1, null, !0)), m[-1].render(-1))), B && g.forEach(function (a, e) {
                    O = "undefined" !== typeof g[e + 1] ? g[e + 1] + G : d.max - G;
                    0 === e % 2 && a < d.max && O <= d.max + (c.polar ? -G : G) && (n[a] || (n[a] = new b.PlotLineOrBand(d)), J = a + G, n[a].options = {
                            from: f ? f.lin2log(J) : J,
                            to: f ? f.lin2log(O) : O,
                            color: B,
                            className: "highcharts-alternate-grid"
                        },
                        n[a].render(), n[a].isActive = !0)
                }), d._addedPlotLB || ((a.plotLines || []).concat(a.plotBands || []).forEach(function (c) {
                    d.addPlotBandOrLine(c)
                }), d._addedPlotLB = !0);
                [m, u, n].forEach(function (d) {
                    var f, a = [],
                        e = l.duration;
                    x(d, function (c, d) {
                        c.isActive || (c.render(d, !1, 0), c.isActive = !1, a.push(d))
                    });
                    K(function () {
                        for (f = a.length; f--;) d[a[f]] && !d[a[f]].isActive && (d[a[f]].destroy(), delete d[a[f]])
                    }, d !== n && c.hasRendered && e ? e : 0)
                });
                p && (p[p.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(p.strokeWidth())
                }), p.isPlaced = !0, p[t ?
                    "show" : "hide"](t));
                k && t && (a = d.getTitlePosition(), h(a.y) ? (k[k.isNew ? "attr" : "animate"](a), k.isNew = !1) : (k.attr("y", -9999), k.isNew = !0));
                r && r.enabled && d.stacking && d.stacking.renderStackTotals();
                d.isDirty = !1;
                v(this, "afterRender")
            };
            f.prototype.redraw = function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (d) {
                    d.render()
                }));
                this.series.forEach(function (d) {
                    d.isDirty = !0
                })
            };
            f.prototype.getKeepProps = function () {
                return this.keepProps || f.keepProps
            };
            f.prototype.destroy = function (d) {
                var c = this,
                    f = c.plotLinesAndBands,
                    a;
                v(this, "destroy", {
                    keepEvents: d
                });
                d || O(c);
                [c.ticks, c.minorTicks, c.alternateBands].forEach(function (c) {
                    E(c)
                });
                if (f)
                    for (d = f.length; d--;) f[d].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (d) {
                    c[d] && (c[d] = c[d].destroy())
                });
                for (a in c.plotLinesAndBandsGroups) c.plotLinesAndBandsGroups[a] = c.plotLinesAndBandsGroups[a].destroy();
                x(c, function (d, f) {
                    -1 === c.getKeepProps().indexOf(f) && delete c[f]
                })
            };
            f.prototype.drawCrosshair = function (d,
                c) {
                var f = this.crosshair,
                    a = u(f.snap, !0),
                    e, g = this.cross,
                    k = this.chart;
                v(this, "drawCrosshair", {
                    e: d,
                    point: c
                });
                d || (d = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (p(c) || !a)) {
                    a ? p(c) && (e = u("colorAxis" !== this.coll ? c.crosshairPos : null, this.isXAxis ? c.plotX : this.len - c.plotY)) : e = d && (this.horiz ? d.chartX - this.pos : this.len - d.chartY + this.pos);
                    if (p(e)) {
                        var h = {
                            value: c && (this.isXAxis ? c.x : u(c.stackY, c.y)),
                            translatedValue: e
                        };
                        k.polar && n(h, {
                            isCrosshair: !0,
                            chartX: d && d.chartX,
                            chartY: d && d.chartY,
                            point: c
                        });
                        h = this.getPlotLinePath(h) ||
                            null
                    }
                    if (!p(h)) {
                        this.hideCrosshair();
                        return
                    }
                    a = this.categories && !this.isRadial;
                    g || (this.cross = g = k.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (a ? "category " : "thin ") + f.className).attr({
                        zIndex: u(f.zIndex, 2)
                    }).add(), k.styledMode || (g.attr({
                        stroke: f.color || (a ? l.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": u(f.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), f.dashStyle && g.attr({
                        dashstyle: f.dashStyle
                    })));
                    g.show().attr({
                        d: h
                    });
                    a && !f.width && g.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = d
                } else this.hideCrosshair();
                v(this, "afterDrawCrosshair", {
                    e: d,
                    point: c
                })
            };
            f.prototype.hideCrosshair = function () {
                this.cross && this.cross.hide();
                v(this, "afterHideCrosshair")
            };
            f.prototype.hasVerticalPanning = function () {
                var d, c;
                return /y/.test((null === (c = null === (d = this.chart.options.chart) || void 0 === d ? void 0 : d.panning) || void 0 === c ? void 0 : c.type) || "")
            };
            f.prototype.validatePositiveValue = function (d) {
                return h(d) && 0 < d
            };
            f.defaultOptions = {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            };
            f.defaultYAxisOptions = {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var d = this.axis.chart.numberFormatter;
                        return d(this.total,
                            -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            };
            f.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            };
            f.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            };
            f.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            f.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            f.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return f
        }();
        b.Axis = z;
        return b.Axis
    });
    M(q, "Core/Axis/DateTimeAxis.js", [q["Core/Axis/Axis.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.addEvent,
            z = b.getMagnitude,
            w = b.normalizeTickInterval,
            C = b.timeUnits,
            F = function () {
                function b(b) {
                    this.axis = b
                }
                b.prototype.normalizeTimeTickInterval = function (b, l) {
                    var y = l || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null]
                    ];
                    l = y[y.length -
                        1];
                    var p = C[l[0]],
                        E = l[1],
                        t;
                    for (t = 0; t < y.length && !(l = y[t], p = C[l[0]], E = l[1], y[t + 1] && b <= (p * E[E.length - 1] + C[y[t + 1][0]]) / 2); t++);
                    p === C.year && b < 5 * p && (E = [1, 2, 5]);
                    b = w(b / p, E, "year" === l[0] ? Math.max(z(b / p), 1) : 1);
                    return {
                        unitRange: p,
                        count: b,
                        unitName: l[0]
                    }
                };
                return b
            }();
        b = function () {
            function b() {}
            b.compose = function (b) {
                b.keepProps.push("dateTime");
                b.prototype.getTimeTicks = function () {
                    return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
                };
                q(b, "init", function (b) {
                    "datetime" !== b.userOptions.type ? this.dateTime =
                        void 0 : this.dateTime || (this.dateTime = new F(this))
                })
            };
            b.AdditionsClass = F;
            return b
        }();
        b.compose(l);
        return b
    });
    M(q, "Core/Axis/LogarithmicAxis.js", [q["Core/Axis/Axis.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.addEvent,
            z = b.getMagnitude,
            w = b.normalizeTickInterval,
            C = b.pick,
            F = function () {
                function b(b) {
                    this.axis = b
                }
                b.prototype.getLogTickPositions = function (b, l, A, p) {
                    var y = this.axis,
                        t = y.len,
                        n = y.options,
                        v = [];
                    p || (this.minorAutoInterval = void 0);
                    if (.5 <= b) b = Math.round(b), v = y.getLinearTickPositions(b, l, A);
                    else if (.08 <=
                        b) {
                        n = Math.floor(l);
                        var D, r;
                        for (t = .3 < b ? [1, 2, 4] : .15 < b ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; n < A + 1 && !r; n++) {
                            var m = t.length;
                            for (D = 0; D < m && !r; D++) {
                                var a = this.log2lin(this.lin2log(n) * t[D]);
                                a > l && (!p || h <= A) && "undefined" !== typeof h && v.push(h);
                                h > A && (r = !0);
                                var h = a
                            }
                        }
                    } else l = this.lin2log(l), A = this.lin2log(A), b = p ? y.getMinorTickInterval() : n.tickInterval, b = C("auto" === b ? null : b, this.minorAutoInterval, n.tickPixelInterval / (p ? 5 : 1) * (A - l) / ((p ? t / y.tickPositions.length : t) || 1)), b = w(b, void 0, z(b)), v = y.getLinearTickPositions(b, l, A).map(this.log2lin),
                        p || (this.minorAutoInterval = b / 5);
                    p || (y.tickInterval = b);
                    return v
                };
                b.prototype.lin2log = function (b) {
                    return Math.pow(10, b)
                };
                b.prototype.log2lin = function (b) {
                    return Math.log(b) / Math.LN10
                };
                return b
            }();
        b = function () {
            function b() {}
            b.compose = function (b) {
                b.keepProps.push("logarithmic");
                var l = b.prototype,
                    A = F.prototype;
                l.log2lin = A.log2lin;
                l.lin2log = A.lin2log;
                q(b, "init", function (b) {
                    var p = this.logarithmic;
                    "logarithmic" !== b.userOptions.type ? this.logarithmic = void 0 : (p || (p = this.logarithmic = new F(this)), this.log2lin !==
                        p.log2lin && (p.log2lin = this.log2lin.bind(this)), this.lin2log !== p.lin2log && (p.lin2log = this.lin2log.bind(this)))
                });
                q(b, "afterInit", function () {
                    var b = this.logarithmic;
                    b && (this.lin2val = function (p) {
                        return b.lin2log(p)
                    }, this.val2lin = function (p) {
                        return b.log2lin(p)
                    })
                })
            };
            return b
        }();
        b.compose(l);
        return b
    });
    M(q, "Core/Axis/PlotLineOrBand.js", [q["Core/Axis/Axis.js"], q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b, q) {
        var z = q.arrayMax,
            w = q.arrayMin,
            C = q.defined,
            F = q.destroyObjectProperties,
            H = q.erase,
            I = q.extend,
            y = q.merge,
            A = q.objectEach,
            p = q.pick,
            E = function () {
                function t(b, p) {
                    this.axis = b;
                    p && (this.options = p, this.id = p.id)
                }
                t.prototype.render = function () {
                    b.fireEvent(this, "render");
                    var n = this,
                        v = n.axis,
                        t = v.horiz,
                        r = v.logarithmic,
                        m = n.options,
                        a = m.label,
                        h = n.label,
                        k = m.to,
                        g = m.from,
                        e = m.value,
                        x = C(g) && C(k),
                        u = C(e),
                        B = n.svgElem,
                        l = !B,
                        G = [],
                        K = m.color,
                        P = p(m.zIndex, 0),
                        J = m.events;
                    G = {
                        "class": "highcharts-plot-" + (x ? "band " : "line ") + (m.className || "")
                    };
                    var f = {},
                        d = v.chart.renderer,
                        c = x ? "bands" : "lines";
                    r && (g = r.log2lin(g), k = r.log2lin(k), e =
                        r.log2lin(e));
                    v.chart.styledMode || (u ? (G.stroke = K || "#999999", G["stroke-width"] = p(m.width, 1), m.dashStyle && (G.dashstyle = m.dashStyle)) : x && (G.fill = K || "#e6ebf5", m.borderWidth && (G.stroke = m.borderColor, G["stroke-width"] = m.borderWidth)));
                    f.zIndex = P;
                    c += "-" + P;
                    (r = v.plotLinesAndBandsGroups[c]) || (v.plotLinesAndBandsGroups[c] = r = d.g("plot-" + c).attr(f).add());
                    l && (n.svgElem = B = d.path().attr(G).add(r));
                    if (u) G = v.getPlotLinePath({
                        value: e,
                        lineWidth: B.strokeWidth(),
                        acrossPanes: m.acrossPanes
                    });
                    else if (x) G = v.getPlotBandPath(g,
                        k, m);
                    else return;
                    !n.eventsAdded && J && (A(J, function (c, d) {
                        B.on(d, function (c) {
                            J[d].apply(n, [c])
                        })
                    }), n.eventsAdded = !0);
                    (l || !B.d) && G && G.length ? B.attr({
                        d: G
                    }) : B && (G ? (B.show(!0), B.animate({
                        d: G
                    })) : B.d && (B.hide(), h && (n.label = h = h.destroy())));
                    a && (C(a.text) || C(a.formatter)) && G && G.length && 0 < v.width && 0 < v.height && !G.isFlat ? (a = y({
                        align: t && x && "center",
                        x: t ? !x && 4 : 10,
                        verticalAlign: !t && x && "middle",
                        y: t ? x ? 16 : 10 : x ? 6 : -4,
                        rotation: t && !x && 90
                    }, a), this.renderLabel(a, G, x, P)) : h && h.hide();
                    return n
                };
                t.prototype.renderLabel = function (b,
                    p, t, r) {
                    var m = this.label,
                        a = this.axis.chart.renderer;
                    m || (m = {
                        align: b.textAlign || b.align,
                        rotation: b.rotation,
                        "class": "highcharts-plot-" + (t ? "band" : "line") + "-label " + (b.className || "")
                    }, m.zIndex = r, r = this.getLabelText(b), this.label = m = a.text(r, 0, 0, b.useHTML).attr(m).add(), this.axis.chart.styledMode || m.css(b.style));
                    a = p.xBounds || [p[0][1], p[1][1], t ? p[2][1] : p[0][1]];
                    p = p.yBounds || [p[0][2], p[1][2], t ? p[2][2] : p[0][2]];
                    t = w(a);
                    r = w(p);
                    m.align(b, !1, {
                        x: t,
                        y: r,
                        width: z(a) - t,
                        height: z(p) - r
                    });
                    m.show(!0)
                };
                t.prototype.getLabelText =
                    function (b) {
                        return C(b.formatter) ? b.formatter.call(this) : b.text
                    };
                t.prototype.destroy = function () {
                    H(this.axis.plotLinesAndBands, this);
                    delete this.axis;
                    F(this)
                };
                return t
            }();
        I(l.prototype, {
            getPlotBandPath: function (b, n) {
                var p = this.getPlotLinePath({
                        value: n,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    t = this.getPlotLinePath({
                        value: b,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    r = [],
                    m = this.horiz,
                    a = 1;
                b = b < this.min && n < this.min || b > this.max && n > this.max;
                if (t && p) {
                    if (b) {
                        var h = t.toString() === p.toString();
                        a =
                            0
                    }
                    for (b = 0; b < t.length; b += 2) {
                        n = t[b];
                        var k = t[b + 1],
                            g = p[b],
                            e = p[b + 1];
                        "M" !== n[0] && "L" !== n[0] || "M" !== k[0] && "L" !== k[0] || "M" !== g[0] && "L" !== g[0] || "M" !== e[0] && "L" !== e[0] || (m && g[1] === n[1] ? (g[1] += a, e[1] += a) : m || g[2] !== n[2] || (g[2] += a, e[2] += a), r.push(["M", n[1], n[2]], ["L", k[1], k[2]], ["L", e[1], e[2]], ["L", g[1], g[2]], ["Z"]));
                        r.isFlat = h
                    }
                }
                return r
            },
            addPlotBand: function (b) {
                return this.addPlotBandOrLine(b, "plotBands")
            },
            addPlotLine: function (b) {
                return this.addPlotBandOrLine(b, "plotLines")
            },
            addPlotBandOrLine: function (b, n) {
                var p =
                    (new E(this, b)).render(),
                    t = this.userOptions;
                if (p) {
                    if (n) {
                        var r = t[n] || [];
                        r.push(b);
                        t[n] = r
                    }
                    this.plotLinesAndBands.push(p);
                    this._addedPlotLB = !0
                }
                return p
            },
            removePlotBandOrLine: function (b) {
                for (var n = this.plotLinesAndBands, p = this.options, t = this.userOptions, r = n.length; r--;) n[r].id === b && n[r].destroy();
                [p.plotLines || [], t.plotLines || [], p.plotBands || [], t.plotBands || []].forEach(function (m) {
                    for (r = m.length; r--;)(m[r] || {}).id === b && H(m, m[r])
                })
            },
            removePlotBand: function (b) {
                this.removePlotBandOrLine(b)
            },
            removePlotLine: function (b) {
                this.removePlotBandOrLine(b)
            }
        });
        b.PlotLineOrBand = E;
        return b.PlotLineOrBand
    });
    M(q, "Core/Tooltip.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = l.doc,
            z = b.clamp,
            w = b.css,
            C = b.defined,
            F = b.discardElement,
            H = b.extend,
            I = b.fireEvent,
            y = b.format,
            A = b.isNumber,
            p = b.isString,
            E = b.merge,
            t = b.pick,
            n = b.splat,
            v = b.syncTimeout,
            D = b.timeUnits;
        "";
        var r = function () {
            function m(a, h) {
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = a;
                this.init(a,
                    h)
            }
            m.prototype.applyFilter = function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        "in": "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            "in": "SourceGraphic"
                        }]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index +
                        "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            };
            m.prototype.bodyFormatter = function (a) {
                return a.map(function (a) {
                    var k = a.series.tooltipOptions;
                    return (k[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, k[(a.point.formatPrefix || "point") + "Format"] || "")
                })
            };
            m.prototype.cleanSplit = function (a) {
                this.chart.series.forEach(function (h) {
                    var k = h && h.tt;
                    k && (!k.isActive || a ? h.tt = k.destroy() : k.isActive = !1)
                })
            };
            m.prototype.defaultFormatter = function (a) {
                var h = this.points || n(this);
                var k = [a.tooltipFooterHeaderFormatter(h[0])];
                k = k.concat(a.bodyFormatter(h));
                k.push(a.tooltipFooterHeaderFormatter(h[0], !0));
                return k
            };
            m.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), F(this.container));
                b.clearTimeout(this.hideTimer);
                b.clearTimeout(this.tooltipTimeout)
            };
            m.prototype.getAnchor = function (a, h) {
                var k = this.chart,
                    g = k.pointer,
                    e = k.inverted,
                    m = k.plotTop,
                    b = k.plotLeft,
                    r = 0,
                    p = 0,
                    G, K;
                a = n(a);
                this.followPointer && h ? ("undefined" === typeof h.chartX && (h = g.normalize(h)), a = [h.chartX - b, h.chartY - m]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function (a) {
                    G = a.series.yAxis;
                    K = a.series.xAxis;
                    r += a.plotX + (!e && K ? K.left - b : 0);
                    p += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && G ? G.top - m : 0)
                }), r /= a.length, p /= a.length, a = [e ? k.plotWidth - p : r, this.shared && !e && 1 < a.length && h ? h.chartY - m : e ? k.plotHeight - r : p]);
                return a.map(Math.round)
            };
            m.prototype.getDateFormat = function (a, h, k, g) {
                var e = this.chart.time,
                    m = e.dateFormat("%m-%d %H:%M:%S.%L",
                        h),
                    b = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    n = "millisecond";
                for (r in D) {
                    if (a === D.week && +e.dateFormat("%w", h) === k && "00:00:00.000" === m.substr(6)) {
                        var r = "week";
                        break
                    }
                    if (D[r] > a) {
                        r = n;
                        break
                    }
                    if (b[r] && m.substr(b[r]) !== "01-01 00:00:00.000".substr(b[r])) break;
                    "week" !== r && (n = r)
                }
                if (r) var p = e.resolveDTLFormat(g[r]).main;
                return p
            };
            m.prototype.getLabel = function () {
                var a, h, k = this,
                    g = this.chart.renderer,
                    e = this.chart.styledMode,
                    m = this.options,
                    b = "tooltip" + (C(m.className) ? " " + m.className : ""),
                    n = (null === (a = m.style) ||
                        void 0 === a ? void 0 : a.pointerEvents) || (!this.followPointer && m.stickOnContact ? "auto" : "none"),
                    r;
                a = function () {
                    k.inContact = !0
                };
                var p = function () {
                    var f = k.chart.hoverSeries;
                    k.inContact = !1;
                    if (f && f.onMouseOut) f.onMouseOut()
                };
                if (!this.label) {
                    this.outside && (this.container = r = l.doc.createElement("div"), r.className = "highcharts-tooltip-container", w(r, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: n,
                        zIndex: 3
                    }), l.doc.body.appendChild(r), this.renderer = g = new l.Renderer(r, 0, 0, null === (h = this.chart.options.chart) || void 0 ===
                        h ? void 0 : h.style, void 0, void 0, g.styledMode));
                    this.split ? this.label = g.g(b) : (this.label = g.label("", 0, 0, m.shape || "callout", null, null, m.useHTML, null, b).attr({
                        padding: m.padding,
                        r: m.borderRadius
                    }), e || this.label.attr({
                        fill: m.backgroundColor,
                        "stroke-width": m.borderWidth
                    }).css(m.style).css({
                        pointerEvents: n
                    }).shadow(m.shadow));
                    e && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index));
                    if (k.outside && !k.split) {
                        var K = this.label,
                            v = K.xSetter,
                            t = K.ySetter;
                        K.xSetter = function (f) {
                            v.call(K, k.distance);
                            r.style.left = f + "px"
                        };
                        K.ySetter = function (f) {
                            t.call(K, k.distance);
                            r.style.top = f + "px"
                        }
                    }
                    this.label.on("mouseenter", a).on("mouseleave", p).attr({
                        zIndex: 8
                    }).add()
                }
                return this.label
            };
            m.prototype.getPosition = function (a, h, k) {
                var g = this.chart,
                    e = this.distance,
                    m = {},
                    b = g.inverted && k.h || 0,
                    n, r = this.outside,
                    p = r ? q.documentElement.clientWidth - 2 * e : g.chartWidth,
                    K = r ? Math.max(q.body.scrollHeight, q.documentElement.scrollHeight, q.body.offsetHeight, q.documentElement.offsetHeight, q.documentElement.clientHeight) : g.chartHeight,
                    v = g.pointer.getChartPosition(),
                    l = g.containerScaling,
                    f = function (c) {
                        return l ? c * l.scaleX : c
                    },
                    d = function (c) {
                        return l ? c * l.scaleY : c
                    },
                    c = function (c) {
                        var m = "x" === c;
                        return [c, m ? p : K, m ? a : h].concat(r ? [m ? f(a) : d(h), m ? v.left - e + f(k.plotX + g.plotLeft) : v.top - e + d(k.plotY + g.plotTop), 0, m ? p : K] : [m ? a : h, m ? k.plotX + g.plotLeft : k.plotY + g.plotTop, m ? g.plotLeft : g.plotTop, m ? g.plotLeft + g.plotWidth : g.plotTop + g.plotHeight])
                    },
                    L = c("y"),
                    N = c("x"),
                    y = !this.followPointer && t(k.ttBelow, !g.inverted === !!k.negative),
                    D = function (c, a, g, k, h, u, x) {
                        var n =
                            "y" === c ? d(e) : f(e),
                            r = (g - k) / 2,
                            p = k < h - e,
                            B = h + e + k < a,
                            G = h - n - g + r;
                        h = h + n - r;
                        if (y && B) m[c] = h;
                        else if (!y && p) m[c] = G;
                        else if (p) m[c] = Math.min(x - k, 0 > G - b ? G : G - b);
                        else if (B) m[c] = Math.max(u, h + b + g > a ? h : h + b);
                        else return !1
                    },
                    A = function (c, d, f, a, g) {
                        var k;
                        g < e || g > d - e ? k = !1 : m[c] = g < f / 2 ? 1 : g > d - a / 2 ? d - a - 2 : g - f / 2;
                        return k
                    },
                    E = function (c) {
                        var d = L;
                        L = N;
                        N = d;
                        n = c
                    },
                    w = function () {
                        !1 !== D.apply(0, L) ? !1 !== A.apply(0, N) || n || (E(!0), w()) : n ? m.x = m.y = 0 : (E(!0), w())
                    };
                (g.inverted || 1 < this.len) && E();
                w();
                return m
            };
            m.prototype.getXDateFormat = function (a, h, k) {
                h = h.dateTimeLabelFormats;
                var g = k && k.closestPointRange;
                return (g ? this.getDateFormat(g, a.x, k.options.startOfWeek, h) : h.day) || h.year
            };
            m.prototype.hide = function (a) {
                var h = this;
                b.clearTimeout(this.hideTimer);
                a = t(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = v(function () {
                    h.getLabel().fadeOut(a ? void 0 : a);
                    h.isHidden = !0
                }, a))
            };
            m.prototype.init = function (a, h) {
                this.chart = a;
                this.options = h;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = h.split && !a.inverted && !a.polar;
                this.shared = h.shared || this.split;
                this.outside =
                    t(h.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY))
            };
            m.prototype.isStickyOnContact = function () {
                return !(this.followPointer || !this.options.stickOnContact || !this.inContact)
            };
            m.prototype.move = function (a, h, k, g) {
                var e = this,
                    m = e.now,
                    u = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - m.x) || 1 < Math.abs(h - m.y)),
                    n = e.followPointer || 1 < e.len;
                H(m, {
                    x: u ? (2 * m.x + a) / 3 : a,
                    y: u ? (m.y + h) / 2 : h,
                    anchorX: n ? void 0 : u ? (2 * m.anchorX + k) / 3 : k,
                    anchorY: n ? void 0 : u ? (m.anchorY + g) / 2 : g
                });
                e.getLabel().attr(m);
                e.drawTracker();
                u && (b.clearTimeout(this.tooltipTimeout),
                    this.tooltipTimeout = setTimeout(function () {
                        e && e.move(a, h, k, g)
                    }, 32))
            };
            m.prototype.refresh = function (a, h) {
                var k = this.chart,
                    g = this.options,
                    e = a,
                    m = {},
                    u = [],
                    r = g.formatter || this.defaultFormatter;
                m = this.shared;
                var p = k.styledMode;
                if (g.enabled) {
                    b.clearTimeout(this.hideTimer);
                    this.followPointer = n(e)[0].series.tooltipOptions.followPointer;
                    var G = this.getAnchor(e, h);
                    h = G[0];
                    var K = G[1];
                    !m || e.series && e.series.noSharedTooltip ? m = e.getLabelConfig() : (k.pointer.applyInactiveState(e), e.forEach(function (a) {
                        a.setState("hover");
                        u.push(a.getLabelConfig())
                    }), m = {
                        x: e[0].category,
                        y: e[0].y
                    }, m.points = u, e = e[0]);
                    this.len = u.length;
                    k = r.call(m, this);
                    r = e.series;
                    this.distance = t(r.tooltipOptions.distance, 16);
                    !1 === k ? this.hide() : (this.split ? this.renderSplit(k, n(a)) : (a = this.getLabel(), g.style.width && !p || a.css({
                            width: this.chart.spacingBox.width + "px"
                        }), a.attr({
                            text: k && k.join ? k.join("") : k
                        }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(e.colorIndex, r.colorIndex)), p || a.attr({
                            stroke: g.borderColor || e.color || r.color || "#666666"
                        }),
                        this.updatePosition({
                            plotX: h,
                            plotY: K,
                            negative: e.negative,
                            ttBelow: e.ttBelow,
                            h: G[2] || 0
                        })), this.isHidden && this.label && this.label.attr({
                        opacity: 1
                    }).show(), this.isHidden = !1);
                    I(this, "refresh")
                }
            };
            m.prototype.renderSplit = function (a, h) {
                function k(c, d, f, a, e) {
                    void 0 === e && (e = !0);
                    f ? (d = A ? 0 : I, c = z(c - a / 2, D.left, D.right - a)) : (d -= E, c = e ? c - a - L : c + L, c = z(c, e ? c : D.left, D.right));
                    return {
                        x: c,
                        y: d
                    }
                }
                var g = this,
                    e = g.chart,
                    m = g.chart,
                    b = m.plotHeight,
                    n = m.plotLeft,
                    r = m.plotTop,
                    G = m.pointer,
                    K = m.renderer,
                    v = m.scrollablePixelsY,
                    J = void 0 === v ?
                    0 : v;
                v = m.scrollingContainer;
                v = void 0 === v ? {
                    scrollLeft: 0,
                    scrollTop: 0
                } : v;
                var f = v.scrollLeft,
                    d = v.scrollTop,
                    c = m.styledMode,
                    L = g.distance,
                    N = g.options,
                    y = g.options.positioner,
                    D = {
                        left: f,
                        right: f + m.chartWidth,
                        top: d,
                        bottom: d + m.chartHeight
                    },
                    q = g.getLabel(),
                    A = !(!e.xAxis[0] || !e.xAxis[0].opposite),
                    E = r + d,
                    w = 0,
                    I = b - J;
                p(a) && (a = [!1, a]);
                a = a.slice(0, h.length + 1).reduce(function (f, a, e) {
                    if (!1 !== a && "" !== a) {
                        e = h[e - 1] || {
                            isHeader: !0,
                            plotX: h[0].plotX,
                            plotY: b,
                            series: {}
                        };
                        var m = e.isHeader,
                            u = m ? g : e.series,
                            x = u.tt,
                            p = e.isHeader;
                        var G = e.series;
                        var B = "highcharts-color-" + t(e.colorIndex, G.colorIndex, "none");
                        x || (x = {
                            padding: N.padding,
                            r: N.borderRadius
                        }, c || (x.fill = N.backgroundColor, x["stroke-width"] = N.borderWidth), x = K.label("", 0, 0, N[p ? "headerShape" : "shape"] || "callout", void 0, void 0, N.useHTML).addClass((p ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + B).attr(x).add(q));
                        x.isActive = !0;
                        x.attr({
                            text: a
                        });
                        c || x.css(N.style).shadow(N.shadow).attr({
                            stroke: N.borderColor || e.color || G.color || "#333333"
                        });
                        a = u.tt = x;
                        p = a.getBBox();
                        u = p.width + a.strokeWidth();
                        m && (w = p.height, I += w, A && (E -= w));
                        G = e.plotX;
                        G = void 0 === G ? 0 : G;
                        B = e.plotY;
                        B = void 0 === B ? 0 : B;
                        var v = e.series;
                        if (e.isHeader) {
                            G = n + G;
                            var l = r + b / 2
                        } else x = v.xAxis, v = v.yAxis, G = x.pos + z(G, -L, x.len + L), v.pos + B >= d + r && v.pos + B <= d + r + b - J && (l = v.pos + B);
                        G = z(G, D.left - L, D.right + L);
                        "number" === typeof l ? (p = p.height + 1, B = y ? y.call(g, u, p, e) : k(G, l, m, u), f.push({
                            align: y ? 0 : void 0,
                            anchorX: G,
                            anchorY: l,
                            boxWidth: u,
                            point: e,
                            rank: t(B.rank, m ? 1 : 0),
                            size: p,
                            target: B.y,
                            tt: a,
                            x: B.x
                        })) : a.isActive = !1
                    }
                    return f
                }, []);
                !y && a.some(function (c) {
                        return c.x < D.left
                    }) &&
                    (a = a.map(function (c) {
                        var d = k(c.anchorX, c.anchorY, c.point.isHeader, c.boxWidth, !1);
                        return H(c, {
                            target: d.y,
                            x: d.x
                        })
                    }));
                g.cleanSplit();
                l.distribute(a, I);
                a.forEach(function (c) {
                    var d = c.pos;
                    c.tt.attr({
                        visibility: "undefined" === typeof d ? "hidden" : "inherit",
                        x: c.x,
                        y: d + E,
                        anchorX: c.anchorX,
                        anchorY: c.anchorY
                    })
                });
                a = g.container;
                e = g.renderer;
                g.outside && a && e && (m = q.getBBox(), e.setSize(m.width + m.x, m.height + m.y, !1), G = G.getChartPosition(), a.style.left = G.left + "px", a.style.top = G.top + "px")
            };
            m.prototype.drawTracker = function () {
                if (this.followPointer ||
                    !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                else {
                    var a = this.chart,
                        h = this.label,
                        k = a.hoverPoint;
                    if (h && k) {
                        var g = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        };
                        k = this.getAnchor(k);
                        var e = h.getBBox();
                        k[0] += a.plotLeft - h.translateX;
                        k[1] += a.plotTop - h.translateY;
                        g.x = Math.min(0, k[0]);
                        g.y = Math.min(0, k[1]);
                        g.width = 0 > k[0] ? Math.max(Math.abs(k[0]), e.width - k[0]) : Math.max(Math.abs(k[0]), e.width);
                        g.height = 0 > k[1] ? Math.max(Math.abs(k[1]), e.height - Math.abs(k[1])) : Math.max(Math.abs(k[1]), e.height);
                        this.tracker ? this.tracker.attr(g) :
                            (this.tracker = h.renderer.rect(g).addClass("highcharts-tracker").add(h), a.styledMode || this.tracker.attr({
                                fill: "rgba(0,0,0,0)"
                            }))
                    }
                }
            };
            m.prototype.styledModeFormat = function (a) {
                return a.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
            };
            m.prototype.tooltipFooterHeaderFormatter = function (a, h) {
                var k = h ? "footer" : "header",
                    g = a.series,
                    e = g.tooltipOptions,
                    m = e.xDateFormat,
                    b = g.xAxis,
                    n = b && "datetime" === b.options.type &&
                    A(a.key),
                    r = e[k + "Format"];
                h = {
                    isFooter: h,
                    labelConfig: a
                };
                I(this, "headerFormatter", h, function (k) {
                    n && !m && (m = this.getXDateFormat(a, e, b));
                    n && m && (a.point && a.point.tooltipDateKeys || ["key"]).forEach(function (a) {
                        r = r.replace("{point." + a + "}", "{point." + a + ":" + m + "}")
                    });
                    g.chart.styledMode && (r = this.styledModeFormat(r));
                    k.text = y(r, {
                        point: a,
                        series: g
                    }, this.chart)
                });
                return h.text
            };
            m.prototype.update = function (a) {
                this.destroy();
                E(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, E(!0, this.options, a))
            };
            m.prototype.updatePosition =
                function (a) {
                    var h = this.chart,
                        k = h.pointer,
                        g = this.getLabel(),
                        e = a.plotX + h.plotLeft,
                        m = a.plotY + h.plotTop;
                    k = k.getChartPosition();
                    a = (this.options.positioner || this.getPosition).call(this, g.width, g.height, a);
                    if (this.outside) {
                        var b = (this.options.borderWidth || 0) + 2 * this.distance;
                        this.renderer.setSize(g.width + b, g.height + b, !1);
                        if (h = h.containerScaling) w(this.container, {
                            transform: "scale(" + h.scaleX + ", " + h.scaleY + ")"
                        }), e *= h.scaleX, m *= h.scaleY;
                        e += k.left - a.x;
                        m += k.top - a.y
                    }
                    this.move(Math.round(a.x), Math.round(a.y || 0),
                        e, m)
                };
            return m
        }();
        l.Tooltip = r;
        return l.Tooltip
    });
    M(q, "Core/Pointer.js", [q["Core/Color.js"], q["Core/Globals.js"], q["Core/Tooltip.js"], q["Core/Utilities.js"]], function (l, b, q, z) {
        var w = l.parse,
            C = b.charts,
            F = b.noop,
            H = z.addEvent,
            I = z.attr,
            y = z.css,
            A = z.defined,
            p = z.extend,
            E = z.find,
            t = z.fireEvent,
            n = z.isNumber,
            v = z.isObject,
            D = z.objectEach,
            r = z.offset,
            m = z.pick,
            a = z.splat;
        "";
        l = function () {
            function h(a, g) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.chart = a;
                this.hasDragged = !1;
                this.options = g;
                this.unbindContainerMouseLeave =
                    function () {};
                this.unbindContainerMouseEnter = function () {};
                this.init(a, g)
            }
            h.prototype.applyInactiveState = function (a) {
                var g = [],
                    e;
                (a || []).forEach(function (a) {
                    e = a.series;
                    g.push(e);
                    e.linkedParent && g.push(e.linkedParent);
                    e.linkedSeries && (g = g.concat(e.linkedSeries));
                    e.navigatorSeries && g.push(e.navigatorSeries)
                });
                this.chart.series.forEach(function (a) {
                    -1 === g.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
                })
            };
            h.prototype.destroy = function () {
                var a = this;
                "undefined" !==
                typeof a.unDocMouseMove && a.unDocMouseMove();
                this.unbindContainerMouseLeave();
                b.chartCount || (b.unbindDocumentMouseUp && (b.unbindDocumentMouseUp = b.unbindDocumentMouseUp()), b.unbindDocumentTouchEnd && (b.unbindDocumentTouchEnd = b.unbindDocumentTouchEnd()));
                clearInterval(a.tooltipTimeout);
                D(a, function (g, e) {
                    a[e] = void 0
                })
            };
            h.prototype.drag = function (a) {
                var g = this.chart,
                    e = g.options.chart,
                    k = a.chartX,
                    h = a.chartY,
                    m = this.zoomHor,
                    b = this.zoomVert,
                    n = g.plotLeft,
                    r = g.plotTop,
                    p = g.plotWidth,
                    l = g.plotHeight,
                    f = this.selectionMarker,
                    d = this.mouseDownX || 0,
                    c = this.mouseDownY || 0,
                    t = v(e.panning) ? e.panning && e.panning.enabled : e.panning,
                    N = e.panKey && a[e.panKey + "Key"];
                if (!f || !f.touch)
                    if (k < n ? k = n : k > n + p && (k = n + p), h < r ? h = r : h > r + l && (h = r + l), this.hasDragged = Math.sqrt(Math.pow(d - k, 2) + Math.pow(c - h, 2)), 10 < this.hasDragged) {
                        var y = g.isInsidePlot(d - n, c - r);
                        g.hasCartesianSeries && (this.zoomX || this.zoomY) && y && !N && !f && (this.selectionMarker = f = g.renderer.rect(n, r, m ? 1 : p, b ? 1 : l, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), g.styledMode || f.attr({
                            fill: e.selectionMarkerFill ||
                                w("#335cad").setOpacity(.25).get()
                        }));
                        f && m && (k -= d, f.attr({
                            width: Math.abs(k),
                            x: (0 < k ? 0 : k) + d
                        }));
                        f && b && (k = h - c, f.attr({
                            height: Math.abs(k),
                            y: (0 < k ? 0 : k) + c
                        }));
                        y && !f && t && g.pan(a, e.panning)
                    }
            };
            h.prototype.dragStart = function (a) {
                var g = this.chart;
                g.mouseIsDown = a.type;
                g.cancelClick = !1;
                g.mouseDownX = this.mouseDownX = a.chartX;
                g.mouseDownY = this.mouseDownY = a.chartY
            };
            h.prototype.drop = function (a) {
                var g = this,
                    e = this.chart,
                    k = this.hasPinched;
                if (this.selectionMarker) {
                    var h = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        m = this.selectionMarker,
                        b = m.attr ? m.attr("x") : m.x,
                        r = m.attr ? m.attr("y") : m.y,
                        v = m.attr ? m.attr("width") : m.width,
                        l = m.attr ? m.attr("height") : m.height,
                        J;
                    if (this.hasDragged || k) e.axes.forEach(function (f) {
                        if (f.zoomEnabled && A(f.min) && (k || g[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [f.coll]]) && n(b) && n(r)) {
                            var d = f.horiz,
                                c = "touchend" === a.type ? f.minPixelPadding : 0,
                                e = f.toValue((d ? b : r) + c);
                            d = f.toValue((d ? b + v : r + l) - c);
                            h[f.coll].push({
                                axis: f,
                                min: Math.min(e, d),
                                max: Math.max(e, d)
                            });
                            J = !0
                        }
                    }), J && t(e, "selection", h, function (f) {
                        e.zoom(p(f, k ? {
                            animation: !1
                        } : null))
                    });
                    n(e.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    k && this.scaleGroups()
                }
                e && n(e.index) && (y(e.container, {
                    cursor: e._cursor
                }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            h.prototype.findNearestKDPoint = function (a, g, e) {
                var k = this.chart,
                    h = k.hoverPoint;
                k = k.tooltip;
                if (h && k && k.isStickyOnContact()) return h;
                var m;
                a.forEach(function (a) {
                    var k = !(a.noSharedTooltip && g) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(e, k);
                    if ((k =
                            v(a, !0)) && !(k = !v(m, !0))) {
                        k = m.distX - a.distX;
                        var h = m.dist - a.dist,
                            b = (a.series.group && a.series.group.zIndex) - (m.series.group && m.series.group.zIndex);
                        k = 0 < (0 !== k && g ? k : 0 !== h ? h : 0 !== b ? b : m.series.index > a.series.index ? -1 : 1)
                    }
                    k && (m = a)
                });
                return m
            };
            h.prototype.getChartCoordinatesFromPoint = function (a, g) {
                var e = a.series,
                    k = e.xAxis;
                e = e.yAxis;
                var h = m(a.clientX, a.plotX),
                    b = a.shapeArgs;
                if (k && e) return g ? {
                    chartX: k.len + k.pos - h,
                    chartY: e.len + e.pos - a.plotY
                } : {
                    chartX: h + k.pos,
                    chartY: a.plotY + e.pos
                };
                if (b && b.x && b.y) return {
                    chartX: b.x,
                    chartY: b.y
                }
            };
            h.prototype.getChartPosition = function () {
                return this.chartPosition || (this.chartPosition = r(this.chart.container))
            };
            h.prototype.getCoordinates = function (a) {
                var g = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function (e) {
                    g[e.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: e,
                        value: e.toValue(a[e.horiz ? "chartX" : "chartY"])
                    })
                });
                return g
            };
            h.prototype.getHoverData = function (a, g, e, h, b, n) {
                var k, u = [];
                h = !(!h || !a);
                var r = g && !g.stickyTracking,
                    x = {
                        chartX: n ? n.chartX : void 0,
                        chartY: n ? n.chartY : void 0,
                        shared: b
                    };
                t(this, "beforeGetHoverData",
                    x);
                r = r ? [g] : e.filter(function (a) {
                    return x.filter ? x.filter(a) : a.visible && !(!b && a.directTouch) && m(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                g = (k = h || !n ? a : this.findNearestKDPoint(r, b, n)) && k.series;
                k && (b && !g.noSharedTooltip ? (r = e.filter(function (a) {
                        return x.filter ? x.filter(a) : a.visible && !(!b && a.directTouch) && m(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                    }), r.forEach(function (a) {
                        var f = E(a.points, function (d) {
                            return d.x === k.x && !d.isNull
                        });
                        v(f) && (a.chart.isBoosting && (f = a.getPoint(f)), u.push(f))
                    })) :
                    u.push(k));
                x = {
                    hoverPoint: k
                };
                t(this, "afterGetHoverData", x);
                return {
                    hoverPoint: x.hoverPoint,
                    hoverSeries: g,
                    hoverPoints: u
                }
            };
            h.prototype.getPointFromEvent = function (a) {
                a = a.target;
                for (var g; a && !g;) g = a.point, a = a.parentNode;
                return g
            };
            h.prototype.onTrackerMouseOut = function (a) {
                a = a.relatedTarget || a.toElement;
                var g = this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!g || !a || g.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + g.index) && this.inClass(a, "highcharts-tracker"))) g.onMouseOut()
            };
            h.prototype.inClass = function (a, g) {
                for (var e; a;) {
                    if (e = I(a, "class")) {
                        if (-1 !== e.indexOf(g)) return !0;
                        if (-1 !== e.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            };
            h.prototype.init = function (a, g) {
                this.options = g;
                this.chart = a;
                this.runChartClick = g.chart.events && !!g.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                q && (a.tooltip = new q(a, g.tooltip), this.followTouchMove = m(g.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            h.prototype.normalize = function (a, g) {
                var e = a.touches,
                    k = e ? e.length ? e.item(0) :
                    m(e.changedTouches, a.changedTouches)[0] : a;
                g || (g = this.getChartPosition());
                e = k.pageX - g.left;
                g = k.pageY - g.top;
                if (k = this.chart.containerScaling) e /= k.scaleX, g /= k.scaleY;
                return p(a, {
                    chartX: Math.round(e),
                    chartY: Math.round(g)
                })
            };
            h.prototype.onContainerClick = function (a) {
                var g = this.chart,
                    e = g.hoverPoint;
                a = this.normalize(a);
                var k = g.plotLeft,
                    h = g.plotTop;
                g.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (t(e.series, "click", p(a, {
                    point: e
                })), g.hoverPoint && e.firePointEvent("click", a)) : (p(a, this.getCoordinates(a)),
                    g.isInsidePlot(a.chartX - k, a.chartY - h) && t(g, "click", a)))
            };
            h.prototype.onContainerMouseDown = function (a) {
                var g = 1 === ((a.buttons || a.button) & 1);
                a = this.normalize(a);
                if (b.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
                if ("undefined" === typeof a.button || g) this.zoomOption(a), g && a.preventDefault && a.preventDefault(), this.dragStart(a)
            };
            h.prototype.onContainerMouseLeave = function (a) {
                var g = C[m(b.hoverChartIndex, -1)],
                    e = this.chart.tooltip;
                a = this.normalize(a);
                g && (a.relatedTarget || a.toElement) && (g.pointer.reset(),
                    g.pointer.chartPosition = void 0);
                e && !e.isHidden && this.reset()
            };
            h.prototype.onContainerMouseEnter = function (a) {
                delete this.chartPosition
            };
            h.prototype.onContainerMouseMove = function (a) {
                var g = this.chart;
                a = this.normalize(a);
                this.setHoverChartIndex();
                a.preventDefault || (a.returnValue = !1);
                "mousedown" === g.mouseIsDown && this.drag(a);
                g.openMenu || !this.inClass(a.target, "highcharts-tracker") && !g.isInsidePlot(a.chartX - g.plotLeft, a.chartY - g.plotTop) || this.runPointActions(a)
            };
            h.prototype.onDocumentTouchEnd = function (a) {
                C[b.hoverChartIndex] &&
                    C[b.hoverChartIndex].pointer.drop(a)
            };
            h.prototype.onContainerTouchMove = function (a) {
                this.touch(a)
            };
            h.prototype.onContainerTouchStart = function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            };
            h.prototype.onDocumentMouseMove = function (a) {
                var g = this.chart,
                    e = this.chartPosition;
                a = this.normalize(a, e);
                var k = g.tooltip;
                !e || k && k.isStickyOnContact() || g.isInsidePlot(a.chartX - g.plotLeft, a.chartY - g.plotTop) || this.inClass(a.target, "highcharts-tracker") || this.reset()
            };
            h.prototype.onDocumentMouseUp = function (a) {
                var g = C[m(b.hoverChartIndex,
                    -1)];
                g && g.pointer.drop(a)
            };
            h.prototype.pinch = function (a) {
                var g = this,
                    e = g.chart,
                    k = g.pinchDown,
                    h = a.touches || [],
                    b = h.length,
                    n = g.lastValidTouch,
                    r = g.hasZoom,
                    v = g.selectionMarker,
                    l = {},
                    t = 1 === b && (g.inClass(a.target, "highcharts-tracker") && e.runTrackerClick || g.runChartClick),
                    f = {};
                1 < b && (g.initiated = !0);
                r && g.initiated && !t && a.preventDefault();
                [].map.call(h, function (a) {
                    return g.normalize(a)
                });
                "touchstart" === a.type ? ([].forEach.call(h, function (a, c) {
                        k[c] = {
                            chartX: a.chartX,
                            chartY: a.chartY
                        }
                    }), n.x = [k[0].chartX, k[1] && k[1].chartX],
                    n.y = [k[0].chartY, k[1] && k[1].chartY], e.axes.forEach(function (a) {
                        if (a.zoomEnabled) {
                            var c = e.bounds[a.horiz ? "h" : "v"],
                                d = a.minPixelPadding,
                                f = a.toPixels(Math.min(m(a.options.min, a.dataMin), a.dataMin)),
                                g = a.toPixels(Math.max(m(a.options.max, a.dataMax), a.dataMax)),
                                k = Math.max(f, g);
                            c.min = Math.min(a.pos, Math.min(f, g) - d);
                            c.max = Math.max(a.pos + a.len, k + d)
                        }
                    }), g.res = !0) : g.followTouchMove && 1 === b ? this.runPointActions(g.normalize(a)) : k.length && (v || (g.selectionMarker = v = p({
                    destroy: F,
                    touch: !0
                }, e.plotBox)), g.pinchTranslate(k,
                    h, l, v, f, n), g.hasPinched = r, g.scaleGroups(l, f), g.res && (g.res = !1, this.reset(!1, 0)))
            };
            h.prototype.pinchTranslate = function (a, g, e, h, m, b) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, g, e, h, m, b);
                this.zoomVert && this.pinchTranslateDirection(!1, a, g, e, h, m, b)
            };
            h.prototype.pinchTranslateDirection = function (a, g, e, h, m, b, n, r) {
                var k = this.chart,
                    u = a ? "x" : "y",
                    x = a ? "X" : "Y",
                    f = "chart" + x,
                    d = a ? "width" : "height",
                    c = k["plot" + (a ? "Left" : "Top")],
                    p, G, v = r || 1,
                    B = k.inverted,
                    l = k.bounds[a ? "h" : "v"],
                    t = 1 === g.length,
                    y = g[0][f],
                    D = e[0][f],
                    q = !t &&
                    g[1][f],
                    A = !t && e[1][f];
                e = function () {
                    "number" === typeof A && 20 < Math.abs(y - q) && (v = r || Math.abs(D - A) / Math.abs(y - q));
                    G = (c - D) / v + y;
                    p = k["plot" + (a ? "Width" : "Height")] / v
                };
                e();
                g = G;
                if (g < l.min) {
                    g = l.min;
                    var E = !0
                } else g + p > l.max && (g = l.max - p, E = !0);
                E ? (D -= .8 * (D - n[u][0]), "number" === typeof A && (A -= .8 * (A - n[u][1])), e()) : n[u] = [D, A];
                B || (b[u] = G - c, b[d] = p);
                b = B ? 1 / v : v;
                m[d] = p;
                m[u] = g;
                h[B ? a ? "scaleY" : "scaleX" : "scale" + x] = v;
                h["translate" + x] = b * c + (D - b * y)
            };
            h.prototype.reset = function (k, g) {
                var e = this.chart,
                    h = e.hoverSeries,
                    m = e.hoverPoint,
                    b = e.hoverPoints,
                    n = e.tooltip,
                    r = n && n.shared ? b : m;
                k && r && a(r).forEach(function (a) {
                    a.series.isCartesian && "undefined" === typeof a.plotX && (k = !1)
                });
                if (k) n && r && a(r).length && (n.refresh(r), n.shared && b ? b.forEach(function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                }) : m && (m.setState(m.state, !0), e.axes.forEach(function (a) {
                    a.crosshair && m.series[a.coll] === a && a.drawCrosshair(null, m)
                })));
                else {
                    if (m) m.onMouseOut();
                    b && b.forEach(function (a) {
                        a.setState()
                    });
                    if (h) h.onMouseOut();
                    n && n.hide(g);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    e.axes.forEach(function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = e.hoverPoints = e.hoverPoint = null
                }
            };
            h.prototype.runPointActions = function (a, g) {
                var e = this.chart,
                    k = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
                    h = k ? k.shared : !1,
                    n = g || e.hoverPoint,
                    r = n && n.series || e.hoverSeries;
                r = this.getHoverData(n, r, e.series, (!a || "touchmove" !== a.type) && (!!g || r && r.directTouch && this.isDirectTouch),
                    h, a);
                n = r.hoverPoint;
                var p = r.hoverPoints;
                g = (r = r.hoverSeries) && r.tooltipOptions.followPointer;
                h = h && r && !r.noSharedTooltip;
                if (n && (n !== e.hoverPoint || k && k.isHidden)) {
                    (e.hoverPoints || []).forEach(function (a) {
                        -1 === p.indexOf(a) && a.setState()
                    });
                    if (e.hoverSeries !== r) r.onMouseOver();
                    this.applyInactiveState(p);
                    (p || []).forEach(function (a) {
                        a.setState("hover")
                    });
                    e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                    if (!n.series) return;
                    e.hoverPoints = p;
                    e.hoverPoint = n;
                    n.firePointEvent("mouseOver");
                    k && k.refresh(h ? p : n,
                        a)
                } else g && k && !k.isHidden && (n = k.getAnchor([{}], a), k.updatePosition({
                    plotX: n[0],
                    plotY: n[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = H(e.container.ownerDocument, "mousemove", function (a) {
                    var e = C[b.hoverChartIndex];
                    if (e) e.pointer.onDocumentMouseMove(a)
                }));
                e.axes.forEach(function (g) {
                    var k = m((g.crosshair || {}).snap, !0),
                        h;
                    k && ((h = e.hoverPoint) && h.series[g.coll] === g || (h = E(p, function (a) {
                        return a.series[g.coll] === g
                    })));
                    h || !k ? g.drawCrosshair(a, h) : g.hideCrosshair()
                })
            };
            h.prototype.scaleGroups = function (a, g) {
                var e =
                    this.chart,
                    k;
                e.series.forEach(function (h) {
                    k = a || h.getPlotBox();
                    h.xAxis && h.xAxis.zoomEnabled && h.group && (h.group.attr(k), h.markerGroup && (h.markerGroup.attr(k), h.markerGroup.clip(g ? e.clipRect : null)), h.dataLabelsGroup && h.dataLabelsGroup.attr(k))
                });
                e.clipRect.attr(g || e.clipBox)
            };
            h.prototype.setDOMEvents = function () {
                var a = this.chart.container,
                    g = a.ownerDocument;
                a.onmousedown = this.onContainerMouseDown.bind(this);
                a.onmousemove = this.onContainerMouseMove.bind(this);
                a.onclick = this.onContainerClick.bind(this);
                this.unbindContainerMouseEnter =
                    H(a, "mouseenter", this.onContainerMouseEnter.bind(this));
                this.unbindContainerMouseLeave = H(a, "mouseleave", this.onContainerMouseLeave.bind(this));
                b.unbindDocumentMouseUp || (b.unbindDocumentMouseUp = H(g, "mouseup", this.onDocumentMouseUp.bind(this)));
                b.hasTouch && (H(a, "touchstart", this.onContainerTouchStart.bind(this)), H(a, "touchmove", this.onContainerTouchMove.bind(this)), b.unbindDocumentTouchEnd || (b.unbindDocumentTouchEnd = H(g, "touchend", this.onDocumentTouchEnd.bind(this))))
            };
            h.prototype.setHoverChartIndex =
                function () {
                    var a = this.chart,
                        g = b.charts[m(b.hoverChartIndex, -1)];
                    if (g && g !== a) g.pointer.onContainerMouseLeave({
                        relatedTarget: !0
                    });
                    g && g.mouseIsDown || (b.hoverChartIndex = a.index)
                };
            h.prototype.touch = function (a, g) {
                var e = this.chart,
                    k;
                this.setHoverChartIndex();
                if (1 === a.touches.length)
                    if (a = this.normalize(a), (k = e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop)) && !e.openMenu) {
                        g && this.runPointActions(a);
                        if ("touchmove" === a.type) {
                            g = this.pinchDown;
                            var h = g[0] ? 4 <= Math.sqrt(Math.pow(g[0].chartX - a.chartX, 2) + Math.pow(g[0].chartY -
                                a.chartY, 2)) : !1
                        }
                        m(h, !0) && this.pinch(a)
                    } else g && this.reset();
                else 2 === a.touches.length && this.pinch(a)
            };
            h.prototype.zoomOption = function (a) {
                var g = this.chart,
                    e = g.options.chart,
                    k = e.zoomType || "";
                g = g.inverted;
                /touch/.test(a.type) && (k = m(e.pinchType, k));
                this.zoomX = a = /x/.test(k);
                this.zoomY = k = /y/.test(k);
                this.zoomHor = a && !g || k && g;
                this.zoomVert = k && !g || a && g;
                this.hasZoom = a || k
            };
            return h
        }();
        return b.Pointer = l
    });
    M(q, "Core/MSPointer.js", [q["Core/Globals.js"], q["Core/Pointer.js"], q["Core/Utilities.js"]], function (l, b,
        q) {
        function z() {
            var b = [];
            b.item = function (b) {
                return this[b]
            };
            p(t, function (n) {
                b.push({
                    pageX: n.pageX,
                    pageY: n.pageY,
                    target: n.target
                })
            });
            return b
        }

        function w(b, n, r, m) {
            "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !F[l.hoverChartIndex] || (m(b), m = F[l.hoverChartIndex].pointer, m[n]({
                type: r,
                target: b.currentTarget,
                preventDefault: I,
                touches: z()
            }))
        }
        var C = this && this.__extends || function () {
                var b = function (n, r) {
                    b = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (m, a) {
                        m.__proto__ = a
                    } || function (m,
                        a) {
                        for (var h in a) a.hasOwnProperty(h) && (m[h] = a[h])
                    };
                    return b(n, r)
                };
                return function (n, r) {
                    function m() {
                        this.constructor = n
                    }
                    b(n, r);
                    n.prototype = null === r ? Object.create(r) : (m.prototype = r.prototype, new m)
                }
            }(),
            F = l.charts,
            H = l.doc,
            I = l.noop,
            y = q.addEvent,
            A = q.css,
            p = q.objectEach,
            E = q.removeEvent,
            t = {},
            n = !!l.win.PointerEvent;
        return function (b) {
            function p() {
                return null !== b && b.apply(this, arguments) || this
            }
            C(p, b);
            p.prototype.batchMSEvents = function (b) {
                b(this.chart.container, n ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                b(this.chart.container, n ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                b(H, n ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            };
            p.prototype.destroy = function () {
                this.batchMSEvents(E);
                b.prototype.destroy.call(this)
            };
            p.prototype.init = function (n, m) {
                b.prototype.init.call(this, n, m);
                this.hasZoom && A(n.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            };
            p.prototype.onContainerPointerDown = function (b) {
                w(b, "onContainerTouchStart", "touchstart", function (m) {
                    t[m.pointerId] = {
                        pageX: m.pageX,
                        pageY: m.pageY,
                        target: m.currentTarget
                    }
                })
            };
            p.prototype.onContainerPointerMove = function (b) {
                w(b, "onContainerTouchMove", "touchmove", function (m) {
                    t[m.pointerId] = {
                        pageX: m.pageX,
                        pageY: m.pageY
                    };
                    t[m.pointerId].target || (t[m.pointerId].target = m.currentTarget)
                })
            };
            p.prototype.onDocumentPointerUp = function (b) {
                w(b, "onDocumentTouchEnd", "touchend", function (m) {
                    delete t[m.pointerId]
                })
            };
            p.prototype.setDOMEvents = function () {
                b.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(y)
            };
            return p
        }(b)
    });
    M(q, "Core/Legend.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.addEvent,
            z = b.animObject,
            w = b.css,
            C = b.defined,
            F = b.discardElement,
            H = b.find,
            I = b.fireEvent,
            y = b.format,
            A = b.isNumber,
            p = b.merge,
            E = b.pick,
            t = b.relativeLength,
            n = b.setAnimation,
            v = b.stableSort,
            D = b.syncTimeout;
        b = b.wrap;
        var r = l.isFirefox,
            m = l.marginNames,
            a = l.win,
            h = function () {
                function a(a, e) {
                    this.allItems = [];
                    this.contentGroup = this.box = void 0;
                    this.display = !1;
                    this.group = void 0;
                    this.offsetWidth = this.maxLegendWidth = this.maxItemWidth =
                        this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                    this.options = {};
                    this.padding = 0;
                    this.pages = [];
                    this.proximate = !1;
                    this.scrollGroup = void 0;
                    this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                    this.chart = a;
                    this.init(a, e)
                }
                a.prototype.init = function (a, e) {
                    this.chart = a;
                    this.setOptions(e);
                    e.enabled && (this.render(), q(this.chart, "endResize", function () {
                            this.legend.positionCheckboxes()
                        }),
                        this.proximate ? this.unchartrender = q(this.chart, "render", function () {
                            this.legend.proximatePositions();
                            this.legend.positionItems()
                        }) : this.unchartrender && this.unchartrender())
                };
                a.prototype.setOptions = function (a) {
                    var e = E(a.padding, 8);
                    this.options = a;
                    this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = p(this.itemStyle, a.itemHiddenStyle));
                    this.itemMarginTop = a.itemMarginTop || 0;
                    this.itemMarginBottom = a.itemMarginBottom || 0;
                    this.padding = e;
                    this.initialItemY = e - 5;
                    this.symbolWidth = E(a.symbolWidth,
                        16);
                    this.pages = [];
                    this.proximate = "proximate" === a.layout && !this.chart.inverted;
                    this.baseline = void 0
                };
                a.prototype.update = function (a, e) {
                    var g = this.chart;
                    this.setOptions(p(!0, this.options, a));
                    this.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    E(e, !0) && g.redraw();
                    I(this, "afterUpdate")
                };
                a.prototype.colorizeItem = function (a, e) {
                    a.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                    if (!this.chart.styledMode) {
                        var g = this.options,
                            k = a.legendItem,
                            h = a.legendLine,
                            m = a.legendSymbol,
                            b = this.itemHiddenStyle.color;
                        g = e ? g.itemStyle.color : b;
                        var n = e ? a.color || b : b,
                            r = a.options && a.options.marker,
                            p = {
                                fill: n
                            };
                        k && k.css({
                            fill: g,
                            color: g
                        });
                        h && h.attr({
                            stroke: n
                        });
                        m && (r && m.isMarker && (p = a.pointAttribs(), e || (p.stroke = p.fill = b)), m.attr(p))
                    }
                    I(this, "afterColorizeItem", {
                        item: a,
                        visible: e
                    })
                };
                a.prototype.positionItems = function () {
                    this.allItems.forEach(this.positionItem, this);
                    this.chart.isResizing || this.positionCheckboxes()
                };
                a.prototype.positionItem = function (a) {
                    var e = this,
                        g = this.options,
                        k = g.symbolPadding,
                        h = !g.rtl,
                        m = a._legendItemPos;
                    g =
                        m[0];
                    m = m[1];
                    var b = a.checkbox,
                        n = a.legendGroup;
                    n && n.element && (k = {
                        translateX: h ? g : this.legendWidth - g - 2 * k - 4,
                        translateY: m
                    }, h = function () {
                        I(e, "afterPositionItem", {
                            item: a
                        })
                    }, C(n.translateY) ? n.animate(k, void 0, h) : (n.attr(k), h()));
                    b && (b.x = g, b.y = m)
                };
                a.prototype.destroyItem = function (a) {
                    var e = a.checkbox;
                    ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (e) {
                        a[e] && (a[e] = a[e].destroy())
                    });
                    e && F(a.checkbox)
                };
                a.prototype.destroy = function () {
                    function a(a) {
                        this[a] && (this[a] = this[a].destroy())
                    }
                    this.getAllItems().forEach(function (e) {
                        ["legendItem",
                            "legendGroup"
                        ].forEach(a, e)
                    });
                    "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                    this.display = null
                };
                a.prototype.positionCheckboxes = function () {
                    var a = this.group && this.group.alignAttr,
                        e = this.clipHeight || this.legendHeight,
                        k = this.titleHeight;
                    if (a) {
                        var h = a.translateY;
                        this.allItems.forEach(function (g) {
                            var m = g.checkbox;
                            if (m) {
                                var b = h + k + m.y + (this.scrollOffset || 0) + 3;
                                w(m, {
                                    left: a.translateX + g.checkboxOffset + m.x - 20 + "px",
                                    top: b + "px",
                                    display: this.proximate || b > h - 6 && b < h + e - 6 ? "" : "none"
                                })
                            }
                        }, this)
                    }
                };
                a.prototype.renderTitle = function () {
                    var a = this.options,
                        e = this.padding,
                        k = a.title,
                        h = 0;
                    k.text && (this.title || (this.title = this.chart.renderer.label(k.text, e - 3, e - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                        zIndex: 1
                    }), this.chart.styledMode || this.title.css(k.style), this.title.add(this.group)), k.width || this.title.css({
                        width: this.maxLegendWidth + "px"
                    }), a = this.title.getBBox(), h = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                        translateY: h
                    }));
                    this.titleHeight = h
                };
                a.prototype.setText = function (a) {
                    var e =
                        this.options;
                    a.legendItem.attr({
                        text: e.labelFormat ? y(e.labelFormat, a, this.chart) : e.labelFormatter.call(a)
                    })
                };
                a.prototype.renderItem = function (a) {
                    var e = this.chart,
                        g = e.renderer,
                        k = this.options,
                        h = this.symbolWidth,
                        m = k.symbolPadding,
                        b = this.itemStyle,
                        n = this.itemHiddenStyle,
                        r = "horizontal" === k.layout ? E(k.itemDistance, 20) : 0,
                        v = !k.rtl,
                        f = a.legendItem,
                        d = !a.series,
                        c = !d && a.series.drawLegendSymbol ? a.series : a,
                        l = c.options;
                    l = this.createCheckboxForItem && l && l.showCheckbox;
                    r = h + m + r + (l ? 20 : 0);
                    var t = k.useHTML,
                        y = a.options.className;
                    f || (a.legendGroup = g.g("legend-item").addClass("highcharts-" + c.type + "-series highcharts-color-" + a.colorIndex + (y ? " " + y : "") + (d ? " highcharts-series-" + a.index : "")).attr({
                            zIndex: 1
                        }).add(this.scrollGroup), a.legendItem = f = g.text("", v ? h + m : -m, this.baseline || 0, t), e.styledMode || f.css(p(a.visible ? b : n)), f.attr({
                            align: v ? "left" : "right",
                            zIndex: 2
                        }).add(a.legendGroup), this.baseline || (this.fontMetrics = g.fontMetrics(e.styledMode ? 12 : b.fontSize, f), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, f.attr("y", this.baseline)),
                        this.symbolHeight = k.symbolHeight || this.fontMetrics.f, c.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, f, t));
                    l && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
                    this.colorizeItem(a, a.visible);
                    !e.styledMode && b.width || f.css({
                        width: (k.itemWidth || this.widthOption || e.spacingBox.width) - r + "px"
                    });
                    this.setText(a);
                    e = f.getBBox();
                    a.itemWidth = a.checkboxOffset = k.itemWidth || a.legendItemWidth || e.width + r;
                    this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                    this.totalItemWidth +=
                        a.itemWidth;
                    this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || e.height || this.symbolHeight)
                };
                a.prototype.layoutItem = function (a) {
                    var e = this.options,
                        g = this.padding,
                        k = "horizontal" === e.layout,
                        h = a.itemHeight,
                        m = this.itemMarginBottom,
                        b = this.itemMarginTop,
                        n = k ? E(e.itemDistance, 20) : 0,
                        r = this.maxLegendWidth;
                    e = e.alignColumns && this.totalItemWidth > r ? this.maxItemWidth : a.itemWidth;
                    k && this.itemX - g + e > r && (this.itemX = g, this.lastLineHeight && (this.itemY += b + this.lastLineHeight + m), this.lastLineHeight = 0);
                    this.lastItemY =
                        b + this.itemY + m;
                    this.lastLineHeight = Math.max(h, this.lastLineHeight);
                    a._legendItemPos = [this.itemX, this.itemY];
                    k ? this.itemX += e : (this.itemY += b + h + m, this.lastLineHeight = h);
                    this.offsetWidth = this.widthOption || Math.max((k ? this.itemX - g - (a.checkbox ? 0 : n) : e) + g, this.offsetWidth)
                };
                a.prototype.getAllItems = function () {
                    var a = [];
                    this.chart.series.forEach(function (e) {
                        var g = e && e.options;
                        e && E(g.showInLegend, C(g.linkedTo) ? !1 : void 0, !0) && (a = a.concat(e.legendItems || ("point" === g.legendType ? e.data : e)))
                    });
                    I(this, "afterGetAllItems", {
                        allItems: a
                    });
                    return a
                };
                a.prototype.getAlignment = function () {
                    var a = this.options;
                    return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
                };
                a.prototype.adjustMargins = function (a, e) {
                    var g = this.chart,
                        k = this.options,
                        h = this.getAlignment();
                    h && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (b, n) {
                        b.test(h) && !C(a[n]) && (g[m[n]] = Math.max(g[m[n]], g.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * k[n % 2 ? "x" :
                            "y"] + E(k.margin, 12) + e[n] + (g.titleOffset[n] || 0)))
                    })
                };
                a.prototype.proximatePositions = function () {
                    var a = this.chart,
                        e = [],
                        k = "left" === this.options.align;
                    this.allItems.forEach(function (g) {
                        var h;
                        var m = k;
                        if (g.yAxis) {
                            g.xAxis.options.reversed && (m = !m);
                            g.points && (h = H(m ? g.points : g.points.slice(0).reverse(), function (a) {
                                return A(a.plotY)
                            }));
                            m = this.itemMarginTop + g.legendItem.getBBox().height + this.itemMarginBottom;
                            var b = g.yAxis.top - a.plotTop;
                            g.visible ? (h = h ? h.plotY : g.yAxis.height, h += b - .3 * m) : h = b + g.yAxis.height;
                            e.push({
                                target: h,
                                size: m,
                                item: g
                            })
                        }
                    }, this);
                    l.distribute(e, a.plotHeight);
                    e.forEach(function (e) {
                        e.item._legendItemPos[1] = a.plotTop - a.spacing[0] + e.pos
                    })
                };
                a.prototype.render = function () {
                    var a = this.chart,
                        e = a.renderer,
                        k = this.group,
                        h = this.box,
                        m = this.options,
                        b = this.padding;
                    this.itemX = b;
                    this.itemY = this.initialItemY;
                    this.lastItemY = this.offsetWidth = 0;
                    this.widthOption = t(m.width, a.spacingBox.width - b);
                    var n = a.spacingBox.width - 2 * b - m.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (n /= 2);
                    this.maxLegendWidth = this.widthOption ||
                        n;
                    k || (this.group = k = e.g("legend").attr({
                        zIndex: 7
                    }).add(), this.contentGroup = e.g().attr({
                        zIndex: 1
                    }).add(k), this.scrollGroup = e.g().add(this.contentGroup));
                    this.renderTitle();
                    var r = this.getAllItems();
                    v(r, function (a, f) {
                        return (a.options && a.options.legendIndex || 0) - (f.options && f.options.legendIndex || 0)
                    });
                    m.reversed && r.reverse();
                    this.allItems = r;
                    this.display = n = !!r.length;
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                    r.forEach(this.renderItem, this);
                    r.forEach(this.layoutItem, this);
                    r = (this.widthOption || this.offsetWidth) + b;
                    var p = this.lastItemY + this.lastLineHeight + this.titleHeight;
                    p = this.handleOverflow(p);
                    p += b;
                    h || (this.box = h = e.rect().addClass("highcharts-legend-box").attr({
                        r: m.borderRadius
                    }).add(k), h.isNew = !0);
                    a.styledMode || h.attr({
                        stroke: m.borderColor,
                        "stroke-width": m.borderWidth || 0,
                        fill: m.backgroundColor || "none"
                    }).shadow(m.shadow);
                    0 < r && 0 < p && (h[h.isNew ? "attr" : "animate"](h.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: r,
                        height: p
                    }, h.strokeWidth())), h.isNew = !1);
                    h[n ? "show" : "hide"]();
                    a.styledMode &&
                        "none" === k.getStyle("display") && (r = p = 0);
                    this.legendWidth = r;
                    this.legendHeight = p;
                    n && this.align();
                    this.proximate || this.positionItems();
                    I(this, "afterRender")
                };
                a.prototype.align = function (a) {
                    void 0 === a && (a = this.chart.spacingBox);
                    var e = this.chart,
                        g = this.options,
                        h = a.y;
                    /(lth|ct|rth)/.test(this.getAlignment()) && 0 < e.titleOffset[0] ? h += e.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < e.titleOffset[2] && (h -= e.titleOffset[2]);
                    h !== a.y && (a = p(a, {
                        y: h
                    }));
                    this.group.align(p(g, {
                        width: this.legendWidth,
                        height: this.legendHeight,
                        verticalAlign: this.proximate ? "top" : g.verticalAlign
                    }), !0, a)
                };
                a.prototype.handleOverflow = function (a) {
                    var e = this,
                        g = this.chart,
                        h = g.renderer,
                        k = this.options,
                        m = k.y,
                        b = this.padding;
                    m = g.spacingBox.height + ("top" === k.verticalAlign ? -m : m) - b;
                    var n = k.maxHeight,
                        r, p = this.clipRect,
                        f = k.navigation,
                        d = E(f.animation, !0),
                        c = f.arrowSize || 12,
                        v = this.nav,
                        l = this.pages,
                        t, y = this.allItems,
                        q = function (a) {
                            "number" === typeof a ? p.attr({
                                height: a
                            }) : p && (e.clipRect = p.destroy(), e.contentGroup.clip());
                            e.contentGroup.div && (e.contentGroup.div.style.clip =
                                a ? "rect(" + b + "px,9999px," + (b + a) + "px,0)" : "auto")
                        },
                        D = function (a) {
                            e[a] = h.circle(0, 0, 1.3 * c).translate(c / 2, c / 2).add(v);
                            g.styledMode || e[a].attr("fill", "rgba(0,0,0,0.0001)");
                            return e[a]
                        };
                    "horizontal" !== k.layout || "middle" === k.verticalAlign || k.floating || (m /= 2);
                    n && (m = Math.min(m, n));
                    l.length = 0;
                    a > m && !1 !== f.enabled ? (this.clipHeight = r = Math.max(m - 20 - this.titleHeight - b, 0), this.currentPage = E(this.currentPage, 1), this.fullHeight = a, y.forEach(function (a, c) {
                        var d = a._legendItemPos[1],
                            f = Math.round(a.legendItem.getBBox().height),
                            e = l.length;
                        if (!e || d - l[e - 1] > r && (t || d) !== l[e - 1]) l.push(t || d), e++;
                        a.pageIx = e - 1;
                        t && (y[c - 1].pageIx = e - 1);
                        c === y.length - 1 && d + f - l[e - 1] > r && d !== t && (l.push(d), a.pageIx = e);
                        d !== t && (t = d)
                    }), p || (p = e.clipRect = h.clipRect(0, b, 9999, 0), e.contentGroup.clip(p)), q(r), v || (this.nav = v = h.g().attr({
                            zIndex: 1
                        }).add(this.group), this.up = h.symbol("triangle", 0, 0, c, c).add(v), D("upTracker").on("click", function () {
                            e.scroll(-1, d)
                        }), this.pager = h.text("", 15, 10).addClass("highcharts-legend-navigation"), g.styledMode || this.pager.css(f.style),
                        this.pager.add(v), this.down = h.symbol("triangle-down", 0, 0, c, c).add(v), D("downTracker").on("click", function () {
                            e.scroll(1, d)
                        })), e.scroll(0), a = m) : v && (q(), this.nav = v.destroy(), this.scrollGroup.attr({
                        translateY: 1
                    }), this.clipHeight = 0);
                    return a
                };
                a.prototype.scroll = function (a, e) {
                    var g = this,
                        h = this.chart,
                        k = this.pages,
                        m = k.length,
                        b = this.currentPage + a;
                    a = this.clipHeight;
                    var r = this.options.navigation,
                        p = this.pager,
                        v = this.padding;
                    b > m && (b = m);
                    0 < b && ("undefined" !== typeof e && n(e, h), this.nav.attr({
                        translateX: v,
                        translateY: a +
                            this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), [this.up, this.upTracker].forEach(function (a) {
                        a.attr({
                            "class": 1 === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    }), p.attr({
                        text: b + "/" + m
                    }), [this.down, this.downTracker].forEach(function (a) {
                        a.attr({
                            x: 18 + this.pager.getBBox().width,
                            "class": b === m ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    }, this), h.styledMode || (this.up.attr({
                        fill: 1 === b ? r.inactiveColor : r.activeColor
                    }), this.upTracker.css({
                        cursor: 1 === b ? "default" : "pointer"
                    }), this.down.attr({
                        fill: b === m ? r.inactiveColor : r.activeColor
                    }), this.downTracker.css({
                        cursor: b === m ? "default" : "pointer"
                    })), this.scrollOffset = -k[b - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = b, this.positionCheckboxes(), e = z(E(e, h.renderer.globalAnimation, !0)), D(function () {
                        I(g, "afterScroll", {
                            currentPage: b
                        })
                    }, e.duration))
                };
                return a
            }();
        (/Trident\/7\.0/.test(a.navigator && a.navigator.userAgent) || r) && b(h.prototype, "positionItem", function (a, g) {
            var e =
                this,
                h = function () {
                    g._legendItemPos && a.call(e, g)
                };
            h();
            e.bubbleLegend || setTimeout(h)
        });
        l.Legend = h;
        return l.Legend
    });
    M(q, "Core/Chart/Chart.js", [q["Core/Axis/Axis.js"], q["Core/Globals.js"], q["Core/Legend.js"], q["Core/MSPointer.js"], q["Core/Options.js"], q["Core/Pointer.js"], q["Core/Time.js"], q["Core/Utilities.js"]], function (l, b, q, z, w, C, F, H) {
        var I = b.charts,
            y = b.doc,
            A = b.seriesTypes,
            p = b.win,
            E = w.defaultOptions,
            t = H.addEvent,
            n = H.animate,
            v = H.animObject,
            D = H.attr,
            r = H.createElement,
            m = H.css,
            a = H.defined,
            h = H.discardElement,
            k = H.erase,
            g = H.error,
            e = H.extend,
            x = H.find,
            u = H.fireEvent,
            B = H.getStyle,
            O = H.isArray,
            G = H.isFunction,
            K = H.isNumber,
            P = H.isObject,
            J = H.isString,
            f = H.merge,
            d = H.numberFormat,
            c = H.objectEach,
            L = H.pick,
            N = H.pInt,
            S = H.relativeLength,
            aa = H.removeEvent,
            Z = H.setAnimation,
            ba = H.splat,
            Q = H.syncTimeout,
            W = H.uniqueKey,
            R = b.marginNames,
            T = function () {
                function w(a, c, d) {
                    this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = this.series = this.renderTo = this.renderer = this.pointer =
                        this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                    this.getArgs(a, c, d)
                }
                w.prototype.getArgs = function (a, c, d) {
                    J(a) || a.nodeName ? (this.renderTo = a, this.init(c, d)) : this.init(a, c)
                };
                w.prototype.init = function (a, e) {
                    var g, h = a.series,
                        k = a.plotOptions || {};
                    u(this, "init", {
                        args: arguments
                    }, function () {
                        a.series = null;
                        g = f(E, a);
                        var m = g.chart || {};
                        c(g.plotOptions, function (a, c) {
                            P(a) && (a.tooltip = k[c] && f(k[c].tooltip) || void 0)
                        });
                        g.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
                        g.series = a.series = h;
                        this.userOptions = a;
                        var n = m.events;
                        this.margin = [];
                        this.spacing = [];
                        this.bounds = {
                            h: {},
                            v: {}
                        };
                        this.labelCollectors = [];
                        this.callback = e;
                        this.isResizing = 0;
                        this.options = g;
                        this.axes = [];
                        this.series = [];
                        this.time = a.time && Object.keys(a.time).length ?
                            new F(a.time) : b.time;
                        this.numberFormatter = m.numberFormatter || d;
                        this.styledMode = m.styledMode;
                        this.hasCartesianSeries = m.showAxes;
                        var r = this;
                        r.index = I.length;
                        I.push(r);
                        b.chartCount++;
                        n && c(n, function (a, c) {
                            G(a) && t(r, c, a)
                        });
                        r.xAxis = [];
                        r.yAxis = [];
                        r.pointCount = r.colorCounter = r.symbolCounter = 0;
                        u(r, "afterInit");
                        r.firstRender()
                    })
                };
                w.prototype.initSeries = function (a) {
                    var c = this.options.chart;
                    c = a.type || c.type || c.defaultSeriesType;
                    var d = A[c];
                    d || g(17, !0, this, {
                        missingModuleFor: c
                    });
                    c = new d;
                    c.init(this, a);
                    return c
                };
                w.prototype.setSeriesData = function () {
                    this.getSeriesOrderByLinks().forEach(function (a) {
                        a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data, !1)
                    })
                };
                w.prototype.getSeriesOrderByLinks = function () {
                    return this.series.concat().sort(function (a, c) {
                        return a.linkedSeries.length || c.linkedSeries.length ? c.linkedSeries.length - a.linkedSeries.length : 0
                    })
                };
                w.prototype.orderSeries = function (a) {
                    var c = this.series;
                    for (a = a || 0; a < c.length; a++) c[a] && (c[a].index = a, c[a].name = c[a].getName())
                };
                w.prototype.isInsidePlot =
                    function (a, c, d) {
                        var f = d ? c : a;
                        a = d ? a : c;
                        f = {
                            x: f,
                            y: a,
                            isInsidePlot: 0 <= f && f <= this.plotWidth && 0 <= a && a <= this.plotHeight
                        };
                        u(this, "afterIsInsidePlot", f);
                        return f.isInsidePlot
                    };
                w.prototype.redraw = function (a) {
                    u(this, "beforeRedraw");
                    var c = this,
                        d = c.axes,
                        f = c.series,
                        g = c.pointer,
                        h = c.legend,
                        k = c.userOptions.legend,
                        m = c.isDirtyLegend,
                        b = c.hasCartesianSeries,
                        n = c.isDirtyBox,
                        r = c.renderer,
                        p = r.isHidden(),
                        x = [];
                    c.setResponsive && c.setResponsive(!1);
                    Z(c.hasRendered ? a : !1, c);
                    p && c.temporaryDisplay();
                    c.layOutTitles();
                    for (a = f.length; a--;) {
                        var v =
                            f[a];
                        if (v.options.stacking) {
                            var l = !0;
                            if (v.isDirty) {
                                var t = !0;
                                break
                            }
                        }
                    }
                    if (t)
                        for (a = f.length; a--;) v = f[a], v.options.stacking && (v.isDirty = !0);
                    f.forEach(function (a) {
                        a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), m = !0) : k && (k.labelFormatter || k.labelFormat) && (m = !0));
                        a.isDirtyData && u(a, "updatedData")
                    });
                    m && h && h.options.enabled && (h.render(), c.isDirtyLegend = !1);
                    l && c.getStacks();
                    b && d.forEach(function (a) {
                        c.isResizing && K(a.min) || (a.updateNames(), a.setScale())
                    });
                    c.getMargins();
                    b && (d.forEach(function (a) {
                        a.isDirty &&
                            (n = !0)
                    }), d.forEach(function (a) {
                        var c = a.min + "," + a.max;
                        a.extKey !== c && (a.extKey = c, x.push(function () {
                            u(a, "afterSetExtremes", e(a.eventArgs, a.getExtremes()));
                            delete a.eventArgs
                        }));
                        (n || l) && a.redraw()
                    }));
                    n && c.drawChartBox();
                    u(c, "predraw");
                    f.forEach(function (a) {
                        (n || a.isDirty) && a.visible && a.redraw();
                        a.isDirtyData = !1
                    });
                    g && g.reset(!0);
                    r.draw();
                    u(c, "redraw");
                    u(c, "render");
                    p && c.temporaryDisplay(!0);
                    x.forEach(function (a) {
                        a.call()
                    })
                };
                w.prototype.get = function (a) {
                    function c(c) {
                        return c.id === a || c.options && c.options.id ===
                            a
                    }
                    var d = this.series,
                        f;
                    var e = x(this.axes, c) || x(this.series, c);
                    for (f = 0; !e && f < d.length; f++) e = x(d[f].points || [], c);
                    return e
                };
                w.prototype.getAxes = function () {
                    var a = this,
                        c = this.options,
                        d = c.xAxis = ba(c.xAxis || {});
                    c = c.yAxis = ba(c.yAxis || {});
                    u(this, "getAxes");
                    d.forEach(function (a, c) {
                        a.index = c;
                        a.isX = !0
                    });
                    c.forEach(function (a, c) {
                        a.index = c
                    });
                    d.concat(c).forEach(function (c) {
                        new l(a, c)
                    });
                    u(this, "afterGetAxes")
                };
                w.prototype.getSelectedPoints = function () {
                    var a = [];
                    this.series.forEach(function (c) {
                        a = a.concat(c.getPointsCollection().filter(function (a) {
                            return L(a.selectedStaging,
                                a.selected)
                        }))
                    });
                    return a
                };
                w.prototype.getSelectedSeries = function () {
                    return this.series.filter(function (a) {
                        return a.selected
                    })
                };
                w.prototype.setTitle = function (a, c, d) {
                    this.applyDescription("title", a);
                    this.applyDescription("subtitle", c);
                    this.applyDescription("caption", void 0);
                    this.layOutTitles(d)
                };
                w.prototype.applyDescription = function (a, c) {
                    var d = this,
                        e = "title" === a ? {
                            color: "#333333",
                            fontSize: this.options.isStock ? "16px" : "18px"
                        } : {
                            color: "#666666"
                        };
                    e = this.options[a] = f(!this.styledMode && {
                            style: e
                        }, this.options[a],
                        c);
                    var g = this[a];
                    g && c && (this[a] = g = g.destroy());
                    e && !g && (g = this.renderer.text(e.text, 0, 0, e.useHTML).attr({
                        align: e.align,
                        "class": "highcharts-" + a,
                        zIndex: e.zIndex || 4
                    }).add(), g.update = function (c) {
                        d[{
                            title: "setTitle",
                            subtitle: "setSubtitle",
                            caption: "setCaption"
                        } [a]](c)
                    }, this.styledMode || g.css(e.style), this[a] = g)
                };
                w.prototype.layOutTitles = function (a) {
                    var c = [0, 0, 0],
                        d = this.renderer,
                        f = this.spacingBox;
                    ["title", "subtitle", "caption"].forEach(function (a) {
                        var g = this[a],
                            h = this.options[a],
                            k = h.verticalAlign || "top";
                        a =
                            "title" === a ? -3 : "top" === k ? c[0] + 2 : 0;
                        if (g) {
                            if (!this.styledMode) var m = h.style.fontSize;
                            m = d.fontMetrics(m, g).b;
                            g.css({
                                width: (h.width || f.width + (h.widthAdjust || 0)) + "px"
                            });
                            var b = Math.round(g.getBBox(h.useHTML).height);
                            g.align(e({
                                y: "bottom" === k ? m : a + m,
                                height: b
                            }, h), !1, "spacingBox");
                            h.floating || ("top" === k ? c[0] = Math.ceil(c[0] + b) : "bottom" === k && (c[2] = Math.ceil(c[2] + b)))
                        }
                    }, this);
                    c[0] && "top" === (this.options.title.verticalAlign || "top") && (c[0] += this.options.title.margin);
                    c[2] && "bottom" === this.options.caption.verticalAlign &&
                        (c[2] += this.options.caption.margin);
                    var g = !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
                    this.titleOffset = c;
                    u(this, "afterLayOutTitles");
                    !this.isDirtyBox && g && (this.isDirtyBox = this.isDirtyLegend = g, this.hasRendered && L(a, !0) && this.isDirtyBox && this.redraw())
                };
                w.prototype.getChartSize = function () {
                    var c = this.options.chart,
                        d = c.width;
                    c = c.height;
                    var f = this.renderTo;
                    a(d) || (this.containerWidth = B(f, "width"));
                    a(c) || (this.containerHeight = B(f, "height"));
                    this.chartWidth = Math.max(0, d || this.containerWidth ||
                        600);
                    this.chartHeight = Math.max(0, S(c, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                };
                w.prototype.temporaryDisplay = function (a) {
                    var c = this.renderTo;
                    if (a)
                        for (; c && c.style;) c.hcOrigStyle && (m(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (y.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                    else
                        for (; c && c.style;) {
                            y.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, y.body.appendChild(c));
                            if ("none" === B(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                                display: c.style.display,
                                height: c.style.height,
                                overflow: c.style.overflow
                            }, a = {
                                display: "block",
                                overflow: "hidden"
                            }, c !== this.renderTo && (a.height = 0), m(c, a), c.offsetWidth || c.style.setProperty("display", "block", "important");
                            c = c.parentNode;
                            if (c === y.body) break
                        }
                };
                w.prototype.setClassName = function (a) {
                    this.container.className = "highcharts-container " + (a || "")
                };
                w.prototype.getContainer = function () {
                    var a = this.options,
                        c = a.chart;
                    var d = this.renderTo;
                    var f = W(),
                        h, k;
                    d || (this.renderTo = d = c.renderTo);
                    J(d) && (this.renderTo = d = y.getElementById(d));
                    d ||
                        g(13, !0, this);
                    var n = N(D(d, "data-highcharts-chart"));
                    K(n) && I[n] && I[n].hasRendered && I[n].destroy();
                    D(d, "data-highcharts-chart", this.index);
                    d.innerHTML = "";
                    c.skipClone || d.offsetWidth || this.temporaryDisplay();
                    this.getChartSize();
                    n = this.chartWidth;
                    var p = this.chartHeight;
                    m(d, {
                        overflow: "hidden"
                    });
                    this.styledMode || (h = e({
                        position: "relative",
                        overflow: "hidden",
                        width: n + "px",
                        height: p + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                        userSelect: "none"
                    }, c.style));
                    this.container =
                        d = r("div", {
                            id: f
                        }, h, d);
                    this._cursor = d.style.cursor;
                    this.renderer = new(b[c.renderer] || b.Renderer)(d, n, p, null, c.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
                    Z(void 0, this);
                    this.setClassName(c.className);
                    if (this.styledMode)
                        for (k in a.defs) this.renderer.definition(a.defs[k]);
                    else this.renderer.setStyle(c.style);
                    this.renderer.chartIndex = this.index;
                    u(this, "afterGetContainer")
                };
                w.prototype.getMargins = function (c) {
                    var d = this.spacing,
                        f = this.margin,
                        e = this.titleOffset;
                    this.resetMargins();
                    e[0] &&
                        !a(f[0]) && (this.plotTop = Math.max(this.plotTop, e[0] + d[0]));
                    e[2] && !a(f[2]) && (this.marginBottom = Math.max(this.marginBottom, e[2] + d[2]));
                    this.legend && this.legend.display && this.legend.adjustMargins(f, d);
                    u(this, "getMargins");
                    c || this.getAxisMargins()
                };
                w.prototype.getAxisMargins = function () {
                    var c = this,
                        d = c.axisOffset = [0, 0, 0, 0],
                        f = c.colorAxis,
                        e = c.margin,
                        g = function (a) {
                            a.forEach(function (a) {
                                a.visible && a.getOffset()
                            })
                        };
                    c.hasCartesianSeries ? g(c.axes) : f && f.length && g(f);
                    R.forEach(function (f, g) {
                        a(e[g]) || (c[f] += d[g])
                    });
                    c.setChartSize()
                };
                w.prototype.reflow = function (c) {
                    var d = this,
                        f = d.options.chart,
                        e = d.renderTo,
                        g = a(f.width) && a(f.height),
                        h = f.width || B(e, "width");
                    f = f.height || B(e, "height");
                    e = c ? c.target : p;
                    if (!g && !d.isPrinting && h && f && (e === p || e === y)) {
                        if (h !== d.containerWidth || f !== d.containerHeight) H.clearTimeout(d.reflowTimeout), d.reflowTimeout = Q(function () {
                            d.container && d.setSize(void 0, void 0, !1)
                        }, c ? 100 : 0);
                        d.containerWidth = h;
                        d.containerHeight = f
                    }
                };
                w.prototype.setReflow = function (a) {
                    var c = this;
                    !1 === a || this.unbindReflow ? !1 ===
                        a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = t(p, "resize", function (a) {
                            c.options && c.reflow(a)
                        }), t(this, "destroy", this.unbindReflow))
                };
                w.prototype.setSize = function (a, c, d) {
                    var f = this,
                        e = f.renderer;
                    f.isResizing += 1;
                    Z(d, f);
                    d = e.globalAnimation;
                    f.oldChartHeight = f.chartHeight;
                    f.oldChartWidth = f.chartWidth;
                    "undefined" !== typeof a && (f.options.chart.width = a);
                    "undefined" !== typeof c && (f.options.chart.height = c);
                    f.getChartSize();
                    f.styledMode || (d ? n : m)(f.container, {
                        width: f.chartWidth +
                            "px",
                        height: f.chartHeight + "px"
                    }, d);
                    f.setChartSize(!0);
                    e.setSize(f.chartWidth, f.chartHeight, d);
                    f.axes.forEach(function (a) {
                        a.isDirty = !0;
                        a.setScale()
                    });
                    f.isDirtyLegend = !0;
                    f.isDirtyBox = !0;
                    f.layOutTitles();
                    f.getMargins();
                    f.redraw(d);
                    f.oldChartHeight = null;
                    u(f, "resize");
                    Q(function () {
                        f && u(f, "endResize", null, function () {
                            --f.isResizing
                        })
                    }, v(d).duration)
                };
                w.prototype.setChartSize = function (a) {
                    var c = this.inverted,
                        d = this.renderer,
                        f = this.chartWidth,
                        e = this.chartHeight,
                        g = this.options.chart,
                        h = this.spacing,
                        k = this.clipOffset,
                        m, b, n, r;
                    this.plotLeft = m = Math.round(this.plotLeft);
                    this.plotTop = b = Math.round(this.plotTop);
                    this.plotWidth = n = Math.max(0, Math.round(f - m - this.marginRight));
                    this.plotHeight = r = Math.max(0, Math.round(e - b - this.marginBottom));
                    this.plotSizeX = c ? r : n;
                    this.plotSizeY = c ? n : r;
                    this.plotBorderWidth = g.plotBorderWidth || 0;
                    this.spacingBox = d.spacingBox = {
                        x: h[3],
                        y: h[0],
                        width: f - h[3] - h[1],
                        height: e - h[0] - h[2]
                    };
                    this.plotBox = d.plotBox = {
                        x: m,
                        y: b,
                        width: n,
                        height: r
                    };
                    f = 2 * Math.floor(this.plotBorderWidth / 2);
                    c = Math.ceil(Math.max(f, k[3]) / 2);
                    d = Math.ceil(Math.max(f, k[0]) / 2);
                    this.clipBox = {
                        x: c,
                        y: d,
                        width: Math.floor(this.plotSizeX - Math.max(f, k[1]) / 2 - c),
                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, k[2]) / 2 - d))
                    };
                    a || this.axes.forEach(function (a) {
                        a.setAxisSize();
                        a.setAxisTranslation()
                    });
                    u(this, "afterSetChartSize", {
                        skipAxes: a
                    })
                };
                w.prototype.resetMargins = function () {
                    u(this, "resetMargins");
                    var a = this,
                        c = a.options.chart;
                    ["margin", "spacing"].forEach(function (d) {
                        var f = c[d],
                            e = P(f) ? f : [f, f, f, f];
                        ["Top", "Right", "Bottom", "Left"].forEach(function (f,
                            g) {
                            a[d][g] = L(c[d + f], e[g])
                        })
                    });
                    R.forEach(function (c, d) {
                        a[c] = L(a.margin[d], a.spacing[d])
                    });
                    a.axisOffset = [0, 0, 0, 0];
                    a.clipOffset = [0, 0, 0, 0]
                };
                w.prototype.drawChartBox = function () {
                    var a = this.options.chart,
                        c = this.renderer,
                        d = this.chartWidth,
                        f = this.chartHeight,
                        e = this.chartBackground,
                        g = this.plotBackground,
                        h = this.plotBorder,
                        k = this.styledMode,
                        m = this.plotBGImage,
                        b = a.backgroundColor,
                        n = a.plotBackgroundColor,
                        r = a.plotBackgroundImage,
                        p, x = this.plotLeft,
                        v = this.plotTop,
                        l = this.plotWidth,
                        t = this.plotHeight,
                        G = this.plotBox,
                        B = this.clipRect,
                        K = this.clipBox,
                        y = "animate";
                    e || (this.chartBackground = e = c.rect().addClass("highcharts-background").add(), y = "attr");
                    if (k) var L = p = e.strokeWidth();
                    else {
                        L = a.borderWidth || 0;
                        p = L + (a.shadow ? 8 : 0);
                        b = {
                            fill: b || "none"
                        };
                        if (L || e["stroke-width"]) b.stroke = a.borderColor, b["stroke-width"] = L;
                        e.attr(b).shadow(a.shadow)
                    }
                    e[y]({
                        x: p / 2,
                        y: p / 2,
                        width: d - p - L % 2,
                        height: f - p - L % 2,
                        r: a.borderRadius
                    });
                    y = "animate";
                    g || (y = "attr", this.plotBackground = g = c.rect().addClass("highcharts-plot-background").add());
                    g[y](G);
                    k || (g.attr({
                        fill: n ||
                            "none"
                    }).shadow(a.plotShadow), r && (m ? (r !== m.attr("href") && m.attr("href", r), m.animate(G)) : this.plotBGImage = c.image(r, x, v, l, t).add()));
                    B ? B.animate({
                        width: K.width,
                        height: K.height
                    }) : this.clipRect = c.clipRect(K);
                    y = "animate";
                    h || (y = "attr", this.plotBorder = h = c.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                    }).add());
                    k || h.attr({
                        stroke: a.plotBorderColor,
                        "stroke-width": a.plotBorderWidth || 0,
                        fill: "none"
                    });
                    h[y](h.crisp({
                        x: x,
                        y: v,
                        width: l,
                        height: t
                    }, -h.strokeWidth()));
                    this.isDirtyBox = !1;
                    u(this, "afterDrawChartBox")
                };
                w.prototype.propFromSeries = function () {
                    var a = this,
                        c = a.options.chart,
                        d, f = a.options.series,
                        e, g;
                    ["inverted", "angular", "polar"].forEach(function (h) {
                        d = A[c.type || c.defaultSeriesType];
                        g = c[h] || d && d.prototype[h];
                        for (e = f && f.length; !g && e--;)(d = A[f[e].type]) && d.prototype[h] && (g = !0);
                        a[h] = g
                    })
                };
                w.prototype.linkSeries = function () {
                    var a = this,
                        c = a.series;
                    c.forEach(function (a) {
                        a.linkedSeries.length = 0
                    });
                    c.forEach(function (c) {
                        var d = c.options.linkedTo;
                        J(d) && (d = ":previous" === d ? a.series[c.index - 1] : a.get(d)) && d.linkedParent !==
                            c && (d.linkedSeries.push(c), c.linkedParent = d, d.enabledDataSorting && c.setDataSortingOptions(), c.visible = L(c.options.visible, d.options.visible, c.visible))
                    });
                    u(this, "afterLinkSeries")
                };
                w.prototype.renderSeries = function () {
                    this.series.forEach(function (a) {
                        a.translate();
                        a.render()
                    })
                };
                w.prototype.renderLabels = function () {
                    var a = this,
                        c = a.options.labels;
                    c.items && c.items.forEach(function (d) {
                        var f = e(c.style, d.style),
                            g = N(f.left) + a.plotLeft,
                            h = N(f.top) + a.plotTop + 12;
                        delete f.left;
                        delete f.top;
                        a.renderer.text(d.html,
                            g, h).attr({
                            zIndex: 2
                        }).css(f).add()
                    })
                };
                w.prototype.render = function () {
                    var a = this.axes,
                        c = this.colorAxis,
                        d = this.renderer,
                        f = this.options,
                        e = 0,
                        g = function (a) {
                            a.forEach(function (a) {
                                a.visible && a.render()
                            })
                        };
                    this.setTitle();
                    this.legend = new q(this, f.legend);
                    this.getStacks && this.getStacks();
                    this.getMargins(!0);
                    this.setChartSize();
                    f = this.plotWidth;
                    a.some(function (a) {
                        if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return e = 21, !0
                    });
                    var h = this.plotHeight = Math.max(this.plotHeight - e, 0);
                    a.forEach(function (a) {
                        a.setScale()
                    });
                    this.getAxisMargins();
                    var k = 1.1 < f / this.plotWidth;
                    var m = 1.05 < h / this.plotHeight;
                    if (k || m) a.forEach(function (a) {
                        (a.horiz && k || !a.horiz && m) && a.setTickInterval(!0)
                    }), this.getMargins();
                    this.drawChartBox();
                    this.hasCartesianSeries ? g(a) : c && c.length && g(c);
                    this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({
                        zIndex: 3
                    }).add());
                    this.renderSeries();
                    this.renderLabels();
                    this.addCredits();
                    this.setResponsive && this.setResponsive();
                    this.updateContainerScaling();
                    this.hasRendered = !0
                };
                w.prototype.addCredits = function (a) {
                    var c =
                        this,
                        d = f(!0, this.options.credits, a);
                    d.enabled && !this.credits && (this.credits = this.renderer.text(d.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        d.href && (p.location.href = d.href)
                    }).attr({
                        align: d.position.align,
                        zIndex: 8
                    }), c.styledMode || this.credits.css(d.style), this.credits.add().align(d.position), this.credits.update = function (a) {
                        c.credits = c.credits.destroy();
                        c.addCredits(a)
                    })
                };
                w.prototype.updateContainerScaling = function () {
                    var a = this.container;
                    if (2 < a.offsetWidth &&
                        2 < a.offsetHeight && a.getBoundingClientRect) {
                        var c = a.getBoundingClientRect(),
                            d = c.width / a.offsetWidth;
                        a = c.height / a.offsetHeight;
                        1 !== d || 1 !== a ? this.containerScaling = {
                            scaleX: d,
                            scaleY: a
                        } : delete this.containerScaling
                    }
                };
                w.prototype.destroy = function () {
                    var a = this,
                        d = a.axes,
                        f = a.series,
                        e = a.container,
                        g, m = e && e.parentNode;
                    u(a, "destroy");
                    a.renderer.forExport ? k(I, a) : I[a.index] = void 0;
                    b.chartCount--;
                    a.renderTo.removeAttribute("data-highcharts-chart");
                    aa(a);
                    for (g = d.length; g--;) d[g] = d[g].destroy();
                    this.scroller && this.scroller.destroy &&
                        this.scroller.destroy();
                    for (g = f.length; g--;) f[g] = f[g].destroy();
                    "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (c) {
                        var d = a[c];
                        d && d.destroy && (a[c] = d.destroy())
                    });
                    e && (e.innerHTML = "", aa(e), m && h(e));
                    c(a, function (c, d) {
                        delete a[d]
                    })
                };
                w.prototype.firstRender = function () {
                    var a = this,
                        c = a.options;
                    if (!a.isReadyToRender || a.isReadyToRender()) {
                        a.getContainer();
                        a.resetMargins();
                        a.setChartSize();
                        a.propFromSeries();
                        a.getAxes();
                        (O(c.series) ? c.series : []).forEach(function (c) {
                            a.initSeries(c)
                        });
                        a.linkSeries();
                        a.setSeriesData();
                        u(a, "beforeRender");
                        C && (a.pointer = b.hasTouch || !p.PointerEvent && !p.MSPointerEvent ? new C(a, c) : new z(a, c));
                        a.render();
                        if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
                        a.temporaryDisplay(!0)
                    }
                };
                w.prototype.onload = function () {
                    this.callbacks.concat([this.callback]).forEach(function (a) {
                        a && "undefined" !== typeof this.index && a.apply(this, [this])
                    }, this);
                    u(this, "load");
                    u(this, "render");
                    a(this.index) && this.setReflow(this.options.chart.reflow);
                    this.hasLoaded = !0
                };
                return w
            }();
        T.prototype.callbacks = [];
        b.chart = function (a, c, d) {
            return new T(a, c, d)
        };
        return b.Chart = T
    });
    M(q, "Extensions/ScrollablePlotArea.js", [q["Core/Chart/Chart.js"], q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b, q) {
        var z = q.addEvent,
            w = q.createElement,
            C = q.pick,
            F = q.stop;
        "";
        z(l, "afterSetChartSize", function (l) {
            var q = this.options.chart.scrollablePlotArea,
                y = q && q.minWidth;
            q = q && q.minHeight;
            if (!this.renderer.forExport) {
                if (y) {
                    if (this.scrollablePixelsX =
                        y = Math.max(0, y - this.chartWidth)) {
                        this.plotWidth += y;
                        this.inverted ? (this.clipBox.height += y, this.plotBox.height += y) : (this.clipBox.width += y, this.plotBox.width += y);
                        var A = {
                            1: {
                                name: "right",
                                value: y
                            }
                        }
                    }
                } else q && (this.scrollablePixelsY = y = Math.max(0, q - this.chartHeight)) && (this.plotHeight += y, this.inverted ? (this.clipBox.width += y, this.plotBox.width += y) : (this.clipBox.height += y, this.plotBox.height += y), A = {
                    2: {
                        name: "bottom",
                        value: y
                    }
                });
                A && !l.skipAxes && this.axes.forEach(function (p) {
                    A[p.side] ? p.getPlotLinePath = function () {
                        var l =
                            A[p.side].name,
                            t = this[l];
                        this[l] = t - A[p.side].value;
                        var n = b.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this[l] = t;
                        return n
                    } : (p.setAxisSize(), p.setAxisTranslation())
                })
            }
        });
        z(l, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        l.prototype.setUpScrolling = function () {
            var b = this,
                l = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (l.overflowX =
                "auto");
            this.scrollablePixelsY && (l.overflowY = "auto");
            this.scrollingParent = w("div", {
                className: "highcharts-scrolling-parent"
            }, {
                position: "relative"
            }, this.renderTo);
            this.scrollingContainer = w("div", {
                className: "highcharts-scrolling"
            }, l, this.scrollingParent);
            z(this.scrollingContainer, "scroll", function () {
                b.pointer && delete b.pointer.chartPosition
            });
            this.innerContainer = w("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling =
                null
        };
        l.prototype.moveFixedElements = function () {
            var b = this.container,
                l = this.fixedRenderer,
                y = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                q;
            this.scrollablePixelsX && !this.inverted ? q = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? q = ".highcharts-xaxis" :
                this.scrollablePixelsY && !this.inverted ? q = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (q = ".highcharts-yaxis");
            y.push(q, q + "-labels");
            y.forEach(function (p) {
                [].forEach.call(b.querySelectorAll(p), function (b) {
                    (b.namespaceURI === l.SVG_NS ? l.box : l.box.parentNode).appendChild(b);
                    b.style.pointerEvents = "auto"
                })
            })
        };
        l.prototype.applyFixed = function () {
            var l, q, y = !this.fixedDiv,
                A = this.options.chart.scrollablePlotArea;
            y ? (this.fixedDiv = w("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2,
                    top: 0
                }, null, !0), null === (l = this.scrollingContainer) || void 0 === l ? void 0 : l.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = l = new b.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight, null === (q = this.options.chart) || void 0 === q ? void 0 : q.style), this.scrollableMask = l.path().attr({
                    fill: this.options.chart.backgroundColor || "#fff",
                    "fill-opacity": C(A.opacity, .85),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(),
                this.moveFixedElements(), z(this, "afterShowResetZoom", this.moveFixedElements), z(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            q = this.chartWidth + (this.scrollablePixelsX || 0);
            l = this.chartHeight + (this.scrollablePixelsY || 0);
            F(this.container);
            this.container.style.width = q + "px";
            this.container.style.height = l + "px";
            this.renderer.boxWrapper.attr({
                width: q,
                height: l,
                viewBox: [0, 0, q, l].join(" ")
            });
            this.chartBackground.attr({
                width: q,
                height: l
            });
            this.scrollingContainer.style.height =
                this.chartHeight + "px";
            y && (A.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * A.scrollPositionX), A.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * A.scrollPositionY));
            l = this.axisOffset;
            y = this.plotTop - l[0] - 1;
            A = this.plotLeft - l[3] - 1;
            q = this.plotTop + this.plotHeight + l[2] + 1;
            l = this.plotLeft + this.plotWidth + l[1] + 1;
            var p = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                E = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            y = this.scrollablePixelsX ? [
                ["M", 0, y],
                ["L", this.plotLeft - 1, y],
                ["L", this.plotLeft - 1, q],
                ["L", 0, q],
                ["Z"],
                ["M", p, y],
                ["L", this.chartWidth, y],
                ["L", this.chartWidth, q],
                ["L", p, q],
                ["Z"]
            ] : this.scrollablePixelsY ? [
                ["M", A, 0],
                ["L", A, this.plotTop - 1],
                ["L", l, this.plotTop - 1],
                ["L", l, 0],
                ["Z"],
                ["M", A, E],
                ["L", A, this.chartHeight],
                ["L", l, this.chartHeight],
                ["L", l, E],
                ["Z"]
            ] : [
                ["M", 0, 0]
            ];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: y
            })
        }
    });
    M(q, "Core/Axis/StackingAxis.js", [q["Core/Utilities.js"]], function (l) {
        var b = l.addEvent,
            q = l.destroyObjectProperties,
            z = l.fireEvent,
            w = l.getDeferredAnimation,
            C = l.objectEach,
            F = l.pick,
            H = function () {
                function b(b) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = b
                }
                b.prototype.buildStacks = function () {
                    var b = this.axis,
                        l = b.series,
                        p = F(b.options.reversedStacks, !0),
                        q = l.length,
                        t;
                    if (!b.isXAxis) {
                        this.usePercentage = !1;
                        for (t = q; t--;) {
                            var n = l[p ? t : q - t - 1];
                            n.setStackedPoints();
                            n.setGroupedPoints()
                        }
                        for (t = 0; t < q; t++) l[t].modifyStacks();
                        z(b, "afterBuildStacks")
                    }
                };
                b.prototype.cleanStacks = function () {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var b =
                            this.stacks = this.oldStacks;
                        C(b, function (b) {
                            C(b, function (b) {
                                b.cumulative = b.total
                            })
                        })
                    }
                };
                b.prototype.resetStacks = function () {
                    var b = this,
                        l = b.stacks;
                    b.axis.isXAxis || C(l, function (p) {
                        C(p, function (l, t) {
                            l.touched < b.stacksTouched ? (l.destroy(), delete p[t]) : (l.total = null, l.cumulative = null)
                        })
                    })
                };
                b.prototype.renderStackTotals = function () {
                    var b = this.axis,
                        l = b.chart,
                        p = l.renderer,
                        q = this.stacks;
                    b = w(l, b.options.stackLabels.animation);
                    var t = this.stackTotalGroup = this.stackTotalGroup || p.g("stack-labels").attr({
                        visibility: "visible",
                        zIndex: 6,
                        opacity: 0
                    }).add();
                    t.translate(l.plotLeft, l.plotTop);
                    C(q, function (b) {
                        C(b, function (b) {
                            b.render(t)
                        })
                    });
                    t.animate({
                        opacity: 1
                    }, b)
                };
                return b
            }();
        return function () {
            function l() {}
            l.compose = function (q) {
                b(q, "init", l.onInit);
                b(q, "destroy", l.onDestroy)
            };
            l.onDestroy = function () {
                var b = this.stacking;
                if (b) {
                    var l = b.stacks;
                    C(l, function (b, y) {
                        q(b);
                        l[y] = null
                    });
                    b && b.stackTotalGroup && b.stackTotalGroup.destroy()
                }
            };
            l.onInit = function () {
                this.stacking || (this.stacking = new H(this))
            };
            return l
        }()
    });
    M(q, "Mixins/LegendSymbol.js",
        [q["Core/Globals.js"], q["Core/Utilities.js"]],
        function (l, b) {
            var q = b.merge,
                z = b.pick;
            return l.LegendSymbolMixin = {
                drawRectangle: function (b, l) {
                    var q = b.symbolHeight,
                        w = b.options.squareSymbol;
                    l.legendSymbol = this.chart.renderer.rect(w ? (b.symbolWidth - q) / 2 : 0, b.baseline - q + 1, w ? q : b.symbolWidth, q, z(b.options.symbolRadius, q / 2)).addClass("highcharts-point").attr({
                        zIndex: 3
                    }).add(l.legendGroup)
                },
                drawLineMarker: function (b) {
                    var l = this.options,
                        w = l.marker,
                        H = b.symbolWidth,
                        I = b.symbolHeight,
                        y = I / 2,
                        A = this.chart.renderer,
                        p =
                        this.legendGroup;
                    b = b.baseline - Math.round(.3 * b.fontMetrics.b);
                    var E = {};
                    this.chart.styledMode || (E = {
                        "stroke-width": l.lineWidth || 0
                    }, l.dashStyle && (E.dashstyle = l.dashStyle));
                    this.legendLine = A.path([
                        ["M", 0, b],
                        ["L", H, b]
                    ]).addClass("highcharts-graph").attr(E).add(p);
                    w && !1 !== w.enabled && H && (l = Math.min(z(w.radius, y), y), 0 === this.symbol.indexOf("url") && (w = q(w, {
                        width: I,
                        height: I
                    }), l = 0), this.legendSymbol = w = A.symbol(this.symbol, H / 2 - l, b - l, 2 * l, 2 * l, w).addClass("highcharts-point").add(p), w.isMarker = !0)
                }
            }
        });
    M(q, "Core/Series/Point.js",
        [q["Core/Globals.js"], q["Core/Utilities.js"]],
        function (l, b) {
            var q = b.animObject,
                z = b.defined,
                w = b.erase,
                C = b.extend,
                F = b.fireEvent,
                H = b.format,
                I = b.getNestedProperty,
                y = b.isArray,
                A = b.isNumber,
                p = b.isObject,
                E = b.syncTimeout,
                t = b.pick,
                n = b.removeEvent,
                v = b.uniqueKey;
            "";
            b = function () {
                function b() {
                    this.colorIndex = this.category = void 0;
                    this.formatPrefix = "point";
                    this.id = void 0;
                    this.isNull = !1;
                    this.percentage = this.options = this.name = void 0;
                    this.selected = !1;
                    this.total = this.series = void 0;
                    this.visible = !0;
                    this.x = void 0
                }
                b.prototype.animateBeforeDestroy =
                    function () {
                        var b = this,
                            m = {
                                x: b.startXPos,
                                opacity: 0
                            },
                            a, h = b.getGraphicalProps();
                        h.singular.forEach(function (h) {
                            a = "dataLabel" === h;
                            b[h] = b[h].animate(a ? {
                                x: b[h].startXPos,
                                y: b[h].startYPos,
                                opacity: 0
                            } : m)
                        });
                        h.plural.forEach(function (a) {
                            b[a].forEach(function (a) {
                                a.element && a.animate(C({
                                    x: b.startXPos
                                }, a.startYPos ? {
                                    x: a.startXPos,
                                    y: a.startYPos
                                } : {}))
                            })
                        })
                    };
                b.prototype.applyOptions = function (n, m) {
                    var a = this.series,
                        h = a.options.pointValKey || a.pointValKey;
                    n = b.prototype.optionsToObject.call(this, n);
                    C(this, n);
                    this.options =
                        this.options ? C(this.options, n) : n;
                    n.group && delete this.group;
                    n.dataLabels && delete this.dataLabels;
                    h && (this.y = b.prototype.getNestedProperty.call(this, h));
                    this.formatPrefix = (this.isNull = t(this.isValid && !this.isValid(), null === this.x || !A(this.y))) ? "null" : "point";
                    this.selected && (this.state = "select");
                    "name" in this && "undefined" === typeof m && a.xAxis && a.xAxis.hasNames && (this.x = a.xAxis.nameToX(this));
                    "undefined" === typeof this.x && a && (this.x = "undefined" === typeof m ? a.autoIncrement(this) : m);
                    return this
                };
                b.prototype.destroy =
                    function () {
                        function b() {
                            if (m.graphic || m.dataLabel || m.dataLabels) n(m), m.destroyElements();
                            for (e in m) m[e] = null
                        }
                        var m = this,
                            a = m.series,
                            h = a.chart;
                        a = a.options.dataSorting;
                        var k = h.hoverPoints,
                            g = q(m.series.chart.renderer.globalAnimation),
                            e;
                        m.legendItem && h.legend.destroyItem(m);
                        k && (m.setState(), w(k, m), k.length || (h.hoverPoints = null));
                        if (m === h.hoverPoint) m.onMouseOut();
                        a && a.enabled ? (this.animateBeforeDestroy(), E(b, g.duration)) : b();
                        h.pointCount--
                    };
                b.prototype.destroyElements = function (b) {
                    var m = this;
                    b = m.getGraphicalProps(b);
                    b.singular.forEach(function (a) {
                        m[a] = m[a].destroy()
                    });
                    b.plural.forEach(function (a) {
                        m[a].forEach(function (a) {
                            a.element && a.destroy()
                        });
                        delete m[a]
                    })
                };
                b.prototype.firePointEvent = function (b, m, a) {
                    var h = this,
                        k = this.series.options;
                    (k.point.events[b] || h.options && h.options.events && h.options.events[b]) && h.importEvents();
                    "click" === b && k.allowPointSelect && (a = function (a) {
                        h.select && h.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                    });
                    F(h, b, m, a)
                };
                b.prototype.getClassName = function () {
                    return "highcharts-point" + (this.selected ?
                        " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                };
                b.prototype.getGraphicalProps = function (b) {
                    var m = this,
                        a = [],
                        h, k = {
                            singular: [],
                            plural: []
                        };
                    b = b || {
                        graphic: 1,
                        dataLabel: 1
                    };
                    b.graphic && a.push("graphic", "shadowGroup");
                    b.dataLabel && a.push("dataLabel", "dataLabelUpper", "connector");
                    for (h = a.length; h--;) {
                        var g = a[h];
                        m[g] && k.singular.push(g)
                    } ["dataLabel", "connector"].forEach(function (a) {
                        var e = a + "s";
                        b[a] && m[e] && k.plural.push(e)
                    });
                    return k
                };
                b.prototype.getLabelConfig = function () {
                    return {
                        x: this.category,
                        y: this.y,
                        color: this.color,
                        colorIndex: this.colorIndex,
                        key: this.name || this.category,
                        series: this.series,
                        point: this,
                        percentage: this.percentage,
                        total: this.total || this.stackTotal
                    }
                };
                b.prototype.getNestedProperty = function (b) {
                    if (b) return 0 ===
                        b.indexOf("custom.") ? I(b, this.options) : this[b]
                };
                b.prototype.getZone = function () {
                    var b = this.series,
                        m = b.zones;
                    b = b.zoneAxis || "y";
                    var a = 0,
                        h;
                    for (h = m[a]; this[b] >= h.value;) h = m[++a];
                    this.nonZonedColor || (this.nonZonedColor = this.color);
                    this.color = h && h.color && !this.options.color ? h.color : this.nonZonedColor;
                    return h
                };
                b.prototype.hasNewShapeType = function () {
                    return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
                };
                b.prototype.init = function (b, m, a) {
                    this.series = b;
                    this.applyOptions(m,
                        a);
                    this.id = z(this.id) ? this.id : v();
                    this.resolveColor();
                    b.chart.pointCount++;
                    F(this, "afterInit");
                    return this
                };
                b.prototype.optionsToObject = function (n) {
                    var m = {},
                        a = this.series,
                        h = a.options.keys,
                        k = h || a.pointArrayMap || ["y"],
                        g = k.length,
                        e = 0,
                        p = 0;
                    if (A(n) || null === n) m[k[0]] = n;
                    else if (y(n))
                        for (!h && n.length > g && (a = typeof n[0], "string" === a ? m.name = n[0] : "number" === a && (m.x = n[0]), e++); p < g;) h && "undefined" === typeof n[e] || (0 < k[p].indexOf(".") ? b.prototype.setNestedProperty(m, n[e], k[p]) : m[k[p]] = n[e]), e++, p++;
                    else "object" ===
                        typeof n && (m = n, n.dataLabels && (a._hasPointLabels = !0), n.marker && (a._hasPointMarkers = !0));
                    return m
                };
                b.prototype.resolveColor = function () {
                    var b = this.series;
                    var m = b.chart.options.chart.colorCount;
                    var a = b.chart.styledMode;
                    delete this.nonZonedColor;
                    a || this.options.color || (this.color = b.color);
                    b.options.colorByPoint ? (a || (m = b.options.colors || b.chart.options.colors, this.color = this.color || m[b.colorCounter], m = m.length), a = b.colorCounter, b.colorCounter++, b.colorCounter === m && (b.colorCounter = 0)) : a = b.colorIndex;
                    this.colorIndex =
                        t(this.colorIndex, a)
                };
                b.prototype.setNestedProperty = function (b, m, a) {
                    a.split(".").reduce(function (a, b, g, e) {
                        a[b] = e.length - 1 === g ? m : p(a[b], !0) ? a[b] : {};
                        return a[b]
                    }, b);
                    return b
                };
                b.prototype.tooltipFormatter = function (b) {
                    var m = this.series,
                        a = m.tooltipOptions,
                        h = t(a.valueDecimals, ""),
                        k = a.valuePrefix || "",
                        g = a.valueSuffix || "";
                    m.chart.styledMode && (b = m.chart.tooltip.styledModeFormat(b));
                    (m.pointArrayMap || ["y"]).forEach(function (a) {
                        a = "{point." + a;
                        if (k || g) b = b.replace(RegExp(a + "}", "g"), k + a + "}" + g);
                        b = b.replace(RegExp(a +
                            "}", "g"), a + ":,." + h + "f}")
                    });
                    return H(b, {
                        point: this,
                        series: this.series
                    }, m.chart)
                };
                return b
            }();
            return l.Point = b
        });
    M(q, "Core/Series/Series.js", [q["Core/Globals.js"], q["Mixins/LegendSymbol.js"], q["Core/Options.js"], q["Core/Series/Point.js"], q["Core/Renderer/SVG/SVGElement.js"], q["Core/Utilities.js"]], function (l, b, q, z, w, C) {
        var F = q.defaultOptions,
            H = C.addEvent,
            I = C.animObject,
            y = C.arrayMax,
            A = C.arrayMin,
            p = C.clamp,
            E = C.correctFloat,
            t = C.defined,
            n = C.erase,
            v = C.error,
            D = C.extend,
            r = C.find,
            m = C.fireEvent,
            a = C.getNestedProperty,
            h = C.isArray,
            k = C.isFunction,
            g = C.isNumber,
            e = C.isString,
            x = C.merge,
            u = C.objectEach,
            B = C.pick,
            O = C.removeEvent;
        q = C.seriesType;
        var G = C.splat,
            K = C.syncTimeout;
        "";
        var P = l.seriesTypes,
            J = l.win;
        l.Series = q("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                animation: {},
                align: "center",
                defer: !0,
                formatter: function () {
                    var a = this.series.chart.numberFormatter;
                    return "number" !== typeof this.y ? "" : a(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            isCartesian: !0,
            parallelArrays: ["x", "y"],
            pointClass: z,
            requireSorting: !0,
            sorted: !0,
            init: function (a, d) {
                m(this, "init", {
                    options: d
                });
                var c = this,
                    f = a.series,
                    e;
                this.eventOptions = this.eventOptions || {};
                this.eventsToUnbind = [];
                c.chart = a;
                c.options = d = c.setOptions(d);
                c.linkedSeries = [];
                c.bindAxes();
                D(c, {
                    name: d.name,
                    state: "",
                    visible: !1 !== d.visible,
                    selected: !0 === d.selected
                });
                var g = d.events;
                u(g, function (a, d) {
                    k(a) && c.eventOptions[d] !== a && (k(c.eventOptions[d]) && O(c, d, c.eventOptions[d]), c.eventOptions[d] = a, H(c, d, a))
                });
                if (g && g.click || d.point && d.point.events && d.point.events.click || d.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                c.parallelArrays.forEach(function (a) {
                    c[a + "Data"] || (c[a + "Data"] = [])
                });
                c.isCartesian && (a.hasCartesianSeries = !0);
                f.length && (e = f[f.length - 1]);
                c._i = B(e && e._i, -1) + 1;
                c.opacity = c.options.opacity;
                a.orderSeries(this.insert(f));
                d.dataSorting && d.dataSorting.enabled ? c.setDataSortingOptions() : c.points || c.data || c.setData(d.data, !1);
                m(this, "afterInit")
            },
            is: function (a) {
                return P[a] && this instanceof P[a]
            },
            insert: function (a) {
                var d = this.options.index,
                    c;
                if (g(d)) {
                    for (c = a.length; c--;)
                        if (d >= B(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return B(c, a.length - 1)
            },
            bindAxes: function () {
                var a = this,
                    d = a.options,
                    c = a.chart,
                    e;
                m(this, "bindAxes", null, function () {
                    (a.axisTypes || []).forEach(function (f) {
                        c[f].forEach(function (c) {
                            e = c.options;
                            if (d[f] === e.index || "undefined" !== typeof d[f] && d[f] === e.id || "undefined" === typeof d[f] && 0 === e.index) a.insert(c.series), a[f] = c, c.isDirty = !0
                        });
                        a[f] || a.optionalAxis === f || v(18, !0, c)
                    })
                });
                m(this, "afterBindAxes")
            },
            updateParallelArrays: function (a, d) {
                var c = a.series,
                    f = arguments,
                    e = g(d) ? function (f) {
                        var e = "y" === f && c.toYData ? c.toYData(a) : a[f];
                        c[f + "Data"][d] = e
                    } : function (a) {
                        Array.prototype[d].apply(c[a + "Data"], Array.prototype.slice.call(f, 2))
                    };
                c.parallelArrays.forEach(e)
            },
            hasData: function () {
                return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
            },
            autoIncrement: function () {
                var a = this.options,
                    d = this.xIncrement,
                    c, e = a.pointIntervalUnit,
                    g = this.chart.time;
                d = B(d, a.pointStart, 0);
                this.pointInterval = c = B(this.pointInterval, a.pointInterval, 1);
                e && (a = new g.Date(d), "day" === e ? g.set("Date", a, g.get("Date", a) + c) : "month" === e ? g.set("Month", a, g.get("Month", a) + c) : "year" === e && g.set("FullYear", a, g.get("FullYear",
                    a) + c), c = a.getTime() - d);
                this.xIncrement = d + c;
                return d
            },
            setDataSortingOptions: function () {
                var a = this.options;
                D(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                });
                t(a.pointRange) || (a.pointRange = 1)
            },
            setOptions: function (a) {
                var d = this.chart,
                    c = d.options,
                    f = c.plotOptions,
                    e = d.userOptions || {};
                a = x(a);
                d = d.styledMode;
                var g = {
                    plotOptions: f,
                    userOptions: a
                };
                m(this, "setOptions", g);
                var h = g.plotOptions[this.type],
                    b = e.plotOptions || {};
                this.userOptions = g.userOptions;
                e = x(h, f.series, e.plotOptions && e.plotOptions[this.type],
                    a);
                this.tooltipOptions = x(F.tooltip, F.plotOptions.series && F.plotOptions.series.tooltip, F.plotOptions[this.type].tooltip, c.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, a.tooltip);
                this.stickyTracking = B(a.stickyTracking, b[this.type] && b[this.type].stickyTracking, b.series && b.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
                null === h.marker && delete e.marker;
                this.zoneAxis = e.zoneAxis;
                c = this.zones = (e.zones || []).slice();
                !e.negativeColor && !e.negativeFillColor ||
                    e.zones || (f = {
                        value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                        className: "highcharts-negative"
                    }, d || (f.color = e.negativeColor, f.fillColor = e.negativeFillColor), c.push(f));
                c.length && t(c[c.length - 1].value) && c.push(d ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                m(this, "afterSetOptions", {
                    options: e
                });
                return e
            },
            getName: function () {
                return B(this.options.name, "Series " + (this.index + 1))
            },
            getCyclic: function (a, d, c) {
                var f = this.chart,
                    e = this.userOptions,
                    g = a + "Index",
                    h = a + "Counter",
                    b = c ? c.length : B(f.options.chart[a +
                        "Count"], f[a + "Count"]);
                if (!d) {
                    var k = B(e[g], e["_" + g]);
                    t(k) || (f.series.length || (f[h] = 0), e["_" + g] = k = f[h] % b, f[h] += 1);
                    c && (d = c[k])
                }
                "undefined" !== typeof k && (this[g] = k);
                this[a] = d
            },
            getColor: function () {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || F.plotOptions[this.type].color, this.chart.options.colors)
            },
            getPointsCollection: function () {
                return (this.hasGroupedData ? this.points : this.data) || []
            },
            getSymbol: function () {
                this.getCyclic("symbol",
                    this.options.marker.symbol, this.chart.options.symbols)
            },
            findPointIndex: function (a, d) {
                var c = a.id,
                    f = a.x,
                    e = this.points,
                    h, b = this.options.dataSorting;
                if (c) var k = this.chart.get(c);
                else if (this.linkedParent || this.enabledDataSorting) {
                    var m = b && b.matchByName ? "name" : "index";
                    k = r(e, function (c) {
                        return !c.touched && c[m] === a[m]
                    });
                    if (!k) return
                }
                if (k) {
                    var n = k && k.index;
                    "undefined" !== typeof n && (h = !0)
                }
                "undefined" === typeof n && g(f) && (n = this.xData.indexOf(f, d)); - 1 !== n && "undefined" !== typeof n && this.cropped && (n = n >= this.cropStart ?
                    n - this.cropStart : n);
                !h && e[n] && e[n].touched && (n = void 0);
                return n
            },
            drawLegendSymbol: b.drawLineMarker,
            updateData: function (a, d) {
                var c = this.options,
                    f = c.dataSorting,
                    e = this.points,
                    h = [],
                    b, k, m, n = this.requireSorting,
                    p = a.length === e.length,
                    r = !0;
                this.xIncrement = null;
                a.forEach(function (a, d) {
                    var k = t(a) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, a) || {};
                    var r = k.x;
                    if (k.id || g(r)) {
                        if (r = this.findPointIndex(k, m), -1 === r || "undefined" === typeof r ? h.push(a) : e[r] && a !== c.data[r] ? (e[r].update(a, !1, null, !1),
                                e[r].touched = !0, n && (m = r + 1)) : e[r] && (e[r].touched = !0), !p || d !== r || f && f.enabled || this.hasDerivedData) b = !0
                    } else h.push(a)
                }, this);
                if (b)
                    for (a = e.length; a--;)(k = e[a]) && !k.touched && k.remove && k.remove(!1, d);
                else !p || f && f.enabled ? r = !1 : (a.forEach(function (a, c) {
                    e[c].update && a !== e[c].y && e[c].update(a, !1, null, !1)
                }), h.length = 0);
                e.forEach(function (a) {
                    a && (a.touched = !1)
                });
                if (!r) return !1;
                h.forEach(function (a) {
                    this.addPoint(a, !1, null, null, !1)
                }, this);
                null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement =
                    y(this.xData), this.autoIncrement());
                return !0
            },
            setData: function (a, d, c, b) {
                var f = this,
                    k = f.points,
                    m = k && k.length || 0,
                    n, p = f.options,
                    r = f.chart,
                    u = p.dataSorting,
                    l = null,
                    x = f.xAxis;
                l = p.turboThreshold;
                var t = this.xData,
                    G = this.yData,
                    q = (n = f.pointArrayMap) && n.length,
                    K = p.keys,
                    y = 0,
                    J = 1,
                    L;
                a = a || [];
                n = a.length;
                d = B(d, !0);
                u && u.enabled && (a = this.sortData(a));
                !1 !== b && n && m && !f.cropped && !f.hasGroupedData && f.visible && !f.isSeriesBoosting && (L = this.updateData(a, c));
                if (!L) {
                    f.xIncrement = null;
                    f.colorCounter = 0;
                    this.parallelArrays.forEach(function (a) {
                        f[a +
                            "Data"].length = 0
                    });
                    if (l && n > l)
                        if (l = f.getFirstValidPoint(a), g(l))
                            for (c = 0; c < n; c++) t[c] = this.autoIncrement(), G[c] = a[c];
                        else if (h(l))
                        if (q)
                            for (c = 0; c < n; c++) b = a[c], t[c] = b[0], G[c] = b.slice(1, q + 1);
                        else
                            for (K && (y = K.indexOf("x"), J = K.indexOf("y"), y = 0 <= y ? y : 0, J = 0 <= J ? J : 1), c = 0; c < n; c++) b = a[c], t[c] = b[y], G[c] = b[J];
                    else v(12, !1, r);
                    else
                        for (c = 0; c < n; c++) "undefined" !== typeof a[c] && (b = {
                            series: f
                        }, f.pointClass.prototype.applyOptions.apply(b, [a[c]]), f.updateParallelArrays(b, c));
                    G && e(G[0]) && v(14, !0, r);
                    f.data = [];
                    f.options.data =
                        f.userOptions.data = a;
                    for (c = m; c--;) k[c] && k[c].destroy && k[c].destroy();
                    x && (x.minRange = x.userMinRange);
                    f.isDirty = r.isDirtyBox = !0;
                    f.isDirtyData = !!k;
                    c = !1
                }
                "point" === p.legendType && (this.processData(), this.generatePoints());
                d && r.redraw(c)
            },
            sortData: function (f) {
                var d = this,
                    c = d.options.dataSorting.sortKey || "y",
                    e = function (a, c) {
                        return t(c) && a.pointClass.prototype.optionsToObject.call({
                            series: a
                        }, c) || {}
                    };
                f.forEach(function (a, c) {
                    f[c] = e(d, a);
                    f[c].index = c
                }, this);
                f.concat().sort(function (d, f) {
                    d = a(c, d);
                    f = a(c, f);
                    return f <
                        d ? -1 : f > d ? 1 : 0
                }).forEach(function (a, c) {
                    a.x = c
                }, this);
                d.linkedSeries && d.linkedSeries.forEach(function (a) {
                    var c = a.options,
                        d = c.data;
                    c.dataSorting && c.dataSorting.enabled || !d || (d.forEach(function (c, g) {
                        d[g] = e(a, c);
                        f[g] && (d[g].x = f[g].x, d[g].index = g)
                    }), a.setData(d, !1))
                });
                return f
            },
            getProcessedData: function (a) {
                var d = this.xData,
                    c = this.yData,
                    f = d.length;
                var e = 0;
                var g = this.xAxis,
                    b = this.options;
                var h = b.cropThreshold;
                var k = a || this.getExtremesFromAll || b.getExtremesFromAll,
                    m = this.isCartesian;
                a = g && g.val2lin;
                b = !(!g || !g.logarithmic);
                var n = this.requireSorting;
                if (g) {
                    g = g.getExtremes();
                    var p = g.min;
                    var r = g.max
                }
                if (m && this.sorted && !k && (!h || f > h || this.forceCrop))
                    if (d[f - 1] < p || d[0] > r) d = [], c = [];
                    else if (this.yData && (d[0] < p || d[f - 1] > r)) {
                    e = this.cropData(this.xData, this.yData, p, r);
                    d = e.xData;
                    c = e.yData;
                    e = e.start;
                    var u = !0
                }
                for (h = d.length || 1; --h;)
                    if (f = b ? a(d[h]) - a(d[h - 1]) : d[h] - d[h - 1], 0 < f && ("undefined" === typeof l || f < l)) var l = f;
                    else 0 > f && n && (v(15, !1, this.chart), n = !1);
                return {
                    xData: d,
                    yData: c,
                    cropped: u,
                    cropStart: e,
                    closestPointRange: l
                }
            },
            processData: function (a) {
                var d =
                    this.xAxis;
                if (this.isCartesian && !this.isDirty && !d.isDirty && !this.yAxis.isDirty && !a) return !1;
                a = this.getProcessedData();
                this.cropped = a.cropped;
                this.cropStart = a.cropStart;
                this.processedXData = a.xData;
                this.processedYData = a.yData;
                this.closestPointRange = this.basePointRange = a.closestPointRange
            },
            cropData: function (a, d, c, e, g) {
                var f = a.length,
                    h = 0,
                    b = f,
                    k;
                g = B(g, this.cropShoulder);
                for (k = 0; k < f; k++)
                    if (a[k] >= c) {
                        h = Math.max(0, k - g);
                        break
                    } for (c = k; c < f; c++)
                    if (a[c] > e) {
                        b = c + g;
                        break
                    } return {
                    xData: a.slice(h, b),
                    yData: d.slice(h, b),
                    start: h,
                    end: b
                }
            },
            generatePoints: function () {
                var a = this.options,
                    d = a.data,
                    c = this.data,
                    e, g = this.processedXData,
                    h = this.processedYData,
                    b = this.pointClass,
                    k = g.length,
                    n = this.cropStart || 0,
                    p = this.hasGroupedData;
                a = a.keys;
                var r = [],
                    u;
                c || p || (c = [], c.length = d.length, c = this.data = c);
                a && p && (this.options.keys = !1);
                for (u = 0; u < k; u++) {
                    var l = n + u;
                    if (p) {
                        var x = (new b).init(this, [g[u]].concat(G(h[u])));
                        x.dataGroup = this.groupMap[u];
                        x.dataGroup.options && (x.options = x.dataGroup.options, D(x, x.dataGroup.options), delete x.dataLabels)
                    } else(x =
                        c[l]) || "undefined" === typeof d[l] || (c[l] = x = (new b).init(this, d[l], g[u]));
                    x && (x.index = l, r[u] = x)
                }
                this.options.keys = a;
                if (c && (k !== (e = c.length) || p))
                    for (u = 0; u < e; u++) u !== n || p || (u += k), c[u] && (c[u].destroyElements(), c[u].plotX = void 0);
                this.data = c;
                this.points = r;
                m(this, "afterGeneratePoints")
            },
            getXExtremes: function (a) {
                return {
                    min: A(a),
                    max: y(a)
                }
            },
            getExtremes: function (a, d) {
                var c = this.xAxis,
                    f = this.yAxis,
                    e = this.processedXData || this.xData,
                    b = [],
                    k = 0,
                    n = 0;
                var p = 0;
                var r = this.requireSorting ? this.cropShoulder : 0,
                    u = f ? f.positiveValuesOnly :
                    !1,
                    l;
                a = a || this.stackedYData || this.processedYData || [];
                f = a.length;
                c && (p = c.getExtremes(), n = p.min, p = p.max);
                for (l = 0; l < f; l++) {
                    var x = e[l];
                    var v = a[l];
                    var t = (g(v) || h(v)) && (v.length || 0 < v || !u);
                    x = d || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !c || (e[l + r] || x) >= n && (e[l - r] || x) <= p;
                    if (t && x)
                        if (t = v.length)
                            for (; t--;) g(v[t]) && (b[k++] = v[t]);
                        else b[k++] = v
                }
                a = {
                    dataMin: A(b),
                    dataMax: y(b)
                };
                m(this, "afterGetExtremes", {
                    dataExtremes: a
                });
                return a
            },
            applyExtremes: function () {
                var a = this.getExtremes();
                this.dataMin =
                    a.dataMin;
                this.dataMax = a.dataMax;
                return a
            },
            getFirstValidPoint: function (a) {
                for (var d = null, c = a.length, f = 0; null === d && f < c;) d = a[f], f++;
                return d
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    d = a.stacking,
                    c = this.xAxis,
                    e = c.categories,
                    b = this.enabledDataSorting,
                    k = this.yAxis,
                    n = this.points,
                    r = n.length,
                    u = !!this.modifyValue,
                    l, x = this.pointPlacementToXValue(),
                    v = !!x,
                    G = a.threshold,
                    q = a.startFromThreshold ? G : 0,
                    K, y = this.zoneAxis || "y",
                    J = Number.MAX_VALUE;
                for (l = 0; l <
                    r; l++) {
                    var D = n[l],
                        w = D.x,
                        A = D.y,
                        z = D.low,
                        P = d && k.stacking && k.stacking.stacks[(this.negStacks && A < (q ? 0 : G) ? "-" : "") + this.stackKey];
                    if (k.positiveValuesOnly && !k.validatePositiveValue(A) || c.positiveValuesOnly && !c.validatePositiveValue(w)) D.isNull = !0;
                    D.plotX = K = E(p(c.translate(w, 0, 0, 0, 1, x, "flags" === this.type), -1E5, 1E5));
                    if (d && this.visible && P && P[w]) {
                        var C = this.getStackIndicator(C, w, this.index);
                        if (!D.isNull) {
                            var O = P[w];
                            var I = O.points[C.key]
                        }
                    }
                    h(I) && (z = I[0], A = I[1], z === q && C.key === P[w].base && (z = B(g(G) && G, k.min)), k.positiveValuesOnly &&
                        0 >= z && (z = null), D.total = D.stackTotal = O.total, D.percentage = O.total && D.y / O.total * 100, D.stackY = A, this.irregularWidths || O.setOffset(this.pointXOffset || 0, this.barW || 0));
                    D.yBottom = t(z) ? p(k.translate(z, 0, 1, 0, 1), -1E5, 1E5) : null;
                    u && (A = this.modifyValue(A, D));
                    D.plotY = "number" === typeof A && Infinity !== A ? p(k.translate(A, 0, 1, 0, 1), -1E5, 1E5) : void 0;
                    D.isInside = this.isPointInside(D);
                    D.clientX = v ? E(c.translate(w, 0, 0, 0, 1, x)) : K;
                    D.negative = D[y] < (a[y + "Threshold"] || G || 0);
                    D.category = e && "undefined" !== typeof e[D.x] ? e[D.x] : D.x;
                    if (!D.isNull &&
                        !1 !== D.visible) {
                        "undefined" !== typeof F && (J = Math.min(J, Math.abs(K - F)));
                        var F = K
                    }
                    D.zone = this.zones.length && D.getZone();
                    !D.graphic && this.group && b && (D.isNew = !0)
                }
                this.closestPointRangePx = J;
                m(this, "afterTranslate")
            },
            getValidPoints: function (a, d, c) {
                var f = this.chart;
                return (a || this.points || []).filter(function (a) {
                    return d && !f.isInsidePlot(a.plotX, a.plotY, f.inverted) ? !1 : !1 !== a.visible && (c || !a.isNull)
                })
            },
            getClipBox: function (a, d) {
                var c = this.options,
                    f = this.chart,
                    e = f.inverted,
                    g = this.xAxis,
                    b = g && this.yAxis,
                    h = f.options.chart.scrollablePlotArea || {};
                a && !1 === c.clip && b ? a = e ? {
                    y: -f.chartWidth + b.len + b.pos,
                    height: f.chartWidth,
                    width: f.chartHeight,
                    x: -f.chartHeight + g.len + g.pos
                } : {
                    y: -b.pos,
                    height: f.chartHeight,
                    width: f.chartWidth,
                    x: -g.pos
                } : (a = this.clipBox || f.clipBox, d && (a.width = f.plotSizeX, a.x = (f.scrollablePixelsX || 0) * (h.scrollPositionX || 0)));
                return d ? {
                    width: a.width,
                    x: a.x
                } : a
            },
            setClip: function (a) {
                var d = this.chart,
                    c = this.options,
                    f = d.renderer,
                    e = d.inverted,
                    g = this.clipBox,
                    b = this.getClipBox(a),
                    h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, b.height,
                        c.xAxis, c.yAxis
                    ].join(),
                    k = d[h],
                    m = d[h + "m"];
                a && (b.width = 0, e && (b.x = d.plotHeight + (!1 !== c.clip ? 0 : d.plotTop)));
                k ? d.hasLoaded || k.attr(b) : (a && (d[h + "m"] = m = f.clipRect(e ? d.plotSizeX + 99 : -99, e ? -d.plotLeft : -d.plotTop, 99, e ? d.chartWidth : d.chartHeight)), d[h] = k = f.clipRect(b), k.count = {
                    length: 0
                });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                if (!1 !== c.clip || a) this.group.clip(a || g ? k : d.clipRect), this.markerGroup.clip(m), this.sharedClipKey = h;
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length),
                    0 === k.count.length && h && d[h] && (g || (d[h] = d[h].destroy()), d[h + "m"] && (d[h + "m"] = d[h + "m"].destroy())))
            },
            animate: function (a) {
                var d = this.chart,
                    c = I(this.options.animation);
                if (!d.hasRendered)
                    if (a) this.setClip(c);
                    else {
                        var f = this.sharedClipKey;
                        a = d[f];
                        var e = this.getClipBox(c, !0);
                        a && a.animate(e, c);
                        d[f + "m"] && d[f + "m"].animate({
                            width: e.width + 99,
                            x: e.x - (d.inverted ? 0 : 99)
                        }, c)
                    }
            },
            afterAnimate: function () {
                this.setClip();
                m(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points,
                    d = this.chart,
                    c, e, g = this.options.marker,
                    b = this[this.specialGroup] || this.markerGroup,
                    h = this.xAxis,
                    k = B(g.enabled, !h || h.isRadial ? !0 : null, this.closestPointRangePx >= g.enabledThreshold * g.radius);
                if (!1 !== g.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) {
                        var m = a[c];
                        var n = (e = m.graphic) ? "animate" : "attr";
                        var p = m.marker || {};
                        var r = !!m.marker;
                        if ((k && "undefined" === typeof p.enabled || p.enabled) && !m.isNull && !1 !== m.visible) {
                            var u = B(p.symbol, this.symbol);
                            var l = this.markerAttribs(m, m.selected && "select");
                            this.enabledDataSorting &&
                                (m.startXPos = h.reversed ? -l.width : h.width);
                            var x = !1 !== m.isInside;
                            e ? e[x ? "show" : "hide"](x).animate(l) : x && (0 < l.width || m.hasImage) && (m.graphic = e = d.renderer.symbol(u, l.x, l.y, l.width, l.height, r ? p : g).add(b), this.enabledDataSorting && d.hasRendered && (e.attr({
                                x: m.startXPos
                            }), n = "animate"));
                            e && "animate" === n && e[x ? "show" : "hide"](x).animate(l);
                            if (e && !d.styledMode) e[n](this.pointAttribs(m, m.selected && "select"));
                            e && e.addClass(m.getClassName(), !0)
                        } else e && (m.graphic = e.destroy())
                    }
            },
            markerAttribs: function (a, d) {
                var c = this.options,
                    f = c.marker,
                    e = a.marker || {},
                    g = e.symbol || f.symbol,
                    h = B(e.radius, f.radius);
                d && (f = f.states[d], d = e.states && e.states[d], h = B(d && d.radius, f && f.radius, h + (f && f.radiusPlus || 0)));
                a.hasImage = g && 0 === g.indexOf("url");
                a.hasImage && (h = 0);
                a = {
                    x: c.crisp ? Math.floor(a.plotX) - h : a.plotX - h,
                    y: a.plotY - h
                };
                h && (a.width = a.height = 2 * h);
                return a
            },
            pointAttribs: function (a, d) {
                var c = this.options.marker,
                    f = a && a.options,
                    e = f && f.marker || {},
                    g = this.color,
                    h = f && f.color,
                    b = a && a.color;
                f = B(e.lineWidth, c.lineWidth);
                var k = a && a.zone && a.zone.color;
                a = 1;
                g =
                    h || k || b || g;
                h = e.fillColor || c.fillColor || g;
                g = e.lineColor || c.lineColor || g;
                d = d || "normal";
                c = c.states[d];
                d = e.states && e.states[d] || {};
                f = B(d.lineWidth, c.lineWidth, f + B(d.lineWidthPlus, c.lineWidthPlus, 0));
                h = d.fillColor || c.fillColor || h;
                g = d.lineColor || c.lineColor || g;
                a = B(d.opacity, c.opacity, a);
                return {
                    stroke: g,
                    "stroke-width": f,
                    fill: h,
                    opacity: a
                }
            },
            destroy: function (a) {
                var d = this,
                    c = d.chart,
                    f = /AppleWebKit\/533/.test(J.navigator.userAgent),
                    e, g, h = d.data || [],
                    b, k;
                m(d, "destroy");
                this.removeEvents(a);
                (d.axisTypes || []).forEach(function (a) {
                    (k =
                        d[a]) && k.series && (n(k.series, d), k.isDirty = k.forceRedraw = !0)
                });
                d.legendItem && d.chart.legend.destroyItem(d);
                for (g = h.length; g--;)(b = h[g]) && b.destroy && b.destroy();
                d.points = null;
                C.clearTimeout(d.animationTimeout);
                u(d, function (a, c) {
                    a instanceof w && !a.survive && (e = f && "group" === c ? "hide" : "destroy", a[e]())
                });
                c.hoverSeries === d && (c.hoverSeries = null);
                n(c.series, d);
                c.orderSeries();
                u(d, function (c, f) {
                    a && "hcEvents" === f || delete d[f]
                })
            },
            getGraphPath: function (a, d, c) {
                var f = this,
                    e = f.options,
                    g = e.step,
                    h, b = [],
                    k = [],
                    m;
                a = a ||
                    f.points;
                (h = a.reversed) && a.reverse();
                (g = {
                    right: 1,
                    center: 2
                } [g] || g && 3) && h && (g = 4 - g);
                a = this.getValidPoints(a, !1, !(e.connectNulls && !d && !c));
                a.forEach(function (h, n) {
                    var p = h.plotX,
                        r = h.plotY,
                        u = a[n - 1];
                    (h.leftCliff || u && u.rightCliff) && !c && (m = !0);
                    h.isNull && !t(d) && 0 < n ? m = !e.connectNulls : h.isNull && !d ? m = !0 : (0 === n || m ? n = [
                        ["M", h.plotX, h.plotY]
                    ] : f.getPointSpline ? n = [f.getPointSpline(a, h, n)] : g ? (n = 1 === g ? [
                        ["L", u.plotX, r]
                    ] : 2 === g ? [
                        ["L", (u.plotX + p) / 2, u.plotY],
                        ["L", (u.plotX + p) / 2, r]
                    ] : [
                        ["L", p, u.plotY]
                    ], n.push(["L", p, r])) : n = [
                        ["L",
                            p, r
                        ]
                    ], k.push(h.x), g && (k.push(h.x), 2 === g && k.push(h.x)), b.push.apply(b, n), m = !1)
                });
                b.xMap = k;
                return f.graphPath = b
            },
            drawGraph: function () {
                var a = this,
                    d = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = this.chart.styledMode,
                    g = [
                        ["graph", "highcharts-graph"]
                    ];
                e || g[0].push(d.lineColor || this.color || "#cccccc", d.dashStyle);
                g = a.getZonesGraphs(g);
                g.forEach(function (f, g) {
                    var h = f[0],
                        b = a[h],
                        k = b ? "animate" : "attr";
                    b ? (b.endX = a.preventGraphAnimation ? null : c.xMap, b.animate({
                        d: c
                    })) : c.length && (a[h] = b = a.chart.renderer.path(c).addClass(f[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    b && !e && (h = {
                        stroke: f[2],
                        "stroke-width": d.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, f[3] ? h.dashstyle = f[3] : "square" !== d.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), b[k](h).shadow(2 > g && d.shadow));
                    b && (b.startX = c.xMap, b.isArea = c.isArea)
                })
            },
            getZonesGraphs: function (a) {
                this.zones.forEach(function (d, c) {
                    c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (d.className || "")];
                    this.chart.styledMode || c.push(d.color || this.color, d.dashStyle || this.options.dashStyle);
                    a.push(c)
                }, this);
                return a
            },
            applyZones: function () {
                var a = this,
                    d = this.chart,
                    c = d.renderer,
                    e = this.zones,
                    g, h, b = this.clips || [],
                    k, m = this.graph,
                    n = this.area,
                    r = Math.max(d.chartWidth, d.chartHeight),
                    u = this[(this.zoneAxis || "y") + "Axis"],
                    l = d.inverted,
                    x, v, t, G = !1,
                    q, K;
                if (e.length && (m || n) && u && "undefined" !== typeof u.min) {
                    var y = u.reversed;
                    var J = u.horiz;
                    m && !this.showLine && m.hide();
                    n && n.hide();
                    var D = u.getExtremes();
                    e.forEach(function (f, e) {
                        g = y ? J ? d.plotWidth : 0 : J ? 0 : u.toPixels(D.min) || 0;
                        g = p(B(h, g), 0, r);
                        h = p(Math.round(u.toPixels(B(f.value, D.max),
                            !0) || 0), 0, r);
                        G && (g = h = u.toPixels(D.max));
                        x = Math.abs(g - h);
                        v = Math.min(g, h);
                        t = Math.max(g, h);
                        u.isXAxis ? (k = {
                            x: l ? t : v,
                            y: 0,
                            width: x,
                            height: r
                        }, J || (k.x = d.plotHeight - k.x)) : (k = {
                            x: 0,
                            y: l ? t : v,
                            width: r,
                            height: x
                        }, J && (k.y = d.plotWidth - k.y));
                        l && c.isVML && (k = u.isXAxis ? {
                            x: 0,
                            y: y ? v : t,
                            height: k.width,
                            width: d.chartWidth
                        } : {
                            x: k.y - d.plotLeft - d.spacingBox.x,
                            y: 0,
                            width: k.height,
                            height: d.chartHeight
                        });
                        b[e] ? b[e].animate(k) : b[e] = c.clipRect(k);
                        q = a["zone-area-" + e];
                        K = a["zone-graph-" + e];
                        m && K && K.clip(b[e]);
                        n && q && q.clip(b[e]);
                        G = f.value > D.max;
                        a.resetZones && 0 === h && (h = void 0)
                    });
                    this.clips = b
                } else a.visible && (m && m.show(!0), n && n.show(!0))
            },
            invertGroups: function (a) {
                function d() {
                    ["group", "markerGroup"].forEach(function (d) {
                        c[d] && (f.renderer.isVML && c[d].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[d].width = c.yAxis.len, c[d].height = c.xAxis.len, c[d].invert(c.isRadialSeries ? !1 : a))
                    })
                }
                var c = this,
                    f = c.chart;
                c.xAxis && (c.eventsToUnbind.push(H(f, "resize", d)), d(), c.invertGroups = d)
            },
            plotGroup: function (a, d, c, e, g) {
                var f = this[a],
                    h = !f;
                c = {
                    visibility: c,
                    zIndex: e ||
                        .1
                };
                "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (c.opacity = this.opacity);
                h && (this[a] = f = this.chart.renderer.g().add(g));
                f.addClass("highcharts-" + d + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (t(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr(c)[h ? "attr" : "animate"](this.getPlotBox());
                return f
            },
            getPlotBox: function () {
                var a = this.chart,
                    d = this.xAxis,
                    c = this.yAxis;
                a.inverted && (d = c, c = this.xAxis);
                return {
                    translateX: d ? d.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            removeEvents: function (a) {
                a ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) {
                    a()
                }), this.eventsToUnbind.length = 0) : O(this)
            },
            render: function () {
                var a = this,
                    d = a.chart,
                    c = a.options,
                    e = I(c.animation),
                    g = !a.finishedAnimating && d.renderer.isSVG && e.duration,
                    h = a.visible ? "inherit" : "hidden",
                    b = c.zIndex,
                    k = a.hasRendered,
                    n = d.seriesGroup,
                    p = d.inverted;
                m(this, "render");
                var r = a.plotGroup("group", "series", h, b, n);
                a.markerGroup = a.plotGroup("markerGroup", "markers", h, b, n);
                g && a.animate && a.animate(!0);
                r.inverted = a.isCartesian || a.invertable ? p : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(p);
                !1 === c.clip || a.sharedClipKey || k || r.clip(d.clipRect);
                g && a.animate && a.animate();
                k || (g && e.defer && (g += e.defer),
                    a.animationTimeout = K(function () {
                        a.afterAnimate()
                    }, g || 0));
                a.isDirty = !1;
                a.hasRendered = !0;
                m(a, "afterRender")
            },
            redraw: function () {
                var a = this.chart,
                    d = this.isDirty || this.isDirtyData,
                    c = this.group,
                    e = this.xAxis,
                    g = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: B(e && e.left, a.plotLeft),
                    translateY: B(g && g.top, a.plotTop)
                }));
                this.translate();
                this.render();
                d && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, d) {
                var c = this.xAxis,
                    e = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, d, a)
            },
            buildKDTree: function (a) {
                function d(a, e, f) {
                    var g;
                    if (g = a && a.length) {
                        var h = c.kdAxisArray[e % f];
                        a.sort(function (a, c) {
                            return a[h] - c[h]
                        });
                        g = Math.floor(g / 2);
                        return {
                            point: a[g],
                            left: d(a.slice(0, g), e + 1, f),
                            right: d(a.slice(g + 1), e + 1, f)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var c = this,
                    e = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete c.kdTree;
                K(function () {
                    c.kdTree = d(c.getValidPoints(null,
                        !c.directTouch), e, e);
                    c.buildingKdTree = !1
                }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
            },
            searchKDTree: function (a, d, c) {
                function e(a, c, d, k) {
                    var m = c.point,
                        n = f.kdAxisArray[d % k],
                        p = m;
                    var r = t(a[g]) && t(m[g]) ? Math.pow(a[g] - m[g], 2) : null;
                    var u = t(a[h]) && t(m[h]) ? Math.pow(a[h] - m[h], 2) : null;
                    u = (r || 0) + (u || 0);
                    m.dist = t(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    m.distX = t(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    n = a[n] - m[n];
                    u = 0 > n ? "left" : "right";
                    r = 0 > n ? "right" : "left";
                    c[u] && (u = e(a, c[u], d + 1, k), p = u[b] < p[b] ? u : m);
                    c[r] && Math.sqrt(n * n) < p[b] &&
                        (a = e(a, c[r], d + 1, k), p = a[b] < p[b] ? a : p);
                    return p
                }
                var f = this,
                    g = this.kdAxisArray[0],
                    h = this.kdAxisArray[1],
                    b = d ? "distX" : "dist";
                d = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(c);
                if (this.kdTree) return e(a, this.kdTree, d, d)
            },
            pointPlacementToXValue: function () {
                var a = this.options,
                    d = a.pointRange,
                    c = this.xAxis;
                a = a.pointPlacement;
                "between" === a && (a = c.reversed ? -.5 : .5);
                return g(a) ? a * B(d, c.pointRange) : 0
            },
            isPointInside: function (a) {
                return "undefined" !== typeof a.plotY &&
                    "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len
            }
        });
        ""
    });
    M(q, "Extensions/Stacking.js", [q["Core/Axis/Axis.js"], q["Core/Chart/Chart.js"], q["Core/Globals.js"], q["Core/Axis/StackingAxis.js"], q["Core/Utilities.js"]], function (l, b, q, z, w) {
        var C = w.correctFloat,
            F = w.defined,
            H = w.destroyObjectProperties,
            I = w.format,
            y = w.isNumber,
            A = w.pick;
        "";
        var p = q.Series,
            E = function () {
                function b(b, p, l, r, m) {
                    var a = b.chart.inverted;
                    this.axis = b;
                    this.isNegative = l;
                    this.options = p = p || {};
                    this.x = r;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = m;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = {
                        align: p.align || (a ? l ? "left" : "right" : "center"),
                        verticalAlign: p.verticalAlign || (a ? "middle" : l ? "bottom" : "top"),
                        y: p.y,
                        x: p.x
                    };
                    this.textAlign = p.textAlign || (a ? l ? "right" : "left" : "center")
                }
                b.prototype.destroy = function () {
                    H(this, this.axis)
                };
                b.prototype.render = function (b) {
                    var n = this.axis.chart,
                        p = this.options,
                        r = p.format;
                    r = r ? I(r, this, n) : p.formatter.call(this);
                    this.label ? this.label.attr({
                        text: r,
                        visibility: "hidden"
                    }) : (this.label = n.renderer.label(r, null, null, p.shape, null, null, p.useHTML, !1, "stack-labels"), r = {
                        r: p.borderRadius || 0,
                        text: r,
                        rotation: p.rotation,
                        padding: A(p.padding, 5),
                        visibility: "hidden"
                    }, n.styledMode || (r.fill = p.backgroundColor, r.stroke = p.borderColor, r["stroke-width"] = p.borderWidth, this.label.css(p.style)), this.label.attr(r), this.label.added || this.label.add(b));
                    this.label.labelrank = n.plotHeight
                };
                b.prototype.setOffset = function (b, l, t, r, m) {
                    var a = this.axis,
                        h = a.chart;
                    r = a.translate(a.stacking.usePercentage ?
                        100 : r ? r : this.total, 0, 0, 0, 1);
                    t = a.translate(t ? t : 0);
                    t = F(r) && Math.abs(r - t);
                    b = A(m, h.xAxis[0].translate(this.x)) + b;
                    a = F(r) && this.getStackBox(h, this, b, r, l, t, a);
                    l = this.label;
                    t = this.isNegative;
                    b = "justify" === A(this.options.overflow, "justify");
                    var k = this.textAlign;
                    l && a && (m = l.getBBox(), r = l.padding, k = "left" === k ? h.inverted ? -r : r : "right" === k ? m.width : h.inverted && "center" === k ? m.width / 2 : h.inverted ? t ? m.width + r : -r : m.width / 2, t = h.inverted ? m.height / 2 : t ? -r : m.height, this.alignOptions.x = A(this.options.x, 0), this.alignOptions.y =
                        A(this.options.y, 0), a.x -= k, a.y -= t, l.align(this.alignOptions, null, a), h.isInsidePlot(l.alignAttr.x + k - this.alignOptions.x, l.alignAttr.y + t - this.alignOptions.y) ? l.show() : (l.alignAttr.y = -9999, b = !1), b && p.prototype.justifyDataLabel.call(this.axis, l, this.alignOptions, l.alignAttr, m, a), l.attr({
                            x: l.alignAttr.x,
                            y: l.alignAttr.y
                        }), A(!b && this.options.crop, !0) && ((h = y(l.x) && y(l.y) && h.isInsidePlot(l.x - r + l.width, l.y) && h.isInsidePlot(l.x + r, l.y)) || l.hide()))
                };
                b.prototype.getStackBox = function (b, p, l, r, m, a, h) {
                    var k = p.axis.reversed,
                        g = b.inverted,
                        e = h.height + h.pos - (g ? b.plotLeft : b.plotTop);
                    p = p.isNegative && !k || !p.isNegative && k;
                    return {
                        x: g ? p ? r - h.right : r - a + h.pos - b.plotLeft : l + b.xAxis[0].transB - b.plotLeft,
                        y: g ? h.height - l - m : p ? e - r - a : e - r,
                        width: g ? a : m,
                        height: g ? m : a
                    }
                };
                return b
            }();
        b.prototype.getStacks = function () {
            var b = this,
                n = b.inverted;
            b.yAxis.forEach(function (b) {
                b.stacking && b.stacking.stacks && b.hasVisibleSeries && (b.stacking.oldStacks = b.stacking.stacks)
            });
            b.series.forEach(function (p) {
                var l = p.xAxis && p.xAxis.options || {};
                !p.options.stacking || !0 !==
                    p.visible && !1 !== b.options.chart.ignoreHiddenSeries || (p.stackKey = [p.type, A(p.options.stack, ""), n ? l.top : l.left, n ? l.height : l.width].join())
            })
        };
        z.compose(l);
        p.prototype.setGroupedPoints = function () {
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length && p.prototype.setStackedPoints.call(this, "group")
        };
        p.prototype.setStackedPoints = function (b) {
            var n = b || this.options.stacking;
            if (n && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var p =
                    this.processedXData,
                    l = this.processedYData,
                    r = [],
                    m = l.length,
                    a = this.options,
                    h = a.threshold,
                    k = A(a.startFromThreshold && h, 0);
                a = a.stack;
                b = b ? this.type + "," + n : this.stackKey;
                var g = "-" + b,
                    e = this.negStacks,
                    x = this.yAxis,
                    u = x.stacking.stacks,
                    t = x.stacking.oldStacks,
                    q, G;
                x.stacking.stacksTouched += 1;
                for (G = 0; G < m; G++) {
                    var K = p[G];
                    var y = l[G];
                    var J = this.getStackIndicator(J, K, this.index);
                    var f = J.key;
                    var d = (q = e && y < (k ? 0 : h)) ? g : b;
                    u[d] || (u[d] = {});
                    u[d][K] || (t[d] && t[d][K] ? (u[d][K] = t[d][K], u[d][K].total = null) : u[d][K] = new E(x, x.options.stackLabels,
                        q, K, a));
                    d = u[d][K];
                    null !== y ? (d.points[f] = d.points[this.index] = [A(d.cumulative, k)], F(d.cumulative) || (d.base = f), d.touched = x.stacking.stacksTouched, 0 < J.index && !1 === this.singleStacks && (d.points[f][0] = d.points[this.index + "," + K + ",0"][0])) : d.points[f] = d.points[this.index] = null;
                    "percent" === n ? (q = q ? b : g, e && u[q] && u[q][K] ? (q = u[q][K], d.total = q.total = Math.max(q.total, d.total) + Math.abs(y) || 0) : d.total = C(d.total + (Math.abs(y) || 0))) : "group" === n ? null !== y && (d.total = (d.total || 0) + 1) : d.total = C(d.total + (y || 0));
                    d.cumulative =
                        "group" === n ? (d.total || 1) - 1 : A(d.cumulative, k) + (y || 0);
                    null !== y && (d.points[f].push(d.cumulative), r[G] = d.cumulative, d.hasValidPoints = !0)
                }
                "percent" === n && (x.stacking.usePercentage = !0);
                "group" !== n && (this.stackedYData = r);
                x.stacking.oldStacks = {}
            }
        };
        p.prototype.modifyStacks = function () {
            var b = this,
                n = b.stackKey,
                p = b.yAxis.stacking.stacks,
                l = b.processedXData,
                r, m = b.options.stacking;
            b[m + "Stacker"] && [n, "-" + n].forEach(function (a) {
                for (var h = l.length, k, g; h--;)
                    if (k = l[h], r = b.getStackIndicator(r, k, b.index, a), g = (k = p[a] && p[a][k]) &&
                        k.points[r.key]) b[m + "Stacker"](g, k, h)
            })
        };
        p.prototype.percentStacker = function (b, n, p) {
            n = n.total ? 100 / n.total : 0;
            b[0] = C(b[0] * n);
            b[1] = C(b[1] * n);
            this.stackedYData[p] = b[1]
        };
        p.prototype.getStackIndicator = function (b, n, p, l) {
            !F(b) || b.x !== n || l && b.key !== l ? b = {
                x: n,
                index: 0,
                key: l
            } : b.index++;
            b.key = [p, n, b.index].join();
            return b
        };
        q.StackItem = E;
        return q.StackItem
    });
    M(q, "Core/Dynamics.js", [q["Core/Axis/Axis.js"], q["Core/Chart/Chart.js"], q["Core/Globals.js"], q["Core/Options.js"], q["Core/Series/Point.js"], q["Core/Time.js"],
        q["Core/Utilities.js"]
    ], function (l, b, q, z, w, C, F) {
        var H = z.time,
            I = F.addEvent,
            y = F.animate,
            A = F.createElement,
            p = F.css,
            E = F.defined,
            t = F.erase,
            n = F.error,
            v = F.extend,
            D = F.fireEvent,
            r = F.isArray,
            m = F.isNumber,
            a = F.isObject,
            h = F.isString,
            k = F.merge,
            g = F.objectEach,
            e = F.pick,
            x = F.relativeLength,
            u = F.setAnimation,
            B = F.splat;
        z = q.Series;
        var O = q.seriesTypes;
        q.cleanRecursively = function (e, b) {
            var h = {};
            g(e, function (g, f) {
                if (a(e[f], !0) && !e.nodeType && b[f]) g = q.cleanRecursively(e[f], b[f]), Object.keys(g).length && (h[f] = g);
                else if (a(e[f]) ||
                    e[f] !== b[f]) h[f] = e[f]
            });
            return h
        };
        v(b.prototype, {
            addSeries: function (a, g, b) {
                var h, f = this;
                a && (g = e(g, !0), D(f, "addSeries", {
                    options: a
                }, function () {
                    h = f.initSeries(a);
                    f.isDirtyLegend = !0;
                    f.linkSeries();
                    h.enabledDataSorting && h.setData(a.data, !1);
                    D(f, "afterAddSeries", {
                        series: h
                    });
                    g && f.redraw(b)
                }));
                return h
            },
            addAxis: function (a, e, g, b) {
                return this.createAxis(e ? "xAxis" : "yAxis", {
                    axis: a,
                    redraw: g,
                    animation: b
                })
            },
            addColorAxis: function (a, e, g) {
                return this.createAxis("colorAxis", {
                    axis: a,
                    redraw: e,
                    animation: g
                })
            },
            createAxis: function (a,
                g) {
                var b = this.options,
                    h = "colorAxis" === a,
                    f = g.redraw,
                    d = g.animation;
                g = k(g.axis, {
                    index: this[a].length,
                    isX: "xAxis" === a
                });
                var c = h ? new q.ColorAxis(this, g) : new l(this, g);
                b[a] = B(b[a] || {});
                b[a].push(g);
                h && (this.isDirtyLegend = !0, this.axes.forEach(function (a) {
                    a.series = []
                }), this.series.forEach(function (a) {
                    a.bindAxes();
                    a.isDirtyData = !0
                }));
                e(f, !0) && this.redraw(d);
                return c
            },
            showLoading: function (a) {
                var g = this,
                    b = g.options,
                    h = g.loadingDiv,
                    f = b.loading,
                    d = function () {
                        h && p(h, {
                            left: g.plotLeft + "px",
                            top: g.plotTop + "px",
                            width: g.plotWidth +
                                "px",
                            height: g.plotHeight + "px"
                        })
                    };
                h || (g.loadingDiv = h = A("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, g.container), g.loadingSpan = A("span", {
                    className: "highcharts-loading-inner"
                }, null, h), I(g, "redraw", d));
                h.className = "highcharts-loading";
                g.loadingSpan.innerHTML = e(a, b.lang.loading, "");
                g.styledMode || (p(h, v(f.style, {
                    zIndex: 10
                })), p(g.loadingSpan, f.labelStyle), g.loadingShown || (p(h, {
                    opacity: 0,
                    display: ""
                }), y(h, {
                    opacity: f.style.opacity || .5
                }, {
                    duration: f.showDuration || 0
                })));
                g.loadingShown = !0;
                d()
            },
            hideLoading: function () {
                var a = this.options,
                    e = this.loadingDiv;
                e && (e.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || y(e, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        p(e, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
            update: function (a, b, n, p) {
                var f = this,
                    d = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    c, r, u, l = a.isResponsiveOptions,
                    t = [];
                D(f, "update", {
                    options: a
                });
                l || f.setResponsive(!1, !0);
                a = q.cleanRecursively(a, f.options);
                k(!0, f.userOptions, a);
                if (c = a.chart) {
                    k(!0, f.options.chart, c);
                    "className" in
                    c && f.setClassName(c.className);
                    "reflow" in c && f.setReflow(c.reflow);
                    if ("inverted" in c || "polar" in c || "type" in c) {
                        f.propFromSeries();
                        var v = !0
                    }
                    "alignTicks" in c && (v = !0);
                    g(c, function (a, c) {
                        -1 !== f.propsRequireUpdateSeries.indexOf("chart." + c) && (r = !0); - 1 !== f.propsRequireDirtyBox.indexOf(c) && (f.isDirtyBox = !0); - 1 !== f.propsRequireReflow.indexOf(c) && (l ? f.isDirtyBox = !0 : u = !0)
                    });
                    !f.styledMode && "style" in c && f.renderer.setStyle(c.style)
                }!f.styledMode && a.colors && (this.options.colors = a.colors);
                a.plotOptions && k(!0, this.options.plotOptions,
                    a.plotOptions);
                a.time && this.time === H && (this.time = new C(a.time));
                g(a, function (a, c) {
                    if (f[c] && "function" === typeof f[c].update) f[c].update(a, !1);
                    else if ("function" === typeof f[d[c]]) f[d[c]](a);
                    "chart" !== c && -1 !== f.propsRequireUpdateSeries.indexOf(c) && (r = !0)
                });
                this.collectionsWithUpdate.forEach(function (c) {
                    if (a[c]) {
                        if ("series" === c) {
                            var d = [];
                            f[c].forEach(function (a, c) {
                                a.options.isInternal || d.push(e(a.options.index, c))
                            })
                        }
                        B(a[c]).forEach(function (a, e) {
                            var g = E(a.id),
                                b;
                            g && (b = f.get(a.id));
                            b || (b = f[c][d ? d[e] : e]) &&
                                g && E(b.options.id) && (b = void 0);
                            b && b.coll === c && (b.update(a, !1), n && (b.touched = !0));
                            !b && n && f.collectionsWithInit[c] && (f.collectionsWithInit[c][0].apply(f, [a].concat(f.collectionsWithInit[c][1] || []).concat([!1])).touched = !0)
                        });
                        n && f[c].forEach(function (a) {
                            a.touched || a.options.isInternal ? delete a.touched : t.push(a)
                        })
                    }
                });
                t.forEach(function (a) {
                    a.remove && a.remove(!1)
                });
                v && f.axes.forEach(function (a) {
                    a.update({}, !1)
                });
                r && f.getSeriesOrderByLinks().forEach(function (a) {
                    a.chart && a.update({}, !1)
                }, this);
                a.loading &&
                    k(!0, f.options.loading, a.loading);
                v = c && c.width;
                c = c && c.height;
                h(c) && (c = x(c, v || f.chartWidth));
                u || m(v) && v !== f.chartWidth || m(c) && c !== f.chartHeight ? f.setSize(v, c, p) : e(b, !0) && f.redraw(p);
                D(f, "afterUpdate", {
                    options: a,
                    redraw: b,
                    animation: p
                })
            },
            setSubtitle: function (a, e) {
                this.applyDescription("subtitle", a);
                this.layOutTitles(e)
            },
            setCaption: function (a, e) {
                this.applyDescription("caption", a);
                this.layOutTitles(e)
            }
        });
        b.prototype.collectionsWithInit = {
            xAxis: [b.prototype.addAxis, [!0]],
            yAxis: [b.prototype.addAxis, [!1]],
            series: [b.prototype.addSeries]
        };
        v(w.prototype, {
            update: function (g, b, h, k) {
                function f() {
                    d.applyOptions(g);
                    var f = m && d.hasDummyGraphic;
                    f = null === d.y ? !f : f;
                    m && f && (d.graphic = m.destroy(), delete d.hasDummyGraphic);
                    a(g, !0) && (m && m.element && g && g.marker && "undefined" !== typeof g.marker.symbol && (d.graphic = m.destroy()), g && g.dataLabels && d.dataLabel && (d.dataLabel = d.dataLabel.destroy()), d.connector && (d.connector = d.connector.destroy()));
                    n = d.index;
                    c.updateParallelArrays(d, n);
                    r.data[n] = a(r.data[n], !0) || a(g, !0) ? d.options :
                        e(g, r.data[n]);
                    c.isDirty = c.isDirtyData = !0;
                    !c.fixedBox && c.hasCartesianSeries && (p.isDirtyBox = !0);
                    "point" === r.legendType && (p.isDirtyLegend = !0);
                    b && p.redraw(h)
                }
                var d = this,
                    c = d.series,
                    m = d.graphic,
                    n, p = c.chart,
                    r = c.options;
                b = e(b, !0);
                !1 === k ? f() : d.firePointEvent("update", {
                    options: g
                }, f)
            },
            remove: function (a, e) {
                this.series.removePoint(this.series.data.indexOf(this), a, e)
            }
        });
        v(z.prototype, {
            addPoint: function (a, g, b, h, f) {
                var d = this.options,
                    c = this.data,
                    k = this.chart,
                    m = this.xAxis;
                m = m && m.hasNames && m.names;
                var n = d.data,
                    p =
                    this.xData,
                    r;
                g = e(g, !0);
                var u = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(u, [a]);
                var l = u.x;
                var x = p.length;
                if (this.requireSorting && l < p[x - 1])
                    for (r = !0; x && p[x - 1] > l;) x--;
                this.updateParallelArrays(u, "splice", x, 0, 0);
                this.updateParallelArrays(u, x);
                m && u.name && (m[l] = u.name);
                n.splice(x, 0, a);
                r && (this.data.splice(x, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                b && (c[0] && c[0].remove ? c[0].remove(!1) : (c.shift(), this.updateParallelArrays(u, "shift"), n.shift()));
                !1 !== f && D(this,
                    "addPoint", {
                        point: u
                    });
                this.isDirtyData = this.isDirty = !0;
                g && k.redraw(h)
            },
            removePoint: function (a, g, b) {
                var h = this,
                    f = h.data,
                    d = f[a],
                    c = h.points,
                    k = h.chart,
                    m = function () {
                        c && c.length === f.length && c.splice(a, 1);
                        f.splice(a, 1);
                        h.options.data.splice(a, 1);
                        h.updateParallelArrays(d || {
                            series: h
                        }, "splice", a, 1);
                        d && d.destroy();
                        h.isDirty = !0;
                        h.isDirtyData = !0;
                        g && k.redraw()
                    };
                u(b, k);
                g = e(g, !0);
                d ? d.firePointEvent("remove", null, m) : m()
            },
            remove: function (a, g, b, h) {
                function f() {
                    d.destroy(h);
                    d.remove = null;
                    c.isDirtyLegend = c.isDirtyBox = !0;
                    c.linkSeries();
                    e(a, !0) && c.redraw(g)
                }
                var d = this,
                    c = d.chart;
                !1 !== b ? D(d, "remove", null, f) : f()
            },
            update: function (a, g) {
                a = q.cleanRecursively(a, this.userOptions);
                D(this, "update", {
                    options: a
                });
                var b = this,
                    h = b.chart,
                    f = b.userOptions,
                    d = b.initialType || b.type,
                    c = a.type || f.type || h.options.chart.type,
                    m = !(this.hasDerivedData || a.dataGrouping || c && c !== this.type || "undefined" !== typeof a.pointStart || a.pointInterval || a.pointIntervalUnit || a.keys),
                    p = O[d].prototype,
                    r, u = ["eventOptions", "navigatorSeries", "baseSeries"],
                    l = b.finishedAnimating && {
                        animation: !1
                    },
                    x = {};
                m && (u.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && u.push("area", "graph"), b.parallelArrays.forEach(function (a) {
                    u.push(a + "Data")
                }), a.data && (a.dataSorting && v(b.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
                a = k(f, l, {
                        index: "undefined" === typeof f.index ? b.index : f.index,
                        pointStart: e(f.pointStart, b.xData[0])
                    }, !m && {
                        data: b.options.data
                    },
                    a);
                m && a.data && (a.data = b.options.data);
                u = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(u);
                u.forEach(function (a) {
                    u[a] = b[a];
                    delete b[a]
                });
                b.remove(!1, null, !1, !0);
                for (r in p) b[r] = void 0;
                O[c || d] ? v(b, O[c || d].prototype) : n(17, !0, h, {
                    missingModuleFor: c || d
                });
                u.forEach(function (a) {
                    b[a] = u[a]
                });
                b.init(h, a);
                if (m && this.points) {
                    var t = b.options;
                    !1 === t.visible ? (x.graphic = 1, x.dataLabel = 1) : b._hasPointLabels || (a = t.marker, f = t.dataLabels, a && (!1 === a.enabled || "symbol" in a) && (x.graphic = 1), f && !1 === f.enabled &&
                        (x.dataLabel = 1));
                    this.points.forEach(function (a) {
                        a && a.series && (a.resolveColor(), Object.keys(x).length && a.destroyElements(x), !1 === t.showInLegend && a.legendItem && h.legend.destroyItem(a))
                    }, this)
                }
                b.initialType = d;
                h.linkSeries();
                D(this, "afterUpdate");
                e(g, !0) && h.redraw(m ? void 0 : !1)
            },
            setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        v(l.prototype, {
            update: function (a, b) {
                var h = this.chart,
                    m = a && a.events || {};
                a = k(this.userOptions, a);
                h.options[this.coll].indexOf &&
                    (h.options[this.coll][h.options[this.coll].indexOf(this.userOptions)] = a);
                g(h.options[this.coll].events, function (a, d) {
                    "undefined" === typeof m[d] && (m[d] = void 0)
                });
                this.destroy(!0);
                this.init(h, v(a, {
                    events: m
                }));
                h.isDirtyBox = !0;
                e(b, !0) && h.redraw()
            },
            remove: function (a) {
                for (var g = this.chart, b = this.coll, h = this.series, f = h.length; f--;) h[f] && h[f].remove(!1);
                t(g.axes, this);
                t(g[b], this);
                r(g.options[b]) ? g.options[b].splice(this.options.index, 1) : delete g.options[b];
                g[b].forEach(function (a, c) {
                    a.options.index = a.userOptions.index =
                        c
                });
                this.destroy();
                g.isDirtyBox = !0;
                e(a, !0) && g.redraw()
            },
            setTitle: function (a, e) {
                this.update({
                    title: a
                }, e)
            },
            setCategories: function (a, e) {
                this.update({
                    categories: a
                }, e)
            }
        })
    });
    M(q, "Series/AreaSeries.js", [q["Core/Globals.js"], q["Core/Color.js"], q["Mixins/LegendSymbol.js"], q["Core/Utilities.js"]], function (l, b, q, z) {
        var w = b.parse,
            C = z.objectEach,
            F = z.pick;
        b = z.seriesType;
        var H = l.Series;
        b("area", "line", {
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function (b) {
                var l = [],
                    q = [],
                    p = this.xAxis,
                    w = this.yAxis,
                    t = w.stacking.stacks[this.stackKey],
                    n = {},
                    v = this.index,
                    D = w.series,
                    r = D.length,
                    m = F(w.options.reversedStacks, !0) ? 1 : -1,
                    a;
                b = b || this.points;
                if (this.options.stacking) {
                    for (a = 0; a < b.length; a++) b[a].leftNull = b[a].rightNull = void 0, n[b[a].x] = b[a];
                    C(t, function (a, g) {
                        null !== a.total && q.push(g)
                    });
                    q.sort(function (a, g) {
                        return a - g
                    });
                    var h = D.map(function (a) {
                        return a.visible
                    });
                    q.forEach(function (b, g) {
                        var e = 0,
                            k, u;
                        if (n[b] && !n[b].isNull) l.push(n[b]), [-1, 1].forEach(function (e) {
                            var p = 1 === e ? "rightNull" : "leftNull",
                                l = 0,
                                x = t[q[g + e]];
                            if (x)
                                for (a = v; 0 <= a && a < r;) k = x.points[a],
                                    k || (a === v ? n[b][p] = !0 : h[a] && (u = t[b].points[a]) && (l -= u[1] - u[0])), a += m;
                            n[b][1 === e ? "rightCliff" : "leftCliff"] = l
                        });
                        else {
                            for (a = v; 0 <= a && a < r;) {
                                if (k = t[b].points[a]) {
                                    e = k[1];
                                    break
                                }
                                a += m
                            }
                            e = w.translate(e, 0, 1, 0, 1);
                            l.push({
                                isNull: !0,
                                plotX: p.translate(b, 0, 0, 0, 1),
                                x: b,
                                plotY: e,
                                yBottom: e
                            })
                        }
                    })
                }
                return l
            },
            getGraphPath: function (b) {
                var l = H.prototype.getGraphPath,
                    q = this.options,
                    p = q.stacking,
                    w = this.yAxis,
                    t, n = [],
                    v = [],
                    D = this.index,
                    r = w.stacking.stacks[this.stackKey],
                    m = q.threshold,
                    a = Math.round(w.getThreshold(q.threshold));
                q = F(q.connectNulls,
                    "percent" === p);
                var h = function (e, h, k) {
                    var u = b[e];
                    e = p && r[u.x].points[D];
                    var l = u[k + "Null"] || 0;
                    k = u[k + "Cliff"] || 0;
                    u = !0;
                    if (k || l) {
                        var x = (l ? e[0] : e[1]) + k;
                        var t = e[0] + k;
                        u = !!l
                    } else !p && b[h] && b[h].isNull && (x = t = m);
                    "undefined" !== typeof x && (v.push({
                        plotX: g,
                        plotY: null === x ? a : w.getThreshold(x),
                        isNull: u,
                        isCliff: !0
                    }), n.push({
                        plotX: g,
                        plotY: null === t ? a : w.getThreshold(t),
                        doCurve: !1
                    }))
                };
                b = b || this.points;
                p && (b = this.getStackPoints(b));
                for (t = 0; t < b.length; t++) {
                    p || (b[t].leftCliff = b[t].rightCliff = b[t].leftNull = b[t].rightNull = void 0);
                    var k = b[t].isNull;
                    var g = F(b[t].rectPlotX, b[t].plotX);
                    var e = p ? b[t].yBottom : a;
                    if (!k || q) q || h(t, t - 1, "left"), k && !p && q || (v.push(b[t]), n.push({
                        x: t,
                        plotX: g,
                        plotY: e
                    })), q || h(t, t + 1, "right")
                }
                t = l.call(this, v, !0, !0);
                n.reversed = !0;
                k = l.call(this, n, !0, !0);
                (e = k[0]) && "M" === e[0] && (k[0] = ["L", e[1], e[2]]);
                k = t.concat(k);
                l = l.call(this, v, !1, q);
                k.xMap = t.xMap;
                this.areaPath = k;
                return l
            },
            drawGraph: function () {
                this.areaPath = [];
                H.prototype.drawGraph.apply(this);
                var b = this,
                    l = this.areaPath,
                    q = this.options,
                    p = [
                        ["area", "highcharts-area",
                            this.color, q.fillColor
                        ]
                    ];
                this.zones.forEach(function (l, t) {
                    p.push(["zone-area-" + t, "highcharts-area highcharts-zone-area-" + t + " " + l.className, l.color || b.color, l.fillColor || q.fillColor])
                });
                p.forEach(function (p) {
                    var t = p[0],
                        n = b[t],
                        v = n ? "animate" : "attr",
                        y = {};
                    n ? (n.endX = b.preventGraphAnimation ? null : l.xMap, n.animate({
                        d: l
                    })) : (y.zIndex = 0, n = b[t] = b.chart.renderer.path(l).addClass(p[1]).add(b.group), n.isArea = !0);
                    b.chart.styledMode || (y.fill = F(p[3], w(p[2]).setOpacity(F(q.fillOpacity, .75)).get()));
                    n[v](y);
                    n.startX =
                        l.xMap;
                    n.shiftUnit = q.step ? 2 : 1
                })
            },
            drawLegendSymbol: q.drawRectangle
        });
        ""
    });
    M(q, "Series/SplineSeries.js", [q["Core/Utilities.js"]], function (l) {
        var b = l.pick;
        l = l.seriesType;
        l("spline", "line", {}, {
            getPointSpline: function (l, q, w) {
                var z = q.plotX || 0,
                    F = q.plotY || 0,
                    H = l[w - 1];
                w = l[w + 1];
                if (H && !H.isNull && !1 !== H.doCurve && !q.isCliff && w && !w.isNull && !1 !== w.doCurve && !q.isCliff) {
                    l = H.plotY || 0;
                    var I = w.plotX || 0;
                    w = w.plotY || 0;
                    var y = 0;
                    var A = (1.5 * z + (H.plotX || 0)) / 2.5;
                    var p = (1.5 * F + l) / 2.5;
                    I = (1.5 * z + I) / 2.5;
                    var E = (1.5 * F + w) / 2.5;
                    I !== A && (y =
                        (E - p) * (I - z) / (I - A) + F - E);
                    p += y;
                    E += y;
                    p > l && p > F ? (p = Math.max(l, F), E = 2 * F - p) : p < l && p < F && (p = Math.min(l, F), E = 2 * F - p);
                    E > w && E > F ? (E = Math.max(w, F), p = 2 * F - E) : E < w && E < F && (E = Math.min(w, F), p = 2 * F - E);
                    q.rightContX = I;
                    q.rightContY = E
                }
                q = ["C", b(H.rightContX, H.plotX, 0), b(H.rightContY, H.plotY, 0), b(A, z, 0), b(p, F, 0), z, F];
                H.rightContX = H.rightContY = void 0;
                return q
            }
        });
        ""
    });
    M(q, "Series/AreaSplineSeries.js", [q["Core/Globals.js"], q["Mixins/LegendSymbol.js"], q["Core/Options.js"], q["Core/Utilities.js"]], function (l, b, q, z) {
        z = z.seriesType;
        l = l.seriesTypes.area.prototype;
        z("areaspline", "spline", q.defaultOptions.plotOptions.area, {
            getStackPoints: l.getStackPoints,
            getGraphPath: l.getGraphPath,
            drawGraph: l.drawGraph,
            drawLegendSymbol: b.drawRectangle
        });
        ""
    });
    M(q, "Series/ColumnSeries.js", [q["Core/Globals.js"], q["Core/Color.js"], q["Mixins/LegendSymbol.js"], q["Core/Utilities.js"]], function (l, b, q, z) {
        "";
        var w = b.parse,
            C = z.animObject,
            F = z.clamp,
            H = z.defined,
            I = z.extend,
            y = z.isNumber,
            A = z.merge,
            p = z.pick;
        b = z.seriesType;
        var E = z.objectEach,
            t = l.Series;
        b("column", "line", {
            borderRadius: 0,
            centerInCategory: !1,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: void 0,
                verticalAlign: void 0,
                y: void 0
            },
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                t.prototype.init.apply(this, arguments);
                var b = this,
                    p = b.chart;
                p.hasRendered &&
                    p.series.forEach(function (n) {
                        n.type === b.type && (n.isDirty = !0)
                    })
            },
            getColumnMetrics: function () {
                var b = this,
                    l = b.options,
                    t = b.xAxis,
                    r = b.yAxis,
                    m = t.options.reversedStacks;
                m = t.reversed && !m || !t.reversed && m;
                var a, h = {},
                    k = 0;
                !1 === l.grouping ? k = 1 : b.chart.series.forEach(function (e) {
                    var g = e.yAxis,
                        m = e.options;
                    if (e.type === b.type && (e.visible || !b.chart.options.chart.ignoreHiddenSeries) && r.len === g.len && r.pos === g.pos) {
                        if (m.stacking && "group" !== m.stacking) {
                            a = e.stackKey;
                            "undefined" === typeof h[a] && (h[a] = k++);
                            var n = h[a]
                        } else !1 !==
                            m.grouping && (n = k++);
                        e.columnIndex = n
                    }
                });
                var g = Math.min(Math.abs(t.transA) * (t.ordinal && t.ordinal.slope || l.pointRange || t.closestPointRange || t.tickInterval || 1), t.len),
                    e = g * l.groupPadding,
                    x = (g - 2 * e) / (k || 1);
                l = Math.min(l.maxPointWidth || t.len, p(l.pointWidth, x * (1 - 2 * l.pointPadding)));
                b.columnMetrics = {
                    width: l,
                    offset: (x - l) / 2 + (e + ((b.columnIndex || 0) + (m ? 1 : 0)) * x - g / 2) * (m ? -1 : 1),
                    paddedWidth: x,
                    columnCount: k
                };
                return b.columnMetrics
            },
            crispCol: function (b, p, l, r) {
                var m = this.chart,
                    a = this.borderWidth,
                    h = -(a % 2 ? .5 : 0);
                a = a % 2 ? .5 : 1;
                m.inverted && m.renderer.isVML && (a += 1);
                this.options.crisp && (l = Math.round(b + l) + h, b = Math.round(b) + h, l -= b);
                r = Math.round(p + r) + a;
                h = .5 >= Math.abs(p) && .5 < r;
                p = Math.round(p) + a;
                r -= p;
                h && r && (--p, r += 1);
                return {
                    x: b,
                    y: p,
                    width: l,
                    height: r
                }
            },
            adjustForMissingColumns: function (b, p, t, r) {
                var m = this,
                    a = this.options.stacking;
                if (!t.isNull && 1 < r.columnCount) {
                    var h = 0,
                        k = 0;
                    E(this.yAxis.stacking && this.yAxis.stacking.stacks, function (b) {
                        if ("number" === typeof t.x && (b = b[t.x.toString()])) {
                            var e = b.points[m.index],
                                g = b.total;
                            a ? (e && (h = k), b.hasValidPoints &&
                                k++) : l.isArray(e) && (h = e[1], k = g || 0)
                        }
                    });
                    b = (t.plotX || 0) + ((k - 1) * r.paddedWidth + p) / 2 - p - h * r.paddedWidth
                }
                return b
            },
            translate: function () {
                var b = this,
                    l = b.chart,
                    q = b.options,
                    r = b.dense = 2 > b.closestPointRange * b.xAxis.transA;
                r = b.borderWidth = p(q.borderWidth, r ? 0 : 1);
                var m = b.xAxis,
                    a = b.yAxis,
                    h = q.threshold,
                    k = b.translatedThreshold = a.getThreshold(h),
                    g = p(q.minPointLength, 5),
                    e = b.getColumnMetrics(),
                    x = e.width,
                    u = b.barW = Math.max(x, 1 + 2 * r),
                    B = b.pointXOffset = e.offset,
                    w = b.dataMin,
                    G = b.dataMax;
                l.inverted && (k -= .5);
                q.pointPadding && (u = Math.ceil(u));
                t.prototype.translate.apply(b);
                b.points.forEach(function (n) {
                    var r = p(n.yBottom, k),
                        t = 999 + Math.abs(r),
                        f = x,
                        d = n.plotX || 0;
                    t = F(n.plotY, -t, a.len + t);
                    var c = d + B,
                        v = u,
                        K = Math.min(t, r),
                        A = Math.max(t, r) - K;
                    if (g && Math.abs(A) < g) {
                        A = g;
                        var D = !a.reversed && !n.negative || a.reversed && n.negative;
                        y(h) && y(G) && n.y === h && G <= h && (a.min || 0) < h && w !== G && (D = !D);
                        K = Math.abs(K - k) > g ? r - g : k - (D ? g : 0)
                    }
                    H(n.options.pointWidth) && (f = v = Math.ceil(n.options.pointWidth), c -= Math.round((f - x) / 2));
                    q.centerInCategory && (c = b.adjustForMissingColumns(c, f, n, e));
                    n.barX =
                        c;
                    n.pointWidth = f;
                    n.tooltipPos = l.inverted ? [a.len + a.pos - l.plotLeft - t, m.len + m.pos - l.plotTop - (d || 0) - B - v / 2, A] : [c + v / 2, t + a.pos - l.plotTop, A];
                    n.shapeType = b.pointClass.prototype.shapeType || "rect";
                    n.shapeArgs = b.crispCol.apply(b, n.isNull ? [c, k, v, 0] : [c, K, v, A])
                })
            },
            getSymbol: l.noop,
            drawLegendSymbol: q.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (b, l) {
                var n = this.options,
                    r = this.pointAttrToOptions || {};
                var m = r.stroke || "borderColor";
                var a = r["stroke-width"] || "borderWidth",
                    h = b && b.color || this.color,
                    k = b && b[m] || n[m] || this.color || h,
                    g = b && b[a] || n[a] || this[a] || 0;
                r = b && b.options.dashStyle || n.dashStyle;
                var e = p(b && b.opacity, n.opacity, 1);
                if (b && this.zones.length) {
                    var x = b.getZone();
                    h = b.options.color || x && (x.color || b.nonZonedColor) || this.color;
                    x && (k = x.borderColor || k, r = x.dashStyle || r, g = x.borderWidth || g)
                }
                l && b && (b = A(n.states[l], b.options.states && b.options.states[l] || {}), l = b.brightness, h = b.color || "undefined" !== typeof l && w(h).brighten(b.brightness).get() ||
                    h, k = b[m] || k, g = b[a] || g, r = b.dashStyle || r, e = p(b.opacity, e));
                m = {
                    fill: h,
                    stroke: k,
                    "stroke-width": g,
                    opacity: e
                };
                r && (m.dashstyle = r);
                return m
            },
            drawPoints: function () {
                var b = this,
                    p = this.chart,
                    l = b.options,
                    r = p.renderer,
                    m = l.animationLimit || 250,
                    a;
                b.points.forEach(function (h) {
                    var k = h.graphic,
                        g = !!k,
                        e = k && p.pointCount < m ? "animate" : "attr";
                    if (y(h.plotY) && null !== h.y) {
                        a = h.shapeArgs;
                        k && h.hasNewShapeType() && (k = k.destroy());
                        b.enabledDataSorting && (h.startXPos = b.xAxis.reversed ? -(a ? a.width : 0) : b.xAxis.width);
                        k || (h.graphic = k = r[h.shapeType](a).add(h.group ||
                            b.group)) && b.enabledDataSorting && p.hasRendered && p.pointCount < m && (k.attr({
                            x: h.startXPos
                        }), g = !0, e = "animate");
                        if (k && g) k[e](A(a));
                        if (l.borderRadius) k[e]({
                            r: l.borderRadius
                        });
                        p.styledMode || k[e](b.pointAttribs(h, h.selected && "select")).shadow(!1 !== h.allowShadow && l.shadow, null, l.stacking && !l.borderRadius);
                        k.addClass(h.getClassName(), !0)
                    } else k && (h.graphic = k.destroy())
                })
            },
            animate: function (b) {
                var n = this,
                    p = this.yAxis,
                    l = n.options,
                    m = this.chart.inverted,
                    a = {},
                    h = m ? "translateX" : "translateY";
                if (b) a.scaleY = .001, b = F(p.toPixels(l.threshold),
                    p.pos, p.pos + p.len), m ? a.translateX = b - p.len : a.translateY = b, n.clipBox && n.setClip(), n.group.attr(a);
                else {
                    var k = n.group.attr(h);
                    n.group.animate({
                        scaleY: 1
                    }, I(C(n.options.animation), {
                        step: function (b, e) {
                            n.group && (a[h] = k + e.pos * (p.pos - k), n.group.attr(a))
                        }
                    }))
                }
            },
            remove: function () {
                var b = this,
                    p = b.chart;
                p.hasRendered && p.series.forEach(function (n) {
                    n.type === b.type && (n.isDirty = !0)
                });
                t.prototype.remove.apply(b, arguments)
            }
        });
        ""
    });
    M(q, "Series/BarSeries.js", [q["Core/Utilities.js"]], function (l) {
        l = l.seriesType;
        l("bar", "column",
            null, {
                inverted: !0
            });
        ""
    });
    M(q, "Series/ScatterSeries.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.addEvent;
        b = b.seriesType;
        var z = l.Series;
        b("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: {
                x: 0,
                y: 0
            },
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group",
                "markerGroup", "dataLabelsGroup"
            ],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && z.prototype.drawGraph.call(this)
            },
            applyJitter: function () {
                var b = this,
                    l = this.options.jitter,
                    q = this.points.length;
                l && this.points.forEach(function (w, z) {
                    ["x", "y"].forEach(function (y, A) {
                        var p = "plot" + y.toUpperCase();
                        if (l[y] && !w.isNull) {
                            var E = b[y + "Axis"];
                            var t = l[y] * E.transA;
                            if (E && !E.isLog) {
                                var n = Math.max(0, w[p] - t);
                                E = Math.min(E.len, w[p] + t);
                                A = 1E4 * Math.sin(z + A * q);
                                w[p] = n + (E - n) * (A - Math.floor(A));
                                "x" === y && (w.clientX =
                                    w.plotX)
                            }
                        }
                    })
                })
            }
        });
        q(z, "afterTranslate", function () {
            this.applyJitter && this.applyJitter()
        });
        ""
    });
    M(q, "Mixins/CenteredSeries.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.isNumber,
            z = b.pick,
            w = b.relativeLength,
            C = l.deg2rad;
        return l.CenteredSeriesMixin = {
            getCenter: function () {
                var b = this.options,
                    q = this.chart,
                    C = 2 * (b.slicedOffset || 0),
                    y = q.plotWidth - 2 * C,
                    A = q.plotHeight - 2 * C,
                    p = b.center,
                    E = Math.min(y, A),
                    t = b.size,
                    n = b.innerSize || 0;
                "string" === typeof t && (t = parseFloat(t));
                "string" === typeof n && (n =
                    parseFloat(n));
                b = [z(p[0], "50%"), z(p[1], "50%"), z(t && 0 > t ? void 0 : b.size, "100%"), z(n && 0 > n ? void 0 : b.innerSize || 0, "0%")];
                !q.angular || this instanceof l.Series || (b[3] = 0);
                for (p = 0; 4 > p; ++p) t = b[p], q = 2 > p || 2 === p && /%$/.test(t), b[p] = w(t, [y, A, E, b[2]][p]) + (q ? C : 0);
                b[3] > b[2] && (b[3] = b[2]);
                return b
            },
            getStartAndEndRadians: function (b, l) {
                b = q(b) ? b : 0;
                l = q(l) && l > b && 360 > l - b ? l : b + 360;
                return {
                    start: C * (b + -90),
                    end: C * (l + -90)
                }
            }
        }
    });
    M(q, "Series/PieSeries.js", [q["Core/Globals.js"], q["Core/Renderer/SVG/SVGRenderer.js"], q["Mixins/LegendSymbol.js"],
        q["Core/Series/Point.js"], q["Core/Utilities.js"], q["Mixins/CenteredSeries.js"]
    ], function (l, b, q, z, w, C) {
        var F = w.addEvent,
            H = w.clamp,
            I = w.defined,
            y = w.fireEvent,
            A = w.isNumber,
            p = w.merge,
            E = w.pick,
            t = w.relativeLength,
            n = w.seriesType,
            v = w.setAnimation,
            D = C.getStartAndEndRadians;
        w = l.noop;
        var r = l.Series;
        n("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                connectorShape: "fixedOffset",
                crookDistance: "70%",
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return this.point.isNull ?
                        void 0 : this.point.name
                },
                softConnector: !0,
                x: 0
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            lineWidth: void 0,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: l.seriesTypes.column.prototype.pointAttribs,
            animate: function (b) {
                var a =
                    this,
                    h = a.points,
                    k = a.startAngleRad;
                b || h.forEach(function (b) {
                    var e = b.graphic,
                        g = b.shapeArgs;
                    e && g && (e.attr({
                        r: E(b.startR, a.center && a.center[3] / 2),
                        start: k,
                        end: k
                    }), e.animate({
                        r: g.r,
                        start: g.start,
                        end: g.end
                    }, a.options.animation))
                })
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            updateTotals: function () {
                var b, a = 0,
                    h = this.points,
                    k = h.length,
                    g = this.options.ignoreHiddenPoint;
                for (b = 0; b < k; b++) {
                    var e = h[b];
                    a += g && !e.visible ? 0 : e.isNull ? 0 : e.y
                }
                this.total = a;
                for (b = 0; b < k; b++) e = h[b], e.percentage = 0 < a && (e.visible || !g) ?
                    e.y / a * 100 : 0, e.total = a
            },
            generatePoints: function () {
                r.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function (b, a, h) {
                var k = this.center,
                    g = this.radii ? this.radii[h.index] : k[2] / 2;
                b = Math.asin(H((b - k[1]) / (g + h.labelDistance), -1, 1));
                return k[0] + (a ? -1 : 1) * Math.cos(b) * (g + h.labelDistance) + (0 < h.labelDistance ? (a ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function (b) {
                this.generatePoints();
                var a = 0,
                    h = this.options,
                    k = h.slicedOffset,
                    g = k + (h.borderWidth || 0),
                    e = D(h.startAngle, h.endAngle),
                    m = this.startAngleRad =
                    e.start;
                e = (this.endAngleRad = e.end) - m;
                var n = this.points,
                    p = h.dataLabels.distance;
                h = h.ignoreHiddenPoint;
                var l, r = n.length;
                b || (this.center = b = this.getCenter());
                for (l = 0; l < r; l++) {
                    var q = n[l];
                    var v = m + a * e;
                    if (!h || q.visible) a += q.percentage / 100;
                    var w = m + a * e;
                    q.shapeType = "arc";
                    q.shapeArgs = {
                        x: b[0],
                        y: b[1],
                        r: b[2] / 2,
                        innerR: b[3] / 2,
                        start: Math.round(1E3 * v) / 1E3,
                        end: Math.round(1E3 * w) / 1E3
                    };
                    q.labelDistance = E(q.options.dataLabels && q.options.dataLabels.distance, p);
                    q.labelDistance = t(q.labelDistance, q.shapeArgs.r);
                    this.maxLabelDistance =
                        Math.max(this.maxLabelDistance || 0, q.labelDistance);
                    w = (w + v) / 2;
                    w > 1.5 * Math.PI ? w -= 2 * Math.PI : w < -Math.PI / 2 && (w += 2 * Math.PI);
                    q.slicedTranslation = {
                        translateX: Math.round(Math.cos(w) * k),
                        translateY: Math.round(Math.sin(w) * k)
                    };
                    var f = Math.cos(w) * b[2] / 2;
                    var d = Math.sin(w) * b[2] / 2;
                    q.tooltipPos = [b[0] + .7 * f, b[1] + .7 * d];
                    q.half = w < -Math.PI / 2 || w > Math.PI / 2 ? 1 : 0;
                    q.angle = w;
                    v = Math.min(g, q.labelDistance / 5);
                    q.labelPosition = {
                        natural: {
                            x: b[0] + f + Math.cos(w) * q.labelDistance,
                            y: b[1] + d + Math.sin(w) * q.labelDistance
                        },
                        "final": {},
                        alignment: 0 >
                            q.labelDistance ? "center" : q.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: b[0] + f + Math.cos(w) * v,
                                y: b[1] + d + Math.sin(w) * v
                            },
                            touchingSliceAt: {
                                x: b[0] + f,
                                y: b[1] + d
                            }
                        }
                    }
                }
                y(this, "afterTranslate")
            },
            drawEmpty: function () {
                var m = this.startAngleRad,
                    a = this.endAngleRad,
                    h = this.options;
                if (0 === this.total && this.center) {
                    var k = this.center[0];
                    var g = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(k, g, this.center[1] / 2, 0, m, a).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: b.prototype.symbols.arc(k,
                            g, this.center[2] / 2, 0, {
                                start: m,
                                end: a,
                                innerR: this.center[3] / 2
                            })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": h.borderWidth,
                        fill: h.fillColor || "none",
                        stroke: h.color || "#cccccc"
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            },
            redrawPoints: function () {
                var b = this,
                    a = b.chart,
                    h = a.renderer,
                    k, g, e, n, l = b.options.shadow;
                this.drawEmpty();
                !l || b.shadowGroup || a.styledMode || (b.shadowGroup = h.g("shadow").attr({
                    zIndex: -1
                }).add(b.group));
                b.points.forEach(function (m) {
                    var r = {};
                    g = m.graphic;
                    if (!m.isNull && g) {
                        n =
                            m.shapeArgs;
                        k = m.getTranslate();
                        if (!a.styledMode) {
                            var u = m.shadowGroup;
                            l && !u && (u = m.shadowGroup = h.g("shadow").add(b.shadowGroup));
                            u && u.attr(k);
                            e = b.pointAttribs(m, m.selected && "select")
                        }
                        m.delayedRendering ? (g.setRadialReference(b.center).attr(n).attr(k), a.styledMode || g.attr(e).attr({
                            "stroke-linejoin": "round"
                        }).shadow(l, u), m.delayedRendering = !1) : (g.setRadialReference(b.center), a.styledMode || p(!0, r, e), p(!0, r, n, k), g.animate(r));
                        g.attr({
                            visibility: m.visible ? "inherit" : "hidden"
                        });
                        g.addClass(m.getClassName())
                    } else g &&
                        (m.graphic = g.destroy())
                })
            },
            drawPoints: function () {
                var b = this.chart.renderer;
                this.points.forEach(function (a) {
                    a.graphic && a.hasNewShapeType() && (a.graphic = a.graphic.destroy());
                    a.graphic || (a.graphic = b[a.shapeType](a.shapeArgs).add(a.series.group), a.delayedRendering = !0)
                })
            },
            searchPoint: w,
            sortByAngle: function (b, a) {
                b.sort(function (b, k) {
                    return "undefined" !== typeof b.angle && (k.angle - b.angle) * a
                })
            },
            drawLegendSymbol: q.drawRectangle,
            getCenter: C.getCenter,
            getSymbol: w,
            drawGraph: null
        }, {
            init: function () {
                z.prototype.init.apply(this,
                    arguments);
                var b = this;
                b.name = E(b.name, "Slice");
                var a = function (a) {
                    b.slice("select" === a.type)
                };
                F(b, "select", a);
                F(b, "unselect", a);
                return b
            },
            isValid: function () {
                return A(this.y) && 0 <= this.y
            },
            setVisible: function (b, a) {
                var h = this,
                    k = h.series,
                    g = k.chart,
                    e = k.options.ignoreHiddenPoint;
                a = E(a, e);
                b !== h.visible && (h.visible = h.options.visible = b = "undefined" === typeof b ? !h.visible : b, k.options.data[k.data.indexOf(h)] = h.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (a) {
                        if (h[a]) h[a][b ? "show" : "hide"](!0)
                    }),
                    h.legendItem && g.legend.colorizeItem(h, b), b || "hover" !== h.state || h.setState(""), e && (k.isDirty = !0), a && g.redraw())
            },
            slice: function (b, a, h) {
                var k = this.series;
                v(h, k.chart);
                E(a, !0);
                this.sliced = this.options.sliced = I(b) ? b : !this.sliced;
                k.options.data[k.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function (b) {
                var a =
                    this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(a.x, a.y, a.r + b, a.r + b, {
                    innerR: a.r - 1,
                    start: a.start,
                    end: a.end
                })
            },
            connectorShapes: {
                fixedOffset: function (b, a, h) {
                    var k = a.breakAt;
                    a = a.touchingSliceAt;
                    return [
                        ["M", b.x, b.y], h.softConnector ? ["C", b.x + ("left" === b.alignment ? -5 : 5), b.y, 2 * k.x - a.x, 2 * k.y - a.y, k.x, k.y] : ["L", k.x, k.y],
                        ["L", a.x, a.y]
                    ]
                },
                straight: function (b, a) {
                    a = a.touchingSliceAt;
                    return [
                        ["M", b.x, b.y],
                        ["L", a.x, a.y]
                    ]
                },
                crookedLine: function (b, a, h) {
                    a = a.touchingSliceAt;
                    var k =
                        this.series,
                        g = k.center[0],
                        e = k.chart.plotWidth,
                        m = k.chart.plotLeft;
                    k = b.alignment;
                    var n = this.shapeArgs.r;
                    h = t(h.crookDistance, 1);
                    e = "left" === k ? g + n + (e + m - g - n) * (1 - h) : m + (g - n) * h;
                    h = ["L", e, b.y];
                    g = !0;
                    if ("left" === k ? e > b.x || e < a.x : e < b.x || e > a.x) g = !1;
                    b = [
                        ["M", b.x, b.y]
                    ];
                    g && b.push(h);
                    b.push(["L", a.x, a.y]);
                    return b
                }
            },
            getConnectorPath: function () {
                var b = this.labelPosition,
                    a = this.series.options.dataLabels,
                    h = a.connectorShape,
                    k = this.connectorShapes;
                k[h] && (h = k[h]);
                return h.call(this, {
                        x: b.final.x,
                        y: b.final.y,
                        alignment: b.alignment
                    },
                    b.connectorPosition, a)
            }
        });
        ""
    });
    M(q, "Core/Series/DataLabels.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = l.noop,
            z = l.seriesTypes,
            w = b.arrayMax,
            C = b.clamp,
            F = b.defined,
            H = b.extend,
            I = b.fireEvent,
            y = b.format,
            A = b.getDeferredAnimation,
            p = b.isArray,
            E = b.merge,
            t = b.objectEach,
            n = b.pick,
            v = b.relativeLength,
            D = b.splat,
            r = b.stableSort,
            m = l.Series;
        l.distribute = function (a, b, k) {
            function g(a, e) {
                return a.target - e.target
            }
            var e, h = !0,
                m = a,
                p = [];
            var q = 0;
            var t = m.reducedLen || b;
            for (e = a.length; e--;) q += a[e].size;
            if (q > t) {
                r(a, function (a, e) {
                    return (e.rank || 0) - (a.rank || 0)
                });
                for (q = e = 0; q <= t;) q += a[e].size, e++;
                p = a.splice(e - 1, a.length)
            }
            r(a, g);
            for (a = a.map(function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: n(a.align, .5)
                    }
                }); h;) {
                for (e = a.length; e--;) h = a[e], q = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = C(q - h.size * h.align, 0, b - h.size);
                e = a.length;
                for (h = !1; e--;) 0 < e && a[e - 1].pos + a[e - 1].size > a[e].pos && (a[e - 1].size += a[e].size, a[e - 1].targets = a[e - 1].targets.concat(a[e].targets), a[e - 1].align = .5, a[e - 1].pos +
                    a[e - 1].size > b && (a[e - 1].pos = b - a[e - 1].size), a.splice(e, 1), h = !0)
            }
            m.push.apply(m, p);
            e = 0;
            a.some(function (a) {
                var g = 0;
                if (a.targets.some(function () {
                        m[e].pos = a.pos + g;
                        if ("undefined" !== typeof k && Math.abs(m[e].pos - m[e].target) > k) return m.slice(0, e + 1).forEach(function (a) {
                            delete a.pos
                        }), m.reducedLen = (m.reducedLen || b) - .1 * b, m.reducedLen > .1 * b && l.distribute(m, b, k), !0;
                        g += m[e].size;
                        e++
                    })) return !0
            });
            r(m, g)
        };
        m.prototype.drawDataLabels = function () {
            function a(a, e) {
                var d = e.filter;
                return d ? (e = d.operator, a = a[d.property], d = d.value,
                    ">" === e && a > d || "<" === e && a < d || ">=" === e && a >= d || "<=" === e && a <= d || "==" === e && a == d || "===" === e && a === d ? !0 : !1) : !0
            }

            function b(a, e) {
                var d = [],
                    c;
                if (p(a) && !p(e)) d = a.map(function (a) {
                    return E(a, e)
                });
                else if (p(e) && !p(a)) d = e.map(function (c) {
                    return E(a, c)
                });
                else if (p(a) || p(e))
                    for (c = Math.max(a.length, e.length); c--;) d[c] = E(a[c], e[c]);
                else d = E(a, e);
                return d
            }
            var k = this,
                g = k.chart,
                e = k.options,
                m = e.dataLabels,
                l = k.points,
                r, q = k.hasRendered || 0,
                v = m.animation;
            v = m.defer ? A(g, v, k) : {
                defer: 0,
                duration: 0
            };
            var w = g.renderer;
            m = b(b(g.options.plotOptions &&
                g.options.plotOptions.series && g.options.plotOptions.series.dataLabels, g.options.plotOptions && g.options.plotOptions[k.type] && g.options.plotOptions[k.type].dataLabels), m);
            I(this, "drawDataLabels");
            if (p(m) || m.enabled || k._hasPointLabels) {
                var z = k.plotGroup("dataLabelsGroup", "data-labels", q ? "inherit" : "hidden", m.zIndex || 6);
                z.attr({
                    opacity: +q
                });
                !q && (q = k.dataLabelsGroup) && (k.visible && z.show(!0), q[e.animation ? "animate" : "attr"]({
                    opacity: 1
                }, v));
                l.forEach(function (h) {
                    r = D(b(m, h.dlOptions || h.options && h.options.dataLabels));
                    r.forEach(function (b, d) {
                        var c = b.enabled && (!h.isNull || h.dataLabelOnNull) && a(h, b),
                            f = h.dataLabels ? h.dataLabels[d] : h.dataLabel,
                            m = h.connectors ? h.connectors[d] : h.connector,
                            p = n(b.distance, h.labelDistance),
                            l = !f;
                        if (c) {
                            var r = h.getLabelConfig();
                            var u = n(b[h.formatPrefix + "Format"], b.format);
                            r = F(u) ? y(u, r, g) : (b[h.formatPrefix + "Formatter"] || b.formatter).call(r, b);
                            u = b.style;
                            var x = b.rotation;
                            g.styledMode || (u.color = n(b.color, u.color, k.color, "#000000"), "contrast" === u.color ? (h.contrastColor = w.getContrast(h.color || k.color),
                                u.color = !F(p) && b.inside || 0 > p || e.stacking ? h.contrastColor : "#000000") : delete h.contrastColor, e.cursor && (u.cursor = e.cursor));
                            var q = {
                                r: b.borderRadius || 0,
                                rotation: x,
                                padding: b.padding,
                                zIndex: 1
                            };
                            g.styledMode || (q.fill = b.backgroundColor, q.stroke = b.borderColor, q["stroke-width"] = b.borderWidth);
                            t(q, function (a, c) {
                                "undefined" === typeof a && delete q[c]
                            })
                        }!f || c && F(r) ? c && F(r) && (f ? q.text = r : (h.dataLabels = h.dataLabels || [], f = h.dataLabels[d] = x ? w.text(r, 0, -9999, b.useHTML).addClass("highcharts-data-label") : w.label(r, 0, -9999,
                            b.shape, null, null, b.useHTML, null, "data-label"), d || (h.dataLabel = f), f.addClass(" highcharts-data-label-color-" + h.colorIndex + " " + (b.className || "") + (b.useHTML ? " highcharts-tracker" : ""))), f.options = b, f.attr(q), g.styledMode || f.css(u).shadow(b.shadow), f.added || f.add(z), b.textPath && !b.useHTML && (f.setTextPath(h.getDataLabelPath && h.getDataLabelPath(f) || h.graphic, b.textPath), h.dataLabelPath && !b.textPath.enabled && (h.dataLabelPath = h.dataLabelPath.destroy())), k.alignDataLabel(h, f, b, null, l)) : (h.dataLabel = h.dataLabel &&
                            h.dataLabel.destroy(), h.dataLabels && (1 === h.dataLabels.length ? delete h.dataLabels : delete h.dataLabels[d]), d || delete h.dataLabel, m && (h.connector = h.connector.destroy(), h.connectors && (1 === h.connectors.length ? delete h.connectors : delete h.connectors[d])))
                    })
                })
            }
            I(this, "afterDrawDataLabels")
        };
        m.prototype.alignDataLabel = function (a, b, k, g, e) {
            var h = this,
                m = this.chart,
                p = this.isCartesian && m.inverted,
                l = this.enabledDataSorting,
                r = n(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                q = n(a.plotY, -9999),
                t = b.getBBox(),
                v = k.rotation,
                f = k.align,
                d = m.isInsidePlot(r, Math.round(q), p),
                c = "justify" === n(k.overflow, l ? "none" : "justify"),
                y = this.visible && !1 !== a.visible && (a.series.forceDL || l && !c || d || k.inside && g && m.isInsidePlot(r, p ? g.x + 1 : g.y + g.height - 1, p));
            var w = function (f) {
                l && h.xAxis && !c && h.setDataLabelStartPos(a, b, e, d, f)
            };
            if (y) {
                var A = m.renderer.fontMetrics(m.styledMode ? void 0 : k.style.fontSize, b).b;
                g = H({
                    x: p ? this.yAxis.len - q : r,
                    y: Math.round(p ? this.xAxis.len - r : q),
                    width: 0,
                    height: 0
                }, g);
                H(k, {
                    width: t.width,
                    height: t.height
                });
                v ? (c = !1, r = m.renderer.rotCorr(A,
                    v), r = {
                    x: g.x + (k.x || 0) + g.width / 2 + r.x,
                    y: g.y + (k.y || 0) + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    } [k.verticalAlign] * g.height
                }, w(r), b[e ? "attr" : "animate"](r).attr({
                    align: f
                }), w = (v + 720) % 360, w = 180 < w && 360 > w, "left" === f ? r.y -= w ? t.height : 0 : "center" === f ? (r.x -= t.width / 2, r.y -= t.height / 2) : "right" === f && (r.x -= t.width, r.y -= w ? 0 : t.height), b.placed = !0, b.alignAttr = r) : (w(g), b.align(k, null, g), r = b.alignAttr);
                c && 0 <= g.height ? this.justifyDataLabel(b, k, r, t, g, e) : n(k.crop, !0) && (y = m.isInsidePlot(r.x, r.y) && m.isInsidePlot(r.x + t.width, r.y + t.height));
                if (k.shape &&
                    !v) b[e ? "attr" : "animate"]({
                    anchorX: p ? m.plotWidth - a.plotY : a.plotX,
                    anchorY: p ? m.plotHeight - a.plotX : a.plotY
                })
            }
            e && l && (b.placed = !1);
            y || l && !c || (b.hide(!0), b.placed = !1)
        };
        m.prototype.setDataLabelStartPos = function (a, b, k, g, e) {
            var h = this.chart,
                m = h.inverted,
                n = this.xAxis,
                p = n.reversed,
                l = m ? b.height / 2 : b.width / 2;
            a = (a = a.pointWidth) ? a / 2 : 0;
            n = m ? e.x : p ? -l - a : n.width - l + a;
            e = m ? p ? this.yAxis.height - l + a : -l - a : e.y;
            b.startXPos = n;
            b.startYPos = e;
            g ? "hidden" === b.visibility && (b.show(), b.attr({
                opacity: 0
            }).animate({
                opacity: 1
            })) : b.attr({
                opacity: 1
            }).animate({
                    opacity: 0
                },
                void 0, b.hide);
            h.hasRendered && (k && b.attr({
                x: b.startXPos,
                y: b.startYPos
            }), b.placed = !0)
        };
        m.prototype.justifyDataLabel = function (a, b, k, g, e, m) {
            var h = this.chart,
                n = b.align,
                p = b.verticalAlign,
                l = a.box ? 0 : a.padding || 0,
                r = b.x;
            r = void 0 === r ? 0 : r;
            var q = b.y;
            var x = void 0 === q ? 0 : q;
            q = k.x + l;
            if (0 > q) {
                "right" === n && 0 <= r ? (b.align = "left", b.inside = !0) : r -= q;
                var f = !0
            }
            q = k.x + g.width - l;
            q > h.plotWidth && ("left" === n && 0 >= r ? (b.align = "right", b.inside = !0) : r += h.plotWidth - q, f = !0);
            q = k.y + l;
            0 > q && ("bottom" === p && 0 <= x ? (b.verticalAlign = "top", b.inside = !0) : x -= q, f = !0);
            q = k.y + g.height - l;
            q > h.plotHeight && ("top" === p && 0 >= x ? (b.verticalAlign = "bottom", b.inside = !0) : x += h.plotHeight - q, f = !0);
            f && (b.x = r, b.y = x, a.placed = !m, a.align(b, void 0, e));
            return f
        };
        z.pie && (z.pie.prototype.dataLabelPositioners = {
                radialDistributionY: function (a) {
                    return a.top + a.distributeBox.pos
                },
                radialDistributionX: function (a, b, k, g) {
                    return a.getX(k < b.top + 2 || k > b.bottom - 2 ? g : k, b.half, b)
                },
                justify: function (a, b, k) {
                    return k[0] + (a.half ? -1 : 1) * (b + a.labelDistance)
                },
                alignToPlotEdges: function (a, b, k, g) {
                    a = a.getBBox().width;
                    return b ? a + g : k - a - g
                },
                alignToConnectors: function (a, b, k, g) {
                    var e = 0,
                        h;
                    a.forEach(function (a) {
                        h = a.dataLabel.getBBox().width;
                        h > e && (e = h)
                    });
                    return b ? e + g : k - e - g
                }
            }, z.pie.prototype.drawDataLabels = function () {
                var a = this,
                    b = a.data,
                    k, g = a.chart,
                    e = a.options.dataLabels || {},
                    p = e.connectorPadding,
                    r, q = g.plotWidth,
                    t = g.plotHeight,
                    v = g.plotLeft,
                    y = Math.round(g.chartWidth / 3),
                    A, z = a.center,
                    f = z[2] / 2,
                    d = z[1],
                    c, D, C, H, I = [
                        [],
                        []
                    ],
                    Q, M, Y, W, R = [0, 0, 0, 0],
                    T = a.dataLabelPositioners,
                    X;
                a.visible && (e.enabled || a._hasPointLabels) && (b.forEach(function (a) {
                        a.dataLabel &&
                            a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                                width: "auto"
                            }).css({
                                width: "auto",
                                textOverflow: "clip"
                            }), a.dataLabel.shortened = !1)
                    }), m.prototype.drawDataLabels.apply(a), b.forEach(function (a) {
                        a.dataLabel && (a.visible ? (I[a.half].push(a), a.dataLabel._pos = null, !F(e.style.width) && !F(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > y && (a.dataLabel.css({
                            width: Math.round(.7 * y) + "px"
                        }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(),
                            a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
                    }), I.forEach(function (b, h) {
                        var m = b.length,
                            r = [],
                            u;
                        if (m) {
                            a.sortByAngle(b, h - .5);
                            if (0 < a.maxLabelDistance) {
                                var x = Math.max(0, d - f - a.maxLabelDistance);
                                var y = Math.min(d + f + a.maxLabelDistance, g.plotHeight);
                                b.forEach(function (a) {
                                    0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, d - f - a.labelDistance), a.bottom = Math.min(d + f + a.labelDistance, g.plotHeight), u = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                        target: a.labelPosition.natural.y - a.top + u / 2,
                                        size: u,
                                        rank: a.y
                                    }, r.push(a.distributeBox))
                                });
                                x = y + u - x;
                                l.distribute(r, x, x / 5)
                            }
                            for (W = 0; W < m; W++) {
                                k = b[W];
                                C = k.labelPosition;
                                c = k.dataLabel;
                                Y = !1 === k.visible ? "hidden" : "inherit";
                                M = x = C.natural.y;
                                r && F(k.distributeBox) && ("undefined" === typeof k.distributeBox.pos ? Y = "hidden" : (H = k.distributeBox.size, M = T.radialDistributionY(k)));
                                delete k.positionIndex;
                                if (e.justify) Q = T.justify(k, f, z);
                                else switch (e.alignTo) {
                                    case "connectors":
                                        Q = T.alignToConnectors(b, h, q, v);
                                        break;
                                    case "plotEdges":
                                        Q = T.alignToPlotEdges(c, h, q, v);
                                        break;
                                    default:
                                        Q = T.radialDistributionX(a,
                                            k, M, x)
                                }
                                c._attr = {
                                    visibility: Y,
                                    align: C.alignment
                                };
                                X = k.options.dataLabels || {};
                                c._pos = {
                                    x: Q + n(X.x, e.x) + ({
                                        left: p,
                                        right: -p
                                    } [C.alignment] || 0),
                                    y: M + n(X.y, e.y) - 10
                                };
                                C.final.x = Q;
                                C.final.y = M;
                                n(e.crop, !0) && (D = c.getBBox().width, x = null, Q - D < p && 1 === h ? (x = Math.round(D - Q + p), R[3] = Math.max(x, R[3])) : Q + D > q - p && 0 === h && (x = Math.round(Q + D - q + p), R[1] = Math.max(x, R[1])), 0 > M - H / 2 ? R[0] = Math.max(Math.round(-M + H / 2), R[0]) : M + H / 2 > t && (R[2] = Math.max(Math.round(M + H / 2 - t), R[2])), c.sideOverflow = x)
                            }
                        }
                    }), 0 === w(R) || this.verifyDataLabelOverflow(R)) &&
                    (this.placeDataLabels(), this.points.forEach(function (d) {
                        X = E(e, d.options.dataLabels);
                        if (r = n(X.connectorWidth, 1)) {
                            var b;
                            A = d.connector;
                            if ((c = d.dataLabel) && c._pos && d.visible && 0 < d.labelDistance) {
                                Y = c._attr.visibility;
                                if (b = !A) d.connector = A = g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + d.colorIndex + (d.className ? " " + d.className : "")).add(a.dataLabelsGroup), g.styledMode || A.attr({
                                    "stroke-width": r,
                                    stroke: X.connectorColor || d.color || "#666666"
                                });
                                A[b ? "attr" : "animate"]({
                                    d: d.getConnectorPath()
                                });
                                A.attr("visibility", Y)
                            } else A && (d.connector = A.destroy())
                        }
                    }))
            }, z.pie.prototype.placeDataLabels = function () {
                this.points.forEach(function (a) {
                    var b = a.dataLabel,
                        k;
                    b && a.visible && ((k = b._pos) ? (b.sideOverflow && (b._attr.width = Math.max(b.getBBox().width - b.sideOverflow, 0), b.css({
                        width: b._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](k), b.moved = !0) : b && b.attr({
                        y: -9999
                    }));
                    delete a.distributeBox
                }, this)
            }, z.pie.prototype.alignDataLabel =
            q, z.pie.prototype.verifyDataLabelOverflow = function (a) {
                var b = this.center,
                    k = this.options,
                    g = k.center,
                    e = k.minSize || 80,
                    m = null !== k.size;
                if (!m) {
                    if (null !== g[0]) var n = Math.max(b[2] - Math.max(a[1], a[3]), e);
                    else n = Math.max(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2;
                    null !== g[1] ? n = C(n, e, b[2] - Math.max(a[0], a[2])) : (n = C(n, e, b[2] - a[0] - a[2]), b[1] += (a[0] - a[2]) / 2);
                    n < b[2] ? (b[2] = n, b[3] = Math.min(v(k.innerSize || 0, n), n), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : m = !0
                }
                return m
            });
        z.column && (z.column.prototype.alignDataLabel =
            function (a, b, k, g, e) {
                var h = this.chart.inverted,
                    p = a.series,
                    l = a.dlBox || a.shapeArgs,
                    r = n(a.below, a.plotY > n(this.translatedThreshold, p.yAxis.len)),
                    q = n(k.inside, !!this.options.stacking);
                l && (g = E(l), 0 > g.y && (g.height += g.y, g.y = 0), l = g.y + g.height - p.yAxis.len, 0 < l && l < g.height && (g.height -= l), h && (g = {
                    x: p.yAxis.len - g.y - g.height,
                    y: p.xAxis.len - g.x - g.width,
                    width: g.height,
                    height: g.width
                }), q || (h ? (g.x += r ? 0 : g.width, g.width = 0) : (g.y += r ? g.height : 0, g.height = 0)));
                k.align = n(k.align, !h || q ? "center" : r ? "right" : "left");
                k.verticalAlign =
                    n(k.verticalAlign, h || q ? "middle" : r ? "top" : "bottom");
                m.prototype.alignDataLabel.call(this, a, b, k, g, e);
                k.inside && a.contrastColor && b.css({
                    color: a.contrastColor
                })
            })
    });
    M(q, "Extensions/OverlappingDataLabels.js", [q["Core/Chart/Chart.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.addEvent,
            z = b.fireEvent,
            w = b.isArray,
            C = b.isNumber,
            F = b.objectEach,
            H = b.pick;
        q(l, "render", function () {
            var b = [];
            (this.labelCollectors || []).forEach(function (l) {
                b = b.concat(l())
            });
            (this.yAxis || []).forEach(function (l) {
                l.stacking && l.options.stackLabels &&
                    !l.options.stackLabels.allowOverlap && F(l.stacking.stacks, function (l) {
                        F(l, function (p) {
                            b.push(p.label)
                        })
                    })
            });
            (this.series || []).forEach(function (l) {
                var q = l.options.dataLabels;
                l.visible && (!1 !== q.enabled || l._hasPointLabels) && (l.nodes || l.points).forEach(function (p) {
                    p.visible && (w(p.dataLabels) ? p.dataLabels : p.dataLabel ? [p.dataLabel] : []).forEach(function (l) {
                        var q = l.options;
                        l.labelrank = H(q.labelrank, p.labelrank, p.shapeArgs && p.shapeArgs.height);
                        q.allowOverlap || b.push(l)
                    })
                })
            });
            this.hideOverlappingLabels(b)
        });
        l.prototype.hideOverlappingLabels = function (b) {
            var l = this,
                q = b.length,
                p = l.renderer,
                w, t, n, v = !1;
            var D = function (a) {
                var b, k = a.box ? 0 : a.padding || 0,
                    g = b = 0,
                    e;
                if (a && (!a.alignAttr || a.placed)) {
                    var m = a.alignAttr || {
                        x: a.attr("x"),
                        y: a.attr("y")
                    };
                    var n = a.parentGroup;
                    a.width || (b = a.getBBox(), a.width = b.width, a.height = b.height, b = p.fontMetrics(null, a.element).h);
                    var l = a.width - 2 * k;
                    (e = {
                        left: "0",
                        center: "0.5",
                        right: "1"
                    } [a.alignValue]) ? g = +e * l: C(a.x) && Math.round(a.x) !== a.translateX && (g = a.x - a.translateX);
                    return {
                        x: m.x + (n.translateX ||
                            0) + k - (g || 0),
                        y: m.y + (n.translateY || 0) + k - b,
                        width: a.width - 2 * k,
                        height: a.height - 2 * k
                    }
                }
            };
            for (t = 0; t < q; t++)
                if (w = b[t]) w.oldOpacity = w.opacity, w.newOpacity = 1, w.absoluteBox = D(w);
            b.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (t = 0; t < q; t++) {
                var r = (D = b[t]) && D.absoluteBox;
                for (w = t + 1; w < q; ++w) {
                    var m = (n = b[w]) && n.absoluteBox;
                    !r || !m || D === n || 0 === D.newOpacity || 0 === n.newOpacity || m.x >= r.x + r.width || m.x + m.width <= r.x || m.y >= r.y + r.height || m.y + m.height <= r.y || ((D.labelrank < n.labelrank ? D : n).newOpacity = 0)
                }
            }
            b.forEach(function (a) {
                if (a) {
                    var b =
                        a.newOpacity;
                    a.oldOpacity !== b && (a.alignAttr && a.placed ? (a[b ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), v = !0, a.alignAttr.opacity = b, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () {
                        l.styledMode || a.css({
                            pointerEvents: b ? "auto" : "none"
                        });
                        a.visibility = b ? "inherit" : "hidden"
                    }), z(l, "afterHideOverlappingLabel")) : a.attr({
                        opacity: b
                    }));
                    a.isOld = !0
                }
            });
            v && z(l, "afterHideAllOverlappingLabels")
        }
    });
    M(q, "Core/Interaction.js", [q["Core/Chart/Chart.js"], q["Core/Globals.js"], q["Core/Legend.js"], q["Core/Options.js"],
        q["Core/Series/Point.js"], q["Core/Utilities.js"]
    ], function (l, b, q, z, w, C) {
        var F = z.defaultOptions,
            H = C.addEvent,
            I = C.createElement,
            y = C.css,
            A = C.defined,
            p = C.extend,
            E = C.fireEvent,
            t = C.isArray,
            n = C.isFunction,
            v = C.isNumber,
            D = C.isObject,
            r = C.merge,
            m = C.objectEach,
            a = C.pick,
            h = b.hasTouch;
        z = b.Series;
        C = b.seriesTypes;
        var k = b.svg;
        var g = b.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart,
                    g = b.pointer,
                    k = function (a) {
                        var b = g.getPointFromEvent(a);
                        "undefined" !== typeof b && (g.isDirectTouch = !0, b.onMouseOver(a))
                    },
                    m;
                a.points.forEach(function (a) {
                    m = t(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    m.forEach(function (b) {
                        b.div ? b.div.point = a : b.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function (e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", k).on("mouseout", function (a) {
                            g.onTrackerMouseOut(a)
                        });
                        if (h) a[e].on("touchstart", k);
                        !b.styledMode && a.options.cursor && a[e].css(y).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                E(this, "afterDrawTracker")
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options,
                    g = b.trackByArea,
                    m = [].concat(g ? a.areaPath : a.graphPath),
                    n = a.chart,
                    p = n.pointer,
                    l = n.renderer,
                    r = n.options.tooltip.snap,
                    q = a.tracker,
                    f = function (c) {
                        if (n.hoverSeries !== a) a.onMouseOver()
                    },
                    d = "rgba(192,192,192," + (k ? .0001 : .002) + ")";
                q ? q.attr({
                    d: m
                }) : a.graph && (a.tracker = l.path(m).attr({
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(g ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), n.styledMode || a.tracker.attr({
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    stroke: d,
                    fill: g ? d : "none",
                    "stroke-width": a.graph.strokeWidth() + (g ? 0 : 2 * r)
                }), [a.tracker, a.markerGroup].forEach(function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                        p.onTrackerMouseOut(a)
                    });
                    b.cursor && !n.styledMode && a.css({
                        cursor: b.cursor
                    });
                    if (h) a.on("touchstart", f)
                }));
                E(this, "afterDrawTracker")
            }
        };
        C.column && (C.column.prototype.drawTracker = g.drawTrackerPoint);
        C.pie && (C.pie.prototype.drawTracker = g.drawTrackerPoint);
        C.scatter && (C.scatter.prototype.drawTracker =
            g.drawTrackerPoint);
        p(q.prototype, {
            setItemEvents: function (a, b, g) {
                var e = this,
                    h = e.chart.renderer.boxWrapper,
                    k = a instanceof w,
                    m = "highcharts-legend-" + (k ? "point" : "series") + "-active",
                    n = e.chart.styledMode;
                (g ? [b, a.legendSymbol] : [a.legendGroup]).forEach(function (g) {
                    if (g) g.on("mouseover", function () {
                        a.visible && e.allItems.forEach(function (b) {
                            a !== b && b.setState("inactive", !k)
                        });
                        a.setState("hover");
                        a.visible && h.addClass(m);
                        n || b.css(e.options.itemHoverStyle)
                    }).on("mouseout", function () {
                        e.chart.styledMode || b.css(r(a.visible ?
                            e.itemStyle : e.itemHiddenStyle));
                        e.allItems.forEach(function (b) {
                            a !== b && b.setState("", !k)
                        });
                        h.removeClass(m);
                        a.setState()
                    }).on("click", function (b) {
                        var d = function () {
                            a.setVisible && a.setVisible();
                            e.allItems.forEach(function (c) {
                                a !== c && c.setState(a.visible ? "inactive" : "", !k)
                            })
                        };
                        h.removeClass(m);
                        b = {
                            browserEvent: b
                        };
                        a.firePointEvent ? a.firePointEvent("legendItemClick", b, d) : E(a, "legendItemClick", b, d)
                    })
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = I("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                H(a.checkbox, "click", function (b) {
                    E(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        p(l.prototype, {
            showResetZoom: function () {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    g = F.lang,
                    h = b.options.chart.resetZoomButton,
                    k = h.theme,
                    m = k.states,
                    n = "chart" === h.relativeTo || "spaceBox" === h.relativeTo ? null : "plotBox";
                E(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(g.resetZoom,
                        null, null, a, k, m && m.hover).attr({
                        align: h.position.align,
                        title: g.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(h.position, !1, n)
                });
                E(this, "afterShowResetZoom")
            },
            zoomOut: function () {
                E(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function (b) {
                var e = this,
                    g, h = e.pointer,
                    k = !1,
                    m = e.inverted ? h.mouseDownX : h.mouseDownY;
                !b || b.resetSelection ? (e.axes.forEach(function (a) {
                    g = a.zoom()
                }), h.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function (a) {
                    var b = a.axis,
                        f = e.inverted ? b.left : b.top,
                        d = e.inverted ?
                        f + b.width : f + b.height,
                        c = b.isXAxis,
                        n = !1;
                    if (!c && m >= f && m <= d || c || !A(m)) n = !0;
                    h[c ? "zoomX" : "zoomY"] && n && (g = b.zoom(a.min, a.max), b.displayBtn && (k = !0))
                });
                var n = e.resetZoomButton;
                k && !n ? e.showResetZoom() : !k && D(n) && (e.resetZoomButton = n.destroy());
                g && e.redraw(a(e.options.chart.animation, b && b.animation, 100 > e.pointCount))
            },
            pan: function (a, g) {
                var e = this,
                    h = e.hoverPoints,
                    k = e.options.chart,
                    m = e.options.mapNavigation && e.options.mapNavigation.enabled,
                    n;
                g = "object" === typeof g ? g : {
                    enabled: g,
                    type: "x"
                };
                k && k.panning && (k.panning =
                    g);
                var p = g.type;
                E(this, "pan", {
                    originalEvent: a
                }, function () {
                    h && h.forEach(function (a) {
                        a.setState()
                    });
                    var g = [1];
                    "xy" === p ? g = [1, 0] : "y" === p && (g = [0]);
                    g.forEach(function (f) {
                        var d = e[f ? "xAxis" : "yAxis"][0],
                            c = d.horiz,
                            g = a[c ? "chartX" : "chartY"];
                        c = c ? "mouseDownX" : "mouseDownY";
                        var h = e[c],
                            k = (d.pointRange || 0) / 2,
                            l = d.reversed && !e.inverted || !d.reversed && e.inverted ? -1 : 1,
                            r = d.getExtremes(),
                            u = d.toValue(h - g, !0) + k * l;
                        l = d.toValue(h + d.len - g, !0) - k * l;
                        var q = l < u;
                        h = q ? l : u;
                        u = q ? u : l;
                        var t = d.hasVerticalPanning(),
                            x = d.panningState;
                        d.series.forEach(function (a) {
                            if (t &&
                                !f && (!x || x.isDirty)) {
                                var c = a.getProcessedData(!0);
                                a = a.getExtremes(c.yData, !0);
                                x || (x = {
                                    startMin: Number.MAX_VALUE,
                                    startMax: -Number.MAX_VALUE
                                });
                                v(a.dataMin) && v(a.dataMax) && (x.startMin = Math.min(a.dataMin, x.startMin), x.startMax = Math.max(a.dataMax, x.startMax))
                            }
                        });
                        l = Math.min(b.pick(null === x || void 0 === x ? void 0 : x.startMin, r.dataMin), k ? r.min : d.toValue(d.toPixels(r.min) - d.minPixelPadding));
                        k = Math.max(b.pick(null === x || void 0 === x ? void 0 : x.startMax, r.dataMax), k ? r.max : d.toValue(d.toPixels(r.max) + d.minPixelPadding));
                        d.panningState = x;
                        d.isOrdinal || (q = l - h, 0 < q && (u += q, h = l), q = u - k, 0 < q && (u = k, h -= q), d.series.length && h !== r.min && u !== r.max && h >= l && u <= k && (d.setExtremes(h, u, !1, !1, {
                            trigger: "pan"
                        }), e.resetZoomButton || m || h === l || u === k || !p.match("y") || (e.showResetZoom(), d.displayBtn = !1), n = !0), e[c] = g)
                    });
                    n && e.redraw(!1);
                    y(e.container, {
                        cursor: "move"
                    })
                })
            }
        });
        p(w.prototype, {
            select: function (b, g) {
                var e = this,
                    h = e.series,
                    k = h.chart;
                this.selectedStaging = b = a(b, !e.selected);
                e.firePointEvent(b ? "select" : "unselect", {
                    accumulate: g
                }, function () {
                    e.selected =
                        e.options.selected = b;
                    h.options.data[h.data.indexOf(e)] = e.options;
                    e.setState(b && "select");
                    g || k.getSelectedPoints().forEach(function (a) {
                        var b = a.series;
                        a.selected && a !== e && (a.selected = a.options.selected = !1, b.options.data[b.data.indexOf(a)] = a.options, a.setState(k.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            },
            onMouseOver: function (a) {
                var b = this.series.chart,
                    e = b.pointer;
                a = a ? e.normalize(a) : e.getChartCoordinatesFromPoint(this, b.inverted);
                e.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = this,
                        b = r(a.series.options.point, a.options).events;
                    a.events = b;
                    m(b, function (b, e) {
                        n(b) && H(a, e, b)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (b, g) {
                var e = this.series,
                    h = this.state,
                    k = e.options.states[b || "normal"] || {},
                    m = F.plotOptions[e.type].marker && e.options.marker,
                    n = m && !1 === m.enabled,
                    l = m && m.states && m.states[b || "normal"] || {},
                    r = !1 === l.enabled,
                    f = e.stateMarkerGraphic,
                    d = this.marker || {},
                    c = e.chart,
                    q = e.halo,
                    t, x = m && e.markerAttribs;
                b = b || "";
                if (!(b === this.state && !g || this.selected && "select" !== b || !1 === k.enabled || b && (r || n && !1 === l.enabled) || b && d.states && d.states[b] && !1 === d.states[b].enabled)) {
                    this.state = b;
                    x && (t = e.markerAttribs(this, b));
                    if (this.graphic) {
                        h && this.graphic.removeClass("highcharts-point-" + h);
                        b && this.graphic.addClass("highcharts-point-" +
                            b);
                        if (!c.styledMode) {
                            var v = e.pointAttribs(this, b);
                            var w = a(c.options.chart.animation, k.animation);
                            e.options.inactiveOtherPoints && v.opacity && ((this.dataLabels || []).forEach(function (a) {
                                a && a.animate({
                                    opacity: v.opacity
                                }, w)
                            }), this.connector && this.connector.animate({
                                opacity: v.opacity
                            }, w));
                            this.graphic.animate(v, w)
                        }
                        t && this.graphic.animate(t, a(c.options.chart.animation, l.animation, m.animation));
                        f && f.hide()
                    } else {
                        if (b && l) {
                            h = d.symbol || e.symbol;
                            f && f.currentSymbol !== h && (f = f.destroy());
                            if (t)
                                if (f) f[g ? "animate" : "attr"]({
                                    x: t.x,
                                    y: t.y
                                });
                                else h && (e.stateMarkerGraphic = f = c.renderer.symbol(h, t.x, t.y, t.width, t.height).add(e.markerGroup), f.currentSymbol = h);
                            !c.styledMode && f && f.attr(e.pointAttribs(this, b))
                        }
                        f && (f[b && this.isInside ? "show" : "hide"](), f.element.point = this)
                    }
                    b = k.halo;
                    k = (f = this.graphic || f) && f.visibility || "inherit";
                    b && b.size && f && "hidden" !== k && !this.isCluster ? (q || (e.halo = q = c.renderer.path().add(f.parentGroup)), q.show()[g ? "animate" : "attr"]({
                        d: this.haloPath(b.size)
                    }), q.attr({
                        "class": "highcharts-halo highcharts-color-" + a(this.colorIndex,
                            e.colorIndex) + (this.className ? " " + this.className : ""),
                        visibility: k,
                        zIndex: -1
                    }), q.point = this, c.styledMode || q.attr(p({
                        fill: this.color || e.color,
                        "fill-opacity": b.opacity
                    }, b.attributes))) : q && q.point && q.point.haloPath && q.animate({
                        d: q.point.haloPath(0)
                    }, null, q.hide);
                    E(this, "afterSetState")
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        p(z.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                a.pointer.setHoverChartIndex();
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && E(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    g = b.tooltip,
                    h = b.hoverPoint;
                b.hoverSeries = null;
                if (h) h.onMouseOut();
                this && a.events.mouseOut && E(this, "mouseOut");
                !g || this.stickyTracking || g.shared && !this.noSharedTooltip || g.hide();
                b.series.forEach(function (a) {
                    a.setState("", !0)
                })
            },
            setState: function (b, g) {
                var e = this,
                    h = e.options,
                    k = e.graph,
                    m = h.inactiveOtherPoints,
                    n = h.states,
                    p = h.lineWidth,
                    l = h.opacity,
                    f = a(n[b || "normal"] && n[b || "normal"].animation, e.chart.options.chart.animation);
                h = 0;
                b = b || "";
                if (e.state !== b && ([e.group, e.markerGroup, e.dataLabelsGroup].forEach(function (a) {
                        a && (e.state && a.removeClass("highcharts-series-" + e.state), b && a.addClass("highcharts-series-" + b))
                    }), e.state = b, !e.chart.styledMode)) {
                    if (n[b] && !1 === n[b].enabled) return;
                    b && (p = n[b].lineWidth || p + (n[b].lineWidthPlus || 0), l = a(n[b].opacity, l));
                    if (k && !k.dashstyle)
                        for (n = {
                                "stroke-width": p
                            }, k.animate(n, f); e["zone-graph-" + h];) e["zone-graph-" +
                            h].attr(n), h += 1;
                    m || [e.group, e.markerGroup, e.dataLabelsGroup, e.labelBySeries].forEach(function (a) {
                        a && a.animate({
                            opacity: l
                        }, f)
                    })
                }
                g && m && e.points && e.setAllPointsToState(b)
            },
            setAllPointsToState: function (a) {
                this.points.forEach(function (b) {
                    b.setState && b.setState(a)
                })
            },
            setVisible: function (a, b) {
                var e = this,
                    g = e.chart,
                    h = e.legendItem,
                    k = g.options.chart.ignoreHiddenSeries,
                    m = e.visible;
                var n = (e.visible = a = e.options.visible = e.userOptions.visible = "undefined" === typeof a ? !m : a) ? "show" : "hide";
                ["group", "dataLabelsGroup",
                    "markerGroup", "tracker", "tt"
                ].forEach(function (a) {
                    if (e[a]) e[a][n]()
                });
                if (g.hoverSeries === e || (g.hoverPoint && g.hoverPoint.series) === e) e.onMouseOut();
                h && g.legend.colorizeItem(e, a);
                e.isDirty = !0;
                e.options.stacking && g.series.forEach(function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                e.linkedSeries.forEach(function (b) {
                    b.setVisible(a, !1)
                });
                k && (g.isDirtyBox = !0);
                E(e, n);
                !1 !== b && g.redraw()
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = this.options.selected =
                    "undefined" === typeof a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                E(this, a ? "select" : "unselect")
            },
            drawTracker: g.drawTrackerGraph
        })
    });
    M(q, "Core/Responsive.js", [q["Core/Chart/Chart.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.find,
            z = b.isArray,
            w = b.isObject,
            C = b.merge,
            F = b.objectEach,
            H = b.pick,
            I = b.splat,
            y = b.uniqueKey;
        l.prototype.setResponsive = function (b, p) {
            var l = this.options.responsive,
                t = [],
                n = this.currentResponsive;
            !p && l && l.rules && l.rules.forEach(function (b) {
                "undefined" === typeof b._id &&
                    (b._id = y());
                this.matchResponsiveRule(b, t)
            }, this);
            p = C.apply(0, t.map(function (b) {
                return q(l.rules, function (n) {
                    return n._id === b
                }).chartOptions
            }));
            p.isResponsiveOptions = !0;
            t = t.toString() || void 0;
            t !== (n && n.ruleIds) && (n && this.update(n.undoOptions, b, !0), t ? (n = this.currentOptions(p), n.isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: t,
                mergedOptions: p,
                undoOptions: n
            }, this.update(p, b, !0)) : this.currentResponsive = void 0)
        };
        l.prototype.matchResponsiveRule = function (b, p) {
            var l = b.condition;
            (l.callback || function () {
                return this.chartWidth <=
                    H(l.maxWidth, Number.MAX_VALUE) && this.chartHeight <= H(l.maxHeight, Number.MAX_VALUE) && this.chartWidth >= H(l.minWidth, 0) && this.chartHeight >= H(l.minHeight, 0)
            }).call(this) && p.push(b._id)
        };
        l.prototype.currentOptions = function (b) {
            function p(b, q, t, r) {
                var m;
                F(b, function (a, b) {
                    if (!r && -1 < l.collectionsWithUpdate.indexOf(b))
                        for (a = I(a), t[b] = [], m = 0; m < Math.max(a.length, q[b].length); m++) q[b][m] && (void 0 === a[m] ? t[b][m] = q[b][m] : (t[b][m] = {}, p(a[m], q[b][m], t[b][m], r + 1)));
                    else w(a) ? (t[b] = z(a) ? [] : {}, p(a, q[b] || {}, t[b], r + 1)) :
                        t[b] = "undefined" === typeof q[b] ? null : q[b]
                })
            }
            var l = this,
                q = {};
            p(b, this.options, q, 0);
            return q
        }
    });
    M(q, "masters/highcharts.src.js", [q["Core/Globals.js"]], function (l) {
        return l
    });
    M(q, "Core/Axis/MapAxis.js", [q["Core/Axis/Axis.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.addEvent,
            z = b.pick,
            w = function () {
                return function (b) {
                    this.axis = b
                }
            }();
        b = function () {
            function b() {}
            b.compose = function (b) {
                b.keepProps.push("mapAxis");
                q(b, "init", function () {
                    this.mapAxis || (this.mapAxis = new w(this))
                });
                q(b, "getSeriesExtremes", function () {
                    if (this.mapAxis) {
                        var b = [];
                        this.isXAxis && (this.series.forEach(function (l, q) {
                            l.useMapGeometry && (b[q] = l.xData, l.xData = [])
                        }), this.mapAxis.seriesXData = b)
                    }
                });
                q(b, "afterGetSeriesExtremes", function () {
                    if (this.mapAxis) {
                        var b = this.mapAxis.seriesXData || [],
                            l;
                        if (this.isXAxis) {
                            var q = z(this.dataMin, Number.MAX_VALUE);
                            var w = z(this.dataMax, -Number.MAX_VALUE);
                            this.series.forEach(function (p, y) {
                                p.useMapGeometry && (q = Math.min(q, z(p.minX, q)), w = Math.max(w, z(p.maxX, w)), p.xData = b[y], l = !0)
                            });
                            l && (this.dataMin = q, this.dataMax = w);
                            this.mapAxis.seriesXData =
                                void 0
                        }
                    }
                });
                q(b, "afterSetAxisTranslation", function () {
                    if (this.mapAxis) {
                        var b = this.chart,
                            l = b.plotWidth / b.plotHeight;
                        b = b.xAxis[0];
                        var q;
                        "yAxis" === this.coll && "undefined" !== typeof b.transA && this.series.forEach(function (b) {
                            b.preserveAspectRatio && (q = !0)
                        });
                        if (q && (this.transA = b.transA = Math.min(this.transA, b.transA), l /= (b.max - b.min) / (this.max - this.min), l = 1 > l ? this : b, b = (l.max - l.min) * l.transA, l.mapAxis.pixelPadding = l.len - b, l.minPixelPadding = l.mapAxis.pixelPadding / 2, b = l.mapAxis.fixTo)) {
                            b = b[1] - l.toValue(b[0], !0);
                            b *= l.transA;
                            if (Math.abs(b) > l.minPixelPadding || l.min === l.dataMin && l.max === l.dataMax) b = 0;
                            l.minPixelPadding -= b
                        }
                    }
                });
                q(b, "render", function () {
                    this.mapAxis && (this.mapAxis.fixTo = void 0)
                })
            };
            return b
        }();
        b.compose(l);
        return b
    });
    M(q, "Mixins/ColorSeries.js", [q["Core/Globals.js"]], function (l) {
        l.colorPointMixin = {
            setVisible: function (b) {
                var l = this,
                    q = b ? "show" : "hide";
                l.visible = l.options.visible = !!b;
                ["graphic", "dataLabel"].forEach(function (b) {
                    if (l[b]) l[b][q]()
                });
                this.series.buildKDTree()
            }
        };
        l.colorSeriesMixin = {
            optionalAxis: "colorAxis",
            colorAxis: 0,
            translateColors: function () {
                var b = this,
                    l = this.options.nullColor,
                    q = this.colorAxis,
                    w = this.colorKey;
                (this.data.length ? this.data : this.points).forEach(function (z) {
                    var C = z.getNestedProperty(w);
                    (C = z.options.color || (z.isNull || null === z.value ? l : q && "undefined" !== typeof C ? q.toColor(C, z) : z.color || b.color)) && z.color !== C && (z.color = C, "point" === b.options.legendType && z.legendItem && b.chart.legend.colorizeItem(z, z.visible))
                })
            }
        }
    });
    M(q, "Core/Axis/ColorAxis.js", [q["Core/Axis/Axis.js"], q["Core/Chart/Chart.js"],
        q["Core/Color.js"], q["Core/Globals.js"], q["Core/Legend.js"], q["Mixins/LegendSymbol.js"], q["Core/Series/Point.js"], q["Core/Utilities.js"]
    ], function (l, b, q, z, w, C, F, H) {
        var I = this && this.__extends || function () {
                var a = function (b, g) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, b) {
                        a.__proto__ = b
                    } || function (a, b) {
                        for (var e in b) b.hasOwnProperty(e) && (a[e] = b[e])
                    };
                    return a(b, g)
                };
                return function (b, g) {
                    function e() {
                        this.constructor = b
                    }
                    a(b, g);
                    b.prototype = null === g ? Object.create(g) : (e.prototype = g.prototype,
                        new e)
                }
            }(),
            y = q.parse,
            A = z.noop;
        q = H.addEvent;
        var p = H.erase,
            E = H.extend,
            t = H.Fx,
            n = H.isNumber,
            v = H.merge,
            D = H.pick,
            r = H.splat;
        "";
        var m = z.Series;
        H = z.colorPointMixin;
        E(m.prototype, z.colorSeriesMixin);
        E(F.prototype, H);
        b.prototype.collectionsWithUpdate.push("colorAxis");
        b.prototype.collectionsWithInit.colorAxis = [b.prototype.addColorAxis];
        var a = function (a) {
            function b(b, e) {
                var g = a.call(this, b, e) || this;
                g.beforePadding = !1;
                g.chart = void 0;
                g.coll = "colorAxis";
                g.dataClasses = void 0;
                g.legendItem = void 0;
                g.legendItems = void 0;
                g.name = "";
                g.options = void 0;
                g.stops = void 0;
                g.visible = !0;
                g.init(b, e);
                return g
            }
            I(b, a);
            b.buildOptions = function (a, b, h) {
                a = a.options.legend || {};
                var e = h.layout ? "vertical" !== h.layout : "vertical" !== a.layout;
                return v(b, {
                    side: e ? 2 : 1,
                    reversed: !e
                }, h, {
                    opposite: !e,
                    showEmpty: !1,
                    title: null,
                    visible: a.enabled && (h ? !1 !== h.visible : !0)
                })
            };
            b.prototype.init = function (g, e) {
                var h = b.buildOptions(g, b.defaultOptions, e);
                this.coll = "colorAxis";
                a.prototype.init.call(this, g, h);
                e.dataClasses && this.initDataClasses(e);
                this.initStops();
                this.horiz = !h.opposite;
                this.zoomEnabled = !1
            };
            b.prototype.initDataClasses = function (a) {
                var b = this.chart,
                    g, h = 0,
                    k = b.options.chart.colorCount,
                    m = this.options,
                    n = a.dataClasses.length;
                this.dataClasses = g = [];
                this.legendItems = [];
                a.dataClasses.forEach(function (a, e) {
                    a = v(a);
                    g.push(a);
                    if (b.styledMode || !a.color) "category" === m.dataClassColor ? (b.styledMode || (e = b.options.colors, k = e.length, a.color = e[h]), a.colorIndex = h, h++, h === k && (h = 0)) : a.color = y(m.minColor).tweenTo(y(m.maxColor), 2 > n ? .5 : e / (n - 1))
                })
            };
            b.prototype.hasData = function () {
                return !!(this.tickPositions || []).length
            };
            b.prototype.setTickPositions = function () {
                if (!this.dataClasses) return a.prototype.setTickPositions.call(this)
            };
            b.prototype.initStops = function () {
                this.stops = this.options.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                this.stops.forEach(function (a) {
                    a.color = y(a[1])
                })
            };
            b.prototype.setOptions = function (b) {
                a.prototype.setOptions.call(this, b);
                this.options.crosshair = this.options.marker
            };
            b.prototype.setAxisSize = function () {
                var a = this.legendSymbol,
                    e = this.chart,
                    h = e.options.legend || {},
                    k,
                    m;
                a ? (this.left = h = a.attr("x"), this.top = k = a.attr("y"), this.width = m = a.attr("width"), this.height = a = a.attr("height"), this.right = e.chartWidth - h - m, this.bottom = e.chartHeight - k - a, this.len = this.horiz ? m : a, this.pos = this.horiz ? h : k) : this.len = (this.horiz ? h.symbolWidth : h.symbolHeight) || b.defaultLegendLength
            };
            b.prototype.normalizedValue = function (a) {
                this.logarithmic && (a = this.logarithmic.log2lin(a));
                return 1 - (this.max - a) / (this.max - this.min || 1)
            };
            b.prototype.toColor = function (a, b) {
                var e = this.dataClasses,
                    g = this.stops,
                    h;
                if (e)
                    for (h = e.length; h--;) {
                        var k = e[h];
                        var m = k.from;
                        g = k.to;
                        if (("undefined" === typeof m || a >= m) && ("undefined" === typeof g || a <= g)) {
                            var n = k.color;
                            b && (b.dataClass = h, b.colorIndex = k.colorIndex);
                            break
                        }
                    } else {
                        a = this.normalizedValue(a);
                        for (h = g.length; h-- && !(a > g[h][0]););
                        m = g[h] || g[h + 1];
                        g = g[h + 1] || m;
                        a = 1 - (g[0] - a) / (g[0] - m[0] || 1);
                        n = m.color.tweenTo(g.color, a)
                    }
                return n
            };
            b.prototype.getOffset = function () {
                var b = this.legendGroup,
                    e = this.chart.axisOffset[this.side];
                b && (this.axisParent = b, a.prototype.getOffset.call(this), this.added ||
                    (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = e)
            };
            b.prototype.setLegendColor = function () {
                var a = this.reversed,
                    b = a ? 1 : 0;
                a = a ? 0 : 1;
                b = this.horiz ? [b, 0, a, 0] : [0, a, 0, b];
                this.legendColor = {
                    linearGradient: {
                        x1: b[0],
                        y1: b[1],
                        x2: b[2],
                        y2: b[3]
                    },
                    stops: this.stops
                }
            };
            b.prototype.drawLegendSymbol = function (a, e) {
                var g = a.padding,
                    h = a.options,
                    k = this.horiz,
                    m = D(h.symbolWidth, k ? b.defaultLegendLength : 12),
                    n = D(h.symbolHeight, k ? 12 : b.defaultLegendLength),
                    l = D(h.labelPadding, k ? 16 : 30);
                h = D(h.itemDistance,
                    10);
                this.setLegendColor();
                e.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, m, n).attr({
                    zIndex: 1
                }).add(e.legendGroup);
                this.legendItemWidth = m + g + (k ? h : l);
                this.legendItemHeight = n + g + (k ? l : 0)
            };
            b.prototype.setState = function (a) {
                this.series.forEach(function (b) {
                    b.setState(a)
                })
            };
            b.prototype.setVisible = function () {};
            b.prototype.getSeriesExtremes = function () {
                var a = this.series,
                    b = a.length,
                    h;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; b--;) {
                    var k = a[b];
                    var n = k.colorKey = D(k.options.colorKey, k.colorKey, k.pointValKey,
                        k.zoneAxis, "y");
                    var l = k.pointArrayMap;
                    var p = k[n + "Min"] && k[n + "Max"];
                    if (k[n + "Data"]) var r = k[n + "Data"];
                    else if (l) {
                        r = [];
                        l = l.indexOf(n);
                        var q = k.yData;
                        if (0 <= l && q)
                            for (h = 0; h < q.length; h++) r.push(D(q[h][l], q[h]))
                    } else r = k.yData;
                    p ? (k.minColorValue = k[n + "Min"], k.maxColorValue = k[n + "Max"]) : (r = m.prototype.getExtremes.call(k, r), k.minColorValue = r.dataMin, k.maxColorValue = r.dataMax);
                    "undefined" !== typeof k.minColorValue && (this.dataMin = Math.min(this.dataMin, k.minColorValue), this.dataMax = Math.max(this.dataMax, k.maxColorValue));
                    p || m.prototype.applyExtremes.call(k)
                }
            };
            b.prototype.drawCrosshair = function (b, e) {
                var g = e && e.plotX,
                    h = e && e.plotY,
                    k = this.pos,
                    m = this.len;
                if (e) {
                    var n = this.toPixels(e.getNestedProperty(e.series.colorKey));
                    n < k ? n = k - 2 : n > k + m && (n = k + m + 2);
                    e.plotX = n;
                    e.plotY = this.len - n;
                    a.prototype.drawCrosshair.call(this, b, e);
                    e.plotX = g;
                    e.plotY = h;
                    this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, !this.chart.styledMode &&
                        this.crosshair && this.cross.attr({
                            fill: this.crosshair.color
                        }))
                }
            };
            b.prototype.getPlotLinePath = function (b) {
                var e = this.left,
                    g = b.translatedValue,
                    h = this.top;
                return n(g) ? this.horiz ? [
                    ["M", g - 4, h - 6],
                    ["L", g + 4, h - 6],
                    ["L", g, h],
                    ["Z"]
                ] : [
                    ["M", e, g],
                    ["L", e - 6, g + 6],
                    ["L", e - 6, g - 6],
                    ["Z"]
                ] : a.prototype.getPlotLinePath.call(this, b)
            };
            b.prototype.update = function (g, e) {
                var h = this.chart,
                    k = h.legend,
                    m = b.buildOptions(h, {}, g);
                this.series.forEach(function (a) {
                    a.isDirtyData = !0
                });
                (g.dataClasses && k.allItems || this.dataClasses) && this.destroyItems();
                h.options[this.coll] = v(this.userOptions, m);
                a.prototype.update.call(this, m, e);
                this.legendItem && (this.setLegendColor(), k.colorizeItem(this, !0))
            };
            b.prototype.destroyItems = function () {
                var a = this.chart;
                this.legendItem ? a.legend.destroyItem(this) : this.legendItems && this.legendItems.forEach(function (b) {
                    a.legend.destroyItem(b)
                });
                a.isDirtyLegend = !0
            };
            b.prototype.remove = function (b) {
                this.destroyItems();
                a.prototype.remove.call(this, b)
            };
            b.prototype.getDataClassLegendSymbols = function () {
                var a = this,
                    b = a.chart,
                    h = a.legendItems,
                    k = b.options.legend,
                    m = k.valueDecimals,
                    n = k.valueSuffix || "",
                    l;
                h.length || a.dataClasses.forEach(function (e, g) {
                    var k = !0,
                        f = e.from,
                        d = e.to,
                        c = b.numberFormatter;
                    l = "";
                    "undefined" === typeof f ? l = "< " : "undefined" === typeof d && (l = "> ");
                    "undefined" !== typeof f && (l += c(f, m) + n);
                    "undefined" !== typeof f && "undefined" !== typeof d && (l += " - ");
                    "undefined" !== typeof d && (l += c(d, m) + n);
                    h.push(E({
                        chart: b,
                        name: l,
                        options: {},
                        drawLegendSymbol: C.drawRectangle,
                        visible: !0,
                        setState: A,
                        isDataClass: !0,
                        setVisible: function () {
                            k = a.visible = !k;
                            a.series.forEach(function (a) {
                                a.points.forEach(function (a) {
                                    a.dataClass ===
                                        g && a.setVisible(k)
                                })
                            });
                            b.legend.colorizeItem(this, k)
                        }
                    }, e))
                });
                return h
            };
            b.defaultLegendLength = 200;
            b.defaultOptions = {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            };
            b.keepProps = ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"];
            return b
        }(l);
        Array.prototype.push.apply(l.keepProps,
            a.keepProps);
        z.ColorAxis = a;
        ["fill", "stroke"].forEach(function (a) {
            t.prototype[a + "Setter"] = function () {
                this.elem.attr(a, y(this.start).tweenTo(y(this.end), this.pos), null, !0)
            }
        });
        q(b, "afterGetAxes", function () {
            var b = this,
                k = b.options;
            this.colorAxis = [];
            k.colorAxis && (k.colorAxis = r(k.colorAxis), k.colorAxis.forEach(function (g, e) {
                g.index = e;
                new a(b, g)
            }))
        });
        q(m, "bindAxes", function () {
            var a = this.axisTypes;
            a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : this.axisTypes = ["colorAxis"]
        });
        q(w, "afterGetAllItems", function (a) {
            var b = [],
                g, e;
            (this.chart.colorAxis || []).forEach(function (e) {
                (g = e.options) && g.showInLegend && (g.dataClasses && g.visible ? b = b.concat(e.getDataClassLegendSymbols()) : g.visible && b.push(e), e.series.forEach(function (b) {
                    if (!b.options.showInLegend || g.dataClasses) "point" === b.options.legendType ? b.points.forEach(function (b) {
                        p(a.allItems, b)
                    }) : p(a.allItems, b)
                }))
            });
            for (e = b.length; e--;) a.allItems.unshift(b[e])
        });
        q(w, "afterColorizeItem", function (a) {
            a.visible && a.item.legendColor && a.item.legendSymbol.attr({
                fill: a.item.legendColor
            })
        });
        q(w, "afterUpdate", function () {
            var a = this.chart.colorAxis;
            a && a.forEach(function (a, b, e) {
                a.update({}, e)
            })
        });
        q(m, "afterTranslate", function () {
            (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors()
        });
        return a
    });
    M(q, "Mixins/ColorMapSeries.js", [q["Core/Globals.js"], q["Core/Series/Point.js"], q["Core/Utilities.js"]], function (l, b, q) {
        var z = q.defined;
        q = l.noop;
        var w = l.seriesTypes;
        l.colorMapPointMixin = {
            dataLabelOnNull: !0,
            isValid: function () {
                return null !== this.value && Infinity !==
                    this.value && -Infinity !== this.value
            },
            setState: function (l) {
                b.prototype.setState.call(this, l);
                this.graphic && this.graphic.attr({
                    zIndex: "hover" === l ? 1 : 0
                })
            }
        };
        l.colorMapSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: q,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: w.column.prototype.pointAttribs,
            colorAttribs: function (b) {
                var l = {};
                z(b.color) && (l[this.colorProp || "fill"] = b.color);
                return l
            }
        }
    });
    M(q, "Maps/MapNavigation.js",
        [q["Core/Chart/Chart.js"], q["Core/Globals.js"], q["Core/Utilities.js"]],
        function (l, b, q) {
            function z(b) {
                b && (b.preventDefault && b.preventDefault(), b.stopPropagation && b.stopPropagation(), b.cancelBubble = !0)
            }

            function w(b) {
                this.init(b)
            }
            var C = b.doc,
                F = q.addEvent,
                H = q.extend,
                I = q.merge,
                y = q.objectEach,
                A = q.pick;
            w.prototype.init = function (b) {
                this.chart = b;
                b.mapNavButtons = []
            };
            w.prototype.update = function (b) {
                var l = this.chart,
                    p = l.options.mapNavigation,
                    n, q, w, r, m, a = function (a) {
                        this.handler.call(l, a);
                        z(a)
                    },
                    h = l.mapNavButtons;
                b && (p = l.options.mapNavigation = I(l.options.mapNavigation, b));
                for (; h.length;) h.pop().destroy();
                A(p.enableButtons, p.enabled) && !l.renderer.forExport && y(p.buttons, function (b, g) {
                    n = I(p.buttonOptions, b);
                    l.styledMode || (q = n.theme, q.style = I(n.theme.style, n.style), r = (w = q.states) && w.hover, m = w && w.select);
                    b = l.renderer.button(n.text, 0, 0, a, q, r, m, 0, "zoomIn" === g ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + {
                        zoomIn: "zoom-in",
                        zoomOut: "zoom-out"
                    } [g]).attr({
                        width: n.width,
                        height: n.height,
                        title: l.options.lang[g],
                        padding: n.padding,
                        zIndex: 5
                    }).add();
                    b.handler = n.onclick;
                    F(b.element, "dblclick", z);
                    h.push(b);
                    var e = n,
                        k = F(l, "load", function () {
                            b.align(H(e, {
                                width: b.width,
                                height: 2 * b.height
                            }), null, e.alignTo);
                            k()
                        })
                });
                this.updateEvents(p)
            };
            w.prototype.updateEvents = function (b) {
                var l = this.chart;
                A(b.enableDoubleClickZoom, b.enabled) || b.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || F(l.container, "dblclick", function (b) {
                    l.pointer.onContainerDblClick(b)
                }) : this.unbindDblClick && (this.unbindDblClick =
                    this.unbindDblClick());
                A(b.enableMouseWheelZoom, b.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || F(l.container, "undefined" === typeof C.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (b) {
                    l.pointer.onContainerMouseWheel(b);
                    z(b);
                    return !1
                }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
            };
            H(l.prototype, {
                fitToBox: function (b, l) {
                    [
                        ["x", "width"],
                        ["y", "height"]
                    ].forEach(function (p) {
                        var n = p[0];
                        p = p[1];
                        b[n] + b[p] > l[n] + l[p] && (b[p] > l[p] ? (b[p] = l[p], b[n] = l[n]) : b[n] = l[n] + l[p] - b[p]);
                        b[p] > l[p] && (b[p] = l[p]);
                        b[n] < l[n] && (b[n] = l[n])
                    });
                    return b
                },
                mapZoom: function (b, l, q, n, v) {
                    var p = this.xAxis[0],
                        r = p.max - p.min,
                        m = A(l, p.min + r / 2),
                        a = r * b;
                    r = this.yAxis[0];
                    var h = r.max - r.min,
                        k = A(q, r.min + h / 2);
                    h *= b;
                    m = this.fitToBox({
                        x: m - a * (n ? (n - p.pos) / p.len : .5),
                        y: k - h * (v ? (v - r.pos) / r.len : .5),
                        width: a,
                        height: h
                    }, {
                        x: p.dataMin,
                        y: r.dataMin,
                        width: p.dataMax - p.dataMin,
                        height: r.dataMax - r.dataMin
                    });
                    a = m.x <= p.dataMin && m.width >= p.dataMax - p.dataMin && m.y <= r.dataMin && m.height >= r.dataMax - r.dataMin;
                    n && p.mapAxis && (p.mapAxis.fixTo = [n - p.pos,
                        l
                    ]);
                    v && r.mapAxis && (r.mapAxis.fixTo = [v - r.pos, q]);
                    "undefined" === typeof b || a ? (p.setExtremes(void 0, void 0, !1), r.setExtremes(void 0, void 0, !1)) : (p.setExtremes(m.x, m.x + m.width, !1), r.setExtremes(m.y, m.y + m.height, !1));
                    this.redraw()
                }
            });
            F(l, "beforeRender", function () {
                this.mapNavigation = new w(this);
                this.mapNavigation.update()
            });
            b.MapNavigation = w
        });
    M(q, "Maps/MapPointer.js", [q["Core/Pointer.js"], q["Core/Utilities.js"]], function (l, b) {
        var q = b.extend,
            z = b.pick;
        b = b.wrap;
        q(l.prototype, {
            onContainerDblClick: function (b) {
                var l =
                    this.chart;
                b = this.normalize(b);
                l.options.mapNavigation.enableDoubleClickZoomTo ? l.pointer.inClass(b.target, "highcharts-tracker") && l.hoverPoint && l.hoverPoint.zoomTo() : l.isInsidePlot(b.chartX - l.plotLeft, b.chartY - l.plotTop) && l.mapZoom(.5, l.xAxis[0].toValue(b.chartX), l.yAxis[0].toValue(b.chartY), b.chartX, b.chartY)
            },
            onContainerMouseWheel: function (b) {
                var l = this.chart;
                b = this.normalize(b);
                var q = b.detail || -(b.wheelDelta / 120);
                l.isInsidePlot(b.chartX - l.plotLeft, b.chartY - l.plotTop) && l.mapZoom(Math.pow(l.options.mapNavigation.mouseWheelSensitivity,
                    q), l.xAxis[0].toValue(b.chartX), l.yAxis[0].toValue(b.chartY), b.chartX, b.chartY)
            }
        });
        b(l.prototype, "zoomOption", function (b) {
            var l = this.chart.options.mapNavigation;
            z(l.enableTouchZoom, l.enabled) && (this.chart.options.chart.pinchType = "xy");
            b.apply(this, [].slice.call(arguments, 1))
        });
        b(l.prototype, "pinchTranslate", function (b, l, q, z, I, y, A) {
            b.call(this, l, q, z, I, y, A);
            "map" === this.chart.options.chart.type && this.hasZoom && (b = z.scaleX > z.scaleY, this.pinchTranslateDirection(!b, l, q, z, I, y, A, b ? z.scaleX : z.scaleY))
        })
    });
    M(q, "Series/MapSeries.js", [q["Core/Globals.js"], q["Mixins/LegendSymbol.js"], q["Core/Series/Point.js"], q["Core/Renderer/SVG/SVGRenderer.js"], q["Core/Utilities.js"]], function (l, b, q, z, w) {
        var C = w.extend,
            F = w.fireEvent,
            H = w.getNestedProperty,
            I = w.isArray,
            y = w.isNumber,
            A = w.merge,
            p = w.objectEach,
            E = w.pick,
            t = w.seriesType,
            n = w.splat,
            v = l.colorMapPointMixin,
            D = l.noop,
            r = l.Series,
            m = l.seriesTypes;
        t("map", "scatter", {
            animation: !1,
            dataLabels: {
                crop: !1,
                formatter: function () {
                    return this.point.value
                },
                inside: !0,
                overflow: !1,
                padding: 0,
                verticalAlign: "middle"
            },
            marker: null,
            nullColor: "#f7f7f7",
            stickyTracking: !1,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}<br/>"
            },
            turboThreshold: 0,
            allAreas: !0,
            borderColor: "#cccccc",
            borderWidth: 1,
            joinBy: "hc-key",
            states: {
                hover: {
                    halo: null,
                    brightness: .2
                },
                normal: {
                    animation: !0
                },
                select: {
                    color: "#cccccc"
                },
                inactive: {
                    opacity: 1
                }
            }
        }, A(l.colorMapSeriesMixin, {
            type: "map",
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: D,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            setOptions: function (a) {
                a = r.prototype.setOptions.call(this, a);
                var b = a.joinBy;
                null === b && (b = "_i");
                b = this.joinBy = n(b);
                b[1] || (b[1] = b[0]);
                return a
            },
            getBox: function (a) {
                var b = Number.MAX_VALUE,
                    k = -b,
                    g = b,
                    e = -b,
                    m = b,
                    n = b,
                    p = this.xAxis,
                    r = this.yAxis,
                    q;
                (a || []).forEach(function (a) {
                    if (a.path) {
                        "string" === typeof a.path ? a.path = l.splitPath(a.path) : "M" === a.path[0] && (a.path = z.prototype.pathToSegments(a.path));
                        var h = a.path || [],
                            p = -b,
                            f = b,
                            d = -b,
                            c = b,
                            r = a.properties;
                        a._foundBox || (h.forEach(function (a) {
                            var b = a[a.length - 2];
                            a = a[a.length -
                                1];
                            "number" === typeof b && "number" === typeof a && (f = Math.min(f, b), p = Math.max(p, b), c = Math.min(c, a), d = Math.max(d, a))
                        }), a._midX = f + (p - f) * E(a.middleX, r && r["hc-middle-x"], .5), a._midY = c + (d - c) * E(a.middleY, r && r["hc-middle-y"], .5), a._maxX = p, a._minX = f, a._maxY = d, a._minY = c, a.labelrank = E(a.labelrank, (p - f) * (d - c)), a._foundBox = !0);
                        k = Math.max(k, a._maxX);
                        g = Math.min(g, a._minX);
                        e = Math.max(e, a._maxY);
                        m = Math.min(m, a._minY);
                        n = Math.min(a._maxX - a._minX, a._maxY - a._minY, n);
                        q = !0
                    }
                });
                q && (this.minY = Math.min(m, E(this.minY, b)), this.maxY =
                    Math.max(e, E(this.maxY, -b)), this.minX = Math.min(g, E(this.minX, b)), this.maxX = Math.max(k, E(this.maxX, -b)), p && "undefined" === typeof p.options.minRange && (p.minRange = Math.min(5 * n, (this.maxX - this.minX) / 5, p.minRange || b)), r && "undefined" === typeof r.options.minRange && (r.minRange = Math.min(5 * n, (this.maxY - this.minY) / 5, r.minRange || b)))
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            getExtremes: function () {
                var a = r.prototype.getExtremes.call(this, this.valueData),
                    b = a.dataMin;
                a = a.dataMax;
                this.chart.hasRendered &&
                    this.isDirtyData && this.getBox(this.options.data);
                y(b) && (this.valueMin = b);
                y(a) && (this.valueMax = a);
                return {
                    dataMin: this.minY,
                    dataMax: this.maxY
                }
            },
            translatePath: function (a) {
                var b = this.xAxis,
                    k = this.yAxis,
                    g = b.min,
                    e = b.transA,
                    m = b.minPixelPadding,
                    l = k.min,
                    n = k.transA,
                    p = k.minPixelPadding,
                    r = [];
                a && a.forEach(function (a) {
                    "M" === a[0] ? r.push(["M", (a[1] - (g || 0)) * e + m, (a[2] - (l || 0)) * n + p]) : "L" === a[0] ? r.push(["L", (a[1] - (g || 0)) * e + m, (a[2] - (l || 0)) * n + p]) : "C" === a[0] ? r.push(["C", (a[1] - (g || 0)) * e + m, (a[2] - (l || 0)) * n + p, (a[3] - (g || 0)) *
                        e + m, (a[4] - (l || 0)) * n + p, (a[5] - (g || 0)) * e + m, (a[6] - (l || 0)) * n + p
                    ]) : "Q" === a[0] ? r.push(["Q", (a[1] - (g || 0)) * e + m, (a[2] - (l || 0)) * n + p, (a[3] - (g || 0)) * e + m, (a[4] - (l || 0)) * n + p]) : "Z" === a[0] && r.push(["Z"])
                });
                return r
            },
            setData: function (a, b, k, g) {
                var e = this.options,
                    h = this.chart.options.chart,
                    m = h && h.map,
                    n = e.mapData,
                    t = this.joinBy,
                    v = e.keys || this.pointArrayMap,
                    w = [],
                    z = {},
                    D = this.chart.mapTransforms;
                !n && m && (n = "string" === typeof m ? l.maps[m] : m);
                a && a.forEach(function (b, d) {
                    var c = 0;
                    if (y(b)) a[d] = {
                        value: b
                    };
                    else if (I(b)) {
                        a[d] = {};
                        !e.keys &&
                            b.length > v.length && "string" === typeof b[0] && (a[d]["hc-key"] = b[0], ++c);
                        for (var f = 0; f < v.length; ++f, ++c) v[f] && "undefined" !== typeof b[c] && (0 < v[f].indexOf(".") ? q.prototype.setNestedProperty(a[d], b[c], v[f]) : a[d][v[f]] = b[c])
                    }
                    t && "_i" === t[0] && (a[d]._i = d)
                });
                this.getBox(a);
                (this.chart.mapTransforms = D = h && h.mapTransforms || n && n["hc-transform"] || D) && p(D, function (a) {
                    a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
                });
                if (n) {
                    "FeatureCollection" === n.type && (this.mapTitle = n.title, n = l.geojson(n,
                        this.type, this));
                    this.mapData = n;
                    this.mapMap = {};
                    for (D = 0; D < n.length; D++) h = n[D], m = h.properties, h._i = D, t[0] && m && m[t[0]] && (h[t[0]] = m[t[0]]), z[h[t[0]]] = h;
                    this.mapMap = z;
                    if (a && t[1]) {
                        var f = t[1];
                        a.forEach(function (a) {
                            a = H(f, a);
                            z[a] && w.push(z[a])
                        })
                    }
                    if (e.allAreas) {
                        this.getBox(n);
                        a = a || [];
                        if (t[1]) {
                            var d = t[1];
                            a.forEach(function (a) {
                                w.push(H(d, a))
                            })
                        }
                        w = "|" + w.map(function (a) {
                            return a && a[t[0]]
                        }).join("|") + "|";
                        n.forEach(function (b) {
                            t[0] && -1 !== w.indexOf("|" + b[t[0]] + "|") || (a.push(A(b, {
                                value: null
                            })), g = !1)
                        })
                    } else this.getBox(w)
                }
                r.prototype.setData.call(this,
                    a, b, k, g)
            },
            drawGraph: D,
            drawDataLabels: D,
            doFullTranslate: function () {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function () {
                var a = this,
                    b = a.xAxis,
                    k = a.yAxis,
                    g = a.doFullTranslate();
                a.generatePoints();
                a.data.forEach(function (e) {
                    y(e._midX) && y(e._midY) && (e.plotX = b.toPixels(e._midX, !0), e.plotY = k.toPixels(e._midY, !0));
                    g && (e.shapeType = "path", e.shapeArgs = {
                        d: a.translatePath(e.path)
                    })
                });
                F(a, "afterTranslate")
            },
            pointAttribs: function (a, b) {
                b = a.series.chart.styledMode ?
                    this.colorAttribs(a) : m.column.prototype.pointAttribs.call(this, a, b);
                b["stroke-width"] = E(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
                return b
            },
            drawPoints: function () {
                var a = this,
                    b = a.xAxis,
                    k = a.yAxis,
                    g = a.group,
                    e = a.chart,
                    l = e.renderer,
                    n = this.baseTrans;
                a.transformGroup || (a.transformGroup = l.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(g), a.transformGroup.survive = !0);
                if (a.doFullTranslate()) e.hasRendered && !e.styledMode && a.points.forEach(function (b) {
                    b.shapeArgs &&
                        (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                }), a.group = a.transformGroup, m.column.prototype.drawPoints.apply(a), a.group = g, a.points.forEach(function (b) {
                    if (b.graphic) {
                        var c = "";
                        b.name && (c += "highcharts-name-" + b.name.replace(/ /g, "-").toLowerCase());
                        b.properties && b.properties["hc-key"] && (c += " highcharts-key-" + b.properties["hc-key"].toLowerCase());
                        c && b.graphic.addClass(c);
                        e.styledMode && b.graphic.css(a.pointAttribs(b, b.selected && "select" || void 0))
                    }
                }), this.baseTrans = {
                    originX: b.min - b.minPixelPadding / b.transA,
                    originY: k.min - k.minPixelPadding / k.transA + (k.reversed ? 0 : k.len / k.transA),
                    transAX: b.transA,
                    transAY: k.transA
                }, this.transformGroup.animate({
                    translateX: 0,
                    translateY: 0,
                    scaleX: 1,
                    scaleY: 1
                });
                else {
                    var p = b.transA / n.transAX;
                    var r = k.transA / n.transAY;
                    var q = b.toPixels(n.originX, !0);
                    var t = k.toPixels(n.originY, !0);
                    .99 < p && 1.01 > p && .99 < r && 1.01 > r && (r = p = 1, q = Math.round(q), t = Math.round(t));
                    var v = this.transformGroup;
                    if (e.renderer.globalAnimation) {
                        var w = v.attr("translateX");
                        var f = v.attr("translateY");
                        var d = v.attr("scaleX");
                        var c = v.attr("scaleY");
                        v.attr({
                            animator: 0
                        }).animate({
                            animator: 1
                        }, {
                            step: function (a, b) {
                                v.attr({
                                    translateX: w + (q - w) * b.pos,
                                    translateY: f + (t - f) * b.pos,
                                    scaleX: d + (p - d) * b.pos,
                                    scaleY: c + (r - c) * b.pos
                                })
                            }
                        })
                    } else v.attr({
                        translateX: q,
                        translateY: t,
                        scaleX: p,
                        scaleY: r
                    })
                }
                e.styledMode || g.element.setAttribute("stroke-width", E(a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (p || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function () {
                r.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup &&
                    this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function () {
                var a = this,
                    b = r.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () {
                    b.call(a)
                }) : b.call(a)
            },
            animate: function (a) {
                var b = this.options.animation,
                    k = this.group,
                    g = this.xAxis,
                    e = this.yAxis,
                    m = g.pos,
                    l = e.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {
                    duration: 1E3
                }), a ? k.attr({
                    translateX: m + g.len / 2,
                    translateY: l + e.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : k.animate({
                    translateX: m,
                    translateY: l,
                    scaleX: 1,
                    scaleY: 1
                }, b))
            },
            animateDrilldown: function (a) {
                var b =
                    this.chart.plotBox,
                    k = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    g = k.bBox,
                    e = this.chart.options.drilldown.animation;
                a || (a = Math.min(g.width / b.width, g.height / b.height), k.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: g.x,
                    translateY: g.y
                }, this.points.forEach(function (a) {
                    a.graphic && a.graphic.attr(k.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, e)
                }))
            },
            drawLegendSymbol: b.drawRectangle,
            animateDrillupFrom: function (a) {
                m.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function (a) {
                m.column.prototype.animateDrillupTo.call(this,
                    a)
            }
        }), C({
            applyOptions: function (a, b) {
                var h = this.series;
                a = q.prototype.applyOptions.call(this, a, b);
                b = h.joinBy;
                h.mapData && h.mapMap && (b = q.prototype.getNestedProperty.call(a, b[1]), (b = "undefined" !== typeof b && h.mapMap[b]) ? (h.xyFromShape && (a.x = b._midX, a.y = b._midY), C(a, b)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function (a) {
                w.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) q.prototype.onMouseOver.call(this, a);
                else this.series.onMouseOut(a)
            },
            zoomTo: function () {
                var a =
                    this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, v));
        ""
    });
    M(q, "Series/MapLineSeries.js", [q["Core/Globals.js"], q["Core/Utilities.js"]], function (l, b) {
        b = b.seriesType;
        var q = l.seriesTypes;
        b("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function (b, l) {
                b = q.map.prototype.pointAttribs.call(this, b, l);
                b.fill = this.options.fillColor;
                return b
            },
            drawLegendSymbol: q.line.prototype.drawLegendSymbol
        });
        ""
    });
    M(q, "Series/MapPointSeries.js", [q["Core/Globals.js"]], function (l) {
        var b = l.merge,
            q = l.Point,
            z = l.Series;
        l = l.seriesType;
        l("mappoint", "scatter", {
            dataLabels: {
                crop: !1,
                defer: !1,
                enabled: !0,
                formatter: function () {
                    return this.point.name
                },
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0,
            drawDataLabels: function () {
                z.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            }
        }, {
            applyOptions: function (l,
                z) {
                l = "undefined" !== typeof l.lat && "undefined" !== typeof l.lon ? b(l, this.series.chart.fromLatLonToPoint(l)) : l;
                return q.prototype.applyOptions.call(this, l, z)
            }
        });
        ""
    });
    M(q, "Series/Bubble/BubbleLegend.js", [q["Core/Chart/Chart.js"], q["Core/Color.js"], q["Core/Globals.js"], q["Core/Legend.js"], q["Core/Utilities.js"]], function (l, b, q, z, w) {
        var C = b.parse;
        b = w.addEvent;
        var F = w.arrayMax,
            H = w.arrayMin,
            I = w.isNumber,
            y = w.merge,
            A = w.objectEach,
            p = w.pick,
            E = w.setOptions,
            t = w.stableSort,
            n = w.wrap;
        "";
        var v = q.Series,
            D = q.noop;
        E({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: {
                        className: void 0,
                        allowOverlap: !1,
                        format: "",
                        formatter: void 0,
                        align: "right",
                        style: {
                            fontSize: 10,
                            color: void 0
                        },
                        x: 0,
                        y: 0
                    },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: {
                        value: void 0,
                        borderColor: void 0,
                        color: void 0,
                        connectorColor: void 0
                    },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0
                }
            }
        });
        E = function () {
            function b(b, a) {
                this.options = this.symbols = this.visible =
                    this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = D;
                this.init(b, a)
            }
            b.prototype.init = function (b, a) {
                this.options = b;
                this.visible = !0;
                this.chart = a.chart;
                this.legend = a
            };
            b.prototype.addToLegend = function (b) {
                b.splice(this.options.legendIndex, 0, this)
            };
            b.prototype.drawLegendSymbol = function (b) {
                var a = this.chart,
                    h = this.options,
                    k = p(b.options.itemDistance, 20),
                    g = h.ranges;
                var e = h.connectorDistance;
                this.fontMetrics = a.renderer.fontMetrics(h.labels.style.fontSize.toString() + "px");
                g && g.length && I(g[0].value) ? (t(g, function (a, b) {
                    return b.value - a.value
                }), this.ranges = g, this.setOptions(), this.render(), a = this.getMaxLabelSize(), g = this.ranges[0].radius, b = 2 * g, e = e - g + a.width, e = 0 < e ? e : 0, this.maxLabel = a, this.movementX = "left" === h.labels.align ? e : 0, this.legendItemWidth = b + e + k, this.legendItemHeight = b + this.fontMetrics.h / 2) : b.options.bubbleLegend.autoRanges = !0
            };
            b.prototype.setOptions = function () {
                var b =
                    this.ranges,
                    a = this.options,
                    h = this.chart.series[a.seriesIndex],
                    k = this.legend.baseline,
                    g = {
                        "z-index": a.zIndex,
                        "stroke-width": a.borderWidth
                    },
                    e = {
                        "z-index": a.zIndex,
                        "stroke-width": a.connectorWidth
                    },
                    l = this.getLabelStyles(),
                    n = h.options.marker.fillOpacity,
                    r = this.chart.styledMode;
                b.forEach(function (m, q) {
                    r || (g.stroke = p(m.borderColor, a.borderColor, h.color), g.fill = p(m.color, a.color, 1 !== n ? C(h.color).setOpacity(n).get("rgba") : h.color), e.stroke = p(m.connectorColor, a.connectorColor, h.color));
                    b[q].radius = this.getRangeRadius(m.value);
                    b[q] = y(b[q], {
                        center: b[0].radius - b[q].radius + k
                    });
                    r || y(!0, b[q], {
                        bubbleStyle: y(!1, g),
                        connectorStyle: y(!1, e),
                        labelStyle: l
                    })
                }, this)
            };
            b.prototype.getLabelStyles = function () {
                var b = this.options,
                    a = {},
                    h = "left" === b.labels.align,
                    k = this.legend.options.rtl;
                A(b.labels.style, function (b, e) {
                    "color" !== e && "fontSize" !== e && "z-index" !== e && (a[e] = b)
                });
                return y(!1, a, {
                    "font-size": b.labels.style.fontSize,
                    fill: p(b.labels.style.color, "#000000"),
                    "z-index": b.zIndex,
                    align: k || h ? "right" : "left"
                })
            };
            b.prototype.getRangeRadius = function (b) {
                var a =
                    this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, a.ranges[a.ranges.length - 1].value, a.ranges[0].value, a.minSize, a.maxSize, b)
            };
            b.prototype.render = function () {
                var b = this.chart.renderer,
                    a = this.options.zThreshold;
                this.symbols || (this.symbols = {
                    connectors: [],
                    bubbleItems: [],
                    labels: []
                });
                this.legendSymbol = b.g("bubble-legend");
                this.legendItem = b.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function (b) {
                        b.value >= a && this.renderRange(b)
                    },
                    this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            };
            b.prototype.renderRange = function (b) {
                var a = this.options,
                    h = a.labels,
                    k = this.chart.renderer,
                    g = this.symbols,
                    e = g.labels,
                    m = b.center,
                    l = Math.abs(b.radius),
                    n = a.connectorDistance || 0,
                    p = h.align,
                    r = h.style.fontSize;
                n = this.legend.options.rtl || "left" === p ? -n : n;
                h = a.connectorWidth;
                var q = this.ranges[0].radius || 0,
                    t = m - l - a.borderWidth / 2 + h / 2;
                r = r / 2 - (this.fontMetrics.h - r) / 2;
                var v = k.styledMode;
                "center" === p && (n = 0,
                    a.connectorDistance = 0, b.labelStyle.align = "center");
                p = t + a.labels.y;
                var f = q + n + a.labels.x;
                g.bubbleItems.push(k.circle(q, m + ((t % 1 ? 1 : .5) - (h % 2 ? 0 : .5)), l).attr(v ? {} : b.bubbleStyle).addClass((v ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (a.className || "")).add(this.legendSymbol));
                g.connectors.push(k.path(k.crispLine([
                    ["M", q, t],
                    ["L", q + n, t]
                ], a.connectorWidth)).attr(v ? {} : b.connectorStyle).addClass((v ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " +
                    (a.connectorClassName || "")).add(this.legendSymbol));
                b = k.text(this.formatLabel(b), f, p + r).attr(v ? {} : b.labelStyle).addClass("highcharts-bubble-legend-labels " + (a.labels.className || "")).add(this.legendSymbol);
                e.push(b);
                b.placed = !0;
                b.alignAttr = {
                    x: f,
                    y: p + r
                }
            };
            b.prototype.getMaxLabelSize = function () {
                var b, a;
                this.symbols.labels.forEach(function (h) {
                    a = h.getBBox(!0);
                    b = b ? a.width > b.width ? a : b : a
                });
                return b || {}
            };
            b.prototype.formatLabel = function (b) {
                var a = this.options,
                    h = a.labels.formatter;
                a = a.labels.format;
                var k = this.chart.numberFormatter;
                return a ? w.format(a, b) : h ? h.call(b) : k(b.value, 1)
            };
            b.prototype.hideOverlappingLabels = function () {
                var b = this.chart,
                    a = this.symbols;
                !this.options.labels.allowOverlap && a && (b.hideOverlappingLabels(a.labels), a.labels.forEach(function (b, k) {
                    b.newOpacity ? b.newOpacity !== b.oldOpacity && a.connectors[k].show() : a.connectors[k].hide()
                }))
            };
            b.prototype.getRanges = function () {
                var b = this.legend.bubbleLegend,
                    a = b.options.ranges,
                    h, k = Number.MAX_VALUE,
                    g = -Number.MAX_VALUE;
                b.chart.series.forEach(function (a) {
                    a.isBubble && !a.ignoreSeries &&
                        (h = a.zData.filter(I), h.length && (k = p(a.options.zMin, Math.min(k, Math.max(H(h), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), g = p(a.options.zMax, Math.max(g, F(h)))))
                });
                var e = k === g ? [{
                    value: g
                }] : [{
                    value: k
                }, {
                    value: (k + g) / 2
                }, {
                    value: g,
                    autoRanges: !0
                }];
                a.length && a[0].radius && e.reverse();
                e.forEach(function (b, g) {
                    a && a[g] && (e[g] = y(!1, a[g], b))
                });
                return e
            };
            b.prototype.predictBubbleSizes = function () {
                var b = this.chart,
                    a = this.fontMetrics,
                    h = b.legend.options,
                    k = "horizontal" === h.layout,
                    g = k ? b.legend.lastLineHeight :
                    0,
                    e = b.plotSizeX,
                    l = b.plotSizeY,
                    n = b.series[this.options.seriesIndex];
                b = Math.ceil(n.minPxSize);
                var p = Math.ceil(n.maxPxSize);
                n = n.options.maxSize;
                var r = Math.min(l, e);
                if (h.floating || !/%$/.test(n)) a = p;
                else if (n = parseFloat(n), a = (r + g - a.h / 2) * n / 100 / (n / 100 + 1), k && l - a >= e || !k && e - a >= l) a = p;
                return [b, Math.ceil(a)]
            };
            b.prototype.updateRanges = function (b, a) {
                var h = this.legend.options.bubbleLegend;
                h.minSize = b;
                h.maxSize = a;
                h.ranges = this.getRanges()
            };
            b.prototype.correctSizes = function () {
                var b = this.legend,
                    a = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(a.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, a.maxPxSize), b.render())
            };
            return b
        }();
        b(z, "afterGetAllItems", function (b) {
            var m = this.bubbleLegend,
                a = this.options,
                h = a.bubbleLegend,
                k = this.chart.getVisibleBubbleSeriesIndex();
            m && m.ranges && m.ranges.length && (h.ranges.length && (h.autoRanges = !!h.ranges[0].autoRanges), this.destroyItem(m));
            0 <= k && a.enabled && h.enabled && (h.seriesIndex = k, this.bubbleLegend = new q.BubbleLegend(h, this), this.bubbleLegend.addToLegend(b.allItems))
        });
        l.prototype.getVisibleBubbleSeriesIndex = function () {
            for (var b = this.series, m = 0; m < b.length;) {
                if (b[m] && b[m].isBubble && b[m].visible && b[m].zData.length) return m;
                m++
            }
            return -1
        };
        z.prototype.getLinesHeights = function () {
            var b = this.allItems,
                m = [],
                a = b.length,
                h, k = 0;
            for (h = 0; h < a; h++)
                if (b[h].legendItemHeight && (b[h].itemHeight = b[h].legendItemHeight), b[h] === b[a - 1] || b[h + 1] && b[h]._legendItemPos[1] !== b[h + 1]._legendItemPos[1]) {
                    m.push({
                        height: 0
                    });
                    var g = m[m.length - 1];
                    for (k; k <= h; k++) b[k].itemHeight > g.height && (g.height = b[k].itemHeight);
                    g.step = h
                } return m
        };
        z.prototype.retranslateItems = function (b) {
            var m, a, h, k = this.options.rtl,
                g = 0;
            this.allItems.forEach(function (e, l) {
                m = e.legendGroup.translateX;
                a = e._legendItemPos[1];
                if ((h = e.movementX) || k && e.ranges) h = k ? m - e.options.maxSize / 2 : m + h, e.legendGroup.attr({
                    translateX: h
                });
                l > b[g].step && g++;
                e.legendGroup.attr({
                    translateY: Math.round(a + b[g].height / 2)
                });
                e._legendItemPos[1] = a + b[g].height / 2
            })
        };
        b(v, "legendItemClick", function () {
            var b = this.chart,
                m = this.visible,
                a = this.chart.legend;
            a && a.bubbleLegend && (this.visible = !m, this.ignoreSeries = m, b = 0 <= b.getVisibleBubbleSeriesIndex(), a.bubbleLegend.visible !== b && (a.update({
                bubbleLegend: {
                    enabled: b
                }
            }), a.bubbleLegend.visible = b), this.visible = m)
        });
        n(l.prototype, "drawChartBox", function (b, m, a) {
            var h = this.legend,
                k = 0 <= this.getVisibleBubbleSeriesIndex();
            if (h && h.options.enabled && h.bubbleLegend && h.options.bubbleLegend.autoRanges && k) {
                var g = h.bubbleLegend.options;
                k = h.bubbleLegend.predictBubbleSizes();
                h.bubbleLegend.updateRanges(k[0], k[1]);
                g.placed || (h.group.placed = !1, h.allItems.forEach(function (a) {
                    a.legendGroup.translateY =
                        null
                }));
                h.render();
                this.getMargins();
                this.axes.forEach(function (a) {
                    a.visible && a.render();
                    g.placed || (a.setScale(), a.updateNames(), A(a.ticks, function (a) {
                        a.isNew = !0;
                        a.isNewLabel = !0
                    }))
                });
                g.placed = !0;
                this.getMargins();
                b.call(this, m, a);
                h.bubbleLegend.correctSizes();
                h.retranslateItems(h.getLinesHeights())
            } else b.call(this, m, a), h && h.options.enabled && h.bubbleLegend && (h.render(), h.retranslateItems(h.getLinesHeights()))
        });
        q.BubbleLegend = E;
        return q.BubbleLegend
    });
    M(q, "Series/Bubble/BubbleSeries.js", [q["Core/Globals.js"],
        q["Core/Color.js"], q["Core/Series/Point.js"], q["Core/Utilities.js"]
    ], function (l, b, q, z) {
        var w = b.parse,
            C = z.arrayMax,
            F = z.arrayMin,
            H = z.clamp,
            I = z.extend,
            y = z.isNumber,
            A = z.pick,
            p = z.pInt;
        b = z.seriesType;
        z = l.Axis;
        var E = l.noop,
            t = l.Series,
            n = l.seriesTypes;
        b("bubble", "scatter", {
            dataLabels: {
                formatter: function () {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            animationLimit: 250,
            marker: {
                lineColor: null,
                lineWidth: 1,
                fillOpacity: .5,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            isBubble: !0,
            pointAttribs: function (b, l) {
                var n = this.options.marker.fillOpacity;
                b = t.prototype.pointAttribs.call(this, b, l);
                1 !== n && (b.fill = w(b.fill).setOpacity(n).get("rgba"));
                return b
            },
            getRadii: function (b,
                l, n) {
                var m = this.zData,
                    a = this.yData,
                    h = n.minPxSize,
                    k = n.maxPxSize,
                    g = [];
                var e = 0;
                for (n = m.length; e < n; e++) {
                    var p = m[e];
                    g.push(this.getRadius(b, l, h, k, p, a[e]))
                }
                this.radii = g
            },
            getRadius: function (b, l, n, m, a, h) {
                var k = this.options,
                    g = "width" !== k.sizeBy,
                    e = k.zThreshold,
                    p = l - b,
                    r = .5;
                if (null === h || null === a) return null;
                if (y(a)) {
                    k.sizeByAbsoluteValue && (a = Math.abs(a - e), p = Math.max(l - e, Math.abs(b - e)), b = 0);
                    if (a < b) return n / 2 - 1;
                    0 < p && (r = (a - b) / p)
                }
                g && 0 <= r && (r = Math.sqrt(r));
                return Math.ceil(n + r * (m - n)) / 2
            },
            animate: function (b) {
                !b && this.points.length <
                    this.options.animationLimit && this.points.forEach(function (b) {
                        var l = b.graphic;
                        l && l.width && (this.hasRendered || l.attr({
                            x: b.plotX,
                            y: b.plotY,
                            width: 1,
                            height: 1
                        }), l.animate(this.markerAttribs(b), this.options.animation))
                    }, this)
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            translate: function () {
                var b, l = this.data,
                    p = this.radii;
                n.scatter.prototype.translate.call(this);
                for (b = l.length; b--;) {
                    var m = l[b];
                    var a = p ? p[b] : 0;
                    y(a) && a >= this.minPxSize / 2 ? (m.marker = I(m.marker, {
                        radius: a,
                        width: 2 * a,
                        height: 2 * a
                    }), m.dlBox = {
                        x: m.plotX - a,
                        y: m.plotY - a,
                        width: 2 * a,
                        height: 2 * a
                    }) : m.shapeArgs = m.plotY = m.dlBox = void 0
                }
            },
            alignDataLabel: n.column.prototype.alignDataLabel,
            buildKDTree: E,
            applyZones: E
        }, {
            haloPath: function (b) {
                return q.prototype.haloPath.call(this, 0 === b ? 0 : (this.marker ? this.marker.radius || 0 : 0) + b)
            },
            ttBelow: !1
        });
        z.prototype.beforePadding = function () {
            var b = this,
                l = this.len,
                n = this.chart,
                m = 0,
                a = l,
                h = this.isXAxis,
                k = h ? "xData" : "yData",
                g = this.min,
                e = {},
                q = Math.min(n.plotWidth, n.plotHeight),
                t = Number.MAX_VALUE,
                w = -Number.MAX_VALUE,
                z = this.max -
                g,
                E = l / z,
                I = [];
            this.series.forEach(function (a) {
                var g = a.options;
                !a.bubblePadding || !a.visible && n.options.chart.ignoreHiddenSeries || (b.allowZoomOutside = !0, I.push(a), h && (["minSize", "maxSize"].forEach(function (a) {
                    var b = g[a],
                        c = /%$/.test(b);
                    b = p(b);
                    e[a] = c ? q * b / 100 : b
                }), a.minPxSize = e.minSize, a.maxPxSize = Math.max(e.maxSize, e.minSize), a = a.zData.filter(y), a.length && (t = A(g.zMin, H(F(a), !1 === g.displayNegative ? g.zThreshold : -Number.MAX_VALUE, t)), w = A(g.zMax, Math.max(w, C(a))))))
            });
            I.forEach(function (e) {
                var l = e[k],
                    f = l.length;
                h && e.getRadii(t, w, e);
                if (0 < z)
                    for (; f--;)
                        if (y(l[f]) && b.dataMin <= l[f] && l[f] <= b.max) {
                            var d = e.radii ? e.radii[f] : 0;
                            m = Math.min((l[f] - g) * E - d, m);
                            a = Math.max((l[f] - g) * E + d, a)
                        }
            });
            I.length && 0 < z && !this.logarithmic && (a -= l, E *= (l + Math.max(0, m) - Math.min(a, l)) / l, [
                ["min", "userMin", m],
                ["max", "userMax", a]
            ].forEach(function (a) {
                "undefined" === typeof A(b.options[a[0]], b[a[1]]) && (b[a[0]] += a[2] / E)
            }))
        };
        ""
    });
    M(q, "Series/MapBubbleSeries.js", [q["Core/Globals.js"], q["Core/Series/Point.js"], q["Core/Utilities.js"]], function (l, b, q) {
        var z =
            q.merge;
        q = q.seriesType;
        var w = l.seriesTypes;
        w.bubble && q("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: w.map.prototype.getMapData,
            getBox: w.map.prototype.getBox,
            setData: w.map.prototype.setData,
            setOptions: w.map.prototype.setOptions
        }, {
            applyOptions: function (l, q) {
                return l && "undefined" !== typeof l.lat && "undefined" !== typeof l.lon ? b.prototype.applyOptions.call(this, z(l, this.series.chart.fromLatLonToPoint(l)),
                    q) : w.map.prototype.pointClass.prototype.applyOptions.call(this, l, q)
            },
            isValid: function () {
                return "number" === typeof this.z
            },
            ttBelow: !1
        });
        ""
    });
    M(q, "Series/HeatmapSeries.js", [q["Core/Globals.js"], q["Mixins/LegendSymbol.js"], q["Core/Renderer/SVG/SVGRenderer.js"], q["Core/Utilities.js"]], function (l, b, q, z) {
        var w = z.clamp,
            C = z.extend,
            F = z.fireEvent,
            H = z.isNumber,
            I = z.merge,
            y = z.pick;
        z = z.seriesType;
        "";
        var A = l.colorMapPointMixin,
            p = l.Series,
            E = q.prototype.symbols;
        z("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: {
                symbol: "rect",
                radius: 0,
                lineColor: void 0,
                states: {
                    hover: {
                        lineWidthPlus: 0
                    },
                    select: {}
                }
            },
            clip: !0,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
            },
            states: {
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, I(l.colorMapSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function () {
                p.prototype.init.apply(this,
                    arguments);
                var b = this.options;
                b.pointRange = y(b.pointRange, b.colsize || 1);
                this.yAxis.axisPointRange = b.rowsize || 1;
                C(E, {
                    ellipse: E.circle,
                    rect: E.square
                })
            },
            getSymbol: p.prototype.getSymbol,
            setClip: function (b) {
                var l = this.chart;
                p.prototype.setClip.apply(this, arguments);
                (!1 !== this.options.clip || b) && this.markerGroup.clip((b || this.clipBox) && this.sharedClipKey ? l[this.sharedClipKey] : l.clipRect)
            },
            translate: function () {
                var b = this.options,
                    l = b.marker && b.marker.symbol || "",
                    p = E[l] ? l : "rect";
                b = this.options;
                var q = -1 !== ["circle",
                    "square"
                ].indexOf(p);
                this.generatePoints();
                this.points.forEach(function (b) {
                    var m = b.getCellAttributes(),
                        a = {
                            x: Math.min(m.x1, m.x2),
                            y: Math.min(m.y1, m.y2),
                            width: Math.max(Math.abs(m.x2 - m.x1), 0),
                            height: Math.max(Math.abs(m.y2 - m.y1), 0)
                        };
                    var h = b.hasImage = 0 === (b.marker && b.marker.symbol || l || "").indexOf("url");
                    if (q) {
                        var k = Math.abs(a.width - a.height);
                        a.x = Math.min(m.x1, m.x2) + (a.width < a.height ? 0 : k / 2);
                        a.y = Math.min(m.y1, m.y2) + (a.width < a.height ? k / 2 : 0);
                        a.width = a.height = Math.min(a.width, a.height)
                    }
                    k = {
                        plotX: (m.x1 + m.x2) /
                            2,
                        plotY: (m.y1 + m.y2) / 2,
                        clientX: (m.x1 + m.x2) / 2,
                        shapeType: "path",
                        shapeArgs: I(!0, a, {
                            d: E[p](a.x, a.y, a.width, a.height)
                        })
                    };
                    h && (b.marker = {
                        width: a.width,
                        height: a.height
                    });
                    C(b, k)
                });
                F(this, "afterTranslate")
            },
            pointAttribs: function (b, n) {
                var q = p.prototype.pointAttribs.call(this, b, n),
                    t = this.options || {},
                    r = this.chart.options.plotOptions || {},
                    m = r.series || {},
                    a = r.heatmap || {};
                r = t.borderColor || a.borderColor || m.borderColor;
                m = t.borderWidth || a.borderWidth || m.borderWidth || q["stroke-width"];
                q.stroke = b && b.marker && b.marker.lineColor ||
                    t.marker && t.marker.lineColor || r || this.color;
                q["stroke-width"] = m;
                n && (b = I(t.states[n], t.marker && t.marker.states[n], b.options.states && b.options.states[n] || {}), n = b.brightness, q.fill = b.color || l.color(q.fill).brighten(n || 0).get(), q.stroke = b.lineColor);
                return q
            },
            markerAttribs: function (b, l) {
                var n = b.marker || {},
                    p = this.options.marker || {},
                    r = b.shapeArgs || {},
                    m = {};
                if (b.hasImage) return {
                    x: b.plotX,
                    y: b.plotY
                };
                if (l) {
                    var a = p.states[l] || {};
                    var h = n.states && n.states[l] || {};
                    [
                        ["width", "x"],
                        ["height", "y"]
                    ].forEach(function (b) {
                        m[b[0]] =
                            (h[b[0]] || a[b[0]] || r[b[0]]) + (h[b[0] + "Plus"] || a[b[0] + "Plus"] || 0);
                        m[b[1]] = r[b[1]] + (r[b[0]] - m[b[0]]) / 2
                    })
                }
                return l ? m : r
            },
            drawPoints: function () {
                var b = this;
                if ((this.options.marker || {}).enabled || this._hasPointMarkers) p.prototype.drawPoints.call(this), this.points.forEach(function (l) {
                    l.graphic && l.graphic[b.chart.styledMode ? "css" : "animate"](b.colorAttribs(l))
                })
            },
            hasData: function () {
                return !!this.processedXData.length
            },
            getValidPoints: function (b, l) {
                return p.prototype.getValidPoints.call(this, b, l, !0)
            },
            getBox: l.noop,
            drawLegendSymbol: b.drawRectangle,
            alignDataLabel: l.seriesTypes.column.prototype.alignDataLabel,
            getExtremes: function () {
                var b = p.prototype.getExtremes.call(this, this.valueData),
                    l = b.dataMin;
                b = b.dataMax;
                H(l) && (this.valueMin = l);
                H(b) && (this.valueMax = b);
                return p.prototype.getExtremes.call(this)
            }
        }), I(A, {
            applyOptions: function (b, n) {
                b = l.Point.prototype.applyOptions.call(this, b, n);
                b.formatPrefix = b.isNull || null === b.value ? "null" : "point";
                return b
            },
            isValid: function () {
                return Infinity !== this.value && -Infinity !== this.value
            },
            haloPath: function (b) {
                if (!b) return [];
                var l = this.shapeArgs;
                return ["M", l.x - b, l.y - b, "L", l.x - b, l.y + l.height + b, l.x + l.width + b, l.y + l.height + b, l.x + l.width + b, l.y - b, "Z"]
            },
            getCellAttributes: function () {
                var b = this.series,
                    l = b.options,
                    p = (l.colsize || 1) / 2,
                    q = (l.rowsize || 1) / 2,
                    r = b.xAxis,
                    m = b.yAxis,
                    a = this.options.marker || b.options.marker;
                b = b.pointPlacementToXValue();
                var h = y(this.pointPadding, l.pointPadding, 0),
                    k = {
                        x1: w(Math.round(r.len - (r.translate(this.x - p, !1, !0, !1, !0, -b) || 0)), -r.len, 2 * r.len),
                        x2: w(Math.round(r.len - (r.translate(this.x +
                            p, !1, !0, !1, !0, -b) || 0)), -r.len, 2 * r.len),
                        y1: w(Math.round(m.translate(this.y - q, !1, !0, !1, !0) || 0), -m.len, 2 * m.len),
                        y2: w(Math.round(m.translate(this.y + q, !1, !0, !1, !0) || 0), -m.len, 2 * m.len)
                    };
                [
                    ["width", "x"],
                    ["height", "y"]
                ].forEach(function (b) {
                    var e = b[0];
                    b = b[1];
                    var g = b + "1",
                        m = b + "2",
                        l = Math.abs(k[g] - k[m]),
                        n = a && a.lineWidth || 0,
                        p = Math.abs(k[g] + k[m]) / 2;
                    a[e] && a[e] < l && (k[g] = p - a[e] / 2 - n / 2, k[m] = p + a[e] / 2 + n / 2);
                    h && ("y" === b && (g = m, m = b + "1"), k[g] += h, k[m] -= h)
                });
                return k
            }
        }));
        ""
    });
    M(q, "Extensions/GeoJSON.js", [q["Core/Chart/Chart.js"],
        q["Core/Globals.js"], q["Core/Utilities.js"]
    ], function (l, b, q) {
        function z(b, l) {
            var p, q = !1,
                t = b.x,
                n = b.y;
            b = 0;
            for (p = l.length - 1; b < l.length; p = b++) {
                var v = l[b][1] > n;
                var w = l[p][1] > n;
                v !== w && t < (l[p][0] - l[b][0]) * (n - l[b][1]) / (l[p][1] - l[b][1]) + l[b][0] && (q = !q)
            }
            return q
        }
        var w = b.win,
            C = q.error,
            F = q.extend,
            H = q.format,
            I = q.merge;
        q = q.wrap;
        "";
        l.prototype.transformFromLatLon = function (b, l) {
            var p, q = (null === (p = this.userOptions.chart) || void 0 === p ? void 0 : p.proj4) || w.proj4;
            if (!q) return C(21, !1, this), {
                x: 0,
                y: null
            };
            b = q(l.crs, [b.lon,
                b.lat
            ]);
            p = l.cosAngle || l.rotation && Math.cos(l.rotation);
            q = l.sinAngle || l.rotation && Math.sin(l.rotation);
            b = l.rotation ? [b[0] * p + b[1] * q, -b[0] * q + b[1] * p] : b;
            return {
                x: ((b[0] - (l.xoffset || 0)) * (l.scale || 1) + (l.xpan || 0)) * (l.jsonres || 1) + (l.jsonmarginX || 0),
                y: (((l.yoffset || 0) - b[1]) * (l.scale || 1) + (l.ypan || 0)) * (l.jsonres || 1) - (l.jsonmarginY || 0)
            }
        };
        l.prototype.transformToLatLon = function (b, l) {
            if ("undefined" === typeof w.proj4) C(21, !1, this);
            else {
                b = {
                    x: ((b.x - (l.jsonmarginX || 0)) / (l.jsonres || 1) - (l.xpan || 0)) / (l.scale || 1) + (l.xoffset ||
                        0),
                    y: ((-b.y - (l.jsonmarginY || 0)) / (l.jsonres || 1) + (l.ypan || 0)) / (l.scale || 1) + (l.yoffset || 0)
                };
                var p = l.cosAngle || l.rotation && Math.cos(l.rotation),
                    q = l.sinAngle || l.rotation && Math.sin(l.rotation);
                l = w.proj4(l.crs, "WGS84", l.rotation ? {
                    x: b.x * p + b.y * -q,
                    y: b.x * q + b.y * p
                } : b);
                return {
                    lat: l.y,
                    lon: l.x
                }
            }
        };
        l.prototype.fromPointToLatLon = function (b) {
            var l = this.mapTransforms,
                p;
            if (l) {
                for (p in l)
                    if (Object.hasOwnProperty.call(l, p) && l[p].hitZone && z({
                            x: b.x,
                            y: -b.y
                        }, l[p].hitZone.coordinates[0])) return this.transformToLatLon(b, l[p]);
                return this.transformToLatLon(b, l["default"])
            }
            C(22, !1, this)
        };
        l.prototype.fromLatLonToPoint = function (b) {
            var l = this.mapTransforms,
                p;
            if (!l) return C(22, !1, this), {
                x: 0,
                y: null
            };
            for (p in l)
                if (Object.hasOwnProperty.call(l, p) && l[p].hitZone) {
                    var q = this.transformFromLatLon(b, l[p]);
                    if (z({
                            x: q.x,
                            y: -q.y
                        }, l[p].hitZone.coordinates[0])) return q
                } return this.transformFromLatLon(b, l["default"])
        };
        b.geojson = function (b, l, p) {
            var q = [],
                t = [],
                n = function (b) {
                    b.forEach(function (b, l) {
                        0 === l ? t.push(["M", b[0], -b[1]]) : t.push(["L", b[0],
                            -b[1]
                        ])
                    })
                };
            l = l || "map";
            b.features.forEach(function (b) {
                var p = b.geometry,
                    r = p.type;
                p = p.coordinates;
                b = b.properties;
                var m;
                t = [];
                "map" === l || "mapbubble" === l ? ("Polygon" === r ? (p.forEach(n), t.push(["Z"])) : "MultiPolygon" === r && (p.forEach(function (a) {
                    a.forEach(n)
                }), t.push(["Z"])), t.length && (m = {
                    path: t
                })) : "mapline" === l ? ("LineString" === r ? n(p) : "MultiLineString" === r && p.forEach(n), t.length && (m = {
                    path: t
                })) : "mappoint" === l && "Point" === r && (m = {
                    x: p[0],
                    y: -p[1]
                });
                m && q.push(F(m, {
                    name: b.name || b.NAME,
                    properties: b
                }))
            });
            p && b.copyrightShort &&
                (p.chart.mapCredits = H(p.chart.options.credits.mapText, {
                    geojson: b
                }), p.chart.mapCreditsFull = H(p.chart.options.credits.mapTextFull, {
                    geojson: b
                }));
            return q
        };
        q(l.prototype, "addCredits", function (b, l) {
            l = I(!0, this.options.credits, l);
            this.mapCredits && (l.href = null);
            b.call(this, l);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    });
    M(q, "Maps/Map.js", [q["Core/Chart/Chart.js"], q["Core/Globals.js"], q["Core/Options.js"], q["Core/Renderer/SVG/SVGRenderer.js"], q["Core/Utilities.js"]],
        function (l, b, q, z, w) {
            function C(b, l, q, n, v, w, r, m) {
                return [
                    ["M", b + v, l],
                    ["L", b + q - w, l],
                    ["C", b + q - w / 2, l, b + q, l + w / 2, b + q, l + w],
                    ["L", b + q, l + n - r],
                    ["C", b + q, l + n - r / 2, b + q - r / 2, l + n, b + q - r, l + n],
                    ["L", b + m, l + n],
                    ["C", b + m / 2, l + n, b, l + n - m / 2, b, l + n - m],
                    ["L", b, l + v],
                    ["C", b, l + v / 2, b + v / 2, l, b + v, l],
                    ["Z"]
                ]
            }
            q = q.defaultOptions;
            var F = w.extend,
                H = w.getOptions,
                I = w.merge,
                y = w.pick;
            w = b.Renderer;
            var A = b.VMLRenderer;
            F(q.lang, {
                zoomIn: "Zoom in",
                zoomOut: "Zoom out"
            });
            q.mapNavigation = {
                buttonOptions: {
                    alignTo: "plotBox",
                    align: "left",
                    verticalAlign: "top",
                    x: 0,
                    width: 18,
                    height: 18,
                    padding: 5,
                    style: {
                        fontSize: "15px",
                        fontWeight: "bold"
                    },
                    theme: {
                        "stroke-width": 1,
                        "text-align": "center"
                    }
                },
                buttons: {
                    zoomIn: {
                        onclick: function () {
                            this.mapZoom(.5)
                        },
                        text: "+",
                        y: 0
                    },
                    zoomOut: {
                        onclick: function () {
                            this.mapZoom(2)
                        },
                        text: "-",
                        y: 28
                    }
                },
                mouseWheelSensitivity: 1.1
            };
            b.splitPath = function (b) {
                "string" === typeof b && (b = b.replace(/([A-Za-z])/g, " $1 ").replace(/^\s*/, "").replace(/\s*$/, ""), b = b.split(/[ ,;]+/).map(function (b) {
                    return /[A-za-z]/.test(b) ? b : parseFloat(b)
                }));
                return z.prototype.pathToSegments(b)
            };
            b.maps = {};
            z.prototype.symbols.topbutton = function (b, l, q, n, v) {
                v = v && v.r || 0;
                return C(b - 1, l - 1, q, n, v, v, 0, 0)
            };
            z.prototype.symbols.bottombutton = function (b, l, q, n, v) {
                v = v && v.r || 0;
                return C(b - 1, l - 1, q, n, 0, 0, v, v)
            };
            w === A && ["topbutton", "bottombutton"].forEach(function (b) {
                A.prototype.symbols[b] = z.prototype.symbols[b]
            });
            b.Map = b.mapChart = function (b, q, t) {
                var n = "string" === typeof b || b.nodeName,
                    p = arguments[n ? 1 : 0],
                    w = p,
                    r = {
                        endOnTick: !1,
                        visible: !1,
                        minPadding: 0,
                        maxPadding: 0,
                        startOnTick: !1
                    },
                    m = H().credits;
                var a = p.series;
                p.series =
                    null;
                p = I({
                    chart: {
                        panning: {
                            enabled: !0,
                            type: "xy"
                        },
                        type: "map"
                    },
                    credits: {
                        mapText: y(m.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                        mapTextFull: y(m.mapTextFull, "{geojson.copyright}")
                    },
                    tooltip: {
                        followTouchMove: !1
                    },
                    xAxis: r,
                    yAxis: I(r, {
                        reversed: !0
                    })
                }, p, {
                    chart: {
                        inverted: !1,
                        alignTicks: !1
                    }
                });
                p.series = w.series = a;
                return n ? new l(b, p, t) : new l(p, q)
            }
        });
    M(q, "masters/modules/map.src.js", [], function () {});
    M(q, "masters/highmaps.src.js", [q["masters/highcharts.src.js"]], function (l) {
        l.product =
            "Highmaps";
        return l
    });
    q["masters/highmaps.src.js"]._modules = q;
    return q["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map
