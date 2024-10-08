(function (window) {
    function Matrix(t) {
        var e = this;
        (e._t = e.transform),
            (e.a = e.d = 1),
            (e.b = e.c = e.e = e.f = 0),
            (e.props = [1, 0, 0, 1, 0, 0]),
            (e.cssParts = ["matrix(", "", ")"]),
            (e.a1 = e.b1 = e.c1 = e.d1 = e.e1 = e.f1 = 0),
            (e.context = t),
            (e.cos = e.sin = 0),
            t && t.setTransform(1, 0, 0, 1, 0, 0);
    }
    function matrixManagerFunction() {
        var t = new Matrix(),
            e = function (t, e, a, i, r, s, n, o, h) {
                var l, p, m, d, c, u, f;
                return (
                    (l = $M([
                        [1, 0, 0, 0],
                        [0, Math.cos(t), Math.sin(-t), 0],
                        [0, Math.sin(t), Math.cos(t), 0],
                        [0, 0, 0, 1],
                    ])),
                    (p = $M([
                        [Math.cos(e), 0, Math.sin(e), 0],
                        [0, 1, 0, 0],
                        [Math.sin(-e), 0, Math.cos(e), 0],
                        [0, 0, 0, 1],
                    ])),
                    (m = $M([
                        [Math.cos(a), Math.sin(-a), 0, 0],
                        [Math.sin(a), Math.cos(a), 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1],
                    ])),
                    (c = $M([
                        [i, 0, 0, 0],
                        [0, r, 0, 0],
                        [0, 0, s, 0],
                        [0, 0, 0, 1],
                    ])),
                    (u = l.x(p).x(m).x(c)),
                    (u = u.transpose()),
                    (f = $M([
                        [1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [n, o, h, 1],
                    ])),
                    (u = u.x(f)),
                    (d = "matrix3d("),
                    (d +=
                        u.e(1, 1).toFixed(5) +
                        "," +
                        u.e(1, 2).toFixed(5) +
                        "," +
                        u.e(1, 3).toFixed(5) +
                        "," +
                        u.e(1, 4).toFixed(5) +
                        ","),
                    (d +=
                        u.e(2, 1).toFixed(5) +
                        "," +
                        u.e(2, 2).toFixed(5) +
                        "," +
                        u.e(2, 3).toFixed(5) +
                        "," +
                        u.e(2, 4).toFixed(5) +
                        ","),
                    (d +=
                        u.e(3, 1).toFixed(5) +
                        "," +
                        u.e(3, 2).toFixed(5) +
                        "," +
                        u.e(3, 3).toFixed(5) +
                        "," +
                        u.e(3, 4).toFixed(5) +
                        ","),
                    (d +=
                        u.e(4, 1).toFixed(5) +
                        "," +
                        u.e(4, 2).toFixed(5) +
                        "," +
                        u.e(4, 3).toFixed(5) +
                        "," +
                        u.e(4, 4).toFixed(5)),
                    (d += ")")
                );
            },
            a = function (e, a, i, r, s) {
                return t.reset().translate(r, s).rotate(e).scale(a, i).toCSS();
            },
            i = function (e, a, i, r, s) {
                return t.reset().translate(r, s).rotate(e).scale(a, i).toArray();
            },
            r = function (t) {
                return a(t.r, t.s[0], t.s[1], t.p[0], t.p[1]);
            },
            s = function (t, i) {
                return i
                    ? e(
                        -t.tr.r[0],
                        t.tr.r[1],
                        t.tr.r[2],
                        t.tr.s[0],
                        t.tr.s[1],
                        t.tr.s[2],
                        t.tr.p[0],
                        t.tr.p[1],
                        t.tr.p[2]
                    )
                    : a(t.tr.r[2], t.tr.s[0], t.tr.s[1], t.tr.p[0], t.tr.p[1]);
            },
            n = function (t, i) {
                return i
                    ? e(
                        -t.r[0],
                        t.r[1],
                        t.r[2],
                        t.s[0],
                        t.s[1],
                        t.s[2],
                        t.p[0],
                        t.p[1],
                        t.p[2]
                    )
                    : a(t.r[2], t.s[0], t.s[1], t.p[0], t.p[1]);
            },
            o = function (t, e) {
                return e ? null : i(t.r[2], t.s[0], t.s[1], t.p[0], t.p[1]);
            };
        return {
            get2DMatrix: r,
            getMatrix: s,
            getMatrix2: n,
            getMatrixArray: o,
            getMatrixArrayFromParams: i,
            getMatrix2FromParams: a,
        };
    }
    function styleDiv(t) {
        (t.style.position = "absolute"),
            (t.style.top = 0),
            (t.style.left = 0),
            (t.style.display = "block"),
            (t.style.verticalAlign = "top"),
            (t.style.backfaceVisibility = t.style.webkitBackfaceVisibility =
                "hidden"),
            styleUnselectableDiv(t);
    }
    function styleUnselectableDiv(t) {
        (t.style.userSelect = "none"),
            (t.style.MozUserSelect = "none"),
            (t.style.webkitUserSelect = "none"),
            (t.style.oUserSelect = "none");
    }
    function randomString(t, e) {
        void 0 === e &&
            (e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
        var a,
            i = "";
        for (a = t; a > 0; --a) i += e[Math.round(Math.random() * (e.length - 1))];
        return i;
    }
    function componentToHex(t) {
        var e = t.toString(16);
        return 1 == e.length ? "0" + e : e;
    }
    function fillToRgba(t, e) {
        if (!cachedColors[t]) {
            var a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            cachedColors[t] =
                parseInt(a[1], 16) +
                "," +
                parseInt(a[2], 16) +
                "," +
                parseInt(a[3], 16);
        }
        return "rgba(" + cachedColors[t] + "," + e + ")";
    }
    function createElement(t, e, a) {
        if (!e) {
            var i = Object.create(t.prototype, a),
                r = {};
            return (
                i && "[object Function]" === r.toString.call(i.init) && i.init(), i
            );
        }
        (e.prototype = Object.create(t.prototype)),
            (e.prototype.constructor = e),
            (e.prototype.parent = t.prototype);
    }
    function defineDescriptor(t, e, a, i) {
        var r = { writable: !1, configurable: !1, enumerable: !1, value: a };
        if (i) for (var s in i) r[s] = i[s];
        var n = {};
        t && "[object Function]" === n.toString.call(t) && (t = t.prototype),
            Object.defineProperty(t, e, r);
    }
    function defineAccessor(t, e, a) {
        var i,
            r = {
                enumerable: !1,
                configurable: !1,
                get: function () {
                    return i;
                },
                set: function (t) {
                    i = t;
                },
            };
        if (a) for (var s in a) r[s] = a[s];
        var n = {};
        t && "[object Function]" === n.toString.call(t) && (t = t.prototype),
            Object.defineProperty(t, e, r);
    }
    function bezFunction() {
        function t(t, e, a, i, r, s) {
            return o.abs((a - t) * (s - e) - (r - t) * (i - e)) < 1e-5;
        }
        function e(t) {
            return n[t].fnc;
        }
        function a(t, e, a, i, r) {
            if (
                (r ||
                    (r = ("bez_" + t + "_" + e + "_" + a + "_" + i).replace(/\./g, "p")),
                    n[r])
            )
                return n[r];
            var s, o, h, l, p, m;
            return (
                (n[r] = function (r, n, d, c, u) {
                    var f = n / u;
                    r = f;
                    for (
                        var y, g = 0;
                        ++g < 14 &&
                        ((h = 3 * t),
                            (o = 3 * (a - t) - h),
                            (s = 1 - h - o),
                            (y = r * (h + r * (o + r * s)) - f),
                            !(Math.abs(y) < 0.001));

                    )
                        r -= y / (h + r * (2 * o + 3 * s * r));
                    (m = 3 * e), (p = 3 * (i - e) - m), (l = 1 - m - p);
                    var v = r * (m + r * (p + r * l));
                    return c * v + d;
                }),
                n[r]
            );
        }
        function i(e) {
            var a,
                i,
                r,
                s,
                n,
                o,
                h,
                l = e.s,
                p = e.e,
                m = e.to,
                d = e.ti,
                c = 500,
                u = 0,
                f = null,
                y = { points: [], segmentLength: 0 };
            for (
                (l[0] != p[0] || l[1] != p[1]) &&
                t(l[0], l[1], p[0], p[1], l[0] + m[0], l[1] + m[1]) &&
                t(l[0], l[1], p[0], p[1], p[0] + d[0], p[1] + d[1]) &&
                (c = 2),
                r = m.length,
                a = 0;
                c > a;
                a += 1
            ) {
                for (h = [], n = a / (c - 1), o = 0, i = 0; r > i; i += 1)
                    (s =
                        Math.pow(1 - n, 3) * l[i] +
                        3 * Math.pow(1 - n, 2) * n * (l[i] + m[i]) +
                        3 * (1 - n) * Math.pow(n, 2) * (p[i] + d[i]) +
                        Math.pow(n, 3) * p[i]),
                        h.push(s),
                        null !== f && (o += Math.pow(h[i] - f[i], 2));
                (o = Math.sqrt(o)),
                    (u += o),
                    y.points.push({ partialLength: o, cumulatedLength: u, point: h }),
                    (f = h);
            }
            (y.segmentLength = u), (e.bezierData = y);
        }
        function r(t, e) {
            var a = e.segments,
                i = a.length,
                r = Math.floor((i - 1) * t),
                s = t * e.addedLength,
                n = 0;
            if (s == a[r].l) return a[r].p;
            for (var o = a[r].l > s ? -1 : 1, h = !0; h;)
                a[r].l <= s && a[r + 1].l > s
                    ? ((n = (s - a[r].l) / (a[r + 1].l - a[r].l)), (h = !1))
                    : (r += o),
                    (0 > r || r >= i - 1) && (h = !1);
            return a[r].p + (a[r + 1].p - a[r].p) * n;
        }
        function s(t, e, a, i, s, n, o) {
            var h = { pt1: [], pt2: [], pt3: [], pt4: [] };
            s = 0 > s ? 0 : s;
            var l = r(s, o);
            n = n > 1 ? 1 : n;
            var p,
                m = r(n, o),
                d = t.length,
                c = 1 - l,
                u = 1 - m,
                f = [],
                y = [],
                g = [],
                v = [];
            for (p = 0; d > p; p += 1)
                (f[p] =
                    c * c * c * t[p] +
                    (l * c * c + c * l * c + c * c * l) * a[p] +
                    (l * l * c + c * l * l + l * c * l) * i[p] +
                    l * l * l * e[p]),
                    (y[p] =
                        c * c * u * t[p] +
                        (l * c * u + c * l * u + c * c * m) * a[p] +
                        (l * l * u + c * l * m + l * c * m) * i[p] +
                        l * l * m * e[p]),
                    (g[p] =
                        c * u * u * t[p] +
                        (l * u * u + c * m * u + c * u * m) * a[p] +
                        (l * m * u + c * m * m + l * u * m) * i[p] +
                        l * m * m * e[p]),
                    (v[p] =
                        u * u * u * t[p] +
                        (m * u * u + u * m * u + u * u * m) * a[p] +
                        (m * m * u + u * m * m + m * u * m) * i[p] +
                        m * m * m * e[p]);
            return (h.pt1 = f), (h.pt2 = v), (h.pt3 = y), (h.pt4 = g), h;
        }
        var n = [],
            o = Math,
            h = (function () {
                var e = {};
                return function (a, i, r, s) {
                    var n = (
                        a.join("_") +
                        "_" +
                        i.join("_") +
                        "_" +
                        r.join("_") +
                        "_" +
                        s.join("_")
                    ).replace(/\./g, "p");
                    if (e[n]) return e[n];
                    var o,
                        h,
                        l,
                        p,
                        m,
                        d,
                        c = 100,
                        u = 0,
                        f = [],
                        y = [],
                        g = { addedLength: 0, segments: [] };
                    for (
                        (a[0] != i[0] || a[1] != i[1]) &&
                        t(a[0], a[1], i[0], i[1], r[0], r[1]) &&
                        t(a[0], a[1], i[0], i[1], s[0], s[1]) &&
                        (c = 2),
                        l = r.length,
                        o = 0;
                        c > o;
                        o += 1
                    ) {
                        for (m = o / (c - 1), d = 0, h = 0; l > h; h += 1)
                            (p =
                                Math.pow(1 - m, 3) * a[h] +
                                3 * Math.pow(1 - m, 2) * m * r[h] +
                                3 * (1 - m) * Math.pow(m, 2) * s[h] +
                                Math.pow(m, 3) * i[h]),
                                (f[h] = p),
                                null !== y[h] && (d += Math.pow(f[h] - y[h], 2)),
                                (y[h] = f[h]);
                        d && ((d = Math.sqrt(d)), (u += d)),
                            g.segments.push({ l: u, p: m });
                    }
                    return (g.addedLength = u), (e[n] = g), g;
                };
            })();
        return {
            getEasingCurve: a,
            getEasingCurveByIndex: e,
            getBezierLength: h,
            getNewSegment: s,
            buildBezierData: i,
        };
    }
    function dataFunctionManager() {
        function t(t, e, a) {
            var i,
                r = h(t, e, a),
                s = [];
            for (i = 0; e > i; i += 1) s.push(Math.floor(r[i] * b));
            return s;
        }
        function e(t, e) {
            var a,
                i,
                r,
                s = t.length;
            for (a = 0; s > a; a += 1)
                if (void 0 !== t[a].t)
                    if (t[a].s instanceof Array)
                        for (r = t[a].s.length, i = 0; r > i; i += 1)
                            (t[a].s[i] *= e), (t[a].e[i] *= e);
                    else t[a].s && ((t[a].s *= e), (t[a].e *= e));
                else t[a] = t[a] * e;
        }
        function a(n, h) {
            h || (h = n);
            var l,
                p,
                m,
                d,
                c,
                u,
                f,
                y,
                g,
                v,
                x = n.length;
            for (u = 0; x > u; u += 1) {
                if (
                    ((m = n[u]),
                        (l = m.outPoint - m.startTime),
                        (p = m.startTime),
                        (m.layerName = o(m.layerName)),
                        m.parent && (m.parent = o(m.parent)),
                        (m.renderedFrame = {}),
                        (m.renderedData = {}),
                        (d = []),
                        (c = -1),
                        m.tm && ((m.trmp = m.tm), (m.tm = t(m.tm, l, p))),
                        m.ks.o instanceof Array ? e(m.ks.o, 0.01) : (m.ks.o /= 100),
                        m.ks.s instanceof Array ? e(m.ks.s, 0.01) : (m.ks.s /= 100),
                        m.ks.r instanceof Array ? e(m.ks.r, S) : (m.ks.r *= S),
                        m.hasMask)
                ) {
                    var b = m.masksProperties;
                    for (y = b.length, f = 0; y > f; f += 1)
                        if (b[f].pt.i) s(b[f].pt);
                        else
                            for (v = b[f].pt.length, g = 0; v > g; g += 1)
                                b[f].pt[g].s && s(b[f].pt[g].s[0]),
                                    b[f].pt[g].e && s(b[f].pt[g].e[0]);
                }
                "PreCompLayer" == m.type
                    ? m.refId && !m.layers
                        ? (m.layers = i(m.refId, h))
                        : a(m.layers, h)
                    : "ShapeLayer" == m.type && r(m.shapes);
            }
        }
        function i(t, e, a) {
            a || (a = e);
            var r,
                s = e.length;
            for (r = 0; s > r; r += 1) {
                if (e[r].compId == t)
                    return e[r].layers || (e[r].layers = i(e[r].refId, a)), e[r].layers;
                if ("PreCompLayer" == e[r].type) {
                    var n = i(t, e[r].layers, a);
                    if (n) return n;
                }
            }
            return null;
        }
        function r(t, a) {
            var i,
                n,
                o,
                h,
                l = t.length,
                p = a ? a : !1;
            for (i = l - 1; i >= 0; i -= 1)
                if (
                    ((t[i].renderedData = []),
                        "tm" == t[i].ty && (p = !0),
                        "fl" == t[i].ty || "st" == t[i].ty)
                )
                    t[i].o instanceof Array ? e(t[i].o, 0.01) : (t[i].o *= 0.01);
                else if ("sh" == t[i].ty)
                    if (((t[i].trimmed = p), t[i].ks.i)) s(t[i].ks);
                    else
                        for (o = t[i].ks.length, n = 0; o > n; n += 1)
                            t[i].ks[n].s && (s(t[i].ks[n].s[0]), s(t[i].ks[n].e[0]));
                else
                    "gr" == t[i].ty
                        ? r(t[i].it, p)
                        : "tr" == t[i].ty
                            ? ((h = t[i]),
                                (h.renderedData = []),
                                h.o instanceof Array ? e(h.o, 0.01) : (h.o /= 100),
                                h.s instanceof Array ? e(h.s, 0.01) : (h.s /= 100),
                                h.r instanceof Array ? e(h.r, S) : (h.r *= S))
                            : "rc" == t[i].ty && ((t[i].trimmed = p), (t[i].trimmed = !0));
        }
        function s(t) {
            var e,
                a = t.i.length;
            for (e = 0; a > e; e += 1)
                (t.i[e][0] += t.v[e][0]),
                    (t.i[e][1] += t.v[e][1]),
                    (t.o[e][0] += t.v[e][0]),
                    (t.o[e][1] += t.v[e][1]);
        }
        function n(t) {
            (C[t._id] = { data: t, renderedFrames: [] }),
                (b = t.animation.frameRate),
                a(t.animation.layers);
        }
        function o(t) {
            return (
                (t = t.replace(/ /g, "_")),
                (t = t.replace(/-/g, "_")),
                (t = t.replace(/\./g, "_")),
                (t = t.replace(/\//g, "_"))
            );
        }
        function h(t, e, a) {
            var i,
                r,
                s = [];
            if (!(t instanceof Array) || null === t[0].t) return s.push(t), s;
            var n, o;
            s = [];
            var h,
                l,
                p,
                m = [];
            r = t.length;
            var d, c, u;
            for (i = 0; r > i; i += 1) (n = t[i]), (n.t -= a);
            var f = 0,
                y = 0;
            for (i = 0; e > i; i += 1) {
                h = f;
                for (var g = !1; r - 1 > h;) {
                    if (((n = t[h]), (o = t[h + 1]), i < n.t && 0 === h)) {
                        for (p = n.s.length, m = [], l = 0; p > l; l += 1) m.push(n.s[l]);
                        s.push(m), (g = !0), f != h && ((f = h), (y = 0));
                        break;
                    }
                    if (i >= n.t && i < o.t) {
                        if (((m = []), n.to)) {
                            (d = bez.getEasingCurve(n.o.x, n.o.y, n.i.x, n.i.y)(
                                "",
                                i - n.t,
                                0,
                                1,
                                o.t - n.t
                            )),
                                (c = n.bezierData);
                            var v,
                                x,
                                b = c.segmentLength * d;
                            for (l = y; l < c.points.length;) {
                                if (0 === i || 0 === b || 0 === d) {
                                    (m = c.points[l].point), (y = l);
                                    break;
                                }
                                if (l == c.points.length - 1) m = c.points[l].point;
                                else if (
                                    b > c.points[l].partialLength &&
                                    b < c.points[l + 1].partialLength
                                ) {
                                    for (
                                        v = c.points[l].point.length,
                                        x =
                                        (b - c.points[l].partialLength) /
                                        (c.points[l + 1].partialLength -
                                            c.points[l].partialLength),
                                        u = 0;
                                        v > u;
                                        u += 1
                                    )
                                        m.push(
                                            c.points[l].point[u] +
                                            (c.points[l + 1].point[u] - c.points[l].point[u]) * x
                                        );
                                    y = l;
                                    break;
                                }
                                l += 1;
                            }
                        } else {
                            var E, C, S, D;
                            n.s.forEach(function (t, e) {
                                if (
                                    (1 !== n.h &&
                                        (n.o.x instanceof Array
                                            ? ((E = n.o.x[e]),
                                                (C = n.o.y[e]),
                                                (S = n.i.x[e]),
                                                (D = n.i.y[e]))
                                            : ((E = n.o.x), (C = n.o.y), (S = n.i.x), (D = n.i.y)),
                                            (d = bez.getEasingCurve(E, C, S, D)(
                                                "",
                                                i - n.t,
                                                0,
                                                1,
                                                o.t - n.t
                                            ))),
                                        t.i)
                                ) {
                                    var a = { i: [], o: [], v: [] };
                                    t.i.forEach(function (i, r) {
                                        var s = [],
                                            o = [],
                                            h = [];
                                        i.forEach(function (a, i) {
                                            1 === n.h
                                                ? (s.push(a), o.push(t.o[r][i]), h.push(t.v[r][i]))
                                                : (s.push(a + (n.e[e].i[r][i] - a) * d),
                                                    o.push(t.o[r][i] + (n.e[e].o[r][i] - t.o[r][i]) * d),
                                                    h.push(t.v[r][i] + (n.e[e].v[r][i] - t.v[r][i]) * d));
                                        }),
                                            a.i.push(s),
                                            a.o.push(o),
                                            a.v.push(h);
                                    }),
                                        m.push(a);
                                } else m.push(1 === n.h ? t : t + (n.e[e] - t) * d);
                            });
                        }
                        s.push(m), (g = !0), f != h && ((f = h), (y = 0));
                        break;
                    }
                    h += 1;
                }
                g === !1 &&
                    ((n = t[t.length - 2]),
                        (m = []),
                        n.e.forEach(function (t) {
                            m.push(t);
                        }),
                        s.push(m));
            }
            for (h = s.length; e > h;) s.push(m), (h += 1);
            return s;
        }
        function l(t, e, a, i) {
            var r, s, n, o, h, l;
            if (!t.length)
                return (
                    "p" == i.type
                        ? ((F.px = t), (F.py = t))
                        : "s" == i.type
                            ? ((F.sx = t), (F.sy = t))
                            : "r" == i.type && (F.r = t),
                    i.toArray ? [t] : t
                );
            if (void 0 === t[0].t)
                return (
                    "p" == i.type
                        ? ((F.px = t[0]), (F.py = t[1]))
                        : "s" == i.type
                            ? ((F.sx = t[0]), (F.sy = t[1]))
                            : "r" == i.type && (F.r = t[0]),
                    t
                );
            (h = 0), (l = t.length - 1);
            for (
                var p = 1, m = !0;
                !(
                    !m ||
                    ((r = t[h]), (s = t[h + 1]), h == l - 1 && e >= s.t - a) ||
                    (s.t - a > e && 1 == p)
                );

            ) {
                if (s.t - a < e && -1 == p) {
                    (h += 1), (r = t[h]), (s = t[h + 1]);
                    break;
                }
                (l - 1 > h && 1 == p) || (h > 0 && -1 == p) ? (h += p) : (m = !1);
            }
            r.to && !r.bezierData && bez.buildBezierData(r);
            var d,
                c,
                u,
                f,
                y,
                g = 0;
            if (("default" == i.type && (n = []), r.to)) {
                if (((o = r.bezierData), e >= s.t - a))
                    return (
                        "p" == i.type
                            ? ((F.px = o.points[o.points.length - 1].point[0]),
                                (F.py = o.points[o.points.length - 1].point[1]))
                            : "s" == i.type
                                ? ((F.sx = o.points[o.points.length - 1].point[0]),
                                    (F.sy = o.points[o.points.length - 1].point[1]))
                                : "r" == i.type && (F.r = o.points[o.points.length - 1].point[0]),
                        o.points[o.points.length - 1].point
                    );
                if (e < r.t - a)
                    return (
                        "p" == i.type
                            ? ((F.px = o.points[0].point[0]), (F.py = o.points[0].point[1]))
                            : "s" == i.type
                                ? ((F.sx = o.points[0].point[0]), (F.sy = o.points[0].point[1]))
                                : "r" == i.type && (F.r = o.points[0].point[0]),
                        o.points[0].point
                    );
                r.__fnct
                    ? (y = r.__fnct)
                    : ((y = bez.getEasingCurve(r.o.x, r.o.y, r.i.x, r.i.y, r.n)),
                        (r.__fnct = y)),
                    (u = y("", e - (r.t - a), 0, 1, s.t - a - (r.t - a)));
                var v,
                    x = o.segmentLength * u,
                    b = 0;
                for (p = 1, m = !0, f = o.points.length; m;) {
                    if (((b += o.points[g].partialLength * p), 0 === x || 0 === u)) {
                        "p" == i.type
                            ? ((F.px = o.points[g].point[0]), (F.py = o.points[g].point[1]))
                            : "s" == i.type
                                ? ((F.sx = o.points[g].point[0]), (F.sy = o.points[g].point[1]))
                                : "r" == i.type
                                    ? (F.r = o.points[g].point[0])
                                    : (n = o.points[g].point);
                        break;
                    }
                    if (g == o.points.length - 1) {
                        "p" == i.type
                            ? ((F.px = o.points[g].point[0]), (F.py = o.points[g].point[1]))
                            : "s" == i.type
                                ? ((F.sx = o.points[g].point[0]), (F.sy = o.points[g].point[1]))
                                : "r" == i.type
                                    ? (F.r = o.points[g].point[0])
                                    : (n = o.points[g].point);
                        break;
                    }
                    if (x > b && x < b + o.points[g + 1].partialLength) {
                        if (((v = (x - b) / o.points[g + 1].partialLength), "p" == i.type))
                            (F.px =
                                o.points[g].point[0] +
                                (o.points[g + 1].point[0] - o.points[g].point[0]) * v),
                                (F.py =
                                    o.points[g].point[1] +
                                    (o.points[g + 1].point[1] - o.points[g].point[1]) * v);
                        else if ("s" == i.type)
                            (F.sx =
                                o.points[g].point[0] +
                                (o.points[g + 1].point[0] - o.points[g].point[0]) * v),
                                (F.sy =
                                    o.points[g].point[1] +
                                    (o.points[g + 1].point[1] - o.points[g].point[1]) * v);
                        else if ("r" == i.type)
                            F.r =
                                o.points[g].point[0] +
                                (o.points[g + 1].point[0] - o.points[g].point[0]) * v;
                        else
                            for (c = o.points[g].point.length, d = 0; c > d; d += 1)
                                n.push(
                                    o.points[g].point[d] +
                                    (o.points[g + 1].point[d] - o.points[g].point[d]) * v
                                );
                        break;
                    }
                    (f - 1 > g && 1 == p) || (g > 0 && -1 == p) ? (g += p) : (m = !1);
                }
            } else {
                var E,
                    C,
                    S,
                    D,
                    w = !1;
                for (l = r.s.length, h = 0; l > h; h += 1)
                    1 !== r.h &&
                        (r.o.x instanceof Array
                            ? ((w = !0),
                                (E = r.o.x[h] ? r.o.x[h] : r.o.x[0]),
                                (C = r.o.y[h] ? r.o.y[h] : r.o.y[0]),
                                (S = r.i.x[h] ? r.i.x[h] : r.i.x[0]),
                                (D = r.i.y[h] ? r.i.y[h] : r.i.y[0]),
                                r.__fnct || (r.__fnct = []))
                            : ((w = !1), (E = r.o.x), (C = r.o.y), (S = r.i.x), (D = r.i.y)),
                            w
                                ? r.__fnct[h]
                                    ? (y = r.__fnct[h])
                                    : ((y = bez.getEasingCurve(E, C, S, D)), (r.__fnct[h] = y))
                                : r.__fnct
                                    ? (y = r.__fnct)
                                    : ((y = bez.getEasingCurve(E, C, S, D)), (r.__fnct = y)),
                            (u =
                                e >= s.t - a
                                    ? 1
                                    : e < r.t - a
                                        ? 0
                                        : y("", e - (r.t - a), 0, 1, s.t - a - (r.t - a)))),
                        1 === r.h
                            ? "p" == i.type
                                ? 0 === h
                                    ? (F.px = r.s[h])
                                    : 1 == h && (F.py = r.s[h])
                                : "s" == i.type
                                    ? 0 === h
                                        ? (F.sx = r.s[h])
                                        : 1 == h && (F.sy = r.s[h])
                                    : "r" == i.type
                                        ? (F.r = r.s[h])
                                        : n.push(r.s[h])
                            : "p" == i.type
                                ? 0 === h
                                    ? (F.px = r.s[h] + (r.e[h] - r.s[h]) * u)
                                    : 1 == h && (F.py = r.s[h] + (r.e[h] - r.s[h]) * u)
                                : "s" == i.type
                                    ? 0 === h
                                        ? (F.sx = r.s[h] + (r.e[h] - r.s[h]) * u)
                                        : 1 == h && (F.sy = r.s[h] + (r.e[h] - r.s[h]) * u)
                                    : "r" == i.type
                                        ? (F.r = r.s[h] + (r.e[h] - r.s[h]) * u)
                                        : n.push(r.s[h] + (r.e[h] - r.s[h]) * u);
            }
            return n;
        }
        function p(t, e) {
            if (!t.__lengths) {
                (t.__lengths = []), (t.__totalLength = 0);
                var a,
                    i = t.v,
                    r = t.o,
                    s = t.i,
                    n = i.length;
                for (a = 0; n - 1 > a; a += 1)
                    t.__lengths.push(bez.getBezierLength(i[a], i[a + 1], r[a], s[a + 1])),
                        (t.__totalLength += t.__lengths[a].addedLength);
                e &&
                    (t.__lengths.push(bez.getBezierLength(i[a], i[0], r[a], s[0])),
                        (t.__totalLength += t.__lengths[a].addedLength));
            }
        }
        function m(t, e, a, i, r, s) {
            var n = s && s.length > 0,
                o = {};
            o.closed = r ? t.cl : t.closed;
            var h = r ? t.pt : t.ks;
            if (h.v)
                return (
                    n
                        ? "svg" == i
                            ? (o.pathString = w(h, o.closed, s, !0))
                            : (o.pathNodes = w(h, o.closed, s, !1))
                        : "svg" == i
                            ? (h.__pathString || (h.__pathString = d(h, o.closed)),
                                (o.pathString = h.__pathString))
                            : (o.pathNodes = h),
                    o
                );
            t = { i: [], o: [], v: [] };
            var l,
                p,
                m,
                c,
                u,
                f,
                y,
                g = [];
            if (e < h[0].t - a) {
                if (!h.__minValue) {
                    for (p = h[0].s[0].i.length, l = 0; p > l; l += 1) {
                        for (
                            u = [], f = [], y = [], c = h[0].s[0].i[l].length, m = 0;
                            c > m;
                            m += 1
                        )
                            u.push(h[0].s[0].i[l][m]),
                                f.push(h[0].s[0].o[l][m]),
                                y.push(h[0].s[0].v[l][m]);
                        t.i.push(u), t.o.push(f), t.v.push(y);
                    }
                    g.push(t), (h.__minValue = "svg" != i || n ? g[0] : d(g, o.closed));
                }
                return (
                    n
                        ? "svg" == i
                            ? (o.pathString = w(h.__minValue, o.closed, s, !0))
                            : (o.pathNodes = w(h.__minValue, o.closed, s, !1))
                        : "svg" == i
                            ? (o.pathString = h.__minValue)
                            : (o.pathNodes = h.__minValue),
                    o
                );
            }
            if (e > h[h.length - 1].t - a) {
                if (!h.__maxValue) {
                    var v = h.length - 2;
                    for (p = h[v].s[0].i.length, l = 0; p > l; l += 1) {
                        for (
                            u = [], f = [], y = [], c = h[v].s[0].i[l].length, m = 0;
                            c > m;
                            m += 1
                        )
                            u.push(h[v].e[0].i[l][m]),
                                f.push(h[v].e[0].o[l][m]),
                                y.push(h[v].e[0].v[l][m]);
                        t.i.push(u), t.o.push(f), t.v.push(y);
                    }
                    g.push(t), (h.__maxValue = "svg" != i || n ? g[0] : d(g, o.closed));
                }
                return (
                    n
                        ? "svg" == i
                            ? (o.pathString = w(h.__maxValue, o.closed, s, !0))
                            : (o.pathNodes = w(h.__maxValue, o.closed, s, !1))
                        : "svg" == i
                            ? (o.pathString = h.__maxValue)
                            : (o.pathNodes = h.__maxValue),
                    o
                );
            }
            for (
                var x, b, E = 0, C = h.length - 1, S = 1, D = !0;
                D && ((x = h[E]), (b = h[E + 1]), !(b.t - a > e && 1 == S));

            )
                (C - 1 > E && 1 == S) || (E > 0 && -1 == S) ? (E += S) : (D = !1);
            var F, I, M, A, P;
            if (1 !== x.h) {
                (F = x.o.x), (I = x.o.y), (M = x.i.x), (A = x.i.y);
                var _;
                x.__fnct
                    ? (_ = x.__fnct)
                    : ((_ = bez.getEasingCurve(F, I, M, A)), (x.__fnct = _)),
                    (P = _("", e - (x.t - a), 0, 1, b.t - a - (x.t - a))),
                    e >= b.t - a ? (P = 1) : e < x.t - a && (P = 0);
            }
            if (1 === x.h && x.__hValue) g.push(x.__hValue);
            else
                for (
                    t = { i: [], o: [], v: [] }, p = x.s[0].i.length, l = 0;
                    p > l;
                    l += 1
                ) {
                    for (
                        u = [], f = [], y = [], c = x.s[0].i[l].length, m = 0;
                        c > m;
                        m += 1
                    )
                        1 === x.h
                            ? (u.push(x.s[0].i[l][m]),
                                f.push(x.s[0].o[l][m]),
                                y.push(x.s[0].v[l][m]))
                            : (u.push(x.s[0].i[l][m] + (x.e[0].i[l][m] - x.s[0].i[l][m]) * P),
                                f.push(x.s[0].o[l][m] + (x.e[0].o[l][m] - x.s[0].o[l][m]) * P),
                                y.push(x.s[0].v[l][m] + (x.e[0].v[l][m] - x.s[0].v[l][m]) * P));
                    t.i.push(u),
                        t.o.push(f),
                        t.v.push(y),
                        1 === x.h && (x.__hValue = t),
                        g.push(t);
                }
            return (
                n
                    ? "svg" == i
                        ? (o.pathString = w(g[0], o.closed, s, !0))
                        : (o.pathNodes = w(g[0], o.closed, s, !1))
                    : "svg" == i
                        ? (o.pathString = d(g[0], o.closed))
                        : (o.pathNodes = g[0]),
                o
            );
        }
        function d(t, e) {
            var a,
                i,
                r,
                s,
                n,
                o,
                h = "";
            if (!(t instanceof Array)) {
                for (
                    a = t.v,
                    i = t.o,
                    r = t.i,
                    o = a.length,
                    h += "M" + a[0].join(","),
                    n = 1;
                    o > n;
                    n++
                )
                    h +=
                        " C" +
                        i[n - 1].join(",") +
                        " " +
                        r[n].join(",") +
                        " " +
                        a[n].join(",");
                return (
                    e !== !1 &&
                    (h +=
                        " C" +
                        i[n - 1].join(",") +
                        " " +
                        r[0].join(",") +
                        " " +
                        a[0].join(",")),
                    h
                );
            }
            var l,
                p = t.length;
            for (h = "", l = 0; p > l; l += 1) {
                for (
                    s = t[l],
                    a = s.v,
                    i = s.o,
                    r = s.i,
                    o = a.length,
                    h += "M" + a[0].join(","),
                    n = 1;
                    o > n;
                    n++
                )
                    h +=
                        " C" +
                        i[n - 1].join(",") +
                        " " +
                        r[n].join(",") +
                        " " +
                        a[n].join(",");
                e !== !1 &&
                    (h +=
                        " C" +
                        i[n - 1].join(",") +
                        " " +
                        r[0].join(",") +
                        " " +
                        a[0].join(","));
            }
            return h;
        }
        function c(t, e, a) {
            var i,
                r,
                s,
                n,
                o,
                h,
                p,
                d,
                u,
                y = t.length;
            for (d = 0; y > d; d += 1)
                if (((u = t[d]), (n = e - u.startTime), !u.an[n])) {
                    if (
                        ((i = {}),
                            (D.arrayFlag = !1),
                            (D.type = "default"),
                            (i.a = l(u.ks.a, n, u.startTime, D)),
                            (i.o = l(u.ks.o, n, u.startTime, D)),
                            (D.arrayFlag = !1),
                            (D.type = "p"),
                            l(u.ks.p, n, u.startTime, D),
                            (D.arrayFlag = !0),
                            (D.type = "r"),
                            l(u.ks.r, n, u.startTime, D),
                            (D.arrayFlag = !0),
                            (D.type = "s"),
                            l(u.ks.s, n, u.startTime, D),
                            (p = {}),
                            (p.an = { tr: i }),
                            (D.arrayFlag = !1),
                            (D.type = "default"),
                            "canvas" == a
                                ? (p.an.matrixArray = E.getMatrixArrayFromParams(
                                    F.r,
                                    F.sx,
                                    F.sy,
                                    F.px,
                                    F.py
                                ))
                                : ((p.an.matrixArray = E.getMatrixArrayFromParams(
                                    F.r,
                                    F.sx,
                                    F.sy,
                                    F.px,
                                    F.py
                                )),
                                    (p.an.matrixValue =
                                        E.getMatrix2FromParams(F.r, F.sx, F.sy, F.px, F.py) +
                                        "translate(" +
                                        -i.a[0] +
                                        " " +
                                        -i.a[1] +
                                        ")")),
                            (u.renderedData[n] = p),
                            u.hasMask)
                    )
                        for (r = u.masksProperties, h = r.length, o = 0; h > o; o += 1)
                            r[o].paths || ((r[o].paths = []), (r[o].opacity = [])),
                                (r[o].paths[n] = m(r[o], n, u.startTime, a, !0)),
                                (r[o].opacity[n] = l(r[o].o, n, u.startTime, D)),
                                (r[o].opacity[n] =
                                    r[o].opacity[n] instanceof Array
                                        ? r[o].opacity[n][0] / 100
                                        : r[o].opacity[n] / 100);
                    e < u.inPoint ||
                        e > u.outPoint ||
                        ("PreCompLayer" == u.type
                            ? ((s = u.tm
                                ? u.tm[n] < 0
                                    ? 0
                                    : n >= u.tm.length
                                        ? u.tm[u.tm.length - 1]
                                        : u.tm[n]
                                : n),
                                void 0 === s &&
                                ((s = l(u.trmp, n, 0, D)[0] * b), (u.tm[n] = s)),
                                c(u.layers, s, a))
                            : "ShapeLayer" == u.type && f(u.shapes, n, u.startTime, a));
                }
        }
        function u(t, e, a) {
            var i = [],
                r = [],
                s = [],
                n = a / 2;
            return (
                (a *= 1),
                i.push([t[0] + e[0] / 2, t[1] - e[1] / 2 + a]),
                s.push(i[0]),
                r.push([t[0] + e[0] / 2, t[1] - e[1] / 2 + n]),
                i.push([t[0] + e[0] / 2, t[1] + e[1] / 2 - a]),
                s.push([t[0] + e[0] / 2, t[1] + e[1] / 2 - n]),
                r.push(i[1]),
                i.push([t[0] + e[0] / 2 - a, t[1] + e[1] / 2]),
                s.push(i[2]),
                r.push([t[0] + e[0] / 2 - n, t[1] + e[1] / 2]),
                i.push([t[0] - e[0] / 2 + a, t[1] + e[1] / 2]),
                s.push([t[0] - e[0] / 2 + n, t[1] + e[1] / 2]),
                r.push(i[3]),
                i.push([t[0] - e[0] / 2, t[1] + e[1] / 2 - a]),
                s.push(i[4]),
                r.push([t[0] - e[0] / 2, t[1] + e[1] / 2 - n]),
                i.push([t[0] - e[0] / 2, t[1] - e[1] / 2 + a]),
                s.push([t[0] - e[0] / 2, t[1] - e[1] / 2 + n]),
                r.push(i[5]),
                i.push([t[0] - e[0] / 2 + a, t[1] - e[1] / 2]),
                s.push(i[6]),
                r.push([t[0] - e[0] / 2 + n, t[1] - e[1] / 2]),
                i.push([t[0] + e[0] / 2 - a, t[1] - e[1] / 2]),
                s.push([t[0] + e[0] / 2 - n, t[1] - e[1] / 2]),
                r.push(i[7]),
                { v: i, o: s, i: r, c: !0 }
            );
        }
        function f(t, e, a, i, r) {
            var s,
                n,
                o,
                h,
                p,
                d,
                c,
                g,
                v,
                x,
                b = t.length;
            r || (r = []);
            var C, S, I, M, A;
            for (s = b - 1; s >= 0; s -= 1)
                if (((n = t[s]), "sh" == n.ty))
                    n.renderedData[e] = { path: m(n, e, a, i, !1, r) };
                else if ("fl" == n.ty)
                    (o = l(n.c, e, a, D)),
                        (h = l(n.o, e, a, D)),
                        (n.renderedData[e] = { opacity: h instanceof Array ? h[0] : h }),
                        "canvas" == i
                            ? (y(o), (n.renderedData[e].color = o))
                            : (n.renderedData[e].color = rgbToHex(
                                Math.round(o[0]),
                                Math.round(o[1]),
                                Math.round(o[2])
                            ));
                else if ("rc" == n.ty)
                    (p = l(n.p, e, a, D)),
                        (d = l(n.s, e, a, D)),
                        (c = l(n.r, e, a, D)),
                        n.trimmed
                            ? ((n.renderedData[e] = { path: { closed: !0 } }),
                                "svg" == i
                                    ? (n.renderedData[e].path.pathString = w(
                                        u(p, d, c),
                                        !0,
                                        r,
                                        !0
                                    ))
                                    : (n.renderedData[e].path.pathNodes = w(
                                        u(p, d, c),
                                        !0,
                                        r,
                                        !1
                                    )))
                            : (n.renderedData[e] = { position: p, size: d, roundness: c });
                else if ("el" == n.ty)
                    (p = l(n.p, e, a, D)),
                        (d = l(n.s, e, a, D)),
                        (n.renderedData[e] = { p: p, size: d });
                else if ("st" == n.ty) {
                    if (
                        ((g = l(n.c, e, a, D)),
                            (v = l(n.o, e, a, D)),
                            (x = l(n.w, e, a, D)),
                            (n.renderedData[e] = {
                                opacity: v instanceof Array ? v[0] : v,
                                width: x instanceof Array ? x[0] : x,
                            }),
                            n.d)
                    ) {
                        var P = [];
                        A = n.d.length;
                        var _;
                        for (M = 0; A > M; M += 1)
                            (_ = l(n.d[M].v, e, a, D)),
                                P.push({ v: _ instanceof Array ? _[0] : _, n: n.d[M].n });
                        n.renderedData[e].dashes = P;
                    }
                    "canvas" == i
                        ? (y(g), (n.renderedData[e].color = g))
                        : (n.renderedData[e].color = rgbToHex(
                            Math.round(g[0]),
                            Math.round(g[1]),
                            Math.round(g[2])
                        ));
                } else if ("tr" == n.ty)
                    (n.renderedData[e] = { a: l(n.a, e, a, D), o: l(n.o, e, a, D) }),
                        (D.arrayFlag = !0),
                        (D.type = "s"),
                        l(n.s, e, a, D),
                        (D.arrayFlag = !0),
                        (D.type = "r"),
                        l(n.r, e, a, D),
                        (D.arrayFlag = !1),
                        (D.type = "p"),
                        l(n.p, e, a, D),
                        (D.arrayFlag = !1),
                        (D.type = "default"),
                        "canvas" == i
                            ? (n.renderedData[e].mtArr = E.getMatrixArrayFromParams(
                                F.r,
                                F.sx,
                                F.sy,
                                F.px,
                                F.py
                            ))
                            : ((n.renderedData[e].mtArr = E.getMatrixArrayFromParams(
                                F.r,
                                F.sx,
                                F.sy,
                                F.px,
                                F.py
                            )),
                                (n.renderedData[e].mt = E.getMatrix2FromParams(
                                    F.r,
                                    F.sx,
                                    F.sy,
                                    F.px,
                                    F.py
                                )));
                else if ("tm" == n.ty) {
                    (C = l(n.s, e, a, D)), (S = l(n.e, e, a, D)), (I = l(n.o, e, a, D));
                    var k = { s: C, e: S, o: I };
                    r.push(k), (n.renderedData[e] = k);
                } else "gr" == n.ty && f(n.it, e, a, i, r);
        }
        function y(t) {
            var e,
                a = t.length;
            for (e = 0; a > e; e += 1) t[e] = Math.round(t[e]);
        }
        function g(t, e) {
            for (var a = 1; a > 0;) {
                if (((e += 1), e >= t.data.animation.totalFrames)) {
                    t.renderFinished = !0;
                    break;
                }
                t.renderedFrames[e] || (v(t.data._id, e), (a -= 1));
            }
        }
        function v(t, e) {
            return 2 == C[t].renderedFrames[e]
                ? void (C[t].renderFinished || g(C[t], e))
                : ((b = C[t].data.animation.frameRate),
                    (C[t].renderedFrames[e] = 2),
                    void c(C[t].data.animation.layers, e, C[t].data._animType));
        }
        function x(t) {
            var e,
                a = C[t].data,
                i = a.animation.totalFrames,
                r = [];
            for (e = 0; i > e; e += 1) r.push({ num: e, data: v(t, e) });
        }
        var b = 0,
            E = new MatrixManager(),
            C = {},
            S = Math.PI / 180,
            D = { arrayFlag: !1 },
            w = (function () {
                function t(t, s, n, p) {
                    (i[o] = s),
                        (e[o + 1] = n),
                        (a[o + 1] = p),
                        h ? (a[o] = t) : ((l += " M" + t.join(",")), (h = !0), (r[o] = t)),
                        (l += " C" + s.join(",") + " " + n.join(",") + " " + p.join(",")),
                        (o += 1);
                }
                var e,
                    a,
                    i,
                    r,
                    s,
                    n,
                    o,
                    h = !1,
                    l = "";
                return function (m, d, c, u) {
                    p(m, d);
                    var f,
                        y = c.length,
                        g = m;
                    for (a = e = i = r = null, f = y - 1; f >= 0; f -= 1) {
                        var v = [],
                            x = (c[f].o % 360) / 360;
                        if (0 != x || 0 != c[f].s || 100 != c[f].e) {
                            (l = ""),
                                (h = !1),
                                (e = []),
                                (i = []),
                                (a = []),
                                (r = []),
                                (s = []),
                                (n = 0),
                                0 > x && (x += 1);
                            var b = c[f].s / 100 + x,
                                E = c[f].e / 100 + x;
                            if (b == E) return u ? "" : {};
                            if (b > E) {
                                var C = b;
                                (b = E), (E = C);
                            }
                            1 >= E
                                ? v.push({ s: g.__totalLength * b, e: g.__totalLength * E })
                                : b >= 1
                                    ? v.push({
                                        s: g.__totalLength * (b - 1),
                                        e: g.__totalLength * (E - 1),
                                    })
                                    : (v.push({ s: g.__totalLength * b, e: g.__totalLength }),
                                        v.push({ s: 0, e: g.__totalLength * (E - 1) }));
                            var S,
                                D,
                                w,
                                F = [],
                                I = [],
                                M = [];
                            (F = g.v),
                                (I = g.o),
                                (M = g.i),
                                (S = g.__lengths),
                                (w = F.length);
                            var A,
                                P,
                                _ = 0,
                                k = 0,
                                T = v.length;
                            for (o = 0, A = 0; T > A; A += 1) {
                                for (_ = 0, D = 1; w > D; D++)
                                    if (((k = S[D - 1].addedLength), _ + k < v[A].s)) _ += k;
                                    else {
                                        if (_ > v[A].e) break;
                                        v[A].s <= _ && v[A].e >= _ + k
                                            ? t(F[D - 1], I[D - 1], M[D], F[D], S[D - 1])
                                            : ((P = bez.getNewSegment(
                                                F[D - 1],
                                                F[D],
                                                I[D - 1],
                                                M[D],
                                                (v[A].s - _) / k,
                                                (v[A].e - _) / k,
                                                S[D - 1]
                                            )),
                                                t(P.pt1, P.pt3, P.pt4, P.pt2)),
                                            (_ += k);
                                    }
                                d !== !1
                                    ? _ > v[A].e ||
                                    ((k = S[D - 1].addedLength),
                                        v[A].s <= _ && v[A].e >= _ + k
                                            ? t(F[D - 1], I[D - 1], M[0], F[0], S[D - 1])
                                            : ((P = bez.getNewSegment(
                                                F[D - 1],
                                                F[0],
                                                I[D - 1],
                                                M[0],
                                                (v[A].s - _) / k,
                                                (v[A].e - _) / k,
                                                S[D - 1]
                                            )),
                                                t(P.pt1, P.pt3, P.pt4, P.pt2)))
                                    : (h = !1);
                            }
                            d = !1;
                        }
                    }
                    if (
                        (a
                            ? ((F = a), (I = i), (M = e))
                            : ((F = g.v), (I = g.o), (M = g.i), (r = [])),
                            (w = F.length),
                            u)
                    ) {
                        for (l = "", D = 1; w > D; D++)
                            r[D - 1]
                                ? (l += "M" + r[D - 1].join(","))
                                : 1 == D && (l += "M" + F[0].join(",")),
                                (l +=
                                    " C" +
                                    I[D - 1].join(",") +
                                    " " +
                                    M[D].join(",") +
                                    " " +
                                    F[D].join(","));
                        return (
                            d !== !1 &&
                            (l +=
                                " C" +
                                I[D - 1].join(",") +
                                " " +
                                M[0].join(",") +
                                " " +
                                F[0].join(",")),
                            -1 != l.indexOf("M 0") && console.log(l),
                            l
                        );
                    }
                    return { i: M, o: I, v: F, s: r, c: d };
                };
            })(),
            F = { r: 0, sx: 1, sy: 1, px: 1, py: 1 },
            I = {};
        return (
            (I.completeData = n), (I.renderFrame = v), (I.renderAllFrames = x), I
        );
    }
    function SVGRenderer(t) {
        (this.animationItem = t),
            (this.layers = null),
            (this.lastFrame = -1),
            (this.globalData = { frameNum: -1 }),
            (this.elements = []);
    }
    function CanvasRenderer(t, e) {
        (this.animationItem = t),
            (this.renderConfig = e
                ? e
                : { clearCanvas: !0, context: null, scaleMode: "fit" }),
            (this.lastFrame = -1),
            (this.globalData = { frameNum: -1 }),
            (this.elements = []);
    }
    function MaskElement(t) {
        (this.data = null),
            (this.element = null),
            (this.globalData = t),
            (this.paths = []);
    }
    function ICompElement(t, e, a, i) {
        this.parent.constructor.call(this, t, e, a, i), (this.layers = t.layers);
    }
    function IImageElement(t, e, a, i) {
        (this.animationItem = e),
            (this.assets = this.animationItem.getAssets()),
            (this.path = this.animationItem.getPath()),
            this.parent.constructor.call(this, t, e, a, i);
    }
    function IShapeElement(t, e, a, i) {
        (this.shapes = []), this.parent.constructor.call(this, t, e, a, i);
    }
    function ShapeItemElement(t, e, a) {
        (this.stylesList = []),
            (this.currentMatrix = new Matrix()),
            (this.shape = e),
            (this.data = t),
            (this.globalData = a),
            this.searchShapes(this.data),
            styleUnselectableDiv(this.shape),
            (this.currentTrim = { s: 0, e: 100, o: 0, active: !1 });
    }
    function ISolidElement(t, e, a, i) {
        this.parent.constructor.call(this, t, e, a, i);
    }
    function ITextElement(t, e, a, i) {
        this.parent.constructor.call(this, t, e, a, i);
    }
    function CVBaseElement(t, e, a) {
        (this.renderer = e),
            (this.data = t),
            (this.globalData = a),
            (this.currentAnimData = null),
            (this.renderFrame = !1),
            this.init();
    }
    function CVCompElement(t, e, a) {
        this.parent.constructor.call(this, t, e, a), (this.layers = t.layers);
    }
    function CVImageElement(t, e, a) {
        (this.renderer = e),
            (this.animationItem = e.animationItem),
            (this.assets = this.animationItem.getAssets()),
            (this.path = this.animationItem.getPath()),
            this.parent.constructor.call(this, t, e, a),
            (this.animationItem.pendingElements += 1);
    }
    function CVShapeElement(t, e, a) {
        (this.shapes = []), this.parent.constructor.call(this, t, e, a);
    }
    function CVShapeItemElement(t, e, a, i) {
        (this.data = t),
            (this.globalData = i),
            (this.renderer = e),
            (this.frameNum = -1),
            (this.dataLength = this.data.length),
            (this.mainFlag = a),
            (this.stylesList = []),
            (this.ownStylesList = []),
            (this.stylesPool = []),
            (this.currentStylePoolPos = 0),
            (this.currentMatrix = document
                .createElementNS("http://www.w3.org/2000/svg", "svg")
                .createSVGMatrix()),
            (this.mat = document
                .createElementNS("http://www.w3.org/2000/svg", "svg")
                .createSVGMatrix());
        var r,
            s = this.dataLength - 1;
        this.renderedPaths = {};
        var n;
        for (r = s; r >= 0; r -= 1)
            "gr" == this.data[r].ty
                ? (this.data[r].item = new CVShapeItemElement(
                    this.data[r].it,
                    this.renderer,
                    !1,
                    this.globalData
                ))
                : ("st" == this.data[r].ty || "fl" == this.data[r].ty) &&
                ((n = {
                    type: "fill",
                    styleOpacity: 0,
                    opacity: 0,
                    value: "rgba(0,0,0,0)",
                    closed: !1,
                }),
                    "fl" == this.data[r].ty
                        ? (n.type = "fill")
                        : ((n.type = "stroke"), (n.width = 0)),
                    this.stylesPool.push(n));
    }
    function CVSolidElement(t, e, a) {
        this.parent.constructor.call(this, t, e, a);
    }
    function CVTextElement(t, e) {
        this.parent.constructor.call(this, t, e);
    }
    function CVMaskElement() { }
    var svgNS = "http://www.w3.org/2000/svg";
    (Matrix.prototype = {
        concat: function (t) {
            return this.clone()._t(t.a, t.b, t.c, t.d, t.e, t.f);
        },
        flipX: function () {
            return this._t(-1, 0, 0, 1, 0, 0);
        },
        flipY: function () {
            return this._t(1, 0, 0, -1, 0, 0);
        },
        reflectVector: function (t, e) {
            var a = this.applyToPoint(0, 1),
                i = 2 * (a.x * t + a.y * e);
            return (t -= i * a.x), (e -= i * a.y), { x: t, y: e };
        },
        reset: function () {
            return this.setTransform(1, 0, 0, 1, 0, 0);
        },
        rotate: function (t) {
            return 0 === t
                ? this
                : ((this.cos = Math.cos(t)),
                    (this.sin = Math.sin(t)),
                    this._t(this.cos, this.sin, -this.sin, this.cos, 0, 0));
        },
        rotateFromVector: function (t, e) {
            return this.rotate(Math.atan2(e, t));
        },
        rotateDeg: function (t) {
            return this.rotate((t * Math.PI) / 180);
        },
        scaleU: function (t) {
            return this._t(t, 0, 0, t, 0, 0);
        },
        scale: function (t, e) {
            return 1 == t && 1 == e ? this : this._t(t, 0, 0, e, 0, 0);
        },
        scaleX: function (t) {
            return this._t(t, 0, 0, 1, 0, 0);
        },
        scaleY: function (t) {
            return this._t(1, 0, 0, t, 0, 0);
        },
        shear: function (t, e) {
            return this._t(1, e, t, 1, 0, 0);
        },
        shearX: function (t) {
            return this._t(1, 0, t, 1, 0, 0);
        },
        shearY: function (t) {
            return this._t(1, t, 0, 1, 0, 0);
        },
        skew: function (t, e) {
            return this.shear(Math.tan(t), Math.tan(e));
        },
        skewX: function (t) {
            return this.shearX(Math.tan(t));
        },
        skewY: function (t) {
            return this.shearY(Math.tan(t));
        },
        setTransform: function (t, e, a, i, r, s) {
            return (
                (this.props[0] = t),
                (this.props[1] = e),
                (this.props[2] = a),
                (this.props[3] = i),
                (this.props[4] = r),
                (this.props[5] = s),
                this._x()
            );
        },
        translate: function (t, e) {
            return this._t(1, 0, 0, 1, t, e);
        },
        translateX: function (t) {
            return this._t(1, 0, 0, 1, t, 0);
        },
        translateY: function (t) {
            return this._t(1, 0, 0, 1, 0, t);
        },
        transform: function (t, e, a, i, r, s) {
            return (
                (this.a1 = this.props[0]),
                (this.b1 = this.props[1]),
                (this.c1 = this.props[2]),
                (this.d1 = this.props[3]),
                (this.e1 = this.props[4]),
                (this.f1 = this.props[5]),
                (this.props[0] = this.a1 * t + this.c1 * e),
                (this.props[1] = this.b1 * t + this.d1 * e),
                (this.props[2] = this.a1 * a + this.c1 * i),
                (this.props[3] = this.b1 * a + this.d1 * i),
                (this.props[4] = this.a1 * r + this.c1 * s + this.e1),
                (this.props[5] = this.b1 * r + this.d1 * s + this.f1),
                this._x()
            );
        },
        divide: function (t) {
            if (!t.isInvertible()) throw "Input matrix is not invertible";
            var e = t.inverse();
            return this._t(e.a, e.b, e.c, e.d, e.e, e.f);
        },
        divideScalar: function (t) {
            var e = this;
            return (
                (e.a /= t),
                (e.b /= t),
                (e.c /= t),
                (e.d /= t),
                (e.e /= t),
                (e.f /= t),
                e._x()
            );
        },
        inverse: function () {
            if (this.isIdentity()) return new Matrix();
            if (this.isInvertible()) {
                var t = this,
                    e = t.a,
                    a = t.b,
                    i = t.c,
                    r = t.d,
                    s = t.e,
                    n = t.f,
                    o = new Matrix(),
                    h = e * r - a * i;
                return (
                    (o.a = r / h),
                    (o.b = -a / h),
                    (o.c = -i / h),
                    (o.d = e / h),
                    (o.e = (i * n - r * s) / h),
                    (o.f = -(e * n - a * s) / h),
                    o
                );
            }
            throw "Matrix is not invertible.";
        },
        interpolate: function (t, e, a) {
            var i = this,
                r = a ? new Matrix(a) : new Matrix();
            return (
                (r.a = i.a + (t.a - i.a) * e),
                (r.b = i.b + (t.b - i.b) * e),
                (r.c = i.c + (t.c - i.c) * e),
                (r.d = i.d + (t.d - i.d) * e),
                (r.e = i.e + (t.e - i.e) * e),
                (r.f = i.f + (t.f - i.f) * e),
                r._x()
            );
        },
        interpolateAnim: function (t, e, a) {
            var i = this,
                r = a ? new Matrix(a) : new Matrix(),
                s = i.decompose(),
                n = t.decompose(),
                o = s.rotation + (n.rotation - s.rotation) * e,
                h = s.translate.x + (n.translate.x - s.translate.x) * e,
                l = s.translate.y + (n.translate.y - s.translate.y) * e,
                p = s.scale.x + (n.scale.x - s.scale.x) * e,
                m = s.scale.y + (n.scale.y - s.scale.y) * e;
            return r.translate(h, l), r.rotate(o), r.scale(p, m), r._x();
        },
        decompose: function (t) {
            var e = this.props[0],
                a = this.props[1],
                i = this.props[2],
                r = this.props[3],
                s = Math.acos,
                n = Math.atan,
                o = Math.sqrt,
                h = Math.PI,
                l = { x: this.props[4], y: this.props[5] },
                p = 0,
                m = { x: 1, y: 1 },
                d = { x: 0, y: 0 },
                c = e * r - a * i;
            if (t)
                e
                    ? ((d = { x: n(i / e), y: n(a / e) }), (m = { x: e, y: c / e }))
                    : a
                        ? ((p = 0.5 * h), (m = { x: a, y: c / a }), (d.x = n(r / a)))
                        : ((m = { x: i, y: r }), (d.x = 0.25 * h));
            else if (e || a) {
                var u = o(e * e + a * a);
                (p = a > 0 ? s(e / u) : -s(e / u)),
                    (m = { x: u, y: c / u }),
                    (d.x = n((e * i + a * r) / (u * u)));
            } else if (i || r) {
                var f = o(i * i + r * r);
                (p = 0.5 * h - (r > 0 ? s(-i / f) : -s(i / f))),
                    (m = { x: c / f, y: f }),
                    (d.y = n((e * i + a * r) / (f * f)));
            } else m = { x: 0, y: 0 };
            return { scale: m, translate: l, rotation: p, skew: d };
        },
        determinant: function () {
            return this.a * this.d - this.b * this.c;
        },
        applyToPoint: function (t, e) {
            return {
                x: t * this.props[0] + e * this.props[2] + this.props[4],
                y: t * this.props[1] + e * this.props[3] + this.props[5],
            };
        },
        applyToArray: function (t) {
            var e,
                a,
                i = 0,
                r = [];
            if ("number" == typeof t[0])
                for (a = t.length; a > i;)
                    (e = this.applyToPoint(t[i++], t[i++])), r.push(e.x, e.y);
            else
                for (a = t.length, i = 0; a > i; i++)
                    r.push(this.applyToPoint(t[i].x, t[i].y));
            return r;
        },
        applyToTypedArray: function (t, e) {
            for (
                var a,
                i = 0,
                r = t.length,
                s = e ? new Float64Array(r) : new Float32Array(r);
                r > i;

            )
                (a = this.applyToPoint(t[i], t[i + 1])), (s[i++] = a.x), (s[i++] = a.y);
            return s;
        },
        applyToContext: function (t) {
            var e = this;
            return t.setTransform(e.a, e.b, e.c, e.d, e.e, e.f), e;
        },
        isIdentity: function () {
            var t = this;
            return (
                t._q(t.a, 1) &&
                t._q(t.b, 0) &&
                t._q(t.c, 0) &&
                t._q(t.d, 1) &&
                t._q(t.e, 0) &&
                t._q(t.f, 0)
            );
        },
        isInvertible: function () {
            return !this._q(this.determinant(), 0);
        },
        isValid: function () {
            return !this._q(this.a * this.d, 0);
        },
        clone: function (t) {
            var e = this,
                a = new Matrix();
            return (
                (a.a = e.a),
                (a.b = e.b),
                (a.c = e.c),
                (a.d = e.d),
                (a.e = e.e),
                (a.f = e.f),
                t || (a.context = e.context),
                a
            );
        },
        isEqual: function (t) {
            var e = this,
                a = e._q;
            return (
                a(e.a, t.a) &&
                a(e.b, t.b) &&
                a(e.c, t.c) &&
                a(e.d, t.d) &&
                a(e.e, t.e) &&
                a(e.f, t.f)
            );
        },
        toArray: function () {
            return [
                this.props[0],
                this.props[1],
                this.props[2],
                this.props[3],
                this.props[4],
                this.props[5],
            ];
        },
        toCSS: function () {
            return (this.cssParts[1] = this.props.join(",")), this.cssParts.join("");
        },
        toJSON: function () {
            var t = this;
            return (
                '{"a":' +
                t.a +
                ',"b":' +
                t.b +
                ',"c":' +
                t.c +
                ',"d":' +
                t.d +
                ',"e":' +
                t.e +
                ',"f":' +
                t.f +
                "}"
            );
        },
        toString: function () {
            return "" + this.toArray();
        },
        _q: function (t, e) {
            return Math.abs(t - e) < 1e-14;
        },
        _x: function () {
            return (
                this.context &&
                this.context.setTransform(
                    this.a,
                    this.b,
                    this.c,
                    this.d,
                    this.e,
                    this.f
                ),
                this
            );
        },
    }),
        void 0 === CanvasRenderingContext2D.prototype.ellipse &&
        (CanvasRenderingContext2D.prototype.ellipse = function (
            t,
            e,
            a,
            i,
            r,
            s,
            n,
            o
        ) {
            this.save(),
                this.translate(t, e),
                this.rotate(r),
                this.scale(a, i),
                this.arc(0, 0, 1, s, n, o),
                this.restore();
        }),
        ("function" != typeof Path2D ||
            "function" != typeof Path2D.prototype.addPath ||
            "function" != typeof Path2D.prototype.ellipse) &&
        !(function () {
            function t(t) {
                if (((this.ops_ = []), void 0 !== t))
                    if ("string" == typeof t)
                        try {
                            this.ops_ = parser.parse(t);
                        } catch (e) { }
                    else {
                        if (!t.hasOwnProperty("ops_"))
                            throw "Error: " + typeof t + "is not a valid argument to Path";
                        this.ops_ = t.ops_.slice(0);
                    }
            }
            function e(t) {
                return function () {
                    var e,
                        a = arguments.length,
                        i = [];
                    for (e = 0; a > e; e += 1) i.push(arguments[e]);
                    this.ops_.push({ type: t, args: i });
                };
            }
            for (
                var a = CanvasRenderingContext2D.prototype,
                i = [
                    "closePath",
                    "moveTo",
                    "lineTo",
                    "quadraticCurveTo",
                    "bezierCurveTo",
                    "rect",
                    "arc",
                    "arcTo",
                    "ellipse",
                ],
                r = 0;
                r < i.length;
                r++
            ) {
                var s = i[r];
                t.prototype[s] = e(s);
            }
            t.prototype.addPath = function (t, e) {
                var a = !1;
                !e ||
                    (1 == e.a &&
                        0 == e.b &&
                        0 == e.c &&
                        1 == e.d &&
                        0 == e.e &&
                        0 == e.f) ||
                    ((a = !0),
                        this.ops_.push({ type: "save", args: [] }),
                        this.ops_.push({
                            type: "transform",
                            args: [e.a, e.b, e.c, e.d, e.e, e.f],
                        })),
                    (this.ops_ = this.ops_.concat(t.ops_)),
                    a && this.ops_.push({ type: "restore", args: [] });
            };
            var n = a.fill,
                o = a.stroke,
                h = a.clip;
            (a.fill = function (e) {
                if (e instanceof t) {
                    this.beginPath();
                    for (var i = 0, r = e.ops_.length; r > i; i++) {
                        var s = e.ops_[i];
                        a[s.type].apply(this, s.args);
                    }
                    r = arguments.length;
                    var o = [];
                    for (i = 1; r > i; i += 1) o.push(arguments[i]);
                    n.apply(this, o);
                } else n.apply(this, arguments);
            }),
                (a.stroke = function (e) {
                    if (e instanceof t) {
                        this.beginPath();
                        for (var i = 0, r = e.ops_.length; r > i; i++) {
                            var s = e.ops_[i];
                            a[s.type].apply(this, s.args);
                        }
                        o.call(this);
                    } else o.call(this);
                }),
                (a.clip = function (e) {
                    if (e instanceof t) {
                        this.beginPath();
                        for (var i = 0, r = e.ops_.length; r > i; i++) {
                            var s = e.ops_[i];
                            a[s.type].apply(this, s.args);
                        }
                        r = arguments.length;
                        var n = [];
                        for (i = 1; r > i; i += 1) n.push(arguments[i]);
                        h.apply(this, n);
                    } else h.apply(this, arguments);
                }),
                (Path2D = t);
        })();
    var MatrixManager = matrixManagerFunction;
    !(function () {
        for (
            var t = 0, e = ["ms", "moz", "webkit", "o"], a = 0;
            a < e.length && !window.requestAnimationFrame;
            ++a
        )
            (window.requestAnimationFrame = window[e[a] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                    window[e[a] + "CancelAnimationFrame"] ||
                    window[e[a] + "CancelRequestAnimationFrame"]);
        window.requestAnimationFrame ||
            (window.requestAnimationFrame = function (e) {
                var a = new Date().getTime(),
                    i = Math.max(0, 16 - (a - t)),
                    r = window.setTimeout(function () {
                        e(a + i);
                    }, i);
                return (t = a + i), r;
            }),
            window.cancelAnimationFrame ||
            (window.cancelAnimationFrame = function (t) {
                clearTimeout(t);
            });
    })();
    var subframeEnabled = !1,
        cachedColors = {},
        rgbToHex = (function () {
            var t,
                e,
                a = [];
            for (t = 0; 256 > t; t += 1)
                (e = t.toString(16)), (a[t] = 1 == e.length ? "0" + e : e);
            return function (t, e, i) {
                return (
                    0 > t && (t = 0),
                    0 > e && (e = 0),
                    0 > i && (i = 0),
                    "#" + a[t] + a[e] + a[i]
                );
            };
        })(),
        fillColorToString = (function () {
            var t = [];
            return function (e, a) {
                return (
                    t[e[0]] || (t[e[0]] = []),
                    t[e[0]][e[1]] || (t[e[0]][e[1]] = []),
                    t[e[0]][e[1]][e[2]] ||
                    (void 0 !== a && (e[3] = a),
                        (t[e[0]][e[1]][e[2]] = "rgba(" + e.join(",") + ")")),
                    t[e[0]][e[1]][e[2]]
                );
            };
        })(),
        bez = bezFunction(),
        dataManager = dataFunctionManager();
    (SVGRenderer.prototype.buildItems = function (t, e, a) {
        var i,
            r = 0,
            s = t.length;
        for (
            a || (a = this.elements),
            e || (e = this.animationItem.container),
            i = s - 1;
            i >= 0;
            i--
        )
            if ("StillLayer" == t[i].type) r++, (a[i] = this.createImage(t[i], e));
            else if ("PreCompLayer" == t[i].type) {
                a[i] = this.createComp(t[i], e);
                var n = [];
                this.buildItems(t[i].layers, a[i].getDomElement(), n),
                    a[i].setElements(n);
            } else
                a[i] =
                    "SolidLayer" == t[i].type
                        ? this.createSolid(t[i], e)
                        : "ShapeLayer" == t[i].type
                            ? this.createShape(t[i], e)
                            : "TextLayer" == t[i].type
                                ? this.createText(t[i], e)
                                : this.createBase(t[i], e);
    }),
        (SVGRenderer.prototype.createBase = function (t, e) {
            return new BaseElement(t, this.animationItem, e, this.globalData);
        }),
        (SVGRenderer.prototype.createShape = function (t, e) {
            return new IShapeElement(t, this.animationItem, e, this.globalData);
        }),
        (SVGRenderer.prototype.createText = function (t, e) {
            return new ITextElement(t, this.animationItem, e, this.globalData);
        }),
        (SVGRenderer.prototype.createImage = function (t, e) {
            return new IImageElement(t, this.animationItem, e, this.globalData);
        }),
        (SVGRenderer.prototype.createComp = function (t, e) {
            return new ICompElement(t, this.animationItem, e, this.globalData);
        }),
        (SVGRenderer.prototype.createSolid = function (t, e) {
            return new ISolidElement(t, this.animationItem, e, this.globalData);
        }),
        (SVGRenderer.prototype.configAnimation = function (t) {
            (this.animationItem.container = document.createElementNS(svgNS, "svg")),
                this.animationItem.container.setAttribute(
                    "xmlns",
                    "http://www.w3.org/2000/svg"
                ),
                this.animationItem.container.setAttribute(
                    "width",
                    t.animation.compWidth
                ),
                this.animationItem.container.setAttribute(
                    "height",
                    t.animation.compHeight
                ),
                this.animationItem.container.setAttribute(
                    "viewBox",
                    "0 0 " + t.animation.compWidth + " " + t.animation.compHeight
                ),
                this.animationItem.container.setAttribute(
                    "preserveAspectRatio",
                    "xMidYMid meet"
                ),
                (this.animationItem.container.style.width = "100%"),
                (this.animationItem.container.style.height = "100%"),
                (this.animationItem.container.style.transformOrigin =
                    this.animationItem.container.style.mozTransformOrigin =
                    this.animationItem.container.style.webkitTransformOrigin =
                    this.animationItem.container.style["-webkit-transform"] =
                    "0px 0px 0px"),
                this.animationItem.wrapper.appendChild(this.animationItem.container);
            var e = document.createElementNS(svgNS, "defs");
            (this.globalData.defs = e), this.animationItem.container.appendChild(e);
            var a = document.createElementNS(svgNS, "clipPath"),
                i = document.createElementNS(svgNS, "rect");
            i.setAttribute("width", t.animation.compWidth),
                i.setAttribute("height", t.animation.compHeight),
                i.setAttribute("x", 0),
                i.setAttribute("y", 0),
                a.setAttribute("id", "animationMask"),
                a.appendChild(i);
            var r = document.createElementNS(svgNS, "g");
            r.setAttribute("clip-path", "url(#animationMask)"),
                this.animationItem.container.appendChild(r),
                e.appendChild(a),
                (this.animationItem.container = r),
                (this.layers = t.animation.layers);
        }),
        (SVGRenderer.prototype.buildStage = function (t, e, a) {
            var i,
                r,
                s = e.length;
            for (a || (a = this.elements), i = s - 1; i >= 0; i--)
                (r = e[i]),
                    r.parent && this.buildItemParenting(r, a[i], e, r.parent, a),
                    a[i].setMainElement(),
                    "PreCompLayer" == r.type &&
                    this.buildStage(
                        a[i].getComposingElement(),
                        r.layers,
                        a[i].getElements()
                    );
        }),
        (SVGRenderer.prototype.buildItemParenting = function (t, e, a, i, r) {
            t.parents || (t.parents = []);
            for (var s = 0, n = a.length; n > s;) {
                if (a[s].layerName == i) {
                    e.getHierarchy().push(r[s]),
                        a[s].parent && this.buildItemParenting(t, e, a, a[s].parent, r);
                    break;
                }
                s += 1;
            }
        }),
        (SVGRenderer.prototype.updateContainerSize = function () { }),
        (SVGRenderer.prototype.renderFrame = function (t) {
            if (this.lastFrame != t) {
                (this.lastFrame = t), (this.globalData.frameNum = t);
                var e,
                    a = this.layers.length;
                for (e = 0; a > e; e++)
                    this.elements[e].prepareFrame(t - this.layers[e].startTime);
                for (e = 0; a > e; e++)
                    this.elements[e].renderFrame(t - this.layers[e].startTime);
            }
        }),
        (CanvasRenderer.prototype.buildItems = function (t, e) {
            e || (e = this.elements);
            var a,
                i = 0,
                r = t.length;
            for (a = 0; r > a; a++)
                if ("StillLayer" == t[a].type) i++, e.push(this.createImage(t[a]));
                else if ("PreCompLayer" == t[a].type) {
                    e.push(this.createComp(t[a]));
                    var s = [];
                    this.buildItems(t[a].layers, s), e[e.length - 1].setElements(s);
                } else
                    e.push(
                        "SolidLayer" == t[a].type
                            ? this.createSolid(t[a])
                            : "ShapeLayer" == t[a].type
                                ? this.createShape(t[a])
                                : "TextLayer" == t[a].type
                                    ? this.createText(t[a])
                                    : this.createBase(t[a])
                    );
        }),
        (CanvasRenderer.prototype.createBase = function (t) {
            return new CVBaseElement(t, this, this.globalData);
        }),
        (CanvasRenderer.prototype.createShape = function (t) {
            return new CVShapeElement(t, this, this.globalData);
        }),
        (CanvasRenderer.prototype.createText = function (t) {
            return new CVTextElement(t, this, this.globalData);
        }),
        (CanvasRenderer.prototype.createImage = function (t) {
            return new CVImageElement(t, this, this.globalData);
        }),
        (CanvasRenderer.prototype.createComp = function (t) {
            return new CVCompElement(t, this, this.globalData);
        }),
        (CanvasRenderer.prototype.createSolid = function (t) {
            return new CVSolidElement(t, this, this.globalData);
        }),
        (CanvasRenderer.prototype.configAnimation = function (t) {
            this.animationItem.wrapper
                ? ((this.animationItem.container = document.createElement("canvas")),
                    (this.animationItem.container.style.width = "100%"),
                    (this.animationItem.container.style.height = "100%"),
                    (this.animationItem.container.style.transformOrigin =
                        this.animationItem.container.style.mozTransformOrigin =
                        this.animationItem.container.style.webkitTransformOrigin =
                        this.animationItem.container.style["-webkit-transform"] =
                        "0px 0px 0px"),
                    this.animationItem.wrapper.appendChild(this.animationItem.container),
                    (this.canvasContext = this.animationItem.container.getContext("2d")))
                : (this.canvasContext = this.renderConfig.context),
                (this.layers = t.animation.layers),
                (this.transformCanvas = {}),
                (this.transformCanvas.w = t.animation.compWidth),
                (this.transformCanvas.h = t.animation.compHeight),
                this.updateContainerSize();
        }),
        (CanvasRenderer.prototype.updateContainerSize = function () {
            var t, e;
            if (
                (this.animationItem.wrapper && this.animationItem.container
                    ? ((t = this.animationItem.wrapper.offsetWidth),
                        (e = this.animationItem.wrapper.offsetHeight),
                        this.animationItem.container.setAttribute("width", t),
                        this.animationItem.container.setAttribute("height", e))
                    : ((t = this.canvasContext.canvas.width),
                        (e = this.canvasContext.canvas.height)),
                    "fit" == this.renderConfig.scaleMode)
            ) {
                var a = t / e,
                    i = this.transformCanvas.w / this.transformCanvas.h;
                i > a
                    ? ((this.transformCanvas.sx = t / this.transformCanvas.w),
                        (this.transformCanvas.sy = t / this.transformCanvas.w),
                        (this.transformCanvas.tx = 0),
                        (this.transformCanvas.ty =
                            (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2))
                    : ((this.transformCanvas.sx = e / this.transformCanvas.h),
                        (this.transformCanvas.sy = e / this.transformCanvas.h),
                        (this.transformCanvas.tx =
                            (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2),
                        (this.transformCanvas.ty = 0));
            } else
                (this.transformCanvas.sx = 1),
                    (this.transformCanvas.sy = 1),
                    (this.transformCanvas.tx = 0),
                    (this.transformCanvas.ty = 0);
        }),
        (CanvasRenderer.prototype.buildStage = function (t, e, a) {
            a || (a = this.elements);
            var i,
                r,
                s = e.length;
            for (i = s - 1; i >= 0; i--)
                (r = e[i]),
                    r.parent && this.buildItemHierarchy(r, a[i], e, r.parent, a),
                    "PreCompLayer" == r.type &&
                    this.buildStage(null, r.layers, a[i].getElements());
        }),
        (CanvasRenderer.prototype.buildItemHierarchy = function (t, e, a, i, r) {
            for (var s = 0, n = a.length; n > s;) {
                if (a[s].layerName == i) {
                    e.getHierarchy().push(r[s]),
                        void 0 === a[s].parent ||
                        this.buildItemHierarchy(t, e, a, a[s].parent, r);
                    break;
                }
                s += 1;
            }
        }),
        (CanvasRenderer.prototype.prepareFrame = function (t) {
            var e,
                a = this.elements.length;
            for (e = 0; a > e; e++)
                this.elements[e].prepareFrame(t - this.layers[e].startTime);
        }),
        (CanvasRenderer.prototype.draw = function () {
            var t,
                e = this.layers.length;
            for (t = e - 1; t >= 0; t -= 1) this.elements[t].draw();
        }),
        (CanvasRenderer.prototype.renderFrame = function (t) {
            this.lastFrame != t &&
                ((this.lastFrame = t),
                    (this.globalData.frameNum = t),
                    this.renderConfig.clearCanvas === !0
                        ? (this.canvasContext.canvas.width = this.canvasContext.canvas.width)
                        : this.canvasContext.save(),
                    this.canvasContext.transform(
                        this.transformCanvas.sx,
                        0,
                        0,
                        this.transformCanvas.sy,
                        this.transformCanvas.tx,
                        this.transformCanvas.ty
                    ),
                    this.canvasContext.beginPath(),
                    this.canvasContext.rect(
                        0,
                        0,
                        this.transformCanvas.w,
                        this.transformCanvas.h
                    ),
                    this.canvasContext.clip(),
                    this.prepareFrame(t),
                    this.draw(),
                    this.renderConfig.clearCanvas !== !0 && this.canvasContext.restore());
        }),
        (MaskElement.prototype.init = function () {
            (this.registeredEffects = []),
                (this.masksProperties = this.data.masksProperties),
                (this.totalMasks = this.masksProperties.length);
            var t = this.element.maskedElement,
                e = this.globalData.defs,
                a = 0,
                i = this.masksProperties.length;
            (this.layerSize = this.element.getLayerSize()),
                (this.maskElement = document.createElementNS(svgNS, "clipPath"));
            var r,
                s = this.data.masksProperties;
            for (a = 0; i > a; a++)
                s[a].inv &&
                    !this.solidPath &&
                    (this.solidPath = this.createLayerSolidPath()),
                    (r = document.createElementNS(svgNS, "path")),
                    s[a].cl
                        ? r.setAttribute("fill", "#ffffff")
                        : (r.setAttribute("fill", "none"),
                            r.setAttribute("stroke", "#ffffff"),
                            r.setAttribute("stroke-width", "1"),
                            r.setAttribute("stroke-miterlimit", "10")),
                    r.setAttribute("clip-rule", "nonezero"),
                    this.maskElement.appendChild(r),
                    (s[a].elem = r),
                    (s[a].lastPath = "");
            var n = randomString(10);
            this.maskElement.setAttribute("id", n),
                t.setAttribute("clip-path", "url(#" + n + ")"),
                e.appendChild(this.maskElement);
        }),
        (MaskElement.prototype.renderFrame = function (t) {
            var e,
                a = this.data.masksProperties.length;
            for (e = 0; a > e; e++)
                this.drawPath(
                    this.data.masksProperties[e],
                    this.data.masksProperties[e].paths[t].pathString
                );
        }),
        (MaskElement.prototype.processMaskFromEffects = function (t, e) {
            var a,
                i = this.registeredEffects.length;
            for (a = 0; i > a; a++) this.registeredEffects[a].renderMask(t, e);
        }),
        (MaskElement.prototype.registerEffect = function (t) {
            this.registeredEffects.push(t);
        }),
        (MaskElement.prototype.getMaskelement = function () {
            return this.maskElement;
        }),
        (MaskElement.prototype.createLayerSolidPath = function () {
            var t = "M0,0 ";
            return (
                (t += "h" + this.layerSize.w),
                (t += "v" + this.layerSize.h),
                (t += "h" + -this.layerSize.w),
                (t += "v" + -this.layerSize.h)
            );
        }),
        (MaskElement.prototype.drawPath = function (t, e) {
            t.lastPath !== e &&
                (t.inv
                    ? t.elem.setAttribute("d", this.solidPath + e)
                    : t.elem.setAttribute("d", e),
                    (t.lastPath = e));
        });
    var BaseElement = function (t, e, a, i) {
        (this.animationItem = e),
            (this.globalData = i),
            (this.data = t),
            (this.ownMatrix = new Matrix()),
            (this.finalTransform = { mat: new Matrix(), op: 1 }),
            (this.renderedFrames = []),
            (this.lastData = {}),
            (this.parentContainer = a),
            this.init();
    };
    (BaseElement.prototype.init = function () {
        this.createElements(),
            this.data.hasMask && this.addMasks(this.data),
            this.data.eff && this.createEffectsManager(this.data);
    }),
        (BaseElement.prototype.createElements = function () {
            this.data.hasMask
                ? ((this.layerElement = document.createElementNS(svgNS, "g")),
                    this.parentContainer.appendChild(this.layerElement),
                    (this.maskedElement = this.layerElement))
                : (this.layerElement = this.parentContainer);
        }),
        (BaseElement.prototype.prepareFrame = function (t) {
            (this.currentAnimData = this.data.renderedData[t].an),
                (this.data.renderedFrame.tr = this.currentAnimData.matrixValue);
            var e = this.currentAnimData.matrixArray;
            this.ownMatrix.reset(),
                this.ownMatrix.transform(e[0], e[1], e[2], e[3], e[4], e[5]),
                this.ownMatrix.translate(
                    -this.currentAnimData.tr.a[0],
                    -this.currentAnimData.tr.a[1]
                );
        }),
        (BaseElement.prototype.renderFrame = function (t, e) {
            if (
                (this.data.inPoint - this.data.startTime <= t &&
                    this.data.outPoint - this.data.startTime >= t
                    ? (this.isVisible !== !0 && (this.isVisible = !0),
                        (this.finalTransform.opacity = 1))
                    : (this.isVisible !== !1 && (this.isVisible = !1),
                        (this.finalTransform.opacity = 0)),
                    this.data.eff &&
                    this.effectsManager.renderFrame(t, this.currentAnimData.mk),
                    t === this.data.renderedFrame.num)
            )
                return this.isVisible;
            if (
                (this.data.hasMask && this.maskManager.renderFrame(t),
                    (this.finalTransform.opacity *= this.currentAnimData.tr.o),
                    e &&
                    (this.finalTransform.mat.reset(),
                        (i = e.mat.props),
                        this.finalTransform.mat.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
                        (this.finalTransform.opacity *= e.opacity)),
                    this.hierarchy)
            ) {
                var a,
                    i,
                    r = this.hierarchy.length;
                for (e || this.finalTransform.mat.reset(), a = r - 1; a >= 0; a -= 1)
                    (i = this.hierarchy[a].ownMatrix.props),
                        this.finalTransform.mat.transform(
                            i[0],
                            i[1],
                            i[2],
                            i[3],
                            i[4],
                            i[5]
                        );
                (i = this.ownMatrix.props),
                    this.finalTransform.mat.transform(i[0], i[1], i[2], i[3], i[4], i[5]);
            } else
                this.isVisible &&
                    (e
                        ? ((i = this.ownMatrix.props),
                            this.finalTransform.mat.transform(
                                i[0],
                                i[1],
                                i[2],
                                i[3],
                                i[4],
                                i[5]
                            ))
                        : (this.finalTransform.mat = this.ownMatrix));
            if (this.data.hasMask) {
                this.renderedFrames[this.globalData.frameNum] ||
                    (this.renderedFrames[this.globalData.frameNum] = {
                        tr: "matrix(" + this.finalTransform.mat.props.join(",") + ")",
                        o: this.finalTransform.opacity,
                    });
                var s = this.renderedFrames[this.globalData.frameNum];
                this.lastData.tr != s.tr &&
                    ((this.lastData.tr = s.tr),
                        this.layerElement.setAttribute("transform", s.tr)),
                    this.lastData.o != s.o &&
                    ((this.lastData.o = s.o),
                        this.layerElement.setAttribute("opacity", s.o));
            }
            return this.isVisible;
        }),
        (BaseElement.prototype.getDomElement = function () {
            return this.layerElement;
        }),
        (BaseElement.prototype.setMainElement = function () {
            this.mainElement = this.layerElement;
        }),
        (BaseElement.prototype.getMaskManager = function () {
            return this.maskManager;
        }),
        (BaseElement.prototype.addMasks = function (t) {
            var e = {
                data: { value: t },
                element: { value: this },
                globalData: { value: this.globalData },
            };
            this.maskManager = createElement(MaskElement, null, e);
        }),
        (BaseElement.prototype.createEffectsManager = function (t) {
            var e = { effects: { value: t.eff }, element: { value: this } };
            this.effectsManager = createElement(EffectsManager, null, e);
        }),
        (BaseElement.prototype.getType = function () {
            return this.type;
        }),
        (BaseElement.prototype.getLayerSize = function () {
            return "TextLayer" == this.data.type
                ? { w: this.data.textData.width, h: this.data.textData.height }
                : { w: this.data.width, h: this.data.height };
        }),
        (BaseElement.prototype.getHierarchy = function () {
            return this.hierarchy || (this.hierarchy = []), this.hierarchy;
        }),
        (BaseElement.prototype.hide = function () { }),
        createElement(BaseElement, ICompElement),
        (ICompElement.prototype.getComposingElement = function () {
            return this.layerElement;
        }),
        (ICompElement.prototype.hide = function () {
            if (!this.hidden) {
                var t,
                    e = this.elements.length;
                for (t = 0; e > t; t += 1) this.elements[t].hide();
                this.hidden = !0;
            }
        }),
        (ICompElement.prototype.renderFrame = function (t, e) {
            var a = this.parent.renderFrame.call(this, t, e);
            if (a === !1) return void this.hide();
            this.hidden = !1;
            var i,
                r = this.layers.length,
                s = this.data.tm
                    ? this.data.tm[t] < 0
                        ? 0
                        : t >= this.data.tm.length
                            ? this.data.tm[this.data.tm.length - 1]
                            : this.data.tm[t]
                    : t;
            for (i = 0; r > i; i += 1)
                this.elements[i].prepareFrame(s - this.layers[i].startTime);
            for (i = 0; r > i; i += 1)
                this.data.hasMask
                    ? this.elements[i].renderFrame(s - this.layers[i].startTime)
                    : this.elements[i].renderFrame(
                        s - this.layers[i].startTime,
                        this.finalTransform
                    );
        }),
        (ICompElement.prototype.setElements = function (t) {
            this.elements = t;
        }),
        (ICompElement.prototype.getElements = function () {
            return this.elements;
        }),
        createElement(BaseElement, IImageElement),
        (IImageElement.prototype.createElements = function () {
            var t = this,
                e = function () {
                    t.image.setAttributeNS(
                        "http://www.w3.org/1999/xlink",
                        "href",
                        t.path + t.assets[t.data.assetId].path
                    ),
                        (t.maskedElement = t.image),
                        t.animationItem.elementLoaded();
                },
                a = new Image();
            a.addEventListener("load", e, !1),
                a.addEventListener("error", e, !1),
                (a.src = this.path + this.assets[this.data.assetId].path),
                this.parent.createElements.call(this),
                (this.image = document.createElementNS(svgNS, "image")),
                this.image.setAttribute("width", this.data.width + "px"),
                this.image.setAttribute("height", this.data.height + "px"),
                this.layerElement.appendChild(this.image);
        }),
        (IImageElement.prototype.hide = function () {
            this.hidden ||
                (this.image.setAttribute("opacity", "0"), (this.hidden = !0));
        }),
        (IImageElement.prototype.renderFrame = function (t, e) {
            var a = this.parent.renderFrame.call(this, t, e);
            if (a === !1) return void this.hide();
            if (((this.hidden = !1), !this.data.hasMask)) {
                this.renderedFrames[this.globalData.frameNum] ||
                    (this.renderedFrames[this.globalData.frameNum] = {
                        tr: "matrix(" + this.finalTransform.mat.props.join(",") + ")",
                        o: this.finalTransform.opacity,
                    });
                var i = this.renderedFrames[this.globalData.frameNum];
                this.lastData.tr != i.tr &&
                    ((this.lastData.tr = i.tr),
                        this.image.setAttribute("transform", i.tr)),
                    this.lastData.o != i.o &&
                    ((this.lastData.o = i.o), this.image.setAttribute("opacity", i.o));
            }
        }),
        createElement(BaseElement, IShapeElement),
        (IShapeElement.prototype.createElements = function () {
            this.parent.createElements.call(this),
                (this.mainShape = new ShapeItemElement(
                    this.data.shapes,
                    this.layerElement,
                    this.globalData
                ));
        }),
        (IShapeElement.prototype.renderFrame = function (t, e) {
            var a = this.parent.renderFrame.call(this, t, e);
            return a === !1 ? void this.hide() : void this.renderShapes(t);
        }),
        (IShapeElement.prototype.hide = function () {
            this.hidden || (this.mainShape.hideShape(), (this.hidden = !0));
        }),
        (IShapeElement.prototype.renderShapes = function (t) {
            (this.hidden = !1),
                this.data.hasMask
                    ? this.mainShape.renderShape(t)
                    : this.mainShape.renderShape(t, this.finalTransform);
        }),
        (ShapeItemElement.prototype.searchShapes = function (t) {
            var e,
                a,
                i,
                r,
                s,
                n = t.length - 1,
                o = [];
            for (e = n; e >= 0; e -= 1)
                if ("fl" == t[e].ty || "st" == t[e].ty)
                    (t[e].renderedFrames = []),
                        (t[e].lastData = { c: "", o: "", w: "" }),
                        this.stylesList.push({ elements: [], type: t[e].ty, d: "" }),
                        (t[e].style = this.stylesList[this.stylesList.length - 1]),
                        o.push(t[e].style);
                else if ("gr" == t[e].ty) this.searchShapes(t[e].it);
                else if ("tr" == t[e].ty)
                    t[e].transform = { mat: new Matrix(), opacity: 1 };
                else if ("sh" == t[e].ty)
                    for (
                        t[e].elements = [],
                        t[e].renderedFrames = [],
                        t[e].lastData = { d: "", o: "", tr: "" },
                        i = this.stylesList.length,
                        r = t[e].ks.v ? t[e].ks.v.length : t[e].ks[0].s[0].v.length,
                        a = 0;
                        i > a;
                        a += 1
                    )
                        this.stylesList[a].closed ||
                            ((s = document.createElementNS(svgNS, "path")),
                                t[e].elements.push(s),
                                this.shape.appendChild(s),
                                this.stylesList[a].elements.push(s),
                                "st" == this.stylesList[a].type &&
                                (s.setAttribute("fill-opacity", 0),
                                    s.setAttribute("stroke-linejoin", "round"),
                                    s.setAttribute("stroke-linecap", "round")));
                else if ("rc" == t[e].ty)
                    for (
                        t[e].elements = [],
                        t[e].renderedFrames = [],
                        t[e].lastData = {
                            roundness: "",
                            w: "",
                            h: "",
                            x: "",
                            y: "",
                            o: "",
                            tr: "",
                        },
                        t[e].renderedFrames = [],
                        i = this.stylesList.length,
                        a = 0;
                        i > a;
                        a += 1
                    )
                        this.stylesList[a].closed ||
                            ((s = t[e].trimmed
                                ? document.createElementNS(svgNS, "path")
                                : document.createElementNS(svgNS, "rect")),
                                t[e].elements.push(s),
                                this.shape.appendChild(s),
                                this.stylesList[a].elements.push(s),
                                "st" == this.stylesList[a].type &&
                                (s.setAttribute("fill-opacity", 0),
                                    t[e].trimmed &&
                                    (s.setAttribute("stroke-linejoin", "round"),
                                        s.setAttribute("stroke-linecap", "round"))));
                else if ("el" == t[e].ty)
                    for (
                        t[e].elements = [],
                        t[e].renderedFrames = [],
                        t[e].lastData = { cx: "", cy: "", rx: "", ry: "", o: "", tr: "" },
                        i = this.stylesList.length,
                        a = 0;
                        i > a;
                        a += 1
                    )
                        this.stylesList[a].closed ||
                            ((s = document.createElementNS(svgNS, "ellipse")),
                                t[e].elements.push(s),
                                this.shape.appendChild(s),
                                this.stylesList[a].elements.push(s),
                                "st" == this.stylesList[a].type &&
                                s.setAttribute("fill-opacity", 0));
            for (n = o.length, e = 0; n > e; e += 1) o[e].closed = !0;
        }),
        (ShapeItemElement.prototype.getElement = function () {
            return this.shape;
        }),
        (ShapeItemElement.prototype.hideShape = function (t) {
            t || (t = this.data);
            var e,
                a,
                i,
                r,
                s = this.stylesList.length;
            for (s = t.length - 1, e = s; e >= 0; e -= 1)
                if ("sh" == t[e].ty || "el" == t[e].ty || "rc" == t[e].ty)
                    for (
                        t[e].lastData.o = "", r = t[e].elements, i = r.length, a = 0;
                        i > a;
                        a += 1
                    )
                        r[a].setAttribute("opacity", "0");
                else "gr" == t[e].ty && this.hideShape(t[e].it);
        }),
        (ShapeItemElement.prototype.renderShape = function (t, e, a) {
            a || (a = this.data),
                this.currentTrim.active && (this.currentTrim.active = !1),
                (this.posCount = 0),
                (this.frameNum = t);
            var i, r;
            r = a.length - 1;
            var s, n;
            for (s = e, i = r; i >= 0; i -= 1)
                if ("tr" == a[i].ty) {
                    var o = a[i].renderedData[t].mtArr;
                    if (((s = a[i].transform), (n = s.mat), n.reset(), e)) {
                        var h = e.mat.props;
                        (s.opacity = e.opacity),
                            (s.opacity *= a[i].renderedData[t].o),
                            n.transform(h[0], h[1], h[2], h[3], h[4], h[5]);
                    } else s.opacity = a[i].renderedData[t].o;
                    n.transform(o[0], o[1], o[2], o[3], o[4], o[5]).translate(
                        -a[i].renderedData[t].a[0],
                        -a[i].renderedData[t].a[1]
                    );
                } else
                    "sh" == a[i].ty
                        ? this.renderPath(a[i], t, s)
                        : "el" == a[i].ty
                            ? this.renderEllipse(a[i], t, s)
                            : "rc" == a[i].ty
                                ? a[i].trimmed
                                    ? this.renderPath(a[i], t, s)
                                    : this.renderRect(a[i], t, s)
                                : "fl" == a[i].ty
                                    ? this.renderFill(a[i], t)
                                    : "st" == a[i].ty
                                        ? this.renderStroke(a[i], t)
                                        : "gr" == a[i].ty
                                            ? this.renderShape(t, s, a[i].it)
                                            : "tm" == a[i].ty;
        }),
        (ShapeItemElement.prototype.renderPath = function (t, e, a) {
            t.renderedFrames[this.globalData.frameNum] ||
                (t.renderedFrames[this.globalData.frameNum] = {
                    d: t.renderedData[e].path.pathString,
                    tr: "matrix(" + a.mat.props.join(",") + ")",
                    o: a.opacity,
                });
            {
                var i,
                    r,
                    s = t.renderedFrames[this.globalData.frameNum],
                    n = s.d,
                    o = s.tr,
                    h = s.o,
                    l = t.elements,
                    p = l.length;
                t.renderedData[e].path.pathNodes;
            }
            for (i = 0; p > i; i += 1)
                (r = l[i]),
                    t.lastData.d != n && l[i].setAttribute("d", n),
                    t.lastData.tr != o && l[i].setAttribute("transform", o),
                    t.lastData.o != h && l[i].setAttribute("opacity", h);
            (t.lastData.d = n), (t.lastData.tr = o), (t.lastData.o = h);
        }),
        (ShapeItemElement.prototype.renderEllipse = function (t, e, a) {
            var i = t.renderedData[e];
            t.renderedFrames[this.globalData.frameNum] ||
                (t.renderedFrames[this.globalData.frameNum] = {
                    cx: i.p[0],
                    cy: i.p[1],
                    rx: i.size[0] / 2,
                    ry: i.size[1] / 2,
                    tr: "matrix(" + a.mat.props.join(",") + ")",
                    o: a.opacity,
                });
            var r,
                s = t.renderedFrames[this.globalData.frameNum],
                n = s.cx,
                o = s.cy,
                h = s.rx,
                l = s.ry,
                p = s.tr,
                m = s.o,
                d = t.elements,
                c = d.length;
            for (r = 0; c > r; r += 1)
                t.lastData.cx != n && d[r].setAttribute("cx", n),
                    t.lastData.cy != o && d[r].setAttribute("cy", o),
                    t.lastData.rx != h && d[r].setAttribute("rx", h),
                    t.lastData.ry != l && d[r].setAttribute("ry", l),
                    t.lastData.tr != p && d[r].setAttribute("transform", p),
                    t.lastData.o != m && d[r].setAttribute("opacity", m);
            (t.lastData.cx = n),
                (t.lastData.cy = o),
                (t.lastData.rx = h),
                (t.lastData.ry = l),
                (t.lastData.tr = p),
                (t.lastData.o = m);
        }),
        (ShapeItemElement.prototype.renderRect = function (t, e, a) {
            var i,
                r = t.elements,
                s = t.renderedData[e];
            t.renderedFrames[this.globalData.frameNum] ||
                ((i = s.roundness),
                    i > s.size[0] / 2 && (i = s.size[0] / 2),
                    i > s.size[1] / 2 && (i = s.size[1] / 2),
                    (t.renderedFrames[this.globalData.frameNum] = {
                        round: i,
                        w: s.size[0],
                        h: s.size[1],
                        x: s.position[0] - s.size[0] / 2,
                        y: s.position[1] - s.size[1] / 2,
                        tr: "matrix(" + a.mat.props.join(",") + ")",
                        o: a.opacity,
                    }));
            var n = t.renderedFrames[this.globalData.frameNum];
            i = n.round;
            var o,
                h = n.w,
                l = n.h,
                p = n.x,
                m = n.y,
                d = n.tr,
                c = n.o,
                u = r.length;
            for (o = 0; u > o; o += 1)
                t.lastData.roundness != i &&
                    (r[o].setAttribute("rx", i), r[o].setAttribute("ry", i)),
                    t.lastData.w != h && r[o].setAttribute("width", h),
                    t.lastData.h != l && r[o].setAttribute("height", l),
                    t.lastData.x != p && r[o].setAttribute("x", p),
                    t.lastData.y != m && r[o].setAttribute("y", m),
                    t.lastData.tr != d && r[o].setAttribute("transform", d),
                    t.lastData.o != c && r[o].setAttribute("opacity", c);
            (t.lastData.roundness = i),
                (t.lastData.w = h),
                (t.lastData.h = l),
                (t.lastData.x = p),
                (t.lastData.y = m),
                (t.lastData.o = c);
        }),
        (ShapeItemElement.prototype.renderFill = function (t, e) {
            var a = t.renderedData[e],
                i = t.style;
            t.renderedFrames[this.globalData.frameNum] ||
                (t.renderedFrames[this.globalData.frameNum] = {
                    c: a.color,
                    o: a.opacity,
                });
            var r,
                s = t.renderedFrames[this.globalData.frameNum],
                n = s.c,
                o = s.o,
                h = i.elements,
                l = h.length;
            for (r = 0; l > r; r += 1)
                t.lastData.c != n && h[r].setAttribute("fill", n),
                    t.lastData.o != o && h[r].setAttribute("fill-opacity", o);
            (t.lastData.c = n), (t.lastData.o = o);
        }),
        (ShapeItemElement.prototype.renderStroke = function (t, e) {
            var a = t.renderedData[e],
                i = t.style;
            t.renderedFrames[this.globalData.frameNum] ||
                ((t.renderedFrames[this.globalData.frameNum] = {
                    c: a.color,
                    o: a.opacity,
                    w: a.width,
                }),
                    a.dashes && (t.renderedFrames[this.globalData.frameNum].d = a.dashes));
            var r = t.renderedFrames[this.globalData.frameNum],
                s = r.c,
                n = r.o,
                o = r.w,
                h = r.d;
            if (h) {
                var l,
                    p = h.length,
                    m = "",
                    d = "";
                for (l = 0; p > l; l += 1)
                    "o" != h[l].n ? (m += " " + h[l].v) : (d += h[l].v);
            }
            var c,
                u = i.elements,
                f = u.length;
            for (c = 0; f > c; c += 1)
                t.lastData.c != s && u[c].setAttribute("stroke", s),
                    t.lastData.o != n && u[c].setAttribute("stroke-opacity", n),
                    t.lastData.w != o && u[c].setAttribute("stroke-width", o),
                    h &&
                    (t.lastData.da != m && u[c].setAttribute("stroke-dasharray", m),
                        t.lastData["do"] != d && u[c].setAttribute("stroke-dashoffset", d));
            (t.lastData.c = s),
                (t.lastData.o = n),
                (t.lastData.w = o),
                h && ((t.lastData.da = m), (t.lastData["do"] = d));
        }),
        createElement(BaseElement, ISolidElement),
        (ISolidElement.prototype.createElements = function () {
            this.parent.createElements.call(this);
            var t = document.createElementNS(svgNS, "rect");
            t.setAttribute("width", this.data.width),
                t.setAttribute("height", this.data.height),
                t.setAttribute("fill", this.data.color),
                this.layerElement.appendChild(t),
                (this.rectElement = t);
        }),
        (ISolidElement.prototype.hide = function () {
            this.hidden ||
                (this.rectElement.setAttribute("opacity", "0"), (this.hidden = !0));
        }),
        (ISolidElement.prototype.renderFrame = function (t, e) {
            var a = this.parent.renderFrame.call(this, t, e);
            if (a === !1) return void this.hide();
            if (((this.hidden = !1), !this.data.hasMask)) {
                this.renderedFrames[this.globalData.frameNum] ||
                    (this.renderedFrames[this.globalData.frameNum] = {
                        tr: "matrix(" + this.finalTransform.mat.props.join(",") + ")",
                        o: this.finalTransform.opacity,
                    });
                var i = this.renderedFrames[this.globalData.frameNum];
                this.lastData.tr != i.tr &&
                    ((this.lastData.tr = i.tr),
                        this.rectElement.setAttribute("transform", i.tr)),
                    this.lastData.o != i.o &&
                    ((this.lastData.o = i.o),
                        this.rectElement.setAttribute("opacity", i.o));
            }
        }),
        createElement(BaseElement, ITextElement),
        (ITextElement.prototype.createElements = function () {
            this.svgElem = document.createElementNS(svgNS, "g");
            var t = document.createElementNS(svgNS, "text");
            (t.textContent = this.data.textData.text),
                t.setAttribute("fill", this.data.textData.fillColor),
                t.setAttribute("x", "0"),
                t.setAttribute(
                    "y",
                    this.data.textData.height -
                    (this.data.textData.fontSize - this.data.textData.height) / 2
                ),
                this.svgElem.setAttribute("width", this.data.textData.width),
                this.svgElem.setAttribute("height", this.data.textData.height),
                (this.svgElem.style.transform = this.svgElem.style.webkitTransform =
                    "translate(" +
                    this.data.textData.xOffset +
                    "px," +
                    this.data.textData.yOffset +
                    "px)"),
                t.setAttribute("font-size", this.data.textData.fontSize),
                t.setAttribute("font-family", "Arial, sans-serif"),
                this.svgElem.appendChild(t),
                this.parent.createElements.call(this),
                this.anchorElement.appendChild(this.svgElem),
                (this.maskedElement = t);
        }),
        (CVBaseElement.prototype.init = function () {
            this.createElements(),
                this.data.hasMask && this.addMasks(this.data),
                this.data.eff && this.createEffectsManager(this.data);
        }),
        (CVBaseElement.prototype.createElements = function () { }),
        (CVBaseElement.prototype.prepareFrame = function (t) {
            return this.data.inPoint - this.data.startTime <= t &&
                this.data.outPoint - this.data.startTime >= t
                ? ((this.renderFrame = !0),
                    (this.currentAnimData = this.data.renderedData[t].an),
                    void (this.data.hasMask && this.maskManager.prepareFrame(t)))
                : ((this.renderFrame = !1),
                    (this.currentAnimData = this.data.renderedData[t].an),
                    !1);
        }),
        (CVBaseElement.prototype.draw = function (t) {
            if ((t !== !1 && this.renderer.canvasContext.save(), !this.renderFrame))
                return !1;
            var e,
                a = this.renderer.canvasContext;
            if (this.hierarchy) {
                var i,
                    r,
                    s = this.hierarchy.length;
                for (i = s - 1; i >= 0; i -= 1)
                    (r = this.hierarchy[i].getCurrentAnimData()),
                        (e = r.matrixArray),
                        a.transform(e[0], e[1], e[2], e[3], e[4], e[5]),
                        a.translate(-r.tr.a[0], -r.tr.a[1]);
            }
            (a.globalAlpha = a.globalAlpha * this.currentAnimData.tr.o),
                (e = this.currentAnimData.matrixArray),
                a.transform(e[0], e[1], e[2], e[3], e[4], e[5]),
                a.translate(
                    -this.currentAnimData.tr.a[0],
                    -this.currentAnimData.tr.a[1]
                ),
                this.data.hasMask && this.maskManager.draw(),
                t !== !1 && this.renderer.canvasContext.restore();
        }),
        (CVBaseElement.prototype.getCurrentAnimData = function () {
            return this.currentAnimData;
        }),
        (CVBaseElement.prototype.addMasks = function (t) {
            var e = { data: { value: t }, element: { value: this } };
            this.maskManager = createElement(CVMaskElement, null, e);
        }),
        (CVBaseElement.prototype.createEffectsManager = function (t) {
            var e = { effects: { value: t.eff }, element: { value: this } };
            this.effectsManager = createElement(EffectsManager, null, e);
        }),
        (CVBaseElement.prototype.getType = function () {
            return this.type;
        }),
        (CVBaseElement.prototype.getHierarchy = function () {
            return this.hierarchy || (this.hierarchy = []), this.hierarchy;
        }),
        (CVBaseElement.prototype.getLayerSize = function () {
            return "TextLayer" == this.data.type
                ? { w: this.data.textData.width, h: this.data.textData.height }
                : { w: this.data.width, h: this.data.height };
        }),
        createElement(CVBaseElement, CVCompElement),
        (CVCompElement.prototype.prepareFrame = function (t) {
            var e = this.parent.prepareFrame.call(this, t);
            if (e !== !1) {
                var a,
                    i = this.elements.length,
                    r = this.data.tm
                        ? this.data.tm[t] < 0
                            ? 0
                            : t >= this.data.tm.length
                                ? this.data.tm[this.data.tm.length - 1]
                                : this.data.tm[t]
                        : t;
                for (a = 0; i > a; a += 1)
                    this.elements[a].prepareFrame(r - this.layers[a].startTime);
            }
        }),
        (CVCompElement.prototype.draw = function () {
            if (
                (this.renderer.canvasContext.save(),
                    this.parent.draw.call(this, !1) === !1)
            )
                return void this.renderer.canvasContext.restore();
            var t,
                e = this.layers.length;
            for (t = e - 1; t >= 0; t -= 1) this.elements[t].draw();
            this.renderer.canvasContext.restore();
        }),
        (CVCompElement.prototype.setElements = function (t) {
            this.elements = t;
        }),
        (CVCompElement.prototype.getElements = function () {
            return this.elements;
        }),
        createElement(CVBaseElement, CVImageElement),
        (CVImageElement.prototype.createElements = function () {
            var t = this,
                e = function () {
                    t.animationItem.elementLoaded();
                },
                a = function () {
                    console.log("imageFailed"),
                        (t.failed = !0),
                        t.animationItem.elementLoaded();
                };
            (this.img = new Image()),
                this.img.addEventListener("load", e, !1),
                this.img.addEventListener("error", a, !1),
                (this.img.src = this.path + this.assets[this.data.assetId].path),
                this.parent.createElements.call(this);
        }),
        (CVImageElement.prototype.draw = function () {
            if (!this.failed) {
                if (
                    (this.renderer.canvasContext.save(),
                        this.parent.draw.call(this, !1) === !1)
                )
                    return void this.renderer.canvasContext.restore();
                var t = this.renderer.canvasContext;
                t.drawImage(this.img, 0, 0), this.renderer.canvasContext.restore();
            }
        }),
        createElement(CVBaseElement, CVShapeElement),
        (CVShapeElement.prototype.createElements = function () {
            this.parent.createElements.call(this),
                (this.mainShape = new CVShapeItemElement(
                    this.data.shapes,
                    this.renderer,
                    !0,
                    this.globalData
                ));
        }),
        (CVShapeElement.prototype.prepareFrame = function (t) {
            var e = this.parent.prepareFrame.call(this, t);
            e !== !1 && this.mainShape.prepareFrame(t);
        }),
        (CVShapeElement.prototype.draw = function () {
            return (
                this.renderer.canvasContext.save(),
                this.parent.draw.call(this, !1) === !1
                    ? void this.renderer.canvasContext.restore()
                    : (this.drawShapes(), void this.renderer.canvasContext.restore())
            );
        }),
        (CVShapeElement.prototype.drawShapes = function () {
            this.mainShape.renderShape();
        }),
        (CVShapeItemElement.prototype.drawPaths = function (t) {
            var e;
            if (t) {
                var a = [];
                e = this.stylesList;
            } else e = this.renderedPaths[this.globalData.frameNum];
            var i,
                r = e.length,
                s = this.renderer.canvasContext;
            for (
                s.save(), s.lineCap = "round", s.lineJoin = "round", i = 0;
                r > i;
                i += 1
            )
                "stroke" == e[i].type
                    ? ((s.globalAlpha *= e[i].opacity),
                        (s.strokeStyle = e[i].value),
                        (s.lineWidth = e[i].width),
                        e[i].dasharray
                            ? (s.setLineDash(e[i].dasharray),
                                (s.lineDashOffset = e[i].dashoffset))
                            : (s.setLineDash([]), (s.lineDashOffset = 0)),
                        s.stroke(e[i].path),
                        t &&
                        (a.push({
                            type: e[i].type,
                            opacity: e[i].opacity,
                            value: e[i].value,
                            width: e[i].width,
                            path: e[i].path,
                        }),
                            e[i].dasharray &&
                            ((a[a.length - 1].dasharray = e[i].dasharray),
                                (a[a.length - 1].dashoffset = e[i].dashoffset))))
                    : "fill" == e[i].type &&
                    ((s.globalAlpha *= e[i].opacity),
                        (s.fillStyle = e[i].value),
                        s.fill(e[i].path),
                        t &&
                        a.push({
                            type: e[i].type,
                            opacity: e[i].opacity,
                            value: e[i].value,
                            path: e[i].path,
                        }));
            s.restore(), t && (this.renderedPaths[this.globalData.frameNum] = a);
        }),
        (CVShapeItemElement.prototype.prepareFrame = function (t) {
            this.frameNum = t;
            var e,
                a = this.dataLength - 1;
            for (e = a; e >= 0; e -= 1)
                "gr" == this.data[e].ty && this.data[e].item.prepareFrame(t);
        }),
        (CVShapeItemElement.prototype.renderShape = function (t, e) {
            if (this.renderedPaths[this.globalData.frameNum])
                return void this.drawPaths(!1);
            this.opacityMultiplier = 1;
            var a, i;
            for (
                this.ownStylesList.length = 0,
                this.currentStylePoolPos = 0,
                t ? (this.stylesList = t) : (this.stylesList.length = 0),
                e
                    ? (this.currentMatrix = e)
                    : ((this.currentMatrix.a = this.currentMatrix.d = 1),
                        (this.currentMatrix.b =
                            this.currentMatrix.c =
                            this.currentMatrix.e =
                            this.currentMatrix.f =
                            0)),
                i = this.dataLength - 1,
                a = i;
                a >= 0;
                a -= 1
            )
                "gr" == this.data[a].ty
                    ? this.data[a].item.renderShape(this.stylesList, this.currentMatrix)
                    : "tr" == this.data[a].ty
                        ? this.renderTransform(this.data[a])
                        : "sh" == this.data[a].ty
                            ? this.renderPath(this.data[a])
                            : "el" == this.data[a].ty
                                ? this.renderEllipse(this.data[a])
                                : "rc" == this.data[a].ty
                                    ? this.data[a].trimmed
                                        ? this.renderPath(this.data[a])
                                        : this.renderRect(this.data[a])
                                    : "fl" == this.data[a].ty
                                        ? this.renderFill(this.data[a])
                                        : "st" == this.data[a].ty && this.renderStroke(this.data[a]);
            if (this.mainFlag) this.drawPaths(!0);
            else
                for (i = this.ownStylesList.length, a = 0; i > a; a += 1)
                    this.ownStylesList[a].closed = !0;
        }),
        (CVShapeItemElement.prototype.renderTransform = function (t) {
            var e = t.renderedData[this.frameNum],
                a = e.mtArr;
            (this.mat.a = a[0]),
                (this.mat.b = a[1]),
                (this.mat.c = a[2]),
                (this.mat.d = a[3]),
                (this.mat.e = a[4]),
                (this.mat.f = a[5]),
                (this.mat = this.mat.translate(-e.a[0], -e.a[1])),
                (this.opacityMultiplier *= e.o),
                (this.currentMatrix = this.currentMatrix.multiply(this.mat));
        }),
        (CVShapeItemElement.prototype.renderPath = function (t) {
            if (t.trimmed) {
                var e = this.renderer.canvasContext;
                (e.lineCap = "round"), (e.lineJoin = "round");
            }
            var a = t.renderedData[this.frameNum].path,
                i = new Path2D(),
                r = a.pathNodes;
            if ((r instanceof Array && (r = r[0]), r.v)) {
                var s,
                    n = r.v.length,
                    o = r.s ? r.s : [];
                for (s = 1; n > s; s += 1)
                    o[s - 1]
                        ? i.moveTo(o[s - 1][0], o[s - 1][1])
                        : 1 == s && i.moveTo(r.v[0][0], r.v[0][1]),
                        i.bezierCurveTo(
                            r.o[s - 1][0],
                            r.o[s - 1][1],
                            r.i[s][0],
                            r.i[s][1],
                            r.v[s][0],
                            r.v[s][1]
                        );
                !a.closed ||
                    (t.trimmed && !r.c) ||
                    i.bezierCurveTo(
                        r.o[s - 1][0],
                        r.o[s - 1][1],
                        r.i[0][0],
                        r.i[0][1],
                        r.v[0][0],
                        r.v[0][1]
                    ),
                    this.addPathToStyles(i);
            }
        }),
        (CVShapeItemElement.prototype.renderEllipse = function (t) {
            var e = new Path2D(),
                a = t.renderedData[this.frameNum];
            e.moveTo(a.p[0] + a.size[0] / 2, a.p[1]),
                e.ellipse(
                    a.p[0],
                    a.p[1],
                    a.size[0] / 2,
                    a.size[1] / 2,
                    0,
                    0,
                    2 * Math.PI,
                    !1
                ),
                this.addPathToStyles(e);
        }),
        (CVShapeItemElement.prototype.renderRect = function (t) {
            var e = new Path2D(),
                a = t.renderedData[this.frameNum],
                i = a.roundness;
            if (0 === i)
                e.rect(
                    a.position[0] - a.size[0] / 2,
                    a.position[1] - a.size[1] / 2,
                    a.size[0],
                    a.size[1]
                );
            else {
                var r = a.position[0] - a.size[0] / 2,
                    s = a.position[1] - a.size[1] / 2,
                    n = a.size[0],
                    o = a.size[1];
                i instanceof Array && (i = i[0]),
                    i > n / 2 && (i = n / 2),
                    i > o / 2 && (i = o / 2),
                    e.moveTo(r + i, s),
                    e.lineTo(r + n - i, s),
                    e.quadraticCurveTo(r + n, s, r + n, s + i),
                    e.lineTo(r + n, s + o - i),
                    e.quadraticCurveTo(r + n, s + o, r + n - i, s + o),
                    e.lineTo(r + i, s + o),
                    e.quadraticCurveTo(r, s + o, r, s + o - i),
                    e.lineTo(r, s + i),
                    e.quadraticCurveTo(r, s, r + i, s);
            }
            this.addPathToStyles(e);
        }),
        (CVShapeItemElement.prototype.addPathToStyles = function (t) {
            var e,
                a = this.stylesList.length,
                i = !0,
                r = 0;
            for (e = a - 1; e >= 0; e -= 1)
                this.stylesList[e].closed ||
                    ("stroke" == this.stylesList[e].type
                        ? (this.stylesList[e].width > r &&
                            this.stylesList[e].path.addPath(t, this.currentMatrix),
                            1 == this.stylesList[e].styleOpacity &&
                            1 == this.stylesList[e].opacity &&
                            (r = this.stylesList[e].width))
                        : i &&
                        "fill" == this.stylesList[e].type &&
                        (this.stylesList[e].path.addPath(t, this.currentMatrix),
                            1 == this.stylesList[e].styleOpacity &&
                            1 == this.stylesList[e].opacity &&
                            (i = !1)));
        }),
        (CVShapeItemElement.prototype.renderFill = function (t) {
            var e = t.renderedData[this.frameNum];
            return t.fillEnabled !== !1
                ? ((this.stylesPool[this.currentStylePoolPos].path = new Path2D()),
                    (this.stylesPool[this.currentStylePoolPos].closed = !1),
                    (this.stylesPool[this.currentStylePoolPos].styleOpacity =
                        e.opacity < 1 ? e.opacity : 1),
                    (this.stylesPool[this.currentStylePoolPos].opacity =
                        this.opacityMultiplier),
                    (this.stylesPool[this.currentStylePoolPos].value =
                        e.opacity < 1
                            ? fillColorToString(e.color, e.opacity)
                            : fillColorToString(e.color)),
                    this.stylesList.push(this.stylesPool[this.currentStylePoolPos]),
                    this.ownStylesList.push(this.stylesList[this.stylesList.length - 1]),
                    void (this.currentStylePoolPos += 1))
                : (this.stylesList.push(this.stylesPool[this.currentStylePoolPos]),
                    this.ownStylesList.push(this.stylesList[this.stylesList.length - 1]),
                    void (this.currentStylePoolPos += 1));
        }),
        (CVShapeItemElement.prototype.renderStroke = function (t) {
            var e = t.renderedData[this.frameNum];
            if (this.data.strokeEnabled !== !1) {
                if (
                    ((this.stylesPool[this.currentStylePoolPos].path = new Path2D()),
                        (this.stylesPool[this.currentStylePoolPos].closed = !1),
                        (this.stylesPool[this.currentStylePoolPos].styleOpacity =
                            e.opacity < 1 ? e.opacity : 1),
                        (this.stylesPool[this.currentStylePoolPos].width = e.width),
                        (this.stylesPool[this.currentStylePoolPos].opacity =
                            this.opacityMultiplier),
                        (this.stylesPool[this.currentStylePoolPos].value =
                            e.opacity < 1
                                ? fillColorToString(e.color, e.opacity)
                                : fillColorToString(e.color)),
                        e.dashes)
                ) {
                    var a,
                        i = e.dashes,
                        r = i.length,
                        s = [],
                        n = "";
                    for (a = 0; r > a; a += 1)
                        "o" != i[a].n ? s.push(i[a].v) : (n = i[a].v);
                    (this.stylesPool[this.currentStylePoolPos].dasharray = s),
                        (this.stylesPool[this.currentStylePoolPos].dashoffset = n);
                }
                return (
                    this.stylesList.push(this.stylesPool[this.currentStylePoolPos]),
                    this.ownStylesList.push(this.stylesList[this.stylesList.length - 1]),
                    void (this.currentStylePoolPos += 1)
                );
            }
            this.stylesList.push(this.stylesPool[this.currentStylePoolPos]),
                this.ownStylesList.push(this.stylesList[this.stylesList.length - 1]),
                (this.currentStylePoolPos += 1);
        }),
        createElement(CVBaseElement, CVSolidElement),
        (CVSolidElement.prototype.draw = function () {
            if (
                (this.renderer.canvasContext.save(),
                    this.parent.draw.call(this, !1) === !1)
            )
                return void this.renderer.canvasContext.restore();
            var t = this.renderer.canvasContext;
            (t.fillStyle = this.data.color),
                t.fillRect(0, 0, this.data.width, this.data.height),
                this.renderer.canvasContext.restore();
        }),
        createElement(CVBaseElement, CVTextElement),
        (CVTextElement.prototype.createElements = function () {
            this.svgElem = document.createElementNS(svgNS, "g");
            var t = document.createElementNS(svgNS, "text");
            (t.textContent = this.data.textData.text),
                t.setAttribute("fill", this.data.textData.fillColor),
                t.setAttribute("x", "0"),
                t.setAttribute(
                    "y",
                    this.data.textData.height -
                    (this.data.textData.fontSize - this.data.textData.height) / 2
                ),
                this.svgElem.setAttribute("width", this.data.textData.width),
                this.svgElem.setAttribute("height", this.data.textData.height),
                (this.svgElem.style.transform = this.svgElem.style.webkitTransform =
                    "translate(" +
                    this.data.textData.xOffset +
                    "px," +
                    this.data.textData.yOffset +
                    "px)"),
                t.setAttribute("font-size", this.data.textData.fontSize),
                t.setAttribute("font-family", "Arial, sans-serif"),
                this.svgElem.appendChild(t),
                this.parent.createElements.call(this),
                this.anchorElement.appendChild(this.svgElem),
                (this.maskedElement = t);
        }),
        (CVMaskElement.prototype.init = function () {
            (this.registeredEffects = []),
                (this.masksProperties = this.data.masksProperties),
                (this.totalMasks = this.masksProperties.length),
                (this.ctx = this.element.renderer.canvasContext),
                (this.layerSize = this.element.getLayerSize());
        }),
        (CVMaskElement.prototype.prepareFrame = function (t) {
            this.frameNum = t;
        }),
        (CVMaskElement.prototype.draw = function () {
            var t,
                e = this.data.masksProperties.length;
            for (this.ctx.beginPath(), t = 0; e > t; t++)
                this.masksProperties[t].inv
                    ? this.createInvertedMask(this.masksProperties[t], this.frameNum)
                    : this.drawShape(
                        this.ctx,
                        this.data.masksProperties[t].paths[this.frameNum].pathNodes
                    );
            this.ctx.closePath(), this.ctx.clip();
        }),
        (CVMaskElement.prototype.drawShape = function (t, e) {
            var a,
                i = e.v.length;
            for (t.moveTo(e.v[0][0], e.v[0][1]), a = 1; i > a; a++)
                t.bezierCurveTo(
                    e.o[a - 1][0],
                    e.o[a - 1][1],
                    e.i[a][0],
                    e.i[a][1],
                    e.v[a][0],
                    e.v[a][1]
                );
            t.bezierCurveTo(
                e.o[a - 1][0],
                e.o[a - 1][1],
                e.i[0][0],
                e.i[0][1],
                e.v[0][0],
                e.v[0][1]
            );
        }),
        (CVMaskElement.prototype.createInvertedMask = function () { });
    var animationManager = (function () {
        function t(t) {
            if (!t) return null;
            for (var e = 0; v > e;) {
                if (f[e].elem == t && null !== f[e].elem) return f[e].animation;
                e += 1;
            }
            var a = new AnimationItem();
            return a.setData(t), f.push({ elem: t, animation: a }), (v += 1), a;
        }
        function e(t) {
            var e = new AnimationItem();
            return (
                e.setParams(t), f.push({ elem: null, animation: e }), (v += 1), e
            );
        }
        function a(t, e) {
            var a;
            for (a = 0; v > a; a += 1) f[a].animation.setSpeed(t, e);
        }
        function i(t, e) {
            var a;
            for (a = 0; v > a; a += 1) f[a].animation.setDirection(t, e);
        }
        function r(t) {
            var e;
            for (e = 0; v > e; e += 1) f[e].animation.play(t);
        }
        function s(t, e) {
            (g = !1), (y = Date.now());
            var a;
            for (a = 0; v > a; a += 1) f[a].animation.moveFrame(t, e);
        }
        function n() {
            var t,
                e = Date.now(),
                a = e - y;
            for (t = 0; v > t; t += 1) f[t].animation.advanceTime(a);
            (y = e), requestAnimationFrame(n);
        }
        function o(t) {
            var e;
            for (e = 0; v > e; e += 1) f[e].animation.pause(t);
        }
        function h(t, e, a) {
            var i;
            for (i = 0; v > i; i += 1) f[i].animation.goToAndStop(t, e, a);
        }
        function l(t) {
            var e;
            for (e = 0; v > e; e += 1) f[e].animation.stop(t);
        }
        function p(t) {
            var e;
            for (e = 0; v > e; e += 1) f[e].animation.togglePause(t);
        }
        function m() {
            var e = document.getElementsByClassName("bodymovin");
            Array.prototype.forEach.call(e, t);
        }
        function d() {
            var t;
            for (t = 0; v > t; t += 1) f[t].animation.resize();
        }
        function c() {
            (y = Date.now()), requestAnimationFrame(n);
        }
        var u = {},
            f = [],
            y = 0,
            g = !0,
            v = 0;
        return (
            setTimeout(c, 0),
            (u.registerAnimation = t),
            (u.loadAnimation = e),
            (u.setSpeed = a),
            (u.setDirection = i),
            (u.play = r),
            (u.moveFrame = s),
            (u.pause = o),
            (u.stop = l),
            (u.togglePause = p),
            (u.searchAnimations = m),
            (u.resize = d),
            (u.start = c),
            (u.goToAndStop = h),
            u
        );
    })(),
        AnimationItem = function () {
            (this.name = ""),
                (this.path = ""),
                (this.isLoaded = !1),
                (this.currentFrame = 0),
                (this.currentRawFrame = 0),
                (this.totalFrames = 0),
                (this.frameRate = 0),
                (this.frameMult = 0),
                (this.playSpeed = 1),
                (this.playDirection = 1),
                (this.pendingElements = 0),
                (this.playCount = 0),
                (this.prerenderFramesFlag = !0),
                (this.repeat = "indefinite"),
                (this.animationData = {}),
                (this.layers = []),
                (this.assets = []),
                (this.isPaused = !0),
                (this.isScrolling = !1),
                (this.autoplay = !1),
                (this.loop = !0),
                (this.renderer = null),
                (this.animationID = randomString(10)),
                (this.renderedFrameCount = 0),
                (this.scaleMode = "fit"),
                (this.math = Math);
        };
    (AnimationItem.prototype.setParams = function (t) {
        var e = this;
        t.context && (this.context = t.context),
            t.wrapper && (this.wrapper = t.wrapper);
        var a = t.animType ? t.animType : "canvas";
        switch (a) {
            case "canvas":
                this.renderer = new CanvasRenderer(this, t.renderer);
                break;
            case "svg":
                this.renderer = new SVGRenderer(this, t.renderer);
        }
        if (
            ((this.animType = a),
                "" === t.loop ||
                null === t.loop ||
                (this.loop =
                    t.loop === !1 ? !1 : t.loop === !0 ? !0 : parseInt(t.loop)),
                (this.autoplay = "autoplay" in t ? t.autoplay : !0),
                (this.name = t.name ? t.name : ""),
                (this.prerenderFramesFlag = "prerender" in t ? t.prerender : !0),
                t.animationData)
        )
            e.configAnimation(t.animationData);
        else if (t.path) {
            "json" != t.path.substr(-4) &&
                ("/" != t.path.substr(-1, 1) && (t.path += "/"),
                    (t.path += "data.json"));
            var i = new XMLHttpRequest();
            (this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1)),
                i.open("GET", t.path, !0),
                i.send(),
                (i.onreadystatechange = function () {
                    if (4 == i.readyState)
                        if (200 == i.status) e.configAnimation(JSON.parse(i.responseText));
                        else
                            try {
                                var t = JSON.parse(i.responseText);
                                e.configAnimation(t);
                            } catch (a) { }
                });
        }
    }),
        (AnimationItem.prototype.setData = function (t) {
            var e = { wrapper: t },
                a = t.attributes;
            (e.path = a.getNamedItem("data-animation-path")
                ? a.getNamedItem("data-animation-path").value
                : a.getNamedItem("data-bm-path")
                    ? a.getNamedItem("data-bm-path").value
                    : a.getNamedItem("bm-path")
                        ? a.getNamedItem("bm-path").value
                        : ""),
                (e.animType = a.getNamedItem("data-anim-type")
                    ? a.getNamedItem("data-anim-type").value
                    : a.getNamedItem("data-bm-type")
                        ? a.getNamedItem("data-bm-type").value
                        : a.getNamedItem("bm-type")
                            ? a.getNamedItem("bm-type").value
                            : "canvas");
            var i = a.getNamedItem("data-anim-loop")
                ? a.getNamedItem("data-anim-loop").value
                : a.getNamedItem("data-bm-loop")
                    ? a.getNamedItem("data-bm-loop").value
                    : a.getNamedItem("bm-loop")
                        ? a.getNamedItem("bm-loop").value
                        : "";
            "" === i ||
                (e.loop = "false" === i ? !1 : "true" === i ? !0 : parseInt(i)),
                (e.name = a.getNamedItem("data-name")
                    ? a.getNamedItem("data-name").value
                    : a.getNamedItem("data-bm-name")
                        ? a.getNamedItem("data-bm-name").value
                        : a.getNamedItem("bm-name")
                            ? a.getNamedItem("bm-name").value
                            : "");
            var r = a.getNamedItem("data-anim-prerender")
                ? a.getNamedItem("data-anim-prerender").value
                : a.getNamedItem("data-bm-prerender")
                    ? a.getNamedItem("data-bm-prerender").value
                    : a.getNamedItem("bm-prerender")
                        ? a.getNamedItem("bm-prerender").value
                        : "";
            "false" === r && (e.prerender = !1), this.setParams(e);
        }),
        (AnimationItem.prototype.configAnimation = function (t) {
            this.renderer.configAnimation(t),
                (this.animationData = t),
                (this.animationData._id = this.animationID),
                (this.animationData._animType = this.animType),
                (this.layers = this.animationData.animation.layers),
                (this.assets = this.animationData.assets),
                (this.totalFrames = this.animationData.animation.totalFrames),
                (this.frameRate = this.animationData.animation.frameRate),
                (this.firstFrame = Math.round(
                    this.animationData.animation.ff * this.frameRate
                )),
                (this.frameMult = this.animationData.animation.frameRate / 1e3),
                dataManager.completeData(this.animationData),
                this.renderer.buildItems(this.animationData.animation.layers),
                this.updaFrameModifier(),
                this.checkLoaded();
        }),
        (AnimationItem.prototype.elementLoaded = function () {
            this.pendingElements--, this.checkLoaded();
        }),
        (AnimationItem.prototype.checkLoaded = function () {
            this.renderer.buildStage(this.container, this.layers),
                0 === this.pendingElements &&
                (this.prerenderFramesFlag
                    ? (this.prerenderFrames(0),
                        dataManager.renderFrame(
                            this.animationID,
                            this.currentFrame + this.firstFrame
                        ),
                        this.renderer.renderFrame(this.currentFrame + this.firstFrame))
                    : ((this.isLoaded = !0),
                        this.gotoFrame(),
                        this.autoplay && this.play()));
        }),
        (AnimationItem.prototype.prerenderFrames = function (t) {
            t || (t = 0),
                this.renderedFrameCount === this.totalFrames
                    ? ((this.isLoaded = !0),
                        this.gotoFrame(),
                        this.autoplay && this.play())
                    : (dataManager.renderFrame(
                        this.animationID,
                        this.renderedFrameCount + this.firstFrame
                    ),
                        (this.renderedFrameCount += 1),
                        t > 5
                            ? setTimeout(this.prerenderFrames.bind(this), 0)
                            : ((t += 1), this.prerenderFrames(t)));
        }),
        (AnimationItem.prototype.resize = function () {
            this.renderer.updateContainerSize();
        }),
        (AnimationItem.prototype.gotoFrame = function () {
            (this.currentFrame = subframeEnabled
                ? this.math.round(100 * this.currentRawFrame) / 100
                : this.math.floor(this.currentRawFrame)),
                this.renderFrame();
        }),
        (AnimationItem.prototype.renderFrame = function () {
            this.isLoaded !== !1 &&
                (dataManager.renderFrame(
                    this.animationID,
                    this.currentFrame + this.firstFrame
                ),
                    this.renderer.renderFrame(this.currentFrame + this.firstFrame));
        }),
        (AnimationItem.prototype.play = function (t) {
            (t && this.name != t) || (this.isPaused === !0 && (this.isPaused = !1));
        }),
        (AnimationItem.prototype.pause = function (t) {
            (t && this.name != t) || (this.isPaused === !1 && (this.isPaused = !0));
        }),
        (AnimationItem.prototype.togglePause = function (t) {
            (t && this.name != t) ||
                (this.isPaused === !0
                    ? ((this.isPaused = !1), this.play())
                    : ((this.isPaused = !0), this.pause()));
        }),
        (AnimationItem.prototype.stop = function (t) {
            (t && this.name != t) ||
                ((this.isPaused = !0),
                    (this.currentFrame = this.currentRawFrame = 0),
                    (this.playCount = 0),
                    this.gotoFrame());
        }),
        (AnimationItem.prototype.goToAndStop = function (t, e, a) {
            (a && this.name != a) ||
                (this.setCurrentRawFrameValue(e ? t : t * this.frameModifier),
                    (this.isPaused = !0));
        }),
        (AnimationItem.prototype.advanceTime = function (t) {
            this.isPaused !== !0 &&
                this.isScrolling !== !0 &&
                this.isLoaded !== !1 &&
                this.setCurrentRawFrameValue(
                    this.currentRawFrame + t * this.frameModifier
                );
        }),
        (AnimationItem.prototype.updateAnimation = function (t) {
            this.setCurrentRawFrameValue(this.totalFrames * t);
        }),
        (AnimationItem.prototype.moveFrame = function (t, e) {
            (e && this.name != e) ||
                this.setCurrentRawFrameValue(this.currentRawFrame + t);
        }),
        (AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
            if (
                ((this.currentRawFrame = t), this.currentRawFrame >= this.totalFrames)
            ) {
                if (this.loop === !1)
                    return (
                        (this.currentRawFrame = this.totalFrames - 1),
                        this.gotoFrame(),
                        void this.pause()
                    );
                if (
                    ((this.playCount += 1),
                        this.loop !== !0 && this.playCount == this.loop)
                )
                    return (
                        (this.currentRawFrame = this.totalFrames - 1),
                        this.gotoFrame(),
                        void this.pause()
                    );
            } else if (this.currentRawFrame < 0)
                return (
                    (this.playCount -= 1),
                    this.playCount < 0 && (this.playCount = 0),
                    this.loop === !1
                        ? ((this.currentRawFrame = 0), this.gotoFrame(), void this.pause())
                        : ((this.currentRawFrame = this.totalFrames + this.currentRawFrame),
                            void this.gotoFrame())
                );
            (this.currentRawFrame = this.currentRawFrame % this.totalFrames),
                this.gotoFrame();
        }),
        (AnimationItem.prototype.setSpeed = function (t) {
            (this.playSpeed = t), this.updaFrameModifier();
        }),
        (AnimationItem.prototype.setDirection = function (t) {
            (this.playDirection = 0 > t ? -1 : 1), this.updaFrameModifier();
        }),
        (AnimationItem.prototype.updaFrameModifier = function () {
            this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
        }),
        (AnimationItem.prototype.getPath = function () {
            return this.path;
        }),
        (AnimationItem.prototype.getAssets = function () {
            return this.assets;
        }),
        (function (t) {
            function e(t) {
                animationManager.play(t);
            }
            function a(t) {
                animationManager.pause(t);
            }
            function i(t) {
                animationManager.togglePause(t);
            }
            function r(t, e) {
                animationManager.setSpeed(t, e);
            }
            function s(t, e) {
                animationManager.setDirection(t, e);
            }
            function n(t) {
                animationManager.stop(t);
            }
            function o(t) {
                animationManager.moveFrame(t);
            }
            function h() {
                animationManager.searchAnimations();
            }
            function l(t) {
                return animationManager.registerAnimation(t);
            }
            function p() {
                animationManager.resize();
            }
            function m() {
                animationManager.start();
            }
            function d(t, e, a) {
                animationManager.goToAndStop(t, e, a);
            }
            function c(t) {
                subframeEnabled = t;
            }
            function u(t) {
                return animationManager.loadAnimation(t);
            }
            function f() {
                "complete" === document.readyState && (clearInterval(g), h());
            }
            var y = {};
            (y.play = e),
                (y.pause = a),
                (y.togglePause = i),
                (y.setSpeed = r),
                (y.setDirection = s),
                (y.stop = n),
                (y.moveFrame = o),
                (y.searchAnimations = h),
                (y.registerAnimation = l),
                (y.loadAnimation = u),
                (y.setSubframeRendering = c),
                (y.resize = p),
                (y.start = m),
                (y.goToAndStop = d),
                (y.checkReady = f),
                (t.bodymovin = y);
            var g = setInterval(f, 100);
        })(window);
})(window);
