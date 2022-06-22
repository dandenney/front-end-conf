var O = window.OutlinesDraw || {};
(O.util = {
  threshHold: 0.001,
  toRadians: function(a) {
    return a * (Math.PI / 180);
  },
  toDegrees: function(a) {
    return a * (180 / Math.PI);
  },
  vecFromString: function(a, b) {
    var c = a.split(b || ",");
    return { x: parseInt(c[0], 10), y: parseInt(c[1], 10) };
  },
  stringFromVec: function(a) {
    return a.x.toString() + "," + a.y.toString();
  },
  addVecs: function(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
  },
  subtractVecs: function(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  },
  slope: function(a, b) {
    return (b.y - a.y) / (b.x - a.x);
  },
  distance: function(a, b) {
    var c = Math.pow(a.x - b.x, 2),
      d = Math.pow(a.y - b.y, 2);
    return Math.sqrt(c + d);
  },
  dot: function(a, b, c) {
    c.save(),
      c.beginPath(),
      c.arc(a, b, 2, 2 * Math.PI, !1),
      (c.fillStyle = "#424"),
      c.fill(),
      c.closePath(),
      c.restore();
  },
  zeroOut: function(a) {
    return Math.abs(a) <= this.threshHold ? 0 : a;
  },
  round: function(a, b) {
    var c = b || 3,
      d = Math.pow(10, c),
      e = Math.round(a * d) / d,
      f = e % 1,
      g = this.threshHold;
    return (
      0 !== f &&
        (f >= 0.5
          ? g >= 1 - f && (e = Math.ceil(e))
          : g >= f && (e = Math.ceil(e))),
      e
    );
  },
  extend: function(a) {
    for (var b, c, d = 1, e = arguments.length; e > d; d++) {
      b = arguments[d];
      for (c in b) a[c] = b[c];
    }
    return a;
  },
  getViewportSize: function() {
    var a = window,
      b = "inner";
    return (
      "innerWidth" in window ||
        ((a = document.documentElement || document.body), (b = "client")),
      { width: a[b + "Width"], height: a[b + "Height"] }
    );
  },
  nativeDashedLine: function() {
    var a = document.createElement("canvas"),
      b = a.getContext("2d");
    return void 0 !== b.setLineDash;
  },
}),
  (O.Animator = function(a) {
    (this.__target = a),
      (this.__playing = !1),
      (this.__shouldLoop = !1),
      (this.__currentSequence = 0),
      (this.__order = []),
      (this.__sequences = {});
  }),
  (O.Animator.prototype.constructor = O.Animator),
  (O.Animator.prototype.addSequence = function(a, b) {
    this.__sequences[b] = a || function() {};
  }),
  (O.Animator.prototype.removeSequence = function(a) {
    var b = this.__order.length - 1;
    for (this.__sequences[a] = void 0; len >= 0; b--)
      if (this.__order[b] === a) return this.__order.splice(b, 1), !0;
    return !1;
  }),
  (O.Animator.prototype.orderSequences = function(a) {
    this.__order = a;
  }),
  (O.Animator.prototype.update = function() {
    var a = this.__sequences[this.__order[this.__currentSequence]];
    if (!this.__playing) return !1;
    if (!a) {
      if (!this.__shouldLoop) return this.stop(), !1;
      this.__currentSequence = 0;
    }
    return a.call(this, this.__target) && this.__currentSequence++, !0;
  }),
  (O.Animator.prototype.start = function() {
    this.__playing = !0;
  }),
  (O.Animator.prototype.stop = function() {
    this.__playing = !1;
  }),
  (O.Animator.prototype.reset = function() {
    (this.__currentSequence = 0), (this.__playing = !1);
  }),
  (O.Animator.prototype.loop = function(a) {
    this.__shouldLoop = a;
  }),
  (O.color = {
    changeHue: function(a, b) {
      var c,
        d = this.hexToHSL(a);
      return (
        (d.h += b),
        (d.h > 360 || d.h < 0) && (d.h = Math.abs(Math.abs(d.h) - 360)),
        (c = this.hslToRGB(d)),
        this.rgbToHex(c)
      );
    },
    hexToHSL: function(a) {
      var b, c, d, e, f, g, h, i, j;
      return (
        (a = a.replace(/^\s*#|\s*$/g, "")),
        3 == a.length && (a = a.replace(/(.)/g, "$1$1")),
        (b = parseInt(a.substr(0, 2), 16) / 255),
        (c = parseInt(a.substr(2, 2), 16) / 255),
        (d = parseInt(a.substr(4, 2), 16) / 255),
        (e = Math.max(b, c, d)),
        (f = Math.min(b, c, d)),
        (g = e - f),
        (h = (e + f) / 2),
        (i = 0),
        (j = 0),
        (i =
          0 === g
            ? 0
            : e == b
            ? 60 * (((c - d) / g) % 6)
            : e == c
            ? 60 * ((d - b) / g + 2)
            : 60 * ((b - c) / g + 4)),
        (j = 0 === g ? 0 : g / (1 - Math.abs(2 * h - 1))),
        { h: i, s: j, l: h }
      );
    },
    hexToRGB: function(a) {
      var b = function(a) {
          return parseInt(e(a).substring(0, 2), 16);
        },
        c = function(a) {
          return parseInt(e(a).substring(2, 4), 16);
        },
        d = function(a) {
          return parseInt(e(a).substring(4, 6), 16);
        },
        e = function(a) {
          return "#" == a.charAt(0) ? a.substring(1, 7) : a;
        };
      return { r: b(a), g: c(a), b: d(a) };
    },
    hslToRGB: function(a) {
      var c = a.h,
        d = a.s,
        e = a.l,
        f = (1 - Math.abs(2 * e - 1)) * d,
        h = f * (1 - Math.abs(((c / 60) % 2) - 1)),
        i = e - f / 2;
      return (
        60 > c
          ? ((r = f), (g = h), (b = 0))
          : 120 > c
          ? ((r = h), (g = f), (b = 0))
          : 180 > c
          ? ((r = 0), (g = f), (b = h))
          : 240 > c
          ? ((r = 0), (g = h), (b = f))
          : 300 > c
          ? ((r = h), (g = 0), (b = f))
          : ((r = f), (g = 0), (b = h)),
        {
          r: this.normalize_rgb_value(r, i),
          g: this.normalize_rgb_value(g, i),
          b: this.normalize_rgb_value(b, i),
        }
      );
    },
    hslToHex: function(a) {
      return this.rgbToHex(this.hslToRGB(a));
    },
    rgbToHex: function(a) {
      return (
        "#" + ((1 << 24) + (a.r << 16) + (a.g << 8) + a.b).toString(16).slice(1)
      );
    },
    rgbToHSL: function(a) {
      return this.hexToHSL(this.rgbToHex(a));
    },
    normalize_rgb_value: function(a, b) {
      return (a = Math.floor(255 * (a + b))), 0 > a ? 0 : a;
    },
  }),
  (O.easing = {
    tween: function(a, b, c, d, e) {
      return this[a](b, c, d, e);
    },
    linear: function(a, b, c, d) {
      return (c -= b), c * (a / d) + b;
    },
    quadIn: function(a, b, c, d) {
      return (c -= b), (a /= d), c * Math.pow(a, 2) + b;
    },
    quadOut: function(a, b, c, d) {
      return (c -= b), (a /= d), -c * a * (a - 2) + b;
    },
    quad: function(a, b, c, d) {
      return (
        (c -= b),
        (a /= d / 2),
        1 > a
          ? (c / 2) * Math.pow(a, 2) + b
          : (a--, (-c / 2) * (a * (a - 2) - 1) + b)
      );
    },
    cubicIn: function(a, b, c, d) {
      return (c -= b), (a /= d), c * Math.pow(a, 3) + b;
    },
    cubicOut: function(a, b, c, d) {
      return (c -= b), (a /= d), a--, c * (Math.pow(a, 3) + 1) + b;
    },
    cubic: function(a, b, c, d) {
      return (
        (c -= b),
        (a /= d / 2),
        1 > a
          ? (c / 2) * Math.pow(a, 3) + b
          : ((a -= 2), (c / 2) * (Math.pow(a, 3) + 2) + b)
      );
    },
    quartIn: function(a, b, c, d) {
      return (c -= b), (a /= d), c * Math.pow(a, 4) + b;
    },
    quartOut: function(a, b, c, d) {
      return (c -= b), (a /= d), a--, -c * (Math.pow(a, 4) - 1) + b;
    },
    quart: function(a, b, c, d) {
      return (
        (c -= b),
        (a /= d / 2),
        1 > a
          ? (c / 2) * Math.pow(a, 4) + b
          : ((a -= 2), (-c / 2) * (Math.pow(a, 4) - 2) + b)
      );
    },
    quintIn: function(a, b, c, d) {
      return (c -= b), (a /= d), c * Math.pow(a, 5) + b;
    },
    quintOut: function(a, b, c, d) {
      return (c -= b), (a /= d), a--, c * (Math.pow(a, 5) + 1) + b;
    },
    quint: function(a, b, c, d) {
      return (
        (c -= b),
        (a /= d / 2),
        1 > a
          ? (c / 2) * Math.pow(a, 5) + b
          : ((a -= 2), (c / 2) * (Math.pow(a, 5) + 2) + b)
      );
    },
    sineIn: function(a, b, c, d) {
      return (c -= b), -c * Math.cos((a / d) * (Math.PI / 2)) + c + b;
    },
    sineOut: function(a, b, c, d) {
      return (c -= b), c * Math.sin((a / d) * (Math.PI / 2)) + b;
    },
    sine: function(a, b, c, d) {
      return (c -= b), (-c / 2) * (Math.cos(Math.PI * (a / d)) - 1) + b;
    },
    expoIn: function(a, b, c, d) {
      return (c -= b), 0 === a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b;
    },
    expoOut: function(a, b, c, d) {
      return (
        (c -= b), a === d ? b + c : c * (-Math.pow(2, (-10 * a) / d) + 1) + b
      );
    },
    expo: function(a, b, c, d) {
      return (
        (c -= b),
        0 === a
          ? b
          : a === d
          ? b + c
          : (a /= d / 2) < 1
          ? (c / 2) * Math.pow(2, 10 * (a - 1)) + b
          : (c / 2) * (-Math.pow(2, -10 * --a) + 2) + b
      );
    },
    circIn: function(a, b, c, d) {
      return (c -= b), (a /= d), -c * (Math.sqrt(1 - Math.pow(a, 2)) - 1) + b;
    },
    circOut: function(a, b, c, d) {
      return (c -= b), (a /= d), a--, c * Math.sqrt(1 - Math.pow(a, 2)) + b;
    },
    circ: function(a, b, c, d) {
      return (
        (c -= b),
        (a /= d / 2),
        1 > a
          ? (-c / 2) * (Math.sqrt(1 - Math.pow(a, 2)) - 1) + b
          : ((a -= 2), (c / 2) * (Math.sqrt(1 - Math.pow(a, 2)) + 1) + b)
      );
    },
  }),
  (O.Point = function(a, b, c) {
    (this.id = c), (this.x = a), (this.y = b);
  }),
  (O.Point.prototype.constructor = O.Point),
  (O.Point.prototype.toVec = function() {
    var a = this;
    return { x: a.x, y: a.y };
  }),
  (O.Point.prototype.toString = function() {
    return this.x.toString() + "," + this.y.toString();
  }),
  (O.Point.prototype.rotate = function(a, b) {
    var c,
      d,
      e,
      f,
      g = this;
    return a && 0 !== a
      ? ((b = void 0 !== b ? O.util.vecFromString(b, ",") : { x: 0, y: 0 }),
        (c = (this.x - b.x) * Math.cos(a)),
        (e = (this.y - b.y) * Math.sin(a)),
        (d = (this.x - b.x) * Math.sin(a)),
        (f = (this.y - b.y) * Math.cos(a)),
        (this.x = b.x + (c - e)),
        (this.y = b.y + (d + f)),
        { x: g.x, y: g.y })
      : !1;
  }),
  (O.Point.prototype.translate = function(a) {
    var b = this;
    return (
      (a = void 0 !== a ? O.util.vecFromString(a, ",") : { x: 0, y: 0 }),
      (this.x += a.x),
      (this.y += a.y),
      { x: b.x, y: b.y }
    );
  }),
  (O.Point.prototype.scale = function(a, b) {
    var c = this;
    return this.scaleX(a, b), this.scaleY(a, b), { x: c.x, y: c.y };
  }),
  (O.Point.prototype.scaleX = function(a, b) {
    var c = this;
    return (
      (b = void 0 !== b ? O.util.vecFromString(b, ",") : { x: 0, y: 0 }),
      (this.x = b.x + (this.x - b.x) * a),
      { x: c.x, y: c.y }
    );
  }),
  (O.Point.prototype.scaleY = function(a, b) {
    var c = this;
    return (
      (b = void 0 !== b ? O.util.vecFromString(b, ",") : { x: 0, y: 0 }),
      (this.y = b.y + (this.y - b.y) * a),
      { x: c.x, y: c.y }
    );
  }),
  (O.random = {
    posNeg: function() {
      return Math.random() >= 0.5 ? 1 : -1;
    },
    randPosNeg: function(a) {
      return Math.random() * a * this.posNeg();
    },
    randPos: function(a) {
      return Math.abs(this.randPosNeg(a));
    },
    yesNo: function() {
      return Math.random() >= 0.5;
    },
  }),
  (O.Scene = function(a, b, c) {
    (this.isDynamic = !1),
      (this.fps = b || "high"),
      (this.stage = new O.Stage(a, c)),
      (this.timer = new O.Timer(this.fps)),
      (this.updateLoop = void 0),
      (this.ctx = this.stage.ctx),
      this.timer.addListener(this);
  }),
  (O.Scene.prototype.constructor = O.Scene),
  (O.Scene.prototype.start = function() {
    return this.timer.start(), this;
  }),
  (O.Scene.prototype.stop = function() {
    return this.timer.stop(), this;
  }),
  (O.Scene.prototype.clear = function(a) {
    return (this.stage.clear = a), this;
  }),
  (O.Scene.prototype.loop = function(a) {
    return (this.updateLoop = a), this;
  }),
  (O.Scene.prototype.update = function() {
    return (
      this.stage.clear(),
      this.updateLoop.call(this),
      this.stage.update(),
      this.stage.draw(),
      this.stage.saveScene(),
      this
    );
  }),
  (O.Scene.prototype.size = function(a, b, c) {
    return a
      ? ("dynamic" === a
          ? (this.stage.dynamicSize(b, c), (this.isDynamic = !0))
          : "static" === a &&
            (this.isDynamic && this.stage.dynamicSizeOff(),
            this.stage.staticSize(b, c),
            (this.isDynamic = !0)),
        this)
      : this.stage.size();
  }),
  (O.Scene.prototype.constructShapesToStage = function(a, b) {
    for (var c = 0, d = shapes.length; d > c; c++)
      this.stage.constructShape(a, b);
    return this;
  }),
  (O.Scene.prototype.addShapesToStage = function(a) {
    for (var b = 0, c = a.length; c > b; b++) this.stage.addShape(a[b]);
    return this;
  }),
  (O.Scene.prototype.removeShapes = function() {
    return this;
  }),
  (O.Scene.prototype.removeShapesByInex = function() {
    return this;
  }),
  (O.Scene.prototype.removeShapesFromStage = function(a) {
    for (var b = 0, c = a.length; c > b; b++) this.stage.removeShape(a[b]);
    return this;
  }),
  (O.Scene.prototype.removeShapesFromStageByIndex = function() {
    for (var a = 0, b = indicies.length; b > a; a++)
      this.stage.removeShapeByIndex(indicies[a]);
    return this;
  }),
  (O.Shape = function(a, b, c) {
    var d,
      e = 0,
      f = a.split(" "),
      g = f.length;
    if (
      ((this.defaults = {
        strokeStyle: "#000000",
        lineWidth: 3,
        opacity: 1,
        lineType: "solid",
        currentScale: { x: 1, y: 1 },
        currentRotation: 0,
        i: 0,
        dash: !1,
        dashSize: 6,
        dashSpaceSize: 3,
      }),
      (this.id = c),
      (this.points = []),
      (this.dashedLine = O.util.nativeDashedLine()),
      O.util.extend(this.defaults, b || {}),
      O.util.extend(this, this.defaults),
      g > 0)
    )
      for (; g > e; e++)
        (d = O.util.vecFromString(f[e], ",")),
          this.i++,
          this.points.push(new O.Point(d.x, d.y, this.i));
  }),
  (O.Shape.prototype.constructor = O.Shape),
  (O.Shape.prototype.constructPointObj = function(a) {
    var b = O.util.vecFromString(a),
      c = new O.Point(b.x, b.y);
    return this.addPointObj(c);
  }),
  (O.Shape.prototype.addPointObj = function(a) {
    for (var b = 0, c = this.points.length, d = !0; c > b; b++)
      this.points[b].x === a.x && this.points[b].y === a.y && (d = !1);
    return d ? ((a.i = this.i++), this.points.push(a), a) : !1;
  }),
  (O.Shape.prototype.removePoint = function(a) {
    var b = this.points,
      c = b.length - 1,
      d = 0;
    if (void 0 === a.id) return !1;
    for (; c >= d; c--)
      if (b[c].id && b[c].id === a.id) return b.splice(c, 1), !0;
    return !1;
  }),
  (O.Shape.prototype.removePointByIndex = function(a) {
    return void 0 !== this.points[a] && void 0 !== a
      ? (this.points.splice(a, 1), !0)
      : !1;
  }),
  (O.Shape.prototype.rotate = function(a, b) {
    for (var c = 0, d = this.points.length; d > c; c++)
      this.points[c].rotate(a, b);
    return (this.currentRotation += a), this;
  }),
  (O.Shape.prototype.rotateTo = function(a) {
    return this.rotate(a - this.currentRotation);
  }),
  (O.Shape.prototype.translate = function(a) {
    for (var b = 0, c = this.points.length; c > b; b++)
      this.points[b].translate(a);
    return this;
  }),
  (O.Shape.prototype.translateTo = function(a) {
    var b = O.util.vecFromString(a),
      c = this.centroid();
    return this.translate(O.util.stringFromVec({ x: b.x - c.x, y: b.y - c.y }));
  }),
  (O.Shape.prototype.scale = function(a, b) {
    return this.scaleX(a, b), this.scaleY(a, b), this;
  }),
  (O.Shape.prototype.scaleX = function(a, b) {
    var c,
      d,
      e = this.currentScale;
    if (e.x !== a) {
      for (c = 0, d = this.points.length; d > c; c++)
        this.points[c].scaleX(a / e.x, b);
      e.x = a;
    }
    return this;
  }),
  (O.Shape.prototype.scaleY = function(a, b) {
    var c,
      d,
      e = this.currentScale;
    if (e.y !== a) {
      for (c = 0, d = this.points.length; d > c; c++)
        this.points[c].scaleY(a / e.y, b);
      e.y = a;
    }
    return this;
  }),
  (O.Shape.prototype.length = function() {
    return this.points.length;
  }),
  (O.Shape.prototype.centroid = function() {
    for (var a = 0, b = 0, c = 0, d = this.length(); d > c; c++)
      (a += this.points[c].x), (b += this.points[c].y);
    return (a /= d), (b /= d), new O.Point(a, b);
  }),
  (O.Shape.prototype.draw = function(a) {
    a.save(),
      (a.strokeStyle = this.strokeStyle),
      (a.fillStyle = this.strokeStyle),
      (a.lineWidth = this.lineWidth),
      a.beginPath(),
      a.moveTo(this.points[0].x, this.points[0].y),
      (a.globalAlpha = this.opacity),
      this["_draw" + this.lineType](a),
      a.stroke(),
      (a.globalAlpha = this.opacity / 6),
      a.fill(),
      a.restore();
  }),
  (O.Shape.prototype._drawsolid = function(a) {
    for (var b = 1, c = this.points.length; c > b; b++)
      a.lineTo(this.points[b].x, this.points[b].y);
  }),
  (O.Shape.prototype._drawdashed = function(a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p = 1,
      q = this.points.length;
    if (this.dashedLine)
      for (a.setLineDash([this.dashSize, this.dashSpaceSize]); q > p; p++)
        a.lineTo(this.points[p].x, this.points[p].y);
    else
      for (; q > p; p++)
        for (
          b = this.points[p - 1].x,
            c = this.points[p - 1].y,
            d = this.points[p].x,
            e = this.points[p].y,
            i = d - b,
            j = e - c,
            k = i ? j / i : 1e15,
            n = 0.001,
            l = Math.sqrt(i * i + j * j),
            f = [this.dashSize, this.dashSpaceSize],
            g = 0,
            h = !0,
            m = f.length,
            a.moveTo(b, c);
          l >= 0.1;

        )
          (n = f[g++ % m]),
            n > l && (n = l),
            (o = Math.sqrt((n * n) / (1 + k * k))),
            0 > i && (o = -o),
            (b += o),
            (c += k * o),
            a[h ? "lineTo" : "moveTo"](b, c),
            (l -= n),
            (h = !h);
  }),
  (O.Shape.prototype.update = function(a) {
    this.draw(a);
  }),
  (O.Stage = function(a, b) {
    var c = this;
    (this.shapes = []),
      (this.i = 0),
      (this.defaults = {
        shapes: [],
        size: { w: 400, h: 400 },
        scale: { w: 400, h: 400 },
      }),
      O.util.extend(this.defaults, b || {}),
      (this.canvas = document.getElementById(a)),
      (this.tCanvas = document.createElement("canvas")),
      (this.ctx = this.canvas.getContext("2d")),
      (this.tCtx = this.tCanvas.getContext("2d"));
    for (var d = 0, e = this.defaults.shapes.length; e > d; d++)
      this.constructShape(
        this.defaults.shapes[d][0],
        this.defaults.shapes[d][1]
      );
    this.staticSize(this.defaults.size, this.defaults.scale),
      (this.dynamic = {
        owner: c,
        func: void 0,
        eventHandle: (function(a) {
          return a.attachEvent
            ? { add: "attachEvent", remove: "detatchEvent", e: "onresize" }
            : a.addEventListener
            ? {
                add: "addEventListener",
                remove: "removeEventListener",
                e: "resize",
              }
            : void 0;
        })(window),
        attachOnResize: function(a, b) {
          var c,
            d,
            e = this,
            f = a,
            g = b;
          return this.dynamic.eventHandle
            ? ((this.dynamic.func = function() {
                e.dynamic.resize(f, g);
              }),
              (c = this.dynamic.eventHandle.add),
              (d = this.dynamic.eventHandle.e),
              window[c](d, e.dynamic.func),
              void this.dynamic.resize(f, g))
            : !1;
        },
        detatchOnResize: function(a, b) {
          var c = this.dynamic.eventHandle.remove,
            d = this.dynamic.eventHandle.e;
          window[c](d, this.dynamic.func),
            this.staticSize(a || this.defaults.size, b || this.defaults.scale);
        },
        resize: function(a, b) {
          var c,
            d,
            e,
            f,
            g = O.util.getViewportSize();
          (c = ((a ? a.w : 100) / 100) * g.width),
            (d = ((a ? a.h : 100) / 100) * g.height),
            b &&
              ((e = ((b ? b.w : c) / 100) * g.width),
              (f = ((b ? b.h : d) / 100) * g.height)),
            this.owner.staticSize({ w: c, h: d }, { w: e, h: f });
        },
      });
  }),
  (O.Stage.prototype.constructor = O.Stage),
  (O.Stage.prototype.saveScene = function() {
    (this.tCanvas.width = this.canvas.width),
      (this.tCanvas.height = this.canvas.height),
      this.tCtx.drawImage(this.canvas, 0, 0);
  }),
  (O.Stage.prototype.constructShape = function(a, b) {
    this.addShape(new O.Shape(a, b));
  }),
  (O.Stage.prototype.addShape = function(a) {
    (a.id = this.i++), this.shapes.push(a);
  }),
  (O.Stage.prototype.removeShape = function(a) {
    var b = this.shapes,
      c = b.length - 1,
      d = 0;
    if (void 0 === a.id) return !1;
    for (; c >= d; c--)
      if (b[c].id && b[c].id === a.id) return b.splice(c, 1), !0;
    return !1;
  }),
  (O.Stage.prototype.removeShapeByIndex = function(a) {
    return void 0 !== this.shapes[a] && void 0 !== a
      ? (this.shapes.splice(a, 1), !0)
      : !1;
  }),
  (O.Stage.prototype.staticSize = function(a, b) {
    (a = void 0 !== a ? a : this.defaults.size),
      (b = void 0 !== b ? b : this.defaults.scale),
      (this.canvas.width = a.w),
      (this.canvas.height = a.h),
      (this.canvas.style.width = b.w),
      (this.canvas.style.height = b.h),
      this.ctx.drawImage(this.tCtx.canvas, 0, 0);
  }),
  (O.Stage.prototype.dynamicSize = function(a, b) {
    this.dynamic.attachOnResize.call(this, a, b);
  }),
  (O.Stage.prototype.dynamicSizeOff = function() {
    this.dynamic.detatchOnResize.call(this);
  }),
  (O.Stage.prototype.size = function() {
    var a = this;
    return { w: a.canvas.width, h: a.canvas.height };
  }),
  (O.Stage.prototype.scale = function() {
    var a = this;
    return { w: a.canvas.style.width, h: a.canvas.style.height };
  }),
  (O.Stage.prototype.center = function() {
    var a = this;
    return { x: a.canvas.width / 2, y: a.canvas.height / 2 };
  }),
  (O.Stage.prototype.clear = function() {
    var a = this.size();
    this.ctx.clearRect(0, 0, a.w, a.h);
  }),
  (O.Stage.prototype.draw = function() {
    for (var a = 0, b = this.shapes.length; b > a; a++)
      this.shapes[a].update(this.ctx);
  }),
  (O.Stage.prototype.update = function() {}),
  (O.Timer = function(a) {
    (this.listeners = []),
      (this.now = Date.now()),
      (this.lastTick = this.now),
      (this.tickCount = 0),
      (this.requestCount = 0),
      (this.basePlaybackRate = 60),
      (this.playbackRates = { high: 60, mid: 30, low: 15, verylow: 12 }),
      (this.fps = this.playbackRates[a] || 60),
      (this.playing = !1),
      (this.animationFrameID = void 0),
      (this.nativeSupport = (function(a, b) {
        for (
          var c = ["ms", "moz", "webkit", "o"],
            d = c.length,
            e = 0,
            f = { request: !0, cancel: !0 };
          d > e && !a.requestAnimationFrame;
          ++e
        )
          (a.requestAnimationFrame = a[c[e] + "RequestAnimationFrame"]),
            (a.cancelAnimationFrame =
              a[c[e] + "CancelAnimationFrame"] ||
              a[c[e] + "CancelRequestAnimationFrame"]);
        return (
          a.requestAnimationFrame ||
            ((f.request = !1),
            (a.requestAnimationFrame = function(c) {
              var d = a.setTimeout(function() {
                c();
              }, b);
              return d;
            })),
          a.cancelAnimationFrame ||
            ((f.cancel = !1),
            (a.cancelAnimationFrame = function(a) {
              clearTimeout(a);
            })),
          f
        );
      })(window, this.interval)),
      (this.interval = this.nativeSupport.request
        ? 60 / this.fps
        : 1e3 / this.fps);
  }),
  (O.Timer.prototype.constructor = O.Timer),
  (O.Timer.prototype.rateModifier = function() {
    return this.basePlaybackRate / this.fps;
  }),
  (O.Timer.prototype.addListener = function(a) {
    this.listeners.push(a);
  }),
  (O.Timer.prototype.removeListener = function(a) {
    for (var b = this.listener.length; b >= 0; b--)
      if (this.listeners[b] === a) return void this.listeners.splice(b, 1);
  }),
  (O.Timer.prototype.start = function() {
    (this.playing = !0), this.update();
  }),
  (O.Timer.prototype.stop = function() {
    (this.playing = !1),
      cancelAnimationFrame(this.animationFrameID),
      (this.animationFrameID = void 0);
  }),
  (O.Timer.prototype.update = function() {
    var a = this;
    return (
      this.requestCount++,
      this.playing
        ? (this.nativeSupport.request
            ? this.requestCount % this.interval === 0 && this.tick()
            : ((this.now = Date.now()),
              this.now - this.lastTick >= this.interval &&
                ((this.lastTick = this.now), this.tick())),
          void (this.animationFrameID = requestAnimationFrame(function() {
            a.update();
          })))
        : !1
    );
  }),
  (O.Timer.prototype.tick = function() {
    for (var a = 0, b = this.listeners.length; b > a; a++)
      this.listeners[a].update();
    this.tickCount++;
  }),
  $(function() {
    var a = O.Scene,
      b = O.Shape,
      c = O.Animator,
      d = 20,
      e = O.util,
      f = O.random,
      g = O.color,
      h = O.easing,
      j = [],
      k = 0,
      l = { w: 400, h: 400 },
      m = new a("canvas-handle", "fast", { size: l, scale: l }),
      n = function(a) {
        var b,
          c = 500;
        window.onresize = function() {
          void 0 !== b && clearTimeout(b),
            (b = setTimeout(function() {
              a();
            }, c));
        };
      },
      o = function() {
        for (var a = 0, b = j.length; b > a; a++) j[a].start();
        m.start();
      },
      p = function() {
        var a,
          b = Math.random();
        return (
          (a =
            b >= 0.66666
              ? "130,140 130,300 300,380 470,300 470,100 300,20 130,100 300,180 300,340"
              : b >= 0.33333
              ? "270,125 50,400 300,500 550,400 300,100 300,470"
              : "430,470 300,300 150,500 450,500 700,320 570,150 330,285"),
          [a, { lineType: "solid", lineWidth: 1, strokeStyle: "#ffffff" }]
        );
      },
      q = function(a) {
        var c = p(),
          d = new b(c[0], c[1]),
          h = d.centroid(),
          i = a.stage.center(),
          j = f.randPos(1.5),
          k = e.addVecs(
            {
              x: i.x * Math.random() * f.posNeg() * 1.5,
              y: i.y * Math.random() * f.posNeg() * 1.5,
            },
            e.subtractVecs(i, h)
          );
        return (
          (d.strokeStyle = g.changeHue(d.strokeStyle, f.randPosNeg(20))),
          (d.opacity = j / 1.3),
          d.scale(j / 2, e.stringFromVec(h)),
          d.translate(e.stringFromVec(k)),
          d.rotate(
            f.randPosNeg(O.util.toRadians(20)),
            e.stringFromVec(d.centroid())
          ),
          a.addShapesToStage([d]),
          d
        );
      },
      r = function(a, b, d) {
        var e = new c(a);
        return (
          (e.duration = 240),
          (e.current = 0),
          (e.startRotation = 0),
          (e.nextRotation = void 0),
          (e.startOpacity = void 0),
          (e.nextOpacity = void 0),
          (e.startPos = {}),
          (e.destination = {}),
          (e.newDestination = function() {
            var a = m.stage.size().w,
              b = m.stage.size().h,
              c = 0.3,
              d = 0.7,
              e = { x: a / 2, y: 0 };
            this.destination = (function() {
              for (; e.x > a * c && e.x < a * d; )
                e = { x: a * Math.random() * 1.5, y: b * Math.random() * 1.5 };
              return e;
            })();
          }),
          e.addSequence(b, d),
          e.orderSequences([d]),
          e
        );
      },
      s = function() {
        var a,
          b,
          c = function(a) {
            var b;
            return (
              this.current >= this.duration && (this.current = 0),
              0 === this.current &&
                ((this.startPos = a.centroid()),
                (this.startRotation = a.currentRotation),
                (this.startOpacity = a.opacity),
                (this.nextRotation = O.util.toRadians(
                  O.random.randPosNeg(270)
                )),
                (this.nextOpacity = f.randPos(1.5)),
                this.newDestination()),
              (b = {
                x: h.tween(
                  "quart",
                  this.current,
                  this.startPos.x,
                  this.destination.x,
                  this.duration
                ),
                y: h.tween(
                  "quart",
                  this.current,
                  this.startPos.y,
                  this.destination.y,
                  this.duration
                ),
              }),
              (a.opacity = h.tween(
                "cubic",
                this.current,
                this.startOpacity,
                this.nextOpacity / 2,
                this.duration
              )),
              a.translateTo(e.stringFromVec(b)),
              a.scale(
                h.tween(
                  "cubic",
                  this.current,
                  this.startOpacity,
                  this.nextOpacity / 2,
                  this.duration
                ),
                e.stringFromVec(b)
              ),
              a.rotateTo(
                h.tween(
                  "cubic",
                  this.current,
                  this.startRotation,
                  this.nextRotation,
                  this.duration
                ),
                e.stringFromVec(this.startPos)
              ),
              this.current++,
              this.current === this.duration &&
                (this.stop(), (this.current = 0), k++),
              !1
            );
          };
        for (i = 0; d >= i; i++)
          (a = q(m)), (b = r(a, c, "translate")), j.push(b);
      };
    m
      .loop(function() {
        var a = 0,
          b = j.length;
        if (k >= j.length - 1) return this.stop(), (k = 0), !1;
        for (; b > a; a++) j[a].update();
      })
      .size("dynamic"),
      s(),
      o(),
      n(o);
  }),
  $(function() {
    var a = function() {
      return document.implementation.hasFeature(
        "http://www.w3.org/TR/SVG11/feature#Image",
        "1.1"
      );
    };
    a() ||
      $('img[ src*="svg" ]').attr("src", function() {
        return $(this)
          .attr("src")
          .replace("svg/min", "png")
          .replace(".svg", ".png");
      });
  }),
  $(function() {
    var a = $("#nav_trigger"),
      b = ($("#main_site_navigation"), $("#site_wrapper"), $("body")),
      c = !0,
      d = !0,
      e = function() {
        b.removeClass("open_menu"), (d = !1);
      },
      f = function() {
        b.addClass("open_menu"), (d = !0);
      };
    a.on("click", function(a) {
      return c && (d ? e() : f()), a.preventDefault(), !1;
    }),
      $(window).on("resize", function() {
        e();
      }),
      e();
  });
