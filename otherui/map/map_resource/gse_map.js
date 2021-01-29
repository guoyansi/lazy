window.TILE_VERSION = {
	"ditu": {
		"normal": {
			"version": "088",
			"updateDate": "20210122"
		},
		"satellite": {
			"version": "009",
			"updateDate": "20210122"
		},
		"normalTraffic": {
			"version": "081",
			"updateDate": "20210122"
		},
		"satelliteTraffic": {
			"version": "083",
			"updateDate": "20210122"
		},
		"mapJS": {
			"version": "104",
			"updateDate": "20210122"
		},
		"satelliteStreet": {
			"version": "083",
			"updateDate": "20210122"
		},
		"earthVector": {
			"version": "001",
			"updateDate": "20210122"
		}
	},
	"webapp": {
		"high_normal": {
			"version": "001",
			"updateDate": "20210122"
		},
		"lower_normal": {
			"version": "002",
			"updateDate": "20210122"
		}
	},
	"api_for_mobile": {
		"vector": {
			"version": "002",
			"updateDate": "20210122"
		},
		"vectorIcon": {
			"version": "002",
			"updateDate": "20210122"
		}
	}
};
window.MSV = {};
//window.BMAP_AUTHENTIC_KEY = "ZgbjDUBzYetlX3DFwOq28rCEtdU7KrMx";
window.BMAP_AUTHENTIC_KEY = bd_map_cfg.ak;
window.BMapGL = window.BMapGL || {};
(function(bo, eA) {
	var C = C || {
		version: "20150702",
		emptyFn: function() {}
	};
	(function() {
		C._log = [];
		var i = 0;
		var T = {};
		C.BaseClass = function(hQ) {
			T[(this.hashCode = (hQ || C.BaseClass.guid()))] = this
		};
		C.BaseClass.guid = function() {
			return "mz_" + (i++).toString(36)
		};
		C.BaseClass.create = function() {
			var hQ = new C.BaseClass();
			hQ.decontrol();
			return hQ
		};
		var e = C.instance = C.I = function(hQ) {
			return T[hQ]
		};
		C.BaseClass.prototype.dispose = function() {
			if(this.hashCode) {
				delete T[this.hashCode]
			}
			for(var hQ in this) {
				if(typeof this[hQ] != "function") {
					delete this[hQ]
				}
			}
		};
		C.BaseClass.prototype.getHashCode = function() {
			if(!this.hashCode) {
				T[(this.hashCode = C.BaseClass.guid())] = this
			}
			return this.hashCode
		};
		C.BaseClass.prototype.decontrol = function() {
			delete T[this.hashCode]
		};
		C.BaseClass.prototype.toString = function() {
			return "[object " + (this._className || "Object") + "]"
		};
		C.BaseClass.prototype._wlog = function(hR, hS) {
			var hQ = C._log;
			if(hQ.length > 100) {
				hQ.reverse().length = 50;
				hQ.reverse()
			}
			hQ[hQ.length] = "[" + hR + "][" + (this._className || "Object") + " " + this.hashCode + "] " + hS
		}
	})();
	Function.prototype.inherits = function(hQ, T) {
		var e, hR, hT = this.prototype,
			hS = function() {};
		hS.prototype = hQ.prototype;
		hR = this.prototype = new hS();
		if(typeof(T) == "string") {
			hR._className = T
		}
		for(e in hT) {
			hR[e] = hT[e]
		}
		this.prototype.constructor = hT.constructor;
		hT = hS = null;
		return hR
	};
	C.BaseEvent = function(e, i) {
		this.type = e;
		this.returnValue = true;
		this.target = i || null;
		this.currentTarget = this.srcElement = null;
		this.cancelBubble = false;
		this.domEvent = null
	};
	C.BaseClass.prototype.on = C.BaseClass.prototype.addEventListener = function(T, i) {
		if(typeof i !== "function") {
			return this._wlog("error", "addEventListener:" + i + " is not a function")
		}
		if(!this._listeners) {
			this._listeners = {}
		}
		var e = this._listeners;
		if(T.indexOf("on") !== 0) {
			T = "on" + T
		}
		if(typeof e[T] !== "object") {
			e[T] = {}
		}
		var hQ = i.hashCode || C.BaseClass.guid();
		i.hashCode = hQ;
		if(e[T][hQ]) {
			this._wlog("warning", "repeat key:" + hQ)
		}
		e[T][hQ] = i
	};
	C.BaseClass.prototype.off = C.BaseClass.prototype.removeEventListener = function(T, i) {
		if(typeof i == "function") {
			i = i.hashCode
		} else {
			if(typeof i !== "string" && typeof i !== "undefined") {
				return
			}
		}
		if(!this._listeners) {
			this._listeners = {}
		}
		if(T.indexOf("on") != 0) {
			T = "on" + T
		}
		var e = this._listeners;
		if(!e[T]) {
			return
		}
		if(i === undefined) {
			e[T] = {};
			return
		}
		if(e[T][i]) {
			delete e[T][i]
		}
	};
	C.BaseClass.prototype.fire = C.BaseClass.prototype.dispatchEvent = function(hQ) {
		if(!this._listeners) {
			this._listeners = {}
		}
		var T, e = this._listeners,
			hR = hQ.type;
		hQ.target = hQ.srcElement = hQ.target || hQ.srcElement || this;
		hQ.currentTarget = this;
		if(typeof this[hR] == "function") {
			this[hR](hQ)
		}
		if(typeof e[hR] == "object") {
			for(T in e[hR]) {
				if(typeof e[hR][T] == "function") {
					e[hR][T].call(this, hQ)
				}
			}
		}
		return hQ.returnValue
	};
	C.BaseEvent.prototype.inherit = function(T) {
		var i = this;
		this.domEvent = T = window.event || T;
		i.clientX = T.clientX || T.pageX;
		i.clientY = T.clientY || T.pageY;
		i.offsetX = T.offsetX || T.layerX;
		i.offsetY = T.offsetY || T.layerY;
		i.screenX = T.screenX;
		i.screenY = T.screenY;
		i.ctrlKey = T.ctrlKey || T.metaKey;
		i.shiftKey = T.shiftKey;
		i.altKey = T.altKey;
		return i
	};
	C.Browser = (function() {
		var T = navigator.userAgent;
		var hR = 0;
		var e = 0;
		var hS = 0;
		var i = 0;
		var hW = 0;
		var hU = 0;
		var hV = 0;
		var hT = 0;
		var hQ = 0;
		var hX = 0;
		if(typeof window.opera === "object" && /Opera(\s|\/)(\d+(\.\d+)?)/.test(T)) {
			hS = parseFloat(RegExp.$2)
		} else {
			if(/OPR(\/(\d+)(\..?)?)/.test(T)) {
				hS = parseInt(RegExp.$2, 10)
			} else {
				if(/Edge\/((\d+)\.\d+)/.test(T)) {
					hR = parseInt(RegExp.$2, 10)
				} else {
					if(/MSIE (\d+(\.\d+)?)/.test(T)) {
						e = parseFloat(RegExp.$1)
					} else {
						if(T.indexOf("Trident") > -1 && /rv:(\d+(\.\d+)?)/.test(T)) {
							e = parseInt(RegExp.$1, 10)
						} else {
							if(/Firefox(\s|\/)(\d+(\.\d+)?)/.test(T)) {
								hW = parseFloat(RegExp.$2)
							} else {
								if(navigator.vendor === "Netscape" && /Netscape(\s|\/)(\d+(\.\d+)?)/.test(T)) {
									hV = parseFloat(RegExp.$2)
								} else {
									if(T.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(T)) {
										i = parseFloat(RegExp.$1)
									}
								}
							}
						}
					}
				}
			}
		}
		if(T.indexOf("Trident") > -1 && /Trident\/(\d+(\.\d+)?)/.test(T)) {
			hT = parseInt(RegExp.$1, 10)
		} else {
			if(!e && !hR && T.indexOf("Gecko") > -1 && T.indexOf("KHTML") === -1 && /rv\:(\d+(\.\d+)?)/.test(T)) {
				hQ = parseFloat(RegExp.$1)
			} else {
				if(!hR && /chrome\/(\d+(\.\d+)?)/i.test(T)) {
					hU = parseFloat(RegExp.$1)
				} else {
					if(!hR && /AppleWebKit\/(\d+(\.\d+)?)/.test(T)) {
						hX = parseInt(RegExp.$1, 10)
					}
				}
			}
		}
		var hY = {
			edge: hR,
			ie: e,
			firefox: hW,
			netscape: hV,
			opera: hS,
			safari: i,
			chrome: hU,
			gecko: hQ,
			trident: hT,
			webkit: hX
		};
		return hY
	})();
	window.FeBrowser = C.Browser;
	C.Dom = {};
	C.Dom.createDom = function(i, e) {
		if(C.isIE && e && e.name) {
			i = "<" + i + ' name="' + C.String.escapeHTML(e.name) + '">'
		}
		var T = document.createElement(i);
		if(e) {
			C.Dom.setProperties(T, e)
		}
		return T
	};
	C.Dom.getOffset = function(hQ) {
		var hT = C.Dom.getOwnerDocument(hQ);
		var hS = C.isGecko > 0 && hT.getBoxObjectFor && C.Dom.getStyle(hQ, "position") == "absolute" && (hQ.style.top === "" || hQ.style.left === "");
		var hU = {
			left: 0,
			top: 0
		};
		var i = (C.isIE && !C.isStrict) ? hT.body : hT.documentElement;
		if(hQ == i) {
			return hU
		}
		var T = null;
		var hR;
		if(hQ.getBoundingClientRect) {
			hR = hQ.getBoundingClientRect();
			hU.left = hR.left + Math.max(hT.documentElement.scrollLeft, hT.body.scrollLeft);
			hU.top = hR.top + Math.max(hT.documentElement.scrollTop, hT.body.scrollTop);
			hU.left -= hT.documentElement.clientLeft;
			hU.top -= hT.documentElement.clientTop;
			if(C.isIE && !C.isStrict) {
				hU.left -= 2;
				hU.top -= 2
			}
		} else {
			if(hT.getBoxObjectFor && !hS) {
				hR = hT.getBoxObjectFor(hQ);
				var e = hT.getBoxObjectFor(i);
				hU.left = hR.screenX - e.screenX;
				hU.top = hR.screenY - e.screenY
			} else {
				T = hQ;
				do {
					hU.left += T.offsetLeft;
					hU.top += T.offsetTop;
					if(C.isWebkit > 0 && C.Dom.getStyle(T, "position") == "fixed") {
						hU.left += hT.body.scrollLeft;
						hU.top += hT.body.scrollTop;
						break
					}
					T = T.offsetParent
				} while (T && T != hQ);
				if(C.isOpera > 0 || (C.isWebkit > 0 && C.Dom.getStyle(hQ, "position") == "absolute")) {
					hU.top -= hT.body.offsetTop
				}
				T = hQ.offsetParent;
				while(T && T != hT.body) {
					hU.left -= T.scrollLeft;
					if(!C.isOpera || T.tagName != "TR") {
						hU.top -= T.scrollTop
					}
					T = T.offsetParent
				}
			}
		}
		return hU
	};
	C.Dom.getOwnerDocument = function(e) {
		return e.nodeType == 9 ? e : e.ownerDocument || e.document
	};
	C.Dom.setProperties = function(i, e) {
		C.each(e, function(hQ, T) {
			C.Dom._setProperty(i, T, hQ)
		})
	};
	C.Dom._setProperty = function(i, e, T) {
		if(e == "style") {
			i.style.cssText = T
		} else {
			if(e == "class") {
				i.className = T
			} else {
				if(e == "for") {
					i.htmlFor = T
				} else {
					if(e in C.Dom._DIRECT_ATTRIBUTE_MAP) {
						i.setAttribute(C.Dom._DIRECT_ATTRIBUTE_MAP[e], T)
					} else {
						i[e] = T
					}
				}
			}
		}
	};
	C.Dom._DIRECT_ATTRIBUTE_MAP = {
		cellpadding: "cellPadding",
		cellspacing: "cellSpacing",
		colspan: "colSpan",
		rowspan: "rowSpan",
		valign: "vAlign",
		height: "height",
		width: "width",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	C.G = function() {
		for(var T = [], hQ = arguments.length - 1; hQ > -1; hQ--) {
			var hR = arguments[hQ];
			T[hQ] = null;
			if(typeof hR == "object" && hR && hR.dom) {
				T[hQ] = hR.dom
			} else {
				if((typeof hR == "object" && hR && hR.tagName) || hR == window || hR == document) {
					T[hQ] = hR
				} else {
					if(typeof hR == "string" && (hR = document.getElementById(hR))) {
						T[hQ] = hR
					}
				}
			}
		}
		return T.length < 2 ? T[0] : T
	};
	C.ac = function(e, i) {
		if(!(e = this.G(e))) {
			return
		}
		i = this.trim(i);
		if(!new RegExp("(^| )" + i.replace(/(\W)/g, "\\$1") + "( |$)").test(e.className)) {
			e.className = e.className.split(/\s+/).concat(i).join(" ")
		}
	};
	C.addClassName = C.ac;
	C.each = function(hS, e) {
		if(typeof e != "function") {
			return hS
		}
		if(hS) {
			if(hS.length === undefined) {
				for(var T in hS) {
					e.call(hS[T], hS[T], T)
				}
			} else {
				for(var hQ = 0, hR = hS.length; hQ < hR; hQ++) {
					e.call(hS[hQ], hS[hQ], hQ)
				}
			}
		}
		return hS
	};
	C.extend = function(hS, hQ) {
		if(hS && hQ && typeof(hQ) == "object") {
			for(var hR in hQ) {
				hS[hR] = hQ[hR]
			}
			var T = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
			for(var e = 0, i; e < T.length; e++) {
				i = T[e];
				if(Object.prototype.hasOwnProperty.call(hQ, i)) {
					hS[i] = hQ[i]
				}
			}
		}
		return hS
	};
	C.hide = function() {
		C.each(arguments, function(e) {
			if(e = C.G(e)) {
				e.style.display = "none"
			}
		})
	};
	C.inherit = function(hU, hQ, T) {
		var hT = hU.prototype;
		var hS = function() {};
		hS.prototype = hQ.prototype;
		var hR = hU.prototype = new hS();
		if(typeof T == "string") {
			hR._className = T
		}
		for(var e in hT) {
			hR[e] = hT[e]
		}
		hU.prototype.constructor = hT.constructor;
		hT = null;
		return hR
	};
	C.isIE = 0;
	(function() {
		if(navigator.userAgent.indexOf("MSIE") > 0 && !window.opera) {
			/MSIE (\d+(\.\d+)?)/.test(navigator.userAgent);
			C.isIE = parseFloat(RegExp.$1)
		}
	})();
	C.rc = function(e, i) {
		if(!(e = this.G(e))) {
			return
		}
		i = this.trim(i);
		var T = e.className.replace(new RegExp("(^| +)" + i.replace(/(\W)/g, "\\$1") + "( +|$)", "g"), "$2");
		if(e.className != T) {
			e.className = T
		}
	};
	C.removeClassName = C.rc;
	C.show = function() {
		this.each(arguments, function(e) {
			if(e = C.G(e)) {
				e.style.display = ""
			}
		})
	};
	C.trim = function(e) {
		return e.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "")
	};
	C.getElementsByClassName = function(e, i) {
		if(e.getElementsByClassName) {
			return e.getElementsByClassName(i)
		} else {
			return(function T(hX, hV) {
				if(hV == null) {
					hV = document
				}
				var hU = [],
					hT = hV.getElementsByTagName("*"),
					hQ = hT.length,
					hW = new RegExp("(^|\\s)" + hX + "(\\s|$)"),
					hS, hR;
				for(hS = 0, hR = 0; hS < hQ; hS++) {
					if(hW.test(hT[hS].className)) {
						hU[hR] = hT[hS];
						hR++
					}
				}
				return hU
			})(i, e)
		}
	};
	C.toggleClass = function(e, i) {
		if(C.hasClass(e, i)) {
			C.removeClassName(e, i)
		} else {
			C.addClassName(e, i)
		}
	};
	C.hasClass = function(hQ, T) {
		if(!hQ || !hQ.className || typeof hQ.className != "string") {
			return false
		}
		var i = -1;
		try {
			i = hQ.className == T || hQ.className.search(new RegExp("(\\s|^)" + T + "(\\s|$)"))
		} catch(hR) {
			return false
		}
		return i > -1
	};
	C.insertHTML = function(hQ, e, T) {
		hQ = C.G(hQ);
		if(hQ === null) {
			return hQ
		}
		var i, hR;
		if(hQ.insertAdjacentHTML) {
			hQ.insertAdjacentHTML(e, T)
		} else {
			i = hQ.ownerDocument.createRange();
			e = e.toUpperCase();
			if(e == "AFTERBEGIN" || e == "BEFOREEND") {
				i.selectNodeContents(hQ);
				i.collapse(e == "AFTERBEGIN")
			} else {
				hR = e == "BEFOREBEGIN";
				i[hR ? "setStartBefore" : "setEndAfter"](hQ);
				i.collapse(hR)
			}
			i.insertNode(i.createContextualFragment(T))
		}
		return hQ
	};
	if(typeof HTMLElement != "undefined" && HTMLElement.prototype.__lookupGetter__ && !HTMLElement.prototype.__lookupGetter__("children") && !window.opera) {
		try {
			HTMLElement.prototype.__defineGetter__("children", function() {
				for(var T = [], hQ = 0, hS, hR = 0, e = this.childNodes.length; hR < e; hR++) {
					hS = this.childNodes[hR];
					if(hS.nodeType == 1) {
						T[hQ++] = hS;
						if(hS.name) {
							if(!T[hS.name]) {
								T[hS.name] = []
							}
							T[hS.name][T[hS.name].length] = hS
						}
						if(hS.id) {
							T[hS.id] = hS
						}
					}
				}
				return T
			})
		} catch(gv) {}
	}
	if(typeof(HTMLElement) != "undefined" && !window.opera && HTMLElement.prototype && !HTMLElement.prototype.insertAdjacentHTML) {
		HTMLElement.prototype.insertAdjacentHTML = function(i, T) {
			var hQ = this.ownerDocument.createRange();
			hQ.setStartBefore(this);
			hQ = hQ.createContextualFragment(T);
			switch(i) {
				case "beforeBegin":
					this.parentNode.insertBefore(hQ, this);
					break;
				case "afterBegin":
					this.insertBefore(hQ, this.firstChild);
					break;
				case "beforeEnd":
					this.appendChild(hQ);
					break;
				case "afterEnd":
					if(!this.nextSibling) {
						this.parentNode.appendChild(hQ)
					} else {
						this.parentNode.insertBefore(hQ, this.nextSibling)
					}
					break
			}
		}
	}
	if(typeof HTMLElement != "undefined" && !window.opera) {
		HTMLElement.prototype.contains = function(e) {
			if(e == this) {
				return true
			}
			while(e = e.parentNode) {
				if(e == this) {
					return true
				}
			}
			return false
		}
	}
	if(!C.Browser.ie && typeof Event != "undefined" && !window.opera) {
		Event.prototype.__defineSetter__("returnValue", function(e) {
			if(!e) {
				this.preventDefault()
			}
			return e
		});
		Event.prototype.__defineSetter__("cancelBubble", function(e) {
			if(e) {
				this.stopPropagation()
			}
			return e
		})
	}
	C.each = function(hR, hQ) {
		if(bV(hQ)) {
			for(var T = 0, e = hR.length; T < e; T++) {
				if(hQ.call(hR, hR[T], T) === false) {
					break
				}
			}
		}
		return hR
	};
	C.Platform = {
		x11: 0,
		macintosh: 0,
		windows: 0,
		android: 0,
		iphone: 0,
		ipad: 0
	};
	for(var gr in C.Platform) {
		if(C.Platform.hasOwnProperty(gr)) {
			C.Platform[gr] = new RegExp(gr, "i").test(window.navigator.userAgent) ? 1 : 0
		}
	}
	if(typeof(C.Dom) === "undefined") {
		C.Dom = {}
	}
	C.Dom.getComputedStyle = function(i, e) {
		var hQ = i.nodeType == 9 ? i : i.ownerDocument || i.document,
			T;
		if(hQ.defaultView && hQ.defaultView.getComputedStyle) {
			T = hQ.defaultView.getComputedStyle(i, null);
			if(T) {
				return T[e] || T.getPropertyValue(e)
			}
		} else {
			if(i.currentStyle) {
				return i.currentStyle[e] || ""
			}
		}
		return ""
	};
	var bb = C.BaseEvent;
	var ed = C.BaseClass;
	ed.prototype.toString = function() {
		return this._className || ""
	};
	C.on = function(T, i, e) {
		if(!(T = C.G(T))) {
			return T
		}
		i = i.replace(/^on/, "");
		if(T.addEventListener) {
			T.addEventListener(i, e, false)
		} else {
			if(T.attachEvent) {
				T.attachEvent("on" + i, e)
			}
		}
		return T
	};
	C.un = function(T, i, e) {
		if(!(T = C.G(T))) {
			return T
		}
		i = i.replace(/^on/, "");
		if(T.removeEventListener) {
			T.removeEventListener(i, e, false)
		} else {
			if(T.detachEvent) {
				T.detachEvent("on" + i, e)
			}
		}
		return T
	};
	C.hc = function(hQ, T) {
		if(!hQ || !hQ.className || typeof hQ.className != "string") {
			return false
		}
		var i = -1;
		try {
			i = hQ.className == T || hQ.className.search(new RegExp("(\\s|^)" + T + "(\\s|$)"))
		} catch(hR) {
			return false
		}
		return i > -1
	};
	C.isEmptyObject = function(T) {
		if(Object.prototype.toString.call(T) === "[object Object]") {
			for(var e in T) {
				return false
			}
			return true
		} else {
			return false
		}
	};
	var eV = {
		fontFamily: 'Arial,Helvetica,"PingFang SC","Hiragino Sans GB",STHeiti,sans-serif',
		mapStyleNameIdPair: {
			"default": 0,
			"grayed-out": 1
		},
		mapHost: window.location.protocol + "//map.baidu.com",
		apiHost: window.location.protocol + "//api.map.baidu.com",
		//apiHost_guoyansi: window.location.protocol+"//my_map/",
		apiIMG: window.location.protocol + "//api.map.baidu.com/images",
		staticHost: window.location.protocol + "//webmap0.bdimg.com",
		//imgPath: window.location.protocol + "//webmap0.bdimg.com/image/api/",
		imgPath:bd_map_cfg.host_dir+"img/",
		tileDomain: [window.location.protocol + "//maponline0.bdimg.com", window.location.protocol + "//maponline1.bdimg.com", window.location.protocol + "//maponline2.bdimg.com", window.location.protocol + "//maponline3.bdimg.com"],
		optDomain: "http://10.120.25.45:8017",
		rasterTilePath: "/tile/",
		vectorTilePath: "/pvd/",
		originTilePath: [window.location.protocol + "//pcor.baidu.com"],
		getIconSetPath: function(e) {
			var i = "map_icons2x/";
			if(typeof e === "string" && this.mapStyleNameIdPair[e] > 0) {
				i = "map_icons2x_" + (this.mapStyleNameIdPair[e] - 1) + "/"
			}
			return window.location.protocol + "//maponline0.bdimg.com/sty/" + i
		},
		getMapStyleFiles: function(T) {
			var hR = true;
			if(typeof T === "string" && T !== "default") {
				hR = false
			}
			var hS = hR ? "" : "_" + (this.mapStyleNameIdPair[T] - 1);
			var i = fz();
			var hQ = "udt=" + i.udt + "&v=" + i.ver;
			var e=bd_map_cfg.host_dir;
			//var e = window.location.protocol + "//maponline0.bdimg.com/sty/";
			return [e + "icons_2x" + hS + ".js?" + hQ, e + "fs" + hS + ".js?" + hQ, e + "indoor_fs.js?" + hQ]
			//return "icons_2x.js";
		},
		tvc: {
			ditu: {
				normal: {
					version: "088",
					updateDate: "20190618"
				},
				satellite: {
					version: "009",
					updateDate: "20190618"
				},
				normalTraffic: {
					version: "081",
					updateDate: "20190618"
				},
				satelliteTraffic: {
					version: "083",
					updateDate: "20190618"
				},
				mapJS: {
					version: "104",
					updateDate: "20190618"
				},
				satelliteStreet: {
					version: "083",
					updateDate: "20190618"
				},
				panoClick: {
					version: "1033",
					updateDate: "20180108"
				},
				panoUdt: {
					version: "20180108",
					updateDate: "20180108"
				},
				panoSwfAPI: {
					version: "20150123",
					updateDate: "20150123"
				},
				panoSwfPlace: {
					version: "20141112",
					updateDate: "20141112"
				},
				earthVector: {
					version: "001",
					updateDate: "20190618"
				}
			}
		},
		msv: {
			mapstyle: {
				updateDate: "20190108",
				version: "001"
			}
		}
	};
	eV.imgResources = {
		blankGIF: eV.staticHost + "/res/litemapapi/v1d1/images/blank.gif?20170501",
		markerPng: eV.staticHost + "/res/litemapapi/v1d1/images/marker.png?20170501",
		locPng: eV.staticHost + "/res/litemapapi/v1d1/images/loc.png?20180918",
		locNewPng: eV.staticHost + "/res/litemapapi/v1d1/images/loc_new.png?20190314",
		zoomPng: eV.staticHost + "/res/litemapapi/v1d1/images/zoombtn.png?20180918",
		mapLogoPng: eV.staticHost + "/res/litemapapi/v1d1/images/logo-2x.png?20190226"
	};
	var e3 = eV;
	var a3 = "ruler.cur";
	if(C.Browser.ie || C.Browser.edge) {
		C.extend(e3, {
			distCursor: "url(" + e3.imgPath + a3 + "),crosshair",
			defaultCursor: "url(" + e3.imgPath + "openhand.cur),default",
			draggingCursor: "url(" + e3.imgPath + "closedhand.cur),move"
		})
	} else {
		if(C.Browser.firefox) {
			C.extend(e3, {
				distCursor: "url(" + e3.imgPath + a3 + "),crosshair",
				defaultCursor: "-moz-grab",
				draggingCursor: "-moz-grabbing"
			})
		} else {
			if(C.Browser.chrome || C.Browser.safari) {
				C.extend(e3, {
					distCursor: "url(" + e3.imgPath + a3 + ") 2 6,crosshair",
					defaultCursor: "url(" + e3.imgPath + "openhand.cur) 8 8,default",
					draggingCursor: "url(" + e3.imgPath + "closedhand.cur) 8 8,move"
				});
				if(C.Platform.macintosh) {
					e3.defaultCursor = "-webkit-grab";
					e3.draggingCursor = "-webkit-grabbing"
				}
			} else {
				C.extend(e3, {
					distCursor: "url(" + e3.imgPath + a3 + "),crosshair",
					defaultCursor: "url(" + e3.imgPath + "openhand.cur),default",
					draggingCursor: "url(" + e3.imgPath + "closedhand.cur),move"
				})
			}
		}
	}
	bo = bo || {};
	bo.version = "3.0";
	bo._register = [];
	bo.register = function(e) {
		this._register[this._register.length] = e
	};
	bo.guid = 1;
	bo.getGUID = function(e) {
		return(e || "") + bo.guid++
	};
	var gd = window.BMAP_AUTHENTIC_KEY || "";
	bo.bmapVerifyCbk = function(e) {
		if(e && e.error !== 0) {
			if(typeof map !== "undefined") {
				map.getContainer().innerHTML = "";
				map.__listeners = {}
			}
			bo = null;
			var i = "百度未授权使用地图API，可能是因为您提供的密钥不是有效的百度LBS开放平台密钥，或此密钥未对本应用的百度地图JavaScriptAPI授权。您可以访问如下网址了解如何获取有效的密钥：http://lbsyun.baidu.com/apiconsole/key#。";
			switch(e.error) {
				case 101:
					i = "开发者禁用了该ak的jsapi服务权限。您可以访问如下网址了解如何获取有效的密钥：http://lbsyun.baidu.com/apiconsole/key#。";
					break;
				case 102:
					i = "开发者Referer不正确。您可以访问如下网址了解如何获取有效的密钥：http://lbsyun.baidu.com/apiconsole/key#。";
					break
			}
			alert(i)
		}
	};
	bo.verify = function() {
		//var e = e3.apiHost + "/?qt=verify&ak=" + gd + "&callback=" + eA + ".bmapVerifyCbk";
		var e = bd_map_cfg.host_dir+"bmapVerifyCbk_gse.js";
		hl.load(e)
	};
	bo.apiLoad = bo.apiLoad || function() {};

	function fK(i, e) {
		this._size = i;
		this._cache = [];
		this._totalGetTimes = 0;
		this._totalHitTimes = 0;
		this._options = {
			clearCallback: null,
			removeOldCallback: null
		};
		e = e || {};
		for(var T in e) {
			if(e.hasOwnProperty(T)) {
				this._options[T] = e[T]
			}
		}
	}
	fK.prototype.setData = function(T, hQ) {
		var e = this._cache;
		var i = this._size;
		if(i === 0) {
			return
		}
		if(e.length > i) {
			this._removeOld()
		}
		if(!e[T]) {
			e.push(hQ)
		}
		e[T] = hQ;
		hQ._key_ = T
	};
	fK.prototype.getHitRate = function() {
		return Math.round(this._totalHitTimes / this._totalGetTimes * 1000) / 1000
	};
	fK.prototype.getData = function(i) {
		var e = this._cache[i];
		if(e) {
			this._totalHitTimes++
		}
		this._totalGetTimes++;
		return e
	};
	fK.prototype.removeData = function(hR) {
		if(this._options.clearCallback) {
			this._options.clearCallback(this._cache[hR])
		}
		var T = this._cache;
		var hS = T[hR];
		for(var hQ = 0, e = T.length; hQ < e; hQ++) {
			if(T[hQ] === hS) {
				T.splice(hQ, 1);
				break
			}
		}
		delete T[hR]
	};
	fK.prototype._removeOld = function() {
		var e = this._cache;
		var hR = Math.round(this._size * 0.6);
		for(var hQ = 0; hQ < hR; hQ++) {
			var T = e[hQ]._key_;
			if(this._options.clearCallback) {
				this._options.clearCallback(e[T])
			}
			delete e[T]
		}
		e.splice(0, hR);
		if(this._options.removeOldCallback) {
			this._options.removeOldCallback()
		}
	};
	fK.prototype.clear = function() {
		var T = this._cache;
		for(var hR = 0, e = T.length; hR < e; hR++) {
			var hQ = T[hR]._key_;
			if(this._options.clearCallback) {
				this._options.clearCallback(T[hQ])
			}
			delete T[hQ]
		}
		this._cache = T = []
	};
	fK.prototype.forEach = function(hQ) {
		var T = this._cache;
		for(var hS = 0, e = T.length; hS < e; hS++) {
			var hR = T[hS]._key_;
			hQ(T[hR])
		}
	};
	fK.prototype.getBatch = function(hR) {
		var e = [];
		for(var hQ = 0, T = hR.length; hQ < T; hQ++) {
			if(this.getData(hR[hQ])) {
				e[e.length] = this.getData(hR[hQ])
			}
		}
		return e
	};
	fK.prototype.clearExcept = function(hS) {
		var T = this._cache;
		for(var e = T.length, hR = e - 1; hR >= 0; hR--) {
			var hQ = this._cache[hR]._key_;
			if(!hS[hQ]) {
				T.splice(hR, 1);
				if(this._options.clearCallback) {
					this._options.clearCallback(T[hQ])
				}
				delete T[hQ]
			}
		}
	};
	fK.prototype.getDataCount = function() {
		return this._cache.length
	};

	function am() {}
	C.extend(am.prototype, {
		centerAndZoomIn: function(hV, T, hW) {
			var hT = this;
			if(!hV && !T) {
				return
			}
			hV = hV || this.centerPoint;
			T = T || this.zoomLevel;
			T = this._getProperZoom(T).zoom;
			if(this.mapType === BMAP_EARTH_MAP) {
				if(!this._earth) {
					this.mapType = BMAPGL_NORMAL_MAP;
					this.temp.originMapType = BMAP_EARTH_MAP;

					function hU() {
						hT._earth = new bo.Earth(hT, {
							showRealSunlight: hT.config.showRealSunlight,
							showMilkyway: hT.config.showMilkyway,
							earthBackground: hT.config.earthBackground
						});
						hT._proxyEarthEvents();
						hT._changeEarthMapType(BMAP_EARTH_MAP);
						C.extend(hT, bo.EarthView.prototype);
						if(!hT._navigationCtrl && hT.config.showControls) {
							hT._navigationCtrl = new bo.NavigationControl3D(hT)
						}
						delete hT.temp.originMapType
					}
					ea.load("earth", function() {
						if(bo["FeatureStyle" + hT.config.style]) {
							hU()
						} else {
							hT.loadMapStyleFiles(function() {
								hU()
							})
						}
					})
				}
			}
			this.lastLevel = this.zoomLevel || T;
			this.zoomLevel = T;
			var hR = new bb("onload");
			hR.point = hV;
			hR.zoom = T;
			this.centerPoint = this.restrictCenter(new hr(hV.lng, hV.lat));
			if(this.centerPoint.zoom) {
				this.zoomLevel = this.centerPoint.zoom
			}
			this.defaultZoomLevel = this.defaultZoomLevel || this.zoomLevel;
			this.defaultCenter = this.defaultCenter || this.centerPoint;
			if(!this.loaded && !(this.temp.originMapType === BMAP_EARTH_MAP)) {
				var i = this.config.defaultMaxBounds;
				var hS = new c5(i, "baidu", this.mapType);
				var hQ = new cR({
					mapType: this.mapType,
					copyright: hS,
					customLayer: false,
					baseLayer: true,
					tileTypeName: "web"
				});
				hQ._isInnerLayer = true;
				this.addTileLayer(hQ);
				if(this.mapType === BMAP_SATELLITE_MAP && this._isHybridShow === true) {
					this._addHybirdMap()
				}
			}
			this.dispatchEvent(hR);
			this.loaded = true;
			hW = hW || {};
			hW.callback && hW.callback()
		},
		_setPlatformPosition: function(hW, hV, hZ) {
			hZ = hZ || {};
			if(hW === 0 && hV === 0 && !hZ.point) {
				return
			}
			if(isNaN(hZ.initMapOffsetX)) {
				hZ.initMapOffsetX = this.offsetX
			}
			if(isNaN(hZ.initMapOffsetY)) {
				hZ.initMapOffsetY = this.offsetY
			}
			var hX = hW + hZ.initMapOffsetX;
			var hU = hV + hZ.initMapOffsetY;
			if(hZ.point) {
				var i = this.restrictCenter(hZ.point);
				if(!i.equals(this.centerPoint)) {
					this.centerPoint = i.clone();
					this.fire(new bb("oncenter_changed"))
				}
			} else {
				var hQ = this.offsetX - hX;
				var e = this.offsetY - hU;
				var T = this.getZoomUnits();
				var hT = this.centerPoint.lng;
				var hS = this.centerPoint.lat;
				var hR = new hr(hT, hS);
				this.centerPoint = this.restrictCenter(new hr(hR.lng + hQ * T, hR.lat - e * T), T);
				this.fire(new bb("oncenter_changed"));
				if(this.zoomLevel < 10) {
					hX = this.offsetX - (this.centerPoint.lng - hR.lng) / T;
					hU = this.offsetY + (this.centerPoint.lat - hR.lat) / T
				}
			}
			this.offsetX = hX;
			this.offsetY = hU;
			var hY = this.platform.style;
			hY.left = hX + "px";
			hY.top = hU + "px";
			this.maskLayer.style.left = -hX + "px";
			this.maskLayer.style.top = -hU + "px";
			if(hZ.dispatchEvent !== false) {
				this.dispatchEvent(new bb("onmoving"))
			}
		},
		zoomTo: function(e, hT, hX) {
			hX = hX || {};
			hX.zoomCenter = hT;
			if(hX.noAnimation !== true) {
				this.deepZoomTo(e, hX);
				return
			}
			if(typeof e !== "number") {
				return
			}
			var hR = b6[this.mapType];
			if(!hR) {
				return
			}
			var T = e;
			e = this._getProperZoom(e).zoom;
			if(e === this.zoomLevel) {
				var hU = new bb("onzoomexceeded");
				hU.targetZoom = T;
				this.dispatchEvent(hU);
				hX.callback && hX.callback();
				return
			}
			this.lastLevel = this.zoomLevel;
			if(hT) {
				this.temp._cPoint = hT;
				this.temp._cPixel = this.pointToPixelIn(hT)
			} else {
				if(this.getInfoWindow()) {
					var hW = this.getInfoWindow().getPoint();
					this.temp._cPixel = this.pointToPixelIn(hW);
					this.temp._cPoint = hW
				}
			}
			if(this.config.zoomCenter) {
				hT = this.config.zoomCenter;
				this.temp._cPoint = hT;
				this.temp._cPixel = this.pointToPixelIn(hT)
			}
			if(hT || this.temp.infoWin && this.temp.infoWin.isOpen()) {
				var i = this.temp._cPoint;
				var hV = this.temp._cPixel;
				var hQ = this.getZoomUnits(e);
				var hS = new hr(i.lng + hQ * (this.width / 2 - hV.x), i.lat - hQ * (this.height / 2 - hV.y));
				this.centerPoint = this.restrictCenter(hS, hQ, e);
				if(this.centerPoint.zoom) {
					e = this.centerPoint.zoom
				}
			}
			if(hX.fireEvent !== false) {
				this.dispatchEvent(new bb("onzoomstart"))
			}
			if(e !== this.zoomLevel) {
				this.zoomLevel = e;
				this.dispatchEvent(new bb("onzooming"));
				this.dispatchEvent(new bb("onzoomstartcode"))
			}
			if(hX.fireEvent !== false) {
				this.dispatchEvent(new bb("onzoomend"))
			}
			if(hX.callback) {
				hX.callback()
			}
		},
		deepZoomMedia: function(e) {
			var i = this;
			if(!i.temp.isStdCtrlBusy) {
				i.temp.isStdCtrlBusy = true;
				i.deepZoomTo(i.zoomLevel + e);
				setTimeout(function() {
					i.temp.isStdCtrlBusy = false
				}, 400)
			}
		},
		deepZoomTo: function(hU, hQ) {
			hQ = hQ || {};
			var hS = hU - this.zoomLevel;
			var hR = this._getProperZoom(hU);
			if(hR.exceeded) {
				var e = new bb("onzoomexceeded");
				e.targetZoom = hU;
				this.dispatchEvent(e);
				return
			}
			var i;
			if(hQ.zoomCenter) {
				i = this.pointToPixelIn(hQ.zoomCenter)
			} else {
				if(this.getInfoWindow()) {
					i = this.pointToPixelIn(this.getInfoWindow().getPoint(), {
						zoom: this.lastLevel
					})
				} else {
					var i = new ej(this.width / 2, this.height / 2)
				}
			}
			this.lastLevel = this.zoomLevel;
			var hT = this.deepZoom || new bE(this);
			var T = hS > 0 ? 1 : -1;
			hT.zoomMap(i, hS, T, null, hQ)
		},
		flyToIn: function(hV, e) {
			if(e === this.zoomLevel) {
				this.panToIn(hV);
				return
			}
			var hS = this._getProperZoom(e);
			if(hS.exceeded) {
				var hW = new bb("onzoomexceeded");
				hW.targetZoom = e;
				this.dispatchEvent(hW);
				return
			}
			var hU = e - this.zoomLevel;
			var T = new ej(this.width / 2, this.height / 2);
			var i = this.pointToPixelIn(hV);
			var hT = new d9(i.x - T.x, i.y - T.y);
			this.lastLevel = this.zoomLevel;
			if(Math.abs(hU) >= 4 || Math.abs(hT.width) > this.width || Math.abs(hT.height) > this.height) {
				this.centerAndZoomIn(hV, e);
				return
			}
			var hR = this.deepZoom || new bE(this);
			var hQ = hU > 0 ? 1 : -1;
			hR.zoomMap(i, hU, hQ, hT)
		},
		panToIn: function(i, T) {
			T = T || {};
			if(!i || i.equals(this.centerPoint)) {
				T.callback && T.callback();
				return
			}
			var hQ = this.pointToPixelIn(i);
			var e = Math.round(this.width / 2);
			var hR = Math.round(this.height / 2);
			if(Math.abs(e - hQ.x) > this.width || Math.abs(hR - hQ.y) > this.height || T.noAnimation === true) {
				this._panToIn(e - hQ.x, hR - hQ.y, i);
				T.callback && T.callback()
			} else {
				this._panBy(e - hQ.x, hR - hQ.y, T)
			}
		},
		_panToIn: function(i, e, hQ) {
			var T = this.temp;
			if(T.operating === true) {
				return
			}
			if(T.dragAni) {
				T.dragAni.stop();
				T.dragAni = null;
				this.dispatchEvent(new bb("onmoveend"))
			}
			this.dispatchEvent(new bb("onmovestart"));
			this._setPlatformPosition(i, e, {
				point: hQ
			});
			this.dispatchEvent(new bb("onmoveend"))
		},
		panBy: function(i, e, T) {
			T = T || {};
			i = Math.round(i) || 0;
			e = Math.round(e) || 0;
			if(Math.abs(i) <= this.width && Math.abs(e) <= this.height && T.noAnimation !== true) {
				this._panBy(i, e, T)
			} else {
				this._panToIn(i, e);
				T.callback && T.callback()
			}
		},
		_panBy: function(i, e, hR) {
			if(this.temp.operating === true) {
				return
			}
			hR = hR || {};
			this.dispatchEvent(new bb("onmovestart"));
			var hQ = this;
			var T = hQ.temp;
			T.pl = hQ.offsetX;
			T.pt = hQ.offsetY;
			if(T.tlPan) {
				T.tlPan.cancel()
			}
			if(T.dragAni) {
				T.dragAni.stop();
				T.dragAni = null;
				this.dispatchEvent(new bb("onmoveend"))
			}
			T.tlPan = new o({
				fps: hR.fps || hQ.config.fps,
				duration: hR.duration || hQ.config.actionDuration,
				transition: hR.transition || cn.easeInOutQuad,
				render: function(hS) {
					this.terminative = hQ.temp.operating;
					if(hQ.temp.operating) {
						return
					}
					hQ._setPlatformPosition(Math.ceil(i * hS), Math.ceil(e * hS), {
						initMapOffsetX: T.pl,
						initMapOffsetY: T.pt
					})
				},
				finish: function(hS) {
					hQ.dispatchEvent(new bb("onmoveend"));
					hQ.temp.tlPan = false;
					if(hQ.temp.stopArrow === true) {
						hQ.temp.stopArrow = false;
						if(hQ.temp.arrow !== 0) {
							hQ._arrow()
						}
					}
					hR.callback && hR.callback()
				}
			})
		},
		getCenterIn: function() {
			return this.centerPoint
		},
		getZoom: function() {
			return this.zoomLevel
		},
		setTilt: function() {},
		getTilt: function() {
			return this._tilt
		},
		setHeading: function() {},
		getHeading: function() {
			return this._heading
		},
		restrictCenter: function(hU, hR, hV) {
			this.isRestrict = false;
			hR = hR || this.getZoomUnits();
			hV = hV || this.zoomLevel;
			var T = this.pixelToPointIn(new ej(0, 0), {
				center: hU,
				zoom: hV
			});
			var hS = this.pixelToPointIn(new ej(0, this.height), {
				center: hU,
				zoom: hV
			});
			if(this.zoomLevel < 5) {
				if(T.lat > c8.MAX_LAT && hS.lat < c8.MIN_LAT) {
					this.isRestrict = true;
					var i = c8.MAX_LAT - hU.lat;
					var e = hU.lat - c8.MIN_LAT;
					var hT;
					if(i < e) {
						hT = i / (this.height / 2)
					} else {
						hT = e / (this.height / 2)
					}
					var hQ = 18 - eC(hT);
					this.zoomLevel = Math.ceil(hQ);
					hU.zoom = Math.ceil(hQ);
					return hU
				}
			}
			if(T.lat > c8.MAX_LAT) {
				this.isRestrict = true;
				hU.lat = c8.MAX_LAT - this.height / 2 * hR
			} else {
				if(hS.lat < c8.MIN_LAT) {
					this.isRestrict = true;
					hU.lat = c8.MIN_LAT + this.height / 2 * hR
				}
			}
			return hU
		}
	});

	function c8(e, T) {
		if(typeof e === "string") {
			e = document.getElementById(e)
		}
		ed.call(this);
		this.container = e;
		this.width = e.clientWidth;
		this.height = e.clientHeight;
		this.offsetX = 0;
		this.offsetY = 0;
		this._setStyle(e);
		e.unselectable = "on";
		e.innerHTML = "";
		C.ac(e, "bmap-container");
		e.appendChild(this.render());
		this._initDate = new Date();
		this.platform = e.children[0];
		this.maskLayer = this.platform.children[0];
		this._panes = {};
		this.centerPoint = new hr(0, 0);
		this.zoomLevel = 0;
		this._heading = 0;
		this._tilt = 0;
		this._bounds = new dS();
		this.lastLevel = 0;
		this._lock = false;
		this._enableTiltZoom = 7;
		this._enableHeadingZoom = 7;
		this.defaultZoomLevel = null;
		this.defaultCenter = null;
		this.zoomEventStatus = "idle";
		this.currentOperation = dU.idle;
		this._setConfig(T);
		this._initMapRenderType();
		this._animationInfo = {};
		this._animationInfoUnstopable = {};
		this.suspendLoad = false;
		this._customTileLabels = [];
		if(this._renderType === "webgl") {
			this._workerMgr = new f8(this);
			this._featureMgr = new dc();
			C.extend(this, c7.prototype);
			this.jobScheduler = new fO(this);
			this.benchmark = new ac();
			this._setupWebGLMap();
			this.deviceInfo = {
				hardwareInfo: {
					renderer: "",
					vendor: ""
				}
			};
			if(a8.ifSupportWebGL._renderer) {
				this.deviceInfo.hardwareInfo.renderer = a8.ifSupportWebGL._renderer;
				this.deviceInfo.hardwareInfo.vendor = a8.ifSupportWebGL._vendor
			}
		} else {
			C.extend(this, am.prototype)
		}
		if(!b6[this.config.mapType]) {
			this.config.mapType = BMAPGL_NORMAL_MAP
		}
		if(this.config.mapType === BMAP_EARTH_MAP && !this.config.enableEarth) {
			if(this.forceEnableEarth() === false) {
				this.config.mapType = BMAPGL_NORMAL_MAP
			}
		}
		this.mapType = this.config.mapType;
		this.preMapType = null;
		if(this.config.enableEarth) {
			var hS = this.maskLayer.style;
			hS.opacity = 0;
			hS.background = "#000";
			if(this.config.mapType === BMAP_EARTH_MAP) {
				hS.opacity = 1
			}
			setTimeout(function() {
				hS.WebkitTransition = hS.transition = "opacity .4s"
			}, 100)
		}
		this._isHybridShow = this.config.showStreetLayer;
		this.temp = {
			operating: false,
			arrow: 0,
			lastDomMoveTime: 0,
			lastLoadTileTime: 0,
			lastMovingTime: 0,
			canKeyboard: false,
			I: function(i) {
				return C.I(i)
			},
			curSpots: [],
			curSpotsArray: [],
			curAreaSpot: null,
			spotsGuid: 1,
			registerIndex: -1,
			hoverOnSpot: null,
			isStdCtrlBusy: false
		};
		window.InstanceCore = this.temp.I;
		this.platform.style.cursor = this.config.defaultCursor;
		this._bind();
		for(var hQ = 0; hQ < bo._register.length; hQ++) {
			bo._register[hQ](this)
		}
		this.temp.registerIndex = hQ;
		var hR = this;
		if(this._renderType === "webgl") {
			ea.load("oppcgl", function() {
				hR._asyncRegister()
			})
		} else {
			ea.load("oppc", function() {
				hR._asyncRegister()
			})
		}
		if(this.config.mapType === "B_EARTH_MAP") {
			if(!bo.Earth) {
				ea.load("earth", function() {})
			} else {
				hR._syncAndChangeMapType("B_EARTH_MAP")
			}
		}
	}
	c8.MAX_TILT = 87;
	c8.MAX_DRAG_TILT = 73;
	c8.MAX_DRAG_TILT_L2 = 50;
	c8.MIN_TILT = 0;
	c8.MAX_LAT = 19431424;
	c8.MIN_LAT = -16023552;
	c8.WORLD_SIZE_MC_HALF = 20037726.372307256;
	c8.WORLD_SIZE_MC = c8.WORLD_SIZE_MC_HALF * 2;
	c8.RIGHT_EDGE_POINT = new hr(c8.WORLD_SIZE_MC_HALF, 0);
	c8.LEFT_EDGE_POINT = new hr(-c8.WORLD_SIZE_MC_HALF, 0);
	c8.inherits(ed, "Map");
	C.extend(c8.prototype, {
		render: function() {
			var e = S("div", {
				id: "platform"
			});
			var hQ = e.style;
			hQ.overflow = "visible";
			hQ.position = "absolute";
			hQ.zIndex = 5;
			hQ.top = hQ.left = "0px";
			var i = S("div", {
				id: "mask",
				"class": "BMap_mask"
			});
			var T = i.style;
			T.position = "absolute";
			T.top = T.left = "0px";
			T.zIndex = "9";
			T.overflow = "hidden";
			T.WebkitUserSelect = "none";
			T.width = this.width + "px";
			T.height = this.height + "px";
			e.appendChild(i);
			return e
		},
		_initMapRenderType: function() {
			var e = this.config.forceRenderType;
			if(e === "dom") {
				this._renderType = "dom";
				return
			} else {
				if(e === "canvas") {
					if(a8.isModernBrowser && !a8.ifCanvas2dInBlackList()) {
						this._renderType = "canvas";
						return
					} else {
						this._renderType = "dom";
						return
					}
				} else {
					if(e === "webgl") {
						if(a8.ifSupportWebGL()) {
							this._renderType = "webgl";
							return
						}
					}
				}
			}
			if(a8.ifSupportWebGL() && a8.ifEnableWebGLMap()) {
				this._renderType = "webgl";
				return
			}
			if(a8.isModernBrowser && a8.ifEnableCanvas2dMap()) {
				this._renderType = "canvas";
				return
			}
			this._renderType = "dom"
		},
		_setConfig: function(i) {
			i = i || {};
			this.config = {
				bottomOffset: 0,
				clickInterval: 200,
				enableDragging: true,
				enableRotate: true,
				enableTilt: true,
				enableKeyboard: false,
				enableDblclickZoom: true,
				enableContinuousZoom: true,
				enableWheelZoom: false,
				enableRotateGestures: true,
				enableTiltGestures: true,
				enablePinchZoom: true,
				fixCenterWhenPinch: false,
				enableAutoResize: true,
				zoomCenter: null,
				fps: C.Browser.ie ? 30 : 60,
				zoomerDuration: 240,
				actionDuration: 450,
				defaultCursor: e3.defaultCursor,
				draggingCursor: e3.draggingCursor,
				coordType: BMAP_COORD_MERCATOR,
				mapType: BMAPGL_NORMAL_MAP,
				drawer: BMAP_SYS_DRAWER,
				enableInertialDragging: true,
				drawMargin: 500,
				drawMarginGL: 500,
				enableFulltimeSpotClick: false,
				enableResizeOnCenter: false,
				isModernBrowser: a8.isModernBrowser,
				forceRenderType: "",
				textRenderType: null,
				ratio: a6() >= 1.5 ? 2 : 1,
				enableEarth: a8.ifEnableEarth(),
				defaultMaxBounds: new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712)),
				showControls: false,
				showRealSunlight: true,
				showMilkyway: true,
				earthBackground: null,
				showStreetLayer: true,
				minZoom: null,
				maxZoom: null,
				style: "default",
				enableIconClick: false,
				autoSafeArea: false,
				ak: null,
				webgl2: false,
				restrictCenter: true,
				smaa: true,
				preserveDrawingBuffer: false
			};
			for(var T in i) {
				if(i.hasOwnProperty(T)) {
					this.config[T] = i[T];
					if(T === "fixCenterWhenResize") {
						this.config.enableResizeOnCenter = i[T]
					}
				}
			}
			if(i.style) {
				if(i.style["styleId"] && i.style["styleId"].length < 32) {
					this.config.style = i.style["styleId"]
				} else {
					this.config.style = i.style
				}
			}
			this._setTextRenderType();
			this._displayOptions = {
				poi: true,
				poiText: true,
				poiIcon: true,
				overlay: true,
				layer: true,
				building: true,
				indoor: true,
				street: true,
				skyColors: ["rgba(226, 237, 248, 0)", "rgba(186, 211, 252, 1)"],
				isFlat: false,
				labelMargin: 0
			};
			if(i.displayOptions) {
				for(var e in i.displayOptions) {
					if(i.displayOptions.hasOwnProperty(e)) {
						this._displayOptions[e] = i.displayOptions[e]
					}
				}
			}
			if(this.config.restrictCenter === false) {
				this._enableTiltZoom = 0;
				this._enableHeadingZoom = 0
			}
		},
		getMinZoom: function() {
			var T;
			if(b6[this.mapType][this._renderType]) {
				T = b6[this.mapType][this._renderType].minZoom
			} else {
				T = b6[this.mapType].minZoom
			}
			if(this.config.minZoom !== null && this.config.minZoom >= T) {
				T = this.config.minZoom
			}
			if(this.mapType === "B_EARTH_MAP") {
				return T
			}
			var i = this.getSize();
			var e = this.worldSize(T);
			while(e < i.width) {
				T++;
				e = this.worldSize(T)
			}
			return T
		},
		getMaxZoom: function() {
			var e;
			if(b6[this.mapType][this._renderType]) {
				e = b6[this.mapType][this._renderType].maxZoom
			} else {
				e = b6[this.mapType].maxZoom
			}
			if(this.config.maxZoom !== null && this.config.maxZoom <= e) {
				e = this.config.maxZoom
			} else {
				if(this._renderType === "webgl") {
					e = 21
				}
			}
			return e
		},
		_drawFrame: function() {
			this._webglMapScene._painter.draw()
		},
		_setupWebGLMap: function() {
			var e = this;
			ea.load("mapgl", function() {
				e._asyncRegister()
			})
		},
		_setStyle: function(i) {
			var e = i.style;
			e.overflow = "hidden";
			if(fY(i).position !== "absolute") {
				e.position = "relative"
			}
			e.backgroundImage = "url(" + e3.imgPath + "bg.png)";
			e.textAlign = "left";
			e.touchAction = e.MSTouchAction = "none"
		},
		_bind: function() {
			var e = this;
			if(e._renderType !== "webgl") {
				e._watchSize = function() {
					var T = e.getContainerSize();
					if(e.width !== T.width || e.height !== T.height) {
						var hT = (T.width - e.width) / 2;
						var hV = (T.height - e.height) / 2;
						var hQ = e.getZoomUnits();
						var hS = e.centerPoint;
						if(hS && !e.config.enableResizeOnCenter) {
							e.centerPoint = new hr(hS.lng + hT * hQ, hS.lat - hV * hQ)
						}
						e.maskLayer.style.width = (e.width = T.width) + "px";
						e.maskLayer.style.height = (e.height = T.height) + "px";
						var hR = new bb("onresize");
						hR.size = T;
						e.dispatchEvent(hR);
						e.fire(new bb("onsize_changed"));
						var i = parseInt(e.platform.style.left, 10) || 0;
						var hU = parseInt(e.platform.style.top, 10) || 0;
						if(e.currentOperation !== "undefined" && e.currentOperation !== dU.idle && (e.offsetX !== i || e.offsetY !== hU)) {
							e._setPlatformPosition(i, hU)
						}
					}
				}
			} else {
				e._watchSize = function() {
					var i = e.getContainerSize();
					if(e.width !== i.width || e.height !== i.height) {
						var hQ = e.getSize();
						e.maskLayer.style.width = (e.width = i.width) + "px";
						e.maskLayer.style.height = (e.height = i.height) + "px";
						if(a6() !== e.config.ratio) {
							e.config.ratio = a6()
						}
						var hR = new bb("onresize");
						hR.size = i;
						e.dispatchEvent(hR);
						var T = new bb("onsize_changed");
						T.size = i;
						T.oldSize = hQ;
						e.fire(T)
					}
				}
			}
			if(e.config.enableAutoResize) {
				e.temp.autoResizeTimer = setInterval(e._watchSize, 16)
			}
			this.on("size_changed", function() {
				var i = e.getMinZoom();
				if(e.zoomLevel < i) {
					e.setZoomIn(i, {
						noAnimation: true
					})
				}
			});
			this.on("zoom_changed", function() {
				this.dispatchEvent(new bb("onzooming"))
			})
		},
		addControl: function(e) {
			if(e && bV(e._i)) {
				e._i(this);
				this.dispatchEvent(new bb("onaddcontrol", e))
			}
		},
		removeControl: function(e) {
			if(e && bV(e.remove)) {
				e.remove();
				this.dispatchEvent(new bb("onremovecontrol", e))
			}
		},
		addContextMenu: function(e) {
			if(e) {
				e.initialize(this);
				this.dispatchEvent(new bb("onaddcontextmenu", e))
			}
		},
		removeContextMenu: function(e) {
			if(e) {
				this.dispatchEvent(new bb("onremovecontextmenu", e));
				e.remove()
			}
		},
		addOverlay: function(i) {
			if(i && bV(i._i)) {
				var T = new bb("onbeforeaddoverlay", i);
				T.overlay = i;
				this.dispatchEvent(T);
				i._i(this);
				T = new bb("onaddoverlay", i);
				T.overlay = i;
				this.dispatchEvent(T)
			}
		},
		removeOverlay: function(i) {
			if(i && bV(i.remove)) {
				var T = new bb("onremoveoverlay", i);
				T.overlay = i;
				i.remove();
				this.dispatchEvent(T)
			}
		},
		clearOverlays: function() {
			this.dispatchEvent(new bb("onclearoverlays"))
		},
		addTileLayer: function(hR) {
			if(!hR) {
				return
			}
			for(var hQ = 0, e = this.tileMgr.tileLayers.length; hQ < e; hQ++) {
				var T = this.tileMgr.tileLayers[hQ];
				if(T === hR || T.getMapType() === hR.getMapType()) {
					return
				}
			}
			hR.initialize(this);
			this.dispatchEvent(new bb("onaddtilelayer", hR))
		},
		removeTileLayer: function(e) {
			if(e) {
				e.remove();
				this.dispatchEvent(new bb("onremovetilelayer", e))
			}
		},
		getTileLayer: function(e) {
			if(this.tileMgr) {
				return this.tileMgr.getTileLayer(e)
			}
			return null
		},
		setMapType: function(e) {
			var i = this;
			if(this.mapType === e || this._mapTypeChanging) {
				return
			}
			if(e === BMAP_EARTH_MAP && !this.config.enableEarth) {
				return
			}
			if(this._earth && this._earth.getLock()) {
				return
			}
			this._mapTypeChanging = true;
			this.preMapType = this.mapType;
			this._boundsInPreMapType = this.getBoundsIn();
			if(this.preMapType === BMAP_SATELLITE_MAP) {
				this._preStreetLayerShow = this._isHybridShow
			}
			if(e === BMAP_EARTH_MAP) {
				if(!bo.Earth) {
					ea.load("earth", function() {
						i._syncAndChangeMapType(e)
					});
					return
				}
				i._syncAndChangeMapType(e)
			} else {
				if(this.preMapType !== BMAP_EARTH_MAP) {
					this._changeFlatMapType(e);
					this._mapTypeChanging = false
				} else {
					this._setMapTypeStatus(e, function(T, hQ) {
						var hR = i._earth.getEarthCanvas();
						i._changeFlatMapType(e, this.preMapType);
						if(i._mapTypeChangAni) {
							i._mapTypeChangAni.stop()
						}
						i._mapTypeChangAni = fk.start({
							el: hR,
							style: "opacity",
							startValue: 1,
							endValue: 0,
							duration: 200,
							callback: function() {
								i._mapTypeChangAni = null;
								i._mapTypeChanging = false
							}
						});
						T = en.convertLL2MC(T);
						if(i._renderType === "webgl") {
							C.extend(i, c7.prototype);
							i.setCenterIn(T, {
								noAnimation: true
							});
							i.setZoomIn(hQ, {
								noAnimation: true
							})
						} else {
							C.extend(i, am.prototype);
							i.centerAndZoomIn(T, hQ)
						}
					})
				}
			}
		},
		_changeFlatMapType: function(hT) {
			if(!hT || !b6[hT]) {
				return
			}
			var h1 = this.preMapType;
			this.mapType = hT;
			var hQ = this.getTileLayer(h1);
			if(hQ) {
				this.removeTileLayer(hQ)
			}
			if(h1 !== BMAP_EARTH_MAP || this._renderType !== "webgl" || this.baseLayerAdded !== true) {
				var T = new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712));
				var hY = new c5(T, "baidu", hT);
				var h0 = this._renderType === "webgl" ? 2 : 1;
				var hR = new cR({
					mapType: hT,
					copyright: hY,
					dataType: h0,
					customLayer: false,
					baseLayer: true,
					tileTypeName: "na"
				});
				hR._isInnerLayer = true;
				this.addTileLayer(hR);
				if(this._renderType === "webgl" && !this.baseLayerAdded) {
					this.baseLayerAdded = true
				}
			}
			if(h1 === BMAP_SATELLITE_MAP) {
				this._preStreetLayerShow = this._isHybridShow;
				this._removeHybirdMap()
			} else {
				if(hT === BMAP_SATELLITE_MAP) {
					if(this._preStreetLayerShow === true || typeof this._preStreetLayerShow === "undefined") {
						this._addHybirdMap()
					}
				}
			}
			var hV = this.tileMgr.tileLayers;
			for(var hU = 0, hS = hV.length; hU < hS; hU++) {
				var hW = hV[hU];
				var hZ = hW.tilesDiv;
				if(!hZ) {
					continue
				}
				if(!hW._isInnerLayer && hZ.style.visibility === "hidden") {
					hZ.style.visibility = ""
				}
			}
			var hX = new bb("onmaptypechange");
			hX.zoomLevel = this.zoomLevel;
			hX.mapType = hT;
			hX.exMapType = h1;
			this.dispatchEvent(hX)
		},
		showStreetLayer: function(e) {
			e ? this._addHybirdMap() : this._removeHybirdMap()
		},
		hideStreetLayer: function(e) {
			this._hideStreetLayerOptions = e;
			this._removeHybirdMap(e)
		},
		_addHybirdMap: function() {
			this._isHybridShow = true;
			if(this.mapType === "B_EARTH_MAP") {
				if(this._earth) {
					this._earth.showStreetLayer()
				}
				return
			}
			if(this._hybridTileLayer) {
				this.addTileLayer(this._hybridTileLayer);
				var hS = new bb("onstreetlayer_show");
				this.dispatchEvent(hS);
				return
			}
			var hR = new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712));
			var T = new c5(hR, "", BMAP_HYBRID_MAP);
			var i = new cR({
				copyright: T,
				transparentPng: true,
				tileTypeName: "web"
			});
			i._isInnerLayer = true;
			var hQ = this.isCanvasMap();
			i.getTilesUrl = function(hT, hY) {
				var hW = b6.B_STREET_MAP;
				var hX = aD("ditu", "satelliteStreet");
				var hU = hX.ver;
				var e = hX.udt;
				var hV = hW.tileUrls[Math.abs(hT.x + hT.y) % hW.tileUrls.length] + "?qt=vtile&x=" + (hT.x + "").replace(/-/gi, "M") + "&y=" + (hT.y + "").replace(/-/gi, "M") + "&z=" + hY + "&styles=sl&v=" + hU + "&udt=" + e + "$scaler=" + a6() + "&showtext=" + (hQ ? 0 : 1);
				return hV
			};
			this._isHybridShow = true;
			this.addTileLayer(i);
			this._hybridTileLayer = i;
			var hS = new bb("onstreetlayer_show");
			this.dispatchEvent(hS)
		},
		_removeHybirdMap: function(i) {
			this._isHybridShow = false;
			if(this.mapType === "B_EARTH_MAP") {
				if(this._earth) {
					this._earth.hideStreetLayer(i)
				}
				return
			}
			if(this._hybridTileLayer) {
				this.removeTileLayer(this._hybridTileLayer);
				var T = new bb("onstreetlayer_hide");
				this.dispatchEvent(T)
			}
		},
		isStreetLayerShow: function() {
			return this._isHybridShow
		},
		getTileId: function(e, hS) {
			var hQ = b6[this.mapType];
			if(typeof hQ !== "object") {
				return null
			}
			var T = hQ.baseUnits * Math.pow(2, (hQ.zoomLevelBase - hS));
			var hR = parseInt(e.lng / T, 10);
			var i = parseInt(e.lat / T, 10);
			return {
				row: hR,
				column: i,
				level: hS
			}
		},
		reset: function() {
			this.centerAndZoomIn(this.defaultCenter, this.defaultZoomLevel, true)
		},
		setOptions: function(e) {
			e = e || {};
			for(var T in e) {
				if(e.hasOwnProperty(T)) {
					var i = true;
					if(typeof e[T] !== "object") {
						i = e[T] !== this.config[T]
					}
					this.config[T] = e[T];
					if(T === "fixCenterWhenResize") {
						this.config.enableResizeOnCenter = e[T]
					}
					if(!i) {
						continue
					}
					switch(T) {
						case "style":
						case "styleUrl":
							if(T === "style" && e.styleUrl) {
								break
							}
							this.fire(new bb("onstyle_willchange"));
							var hQ = this;
							this.loadMapStyleFiles(function() {
								hQ.fire(new bb("onstyle_changed"))
							});
							break;
						case "enableAutoResize":
							if(e[T] === true) {
								this.enableAutoResize()
							} else {
								this.disableAutoResize()
							}
							break;
						case "displayOptions":
							this.setDisplayOptions(e[T]);
							break
					}
				}
			}
		},
		enableDragging: function() {
			this.config.enableDragging = true
		},
		disableDragging: function() {
			this.config.enableDragging = false
		},
		enableInertialDragging: function() {
			this.config.enableInertialDragging = true
		},
		disableInertialDragging: function() {
			this.config.enableInertialDragging = false
		},
		enableScrollWheelZoom: function() {
			this.config.enableWheelZoom = true
		},
		disableScrollWheelZoom: function() {
			this.config.enableWheelZoom = false
		},
		enableContinuousZoom: function() {
			this.config.enableContinuousZoom = true
		},
		disableContinuousZoom: function() {
			this.config.enableContinuousZoom = false
		},
		enableResizeOnCenter: function() {
			this.config.enableResizeOnCenter = true
		},
		disableResizeOnCenter: function() {
			this.config.enableResizeOnCenter = false
		},
		enableDoubleClickZoom: function() {
			this.config.enableDblclickZoom = true
		},
		disableDoubleClickZoom: function() {
			this.config.enableDblclickZoom = false
		},
		enableKeyboard: function() {
			this.config.enableKeyboard = true
		},
		disableKeyboard: function() {
			this.config.enableKeyboard = false
		},
		getSize: function() {
			return new d9(this.width, this.height)
		},
		enablePinchToZoom: function() {
			this.config.enablePinchZoom = true
		},
		disablePinchToZoom: function() {
			this.config.enablePinchZoom = false
		},
		enableTilt: function() {
			this.config.enableTilt = true
		},
		disableTilt: function() {
			this.config.enableTilt = false
		},
		enableRotate: function() {
			this.config.enableRotate = true
		},
		disableRotate: function() {
			this.config.enableRotate = false
		},
		enableAutoResize: function() {
			this.config.enableAutoResize = true;
			this._watchSize();
			if(!this.temp.autoResizeTimer) {
				this.temp.autoResizeTimer = setInterval(this._watchSize, 16)
			}
		},
		disableAutoResize: function() {
			this.config.enableAutoResize = false;
			if(this.temp.autoResizeTimer) {
				clearInterval(this.temp.autoResizeTimer);
				this.temp.autoResizeTimer = null
			}
		},
		checkResize: function() {
			this._watchSize()
		},
		resize: function() {
			this._watchSize()
		},
		getContainerSize: function() {
			return new d9(this.container.clientWidth, this.container.clientHeight)
		},
		_getProperZoom: function(T) {
			if(!T) {
				T = this.zoomLevel
			}
			var i = this.getMinZoom();
			var e = this.getMaxZoom();
			var hQ = false;
			if(T < i) {
				hQ = true;
				T = i
			}
			if(T > e) {
				hQ = true;
				T = e
			}
			if(this._renderType !== "webgl") {
				T = Math.round(T)
			}
			return {
				zoom: T,
				exceeded: hQ
			}
		},
		getContainer: function() {
			return this.container
		},
		getZoomUnits: function(T) {
			if(this.mapType === BMAP_EARTH_MAP) {
				return Math.pow(2, 18 - this._earth.getImageZoom())
			}
			var e = b6[this.mapType];
			if(typeof e !== "object") {
				return null
			}
			var i = T || this.zoomLevel;
			return Math.pow(2, (e.zoomLevelBase - i))
		},
		pointToPixelIn: function(hZ, h1) {
			if(!hZ) {
				return
			}
			h1 = h1 || {};
			if(this.mapType === BMAP_EARTH_MAP) {
				var hQ;
				if(!hZ._llPt) {
					hQ = en.convertMC2LL(hZ);
					hZ._llPt = hQ
				}
				hQ = hZ._llPt;
				var hV = null;
				var T = null;
				if(typeof h1.zoom === "number") {
					var hY = this._earth;
					var h0 = hY._getEarthZoomByImgZoom(h1.zoom);
					if(h0 <= 3) {
						hV = hY._generateTmpPMatrix(h0)
					}
					T = hY._generateTmpMVMatrix(hY.getCenter(), h0)
				}
				var hR = this._earth.fromLatLngToPixel(hQ, {
					useRound: false,
					isCalcOnBack: true,
					matrixInfo: {
						modelViewMatrix: T,
						projectionMatrix: hV
					}
				});
				return hR
			}
			if((this._heading % 360 === 0 && this._tilt === 0) || !this._webglMapCamera) {
				var hX = this.getZoomUnits(h1.zoom);
				var hT = h1.center || this.centerPoint;
				var i = this.width / 2;
				var hS = this.height / 2;
				var hW = (hZ.lng - hT.lng) / hX + i;
				var hU = (hT.lat - hZ.lat) / hX + hS;
				if(h1.useRound !== false) {
					hW = Math.round(hW);
					hU = Math.round(hU)
				}
				return new ej(hW, hU)
			}
			var e = this._webglMapCamera.fromMCToScreenPixel(hZ.lng, hZ.lat, h1);
			if(h1.useRound === false) {
				return e
			}
			e.x = Math.round(e.x);
			e.y = Math.round(e.y);
			return e
		},
		pixelToPointIn: function(e, hX) {
			if(!e) {
				return
			}
			hX = hX || {};
			if(this.mapType === BMAP_EARTH_MAP) {
				if(typeof hX.zoom === "number") {
					var hV = this._earth;
					var hS = null;
					var T = null;
					var hW = hV._getEarthZoomByImgZoom(hX.zoom);
					if(hW <= 3) {
						hS = hV._generateTmpPMatrix(hW)
					}
					T = hV._generateTmpMVMatrix(hV.getCenter(), hW)
				}
				var i = this._earth.fromPixelToLatLng(e, {
					matrixInfo: {
						modelViewMatrix: T,
						projectionMatrix: hS
					}
				});
				if(i === null) {
					return null
				}
				return en.convertLL2MC(i)
			}
			if((this._heading % 360 !== 0 || this._tilt > 0) && this._webglMapCamera) {
				return this._webglMapCamera.fromScreenPixelToMC(e.x, e.y, hX)
			}
			var hT = hX.center || this.centerPoint;
			var hU = this.getZoomUnits(hX.zoom);
			var hR = hT.lng + hU * (e.x - this.width / 2);
			var hQ = hT.lat - hU * (e.y - this.height / 2);
			return new hr(hR, hQ)
		},
		pointToOverlayPixelIn: function(e, hQ) {
			hQ = hQ || {};
			var T = this.pointToPixelIn(e, {
				zoom: hQ.zoom,
				center: hQ.center,
				forLabel: true,
				frustumTest: true,
				useRound: hQ.useRound
			});
			if(!T) {
				return
			}
			if(hQ.fixPosition && this.mapType !== "B_EARTH_MAP") {
				var hR = this.getSize();
				var i = this.worldSize(hQ.zoom);
				if(T.x > hR.width) {
					while(T.x > hR.width) {
						T.x -= i
					}
				} else {
					if(T.x < 0) {
						while(T.x < 0) {
							T.x += i
						}
					}
				}
			}
			if(this._renderType === "webgl") {
				return T
			}
			T.x -= this.offsetX;
			T.y -= this.offsetY;
			return T
		},
		overlayPixelToPointIn: function(i, e) {
			if(!i) {
				return
			}
			var T = i.clone();
			if(this._renderType !== "webgl") {
				T.x += this.offsetX;
				T.y += this.offsetY
			}
			return this.pixelToPointIn(T, e)
		},
		getProjection: function() {
			return new en()
		},
		lnglatToMercator: function(e, hQ) {
			var i = new hr(e, hQ);
			var T = en.convertLL2MC(i);
			return [T.lng, T.lat]
		},
		mercatorToLnglat: function(i, e) {
			if(isNaN(i) || isNaN(e)) {
				return []
			}
			i = parseFloat(i);
			e = parseFloat(e);
			var hQ = new hr(i, e);
			var T = en.convertMC2LL(hQ);
			return [T.lng, T.lat]
		},
		getBoundsIn: function() {
			var h3 = arguments[0];
			if(this.mapType === BMAP_EARTH_MAP && this._earth) {
				var hX = this._earth.getCustomBounds();
				if(!hX) {
					return this.config.defaultMaxBounds
				}
				var hW = hX.getSouthWest();
				var e = hX.getNorthEast();
				if(hW.lng > e.lng) {
					e.lng = 180
				}
				var il = en.convertLL2MC(hW);
				var ia = en.convertLL2MC(e);
				var h0 = this.config.defaultMaxBounds;
				var h9 = Math.max(il.lng, h0.sw.lng);
				var h8 = Math.max(il.lat, h0.sw.lat);
				var h2 = Math.min(ia.lng, h0.ne.lng);
				var h1 = Math.min(ia.lat, h0.ne.lat);
				var h5 = new dS(new hr(h9, h8), new hr(h2, h1));
				h5.pointBottomLeft = new hr(h9, h8);
				h5.pointBottomRight = new hr(h2, h8);
				h5.pointTopLeft = new hr(h9, h1);
				h5.pointTopRight = new hr(h2, h1);
				h5.setMinMax();
				h5.makeNormalizedPoint(this._earth.getHeading());
				return h5
			}
			h3 = h3 || {};
			var hR = h3.margins || [0, 0, 0, 0];
			var ig = this.pixelToPointIn({
				x: hR[3],
				y: this.height - hR[2]
			}, h3);
			var ik = this.pixelToPointIn({
				x: this.width - hR[1],
				y: hR[0]
			}, h3);
			var h7 = typeof h3.heading === "number" ? h3.heading : (this._heading % 360);
			var T = typeof h3.tilt === "number" ? h3.tilt : this._tilt;
			var hZ = this._webglMapCamera;
			if((h7 === 0 && T === 0) || !hZ) {
				this._bounds.setSouthWest(ig);
				this._bounds.setNorthEast(ik);
				this._bounds.pointBottomLeft = ig;
				this._bounds.pointBottomRight = new hr(ik.lng, ig.lat);
				this._bounds.pointTopRight = ik;
				this._bounds.pointTopLeft = new hr(ig.lng, ik.lat);
				this._bounds.setMinMax();
				this._bounds.makeNormalizedPoint(h7);
				return this._bounds
			}
			var h6 = this.pixelToPointIn({
				x: hR[3],
				y: hR[0]
			}, h3);
			var hQ = hZ.getPosition();
			var im = Math.sqrt(Math.pow(h6.lng - hQ[0], 2) + Math.pow(h6.lat - hQ[1], 2));
			var ih = this.getZoomUnits();
			var ip = im / ih;
			var id = hZ._frustumSideLen;
			var hV = hZ._fovy;
			if(ip > id || (90 - T) < hV / 2) {
				var io = [h6.lng - hQ[0], h6.lat - hQ[1]];
				if((90 - T) < hV / 2) {
					io[0] = -io[0];
					io[1] = -io[1]
				}
				var ie = id * ih;
				var hU = [io[0] / im * ie + hQ[0], io[1] / im * ie + hQ[1]];
				var ib = [ik.lng - hQ[0], ik.lat - hQ[1]];
				if((90 - T) < hV / 2) {
					ib[0] = -ib[0];
					ib[1] = -ib[1]
				}
				var hS = [ib[0] / im * ie + hQ[0], ib[1] / im * ie + hQ[1]];
				h6.lng = hU[0];
				h6.lat = hU[1];
				ik.lng = hS[0];
				ik.lat = hS[1]
			}
			var h4 = this.pixelToPointIn({
				x: this.width - hR[1],
				y: this.height - hR[2]
			}, h3);
			var ic = [ig, ik, h6, h4];
			var ij = ic[0].lng;
			var iq = ic[0].lat;
			var hT = ic[0].lng;
			var hY = ic[0].lat;
			for(var ii = 1; ii < 4; ii++) {
				if(ic[ii].lng < ij) {
					ij = ic[ii].lng
				}
				if(ic[ii].lng > hT) {
					hT = ic[ii].lng
				}
				if(ic[ii].lat < iq) {
					iq = ic[ii].lat
				}
				if(ic[ii].lat > hY) {
					hY = ic[ii].lat
				}
			}
			this._bounds.setSouthWest(new hr(ij, iq));
			this._bounds.setNorthEast(new hr(hT, hY));
			this._bounds.pointTopLeft = h6;
			this._bounds.pointTopRight = ik;
			this._bounds.pointBottomRight = h4;
			this._bounds.pointBottomLeft = ig;
			this._bounds.makeNormalizedPoint(h7);
			this._bounds.setMinMax();
			return this._bounds
		},
		isLoaded: function() {
			return !!this.loaded
		},
		_getBestLevel: function(i, hZ) {
			var hS = 0;
			if(this._renderType === "webgl" && !f4()) {
				hS = 100
			}
			var hT = hZ.margins || [10, 10, 10, 10];
			var hQ = hZ.zoomFactor || 0;
			var hU = hT[1] + hT[3];
			var hR = hT[0] + hT[2];
			var e = this.getMinZoom();
			var hY = this.getMaxZoom();
			var hX = i.toSpan();
			var hW = hX.width / (this.width - hU - hS);
			var hV = hX.height / (this.height - hR - hS);
			var T = 18 - eC(Math.max(hW, hV));
			if(T < e) {
				T = e
			}
			if(T > hY) {
				T = hY
			}
			T += hQ;
			if(this._renderType !== "webgl") {
				T = Math.floor(T)
			}
			return T
		},
		getViewportIn: function(h1, h4) {
			if(this.mapType === BMAP_EARTH_MAP) {
				h1 = h1 || [];
				var h0 = [];
				for(var hR = 0; hR < h1.length; hR++) {
					if(!h1[hR]) {
						continue
					}
					h0.push(en.convertMC2LL(h1[hR]))
				}
				var hZ = this._earth.getViewportIn(h0, h4);
				var hS = hZ.center;
				var hT = hZ.zoom;
				var hX = en.convertLL2MC(hS);
				return {
					center: hX,
					zoom: hT
				}
			}
			var h3 = {
				center: this.getCenterIn(),
				zoom: this.getZoom()
			};
			if(!h1 || h1.length === 0) {
				return h3
			}
			h4 = h4 || {};
			var T;
			if(h1 instanceof dS) {
				T = h1
			} else {
				var hW = h1;
				T = new dS();
				for(var hR = hW.length - 1; hR >= 0; hR--) {
					T.extend(hW[hR])
				}
				if(T.isEmpty()) {
					return h3
				}
			}
			var e = T.getCenter();
			var h2 = this._getBestLevel(T, h4);
			if(h4.margins) {
				var hV = h4.margins;
				var hU = (hV[1] - hV[3]) / 2;
				var hY = (hV[0] - hV[2]) / 2;
				var hQ = this.getZoomUnits(h2);
				e.lng = e.lng + hQ * hU;
				e.lat = e.lat + hQ * hY
			}
			return {
				center: e,
				zoom: h2
			}
		},
		setViewportIn: function(hQ, hR) {
			if(this.mapType === BMAP_EARTH_MAP) {
				var hV;
				if(hQ && hQ.center) {
					var T = en.convertMC2LL(hQ.center);
					var hT = this._earth._getEarthZoomByImgZoom(hQ.zoom, T);
					hV = {
						center: T,
						zoom: hT
					}
				} else {
					hV = [];
					for(var hS = 0; hS < hQ.length; hS++) {
						var hU = en.convertMC2LL(hQ[hS]);
						hV[hS] = new c4(hU.lat, hU.lng)
					}
				}
				this._earth.setViewportIn(hV, hR);
				return
			}
			var e;
			if(hQ && hQ.center) {
				e = hQ
			} else {
				e = this.getViewportIn(hQ, hR)
			}
			hR = hR || {};
			if(this._renderType === "webgl") {
				this.centerAndZoomIn(e.center, e.zoom, hR);
				return
			}
			if(e.zoom === this.zoomLevel && hR.enableAnimation !== false) {
				this.panToIn(e.center, {
					duration: 200,
					callback: hR.callback
				})
			} else {
				this.centerAndZoomIn(e.center, e.zoom, hR)
			}
		},
		addSpots: function(T, i) {
			if(!T || T.length === 0) {
				return
			}
			i = i || {};
			var hS = i.zIndex || 0;
			var hR = typeof i.enableMultiResponse === "undefined" ? true : !!i.enableMultiResponse;
			this.spotsPool = this.spotsPool || {};
			var e = "sp" + (this.temp.spotsGuid++);
			this.spotsPool[e] = {
				spots: T.slice(0),
				zIndex: hS,
				enableMultiResponse: hR
			};
			var hQ = this;
			ea.load("hotspot", function() {
				hQ._asyncRegister()
			});
			return e
		},
		getSpots: function(e) {
			return this.spotsPool[e] && this.spotsPool[e].spots || []
		},
		removeSpots: function(e) {
			if(!e || !this.spotsPool[e]) {
				return
			}
			delete this.spotsPool[e]
		},
		clearSpots: function() {
			delete this.spotsPool
		},
		getIconByClickPosition: function(i) {
			if(!this.config.enableIconClick || !this._spotsMgr) {
				return null
			}
			var e = this._spotsMgr.getSpotsByScreenPosition(i);
			if(e[0] && e[0].userdata) {
				var T = e[0].userdata;
				return {
					name: T.name,
					uid: T.uid,
					position: T.iconPoint || e[0].pt
				}
			}
			return null
		},
		setBounds: function(e) {
			b6[this.mapType].bounds = e.clone()
		},
		getCoordType: function() {
			return this.config.coordType
		},
		getPanes: function() {
			return this._panes
		},
		getInfoWindow: function() {
			if(this.temp.infoWin && this.temp.infoWin.isOpen()) {
				return this.temp.infoWin
			}
			return null
		},
		getDistanceIn: function(hR, e) {
			if(!hR || !e) {
				return
			}
			if(hR.equals(e)) {
				return 0
			}
			if(this.mapType === BMAP_EARTH_MAP) {
				var hQ = en.convertMC2LL(hR);
				var T = en.convertMC2LL(e);
				return this._earth.getDistance(hQ, T)
			}
			var i = en.getDistanceByMC(hR, e);
			return i
		},
		getOverlays: function() {
			var hR = [];
			var hS = this._overlays;
			var hQ = this._customOverlays;
			if(hS) {
				for(var T in hS) {
					if(hS[T] instanceof cV) {
						hR.push(hS[T])
					}
				}
			}
			if(hQ) {
				for(var T = 0, e = hQ.length; T < e; T++) {
					hR.push(hQ[T])
				}
			}
			return hR
		},
		getMapType: function() {
			return this.mapType
		},
		_asyncRegister: function() {
			for(var e = this.temp.registerIndex; e < bo._register.length; e++) {
				bo._register[e](this)
			}
			this.temp.registerIndex = e
		},
		setDefaultCursor: function(e) {
			this.config.defaultCursor = e;
			if(this.platform) {
				this.platform.style.cursor = this.config.defaultCursor
			}
		},
		getDefaultCursor: function() {
			return this.config.defaultCursor
		},
		setDraggingCursor: function(e) {
			this.config.draggingCursor = e
		},
		getDraggingCursor: function() {
			return this.config.draggingCursor
		},
		_syncAndChangeMapType: function(e) {
			var i = this;
			if(i._renderType === "webgl" && i.getTilt() > c8.MAX_DRAG_TILT_L2) {
				i.setTilt(c8.MAX_DRAG_TILT_L2, {
					callback: function() {
						i._changeEarthMapType(e)
					}
				})
			} else {
				i._changeEarthMapType(e)
			}
		},
		_changeEarthMapType: function(T) {
			var hQ = this;
			var hT = hQ.tileMgr.tileLayers;
			if(this._mapTypeChangAni) {
				this._mapTypeChangAni.stop()
			}
			var hS;
			if(this._earth) {
				hS = this._earth.getEarthCanvas()
			}
			if(!this._earth) {
				this.maskLayer.style.opacity = 1;
				this.maskLayer.style.zIndex = 999;
				this.maskLayer.style.background = "#000"
			}
			this._mapTypeChangAni = new o({
				duration: 400,
				render: function(e) {
					if(!hQ._earth) {
						return
					}
					hS.style.opacity = e
				},
				finish: function() {
					for(var e = hT.length - 1, hU = e; hU >= 0; hU--) {
						var hW = hT[hU].tilesDiv;
						if(hW) {
							hW.style.visibility = "hidden"
						}
						if(hT[hU]._isInnerLayer && hQ._renderType !== "webgl") {
							hQ.removeTileLayer(hT[hU])
						}
					}
					hQ._mapTypeChangAni = null;
					hQ._mapTypeChanging = false;

					function hV() {
						var h0 = hQ.getZoom() - 2;
						var h1 = hQ.getCenterIn();
						var hY = en.convertMC2LL(h1);
						hQ._earth = new bo.Earth(hQ, {
							center: hY,
							zoom: h0,
							showRealSunlight: hQ.config.showRealSunlight,
							showMilkyway: hQ.config.showMilkyway,
							earthBackground: hQ.config.earthBackground
						});
						hQ._proxyEarthEvents();
						var hX = hQ.mapType;
						hQ.mapType = T;
						var hZ = new bb("onmaptypechange");
						hZ.zoomLevel = this.zoomLevel;
						hZ.mapType = T;
						hZ.exMapType = hX;
						hQ.dispatchEvent(hZ);
						hQ._setMapTypeStatus(T);
						C.extend(hQ, bo.EarthView.prototype);
						if(!hQ._navigationCtrl && hQ.config.showControls) {
							hQ._navigationCtrl = new eU(hQ)
						}
					}
					if(!hQ._earth) {
						if(bo["FeatureStyle" + hQ.config.style]) {
							hV()
						} else {
							hQ.loadMapStyleFiles(function() {
								hV()
							})
						}
					}
					if(parseInt(hQ.maskLayer.style.opacity, 10) === 1) {
						setTimeout(function() {
							hQ.maskLayer.style.zIndex = 9;
							hQ.maskLayer.style.opacity = 0
						}, 1000)
					}
				}
			});
			if(!this._earth) {
				return
			}
			var i = this.mapType;
			this.mapType = T;
			var hR = new bb("onmaptypechange");
			hR.zoomLevel = this.zoomLevel;
			hR.mapType = T;
			hR.exMapType = i;
			this.dispatchEvent(hR);
			hQ._setMapTypeStatus(T);
			C.extend(hQ, bo.EarthView.prototype)
		},
		getMapStyleId: function() {
			if(typeof this.config.style === "string") {
				return this.config.style
			}
			return this.config.mapStyleId || "custom"
		},
		_setMapTypeStatus: function(T) {
			var hU = arguments[1];
			if(T === BMAP_EARTH_MAP) {
				var hS = this._earth.getEarthCanvas();
				if(hS) {
					hS.style.display = ""
				}
				var hV = {
					noAnimation: true
				};
				this._earth.setCenter(en.convertMC2LL(this.centerPoint), hV);
				this._earth.setImageZoom(this.zoomLevel, hV);
				this._earth.setTilt(this.getTilt(), hV);
				this._earth.setHeading(this.getHeading(), hV)
			} else {
				if(this.preMapType === BMAP_EARTH_MAP && this._earth) {
					var hT = this._earth;
					var hQ = hT.getMapZoom();
					var hR = hT._imageRawZoom || hQ;
					var i = hR - hQ;
					var e = hT.getCenter();
					if(this._renderType === "webgl") {
						this._tilt = hT.getTilt();
						if(this.zoomLevel > 7) {
							this._heading = hT.getHeading();
							hU && hU(e, hQ);
							return
						}
						if(hT.getHeading() !== 0) {
							hT.setTilt(this.getTilt());
							hT.setHeading(this.getHeading(), {
								callback: function() {
									hU && hU(e, hQ)
								}
							})
						} else {
							hU && hU(e, hQ)
						}
						return
					}
					if(i < 0.1 && hT.getTilt() === 0 && hT.getHeading() === 0) {
						hU && hU(e, hQ);
						return
					}
					hT.setTilt(0);
					hT.setHeading(0);
					hT.setZoom(hT.getZoom() - i, {
						callback: function() {
							hU && hU(e, hQ)
						}
					})
				}
			}
		},
		_proxyEarthEvents: function() {
			var hR = this;
			var hS = this._earth;
			hS.on("tilesload", function(i) {
				hR.fire(i)
			});
			hS.on("centerandzoom", function(i) {
				hR.dispatchEvent(new bb("onmoveend"));
				hR.dispatchEvent(new bb("onzoomend"))
			});

			function hQ(i) {
				hR.fire(i)
			}
			var e = ["zoomstart", "zoomend", "tilesload", "sunlighttime_change", "sunlighttime_clear", "centerandzoom", "animation_start", "animation_stop", "movestart", "moveend", "moving", "dragstart", "dragend", "dragging"];
			for(var T = 0; T < e.length; T++) {
				hS.on(e[T], hQ)
			}
		},
		forceEnableEarth: function() {
			this.config.forceEnableEarth = true;
			this.config.enableEarth = a8.ifEnableEarth(true);
			this.dispatchEvent(new bb("forceenableearth"));
			return this.config.enableEarth
		},
		setLock: function(e) {
			if(this.mapType === BMAP_EARTH_MAP) {
				this._earth.setLock(e)
			}
			this._lock = e
		},
		getLock: function() {
			if(this.mapType === BMAP_EARTH_MAP) {
				return this._earth.getLock()
			}
			return this._lock
		},
		getEarth: function() {
			return this._earth
		},
		isSupportEarth: function() {
			return this.config.enableEarth
		},
		isCanvasMap: function() {
			return !!(this._renderType === "canvas" && this.getMapType() !== "B_EARTH_MAP")
		},
		getCanvasMapCoordByUid: function(hR) {
			if(this._renderType === "webgl") {
				var hS = this.tileMgr.tileLayers;
				for(var hQ = 0; hQ < hS.length; hQ++) {
					if(hS[hQ].labelProcessor) {
						return hS[hQ].labelProcessor.getLabelByUid(hR, "")
					}
				}
				return null
			}
			var e = this.canvas2dMapMgr._labelClick;
			var T = e.findLabelByUid(hR);
			return T ? new hr(T.iconPos.geoX, T.iconPos.geoY) : null
		},
		loadBizData: function(i) {
			var e = new bb("onloadbizdata");
			e.data = i;
			this.dispatchEvent(e)
		},
		unloadBizData: function() {
			var e = new bb("onunloadbizdata");
			this.dispatchEvent(e)
		},
		zoomIn: function(e) {
			this.setZoomIn(this.zoomLevel + 1, {
				zoomCenter: e
			})
		},
		zoomOut: function(e) {
			this.setZoomIn(this.zoomLevel - 1, {
				zoomCenter: e
			})
		},
		setMaxZoom: function(e) {
			if(this._renderType === "webgl") {
				this.config.maxZoom = e <= 21 ? e : 21
			} else {
				this.config.maxZoom = e <= 19 ? e : 19
			}
		},
		setMinZoom: function(e) {
			this.config.minZoom = e >= 3 ? e : 3
		},
		setCenterIn: function(e, i) {
			this.panToIn(e, i)
		},
		getRenderType: function() {
			return this._renderType
		},
		getSolarInfo: function(hQ) {
			hQ = hQ || this._initDate;
			var T = bz(hQ);
			var e = en.convertLL2MC(new hr(T[0], T[1]));
			var hY = e.latLng;
			var hT = bo.Projection.convertMC2LL(this.centerPoint);
			var hV = hQ.getUTCHours();
			var hX = hV + 24 * hT.lng / 360;
			var hW = hX - 12;
			var hU = hW * 60 * 0.25;
			var hS = Math.asin(Math.sin(dK(hT.lat)) * Math.sin(dK(hY.lat)) + Math.cos(dK(hT.lat)) * Math.cos(dK(hY.lat)) * Math.cos(dK(hU)));
			var hR = Math.asin(Math.sin(dK(hU)) * Math.cos(dK(hY.lat)) / Math.cos(hS));
			var i = "north";
			if(hT.lat < hY.lat) {
				i = "south"
			}
			return {
				zenith: e,
				solarAltitude: hS,
				solarAzimuth: hR,
				centerPosition: i,
				position: e
			}
		},
		setDisplayOptions: function(T) {
			if(!T) {
				return
			}
			for(var e in this._displayOptions) {
				if(this._displayOptions.hasOwnProperty(e)) {
					if(typeof T[e] === "boolean" || (e === "skyColors" && typeof T.skyColors === "object") || (e === "labelMargin" && typeof T.labelMargin === "number")) {
						this._displayOptions[e] = T[e]
					}
				}
			}
			var i = this.getMapType();
			if(i === da.NORMAL) {
				this.fire(new bb("ondisplayoptions_changed"))
			} else {
				if(i === da.EARTH && this._earth) {
					this._earth.fire(new bb("ondisplayoptions_changed"))
				}
			}
		},
		getHorizonPosY: function(e) {
			if(!e || !this._webglMapCamera) {
				return null
			}
			var i = this._webglMapCamera.fromMCToScreenPixel(e.lng, e.lat, {
				heading: 0
			});
			return i.y
		},
		getIndoorInfo: function() {
			if(!this._indoorMgr) {
				return
			}
			return this._indoorMgr.getData()
		},
		showIndoor: function(e, T) {
			var i = new bb("onindoor_status_changed");
			i.uid = e;
			i.floor = T;
			this.fire(i)
		},
		addAreaSpot: function(e, T) {
			if(!e || e.length === 0) {
				return
			}
			T = T || {};
			this.areaSpots = this.areaSpots || {};
			var i = T.id || ("sp" + (this.temp.spotsGuid++));
			this.areaSpots[i] = {
				spot: e,
				userData: T.userData
			};
			var hQ = this;
			ea.load("hotspot", function() {
				hQ._asyncRegister()
			});
			return i
		},
		getAreaSpot: function(e) {
			if(this.areaSpots && this.areaSpots[e]) {
				return this.areaSpots[e]
			}
			return null
		},
		removeAreaSpot: function(e) {
			if(!e || !this.areaSpots[e]) {
				return
			}
			delete this.areaSpots[e]
		},
		clearAreaSpots: function() {
			this.areaSpots = {}
		},
		resetSpotStatus: function() {
			this.fire(new bb("onspot_status_reset"))
		},
		hightlightSpotByUid: function(e, T) {
			var i = new bb("onspot_highlight");
			i.uid = e;
			i.tilePosStr = T;
			this.fire(i)
		},
		setZoomIn: function(i, e) {
			e = e || {};
			this.zoomTo(i, e.zoomCenter || null, e)
		},
		getCurrentMaxTilt: function() {
			var e = this.zoomLevel;
			if(this.mapType === "B_EARTH_MAP") {
				return c8.MAX_DRAG_TILT_L2
			}
			if(this.config.restrictCenter === false) {
				return c8.MAX_DRAG_TILT
			}
			if(e >= 19) {
				return c8.MAX_DRAG_TILT
			} else {
				if(e <= 18) {
					if(e < this._enableTiltZoom) {
						if(e >= this._enableTiltZoom - 2) {
							return(1 - (this._enableTiltZoom - e) / 2) * c8.MAX_DRAG_TILT_L2
						}
						return 0
					}
					return c8.MAX_DRAG_TILT_L2
				} else {
					return(c8.MAX_DRAG_TILT - c8.MAX_DRAG_TILT_L2) * (e - 18) + c8.MAX_DRAG_TILT_L2
				}
			}
		},
		worldSize: function(i) {
			var e = i || this.zoomLevel;
			return c8.WORLD_SIZE_MC / this.getZoomUnits(e)
		},
		setTrafficOn: function() {
			this.addTileLayer(ce)
		},
		setTrafficOff: function() {
			this.removeTileLayer(ce)
		},
		showOverlayContainer: function() {
			this.setDisplayOptions({
				overlay: true
			})
		},
		hideOverlayContainer: function() {
			this.setDisplayOptions({
				overlay: false
			})
		},
		addLabelsToMapTile: function(T) {
			for(var e = 0; e < T.length; e++) {
				if(typeof T[e].type === "undefined") {
					T[e].type = "fixed"
				}
				if(typeof T[e].rank !== "number") {
					T[e].rank = 50000
				}
				T[e].pt = T[e].position;
				T[e].custom = true;
				T[e].processedInZoom = 0;
				this._customTileLabels.push(T[e])
			}
			this.dispatchEvent(new bb("onadd_tile_labels"))
		},
		removeLabelsFromMapTile: function(T) {
			for(var hQ = 0; hQ < T.length; hQ++) {
				for(var e = 0; e < this._customTileLabels.length; e++) {
					if(this._customTileLabels[e].uid === T[hQ]) {
						this._customTileLabels.splice(e, 1)
					}
				}
			}
			this.dispatchEvent(new bb("onremove_tile_labels"))
		},
		clearLabels: function() {
			this._customTileLabels.length = 0;
			this.dispatchEvent(new bb("onclear_labels"))
		},
		loadMapStyleFiles: function(hR) {
			var i = this.config.style;
			var hQ = this.config.styleUrl;
			var T = this;
			this._setTextRenderType();
			if(typeof i === "string" && !hQ) {
				if(bo["FeatureStyle" + i]) {
					T.fire(new bb("onstyle_loaded"));
					hR();
					return
				}
				hl.load(e3.getMapStyleFiles(i), function() {
					if(T.config.style === i) {
						bo["FeatureStyle" + i] = window.FeatureStyle;
						bo["iconSetInfo" + i] = window.iconSetInfo_high;
						bo.indoorStyle = window.indoorStyle;
						T.fire(new bb("onstyle_loaded"));
						hR()
					}
				})
			} else {
				var e = i;
				f.init(T);
				f.getStyleJson(e, function(hT) {
					var hY = gd;
					var h0 = bo.getGUID("custom");
					T.config.mapStyleId = h0;
					var hW = {};
					C.extend(hW, hT);
					var hU = Math.floor(T.getZoom());
					window.styleCbk = function(h1, h2) {
						if(h2 !== hX) {
							return
						}
						if(typeof h1 === "string") {
							h1 = JSON.parse(h1)
						}
						f.onStyleDataBack(h1, hU, h0, hW, hY);
						bo.customStyleLoaded = true;
						T.fire(new bb("onstyle_loaded"));
						hR()
					};
					bo.customStyleInfo = {
						zoomRegion: {},
						zoomStyleBody: [],
						zoomFrontStyle: {}
					};
					var hZ = f.getStyleUrl(hT, hY, "styleCbk", hU);
					var hS = hZ.split("?")[0];
					var hX = hZ.split("?")[1];
					if(hQ) {
						hS = hQ;
						hX = hS.split("?")[1]
					}
					if(!bo.iconSetInfoCustom) {
						var hV = e3.getMapStyleFiles("default");
						hV.splice(1, 1);
						hl.load(hV, function() {
							bo.iconSetInfoCustom = window.iconSetInfo_high;
							bo.indoorStyle = window.indoorStyle;
							if(hS.indexOf("jsonp") > "-1") {
								hl.load(hS)
							} else {
								bo.customStyleInfo.xhr = gz.post(hS, hX, styleCbk)
							}
						})
					} else {
						if(hS.indexOf("jsonp") > "-1") {
							hl.load(hS)
						} else {
							bo.customStyleInfo.xhr = gz.post(hS, hX, styleCbk)
						}
					}
				})
			}
		},
		setCopyrightOffset: function(hQ, i) {
			var T = new bb("oncopyrightoffsetchange", {
				logo: hQ,
				cpy: i
			});
			this.dispatchEvent(T)
		},
		_setTextRenderType: function(e) {
			if(e) {
				this.config.textRenderType = e;
				return
			}
			if(this.config.textRenderType !== null) {
				return
			}
			if(f4()) {
				this.config.textRenderType = "canvas"
			} else {
				if(typeof this.config.style === "string") {
					this.config.textRenderType = "image"
				} else {
					this.config.textRenderType = "canvas"
				}
			}
		},
		destroy: function() {
			this._destroyed = true;
			this.fire(new bb("ondestroy"))
		},
		centerAndZoom: function(e, hS, T) {
			if(Object.prototype.toString.call(hS) !== "[object Undefined]") {
				hS = parseInt(hS)
			}
			if(typeof e === "string") {
				var hQ = this;
				var hR = new V();
				hR.getPoint(e, function(hT) {
					e = hT;
					var hU = en.convertLL2MC(e);
					hQ.centerAndZoomIn(hU, hS, T)
				})
			} else {
				var i = en.convertLL2MC(e);
				this.centerAndZoomIn(i, hS, T)
			}
		},
		pointToPixel: function(e, T) {
			var i = en.convertLL2MC(e);
			var hQ = {};
			C.extend(hQ, T);
			if(hQ && hQ.center) {
				hQ.center = en.convertLL2MC(hQ.center)
			}
			return this.pointToPixelIn(i, hQ)
		},
		pixelToPoint: function(T, i) {
			var hQ = {};
			C.extend(hQ, i);
			if(hQ && hQ.center) {
				hQ.center = en.convertLL2MC(hQ.center)
			}
			var e = this.pixelToPointIn(T, hQ);
			return en.convertMC2LL(e)
		},
		pointToOverlayPixel: function(e, T) {
			var i = en.convertLL2MC(e);
			var hQ = {};
			C.extend(hQ, T);
			if(hQ && hQ.center) {
				hQ.center = en.convertLL2MC(hQ.center)
			}
			return this.pointToOverlayPixelIn(i, hQ)
		},
		overlayPixelToPoint: function(T, i) {
			var hQ = {};
			C.extend(hQ, i);
			if(hQ && hQ.center) {
				hQ.center = en.convertLL2MC(hQ.center)
			}
			var e = this.overlayPixelToPointIn(T, hQ);
			return en.convertMC2LL(e)
		},
		setViewport: function(T, hQ) {
			var e;
			if(T && T.center) {
				e = {};
				C.extend(e, T);
				e.center = en.convertLL2MC(e.center)
			} else {
				e = [];
				for(var hR = 0; hR < T.length; hR++) {
					e[hR] = en.convertLL2MC(T[hR])
				}
			}
			this.setViewportIn(e, hQ)
		},
		getViewport: function(hS, hQ) {
			var T;
			if(hS && hS.length) {
				T = [];
				for(var hR = 0; hR < hS.length; hR++) {
					T[hR] = en.convertLL2MC(hS[hR])
				}
			} else {
				if(hS instanceof dS) {
					T = new dS(en.convertLL2MC(hS.getSouthWest()), en.convertLL2MC(hS.getNorthEast()));
					T.setMinMax()
				}
			}
			var e = this.getViewportIn(T, hQ);
			e.center = en.convertMC2LL(e.center);
			return e
		},
		getDistance: function(hR, T) {
			var i = en.convertLL2MC(hR);
			var hQ = en.convertLL2MC(T);
			var e = this.getDistanceIn(i, hQ);
			return e
		},
		setCenter: function(e, T) {
			if(typeof e === "string") {
				var hQ = this;
				var hR = new V();
				hR.getPoint(e, function(hS) {
					e = hS;
					var hT = en.convertLL2MC(e);
					hQ.setCenterIn(hT, T)
				})
			} else {
				var i = en.convertLL2MC(e);
				this.setCenterIn(i, T)
			}
		},
		setZoom: function(T, e) {
			var i = {};
			C.extend(i, e);
			if(i && i.zoomCenter) {
				i.zoomCenter = en.convertLL2MC(i.zoomCenter)
			}
			this.setZoomIn(T, i)
		},
		flyTo: function(e, T) {
			var i = en.convertLL2MC(e);
			this.flyToIn(i, T)
		},
		panTo: function(e, T) {
			var i = en.convertLL2MC(e);
			this.panToIn(i, T)
		},
		getCenter: function() {
			var e = this.getCenterIn();
			return en.convertMC2LL(e)
		},
		getBounds: function() {
			var e = this.getBoundsIn();
			var i = new dS(en.convertMC2LL(e.getSouthWest()), en.convertMC2LL(e.getNorthEast()));
			return i
		},
		setMapStyleV2: function(e) {
			this._setTextRenderType("canvas");
			this.setOptions({
				style: e
			})
		},
		startViewAnimation: function(T) {
			var e = T._options.delay;
			var i = this;
			setTimeout(function() {
				T._start(i)
			}, e)
		},
		pauseViewAnimation: function(e) {
			e._pause(this)
		},
		continueViewAnimation: function(e) {
			e._continue(this)
		},
		cancelViewAnimation: function(e) {
			e._cancel(this)
		},
		getMapScreenshot: function() {
			return this._webglMapScene._painter._canvas.toDataURL()
		}
	});
	var da = {
		NORMAL: "B_NORMAL_MAP",
		EARTH: "B_EARTH_MAP",
		SATELLITE: "B_STREET_MAP"
	};
	bo.MapTypeId = da;
	window.BMAP_NORMAL_MAP = "B_NORMAL_MAP";
	window.BMAPGL_NORMAL_MAP = "B_NORMAL_MAP";
	window.BMAP_SATELLITE_MAP = "B_SATELLITE_MAP";
	window.BMAP_HYBRID_MAP = "B_STREET_MAP";
	window.BMAP_EARTH_MAP = "B_EARTH_MAP";
	window.BMAP_COORD_MERCATOR = 1;
	window.BMAP_SYS_DRAWER = 0;
	window.BMAP_SVG_DRAWER = 1;
	window.BMAP_VML_DRAWER = 2;
	window.BMAP_CANVAS_DRAWER = 3;
	var f = {
		environment: "jsapi",
		map: null,
		ontilesloaded: false,
		onstyle_loaded: false,
		init: function(i) {
			var e = this;
			e.map = i;
			this.changeCopyright();
			this.setEnvironment(e.map.config.style);
			this.resetEventListener()
		},
		resetEventListener: function() {
			var e = this;
			this.ontilesloaded = false;
			this.onstyle_loaded = false;
			e.map.addEventListener("ontilesloaded", e.checkLoadedStatus);
			e.map.addEventListener("onstyle_loaded", e.checkLoadedStatus)
		},
		checkLoadedStatus: function(i) {
			f[i.type] = true;
			if(f.ontilesloaded && f.onstyle_loaded) {
				this.dispatchEvent(new bb("onstylechangetilesloaded"));
				this.removeEventListener("ontilesloaded", f.checkLoadedStatus);
				this.removeEventListener("onstyle_loaded", f.checkLoadedStatus)
			}
		},
		changeCopyright: function() {
			var e = this;
			if(e.map.cpyCtrl) {
				e.map.cpyCtrl.hide();
				if(e.environment !== "customEditor") {
					e.map.setCopyrightOffset(new d9(1, 1))
				}
			} else {
				e.map.addEventListener("oncopyrightaddend", function() {
					e.map.cpyCtrl.hide();
					if(e.environment !== "customEditor") {
						e.map.setCopyrightOffset(new d9(1, 1))
					}
				})
			}
		},
		setEnvironment: function(e) {
			if(e.customEditor) {
				this.environment = "customEditor";
				bJ.map = this.map
			} else {
				if(e.sharing) {
					this.environment = "sharing"
				} else {
					if(e.preview) {
						this.environment = "preview"
					} else {
						this.environment = "jsapi"
					}
				}
			}
		},
		getStyleJson: function(hQ, hS) {
			var hR = this;
			if(hQ.styleJson) {
				hS && hS(hQ.styleJson)
			} else {
				if(hQ.styleId) {
					var i = hQ.styleId;
					var e = (Math.random() * 100000).toFixed(0);
					bo["_cbk_si_phpui" + e] = function(hU) {
						var hT = [];
						if(hU.result && hU.result["error"] === 0 && hU.content && hU.content["status"] === 0) {
							hT = hR.parseJson(hU.content["data"]["json"]);
							hS && hS(hT)
						} else {
							hS && hS("default")
						}
					};
					bo["_cbk_si_api" + e] = function(hU) {
						var hT = [];
						if(hU.status === 0) {
							if(hU.info) {
								hT = hR.parseJson(hU.info["json"])
							} else {
								hT = hR.parseJson(hU.data["json"])
							}
							hS && hS(hT)
						} else {
							hS && hS("default")
						}
					};
					var T = "";
					switch(this.environment) {
						case "jsapi":
							T = eV.apiHost + "/?qt=custom_map&v=3.0&style_id=" + i + "&type=publish&ak=" + gd;
							T += "&callback=" + eA + "._cbk_si_phpui" + e;
							break;
						case "sharing":
							T += "/apiconsole/custommap/getSharingJson";
							T += "?styleid=" + i + "&type=edit";
							T += "&ck=" + eA + "._cbk_si_api" + e;
							break;
						case "preview":
							T += "/apiconsole/custommap/getJson";
							T += "?styleid=" + i + "&type=edit";
							T += "&ck=" + eA + "._cbk_si_api" + e;
							break
					}
					hl.load(T)
				} else {
					hS && hS("default")
				}
			}
		},
		parseJson: function(T) {
			if(T === null || T === "") {
				return []
			}
			var i = {
				t: "featureType",
				e: "elementType",
				v: "visibility",
				c: "color",
				l: "lightness",
				s: "saturation",
				w: "weight",
				z: "level",
				h: "hue",
				f: "fontsize",
				zri: "curZoomRegionId",
				zr: "curZoomRegion"
			};
			var hR = {
				all: "all",
				g: "geometry",
				"g.f": "geometry.fill",
				"g.s": "geometry.stroke",
				l: "labels",
				"l.t.f": "labels.text.fill",
				"l.t.s": "labels.text.stroke",
				"l.t": "labels.text",
				"l.i": "labels.icon",
				"g.tf": "geometry.topfill",
				"g.sf": "geometry.sidefill"
			};
			var hQ = T.split(",");
			var e = hQ.map(function(hV) {
				var hU = hV.split("|").map(function(h1) {
					var hZ = i[h1.split(":")[0]];
					var hY = (hR[h1.split(":")[1]] ? hR[h1.split(":")[1]] : h1.split(":")[1]);
					switch(hY) {
						case "poi":
							hY = "poilabel";
							break;
						case "districtlabel":
							hY = "districtlabel";
							break
					}
					var h0 = {};
					h0[hZ] = hY;
					return h0
				});
				var hS = hU[0];
				var hX = 1;
				if(hU[1]["elementType"]) {
					hX = 2;
					C.extend(hS, hU[1])
				}
				var hW = {};
				for(var hT = hX; hT < hU.length; hT++) {
					C.extend(hW, hU[hT])
				}
				return C.extend(hS, {
					stylers: hW
				})
			});
			return e
		},
		getStyleUrl: function(T, hR, hQ, e) {
			this.styleJson = T;
			var i = e3.apiHost + "/custom/v2/mapstyle?version=" + 4 + "&ak=" + hR + "&";
			i += "is_all=true&is_new=1&";
			i += "styles=" + encodeURIComponent(this.styleJson2styleStringV2(T, e));
			return i
		},
		styleJson2styleStringV2: function(e, hV) {
			var hW = {
				featureType: "t",
				elementType: "e",
				visibility: "v",
				color: "c",
				lightness: "l",
				saturation: "s",
				weight: "w",
				level: "z",
				hue: "h",
				fontsize: "f"
			};
			var hY = {
				all: "all",
				geometry: "g",
				"geometry.fill": "g.f",
				"geometry.stroke": "g.s",
				labels: "l",
				"labels.text.fill": "l.t.f",
				"labels.text.stroke": "l.t.s",
				"labels.text": "l.t",
				"labels.icon": "l.i",
				"geometry.topfill": "g.tf",
				"geometry.sidefill": "g.sf"
			};
			var hZ = [];
			for(var hQ = this.map.getMinZoom(); hQ <= this.map.getMaxZoom(); hQ++) {
				bo.customStyleInfo.zoomFrontStyle[hQ] = {}
			}
			bo.customStyleInfo.zoomFrontStyle.main = {};
			var T = false;
			for(var hQ = 0; !!e[hQ]; hQ++) {
				var hX = e[hQ];
				if(this.isOnlyZoomStyler(hX)) {
					continue
				}
				hV = this.getFrontZoom(hX, hV);
				if((hX.featureType === "land" || hX.featureType === "all" || hX.featureType === "background") && typeof hX.elementType === "string" && (hX.elementType === "geometry" || hX.elementType === "geometry.fill" || hX.elementType === "all") && hX.stylers && !T) {
					if(hX.stylers["color"]) {
						bo.customStyleInfo.bmapLandColor = hX.stylers["color"]
					}
					if(hX.stylers["visibility"] && hX.stylers["visibility"] === "off") {
						bo.customStyleInfo.bmapLandColor = "#00000000"
					}
					if(hX.featureType === "land") {
						T = true
					}
				}
				if(hX.featureType === "building" && typeof hX.elementType === "string" && hX.elementType === "geometry.fill") {
					bo.customStyleInfo.buildingFill = true
				}
				if(hX.featureType === "roadarrow" && hX.elementType === "labels.icon" && hX.stylers) {
					bo.customStyleInfo.zoomFrontStyle[hV]["bmapRoadarrowVisibility"] = hX.stylers["visibility"]
				}
				var hR = {};
				C.extend(hR, hX);
				var hT = hR.stylers;
				delete hR.stylers;
				C.extend(hR, hT);
				var hS = [];
				for(var hU in hW) {
					if(hR[hU]) {
						if(this.isEditorZoomKeys(hU)) {
							continue
						}
						if(hU === "elementType") {
							hS.push(hW[hU] + ":" + hY[hR[hU]])
						} else {
							switch(hR[hU]) {
								case "poilabel":
									hR[hU] = "poi";
									break;
								case "districtlabel":
									hR[hU] = "label";
									break
							}
							hS.push(hW[hU] + ":" + hR[hU])
						}
					}
				}
				if(hS.length > 2) {
					hZ.push(hS.join("|"))
				}
			}
			return hZ.join(",")
		},
		getFrontZoom: function(i, e) {
			var T = i.stylers["level"];
			if(T === undefined) {
				return "main"
			} else {
				return parseInt(T, 10)
			}
		},
		isZoomConfig: function(e) {
			var i = e.stylers["level"];
			if(i === undefined) {
				return false
			} else {
				return true
			}
		},
		isOnlyZoomStyler: function(e) {
			var i = {};
			C.extend(i, e.stylers);
			delete i.curZoomRegionId;
			delete i.curZoomRegion;
			delete i.level;
			if(C.isEmptyObject(i)) {
				return true
			} else {
				return false
			}
		},
		isSelectZoom: function(i, e) {
			var T = i.stylers["level"];
			if(T === undefined) {
				return true
			} else {
				if(T === e + "") {
					return true
				} else {
					return false
				}
			}
		},
		isEditorZoomKeys: function(e) {
			var i = {
				curZoomRegionId: true,
				curZoomRegion: true
			};
			if(i[e]) {
				return true
			} else {
				return false
			}
		},
		getZoomRegion: function(e, i) {
			var hQ = e.stylers["level"];
			var T = {};
			C.extend(T, i);
			if(hQ === undefined) {
				return T
			} else {
				T[parseInt(hQ, 10)] = true;
				return T
			}
		},
		onStyleDataBack: function(hQ, e, i, T, hS) {
			if(hQ.status !== 0) {
				return
			}
			if(hQ.data.style.length === 3) {
				if(!bo.customStyleInfo.baseFs) {
					bo.customStyleInfo.baseFs = hQ.data.style
				}
				bo.StyleBody = hQ.data.style[2]
			} else {
				bo.StyleBody = hQ.data.style
			}
			var hR = bo.customStyleInfo.baseFs;
			bo["FeatureStyle" + i] = hR;
			this.updateFrontFeatureStyle()
		},
		updateFrontFeatureStyle: function() {
			if(bo.customStyleInfo.zoomFrontStyle.main["bmapRoadarrowVisibility"]) {
				for(var e = this.map.getMinZoom(); e <= this.map.getMaxZoom(); e++) {
					if(!bo.customStyleInfo.zoomFrontStyle[e]["bmapRoadarrowVisibility"]) {
						bo.customStyleInfo.zoomFrontStyle[e]["bmapRoadarrowVisibility"] = bo.customStyleInfo.zoomFrontStyle.main["bmapRoadarrowVisibility"]
					}
				}
			}
		}
	};
	var bJ = {
		map: null,
		labelCache: {},
		calcDrawMc: function(T, i, e) {
			var hQ = [];
			switch(i) {
				case "fill":
					hQ = this.calcFill(T, e);
					break;
				case "line":
					break;
				case "building3d":
					hQ = this.calcBuilding3d(T, e);
					break
			}
			return hQ
		},
		calcFill: function(hR, T) {
			var hS = [];
			for(var hQ = 0; hQ < hR.length; hQ = hQ + 5) {
				var e = this.coordToMc({
					x: hR[hQ],
					y: hR[hQ + 1]
				}, T.row, T.col, T.mercatorSize, T.baseTileSize);
				hS.push(e[0], e[1])
			}
			return hS
		},
		calcLine: function(hR, T) {
			var hS = [];
			var hT = new Int16Array(hR.buffer);
			for(var hQ = 0; hQ < hT.length; hQ = hQ + 10) {
				var e = this.coordToMc({
					x: hT[hQ] / 10,
					y: hT[hQ + 1] / 10
				}, T.row, T.col, T.mercatorSize, T.baseTileSize);
				hS.push(e[0], e[1])
			}
			return hS
		},
		calcBuilding3d: function(hS, T) {
			var hT = [];
			var hQ = {};
			for(var hR = 0; hR < hS.length / 2; hR = hR + 7) {
				if(hS[hR] === hS[hR - 7] && hS[hR + 1] === hS[hR - 6]) {
					continue
				}
				if(hQ[hS[hR].toString() + hS[hR + 1].toString()]) {
					continue
				}
				hQ[hS[hR].toString() + hS[hR + 1].toString()] = true;
				var e = this.coordToMc({
					x: hS[hR],
					y: hS[hR + 1]
				}, T.row, T.col, T.mercatorSize, T.baseTileSize);
				hT.push(e[0], e[1])
			}
			return hT
		},
		coordToMc: function(hR, hQ, e, i, T) {
			return [hR.x * (i / T) + e * i, hR.y * (i / T) + hQ * i]
		},
		addDrawIntoAreaSpots: function(e, hR) {
			if(f.environment !== "customEditor") {
				return
			}
			if(!hR.styleIds) {
				return
			}
			for(var T = 0; T < hR.styleIds.length; T++) {
				var hU = 0;
				if(T > 0) {
					hU = hR.verticesLength[T - 1]
				}
				end = hR.verticesLength[T];
				var hS = [];
				var hQ = "";
				if(hR.vertex) {
					hS = hR.vertex;
					hQ = "building3d"
				} else {
					if(hR.data[0]) {
						hS = hR.data[0];
						hQ = hR.type
					} else {
						continue
					}
				}
				var hT = this.calcDrawMc(hS.slice(hU, end), hQ, e);
				this.map.addAreaSpot(hT, {
					userData: {
						styleId: hR.styleIds[T],
						type: "mapstyle"
					}
				})
			}
		},
		addLabelIntoAreaSpots: function(e) {
			if(f.environment !== "customEditor") {
				return
			}
			for(var hR = 0; hR < e.length; hR++) {
				var hS = e[hR];
				for(var hQ = 0; hQ < hS.fixedLabel.length; hQ++) {
					var T = hS.fixedLabel[hQ];
					if(!T._mcBds) {
						continue
					}
					var hT = [T._mcBds[0].lng, T._mcBds[0].lat, T._mcBds[0].lng, T._mcBds[1].lat, T._mcBds[1].lng, T._mcBds[1].lat, T._mcBds[1].lng, T._mcBds[0].lat];
					if(!this.labelCache[hT.join()]) {
						this.labelCache[hT.join()] = true;
						this.map.addAreaSpot(hT, {
							userData: {
								styleId: T.styleId,
								type: "mapstyle",
								name: T.name
							}
						})
					}
				}
			}
		}
	};

	function bR(i, e, hQ, T) {
		this.cx = 3 * i;
		this.bx = 3 * (hQ - i) - this.cx;
		this.ax = 1 - this.cx - this.bx;
		this.cy = 3 * e;
		this.by = 3 * (T - e) - this.cy;
		this.ay = 1 - this.cy - this.by;
		this.p1x = i;
		this.p1y = T;
		this.p2x = hQ;
		this.p2y = T
	}
	bR.prototype.sampleCurveX = function(e) {
		return((this.ax * e + this.bx) * e + this.cx) * e
	};
	bR.prototype.sampleCurveY = function(e) {
		return((this.ay * e + this.by) * e + this.cy) * e
	};
	bR.prototype.sampleCurveDerivativeX = function(e) {
		return(3 * this.ax * e + 2 * this.bx) * e + this.cx
	};
	bR.prototype.solveCurveX = function(e, hV) {
		if(typeof hV === "undefined") {
			hV = 0.000001
		}
		var hU;
		var hT;
		var hR;
		var T;
		var hQ;
		for(hR = e, hQ = 0; hQ < 8; hQ++) {
			T = this.sampleCurveX(hR) - e;
			if(Math.abs(T) < hV) {
				return hR
			}
			var hS = this.sampleCurveDerivativeX(hR);
			if(Math.abs(hS) < 0.000001) {
				break
			}
			hR = hR - T / hS
		}
		hU = 0;
		hT = 1;
		hR = e;
		if(hR < hU) {
			return hU
		}
		if(hR > hT) {
			return hT
		}
		while(hU < hT) {
			T = this.sampleCurveX(hR);
			if(Math.abs(T - e) < hV) {
				return hR
			}
			if(e > T) {
				hU = hR
			} else {
				hT = hR
			}
			hR = (hT - hU) * 0.5 + hU
		}
		return hR
	};
	bR.prototype.solve = function(e, i) {
		return this.sampleCurveY(this.solveCurveX(e, i))
	};
	var cn = {};

	function o(T) {
		var e = {
			duration: 1000,
			fps: 30,
			delay: 0,
			transition: cn.linear,
			dropLastAnimation: false
		};
		if(T) {
			for(var hQ in T) {
				e[hQ] = T[hQ]
			}
		}
		if(T.beginTime) {
			this._beginTime = T.beginTime
		}
		this._callbacks = [];
		this._options = e;
		if(e.delay) {
			var hR = this;
			setTimeout(function() {
				hR._doStart()
			}, e.delay)
		} else {
			this._doStart()
		}
		this._pauseTime = 0
	}
	o.INFINITE = "INFINITE";
	o.prototype._doStart = function() {
		if(this._isPausing) {
			var e = performance.now() || new Date().getTime();
			this._pauseTime += e - this._isPausing;
			this._isPausing = undefined
		}
		if(window.requestAnimationFrame) {
			var i = this;
			i._timer = window.requestAnimationFrame(function(T) {
				i._loop(T)
			})
		} else {
			this._beginTime = new Date().getTime();
			if(this._options.duration === o.INFINITE) {
				this._endTime = null
			} else {
				this._endTime = this._beginTime + this._options.duration
			}
			this._loop()
		}
	};
	o.prototype._loop = function(hQ) {
		var hT = this;
		hQ = hQ || new Date().getTime();
		hQ = hQ - this._pauseTime;
		if(!this._beginTime) {
			this._beginTime = hQ
		}
		if(!this._endTime && typeof this._options.duration === "number") {
			this._endTime = this._beginTime + this._options.duration
		}
		if(hT._endTime !== null && hQ >= hT._endTime) {
			if(hT._options.dropLastAnimation === false) {
				hT._options.render(hT._options.transition(1), 1, hQ)
			}
			if(typeof hT._options.finish === "function") {
				hT._options.finish(hQ, this)
			}
			for(var hS = 0, e = hT._callbacks.length; hS < e; hS++) {
				hT._callbacks[hS]()
			}
			return
		}
		var hR;
		if(typeof hT._options.duration === "number") {
			hR = (hQ - hT._beginTime) / hT._options.duration;
			hT.schedule = hT._options.transition(hR)
		} else {
			hR = hQ - hT._beginTime;
			hT.schedule = 0
		}
		hT._options.render(hT.schedule, hR, hQ);
		if(!hT.terminative) {
			if(window.requestAnimationFrame) {
				hT._timer = requestAnimationFrame(function T(i) {
					hT._loop(i)
				})
			} else {
				hT._timer = setTimeout(function() {
					hT._loop()
				}, 1000 / hT._options.fps)
			}
		}
	};
	o.prototype.stop = function(i, e) {
		this.terminative = true;
		if(this._timer) {
			if(window.cancelAnimationFrame) {
				cancelAnimationFrame(this._timer)
			} else {
				clearTimeout(this._timer)
			}
			this._timer = null;
			if(typeof this._options.onStop === "function") {
				this._options.onStop(e)
			}
		}
		if(i) {
			this._endTime = this._beginTime;
			this._loop()
		}
	};
	o.prototype.pause = function() {
		if(!this._isPausing) {
			this.stop();
			this.terminative = undefined;
			this._isPausing = performance.now() || new Date().getTime()
		}
	};
	o.prototype.cancel = function() {
		this.stop()
	};
	o.prototype.append = function(e) {
		this._callbacks.push(e);
		return this
	};
	cn = {
		_p1: 1,
		_p2: 1 * 1.525,
		linear: function(e) {
			return e
		},
		reverse: function(e) {
			return 1 - e
		},
		easeInQuad: function(e) {
			return e * e
		},
		easeInCubic: function(e) {
			return Math.pow(e, 3)
		},
		easeInBiquad: function(e) {
			return Math.pow(e, 4)
		},
		easeInBack: function(e) {
			return e * e * ((cn._p1 + 1) * e - cn._p1)
		},
		easeOutQuad: function(e) {
			return -(e * (e - 2))
		},
		easeOutCubic: function(e) {
			return Math.pow((e - 1), 3) + 1
		},
		easeOutBiquad: function(e) {
			return 1 - Math.pow((e - 1), 4)
		},
		easeOutBack: function(e) {
			return((e = e - 1) * e * ((cn._p1 + 1) * e + cn._p1) + 1)
		},
		easeInOutQuad: function(e) {
			if(e < 0.5) {
				return e * e * 2
			} else {
				return -2 * (e - 2) * e - 1
			}
		},
		easeInOutCubic: function(e) {
			if(e < 0.5) {
				return Math.pow(e, 3) * 4
			} else {
				return Math.pow(e - 1, 3) * 4 + 1
			}
		},
		easeInOutBiquad: function(e) {
			if(e < 0.5) {
				return Math.pow(e, 4) * 8
			} else {
				return 1 - (Math.pow(e - 1, 4) * 8)
			}
		},
		easeInOutSine: function(e) {
			return(1 - Math.cos(Math.PI * e)) / 2
		}
	};
	cn.ease = (function() {
		var e = new bR(0.4, 0, 0.6, 1);
		return function(i) {
			return e.solve(i)
		}
	})();
	cn["ease-in"] = cn.easeInQuad;
	cn["ease-out"] = cn.easeOutQuad;
	var fk = {
		start: function(hW) {
			var hQ = hW.el;
			var e = hW.style;
			var i = hW.startValue;
			var hT = hW.endValue;
			var hR = hW.duration || 1400;
			var hS = hW.transition || cn.linear;
			var hV = hW.callback;
			var hU = hT - i;
			var T = hW.unit || "";
			return new o({
				fps: 60,
				duration: hR,
				transition: hS,
				render: function(hX) {
					hQ.style[e] = i + hU * hX + T
				},
				finish: function() {
					hV && hV()
				}
			})
		}
	};

	function cM(hR, T) {
		ed.call(this);
		this.keyframes = hR;
		var e = {
			duration: 1000,
			delay: 0,
			transition: cn.linear,
			interation: 1
		};
		if(T) {
			for(var hQ in T) {
				e[hQ] = T[hQ]
			}
		}
		this._options = e
	}
	cM.inherits(ed, "ViewAnimation");
	cM.prototype._start = function(hS) {
		var T = this;
		T.map = hS;
		var hR = new bb("onanimationstart");
		T.dispatchEvent(hR);
		this._initStatus(T.map);
		var hQ = this._options.duration;
		var i = this._options.interation;
		var hT = this._options.transition;
		var hU = 0;
		T.poiStatus = T.map._displayOptions.poi;
		if(T.poiStatus) {
			T.map.setDisplayOptions({
				poi: false
			})
		}
		T.map.viewAnimationTime = new Date().getTime();
		this.animation = new o({
			duration: hQ,
			transition: hT,
			start: function(e) {},
			render: function(hV, e) {
				if(hV === 0) {
					T._initStatus(T.map)
				} else {
					T._setViewByRate(hV)
				}
			},
			finish: function(hW, hV) {
				if(++hU < i || i === "INFINITE") {
					var hX = new bb("onanimationiterations");
					T.dispatchEvent(hX);
					delete hV._beginTime;
					delete hV._endTime;
					hV._doStart()
				} else {
					var hX = new bb("onanimationend");
					T.dispatchEvent(hX);
					delete T.map.viewAnimationTime;
					T.map.setDisplayOptions({
						poi: T.poiStatus
					})
				}
			}
		})
	};
	cM.prototype._getTotalDuration = function(e, i) {
		if(e === o.INFINITE) {
			return o.INFINITE
		} else {
			return e * i
		}
	};
	cM.prototype._initStatus = function(e) {
		if(this.keyframes[0]) {
			e.setCenter(this.keyframes[0].center, {
				noAnimation: true
			});
			e.setZoom(this.keyframes[0].zoom, {
				noAnimation: true
			});
			e.setTilt(this.keyframes[0].tilt, {
				noAnimation: true
			});
			e.setHeading(this.keyframes[0].heading, {
				noAnimation: true
			})
		}
	};
	cM.prototype._setViewByRate = function(hQ) {
		for(var e = 0; e < this.keyframes.length - 1; e++) {
			var hR = this.keyframes[e];
			var T = this.keyframes[e + 1];
			if(hQ >= hR.percentage && hQ < T.percentage) {
				this.map.setHeading(this._getHeadingDelta(hR, T, hQ), {
					noAnimation: true
				});
				this.map.setTilt(this._getTiltDelta(hR, T, hQ), {
					noAnimation: true
				});
				this.map.setCenter(this._getCenterDelta(hR, T, hQ), {
					noAnimation: true
				});
				this.map.setZoom(this._getZoomDelta(hR, T, hQ), {
					noAnimation: true
				})
			}
		}
	};
	cM.prototype._getHeadingDelta = function(T, i, e) {
		var hR = (e - T.percentage) / (i.percentage - T.percentage);
		var hQ = T.heading + (i.heading - T.heading) * hR;
		return hQ
	};
	cM.prototype._getTiltDelta = function(T, i, e) {
		var hR = (e - T.percentage) / (i.percentage - T.percentage);
		var hQ = T.tilt + (i.tilt - T.tilt) * hR;
		return hQ
	};
	cM.prototype._getCenterDelta = function(T, i, e) {
		var hR = (e - T.percentage) / (i.percentage - T.percentage);
		var hQ = T.center.add(i.center.sub(T.center).mult(hR));
		return hQ
	};
	cM.prototype._getZoomDelta = function(hQ, T, i) {
		var hR = (i - hQ.percentage) / (T.percentage - hQ.percentage);
		var e = hQ.zoom + (T.zoom - hQ.zoom) * hR;
		return e
	};
	cM.prototype._pause = function(e) {
		this.animation.pause()
	};
	cM.prototype._continue = function(e) {
		this.animation._doStart()
	};
	cM.prototype._cancel = function(T) {
		T.setDisplayOptions({
			poi: this.poiStatus
		});
		this.animation.cancel();
		delete T.viewAnimationTime;
		var i = new bb("onanimationcancel");
		this.dispatchEvent(i)
	};
	var eu = undefined;
	var c0 = {
		is64Bit: function() {
			if(/Windows/.test(navigator.userAgent)) {
				if(/Win64; x64/.test(navigator.userAgent)) {
					return true
				} else {
					if(/WOW64/.test(navigator.userAgent)) {
						return true
					} else {
						return false
					}
				}
			}
			return true
		},
		isIOS112: function cQ(e) {
			return /11_2/.test(navigator.userAgent)
		},
		canUseWebAssembly: function(i) {
			if(eu !== undefined) {
				i && i(eu);
				return
			}
			if(window.WebAssembly && this.is64Bit()) {
				if(window.disableWebAssembly === true) {
					eu = false;
					i && i(eu)
				} else {
					if(!bv()) {
						eu = true;
						i && i(eu)
					} else {
						if(this.isIOS112()) {
							eu = false;
							i && i(eu)
						} else {
							var e = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 133, 128, 128, 128, 0, 1, 96, 0, 1, 127, 3, 130, 128, 128, 128, 0, 1, 0, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0, 5, 131, 128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128, 0, 0, 7, 145, 128, 128, 128, 0, 2, 6, 109, 101, 109, 111, 114, 121, 2, 0, 4, 109, 97, 105, 110, 0, 0, 10, 138, 128, 128, 128, 0, 1, 132, 128, 128, 128, 0, 0, 65, 42, 11]);
							WebAssembly.instantiate(e).then(function(T) {
								eu = true;
								i && i(eu)
							}, function(T) {
								eu = false;
								i && i(eu)
							})
						}
					}
				}
			} else {
				eu = false;
				i && i(eu)
			}
		}
	};
	var dw = {};
	bo.Utils = dw;

	function dd(e) {
		return e.style
	}

	function dm(i) {
		if(C.Browser.ie > 0) {
			i.unselectable = "on";
			i.selectstart = function() {
				return false
			};
			i.onmousedown = function(T) {
				T.preventDefault();
				return false
			}
		} else {
			var e = dd(i);
			e.MozUserSelect = "none";
			e.WebkitUserSelect = "none";
			i.addEventListener("mousedown", function(T) {
				T.preventDefault()
			}, false)
		}
	}

	function hc(e) {
		return e && e.parentNode && e.parentNode.nodeType !== 11
	}

	function dI(i, e) {
		i.insertAdjacentHTML("beforeEnd", e);
		return i.lastChild
	}

	function hA(T, i) {
		var hQ = document.createElement("div");
		hQ.innerHTML = i;
		var e = hQ.childNodes[0];
		return T.parentNode.insertBefore(e, T)
	}

	function h(i) {
		i = i || window.event;
		i.stopPropagation ? i.stopPropagation() : i.cancelBubble = true
	}

	function bU(i) {
		i = i || window.event;
		i.preventDefault ? i.preventDefault() : i.returnValue = false;
		return false
	}

	function db(i) {
		h(i);
		return bU(i)
	}

	function fJ() {
		var e = document.documentElement;
		var i = document.body;
		if(e && (e.scrollTop || e.scrollLeft)) {
			return [e.scrollTop, e.scrollLeft]
		} else {
			if(i) {
				return [i.scrollTop, i.scrollLeft]
			} else {
				return [0, 0]
			}
		}
	}

	function fq(hR) {
		if(!hR) {
			return
		}
		hR.onload = hR.onerror = null;
		var T = hR.attributes,
			hQ, e, hS;
		if(T) {
			e = T.length;
			for(hQ = 0; hQ < e; hQ += 1) {
				hS = T[hQ].name;
				if(typeof hR[hS] === "function") {
					hR[hS] = null
				}
			}
		}
		T = hR.children;
		if(T) {
			e = T.length;
			for(hQ = 0; hQ < e; hQ += 1) {
				fq(hR.children[hQ])
			}
		}
	}

	function bG(i, hT, hS) {
		var hR = hT.lng - hS.lng;
		var hQ = hT.lat - hS.lat;
		if(hR === 0) {
			return Math.abs(i.lng - hT.lng)
		}
		if(hQ === 0) {
			return Math.abs(i.lat - hT.lat)
		}
		var T = hQ / hR;
		var e = hT.lat - T * hT.lng;
		return Math.abs(T * i.lng - i.lat + e) / Math.sqrt(T * T + 1)
	}

	function gV(i, e) {
		if(!i || !e) {
			return
		}
		return Math.round(Math.sqrt(Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2)))
	}

	function bP(i, e) {
		if(!i || !e) {
			return 0
		}
		return Math.round(Math.sqrt(Math.pow(i.lng - e.lng, 2) + Math.pow(i.lat - e.lat, 2)))
	}

	function c1(T, i) {
		var e = Math.round((T.x + i.x) / 2);
		var hQ = Math.round((T.y + i.y) / 2);
		return new ej(e, hQ)
	}

	function hi(e, T) {
		var i = [];
		T = T || function(hR) {
			return hR
		};
		for(var hQ in e) {
			i.push(hQ + "=" + T(e[hQ]))
		}
		return i.join("&")
	}

	function S(T, i, hS) {
		var hT = document.createElement(T);
		if(hS) {
			hT = document.createElementNS(hS, T)
		}
		i = i || {};
		for(var hQ in i) {
			var hR = {
				"for": "htmlFor",
				"class": "cssClass"
			}[hQ] || hQ;
			if(hQ === "style") {
				hT.style.cssText = i[hQ];
				continue
			}
			if(hQ === "class") {
				C.ac(hT, i[hQ]);
				continue
			}
			if(hT.setAttribute) {
				hT.setAttribute(hR, i[hQ])
			} else {
				try {
					hT[hR] = i[hQ]
				} catch(hT) {}
			}
		}
		return hT
	}

	function fY(e) {
		if(e.currentStyle) {
			return e.currentStyle
		} else {
			if(e.ownerDocument && e.ownerDocument.defaultView) {
				return e.ownerDocument.defaultView.getComputedStyle(e, null)
			}
		}
	}

	function bV(e) {
		return typeof e === "function"
	}
	var hn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	function g0(hR) {
		var T = "";
		var hY;
		var hW;
		var hU = "";
		var hX;
		var hV;
		var hT;
		var hS = "";
		var hQ = 0;
		var e = /[^A-Za-z0-9+/=]/g;
		if(!hR || e.exec(hR)) {
			return hR
		}
		hR = hR.replace(/[^A-Za-z0-9+/=]/g, "");
		do {
			hX = hn.indexOf(hR.charAt(hQ++));
			hV = hn.indexOf(hR.charAt(hQ++));
			hT = hn.indexOf(hR.charAt(hQ++));
			hS = hn.indexOf(hR.charAt(hQ++));
			hY = (hX << 2) | (hV >> 4);
			hW = ((hV & 15) << 4) | (hT >> 2);
			hU = ((hT & 3) << 6) | hS;
			T = T + String.fromCharCode(hY);
			if(hT !== 64) {
				T = T + String.fromCharCode(hW)
			}
			if(hS !== 64) {
				T = T + String.fromCharCode(hU)
			}
			hY = hW = hU = "";
			hX = hV = hT = hS = ""
		} while (hQ < hR.length);
		return T
	}(function(e) {
		if(!e.Utils) {
			e.Utils = {}
		}
		var i = e.Utils;
		i.format = (function() {
			function T(hT, hS, hU) {
				var hR = hU[+hS];
				return typeof(hR) === "function" ? hR(hS) : hR
			}

			function hQ(hT, hS, hU) {
				var hW = hS;
				var hX = [];
				var hR = hS.split(":");
				if(hR.length === 2) {
					hW = hR[0];
					hX.push(hR[1])
				}
				var hV = typeof(hU[hW]);
				if(hV === "function") {
					return hU[hW].apply(undefined, hX)
				} else {
					if(hV === "undefined") {
						return hT
					} else {
						return String(hU[hW])
					}
				}
			}
			return function(hR, hS) {
				var hU = hS.splice ? T : hQ;
				var hT = hR.splice ? hR.join("") : hR;
				return hT.replace(/{([a-zA-Z0-9_$:.]+)}/g, function(hW, hV) {
					return hU(hW, hV, hS)
				})
			}
		})();
		i.ErrorMonitor = function(hQ, T, hR) {};
		c0.canUseWebAssembly(function(T) {
			i.canUseWebAssembly = T
		})
	})(bo);

	function f4() {
		return(bv() || eB())
	}

	function bv() {
		var e = navigator.userAgent;
		if(e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1) {
			return true
		}
		return false
	}

	function eB() {
		var e = navigator.userAgent;
		if(e.indexOf("Android") > -1) {
			return true
		}
		return false
	}

	function dK(e) {
		return e * Math.PI / 180
	}

	function de(e) {
		return e / Math.PI * 180
	}

	function dO(e, hR) {
		var hQ = Math.pow(10, hR);
		if(typeof e === "number") {
			return Math.round(e * hQ) / hQ
		}
		for(var T = 0; T < e.length; T++) {
			e[T] = dO(e[T], hR)
		}
		return e
	}

	function fF(T, i, e) {
		if(T < i) {
			T = i
		} else {
			if(T > e) {
				T = e
			}
		}
		return T
	}

	function fZ(e, i) {
		while(e < 0) {
			e += i
		}
		return e % i
	}

	function d8(i, e) {
		return(i >= 0 && e >= 0) || (i < 0 && e < 0)
	}

	function a5(i) {
		if(i._gl) {
			return i._gl
		}
		var e = {
			alpha: true,
			antialias: false,
			failIfMajorPerformanceCaveat: false,
			preserveDrawingBuffer: false,
			stencil: false
		};
		var T = i.getContext("webgl", e) || i.getContext("experimental-webgl", e);
		i._gl = T;
		return T
	}

	function eK(hQ, T) {
		for(var e = 0; e < T.length; e++) {
			C.on(hQ, T[e], h)
		}
	}

	function hP(i, T, e) {
		T[e] = i.getUniformLocation(T, e)
	}

	function e1(hR, hS, e, T, i) {
		var hQ = "";
		switch(i) {
			case "mat4":
				hR.uniformMatrix4fv(hS[e], false, T);
				return;
			case "v3":
				hQ = "uniform3fv";
				break;
			case "f":
				hQ = "uniform1f";
				break;
			case "i":
				hQ = "uniform1i";
				break
		}
		if(hQ === "") {
			throw "error"
		}
		hR[hQ](hS[e], T)
	}

	function K(hY, e) {
		while(hY < 0) {
			hY += 360
		}
		hY = hY % 360;
		var hQ = e.width;
		var hX = e.height;
		var hT = hQ;
		var T = hX;
		if(hY < 90) {
			var i = Math.sin(dK(hY)) * hQ;
			var hV = Math.sin(dK(hY)) * hX;
			var hW = Math.cos(dK(hY)) * hQ;
			var hS = Math.cos(dK(hY)) * hX;
			var hT = Math.ceil(hW + hV);
			var T = Math.ceil(i + hS)
		} else {
			if(hY < 180) {
				var hY = hY - 90;
				var i = Math.sin(dK(hY)) * hQ;
				var hV = Math.sin(dK(hY)) * hX;
				var hW = Math.cos(dK(hY)) * hQ;
				var hS = Math.cos(dK(hY)) * hX;
				var hT = Math.ceil(i + hS);
				var T = Math.ceil(hW + hV)
			} else {
				if(hY < 270) {
					var hY = hY - 180;
					var i = Math.sin(dK(hY)) * hQ;
					var hV = Math.sin(dK(hY)) * hX;
					var hW = Math.cos(dK(hY)) * hQ;
					var hS = Math.cos(dK(hY)) * hX;
					var hT = Math.ceil(hW + hV);
					var T = Math.ceil(i + hS)
				} else {
					var hY = hY - 270;
					var i = Math.sin(dK(hY)) * hQ;
					var hV = Math.sin(dK(hY)) * hX;
					var hW = Math.cos(dK(hY)) * hQ;
					var hS = Math.cos(dK(hY)) * hX;
					var hT = Math.ceil(i + hS);
					var T = Math.ceil(hW + hV)
				}
			}
		}
		var hU = hT - hQ;
		var hR = T - hX;
		return [0 - hU / 2, 0 - hR / 2, hQ + hU / 2, hX + hR / 2]
	}

	function gE(e) {
		if(e.toDataURL() === gE._blankData) {
			return true
		}
		return false
	}

	function gu(hR, hQ, T) {
		var i = [T.lng - hR.lng, T.lat - hR.lat];
		var e = [hQ.lng - hR.lng, hQ.lat - hR.lat];
		return i[0] * e[1] - i[1] * e[0]
	}

	function ch(hS, hR, T) {
		var e;
		var hT;
		var hQ;
		var i;
		if(hS.lng < hR.lng) {
			e = hS.lng;
			hQ = hR.lng
		} else {
			e = hR.lng;
			hQ = hS.lng
		}
		if(hS.lat < hR.lat) {
			hT = hS.lat;
			i = hR.lat
		} else {
			hT = hR.lat;
			i = hS.lat
		}
		if(T.lng < e || T.lng > hQ || T.lat < hT || T.lat > i) {
			return false
		}
		return true
	}

	function gw(hU, hT, hS, hQ) {
		var hR = gu(hS, hQ, hU);
		var T = gu(hS, hQ, hT);
		var i = gu(hU, hT, hS);
		var e = gu(hU, hT, hQ);
		if(hR * T < 0 && i * e < 0) {
			return true
		} else {
			if(hR === 0 && ch(hS, hQ, hU)) {
				return true
			} else {
				if(T === 0 && ch(hS, hQ, hT)) {
					return true
				} else {
					if(i === 0 && ch(hU, hT, hS)) {
						return true
					} else {
						if(e === 0 && ch(hU, hT, hQ)) {
							return true
						} else {
							return false
						}
					}
				}
			}
		}
	}

	function hy(T, i) {
		var e = i.parentNode;
		if(e.lastChild === i) {
			e.appendChild(T)
		} else {
			e.insertBefore(T, i.nextSibling)
		}
	}

	function hE(hW, hX) {
		if(hX === 0) {
			return hW
		}
		var hV = 0;
		var hT = 0;
		if(!hW) {
			throw "异常"
		}
		if(hW.length === 0) {
			return []
		}
		for(var hR = 1, T = hW.length - 1; hR < T; hR++) {
			var hU = bG(hW[hR], hW[0], hW[hW.length - 1]);
			if(hU > hV) {
				hT = hR;
				hV = hU
			}
		}
		var e = [];
		if(hV >= hX) {
			var hZ = hW.slice(0, hT);
			var hY = hW.slice(hT, hW.length);
			var hS = hE(hZ, hX);
			var hQ = hE(hY, hX);
			for(var hR = 0, T = hS.length; hR < T; hR++) {
				e.push(hS[hR])
			}
			for(var hR = 0, T = hQ.length; hR < T; hR++) {
				e.push(hQ[hR])
			}
		} else {
			e.push(hW[0]);
			e.push(hW[hW.length - 1])
		}
		return e
	}

	function eC(e) {
		if(Math.log2) {
			return Math.log2(e)
		}
		return Math.log(e) / Math.LN2
	}

	function br(T, i, e) {
		return Math.min(e, Math.max(i, T))
	}

	function cJ(e, i) {
		if(!i) {
			return e
		}
		var hS = i[0];
		var hR = i[1];
		var hQ = i[2];
		var T = i[3];
		var hU = [];
		var hT = [];
		hU[0] = T * e[0] + hQ * e[2];
		hU[1] = e[1];
		hU[2] = -hQ * e[0] + T * e[2];
		hT[0] = hU[0];
		hT[1] = hR * hU[1] - hS * hU[2];
		hT[2] = hS * hU[1] + hR * hU[2];
		return hT
	}
	var aQ = Math.PI / 180;
	var E = 180 / Math.PI;

	function bz(T) {
		var i = (T - Date.UTC(2000, 0, 1, 12)) / 86400000 / 36525;
		var e = (d3.utcDay.floor(T) - T) / 86400000 * 360 - 180;
		return [e - U(i) * E, gB(i) * E]
	}

	function U(hQ) {
		var hR = f6(hQ);
		var i = dL(hQ);
		var T = aj(hQ);
		var hS = Math.tan(f2(hQ) / 2);
		hS *= hS;
		return hS * Math.sin(2 * T) - 2 * hR * Math.sin(i) + 4 * hR * hS * Math.sin(i) * Math.cos(2 * T) - 0.5 * hS * hS * Math.sin(4 * T) - 1.25 * hR * hR * Math.sin(2 * i)
	}

	function gB(e) {
		return Math.asin(Math.sin(f2(e)) * Math.sin(gY(e)))
	}

	function gY(e) {
		return bh(e) - (0.00569 + 0.00478 * Math.sin((125.04 - 1934.136 * e) * aQ)) * aQ
	}

	function bh(e) {
		return aj(e) + dR(e)
	}

	function dL(e) {
		return(357.52911 + e * (35999.05029 - 0.0001537 * e)) * aQ
	}

	function aj(i) {
		var e = (280.46646 + i * (36000.76983 + i * 0.0003032)) % 360;
		return(e < 0 ? e + 360 : e) / 180 * Math.PI
	}

	function dR(i) {
		var e = dL(i);
		return(Math.sin(e) * (1.914602 - i * (0.004817 + 0.000014 * i)) + Math.sin(e + e) * (0.019993 - 0.000101 * i) + Math.sin(e + e + e) * 0.000289) * aQ
	}

	function f2(e) {
		return fc(e) + 0.00256 * Math.cos((125.04 - 1934.136 * e) * aQ) * aQ
	}

	function fc(e) {
		return(23 + (26 + (21.448 - e * (46.815 + e * (0.00059 - e * 0.001813))) / 60) / 60) * aQ
	}

	function f6(e) {
		return 0.016708634 - e * (0.000042037 + 1.267e-7 * e)
	}

	function a6() {
		return window.devicePixelRatio || 1
	}

	function aF(T) {
		var i;
		var e;
		var hQ;
		if(T >= 0) {
			hQ = Math.floor(T / 65536) * 65536;
			i = hQ;
			e = T - hQ
		} else {
			hQ = Math.floor(-T / 65536) * 65536;
			i = -hQ;
			e = T + hQ
		}
		return [i, e]
	}

	function G(e) {
		if(e.lng >= 0 && e.lat >= 0) {
			return new hr(e.lng - 10000000, e.lat - 6000000)
		}
		if(e.lng >= 0 && e.lat < 0) {
			return new hr(e.lng - 10000000, e.lat + 6000000)
		}
		if(e.lng < 0 && e.lat >= 0) {
			return new hr(e.lng + 10000000, e.lat - 6000000)
		}
		if(e.lng < 0 && e.lat < 0) {
			return new hr(e.lng + 10000000, e.lat + 6000000)
		}
	}
	var fB = null;
	if(window.performance && window.performance.now) {
		fB = function() {
			return performance.now()
		}
	} else {
		if(Date.now) {
			fB = function() {
				return Date.now()
			}
		} else {
			fB = function() {
				return(new Date).getTime()
			}
		}
	}

	function bL(hQ, e, i) {
		var T = "mouseWheel";
		if(C.Platform.macintosh) {
			if(!isNaN(hQ) && (hQ < 10 || hQ !== 120) && (e % 1 === 0 && e < 5)) {
				T = "padScroll"
			}
			if(C.Browser.firefox && (e % 1 === 0 && e < 5 && i === 0)) {
				T = "padScroll"
			}
		}
		if(C.Browser.safari && hQ === 12) {
			T = "mouseWheel"
		}
		return T
	}

	function dg(hZ, hU) {
		var hY = hZ[0];
		var hX = hZ[1];
		var hQ = false;
		for(var hT = 0, hS = hU.length - 2; hT < hU.length; hT += 2) {
			var hW = hU[hT];
			var hR = hU[hT + 1];
			var hV = hU[hS];
			var T = hU[hS + 1];
			var e = ((hR > hX) !== (T > hX)) && (hY < (hV - hW) * (hX - hR) / (T - hR) + hW);
			if(e) {
				hQ = !hQ
			}
			hS = hT
		}
		return hQ
	}

	function cE(T, e, i, hQ) {
		hQ = hQ || 0.4;
		if(T > i) {
			T = Math.pow(T - i + 1, hQ) + i - 1
		} else {
			if(T < e) {
				T = e - Math.pow(e - T + 1, hQ) + 1
			}
		}
		return T
	}

	function gk(hU) {
		var hS = "";
		for(var T = 0; T < hU.length; T++) {
			var hV = hU.charCodeAt(T) << 1;
			var e = hV.toString(2);
			var hR = e.length;
			var hY = e;
			if(hR < 8) {
				hY = "00000000" + e;
				hY = hY.substr(e.length, 8)
			}
			hS += hY
		}
		var hW = 5 - hS.length % 5;
		var hQ = [];
		for(var T = 0; T < hW; T++) {
			hQ[T] = "0"
		}
		hS = hQ.join("") + hS;
		var hX = [];
		for(var T = 0; T < hS.length / 5; T++) {
			var hV = hS.substr(T * 5, 5);
			var hT = parseInt(hV, 2) + 50;
			hX.push(String.fromCharCode(hT))
		}
		return hX.join("") + hW.toString()
	}

	function aD(T, i) {
		var e = bo.TILE_VERSION || window.TILE_VERSION;
		if(!e || !e[T] || !e[T][i] || !e[T][i].version || !e[T][i].updateDate) {
			e = e3.tvc
		}
		return {
			ver: e[T][i].version,
			udt: e[T][i].updateDate
		}
	}

	function fz() {
		var e = bo.MSV || window.MSV;
		if(!e || !e.mapstyle || !e.mapstyle.updateDate || !e.mapstyle.version) {
			e = e3.msv
		}
		return {
			ver: e.mapstyle.version,
			udt: e.mapstyle.updateDate
		}
	}

	function er(e, hR) {
		var hQ = e.slice(0);
		for(var T = 0; T < hQ.length; T++) {
			hQ[T] += hR
		}
		return hQ
	}
	var a4 = null;

	function by(e) {
		if(a4) {
			return
		}
		e.fire(new bb("onloadtile"));
		a4 = setTimeout(function() {
			a4 = null
		}, 1000)
	}

	function e0() {
		if(cr("//map.baidu.com") || cr("//maps.baidu.com") || cr("//ditu.baidu.com")) {
			return true
		}
		return false
	}
	dw.inMapHost = e0();
	if(typeof window._inMapHost === "boolean") {
		dw.inMapHost = window._inMapHost
	}

	function cr(i) {
		var T = window.location;
		var e = document.createElement("a");
		e.href = i;
		return e.hostname === T.hostname && e.port === T.port && e.protocol === T.protocol
	}

	function ea() {}
	C.extend(ea, {
		Request: {
			INITIAL: -1,
			WAITING: 0,
			LOADED: 1,
			COMPLETED: 2
		},
		Dependency: {
			poly: ["marker"],
			hotspot: ["poly"],
			infowindow: ["marker", "hotspot"],
			simpleInfowindow: ["marker"],
			tools: ["marker", "poly"],
			mapgl: ["glcommon", "poly"],
			earth: ["glcommon"],
			control: ["scommon"],
			scommon: [],
			localSearch: ["scommon"],
			otherSearch: ["scommon"],
			route: ["scommon"],
			buslineSearch: ["route"],
			autocomplete: ["scommon"]
		},
		MD5Mapping: {
			control: "hphair",
			marker: "eaeyfr",
			poly: "ee4tqg",
			infowindow: "ejusfx",
			simpleInfowindow: "ek3w3k",
			hotspot: "5m5nrv",
			menu: "0h0tj3",
			tools: "rukfpv",
			oppc: "jkvx0r",
			oppcgl: "20gyle",
			mapgl: "5vx4eo",
			markeranimation: "zzkoer",
			earth: "htsu2i",
			glcommon: "0vs43i",
			localSearch: "eznnvn",
			scommon: "badoje",
			otherSearch: "pkqlfv",
			route: "prtw3a",
			buslineSearch: "wc5m4f",
			autocomplete: "unijz4"
		},
		Config: {
			//baseUrl: e3.apiHost + "/getmodules?v=1.0&type=webgl",
			baseUrl:bd_map_cfg.host_dir+"modules.js?v=1.0&type=webgl",
			jsModPath: (dw.inMapHost ? "" : e3.mapHost) + "/res/newui/",
			timeout: 5000
		},
		delayFlag: false,
		Module: {
			modules: {},
			modulesNeedToLoad: []
		},
		_getMd5ModsStr: function(hS) {
			var hR = [];
			for(var hU = 0, T = hS.length; hU < T; hU++) {
				var hT = hS[hU];
				var e = this.MD5Mapping[hT];
				var hQ = "$" + hT + "$";
				if(e !== hQ) {
					hR.push(hT + "_" + e)
				}
			}
			return hR.join(",")
		},
		load: function(i, hS, hQ) {
			var e = this.getModuleInfo(i);
			if(e.status === this.Request.COMPLETED) {
				if(hQ === true) {
					hS()
				}
			} else {
				if(e.status === this.Request.INITIAL) {
					this.combine(i);
					this.addToLoadQueue(i);
					var T = this;
					if(T.delayFlag === false) {
						T.delayFlag = true;
						setTimeout(function() {
							var hT = T.Config.baseUrl + "&mod=" + T._getMd5ModsStr(T.Module.modulesNeedToLoad);
							hl.load(hT);
							T.Module.modulesNeedToLoad.length = 0;
							T.delayFlag = false
						}, 1)
					}
					e.status = this.Request.WAITING;

					function hR(hV) {
						var hU = T.getModuleInfo(i);
						if(hU.status !== T.Request.COMPLETED) {
							if(window.map) {
								var hT = new bb("onmod_timeout");
								hT.timeout = hV / 1000;
								hT.moduleName = i;
								window.map.fire(hT)
							}
						}
					}
					setTimeout(hR, this.Config.timeout, this.Config.timeout);
					setTimeout(hR, this.Config.timeout * 2, this.Config.timeout * 2)
				}
				if(hS) {
					e.callbacks.push(hS)
				}
			}
		},
		combine: function(e) {
			if(e && this.Dependency[e]) {
				var hQ = this.Dependency[e];
				for(var T = 0; T < hQ.length; T++) {
					this.combine(hQ[T]);
					if(!this.Module.modules[hQ[T]]) {
						this.addToLoadQueue(hQ[T])
					}
				}
			}
		},
		addToLoadQueue: function(e) {
			var i = this.getModuleInfo(e);
			if(i.status === this.Request.INITIAL) {
				i.status = this.Request.WAITING;
				this.Module.modulesNeedToLoad.push(e)
			}
		},
		run: function(T, hQ) {
			var hU = this.getModuleInfo(T);
			var hX = this.Dependency[T];
			if(hX) {
				for(var hS = 0; hS < hX.length; hS++) {
					var hT = this.getModuleInfo(hX[hS]);
					if(hT.status !== this.Request.COMPLETED) {
						hT.modsNeedToRun.push({
							name: T,
							code: hQ
						});
						return
					}
				}
			}
			try {
				eval(hQ)
			} catch(hV) {
				return
			}
			hU.status = this.Request.COMPLETED;
			for(var hS = 0, hR = hU.callbacks.length; hS < hR; hS++) {
				hU.callbacks[hS]()
			}
			hU.callbacks.length = 0;
			for(hS = 0; hS < hU.modsNeedToRun.length; hS++) {
				var hW = hU.modsNeedToRun[hS];
				this.run(hW.name, hW.code)
			}
			hU.modsNeedToRun.length = 0
		},
		getModuleInfo: function(i) {
			var e;
			if(!this.Module.modules[i]) {
				this.Module.modules[i] = {
					status: this.Request.INITIAL,
					callbacks: [],
					modsNeedToRun: []
				}
			}
			e = this.Module.modules[i];
			return e
		}
	});
	window._jsload = function(hR, hS) {
		var i = ea.getModuleInfo(hR);
		i.status = ea.Request.LOADED;
		if(hS !== "") {
			ea.run(hR, hS)
		} else {
			if(window.map) {
				var e = new bb("ongetmodules_fail");
				e.moduleName = hR;
				window.map.fire(e)
			}
			var T = document.createElement("script");
			var hQ = ea.MD5Mapping[hR];
			T.src = ea.Config.jsModPath + hR + "_" + hQ + ".js";
			document.getElementsByTagName("head")[0].appendChild(T)
		}
	};

	function ac() {
		this._timeData = {}
	}
	var e9;
	if(typeof window !== "undefined") {
		e9 = window
	} else {
		e9 = self
	}
	ac.prototype.mark = function(e) {
		this._timeData[e] = this._getTime()
	};
	ac.prototype.getMark = function(e) {
		return this._timeData[e]
	};
	ac.prototype.getTime = function(i, e) {
		return parseFloat((this._timeData[e] - this._timeData[i]).toFixed(2))
	};
	ac.prototype.print = function() {};
	ac.prototype.clear = function() {
		this._timeData = {}
	};
	if(e9.performance && e9.performance.now) {
		ac.prototype._getTime = function() {
			return performance.now()
		}
	} else {
		ac.prototype._getTime = function() {
			return Date.now()
		}
	}! function(i, T) {
		T(i.d3 = i.d3 || {})
	}(window, function(ix) {
		function iP(iV, iW, T, it) {
			function e(i) {
				return iV(i = new Date(+i)), i
			}
			return e.floor = e, e.ceil = function(i) {
				return iV(i = new Date(i - 1)), iW(i, 1), iV(i), i
			}, e.round = function(i) {
				var iX = e(i),
					iY = e.ceil(i);
				return iY - i > i - iX ? iX : iY
			}, e.offset = function(i, iX) {
				return iW(i = new Date(+i), null == iX ? 1 : Math.floor(iX)), i
			}, e.range = function(iY, i, iX) {
				var iZ = [];
				if(iY = e.ceil(iY), iX = null == iX ? 1 : Math.floor(iX), !(i > iY && iX > 0)) {
					return iZ
				}
				do {
					iZ.push(new Date(+iY))
				} while (iW(iY, iX), iV(iY), i > iY);
				return iZ
			}, e.filter = function(i) {
				return iP(function(iX) {
					for(; iV(iX), !i(iX);) {
						iX.setTime(iX - 1)
					}
				}, function(iX, iY) {
					for(; --iY >= 0;) {
						for(; iW(iX, 1), !i(iX);) {}
					}
				})
			}, T && (e.count = function(i, iX) {
				return iz.setTime(+i), iD.setTime(+iX), iV(iz), iV(iD), Math.floor(T(iz, iD))
			}, e.every = function(i) {
				return i = Math.floor(i), isFinite(i) && i > 0 ? i > 1 ? e.filter(it ? function(iX) {
					return it(iX) % i === 0
				} : function(iX) {
					return e.count(0, iX) % i === 0
				}) : e : null
			}), e
		}

		function iE(e) {
			return iP(function(i) {
				i.setDate(i.getDate() - (i.getDay() + 7 - e) % 7), i.setHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setDate(i.getDate() + 7 * T)
			}, function(i, T) {
				return(T - i - (T.getTimezoneOffset() - i.getTimezoneOffset()) * iy) / iM
			})
		}

		function iw(e) {
			return iP(function(i) {
				i.setUTCDate(i.getUTCDate() - (i.getUTCDay() + 7 - e) % 7), i.setUTCHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setUTCDate(i.getUTCDate() + 7 * T)
			}, function(i, T) {
				return(T - i) / iM
			})
		}
		var iz = new Date,
			iD = new Date,
			iK = iP(function() {}, function(i, T) {
				i.setTime(+i + T)
			}, function(i, T) {
				return T - i
			});
		iK.every = function(e) {
			return e = Math.floor(e), isFinite(e) && e > 0 ? e > 1 ? iP(function(i) {
				i.setTime(Math.floor(i / e) * e)
			}, function(i, T) {
				i.setTime(+i + T * e)
			}, function(i, T) {
				return(T - i) / e
			}) : iK : null
		};
		var iT = iK.range,
			iR = 1000,
			iy = 60000,
			iO = 3600000,
			iG = 86400000,
			iM = 604800000,
			hW = iP(function(e) {
				e.setTime(Math.floor(e / iR) * iR)
			}, function(i, T) {
				i.setTime(+i + T * iR)
			}, function(i, T) {
				return(T - i) / iR
			}, function(e) {
				return e.getUTCSeconds()
			}),
			iQ = hW.range,
			iF = iP(function(e) {
				e.setTime(Math.floor(e / iy) * iy)
			}, function(i, T) {
				i.setTime(+i + T * iy)
			}, function(i, T) {
				return(T - i) / iy
			}, function(e) {
				return e.getMinutes()
			}),
			h4 = iF.range,
			iq = iP(function(i) {
				var T = i.getTimezoneOffset() * iy % iO;
				0 > T && (T += iO), i.setTime(Math.floor((+i - T) / iO) * iO + T)
			}, function(i, T) {
				i.setTime(+i + T * iO)
			}, function(i, T) {
				return(T - i) / iO
			}, function(e) {
				return e.getHours()
			}),
			iL = iq.range,
			ie = iP(function(e) {
				e.setHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setDate(i.getDate() + T)
			}, function(i, T) {
				return(T - i - (T.getTimezoneOffset() - i.getTimezoneOffset()) * iy) / iG
			}, function(e) {
				return e.getDate() - 1
			}),
			hV = ie.range,
			ib = iE(0),
			id = iE(1),
			hR = iE(2),
			h9 = iE(3),
			hY = iE(4),
			iv = iE(5),
			iC = iE(6),
			hT = ib.range,
			iu = id.range,
			h2 = hR.range,
			ip = h9.range,
			iH = hY.range,
			ir = iv.range,
			iS = iC.range,
			iJ = iP(function(e) {
				e.setDate(1), e.setHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setMonth(i.getMonth() + T)
			}, function(i, T) {
				return T.getMonth() - i.getMonth() + 12 * (T.getFullYear() - i.getFullYear())
			}, function(e) {
				return e.getMonth()
			}),
			iU = iJ.range,
			h8 = iP(function(e) {
				e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setFullYear(i.getFullYear() + T)
			}, function(i, T) {
				return T.getFullYear() - i.getFullYear()
			}, function(e) {
				return e.getFullYear()
			});
		h8.every = function(e) {
			return isFinite(e = Math.floor(e)) && e > 0 ? iP(function(i) {
				i.setFullYear(Math.floor(i.getFullYear() / e) * e), i.setMonth(0, 1), i.setHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setFullYear(i.getFullYear() + T * e)
			}) : null
		};
		var h1 = h8.range,
			iA = iP(function(e) {
				e.setUTCSeconds(0, 0)
			}, function(i, T) {
				i.setTime(+i + T * iy)
			}, function(i, T) {
				return(T - i) / iy
			}, function(e) {
				return e.getUTCMinutes()
			}),
			ih = iA.range,
			ig = iP(function(e) {
				e.setUTCMinutes(0, 0, 0)
			}, function(i, T) {
				i.setTime(+i + T * iO)
			}, function(i, T) {
				return(T - i) / iO
			}, function(e) {
				return e.getUTCHours()
			}),
			ic = ig.range,
			ia = iP(function(e) {
				e.setUTCHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setUTCDate(i.getUTCDate() + T)
			}, function(i, T) {
				return(T - i) / iG
			}, function(e) {
				return e.getUTCDate() - 1
			}),
			h7 = ia.range,
			h6 = iw(0),
			h5 = iw(1),
			h3 = iw(2),
			h0 = iw(3),
			hZ = iw(4),
			hU = iw(5),
			hS = iw(6),
			hQ = h6.range,
			io = h5.range,
			iN = h3.range,
			iB = h0.range,
			iI = hZ.range,
			im = hU.range,
			il = hS.range,
			ik = iP(function(e) {
				e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setUTCMonth(i.getUTCMonth() + T)
			}, function(i, T) {
				return T.getUTCMonth() - i.getUTCMonth() + 12 * (T.getUTCFullYear() - i.getUTCFullYear())
			}, function(e) {
				return e.getUTCMonth()
			}),
			ij = ik.range,
			hX = iP(function(e) {
				e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setUTCFullYear(i.getUTCFullYear() + T)
			}, function(i, T) {
				return T.getUTCFullYear() - i.getUTCFullYear()
			}, function(e) {
				return e.getUTCFullYear()
			});
		hX.every = function(e) {
			return isFinite(e = Math.floor(e)) && e > 0 ? iP(function(i) {
				i.setUTCFullYear(Math.floor(i.getUTCFullYear() / e) * e), i.setUTCMonth(0, 1), i.setUTCHours(0, 0, 0, 0)
			}, function(i, T) {
				i.setUTCFullYear(i.getUTCFullYear() + T * e)
			}) : null
		};
		var ii = hX.range;
		ix.timeInterval = iP, ix.timeMillisecond = iK, ix.timeMilliseconds = iT, ix.utcMillisecond = iK, ix.utcMilliseconds = iT, ix.timeSecond = hW, ix.timeSeconds = iQ, ix.utcSecond = hW, ix.utcSeconds = iQ, ix.timeMinute = iF, ix.timeMinutes = h4, ix.timeHour = iq, ix.timeHours = iL, ix.timeDay = ie, ix.timeDays = hV, ix.timeWeek = ib, ix.timeWeeks = hT, ix.timeSunday = ib, ix.timeSundays = hT, ix.timeMonday = id, ix.timeMondays = iu, ix.timeTuesday = hR, ix.timeTuesdays = h2, ix.timeWednesday = h9, ix.timeWednesdays = ip, ix.timeThursday = hY, ix.timeThursdays = iH, ix.timeFriday = iv, ix.timeFridays = ir, ix.timeSaturday = iC, ix.timeSaturdays = iS, ix.timeMonth = iJ, ix.timeMonths = iU, ix.timeYear = h8, ix.timeYears = h1, ix.utcMinute = iA, ix.utcMinutes = ih, ix.utcHour = ig, ix.utcHours = ic, ix.utcDay = ia, ix.utcDays = h7, ix.utcWeek = h6, ix.utcWeeks = hQ, ix.utcSunday = h6, ix.utcSundays = hQ, ix.utcMonday = h5, ix.utcMondays = io, ix.utcTuesday = h3, ix.utcTuesdays = iN, ix.utcWednesday = h0, ix.utcWednesdays = iB, ix.utcThursday = hZ, ix.utcThursdays = iI, ix.utcFriday = hU, ix.utcFridays = im, ix.utcSaturday = hS, ix.utcSaturdays = il, ix.utcMonth = ik, ix.utcMonths = ij, ix.utcYear = hX, ix.utcYears = ii, Object.defineProperty(ix, "__esModule", {
			value: !0
		})
	});

	function gm(e) {
		this._elemType = e;
		this._objCollection = {}
	}
	gm.prototype.get = function() {
		var i = null;
		for(var e in this._objCollection) {
			if(this._objCollection[e] && this._objCollection[e]._free === true) {
				this._objCollection[e]._free = false;
				return this._objCollection[e]
			}
		}
		i = S(this._elemType);
		e = bo.getGUID("obj_pool_");
		this._objCollection[e] = i;
		return i
	};
	gm.prototype.free = function(e) {
		if(!e) {
			return
		}
		e._free = true;
		if(e.tagName.toLowerCase() === "img") {
			e.src = "";
			e.crossOrigin = null;
			e.onload = e.onerror = null
		}
	};
	gm.prototype.clear = function() {
		for(var e in this._objCollection) {
			if(this._objCollection[e] && this._objCollection[e].tagName.toLowerCase === "img") {
				this._objCollection[e].onload = this._objCollection[e].onerror = null
			}
		}
		this._objCollection = {}
	};
	var gz = {
		get: function(i, hR, e, T) {
			var hQ = new XMLHttpRequest();
			hQ.open("GET", i, true);
			hQ.timeout = 10000;
			hQ.ontimeout = function() {
				T && T()
			};
			hQ.onreadystatechange = function(hS) {
				if(this.readyState === 4) {
					if(this.status === 200) {
						hR && hR(hQ.responseText)
					} else {
						e && e()
					}
				}
			};
			hQ.send()
		},
		post: function(i, hS, hR, e, T) {
			var hQ = new XMLHttpRequest();
			hQ.open("POST", i, true);
			hQ.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			hQ.timeout = 10000;
			hQ.ontimeout = function() {
				T && T()
			};
			hQ.onreadystatechange = function(hT) {
				if(this.readyState === 4) {
					if(this.status === 200) {
						hR && hR(hQ.responseText, hS)
					} else {
						e && e()
					}
				}
			};
			hQ.send(hS);
			return hQ
		}
	};
	var hl = (function(e) {
		function i(hS, T, hR) {
			var hQ = S("script", {
				src: hS,
				type: "text/javascript",
				charset: "utf-8"
			});
			if(hQ.addEventListener) {
				hQ.addEventListener("load", function(hU) {
					var hT = hU.target;
					hT.parentNode.removeChild(hT);
					T && T()
				}, false);
				hQ.addEventListener("error", function(hT) {
					hR && hR(null)
				}, false)
			} else {
				if(hQ.attachEvent) {
					hQ.attachEvent("onreadystatechange", function(hU) {
						var hT = window.event.srcElement;
						if(hT && (hT.readyState === "loaded" || hT.readyState === "complete")) {
							hT.parentNode.removeChild(hT)
						}
						T && T()
					})
				}
			}
			e.getElementsByTagName("head")[0].appendChild(hQ)
		}
		return {
			load: function(hT, T, hQ) {
				if(typeof hT === "string") {
					i(hT, T, hQ)
				} else {
					if(hT.length > 0) {
						var hS = hT.length;
						for(var hR = 0; hR < hS; hR++) {
							i(hT[hR], function() {
								hS--;
								if(hS === 0 && T) {
									T()
								}
							})
						}
					}
				}
			}
		}
	})(window.document);

	function cL() {}
	cL.instances = {};
	cL.getInstance = function(i, T) {
		if(cL.instances[i]) {
			return cL.instances[i]
		}
		var e = new di(i, T);
		cL.instances[i] = e;
		return e
	};

	function di(e, i) {
		this._name = e;
		this._baseZoom = 18;
		this._opts = {
			tileSize: 256
		};
		C.extend(this._opts, i || {})
	}
	di.mapZoomBaseIndex = [8, 8, 8, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
	di.baseScaleZoom = [19, 17, 15, 12, 10, 9, 7, 5, 3];
	di.baseScaleZoomMercatorSize = [512, 2048, 4096, 32768, 65536, 262144, 1048576, 4194304, 8388608];
	di.mapZoomBaseZoomMapping = [3, 3, 3, 3, 5, 5, 7, 7, 9, 9, 10, 12, 12, 12, 15, 15, 17, 17, 19, 19, 19, 19, 19, 19, 19, 19];
	di.mapZoomStartZoomMapping = [3, 3, 3, 3, 4, 4, 6, 6, 8, 8, 10, 11, 11, 11, 14, 14, 16, 16, 18, 18, 18, 18, 18, 18, 18, 18];
	di.baseScaleTileSize = [1024, 1024, 512, 512, 256, 512, 512, 512, 256];
	di.mapZoomTileSize = [256, 256, 256, 256, 256, 512, 256, 512, 256, 512, 256, 256, 512, 1024, 256, 512, 512, 1024, 512, 1024, 2048, 4096, 4096 * 2, 4096 * 2 * 2, 4096 * 2 * 2 * 2, 4096 * 2 * 2 * 2 * 2];
	di.baseZoomInfo = {
		"3": [3],
		"5": [4, 5],
		"7": [6, 7],
		"9": [8, 9],
		"10": [10],
		"12": [11, 12, 13],
		"15": [14, 15],
		"17": [16, 17],
		"19": [18, 19, 20, 21, 22, 23, 24, 25]
	};
	di.prototype = {
		getName: function() {
			return this._name
		},
		getTileSize: function(e) {
			e = Math.floor(e);
			if(e < 3) {
				e = 3
			}
			if(this._name === "na") {
				return di.mapZoomTileSize[e]
			}
			return this._opts.tileSize
		},
		getBaseTileSize: function(i) {
			i = Math.floor(i);
			if(this._name === "na") {
				var e = di.mapZoomBaseZoomMapping[i];
				return di.mapZoomTileSize[e]
			}
			return this._opts.tileSize
		},
		getDataZoom: function(e) {
			e = Math.floor(e);
			if(this._name === "na") {
				return di.mapZoomBaseZoomMapping[e]
			}
			return e
		},
		getZoomUnits: function(e) {
			return Math.pow(2, (this._baseZoom - e))
		},
		getMercatorSize: function(T, i) {
			if(this._name === "na") {
				T = Math.floor(T);
				var e = di.mapZoomBaseIndex[T];
				return di.baseScaleZoomMercatorSize[e]
			}
			return this._opts.tileSize * this.getZoomUnits(i)
		},
		getBaseZoom: function() {
			return this._baseZoom
		},
		getParentTile: function(hQ, hW, hV, T, i) {
			if(this._name === "na") {
				var hR = di.baseZoomInfo[hV];
				T--;
				if(hR.indexOf(T) > -1) {
					return {
						col: hQ,
						row: hW,
						zoom: hV,
						useZoom: T
					}
				} else {
					var hT = di.mapZoomBaseIndex[hV];
					var hS = di.baseScaleZoom[hT + 1];
					if(!hS) {
						return null
					}
					var hU = this.getFactorByZooms(hS, hV);
					var e = di.baseZoomInfo[hS];
					return {
						col: Math.floor(hQ / hU),
						row: Math.floor(hW / hU),
						zoom: hS,
						useZoom: e[e.length - 1]
					}
				}
				return null
			}
			if(hV - 1 < i) {
				return null
			}
			return {
				col: Math.floor(hQ / 2),
				row: Math.floor(hW / 2),
				zoom: hV - 1,
				useZoom: hV - 1
			}
		},
		getChildTiles: function(hR, hT, e, T, h0, h6) {
			if(this._name === "na") {
				var hQ = di.baseZoomInfo[e];
				T += h6;
				if(hQ.indexOf(T) > -1) {
					return [{
						col: hR,
						row: hT,
						zoom: e,
						useZoom: T
					}]
				} else {
					var h4 = 0;
					var h1 = e;
					while(h4 < h6) {
						var h5 = di.mapZoomBaseIndex[h1];
						var hV = di.baseScaleZoom[h5 - 1];
						if(!hV) {
							return null
						}
						var hW = di.baseZoomInfo[hV];
						if(hW[h6 - 1]) {
							var hX = [];
							var hZ = this.getFactorByZooms(e, hV);
							var i = hR * hZ;
							var hY = hT * hZ;
							for(var h3 = 0; h3 < hZ; h3++) {
								var hS = i + h3;
								for(var h2 = 0; h2 < hZ; h2++) {
									var hU = hY + h2;
									hX.push({
										col: hS,
										row: hU,
										zoom: hV,
										useZoom: hW[h6 - 1]
									})
								}
							}
							return hX
						}
						h4 += hW.length;
						if(h6 === hW.length) {
							h1 = hV
						}
					}
				}
				return null
			}
			var hX = [];
			if(e + h6 > h0) {
				return null
			}
			var hZ = Math.pow(2, h6);
			var i = hR * hZ;
			var hY = hT * hZ;
			var hV = e + h6;
			var hX = [];
			for(var h3 = 0; h3 < 2; h3++) {
				var hS = i + h3;
				for(var h2 = 0; h2 < 2; h2++) {
					var hU = hY + h2;
					hX.push({
						col: hS,
						row: hU,
						zoom: hV,
						useZoom: hV
					})
				}
			}
			return hX
		},
		getFactorByZooms: function(i, hQ) {
			var T = di.mapZoomBaseIndex[i];
			var hR = di.mapZoomBaseIndex[hQ];
			var e = di.baseScaleZoomMercatorSize[T];
			var hS = di.baseScaleZoomMercatorSize[hR];
			return e / hS
		}
	};
	var a8 = {};
	var ag = ["swiftshader", "microsoft basic render driver"];
	var cl = ["intel", "nvidia", "amd", "apple", "geforce"];

	function dv(e) {
		e = e.toLowerCase();
		if(ag.indexOf(e) >= 0) {
			return true
		}
		if(e.indexOf("mobile") >= 0) {
			return true
		}
		return false
	}

	function fD(T) {
		T = T.toLowerCase();
		for(var e = 0; e < cl.length; e++) {
			if(T.indexOf(cl[e]) >= 0) {
				return true
			}
		}
		return false
	}

	function dY(e) {
		if(!e) {
			return false
		}
		if(dv(e)) {
			return false
		}
		if(fD(e)) {
			return true
		}
		return false
	}
	a8.ifEnableEarth = function(i) {
		var e = a8.ifEnableEarth;
		if(!i && typeof e._enable === "boolean") {
			return e._enable
		}
		if(a8.ifSupportWebGL()) {
			e._enable = true;
			return true
		}
		e._enable = false;
		return false
	};
	a8.ifEnableWebGLMap = function(i) {
		var e = a8.ifEnableWebGLMap;
		if(!i && typeof e._enable === "boolean") {
			return e._enable
		}
		if(a8.ifSupportWebGL()) {
			if(dw.inMapHost) {
				e._enable = true;
				return true
			} else {
				if(window.Blob || window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder) {
					e._enable = true;
					return true
				} else {
					e._enable = false;
					return false
				}
			}
		}
		e._enable = false;
		return false
	};
	a8.params = {};
	a8.ifSupportWebGL = function() {
		var i = a8.ifSupportWebGL;
		if(typeof i._supportWebGL === "boolean") {
			return i._supportWebGL
		}
		if(!window.WebGLRenderingContext) {
			i._supportWebGL = false;
			return false
		}
		var T = document.createElement("canvas");
		T.width = 300;
		T.height = 150;
		var hR = null;
		var hX = {
			alpha: true,
			antialias: false,
			failIfMajorPerformanceCaveat: true,
			preserveDrawingBuffer: false,
			stencil: false
		};
		try {
			hR = T.getContext("webgl", hX) || T.getContext("experimental-webgl", hX)
		} catch(hT) {
			i._supportWebGL = false
		}
		if(hR === null) {
			i._supportWebGL = false
		} else {
			i._supportWebGL = true;
			var hV = hR.getExtension("WEBGL_debug_renderer_info");
			if(hV) {
				var hU = hR.getParameter(hV.UNMASKED_RENDERER_WEBGL);
				if(dY(hU) === true) {
					i._supportWebGL = true
				}
				var hW = hR.getParameter(hV.UNMASKED_VENDOR_WEBGL);
				i._renderer = hU;
				i._vendor = hW
			}
			if(!hV && C.Browser.firefox) {
				i._supportWebGL = true
			}
			if(!hV && C.Platform.macintosh) {
				i._supportWebGL = true
			}
			if(hR.drawingBufferWidth !== T.width || hR.drawingBufferHeight !== T.height) {
				i._supportWebGL = false
			}
			if(hR.getParameter(hR.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < 4) {
				i._supportWebGL = false
			}
			var hQ = hR.getParameter(hR.MAX_TEXTURE_SIZE);
			a8.params.maxTextureSize = hQ;
			if(hQ < 4096) {
				i._supportWebGL = false
			}
			var hS = hR.getParameter(hR.MAX_TEXTURE_IMAGE_UNITS);
			if(hS < 8) {
				i._supportWebGL = false
			}
			if(!hR.getShaderPrecisionFormat || hR.getShaderPrecisionFormat(hR.FRAGMENT_SHADER, hR.HIGH_FLOAT).precision < 23) {
				i._supportWebGL = false
			}
		}
		return i._supportWebGL
	};
	a8.ifSupportCanvas2d = function() {
		var hR = a8.ifSupportCanvas2d;
		if(typeof hR.supportCanvas2d === "boolean") {
			return hR.supportCanvas2d
		}
		var T = document.createElement("canvas");
		var i = null;
		try {
			i = T.getContext("2d")
		} catch(hQ) {
			hR.supportCanvas2d = false
		}
		if(i === null) {
			hR.supportCanvas2d = false
		} else {
			hR.supportCanvas2d = true
		}
		return hR.supportCanvas2d
	};
	a8.ifEnableCanvas2dMap = function() {
		var i = navigator.userAgent;
		var e = 0;
		var hQ = 0;
		var hR = 0;
		if(/macintosh/ig.test(i)) {
			var T = 0;
			if(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(i) && !/chrome/i.test(i)) {
				T = parseInt((RegExp["\x241"] || RegExp["\x242"]), 10)
			}
			if(T > 0) {
				return false
			}
			return true
		}
		if(/windows nt (\d+\.\d)/ig.test(i)) {
			hQ = parseFloat(RegExp.$1);
			if(hQ >= 6.1) {
				if(/chrome\/(\d+\.\d)/i.test(i)) {
					e = parseFloat(RegExp.$1);
					if(e >= 31) {
						return true
					}
				}
				if(/MSIE (\d+(\.\d+)?)/.test(i)) {
					hR = parseFloat(RegExp.$1);
					if(hR >= 10) {
						return true
					}
				}
				if(/Firefox/.test(i)) {
					return true
				}
				if(/rv:11.0/ig.test(i)) {
					return true
				}
				if(/edge/ig.test(i)) {
					return true
				}
			}
		}
		return false
	};
	a8.ifSupportCSS3 = function(hU, i) {
		var hT = document.createElement("div");
		var hS = "Webkit Moz O ms".split(" ");
		var e = hS.length;
		var T = "";
		var hQ = hT.style;
		if(hU in hQ) {
			T = hU
		}
		hU = hU.replace(/^[a-z]/, function(hV) {
			return hV.toUpperCase()
		});
		while(e--) {
			var hR = hS[e] + hU;
			if(hR in hQ) {
				T = hR;
				break
			}
		}
		if(i) {
			return T
		} else {
			return T.length > 0 ? true : false
		}
	};
	a8.isModernBrowser = a8.ifSupportCanvas2d() && a8.ifSupportCSS3("transform");

	function eZ(i, e) {
		this._size = i;
		this._curSize = 0;
		this._cache = {};
		this._least = null;
		this._most = null;
		this._options = {
			clearCallback: null,
			removeOldCallback: null
		};
		e = e || {};
		for(var T in e) {
			this._options[T] = e[T]
		}
		this._getDataTimes = 0;
		this._hitTimes = 0
	}
	eZ.prototype.setData = function(hQ, hS) {
		var i = this._cache;
		var T = this._size;
		if(T === 0) {
			return
		}
		var e = this._curSize;
		if(e === T) {
			this._removeOld()
		}
		var hR;
		if(!i[hQ]) {
			hR = {
				key: hQ,
				data: hS,
				older: null,
				newwer: null
			};
			i[hQ] = hR;
			if(this._least === null) {
				this._least = hR
			}
			if(this._most === null) {
				this._most = hR
			}
			this._curSize++
		} else {
			hR = i[hQ];
			hR.data = hS;
			if(this._most === hR) {
				return
			}
			hR.older && (hR.older.newer = hR.newer);
			hR.newer && (hR.newer.older = hR.older);
			if(this._least === hR) {
				this._least = hR.newer
			}
		}
		if(this._most && this._most !== hR) {
			this._most.newer = hR;
			hR.older = this._most;
			this._most = hR;
			hR.newer = null
		}
	};
	eZ.prototype.getData = function(e) {
		var i = this._cache[e];
		this._getDataTimes++;
		if(i) {
			this._hitTimes++;
			var T = i.data;
			if(this._most === i) {
				return T
			}
			i.older && (i.older.newer = i.newer);
			i.newer && (i.newer.older = i.older);
			if(this._least === i) {
				this._least = i.newer
			}
			this._most.newer = i;
			i.older = this._most;
			i.newer = null;
			this._most = i;
			return T
		}
		return null
	};
	eZ.prototype.getAllData = function() {
		return this._cache
	};
	eZ.prototype.getHitRate = function() {
		return this._hitTimes / this._getDataTimes
	};
	eZ.prototype.removeData = function(i) {
		var e = this._cache;
		var T = e[i];
		if(!T) {
			return
		}
		if(this._options.clearCallback) {
			this._options.clearCallback(T.data, T.key)
		}
		T.older && (T.older.newer = T.newer);
		T.newer && (T.newer.older = T.older);
		if(this._least === T) {
			this._least = T.newer
		}
		if(this._most === T) {
			this._most = T.older
		}
		delete e[i];
		this._curSize--
	};
	eZ.prototype._removeOld = function() {
		var e = this._cache;
		var hQ = Math.round(this._size * 0.6);
		var T = 0;
		while(this._least && T < hQ) {
			var i = this._least;
			this._least = i.newer;
			i.newer && (i.newer.older = null);
			if(this._options.clearCallback) {
				this._options.clearCallback(i.data, i.key)
			}
			delete e[i.key];
			T++
		}
		this._curSize -= T;
		if(this._options.removeOldCallback) {
			this._options.removeOldCallback()
		}
	};
	eZ.prototype.clear = function() {
		var e = this._cache;
		var i = this._least;
		if(this._options.clearCallback) {
			while(i) {
				this._options.clearCallback(i.data, i.key);
				i = i.newer
			}
		}
		this._least = this._most = null;
		this._cache = {};
		this._curSize = 0
	};
	eZ.prototype.forEach = function(e) {
		var i = this._least;
		while(i) {
			e(i.data);
			i = i.newer
		}
	};
	eZ.prototype.clearExcept = function(i) {
		var e = this._cache;
		var T = this._least;
		while(T) {
			if(!i[T.key]) {
				if(this._options.clearCallback) {
					this._options.clearCallback(T.data, T.key)
				}
				T.older && (T.older.newer = T.newer);
				T.newer && (T.newer.older = T.older);
				if(this._least === T) {
					this._least = T.newer
				}
				if(this._most === T) {
					this._most = T.older
				}
				delete e[T.key];
				this._curSize--
			}
			T = T.newer
		}
	};
	var gZ = {
		parseHexToRgbaArray: function(hS) {
			var hT = hS.replace("#", "");
			if(hT.length === 3) {
				hT += "f"
			} else {
				if(hT.length === 6) {
					hT += "ff"
				}
			}
			var e = [];
			var hR = hT.length;
			var hQ = hR === 8 ? 2 : 1;
			for(var T = 0; T < hR; T = T + hQ) {
				if(hQ === 2) {
					e.push(parseInt(hT.slice(T, T + 2), 16))
				} else {
					e.push(parseInt(hT.slice(T, T + 1) + hT.slice(T, T + 1), 16))
				}
			}
			return e
		},
		parseRgbaStrToArray: function(i) {
			var e = [0, 0, 0, 255];
			if(i.indexOf("rgba(") === 0) {
				var hQ = i.replace("rgba(", "").replace(")", "");
				var T = hQ.split(",");
				e[0] = parseInt(T[0], 10);
				e[1] = parseInt(T[1], 10);
				e[2] = parseInt(T[2], 10);
				e[3] = Math.round(parseFloat(T[3]) * 255)
			} else {
				if(i.indexOf("rgb(") === 0) {
					var hQ = i.replace("rgb(", "").replace(")", "");
					var hR = hQ.split(",");
					e[0] = parseInt(hR[0], 10);
					e[1] = parseInt(hR[1], 10);
					e[2] = parseInt(hR[2], 10);
					e[3] = 255
				}
			}
			return e
		},
		parseHexAndOpacityToRgbaArray: function(hR, hS) {
			var T = [];
			var hV = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
			var hU = hR.toLowerCase();
			if(hV.test(hU)) {
				if(hU.length === 4) {
					var e = "#";
					for(var hT = 1; hT < 4; hT++) {
						e += hU.slice(hT, hT + 1).concat(hU.slice(hT, hT + 1))
					}
					hU = e
				}
				for(var hQ = 1; hQ < 7; hQ += 2) {
					T.push(parseInt(hU.slice(hQ, hQ + 2), 16))
				}
				T.push(hS)
			}
			return T
		},
		parseCSSColor: function(e) {
			if(e.indexOf("#") === 0) {
				return gZ.parseHexToRgbaArray(e)
			}
			return gZ.parseRgbaStrToArray(e)
		},
		rgbToHSV: function(hR) {
			var e = hR[0] / 255;
			var T = hR[1] / 255;
			var hS = hR[2] / 255;
			var hV = Math.max(e, T, hS);
			var hQ = Math.min(e, T, hS);
			var hU = hV - hQ;
			var i;
			if(hU === 0) {
				i = 0
			} else {
				if(hV === e) {
					i = 60 * (((T - hS) / hU) % 6)
				} else {
					if(hV === T) {
						i = 60 * ((hS - e) / hU + 2)
					} else {
						if(hV === hS) {
							i = 60 * ((e - T) / hU + 4)
						}
					}
				}
			}
			var hW = hV === 0 ? 0 : (hU / hV);
			var hT = hV;
			while(i < 0) {
				i += 360
			}
			return [i, hW, hT]
		},
		hsvToRGB: function(hQ) {
			var hU = hQ[2] * hQ[1];
			var T = hU * (1 - Math.abs((hQ[0] / 60) % 2 - 1));
			var i = hQ[2] - hU;
			var hR = hQ[0];
			var hT;
			var hS;
			var e;
			if(hR >= 0 && hR < 60) {
				hT = hU;
				hS = T;
				e = 0
			} else {
				if(hR >= 60 && hR < 120) {
					hT = T;
					hS = hU;
					e = 0
				} else {
					if(hR >= 120 && hR < 180) {
						hT = 0;
						hS = hU;
						e = T
					} else {
						if(hR >= 180 && hR < 240) {
							hT = 0;
							hS = T;
							e = hU
						} else {
							if(hR >= 240 && hR < 300) {
								hT = T;
								hS = 0;
								e = hU
							} else {
								if(hR >= 300 && hR < 360) {
									hT = hU;
									hS = 0;
									e = T
								}
							}
						}
					}
				}
			}
			hT = (hT + i) * 255 > 255 ? 255 : (hT + i) * 255;
			hS = (hS + i) * 255 > 255 ? 255 : (hS + i) * 255;
			e = (e + i) * 255 > 255 ? 255 : (e + i) * 255;
			return [Math.round(hT), Math.round(hS), Math.round(e)]
		}
	};
	var cB = {
		request: function(hT, hQ, i, hV, T) {
			var hR = (Math.random() * 100000).toFixed(0);
			bo._rd["_cbk" + hR] = function(hW) {
				if(hW.result && hW.result["error"] && hW.result["error"] === 202) {
					alert("该AK因为恶意行为已经被管理员封禁！");
					return
				}
				i = i || {};
				hT && hT(hW, i);
				delete bo._rd["_cbk" + hR]
			};
			hV = hV || "";
			var hU;
			if(i && i.useEncodeURI) {
				hU = hi(hQ, encodeURI)
			} else {
				hU = hi(hQ, encodeURIComponent)
			}
			
			var hS = this;
			
			//var e = e3.apiHost + "/" + hV + "?" + hU + "&ie=utf-8&oue=1&fromproduct=jsapi";
			var e = bd_map_cfg.api_host_proxy_pass + "/" + hV + "?" + hU + "&ie=utf-8&oue=1&fromproduct=jsapi";
			if(!T) {
				e += "&res=api"
			}
			e += "&callback=" + eA + "._rd._cbk" + hR;
			e += "&ak=" + gd;
			
			hl.load(e)
		}
	};
	bo._rd = {};
	var D = {
		request: function(hQ, e) {
			if(e) {
				var T = (Math.random() * 100000).toFixed(0);
				BMapGL._rd["_cbk" + T] = function(hR) {
					e && e(hR);
					delete BMapGL._rd["_cbk" + T]
				};
				hQ += "&callback=BMapGL._rd._cbk" + T
			}
			var i = S("script", {
				src: hQ,
				type: "text/javascript",
				charset: "utf-8"
			});
			if(i.addEventListener) {
				i.addEventListener("load", function(hS) {
					var hR = hS.target;
					hR.parentNode.removeChild(hR)
				}, false);
				i.addEventListener("error", function(hR) {
					e && e([, , , , , ])
				}, false)
			} else {
				if(i.attachEvent) {
					i.attachEvent("onreadystatechange", function(hS) {
						var hR = window.event.srcElement;
						if(hR && (hR.readyState == "loaded" || hR.readyState == "complete")) {
							hR.parentNode.removeChild(hR)
						}
					})
				}
			}
			document.getElementsByTagName("head")[0].appendChild(i);
			i = null
		}
	};

	function a7() {
		this._map = null;
		this._container;
		this._type = "control";
		this.blockInfoWindow = true;
		this._visible = true
	}
	a7.inherits(ed, "Control");
	C.extend(a7.prototype, {
		initialize: function(e) {
			this._map = e;
			if(this._container) {
				if(this._opts && this._opts.container) {
					this._opts.container.appendChild(this._container)
				} else {
					e.container.appendChild(this._container)
				}
				return this._container
			}
			return
		},
		_i: function(e) {
			if(!this._container && this.initialize && bV(this.initialize)) {
				this._container = this.initialize(e)
			}
			this._opts = this._opts || {
				printable: false
			};
			this._setStyle();
			this._setPosition();
			if(this._container) {
				this._container._jsobj = this
			}
		},
		_setStyle: function() {
			var i = this._container;
			if(i) {
				var e = i.style;
				e.position = "absolute";
				e.zIndex = this._cZIndex || "10";
				e.MozUserSelect = "none";
				if(!this._opts.printable) {
					C.ac(i, "BMap_noprint")
				}
				C.on(i, "contextmenu", db)
			}
		},
		remove: function() {
			this._map = null;
			if(!this._container) {
				return
			}
			this._container.parentNode && this._container.parentNode.removeChild(this._container);
			this._container._jsobj = null;
			this._container = null
		},
		_render: function(e) {
			if(this._opts && this._opts.container) {
				this._container = dI(this._opts.container, '<div unselectable="on"></div>')
			} else {
				var i = '<div unselectable="on"></div>';
				if(e && e.config.autoSafeArea && bv()) {
					this._safeAreaContainer = dI(this._map.container, i);
					this._safeAreaContainer.style.position = "absolute";
					this._safeAreaContainer.style.bottom = "env(safe-area-inset-bottom)";
					this._container = dI(this._safeAreaContainer, i)
				} else {
					this._container = dI(this._map.container, i)
				}
			}
			if(this._visible === false) {
				this._container.style.display = "none"
			}
			return this._container
		},
		_setPosition: function() {
			this.setAnchor(this._opts.anchor)
		},
		setAnchor: function(hQ) {
			if(this.anchorFixed || typeof hQ !== "number" || isNaN(hQ) || hQ < BMAP_ANCHOR_TOP_LEFT || hQ > BMAP_ANCHOR_BOTTOM_RIGHT) {
				hQ = this.defaultAnchor
			}
			this._opts.offset = this._opts.offset || this.defaultOffset;
			var T = this._opts.anchor;
			this._opts.anchor = hQ;
			if(!this._container) {
				return
			}
			var hS = this._container;
			var e = this._opts.offset.width;
			var hR = this._opts.offset.height;
			hS.style.left = hS.style.top = hS.style.right = hS.style.bottom = "auto";
			switch(hQ) {
				case BMAP_ANCHOR_TOP_LEFT:
					hS.style.top = hR + "px";
					hS.style.left = e + "px";
					break;
				case BMAP_ANCHOR_TOP_RIGHT:
					hS.style.top = hR + "px";
					hS.style.right = e + "px";
					break;
				case BMAP_ANCHOR_BOTTOM_LEFT:
					hS.style.bottom = hR + "px";
					hS.style.left = e + "px";
					break;
				case BMAP_ANCHOR_BOTTOM_RIGHT:
					hS.style.bottom = hR + "px";
					hS.style.right = e + "px";
					break;
				default:
					break
			}
			var i = ["TL", "TR", "BL", "BR"];
			C.rc(this._container, "anchor" + i[T]);
			C.ac(this._container, "anchor" + i[hQ])
		},
		getAnchor: function() {
			return this._opts.anchor
		},
		setOffset: function(e) {
			if(!e) {
				return
			}
			this._opts = this._opts || {};
			this._opts.offset = new d9(e.width, e.height);
			if(!this._container) {
				return
			}
			this.setAnchor(this._opts.anchor)
		},
		getOffset: function() {
			return this._opts.offset
		},
		getDom: function() {
			return this._container
		},
		show: function() {
			if(this._visible === true) {
				return
			}
			this._visible = true;
			if(this._container) {
				this._container.style.display = ""
			}
			this.dispatchEvent(new bb("onshow"))
		},
		hide: function() {
			if(this._visible === false) {
				return
			}
			this._visible = false;
			if(this._container) {
				this._container.style.display = "none"
			}
			this.dispatchEvent(new bb("onhide"))
		},
		isPrintable: function() {
			return !!this._opts.printable
		},
		isVisible: function() {
			if(!this._container && !this._map) {
				return false
			}
			return !!this._visible
		},
		_asyncLoadCode: function() {
			var e = this;
			ea.load("control", function() {
				if(e._asyncDraw) {
					e._asyncDraw()
				}
			})
		}
	});
	var hC = {
		TOP_LEFT: 0,
		TOP_RIGHT: 1,
		BOTTOM_LEFT: 2,
		BOTTOM_RIGHT: 3
	};
	bo.ControlAnchor = hC;
	window.BMAP_ANCHOR_TOP_LEFT = 0;
	window.BMAP_ANCHOR_TOP_RIGHT = 1;
	window.BMAP_ANCHOR_BOTTOM_LEFT = 2;
	window.BMAP_ANCHOR_BOTTOM_RIGHT = 3;

	function dH(e) {
		a7.call(this);
		e = e || {};
		this._opts = {
			printable: false
		};
		C.extend(this._opts, e);
		this._copyrightCollection = [];
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
		this.defaultOffset = new d9(5, 2);
		this.setAnchor(e.anchor);
		this._canShow = true;
		this.sateMapStyle = false;
		this.blockInfoWindow = false;
		this._asyncLoadCode()
	}
	dH.inherits(a7, "CopyrightControl");
	C.extend(dH.prototype, {
		initialize: function(e) {
			this._map = e;
			return this._container
		},
		addCopyright: function(hQ) {
			var e = {
				minZoom: 0,
				bounds: null,
				content: "",
				mapType: ""
			};
			for(var T in hQ) {
				e[T] = hQ[T]
			}
			if(this._map) {
				var hT = e.minZoom;
				if(hT === -1 || hT < this._map.getMinZoom() || hT > this._map.getMaxZoom()) {
					e.minZoom = this._map.getMinZoom()
				}
				if(e.mapType !== "" && !b6[e.mapType]) {
					e.mapType = BMAPGL_NORMAL_MAP
				}
			}
			var hR = this.getCopyright(hQ.id);
			if(hR) {
				for(var hS in e) {
					hR[hS] = e[hS]
				}
			} else {
				this._copyrightCollection.push(e)
			}
		},
		getCopyright: function(hQ) {
			for(var T = 0, e = this._copyrightCollection.length; T < e; T++) {
				if(this._copyrightCollection[T].id === hQ) {
					return this._copyrightCollection[T]
				}
			}
		},
		addSateMapStyle: function() {
			this.sateMapStyle = true;
			if(this._container) {
				C.ac(this._container, "BMap_cpyCtrl_w")
			}
		},
		removeSateMapStyle: function() {
			this.sateMapStyle = false;
			if(this._container) {
				C.rc(this._container, "BMap_cpyCtrl_w")
			}
		}
	});

	function eb(e) {
		a7.call(this);
		e = e || {};
		this.canCheckSize = e.canCheckSize === false ? false : true;
		this.curCityName = "";
		this.curCityCode = "";
		this.defaultOffset = new d9(10, 10);
		this.defaultAnchor = hC.TOP_LEFT;
		this.onChangeBefore = [];
		this.onChangeAfter = [];
		this.onChangeSuccess = [];
		this._opts = {
			printable: false,
			offset: e.offset || this.defaultOffset,
			anchor: e.anchor || this.defaultAnchor,
			expand: !!(e.expand)
		};
		if(e.onChangeBefore && bV(e.onChangeBefore)) {
			this.onChangeBefore.push(e.onChangeBefore)
		}
		if(e.onChangeAfter && bV(e.onChangeAfter)) {
			this.onChangeAfter.push(e.onChangeAfter)
		}
		if(e.onChangeSuccess && bV(e.onChangeSuccess)) {
			this.onChangeSuccess.push(e.onChangeSuccess)
		}
		this.setAnchor(e.anchor);
		this._asyncLoadCode()
	}
	eb.inherits(a7, "CityListControl");
	C.extend(eb.prototype, {
		initialize: function(e) {
			this._map = e;
			return this._container
		}
	});

	function hg(e) {
		a7.call(this);
		e = e || {};
		this._opts = {
			printable: false
		};
		this._opts = C.extend(C.extend(this._opts, {
			unit: "metric"
		}), e);
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
		this.defaultOffset = new d9(81, 18);
		if(f4()) {
			this.defaultOffset = new d9(75, 10)
		}
		this.setAnchor(e.anchor);
		this._units = {
			metric: {
				name: "metric",
				conv: 1,
				incon: 1000,
				u1: "米",
				u2: "公里"
			},
			us: {
				name: "us",
				conv: 3.2808,
				incon: 5280,
				u1: "英尺",
				u2: "英里"
			}
		};
		this.sateMapStyle = false;
		if(!this._units[this._opts.unit]) {
			this._opts.unit = "metric"
		}
		this._scaleText = null;
		this._numberArray = {};
		this._asyncLoadCode()
	}
	window.BMAP_UNIT_METRIC = "metric";
	window.BMAP_UNIT_IMPERIAL = "us";
	hg.inherits(a7, "ScaleControl");
	C.extend(hg.prototype, {
		initialize: function(e) {
			this._map = e;
			return this._container
		},
		setUnit: function(e) {
			this._opts.unit = this._units[e] && this._units[e].name || this._opts.unit
		},
		getUnit: function() {
			return this._opts.unit
		},
		addSateMapStyle: function() {
			this.sateMapStyle = true;
			var e = this._container;
			if(e) {
				C.ac(e.children[0], "dark")
			}
		},
		removeSateMapStyle: function() {
			this.sateMapStyle = false;
			var e = this._container;
			if(e) {
				C.rc(e.children[0], "dark")
			}
		}
	});
	window.BMAP_NAVIGATION_CONTROL_LARGE = 0;
	window.BMAP_NAVIGATION_CONTROL_SMALL = 1;
	window.BMAP_NAVIGATION_CONTROL_PAN = 2;
	window.BMAP_NAVIGATION_CONTROL_ZOOM = 3;
	window.BMAP_NAVIGATION_CONTROL_ANIM = 4;

	function dt(e) {
		a7.call(this);
		e = e || {};
		this._opts = {
			printable: false
		};
		C.extend(this._opts, e);
		this.controlHeight = [{
			width: 65,
			height: 227,
			zoomHeight: 227,
			zoomWidth: 37,
			sliderHeight: 180
		}, {
			width: 65,
			height: 47,
			zoomHeight: (this._opts.forceNew === true) ? 56 : 47,
			zoomWidth: 37,
			sliderHeight: 0
		}, {
			width: 37,
			height: 57,
			zoomHeight: 0,
			zoomWidth: 0,
			sliderHeight: 0
		}, {
			width: 26,
			height: 56,
			zoomHeight: 56,
			zoomWidth: 6,
			sliderHeight: 0
		}, {
			width: 56,
			height: 47,
			zoomHeight: 47,
			zoomWidth: 37,
			sliderHeight: 180
		}];
		this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
		this.defaultOffset = new d9(10, 10);
		this.setAnchor(e.anchor);
		this.setType(e.type);
		this._maxTotalZoomLv = 19;
		this._minZoomLevel = -1;
		this._maxZoomLevel = -1;
		this._totalZoomLv = -1;
		this._sliderInterval = 10;
		this._sliderHeight = 180;
		this._minBarY = 1;
		this._maxBarY = -1;
		this._curBarY = -1;
		this._zoomDom = null;
		this._zoomBtnDom = null;
		this._sliderDom = null;
		this._sliderBaseDom = null;
		this._cZIndex = "1100";
		this._asyncLoadCode()
	}
	dt.inherits(a7, "NavigationControl");
	C.extend(dt.prototype, {
		initialize: function(e) {
			this._map = e;
			return this._container
		},
		setType: function(e) {
			if(typeof e == "number" && e >= BMAP_NAVIGATION_CONTROL_LARGE && e <= BMAP_NAVIGATION_CONTROL_ANIM) {
				this._opts.type = e
			} else {
				this._opts.type = BMAP_NAVIGATION_CONTROL_LARGE
			}
		},
		getType: function() {
			return this._opts.type
		}
	});

	function bC(i) {
		a7.call(this);
		i = i || {};
		this._opts = {
			printable: false
		};
		this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		this.defaultOffset = new d9(10, 10);
		this.setAnchor(i.anchor);
		this._opts = C.extend(C.extend(this._opts, {
			offset: this.defaultOffset,
			enableSwitch: true
		}), i);
		var e = this;
		ea.load("control", function() {
			e._asyncDraw()
		})
	}
	bC.inherits(a7, "MapTypeControl");
	C.extend(bC.prototype, {
		initialize: function(e) {
			this._map = e;
			return this._container
		},
		showStreetLayer: function(e) {
			this._map.showStreetLayer(e)
		}
	});

	function cy(e) {
		a7.call(this);
		e = e || {};
		this._opts = {};
		this._opts = C.extend(this._opts, e);
		this._zoomInDisabled = false;
		this._zoomOutDisabled = false;
		this._zoomInTapped = false;
		this._zoomOutTapped = false;
		this.defaultAnchor = hC.BOTTOM_RIGHT;
		this.defaultOffset = new d9(15, 20);
		this.setAnchor(e.anchor);
		this._asyncLoadCode()
	}
	cy.inherits(a7, "ZoomControl");
	C.extend(cy.prototype, {
		initialize: function(e) {
			this._map = e;
			return this._container
		}
	});

	function bA(e) {
		a7.call(this);
		e = e || {};
		this._opts = {
			autoZoom: true,
			autoViewport: true
		};
		this._opts = C.extend(this._opts, e);
		this.defaultAnchor = hC.BOTTOM_LEFT;
		this.defaultOffset = new d9(10, 50);
		this.watchPosition = this._opts.watchPosition || false;
		this.useCompass = this._opts.useCompass || false;
		this.locMarker = null;
		this.locLevel = 16;
		this.setAnchor(this._opts.anchor);
		this.onLocationStart = e.onLocationStart || null;
		this._asyncLoadCode()
	}
	bA.inherits(a7, "LocationControl");
	C.extend(bA.prototype, {
		initialize: function(e) {
			this._map = e;
			return this._container
		},
		startLocation: function() {
			this._startLocationCalled = true
		},
		stopLocationTrace: function() {},
		setOptions: function(e) {
			e = e || {};
			C.extend(this._opts, e)
		}
	});

	function af(e) {
		a7.call(this);
		e = e || {};
		this._opts = {};
		this._opts = C.extend(this._opts, e);
		this.defaultAnchor = hC.BOTTOM_LEFT;
		this.defaultOffset = new d9(5, 15);
		if(f4()) {
			this.defaultOffset = new d9(10, 10)
		}
		this.setAnchor(e.anchor)
	}
	af.inherits(a7, "LogoControl");
	C.extend(af.prototype, {
		initialize: function(i) {
			this._map = i;
			var e = this._container = document.createElement("div");
			//e.innerHTML = '<img src="' + e3.apiHost + '/images/logo_hd.png"  style="height:21px;width:62px;"/>';
			e.innerHTML = '<img src="'+bd_map_cfg.host_dir+'img/logo_hd.png"  style="height:21px;width:62px;"/>';
			i.getContainer().appendChild(e);
			return e
		}
	});

	function gA(e, i) {
		this._map = e;
		this._indoorInfo = i;
		this._visible = true;
		this._adjustVisible = true;
		this._isMobile = f4();
		this._sizeConfig = {
			FLOOR_BTN_HEIGHT: this._isMobile ? 35 : 26,
			SWITCH_ARROW_HEIGHT: this._isMobile ? 20 : 15
		};
		this._init()
	}
	gA.prototype._init = function() {
		this._render();
		this._bindDom();
		this._bind();
		this._adjustDisplayHeight();
		var e = new bb("onindoor_bar_show");
		e.uid = this._indoorInfo.uid;
		this._map.dispatchEvent(e)
	};
	gA.prototype._render = function() {
		if(!this._indoorInfo) {
			return
		}
		var hU = this._isMobile;
		var e = this._div = S("div");
		C.ac(e, "floor-select-container");
		hU && C.ac(e, "mobile");
		hU && C.ac(e, "all-border-radius");
		var i = this._btnTop = S("button");
		C.ac(i, "floor-switch-top");
		C.ac(i, "top-border-radius");
		var hS = S("div");
		C.ac(hS, "floor-switch-top-icon");
		i.appendChild(hS);
		var hR = this._btnBottom = S("button");
		var T = S("div");
		C.ac(T, "floor-switch-bottom-icon");
		hR.appendChild(T);
		C.ac(hR, "floor-switch-bottom");
		C.ac(hR, "bottom-border-radius");
		var hQ = this._floorsContainer = S("div");
		C.ac(hQ, "floors-container");
		hQ.appendChild(this._createFloorsDom());
		this._div.appendChild(i);
		this._div.appendChild(hQ);
		this._div.appendChild(hR);
		var hV = 0;
		if(this._btnTop.style.display === "") {
			hV = 2 * this._sizeConfig.SWITCH_ARROW_HEIGHT
		}
		this._div.style.height = parseInt(this._floorsContainer.style.height, 10) + hV + "px";
		this._map.getContainer().appendChild(this._div);
		if(!hU) {
			var hT = this;
			setTimeout(function() {
				hT._div.style.right = "20px"
			}, 20)
		}
	};
	gA.prototype._createFloorsDom = function() {
		if(!this._indoorInfo) {
			return
		}
		var T = this._ol = S("ol");
		var hS = this._indoorInfo.currentFloor;
		for(var hR = this._indoorInfo.floors.length - 1; hR >= 0; hR--) {
			var hT = this._indoorInfo.floors[hR].floorName;
			var e = S("li");
			var hQ = S("button");
			C.ac(hQ, "btn-select-floor");
			if(hR === hS) {
				C.ac(hQ, "selected")
			}
			hQ.setAttribute("data-floor", hR);
			hQ.innerHTML = hT;
			e.appendChild(hQ);
			T.appendChild(e)
		}
		return T
	};
	gA.prototype._updateUI = function() {
		if(!this._ol) {
			this._render();
			this._bind();
			this._adjustDisplayHeight();
			return
		}
		this._ol = null;
		this._ol = this._createFloorsDom();
		this._floorsContainer.innerHTML = "";
		this._floorsContainer.appendChild(this._ol);
		this._adjustDisplayHeight()
	};
	gA.prototype._bindDom = function() {
		var e = this;
		C.on(this._floorsContainer, "click", function(hQ) {
			var T = hQ.target || hQ.srcElement;
			if(T.tagName.toLowerCase() === "button") {
				e._map.showIndoor(e._indoorInfo.uid, parseInt(T.getAttribute("data-floor"), 10));
				var i = new bb("onindoor_bar_click");
				i.uid = e._indoorInfo.uid;
				e._map.dispatchEvent(i)
			}
		});
		C.on(this._floorsContainer, "mouseover", function(T) {
			var i = T.target;
			if(i.tagName.toLowerCase() === "button") {
				C.ac(i, "hover")
			}
		});
		C.on(this._floorsContainer, "mouseout", function(T) {
			var i = T.target;
			if(i.tagName.toLowerCase() === "button") {
				C.rc(i, "hover")
			}
		});
		C.on(this._floorsContainer, "touchstart", function(T) {
			var i = T.target;
			if(i.tagName.toLowerCase() === "button") {
				C.ac(i, "onmousedown")
			}
		});
		C.on(this._floorsContainer, "touchend", function(T) {
			var i = T.target;
			if(i.tagName.toLowerCase() === "button") {
				C.rc(i, "onmousedown")
			}
		});
		C.on(this._btnTop, "mouseover", function(i) {
			if(this._disable) {
				return
			}
			C.ac(this, "hover")
		});
		C.on(this._btnTop, "mouseout", function(i) {
			C.rc(this, "hover")
		});
		C.on(this._btnBottom, "mouseover", function(i) {
			if(this._disable) {
				return
			}
			C.ac(this, "hover")
		});
		C.on(this._btnBottom, "mouseout", function(i) {
			C.rc(this, "hover")
		});
		C.on(this._btnTop, "touchstart", function(i) {
			if(this.className.indexOf("disable") > -1) {
				return
			}
			C.ac(this, "onmousedown")
		});
		C.on(this._btnTop, "touchend", function(i) {
			C.rc(this, "onmousedown")
		});
		C.on(this._btnBottom, "touchstart", function(i) {
			if(this.className.indexOf("disable") > -1) {
				return
			}
			C.ac(this, "onmousedown")
		});
		C.on(this._btnBottom, "touchend", function(i) {
			C.rc(this, "onmousedown")
		});
		C.on(this._btnTop, "click", function(i) {
			e._setBarSliderTop(parseInt(e._ol.style.top, 10) + 26)
		});
		C.on(this._btnBottom, "click", function(i) {
			e._setBarSliderTop(parseInt(e._ol.style.top, 10) - 26)
		});
		C.on(this._div, "mousemove", h);
		C.on(this._div, "wheel", db);
		C.on(this._div, "mousewheel", db);
		this._map.addEventListener("resize", function() {
			e._adjustDisplayHeight()
		})
	};
	gA.prototype._adjustDisplayHeight = function() {
		if(!this._indoorInfo) {
			return
		}
		var hS = this._map.getSize().height;
		var hT = this._sizeConfig.FLOOR_BTN_HEIGHT;
		var hU = hS - 291 - 100;
		if(this._isMobile) {
			hU = hS - 12 - 108 - this._map.config.bottomOffset
		}
		var e = this._indoorInfo.floors.length;
		var T = e * hT;
		var hQ = e;
		var hW = 0;
		var hX = this._floorsContainer.children[0];
		if(T > hU) {
			this._showArrow = true;
			C.rc(hX.children[0].children[0], "top-border-radius");
			C.rc(hX.children[e - 1].children[0], "bottom-border-radius")
		} else {
			this._showArrow = false;
			C.ac(hX.children[0].children[0], "top-border-radius");
			C.ac(hX.children[e - 1].children[0], "bottom-border-radius")
		}
		while(T > hU) {
			if(hQ === 0) {
				break
			}
			hQ--;
			hW = 2 * this._sizeConfig.SWITCH_ARROW_HEIGHT;
			T = hQ * hT + hW
		}
		this._currentDisplayHeight = T;
		if(hQ < 3) {
			this._setAdjustVisbile(false)
		} else {
			this._setAdjustVisbile(true)
		}
		this._floorsContainer.style.height = hQ * hT + "px";
		var hR = this._indoorInfo.currentFloor;
		var i = e - hR;
		var hV = hR - 1;
		this._div.style.height = parseInt(this._floorsContainer.style.height, 10) + hW + "px";
		var hY = -(e - (hR + Math.round(hQ / 2))) * hT;
		this._setBarSliderTop(hY);
		if(hQ < e) {
			C.show(this._btnTop);
			C.show(this._btnBottom)
		} else {
			C.hide(this._btnTop);
			C.hide(this._btnBottom);
			this._setBarSliderTop(0)
		}
		if(this._isMobile) {
			this._div.style.bottom = 108 + this._map.config.bottomOffset + "px"
		}
	};
	gA.prototype._setBarSliderTop = function(hQ) {
		var T = 26;
		var i = this._indoorInfo.floors.length;
		var e = i * T;
		if(this._currentDisplayHeight) {
			if(this._showArrow) {
				e = this._currentDisplayHeight - 30
			} else {
				e = this._currentDisplayHeight
			}
		}
		if(e - hQ >= i * T) {
			hQ = e - i * T;
			C.ac(this._btnBottom, "disable");
			C.rc(this._btnBottom, "hover");
			this._btnBottom._disable = true
		} else {
			C.rc(this._btnBottom, "disable");
			this._btnBottom._disable = false
		}
		if(hQ >= 0) {
			hQ = 0;
			C.ac(this._btnTop, "disable");
			C.rc(this._btnTop, "hover");
			this._btnTop._disable = true
		} else {
			C.rc(this._btnTop, "disable");
			this._btnTop._disable = false
		}
		this._ol.style.top = hQ + "px"
	};
	gA.prototype._setAdjustVisbile = function(e) {
		if(this._adjustVisible === e) {
			return
		}
		this._adjustVisible = e;
		if(e && this._visible) {
			this._div.style.right = "20px"
		} else {
			this._div.style.right = "-30px"
		}
	};
	gA.prototype._bind = function() {
		var i = this._map;
		var e = this;
		i.on("indoor_status_changed", function(hU) {
			if(e._visible === false) {
				return
			}
			var T = e._ol;
			var hS = hU.uid;
			if(!hS) {
				return
			}
			var hT = hU.floor;
			for(var hR = 0; hR < T.children.length; hR++) {
				var hQ = T.children[hR].children[0];
				if(parseInt(hQ.getAttribute("data-floor"), 10) === hT) {
					C.ac(hQ, "selected")
				} else {
					C.rc(hQ, "selected")
				}
			}
		});
		i.on("zoomend", function(T) {
			if(this.getZoom() < 17) {
				e._setAdjustVisbile(false)
			} else {
				e._setAdjustVisbile(true)
			}
		})
	};
	gA.prototype.setInfo = function(e) {
		if(this._indoorInfo && this._indoorInfo.uid === e.uid) {
			return
		}
		this._indoorInfo = e;
		this._updateUI()
	};
	gA.prototype.show = function() {
		if(this._visible === true) {
			return
		}
		this._visible = true;
		if(!this._isMobile) {
			this._div.style.right = "20px"
		} else {
			this._div.style.display = ""
		}
		var e = new bb("onindoor_bar_show");
		e.uid = this._indoorInfo.uid;
		this._map.dispatchEvent(e)
	};
	gA.prototype.hide = function() {
		if(this._visible === false) {
			return
		}
		this._visible = false;
		if(!this._isMobile) {
			this._div.style.right = "-30px"
		} else {
			this._div.style.display = "none"
		}
	};

	function eU() {
		this._opts = {};
		this.defaultOffset = new d9(2, 80);
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
		this._firstAnimation = true
	}
	eU.inherits(a7, "NavigationControl3D");
	C.extend(eU.prototype, {
		initialize: function(T) {
			this._map = T;
			this._createDom();
			this._bindDom();
			this._bind();
			if(!f4()) {
				this._headingControl = new hF(this._map, this._div)
			}
			this._tiltControl = new es(this._map, this._div);
			this._render();
			var i = this._map.getMapType();
			var e = this;
			if(i === "B_EARTH_MAP" || this._map._renderType === "webgl") {
				e._div.style.opacity = "1";
				e._div.style.visibility = "visible"
			} else {
				e._div.style.opacity = "0";
				e._div.style.visibility = "hidden"
			}
			return this._container
		},
		_createDom: function() {
			var i = this._div = document.createElement("div");
			this._container = i;
			var e = i.style;
			e.position = "absolute";
			e.zIndex = 5;
			e.width = "52px";
			e.height = "82px";
			e.right = "-3px";
			e.bottom = "79px";
			e.opacity = "0";
			e.visibility = "hidden";
			e.WebkitTransition = e.transition = "opacity .3s ease-out,visibility .3s ease-out"
		},
		_render: function() {
			var e = document.getElementById("map-operate");
			if(e) {
				e.appendChild(this._div)
			} else {
				this._map.getContainer().appendChild(this._div)
			}
		},
		_bindDom: function() {
			this._div.addEventListener("mousemove", h)
		},
		_bind: function() {
			if(this._map._renderType === "webgl") {
				return
			}
			var e = this;
			this._map.on("maptypechange", function() {
				if(this.mapType === "B_EARTH_MAP") {
					if(e._firstAnimation) {
						e._firstAnimation = false;
						setTimeout(function() {
							e._div.style.opacity = "1";
							e._div.style.visibility = "visible"
						}, 300)
					} else {
						e._div.style.opacity = "1";
						e._div.style.visibility = "visible"
					}
				} else {
					e._div.style.opacity = "0";
					e._div.style.visibility = "hidden"
				}
			})
		}
	});

	function hF(T, i) {
		this._map = T;
		this._target = T;
		var hQ = T.temp.originMapType || T.mapType;
		if(hQ === "B_EARTH_MAP" && T._earth) {
			this._target = T._earth
		}
		this._outContainer = i || T.getContainer();
		this._imgRatio = a6() >= 1.5 ? 2 : 1;
		this._imgPath = e3.imgPath + "earth-navi-control-pc4" + (this._imgRatio === 2 ? "-2x.png" : ".png");
		this._enabled = true;
		var e = this;
		this._setHeadingOptions = {
			callback: function() {
				e._target.setLock(false)
			}
		};
		this._init()
	}
	C.extend(hF.prototype, {
		_init: function() {
			this._createDom();
			this._render();
			this._bindDom();
			this._bind();
			this._updateUI();
			this._checkEnable()
		},
		_checkEnable: function() {
			if(this._target.getZoom() >= this._target._enableHeadingZoom) {
				this.enable()
			} else {
				this.disable()
			}
		},
		_createDom: function() {
			var i = this._div = S("div");
			var e = i.style;
			e.position = "absolute";
			e.zIndex = 5;
			e.top = "0";
			e.left = "0";
			e.width = "52px";
			e.height = "54px";
			e.background = "url(" + this._imgPath + ") no-repeat";
			e.backgroundSize = "266px auto";
			this._rotateCCW = this._createButton();
			this._rotateCCW.title = "逆时针转动";
			e = this._rotateCCW.style;
			e.left = "2px";
			e.top = "5px";
			e.zIndex = "1";
			e.width = "15px";
			e.height = "42px";
			e.backgroundPosition = "-75px -5px";
			this._rotateCW = this._createButton();
			this._rotateCW.title = "顺时针转动";
			e = this._rotateCW.style;
			e.right = "2px";
			e.top = "5px";
			e.zIndex = "1";
			e.width = "15px";
			e.height = "42px";
			e.backgroundPosition = "-75px -5px";
			e.WebkitTransform = e.transform = "scaleX(-1)";
			this._compass = this._createButton();
			this._compass.title = "恢复正北方向";
			e = this._compass.style;
			e.left = "19px";
			e.top = "4px";
			e.width = "14px";
			e.height = "44px";
			e.backgroundPosition = "-56px -4px";
			e.WebkitTransform = e.transform = "rotate(0deg)";
			this._div.appendChild(this._rotateCCW);
			this._div.appendChild(this._compass);
			this._div.appendChild(this._rotateCW);
			this._domRendered = true
		},
		_createButton: function() {
			var e = S("button");
			var i = e.style;
			i.position = "absolute";
			i.outline = "none";
			i.border = "none";
			i.background = "url(" + this._imgPath + ") no-repeat";
			i.backgroundSize = "266px auto";
			i.cursor = "pointer";
			return e
		},
		_render: function() {
			this._outContainer.appendChild(this._div)
		},
		enable: function() {
			this._enabled = true;
			if(this._domRendered) {
				this._rotateCCW.style.cursor = "pointer";
				this._rotateCCW.style.opacity = 1;
				this._rotateCW.style.cursor = "pointer";
				this._rotateCW.style.opacity = 1;
				this._compass.style.cursor = "pointer";
				this._compass.style.opacity = 1
			}
		},
		disable: function() {
			this._enabled = false;
			if(this._domRendered) {
				this._rotateCCW.style.cursor = "";
				this._rotateCCW.style.opacity = 0.4;
				this._rotateCW.style.cursor = "";
				this._rotateCW.style.opacity = 0.4;
				this._compass.style.cursor = "";
				this._compass.style.opacity = 0.4
			}
		},
		_bindDom: function() {
			eK(this._div, ["mousedown", "click", "dblclick"]);
			var i = this._map;
			var e = this;
			this._rotateCW.addEventListener("click", function() {
				if(e._isOperating || e._enabled === false) {
					return
				}
				if(e._target.getLock()) {
					return
				}
				if(e._target.getHeading() === 360) {
					e._target.setHeading(0)
				}
				e._target.setLock(true);
				e._target.setHeading(e._target.getHeading() + 90, e._setHeadingOptions);
				i.fire(new bb("onrotatecwclick"))
			}, false);
			this._rotateCCW.addEventListener("click", function() {
				if(e._isOperating || e._enabled === false) {
					return
				}
				if(e._target.getLock()) {
					return
				}
				if(e._target.getHeading() === -360) {
					e._target.setHeading(0)
				}
				e._target.setLock(true);
				e._target.setHeading(e._target.getHeading() - 90, e._setHeadingOptions);
				i.fire(new bb("onrotateccwclick"))
			}, false);
			this._rotateCW.addEventListener("mouseover", function() {
				if(e._enabled === false) {
					return
				}
				this.style.backgroundPosition = "-89px -5px"
			}, false);
			this._rotateCW.addEventListener("mouseout", function() {
				if(e._enabled === false) {
					return
				}
				this.style.backgroundPosition = "-75px -5px"
			}, false);
			this._rotateCCW.addEventListener("mouseover", function() {
				if(e._enabled === false) {
					return
				}
				this.style.backgroundPosition = "-89px -5px"
			}, false);
			this._rotateCCW.addEventListener("mouseout", function() {
				if(e._enabled === false) {
					return
				}
				this.style.backgroundPosition = "-75px -5px"
			}, false);
			this._compass.addEventListener("click", function() {
				if(e._isOperating || e._enabled === false) {
					return
				}
				if(e._target.getLock()) {
					return
				}
				e._target.setLock(true);
				var T = false;
				if(e._target.getTilt() !== 0) {
					T = true;
					e._target.setTilt(0, e._setHeadingOptions)
				}
				if(e._target.getHeading() % 360 !== 0) {
					T = true;
					e._target.resetHeading(e._setHeadingOptions)
				}
				if(!T) {
					e._target.setLock(false)
				}
				i.fire(new bb("oncompassclick"))
			}, false)
		},
		_bind: function() {
			var e = this;
			this._bindTarget(this._target);
			if(this._map._renderType === "webgl") {
				this._map.addEventListener("maptypechange", function(i) {
					if(this.mapType === "B_EARTH_MAP") {
						e._target = e._map._earth
					} else {
						e._target = e._map
					}
					e._bindTarget(e._target);
					e._checkEnable()
				})
			}
		},
		_bindTarget: function(i) {
			if(i === this._map && this._mapBinded) {
				return
			}
			if(i === this._map._earth && this._earthBinded) {
				return
			}
			var e = this;
			i.addEventListener("heading_changed", function(T) {
				e._updateUI()
			});
			i.addEventListener("animation_start", function(T) {
				e._isOperating = true
			});
			i.addEventListener("animation_end", function(T) {
				e._isOperating = false
			});
			i.on("load", function() {
				e._checkEnable()
			});
			i.on("zoom_changed", function() {
				e._checkEnable()
			});
			if(i === this._map) {
				this._mapBinded = true
			} else {
				this._earthBinded = true
			}
		},
		_updateUI: function() {
			var e = this._target.getHeading();
			var i = this._compass.style;
			i.WebkitTransform = i.transform = "rotate(" + e + "deg)"
		},
		hide: function() {
			this._div.style.display = "none"
		},
		show: function() {
			this._div.style.display = "block"
		}
	});

	function es(T, i) {
		this._map = T;
		this._target = T;
		var hQ = T.temp.originMapType || T.mapType;
		if(hQ === "B_EARTH_MAP" && T._earth) {
			this._target = T._earth
		}
		this._outContainer = i || T.getContainer();
		this._imgRatio = a6() >= 1.5 ? 2 : 1;
		this._imgPath = e3.imgPath + "gl-navi-control-pc4" + (this._imgRatio === 2 ? "-2x.png" : ".png");
		this._enabled = true;
		var e = this;
		this._setTiltOptions = {
			callback: function() {
				e._target.setLock(false)
			}
		};
		this._init()
	}
	C.extend(es.prototype, {
		_init: function() {
			this._createDom();
			this._render();
			this._bindDom();
			this._bind();
			this._checkEnable()
		},
		_checkEnable: function() {
			if(this._target.getZoom() >= this._target._enableTiltZoom) {
				this.enable()
			} else {
				this.disable()
			}
		},
		_createDom: function() {
			var e = this._div = S("button");
			e.title = "倾斜";
			var i = e.style;
			i.position = "absolute";
			i.zIndex = 5;
			i.outline = "none";
			i.border = "none";
			i.cursor = "pointer";
			i.width = "26px";
			i.height = "26px";
			i.top = "56px";
			i.right = "13px";
			i.background = "url(" + this._imgPath + ") no-repeat #fff";
			i.backgroundSize = "266px auto";
			i.backgroundPosition = "-110px 1px";
			i.boxShadow = "1px 2px 1px rgba(0, 0, 0, 0.15)"
		},
		enable: function() {
			this._enabled = true;
			if(this._div) {
				this._div.style.cursor = "pointer"
			}
			this._updateUI()
		},
		disable: function() {
			this._enabled = false;
			if(this._div) {
				this._div.style.cursor = ""
			}
			this._updateUI()
		},
		_render: function() {
			this._outContainer.appendChild(this._div)
		},
		_bindDom: function() {
			var e = this;
			this._div.addEventListener("mousedown", function(hQ) {
				if(!e._enabled) {
					return
				}
				if(e._target.getLock()) {
					return
				}
				var i = e._target.getTilt();
				var T;
				if(i === e._map.getCurrentMaxTilt()) {
					T = "out"
				} else {
					if(i === 0) {
						T = "in"
					} else {
						T = e._preTrend ? e._preTrend : "in"
					}
				}
				e._curTrend = T;
				e._clickTimer = setTimeout(function() {
					e._map.fire(new bb("ontiltmsdown"));
					e._tiltAni = new o({
						duration: 9999999,
						render: function(hR) {
							i = e._target.getTilt();
							if(T === "in" && i < e._map.getCurrentMaxTilt()) {
								e._target.setTilt(i + 1, {
									noAnimation: true
								})
							} else {
								if(T === "out" && i > 0) {
									e._target.setTilt(i - 1, {
										noAnimation: true
									})
								}
							}
						},
						finish: function() {
							e._tiltAni = null
						}
					});
					e._clickTimer = null
				}, 200);
				hQ.stopPropagation()
			}, false);
			this._div.addEventListener("mouseup", function(i) {
				if(!e._enabled) {
					return
				}
				if(e._tiltAni) {
					e._tiltAni.stop()
				}
				e._preTrend = e._curTrend
			}, false);
			this._div.addEventListener("click", function(hQ) {
				if(!e._enabled) {
					return
				}
				if(!e._clickTimer) {
					return
				}
				if(e._target.getLock()) {
					return
				}
				clearTimeout(e._clickTimer);
				e._map.fire(new bb("ontiltclick"));
				var i = e._target.getTilt();
				e._target.setLock(true);
				hQ.stopPropagation();
				var T = e._map.getCurrentMaxTilt();
				if(e._curTrend === "in") {
					e._target.setTilt(T, e._setTiltOptions)
				} else {
					if(e._curTrend === "out") {
						e._target.setTilt(0, e._setTiltOptions)
					} else {
						if(i < T) {
							e._target.setTilt(T, e._setTiltOptions)
						} else {
							e._target.setTilt(0, e._setTiltOptions)
						}
					}
				}
			}, false);
			this._div.addEventListener("mouseover", function(i) {
				if(!e._enabled) {
					return
				}
				e._mouseOver = true;
				e._updateUI()
			}, false);
			this._div.addEventListener("mouseout", function(i) {
				if(!e._enabled) {
					return
				}
				e._mouseOver = false;
				e._updateUI()
			}, false);
			eK(this._div, ["mousedown", "click", "dblclick"])
		},
		_bind: function() {
			var e = this;
			var i = this._map;
			this._bindTarget(this._target);
			if(this._map._renderType === "webgl") {
				this._map.addEventListener("maptypechange", function(T) {
					if(this.mapType === "B_EARTH_MAP") {
						e._target = e._map._earth
					} else {
						e._target = e._map
					}
					e._bindTarget(e._target);
					e._checkEnable()
				})
			}
		},
		_bindTarget: function(i) {
			if(i === this._map && this._mapBinded) {
				return
			}
			if(i === this._map._earth && this._earthBinded) {
				return
			}
			var e = this;
			i.on("load", function() {
				e._checkEnable()
			});
			i.on("zoom_changed", function() {
				e._checkEnable()
			});
			i.on("tilt_changed", function() {
				e._updateUI()
			});
			if(i === this._map) {
				this._mapBinded = true
			} else {
				this._earthBinded = true
			}
		},
		_updateUI: function() {
			var T = this._target.getTilt();
			var i = 0;
			var hQ = 0;
			var e = 0;
			if(T > 0) {
				i = 78
			}
			if(this._mouseOver) {
				e = 52
			}
			if(this._enabled === false) {
				hQ = 26;
				e = 0;
				i = 0
			}
			var hR = "-" + (110 + i + hQ + e) + "px 1px";
			this._div && (this._div.style.backgroundPosition = hR);
			if(this._enabled) {
				if(T > 0) {
					this._div && (this._div.title = "恢复")
				} else {
					this._div && (this._div.title = "倾斜")
				}
			} else {
				this._div && (this._div.title = "请放大地图后操作")
			}
		},
		hide: function() {
			this._div.style.display = "none"
		},
		show: function() {
			this._div.style.display = "block"
		}
	});

	function cf(i) {
		ed.call(this);
		this._opts = {
			container: null,
			cursor: "default"
		};
		this._opts = C.extend(this._opts, i);
		this._type = "contextmenu";
		this._map = null;
		this._container;
		this._left = 0;
		this._top = 0;
		this._items = [];
		this._rItems = [];
		this._dividers = [];
		this._enable = true;
		this.curPixel = null;
		this.curPoint = null;
		this._isOpen = false;
		var e = this;
		ea.load("menu", function() {
			e._draw()
		})
	}
	cf.inherits(ed, "ContextMenu");
	C.extend(cf.prototype, {
		initialize: function(e) {
			this._map = e
		},
		remove: function() {
			this._map = null
		},
		addItem: function(hR, e) {
			if(!hR || hR._type != "menuitem" || hR._text == "" || hR._width <= 0) {
				return
			}
			for(var hQ = 0, T = this._items.length; hQ < T; hQ++) {
				if(this._items[hQ] === hR) {
					return
				}
			}
			if(e === undefined || e > this._items.length - 1) {
				e = -1
			}
			hR._insertIndex = e;
			if(e === -1) {
				this._items.push(hR);
				this._rItems.push(hR)
			} else {
				this._items.splice(e, 0, hR);
				this._rItems.splice(e, 0, hR)
			}
		},
		removeItem: function(hQ) {
			if(!hQ || hQ._type != "menuitem") {
				return
			}
			for(var T = 0, e = this._items.length; T < e; T++) {
				if(this._items[T] === hQ) {
					this._items[T].remove();
					this._items.splice(T, 1);
					delete hQ._insertIndex;
					e--
				}
			}
			for(var T = 0, e = this._rItems.length; T < e; T++) {
				if(this._rItems[T] === hQ) {
					this._rItems[T].remove();
					this._rItems.splice(T, 1);
					delete hQ._insertIndex;
					e--
				}
			}
		},
		addSeparator: function(e) {
			if(e === undefined || e > this._items.length - 1) {
				e = -1
			}
			var i = {
				_type: "divider",
				_dIndex: this._dividers.length,
				_insertIndex: e
			};
			this._dividers.push({
				dom: null
			});
			if(e === -1) {
				this._items.push(i)
			} else {
				this._items.splice(e, 0, i)
			}
		},
		removeSeparator: function(T) {
			if(!this._dividers[T]) {
				return
			}
			for(var hQ = 0, e = this._items.length; hQ < e; hQ++) {
				if(this._items[hQ] && this._items[hQ]._type == "divider" && this._items[hQ]._dIndex == T) {
					this._items.splice(hQ, 1);
					e--
				}
				if(this._items[hQ] && this._items[hQ]._type == "divider" && this._items[hQ]._dIndex > T) {
					this._items[hQ]._dIndex--
				}
			}
			this._dividers.splice(T, 1)
		},
		getDom: function() {
			return this._container
		},
		show: function() {
			if(this._isOpen == true) {
				return
			}
			this._isOpen = true
		},
		hide: function() {
			if(this._isOpen == false) {
				return
			}
			this._isOpen = false
		},
		setCursor: function(e) {
			if(!e) {
				return
			}
			this._opts.cursor = e
		},
		getItem: function(e) {
			return this._rItems[e]
		},
		enable: function() {
			this._enable = true
		},
		disable: function() {
			this._enable = false
		}
	});

	function fy(T, hQ, i) {
		if(!T || !hQ || typeof hQ != "function") {
			return
		}
		ed.call(this);
		this._opts = {
			width: 100,
			id: ""
		};
		i = i || {};
		this._opts.width = (i.width * 1) ? i.width : 100;
		this._opts.id = i.id ? i.id : "";
		this._text = T + "";
		this._callback = hQ;
		this._map = null;
		this._type = "menuitem";
		this._contextmenu = null;
		this._container = null;
		this._enabled = true;
		var e = this;
		ea.load("menu", function() {
			e._draw()
		})
	}
	fy.inherits(ed, "MenuItem");
	C.extend(fy.prototype, {
		initialize: function(e, i) {
			this._map = e;
			this._contextmenu = i
		},
		remove: function() {
			this._contextmenu = null;
			this._map = null
		},
		setText: function(e) {
			if(!e) {
				return
			}
			this._text = e + ""
		},
		getDom: function() {
			return this._container
		},
		enable: function() {
			this._enabled = true
		},
		disable: function() {
			this._enabled = false
		}
	});

	function dS(e, i) {
		this.setSouthWest(e);
		this.setNorthEast(i)
	}
	C.extend(dS.prototype, {
		isEmpty: function() {
			return this.sw === null && this.ne === null
		},
		equals: function(e) {
			if(!e || e.isEmpty() || this.isEmpty()) {
				return false
			}
			return this.sw.equals(e.sw) && this.ne.equals(e.ne)
		},
		containsBounds: function(e) {
			if(!e || e.isEmpty() || this.isEmpty()) {
				return false
			}
			return(e.sw.lng > this.sw.lng && e.ne.lng < this.ne.lng && e.sw.lat > this.sw.lat && e.ne.lat < this.ne.lat)
		},
		getCenter: function() {
			if(this.isEmpty()) {
				return null
			}
			return new hr((this.sw.lng + this.ne.lng) / 2, (this.sw.lat + this.ne.lat) / 2)
		},
		intersects: function(T) {
			if(!T || T.isEmpty() || this.isEmpty()) {
				return null
			}
			if(Math.max(T.sw.lng, T.ne.lng) < Math.min(this.sw.lng, this.ne.lng) || Math.min(T.sw.lng, T.ne.lng) > Math.max(this.sw.lng, this.ne.lng) || Math.max(T.sw.lat, T.ne.lat) < Math.min(this.sw.lat, this.ne.lat) || Math.min(T.sw.lat, T.ne.lat) > Math.max(this.sw.lat, this.ne.lat)) {
				return null
			}
			var hR = Math.max(this.sw.lng, T.sw.lng);
			var i = Math.min(this.ne.lng, T.ne.lng);
			var hQ = Math.max(this.sw.lat, T.sw.lat);
			var e = Math.min(this.ne.lat, T.ne.lat);
			return new dS(new hr(hR, hQ), new hr(i, e))
		},
		setMinMax: function() {
			this.minX = this.sw ? this.sw.lng : null;
			this.minY = this.sw ? this.sw.lat : null;
			this.maxX = this.ne ? this.ne.lng : null;
			this.maxY = this.ne ? this.ne.lat : null
		},
		containsPoint: function(e) {
			if(!e) {
				return
			}
			return(e.lng >= this.sw.lng && e.lng <= this.ne.lng && e.lat >= this.sw.lat && e.lat <= this.ne.lat)
		},
		extend: function(e) {
			if(!e) {
				return
			}
			var i = e.lng;
			var T = e.lat;
			if(!this.sw) {
				this.sw = e.clone()
			}
			if(!this.ne) {
				this.ne = e.clone()
			}
			if(this.sw.lng > i) {
				this.sw.lng = i
			}
			if(this.ne.lng < i) {
				this.ne.lng = i
			}
			if(this.sw.lat > T) {
				this.sw.lat = T
			}
			if(this.ne.lat < T) {
				this.ne.lat = T
			}
		},
		getMin: function() {
			return this.sw
		},
		getMax: function() {
			return this.ne
		},
		getSouthWest: function() {
			return this.sw
		},
		getNorthEast: function() {
			return this.ne
		},
		setSouthWest: function(e) {
			this.sw = e ? e.clone() : null
		},
		setNorthEast: function(e) {
			this.ne = e ? e.clone() : null
		},
		clone: function() {
			return new dS(this.sw, this.ne)
		},
		toSpan: function() {
			if(this.isEmpty()) {
				return new d9(0, 0)
			}
			return new d9(Math.abs(this.ne.lng - this.sw.lng), Math.abs(this.ne.lat - this.sw.lat))
		},
		div: function(e) {
			if(!e || e.isEmpty() || this.isEmpty()) {
				return 0
			}
			return((this.ne.lng - this.sw.lng) * (this.ne.lat - this.sw.lat)) / ((e.ne.lng - e.sw.lng) * (e.ne.lat - e.sw.lat))
		},
		makeNormalizedPoint: function(e) {
			this.normalizedTopLeft = this.pointTopLeft.clone();
			this.normalizedTopRight = this.pointTopRight.clone();
			this.normalizedBottomRight = this.pointBottomRight.clone();
			this.normalizedBottomLeft = this.pointBottomLeft.clone();
			while(e < 0) {
				e += 360
			}
			e = e % 360;
			if(e >= 0 && e < 90 || e >= 270 && e < 360) {
				if(this.normalizedTopRight.lng < this.normalizedTopLeft.lng) {
					this.normalizedTopRight.lng += c8.WORLD_SIZE_MC
				}
				if(this.normalizedBottomRight.lng < this.normalizedBottomLeft.lng) {
					this.normalizedBottomRight.lng += c8.WORLD_SIZE_MC
				}
			} else {
				if(this.normalizedTopLeft.lng < this.normalizedTopRight.lng) {
					this.normalizedTopLeft.lng += c8.WORLD_SIZE_MC
				}
				if(this.normalizedBottomLeft.lng < this.normalizedBottomRight.lng) {
					this.normalizedBottomLeft.lng += c8.WORLD_SIZE_MC
				}
			}
		},
		toString: function() {
			return "Bounds"
		}
	});

	function hr(e, i) {
		if(isNaN(e)) {
			e = g0(e);
			e = isNaN(e) ? 0 : e
		}
		if(typeof e === "string") {
			e = parseFloat(e)
		}
		if(isNaN(i)) {
			i = g0(i);
			i = isNaN(i) ? 0 : i
		}
		if(typeof i === "string") {
			i = parseFloat(i)
		}
		this.lng = e;
		this.lat = i
	}
	hr.prototype.equals = function(i) {
		if(!i) {
			return false
		}
		var hQ = Math.abs(this.lat - i.lat);
		var T = Math.abs(this.lng - i.lng);
		var e = 1e-8;
		if(hQ < e && T < e) {
			return true
		}
		return false
	};
	hr.prototype.clone = function() {
		return new hr(this.lng, this.lat)
	};
	hr.prototype.add = function(e) {
		return new hr(this.lng + e.lng, this.lat + e.lat)
	};
	hr.prototype.sub = function(e) {
		return new hr(this.lng - e.lng, this.lat - e.lat)
	};
	hr.prototype.mult = function(e) {
		return new hr(this.lng * e, this.lat * e)
	};
	hr.prototype.div = function(e) {
		return new hr(this.lng / e, this.lat / e)
	};
	hr.prototype.mag = function() {
		return Math.sqrt(this.lng * this.lng + this.lat * this.lat)
	};
	hr.prototype.toString = function() {
		return "Point"
	};

	function en() {}
	C.extend(en, {
		EARTHRADIUS: 6370996.81,
		MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
		LLBAND: [86, 60, 45, 30, 15, 0],
		MC2LL: [
			[1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2],
			[-7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
			[-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
			[-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
			[3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
			[2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]
		],
		LL2MC: [
			[-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
			[0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
			[0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
			[0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
			[-0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
			[-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
		],
		getDistanceByMC: function(hS, hQ) {
			if(!hS || !hQ) {
				return 0
			}
			var i;
			var hR;
			var e;
			var T;
			hS = this.convertMC2LL(hS);
			if(!hS) {
				return 0
			}
			i = dK(hS.lng);
			hR = dK(hS.lat);
			hQ = this.convertMC2LL(hQ);
			if(!hQ) {
				return 0
			}
			e = dK(hQ.lng);
			T = dK(hQ.lat);
			return this.getDistance(i, e, hR, T)
		},
		getDistanceByLL: function(hS, hQ) {
			if(!hS || !hQ) {
				return 0
			}
			hS.lng = this.getLoop(hS.lng, -180, 180);
			hS.lat = this.getRange(hS.lat, -80, 84);
			hQ.lng = this.getLoop(hQ.lng, -180, 180);
			hQ.lat = this.getRange(hQ.lat, -80, 84);
			var i;
			var e;
			var hR;
			var T;
			i = dK(hS.lng);
			hR = dK(hS.lat);
			e = dK(hQ.lng);
			T = dK(hQ.lat);
			return this.getDistance(i, e, hR, T)
		},
		proximityCovertMC2LL: function(e) {
			if(e === null) {
				return e
			}
			if(e.lng < 180 && e.lng > -180 && e.lat < 90 && e.lat > -90) {
				return e
			}
			return this.convertMC2LL(e)
		},
		convertMC2LL: function(e) {
			if(e === null) {
				return e
			}
			if(!e) {
				return new hr(0, 0)
			}
			var T;
			var hR;
			T = new hr(Math.abs(e.lng), Math.abs(e.lat));
			for(var hQ = 0; hQ < this.MCBAND.length; hQ++) {
				if(T.lat >= this.MCBAND[hQ]) {
					hR = this.MC2LL[hQ];
					break
				}
			}
			var hS = this.convertor(e, hR);
			return new c4(hS.lat, hS.lng)
		},
		convertLL2MC: function(hT) {
			if(!hT) {
				return new hr(0, 0)
			}
			var hV = hT.lat;
			var hQ = hT.lng;
			hQ = this.getLoop(hT.lng, -180, 180);
			hV = fF(hV, -85, 85);
			var hS;
			for(var hR = 0; hR < this.LLBAND.length; hR++) {
				if(hV >= this.LLBAND[hR]) {
					hS = this.LL2MC[hR];
					break
				}
			}
			if(!hS) {
				for(hR = 0; hR < this.LLBAND.length; hR++) {
					if(hV <= -this.LLBAND[hR]) {
						hS = this.LL2MC[hR];
						break
					}
				}
			}
			var T = new hr(hQ, hV);
			var hU = this.convertor(T, hS);
			var e = new hr(hU.lng, hU.lat);
			e.latLng = new c4(hT.lat, hT.lng);
			return e
		},
		convertor: function(T, hQ) {
			if(!T || !hQ) {
				return
			}
			var e = hQ[0] + hQ[1] * Math.abs(T.lng);
			var i = Math.abs(T.lat) / hQ[9];
			var hR = hQ[2] + hQ[3] * i + hQ[4] * i * i + hQ[5] * i * i * i + hQ[6] * i * i * i * i + hQ[7] * i * i * i * i * i + hQ[8] * i * i * i * i * i * i;
			e *= (T.lng < 0 ? -1 : 1);
			hR *= (T.lat < 0 ? -1 : 1);
			return new hr(e, hR)
		},
		getDistance: function(i, e, hQ, T) {
			return this.EARTHRADIUS * Math.acos((Math.sin(hQ) * Math.sin(T) + Math.cos(hQ) * Math.cos(T) * Math.cos(e - i)))
		},
		getRange: function(T, i, e) {
			if(i != null) {
				T = Math.max(T, i)
			}
			if(e != null) {
				T = Math.min(T, e)
			}
			return T
		},
		getLoop: function(T, i, e) {
			while(T > e) {
				T -= e - i
			}
			while(T < i) {
				T += e - i
			}
			return T
		}
	});
	C.extend(en.prototype, {
		lnglatToMercator: function(e) {
			return en.convertLL2MC(e)
		},
		lngLatToPoint: function(e) {
			var i = en.convertLL2MC(e);
			return new ej(i.lng, i.lat)
		},
		mercatorToLnglat: function(e) {
			return en.convertMC2LL(e)
		},
		pointToLngLat: function(i) {
			var e = new hr(i.x, i.y);
			var T = en.convertMC2LL(e);
			return new c4(T.lat, T.lng)
		},
		pointToPixel: function(i, hS, hR, hQ) {
			if(!i) {
				return
			}
			i = this.lnglatToMercator(i);
			var T = this.getZoomUnits(hS);
			var e = Math.round((i.lng - hR.lng) / T + hQ.width / 2);
			var hT = Math.round((hR.lat - i.lat) / T + hQ.height / 2);
			return new ej(e, hT)
		},
		mercatorToPixel: function(hS, hR, hQ, T) {
			if(!hS) {
				return
			}
			var i = this.getZoomUnits(hR);
			var e = Math.round((hS.lng - hQ.lng) / i + T.width / 2);
			var hT = Math.round((hQ.lat - hS.lat) / i + T.height / 2);
			return new ej(e, hT)
		},
		pixelToPoint: function(hQ, hT, hS, hR) {
			if(!hQ) {
				return
			}
			var i = this.getZoomUnits(hT);
			var T = hS.lng + i * (hQ.x - hR.width / 2);
			var hU = hS.lat - i * (hQ.y - hR.height / 2);
			var e = new hr(T, hU);
			return this.mercatorToLnglat(e)
		},
		getZoomUnits: function(e) {
			return Math.pow(2, (18 - e))
		},
		setCoordType: function(e) {
			this.coordsType = e
		}
	});

	function c4(i, e) {
		if(i < -90) {
			i = -90
		} else {
			if(i > 90) {
				i = 90
			}
		}
		while(e < -180) {
			e += 360
		}
		while(e > 180) {
			e -= 360
		}
		e = e || 0;
		i = i || 0;
		hr.call(this, e, i)
	}
	c4.inherits(hr, "LatLng");
	C.extend(c4.prototype, {
		equals: function(e) {
			return(this.lat === e.lat && this.lng === e.lng)
		},
		clone: function() {
			return new c4(this.lat, this.lng)
		},
		add: function(e) {
			return new c4(this.lng + e.lng, this.lat + e.lat)
		},
		sub: function(e) {
			return new c4(this.lat - e.lat, this.lng - e.lng)
		},
		mult: function(e) {
			return new c4(this.lng * e, this.lat * e)
		},
		div: function(e) {
			return new c4(this.lng / e, this.lat / e)
		},
		mag: function() {
			return Math.sqrt(this.lng * this.lng + this.lat * this.lat)
		},
		getLngSpan: function(e) {
			var i = this.lng;
			var T = Math.abs(e - i);
			if(T > 180) {
				T = 360 - T
			}
			return T
		},
		toString: function() {
			return "LatLng"
		}
	});

	function eG(e, i) {
		if(e && !i) {
			i = e
		}
		this._sw = this._ne = null;
		this._swLng = this._swLat = null;
		this._neLng = this._neLat = null;
		if(e) {
			this._sw = new c4(e.lat, e.lng);
			this._ne = new c4(i.lat, i.lng);
			this._swLng = e.lng;
			this._swLat = e.lat;
			this._neLng = i.lng;
			this._neLat = i.lat
		}
	}
	C.extend(eG.prototype, {
		isEmpty: function() {
			return !this._sw || !this._ne
		},
		equals: function(e) {
			if(this.isEmpty()) {
				return false
			}
			return this.getSouthWest().equals(e.getSouthWest()) && this.getNorthEast().equals(e.getNorthEast())
		},
		getSouthWest: function() {
			return this._sw
		},
		getNorthEast: function() {
			return this._ne
		},
		containsBounds: function(e) {
			if(this.isEmpty() || e.isEmpty()) {
				return false
			}
			return(e._swLng > this._swLng && e._neLng < this._neLng && e._swLat > this._swLat && e._neLat < this._neLat)
		},
		getCenter: function() {
			if(this.isEmpty()) {
				return null
			}
			return new c4((this._swLat + this._neLat) / 2, (this._swLng + this._neLng) / 2)
		},
		intersects: function(T) {
			if(Math.max(T._swLng, T._neLng) < Math.min(this._swLng, this._neLng) || Math.min(T._swLng, T._neLng) > Math.max(this._swLng, this._neLng) || Math.max(T._swLat, T._neLat) < Math.min(this._swLat, this._neLat) || Math.min(T._swLat, T._neLat) > Math.max(this._swLat, this._neLat)) {
				return false
			}
			var hR = Math.max(this._swLng, T._swLng);
			var i = Math.min(this._neLng, T._neLng);
			var hQ = Math.max(this._swLat, T._swLat);
			var e = Math.min(this._neLat, T._neLat);
			this._sw = new c4(hQ, hR);
			this._ne = new c4(e, i);
			this._swLng = hR;
			this._swLat = hQ;
			this._neLng = i;
			this._neLat = e;
			return true
		},
		containsPoint: function(e) {
			if(this.isEmpty()) {
				return false
			}
			return(e.lng >= this._swLng && e.lng <= this._neLng && e.lat >= this._swLat && e.lat <= this._neLat)
		},
		extend: function(e) {
			var i = e.lng;
			var T = e.lat;
			if(!this._sw) {
				this._sw = new c4(0, 0)
			}
			if(!this._ne) {
				this._ne = new c4(0, 0)
			}
			if(!this._swLng || this._swLng > i) {
				this._sw.lng = this._swLng = i
			}
			if(!this._neLng || this._neLng < i) {
				this._ne.lng = this._neLng = i
			}
			if(!this._swLat || this._swLat > T) {
				this._sw.lat = this._swLat = T
			}
			if(!this._neLat || this._neLat < T) {
				this._ne.lat = this._neLat = T
			}
		},
		toSpan: function() {
			if(this.isEmpty()) {
				return new c4(0, 0)
			}
			return new c4(Math.abs(this._neLat - this._swLat), Math.abs(this._neLng - this._swLng))
		},
		union: function(i) {
			if(i.isEmpty()) {
				return false
			}
			var e = i.getSouthWest();
			var T = i.getNorthEast();
			if(this._swLat > e.lat) {
				this._swLat = e.lat
			}
			if(this._swLng > e.lng) {
				this._swLng = e.lng
			}
			if(this._neLat < T.lat) {
				this._neLat = T.lat
			}
			if(this._neLng < T.lng) {
				this._neLng = T.lng
			}
			this._sw = new c4(this._swLat, this._swLng);
			this._ne = new c4(this._neLat, this._neLng);
			return true
		},
		toString: function() {
			return this._swLat + ", " + this._swLng + ", " + this._neLat + ", " + this._neLng
		}
	});
	window.COORDINATES_WGS84 = 1;
	window.COORDINATES_WGS84_MC = 2;
	window.COORDINATES_GCJ02 = 3;
	window.COORDINATES_GCJ02_MC = 4;
	window.COORDINATES_BD09 = 5;
	window.COORDINATES_BD09_MC = 6;
	window.COORDINATES_MAPBAR = 7;
	window.COORDINATES_51 = 8;

	function ay() {}
	ay.inherits(ed, "Convertor");
	C.extend(ay.prototype, {
		translate: function(i, hR, hQ, T) {
			hR = hR || 1;
			hQ = hQ || 5;
			if(i.length > 10) {
				T && T({
					status: 25
				});
				return
			}
			var e = e3.apiHost + "/geoconv/v1/?coords=";
			C.each(i, function(hS) {
				e += hS.lng + "," + hS.lat + ";"
			});
			e = e.replace(/;$/gi, "");
			e = e + "&from=" + hR + "&to=" + hQ + "&ak=" + gd;
			D.request(e, function(hT) {
				if(hT.status === 0) {
					var hS = [];
					C.each(hT.result, function(hU) {
						hS.push(new hr(hU.x, hU.y))
					});
					delete hT.result;
					hT.points = hS
				}
				T && T(hT)
			})
		}
	});
	var dU = {
		idle: 0,
		freeze: 1,
		zooming: 2,
		dragging: 3,
		moving: 4,
		readyToDrag: 5,
		readyToPinch: 6,
		pinching: 7,
		stdMapCtrlDrag: 8,
		KEY_LEFT: 37,
		KEY_UP: 38,
		KEY_RIGHT: 39,
		KEY_DOWN: 40,
		arrowOpCodes: {
			37: 1,
			38: 2,
			39: 4,
			40: 8
		}
	};
	var eh = {
		_map: null,
		_html: "<div class='BMap_opMask' unselectable='on'></div>",
		_maskElement: null,
		_cursor: "default",
		inUse: false,
		show: function(e) {
			if(!this._map) {
				this._map = e
			}
			this.inUse = true;
			if(!this._maskElement) {
				this._createMask(e)
			}
			this._maskElement.style.display = "block"
		},
		_createMask: function(i) {
			if(!this._map) {
				this._map = i
			}
			if(!this._map) {
				return
			}
			var e = this._maskElement = dI(this._map.container, this._html);
			C.on(e, "mouseup", function(T) {
				if(T.button == 2) {
					db(T)
				}
			});
			C.on(e, "contextmenu", db);
			e.style.display = "none"
		},
		getDrawPoint: function(hQ, hT, hR) {
			hQ = window.event || hQ;
			var i = hQ.offsetX || hQ.layerX || 0;
			var hS = parseInt(hQ.offsetY) || parseInt(hQ.layerY) || 0;
			var T = hQ.target || hQ.srcElement;
			if(T != eh.getDom(this._map) && hT == true) {
				while(T && T != this._map.container) {
					if(!(T.clientWidth == 0 && T.clientHeight == 0 && T.offsetParent && T.offsetParent.nodeName.toLowerCase() == "td")) {
						i += T.offsetLeft;
						hS += T.offsetTop
					}
					T = T.offsetParent
				}
			}
			if(T != eh.getDom(this._map) && T != this._map.container) {
				return
			}
			if(typeof i === "undefined" || typeof hS === "undefined") {
				return
			}
			if(isNaN(i) || isNaN(hS)) {
				return
			}
			if(hR) {
				i = i + hR.x;
				hS = hS + hR.y
			}
			return this._map.pixelToPointIn(new ej(i, hS))
		},
		hide: function() {
			if(!this._map) {
				return
			}
			this.inUse = false;
			if(this._maskElement) {
				this._maskElement.style.display = "none"
			}
		},
		getDom: function(e) {
			if(!this._maskElement) {
				this._createMask(e)
			}
			return this._maskElement
		},
		setCursor: function(e) {
			this._cursor = e || "default";
			if(this._maskElement) {
				this._maskElement.style.cursor = this._cursor
			}
		}
	};

	function bl() {
		this._type = "overlay"
	}
	bl.inherits(C.BaseClass, "Overlay");
	bl.getZIndex = function(i, e) {
		i = i * 1;
		if(!i) {
			return 0
		}
		if(e) {
			i = en.convertMC2LL(new hr(0, i)).lat
		}
		return(i * -100000) << 1
	};
	C.extend(bl.prototype, {
		_i: function(e) {
			this._map = e;
			if(!this.domElement && bV(this.initialize)) {
				this.domElement = this.initialize(e);
				if(this.domElement) {
					this.domElement.style.WebkitUserSelect = "none"
				}
			}
			this.draw()
		},
		initialize: function(e) {
			throw "initialize方法未实现"
		},
		draw: function() {
			throw "draw方法未实现"
		},
		remove: function() {
			if(this.domElement && this.domElement.parentNode) {
				this.domElement.parentNode.removeChild(this.domElement)
			}
			this.domElement = null;
			this.dispatchEvent(new bb("onremove"))
		},
		hide: function() {
			this._visible = false;
			C.hide(this.domElement)
		},
		show: function() {
			this._visible = true;
			C.show(this.domElement)
		},
		getMap: function() {
			return this._map
		},
		dispose: function() {
			C.BaseClass.prototype.decontrol.call(this)
		}
	});

	function cV() {
		C.BaseClass.call(this);
		bl.call(this);
		this._visible = true;
		this._visibleInternal = true;
		this.infoWindow = null;
		this._dblclickTime = 0
	}
	cV.inherits(bl, "OverlayInternal");
	C.extend(cV.prototype, {
		initialize: function(e) {
			this.map = e;
			C.BaseClass.call(this, this.hashCode);
			return null
		},
		draw: function() {},
		remove: function() {
			this.decontrol();
			bl.prototype.remove.call(this)
		},
		hide: function() {
			this._visible = false
		},
		show: function() {
			this._visible = true
		},
		getDom: function() {
			return this.domElement
		},
		getContainer: function() {
			return this.domElement
		},
		setClassName: function() {},
		setConfig: function(i) {
			if(!i) {
				return
			}
			for(var e in i) {
				if(i.hasOwnProperty(e)) {
					this._config[e] = i[e]
				}
			}
		},
		getPoint: function(T, hQ) {
			if(!T) {
				return this.point
			} else {
				var e = hQ ? hQ.width : 0;
				var hR = hQ ? hQ.height : 0;
				if(this.map) {
					var i = this.map.pointToPixelIn(this.point);
					if(this._config && this._config.offset) {
						i.x = i.x + this._config.offset.width + e;
						i.y = i.y + this._config.offset.height + hR
					} else {
						i.x = i.x + e;
						i.y = i.y + hR
					}
					return this.map.pixelToPointIn(i)
				}
			}
		},
		setZIndex: function(e) {
			this.zIndex = e
		},
		isVisible: function() {
			if(!this.domElement) {
				return false
			}
			return !!this._visible
		},
		enableMassClear: function() {
			this._config.enableMassClear = true
		},
		disableMassClear: function() {
			this._config.enableMassClear = false
		},
		showInternal: function() {
			this._visibleInternal = true
		},
		hideInternal: function(e) {
			this._visibleInternal = false;
			this._hideInternalReason = e
		}
	});

	function eX(e) {
		this.map = e;
		this._overlays = {};
		this._overlayArray = [];
		this._customOverlays = [];
		e._overlays = this._overlays;
		e._overlayArray = this._overlayArray;
		e._customOverlays = this._customOverlays;
		this._zoomingOrMoving = false;
		this._init()
	}
	eX.prototype._init = function() {
		if(this.map._renderType !== "webgl") {
			this._createOverlayContainers()
		} else {
			this._createWebGLOverlayContainers()
		}
		this._bind()
	};
	eX.prototype._createOverlayContainers = function() {
		var e = this.map;
		e.temp.overlayDiv = e.overlayDiv = this._createOverlayDiv(e.platform, 200);
		e.temp.overlayDivEx = e.overlayDivEx = this._createOverlayDiv(e.platform, 50);
		e._panes.floatPane = this._createOverlayDiv(e.temp.overlayDiv, 800);
		e._panes.markerMouseTarget = this._createOverlayDiv(e.temp.overlayDiv, 700);
		e._panes.floatShadow = this._createOverlayDiv(e.temp.overlayDiv, 600);
		e._panes.labelPane = this._createOverlayDiv(e.temp.overlayDiv, 500);
		e._panes.markerPane = this._createOverlayDiv(e.temp.overlayDiv, 400);
		if(e.isCanvasMap()) {
			e._panes.mapPane = this._createOverlayDiv(e.temp.overlayDivEx, 50)
		} else {
			e._panes.mapPane = this._createOverlayDiv(e.temp.overlayDiv, 200)
		}
	};
	eX.prototype._createWebGLOverlayContainers = function() {
		var e = this.map;
		e.temp.overlayDiv = e.overlayDiv = this._createOverlayDiv(e.platform, 200);
		e._panes.floatPane = this._createOverlayDiv(e.temp.overlayDiv, 800);
		e._panes.markerMouseTarget = this._createOverlayDiv(e.temp.overlayDiv, 700);
		e._panes.floatShadow = this._createOverlayDiv(e.temp.overlayDiv, 600);
		e._panes.labelPane = this._createOverlayDiv(e.temp.overlayDiv, 500);
		e._panes.markerPane = this._createOverlayDiv(e.temp.overlayDiv, 400)
	};
	eX.prototype._createOverlayDiv = function(e, hQ) {
		var T = S("div");
		var i = T.style;
		i.position = "absolute";
		i.top = i.left = i.width = i.height = "0";
		i.zIndex = hQ;
		e.appendChild(T);
		return T
	};
	eX.prototype._bind = function() {
		var hR = this.map;
		var hQ = this;

		function i(hT) {
			hQ.draw(hT)
		}
		if(hR._renderType !== "webgl") {
			hR.addEventListener("load", i);
			hR.addEventListener("moveend", i);
			hR.addEventListener("resize", i);
			hR.addEventListener("zoomend", i);
			hR.addEventListener("zooming_inner", i)
		} else {
			hR.on("update", i)
		}
		hR.addEventListener("zoomend", function(hT) {
			if(this.mapType === "B_EARTH_MAP") {
				if(this._earth.getZoom() < this._earth.zoomForNight + 1) {
					this.temp.overlayDiv.style.display = "none";
					if(this.temp.overlayDivEx) {
						this.temp.overlayDivEx.style.display = "none"
					}
				} else {
					if(this.temp.overlayDiv.style.display === "none") {
						this.temp.overlayDiv.style.display = "";
						if(this.temp.overlayDivEx) {
							this.temp.overlayDivEx.style.display = ""
						}
						if(this.temp.infoWin && this.temp.infoWin.isOpen()) {
							this.temp.infoWin.redraw()
						}
					}
				}
			}
		});
		hR.addEventListener("oncenterandzoom", function(hT) {
			hQ.draw(hT);
			if(this.mapType === "B_EARTH_MAP") {
				if(this._earth.getZoom() < this._earth.zoomForNight + 1) {
					this.temp.overlayDiv.style.display = "none";
					if(this.temp.overlayDivEx) {
						this.temp.overlayDivEx.style.display = "none"
					}
				} else {
					if(this.temp.overlayDiv.style.display === "none") {
						this.temp.overlayDiv.style.display = "";
						if(this.temp.overlayDivEx) {
							this.temp.overlayDivEx.style.display = ""
						}
						if(this.temp.infoWin && this.temp.infoWin.isOpen()) {
							this.temp.infoWin.redraw()
						}
					}
				}
			}
		});
		hR.addEventListener("maptypechange", function(hT) {
			if(this.mapType === "B_EARTH_MAP") {
				if(this._panes.mapPane) {
					this._panes.mapPane.style.display = "none"
				}
				if(this._earth.getZoom() < this._earth.zoomForNight + 1) {
					this.temp.overlayDiv.style.display = "none";
					if(this.temp.overlayDivEx) {
						this.temp.overlayDivEx.style.display = "none"
					}
				} else {
					if(this.temp.overlayDiv.style.display === "none") {
						this.temp.overlayDiv.style.display = "";
						if(this.temp.overlayDivEx) {
							this.temp.overlayDivEx.style.display = ""
						}
						if(this.temp.infoWin && this.temp.infoWin.isOpen()) {
							this.temp.infoWin.redraw()
						}
					}
				}
				if(this._panes.markerPane) {
					this._panes.markerPane.style.display = "none"
				}
			} else {
				if(this._panes.mapPane) {
					this._panes.mapPane.style.display = ""
				}
				if(this._panes.markerPane) {
					this._panes.markerPane.style.display = ""
				}
				if(this.temp.overlayDiv.style.display === "none") {
					this.temp.overlayDiv.style.display = "";
					if(this.temp.overlayDivEx) {
						this.temp.overlayDivEx.style.display = ""
					}
					if(this.temp.infoWin && this.temp.infoWin.isOpen()) {
						this.temp.infoWin.redraw()
					}
				}
			}
			hQ.draw(hT)
		});
		hR.on("earthstatuschange", function hS(hT) {
			hQ.draw(hT)
		});
		hR.addEventListener("addoverlay", function(hX) {
			var hU = hX.target;
			if(hU instanceof cV) {
				if(!hQ._overlays[hU.hashCode]) {
					hQ._overlays[hU.hashCode] = hU;
					hQ._overlayArray.push(hU)
				}
			} else {
				var hW = false;
				for(var hV = 0, hT = hQ._customOverlays.length; hV < hT; hV++) {
					if(hQ._customOverlays[hV] === hU) {
						hW = true;
						break
					}
				}
				if(!hW) {
					hQ._customOverlays.push(hU)
				}
			}
		});
		hR.addEventListener("removeoverlay", function(hW) {
			var hU = hW.target;
			if(hU instanceof cV) {
				delete hQ._overlays[hU.hashCode];
				for(var hV = 0; hV < hQ._overlayArray.length; hV++) {
					if(hQ._overlayArray[hV] === hU) {
						hQ._overlayArray.splice(hV, 1);
						break
					}
				}
			} else {
				for(var hV = 0, hT = hQ._customOverlays.length; hV < hT; hV++) {
					if(hQ._customOverlays[hV] === hU) {
						hQ._customOverlays.splice(hV, 1);
						break
					}
				}
			}
		});
		hR.addEventListener("clearoverlays", function(hV) {
			this.closeInfoWindow();
			this.closeSimpleInfoWindow();
			for(var hU in hQ._overlays) {
				if(hQ._overlays[hU]._config.enableMassClear) {
					this.removeOverlay(hQ._overlays[hU])
				}
			}
			for(var hT = hQ._customOverlays.length - 1; hT > 0; hT--) {
				if(hQ._customOverlays[hT].enableMassClear !== false) {
					this.removeOverlay(hQ._customOverlays[hT]);
					hQ._customOverlays.splice(hT, 1)
				}
			}
		});
		hR.addEventListener("infowindowopen", function(hU) {
			var hT = this.infoWindow;
			if(hT) {
				C.hide(hT.popDom);
				C.hide(hT.shadowDom)
			}
		});

		function T() {
			if(this.getMapType() === "B_EARTH_MAP" || this._renderType === "webgl") {
				if(hQ._zoomingOrMoving === false) {
					this._panes.markerMouseTarget.style.display = "none";
					hQ._zoomingOrMoving = true
				}
			}
		}

		function e(hV) {
			if(this.getMapType() === "B_EARTH_MAP" || this._renderType === "webgl") {
				if(hQ._zoomingOrMoving === true) {
					this._panes.markerMouseTarget.style.display = "";
					hQ._zoomingOrMoving = false;
					for(var hU = 0; hU < hQ._overlayArray.length; hU++) {
						var hT = hQ._overlayArray[hU];
						if(hT instanceof dr === true) {
							hT.draw(hV)
						}
					}
				}
			}
		}
		hR.addEventListener("movestart", T);
		hR.addEventListener("moveend", e);
		hR.addEventListener("zoomstart", T);
		hR.addEventListener("zoomend", e);
		hR.addEventListener("animation_start", T);
		hR.addEventListener("animation_end", e);
		hR.addEventListener("displayoptions_changed", function(hT) {
			if(this._displayOptions.overlay === false) {
				this.temp.overlayDiv.style.display = "none"
			} else {
				this.temp.overlayDiv.style.display = ""
			}
		})
	};
	eX.prototype.draw = function(hT) {
		hT = hT || {};
		if(this.map.getMapType() === "B_EARTH_MAP") {
			for(var hR = 0; hR < this._overlayArray.length; hR++) {
				var T = this._overlayArray[hR];
				if(T instanceof w === true) {
					continue
				}
				if(this._zoomingOrMoving) {
					if(T instanceof dr === true) {
						continue
					}
				}
				T.draw(hT)
			}
		} else {
			for(var hR = 0, hQ = this._overlayArray.length; hR < hQ; hR++) {
				var T = this._overlayArray[hR];
				if(this._zoomingOrMoving && T instanceof dr === true) {
					continue
				}
				T.draw(hT)
			}
		}
		C.each(this._customOverlays, function(e) {
			e.draw(hT)
		});
		if(this.map.temp.infoWin) {
			this.map.temp.infoWin.setPosition(hT.center, hT.zoom)
		}
		if(this.map.getMapType() !== "B_EARTH_MAP" && this.map._renderType !== "webgl") {
			if(bo.DrawerSelector) {
				var hS = bo.DrawerSelector.getDrawer(this.map);
				hS.setPalette()
			}
		}
	};
	bo.register(function(e) {
		e._overlayMgr = new eX(e)
	});

	function w(e) {
		cV.call(this);
		this._config = {
			strokeColor: "#000",
			strokeWeight: 2,
			strokeOpacity: 1,
			strokeStyle: "solid",
			dashArray: null,
			strokeLineCap: "round",
			strokeLineJoin: "round",
			enableMassClear: true,
			getParseTolerance: null,
			getParseCacheIndex: null,
			enableParse: true,
			enableEditing: false,
			mouseOverTolerance: 5,
			geodesic: false,
			clip: true,
			texture: null,
			textureSize: null,
			textureZoomWithMap: false,
			textureRepeat: true
		};
		this.setConfig(e);
		if(this._config.strokeOpacity < 0 || this._config.strokeOpacity > 1) {
			this._config.strokeOpacity = 1
		}
		if(this._config.fillOpacity < 0 || this._config.fillOpacity > 1) {
			this._config.fillOpacity = 1
		}
		if(this._config.strokeStyle !== "solid" && this._config.strokeStyle !== "dashed" && this._config.strokeStyle !== "dotted") {
			this._config.strokeStyle = "solid"
		}
		this.domElement = null;
		this._bounds = new dS();
		this.points = [];
		this.greatCirclePoints = [];
		this._parseCache = [];
		this._holesCache = [];
		this._parseCacheGL = [];
		this._parseCacheGLRaw = [];
		this._areaCacheGL = [];
		this._strokeStyleInfoForGL = [
			[]
		];
		this._fillStyleInfoForGL = "";
		this.vertexMarkers = [];
		this._temp = {}
	}
	w.JOININDEX = {
		miter: 0,
		round: 1,
		bevel: 2
	};
	w.CAPINDEX = {
		round: 0,
		butt: 1,
		square: 2
	};
	w.inherits(cV, "Graph");
	w.getGraphPoints = function(i) {
		var e = [];
		if(!i || i.length === 0) {
			return e
		}
		if(typeof i === "string") {
			var T = i.split(";");
			C.each(T, function(hR) {
				var hQ = hR.split(",");
				e.push(new hr(hQ[0], hQ[1]))
			})
		}
		if(i.constructor === Array && i.length > 0) {
			e = i
		}
		return e
	};
	w.parseTolerance = {
		0: [0.09, 0.005, 0.0001, 0.00001],
		1: [9000, 500, 20, 1]
	};
	C.extend(w.prototype, {
		initialize: function(e) {
			this.map = e;
			return null
		},
		draw: function() {},
		setPoints: function(e) {
			this._clearCache();
			this.points = w.getGraphPoints(e).slice(0);
			this._calcBounds()
		},
		setPathIn: function(e) {
			this.setPoints(e)
		},
		_calcBounds: function() {
			if(!this.points) {
				return
			}
			var e = this;
			e._bounds = new dS();
			if(!this.hasMultipleParts) {
				C.each(this.points, function(i) {
					e._bounds.extend(i)
				})
			} else {
				C.each(this.points, function(i) {
					C.each(i, function(T) {
						e._bounds.extend(T)
					})
				})
			}
		},
		getPoints: function() {
			return this.points
		},
		getPathIn: function() {
			return this.points
		},
		setPointAt: function(i, e) {
			if(!e || !this.points[i]) {
				return
			}
			this._clearCache();
			this.points[i] = new hr(e.lng, e.lat);
			this._calcBounds()
		},
		setPositionAt: function(i, e) {
			if(!e || !this.points[i]) {
				return
			}
			var T = en.convertLL2MC(e);
			this.setPointAt(i, T)
		},
		setOptions: function(i) {
			i = i || {};
			for(var e in i) {
				if(i.hasOwnProperty(e)) {
					this._config[e] = i[e]
				}
			}
		},
		setStrokeColor: function(e) {
			this._config.strokeColor = e
		},
		getStrokeColor: function() {
			return this._config.strokeColor
		},
		setStrokeLineCap: function(e) {
			this._config.strokeLineCap = e
		},
		getStrokeLineCap: function() {
			return this._config.strokeLineCap
		},
		setStrokeLineJoin: function(e) {
			this._config.strokeLineJoin = e
		},
		getStrokeLineJoin: function() {
			return this._config.strokeLineJoin
		},
		setStrokeWeight: function(e) {
			if(e > 0) {
				this._config.strokeWeight = e
			}
		},
		getStrokeWeight: function() {
			return this._config.strokeWeight
		},
		setStrokeOpacity: function(e) {
			if(!e || e > 1 || e < 0) {
				return
			}
			this._config.strokeOpacity = e
		},
		getStrokeOpacity: function() {
			return this._config.strokeOpacity
		},
		setFillOpacity: function(e) {
			if(e > 1 || e < 0) {
				return
			}
			this._config.fillOpacity = e
		},
		getFillOpacity: function() {
			return this._config.fillOpacity
		},
		setStrokeStyle: function(e) {
			if(e !== "solid" && e !== "dashed" && e !== "dotted") {
				return
			}
			this._config.strokeStyle = e
		},
		getStrokeStyle: function() {
			return this._config.strokeStyle
		},
		setFillColor: function(e) {
			this._config.fillColor = e || ""
		},
		getFillColor: function() {
			return this._config.fillColor
		},
		getBoundsIn: function() {
			this._bounds.setMinMax();
			return this._bounds
		},
		getBounds: function() {
			var e = this.getBoundsIn();
			var i = new dS(en.convertMC2LL(e.getSouthWest()), en.convertMC2LL(e.getNorthEast()));
			i.setMinMax();
			return i
		},
		remove: function() {
			if(this.map) {
				this.map.removeEventListener("onmousemove", this._graphMouseEvent);
				this.map.removeEventListener("onclick", this._graphClickEvent)
			}
			cV.prototype.remove.call(this);
			this._clearCache();
			var e = new bb("onlineupdate");
			e.action = "remove";
			e.overlay = this;
			this.fire(e)
		},
		enableEditing: function() {
			if(this.points.length < 2) {
				return
			}
			this._config.enableEditing = true;
			var e = this;
			ea.load("poly", function() {
				e.addVertexs()
			}, true)
		},
		disableEditing: function() {
			this._config.enableEditing = false;
			var e = this;
			ea.load("poly", function() {
				e.clearVertexs()
			}, true)
		},
		getLength: function() {
			if(typeof this._length === "number") {
				return this._length
			}
			if(typeof this._config.totalLength === "number") {
				this._length = this._config.totalLength;
				return this._length
			}
			var T = 0;
			if(this.points.length <= 1) {
				this._length = 0;
				return T
			}
			for(var e = 0; e < this.points.length - 1; e++) {
				T += bP(this.points[e], this.points[e + 1])
			}
			this._length = T;
			return T
		},
		getParsedPoints: function() {
			var e = this._simplification(this.points);
			if(this.hasMultipleParts) {
				return e
			}
			return [e]
		},
		_simplification: function(hU) {
			var e = this.map;
			var hT = this.getParseCacheIndex(e.getZoom());
			var hW;
			if(this._parseCache[hT]) {
				hW = this._parseCache[hT]
			} else {
				var hR = hU;
				if(this.greatCirclePoints.length > 0) {
					hR = this.greatCirclePoints
				}
				var hS = this.getParseTolerance(e.getZoom(), e.config.coordType);
				if(!this.hasMultipleParts) {
					var hV = hE(hR, hS)
				} else {
					var hV = [];
					for(var T = 0; T < hR.length; T++) {
						var hQ = hE(hR[T], hS);
						hV.push(hQ)
					}
				}
				hW = this._parseCache[hT] = hV
			}
			return hW
		},
		_clearCache: function() {
			this._length = null;
			this._parseCache.length = 0;
			this._parseCacheGL.length = 0;
			this._parseCacheGLRaw.length = 0;
			this._areaCacheGL.length = 0
		},
		canRenderDataBeMerged: function() {
			var e = this._config;
			if(e.texture) {
				return false
			}
			return true
		}
	});
	if(C.Browser.ie && document.namespaces && !document.namespaces.olv) {
		document.namespaces.add("olv", "urn:schemas-microsoft-com:vml")
	}

	function ha(hS, hQ, T) {
		if(!hS || !hQ) {
			return
		}
		this.imageUrl = null;
		this.imageDom = null;
		if(typeof hS === "string") {
			this.imageUrl = hS
		} else {
			this.imageDom = hS;
			if(!this.imageDom.id) {
				this.imageDom.id = bo.getGUID("icon_dom_")
			}
		}
		this.size = hQ;
		var hR = new d9(Math.floor(hQ.width / 2), Math.floor(hQ.height / 2));
		var i = {
			offset: hR,
			imageOffset: new d9(0, 0)
		};
		T = T || {};
		for(var e in T) {
			i[e] = T[e]
		}
		if(T.anchor) {
			i.offset = T.anchor
		}
		this.anchor = this.offset = i.offset;
		this.imageOffset = i.imageOffset;
		this.infoWindowOffset = T.infoWindowOffset || this.offset;
		this.printImageUrl = T.printImageUrl || "";
		this.imageSize = T.imageSize || this.size;
		this.srcSetObject = {};
		this.setImageSrcset(T.srcset || T.srcSet)
	}
	ha.prototype.setImageUrl = function(e) {
		if(!e) {
			return
		}
		this.imageUrl = e;
		this._renderData = null
	};
	ha.prototype.getCurrentImageUrl = function() {
		if(window.devicePixelRatio > 1 && this.srcSetObject["2x"]) {
			return this.srcSetObject["2x"]
		}
		return this.imageUrl
	};
	ha.prototype.setPrintImageUrl = function(e) {
		if(!e) {
			return
		}
		this.printImageUrl = e
	};
	ha.prototype.setSize = function(e) {
		if(!e) {
			return
		}
		this.size = new d9(e.width, e.height);
		this._renderData = null
	};
	ha.prototype.setOffset = function(e) {
		if(!e) {
			return
		}
		this.anchor = this.offset = new d9(e.width, e.height);
		this._renderData = null
	};
	ha.prototype.setAnchor = function(e) {
		this.setOffset(e)
	};
	ha.prototype.setImageOffset = function(e) {
		if(!e) {
			return
		}
		this.imageOffset = new d9(e.width, e.height);
		this._renderData = null
	};
	ha.prototype.setInfoWindowOffset = function(e) {
		if(!e) {
			return
		}
		this.infoWindowOffset = new d9(e.width, e.height)
	};
	ha.prototype.setImageSize = function(e) {
		if(!e) {
			return
		}
		this.imageSize = new d9(e.width, e.height)
	};
	ha.prototype.setImageSrcset = function(T) {
		var e = "";
		if(!T) {
			return
		}
		for(var i in T) {
			if(T.hasOwnProperty(i)) {
				this.srcSetObject[i] = T[i];
				e = T[i] + " " + i + ","
			}
		}
		this.srcSet = e
	};
	ha.prototype.toString = function() {
		return "Icon"
	};
	ha.prototype.generateRenderData = function(hS) {
		var T = this.offset;
		var e = this.size;
		var hU = this.imageOffset;
		var hT = [];
		hT.push(-T.width, T.height - e.height, 0);
		hT.push(e.width - T.width, T.height - e.height, 0);
		hT.push(e.width - T.width, T.height, 0);
		hT.push(-T.width, T.height - e.height, 0);
		hT.push(e.width - T.width, T.height, 0);
		hT.push(-T.width, T.height, 0);
		if(hS !== 0) {
			for(var hR = 0; hR < hT.length; hR += 3) {
				var hQ = vec2.fromValues(hT[hR], hT[hR + 1]);
				vec2.rotate(hQ, hQ, [0, 0], dK(-hS));
				hT[hR] = hQ[0];
				hT[hR + 1] = hQ[1]
			}
		}
		return {
			vertex: hT
		}
	};
	ha.prototype.getRenderData = function(e) {
		this._renderData = this.generateRenderData(e);
		return this._renderData
	};

	function an(T, i) {
		C.BaseClass.call(this);
		this.content = T;
		this.map = null;
		this._config = {
			width: 0,
			height: 0,
			maxWidth: 600,
			offset: new d9(0, 0),
			title: "",
			maxContent: "",
			enableMaximize: false,
			enableAutoPan: true,
			enableCloseOnClick: true,
			margin: [10, 10, 40, 10],
			collisions: [
				[10, 10],
				[10, 10],
				[10, 10],
				[10, 10]
			],
			ifMaxScene: false,
			onClosing: function() {
				return true
			}
		};
		this.setConfig(i);
		if(this._config.width !== 0) {
			if(this._config.width < 220) {
				this._config.width = 220
			}
			if(this._config.width > 730) {
				this._config.width = 730
			}
		}
		if(this._config.height !== 0) {
			if(this._config.height < 60) {
				this._config.height = 60
			}
			if(this._config.height > 650) {
				this._config.height = 650
			}
		}
		if(this._config.maxWidth !== 0) {
			if(this._config.maxWidth < 220) {
				this._config.maxWidth = 220
			}
			if(this._config.maxWidth > 730) {
				this._config.maxWidth = 730
			}
		}
		this.isWinMax = false;
		this.IMG_PATH = e3.imgPath;
		this.overlay = null;
		var e = this;
		ea.load("infowindow", function() {
			e._draw()
		})
	}
	an.inherits(C.BaseClass, "InfoWindow");
	C.extend(an.prototype, {
		setWidth: function(e) {
			e = e * 1;
			if(!e && e !== 0 || isNaN(e) || e < 0) {
				return
			}
			if(e !== 0) {
				if(e < 220) {
					e = 220
				}
				if(e > 730) {
					e = 730
				}
			}
			this._config.width = e
		},
		setHeight: function(e) {
			e = e * 1;
			if(!e && e !== 0 || isNaN(e) || e < 0) {
				return
			}
			if(e !== 0) {
				if(e < 60) {
					e = 60
				}
				if(e > 650) {
					e = 650
				}
			}
			this._config.height = e
		},
		setMaxWidth: function(e) {
			e = e * 1;
			if(!e && e !== 0 || isNaN(e) || e < 0) {
				return
			}
			if(e !== 0) {
				if(e < 220) {
					e = 220
				}
				if(e > 730) {
					e = 730
				}
			}
			this._config.maxWidth = e
		},
		setTitle: function(e) {
			this._config.title = e || ""
		},
		setContent: function(e) {
			this.content = e || ""
		},
		getContent: function() {
			return this.content
		},
		setMaxContent: function(e) {
			this._config.maxContent = e || ""
		},
		redraw: function() {},
		enableAutoPan: function() {
			this._config.enableAutoPan = true
		},
		disableAutoPan: function() {
			this._config.enableAutoPan = false
		},
		enableCloseOnClick: function() {
			this._config.enableCloseOnClick = true
		},
		disableCloseOnClick: function() {
			this._config.enableCloseOnClick = false
		},
		enableMaximize: function() {
			this._config.enableMaximize = true
		},
		disableMaximize: function() {
			this._config.enableMaximize = false
		},
		show: function() {
			this._visible = true
		},
		hide: function() {
			this._visible = false
		},
		close: function() {
			this.hide()
		},
		dispose: function() {
			C.BaseClass.prototype.decontrol.call(this)
		},
		maximize: function() {
			this.isWinMax = true
		},
		restore: function() {
			this.isWinMax = false
		},
		setConfig: function(i) {
			if(!i) {
				return
			}
			for(var e in i) {
				if(typeof(this._config[e]) === typeof(i[e])) {
					this._config[e] = i[e]
				}
			}
		},
		isVisible: function() {
			return this.isOpen()
		},
		isOpen: function() {
			return false
		},
		getPointIn: function() {
			if(this.overlay && this.overlay.getPoint) {
				return this.overlay.getPoint()
			}
		},
		getTitle: function() {
			return this._config.title || ""
		},
		getPosition: function() {
			return this.latLng;
			var e = this.getPointIn();
			return en.convertMC2LL(e)
		},
		getPoint: function() {
			var e = this.getPointIn();
			return en.convertMC2LL(e)
		},
		getOffset: function() {
			return this._config.offset
		},
		dispose: function() {
			C.BaseClass.prototype.decontrol.call(this)
		},
		toString: function() {
			return "InfoWindow"
		}
	});
	c8.prototype.openInfoWindow = function(T, e) {
		T.latLng = new c4(e.lat, e.lng);
		var i = en.convertLL2MC(e);
		this.openInfoWindowIn(T, i)
	};
	c8.prototype.closeInfoWindow = function() {
		var e = this.temp.infoWin || this.temp._infoWin;
		if(e && e.overlay) {
			e.overlay.closeInfoWindow()
		}
	};
	c8.prototype.openInfoWindowIn = function(hQ, e) {
		if(!hQ || hQ.toString() !== "InfoWindow" || !e || e.toString() !== "Point") {
			return
		}
		var i = this.temp;
		if(!i.marker) {
			var T = new ha(e3.imgPath + "blank.gif", {
				width: 1,
				height: 1
			});
			i.marker = new dr(e, {
				icon: T,
				width: 1,
				height: 1,
				offset: new d9(0, 0),
				infoWindowOffset: new d9(0, 0),
				clickable: false
			});
			i.marker._fromMap = 1
		} else {
			i.marker.setPoint(e)
		}
		this.addOverlay(i.marker);
		i.marker.show();
		i.marker.openInfoWindow(hQ);		
	};
	cV.prototype.openInfoWindow = function(e) {
		if(this.map) {
			this.map.closeInfoWindow();
			e._visible = true;
			this.map.temp._infoWin = e;
			e.overlay = this;
			C.BaseClass.call(e, e.hashCode);
		}
	};
	cV.prototype.closeInfoWindow = function() {
		if(this.map && this.map.temp._infoWin) {
			this.map.temp._infoWin._visible = false;
			this.map.temp._infoWin.decontrol();
			this.map.temp._infoWin = null
		}
	};

	function aN(T, i) {
		cV.call(this);
		this.content = T;
		this.map = null;
		this.domElement = null;
		this._config = {
			width: 0,
			offset: new d9(0, 0),
			styles: {
				backgroundColor: "#fff",
				border: "1px solid #f00",
				padding: "1px",
				whiteSpace: "nowrap",
				fontSize: "12px",
				zIndex: "80",
				MozUserSelect: "none"
			},
			point: null,
			enableMassClear: true
		};
		i = i || {};
		this.setConfig(i);
		if(this._config.width < 0) {
			this._config.width = 0
		}
		this.point = this._config.point;
		var e = this;
		ea.load("marker", function() {
			e._draw()
		})
	}
	aN.inherits(cV, "Label");
	C.extend(aN.prototype, {
		setPoint: function(e) {
			if(e && e.toString() === "Point" && !this.getMarker()) {
				this.point = this._config.point = new hr(e.lng, e.lat)
			}
		},
		setContent: function(e) {
			this.content = e
		},
		getContent: function(e) {
			return this.content
		},
		setOpacity: function(e) {
			if(e >= 0 && e <= 1) {
				this._config.opacity = e
			}
		},
		setOffset: function(e) {
			if(!e || e.toString() !== "Size") {
				return
			}
			this._config.offset = new d9(e.width, e.height)
		},
		getOffset: function() {
			return this._config.offset
		},
		setStyle: function(e) {
			e = e || {};
			this._config.styles = C.extend(this._config.styles, e)
		},
		setStyles: function(e) {
			this.setStyle(e)
		},
		setTitle: function(e) {
			this._config.title = e || ""
		},
		getTitle: function() {
			return this._config.title
		},
		setMarker: function(e) {
			if(this._marker && this._marker !== e) {
				this._marker._config.label = null
			}
			this._marker = e;
			if(e) {
				this.point = this._config.point = e.getPoint()
			} else {
				this.point = this._config.point = null
			}
		},
		getMarker: function() {
			return this._marker || null
		},
		getPositionIn: function() {
			return this.getPoint()
		},
	});

	function fP(T, i) {
		var hQ = {};
		for(var e in i) {
			if(i.hasOwnProperty(e)) {
				if(e === "position") {
					hQ.point = en.convertLL2MC(i[e]);
					this.latLng = new c4(i[e]["lat"], i[e]["lng"])
				} else {
					hQ[e] = i[e]
				}
			}
		}
		aN.call(this, T, hQ)
	}
	fP.inherits(aN, "LabelOut");
	C.extend(fP.prototype, {
		toString: function() {
			return "Label"
		},
		setPosition: function(e) {
			this.latLng = new c4(e.lat, e.lng);
			var i = en.convertLL2MC(e);
			this.setPoint(i)
		},
		getPosition: function() {
			return this.latLng;
			var e = this.getPositionIn();
			return en.convertMC2LL(e)
		}
	});
	window.BMAP_ANIMATION_DROP = 1;
	window.BMAP_ANIMATION_BOUNCE = 2;

	function dr(e, i) {
		cV.call(this);
		i = i || {};
		this.point = e;
		this._rotation = 0;
		this.map = null;
		this._animation = null;
		this.domElement = null;
		this.iconDom = null;
		this.infoWindowDom = null;
		this.siblingElement = null;
		this.textureCoord = null;
		this.textureCoordGLMap = null;
		this.collisionDetectionFailed = false;
		this._config = {
			offset: new d9(0, 0),
			opacity: 1,
			icon: null,
			title: "",
			infoWindow: null,
			label: null,
			baseZIndex: 0,
			clickable: true,
			zIndexFixed: false,
			isTop: false,
			enableMassClear: true,
			enableDragging: false,
			raiseOnDrag: false,
			restrictDraggingArea: false,
			startAnimation: "",
			enableCollisionDetection: false,
			rank: 0,
			enableDraggingMap: false
		};
		this.setConfig(i);
		if(!i.icon) {
			this._config.icon = new ha(e3.imgPath + "marker_red.png", new d9(23, 25), {
				offset: new d9(10, 25),
				infoWindowOffset: new d9(10, 0)
			})
		}
		this._isDragging = false;
		var T = this;
		ea.load("marker", function() {
			T._draw()
		})
	}
	dr.TOP_ZINDEX = bl.getZIndex(-90) + 1000000;
	dr.DRAG_ZINDEX = dr.TOP_ZINDEX + 1000000;
	dr._injectMethond = function(e) {
		C.extend(dr.prototype, e)
	};
	dr.inherits(cV, "Marker");
	C.extend(dr.prototype, {
		toString: function() {
			return "Marker"
		},
		setIcon: function(e) {
			if(e) {
				this._config.icon = e;
				this.textureCoord = this.textureCoordGLMap = null
			}
		},
		getIcon: function() {
			return this._config.icon
		},
		setLabel: function(e) {
			if(!(e instanceof aN)) {
				return
			}
			this._config.label = e;
			e._config.enableMassClear = this._config.enableMassClear;
			e.setPoint(this.point)
		},
		getLabel: function() {
			return this._config.label
		},
		enableDragging: function() {
			this._config.enableDragging = true
		},
		disableDragging: function() {
			this._config.enableDragging = false
		},
		setPoint: function(e) {
			if(e) {
				this.point = this._config.point = new hr(e.lng, e.lat);
				this.latLng = en.convertMC2LL(e)
			}
		},
		setPositionIn: function(e) {
			this.setPoint(e)
		},
		getPositionIn: function() {
			return this.getPoint()
		},
		setTop: function(i, e) {
			this._config.isTop = !!i;
			if(i) {
				this._addi = e || 0
			}
		},
		setTitle: function(e) {
			this._config.title = e || ""
		},
		getTitle: function() {
			return this._config.title
		},
		setOffset: function(e) {
			if(e) {
				this._config.offset = e
			}
		},
		getOffset: function() {
			return this._config.offset
		},
		setAnimation: function(e) {
			this._animation = e
		},
		setRank: function(e) {
			this._config.rank = e
		},
		getRank: function() {
			return this._config.rank
		},
		setRotation: function(e) {
			while(e < 0) {
				e += 360
			}
			this._rotation = e % 360
		},
		getRotation: function() {
			return this._rotation
		}
	});

	function aC(e, T) {
		this.latLng = new c4(e.lat, e.lng);
		var i = en.convertLL2MC(e);
		dr.call(this, i, T)
	}
	aC.inherits(dr, "MarkerOut");
	C.extend(aC.prototype, {
		toString: function() {
			return "Marker"
		},
		setPosition: function(e) {
			this.latLng = new c4(e.lat, e.lng);
			var i = en.convertLL2MC(e);
			this.setPositionIn(i)
		},
		getPosition: function() {
			return this.latLng;
			var e = this.getPositionIn();
			return en.convertMC2LL(e)
		}
	});
	window.BMAP_SHAPE_CIRCLE = 1;
	window.BMAP_SHAPE_RECT = 2;

	function bd(i, e, T) {
		cV.call(this, e, T);
		this.domElement = null;
		this.point = i;
		T = T || {};
		this._config = {};
		this._config.height = e || 0;
		this._config.size = typeof T.size === "number" ? T.size : 50;
		this._config.fillOpacity = typeof T.fillOpacity === "number" ? T.fillOpacity : 0.8;
		this._config.shape = typeof T.shape === "number" ? T.shape : 1;
		fF(this._config.fillOpacity, 0, 1);
		if(T.fillColor === "") {
			this._config.fillColor = ""
		} else {
			this._config.fillColor = T.fillColor ? T.fillColor : "#f00"
		}
		this._config.icon = T.icon instanceof ha ? T.icon : "";
		var hQ = this;
		ea.load("marker", function() {
			hQ._draw()
		})
	}
	bd.inherits(cV, "Marker3D");
	C.extend(bd.prototype, {
		setPoint: function(e) {
			this.point = this._config.point = new hr(e.lng, e.lat);
			this.latLng = en.convertMC2LL(e);
			var i = new bb("onstatus_change");
			i.overlay = this;
			i.action = "setPoint";
			this.fire(i)
		},
		setPositionIn: function(e) {
			this.setPoint(e)
		},
		getPositionIn: function() {
			return this.getPoint()
		},
		setDomAttribute: function(i, T) {
			var e = new bb("onlineupdate");
			e.overlay = this;
			this.dispatchEvent(e)
		}
	});

	function cv(i, e, hQ) {
		this.latLng = new c4(i.lat, i.lng);
		var T = en.convertLL2MC(i);
		bd.call(this, T, e, hQ)
	}
	cv.inherits(bd, "Marker3d");
	C.extend(cv.prototype, {
		toString: function() {
			return "Marker3D"
		},
		setHeight: function(e) {
			this._config.height = Number(e);
			this.draw();
			var i = new bb("onlineupdate");
			i.overlay = this;
			this.dispatchEvent(i)
		},
		getHeight: function() {
			return this._config.height
		},
		setFillOpacity: function(e) {
			if(e > 1 || e < 0) {
				return
			}
			this._config.fillOpacity = e;
			this.setDomAttribute("fillopacity", e)
		},
		getFillOpacity: function() {
			return this._config.fillOpacity
		},
		setFillColor: function(e) {
			this._config.fillColor = e || "";
			this.setDomAttribute("fillcolor", e)
		},
		getFillColor: function() {
			return this._config.fillColor
		},
		setIcon: function(i) {
			if(!i || !this.map) {
				return
			}
			this._config.icon = i;
			if(this._config.icon) {
				var e = this._config.icon.getCurrentImageUrl();
				var hQ = i.getCurrentImageUrl() !== e;
				this._config.icon = i;
				this.textureCoord = this.textureCoordGLMap = null;
				this.draw();
				var T = new bb("onstatus_change");
				T.overlay = this;
				T.action = "setIcon";
				T.imageUrlChanged = hQ;
				this.fire(T)
			}
		},
		getIcon: function() {
			return this._config.icon
		},
		setPosition: function(e) {
			this.latLng = new c4(e.lat, e.lng);
			var i = en.convertLL2MC(e);
			this.setPositionIn(i)
		},
		getPosition: function() {
			var e = this.getPositionIn();
			return en.convertMC2LL(e)
		}
	});

	function a(T, e) {
		w.call(this, e);
		this._normalizedBounds = new dS();
		this.setPoints(T);
		var i = this;
		ea.load("poly", function() {
			i._draw()
		})
	}
	a.inherits(w, "Polyline");
	C.extend(a.prototype, {
		getBoundsIn: function(e) {
			if(!e) {
				this._bounds.setMinMax();
				return this._bounds
			}
			this._normalizedBounds.setMinMax();
			return this._normalizedBounds
		},
		setPoints: function(T) {
			this._clearCache();
			this.points = w.getGraphPoints(T).slice(0);
			if(this._config.geodesic === true) {
				this.greatCirclePoints.length = 0;
				for(var e = 0; e < this.points.length - 1; e++) {
					this.calcGreatCirclePoints(this.points[e], this.points[e + 1])
				}
			}
			this._calcBounds()
		},
		_calcBounds: function() {
			if(!this.points) {
				return
			}
			var e = this;
			e._bounds.setNorthEast(null);
			e._bounds.setSouthWest(null);
			if(e.greatCirclePoints && e.greatCirclePoints.length > 0) {
				C.each(e.greatCirclePoints, function(i) {
					e._bounds.extend(i)
				})
			} else {
				C.each(e.points, function(i) {
					e._bounds.extend(i)
				})
			}
			e._normalizedBounds.setSouthWest(e._bounds.getSouthWest());
			e._normalizedBounds.setNorthEast(e._bounds.getNorthEast());
			if(e._normalizedBounds.sw.lng < -c8.WORLD_SIZE_MC_HALF || e._normalizedBounds.ne.lng > c8.WORLD_SIZE_MC_HALF) {
				e._normalizedBounds.sw.lng = -c8.WORLD_SIZE_MC_HALF;
				e._normalizedBounds.ne.lng = c8.WORLD_SIZE_MC_HALF
			}
		},
		calcGreatCirclePoints: function(hQ, T) {
			var hS = hQ.latLng;
			var hR = T.latLng;
			if(hS.equals(hR)) {
				return
			}
			var e = en.getDistance(dK(hS.lng), dK(hS.lat), dK(hR.lng), dK(hR.lat));
			if(e < 250000) {
				return
			}
			var hW = Math.round(e / 150000);
			var h0 = this.calcAngularDistance(hS, hR);
			this.greatCirclePoints.push(hQ);
			var hZ = hS.lng;
			var hY = hQ;
			for(var hT = 0; hT < hW; hT++) {
				var hV = this.calcMiddlePoint(hS, hR, hT / hW, h0);
				var hX = en.convertLL2MC(hV);
				var hU = hX.lng;
				var h1 = bP(hX, hY);
				if(h1 > 30037726) {
					if(hX.lng < hY.lng) {
						hX.lng += c8.WORLD_SIZE_MC
					} else {
						hX.lng -= c8.WORLD_SIZE_MC
					}
				}
				this.greatCirclePoints.push(hX);
				hY = hX
			}
			var h1 = bP(T, hY);
			if(h1 > 30037726) {
				if(T.lng < hY.lng) {
					T.lng += c8.WORLD_SIZE_MC
				} else {
					T.lng -= c8.WORLD_SIZE_MC
				}
			}
			this.greatCirclePoints.push(T)
		},
		calcMiddlePoint: function(hX, hW, hY, h2) {
			var hR = hX.lat;
			var hQ = hW.lat;
			var h1 = hX.lng;
			var hZ = hW.lng;
			var h3 = dK(hR);
			var h0 = dK(hQ);
			var i = dK(h1);
			var e = dK(hZ);
			var h5 = Math.sin((1 - hY) * h2) / Math.sin(h2);
			var h4 = Math.sin(hY * h2) / Math.sin(h2);
			var hU = h5 * Math.cos(h3) * Math.cos(i) + h4 * Math.cos(h0) * Math.cos(e);
			var hT = h5 * Math.cos(h3) * Math.sin(i) + h4 * Math.cos(h0) * Math.sin(e);
			var hS = h5 * Math.sin(h3) + h4 * Math.sin(h0);
			var T = Math.atan2(hS, Math.sqrt(Math.pow(hU, 2) + Math.pow(hT, 2)));
			var hV = Math.atan2(hT, hU);
			return new hr(de(hV), de(T))
		},
		calcAngularDistance: function(hR, i) {
			var hS = dK(hR.lat);
			var hQ = dK(i.lat);
			var T = dK(hR.lng);
			var e = dK(i.lng);
			return Math.acos(Math.sin(hS) * Math.sin(hQ) + Math.cos(hS) * Math.cos(hQ) * Math.cos(Math.abs(e - T)))
		}
	});

	function ak(hR, e) {
		if(!hR || hR.length === 0) {
			return
		}
		var hQ = [];
		for(var T = 0; T < hR.length; T++) {
			hQ[T] = en.convertLL2MC(hR[T])
		}
		a.call(this, hQ, e)
	}
	ak.inherits(a, "PolylineOut");
	C.extend(ak.prototype, {
		toString: function() {
			return "Polyline"
		},
		setPath: function(hQ) {
			if(!hQ || hQ.length === 0) {
				return
			}
			var T = [];
			for(var e = 0; e < hQ.length; e++) {
				T[e] = en.convertLL2MC(hQ[e])
			}
			this.setPathIn(T)
		},
		getPath: function() {
			var e = this.getPathIn();
			if(!e || e.length === 0) {
				return []
			}
			var hQ = [];
			for(var T = 0; T < e.length; T++) {
				hQ[T] = en.convertMC2LL(e[T])
			}
			return hQ
		},
		getBounds: function(i) {
			var e = this.getBoundsIn(i);
			var T = new dS(en.convertMC2LL(e.getSouthWest()), en.convertMC2LL(e.getNorthEast()));
			return T
		}
	});

	function ep(T, hQ, e) {
		w.call(this, e);
		this._normalizedBounds = new dS();
		this._cps = hQ;
		this._path = T;
		this.setPoints(T);
		var i = this;
		ea.load("poly", function() {
			i._draw()
		})
	}
	ep.inherits(a, "BezierCurve");
	C.extend(ep.prototype, {
		getBoundsIn: function(e) {
			if(!e) {
				this._bounds.setMinMax();
				return this._bounds
			}
			this._normalizedBounds.setMinMax();
			return this._normalizedBounds
		},
		setPoints: function(e) {
			this._clearCache();
			this.points = w.getGraphPoints(e).slice(0);
			this.points = this.calcBezierPoints(this.points, this._cps);
			this._calcBounds()
		},
		_calcBounds: function() {
			if(!this.points) {
				return
			}
			var e = this;
			e._bounds.setNorthEast(null);
			e._bounds.setSouthWest(null);
			if(e.greatCirclePoints && e.greatCirclePoints.length > 0) {
				C.each(e.greatCirclePoints, function(i) {
					e._bounds.extend(i)
				})
			} else {
				C.each(e.points, function(i) {
					e._bounds.extend(i)
				})
			}
			e._normalizedBounds.setSouthWest(e._bounds.getSouthWest());
			e._normalizedBounds.setNorthEast(e._bounds.getNorthEast());
			if(e._normalizedBounds.sw.lng < -c8.WORLD_SIZE_MC_HALF || e._normalizedBounds.ne.lng > c8.WORLD_SIZE_MC_HALF) {
				e._normalizedBounds.sw.lng = -c8.WORLD_SIZE_MC_HALF;
				e._normalizedBounds.ne.lng = c8.WORLD_SIZE_MC_HALF
			}
		},
		getPathIn: function() {
			return this._path
		},
		setPathIn: function(e) {
			this._path = e;
			this.setPoints(e)
		},
		getCpsIn: function() {
			return this._cps
		},
		setCpsIn: function(e) {
			this._cps = e;
			this.setPoints(this._path)
		},
		calcBezierPoints: function(hQ, hS) {
			var T = [];
			for(var e = 0; e < hQ.length - 1; e++) {
				var hR = [hQ[e], hS[e][0], hS[e][1], hQ[e + 1]];
				T = T.concat((this.bezierbetweenTwoP(hR)))
			}
			return T
		},
		bezierbetweenTwoP: function(hS) {
			var T = 100;
			var hR = 1 / T;
			var e = [];
			for(var hQ = 0; hQ < T; hQ++) {
				e.push(this.getPointOnCubicBezier(hS, hQ * hR))
			}
			return e
		},
		getPointOnCubicBezier: function(hT, hX) {
			var i;
			var hS;
			var hQ;
			var hY;
			var hR;
			var T;
			var hW;
			var e;
			var hV;
			var hU;
			hQ = 3 * (hT[1].lng - hT[0].lng);
			hS = 3 * (hT[2].lng - hT[1].lng) - hQ;
			i = hT[3].lng - hT[0].lng - hQ - hS;
			T = 3 * (hT[1].lat - hT[0].lat);
			hR = 3 * (hT[2].lat - hT[1].lat) - T;
			hY = hT[3].lat - hT[0].lat - T - hR;
			hW = hX * hX;
			e = hW * hX;
			hV = (i * e) + (hS * hW) + (hQ * hX) + hT[0].lng;
			hU = (hY * e) + (hR * hW) + (T * hX) + hT[0].lat;
			return new hr(hV, hU)
		}
	});

	function fn(hR, hT, e) {
		if(!hR || hR.length === 0) {
			return
		}
		this.userPath = hR;
		this.userCps = hT;
		var hQ = [];
		for(var T = 0; T < hR.length; T++) {
			hQ[T] = en.convertLL2MC(hR[T])
		}
		if(!hT || hT.length === 0) {
			return
		}
		var hS = [];
		for(var T = 0; T < hT.length; T++) {
			hS[T] = [];
			hS[T][0] = en.convertLL2MC(hT[T][0]);
			if(hT[T][1]) {
				hS[T][1] = en.convertLL2MC(hT[T][1])
			} else {
				hS[T][1] = en.convertLL2MC(hT[T][0])
			}
		}
		ep.call(this, hQ, hS, e)
	}
	fn.inherits(ep, "BezierCurveOut");
	C.extend(fn.prototype, {
		toString: function() {
			return "BezierCurve"
		},
		setPath: function(hQ) {
			if(!hQ || hQ.length === 0) {
				return
			}
			this.userPath = hQ;
			var T = [];
			for(var e = 0; e < hQ.length; e++) {
				T[e] = en.convertLL2MC(hQ[e])
			}
			this.setPathIn(T)
		},
		getPath: function() {
			return this.userPath;
			var e = this.getPathIn();
			if(!e || e.length === 0) {
				return []
			}
			var hQ = [];
			for(var T = 0; T < e.length; T++) {
				hQ[T] = en.convertMC2LL(e[T])
			}
			return hQ
		},
		getControlPoints: function() {
			return this.userCps;
			var e = this.getCpsIn();
			if(!e || e.length === 0) {
				return []
			}
			var hQ = [];
			for(var T = 0; T < e.length; T++) {
				hQ[T] = [];
				hQ[T][0] = en.convertMC2LL(e[T][0]);
				hQ[T][1] = en.convertMC2LL(e[T][1])
			}
			return hQ
		},
		setControlPoints: function(hQ) {
			if(!hQ || hQ.length === 0) {
				return
			}
			this.userCps = hQ;
			var T = [];
			for(var e = 0; e < hQ.length; e++) {
				T[e] = [];
				T[e][0] = en.convertLL2MC(hQ[e][0]);
				if(hQ[e][1]) {
					T[e][1] = en.convertLL2MC(hQ[e][1])
				} else {
					T[e][1] = en.convertLL2MC(hQ[e][0])
				}
			}
			this.setCpsIn(T)
		},
		getBounds: function(i) {
			var e = this.getBoundsIn(i);
			var T = new dS(en.convertMC2LL(e.getSouthWest()), en.convertMC2LL(e.getNorthEast()));
			return T
		}
	});

	function fl(e, T) {
		w.call(this, T);
		this._normalizedBounds = new dS();
		this.setPoints(e);
		var i = this;
		ea.load("poly", function() {
			i._draw()
		})
	}
	fl.inherits(a, "PolylineMultipart");
	C.extend(fl.prototype, {
		setPoints: function(e) {
			if(!e) {
				return
			}
			this._clearCache();
			this.points = this._unifyArgs(e);
			this._calcBounds()
		},
		_unifyArgs: function(T) {
			var e = [];
			var i = [];
			if(T.constructor === Array) {
				if(T[0].constructor === hr) {
					i.push(T)
				} else {
					i = T
				}
			} else {
				if(typeof T === "string") {
					i.push(T)
				}
			}
			C.each(i, function(hQ) {
				e.push(w.getGraphPoints(hQ))
			});
			return e
		},
		setPointAt: function(i, e, T) {
			T = T || 0;
			if(!e || !this.points[T] || !this.points[T][i]) {
				return
			}
			this._clearCache();
			this.points[T][i] = new hr(e.lng, e.lat);
			this._calcBounds()
		},
		getBoundsIn: function(e) {
			if(!e) {
				this._bounds.setMinMax();
				return this._bounds
			}
			this._normalizedBounds.setMinMax();
			return this._normalizedBounds
		},
		_calcBounds: function() {
			if(!this.points) {
				return
			}
			var e = this;
			e._bounds.setNorthEast(null);
			e._bounds.setSouthWest(null);
			if(e.greatCirclePoints && e.greatCirclePoints.length > 0) {
				C.each(e.greatCirclePoints, function(i) {
					e._bounds.extend(i)
				})
			} else {
				C.each(e.points, function(i) {
					C.each(i, function(T) {
						e._bounds.extend(T)
					})
				})
			}
			e._normalizedBounds.setSouthWest(e._bounds.getSouthWest());
			e._normalizedBounds.setNorthEast(e._bounds.getNorthEast());
			if(e._normalizedBounds.sw.lng < -c8.WORLD_SIZE_MC_HALF || e._normalizedBounds.ne.lng > c8.WORLD_SIZE_MC_HALF) {
				e._normalizedBounds.sw.lng = -c8.WORLD_SIZE_MC_HALF;
				e._normalizedBounds.ne.lng = c8.WORLD_SIZE_MC_HALF
			}
		}
	});

	function aR(T, e) {
		w.call(this, e);
		e = e || {};
		if(typeof e.fillOpacity === "number") {
			this._config.fillOpacity = e.fillOpacity
		} else {
			this._config.fillOpacity = 0.6
		}
		fF(this._config.fillOpacity, 0, 1);
		if(e.fillColor === "") {
			this._config.fillColor = ""
		} else {
			this._config.fillColor = e.fillColor ? e.fillColor : "#fff"
		}
		this._parseFillCacheWebGL = [];
		this.setPoints(T, e);
		var i = this;
		ea.load("poly", function() {
			i._draw()
		})
	}
	aR.inherits(w, "Polygon");
	C.extend(aR.prototype, {
		setPoints: function(hS) {
			var hQ = [];
			if(typeof hS === "string" || hS[0] instanceof hr || hS[0] instanceof c4 || this instanceof f7 || hS.length === 0) {
				var e = this._processSinglePointArray(hS);
				this._userPoints = e.userPoints;
				hQ = e.innerPoints;
				this.hasMultipleParts = false
			} else {
				this._userPoints = [];
				for(var hR = 0; hR < hS.length; hR++) {
					var T = this._processSinglePointArray(hS[hR]);
					this._userPoints.push(T.userPoints);
					hQ.push(T.innerPoints)
				}
				this.hasMultipleParts = true
			}
			w.prototype.setPoints.call(this, hQ)
		},
		setPathIn: function(e) {
			this.setPoints(e)
		},
		_processSinglePointArray: function(e) {
			var i = w.getGraphPoints(e).slice(0);
			innerPoints = i.slice(0);
			if(innerPoints.length > 1 && !innerPoints[0].equals(innerPoints[innerPoints.length - 1])) {
				innerPoints.push(new hr(innerPoints[0].lng, innerPoints[0].lat))
			}
			return {
				userPoints: i,
				innerPoints: innerPoints
			}
		},
		setPointAt: function(i, e) {
			if(!this._userPoints[i]) {
				return
			}
			this._clearCache();
			this._userPoints[i] = new hr(e.lng, e.lat);
			this.points[i] = new hr(e.lng, e.lat);
			if(i === 0 && !this.points[0].equals(this.points[this.points.length - 1])) {
				this.points[this.points.length - 1] = new hr(e.lng, e.lat)
			}
			this._calcBounds()
		},
		setPositionAt: function(i, e) {
			if(!this._userPoints[i]) {
				return
			}
			var T = en.convertLL2MC(e);
			this.setPointAt(i, T)
		},
		getPoints: function() {
			var e = this._userPoints;
			if(e.length === 0) {
				e = this.points
			}
			return e
		},
		getPathIn: function() {
			return this.getPoints()
		}
	});

	function g3(hV, hS) {
		if(!hV || hV.length === 0) {
			return
		}
		var hU = [];
		if(typeof hV === "string" || hV[0] instanceof hr || hV[0] instanceof c4) {
			var e = this._processSinglePointArray(hV);
			for(var hT = 0; hT < e.innerPoints.length; hT++) {
				hU[hT] = en.convertLL2MC(e.innerPoints[hT])
			}
		} else {
			for(var hT = 0; hT < hV.length; hT++) {
				var T = this._processSinglePointArray(hV[hT]);
				var hR = [];
				for(var hQ = 0; hQ < T.innerPoints.length; hQ++) {
					hR[hQ] = en.convertLL2MC(T.innerPoints[hQ])
				}
				hU.push(hR)
			}
		}
		aR.call(this, hU, hS)
	}
	g3.inherits(aR, "PolygonOut");
	C.extend(g3.prototype, {
		toString: function() {
			return "Polygon"
		},
		setPath: function(hQ) {
			if(!hQ || hQ.length === 0) {
				return
			}
			hQ = w.getGraphPoints(hQ);
			var T = [];
			for(var e = 0; e < hQ.length; e++) {
				T[e] = en.convertLL2MC(hQ[e])
			}
			this.setPathIn(T)
		},
		getPath: function() {
			var e = this.getPathIn();
			if(!e || e.length === 0) {
				return []
			}
			var hQ = [];
			for(var T = 0; T < e.length; T++) {
				hQ[T] = en.convertMC2LL(e[T])
			}
			return hQ
		}
	});

	function f7(i, e, T) {
		this.point = i;
		this.radius = Math.abs(e);
		aR.call(this, [], T)
	}
	f7.parseTolerance = {
		0: [0.01, 0.0001, 0.00001, 0.000004],
		1: [1000, 10, 1, 0.4]
	};
	f7.inherits(aR, "Circle");
	C.extend(f7.prototype, {
		initialize: function(e) {
			this.map = e;
			this.points = this._getPerimeterPoints(this.point, this.radius);
			this._calcBounds();
			return null
		},
		getPoint: function() {
			return this.point
		},
		setPoint: function(e) {
			if(!e) {
				return
			}
			this.point = e;
			this.latLng = en.convertMC2LL(e)
		},
		setCenterIn: function(e) {
			var i = arguments[1];
			this.setPoint(e, i)
		},
		setRadius: function(e) {
			this.radius = Math.abs(e)
		},
		getCenterIn: function() {
			return this.point
		},
		getRadius: function() {
			return this.radius
		},
		_getPerimeterPoints: function(e, hX) {
			if(!e || !hX || !this.map) {
				return []
			}
			var T = this.map;
			var hU = e.lng;
			var hS = e.lat;
			var h3 = en.convertMC2LL(e);
			hU = h3.lng;
			hS = h3.lat;
			var h4 = [];
			var hZ = hX / en.EARTHRADIUS;
			var hW = (Math.PI / 180) * hS;
			var h2 = (Math.PI / 180) * hU;
			for(var hV = 0; hV < 360; hV += 9) {
				var hT = (Math.PI / 180) * hV;
				var h0 = Math.asin(Math.sin(hW) * Math.cos(hZ) + Math.cos(hW) * Math.sin(hZ) * Math.cos(hT));
				var hY = Math.atan2(Math.sin(hT) * Math.sin(hZ) * Math.cos(hW), Math.cos(hZ) - Math.sin(hW) * Math.sin(h0));
				var h1 = ((h2 - hY + Math.PI) % (2 * Math.PI)) - Math.PI;
				var hR = new c4(h0 * (180 / Math.PI), h1 * (180 / Math.PI));
				h4.push(en.convertLL2MC(hR))
			}
			var hQ = h4[0];
			h4.push(new hr(hQ.lng, hQ.lat));
			if(hQ) {
				this._radiusMercator = Math.sqrt(Math.pow(hQ.lng - this.point.lng, 2) + Math.pow(hQ.lat - this.point.lat, 2))
			} else {
				this._radiusMercator = this.radius
			}
			return h4
		}
	});

	function dF(i, e, hQ) {
		this.latLng = new c4(i.lat, i.lng);
		var T = en.convertLL2MC(i);
		f7.call(this, T, e, hQ)
	}
	dF.inherits(f7, "CircleOut");
	C.extend(dF.prototype, {
		toString: function() {
			return "Circle"
		},
		setCenter: function(e) {
			this.latLng = new c4(e.lat, e.lng);
			var i = en.convertLL2MC(e);
			this.setCenterIn(i)
		},
		getCenter: function() {
			return this.latLng
		},
		getPath: function() {
			var e = this.getPathIn();
			if(!e || e.length === 0) {
				return []
			}
			var hQ = [];
			for(var T = 0; T < e.length; T++) {
				hQ[T] = en.convertMC2LL(e[T])
			}
			return hQ
		}
	});

	function bs(hQ, e, i) {
		w.call(this, i);
		i = i || {};
		if(typeof i.topFillOpacity === "number") {
			this._config.topFillOpacity = i.topFillOpacity
		} else {
			this._config.topFillOpacity = 0.6
		}
		if(typeof i.sideFillOpacity === "number") {
			this._config.sideFillOpacity = i.sideFillOpacity
		} else {
			this._config.sideFillOpacity = 0.8
		}
		fF(this._config.sideFillOpacity, 0, 1);
		if(i.topFillColor === "") {
			this._config.topFillColor = ""
		} else {
			this._config.topFillColor = i.topFillColor ? i.topFillColor : "#fff"
		}
		if(i.sideFillColor === "") {
			this._config.sideFillColor = ""
		} else {
			this._config.sideFillColor = i.sideFillColor ? i.sideFillColor : "#fff"
		}
		this._parseFillCacheWebGL = [];
		this.setPoints(hQ, i);
		this._config.altitude = e || 0;
		var T = this;
		ea.load("poly", function() {
			T._draw()
		})
	}
	bs.inherits(w, "Prism");
	C.extend(bs.prototype, {
		setPoints: function(hS) {
			var hQ = [];
			if(typeof hS === "string" || hS[0] instanceof hr || hS[0] instanceof c4 || this instanceof f7 || hS.length === 0) {
				var e = this._processSinglePointArray(hS);
				this._userPoints = e.userPoints;
				hQ = e.innerPoints;
				this.hasMultipleParts = false
			} else {
				this._userPoints = [];
				for(var hR = 0; hR < hS.length; hR++) {
					var T = this._processSinglePointArray(hS[hR]);
					this._userPoints.push(T.userPoints);
					hQ.push(T.innerPoints)
				}
				this.hasMultipleParts = true
			}
			w.prototype.setPoints.call(this, hQ)
		},
		setPathIn: function(e) {
			this.setPoints(e)
		},
		_processSinglePointArray: function(e) {
			var i = w.getGraphPoints(e).slice(0);
			innerPoints = i.slice(0);
			if(innerPoints.length > 1 && !innerPoints[0].equals(innerPoints[innerPoints.length - 1])) {
				innerPoints.push(new hr(innerPoints[0].lng, innerPoints[0].lat))
			}
			return {
				userPoints: i,
				innerPoints: innerPoints
			}
		},
		setPointAt: function(i, e) {
			if(!this._userPoints[i]) {
				return
			}
			this._clearCache();
			this._userPoints[i] = new hr(e.lng, e.lat);
			this.points[i] = new hr(e.lng, e.lat);
			if(i === 0 && !this.points[0].equals(this.points[this.points.length - 1])) {
				this.points[this.points.length - 1] = new hr(e.lng, e.lat)
			}
			this._calcBounds()
		},
		getPoints: function() {
			var e = this._userPoints;
			if(e.length === 0) {
				e = this.points
			}
			return e
		},
		getPathIn: function() {
			return this.getPoints()
		},
		setTopFillOpacity: function(e) {
			if(e > 1 || e < 0) {
				return
			}
			this._config.topFillOpacity = e;
			this._setDomAttribute("topfillopacity", e)
		},
		getTopFillOpacity: function() {
			return this._config.topFillOpacity
		},
		setSideFillOpacity: function(e) {
			if(e > 1 || e < 0) {
				return
			}
			this._config.sideFillOpacity = e;
			this._setDomAttribute("sidefillopacity", e)
		},
		getSideFillOpacity: function() {
			return this._config.sideFillOpacity
		},
		setTopFillColor: function(e) {
			this._config.topFillColor = e || "";
			this._setDomAttribute("topfillcolor", e)
		},
		getTopFillColor: function() {
			return this._config.topFillColor
		},
		setSideFillColor: function(e) {
			this._config.sideFillColor = e || "";
			this._setDomAttribute("sidefillcolor", e)
		},
		getSideFillColor: function() {
			return this._config.sideFillColor
		},
		setAltitude: function(e) {
			this._config.altitude = Number(e);
			this.draw();
			var i = new bb("onlineupdate");
			i.overlay = this;
			this.dispatchEvent(i)
		},
		getAltitude: function() {
			return this._config.altitude
		}
	});

	function cg(hU, hS, hV) {
		if(!hU || hU.length === 0) {
			return
		}
		this.userPath = hU;
		var e = [];
		if(typeof hU === "string" || hU[0] instanceof hr || hU[0] instanceof c4) {
			var hW = this._processSinglePointArray(hU);
			for(var hR = 0; hR < hW.innerPoints.length; hR++) {
				e[hR] = en.convertLL2MC(hW.innerPoints[hR])
			}
		} else {
			for(var hR = 0; hR < hU.length; hR++) {
				var hT = this._processSinglePointArray(hU[hR]);
				var T = [];
				for(var hQ = 0; hQ < hT.innerPoints.length; hQ++) {
					T[hQ] = en.convertLL2MC(hT.innerPoints[hQ])
				}
				e.push(T)
			}
		}
		bs.call(this, e, hS, hV)
	}
	cg.inherits(bs, "PrismOut");
	C.extend(cg.prototype, {
		toString: function() {
			return "Prism"
		},
		setPath: function(hQ) {
			if(!hQ || hQ.length === 0) {
				return
			}
			this.userPath = hQ;
			var T = [];
			for(var e = 0; e < hQ.length; e++) {
				T[e] = en.convertLL2MC(hQ[e])
			}
			this.setPathIn(T)
		},
		getPath: function() {
			return this.userPath;
			var e = this.getPathIn();
			if(!e || e.length === 0) {
				return []
			}
			var hQ = [];
			for(var T = 0; T < e.length; T++) {
				hQ[T] = en.convertMC2LL(e[T])
			}
			return hQ
		}
	});

	function dW(T, e) {
		w.call(this, e);
		e = e || {};
		this._config.type = e.type || "image";
		this._config.url = e.url || "";
		this._config.opacity = typeof e.opacity === "number" ? e.opacity : 1;
		fF(this._config.opacity, 0, 1);
		this._parseFillCacheWebGL = [];
		this.setPoints(T, e);
		var i = this;
		ea.load("poly", function() {
			i._draw()
		})
	}
	dW.inherits(w, "GroundOverlay");
	C.extend(dW.prototype, {
		setPoints: function(i) {
			var e = w.getGraphPoints(i).slice(0);
			this.hasMultipleParts = false;
			w.prototype.setPoints.call(this, e)
		},
		setPathIn: function(e) {
			this.setPoints(e)
		},
		getPoints: function() {
			return this.points
		},
		getPathIn: function() {
			return this.getPoints()
		}
	});

	function cp(hR, T) {
		if(!hR) {
			return
		}
		var hT = [new hr(hR.sw.lng, hR.ne.lat), new hr(hR.ne.lng, hR.ne.lat), new hr(hR.ne.lng, hR.sw.lat), new hr(hR.sw.lng, hR.sw.lat)];
		var e = w.getGraphPoints(hT).slice(0);
		var hS = [];
		for(var hQ = 0; hQ < e.length; hQ++) {
			hS[hQ] = en.convertLL2MC(e[hQ])
		}
		dW.call(this, hS, T)
	}
	cp.inherits(dW, "GroundOverlayOut");
	C.extend(cp.prototype, {
		toString: function() {
			return "GroundOverlay"
		}
	});
	var bB = {};

	function hG(T, i) {
		C.BaseClass.call(this);
		this.content = T;
		this.map = null;
		this._config = {
			width: 0,
			height: 0,
			maxWidth: 600,
			offset: new d9(0, 0),
			title: "",
			maxContent: "",
			enableMaximize: false,
			enableAutoPan: true,
			enableCloseOnClick: true,
			margin: [10, 10, 40, 10],
			collisions: [
				[10, 10],
				[10, 10],
				[10, 10],
				[10, 10]
			],
			ifMaxScene: false,
			onClosing: function() {
				return true
			}
		};
		this.setConfig(i);
		if(this._config.width < 50) {
			this._config.width = 50
		}
		if(this._config.width > 730) {
			this._config.width = 730
		}
		if(this._config.height != 0) {
			if(this._config.height < 50) {
				this._config.height = 50
			}
			if(this._config.height > 650) {
				this._config.height = 650
			}
		}
		if(this._config.maxWidth !== 0) {
			if(this._config.maxWidth < 50) {
				this._config.maxWidth = 50
			}
			if(this._config.maxWidth > 730) {
				this._config.maxWidth = 730
			}
		}
		this.isWinMax = false;
		this.IMG_PATH = e3.imgPath;
		this.overlay = null;
		var e = this;
		ea.load("simpleInfowindow", function() {
			e._draw()
		})
	}
	hG.inherits(C.BaseClass, "SimpleInfoWindow");
	C.extend(hG.prototype, {
		setWidth: function(e) {
			e = e * 1;
			if(!e && e != 0 || isNaN(e) || e < 0) {
				return
			}
			if(e != 0) {
				if(e < 50) {
					e = 50
				}
				if(e > 730) {
					e = 730
				}
			}
			this._config.width = e
		},
		setHeight: function(e) {
			e = e * 1;
			e -= 10;
			if(!e && e != 0 || isNaN(e) || e < 0) {
				return
			}
			if(e != 0) {
				if(e < 50) {
					e = 50
				}
				if(e > 650) {
					e = 650
				}
			}
			this._config.height = e
		},
		setMaxWidth: function(e) {
			e = e * 1;
			if(!e && e != 0 || isNaN(e) || e < 0) {
				return
			}
			if(e != 0) {
				if(e < 50) {
					e = 50
				}
				if(e > 730) {
					e = 730
				}
			}
			this._config.maxWidth = e
		},
		setTitle: function(e) {
			this._config.title = e || ""
		},
		setContent: function(e) {
			this.content = e || ""
		},
		setMaxContent: function(e) {
			this._config.maxContent = e || ""
		},
		redraw: function() {},
		enableAutoPan: function() {
			this._config.enableAutoPan = true
		},
		disableAutoPan: function() {
			this._config.enableAutoPan = false
		},
		enableCloseOnClick: function() {
			this._config.enableCloseOnClick = true
		},
		disableCloseOnClick: function() {
			this._config.enableCloseOnClick = false
		},
		enableMaximize: function() {
			this._config.enableMaximize = true
		},
		disableMaximize: function() {
			this._config.enableMaximize = false
		},
		show: function() {
			this._visible = true
		},
		hide: function() {
			this._visible = false
		},
		close: function() {
			this.hide()
		},
		dispose: function() {
			C.BaseClass.prototype.decontrol.call(this)
		},
		maximize: function() {
			this.isWinMax = true
		},
		restore: function() {
			this.isWinMax = false
		},
		setConfig: function(i) {
			if(!i) {
				return
			}
			for(var e in i) {
				if(typeof(this._config[e]) == typeof(i[e])) {
					this._config[e] = i[e]
				}
			}
		},
		isVisible: function() {
			return this.isOpen()
		},
		isOpen: function() {
			return false
		},
		getPoint: function() {
			if(this.overlay && this.overlay.getPoint) {
				return this.overlay.getPoint()
			}
		},
		getOffset: function() {
			return this._config.offset
		},
		dispose: function() {
			C.BaseClass.prototype.decontrol.call(this)
		},
		toString: function() {
			return "SimpleInfoWindow"
		}
	});
	c8.prototype.openSimpleInfoWindow = function(hQ, e) {
		if(!hQ || hQ.toString() != "SimpleInfoWindow" || !e || e.toString() != "Point") {
			return
		}
		var i = this.temp;
		if(!i.marker) {
			var T = new ha(e3.imgPath + "blank.gif", {
				width: 1,
				height: 1
			});
			i.marker = new dr(e, {
				icon: T,
				width: 1,
				height: 1,
				offset: new d9(0, 0),
				infoWindowOffset: new d9(0, 0),
				clickable: false
			});
			i.marker._fromMap = 1
		} else {
			i.marker.setPoint(e)
		}
		this.addOverlay(i.marker);
		i.marker.show();
		i.marker.openSimpleInfoWindow(hQ)
	};
	c8.prototype.closeSimpleInfoWindow = function() {
		var e = this.temp.infoWin || this.temp._infoWin;
		if(e && e.overlay) {
			e.overlay.closeSimpleInfoWindow()
		}
	};
	cV.prototype.openSimpleInfoWindow = function(e) {
		if(this.map) {
			this.map.closeSimpleInfoWindow();
			e._visible = true;
			this.map.temp._infoWin = e;
			e.overlay = this;
			C.BaseClass.call(e, e.hashCode)
		}
	};
	cV.prototype.closeSimpleInfoWindow = function() {
		if(this.map && this.map.temp._infoWin) {
			this.map.temp._infoWin._visible = false;
			this.map.temp._infoWin.decontrol();
			this.map.temp._infoWin = null
		}
	};

	function ej(e, i) {
		e = isNaN(e) ? 0 : e;
		i = isNaN(i) ? 0 : i;
		this.x = e;
		this.y = i
	}
	ej.prototype.equals = function(e) {
		if(!e) {
			return false
		}
		return e.x === this.x && e.y === this.y
	};
	ej.prototype.clone = function() {
		return new ej(this.x, this.y)
	};
	ej.prototype.toString = function() {
		return "Pixel"
	};

	function d9(i, e) {
		if(typeof i !== "number") {
			this.width = parseFloat(i)
		} else {
			this.width = i
		}
		if(typeof e !== "number") {
			this.height = parseFloat(e)
		} else {
			this.height = e
		}
	}
	d9.prototype.equals = function(e) {
		return !!(e && this.width === e.width && this.height === e.height)
	};
	d9.prototype.toString = function() {
		return "Size"
	};
	var bH = {
		B_NORMAL_MAP: {
			tileUrls: er(e3.tileDomain, e3.rasterTilePath),
			vectorTileUrls: er(e3.tileDomain, e3.vectorTilePath),
			tileSize: 256,
			baseUnits: 256,
			zoomLevelMin: 3,
			zoomLevelMax: 19,
			minDataZoom: 3,
			maxDataZoom: 19,
			minZoom: 3,
			maxZoom: 19,
			webgl: {
				minZoom: 3,
				maxZoom: 25
			},
			zoomLevelBase: 18,
			errorUrl: e3.imgPath + "bg.png",
			bounds: new dS(new hr(-21364736, -11708041.66), new hr(23855104, 12474104.17)),
			imgExtend: "png"
		},
		B_SATELLITE_MAP: {
			tileUrls: [window.location.protocol + "//maponline0.bdimg.com/starpic/?qt=satepc&", window.location.protocol + "//maponline1.bdimg.com/starpic/?qt=satepc&", window.location.protocol + "//maponline2.bdimg.com/starpic/?qt=satepc&", window.location.protocol + "//maponline3.bdimg.com/starpic/?qt=satepc&"],
			tileSize: 256,
			baseUnits: 256,
			zoomLevelMin: 3,
			zoomLevelMax: 19,
			minDataZoom: 3,
			maxDataZoom: 19,
			minZoom: 3,
			maxZoom: 19,
			zoomLevelBase: 18,
			errorUrl: e3.imgPath + "bg.png",
			bounds: new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712)),
			imgExtend: "png"
		},
		B_STREET_MAP: {
			tileUrls: er(e3.tileDomain, e3.rasterTilePath),
			tileSize: 256,
			baseUnits: 256,
			zoomLevelMin: 3,
			zoomLevelMax: 19,
			minDataZoom: 3,
			maxDataZoom: 19,
			minZoom: 3,
			maxZoom: 19,
			zoomLevelBase: 18,
			errorUrl: e3.imgPath + "bg.png",
			bounds: new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712)),
			imgExtend: "png"
		},
		BMAP_CUSTOM_LAYER: {
			tileUrls: [""],
			tileSize: 256,
			baseUnits: 256,
			zoomLevelMin: 1,
			zoomLevelMax: 19,
			minDataZoom: 3,
			maxDataZoom: 19,
			minZoom: 3,
			maxZoom: 19,
			zoomLevelBase: 18,
			errorUrl: e3.imgPath + "blank.gif",
			bounds: new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712)),
			imgExtend: "png"
		},
		B_EARTH_MAP: {
			tileUrls: [""],
			tileSize: 256,
			baseUnits: 256,
			zoomLevelMin: 3,
			zoomLevelMax: 19,
			minDataZoom: 3,
			maxDataZoom: 19,
			minZoom: 3,
			maxZoom: 19,
			webgl: {
				minZoom: 3,
				maxZoom: 21
			},
			zoomLevelBase: 18,
			errorUrl: e3.imgPath + "blank.gif",
			bounds: new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712)),
			imgExtend: "png"
		}
	};
	var b6 = bH;

	function bT(hV, i, hR, T, hQ) {
		this.mgr = hV;
		this.position = hR;
		this._cbks = [];
		this.name = hV.getTileName(T, hQ, hV.map.config.style);
		this.info = T;
		this._transparentPng = hQ.isTransparentPng();
		var hW = S("img");
		dm(hW);
		hW.galleryImg = false;
		var hU = hW.style;
		hU.position = "absolute";
		hU.width = hV.tileSize + "px";
		hU.height = hV.tileSize + "px";
		hU.left = hR[0] + "px";
		hU.top = hR[1] + "px";
		this.img = hW;
		this.src = i;
		if(ab && hR._offsetX === 0) {
			hU.opacity = 0;
			hU.willChange = "opacity"
		}
		var hT = this;
		this.img.onload = function(h4) {
			if(!hT.mgr) {
				return
			}
			var hZ = hT.mgr;
			var hX = hZ.bufferTiles;
			if(hZ.bufferNumber > 0) {
				hX[hT.name] = hT;
				hX.push(hT.name)
			}
			var h1 = hX.length - hZ.bufferNumber;
			for(var h2 = 0; h1 > 0 && h2 < hX.length; h2++) {
				var h3 = hX[h2];
				if(!hZ.mapTiles[h3]) {
					if(hX[h3]) {
						hX[h3].mgr = null;
						var h0 = hX[h3].img;
						if(h0.parentNode) {
							fq(h0);
							h0.parentNode.removeChild(h0)
						}
						h0 = null;
						hX[h3].img = null;
						hX[h3] = null;
						delete hX[h3]
					}
					hX.splice(h2, 1);
					h2--;
					h1--
				}
			}
			hT.loaded = true;
			hZ.imgNumber++;
			if(!hc(hT.img)) {
				if(hQ.tilesDiv) {
					hQ.tilesDiv.appendChild(hT.img)
				}
			}
			var h4 = new bb("onimagechange");
			h4.action = "show";
			h4.tile = hT.name;
			hZ.map.dispatchEvent(h4);
			if(ab && hR._offsetX === 0) {
				var hY = new o({
					fps: 10,
					duration: 300,
					render: function(e) {
						if(hT.img && hT.img.style) {
							hT.img.style.opacity = e * 1
						}
					},
					finish: function() {
						if(hT.img && hT.img.style) {
							delete hT.img.style.opacity;
							hT.img.style.willChange = "auto"
						}
					}
				})
			}
			hT._callCbks()
		};
		this.img.onerror = function(hZ) {
			hT.error = true;
			hT._callCbks();
			if(!hT.mgr) {
				return
			}
			var hX = hT.mgr;
			var hY = b6[hQ.mapType];
			if(hY.errorUrl) {
				hT.img.src = hY.errorUrl
			}
			if(!hc(hT.img)) {
				if(hQ.tilesDiv) {
					hQ.tilesDiv.appendChild(hT.img)
				}
			}
		};
		hW = null;
		var hS = new bb("onimagebefore");
		hS.tile = hT.name;
		hV.map.dispatchEvent(hS)
	}
	bT.prototype._addLoadCbk = function(e) {
		this._cbks.push(e)
	};
	bT.prototype._load = function() {
		if(FeBrowser.ie <= 6 && FeBrowser.ie > 0 && this._transparentPng) {
			this.img.src = e3.imgPath + "blank.gif"
		} else {
			this.img.src = this.src
		}
	};
	bT.prototype._callCbks = function() {
		var T = this;
		for(var e = 0; e < T._cbks.length; e++) {
			T._cbks[e]()
		}
		T._cbks.length = 0
	};
	var ab = (!C.Browser.ie || C.Browser.ie > 8);

	function fd(e) {
		this.tileLayers = [];
		this.map = e;
		this.bufferNumber = 300;
		this.mapTiles = [];
		this.bufferTiles = [];
		this.config = b6[this.map.mapType];
		this.errorUrl = this.config.errorUrl;
		this.tileSize = this.config.tileSize;
		this.baseUnits = this.config.baseUnits;
		this.baseZoomLevel = this.config.zoomLevelBase;
		this.tileURLs = this.config.tileUrls;
		this.imgNumber = 0;
		this.numLoading = 0;
		this.temp = {}
	}
	bo.register(function(i) {
		if(i._renderType === "webgl") {
			return
		}
		var e = i.tileMgr = new fd(i);
		i.addEventListener("mousewheel", function(T) {
			e.mouseWheel(T)
		});
		i.addEventListener("dblclick", function(T) {
			e.dblClick(T)
		});
		i.addEventListener("rightdblclick", function(T) {
			e.dblClick(T)
		});
		i.addEventListener("minuspress", function(T) {
			e.keypress(T)
		});
		i.addEventListener("pluspress", function(T) {
			e.keypress(T)
		});
		i.addEventListener("load", function(T) {
			if(this.mapType === BMAP_EARTH_MAP) {
				return
			}
			e.loadTiles()
		});
		i.addEventListener("zoomstartcode", function(T) {
			if(this.mapType === BMAP_EARTH_MAP) {
				return
			}
			e._zoom(T)
		});
		i.addEventListener("moving", function(T) {
			if(this.mapType === BMAP_EARTH_MAP) {
				return
			}
			e.moveGridTiles()
		});
		i.addEventListener("resize", function(T) {
			if(this.mapType === BMAP_EARTH_MAP) {
				return
			}
			e.resizeMap(T)
		});
		i.addEventListener("addtilelayer", function(T) {
			e.addTileLayer(T)
		});
		i.addEventListener("removetilelayer", function(T) {
			e.removeTileLayer(T)
		})
	});
	C.extend(fd.prototype, {
		addTileLayer: function(hQ) {
			var T = this;
			var i = hQ.target;
			T.tileLayers.push(i);
			if(T.map.loaded) {
				T.moveGridTiles()
			}
		},
		removeTileLayer: function(hX) {
			var hY = this;
			var hV = hX.target;
			var hT = hV.mapType;
			var hS = hY.mapTiles;
			var h0 = hY.bufferTiles;
			for(var T in h0) {
				var hQ = T.split("-")[1];
				if(hQ == hT) {
					delete h0[T]
				}
			}
			for(var T in hS) {
				var hQ = T.split("-")[1];
				if(hQ == hT) {
					delete hS[T]
				}
			}
			if(hY.zoomsDiv && hY.zoomsDiv.parentNode) {
				hY.zoomsDiv.parentNode.removeChild(hY.zoomsDiv);
				hY.zoomsDiv.innerHTML = ""
			}
			var hR = hY.map;
			if(hR.deepZoom) {
				var hZ = hR.deepZoom.preDeepZoomDiv;
				if(hZ && hZ.parentNode) {
					hZ.parentNode.removeChild(hZ)
				}
			}
			for(var hW = 0, hU = hY.tileLayers.length; hW < hU; hW++) {
				if(hV == hY.tileLayers[hW]) {
					hY.tileLayers.splice(hW, 1)
				}
			}
			hY.moveGridTiles()
		},
		hideDeepZoomDiv: function() {
			var i = this,
				T = i.map;
			if(T.deepZoom) {
				var e = T.deepZoom.preDeepZoomDiv;
				if(e && e.style.display != "none") {
					e.style.display = "none"
				}
			}
		},
		getTileLayer: function(hR) {
			var hQ = this;
			for(var T = 0, e = hQ.tileLayers.length; T < e; T++) {
				tilelayer = hQ.tileLayers[T];
				if(tilelayer.mapType == hR) {
					return tilelayer
				}
			}
			return null
		},
		_zoom: function(T) {
			var i = this;
			if(i.zoomsDiv && i.zoomsDiv.style.display != "none") {
				i.zoomsDiv.style.display = "none"
			}
			i.hideDeepZoomDiv();
			i.moveGridTiles()
		},
		resizeMap: function(i) {
			this.loaded = false;
			this.moveGridTiles()
		},
		_checkTilesLoaded: function() {
			this.numLoading--;
			var e = this;
			if(this.numLoading == 0) {
				if(this._checkLoadedTimer) {
					clearTimeout(this._checkLoadedTimer);
					this._checkLoadedTimer = null
				}
				this._checkLoadedTimer = setTimeout(function() {
					if(e.numLoading == 0) {
						e.map.dispatchEvent(new bb("ontilesloaded"))
					}
					e._checkLoadedTimer = null
				}, 80)
			}
		},
		getTileName: function(e, T, i) {
			var hR = T.mapType;
			var hQ = "TILE-" + hR + "-" + i + "-" + e[0] + "-" + e[1] + "-" + e[2];
			return hQ
		},
		hideTile: function(hQ, T) {
			var i = hQ.img;
			if(hc(i)) {
				if(hQ.loaded) {
					this.imgNumber--
				}
				if(i.parentNode) {
					fq(i);
					i.parentNode.removeChild(i)
				}
			}
			var hR = new bb("onimagechange");
			hR.tile = this.getTileName(hQ.info, T, this.map.config.style);
			hR.action = "hide";
			delete this.mapTiles[hQ.name];
			if(!hQ.loaded) {
				fq(i);
				hQ._callCbks();
				i = null;
				hQ.img = null;
				hQ.mgr = null
			}
			this.map.dispatchEvent(hR)
		},
		loadTiles: function() {
			var i = this;
			if(C.Browser.ie) {
				try {
					document.execCommand("BackgroundImageCache", false, true)
				} catch(T) {}
			}
			if(this.zoomsDiv && this.zoomsDiv.style.display != "none") {
				this.zoomsDiv.style.display = "none"
			}
			i.hideDeepZoomDiv();
			i.moveGridTiles()
		},
		getCell: function(hR, hQ) {
			var e = this.baseUnits * Math.pow(2, (this.baseZoomLevel - hQ));
			var T = parseInt(hR.lng / e);
			var i = parseInt(hR.lat / e);
			return [T, i, e * (T + 0.5), e * (i + 0.5)]
		},
		moveGridTiles: function() {
			var h4 = this.map,
				ie = h4.getMapType(),
				ib = this.tileLayers.length;
			var h9 = h4.centerPoint;
			if(ie !== BMAP_SATELLITE_MAP) {
				h9 = d4.calcLoopCenterPoint(h9)
			}
			var hV = h4.width;
			var it = h4.getZoomUnits();
			var ia = it * hV;
			var ih = h9.lng - ia / 2;
			var h0 = h9.lng + ia / 2;
			var h3 = d4.isAddWidth(ih, h0);
			for(var ij = 0; ij < ib; ij++) {
				var hR = this.tileLayers[ij];
				if(hR.baseLayer || ib == 1) {
					this.tilesDiv = hR.tilesDiv
				}
				var h5 = b6[hR.mapType];
				var hQ = h4.zoomLevel;
				var im = h4.getZoomUnits(h4.zoomLevel);
				var hZ = h5.baseUnits * Math.pow(2, (h5.zoomLevelBase - hQ));
				var hX = Math.floor(h9.lng / hZ);
				var ii = Math.floor(h9.lat / hZ);
				var h2 = h5.tileSize;
				var h6 = [hX, ii, (h9.lng - hX * hZ) / hZ * h2, (h9.lat - ii * hZ) / hZ * h2];
				var hY = h3 ? h4.width / 2 * 1.5 : h4.width / 2;
				var h1 = h6[0] - Math.ceil((hY - h6[2]) / h2);
				var ir = h6[1] - Math.ceil((h4.height / 2 - h6[3]) / h2);
				var ik = h6[0] + Math.ceil((hY + h6[2]) / h2);
				var h7 = h6[1] + Math.ceil((h4.height / 2 + h6[3]) / h2);
				var hW = [];
				for(var ip = h1; ip < ik; ip++) {
					for(var io = ir; io < h7; io++) {
						hW.push([ip, io]);
						var ic = "id_" + ip + "_" + io + "_" + hQ;
						hW[ic] = true
					}
				}
				if(hR.mapType !== BMAP_SATELLITE_MAP) {
					hW = d4.calcLoopTiles(hW, hQ)
				}
				hW.sort((function(i) {
					return function(id, iv) {
						return((0.4 * Math.abs(id[0] - i[0]) + 0.6 * Math.abs(id[1] - i[1])) - (0.4 * Math.abs(iv[0] - i[0]) + 0.6 * Math.abs(iv[1] - i[1])))
					}
				})([h6[0], h6[1]]));
				var T = this.mapTiles;
				var e = -h9.lng / im;
				var iu = h9.lat / im;
				var ig = [e, iu];
				for(var h8 in T) {
					var hT = T[h8];
					var iq = hT.info;
					if(!iq) {
						continue
					}
					var ic = "id_" + iq[0] + "_" + iq[1] + "_" + iq[2];
					if(!hW[ic]) {
						this.hideTile(hT, hR)
					}
				}
				var hS = -h4.offsetX + h4.width / 2;
				var hU = -h4.offsetY + h4.height / 2;
				hR.tilesDiv.style.left = Math.round(e + hS) - ig[0] + "px";
				hR.tilesDiv.style.top = Math.round(iu + hU) - ig[1] + "px";
				this.numLoading += hW.length;
				for(var ip = 0, il = hW.length; ip < il; ip++) {
					this.showTile([hW[ip][0], hW[ip][1], h4.zoomLevel], ig, hR, ip, h4.config.style)
				}
			}
		},
		showTile: function(hT, hS, hW, h1) {
			this.centerPos = hS;
			var hU = b6[hW.mapType];
			var hX = this.map.config.style;
			var hQ = this.getTileName(hT, hW, hX);
			var hR = (hT[0] * hU.tileSize) + hS[0];
			var T = (-1 - hT[1]) * hU.tileSize + hS[1];
			var h0 = [hR, T];
			var hV = null;
			if(hW.mapType !== BMAP_SATELLITE_MAP) {
				hV = d4.calcLoopParam(hT[0], hT[2]);
				var hZ = hV.offsetX;
				h0[0] += hZ;
				h0._offsetX = hZ
			}
			var h4 = this;
			var h3 = this.mapTiles[hQ];
			if(h3) {
				h3.img.style.left = h0[0] + "px";
				h3.img.style.top = h0[1] + "px";
				if(h3.loaded) {
					this._checkTilesLoaded()
				} else {
					h3._addLoadCbk(function() {
						h4._checkTilesLoaded()
					})
				}
				return
			}
			h3 = this.bufferTiles[hQ];
			if(h3) {
				this.imgNumber++;
				hW.tilesDiv.insertBefore(h3.img, hW.tilesDiv.lastChild);
				this.mapTiles[hQ] = h3;
				h3.img.style.left = h0[0] + "px";
				h3.img.style.top = h0[1] + "px";
				if(h3.loaded) {
					this._checkTilesLoaded()
				} else {
					h3._addLoadCbk(function() {
						h4._checkTilesLoaded()
					})
				}
				var h2 = new bb("onimagechange");
				h2.action = "cache";
				h2.tile = this.getTileName(hT, hW, hX);
				this.map.dispatchEvent(h2)
			} else {
				var hY = new ej(hT[0], hT[1]);
				if(hV) {
					hY.x = hV.col
				}
				var i = hW.getTilesUrl(hY, hT[2]);
				h3 = new bT(this, i, h0, hT, hW);
				h3._addLoadCbk(function() {
					h4._checkTilesLoaded()
				});
				h3._load();
				this.mapTiles[hQ] = h3;
				by(this.map)
			}
		},
		mouseWheel: function(hU) {
			var hT = this.map;
			if(!hT.config.enableWheelZoom) {
				return
			}
			var hV = hT.zoomLevel + (hU.trend === true ? 1 : -1);
			var hR = hT._getProperZoom(hV);
			if(hR.exceeded) {
				var T = new bb("onzoomexceeded");
				T.targetZoom = hV;
				hT.dispatchEvent(T);
				return
			}
			hT.dispatchEvent(new bb("onzoomstart"));
			hT.lastLevel = hT.zoomLevel;
			hT.zoomLevel = hR.zoom;
			var i = hU.pixel;
			var hQ = hT.pixelToPointIn(i, {
				zoom: hT.lastLevel
			});
			var hS = hT.getZoomUnits(hT.zoomLevel);
			hT.centerPoint = new hr(hQ.lng + hS * (hT.width / 2 - i.x), hQ.lat - hS * (hT.height / 2 - i.y));
			this.zoom(i)
		},
		dblClick: function(T) {
			var i = this.map;
			if(!i.config.enableDblclickZoom) {
				return
			}
			if(i.mapType === "B_EARTH_MAP") {
				return
			}
			if(i.currentOperation === dU.dragging) {
				return
			}
			if(T.type == "onrightdblclick") {
				i.zoomOut(T.point)
			} else {
				i.zoomIn(T.point)
			}
		},
		keypress: function(T) {
			var i = this.map;
			if(i.getMapType() === BMAP_EARTH_MAP) {
				return
			}
			T.type == "onpluspress" ? i.zoomIn() : i.zoomOut()
		}
	});

	function cR(hQ) {
		this.opts = hQ || {};
		this.copyright = this.opts.copyright || {};
		this.transparentPng = this.opts.transparentPng || false;
		this.png8 = this.opts.png8 || false;
		this.baseLayer = this.opts.baseLayer || false;
		this.dataType = this.opts.dataType || 1;
		this.isFlat = this.opts.isFlat === false ? false : true;
		this.showLabel = this.opts.showLabel === false ? false : true;
		var e = this.opts.tileTypeName || "web";
		this.tileType = cL.getInstance(e);
		this.clipTile = this.opts.clipTile || false;
		this._type = "tilelayer";
		var i = f4() ? 128 : 256;
		this.cacheSize = this.opts.cacheSize || i;
		var T = this;
		this.tileCache = new eZ(this.cacheSize, {
			clearCallback: function(hR) {
				if(hR.label) {
					if(hR.label.textImageBitmap) {
						hR.label.textImageBitmap.close()
					}
					if(hR.label.indoorTextImageBitmap) {
						hR.label.indoorTextImageBitmap.close()
					}
				}
				T._removeIndoorData(hR)
			}
		});
		this.scaler = a6() >= 1.5 ? 2 : 1;
		this.normalUdt = aD("ditu", "normal").udt;
		this.numLoading = 0;
		this.useThumbData = false;
		if(this.baseLayer) {
			this.useThumbData = true
		}
		if(typeof this.opts.customLayer === "boolean") {
			this.customLayer = this.opts.customLayer
		} else {
			this.customLayer = true
		}
	}
	cR.inherits(ed, "TileLayer");
	C.extend(cR.prototype, {
		isTransparentPng: function() {
			return this.transparentPng
		},
		getTilesUrl: function(hX, e) {
			var T = b6[this.mapType];
			if(typeof T != "object") {
				return null
			}
			var hQ = hX.x;
			var hY = hX.y;
			if(this.mapType !== BMAP_SATELLITE_MAP) {
				var hY = d4.calcLoopParam(hY, e).col
			}
			var i = "";
			if(this.opts.tileUrlTemplate) {
				i = this.opts.tileUrlTemplate;
				i = i.replace(/\{X\}/, hY);
				i = i.replace(/\{Y\}/, hQ);
				i = i.replace(/\{Z\}/, e)
			} else {
				if(this.mapType == BMAPGL_NORMAL_MAP) {
					var hW = this.isCanvasMap ? 0 : 1;
					var hS = T.tileUrls[Math.abs(hY + hQ) % T.tileUrls.length];
					if(window.offLineIPAddress) {
						hS = window.offLineIPAddress + "tile5/"
					}
					var hR = this.map.config.style;
					i = hS + "?qt=vtile&x=" + hQ + "&y=" + hY + "&z=" + e + (hR === "default" ? "" : ("&styleId=" + e3.mapStyleNameIdPair[hR])) + "&styles=pl&udt=" + this.normalUdt + "&scaler=" + this.scaler + "&showtext=" + hW;
					i = i.replace(/-(\d+)/gi, "M$1")
				}
				if(this.mapType == BMAP_SATELLITE_MAP) {
					var hT = aD("ditu", "satellite");
					var hV = hT.ver;
					var hU = hT.udt;
					i = T.tileUrls[Math.abs(hY + hQ) % T.tileUrls.length] + "u=x=" + hQ + ";y=" + hY + ";z=" + e + ";v=" + hV + ";type=sate&fm=46&udt=" + hU;
					i = i.replace(/-(\d+)/gi, "M$1")
				}
			}
			return i;
		},
		initialize: function(hR) {
			this.map = hR;
			if(hR._renderType === "webgl") {
				var hQ = null;
				if(this.customLayer !== false) {
					hQ = this.getTilesUrl
				}
				C.extend(this, fS);
				this.labelProcessor = new dj(this);
				this.callbackDataQueue = [];
				if(hQ) {
					this.getTilesUrl = hQ
				}
				var e = this;
				hR.on("indoor_data_refresh", function(hS) {
					if(!e.baseLayer) {
						return
					}
					e._refreshIndoorData(hS.uid, hS.floor)
				});
				hR.on("custom_labels_ready", function(hS) {
					if(!e.baseLayer) {
						return
					}
					e._doWorkAfterLabelImageLoad(hS.virtualTile, hS.labelCanvas, null, hS.imgKey)
				});
				hR.on("glmoduleloaded", function() {
					if(!e.baseLayer) {
						return
					}
					e.updateAllIconsTextureCoords()
				})
			}
			if(!hR.temp.layerZIndex) {
				hR.temp.layerZIndex = 0
			}
			this.zIndex = this.zIndex || 0;
			if(this.baseLayer) {
				this.zIndex = 0
			}
			if(!hR.temp.layid) {
				hR.temp.layid = 0
			}
			if(!this.opts.mapType) {
				this.mapType = "BMAP_CUSTOM_LAYER_" + hR.temp.layid;
				hR.temp.layid++
			} else {
				this.mapType = this.opts.mapType
			}
			var i = b6[this.mapType];
			if(!i) {
				b6[this.mapType] = {
					tileUrls: [],
					tileSize: 256,
					baseUnits: 256,
					zoomLevelMin: 1,
					zoomLevelMax: 19,
					minZoom: 3,
					maxZoom: 19,
					minDataZoom: 3,
					maxDataZoom: 19,
					zoomLevelBase: 18,
					errorUrl: e3.imgPath + "/blank.gif",
					bounds: new dS(new hr(-21364736, -10616832), new hr(23855104, 15859712)),
					imgExtend: "png"
				}
			}
			if(hR._renderType !== "webgl") {
				var T = dI(hR.platform, '<div style="position:absolute;z-index:' + this.zIndex + '"></div>');
				T.style.display = "";
				T.style.left = Math.ceil(-hR.offsetX + hR.width / 2) + "px";
				T.style.top = Math.ceil(-hR.offsetY + hR.height / 2) + "px";
				this.tilesDiv = T
			}
			this.isCanvasMap = hR.isCanvasMap();
			this.lastZoom = hR.getZoom()
		},
		remove: function() {
			if(this.tilesDiv && this.tilesDiv.parentNode) {
				this.tilesDiv.innerHTML = "";
				this.tilesDiv.parentNode.removeChild(this.tilesDiv)
			}
			delete this.tilesDiv
		},
		getCopyright: function() {
			return this.copyright
		},
		getMapType: function() {
			return this.mapType
		},
		setZIndex: function(e) {
			this.zIndex = e;
			if(this.tilesDiv) {
				this.tilesDiv.style.zIndex = e
			}
		}
	});

	function c5(i, e, T) {
		this.bounds = i;
		this.content = e;
		this.mapType = T
	}
	c5.inherits(ed, "Copyright");
	var gn = {
		get: function(e) {
			if(!gn.singleton) {
				gn.singleton = new ai(e)
			}
			return gn.singleton
		}
	};

	function ai(i) {
		this._map = i;
		this._tileMgr = i.tileMgr;
		this._animationDiv = null;
		this._preAnimationDiv = null;
		this._animation = null;
		this._baseLayerDiv = null;
		this._transformStyleName = a8.ifSupportCSS3("transform", true);
		this._transformOriginStyleName = a8.ifSupportCSS3("transformOrigin", true);
		this._preZoomTimes = 1;
		this._preRenderTick = 1;
		this._enableCanvas2dMap = !!(i.getRenderType() === "canvas");
		this._isIE9 = !!(C.Browser.ie === 9);
		var e = this;
		i.addEventListener("maptypechange", function() {
			e.hide()
		});
		i.addEventListener("load", function() {
			e.hide()
		})
	}
	C.extend(ai.prototype, {
		prepareLayer: function() {
			var hQ = this._map;
			var e = this._tileMgr;
			this._canvas2dMapMgr = hQ.canvas2dMapMgr;
			var T = this._baseLayerDiv = e.tilesDiv;
			if(!this._animationDiv) {
				var i = this._preAnimationDiv;
				if(i) {
					i.parentNode && i.parentNode.removeChild(i);
					this._preAnimationDiv = null
				}
				this._preAnimationDiv = this._animationDiv = T.cloneNode(true);
				hQ.platform.insertBefore(this._animationDiv, hQ.platform.firstChild)
			}
			this.show()
		},
		prepareAniParam: function() {
			var hQ = this._animationDiv;
			if(!hQ) {
				return
			}
			var e = hQ.children.length;
			var T;
			this._zoomAniInfo = [];
			for(var hR = e - 1; hR > -1; hR--) {
				var hS = {};
				T = hQ.children[hR].style;
				hS.top = parseInt(T.top, 10);
				hS.left = parseInt(T.left, 10);
				this._zoomAniInfo[hR] = hS
			}
		},
		prepareLabelLayer: function() {
			var hR = this._map;
			if(this._enableCanvas2dMap && hR.canvas2dMapMgr) {
				if(this.touchZoomLabelCanvas) {
					this.touchZoomLabelCanvas.parentNode.removeChild(this.touchZoomLabelCanvas)
				}
				var i = hR.canvas2dMapMgr._labelCanvas;
				this.touchZoomLabelCanvas = i.cloneNode(false);
				var e = this.touchZoomLabelCanvas.getContext("2d");
				e.drawImage(i, 0, 0);
				hR.platform.insertBefore(this.touchZoomLabelCanvas, hR.platform.firstChild);
				var hQ = parseInt(i.style.left, 10);
				var T = parseInt(i.style.top, 10);
				this.touchZoomLabelCanvas.style.zIndex = 9;
				this.touchZoomLabelCanvas.style[this._transformOriginStyleName] = (this._fixPosition.x - (hR.offsetX + hQ)) + "px " + (this._fixPosition.y - (hR.offsetY + T)) + "px";
				i.style.visibility = "hidden"
			}
		},
		show: function() {
			if(this._animationDiv) {
				this._animationDiv.style.visibility = ""
			}
		},
		showLabel: function() {
			var i = this._map;
			if(this._enableCanvas2dMap && i.canvas2dMapMgr) {
				var e = i.canvas2dMapMgr._labelCanvas;
				if(e) {
					e.style.visibility = ""
				}
				if(this.touchZoomLabelCanvas) {
					this.touchZoomLabelCanvas.style.zIndex = -2;
					this.touchZoomLabelCanvas.style.visibility = "hidden"
				}
			}
		},
		hide: function() {
			if(this._animationDiv) {
				this._animationDiv.style.visibility = "hidden"
			}
			if(this._preAnimationDiv) {
				this._preAnimationDiv.style.visibility = "hidden"
			}
		},
		hideNonAnimationLayers: function() {
			var hQ = this._map;
			if(hQ.getRenderType() === "dom") {
				if(hQ.overlayDiv) {
					hQ.overlayDiv.style.visibility = "hidden"
				}
				if(hQ.overlayDivEx) {
					hQ.overlayDivEx.style.visibility = "hidden"
				}
			}
			var hS = hQ.tileMgr.tileLayers;
			var hR;
			for(var T = 0, e = hS.length; T < e; T++) {
				hR = hS[T];
				hR.tilesDiv.style.visibility = "hidden"
			}
		},
		showNonAnimationLayers: function() {
			var hQ = this._map;
			if(hQ.getRenderType() === "dom") {
				if(hQ.overlayDiv) {
					hQ.overlayDiv.style.visibility = ""
				}
				if(hQ.overlayDivEx) {
					hQ.overlayDivEx.style.visibility = ""
				}
			}
			var hS = hQ.tileMgr.tileLayers;
			var hR;
			for(var T = 0, e = hS.length; T < e; T++) {
				hR = hS[T];
				hR.tilesDiv.style.visibility = ""
			}
		},
		setFixPosition: function(e) {
			this._fixPosition = e
		},
		setZoom: function(e, hW) {
			var hT = this._fixPosition;
			var h2 = this._map;
			var h3 = this._baseLayerDiv;
			var hU = {
				x: hT.x - parseInt(h3.style.left, 10) - h2.offsetX,
				y: hT.y - parseInt(h3.style.top, 10) - h2.offsetY
			};
			var hQ = this._animationDiv;
			if(!hQ) {
				return
			}
			var h0 = hQ.children.length;
			var hY;
			var h1 = this._transformStyleName;
			var hS = this._transformOriginStyleName;
			var h4 = this;
			var h6;
			var hV;
			for(var hZ = h0 - 1; hZ > -1; hZ--) {
				var hX = this._zoomAniInfo[hZ];
				hY = hQ.children[hZ].style;
				var hR = hX.left - hU.x;
				var T = hX.top - hU.y;
				hX.dx = hR * e - hR;
				hX.dy = T * e - T;
				hX.preDx = hR - hR;
				hX.preDy = T - T;
				h6 = hX.preDx + (hX.dx - hX.preDx);
				hV = hX.preDy + (hX.dy - hX.preDy) + hW;
				hY.left = hX.left + h6 + "px";
				hY.top = hX.top + hV + "px";
				hY.width = hY.height = 256 * e + "px"
			}
			if(this._enableCanvas2dMap) {
				var h5 = !h4._isIE9 ? "translate3d(0px, " + hW + "px, 0) scale(" + e + ")" : "translate(0px, " + hW + "px) scale(" + e + ")";
				this.touchZoomLabelCanvas.style[h1] = h5
			}
		},
		setZoomFinish: function() {
			this._animationDiv = null
		},
		startAnimation: function(hT) {
			this.prepareLayer();
			this.hideNonAnimationLayers();
			var ic = this._map;
			if(this.touchZoomLabelCanvas) {
				this.touchZoomLabelCanvas.style.display = "none"
			}
			hT = hT || {};
			var ia = hT.zoomCount || 0;
			var hY = hT.fixPosition;
			var h8 = hT.fixMCPosition;
			var hW = hT.pixOffset;
			this._zoomCount = ia;
			var hQ = ic.getZoom();
			var ib = hQ + ia;
			var e = ic.config.enableContinuousZoom;
			var h2 = 0.5;
			var hX = 5;
			var T = Math.pow(2, ia);
			var ie = this._baseLayerDiv;
			var hZ = {
				x: hY.x - parseInt(ie.style.left, 10) - ic.offsetX,
				y: hY.y - parseInt(ie.style.top, 10) - ic.offsetY
			};
			var hU = this._animationDiv;
			var h6 = hU.children.length;
			var ih = this._preZoomTimes;
			var h9 = [];
			var h7 = this._transformStyleName;
			var hV = this._transformOriginStyleName;
			for(var h5 = h6 - 1; h5 > -1; h5--) {
				var h3 = {};
				var h4 = hU.children[h5].style;
				h3.top = parseInt(h4.top, 10);
				h3.left = parseInt(h4.left, 10);
				var hS = h3.left - hZ.x;
				var hR = h3.top - hZ.y;
				h3.dx = hS * T - hS;
				h3.dy = hR * T - hR;
				h3.preDx = hS * ih - hS;
				h3.preDy = hR * ih - hR;
				h9[h5] = h3
			}
			var id = this;
			var h1;
			var ig;
			var h0;
			this._zoomAni = new o({
				fps: 60,
				duration: e ? 500 : 1,
				transition: function(i) {
					i = i * hX / (2 * h2);
					return hX * i - h2 * i * i
				},
				render: function(ir) {
					ir = ir * (4 * h2) / (hX * hX);
					h1 = ih + ir * (T - ih);
					var ij = hQ + eC(h1);
					var ip = null;
					var io = 0;
					var it = 0;
					if(hT.onAnimationBeforeLooping) {
						var iu = hT.onAnimationBeforeLooping(ir, ij);
						ip = iu.loopingCenter;
						io = iu.yDiff;
						it = iu.totalYDiff
					}
					for(var ik = h9.length - 1; ik > -1; ik--) {
						var il = h9[ik];
						if(hU.children[ik]) {
							var iq = hU.children[ik].style;
							ig = il.preDx + (il.dx - il.preDx) * ir - hW.width * ir;
							h0 = il.preDy + (il.dy - il.preDy) * ir - hW.height * ir + io;
							iq.left = il.left + ig + "px";
							iq.top = il.top + h0 + "px";
							iq.height = iq.width = 256 * h1 + "px"
						}
					}
					var ii = hW.width * ir;
					var im = hW.height * ir;
					if(ic.isRestrict) {
						id._enableCanvas2dMap && id._canvas2dMapMgr.clearLabel()
					} else {
						id._enableCanvas2dMap && id._canvas2dMapMgr.drawLabel(h1, hY, hQ, ib, ia, ir, ii, im, it, io)
					}
					id._preZoomTimes = h1;
					id._preRenderTick = ir;
					hT.onAnimationLooping && hT.onAnimationLooping(ir, ij, ip)
				},
				finish: function() {
					id._preZoomTimes = 1;
					id._zoomAni = null;
					id._animationDiv = null;
					hT.onAnimationFinish && hT.onAnimationFinish();
					id.showNonAnimationLayers()
				}
			});
			return this._zoomAni
		},
		stopAnimation: function() {
			if(this._zoomAni) {
				this._zoomAni.stop();
				this._zoomAni = null
			}
		}
	});

	function c(e) {
		this._initVars(e);
		this._initColorCanvas();
		this._bindEvent(e)
	}
	C.extend(c.prototype, {
		_initVars: function(e) {
			this._map = e._map;
			this._canvas2dMapMgr = e;
			this._labelCtx = e._labelCtx;
			this.ratio = this._map.config.ratio;
			this.sizeRatio = this.ratio > 1 ? 2 : 1;
			this.RANK1 = 1000000;
			this.RANK2 = 2000000;
			this.RANK3 = 3000000;
			this.RANK4 = 4000000;
			this.RANK5 = 5000000
		},
		_initColorCanvas: function() {
			var i = 256,
				T = S("canvas"),
				e = T.style;
			e.width = i + "px";
			e.height = i + "px";
			T.width = i;
			T.height = i;
			this._colorCvsSize = i;
			this._colorCvs = T;
			this._colorCtx = T.getContext("2d")
		},
		getLabelImageData: function(h3) {
			var h2 = h3.textImg;
			var T = h3.textPos;
			var h0 = this.ratio;
			var hY = this.sizeRatio / h0;
			var hR = this._colorCtx;
			var hV = this._colorCvsSize;
			hR.clearRect(0, 0, hV, hV);
			var hX = 0;
			var e = 0;
			var hU = 0;
			for(var hW = 0; hW < T.length; hW++) {
				if(T[hW].width > hX) {
					hX = T[hW].width;
					e = hW;
					hU = T[hW].drawX
				}
			}
			hX /= hY;
			var hZ = 0;
			for(var hW = 0, hT = T.length; hW < hT; hW++) {
				var h1 = T[hW];
				var h4;
				if(hW === e) {
					h4 = 0
				} else {
					h4 = h1.drawX - hU
				}
				hR.drawImage(h2, h1.srcX, h1.srcY, h1.width, h1.height, h4, hZ, h1.width / hY, h1.height / hY);
				if(h1.width / hY > hX) {
					hX = h1.width / hY
				}
				hZ += h1.height / hY + 2 * h0
			}
			var hQ = hR.getImageData(0, 0, hX, hZ);
			var hS = hR.getImageData(0, 0, hX, hZ);
			return [hQ, hS]
		},
		_bindEvent: function(i) {
			var e = this,
				T = i._map;
			T.addEventListener("onspotmouseover", function(hT) {
				if(!this.isCanvasMap() || !this.temp.isPermitSpotOver) {
					return
				}
				if(hT.spots.length > 0) {
					var hS = hT.spots[0].userdata.uid;
					var hR = hT.spots[0].userdata.name;
					var hQ = e.findLabelByUid(hS, hR);
					hQ && e._toHighLightColor(hQ)
				}
			});
			T.addEventListener("onspotmouseout", function(hT) {
				if(!this.isCanvasMap() || !this.temp.isPermitSpotOver) {
					return
				}
				if(hT.spots.length > 0) {
					var hS = hT.spots[0].userdata.uid;
					var hR = hT.spots[0].userdata.name;
					var hQ = e.findLabelByUid(hS, hR);
					hQ && e._toDefaultColor(hQ)
				}
			});
			T.addEventListener("onspotclick", function(hT) {
				if(!this.isCanvasMap() || !this.temp.isPermitSpotOver) {
					return
				}
				if(hT.spots && hT.spots.length > 0) {
					var hS = hT.spots[0].userdata.uid;
					var hR = hT.spots[0].userdata.name;
					var hQ = e.findLabelByUid(hS, hR);
					hQ && e._changeBaseMapState(hQ)
				} else {
					e._recoverNormalState()
				}
			});
			T.on("spot_status_reset", function() {
				e._recoverNormalState()
			});
			T.on("spot_highlight", function(hR) {
				var hQ = e.findLabelByUid(hR.uid);
				hQ && e._changeBaseMapState(hQ)
			})
		},
		_getTextBound: function(h1) {
			if(!h1.textPos) {
				return null
			}
			var hZ = this.ratio;
			var hX = this.sizeRatio / hZ;
			var T = h1.textPos;
			var h0 = h1.baseDrawX;
			var hY = h1.baseDrawY;
			var hV = h0 * hZ + (T[0].drawX - h0) / hX;
			var hT = hY * hZ + (T[0].drawY - hY) / hX;
			var hR = hV + T[0].width / hX;
			var e = hT + T[0].height / hX;
			for(var hW = 0, hU = T.length; hW < hU; hW++) {
				var h2 = T[hW];
				var hS = h0 * hZ + (h2.drawX - h0) / hX;
				if(hS < hV) {
					hV = hS
				}
				var hQ = hY * hZ + (h2.drawY - hY) / hX;
				if(hQ < hT) {
					hT = hQ
				}
				if(hS + h2.width > hR) {
					hR = hS + h2.width
				}
				if(hQ + h2.height > e) {
					e = hQ + h2.height
				}
			}
			return [hV, hT, hR, e]
		},
		_toHighLightColor: function(T) {
			if(T._tempRank && T._tempRank == this.RANK5) {
				return
			}
			var hU = this._getTextBound(T);
			if(!hU) {
				return
			}
			var hQ = Math.round(hU[0]);
			var i = Math.round(hU[1]);
			var e = this.getLabelImageData(T);
			var hS = e[0];
			var hR = e[1];
			var hT = this._canvas2dMapMgr.getFilterImageData(hS, this.RANK5);
			T._oldImgData = hR;
			this._labelCtx.putImageData(hT, hQ, i)
		},
		_toDefaultColor: function(e) {
			if(e._tempRank && e._tempRank == this.RANK5) {
				return
			}
			if(e._oldImgData) {
				var i = this.sizeRatio;
				var T = this._getTextBound(e);
				if(!T) {
					return
				}
				this._labelCtx.putImageData(e._oldImgData, Math.round(T[0]), Math.round(T[1]));
				e._oldImgData = null
			}
		},
		_changeBaseMapState: function(hQ) {
			var T = this._canvas2dMapMgr;
			var i = hQ.guid;
			var e = hQ.guidExt;
			var hR = {
				guid: i,
				name: hQ.name,
				guidExt: e
			};
			T._labelStrategy.setStrategyInfo(hR);
			T._loadData()
		},
		_recoverNormalState: function() {
			var e = this._canvas2dMapMgr;
			e._labelStrategy.setStrategyInfo(null);
			e._loadData()
		},
		findLabelByUid: function(hS, hQ) {
			var hU = this._canvas2dMapMgr,
				e = hU._computedLabel;
			for(var hR = 0, T = e.length; hR < T; hR++) {
				var hT = e[hR];
				if(!hU.isClickableLabel(hT)) {
					continue
				}
				if(hS && hT.guid === hS) {
					return hT
				}
				if(hQ && hT.name === hQ) {
					return hT
				}
			}
			return null
		}
	});

	function ec(e) {
		this._initVars(e)
	}
	C.extend(ec.prototype, {
		_initVars: function(e) {
			this._map = e._map;
			this._canvas2dMapMgr = e;
			this.ratio = this._map.config.ratio;
			this._strategyInfo = null;
			this.RANK1 = 1000000;
			this.RANK2 = 2000000;
			this.RANK3 = 3000000;
			this.RANK4 = 4000000;
			this.RANK5 = 5000000
		},
		setStrategyInfo: function(e) {
			this._strategyInfo = e
		},
		preComputeLabel: function(hW, iQ, iz, h8, iK, i4) {
			var it = [],
				h4 = hW._centerX,
				h2 = hW._centerY,
				i5 = h8 * iK;
			var iF = this.ratio;
			var hV = this._map.getZoom();
			var im = 0;
			if(hV === 5) {
				im = 4
			}
			if(hV === 8) {
				im = -6
			}
			hW.sort(function(i6, i) {
				if(i6.x * i6.y < i.x * i.y) {
					return -1
				} else {
					return 1
				}
			});
			for(var ip = 0, ik = hW.length; ip < ik; ip++) {
				var iV = hW[ip],
					ie = iV.x,
					ib = iV.y,
					h9 = iV.z;
				var ih = d4.calcLoopParam(ie, h9).offsetX;
				var iD = ie * i5,
					iC = (ib + 1) * i5,
					hQ = (iD - h4) / h8 + iQ / 2 + ih,
					T = (h2 - iC) / h8 + iz / 2;
				for(var il = 0, iZ = iV.length; il < iZ; il++) {
					var hY = iV[il],
						h5 = undefined,
						h3 = undefined,
						iX = undefined,
						iW = undefined;
					var iM = hY.baseDrawX = hQ + hY.baseX;
					var iL = hY.baseDrawY = T + hY.baseY;
					if(hY.type == "fixed") {
						var ix = hY.iconPos,
							h7 = hY.textPos,
							i1 = hY.textImg;
						if(ix) {
							ix.drawX = hQ + ix.destX;
							ix.drawY = T + ix.destY;
							h5 = ix.drawX;
							h3 = ix.drawY;
							iX = ix.drawX + ix.width;
							iW = ix.drawY + ix.height
						}
						if(h7 && i1) {
							for(var iN = 0; iN < h7.length; iN++) {
								var i0 = h7[iN];
								i0.drawX = hQ + i0.destX;
								i0.drawY = T + i0.destY;
								if(!h5) {
									h5 = i0.drawX;
									h3 = i0.drawY;
									iX = i0.drawX + i0.width;
									iW = i0.drawY + i0.height
								} else {
									if(i0.drawX < h5) {
										h5 = i0.drawX
									}
									if(i0.drawY < h3) {
										h3 = i0.drawY
									}
									if(i0.drawX + i0.width > iX) {
										iX = i0.drawX + i0.width
									}
									if(i0.drawY + i0.height > iW) {
										iW = i0.drawY + i0.height
									}
								}
							}
						}
					} else {
						hY.tileX = hQ;
						hY.tileY = T;
						h5 = hQ + hY.minXOriginal;
						h3 = T + hY.minYOriginal;
						iX = hQ + hY.maxXOriginal;
						iW = T + hY.maxYOriginal
					}
					if(h5 != undefined) {
						var iP = iM + (h5 - iM) / iF;
						var iO = iL + (h3 - iL) / iF;
						var iq = iM + (iX - iM) / iF;
						var io = iL + (iW - iL) / iF;
						hY.minX = iP;
						hY.minY = iO;
						hY.maxX = iq;
						hY.maxY = io;
						var iT = (iP + iq) / 2,
							iS = (iO + io) / 2,
							iA = h4 + (iT - iQ / 2) * h8,
							iy = h2 + (iz / 2 - iS) * h8;
						hY.geoX = iA;
						hY.geoY = iy;
						it.push(hY)
					}
				}
			}
			if(i4) {
				for(var ip = 0, ik = i4.length; ip < ik; ip++) {
					var ij = i4[ip];
					var iI = ij[0];
					var hZ = ij[1];
					var ix = iI.iconPos;
					var hT = ix.geoX;
					var hR = ix.geoY;
					var iM = (hT - h4) / h8 + iQ / 2;
					var iL = (h2 - hR) / h8 + iz / 2;
					var h5 = iM + ix.destX;
					var h3 = iL + ix.destY;
					var iX = h5 + ix.width;
					var iW = h3 + ix.height;
					iI.textPos = iI.textPos || iI._textPos;
					var h7 = iI.textPos;
					var iR = h7[0];
					var id = iM + iR.destX;
					var h1 = iL + iR.destY;
					if(h1 < h3) {
						h3 = h1
					}
					if(id + iR.width > iX) {
						iX = id + iR.width
					}
					if(h1 + iR.height > iW) {
						iW = h1 + iR.height
					}
					if(h7.length === 2) {
						var ic = h7[1];
						var ia = iM + ic.destX;
						var h0 = iL + ic.destY;
						if(h0 < h3) {
							h3 = h0
						}
						if(ia + ic.width > iX) {
							iX = ia + ic.width
						}
						if(h0 + ic.height > iW) {
							iW = h0 + ic.height
						}
					}
					iI._tempBounds = [h5, h3, iX, iW];
					var ix = hZ.iconPos;
					var hT = ix.geoX;
					var hR = ix.geoY;
					var iM = (hT - h4) / h8 + iQ / 2;
					var iL = (h2 - hR) / h8 + iz / 2;
					var h5 = iM + ix.destX;
					var h3 = iL + ix.destY;
					var iX = h5 + ix.width;
					var iW = h3 + ix.height;
					hZ.textPos = hZ.textPos || hZ._textPos;
					var h7 = hZ.textPos;
					var iR = h7[0];
					var id = iM + iR.destX;
					var h1 = iL + iR.destY;
					if(id < h5) {
						h5 = id
					}
					if(h1 < h3) {
						h3 = h1
					}
					if(h1 + iR.height > iW) {
						iW = h1 + iR.height
					}
					if(h7.length === 2) {
						var ic = h7[1];
						var ia = iM + ic.destX;
						var h0 = iL + ic.destY;
						if(ia < h5) {
							h5 = ia
						}
						if(h0 < h3) {
							h3 = h0
						}
						if(h0 + ic.height > iW) {
							iW = h0 + ic.height
						}
					}
					hZ._tempBounds = [h5, h3, iX, iW]
				}
				for(var ip = 0, ik = i4.length; ip < ik; ip++) {
					var ij = i4[ip];
					var iI = ij[0];
					var hZ = ij[1];
					if(ip === 0 && hZ.textPos) {
						hZ._textPos = hZ.textPos;
						delete hZ.textPos
					}
					var iU = iI;
					if(!iI.textPos && hZ.textPos) {
						iU = hZ
					}
					var iY = iU._tempBounds;
					for(il = ip + 1; il < ik; il++) {
						var ii = i4[il];
						var iu = ii[0];
						var i3 = ii[1];
						var h6 = 0;
						var i2 = iu._tempBounds;
						if(!(iY[2] < i2[0] || iY[0] > i2[2] || iY[3] < i2[1] || iY[1] > i2[3])) {
							h6++;
							if(iu.textPos) {
								iu._textPos = iu.textPos;
								delete iu.textPos
							}
						}
						var i2 = i3._tempBounds;
						if(!(iY[2] < i2[0] || iY[0] > i2[2] || iY[3] < i2[1] || iY[1] > i2[3])) {
							h6++;
							if(i3.textPos) {
								i3._textPos = i3.textPos;
								delete i3.textPos
							}
						}
						if(h6 >= 2) {
							if(iU.textPos) {
								iU._textPos = iU.textPos;
								delete iU.textPos
							}
						}
					}
				}
				for(var ip = 0, ik = i4.length; ip < ik; ip++) {
					var ij = i4[ip];
					var iI = ij[0];
					var hZ = ij[1];
					var iv = iI;
					if(!iI.textPos && hZ.textPos) {
						iv = hZ
					}
					var ix = iv.iconPos;
					var hT = ix.geoX;
					var hR = ix.geoY;
					var iM = iv.baseDrawX = (hT - h4) / h8 + iQ / 2;
					var iL = iv.baseDrawY = (h2 - hR) / h8 + iz / 2;
					ix.drawX = iM + ix.destX;
					ix.drawY = iL + ix.destY;
					var h5 = ix.drawX;
					var h3 = ix.drawY;
					var iX = ix.drawX + ix.width;
					var iW = ix.drawY + ix.height;
					var h7 = iv.textPos;
					if(h7) {
						var iR = h7[0];
						iR.drawX = iM + iR.destX;
						iR.drawY = iL + iR.destY;
						if(iR.drawX < h5) {
							h5 = iR.drawX
						}
						if(iR.drawY < h3) {
							h3 = iR.drawY
						}
						if(iR.drawX + iR.width > iX) {
							iX = iR.drawX + iR.width
						}
						if(iR.drawY + iR.height > iW) {
							iW = iR.drawY + iR.height
						}
						if(h7.length === 2) {
							var ic = h7[1];
							ic.drawX = iM + ic.destX;
							ic.drawY = iL + ic.destY;
							if(ic.drawX < h5) {
								h5 = ic.drawX
							}
							if(ic.drawY < h3) {
								h3 = ic.drawY
							}
							if(ic.drawX + ic.width > iX) {
								iX = ic.drawX + ic.width
							}
							if(ic.drawY + ic.height > iW) {
								iW = ic.drawY + ic.height
							}
						}
					}
					var iP = iM + (h5 - iM) / iF;
					var iO = iL + (h3 - iL) / iF;
					var iq = iM + (iX - iM) / iF;
					var io = iL + (iW - iL) / iF;
					iv.minX = iP;
					iv.minY = iO;
					iv.maxX = iq;
					iv.maxY = io;
					var iH = (iP + iq) / 2;
					var iG = (iO + io) / 2;
					var hU = h4 + (iH - iQ / 2) * h8;
					var hS = h2 + (iz / 2 - iG) * h8;
					iv.geoX = hU;
					iv.geoY = hS;
					it.push(iv)
				}
			}
			var iJ = this._strategyInfo;
			if(iJ) {
				var ir = iJ.guid;
				var iB = iJ.name;
				var ig = iJ.guidExt;
				for(var ip = 0, ik = it.length; ip < ik; ip++) {
					var hX = it[ip];
					delete hX._tempRank;
					if(!this._canvas2dMapMgr.isClickableLabel(hX) || (ig === 1 && !hX.guidExt)) {
						continue
					}
					if((ir && ir === hX.guid) || (iB && iB === hX.name)) {
						hX._tempRank = this.RANK5
					}
				}
			} else {
				for(var ip = 0, ik = it.length; ip < ik; ip++) {
					var hX = it[ip];
					if(hX.type == "line" || !hX.iconPos) {
						continue
					}
					delete hX._tempRank
				}
			}
			it.sort(function(i7, i6) {
				var i8 = i7._tempRank ? i7._tempRank : i7.rank,
					i = i6._tempRank ? i6._tempRank : i6.rank;
				if(i8 === i) {
					return i7.baseX - i6.baseX
				}
				return i - i8
			});
			for(var ip = 0, ik = it.length; ip < ik; ip++) {
				var iU = it[ip];
				iU.isDel = false;
				iU.isFadeout = false;
				iU._schedule = 0;
				iU._isIgnore = false;
				iU.arrIntersectIndex = [];
				for(il = ip + 1; il < ik; il++) {
					var iw = it[il];
					if(!(iU.maxX - im < iw.minX || iU.minX > iw.maxX - im || iU.maxY - im < iw.minY || iU.minY > iw.maxY - im)) {
						iU.arrIntersectIndex.push(il)
					}
				}
			}
			for(var ip = 0, ik = it.length; ip < ik; ip++) {
				var hX = it[ip];
				if(hX.isDel == false) {
					var e = hX.arrIntersectIndex;
					for(var il = 0, iZ = e.length; il < iZ; il++) {
						var iE = it[e[il]];
						iE.isDel = true;
						if(iE.guidExt === 1) {
							iE.isDel = false
						}
					}
				}
			}
			return it
		}
	});

	function ah(e) {
		this._map = e;
		this._initCanvas();
		this._initVars();
		this._bindEvent();
		this._tileType = cL.getInstance("na")
	}
	bo.register(function(i) {
		if(i.getRenderType() === "canvas") {
			var e = i.config.style;
			if(bo["FeatureStyle" + e]) {
				i.canvas2dMapMgr = new ah(i)
			} else {
				i.loadMapStyleFiles(function() {
					i.canvas2dMapMgr = new ah(i);
					i.canvas2dMapMgr._loadData()
				})
			}
		}
	});
	C.extend(ah.prototype, {
		_initCanvas: function() {
			var hT = this._map,
				hR = hT.getSize(),
				hQ = hR.width,
				i = hR.height,
				e = hT.platform,
				hU = S("canvas"),
				hS = hU.style;
			var T = this.ratio = hT.config.ratio;
			this._width = hQ;
			this._height = i;
			hS.cssText = "position: absolute;left:0;top:0;width:" + hQ + "px;height:" + i + "px;z-index:100;";
			hU.width = hQ * T;
			hU.height = i * T;
			this._labelCanvas = hU;
			this._labelCtx = hU.getContext("2d");
			e.appendChild(hU)
		},
		_initVars: function() {
			var e = aD("ditu", "normal");
			this._udt = e.udt;
			this._version = e.ver;
			this._labelDataUrls = b6.B_NORMAL_MAP.vectorTileUrls;
			this._style = bo["FeatureStyle" + this._map.config.style];
			this._labelCount = 0;
			this._vectorDrawLib = new a0(this);
			this._cache = {
				maxNum: 500,
				delNum: 50,
				arrCache: []
			};
			this._computedLabel = null;
			this._spotData = null;
			this._labelStrategy = new ec(this);
			this._labelClick = new c(this);
			this._biz = new gM(this);
			this._map.temp.isPermitSpotOver = true;
			this.labelStyleParam = "pl";
			if(this._map.getMapType() === BMAP_SATELLITE_MAP) {
				this.labelStyleParam = "sl"
			}
			this.statRequestCount = 0;
			this.statResponseCount = 0
		},
		_resizeHandler: function(hS) {
			var hU = this,
				i = hU._map,
				hR = i.getSize(),
				T = hR.width,
				hW = hR.height;
			var hT = this.ratio;
			var hX = this._labelCanvas,
				hQ = hX.style;
			hQ.width = T + "px";
			hQ.height = hW + "px";
			hX.width = T * hT;
			hX.height = hW * hT;
			hU._width = T;
			hU._height = hW;
			var hV = true;
			hU._loadData(hV)
		},
		_bindEvent: function() {
			var e = this,
				i = e._map;
			i.addEventListener("load", function(T) {
				e.clearLabel();
				e._loadData()
			});
			i.addEventListener("zoomend", function(T) {
				if(!T.notClearLabel) {
					e.clearLabel()
				}
				e._loadData()
			});
			i.addEventListener("moveend", function(T) {
				e._loadData()
			});
			i.addEventListener("resize", function(T) {
				e._resizeHandler(T)
			});
			i.addEventListener("maptypechange", function(T) {
				if(T.mapType === BMAP_EARTH_MAP) {
					e.hideLabelCanvas()
				} else {
					e.showLabelCanvas();
					if(T.mapType === BMAPGL_NORMAL_MAP) {
						e.labelStyleParam = "pl"
					} else {
						if(T.mapType === BMAP_SATELLITE_MAP) {
							e.labelStyleParam = "sl"
						}
					}
					e._loadData()
				}
			});
			i.addEventListener("streetlayer_show", function(T) {
				if(this.isCanvasMap()) {
					e.showLabelCanvas()
				}
			});
			i.addEventListener("streetlayer_hide", function(T) {
				if(this.isCanvasMap()) {
					e.hideLabelCanvas()
				}
			});
			i.addEventListener("loadbizdata", function(hQ) {
				var T = hQ.data;
				e._biz.proecessBizData(T, function() {
					e.updateLabel()
				})
			});
			i.addEventListener("unloadbizdata", function(T) {
				e._biz.clearBizData();
				e.updateLabel()
			});
			e.isDrawText = false;
			setTimeout(function() {
				if(!e.isDrawText) {
					i.dispatchEvent(new bb("onmapwhitescreen"))
				}
			}, 10000)
		},
		getStyle: function() {
			return this._style
		},
		_getZoomUnits: function(e) {
			return Math.pow(2, 18 - e)
		},
		_createCacheForm: function(T, hU, hT, i) {
			var hS = this;
			var e = hS._cache;
			var hQ = e.arrCache;
			var hV = this._getLabelId(T, hU, hT, i);
			var hR = {
				id: hV,
				updateLabelCounter: 0
			};
			hQ.push(hR);
			hQ[hV] = hR;
			return hR
		},
		_getLabelId: function(i, hQ, T, e) {
			return "_" + i + "_" + hQ + "_" + T + "_" + e + "_" + this.labelStyleParam
		},
		_getCache: function(i, hQ, T, e) {
			return this._cache.arrCache[this._getLabelId(i, hQ, T, e)]
		},
		_setCacheValue: function(hR, h4, h2, hQ, hX) {
			var hZ = this;
			var e = hZ._cache;
			var hT = e.arrCache;
			var hV = e.maxNum;
			var hS = e.delNum;
			var h3 = this._getLabelId(hR, h4, h2, hQ);
			var hY = hT[h3];
			if(hX) {
				hY.lb = hX
			}
			if(hT.length > hV) {
				var T = hT.splice(0, hS);
				for(var hW = 0, hU = T.length; hW < hU; hW++) {
					var h0 = T[hW],
						h1 = h0.id;
					if(hT[h1].lb) {
						hT[h1].lb = null
					}
					hT[h1] = null;
					delete hT[h1]
				}
				T = null
			}
		},
		_loadData: function(h2) {
			var io = this._map;
			if(!io.isCanvasMap()) {
				return
			}
			var hV = io.getCenterIn();
			var im = d4.calcLoopCenterPoint(hV);
			var hU = this._tileType;
			var hX = this._width / 2;
			var h9 = this._height;
			var ia = io.getZoom();
			var h6 = hU.getDataZoom(ia);
			var hZ = io.getZoomUnits(ia);
			var h5 = hZ * hX;
			var il = im.lng - h5;
			var ik = im.lng + h5;
			var h3 = d4.isAddWidth(il, ik);
			hX = h3 ? hX * 1.5 : hX;
			var h4 = hU.getTileSize(ia);
			var hR = hU.getMercatorSize(ia, h6);
			var hY = Math.floor(im.lng / hR);
			var h0 = Math.floor(im.lat / hR);
			var hS = [hY, h0, (im.lng - hY * hR) / hR * h4, (im.lat - h0 * hR) / hR * h4];
			var ic = hS[0] - Math.ceil((hX - hS[2]) / h4);
			var ii = hS[1] - Math.ceil((h9 / 2 - hS[3]) / h4);
			var h8 = hS[0] + Math.ceil((hX + hS[2]) / h4);
			var ie = hS[1] + Math.ceil((h9 / 2 + hS[3]) / h4);
			io.temp.isPermitSpotOver = false;
			var e = [];
			for(var ih = ic; ih < h8; ih++) {
				for(var ig = ii; ig < ie; ig++) {
					e.push([ih, ig, h6]);
					var h7 = "id_" + ih + "_" + ig + "_" + ia;
					e[h7] = true
				}
			}
			e._zoom = h6;
			e = d4.calcLoopTiles(e, ia);
			e.sort((function(i) {
				return function(id, iq) {
					return((0.4 * Math.abs(id[0] - i[0]) + 0.6 * Math.abs(id[1] - i[1])) - (0.4 * Math.abs(iq[0] - i[0]) + 0.6 * Math.abs(iq[1] - i[1])))
				}
			})([hS[0], hS[1]]));
			var h1 = this._cache.arrCache;
			this._curViewLabels = [];
			var hQ = "viewKey_" + Math.floor(hV.lng) + "_" + Math.floor(hV.lat) + "_" + ia;
			this.statRequestCount = 0;
			this.statResponseCount = 0;
			this._labelCount += e.length;
			var hW = ia;
			for(var ih = 0, ib = e.length; ih < ib; ih++) {
				var hY = e[ih][0];
				var h0 = e[ih][1];
				var T = e[ih][2];
				var hT = this._getLabelId(hY, h0, T, hW);
				var ij = h1[hT];
				if(!ij) {
					ij = this._createCacheForm(hY, h0, T, hW)
				}
				if(typeof ij.lb === "undefined") {
					ij.lb = null;
					this._loadLabelData(hY, h0, T, hW, h4, hQ);
					this.statRequestCount++
				} else {
					if(ij.lb) {
						this._curViewLabels.push(ij.lb);
						this._labelCount--
					} else {
						if(h2) {
							this._loadLabelData(hY, h0, T, hW, h4, hQ)
						}
						ij.updateLabelCounter++
					}
				}
			}
			if(this._labelCount === 0) {
				this.updateLabel()
			}
			var ip = this;
			if(ip.errorTimer) {
				clearTimeout(ip.errorTimer)
			}
			ip.errorTimer = setTimeout(function() {
				if(ip._labelCount !== 0) {
					ip._labelCount = 0;
					ip.updateLabel()
				}
				var iq = new bb("onloaddatatimeout");
				var ir = 0;
				var id = 0;
				var it = 0;
				var i = 0;
				if(ip.statRequestCount === ip.statResponseCount) {
					ir = 1
				} else {
					id = 1
				}
				if(id === 1) {
					i = ip.statRequestCount - ip.statResponseCount;
					it = ip.statResponseCount
				}
				iq.noTimeoutCount = ir;
				iq.timeoutCount = id;
				iq.timeoutNoLoaded = i;
				iq.timeoutLoaded = it;
				ip._map.dispatchEvent(iq)
			}, 500)
		},
		clearLabel: function() {
			var e = this._width;
			var T = this._height;
			var i = this.ratio;
			this._labelCtx.clearRect(0, 0, e * i, T * i)
		},
		updateLabel: function() {
			var i = this._map;
			var e = i.getCenterIn();
			var hQ = this._width;
			var hT = this._height;
			var hW = i.getZoom();
			var hV = this._tileType.getTileSize(hW);
			var hU = this._getZoomUnits(hW);
			var T = this._labelCtx;
			this._labelCanvas.style.left = -i.offsetX + "px";
			this._labelCanvas.style.top = -i.offsetY + "px";
			var hS = this._curViewLabels;
			hS._centerX = e.lng;
			hS._centerY = e.lat;
			var hR = this._biz.bizLabels;
			this._computedLabel = this._labelStrategy.preComputeLabel(hS, hQ, hT, hU, hV, hR);
			this._computedLabel._zoom = hW;
			this.clearLabel();
			this._vectorDrawLib.drawIconAndText(T, this._computedLabel, hW);
			this._addSpotData();
			i.temp.isPermitSpotOver = true;
			if(hS.length > 0) {
				this.isDrawText = true
			}
		},
		_loadLabelData: function(hZ, hY, hX, T, h0, e) {
			var hS = hZ.toString();
			var hQ = hY.toString();
			var hU = "cbk_" + hS.replace("-", "_") + "_" + hQ.replace("-", "__") + "_" + Math.floor(hX);
			var h4 = eA + "." + hU;
			var h3 = this._labelDataUrls;
			var hW = Math.abs(hZ + hY) % h3.length;
			var h9 = h3[hW];
			if(window.offLineIPAddress) {
				h9 = window.offLineIPAddress + "pvd/"
			}
			var i = this.labelStyleParam;
			var h2 = "?qt=vtile";
			var h5 = "";
			if(this._map.config.style !== "default") {
				h5 = "&styleId=" + e3.mapStyleNameIdPair[this._map.config.style]
			}
			var h1 = "x={x}&y={y}&z={z}&udt={udt}&v={v}&styles={styles}" + h5 + "&textonly=1&textimg=1&scaler={scaler}&fn=" + encodeURIComponent(h4);
			var h6 = d4.calcLoopParam(hZ, hX).col;
			var hV = this.ratio > 1 ? 2 : 1;
			var hT = h1.replace(/{x}/, h6).replace(/{y}/, hY).replace(/{z}/, Math.floor(hX)).replace(/{styles}/, i).replace(/{udt}/, this._udt).replace(/{v}/, this._version).replace(/{scaler}/, hV);
			var hR = h9 + h2 + "&param=" + window.encodeURIComponent(gk(hT));
			var h8 = this;
			var h7 = h8._map;
			bo[hU] = function(ia) {
				h8._vectorDrawLib.parseLabelData(ia, hZ, hY, hX, T, h0, function(ig) {
					var ic = h7.getCenterIn();
					var ih = h7.getZoom();
					var ij = "viewKey_" + Math.floor(ic.lng) + "_" + Math.floor(ic.lat) + "_" + ih;
					h8._labelCount--;
					var ik = h8._getCache(hZ, hY, hX, T).updateLabelCounter;
					h8._labelCount -= ik;
					var id = h8._curViewLabels;
					if(ij === e || (h8._labelCount < 0 && ih === hX)) {
						id.push(ig)
					}
					if(ij === e) {
						h8.statResponseCount++
					}
					if(h8._labelCount <= 0) {
						var ib = (new Date()).getTime();
						h8.updateLabel();
						var ie = (new Date()).getTime();
						var ii = new bb("oncanvasmaploaded");
						ii.drawTime = ie - ib;
						if(h8.statResponseCount === h8.statRequestCount) {
							ii.isAllLoadedDrawing = true
						}
						h7.dispatchEvent(ii)
					}
					h8._setCacheValue(hZ, hY, hX, T, ig);
					delete bo[hU]
				})
			};
			
			hl.load(hR)
		},
		drawLabel: function(T, hQ, hX, i, hV, hR, e, hS, hW, hT) {
			var hU = this;
			if(!hU._computedLabel) {
				return
			}
			if(hU._computedLabel._zoom !== hX) {
				hU.clearLabel();
				return
			}
			hU._map.temp.isPermitSpotOver = false;
			hU.clearLabel();
			hU._vectorDrawLib.zoomingIconAndText(this._labelCtx, hU._computedLabel, T, hQ, i, hV, hR, e, hS, hW, hT)
		},
		_addSpotData: function() {
			this._spotData = [];
			var hX = this._map.getZoom();
			for(var hS = 0, hR = this._computedLabel.length; hS < hR; hS++) {
				var hU = this._computedLabel[hS];
				if(!this.isClickableLabel(hU) || (hU.guidExt === 1 && hU.startScale > hX)) {
					continue
				}
				var hT = [];
				hT[0] = (hU.minX - hU.maxX) / 2;
				hT[1] = (hU.minY - hU.maxY) / 2;
				hT[2] = (hU.maxX - hU.minX) / 2;
				hT[3] = (hU.maxY - hU.minY) / 2;
				var hQ = null;
				if(hU.iconPos) {
					hQ = new hr(hU.iconPos.geoX, hU.iconPos.geoY)
				}
				var T = hU.name ? hU.name.replace("\\\\", "<br>") : "";
				if(hU.iconPos && hU.iconPos.iconType.indexOf("ditie") > -1 && this._map.getZoom() > 14) {
					T = ""
				}
				var hW = {
					n: T,
					pt: new hr(hU.geoX, hU.geoY),
					userdata: {
						iconPoint: hQ,
						uid: hU.guid,
						name: T,
						type: hU.iconPos ? hU.iconPos.iconType : "",
						iconImg: hU.iconImg,
						mapPoi: true,
						adver_log: hU.adver_log || ""
					},
					bd: hT,
					tag: "MAP_SPOT_INFO"
				};
				this._spotData.push(hW)
			}
			var hV = new bb("onspotsdataready");
			hV.spots = this._spotData;
			this._map._spotDataOnCanvas = this._spotData;
			this._map.dispatchEvent(hV)
		},
		isClickableLabel: function(e) {
			if(e.isDel || (!e.guid && !e.name)) {
				return false
			}
			return true
		},
		getFilterImageData: function(T, hT) {
			var hU = T.data,
				hS = this._labelStrategy,
				hT = parseInt(hT);
			for(var hV = 0, hR = hU.length; hV < hR; hV += 4) {
				var e = hU[hV],
					hW = hU[hV + 1],
					hX = hU[hV + 2],
					hY = hU[hV + 3];
				if(hY === 0) {
					continue
				}
				var hQ = Math.round((e + hW + hX) / 3);
				var hZ = hQ - 90;
				hZ = hZ < 0 ? 0 : hZ;
				if(hT === hS.RANK5) {
					hU[hV] = 51 + hZ * 1.3;
					hU[hV + 1] = 133 + hZ * 0.8;
					hU[hV + 2] = 255
				}
			}
			return T
		},
		showLabelCanvas: function() {
			this._labelCanvas.style.visibility = ""
		},
		hideLabelCanvas: function() {
			this._labelCanvas.style.visibility = "hidden"
		}
	});
	var b9 = 5;
	var dX = 4;
	var hp = 3;
	var ff = 2;
	var hJ = 1;
	var d0 = 0;
	var hM = 3;
	var hf = 5;
	var I = {
		3: {
			start: 3,
			base: 3
		},
		4: {
			start: 4,
			base: 5
		},
		5: {
			start: 4,
			base: 5
		},
		6: {
			start: 6,
			base: 7
		},
		7: {
			start: 6,
			base: 7
		},
		8: {
			start: 8,
			base: 9
		},
		9: {
			start: 8,
			base: 9
		},
		10: {
			start: 10,
			base: 10
		},
		11: {
			start: 11,
			base: 12
		},
		12: {
			start: 11,
			base: 12
		},
		13: {
			start: 11,
			base: 12
		},
		14: {
			start: 14,
			base: 15
		},
		15: {
			start: 14,
			base: 15
		},
		16: {
			start: 16,
			base: 17
		},
		17: {
			start: 16,
			base: 17
		},
		18: {
			start: 18,
			base: 19
		},
		19: {
			start: 18,
			base: 19
		},
		20: {
			start: 18,
			base: 19
		},
		21: {
			start: 18,
			base: 19
		}
	};

	function a0(hQ) {
		this._canvas2dMapMgr = hQ;
		var i = this.ratio = hQ._map.config.ratio;
		this._featureStyle = null;
		this._map = hQ._map;
		var T = fz();
		var e = "udt=" + T.udt + "&v=" + T.ver;
		this.sizeRatio = this.ratio > 1 ? 2 : 1;
		this._binaryCache = {};
		this._iconCache = {};
		this._initColorCanvas()
	}
	C.extend(a0.prototype, {
		_initColorCanvas: function() {
			var i = 256,
				T = S("canvas"),
				e = T.style;
			e.width = i + "px";
			e.height = i + "px";
			T.width = i;
			T.height = i;
			this._colorCvs = T;
			this._colorCtx = T.getContext("2d")
		},
		parseLabelData: function(i, hS, hR, hQ, e, hV, hU) {
			if(!this._featureStyle) {
				this._featureStyle = this._canvas2dMapMgr.getStyle()
			}
			if(!i || !i[0]) {
				hU([]);
				return
			}
			var hT = this._map.getZoomUnits();
			var T = this;
			this.loadTextPng(i, hV, hS, hR, hQ, e, hT, hU)
		},
		loadTextPng: function(h7, hY, hW, hV, hT, i, hR, hQ) {
			var h6 = this;
			var e = h7[5];
			var h5 = this._map;
			var h2 = h5.getZoom();
			var T = h5.getSize();
			var h3 = T.width;
			var h1 = T.height;
			var h4 = h5.getCenterIn();
			var hU = h4.lng;
			var hS = h4.lat;
			var h0 = hW * hY * hR;
			var hZ = (hV + 1) * hY * hR;
			if(e) {
				var hX = new Image();
				hX.onload = function() {
					h6.calcIconAndTextInfo(h7, hX, hY, hW, hV, hT, i, hR, h0, hZ, hQ);
					delete this.onload
				};
				hX.src = e
			} else {
				setTimeout(function() {
					h6.calcIconAndTextInfo(h7, null, hY, hW, hV, hT, i, hR, h0, hZ, hQ)
				}, 1)
			}
		},
		calcIconAndTextInfo: function(h9, h0, h1, hZ, hW, hU, hQ, hS, h3, h2, hR) {
			var h8 = this;
			var h7 = h8._featureStyle;
			var hX = [];
			hX.x = hZ;
			hX.y = hW;
			hX.z = hU;
			var hY = h8._canvas2dMapMgr,
				T = hZ * hS * h1,
				h6 = (hW + 1) * hS * h1,
				hT = {
					tileLeft: T,
					tileTop: h6,
					zoomUnits: hS
				};
			var e = [];
			if(h9[0]) {
				for(var h4 = 0; h4 < h9[0].length; h4++) {
					if(h9[0][h4][0] === hM) {
						e.push(h9[0][h4])
					}
				}
			}
			var hV = h9[2] || [];
			for(var h4 = 0; h4 < e.length; h4++) {
				this._getFixedLabelInfo(e[h4], h0, hQ, hS, h1, h3, h2, hX)
			}
			var h5 = Math.pow(2, hQ - hU);
			for(h4 = 0; h4 < hV.length; h4++) {
				this._getLineLabelInfo(hV[h4], h0, hU, hQ, hS, h1, h3, h2, h5, hX)
			}
			hR(hX)
		},
		_getFixedLabelInfo: function(h0, h4, hR, hV, h5, h8, h7, ia) {
			var hZ = h0[1];
			if(!hZ) {
				return
			}
			var ic = this._map.getZoom();
			var il = this._map.config.style;
			var im = this._featureStyle;
			var hW = hR;
			if(hW === 9) {
				hW = 8
			}
			for(var ii = 0; ii < hZ.length; ii++) {
				var io = hZ[ii];
				var e = io[0];
				var hQ = el.getStyleFromCache(il, e, "point", hW, im);
				var ih = el.getStyleFromCache(il, e, "pointText", hW, im);
				if((!ih || ih.length === 0) && (!hQ || hQ.length === 0)) {
					if(hW === 5) {
						var hU = io[1];
						if(!hU) {
							continue
						}
						for(var id = 0; id < hU.length; id++) {
							var ib = hU[id][4];
							if(ib && ib[7] === "北京") {
								hQ = el.getStyleFromCache(il, e, "point", 6, im);
								ih = el.getStyleFromCache(il, e, "pointText", 6, im);
								break
							} else {
								continue
							}
						}
					} else {
						continue
					}
				}
				var hU = io[1];
				if(!hU) {
					continue
				}
				var ij = null;
				var hX = 1;
				var T = 0;
				var h3 = 0;
				if(hQ && hQ[0]) {
					hQ = hQ[0];
					ij = hQ.icon;
					hX = hQ.zoom ? hQ.zoom / 100 : 1
				} else {
					hQ = null
				}
				for(var id = 0; id < hU.length; id++) {
					var ib = hU[id][4];
					if(!ib) {
						continue
					}
					var ig = ib[2];
					if(!this._isVisible(ig, ic)) {
						continue
					}
					var hY = ib[12];
					if(ih && ih.length > 0 && !hY) {
						continue
					}
					var h2 = Math.round(ib[0] / 100);
					var h1 = Math.round(ib[1] / 100);
					var ie = {
						lng: h8 + h2,
						lat: h7 - (h5 * hV - h1)
					};
					var hT = h2 / hV;
					var hS = h5 - h1 / hV;
					var h6 = ib[7] || "";
					var ik = ib[5];
					var h9 = {
						type: "fixed",
						name: h6,
						textImg: h4,
						rank: ib[4],
						baseX: hT,
						baseY: hS,
						iconPos: null,
						textPos: null,
						guid: ib[3] || "",
						tracer: ig,
						direction: ik,
						startScale: 3
					};
					if((ik !== dX && hY || !hY) && ij !== null) {
						h9.iconPos = this._getIconPosition(ij, hX, hT, hS, ie);
						if(h9.iconPos) {
							T = h9.iconPos.width;
							h3 = h9.iconPos.height
						}
					}
					if(T === 0) {
						h9.direction = dX
					}
					if(hY) {
						h9.textPos = this._getTextDrawData(ib, hT, hS, T, h3)
					}
					if(h9.textPos || h9.iconPos) {
						ia.push(h9)
					}
				}
			}
		},
		_isVisible: function(e, i) {
			var hQ;
			if(!this._binaryCache[e]) {
				hQ = e.toString(2);
				if(hQ.length < 8) {
					hQ = new Array(8 - hQ.length + 1).join("0") + hQ
				}
				this._binaryCache[e] = hQ
			}
			hQ = this._binaryCache[e];
			var T = I[i].start;
			return hQ[i - T] === "1"
		},
		_getIconPosition: function(hU, hS, T, i, e) {
			var hQ = this._map.config.style;
			var hV = bo["iconSetInfo" + hQ][hU];
			if(!hV) {
				if(hU.charCodeAt(0) >= 48 && hU.charCodeAt(0) <= 57) {
					hV = bo["iconSetInfo" + hQ]["_" + hU]
				}
			}
			if(!hV) {
				return null
			}
			var hR = hV[0];
			var hT = hV[1];
			hR = hR * hS;
			hT = hT * hS;
			return {
				srcX: 0,
				srcY: 0,
				destX: T - hR / 2,
				destY: i - hT / 2,
				width: hR,
				height: hT,
				geoX: e.lng,
				geoY: e.lat,
				mcPt: e,
				iconType: hU
			}
		},
		_getTextDrawData: function(h1, h0, hZ, hQ, hX) {
			var h6 = h1[5];
			if(typeof h6 !== "number") {
				h6 = 0
			}
			var hV = this.ratio;
			var hU = hV / 2;
			hQ *= hU;
			hX *= hU;
			var hW = h1[12];
			var hR = hW.length;
			var h9 = 0;
			var h8 = 0;
			var h5 = [];
			var h4 = 0;
			var h7 = 0;
			for(var h3 = 0; h3 < hR; h3++) {
				h7 += Math.round(hW[h3][3])
			}
			for(var h3 = 0; h3 < hR; h3++) {
				var hT = hW[h3];
				var hS = hT[0];
				var i = hT[1];
				var T = hT[2];
				var e = hT[3];
				var ia = 2 * hV;
				var h2 = 0;
				if(hQ !== 0) {
					h2 = 2 * hV
				}
				if(hQ === 0) {
					h6 = dX
				}
				switch(h6) {
					case hp:
						var hY = hZ - h7 / 2 - ia * (hR - 1) / 2;
						h9 = h0 - T - hQ / 2 - h2;
						h8 = hY + h4 + ia * h3;
						break;
					case hJ:
						var hY = hZ - h7 / 2 - ia * (hR - 1) / 2;
						h9 = h0 + hQ / 2 + h2;
						h8 = hY + h4 + ia * h3;
						break;
					case ff:
						var hY = hZ - hX / 2 - h7 - ia * (hR - 1) - ia;
						h9 = h0 - T / 2;
						h8 = hY + h4 + ia * h3;
						break;
					case d0:
						var hY = hZ + hX / 2 + ia / 2;
						h9 = h0 - T / 2;
						h8 = hY + h4 + ia * h3;
						break;
					case dX:
						var hY = hZ - e / 2 - ia * (hR - 1) / 2;
						h9 = h0 - T / 2;
						h8 = hY + h4 + ia * h3;
						break
				}
				h4 += e;
				if(T > 0 && e > 0) {
					h5.push({
						srcX: hS,
						srcY: i,
						destX: h9,
						destY: h8,
						width: T,
						height: e
					})
				}
			}
			if(h5.length > 0) {
				return h5
			}
			return null
		},
		_getLineLabelInfo: function(hY, hQ, hR, id, it, h5, ib, ia, ic, h4) {
			if(hY.length !== 10) {
				return
			}
			var ig = this.ratio;
			var T = this.ratio;
			var io = hY[7].length;
			var h6 = hY[1];
			var iq = hY[3];
			var ix = hY[8];
			var hU = hY[4];
			var e = 2;
			var hS = hU.slice(0, e);
			for(var iu = e; iu < hU.length; iu += e) {
				hS[iu] = hS[iu - e] + hU[iu];
				hS[iu + 1] = hS[iu - (e - 1)] + hU[iu + 1]
			}
			for(var iu = e; iu < hU.length; iu += e) {
				if(iu % (iq * e) === 0 || iu % (iq * e) === 1) {
					continue
				}
				hS[iu] = hS[iu - e] + hU[iu] / ic;
				hS[iu + 1] = hS[iu - (e - 1)] + hU[iu + 1] / ic
			}
			for(var iw = 0; iw < io; iw++) {
				var ir = hY[7][iw];
				if(!this._isVisible(ir, id)) {
					continue
				}
				var ii = hY[6][iw];
				var h3 = iw * iq * e;
				hU = hS.slice(h3, h3 + iq * e);
				var h7 = [];
				var ih = undefined;
				var ie = undefined;
				var h2 = undefined;
				var h1 = undefined;
				var ix = hY[9].slice(0);
				if(ii) {
					ix.reverse()
				}
				var il;
				var ij;
				for(var iv = 0; iv < iq; iv++) {
					var h0 = hY[5][iq * iw + iv];
					var im = hU[iv * e] / 100;
					var ik = hU[iv * e + 1] / 100;
					var hZ = ix[iv];
					var hV = hZ[0];
					var hX = hZ[1];
					var hT = hZ[2];
					var hW = hZ[3];
					var h9;
					var h8;
					var iz;
					var iy;
					if(iv === 0) {
						il = iz = im / it;
						ij = h5 - ik / it;
						iy = ik / it
					} else {
						iz = im / it;
						iy = ik / it
					}
					var iB = il + (iz - il) * T - hT / 2;
					var iA = ij + (h5 - iy - ij) * T - hW / 2;
					if(ih === undefined) {
						ih = il - hT / 2;
						ie = ij - hW / 2;
						h2 = ih + hT;
						h1 = ie + hW
					} else {
						if(iB < ih) {
							ih = iB
						}
						if(iA < ie) {
							ie = iA
						}
						if(iB + hT > h2) {
							h2 = iB + hT
						}
						if(iA + hW > h1) {
							h1 = iA + hW
						}
					}
					h7.push({
						angle: h0,
						srcX: hV,
						srcY: hX,
						destX: iB,
						destY: iA,
						width: hT,
						height: hW
					})
				}
				var ip = {
					type: "line",
					textImg: hQ,
					rank: h6,
					baseX: il,
					baseY: ij,
					arrWordPos: h7,
					minXOriginal: ih,
					minYOriginal: ie,
					maxXOriginal: h2,
					maxYOriginal: h1,
					text: ""
				};
				h4.push(ip)
			}
		},
		alterColor: function(hT, e, hS) {
			var T = this._colorCtx,
				i = this._canvas2dMapMgr;
			T.clearRect(0, 0, hT.width, hT.height);
			T.drawImage(e, hT.srcX, hT.srcY, hT.width, hT.height, 0, 0, hT.width, hT.height);
			var hR = T.getImageData(0, 0, hT.width, hT.height),
				hQ = i.getFilterImageData(hR, hS);
			T.putImageData(hQ, 0, 0)
		},
		drawIconAndText: function(h5, h4, e) {
			var hW = this.ratio;
			var hU = this.sizeRatio / hW;
			var hY = 2 / hW;
			var ih = this;
			for(var h8 = 0, h6 = h4.length; h8 < h6; h8++) {
				var hX = h4[h8];
				if(hX.isDel == false) {
					var hR = hX.baseDrawX;
					var hQ = hX.baseDrawY;
					if(hX.type == "fixed") {
						var hT = hX.iconPos,
							h9 = hX.textPos,
							h2 = hX.textImg,
							ic = hX.startScale;
						if(hT && ic <= e) {
							var T = this._iconCache[hT.iconType];
							if(T) {
								if(T.img) {
									h5.drawImage(T.img, 0, 0, T.img.width, T.img.height, Math.round(hR * hW + (hT.drawX - hR) / hY), Math.round(hQ * hW + (hT.drawY - hQ) / hY), hT.width / hY, hT.height / hY)
								} else {
									T.drawLabels.push(hX)
								}
							} else {
								if(!T) {
									this._iconCache[hT.iconType] = {
										img: null,
										drawLabels: [hX]
									};
									var ij = new Image();
									ij._iconName = hT.iconType;
									ij.onload = function() {
										var iq = ih._iconCache[this._iconName];
										iq.img = this;
										this.onload = null;
										for(var il = 0; il < iq.drawLabels.length; il++) {
											var io = iq.drawLabels[il];
											var im = io.baseDrawX;
											var ik = io.baseDrawY;
											var ip = io.iconPos;
											h5.drawImage(this, 0, 0, this.width, this.height, Math.round(im * hW + (ip.drawX - im) / hY), Math.round(ik * hW + (ip.drawY - ik) / hY), ip.width / hY, ip.height / hY)
										}
										iq.drawPos = []
									};
									ij.src = e3.getIconSetPath(ih._map.config.style) + hT.iconType + ".png"
								}
							}
						}
						if(h9 && h2 && ic <= e) {
							for(var hV = 0; hV < h9.length; hV++) {
								var h3 = h9[hV];
								if(!hX._tempRank) {
									h5.drawImage(h2, h3.srcX, h3.srcY, h3.width, h3.height, Math.round(hR * hW + (h3.drawX - hR) / hU), Math.round(hQ * hW + (h3.drawY - hQ) / hU), h3.width / hU, h3.height / hU)
								} else {
									this.alterColor(h3, h2, hX._tempRank);
									h5.drawImage(this._colorCvs, 0, 0, h3.width, h3.height, Math.round(hR * hW + (h3.drawX - hR) / hU), Math.round(hQ * hW + (h3.drawY - hQ) / hU), h3.width / hU, h3.height / hU)
								}
							}
						}
					} else {
						var hS = hX.arrWordPos,
							h2 = hX.textImg,
							h1 = hX.tileX,
							hZ = hX.tileY;
						for(var h7 = 0, h0 = hS.length; h7 < h0; h7++) {
							var ia = hS[h7];
							var ii = Math.round(h1 + ia.destX);
							var ig = Math.round(hZ + ia.destY);
							var ib = ia.angle;
							ii = hR * hW + ii - hR;
							ig = hQ * hW + ig - hQ;
							if(ib > 10 && ib < 350) {
								h5.save();
								var ie = Math.round(ii + ia.width / 2);
								var id = Math.round(ig + ia.height / 2);
								h5.translate(ie, id);
								h5.rotate(-ib / 180 * Math.PI);
								h5.drawImage(h2, ia.srcX, ia.srcY, ia.width, ia.height, -Math.round(ia.width / 2), -Math.round(ia.height / 2), ia.width / hU, ia.height / hU);
								h5.restore()
							} else {
								h5.drawImage(h2, ia.srcX, ia.srcY, ia.width, ia.height, ii, ig, ia.width / hU, ia.height / hU)
							}
						}
					}
				}
			}
		},
		isCollide: function(hS, h1, h0, e, hU, T, hW) {
			for(var hR = 0, hQ = T.length; hR < hQ; hR++) {
				var hV = T[hR],
					hT = 1 / Math.pow(2, hW + 1),
					hZ = hT * hV[3] / 2,
					hY = hT * hV[4] / 2,
					hX = hV[0];
				if(hX != hS) {
					if(!(h1 + e < hV[1] - hZ || h1 > hV[1] + hV[3] + hZ || h0 + hU < hV[2] - hY || h0 > hV[2] + hV[4] + hY)) {
						return true
					}
				}
			}
			return false
		},
		zoomingIconAndText: function(ih, ia, hQ, ie, ig, iK, ip, hY, iw, io, h7) {
			var iL = this.ratio;
			var hZ = this.sizeRatio / iL;
			var iM = 2 / iL;
			var iW = iL / 2;
			var iG = ie.x;
			var iF = ie.y;
			var ii = 2 * iL;
			if(h7 !== 0) {
				iF += io
			}
			var h2 = undefined,
				hV = undefined,
				hS = undefined,
				hX = undefined,
				h6 = undefined;
			var iv = iK > 0 ? true : false;
			if(!iv) {
				h2 = [];
				var iz = 1 - ip
			}
			for(var iS = 0, iQ = ia.length; iS < iQ; iS++) {
				var iN = ia[iS];
				if(iN.isDel == false) {
					var iX = iN.baseDrawX;
					var iU = iN.baseDrawY;
					ih.save();
					ih.translate(-hY * iL, -iw * iL);
					if(iN.isFadeout) {
						if(!iv && iN._schedule <= ip && !iN._isIgnore) {
							ih.globalAlpha = iz;
							iN._schedule = ip
						} else {
							iN._isIgnore = true;
							continue
						}
					}
					if(iN.type == "fixed") {
						var ij = iN.iconPos,
							ir = iN.textPos,
							hT = iN.textImg,
							ik = iN.startScale;
						var T;
						var iD = 0;
						if(ij) {
							iD = ii
						}
						if(ij && !iN.iconImg && this._iconCache[ij.iconType]) {
							T = this._iconCache[ij.iconType].img
						}
						if(ij && ik <= ig && T) {
							hX = ij.width;
							h6 = ij.height;
							hV = (iG + (iX - iG) * hQ) * iL - hX / 2 / iM;
							hS = (iF + (iU - iF) * hQ) * iL - h6 / 2 / iM + h7;
							if(!iv && this.isCollide(iS, hV, hS, hX, h6, h2, iK)) {
								iN.isFadeout = true
							}
							ih.drawImage(T, ij.srcX, ij.srcY, T.width, T.height, Math.round(hV), Math.round(hS), hX / iM, h6 / iM);
							!iv && h2.push([iS, hV, hS, hX, h6])
						}
						if(ir && hT && ik <= ig) {
							var iq;
							var it;
							var h9 = 0;
							var im = 0;
							if(ij) {
								h9 = ij.width;
								im = ij.height
							}
							var iE = ir.length;
							var h1 = 0;
							var iu = 0;
							for(var ib = 0; ib < iE; ib++) {
								var iP = ir[ib];
								iu += iP.height;
								if(h1 < iP.width) {
									h1 = iP.width
								}
							}
							iu += (ib - 1) * ii;
							if(!iv && this.isCollide(iS, hV, hS, h1, iu, h2, iK)) {
								iN.isFadeout = true
							}
							var iO = 0;
							for(var ib = 0; ib < iE; ib++) {
								var iP = ir[ib];
								switch(iN.direction) {
									case hp:
										iq = -(h9 / 2 / iM + iP.width + iD);
										it = -iu / 2 + iO + ii * ib;
										break;
									case hJ:
										iq = h9 / 2 / iM + iD;
										it = -iu / 2 + iO + ii * ib;
										break;
									case ff:
										iq = -iP.width / 2;
										it = -im / 2 / iM - iu + iO - ii * (ib + 1);
										break;
									case d0:
										iq = -iP.width / 2;
										it = im / 2 / iM + iO + ii * (ib + 1);
										break;
									case dX:
										iq = -iP.width / 2;
										it = -iu / 2 + iO + ii * ib;
										break
								}
								iO += iP.height;
								hV = (iG + (iX - iG) * hQ) * iL + iq / hZ;
								hS = (iF + (iU - iF) * hQ) * iL + it / hZ; + h7;
								hX = iP.width;
								h6 = iP.height;
								if(!iN._tempRank) {
									ih.drawImage(hT, iP.srcX, iP.srcY, hX, h6, Math.round(hV), Math.round(hS), hX / hZ, h6 / hZ)
								} else {
									this.alterColor(iP, hT, iN._tempRank);
									ih.drawImage(this._colorCvs, 0, 0, hX, h6, Math.round(hV), Math.round(hS), hX / hZ, h6 / hZ)
								}!iv && h2.push([iS, hV, hS, hX, h6])
							}
						}
					} else {
						var h8 = iN.arrWordPos,
							hT = iN.textImg,
							iV = iN.tileX,
							iT = iN.tileY;
						var h0 = h8[0];
						var hW = Math.round(iV + h0.destX);
						var hU = Math.round(iT + h0.destY);
						for(var iR = 0, iC = h8.length; iR < iC; iR++) {
							var iJ = h8[iR];
							var iZ = Math.round(iV + iJ.destX);
							var iY = Math.round(iT + iJ.destY);
							var id = iJ.angle;
							var iB = Math.round((iG + (iX - iG) * hQ) * iL - h0.width / 2 + iZ - hW);
							var iA = Math.round((iF + (iU - iF) * hQ) * iL - h0.height / 2 + iY - hU);
							hV = iB;
							hS = iA;
							hX = iJ.width;
							h6 = iJ.height;
							if(!iv && this.isCollide(iS, hV, hS, hX, h6, h2, iK)) {
								iN.isFadeout = true
							}
							if(id > 10 && id < 350) {
								var iI = iB + iJ.width / 2;
								var iH = iA + iJ.height / 2;
								var hR = id / 180 * Math.PI;
								var il = Math.cos(hR);
								var h3 = Math.sin(hR);
								var iy = il;
								var h4 = il;
								var ix = h3;
								var h5 = -h3;
								var ic = iI - iI * il - iH * h3;
								var e = iH + iI * h3 - iH * il;
								ih.save();
								ih.transform(iy, h5, ix, h4, ic, e);
								ih.drawImage(hT, iJ.srcX, iJ.srcY, hX, h6, hV, hS, hX / hZ, h6 / hZ);
								ih.restore()
							} else {
								ih.drawImage(hT, iJ.srcX, iJ.srcY, hX, h6, hV, hS, hX / hZ, h6 / hZ)
							}!iv && h2.push([iS, hV, hS, hX, h6])
						}
					}
					ih.restore()
				}
			}
		}
	});

	function gM(e) {
		this.initVars(e)
	}
	C.extend(gM.prototype, {
		initVars: function(e) {
			this._map = e._map;
			this._canvas2dMapMgr = e;
			this.base64Prefix = "data:image/png;base64,";
			this.bizData = null;
			this.objTextsPng = null;
			this.arrIconsPng = null;
			this.bizLabels = null
		},
		proecessBizData: function(hS, hW) {
			var hU = this;
			this.bizData = hS;
			this.objTextsPng = null;
			this.arrIconsPng = null;
			var T = hS.textsPng;
			var hY = hS.iconsPng;
			if(!T || !hY) {
				return
			}
			var hV = new Image();
			hV.onload = function() {
				hU.objTextsPng = this;
				hU.calcIconAndTextInfo(hW);
				this.onload = null
			};
			hV.src = this.base64Prefix + T;
			var hX = hY.length;
			var e = [];
			for(var hR = 0; hR < hX; hR++) {
				var hT = hY[hR];
				var hQ = new Image();
				(function(i) {
					hQ.onload = function() {
						hX--;
						e[i] = this;
						if(hX === 0) {
							hU.arrIconsPng = e;
							hU.calcIconAndTextInfo(hW)
						}
						this.onload = null
					}
				})(hR);
				hQ.src = this.base64Prefix + hT
			}
		},
		calcIconAndTextInfo: function(hZ) {
			if(this.objTextsPng && this.arrIconsPng) {
				var hV = this.bizData;
				var hT = hV.pois;
				var e = [];
				for(var hW = 0, hS = hT.length; hW < hS; hW++) {
					var hQ = hT[hW];
					var hU = this.arrIconsPng[hQ.iconPng];
					var hR = hU.height / 2;
					var hY = {
						type: "fixed",
						name: "",
						textImg: this.objTextsPng,
						iconImg: hU,
						rank: hQ.rank,
						iconPos: {
							srcX: 0,
							srcY: 0,
							destX: -hU.width / 2,
							destY: -hR / 2,
							width: hU.width,
							height: hR,
							geoX: hQ.x,
							geoY: hQ.y,
							iconType: "vectorCustom"
						},
						textPos: this.calcTextPos(hQ.pos, hU),
						startScale: hQ.from < 12 ? 12 : hQ.from,
						guid: hQ.guid,
						guidExt: 1,
						adver_log: hQ.adver_log || ""
					};
					var T = {
						type: "fixed",
						textDirLeft: "left",
						name: "",
						textImg: this.objTextsPng,
						iconImg: hU,
						rank: hQ.rank,
						iconPos: {
							srcX: 0,
							srcY: 0,
							destX: -hU.width / 2,
							destY: -hR / 2,
							width: hU.width,
							height: hR,
							geoX: hQ.x,
							geoY: hQ.y,
							iconType: "vectorCustom"
						},
						textPos: this.calcTextPosLeft(hQ.pos, hU),
						startScale: hQ.from < 12 ? 12 : hQ.from,
						guid: hQ.guid,
						guidExt: 1,
						adver_log: hQ.adver_log || ""
					};
					var hX = [hY, T];
					e.push(hX)
				}
				this.bizLabels = e;
				hZ && hZ()
			}
		},
		calcTextPos: function(hT, T) {
			var i = [];
			var hS = hT.length / 4;
			var hR = T.width / 2;
			if(hS === 1) {
				var hQ = {
					srcX: hT[0],
					srcY: hT[1],
					destX: hR,
					destY: -hT[3] / 2,
					width: hT[2],
					height: hT[3]
				};
				i.push(hQ)
			} else {
				var hQ = {
					srcX: hT[0],
					srcY: hT[1],
					destX: hR,
					destY: -hT[3],
					width: hT[2],
					height: hT[3]
				};
				var e = {
					srcX: hT[4],
					srcY: hT[5],
					destX: hR,
					destY: 0,
					width: hT[6],
					height: hT[7]
				};
				i.push(hQ);
				i.push(e)
			}
			return i
		},
		calcTextPosLeft: function(hT, T) {
			var i = [];
			var hS = hT.length / 4;
			var hR = T.width / 2;
			if(hS === 1) {
				var hQ = {
					srcX: hT[0],
					srcY: hT[1],
					destX: -hR - hT[2],
					destY: -hT[3] / 2,
					width: hT[2],
					height: hT[3]
				};
				i.push(hQ)
			} else {
				var hQ = {
					srcX: hT[0],
					srcY: hT[1],
					destX: -hR - hT[2],
					destY: -hT[3],
					width: hT[2],
					height: hT[3]
				};
				var e = {
					srcX: hT[4],
					srcY: hT[5],
					destX: -hR - hT[2],
					destY: 0,
					width: hT[6],
					height: hT[7]
				};
				i.push(hQ);
				i.push(e)
			}
			return i
		},
		clearBizData: function() {
			this.bizData = null;
			this.bizLabels = null
		}
	});

	function c7() {}
	C.extend(c7.prototype, {
		centerAndZoomIn: function(T, hW, hX) {
			hX = hX || {};
			if(!this.loaded) {
				this.firstTileLoad = false
			}
			hW = this._getProperZoom(hW).zoom;
			if(hX.noAnimation !== true && this.loaded) {
				var hS = this._ifUseAnimation(T, hW);
				if(hS) {
					this.flyToIn(T, hW, hX);
					return
				}
			}
			var hU = this;
			if(!T && !hW) {
				return
			}
			this._stopAllAnimations();
			if(T && !T.equals(this.centerPoint)) {
				this.fire(new bb("oncenter_changed"))
			}
			if(hW && hW !== this.zoomLevel) {
				this.fire(new bb("onzoom_changed"))
			}
			T = T || this.centerPoint;
			hW = hW || this.zoomLevel;
			hW = this._getProperZoom(hW).zoom;
			if(this.mapType === BMAP_EARTH_MAP) {
				if(!this._earth) {
					this.mapType = BMAPGL_NORMAL_MAP;
					this.temp.originMapType = BMAP_EARTH_MAP;

					function hV() {
						hU._earth = new bo.Earth(hU, {
							showRealSunlight: hU.config.showRealSunlight,
							showMilkyway: hU.config.showMilkyway,
							earthBackground: hU.config.earthBackground
						});
						hU._proxyEarthEvents();
						hU._changeEarthMapType(BMAP_EARTH_MAP);
						C.extend(hU, bo.EarthView.prototype);
						delete hU.temp.originMapType
					}
					ea.load("earth", function() {
						if(bo["FeatureStyle" + hU.config.style]) {
							hV()
						} else {
							hU.loadMapStyleFiles(function() {
								hV()
							})
						}
					})
				}
			}
			this.lastLevel = this.zoomLevel || hW;
			this.zoomLevel = hW;
			var hT = new bb("onload");
			hT.point = T;
			hT.zoom = hW;
			this.centerPoint = new hr(T.lng, T.lat);
			this.defaultZoomLevel = this.defaultZoomLevel || this.zoomLevel;
			this.defaultCenter = this.defaultCenter || this.centerPoint;
			if(this.mapType !== BMAP_EARTH_MAP) {
				this.centerPoint = this.restrictCenter(this.centerPoint)
			}
			if(!this.loaded && !(this.temp.originMapType === BMAP_EARTH_MAP)) {
				var i = this.config.defaultMaxBounds;
				var hR = new c5(i, "baidu", this.mapType);
				var hQ = new cR({
					mapType: this.mapType,
					copyright: hR,
					dataType: gs,
					customLayer: false,
					baseLayer: true,
					tileTypeName: "na"
				});
				hQ._isInnerLayer = true;
				this.addTileLayer(hQ);
				if(this.mapType === BMAP_SATELLITE_MAP && this._isHybridShow === true) {
					this._addHybirdMap()
				}
				this.baseLayerAdded = true;
				this.on("zoom_changed", function() {
					if(this._heading === 0) {
						return
					}
					if(this.getZoom() < 7 && this.config.restrictCenter === true) {
						hU.resetHeading()
					}
				})
			}
			this.loaded = true;
			this.dispatchEvent(hT);
			hX.callback && hX.callback()
		},
		_ifUseAnimation: function(hQ, hV) {
			var hU = this.getSize();
			var T = {
				zoom: this.zoomLevel
			};
			var hX = {
				zoom: hV
			};
			var hW = this.pointToPixelIn(this.centerPoint);
			var hR = this.pointToPixelIn(hQ, T);
			var hT = this.pointToPixelIn(this.centerPoint, hX);
			var hZ = this.pointToPixelIn(hQ, hX);
			var hS = Math.abs(hW.x - hR.x);
			var i = Math.abs(hW.y - hR.y);
			var e = Math.abs(hT.x - hZ.x);
			var hY = Math.abs(hT.y - hZ.y);
			if((hS > hU.width || i > hU.height) && (e > hU.width || hY > hU.height)) {
				return false
			}
			return true
		},
		_setPlatformPosition: function(hX, hW, hZ) {
			hZ = hZ || {};
			if(hX === 0 && hW === 0 && !hZ.point) {
				return
			}
			if(isNaN(hZ.initMapOffsetX)) {
				hZ.initMapOffsetX = this.offsetX
			}
			if(isNaN(hZ.initMapOffsetY)) {
				hZ.initMapOffsetY = this.offsetY
			}
			var hT = dK(this._heading);
			if(this._tilt > 0) {
				hW = hW / Math.cos(dK(this._tilt))
			}
			var hY = hX * Math.cos(hT) + hW * Math.sin(hT);
			var hV = -hX * Math.sin(hT) + hW * Math.cos(hT);
			hY = hY + hZ.initMapOffsetX;
			hV = hV + hZ.initMapOffsetY;
			if(hZ.point) {
				var i = this.restrictCenter(hZ.point);
				if(!i.equals(this.centerPoint)) {
					this.centerPoint = i.clone();
					this.fire(new bb("oncenter_changed"))
				}
			} else {
				var hQ = this.offsetX - hY;
				var e = this.offsetY - hV;
				var hU = this.centerPoint.lng;
				var hS = this.centerPoint.lat;
				var hR = new hr(hU, hS);
				var T = this.getZoomUnits();
				this.centerPoint = this.restrictCenter(new hr(hR.lng + hQ * T, hR.lat - e * T), T);
				this.fire(new bb("oncenter_changed"))
			}
			this.offsetX = hY;
			this.offsetY = hV;
			this.dispatchEvent(new bb("onmoving"))
		},
		restrictCenter: function(hQ, hR) {
			if(this.config.restrictCenter === false) {
				return hQ
			}
			hR = hR || this.getZoomUnits();
			var T = this.pixelToPointIn(new ej(0, 0), {
				center: hQ
			});
			var i = this.pixelToPointIn(new ej(0, this.height), {
				center: hQ
			});
			if(this.zoomLevel < 5) {
				if(T.lat > c8.MAX_LAT && i.lat < c8.MIN_LAT) {
					var hS = c8.MAX_LAT - hQ.lat;
					var e = hQ.lat - c8.MIN_LAT;
					var hU;
					if(hS < e) {
						hU = hS / (this.height / 2)
					} else {
						hU = e / (this.height / 2)
					}
					var hT = 18 - eC(hU);
					this.zoomLevel = hT;
					return hQ
				}
			}
			if(T.lat > c8.MAX_LAT) {
				hQ.lat = c8.MAX_LAT - this.height / 2 * hR
			} else {
				if(i.lat < c8.MIN_LAT) {
					hQ.lat = c8.MIN_LAT + this.height / 2 * hR
				}
			}
			return hQ
		},
		zoomTo: function(e, h1, h2) {
			var hX = b6[this.mapType];
			if(!hX) {
				return
			}
			var hW = this._getProperZoom(e);
			e = hW.zoom;
			if(this.zoomLevel === e) {
				h2.callback && h2.callback();
				return
			}
			var hS = e;
			this.lastLevel = this.zoomLevel;
			h2 = h2 || {};
			if(this.zoomEventStatus === "idle") {
				this.fire(new bb("onzoomstart"));
				this.zoomEventStatus = "zooming"
			}
			if(!h1 && (this.getInfoWindow() && this.temp.infoWin && this.temp.infoWin.isOpen())) {
				h1 = this.getInfoWindow().getPoint()
			}
			var T = null;
			if(h2.fixPixel) {
				T = h2.fixPixel
			} else {
				if(h1) {
					T = this.pointToPixelIn(h1, {
						useRound: false
					})
				}
			}
			var hT = this.pixelToPointIn(T);
			var hU = this.centerPoint.clone();
			this.fixPoint = h1;
			this.fixPixel = T;
			this.fixCenter = hU;
			this.mousePosMCPoint = hT;
			if(h2.noAnimation) {
				e = hW.zoom;
				this.zoomLevel = e;
				this.fire(new bb("onzoom_changed"));
				var hR = this.getCurrentMaxTilt();
				if(this._tilt > hR) {
					this._tilt = hR
				}
				if(h1) {
					if(this._heading % 360 !== 0 || this._tilt > 0) {
						var i = this._webglMapCamera.fromScreenPixelToMC(T.x, T.y, {
							center: hU,
							zoom: this.zoomLevel
						});
						if(i) {
							var hY = i.sub(hT);
							var hQ = hU.sub(hY);
							this.centerPoint = this.restrictCenter(hQ)
						}
					} else {
						var hV = this.getZoomUnits();
						var hQ = new hr(h1.lng - hV * (T.x - this.width / 2), h1.lat + hV * (T.y - this.height / 2));
						this.centerPoint = this.restrictCenter(hQ, hV)
					}
					this.fire(new bb("oncenter_changed"))
				}
				this._checkFireZoomend();
				h2.callback && h2.callback();
				return
			}
			this._animationInfo.zoom = {
				current: this.zoomLevel,
				diff: e - this.zoomLevel,
				target: e
			};
			var hZ = this;
			hZ._checkFireZoomend();
			var h0 = this._tilt;
			if(this.fixPoint || h0 > c8.MAX_DRAG_TILT_L2) {
				h2.renderCallback = function() {
					var h6 = hZ.getCurrentMaxTilt();
					if(hZ._tilt > h6) {
						hZ._tilt = h6
					}
					var h7 = hZ.fixPixel;
					if(!hZ.fixPixel || !hZ.fixPoint) {
						return
					}
					var h3 = hZ.fixPixel;
					var id = hZ.fixPoint;
					var ia = hZ.fixCenter;
					var h8 = hZ.mousePosMCPoint;
					if(hZ._heading % 360 !== 0 || hZ._tilt > 0) {
						var h4 = hZ._webglMapCamera.fromScreenPixelToMC(h3.x, h3.y, {
							center: ia,
							zoom: hZ.zoomLevel,
							tilt: hZ._tilt
						});
						if(h4) {
							var ic = h4.sub(h8);
							var h5 = ia.sub(ic);
							hZ.centerPoint = hZ.restrictCenter(h5)
						}
					} else {
						var h9 = h3;
						var ib = hZ.getZoomUnits();
						var h5 = new hr(id.lng - ib * (h9.x - hZ.width / 2), id.lat + ib * (h9.y - hZ.height / 2));
						hZ.centerPoint = hZ.restrictCenter(h5, ib)
					}
					hZ.fire(new bb("oncenter_changed"))
				}
			}
			if(h2.fromMouseWheel === true) {
				this._startInfiniteZoomAnimation(h2);
				h2.callback && h2.callback();
				return
			}
			this._startAnimation(h2)
		},
		_checkFireZoomend: function() {
			var e = this;
			if(e.fireZoomendTimer) {
				clearTimeout(e.fireZoomendTimer)
			}
			e.fireZoomendTimer = setTimeout(function() {
				if(e.zoomEventStatus === "zooming") {
					e.fire(new bb("onzoomend"));
					e.zoomEventStatus = "idle"
				}
				e.fireZoomendTimer = null
			}, 150)
		},
		deepZoomMedia: function(e) {
			var i = this;
			if(!i.temp.isStdCtrlBusy) {
				i.temp.isStdCtrlBusy = true;
				i.deepZoomTo(i.zoomLevel + e);
				setTimeout(function() {
					i.temp.isStdCtrlBusy = false
				}, 400)
			}
		},
		deepZoomTo: function(e) {
			this.zoomTo(e)
		},
		flyToIn: function(T, il, h5) {
			h5 = h5 || {};
			var hR = this._getProperZoom(il);
			il = hR.zoom;
			if(this.centerPoint.equals(T) && this.zoomLevel === il && typeof h5.heading !== "number" && typeof h5.tilt !== "number") {
				return
			}
			var e = this.getHeading() % 360;
			var hX = this.getTilt();
			var h3 = 0;
			var h7 = 0;
			var h0 = this.getBounds().containsPoint(T);
			if(typeof h5.heading === "number") {
				h3 = h5.heading
			} else {
				if(h0) {
					h3 = e
				}
			}
			if(typeof h5.tilt === "number") {
				h7 = h5.tilt
			} else {
				if(h0) {
					h7 = hX
				}
			}
			this._heading = e;
			var ii = h3 - e;
			var id = h7 - hX;
			var h1 = this;
			var hT = this.zoomLevel;
			var hU = 1.42;
			var h9 = this.zoomScale(il - hT);
			var io = this.getZoomUnits();
			var hZ = this.centerPoint.div(io);
			var ip = T.div(io);
			var ih = this.worldSize();
			var ic = hU;
			var ib = Math.max(this.width, this.height);
			var ia = ib / h9;
			var hY = ip.sub(hZ).mag();
			var i = ic * ic;

			function ik(ir) {
				var iq = (ia * ia - ib * ib + (ir ? -1 : 1) * i * i * hY * hY) / (2 * (ir ? ia : ib) * i * hY);
				return Math.log(Math.sqrt(iq * iq + 1) - iq)
			}

			function hQ(iq) {
				return(Math.exp(iq) - Math.exp(-iq)) / 2
			}

			function hV(iq) {
				return(Math.exp(iq) + Math.exp(-iq)) / 2
			}

			function h4(iq) {
				return hQ(iq) / hV(iq)
			}
			var hW = ik(0);
			var ie = function(iq) {
				return(hV(hW) / hV(hW + ic * iq))
			};
			var ig = function(iq) {
				return ib * ((hV(hW) * h4(hW + ic * iq) - hQ(hW)) / i) / hY
			};
			var hS = (ik(1) - hW) / ic;
			if(Math.abs(hY) < 0.000001 || hS === Infinity || isNaN(hS)) {
				if(Math.abs(ib - ia) < 0.000001) {
					this._animationInfo.zoom = {
						current: this.zoomLevel,
						diff: il - this.zoomLevel
					};
					this._animationInfo.center = {
						current: this.centerPoint,
						diff: T.sub(this.centerPoint)
					};
					this._animationInfo.heading = {
						current: e,
						diff: h3 - e
					};
					this._animationInfo.tilt = {
						current: hX,
						diff: h7 - hX
					};
					this.setLock(true);
					this._startAnimation({
						callback: function(iq) {
							h1.setLock(false);
							if(h5.callback) {
								h5.callback(iq)
							}
						},
						duration: h5.duration
					});
					return
				}
				var im = ia < ib ? -1 : 1;
				hS = Math.abs(Math.log(ia / ib)) / ic;
				ig = function() {
					return 0
				};
				ie = function(iq) {
					return Math.exp(im * ic * iq)
				}
			}
			var ij = 1.7;
			if(hS < 0.3) {
				ij = 0.8
			} else {
				if(hS > 5) {
					ij = (hS - 5) / 2 + ij
				}
			}
			var h6 = h5.duration || 1000 * hS / ij;
			if(isNaN(h6)) {
				var h8 = {};
				for(var h2 in h5) {
					h8[h2] = h5[h2];
					h8.noAnimation = true
				}
				this.centerAndZoomIn(T, il, h8);
				return
			}
			this.fire(new bb("onmovestart"));
			this.fire(new bb("onzoomstart"));
			this.setLock(true);
			this._startAnimation({
				duration: h6,
				renderCallback: function(iq, ir) {
					var it = iq * hS;
					var iw = ig(it);
					var iv = hT + h1.scaleZoom(1 / ie(it));
					if(iv < h1.getMinZoom()) {
						iv = h1.getMinZoom()
					}
					if(iv > h1.getMaxZoom()) {
						iv = h1.getMaxZoom()
					}
					if(iv !== h1.zoomLevel) {
						h1.zoomLevel = iv;
						h1.fire(new bb("onzoom_changed"))
					}
					h1.centerPoint = hZ.add(ip.sub(hZ).mult(iw)).mult(io);
					h1.fire(new bb("oncenter_changed"));
					if(typeof h3 === "number") {
						var iu = iq / 0.7;
						if(iu > 1) {
							iu = 1
						}
						h1.setHeading(e + ii * iq, {
							noAnimation: true
						})
					}
					if(typeof h7 === "number") {
						h1.setTilt(hX + id * iq, {
							noAnimation: true
						})
					}
				},
				callback: function(iq, ir) {
					h1.setLock(false);
					if(ir && ir.stop === true) {
						h1.fire(new bb("onmoveend"));
						h1.fire(new bb("onzoomend"));
						h5.callback && h5.callback(iq);
						return
					}
					if(il !== h1.zoomLevel) {
						h1.zoomLevel = il;
						h1.fire(new bb("onzoom_changed"))
					}
					h1.fire(new bb("onmoveend"));
					h1.fire(new bb("onzoomend"));
					h5.callback && h5.callback(iq)
				}
			})
		},
		zoomScale: function(e) {
			return Math.pow(2, e)
		},
		scaleZoom: function(e) {
			return Math.log(e) / Math.LN2
		},
		panToIn: function(i, T) {
			T = T || {};
			if(!i || i.equals(this.centerPoint)) {
				T.callback && T.callback();
				return
			}
			var hQ = this.pointToPixelIn(i);
			var e = Math.round(this.width / 2);
			var hS = Math.round(this.height / 2);
			var hR = this._ifUseAnimation(i, this.zoomLevel);
			if(T.noAnimation === true || hR === false) {
				this._stopAllAnimations();
				this._panToIn(e - hQ.x, hS - hQ.y, i);
				T.callback && T.callback();
				return
			}
			this.flyToIn(i, this.zoomLevel, T)
		},
		_panToIn: function(i, e, hQ) {
			var T = this.temp;
			if(T.operating === true) {
				return
			}
			if(T.dragAni) {
				T.dragAni.stop(false, {
					readyToMove: true
				});
				T.dragAni = null
			}
			this.dispatchEvent(new bb("onmovestart"));
			this._setPlatformPosition(i, e, {
				point: hQ
			});
			this.dispatchEvent(new bb("onmoveend"))
		},
		_stopAllAnimations: function(e) {
			e = e || {};
			if(this._ani) {
				this._ani.stop(!!e.goToEnd, {
					stopCurrentAnimation: e.stopCurrentAnimation
				});
				this._ani = null
			}
			if(this._infiniteAni) {
				this._infiniteAni.stop();
				this._infiniteAni = null
			}
		},
		panBy: function(i, e, T) {
			i = Math.round(i) || 0;
			e = Math.round(e) || 0;
			T = T || {};
			if(Math.abs(i) <= this.width && Math.abs(e) <= this.height && T.noAnimation !== true) {
				this._panBy(i, e, T)
			} else {
				this._panToIn(i, e, T.point);
				T.callback && T.callback()
			}
		},
		_panBy: function(i, e, hR) {
			if(this.temp.operating === true) {
				return
			}
			hR = hR || {};
			this.dispatchEvent(new bb("onmovestart"));
			var hQ = this;
			var T = hQ.temp;
			T.pl = hQ.offsetX;
			T.pt = hQ.offsetY;
			if(T.tlPan) {
				T.tlPan.cancel()
			}
			if(T.dragAni) {
				T.dragAni.stop(false, {
					readyToMove: true
				});
				T.dragAni = null
			}
			T.tlPan = new o({
				fps: hR.fps || hQ.config.fps,
				duration: hR.duration || hQ.config.actionDuration,
				transition: hR.transition || cn.easeInOutQuad,
				render: function(hS) {
					this.terminative = hQ.temp.operating;
					if(hQ.temp.operating) {
						return
					}
					hQ._setPlatformPosition(i * hS, e * hS, {
						initMapOffsetX: T.pl,
						initMapOffsetY: T.pt
					})
				},
				finish: function(hS) {
					hQ.dispatchEvent(new bb("onmoveend"));
					hQ.temp.tlPan = false;
					if(hQ.temp.stopArrow === true) {
						hQ.temp.stopArrow = false;
						if(hQ.temp.arrow !== 0) {
							hQ._arrow()
						}
					}
				}
			})
		},
		_startAnimation: function(i) {
			var hR = this._animationInfo;
			var T = this;
			i = i || {};
			if(T._ani) {
				T._ani.stop(!!i.goToEnd, {
					stopCurrentAnimation: i.stopCurrentAnimation
				})
			}
			if(T._infiniteAni) {
				T._infiniteAni.stop();
				T._infiniteAni = null
			}
			var hS = i.duration || 500;
			var hT = i.transition || cn.ease;
			var e = new bb("onanimation_start");
			this.fire(e);
			if(i.unstopable) {
				hR = this._animationInfoUnstopable
			}
			var hQ = new o({
				duration: hS,
				transition: hT,
				render: function(hW, hV) {
					for(var hU in hR) {
						if(!hR.hasOwnProperty(hU)) {
							continue
						}
						var hY = hR[hU].current;
						var hX = hR[hU].diff;
						T._setValueTick(hU, hY, hX, hW)
					}
					if(i.renderCallback) {
						i.renderCallback(hW, hV)
					}
				},
				finish: function(hU) {
					T.fire(new bb("onanimation_end"));
					if(i.unstopable) {
						T._animationInfoUnstopable = {};
						T._unstopableAni = null
					} else {
						T._ani = null;
						T._animationInfo = {}
					}
					if(i.mapNeedCbk) {
						i.mapNeedCbk()
					}
					if(i.callback) {
						i.callback(hU)
					}
				},
				onStop: function(hU) {
					hU = hU || {};
					T.fire(new bb("onanimation_end"));
					if(hU.stopCurrentAnimation) {
						T._animationInfo = {}
					}
					T._ani = null;
					if(i.mapNeedCbk) {
						i.mapNeedCbk()
					}
					if(i.callback) {
						i.callback(null, {
							stop: true
						})
					}
				}
			});
			if(i.unstopable) {
				T._unstopableAni = hQ
			} else {
				T._ani = hQ
			}
		},
		_startInfiniteZoomAnimation: function(e) {
			var i = this;
			if(i._ani) {
				i._ani.stop(!!e.goToEnd, {
					stopCurrentAnimation: e.stopCurrentAnimation
				})
			}
			if(i._infiniteAni) {
				return
			}
			this.fire(new bb("onanimation_start"));
			i._infiniteAni = new o({
				duration: 10000,
				transition: cn.linear,
				render: function() {
					var T = i._animationInfo.zoom;
					if(Math.abs(T.current - T.target) < 0.001) {
						i._setValue("zoom", T.target);
						i._infiniteAni.stop();
						return
					}
					T.current += (T.target - T.current) * 0.35;
					i._setValue("zoom", T.current);
					if(e.renderCallback) {
						e.renderCallback()
					}
				},
				finish: function() {
					i._infiniteAni = null;
					i._animationInfo = {};
					i.fire(new bb("onanimation_end"));
					if(e.callback) {
						e.callback()
					}
				},
				onStop: function() {
					i._infiniteAni = null;
					i._animationInfo = {};
					i.fire(new bb("onanimation_end"));
					if(e.callback) {
						e.callback()
					}
				}
			})
		},
		_setValue: function(e, T) {
			if(e === "zoom") {
				this._preZoomLevel = this.zoomLevel;
				var i = this._getProperZoom(T);
				T = i.zoom;
				if(T !== this.zoomLevel) {
					this.zoomLevel = T;
					if(T < 5) {
						this.restrictCenter(this.centerPoint)
					}
					this.fire(new bb("on" + e + "_changed"))
				}
				return
			} else {
				if(e === "center") {
					this.centerPoint = T
				}
			}
			this["_" + e] = T;
			this.fire(new bb("on" + e + "_changed"))
		},
		_setValueTick: function(e, hR, hQ, i) {
			if(e === "center") {
				var T = new hr(hR.lng + hQ.lng * i, hR.lat + hQ.lat * i);
				this._setValue(e, T);
				return
			}
			if(e === "zoom") {
				this._setValue(e, Math.pow(hR, 1 - i) * Math.pow(hR + hQ, i));
				return
			}
			this._setValue(e, hR + hQ * i)
		},
		setHeading: function(hQ, i) {
			i = i || {};
			if(hQ === this._heading) {
				i.callback && i.callback();
				return
			}
			var T = fZ(this._heading, 360);
			var e = fZ(hQ, 360);
			if(e === T) {
				this._heading = hQ;
				i.callback && i.callback();
				return
			}
			if(i.noAnimation) {
				this._setValue("heading", hQ);
				i.callback && i.callback();
				return
			}
			if(i.unstopable) {
				this._animationInfoUnstopable.heading = {
					current: this._heading,
					diff: hQ - this._heading
				}
			} else {
				this._animationInfo.heading = {
					current: this._heading,
					diff: hQ - this._heading
				}
			}
			this._startAnimation(i)
		},
		resetHeading: function(e) {
			var i = this._heading;
			while(i < 0) {
				i += 360
			}
			i = i % 360;
			if(i > 180) {
				i -= 360
			}
			this._heading = i;
			e = e || {};
			e.unstopable = true;
			this.setHeading(0, e)
		},
		getHeading: function() {
			return this._heading
		},
		setTilt: function(e, i) {
			i = i || {};
			if(e === this._tilt) {
				i.callback && i.callback();
				return
			}
			if(e > c8.MAX_TILT) {
				e = c8.MAX_TILT
			}
			if(e < c8.MIN_TILT) {
				e = c8.MIN_TILT
			}
			if(i && i.noAnimation) {
				this._setValue("tilt", e);
				i.callback && i.callback();
				return
			}
			this._animationInfo.tilt = {
				current: this._tilt,
				diff: e - this._tilt
			};
			this._startAnimation(i)
		},
		getTilt: function() {
			return this._tilt
		},
		getCenterIn: function() {
			return this.centerPoint
		},
		getZoom: function() {
			return this.zoomLevel
		},
		getCameraPosition: function(T) {
			T = T || {};
			var e = T.center || this.centerPoint;
			var hQ = T.zoom || this.zoomLevel;
			var hT = typeof T.heading === "number" ? T.heading : this._heading;
			var i = typeof T.tilt === "number" ? T.tilt : this._tilt;
			var hS = this._webglMapCamera.generateMVMatrix(e, hQ, hT, i);
			var hR = mat4.create(Float32Array);
			mat4.invert(hR, hS);
			return this._webglMapCamera.getPosition(hR)
		}
	});

	function fO(i) {
		this._jobQueue = [];
		this._idleOnlyJobQueue = [];
		var e = this;
		this.isIdle = true;
		i.on("updateframe", function(hQ) {
			var T = 12 - hQ.frameTime;
			T = T < 1 ? 1 : T;
			e.isIdle = false;
			if(e.idleWorkTimer) {
				clearInterval(e.idleWorkTimer);
				e.idleWorkTimer = null
			}
			e.runJobs(T)
		});
		this._idleWorkerTicker = (function(T) {
			return function() {
				if(T.isIdle) {
					T.runJobs();
					T.runIdleOnlyJobs()
				}
			}
		})(this);
		i.on("mapglidle", function() {
			e.isIdle = true;
			e.runJobs();
			e.runIdleOnlyJobs();
			e.idleWorkTimer = setInterval(e._idleWorkerTicker, fO.MAX_IDLE_TIME)
		})
	}
	fO.MAX_IDLE_TIME = 50;
	fO.MAX_FRAME_TIME = 6;
	fO.prototype.runJobs = function(i) {
		if(this._jobQueue.length === 0) {
			return
		}
		var hQ = fB();
		var e = 0;
		i = i || fO.MAX_FRAME_TIME;
		while(this._jobQueue.length && e < i) {
			var T = this._jobQueue.shift();
			if(T.state !== "invalid") {
				T.call()
			}
			e = fB() - hQ
		}
	};
	fO.prototype.runIdleOnlyJobs = function() {
		if(this._idleOnlyJobQueue.length === 0) {
			return
		}
		var T = fB();
		var e = 0;
		while(this._idleOnlyJobQueue.length && e < fO.MAX_IDLE_TIME) {
			var i = this._idleOnlyJobQueue.shift();
			if(i.state !== "invalid") {
				i.call()
			}
			e = fB() - T
		}
	};
	fO.prototype.checkIdleRunning = function() {
		if(this.isIdle && !this.idleWorkTimer) {
			this.runJobs();
			this.runIdleOnlyJobs();
			this.idleWorkTimer = setInterval(this._idleWorkerTicker, 50)
		}
	};
	fO.prototype.addJob = function(e) {
		this._jobQueue.push(e);
		this.checkIdleRunning()
	};
	fO.prototype.clearJobs = function() {
		this._jobQueue.length = 0;
		this._idleOnlyJobQueue.length = 0
	};
	fO.prototype.addIdleOnlyJob = function(e) {
		this._idleOnlyJobQueue.push(e);
		this.checkIdleRunning()
	};
	var cb = {};
	(function(hT) {
		if(!hX) {
			var hX = 0.000001
		}
		if(!i) {
			var i = (typeof Float32Array !== "undefined") ? Float32Array : Array
		}
		if(!hR) {
			var hR = Math.random
		}
		var T = {};
		var hS = Math.PI / 180;
		T.toRadian = function(hY) {
			return hY * hS
		};
		var hW = {};
		hW.create = function(hZ) {
			hZ = hZ || i;
			var hY = new hZ(2);
			hY[0] = 0;
			hY[1] = 0;
			return hY
		};
		hW.clone = function(hY, h0) {
			h0 = h0 || i;
			var hZ = new h0(2);
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			return hZ
		};
		hW.fromValues = function(hY, h1, h0) {
			h0 = h0 || i;
			var hZ = new h0(2);
			hZ[0] = hY;
			hZ[1] = h1;
			return hZ
		};
		hW.copy = function(hZ, hY) {
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			return hZ
		};
		hW.set = function(hZ, hY, h0) {
			hZ[0] = hY;
			hZ[1] = h0;
			return hZ
		};
		hW.add = function(h0, hZ, hY) {
			h0[0] = hZ[0] + hY[0];
			h0[1] = hZ[1] + hY[1];
			return h0
		};
		hW.subtract = function(h0, hZ, hY) {
			h0[0] = hZ[0] - hY[0];
			h0[1] = hZ[1] - hY[1];
			return h0
		};
		hW.sub = hW.subtract;
		hW.multiply = function(h0, hZ, hY) {
			h0[0] = hZ[0] * hY[0];
			h0[1] = hZ[1] * hY[1];
			return h0
		};
		hW.mul = hW.multiply;
		hW.divide = function(h0, hZ, hY) {
			h0[0] = hZ[0] / hY[0];
			h0[1] = hZ[1] / hY[1];
			return h0
		};
		hW.div = hW.divide;
		hW.min = function(h0, hZ, hY) {
			h0[0] = Math.min(hZ[0], hY[0]);
			h0[1] = Math.min(hZ[1], hY[1]);
			return h0
		};
		hW.max = function(h0, hZ, hY) {
			h0[0] = Math.max(hZ[0], hY[0]);
			h0[1] = Math.max(hZ[1], hY[1]);
			return h0
		};
		hW.scale = function(h0, hZ, hY) {
			h0[0] = hZ[0] * hY;
			h0[1] = hZ[1] * hY;
			return h0
		};
		hW.scaleAndAdd = function(h0, hZ, hY, h1) {
			h0[0] = hZ[0] + (hY[0] * h1);
			h0[1] = hZ[1] + (hY[1] * h1);
			return h0
		};
		hW.distance = function(h0, hZ) {
			var hY = hZ[0] - h0[0],
				h1 = hZ[1] - h0[1];
			return Math.sqrt(hY * hY + h1 * h1)
		};
		hW.dist = hW.distance;
		hW.squaredDistance = function(h0, hZ) {
			var hY = hZ[0] - h0[0],
				h1 = hZ[1] - h0[1];
			return hY * hY + h1 * h1
		};
		hW.sqrDist = hW.squaredDistance;
		hW.length = function(hZ) {
			var hY = hZ[0],
				h0 = hZ[1];
			return Math.sqrt(hY * hY + h0 * h0)
		};
		hW.len = hW.length;
		hW.squaredLength = function(hZ) {
			var hY = hZ[0],
				h0 = hZ[1];
			return hY * hY + h0 * h0
		};
		hW.sqrLen = hW.squaredLength;
		hW.negate = function(hZ, hY) {
			hZ[0] = -hY[0];
			hZ[1] = -hY[1];
			return hZ
		};
		hW.normalize = function(h1, h0) {
			var hZ = h0[0],
				h2 = h0[1];
			var hY = hZ * hZ + h2 * h2;
			if(hY > 0) {
				hY = 1 / Math.sqrt(hY);
				h1[0] = h0[0] * hY;
				h1[1] = h0[1] * hY
			}
			return h1
		};
		hW.dot = function(hZ, hY) {
			return hZ[0] * hY[0] + hZ[1] * hY[1]
		};
		hW.cross = function(h0, hZ, hY) {
			var h1 = hZ[0] * hY[1] - hZ[1] * hY[0];
			h0[0] = h0[1] = 0;
			h0[2] = h1;
			return h0
		};
		hW.lerp = function(h0, hZ, hY, h1) {
			var h3 = hZ[0],
				h2 = hZ[1];
			h0[0] = h3 + h1 * (hY[0] - h3);
			h0[1] = h2 + h1 * (hY[1] - h2);
			return h0
		};
		hW.random = function(hY, h0) {
			h0 = h0 || 1;
			var hZ = hR() * 2 * Math.PI;
			hY[0] = Math.cos(hZ) * h0;
			hY[1] = Math.sin(hZ) * h0;
			return hY
		};
		hW.transformMat2 = function(h1, h0, hZ) {
			var hY = h0[0],
				h2 = h0[1];
			h1[0] = hZ[0] * hY + hZ[2] * h2;
			h1[1] = hZ[1] * hY + hZ[3] * h2;
			return h1
		};
		hW.transformMat2d = function(h1, h0, hZ) {
			var hY = h0[0],
				h2 = h0[1];
			h1[0] = hZ[0] * hY + hZ[2] * h2 + hZ[4];
			h1[1] = hZ[1] * hY + hZ[3] * h2 + hZ[5];
			return h1
		};
		hW.transformMat3 = function(h1, h0, hZ) {
			var hY = h0[0],
				h2 = h0[1];
			h1[0] = hZ[0] * hY + hZ[3] * h2 + hZ[6];
			h1[1] = hZ[1] * hY + hZ[4] * h2 + hZ[7];
			return h1
		};
		hW.transformMat4 = function(h1, h0, hZ) {
			var hY = h0[0],
				h2 = h0[1];
			h1[0] = hZ[0] * hY + hZ[4] * h2 + hZ[12];
			h1[1] = hZ[1] * hY + hZ[5] * h2 + hZ[13];
			return h1
		};
		hW.rotate = function(h1, hZ, hY, h5) {
			var h4 = hZ[0] - hY[0];
			var h3 = hZ[1] - hY[1];
			var h0 = Math.sin(h5);
			var h2 = Math.cos(h5);
			h1[0] = h4 * h2 - h3 * h0 + hY[0];
			h1[1] = h4 * h0 + h3 * h2 + hY[1];
			return h1
		};
		hW.forEach = (function() {
			var hY = hW.create();
			return function(h1, h5, h6, h4, h3, hZ) {
				var h2, h0;
				if(!h5) {
					h5 = 2
				}
				if(!h6) {
					h6 = 0
				}
				if(h4) {
					h0 = Math.min((h4 * h5) + h6, h1.length)
				} else {
					h0 = h1.length
				}
				for(h2 = h6; h2 < h0; h2 += h5) {
					hY[0] = h1[h2];
					hY[1] = h1[h2 + 1];
					h3(hY, hY, hZ);
					h1[h2] = hY[0];
					h1[h2 + 1] = hY[1]
				}
				return h1
			}
		})();
		hW.str = function(hY) {
			return "vec2(" + hY[0] + ", " + hY[1] + ")"
		};
		hT.vec2 = hW;
		var hV = {};
		hV.create = function(hZ) {
			hZ = hZ || i;
			var hY = new hZ(3);
			hY[0] = 0;
			hY[1] = 0;
			hY[2] = 0;
			return hY
		};
		hV.clone = function(hY, h0) {
			h0 = h0 || i;
			var hZ = new h0(3);
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			return hZ
		};
		hV.fromValues = function(hY, h2, h0, h1) {
			h1 = h1 || i;
			var hZ = new h1(3);
			hZ[0] = hY;
			hZ[1] = h2;
			hZ[2] = h0;
			return hZ
		};
		hV.copy = function(hZ, hY) {
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			return hZ
		};
		hV.set = function(hZ, hY, h1, h0) {
			hZ[0] = hY;
			hZ[1] = h1;
			hZ[2] = h0;
			return hZ
		};
		hV.add = function(h0, hZ, hY) {
			h0[0] = hZ[0] + hY[0];
			h0[1] = hZ[1] + hY[1];
			h0[2] = hZ[2] + hY[2];
			return h0
		};
		hV.subtract = function(h0, hZ, hY) {
			h0[0] = hZ[0] - hY[0];
			h0[1] = hZ[1] - hY[1];
			h0[2] = hZ[2] - hY[2];
			return h0
		};
		hV.sub = hV.subtract;
		hV.multiply = function(h0, hZ, hY) {
			h0[0] = hZ[0] * hY[0];
			h0[1] = hZ[1] * hY[1];
			h0[2] = hZ[2] * hY[2];
			return h0
		};
		hV.mul = hV.multiply;
		hV.divide = function(h0, hZ, hY) {
			h0[0] = hZ[0] / hY[0];
			h0[1] = hZ[1] / hY[1];
			h0[2] = hZ[2] / hY[2];
			return h0
		};
		hV.div = hV.divide;
		hV.min = function(h0, hZ, hY) {
			h0[0] = Math.min(hZ[0], hY[0]);
			h0[1] = Math.min(hZ[1], hY[1]);
			h0[2] = Math.min(hZ[2], hY[2]);
			return h0
		};
		hV.max = function(h0, hZ, hY) {
			h0[0] = Math.max(hZ[0], hY[0]);
			h0[1] = Math.max(hZ[1], hY[1]);
			h0[2] = Math.max(hZ[2], hY[2]);
			return h0
		};
		hV.scale = function(h0, hZ, hY) {
			h0[0] = hZ[0] * hY;
			h0[1] = hZ[1] * hY;
			h0[2] = hZ[2] * hY;
			return h0
		};
		hV.scaleAndAdd = function(h0, hZ, hY, h1) {
			h0[0] = hZ[0] + (hY[0] * h1);
			h0[1] = hZ[1] + (hY[1] * h1);
			h0[2] = hZ[2] + (hY[2] * h1);
			return h0
		};
		hV.distance = function(h0, hZ) {
			var hY = hZ[0] - h0[0],
				h2 = hZ[1] - h0[1],
				h1 = hZ[2] - h0[2];
			return Math.sqrt(hY * hY + h2 * h2 + h1 * h1)
		};
		hV.dist = hV.distance;
		hV.squaredDistance = function(h0, hZ) {
			var hY = hZ[0] - h0[0],
				h2 = hZ[1] - h0[1],
				h1 = hZ[2] - h0[2];
			return hY * hY + h2 * h2 + h1 * h1
		};
		hV.sqrDist = hV.squaredDistance;
		hV.length = function(hZ) {
			var hY = hZ[0],
				h1 = hZ[1],
				h0 = hZ[2];
			return Math.sqrt(hY * hY + h1 * h1 + h0 * h0)
		};
		hV.len = hV.length;
		hV.squaredLength = function(hZ) {
			var hY = hZ[0],
				h1 = hZ[1],
				h0 = hZ[2];
			return hY * hY + h1 * h1 + h0 * h0
		};
		hV.sqrLen = hV.squaredLength;
		hV.negate = function(hZ, hY) {
			hZ[0] = -hY[0];
			hZ[1] = -hY[1];
			hZ[2] = -hY[2];
			return hZ
		};
		hV.normalize = function(h1, h0) {
			var hZ = h0[0],
				h3 = h0[1],
				h2 = h0[2];
			var hY = hZ * hZ + h3 * h3 + h2 * h2;
			if(hY > 0) {
				hY = 1 / Math.sqrt(hY);
				h1[0] = h0[0] * hY;
				h1[1] = h0[1] * hY;
				h1[2] = h0[2] * hY
			}
			return h1
		};
		hV.dot = function(hZ, hY) {
			return hZ[0] * hY[0] + hZ[1] * hY[1] + hZ[2] * hY[2]
		};
		hV.cross = function(hZ, h4, h3) {
			var hY = h4[0],
				h6 = h4[1],
				h5 = h4[2],
				h2 = h3[0],
				h1 = h3[1],
				h0 = h3[2];
			hZ[0] = h6 * h0 - h5 * h1;
			hZ[1] = h5 * h2 - hY * h0;
			hZ[2] = hY * h1 - h6 * h2;
			return hZ
		};
		hV.lerp = function(h0, hZ, hY, h1) {
			var h4 = hZ[0],
				h3 = hZ[1],
				h2 = hZ[2];
			h0[0] = h4 + h1 * (hY[0] - h4);
			h0[1] = h3 + h1 * (hY[1] - h3);
			h0[2] = h2 + h1 * (hY[2] - h2);
			return h0
		};
		hV.random = function(hY, h2) {
			h2 = h2 || 1;
			var h0 = hR() * 2 * Math.PI;
			var h1 = (hR() * 2) - 1;
			var hZ = Math.sqrt(1 - h1 * h1) * h2;
			hY[0] = Math.cos(h0) * hZ;
			hY[1] = Math.sin(h0) * hZ;
			hY[2] = h1 * h2;
			return hY
		};
		hV.transformMat4 = function(h1, h0, hZ) {
			var hY = h0[0],
				h3 = h0[1],
				h2 = h0[2];
			h1[0] = hZ[0] * hY + hZ[4] * h3 + hZ[8] * h2 + hZ[12];
			h1[1] = hZ[1] * hY + hZ[5] * h3 + hZ[9] * h2 + hZ[13];
			h1[2] = hZ[2] * hY + hZ[6] * h3 + hZ[10] * h2 + hZ[14];
			return h1
		};
		hV.transformMat3 = function(h1, h0, hZ) {
			var hY = h0[0],
				h3 = h0[1],
				h2 = h0[2];
			h1[0] = hY * hZ[0] + h3 * hZ[3] + h2 * hZ[6];
			h1[1] = hY * hZ[1] + h3 * hZ[4] + h2 * hZ[7];
			h1[2] = hY * hZ[2] + h3 * hZ[5] + h2 * hZ[8];
			return h1
		};
		hV.transformQuat = function(h4, ia, hY) {
			var ib = ia[0],
				h9 = ia[1],
				h8 = ia[2],
				h6 = hY[0],
				h5 = hY[1],
				h3 = hY[2],
				h7 = hY[3],
				h1 = h7 * ib + h5 * h8 - h3 * h9,
				h0 = h7 * h9 + h3 * ib - h6 * h8,
				hZ = h7 * h8 + h6 * h9 - h5 * ib,
				h2 = -h6 * ib - h5 * h9 - h3 * h8;
			h4[0] = h1 * h7 + h2 * -h6 + h0 * -h3 - hZ * -h5;
			h4[1] = h0 * h7 + h2 * -h5 + hZ * -h6 - h1 * -h3;
			h4[2] = hZ * h7 + h2 * -h3 + h1 * -h5 - h0 * -h6;
			return h4
		};
		hV.rotateX = function(h0, hZ, hY, h3) {
			var h2 = [],
				h1 = [];
			h2[0] = hZ[0] - hY[0];
			h2[1] = hZ[1] - hY[1];
			h2[2] = hZ[2] - hY[2];
			h1[0] = h2[0];
			h1[1] = h2[1] * Math.cos(h3) - h2[2] * Math.sin(h3);
			h1[2] = h2[1] * Math.sin(h3) + h2[2] * Math.cos(h3);
			h0[0] = h1[0] + hY[0];
			h0[1] = h1[1] + hY[1];
			h0[2] = h1[2] + hY[2];
			return h0
		};
		hV.rotateY = function(h0, hZ, hY, h3) {
			var h2 = [],
				h1 = [];
			h2[0] = hZ[0] - hY[0];
			h2[1] = hZ[1] - hY[1];
			h2[2] = hZ[2] - hY[2];
			h1[0] = h2[2] * Math.sin(h3) + h2[0] * Math.cos(h3);
			h1[1] = h2[1];
			h1[2] = h2[2] * Math.cos(h3) - h2[0] * Math.sin(h3);
			h0[0] = h1[0] + hY[0];
			h0[1] = h1[1] + hY[1];
			h0[2] = h1[2] + hY[2];
			return h0
		};
		hV.rotateZ = function(h0, hZ, hY, h3) {
			var h2 = [],
				h1 = [];
			h2[0] = hZ[0] - hY[0];
			h2[1] = hZ[1] - hY[1];
			h2[2] = hZ[2] - hY[2];
			h1[0] = h2[0] * Math.cos(h3) - h2[1] * Math.sin(h3);
			h1[1] = h2[0] * Math.sin(h3) + h2[1] * Math.cos(h3);
			h1[2] = h2[2];
			h0[0] = h1[0] + hY[0];
			h0[1] = h1[1] + hY[1];
			h0[2] = h1[2] + hY[2];
			return h0
		};
		hV.forEach = (function() {
			var hY = hV.create();
			return function(h1, h5, h6, h4, h3, hZ) {
				var h2, h0;
				if(!h5) {
					h5 = 3
				}
				if(!h6) {
					h6 = 0
				}
				if(h4) {
					h0 = Math.min((h4 * h5) + h6, h1.length)
				} else {
					h0 = h1.length
				}
				for(h2 = h6; h2 < h0; h2 += h5) {
					hY[0] = h1[h2];
					hY[1] = h1[h2 + 1];
					hY[2] = h1[h2 + 2];
					h3(hY, hY, hZ);
					h1[h2] = hY[0];
					h1[h2 + 1] = hY[1];
					h1[h2 + 2] = hY[2]
				}
				return h1
			}
		})();
		hV.str = function(hY) {
			return "vec3(" + hY[0] + ", " + hY[1] + ", " + hY[2] + ")"
		};
		hT.vec3 = hV;
		var hU = {};
		hU.create = function(hZ) {
			hZ = hZ || i;
			var hY = new hZ(4);
			hY[0] = 0;
			hY[1] = 0;
			hY[2] = 0;
			hY[3] = 0;
			return hY
		};
		hU.clone = function(hY, h0) {
			h0 = h0 || i;
			var hZ = new h0(4);
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			hZ[3] = hY[3];
			return hZ
		};
		hU.fromValues = function(hY, h3, h1, hZ, h2) {
			h2 = h2 || i;
			var h0 = new h2(4);
			h0[0] = hY;
			h0[1] = h3;
			h0[2] = h1;
			h0[3] = hZ;
			return h0
		};
		hU.copy = function(hZ, hY) {
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			hZ[3] = hY[3];
			return hZ
		};
		hU.set = function(h0, hY, h2, h1, hZ) {
			h0[0] = hY;
			h0[1] = h2;
			h0[2] = h1;
			h0[3] = hZ;
			return h0
		};
		hU.add = function(h0, hZ, hY) {
			h0[0] = hZ[0] + hY[0];
			h0[1] = hZ[1] + hY[1];
			h0[2] = hZ[2] + hY[2];
			h0[3] = hZ[3] + hY[3];
			return h0
		};
		hU.subtract = function(h0, hZ, hY) {
			h0[0] = hZ[0] - hY[0];
			h0[1] = hZ[1] - hY[1];
			h0[2] = hZ[2] - hY[2];
			h0[3] = hZ[3] - hY[3];
			return h0
		};
		hU.sub = hU.subtract;
		hU.multiply = function(h0, hZ, hY) {
			h0[0] = hZ[0] * hY[0];
			h0[1] = hZ[1] * hY[1];
			h0[2] = hZ[2] * hY[2];
			h0[3] = hZ[3] * hY[3];
			return h0
		};
		hU.mul = hU.multiply;
		hU.divide = function(h0, hZ, hY) {
			h0[0] = hZ[0] / hY[0];
			h0[1] = hZ[1] / hY[1];
			h0[2] = hZ[2] / hY[2];
			h0[3] = hZ[3] / hY[3];
			return h0
		};
		hU.div = hU.divide;
		hU.min = function(h0, hZ, hY) {
			h0[0] = Math.min(hZ[0], hY[0]);
			h0[1] = Math.min(hZ[1], hY[1]);
			h0[2] = Math.min(hZ[2], hY[2]);
			h0[3] = Math.min(hZ[3], hY[3]);
			return h0
		};
		hU.max = function(h0, hZ, hY) {
			h0[0] = Math.max(hZ[0], hY[0]);
			h0[1] = Math.max(hZ[1], hY[1]);
			h0[2] = Math.max(hZ[2], hY[2]);
			h0[3] = Math.max(hZ[3], hY[3]);
			return h0
		};
		hU.scale = function(h0, hZ, hY) {
			h0[0] = hZ[0] * hY;
			h0[1] = hZ[1] * hY;
			h0[2] = hZ[2] * hY;
			h0[3] = hZ[3] * hY;
			return h0
		};
		hU.scaleAndAdd = function(h0, hZ, hY, h1) {
			h0[0] = hZ[0] + (hY[0] * h1);
			h0[1] = hZ[1] + (hY[1] * h1);
			h0[2] = hZ[2] + (hY[2] * h1);
			h0[3] = hZ[3] + (hY[3] * h1);
			return h0
		};
		hU.distance = function(h1, hZ) {
			var hY = hZ[0] - h1[0],
				h3 = hZ[1] - h1[1],
				h2 = hZ[2] - h1[2],
				h0 = hZ[3] - h1[3];
			return Math.sqrt(hY * hY + h3 * h3 + h2 * h2 + h0 * h0)
		};
		hU.dist = hU.distance;
		hU.squaredDistance = function(h1, hZ) {
			var hY = hZ[0] - h1[0],
				h3 = hZ[1] - h1[1],
				h2 = hZ[2] - h1[2],
				h0 = hZ[3] - h1[3];
			return hY * hY + h3 * h3 + h2 * h2 + h0 * h0
		};
		hU.sqrDist = hU.squaredDistance;
		hU.length = function(h0) {
			var hY = h0[0],
				h2 = h0[1],
				h1 = h0[2],
				hZ = h0[3];
			return Math.sqrt(hY * hY + h2 * h2 + h1 * h1 + hZ * hZ)
		};
		hU.len = hU.length;
		hU.squaredLength = function(h0) {
			var hY = h0[0],
				h2 = h0[1],
				h1 = h0[2],
				hZ = h0[3];
			return hY * hY + h2 * h2 + h1 * h1 + hZ * hZ
		};
		hU.sqrLen = hU.squaredLength;
		hU.negate = function(hZ, hY) {
			hZ[0] = -hY[0];
			hZ[1] = -hY[1];
			hZ[2] = -hY[2];
			hZ[3] = -hY[3];
			return hZ
		};
		hU.normalize = function(h2, h1) {
			var hZ = h1[0],
				h4 = h1[1],
				h3 = h1[2],
				h0 = h1[3];
			var hY = hZ * hZ + h4 * h4 + h3 * h3 + h0 * h0;
			if(hY > 0) {
				hY = 1 / Math.sqrt(hY);
				h2[0] = h1[0] * hY;
				h2[1] = h1[1] * hY;
				h2[2] = h1[2] * hY;
				h2[3] = h1[3] * hY
			}
			return h2
		};
		hU.dot = function(hZ, hY) {
			return hZ[0] * hY[0] + hZ[1] * hY[1] + hZ[2] * hY[2] + hZ[3] * hY[3]
		};
		hU.lerp = function(h0, hZ, hY, h1) {
			var h4 = hZ[0],
				h3 = hZ[1],
				h2 = hZ[2],
				h5 = hZ[3];
			h0[0] = h4 + h1 * (hY[0] - h4);
			h0[1] = h3 + h1 * (hY[1] - h3);
			h0[2] = h2 + h1 * (hY[2] - h2);
			h0[3] = h5 + h1 * (hY[3] - h5);
			return h0
		};
		hU.random = function(hY, hZ) {
			hZ = hZ || 1;
			hY[0] = hR();
			hY[1] = hR();
			hY[2] = hR();
			hY[3] = hR();
			hU.normalize(hY, hY);
			hU.scale(hY, hY, hZ);
			return hY
		};
		hU.transformMat4 = function(h2, h1, hZ) {
			var hY = h1[0],
				h4 = h1[1],
				h3 = h1[2],
				h0 = h1[3];
			h2[0] = hZ[0] * hY + hZ[4] * h4 + hZ[8] * h3 + hZ[12] * h0;
			h2[1] = hZ[1] * hY + hZ[5] * h4 + hZ[9] * h3 + hZ[13] * h0;
			h2[2] = hZ[2] * hY + hZ[6] * h4 + hZ[10] * h3 + hZ[14] * h0;
			h2[3] = hZ[3] * hY + hZ[7] * h4 + hZ[11] * h3 + hZ[15] * h0;
			return h2
		};
		hU.transformQuat = function(h4, ia, hY) {
			var ib = ia[0],
				h9 = ia[1],
				h8 = ia[2],
				h6 = hY[0],
				h5 = hY[1],
				h3 = hY[2],
				h7 = hY[3],
				h1 = h7 * ib + h5 * h8 - h3 * h9,
				h0 = h7 * h9 + h3 * ib - h6 * h8,
				hZ = h7 * h8 + h6 * h9 - h5 * ib,
				h2 = -h6 * ib - h5 * h9 - h3 * h8;
			h4[0] = h1 * h7 + h2 * -h6 + h0 * -h3 - hZ * -h5;
			h4[1] = h0 * h7 + h2 * -h5 + hZ * -h6 - h1 * -h3;
			h4[2] = hZ * h7 + h2 * -h3 + h1 * -h5 - h0 * -h6;
			return h4
		};
		hU.forEach = (function() {
			var hY = hU.create();
			return function(h1, h5, h6, h4, h3, hZ) {
				var h2, h0;
				if(!h5) {
					h5 = 4
				}
				if(!h6) {
					h6 = 0
				}
				if(h4) {
					h0 = Math.min((h4 * h5) + h6, h1.length)
				} else {
					h0 = h1.length
				}
				for(h2 = h6; h2 < h0; h2 += h5) {
					hY[0] = h1[h2];
					hY[1] = h1[h2 + 1];
					hY[2] = h1[h2 + 2];
					hY[3] = h1[h2 + 3];
					h3(hY, hY, hZ);
					h1[h2] = hY[0];
					h1[h2 + 1] = hY[1];
					h1[h2 + 2] = hY[2];
					h1[h2 + 3] = hY[3]
				}
				return h1
			}
		})();
		hU.str = function(hY) {
			return "vec4(" + hY[0] + ", " + hY[1] + ", " + hY[2] + ", " + hY[3] + ")"
		};
		hT.vec4 = hU;
		var hQ = {};
		hQ.create = function(hZ) {
			hZ = hZ || i;
			var hY = new hZ(4);
			hY[0] = 1;
			hY[1] = 0;
			hY[2] = 0;
			hY[3] = 1;
			return hY
		};
		hQ.clone = function(hY, h0) {
			h0 = h0 || i;
			var hZ = new h0(4);
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			hZ[3] = hY[3];
			return hZ
		};
		hQ.copy = function(hZ, hY) {
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			hZ[3] = hY[3];
			return hZ
		};
		hQ.identity = function(hY) {
			hY[0] = 1;
			hY[1] = 0;
			hY[2] = 0;
			hY[3] = 1;
			return hY
		};
		hQ.transpose = function(h0, hZ) {
			if(h0 === hZ) {
				var hY = hZ[1];
				h0[1] = hZ[2];
				h0[2] = hY
			} else {
				h0[0] = hZ[0];
				h0[1] = hZ[2];
				h0[2] = hZ[1];
				h0[3] = hZ[3]
			}
			return h0
		};
		hQ.invert = function(h2, h0) {
			var h1 = h0[0],
				hZ = h0[1],
				hY = h0[2],
				h4 = h0[3],
				h3 = h1 * h4 - hY * hZ;
			if(!h3) {
				return null
			}
			h3 = 1 / h3;
			h2[0] = h4 * h3;
			h2[1] = -hZ * h3;
			h2[2] = -hY * h3;
			h2[3] = h1 * h3;
			return h2
		};
		hQ.adjoint = function(h0, hY) {
			var hZ = hY[0];
			h0[0] = hY[3];
			h0[1] = -hY[1];
			h0[2] = -hY[2];
			h0[3] = hZ;
			return h0
		};
		hQ.determinant = function(hY) {
			return hY[0] * hY[3] - hY[2] * hY[1]
		};
		hQ.multiply = function(h2, h7, h5) {
			var h1 = h7[0],
				h0 = h7[1],
				hZ = h7[2],
				hY = h7[3];
			var h8 = h5[0],
				h6 = h5[1],
				h4 = h5[2],
				h3 = h5[3];
			h2[0] = h1 * h8 + hZ * h6;
			h2[1] = h0 * h8 + hY * h6;
			h2[2] = h1 * h4 + hZ * h3;
			h2[3] = h0 * h4 + hY * h3;
			return h2
		};
		hQ.mul = hQ.multiply;
		hQ.rotate = function(h2, h5, h4) {
			var h1 = h5[0],
				h0 = h5[1],
				hZ = h5[2],
				hY = h5[3],
				h6 = Math.sin(h4),
				h3 = Math.cos(h4);
			h2[0] = h1 * h3 + hZ * h6;
			h2[1] = h0 * h3 + hY * h6;
			h2[2] = h1 * -h6 + hZ * h3;
			h2[3] = h0 * -h6 + hY * h3;
			return h2
		};
		hQ.scale = function(h2, h3, h5) {
			var h1 = h3[0],
				h0 = h3[1],
				hZ = h3[2],
				hY = h3[3],
				h6 = h5[0],
				h4 = h5[1];
			h2[0] = h1 * h6;
			h2[1] = h0 * h6;
			h2[2] = hZ * h4;
			h2[3] = hY * h4;
			return h2
		};
		hQ.str = function(hY) {
			return "mat2(" + hY[0] + ", " + hY[1] + ", " + hY[2] + ", " + hY[3] + ")"
		};
		hQ.frob = function(hY) {
			return(Math.sqrt(Math.pow(hY[0], 2) + Math.pow(hY[1], 2) + Math.pow(hY[2], 2) + Math.pow(hY[3], 2)))
		};
		hQ.LDU = function(hY, h1, h0, hZ) {
			hY[2] = hZ[2] / hZ[0];
			h0[0] = hZ[0];
			h0[1] = hZ[1];
			h0[3] = hZ[3] - hY[2] * h0[1];
			return [hY, h1, h0]
		};
		hT.mat2 = hQ;
		var e = {};
		e.create = function(hZ) {
			hZ = hZ || i;
			var hY = new hZ(16);
			hY[0] = 1;
			hY[1] = 0;
			hY[2] = 0;
			hY[3] = 0;
			hY[4] = 0;
			hY[5] = 1;
			hY[6] = 0;
			hY[7] = 0;
			hY[8] = 0;
			hY[9] = 0;
			hY[10] = 1;
			hY[11] = 0;
			hY[12] = 0;
			hY[13] = 0;
			hY[14] = 0;
			hY[15] = 1;
			return hY
		};
		e.clone = function(hY) {
			var hZ = new i(16);
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			hZ[3] = hY[3];
			hZ[4] = hY[4];
			hZ[5] = hY[5];
			hZ[6] = hY[6];
			hZ[7] = hY[7];
			hZ[8] = hY[8];
			hZ[9] = hY[9];
			hZ[10] = hY[10];
			hZ[11] = hY[11];
			hZ[12] = hY[12];
			hZ[13] = hY[13];
			hZ[14] = hY[14];
			hZ[15] = hY[15];
			return hZ
		};
		e.copy = function(hZ, hY) {
			hZ[0] = hY[0];
			hZ[1] = hY[1];
			hZ[2] = hY[2];
			hZ[3] = hY[3];
			hZ[4] = hY[4];
			hZ[5] = hY[5];
			hZ[6] = hY[6];
			hZ[7] = hY[7];
			hZ[8] = hY[8];
			hZ[9] = hY[9];
			hZ[10] = hY[10];
			hZ[11] = hY[11];
			hZ[12] = hY[12];
			hZ[13] = hY[13];
			hZ[14] = hY[14];
			hZ[15] = hY[15];
			return hZ
		};
		e.identity = function(hY) {
			hY[0] = 1;
			hY[1] = 0;
			hY[2] = 0;
			hY[3] = 0;
			hY[4] = 0;
			hY[5] = 1;
			hY[6] = 0;
			hY[7] = 0;
			hY[8] = 0;
			hY[9] = 0;
			hY[10] = 1;
			hY[11] = 0;
			hY[12] = 0;
			hY[13] = 0;
			hY[14] = 0;
			hY[15] = 1;
			return hY
		};
		e.transpose = function(h1, h0) {
			if(h1 === h0) {
				var h5 = h0[1],
					h3 = h0[2],
					h2 = h0[3],
					hY = h0[6],
					h4 = h0[7],
					hZ = h0[11];
				h1[1] = h0[4];
				h1[2] = h0[8];
				h1[3] = h0[12];
				h1[4] = h5;
				h1[6] = h0[9];
				h1[7] = h0[13];
				h1[8] = h3;
				h1[9] = hY;
				h1[11] = h0[14];
				h1[12] = h2;
				h1[13] = h4;
				h1[14] = hZ
			} else {
				h1[0] = h0[0];
				h1[1] = h0[4];
				h1[2] = h0[8];
				h1[3] = h0[12];
				h1[4] = h0[1];
				h1[5] = h0[5];
				h1[6] = h0[9];
				h1[7] = h0[13];
				h1[8] = h0[2];
				h1[9] = h0[6];
				h1[10] = h0[10];
				h1[11] = h0[14];
				h1[12] = h0[3];
				h1[13] = h0[7];
				h1[14] = h0[11];
				h1[15] = h0[15]
			}
			return h1
		};
		e.invert = function(ii, io) {
			var it = io[0],
				iq = io[1],
				ip = io[2],
				il = io[3],
				h2 = io[4],
				h1 = io[5],
				h0 = io[6],
				hZ = io[7],
				ih = io[8],
				ig = io[9],
				ie = io[10],
				id = io[11],
				iv = io[12],
				iu = io[13],
				ir = io[14],
				im = io[15],
				ic = it * h1 - iq * h2,
				ib = it * h0 - ip * h2,
				ia = it * hZ - il * h2,
				h9 = iq * h0 - ip * h1,
				h8 = iq * hZ - il * h1,
				h7 = ip * hZ - il * h0,
				h6 = ih * iu - ig * iv,
				h5 = ih * ir - ie * iv,
				h4 = ih * im - id * iv,
				h3 = ig * ir - ie * iu,
				ik = ig * im - id * iu,
				ij = ie * im - id * ir,
				hY = ic * ij - ib * ik + ia * h3 + h9 * h4 - h8 * h5 + h7 * h6;
			if(!hY) {
				return null
			}
			hY = 1 / hY;
			ii[0] = (h1 * ij - h0 * ik + hZ * h3) * hY;
			ii[1] = (ip * ik - iq * ij - il * h3) * hY;
			ii[2] = (iu * h7 - ir * h8 + im * h9) * hY;
			ii[3] = (ie * h8 - ig * h7 - id * h9) * hY;
			ii[4] = (h0 * h4 - h2 * ij - hZ * h5) * hY;
			ii[5] = (it * ij - ip * h4 + il * h5) * hY;
			ii[6] = (ir * ia - iv * h7 - im * ib) * hY;
			ii[7] = (ih * h7 - ie * ia + id * ib) * hY;
			ii[8] = (h2 * ik - h1 * h4 + hZ * h6) * hY;
			ii[9] = (iq * h4 - it * ik - il * h6) * hY;
			ii[10] = (iv * h8 - iu * ia + im * ic) * hY;
			ii[11] = (ig * ia - ih * h8 - id * ic) * hY;
			ii[12] = (h1 * h5 - h2 * h3 - h0 * h6) * hY;
			ii[13] = (it * h3 - iq * h5 + ip * h6) * hY;
			ii[14] = (iu * ib - iv * h9 - ir * ic) * hY;
			ii[15] = (ih * h9 - ig * ib + ie * ic) * hY;
			return ii
		};
		e.adjoint = function(h6, h9) {
			var id = h9[0],
				ib = h9[1],
				ia = h9[2],
				h7 = h9[3],
				h1 = h9[4],
				h0 = h9[5],
				hZ = h9[6],
				hY = h9[7],
				h5 = h9[8],
				h4 = h9[9],
				h3 = h9[10],
				h2 = h9[11],
				ig = h9[12],
				ie = h9[13],
				ic = h9[14],
				h8 = h9[15];
			h6[0] = (h0 * (h3 * h8 - h2 * ic) - h4 * (hZ * h8 - hY * ic) + ie * (hZ * h2 - hY * h3));
			h6[1] = -(ib * (h3 * h8 - h2 * ic) - h4 * (ia * h8 - h7 * ic) + ie * (ia * h2 - h7 * h3));
			h6[2] = (ib * (hZ * h8 - hY * ic) - h0 * (ia * h8 - h7 * ic) + ie * (ia * hY - h7 * hZ));
			h6[3] = -(ib * (hZ * h2 - hY * h3) - h0 * (ia * h2 - h7 * h3) + h4 * (ia * hY - h7 * hZ));
			h6[4] = -(h1 * (h3 * h8 - h2 * ic) - h5 * (hZ * h8 - hY * ic) + ig * (hZ * h2 - hY * h3));
			h6[5] = (id * (h3 * h8 - h2 * ic) - h5 * (ia * h8 - h7 * ic) + ig * (ia * h2 - h7 * h3));
			h6[6] = -(id * (hZ * h8 - hY * ic) - h1 * (ia * h8 - h7 * ic) + ig * (ia * hY - h7 * hZ));
			h6[7] = (id * (hZ * h2 - hY * h3) - h1 * (ia * h2 - h7 * h3) + h5 * (ia * hY - h7 * hZ));
			h6[8] = (h1 * (h4 * h8 - h2 * ie) - h5 * (h0 * h8 - hY * ie) + ig * (h0 * h2 - hY * h4));
			h6[9] = -(id * (h4 * h8 - h2 * ie) - h5 * (ib * h8 - h7 * ie) + ig * (ib * h2 - h7 * h4));
			h6[10] = (id * (h0 * h8 - hY * ie) - h1 * (ib * h8 - h7 * ie) + ig * (ib * hY - h7 * h0));
			h6[11] = -(id * (h0 * h2 - hY * h4) - h1 * (ib * h2 - h7 * h4) + h5 * (ib * hY - h7 * h0));
			h6[12] = -(h1 * (h4 * ic - h3 * ie) - h5 * (h0 * ic - hZ * ie) + ig * (h0 * h3 - hZ * h4));
			h6[13] = (id * (h4 * ic - h3 * ie) - h5 * (ib * ic - ia * ie) + ig * (ib * h3 - ia * h4));
			h6[14] = -(id * (h0 * ic - hZ * ie) - h1 * (ib * ic - ia * ie) + ig * (ib * hZ - ia * h0));
			h6[15] = (id * (h0 * h3 - hZ * h4) - h1 * (ib * h3 - ia * h4) + h5 * (ib * hZ - ia * h0));
			return h6
		};
		e.determinant = function(ik) {
			var iq = ik[0],
				io = ik[1],
				il = ik[2],
				ij = ik[3],
				h1 = ik[4],
				h0 = ik[5],
				hZ = ik[6],
				hY = ik[7],
				ig = ik[8],
				ie = ik[9],
				id = ik[10],
				ic = ik[11],
				it = ik[12],
				ir = ik[13],
				ip = ik[14],
				im = ik[15],
				ib = iq * h0 - io * h1,
				ia = iq * hZ - il * h1,
				h9 = iq * hY - ij * h1,
				h8 = io * hZ - il * h0,
				h7 = io * hY - ij * h0,
				h6 = il * hY - ij * hZ,
				h5 = ig * ir - ie * it,
				h4 = ig * ip - id * it,
				h3 = ig * im - ic * it,
				h2 = ie * ip - id * ir,
				ii = ie * im - ic * ir,
				ih = id * im - ic * ip;
			return ib * ih - ia * ii + h9 * h2 + h8 * h3 - h7 * h4 + h6 * h5
		};
		e.multiply = function(ia, ie, ib) {
			var ij = ie[0],
				ii = ie[1],
				ig = ie[2],
				ic = ie[3],
				h4 = ie[4],
				h2 = ie[5],
				h0 = ie[6],
				hY = ie[7],
				h9 = ie[8],
				h8 = ie[9],
				h7 = ie[10],
				h6 = ie[11],
				il = ie[12],
				ik = ie[13],
				ih = ie[14],
				id = ie[15];
			var h5 = ib[0],
				h3 = ib[1],
				h1 = ib[2],
				hZ = ib[3];
			ia[0] = h5 * ij + h3 * h4 + h1 * h9 + hZ * il;
			ia[1] = h5 * ii + h3 * h2 + h1 * h8 + hZ * ik;
			ia[2] = h5 * ig + h3 * h0 + h1 * h7 + hZ * ih;
			ia[3] = h5 * ic + h3 * hY + h1 * h6 + hZ * id;
			h5 = ib[4];
			h3 = ib[5];
			h1 = ib[6];
			hZ = ib[7];
			ia[4] = h5 * ij + h3 * h4 + h1 * h9 + hZ * il;
			ia[5] = h5 * ii + h3 * h2 + h1 * h8 + hZ * ik;
			ia[6] = h5 * ig + h3 * h0 + h1 * h7 + hZ * ih;
			ia[7] = h5 * ic + h3 * hY + h1 * h6 + hZ * id;
			h5 = ib[8];
			h3 = ib[9];
			h1 = ib[10];
			hZ = ib[11];
			ia[8] = h5 * ij + h3 * h4 + h1 * h9 + hZ * il;
			ia[9] = h5 * ii + h3 * h2 + h1 * h8 + hZ * ik;
			ia[10] = h5 * ig + h3 * h0 + h1 * h7 + hZ * ih;
			ia[11] = h5 * ic + h3 * hY + h1 * h6 + hZ * id;
			h5 = ib[12];
			h3 = ib[13];
			h1 = ib[14];
			hZ = ib[15];
			ia[12] = h5 * ij + h3 * h4 + h1 * h9 + hZ * il;
			ia[13] = h5 * ii + h3 * h2 + h1 * h8 + hZ * ik;
			ia[14] = h5 * ig + h3 * h0 + h1 * h7 + hZ * ih;
			ia[15] = h5 * ic + h3 * hY + h1 * h6 + hZ * id;
			return ia
		};
		e.mul = e.multiply;
		e.translate = function(ia, ic, h5) {
			var h4 = h5[0],
				h3 = h5[1],
				h2 = h5[2],
				ig, ie, id, ib, h1, h0, hZ, hY, h9, h8, h7, h6;
			if(ic === ia) {
				ia[12] = ic[0] * h4 + ic[4] * h3 + ic[8] * h2 + ic[12];
				ia[13] = ic[1] * h4 + ic[5] * h3 + ic[9] * h2 + ic[13];
				ia[14] = ic[2] * h4 + ic[6] * h3 + ic[10] * h2 + ic[14];
				ia[15] = ic[3] * h4 + ic[7] * h3 + ic[11] * h2 + ic[15]
			} else {
				ig = ic[0];
				ie = ic[1];
				id = ic[2];
				ib = ic[3];
				h1 = ic[4];
				h0 = ic[5];
				hZ = ic[6];
				hY = ic[7];
				h9 = ic[8];
				h8 = ic[9];
				h7 = ic[10];
				h6 = ic[11];
				ia[0] = ig;
				ia[1] = ie;
				ia[2] = id;
				ia[3] = ib;
				ia[4] = h1;
				ia[5] = h0;
				ia[6] = hZ;
				ia[7] = hY;
				ia[8] = h9;
				ia[9] = h8;
				ia[10] = h7;
				ia[11] = h6;
				ia[12] = ig * h4 + h1 * h3 + h9 * h2 + ic[12];
				ia[13] = ie * h4 + h0 * h3 + h8 * h2 + ic[13];
				ia[14] = id * h4 + hZ * h3 + h7 * h2 + ic[14];
				ia[15] = ib * h4 + hY * h3 + h6 * h2 + ic[15]
			}
			return ia
		};
		e.scale = function(h1, hZ, h0) {
			var hY = h0[0],
				h3 = h0[1],
				h2 = h0[2];
			h1[0] = hZ[0] * hY;
			h1[1] = hZ[1] * hY;
			h1[2] = hZ[2] * hY;
			h1[3] = hZ[3] * hY;
			h1[4] = hZ[4] * h3;
			h1[5] = hZ[5] * h3;
			h1[6] = hZ[6] * h3;
			h1[7] = hZ[7] * h3;
			h1[8] = hZ[8] * h2;
			h1[9] = hZ[9] * h2;
			h1[10] = hZ[10] * h2;
			h1[11] = hZ[11] * h2;
			h1[12] = hZ[12];
			h1[13] = hZ[13];
			h1[14] = hZ[14];
			h1[15] = hZ[15];
			return h1
		};
		e.rotate = function(ij, ir, iu, hY) {
			var h8 = hY[0],
				h7 = hY[1],
				h6 = hY[2],
				ik = Math.sqrt(h8 * h8 + h7 * h7 + h6 * h6),
				id, ip, ic, iw, iv, it, iq, h5, h4, h3, h2, ii, ih, ig, ie, ib, ia, h9, io, im, il, h1, h0, hZ;
			if(Math.abs(ik) < hX) {
				return null
			}
			ik = 1 / ik;
			h8 *= ik;
			h7 *= ik;
			h6 *= ik;
			id = Math.sin(iu);
			ip = Math.cos(iu);
			ic = 1 - ip;
			iw = ir[0];
			iv = ir[1];
			it = ir[2];
			iq = ir[3];
			h5 = ir[4];
			h4 = ir[5];
			h3 = ir[6];
			h2 = ir[7];
			ii = ir[8];
			ih = ir[9];
			ig = ir[10];
			ie = ir[11];
			ib = h8 * h8 * ic + ip;
			ia = h7 * h8 * ic + h6 * id;
			h9 = h6 * h8 * ic - h7 * id;
			io = h8 * h7 * ic - h6 * id;
			im = h7 * h7 * ic + ip;
			il = h6 * h7 * ic + h8 * id;
			h1 = h8 * h6 * ic + h7 * id;
			h0 = h7 * h6 * ic - h8 * id;
			hZ = h6 * h6 * ic + ip;
			ij[0] = iw * ib + h5 * ia + ii * h9;
			ij[1] = iv * ib + h4 * ia + ih * h9;
			ij[2] = it * ib + h3 * ia + ig * h9;
			ij[3] = iq * ib + h2 * ia + ie * h9;
			ij[4] = iw * io + h5 * im + ii * il;
			ij[5] = iv * io + h4 * im + ih * il;
			ij[6] = it * io + h3 * im + ig * il;
			ij[7] = iq * io + h2 * im + ie * il;
			ij[8] = iw * h1 + h5 * h0 + ii * hZ;
			ij[9] = iv * h1 + h4 * h0 + ih * hZ;
			ij[10] = it * h1 + h3 * h0 + ig * hZ;
			ij[11] = iq * h1 + h2 * h0 + ie * hZ;
			if(ir !== ij) {
				ij[12] = ir[12];
				ij[13] = ir[13];
				ij[14] = ir[14];
				ij[15] = ir[15]
			}
			return ij
		};
		e.rotateX = function(hY, h5, h4) {
			var ia = Math.sin(h4),
				h3 = Math.cos(h4),
				h9 = h5[4],
				h8 = h5[5],
				h7 = h5[6],
				h6 = h5[7],
				h2 = h5[8],
				h1 = h5[9],
				h0 = h5[10],
				hZ = h5[11];
			if(h5 !== hY) {
				hY[0] = h5[0];
				hY[1] = h5[1];
				hY[2] = h5[2];
				hY[3] = h5[3];
				hY[12] = h5[12];
				hY[13] = h5[13];
				hY[14] = h5[14];
				hY[15] = h5[15]
			}
			hY[4] = h9 * h3 + h2 * ia;
			hY[5] = h8 * h3 + h1 * ia;
			hY[6] = h7 * h3 + h0 * ia;
			hY[7] = h6 * h3 + hZ * ia;
			hY[8] = h2 * h3 - h9 * ia;
			hY[9] = h1 * h3 - h8 * ia;
			hY[10] = h0 * h3 - h7 * ia;
			hY[11] = hZ * h3 - h6 * ia;
			return hY
		};
		e.rotateY = function(h2, h9, h8) {
			var ia = Math.sin(h8),
				h7 = Math.cos(h8),
				h1 = h9[0],
				h0 = h9[1],
				hZ = h9[2],
				hY = h9[3],
				h6 = h9[8],
				h5 = h9[9],
				h4 = h9[10],
				h3 = h9[11];
			if(h9 !== h2) {
				h2[4] = h9[4];
				h2[5] = h9[5];
				h2[6] = h9[6];
				h2[7] = h9[7];
				h2[12] = h9[12];
				h2[13] = h9[13];
				h2[14] = h9[14];
				h2[15] = h9[15]
			}
			h2[0] = h1 * h7 - h6 * ia;
			h2[1] = h0 * h7 - h5 * ia;
			h2[2] = hZ * h7 - h4 * ia;
			h2[3] = hY * h7 - h3 * ia;
			h2[8] = h1 * ia + h6 * h7;
			h2[9] = h0 * ia + h5 * h7;
			h2[10] = hZ * ia + h4 * h7;
			h2[11] = hY * ia + h3 * h7;
			return h2
		};
		e.rotateZ = function(h2, h5, h4) {
			var ia = Math.sin(h4),
				h3 = Math.cos(h4),
				h1 = h5[0],
				h0 = h5[1],
				hZ = h5[2],
				hY = h5[3],
				h9 = h5[4],
				h8 = h5[5],
				h7 = h5[6],
				h6 = h5[7];
			if(h5 !== h2) {
				h2[8] = h5[8];
				h2[9] = h5[9];
				h2[10] = h5[10];
				h2[11] = h5[11];
				h2[12] = h5[12];
				h2[13] = h5[13];
				h2[14] = h5[14];
				h2[15] = h5[15]
			}
			h2[0] = h1 * h3 + h9 * ia;
			h2[1] = h0 * h3 + h8 * ia;
			h2[2] = hZ * h3 + h7 * ia;
			h2[3] = hY * h3 + h6 * ia;
			h2[4] = h9 * h3 - h1 * ia;
			h2[5] = h8 * h3 - h0 * ia;
			h2[6] = h7 * h3 - hZ * ia;
			h2[7] = h6 * h3 - hY * ia;
			return h2
		};
		e.fromRotationTranslation = function(ib, h9, h7) {
			var h4 = h9[0],
				h3 = h9[1],
				h2 = h9[2],
				h5 = h9[3],
				ic = h4 + h4,
				hY = h3 + h3,
				h6 = h2 + h2,
				h1 = h4 * ic,
				h0 = h4 * hY,
				hZ = h4 * h6,
				ia = h3 * hY,
				h8 = h3 * h6,
				ig = h2 * h6,
				ih = h5 * ic,
				ie = h5 * hY,
				id = h5 * h6;
			ib[0] = 1 - (ia + ig);
			ib[1] = h0 + id;
			ib[2] = hZ - ie;
			ib[3] = 0;
			ib[4] = h0 - id;
			ib[5] = 1 - (h1 + ig);
			ib[6] = h8 + ih;
			ib[7] = 0;
			ib[8] = hZ + ie;
			ib[9] = h8 - ih;
			ib[10] = 1 - (h1 + ia);
			ib[11] = 0;
			ib[12] = h7[0];
			ib[13] = h7[1];
			ib[14] = h7[2];
			ib[15] = 1;
			return ib
		};
		e.fromQuat = function(h8, h5) {
			var h2 = h5[0],
				h1 = h5[1],
				h0 = h5[2],
				h3 = h5[3],
				h9 = h2 + h2,
				hY = h1 + h1,
				h4 = h0 + h0,
				hZ = h2 * h9,
				h7 = h1 * h9,
				h6 = h1 * hY,
				ig = h0 * h9,
				ie = h0 * hY,
				ic = h0 * h4,
				id = h3 * h9,
				ib = h3 * hY,
				ia = h3 * h4;
			h8[0] = 1 - h6 - ic;
			h8[1] = h7 + ia;
			h8[2] = ig - ib;
			h8[3] = 0;
			h8[4] = h7 - ia;
			h8[5] = 1 - hZ - ic;
			h8[6] = ie + id;
			h8[7] = 0;
			h8[8] = ig + ib;
			h8[9] = ie - id;
			h8[10] = 1 - hZ - h6;
			h8[11] = 0;
			h8[12] = 0;
			h8[13] = 0;
			h8[14] = 0;
			h8[15] = 1;
			return h8
		};
		e.frustum = function(h2, hZ, h7, hY, h6, h4, h3) {
			var h5 = 1 / (h7 - hZ),
				h1 = 1 / (h6 - hY),
				h0 = 1 / (h4 - h3);
			h2[0] = (h4 * 2) * h5;
			h2[1] = 0;
			h2[2] = 0;
			h2[3] = 0;
			h2[4] = 0;
			h2[5] = (h4 * 2) * h1;
			h2[6] = 0;
			h2[7] = 0;
			h2[8] = (h7 + hZ) * h5;
			h2[9] = (h6 + hY) * h1;
			h2[10] = (h3 + h4) * h0;
			h2[11] = -1;
			h2[12] = 0;
			h2[13] = 0;
			h2[14] = (h3 * h4 * 2) * h0;
			h2[15] = 0;
			return h2
		};
		e.perspective = function(h1, h0, hZ, h2, hY) {
			var h4 = 1 / Math.tan(h0 / 2),
				h3 = 1 / (h2 - hY);
			h1[0] = h4 / hZ;
			h1[1] = 0;
			h1[2] = 0;
			h1[3] = 0;
			h1[4] = 0;
			h1[5] = h4;
			h1[6] = 0;
			h1[7] = 0;
			h1[8] = 0;
			h1[9] = 0;
			h1[10] = (hY + h2) * h3;
			h1[11] = -1;
			h1[12] = 0;
			h1[13] = 0;
			h1[14] = (2 * hY * h2) * h3;
			h1[15] = 0;
			return h1
		};
		e.ortho = function(h1, hZ, h7, hY, h5, h4, h3) {
			var h2 = 1 / (hZ - h7),
				h6 = 1 / (hY - h5),
				h0 = 1 / (h4 - h3);
			h1[0] = -2 * h2;
			h1[1] = 0;
			h1[2] = 0;
			h1[3] = 0;
			h1[4] = 0;
			h1[5] = -2 * h6;
			h1[6] = 0;
			h1[7] = 0;
			h1[8] = 0;
			h1[9] = 0;
			h1[10] = 2 * h0;
			h1[11] = 0;
			h1[12] = (hZ + h7) * h2;
			h1[13] = (h5 + hY) * h6;
			h1[14] = (h3 + h4) * h0;
			h1[15] = 1;
			return h1
		};
		e.lookAt = function(ic, ik, il, h4) {
			var ij, ii, ig, h0, hZ, hY, h7, h6, h5, id, ih = ik[0],
				ie = ik[1],
				ib = ik[2],
				h3 = h4[0],
				h2 = h4[1],
				h1 = h4[2],
				ia = il[0],
				h9 = il[1],
				h8 = il[2];
			if(Math.abs(ih - ia) < hX && Math.abs(ie - h9) < hX && Math.abs(ib - h8) < hX) {
				return e.identity(ic)
			}
			h7 = ih - ia;
			h6 = ie - h9;
			h5 = ib - h8;
			id = 1 / Math.sqrt(h7 * h7 + h6 * h6 + h5 * h5);
			h7 *= id;
			h6 *= id;
			h5 *= id;
			ij = h2 * h5 - h1 * h6;
			ii = h1 * h7 - h3 * h5;
			ig = h3 * h6 - h2 * h7;
			id = Math.sqrt(ij * ij + ii * ii + ig * ig);
			if(!id) {
				ij = 0;
				ii = 0;
				ig = 0
			} else {
				id = 1 / id;
				ij *= id;
				ii *= id;
				ig *= id
			}
			h0 = h6 * ig - h5 * ii;
			hZ = h5 * ij - h7 * ig;
			hY = h7 * ii - h6 * ij;
			id = Math.sqrt(h0 * h0 + hZ * hZ + hY * hY);
			if(!id) {
				h0 = 0;
				hZ = 0;
				hY = 0
			} else {
				id = 1 / id;
				h0 *= id;
				hZ *= id;
				hY *= id
			}
			ic[0] = ij;
			ic[1] = h0;
			ic[2] = h7;
			ic[3] = 0;
			ic[4] = ii;
			ic[5] = hZ;
			ic[6] = h6;
			ic[7] = 0;
			ic[8] = ig;
			ic[9] = hY;
			ic[10] = h5;
			ic[11] = 0;
			ic[12] = -(ij * ih + ii * ie + ig * ib);
			ic[13] = -(h0 * ih + hZ * ie + hY * ib);
			ic[14] = -(h7 * ih + h6 * ie + h5 * ib);
			ic[15] = 1;
			return ic
		};
		e.str = function(hY) {
			return "mat4(" + hY[0] + ", " + hY[1] + ", " + hY[2] + ", " + hY[3] + ", " + hY[4] + ", " + hY[5] + ", " + hY[6] + ", " + hY[7] + ", " + hY[8] + ", " + hY[9] + ", " + hY[10] + ", " + hY[11] + ", " + hY[12] + ", " + hY[13] + ", " + hY[14] + ", " + hY[15] + ")"
		};
		e.frob = function(hY) {
			return(Math.sqrt(Math.pow(hY[0], 2) + Math.pow(hY[1], 2) + Math.pow(hY[2], 2) + Math.pow(hY[3], 2) + Math.pow(hY[4], 2) + Math.pow(hY[5], 2) + Math.pow(hY[6], 2) + Math.pow(hY[6], 2) + Math.pow(hY[7], 2) + Math.pow(hY[8], 2) + Math.pow(hY[9], 2) + Math.pow(hY[10], 2) + Math.pow(hY[11], 2) + Math.pow(hY[12], 2) + Math.pow(hY[13], 2) + Math.pow(hY[14], 2) + Math.pow(hY[15], 2)))
		};
		hT.mat4 = e
	})(window);

	function dc() {
		this.result = {
			bkData: [],
			eleData: [
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[],
				[]
			],
			tileLabels: []
		}
	}
	C.extend(dc.prototype, {
		createLayer: function(T, i) {
			var e = this.result.bkData;
			i = i || {};
			if(!e[T]) {
				e[T] = [
					[],
					[],
					[]
				]
			}
			e[T].dataType = i.dataType || 2;
			e[T].png8 = i.png8 || false;
			e[T].clipTile = i.clipTile || false
		},
		removeLayer: function(i) {
			var e = this.result.bkData;
			e[i] = null
		},
		getResult: function() {
			return this.result
		},
		setData: function(hS, hR, hT) {
			var e = this.result.bkData;
			var T = e[hR] ? e[hR][hT] : null;
			if(!T) {
				return
			}
			for(var hQ = 0; hQ < T.length; hQ++) {
				if(T[hQ].key && T[hQ].key === hS.key) {
					T[hQ] = hS;
					return
				}
			}
			T.push(hS)
		},
		setLabelData: function(e) {
			this.result.tileLabels = e
		},
		getLabelData: function() {
			return this.result.tileLabels
		},
		setOverlayData: function(i, e) {
			if(!this.result.eleData[e]) {
				return
			}
			this.result.eleData[e] = i
		},
		clearLabelOverlayData: function() {
			this.result.eleData[2] = [];
			this.result.eleData[3] = [];
			this.result.eleData[4] = []
		},
		clearData: function(hQ) {
			var e = this.result.bkData;
			if(typeof hQ === "number") {
				if(e[hQ]) {
					e[hQ][0] = [];
					e[hQ][1] = [];
					e[hQ][2] = []
				}
				return
			}
			for(var T = 0; T < e.length; T++) {
				if(!e[T]) {
					continue
				}
				e[T][0] = [];
				e[T][1] = [];
				e[T][2] = []
			}
		},
		sortThumbData: function(i) {
			var e = this.result.bkData;
			var T = e[i];
			if(!T) {
				return
			}
			if(T[0] && T[0].length > 0) {
				T[0].sort(function(hR, hQ) {
					return hR.tileInfo.useZoom - hQ.tileInfo.useZoom
				})
			}
		}
	});
	var fh = (function() {
		var h0 = new Int8Array(4);
		var T = new Int32Array(h0.buffer, 0, 1);
		var hV = new Float32Array(h0.buffer, 0, 1);

		function h2(h9) {
			T[0] = h9;
			return hV[0]
		}

		function i(h9) {
			hV[0] = h9;
			return T[0]
		}

		function hW(h9) {
			var ib = (h9[3] << 24 | h9[2] << 16 | h9[1] << 8 | h9[0]);
			var ia = h2(ib & 4278190079);
			return ia
		}
		var hR = 0;
		var hU = 1;
		var hY = 2;
		var h6 = 0;
		var h3 = 1;
		var h1 = 2;
		var hS = 9;

		function hZ(h9, ia) {
			var ib;
			if(ia % 2 === 0) {
				ib = [-h9[1], h9[0]]
			} else {
				ib = [h9[1], -h9[0]]
			}
			return ib
		}

		function e(h9, ia, ib) {
			var ic = hZ(h9, ia);
			var id;
			if(ib === hU) {
				return ic
			} else {
				if(ia === 4 || ia === 5) {
					id = [ic[0] - h9[0], ic[1] - h9[1]]
				} else {
					id = [ic[0] + h9[0], ic[1] + h9[1]]
				}
				if(ib === hR) {
					vec2.normalize(id, id)
				}
				return id
			}
		}

		function h5(ia, h9) {
			return Math.sqrt(Math.pow(ia[0] - h9[0], 2) + Math.pow(ia[1] - h9[1], 2))
		}

		function hQ(id, ic, ib, h9) {
			var ia = vec2.dot(id, ic);
			if(ib === h1 || ib === h3) {
				if((h9 === 0 || h9 === 1) && ia > 0) {
					return true
				} else {
					if((h9 === 2 || h9 === 3) && ia < 0) {
						return true
					}
				}
			}
			if((h9 === 0 || h9 === 1) && ia < 0) {
				return true
			} else {
				if((h9 === 2 || h9 === 3) && ia > 0) {
					return true
				}
			}
			return false
		}

		function hX(ia, ig, ii) {
			var ih = hZ(ia, ig);
			var ic;
			var ie = ia;
			var id = ii;
			var ik = [];
			vec2.normalize(ik, [ie[0] + id[0], ie[1] + id[1]]);
			var ij = vec2.dot(ih, [-ik[1], ik[0]]);
			if(Math.abs(ij) < 0.1) {
				ij = 1
			}
			var ib = 1 / ij;
			ic = [-ik[1] * ib, ik[0] * ib];
			var h9 = vec2.dot(ia, ic);
			if(h9 < 0) {
				vec2.negate(ic, ic)
			}
			return {
				cos2: h9,
				offset: ic
			}
		}

		function h8(ia, ig, ii, h9) {
			var ih = hZ(ia, ig);
			var ie;
			var id;
			var ic;
			if(ig === 0 || ig === 1) {
				ie = ii;
				id = ia
			} else {
				ie = ia;
				id = ii
			}
			if(!ie || !id) {
				return ih
			}
			var ik = [ie[0] + id[0], ie[1] + id[1]];
			if(ik[0] === 0 && ik[1] === 0) {
				vec2.normalize(ik, id)
			} else {
				vec2.normalize(ik, ik)
			}
			var il = hQ(ik, ih, h9, ig);
			if(il) {
				return ih
			}
			var ij = vec2.dot(ih, [-ik[1], ik[0]]);
			if(Math.abs(ij) < 0.1) {
				ij = 1
			}
			var ib = 1 / ij;
			ic = [-ik[1] * ib, ik[0] * ib];
			return ic
		}

		function h7(il, im, ie, id, io, ik, ic, ig, ib, ij) {
			var ii;
			var ia = 0;
			var h9 = false;
			ii = ik.length / hS - 1;
			hT(im[0], il[0], ie[0], io, id, 4, ig, ib, undefined, ik, ij);
			ii++;
			ia++;
			hT(im[0], il[0], ie[0], io, id, 5, ig, ib, undefined, ik, ij);
			ii++;
			ia++;
			for(var ih = 0; ih < il.length; ih++) {
				hT(im[ih], il[ih], ie[ih], io, id, 0, ig, ib, il[ih - 1], ik, ij);
				h4(ic, ++ii, ++ia, h9);
				hT(im[ih], il[ih], ie[ih], io, id, 1, ig, ib, il[ih - 1], ik, ij);
				h4(ic, ++ii, ++ia, h9);
				hT(im[ih + 1], il[ih], ie[ih + 1], io, id, 2, ig, ib, il[ih + 1], ik, ij);
				h4(ic, ++ii, ++ia, h9);
				hT(im[ih + 1], il[ih], ie[ih + 1], io, id, 3, ig, ib, il[ih + 1], ik, ij);
				h4(ic, ++ii, ++ia, h9);
				if(id === h3 && ih !== il.length - 1) {
					hT(im[ih + 1], il[ih], ie[ih + 1], io, id, 8, ig, ib, il[ih + 1], ik, ij);
					h4(ic, ++ii, ++ia, h9);
					h9 = h9 ? false : true
				}
			}
			hT(im[im.length - 1], il[il.length - 1], ie[im.length - 1], io, id, 6, ig, ib, undefined, ik, ij);
			h4(ic, ++ii, ++ia, h9);
			hT(im[im.length - 1], il[il.length - 1], ie[im.length - 1], io, id, 7, ig, ib, undefined, ik, ij);
			h4(ic, ++ii, ++ia, h9)
		}

		function hT(io, ic, ih, ip, ib, ii, ie, ia, il, ik, ij) {
			var im = ii % 2 === 0 ? 1 : -1;
			var ig;
			if(ii === 4 || ii === 5 || ii === 6 || ii === 7) {
				ig = e(ic, ii, ip)
			} else {
				if(ii === 0 || ii === 1 || ii === 2 || ii === 3) {
					ig = h8(ic, ii, il, ib)
				} else {
					if(ii === 8) {
						var id = hX(ic, ii, il);
						ig = id.offset;
						vec2.normalize(ig, ig);
						var h9 = id.cos2;
						if(h9 < 0) {
							im = -im
						}
					}
				}
			}
			ik[ik.length] = io[0] * 10;
			ik[ik.length] = io[1] * 10;
			ik[ik.length] = ig[0] * ia * 10;
			ik[ik.length] = ig[1] * ia * 10;
			ik[ik.length] = ie;
			ik[ik.length] = im;
			ik[ik.length] = 0;
			ik[ik.length] = ij || 0;
			ik[ik.length] = ih
		}

		function h4(id, ib, h9, ic) {
			var ia;
			if(h9 % 2 === 0) {
				if(ic) {
					id[id.length] = ib - 2;
					id[id.length] = ib - 1;
					id[id.length] = ib
				} else {
					id[id.length] = ib - 1;
					id[id.length] = ib - 2;
					id[id.length] = ib
				}
			} else {
				if(ic) {
					id[id.length] = ib - 1;
					id[id.length] = ib - 2;
					id[id.length] = ib
				} else {
					id[id.length] = ib - 2;
					id[id.length] = ib - 1;
					id[id.length] = ib
				}
			}
		}
		return {
			getVertexCount: function(ia, h9) {
				if(h9 === h3) {
					return ia * 5 - 2
				} else {
					return ia * 4
				}
			},
			buildData: function(il, ib, im, ii, h9, ie, ia, ij) {
				var ik = [];
				var ih = 0;
				var id = [0];
				for(var ig = 0; ig < il.length; ig++) {
					if(ig > 0) {
						ih += h5(il[ig], il[ig - 1]);
						id.push(ih * 10)
					}
					if(ig !== il.length - 1) {
						var ic = [il[ig + 1][0] - il[ig][0], il[ig + 1][1] - il[ig][1]];
						var io = [];
						if(ic[0] === 0 && ic[1] === 0) {
							io = [0, 0]
						} else {
							vec2.normalize(io, ic)
						}
						ik[ik.length] = [io[0], io[1]]
					}
				}
				return h7(ik, il, id, ib, im, ii, h9, hW(ie), ia, ij)
			},
			toTileSolidLineVertices: function(id, ia) {
				var ib = new Float32Array(id.length / hS * 5);
				var h9 = new Int16Array(ib.buffer);
				var ig = 0;
				var ic = 0;
				for(var ie = 0; ie < id.length; ie += hS) {
					h9[ig] = ~~id[ie];
					h9[ig + 1] = ~~id[ie + 1];
					h9[ig + 2] = ~~id[ie + 2];
					h9[ig + 3] = ~~id[ie + 3];
					ib[ic + 2] = id[ie + 4];
					h9[ig + 6] = id[ie + 5];
					h9[ig + 7] = ia ? ia : 0;
					h9[ig + 8] = id[ie + 7];
					h9[ig + 9] = 0;
					ig += 10;
					ic += 5
				}
				return ib
			}
		}
	})();
	var eH = 1;
	var gs = 2;
	var fS = {
		drawIndex: 0,
		devicePixelRatio: a6(),
		zoomState: 1,
		curViewTilesInfo: null,
		iconSetImg: null,
		LAST_CALC_ZOOM: -1,
		LAST_LOAD_VECTOR_ZOOM_CHANGE: false,
		lastCollisionTestTime: 0,
		remove: function() {
			this.tileCache.clear()
		},
		initDrawData: function() {
			this.drawIndex = this.zIndex;
			this.map._featureMgr.createLayer(this.drawIndex, {
				dataType: this.dataType,
				png8: this.png8,
				clipTile: this.clipTile
			})
		},
		destroyDrawData: function() {
			this.map._featureMgr.removeLayer(this.drawIndex)
		},
		setZIndex: function(e) {
			this.zIndex = e
		},
		getTileKey: function(e, hQ) {
			hQ = hQ || {};
			var i = typeof hQ.useZoom === "number" ? hQ.useZoom : e.useZoom;
			var T = e.style || this.mapStyleId || "default";
			return this.mapType + "_" + T + "_" + e.col + "_" + e.row + "_" + e.zoom + "_" + i
		},
		getTileRenderDataKey: function(i) {
			var T = i.col;
			var hQ = i.zoom;
			var e = i.baseTileSize;
			T = d4.calcLoopParam(T, hQ, e).col;
			return this.mapType + "_" + T + "_" + i.row + "_" + hQ + "_" + i.useZoom
		},
		getTileUnits: function(e) {
			var hQ = this.map;
			var T = b6[hQ.getMapType()];
			var i = T.baseUnits * Math.pow(2, T.zoomLevelBase - e);
			return i
		},
		getTilesUrl: function(hR, h0, h1) {
			///////////guoyansi  关键方法：缩放时调用的地图信息
			//console.log("鼠标位置hR{x,y}");
			//console.log(hR);
			var i = hR.x;//x坐标
			var h2 = hR.y;//y坐标
			var hX = aD("ditu", "normal");
			var hT = hX.ver;
			var hU = hX.udt;
			i = d4.calcLoopParam(i, h0, h1).col;
			var hZ = b6.B_NORMAL_MAP.vectorTileUrls;
			var hS = Math.abs(i + h2) % hZ.length;
			var hY = hZ[hS];
			if(window.offLineIPAddress) {
				hZ = [window.offLineIPAddress + "pvd/"];
				hY = hZ[0]
			}
			//hY="http://maponline2.bdimg.com/pvd/";
			//hY="http://localhost/baidu2/pvd/";
			//guoyansi
			hY=bd_map_cfg.wp_proxy_pass;
					
			
			//console.log("hY:"+hY);
			var T = "x=" + i + "&y=" + h2 + "&z=" + Math.floor(h0);
			//var T = "x=100&y=100&z=" + Math.floor(h0);
			var hW = this.devicePixelRatio > 1 ? "&scaler=2" : "";
			var hV = "&textimg=1";
			if(this.map.config.textRenderType === "canvas") {
				hV = "&textimg=0"
			}
			var hQ = this.map.config.style;
			if(typeof hQ === "string" && hQ !== "default") {
				T += "&styleId=" + e3.mapStyleNameIdPair[hQ]
			}
			T += "&styles=pl" + hV + hW + "&v=" + hT + "&udt=" + hU + "&json=0";
			//console.log("T: "+T);
			//console.log("gk(T): "+gk(T));
			var e = hY + "?qt=vtile&param=" + window.encodeURIComponent(gk(T));
			//console.log("e===========缩放时重新获取地图路径");
			//console.log(hY + "?qt=vtile&param=" + gk(T));
			//e="http://maponline2.bdimg.com?qt=vtile&param=" + window.encodeURIComponent(gk(T));
			return e
		},
		getRasterTilesUrl: function(T, hS, hQ) {
			var hR = b6[this.map.mapType];
			var i = this.map.config.style;
			var e = hR.tileUrls[Math.abs(hS + T) % hR.tileUrls.length] + "?qt=tile&x=" + T + "&y=" + hS + "&z=" + hQ + ((i === "default" || typeof i !== "string") ? "" : ("&styleId=" + e3.mapStyleNameIdPair[i])) + "&styles=pl&udt=" + this.normalUdt + "&scaler=" + this.scaler + "&p=1";
			e = e.replace(/-(\d+)/gi, "M$1");
			return e
		},
		getZoomState: function() {
			var T = this.map;
			var i = T.getZoom();
			var e = i - this.lastZoom;
			if(e > 0) {
				this.zoomState = 1
			} else {
				if(e < 0) {
					this.zoomState = -1
				}
			}
			this.lastZoom = i;
			return this.zoomState
		},
		releaseOutViewTileData: function(e) {
			var hR = this.map._workerMgr.releasePendingData(e);
			for(var hQ = 0, T = hR.length; hQ < T; hQ++) {
				var hS = this.getTileKey(hR[hQ]);
				this.tileCache.removeData(hS)
			}
		},
		loadLayerData: function(e, hQ, i) {
			this.hasZoomChange = i;
			this.curViewTilesInfo = e;
			this.mapStyleId = this.map.getMapStyleId();
			this.releaseOutViewTileData(e);
			var T = this.getZoomState();
			if(this.dataType === gs) {
				if(hQ) {
					this.getVectorLayerDataFromCache(e, T)
				} else {
					this.loadVectorLayerData(e)
				}
			} else {
				this.loadRasterLayerData(e, hQ)
			}
		},
		getVectorLayerDataFromCache: function(hV, h5) {
			this.map.temp.isPermitSpotOver = false;
			this.tileLabels = [];
			if(this.baseLayer === true) {
				var hZ = this.map._customLabelMgr.virtualTile;
				if(hZ && hZ.label) {
					this.tileLabels.push(hZ.label)
				}
			}
			this.thumbCache = {};
			var h6 = -1;
			for(var h2 = 0, h0 = hV.length; h2 < h0; h2++) {
				var h3 = hV[h2];
				var hR = h3.col;
				var hS = h3.row;
				var T = h3.zoom;
				var h1 = this._getTileTexImgKey(h3);
				var hQ = h3.useZoom;
				h6 = T;
				var hT = this.getTileKey(h3);
				var h8 = this.tileCache.getData(hT);
				if(h8 && h8.status === "ready") {
					var h9 = h8;
					this.map._featureMgr.setData(h8, this.drawIndex, 2);
					if(h8.label) {
						if(h8.label.status === "ready") {
							h8.label.tileInfo = h8.tileInfo;
							this.tileLabels.push(h8.label);
							if(h8.label.textureSources && h8.label.textureSources[hQ] && this.map._webglMapScene) {
								var h7 = this.map._webglMapScene._painter;
								if(!h7._labelTextureAtlasOffset[h1]) {
									h7._addToAsyncJob(h8.label.textureSources[hQ])
								}
							}
						} else {
							if(h8.label.status !== "processing") {
								this.processLabelData(h8)
							}
						}
					}
				} else {
					var h4 = {
						tileInfo: h3,
						dataType: gs,
						key: hT
					};
					this.map._featureMgr.setData(h4, this.drawIndex, 2);
					if(this.useThumbData) {
						this.setThumbData(hR, hS, T, hQ, h5)
					}
				}
			}
			this.tileLabels.labelZoom = h6;
			this.updateLabels(h5);
			var hW = this.map.getZoom();
			var hU = Math.floor(hW);
			var hY = hW - hU;
			var hX = Math.floor(this.LAST_CALC_ZOOM);
			var e = this.LAST_CALC_ZOOM - hX;
			var ia = false;
			if(this.hasZoomChange) {
				if(Math.abs(hW - this.LAST_CALC_ZOOM) >= 0.5) {
					ia = true
				} else {
					if(hY < 0.5 && e >= 0.5) {
						ia = true
					} else {
						if(hY >= 0.5 && e < 0.5) {
							ia = true
						}
					}
				}
				if(ia) {
					this.cacheDataCollideLabels(0)
				}
				this.LAST_CALC_ZOOM = hW
			} else {
				if(this.tileLabels.length > 0) {
					this.cacheDataCollideLabels(C.Browser.ie ? 50 : 30)
				}
			}
		},
		loadVectorLayerData: function(hW) {
			this.map.temp.isPermitSpotOver = false;
			var hV = this;

			function hU(i, hX) {
				var hZ = hV.tileCache.getData(hX);
				if(!hZ) {
					return
				}
				if(!i || i.error) {
					var hY = new bb("ontileloaderror");
					i = i || {};
					hY.error = i.error || "";
					hY.message = i.message || "";
					hV.map.fire(hY);
					hZ.status = "init";
					hZ.reloadTimer = setTimeout(function() {
						if(hZ.retry < 3) {
							hZ.retry++;
							hZ.status = "loading";
							hV.loadVectorTileData(i.tileInfo, hU)
						} else {
							hV.tileCache.removeData(hX)
						}
					}, 4000);
					hV.map._featureMgr.clearData(hV.drawIndex);
					hV._checkTilesLoaded();
					hV.getVectorLayerDataFromCache(hV.curViewTilesInfo, hV.getZoomState());
					return
				}
				if(hZ.reloadTimer) {
					clearTimeout(hZ.reloadTimer);
					hZ.reloadTimer = null
				}
				hV.callbackDataQueue.push([i, hX]);
				if(hV.processDataTimer) {
					return
				}
				hV.processDataTimer = setTimeout(function() {
					while(hV.callbackDataQueue.length > 0) {
						var h0 = hV.callbackDataQueue.shift();
						hV.vectorTileDataCbk(h0[0], h0[1]);
						hV._checkTilesLoaded()
					}
					hV.map._featureMgr.clearData(hV.drawIndex);
					hV.getVectorLayerDataFromCache(hV.curViewTilesInfo, hV.getZoomState());
					hV.processDataTimer = null
				}, 200)
			}
			for(var hT = 0, hR = hW.length; hT < hR; hT++) {
				var T = hW[hT];
				var hS = this.getTileKey(T);
				var e = this.tileCache.getData(hS);
				if(!e) {
					e = {
						status: "init",
						tileInfo: T,
						dataType: gs,
						key: hS,
						retry: 0
					}
				}
				if(e.status !== "ready" && e.status !== "loading") {
					this.numLoading++;
					e.status = "loading";
					this.tileCache.setData(hS, e);
					var hQ = this.getProcessedLabelZoom(T);
					if(hQ) {
						T.processedLabelZooms = hQ
					}
					this.loadVectorTileData(T, hU)
				}
			}
		},
		setThumbData: function(i, hR, hQ, e, T) {
			if(T === 1) {
				if(this._findParentZoomTile(i, hR, hQ, e, 8) === false) {
					this._findChildZoomTile(i, hR, hQ, e, 3)
				}
			} else {
				if(T === -1) {
					if(this._findChildZoomTile(i, hR, hQ, e, 3) === false) {
						this._findParentZoomTile(i, hR, hQ, e, 8)
					}
				}
			}
			this.map._featureMgr.sortThumbData(this.drawIndex)
		},
		_findParentZoomTile: function(hT, h2, h1, hR, hW) {
			var hS = b6[this.getMapType()];
			var T = hS.minDataZoom;
			var e = hT;
			var hZ = h2;
			var hX = h1;
			var hY = hR;
			for(var hV = 1; hV <= hW; hV++) {
				var hQ = this.tileType.getParentTile(e, hZ, hX, hY, T);
				if(hQ === null) {
					continue
				}
				var h0 = this.getTileKey(hQ);
				var hU = this.tileCache.getData(h0);
				if(hU && hU.status === "ready") {
					if(this.thumbCache[h0]) {
						continue
					}
					this.map._featureMgr.setData(hU, this.drawIndex, 0);
					this.thumbCache[h0] = true;
					return true
				}
				e = hQ.col;
				hZ = hQ.row;
				hX = hQ.zoom;
				hY = hQ.useZoom
			}
			return false
		},
		_findChildZoomTile: function(hU, hW, e, hR, h5) {
			var h3 = b6[this.getMapType()];
			var hZ = h3.maxDataZoom;
			var hT = hU;
			var hV = hW;
			var hX = e;
			var hQ = hR;
			var hS = true;
			for(var h2 = 1; h2 <= h5; h2++) {
				var h0 = false;
				var T = this.tileType.getChildTiles(hT, hV, hX, hQ, hZ, h2);
				if(!T) {
					continue
				}
				for(var h1 = 0; h1 < T.length; h1++) {
					var hY = this.getTileKey(T[h1]);
					var h4 = this.tileCache.getData(hY);
					if(h4 && h4.status === "ready") {
						if(!this.thumbCache[hY]) {
							this.map._featureMgr.setData(h4, this.drawIndex, 1);
							this.thumbCache[hY] = true
						}
						h0 = true
					} else {
						hS = false
					}
				}
				if(h0) {
					break
				}
			}
			return hS
		},
		loadVectorTileData: function(i, hR) {
			var T = i.col;
			var hV = i.row;
			var hT = i.zoom;
			var hU = i.baseTileSize;
			var e = this.getTilesUrl(new ej(T, hV), hT, hU);
			if(!e) {
				return
			}
			var hS = this.getTileKey(i);
			by(this.map);
			if(!this.processData) {
				this.map._workerMgr.loadTileData(e, i, hS, hR);
				return
			}
			var hR = "cbk" + hS.replace(/-/g, "_");
			var hQ = this;
			bo[hR] = function(hW) {
				var hX = (function(hY) {
					return function() {
						hY.tileInfo = i;
						var h4 = hQ.processData(hY);
						if(!h4.road) {
							return
						}
						var h1 = {
							tileInfo: i,
							renderData: {
								base: []
							},
							status: "ready",
							key: hS,
							mapType: hQ.mapType
						};
						var h7 = [];
						var ia = [];
						for(var h3 = 0; h3 < h4.road.length; h3++) {
							var h6 = h4.road[h3];
							var h5 = -1;
							for(var h2 = 0; h2 < h6.length; h2++) {
								var h8 = h6[h2];
								var h9 = [];
								if(h7.length / 7 + h8[0].length / 2 > 65536) {
									h1.renderData.base.push({
										type: "line",
										data: [fh.toTileSolidLineVertices(h7, 4000), new Uint16Array(ia)]
									});
									h7 = [];
									ia = []
								}
								for(var h0 = 0; h0 < h8[0].length; h0 += 2) {
									h9[h9.length] = [h8[0][h0], h8[0][h0 + 1]]
								}
								var hZ = h8[3];
								fh.buildData(h9, h8[1], h8[2], h7, ia, hZ, h8[4], h3 + 20, false)
							}
							h1.renderData.base.push({
								type: "line",
								data: [fh.toTileSolidLineVertices(h7, 4000), new Uint16Array(ia)]
							})
						}
						hQ.tileCache.setData(hS, h1);
						hQ.map._featureMgr.clearData(hQ.drawIndex);
						hQ.getVectorLayerDataFromCache(hQ.curViewTilesInfo, hQ.getZoomState());
						hQ.map.dispatchEvent(new bb("onrefresh"))
					}
				})(hW);
				hQ.map.jobScheduler.addJob(hX);
				delete bo[hR]
			};
			e += "&fn=" + encodeURIComponent(eA + "." + hR);
			hl.load(e)
		},
		vectorTileDataCbk: function(hQ, hR) {
			var hV = new bb("ontileloaded");
			hV.perfStat = hQ.perfStat || [];
			var e = this.map;
			e.fire(hV);
			var i = hQ.tileInfo;
			var T = i.col;
			var h0 = i.row;
			var hZ = i.zoom;
			var hY = i.baseTileSize;
			var hT = this.tileCache.getData(hR);
			if(!hT) {
				return
			}
			if(!this.showLabel) {
				hQ.label = null
			}
			hT.renderData = hQ;
			hT.tileInfo = i;
			var hS = d4.calcLoopParam(T, hZ, hY);
			var hW = hS.geoOffsetX;
			hT.tileInfo.loopOffsetX = hW;
			hT.status = "ready";
			hT.mapType = this.mapType;
			this.tileCache.setData(hR, hT);
			hT.label = hQ.label;
			hQ.label = null;
			if(hQ.indoorData && e._indoorMgr) {
				e._indoorMgr.setData(hQ.indoorData)
			}
			var hU = "id_" + T + "_" + h0 + "_" + hZ;
			if(!this.curViewTilesInfo[hU]) {
				e.fire(new bb("ontilenotinview"));
				return
			}
			this.processLabelData(hT);
			if(hQ.indoorData && e._indoorMgr && e._indoorMgr.currentUid) {
				this._refreshIndoorData(e._indoorMgr.currentUid, e._indoorMgr.currentFloor)
			}
			var hX = new bb("onrefresh");
			hX.source = "webgllayer";
			this.map.dispatchEvent(hX)
		},
		_refreshIndoorData: function(hY, hX) {
			var h0 = this.map._indoorMgr.getIndoorData(hY);
			var h3 = h0.tileKeys;
			var h1 = Math.floor(this.map.getZoom());
			for(var hV = 0; hV < h3.length; hV++) {
				var hS = h3[hV];
				var hU = this.tileCache.getData(hS);
				if(!hU) {
					continue
				}
				var h2 = hU.renderData;
				h2.indoorBase = [];
				h2.indoorBaseContour = [];
				h2.indoorBorder3D = [];
				h2.indoorArea3D = [];
				hU.label.indoorLabel = [];
				this.labelProcessor.clearCollisionCache(hU.label);
				for(var hW in h2.indoorData) {
					if(hW === "tileInfo") {
						continue
					}
					var e = h2.indoorData[hW];
					var hR = e.defaultFloor;
					if(hW === hY) {
						hR = hX;
						e.currentFloor = hX
					}
					if(e.floors[hR]) {
						if(e.floors[hR].base) {
							for(var hT = 0; hT < e.floors[hR].base.length; hT++) {
								h2.indoorBase.push(e.floors[hR].base[hT])
							}
						}
						if(e.floors[hR].contour) {
							for(var hT = 0; hT < e.floors[hR].contour.length; hT++) {
								h2.indoorBaseContour.push(e.floors[hR].contour[hT])
							}
						}
						if(e.floors[hR].indoorBorder3D) {
							h2.indoorBorder3D.push(e.floors[hR].indoorBorder3D)
						}
						if(e.floors[hR].area3D) {
							h2.indoorArea3D.push(e.floors[hR].area3D)
						}
						if(e.floors[hR].pois) {
							hU.label.indoorLabel = hU.label.indoorLabel.concat(e.floors[hR].pois)
						}
					}
				}
				this.updateAllIconsTextureCoords(hU);
				var hZ = this;
				this.labelProcessor.loadIconImages(hU, function(i) {
					hZ.updateAllIconsTextureCoords(i)
				});
				var hQ = hS.split("_");
				var T = parseInt(hQ[hQ.length - 1], 10);
				if(T !== h1) {
					continue
				}
				hZ.map._featureMgr.setData(hU, this.drawIndex, 2)
			}
			this.dataBackCollideLabels();
			this.map.dispatchEvent(new bb("onrefresh"))
		},
		_removeIndoorData: function(i) {
			if(!i.indoorData) {
				return
			}
			for(var e in i.indoorData) {
				if(e === "tileInfo") {
					continue
				}
				this.map._indoorMgr.removeData(e, i.key)
			}
		},
		getProcessedLabelZoom: function(hQ) {
			var hR = di.baseZoomInfo[hQ.zoom];
			if(!hR) {
				return false
			}
			var T = [];
			for(var hS = 0; hS < hR.length; hS++) {
				var hT = this.getTileKey(hQ, {
					useZoom: hR[hS]
				});
				var e = this.tileCache.getData(hT);
				if(e && e.status === "ready" && e.label && e.label.status === "ready") {
					T.push(hR[hS])
				}
			}
			if(T.length) {
				return T
			} else {
				return false
			}
		},
		getSameZoomDataFromCache: function(T) {
			var hQ = di.baseZoomInfo[T.zoom];
			for(var hR = 0; hR < hQ.length; hR++) {
				var hS = this.getTileKey(T, {
					useZoom: hQ[hR]
				});
				if(T.useZoom === hQ[hR]) {
					continue
				}
				var e = this.tileCache.getData(hS);
				if(e && e.status === "ready" && e.label && e.label.status === "ready") {
					return e
				}
			}
			return false
		},
		hasSameLabelData: function(hQ, T) {
			for(var e = 0; e < T.length; e++) {
				if(T[e].key === hQ) {
					return true
				}
			}
			return false
		},
		getDataByFloorName: function(T, hQ) {
			for(var e = 0; e < T.length; e++) {
				if(T[e].floorName === hQ) {
					return T[e]
				}
			}
			return null
		},
		mergeIndoorLabelData: function(hV, e) {
			for(var hT in hV) {
				if(hT === "tileInfo") {
					continue
				}
				if(e[hT]) {
					var T = hV[hT].floors;
					var hW = e[hT].floors;
					for(var hR = 0; hR < T.length; hR++) {
						var hQ = T[hR];
						var hU = hQ.floorName;
						var hS = this.getDataByFloorName(hW, hU);
						if(hS) {
							if(hS.pois) {
								hS.pois = hS.pois.concat(hQ.pois);
								hQ.pois = hS.pois
							} else {
								hS.pois = hQ.pois
							}
						}
					}
				}
			}
		},
		mergeSameZoomLabelData: function(hT) {
			var hR = hT.label;
			if(!hR) {
				return
			}
			var e = hT.tileInfo;
			var hS = this.getSameZoomDataFromCache(e);
			if(!hS) {
				return
			}
			var hQ = hS.label;
			if(!hQ) {
				return
			}
			for(var T = 0; T < hR.fixedLabel.length; T++) {
				if(!this.hasSameLabelData(hR.fixedLabel[T].key, hQ.fixedLabel)) {
					hQ.hasNewData = true;
					hQ.fixedLabel.push(hR.fixedLabel[T])
				}
			}
			for(var T = 0; T < hR.lineLabel.length; T++) {
				if(!this.hasSameLabelData(hR.lineLabel[T].key, hQ.lineLabel)) {
					hQ.hasNewData = true;
					hQ.lineLabel.push(hR.lineLabel[T])
				}
			}
			for(var T = 0; T < hR.indoorLabel.length; T++) {
				if(!this.hasSameLabelData(hR.indoorLabel[T].key, hQ.indoorLabel)) {
					hQ.hasNewData = true;
					hQ.indoorLabel.push(hR.indoorLabel[T])
				}
			}
			hT.label = hQ;
			if(hS.renderData.indoorData && hT.renderData.indoorData) {
				this.mergeIndoorLabelData(hT.renderData.indoorData, hS.renderData.indoorData)
			}
		},
		processLabelData: function(hS) {
			if(!hS.label) {
				return
			}
			if(hS.label.status === "processing") {
				return
			}
			hS.label.status = "processing";
			var hQ = this;
			hQ.updateAllIconsTextureCoords(hS);
			this.labelProcessor.loadIconImages(hS, function(hT) {
				hQ.updateAllIconsTextureCoords(hT)
			});
			if(this.map.config.textRenderType === "canvas") {
				var e = this.labelProcessor.drawLabelsOnCanvas(hS, function(hV, hW) {
					var hU = hS.tileInfo;
					if(!bo.customStyleInfo) {
						hQ.mergeSameZoomLabelData(hS)
					}
					if(hV) {
						if(!hS.label.textureHeights) {
							hS.label.textureHeights = []
						}
						hS.label.textureHeights[hU.useZoom] = hV.height
					}
					if(hW) {
						if(!hS.label.indoorTextureHeights) {
							hS.label.indoorTextureHeights = []
						}
						hS.label.indoorTextureHeights[hU.useZoom] = hW.height
					}
					var hT = hQ._getTileTexImgKey(hU);
					hQ._doWorkAfterLabelImageLoad(hS, hV, hW, hT)
				});
				return
			}
			var T = hS.label.textImageBitmap || hS.label.textImgStr;
			var hR = hS.label.indoorTextImageBitmap || hS.label.indoorTextImgStr;
			this.labelProcessor.loadImgByStr(T, hR, function i(hY, hW) {
				var hV = hS.label.textureHeight;
				var hZ = hS.label.indoorTextureHeight;
				hS.label.textureHeight = undefined;
				hS.label.indoorTextureHeight = undefined;
				var hU = hS.tileInfo;
				hQ.mergeSameZoomLabelData(hS);
				var hX = hS.label;
				hX.textImgStr = "";
				hX.indoorTextImgStr && (hX.indoorTextImgStr = "");
				if(!hX.textureHeights) {
					hX.textureHeights = []
				}
				hX.textureHeights[hU.useZoom] = hV;
				if(!hX.indoorTextureHeights) {
					hX.indoorTextureHeights = []
				}
				hX.indoorTextureHeights[hU.useZoom] = hZ;
				var hT = hQ._getTileTexImgKey(hU);
				hQ._doWorkAfterLabelImageLoad(hS, hY, hW, hT)
			})
		},
		_getTileTexImgKey: function(i) {
			var T = i.style || this.mapStyleId || "default";
			var e = T + "_" + i.col + "_" + i.row + "_" + i.zoom;
			if(this.map.config.textRenderType === "canvas") {
				e += "_" + i.useZoom
			}
			return e
		},
		_doWorkAfterLabelImageLoad: function(hU, hS, hQ, i) {
			var hT = this;
			var hR = hU.label;
			hR.tileInfo = hU.tileInfo;
			hR.status = "ready";
			if(hS || hQ) {
				var e = hR.tileInfo;
				if(hS) {
					hS.id = i;
					if(!hR.textureSources) {
						hR.textureSources = []
					}
					hR.textureSources[e.useZoom] = hS
				}
				if(hQ) {
					hQ.id = i + "_indoor";
					if(!hR.indoorTextureSources) {
						hR.indoorTextureSources = []
					}
					hR.indoorTextureSources[e.useZoom] = hQ
				}
				if(hT.map._webglMapScene) {
					var T = hT.map._webglMapScene._painter;
					if(hS) {
						T._addToAsyncJob(hR.textureSources[e.useZoom])
					}
				}
			}
			if(hU.custom !== true) {
				hT.tileLabels.push(hR)
			}
			if(hT.collisionTimer) {
				return
			}
			hT.collisionTimer = setTimeout(function() {
				hT.dataBackCollideLabels();
				hT.collisionTimer = null
			}, 300)
		},
		_updateIconTextureCoords: function(hU, T) {
			if(!hU) {
				return
			}
			var hT = this.map;
			for(var hQ = 0; hQ < hU.length; hQ++) {
				var hS = hU[hQ];
				if(!hS.iconPos) {
					continue
				}
				if(hT._webglMapScene) {
					var e = hT._webglMapScene._painter;
					var hR = T + "_" + hS.iconPos.iconType;
					hS.iconPos.texcoord = e._iconTextureAtlasCoords[hR] || null
				}
			}
		},
		updateAllIconsTextureCoords: function(hR) {
			if(this.map.viewAnimationTime) {
				return
			}
			if(hR) {
				if(hR.label) {
					var i = hR.tileInfo.style;
					this._updateIconTextureCoords(hR.label.fixedLabel, i);
					this._updateIconTextureCoords(hR.label.indoorLabel, i)
				}
			} else {
				var hQ = this.tileCache.getAllData();
				for(var T in hQ) {
					var e = hQ[T].data;
					if(e.status === "ready" && e.label) {
						var i = e.tileInfo.style;
						this._updateIconTextureCoords(e.label.fixedLabel, i);
						this._updateIconTextureCoords(e.label.indoorLabel, i)
					}
				}
			}
			this.updateLabels();
			this.map.dispatchEvent(new bb("onrefresh"))
		},
		cacheDataCollideLabels: function(T) {
			var hR = this;
			var i = this.map._featureMgr;

			function hQ() {
				hR.cacheLabelTimer = null;
				var hS;
				var hT = hR.map.getTilt();
				var hU = hR.map.getHeading() % 360;
				if(hR.tileLabels.length === 0 || (hR.tileLabels.length === 1 && hR.tileLabels[0].tileInfo.zoom === 0)) {
					hS = i.getLabelData();
					if(hS.length > 0) {
						hS = hR.labelProcessor.collisionTest(hS, -1)
					}
				} else {
					if(hT || hU) {
						if(this._collisionTimer) {
							if(!hT) {
								clearTimeout(this._collisionTimer)
							} else {
								if(Date.now() - hR.lastCollisionTestTime > 500) {
									hR.lastCollisionTestTime = Date.now()
								} else {
									clearTimeout(this._collisionTimer)
								}
							}
						}
						this._collisionTimer = setTimeout(function() {
							hS = hR.labelProcessor.collisionTest(hR.tileLabels);
							if(hS) {
								i.setLabelData(hS)
							}
							hR.updateLabels();
							hR.map.dispatchEvent(new bb("onrefresh"));
							hR._collisionTimer = null
						}, 60);
						return
					} else {
						hS = hR.labelProcessor.getCachedLabels(hR.tileLabels)
					}
				}
				if(hS) {
					i.setLabelData(hS)
				}
				hR.updateLabels();
				hR.map.dispatchEvent(new bb("onrefresh"))
			}
			if(!T) {
				clearTimeout(hR.cacheLabelTimer);
				hQ()
			} else {
				if(hR.cacheLabelTimer) {
					return
				}
				hR.cacheLabelTimer = setTimeout(function e() {
					hQ()
				}, T)
			}
		},
		dataBackCollideLabels: function() {
			var i = this;
			if((i.tileLabels && i.tileLabels.length === 0)) {
				return
			}
			var e;
			i.labelProcessor.calcLabelsCollision(i.tileLabels);
			e = i.labelProcessor.getCachedLabels(i.tileLabels);
			if(e) {
				i.map._featureMgr.setLabelData(e)
			}
			i.updateLabels();
			i.map.dispatchEvent(new bb("onrefresh"));
			if(f4()) {
				this.labelProcessor._refreshSpotData()
			}
		},
		updateLabels: function(hR) {
			var hS = this.map;
			var i = hS._featureMgr;
			var T = i.getLabelData();
			if(T.length > 0) {
				var hQ = hS.getZoom();
				if(T.labelZoom - hQ < 3) {
					this.labelProcessor.updateLabels(T);
					var e = this.labelProcessor.fixDataFormat(T);
					i.setOverlayData(e[0], 2);
					i.setOverlayData(e[1], 3);
					i.setOverlayData(e[2], 4)
				} else {
					i.clearLabelOverlayData()
				}
				hS.temp.isPermitSpotOver = false;
				this.labelProcessor.curSpotAdded = false
			}
		},
		loadRasterLayerData: function(hQ, hU) {
			if(hU) {
				for(var hS = 0, hR = hQ.length; hS < hR; hS++) {
					var T = hQ[hS];
					var hV = this.getTileKey(T);
					var e = this.tileCache.getData(hV);
					if(e && e.status === "ready") {
						this.map._featureMgr.setData(e, this.drawIndex, 2)
					}
				}
				return
			}
			for(var hS = 0, hR = hQ.length; hS < hR; hS++) {
				var T = hQ[hS];
				var hV = this.getTileKey(T);
				var e = this.tileCache.getData(hV);
				if(!e) {
					this.tileCache.setData(hV, {});
					var hT = this;
					this.loadRasterTileData(T, function(i, hW) {
						hT.rasterTileDataCbk(i, hW)
					})
				}
			}
		},
		loadRasterTileData: function(i, e) {
			var hR = i.col;
			var hU = i.row;
			var hS = i.zoom;
			var hQ = this.getTilesUrl(new ej(hR, hU), hS);
			if(!hQ) {
				return
			}
			var hT = this.getTileKey(i);
			var T = this.loadTileImage(hQ, hT, e);
			T.tileInfo = i
		},
		loadTileImage: function(hQ, T, e) {
			var i = new Image();
			i.crossOrigin = "anonymous";
			i.onload = function() {
				e && e(this, T)
			};
			i.onerror = function() {
				e && e(null, T)
			};
			i.src = hQ;
			return i
		},
		rasterTileDataCbk: function(hS, hQ) {
			if(!hS) {
				this.tileCache.removeData(hQ);
				return
			}
			var i = hS.tileInfo;
			var T = i.col;
			var hY = i.row;
			var hX = i.zoom;
			var e = this.tileCache.getData(hQ);
			if(!e) {
				return
			}
			var hR = d4.calcLoopParam(T, hX);
			var hV = hR.geoOffsetX;
			hS.tileInfo.loopOffsetX = hV;
			e.textureSource = hS;
			e.dataType = eH;
			e.tileInfo = i;
			e.renderData = {
				vertexAll: [0, 0, 0, 0, 0, 256, 0, 0, 1, 0, 256, 256, 0, 1, 1, 0, 0, 0, 0, 0, 256, 256, 0, 1, 1, 0, 256, 0, 0, 1]
			};
			e.status = "ready";
			this.tileCache.setData(hQ, e);
			var hT = "id_" + T + "_" + hY + "_" + hX;
			var hU = false;
			if(this.curViewTilesInfo[hT]) {
				e.dataType = eH;
				e.png8 = this.png8 || false;
				this.map._featureMgr.setData(e, this.drawIndex, 2);
				hU = true
			}
			if(hU) {
				var hW = new bb("onrefresh");
				hW.source = "webgllayer";
				this.map.dispatchEvent(hW)
			}
		},
		_checkTilesLoaded: function() {
			this.numLoading--;
			if(this.map.firstTileLoad === false) {
				this.map.dispatchEvent(new bb("onfirsttilesloaded"));
				this.map.firstTileLoad = true
			}
			var e = this;
			if(this.numLoading === 0) {
				if(this._checkLoadedTimer) {
					clearTimeout(this._checkLoadedTimer);
					this._checkLoadedTimer = null
				}
				this._checkLoadedTimer = setTimeout(function() {
					if(e.numLoading === 0) {
						e.map.dispatchEvent(new bb("ontilesloaded"))
					}
					e._checkLoadedTimer = null
				}, 60)
			}
		},
		isClickableLabel: function(e) {
			if(e.isDel) {
				return false
			}
			if(e.zoom > 9 && !e.guid) {
				return false
			}
			if(e.zoom <= 9 && !e.name && !e.guid) {
				return false
			}
			return true
		}
	};
	var b9 = 5;
	var dX = 4;
	var hp = 3;
	var ff = 2;
	var hJ = 1;
	var d0 = 0;

	function v(e) {
		this._ratio = a6();
		this._iconCache = {};
		this._map = e;
		this._drawingCanvasPool = [];
		this._drawingCanvasHeight = 4096
	}
	C.extend(v.prototype, {
		_loadIcons: function(i, hU) {
			var hS = 0;
			var hR = this;
			var T = this._map.config.style;
			for(var hT in i) {
				hS++;
				var e = new Image();
				e.id = hT;
				e.crossOrigin = "anonymous";
				e.onload = function() {
					hR._iconCache[this.id].loaded = true;
					hS--;
					if(hS === 0) {
						hU()
					}
					this.onload = null
				};
				e.onerror = function() {
					hR._iconCache[this.id] = null;
					hS--;
					if(hS === 0) {
						hU()
					}
					this.onerror = null
				};
				var hQ = e3.getIconSetPath(T) + hT + ".png";
				e.src = hQ;
				this._iconCache[hT] = {
					loaded: false,
					image: e
				}
			}
		},
		_getEmptyDrawingCanvas: function() {
			for(var T = 0; T < this._drawingCanvasPool.length; T++) {
				if(this._drawingCanvasPool[T]._free === true) {
					this._drawingCanvasPool[T]._free = false;
					return this._drawingCanvasPool[T]
				}
			}
			var e = this._createNewDrawingCanvas();
			this._drawingCanvasPool.push(e);
			e._free = false;
			return e
		},
		_createNewDrawingCanvas: function() {
			var e = S("canvas");
			e.width = 512;
			e.height = this._drawingCanvasHeight;
			e._free = true;
			e._id = bo.getGUID();
			var i = e.getContext("2d");
			i.textBaseline = "bottom";
			i.lineJoin = "round";
			return e
		},
		drawLabelsOnCanvas: function(h8, hQ) {
			var hY = h8.label.fixedLabel.slice(0);
			var h4 = h8.label.lineLabel.slice(0);
			var T = h8.label.indoorLabel.slice(0);
			if(hY.length === 0 && h4.length === 0 && T.length === 0) {
				hQ();
				return
			}
			var hT = function(id, i) {
				return id.styleId - i.styleId
			};
			hY.sort(hT);
			h4.sort(hT);
			T.sort(hT);
			var h7 = {};
			var e = this._getEmptyDrawingCanvas();
			var h3 = e.getContext("2d");
			h3.clearRect(0, 0, e.width, e.height);
			var ib = 0;
			var hZ = null;
			var hS = 0;
			if(hY.length > 0) {
				while(hS < hY.length && !hY[hS].styleText[0]) {
					hS++
				}
				if(hY[hS] && hY[hS].styleText[0]) {
					hZ = hY[hS].styleText[0].fontSize + hY[hS].styleText[0].haloSize * 2
				}
			}
			if(hZ === null && T.length > 0) {
				hS = 0;
				while(hS < T.length && !T[hS].styleText[0]) {
					hS++
				}
				if(T[hS] && T[hS].styleText[0]) {
					hZ = T[hS].styleText[0].fontSize + T[hS].styleText[0].haloSize * 2
				}
			}
			if(hZ === null && h4.length > 0) {
				hS = 0;
				while(hS < h4.length && !h4[hS].styleText[0]) {
					hS++
				}
				if(h4[hS] && h4[hS].styleText[0]) {
					hZ = h4[hS].styleText[0].fontSize + h4[hS].styleText[0].haloSize * 2
				}
			}
			if(hZ === null || isNaN(hZ)) {
				hQ();
				return
			}
			var hV = 0;
			var hU = hZ;
			var h1 = {};
			var ic = 0;
			var h2 = [];
			for(var h6 = 0; h6 < hY.length; h6++) {
				var hX = hY[h6];
				var h0 = hX.name;
				var h5 = hX.styleText;
				if(!h0 || h5.length === 0) {
					continue
				}
				var hR = hX.icon;
				if(hX.textOnIcon && (!this._iconCache[hR] || this._iconCache[hR].loaded === false)) {
					h2.push(hX);
					ic++;
					if(!h1[hR]) {
						h1[hR] = true
					}
					continue
				}
				var h9 = this._drawEachText(h3, hX, ib, hV, hU, hZ, h7);
				if(!h9) {
					continue
				}
				hV = h9.curX;
				hU = h9.curY;
				hZ = h9.curLineHeight;
				ib = h9.styleId
			}
			var h9 = this._drawEachTypeOfLabels(h3, T, ib, hV, hU, hZ, h7);
			ib = h9.curStyleId;
			hV = h9.curX;
			hU = h9.curY;
			hZ = h9.curLineHeight;
			var h9 = this._drawEachTypeOfLabels(h3, h4, ib, hV, hU, hZ, h7);
			ib = h9.curStyleId;
			hV = h9.curX;
			hU = h9.curY;
			hZ = h9.curLineHeight;
			if(ic > 0) {
				var ia = this;
				this._loadIcons(h1, function() {
					h9 = ia._drawEachTypeOfLabels(h3, h2, ib, hV, hU, hZ, h7);
					ib = h9.curStyleId;
					hV = h9.curX;
					hU = h9.curY;
					hZ = h9.curLineHeight;
					var i = ia._generateEachLabelCanvas(e, hU, hY, h4, T, h8);
					hQ(i[0], i[1])
				});
				return
			}
			var hW = this._generateEachLabelCanvas(e, hU, hY, h4, T, h8);
			hQ(hW[0], hW[1])
		},
		drawCustomLabelsOnCanvas: function(hT, hZ) {
			if(hT.length === 0) {
				hZ();
				return
			}
			var T = 0;
			var e = (hT[0].style.fontSize + (hT[0].style.haloSize || 0) * 2) || 0;
			var hQ = e;
			var hV = this._getEmptyDrawingCanvas();
			var h0 = hV.getContext("2d");
			h0.clearRect(0, 0, hV.width, hV.height);
			var hW = {};
			var hY = -1;
			for(var hR = 0; hR < hT.length; hR++) {
				if(!hT[hR].name) {
					continue
				}
				var hX = this._drawEachText(h0, hT[hR], hY, T, e, hQ, hW);
				if(!hX) {
					continue
				}
				T = hX.curX;
				e = hX.curY;
				hQ = hX.curLineHeight;
				hY = hX.styleId
			}
			var hS = e;
			var hU = this._copyToNewCanvas(hV, hS);
			for(var hR = 0; hR < hT.length; hR++) {
				if(!hT[hR].name && hT[hR].style.iconSize) {
					this._addFixedLabelBounds(hT[hR]);
					continue
				}
				if(!hT[hR].textSize) {
					continue
				}
				this._updateFixedLabelCoords(hT[hR], hS);
				this._addFixedLabelBounds(hT[hR])
			}
			hZ(hU)
		},
		_drawEachTypeOfLabels: function(hZ, hT, hX, hQ, T, hR, hV) {
			for(var hS = 0; hS < hT.length; hS++) {
				var hU = hT[hS];
				var hY = hU.name;
				var e = hU.styleText;
				if(!hY || e.length === 0) {
					continue
				}
				var hW = this._drawEachText(hZ, hU, hX, hQ, T, hR, hV);
				if(!hW) {
					continue
				}
				hQ = hW.curX;
				T = hW.curY;
				hR = hW.curLineHeight;
				hX = hW.styleId;
				if(hW.curY > this._drawingCanvasHeight) {
					return {
						curX: hQ,
						curY: T,
						curLineHeight: hR,
						curStyleId: hX
					}
				}
			}
			return {
				curX: hQ,
				curY: T,
				curLineHeight: hR,
				curStyleId: hX
			}
		},
		_drawIndoorTextLabelOnCanvas: function(hR) {
			var e = this._getEmptyDrawingCanvas();
			var hY = e.getContext("2d");
			hY.clearRect(0, 0, e.width, e.height);
			var h6 = 0;
			var hX = null;
			var hW = 0;
			var hU;
			var h3 = {};
			var h2 = [];
			for(var hS in hR) {
				if(hS === "tileInfo") {
					continue
				}
				var hQ = hR[hS];
				var h1 = hQ.defaultFloor;
				var hV = hQ.floors;
				for(var h0 = 0; h0 < hV.length; h0++) {
					if(h0 === h1) {
						continue
					}
					var h4 = hV[h0];
					if(!h4.pois) {
						continue
					}
					var hT = h4.pois;
					for(var hZ = 0; hZ < hT.length; hZ++) {
						if(hX === null && hT[hZ].styleText[0]) {
							hX = hT[hZ].styleText[0].fontSize + hT[hZ].styleText[0].haloSize * 2;
							hU = hX
						}
						h2.push(hT[hZ])
					}
				}
			}
			if(hX === null) {
				return null
			}
			h2.sort(function(h7, i) {
				return i.rank - h7.rank || h7.styleId - i.styleId
			});
			var h5 = this._drawEachTypeOfLabels(hY, h2, h6, hW, hU, hX, h3);
			h6 = h5.curStyleId;
			hW = h5.curX;
			hU = h5.curY;
			hX = h5.curLineHeight;
			var T = this._copyToNewCanvas(e, hU);
			return T
		},
		_updateIndoorLabelsCoords: function(hX, hY) {
			for(var hW in hX) {
				if(hW === "tileInfo") {
					continue
				}
				var e = hX[hW];
				var hS = e.defaultFloor;
				var hT = e.floors;
				for(var hU = 0; hU < hT.length; hU++) {
					if(hU === hS) {
						continue
					}
					var T = hT[hU];
					if(!T.pois) {
						continue
					}
					var hR = T.pois;
					for(var hQ = 0; hQ < hR.length; hQ++) {
						var hV = hR[hQ];
						if(hV.name && (!hV.textSize || hV.textSize.length === 0)) {
							hR.splice(hQ, 1);
							hQ--;
							continue
						}
						this._updateFixedLabelCoords(hV, hY);
						this._addFixedLabelBounds(hV)
					}
				}
			}
		},
		_generateEachLabelCanvas: function(hT, hS, hU, e, hW, T) {
			hS = Math.min(hS, this._drawingCanvasHeight);
			var hV = this._copyToNewCanvas(hT, hS);
			var hQ = null;
			if(T.renderData.indoorData) {
				hQ = this._drawIndoorTextLabelOnCanvas(T.renderData.indoorData);
				if(hQ) {
					this._updateIndoorLabelsCoords(T.renderData.indoorData, hQ.height)
				}
			}
			for(var hR = 0; hR < hU.length; hR++) {
				if(!hU[hR].textSize) {
					continue
				}
				this._updateFixedLabelCoords(hU[hR], hS);
				this._addFixedLabelBounds(hU[hR])
			}
			for(var hR = 0; hR < hW.length; hR++) {
				if(!hW[hR].textSize) {
					continue
				}
				this._updateFixedLabelCoords(hW[hR], hS);
				this._addFixedLabelBounds(hW[hR])
			}
			for(var hR = 0; hR < e.length; hR++) {
				this._updateLineLabelCoords(e[hR], hS)
			}
			return [hV, hQ]
		},
		_copyToNewCanvas: function(T, i) {
			if(i === 0) {
				return null
			}
			var hQ = S("canvas");
			hQ.width = T.width;
			hQ.height = i;
			var e = hQ.getContext("2d");
			e.drawImage(T, 0, 0, 512, i, 0, 0, 512, i);
			hQ._id = T._id;
			T._free = true;
			return hQ
		},
		_drawEachText: function(h8, hU, T, ia, h9, ii, hR) {
			var ih = hU.name;
			var hZ = hU.styleText ? hU.styleText[0] : hU.style;
			if(!hZ) {
				return null
			}
			var h2 = hZ.fontSize;
			var im = hZ.fontWeight;
			var iB = hZ.haloSize || 0;
			if(!h3) {}
			if(hZ.fontRgba) {
				var iH = hZ.fontRgba[3] / 255;
				var hY = [];
				hY[3] = iH;
				for(var iG = 0; iG < 3; iG++) {
					hY[iG] = hZ.fontRgba[iG]
				}
			}
			if(hZ.haloRgba) {
				var iH = hZ.haloRgba[3] / 255;
				var h5 = [];
				h5[3] = iH;
				for(var iG = 0; iG < 3; iG++) {
					h5[iG] = hZ.haloRgba[iG]
				}
			}
			var iv = hY ? "rgba(" + hY.join(",") + ")" : hZ.color;
			var hT = h5 ? "rgba(" + h5.join(",") + ")" : hZ.strokeColor;
			var iD = hU.styleId || 0;
			if(iB > 4) {
				iB = 4
			}
			var ij = [];
			var h7 = [];
			var ie = 0;
			if(hR && !hR[iD]) {
				hR[iD] = {}
			}
			var h1 = h2 + iB * 2;
			var ik = h1;
			if(hU.containDescendings) {
				ik += 4
			}
			if(iB === 0) {
				ik += 2
			}
			if(hU.textOnIcon) {
				ik = Math.max(ik, hU.iconSize[1])
			}
			if(iD !== T || ik > ii) {
				T = iD;
				if(im >= 10 && im % 10 === 0) {
					h8.font = im * 10 + " " + h2 + "px sans-serif"
				} else {
					h8.font = h2 + "px sans-serif"
				}
				if(ik > ii) {
					var ig = ik - ii;
					ii += ig;
					h9 += ig
				}
				if(iB > 0) {
					h8.lineWidth = iB * 2;
					h8.strokeStyle = hT
				}
				h8.fillStyle = iv
			}
			if(hU.type === "line") {
				var hW = ih.split("");
				for(var iE = 0; iE < hW.length; iE++) {
					var ix = hW[iE];
					var ib;
					var io;
					if(hR[iD][ix]) {
						var h3 = hR[iD][ix];
						ib = h3.displaySize;
						io = h3.curWordPosition
					} else {
						var hQ = Math.ceil(h8.measureText(ix).width);
						if(ia + hQ > 512) {
							ia = 0;
							h9 += ik;
							ii = ik
						}
						if(h9 > this._drawingCanvasHeight) {
							return {
								curX: ia,
								curY: h9,
								curLineHeight: ii,
								styleId: iD
							}
						}
						var iy = ia;
						if(iB > 0) {
							hQ += iB;
							iy -= Math.round(iB / 2);
							h8.strokeText(ix, ia, h9)
						}
						h8.fillText(ix, ia, h9);
						var iu = [hQ, ik];
						ib = [Math.round(iu[0] / 2), Math.round(iu[1] / 2)];
						io = [iy, h9 - ik];
						hR[iD][ix] = {
							displaySize: ib,
							curWordPosition: io,
							totalHeight: ie
						};
						ia += hQ + 2
					}
					ij.push(ib);
					h7.push(io)
				}
				ie = Math.round(ij[0][1])
			} else {
				if(hR[iD][ih]) {
					var h3 = hR[iD][ih];
					ij = h3.textSize;
					h7 = h3.labelImagePosition;
					ie = h3.totalHeight
				} else {
					var h4 = ih.split("\\");
					if(h4.length > 1 && hU.textOnIcon) {
						var iF = 0;
						var iC = 0;
						var iI = [];
						var ic = 8;
						for(var iE = 0; iE < h4.length; iE++) {
							var ih = h4[iE];
							var h0 = Math.ceil(h8.measureText(ih).width);
							if(h0 > iF) {
								iF = h0
							}
							iI.push(Math.round(h0 / 2));
							iC += ik
						}
						var hX = iF + 2 * ic;
						var iA = iC + 2 * ic;
						if(ia + hX > 512) {
							ia = 0;
							h9 += ii
						}
						h9 += iC - ik + 2 * ic;
						var it = ia;
						var id = h9 - iA;
						var e = Math.round(hX / 2);
						var h6 = this._iconCache[hU.icon].image;
						this.drawStretchedIcon(h8, h6, [it, id], ic, iF, iC);
						for(var iE = 0; iE < h4.length; iE++) {
							var ih = h4[iE];
							var iz = it + (e - iI[iE]);
							var iw = id + 4 + (iE + 1) * ik;
							h8.fillText(ih, iz, iw)
						}
						ij.push([Math.round(hX / 2), Math.round(iA / 2)]);
						h7.push([it, id]);
						ia += hX;
						ii = iA;
						ie = Math.round(iA / 2)
					} else {
						for(var iE = 0; iE < h4.length; iE++) {
							var ih = h4[iE];
							var h0 = Math.ceil(h8.measureText(ih).width);
							var hX = h0;
							var hS = 0;
							if(hU.textOnIcon) {
								hS = 10;
								hX += hS * 2;
								if(hU.styleId === 519) {
									hX = hU.iconSize[0];
									hS = Math.round((hX - h0) / 2)
								}
							}
							if(ia + hX > 512) {
								ia = 0;
								h9 += ik;
								ii = ik
							}
							if(h9 > this._drawingCanvasHeight) {
								return {
									curX: ia,
									curY: h9,
									curLineHeight: ii,
									styleId: iD
								}
							}
							var it = ia;
							var id = h9 - ik;
							var ir = ia;
							var iq = h9;
							if(hU.containDescendings) {
								iq -= 4
							}
							if(hU.textOnIcon) {
								var il = false;
								var h6 = this._iconCache[hU.icon].image;
								var ip = hU.iconSize.concat([]);
								if(h1 > ip[1]) {
									ip[1] = h1;
									il = true
								}
								if(h0 > ip[0]) {
									ip[0] = h0;
									il = true
								}
								if(hU.styleId === 519) {
									h8.drawImage(h6, 0, 0, ip[0], ip[1], it, id, ip[0], ip[1])
								} else {
									if(il) {
										this.drawStretchedIcon(h8, h6, [it, id], hS, h0, ip[1])
									} else {
										this.draw3StretchedIcon(h8, h6, [it, id], hS, h0, ip[1])
									}
								}
								ir += hS;
								if(hU.iconSize[1] > h1) {
									iq -= (hU.iconSize[1] - h1) / 2 - 1
								}
								hX += 1
							}
							if(iB > 0) {
								hX += iB;
								it -= Math.round(iB / 2);
								id += Math.round(iB / 2);
								if(iD === 71028) {
									ik -= 2
								}
								if(iD === 32) {
									ik -= 2
								}
								h8.strokeText(ih, ir, iq)
							}
							h8.fillText(ih, ir, iq);
							var hV = [hX, ik];
							var ib = [Math.round(hV[0] / 2), Math.round(hV[1] / 2)];
							ij.push(ib);
							h7.push([it, id]);
							ie += Math.round(ib[1]);
							ia += hX
						}
					}
					hR[iD][ih] = {
						textSize: ij,
						labelImagePosition: h7,
						totalHeight: ie
					}
				}
			}
			hU.textSize = ij;
			hU.labelImagePosition = h7;
			hU.totalHeight = ie;
			return {
				curX: ia,
				curY: h9,
				curLineHeight: ii,
				styleId: iD
			}
		},
		drawStretchedIcon: function(e, T, hQ, hT, hU, i) {
			var hS = hQ[0];
			var hR = hQ[1];
			e.drawImage(T, 0, 0, hT, hT, hS, hR, hT, hT);
			e.drawImage(T, hT, 0, 1, hT, hS + hT, hR, hU, hT);
			e.drawImage(T, T.width - hT, 0, hT, hT, hS + hU + hT, hR, hT, hT);
			e.drawImage(T, 0, hT, hT, 1, hS, hR + hT, hT, i);
			e.drawImage(T, hT, hT, 1, 1, hS + hT, hR + hT, hU, i);
			e.drawImage(T, T.width - hT, hT, hT, 1, hS + hU + hT, hR + hT, hT, i);
			e.drawImage(T, 0, T.height - hT, hT, hT, hS, hR + i + hT, hT, hT);
			e.drawImage(T, hT, T.height - hT, 1, hT, hS + hT, hR + i + hT, hU, hT);
			e.drawImage(T, T.width - hT, T.height - hT, hT, hT, hS + hU + hT, hR + i + hT, hT, hT)
		},
		draw3StretchedIcon: function(e, i, T, hS, hU, hT) {
			var hR = T[0];
			var hQ = T[1];
			e.drawImage(i, 0, 0, hS, i.height, hR, hQ, hS, i.height);
			e.drawImage(i, hS, 0, 1, i.height, hR + hS, hQ, hU, i.height);
			e.drawImage(i, i.width - hS, 0, hS, i.height, hR + hS + hU, hQ, hS, i.height)
		},
		_updateFixedLabelCoords: function(hR, h6) {
			if(h6 === 0) {
				return
			}
			var h1 = [];
			var id = [];
			var ie = 0;
			var h4 = hR.totalHeight;
			var io = hR.textSize.length;
			var hS = hR.direction;
			if(typeof hS !== "number") {
				hS = 0
			}
			for(var ig = 0; ig < io; ig++) {
				var h7 = hR.labelImagePosition[ig];
				var h5 = hR.textSize[ig];
				var h3 = h7[0];
				var hQ = h7[1];
				var hT = h5[0];
				var hY = h5[1];
				var h0 = 0;
				var ic = 0;
				if(typeof hR.textMargin === "number") {
					ic = hR.textMargin
				}
				var hZ;
				var e;
				var hV = 0;
				var h2 = 0;
				if(!hR.iconPos) {
					if(!hR.custom) {
						hS = dX
					}
				} else {
					hV = hR.iconPos.width;
					h2 = hR.iconPos.height
				}
				switch(hS) {
					case hp:
						var T = h4 / 2 - hY + h0 * (io - 1) / 2;
						hZ = Math.round(-hV / 2 - hT - ic);
						e = Math.round(T - ie - h0 * ig);
						break;
					case hJ:
						var T = h4 / 2 - hY + h0 * (io - 1) / 2;
						hZ = Math.round(hV / 2 + ic);
						e = Math.round(T - ie - h0 * ig);
						break;
					case ff:
						var T = h2 / 2 + h4 - hY + h0 * io;
						hZ = Math.round(-hT / 2);
						e = Math.round(T - ie - h0 * ig);
						break;
					case d0:
						var T = -h2 / 2 - h0 - hY;
						hZ = Math.round(-hT / 2);
						e = Math.round(T - ie - h0 * ig);
						break;
					case dX:
						var T = -h4 / 2 - h0 * (io - 1) / 2;
						hZ = Math.round(-hT / 2);
						e = Math.round(T - ie - h0 * ig);
						break
				}
				ie += hY;
				var hX = hZ + hT;
				var ip = e;
				var hW = hX;
				var im = ip + hY;
				var hU = hZ;
				var il = im;
				h1.push(hZ, e, hX, ip, hW, im, hZ, e, hW, im, hU, il);
				var ik = h3 / 512;
				var ib = (h6 - hQ - hY * 2) / h6;
				var ij = (h3 + hT * 2) / 512;
				var ia = ib;
				var ii = ij;
				var h9 = (h6 - hQ) / h6;
				var ih = ik;
				var h8 = h9;
				id.push(ik, ib, ij, ia, ii, h9, ik, ib, ii, h9, ih, h8)
			}
			if(!hR.textPos) {
				hR.textPos = {}
			}
			hR.textPos.vertex = h1;
			hR.textPos.texcoord = id
		},
		_addFixedLabelBounds: function(hW) {
			var hS = 1000;
			var hQ = 1000;
			var T = -1000;
			var e = -1000;
			if(hW.iconPos) {
				var hU = hW.iconPos["vertex"];
				for(var hV = 0, hR = hU.length; hV < hR; hV += 2) {
					var h0 = hU[hV];
					var hY = hU[hV + 1];
					if(h0 < hS) {
						hS = h0
					}
					if(h0 > T) {
						T = h0
					}
					if(hY < hQ) {
						hQ = hY
					}
					if(hY > e) {
						e = hY
					}
				}
			}
			if(hW.custom && hW.style.iconSize && !hW.name) {
				var hX = hW.style.iconSize;
				var hZ = hW.direction;
				switch(hZ) {
					case dX:
						hS = -Math.round(hX[0] / 2);
						hQ = -Math.round(hX[1] / 2);
						T = Math.round(hX[0] / 2);
						e = Math.round(hX[1] / 2);
						break;
					case ff:
						hS = -Math.round(hX[0] / 2);
						hQ = 0;
						T = Math.round(hX[0] / 2);
						e = hX[1];
						break
				}
			}
			if(hW.textPos) {
				var hT = hW.textPos["vertex"];
				for(var hV = 0, hR = hT.length; hV < hR; hV += 2) {
					var h0 = hT[hV];
					var hY = hT[hV + 1];
					if(h0 < hS) {
						hS = h0
					}
					if(h0 > T) {
						T = h0
					}
					if(hY < hQ) {
						hQ = hY
					}
					if(hY > e) {
						e = hY
					}
				}
			}
			hW.bds = [hS, hQ, T, e]
		},
		_updateLineLabelCoords: function(h7, hX) {
			if(hX === 0) {
				return
			}
			var hQ = h7.wordsInfo;
			var h4 = h7.wordCount;
			if(!h7.labelImagePosition) {
				return
			}
			var hZ = h7.labelImagePosition.slice(0);
			if(h7.reverse) {
				hZ.reverse()
			}
			var ih = 1000;
			var id = 1000;
			var ie = -1000;
			var ic = -1000;
			for(var h8 = 0; h8 < h4; h8++) {
				var ii = hZ[h8];
				var ig = ii[0];
				var h5 = ii[1];
				var h3 = h7.textSize[h8];
				var hW = h3[0];
				var e = h3[1];
				var hV = ig / 512;
				var h2 = (hX - h5 - e * 2) / hX;
				var hT = (ig + hW * 2) / 512;
				var h1 = h2;
				var hR = hT;
				var h0 = (hX - h5) / hX;
				var T = hV;
				var hY = h0;
				hQ[h8].size = [hW, e];
				hQ[h8].texcoord = [hV, h2, hT, h1, hR, h0, hV, h2, hR, h0, T, hY];
				var ib = hQ[h8].offset[0];
				var ia = hQ[h8].offset[1];
				var h9 = ib - hW / 2;
				var hU = ia + e / 2;
				var hS = ia - e / 2;
				var h6 = ib + hW / 2;
				if(h9 < ih) {
					ih = h9
				}
				if(h6 > ie) {
					ie = h6
				}
				if(hS < id) {
					id = hS
				}
				if(hU > ic) {
					ic = hU
				}
			}
			h7.bds = [ih, id, ie, ic]
		}
	});
	var cT = {
		0: "00000000",
		16: "00010000",
		32: "00100000",
		48: "00110000",
		64: "01000000",
		96: "01100000"
	};

	function cq(T, hQ, hR) {
		var e = T.bds;
		if(!e) {
			return false
		}
		var i = T.tracer;
		var hU;
		if(i) {
			if(!cT[i]) {
				hU = i.toString(2);
				if(hU.length < 8) {
					hU = new Array(8 - hU.length + 1).join("0") + hU
				}
				cT[i] = hU
			}
			hU = cT[i];
			var hT = di.mapZoomStartZoomMapping[hQ];
			return hU[hQ - hT] === "1"
		}
		var hS = T.displayRange;
		if(hR >= hS[0] && hR <= hS[1]) {
			return true
		}
		return false
	}

	function dj(i, e) {
		this.map = i.map;
		this.layer = i;
		e = e || [];
		this.allLabels = [];
		this._spotData = [];
		this._strategyInfo = null;
		this.RANK1 = 1000000;
		this.RANK2 = 2000000;
		this.RANK3 = 3000000;
		this.RANK4 = 4000000;
		this.RANK5 = 5000000;
		this._useRound = false;
		this._mapIsMoving = false;
		this._onMapIdleCallback = e.onMapIdleCallback;
		this.map.temp.isPermitSpotOver = true;
		this.currentSelectedLabel = null;
		this.map._labelProcessor = this;
		this.iconCache = {};
		this.fixedLabelData = [];
		this.lineLabelData = [];
		this.highlightLabelData = [];
		this._iconLoadTimer = null;
		this._labelTextCanvas = null;
		if(this.map.config.textRenderType === "canvas") {
			this._labelTextCanvas = this.map.tileMgr.getLabelTextCanvas()
		}
		this.bind()
	}
	C.extend(dj.prototype, {
		bind: function() {
			var T = this.map;
			var i = this;
			T.addEventListener("mapstatusbusy_inner", function(hQ) {
				i._useRound = false;
				i._mapIsMoving = true
			});
			T.addEventListener("mapstatusidle_inner", function(hQ) {
				if(!f4()) {
					i._useRound = true
				}
				i._mapIsMoving = false
			});
			T.addEventListener("onspotmouseover", function(hS) {
				if(!this.temp.isPermitSpotOver) {
					return
				}
				if(hS.spots.length > 0) {
					var hR = hS.spots[0].userdata.uid;
					var hT = hS.spots[0].userdata.tilePosStr;
					var hQ = i.getLabelByUid(hR, hT);
					hQ && hQ.formatedData && i._toHighlightColor(hQ.formatedData)
				}
			});
			T.addEventListener("onspotmouseout", function(hS) {
				if(!this.temp.isPermitSpotOver) {
					return
				}
				if(hS.spots.length > 0) {
					var hR = hS.spots[0].userdata.uid;
					var hT = hS.spots[0].userdata.tilePosStr;
					var hQ = i.getLabelByUid(hR, hT);
					hQ && hQ.formatedData && i._toDefaultColor(hQ.formatedData)
				}
			});
			T.addEventListener("spotclick", function(hS) {
				if(hS.spots && hS.spots.length > 0) {
					if(hS.spots[0].userdata.zoom < 10) {
						return
					}
					var hR = hS.spots[0].userdata.uid;
					var hT = hS.spots[0].userdata.tilePosStr;
					if(i.currentSelectedLabel && (i.currentSelectedLabel.uid !== hR || i.currentSelectedLabel.tilePosStr !== hT)) {
						i._recoverNormalState()
					}
					var hQ = i.getLabelByUid(hR, hT);
					hQ && i._changeBaseMapState(hQ)
				} else {
					i._recoverNormalState()
				}
			});
			T.on("spot_status_reset", function() {
				i._recoverNormalState()
			});
			T.on("spot_highlight", function(hR) {
				var hQ = i.getLabelByUid(hR.uid, hR.tilePosStr);
				hQ && hQ.formatedData && i._toHighlightColor(hQ.formatedData)
			});
			T.addEventListener("mousemove", function(hQ) {
				if(i.curSpotAdded) {
					return
				}
				if(this.currentOperation !== dU.idle || i._mapIsMoving === true) {
					return
				}
				i._refreshSpotData();
				this.temp.isPermitSpotOver = true;
				i.curSpotAdded = true
			});
			if(f4()) {
				function e() {
					i._refreshSpotData()
				}
				T.addEventListener("mapstatusidle_inner", e)
			}
			T.on("style_loaded", function() {
				if(i.map.config.textRenderType === "canvas" && !i._labelTextCanvas) {
					i._labelTextCanvas = i.map.tileMgr.getLabelTextCanvas()
				}
			})
		},
		getLabelByUid: function(hT, hU) {
			var e = this.map._featureMgr.getResult().tileLabels;
			for(var hS = 0; hS < e.length; hS++) {
				var T = e[hS].fixedLabel;
				for(var hR = 0; hR < T.length; hR++) {
					if(e[hS].fixedLabel[hR].guid === hT && e[hS].fixedLabel[hR].tilePosStr === hU) {
						return e[hS].fixedLabel[hR]
					}
				}
				var hQ = e[hS].indoorLabel;
				for(var hR = 0; hR < hQ.length; hR++) {
					if(e[hS].indoorLabel[hR].guid === hT && e[hS].indoorLabel[hR].tilePosStr === hU) {
						return e[hS].indoorLabel[hR]
					}
				}
			}
			return null
		},
		getTileByLabelUid: function(hT) {
			var e = this.map._featureMgr.getResult().tileLabels;
			for(var hS = 0; hS < e.length; hS++) {
				var T = e[hS].fixedLabel;
				for(var hR = 0; hR < T.length; hR++) {
					if(e[hS].fixedLabel[hR].guid === hT) {
						return e[hS]
					}
				}
				var hQ = e[hS].indoorLabel;
				for(var hR = 0; hR < hQ.length; hR++) {
					if(e[hS].indoorLabel[hR].guid === hT) {
						return e[hS]
					}
				}
			}
			return null
		},
		_toHighlightColor: function(T) {
			if(T.tempRank && T.tempRank === this.RANK5) {
				return
			}
			var e = this.map._featureMgr.getResult().eleData[4] || [];
			var hR = false;
			for(var hQ = 0; hQ < e.length; hQ++) {
				if(e[hQ] === T || (e[hQ].guid === T.guid && e[hQ].tilePosStr === T.tilePosStr && e[hQ].zoom === T.zoom)) {
					hR = true;
					break
				}
			}
			if(hR) {
				return
			}
			e.push(T);
			this.map._featureMgr.setOverlayData(e, 4);
			this.map.dispatchEvent(new bb("onrefresh"))
		},
		_toDefaultColor: function(T) {
			if(T.tempRank && T.tempRank === this.RANK5) {
				return
			}
			var e = this.map._featureMgr.getResult().eleData[4] || [];
			for(var hQ = 0; hQ < e.length; hQ++) {
				if(T === e[hQ] || (T.guid === e[hQ].guid && T.tilePosStr === e[hQ].tilePosStr && T.zoom === e[hQ].zoom)) {
					e.splice(hQ, 1);
					break
				}
			}
			this.map._featureMgr.setOverlayData(e, 4);
			this.map.dispatchEvent(new bb("onrefresh"))
		},
		_changeBaseMapState: function(i) {
			var hR = i.guid;
			var hV = i.formatedData.guidExt;
			var hX = {
				guid: hR,
				tilePosStr: i.tilePosStr,
				guidExt: hV
			};
			this._strategyInfo = hX;
			this.currentSelectedLabel = i;
			var hQ = this.map._featureMgr;
			var e = hQ.getLabelData();
			e = this.collisionTest(e);
			this.updateLabels(e);
			var hY = this.fixDataFormat(e);
			hQ.setOverlayData(hY[0], 2);
			hQ.setOverlayData(hY[1], 3);
			hQ.setOverlayData(hY[2], 4);
			var T = this.getTileByLabelUid(hR);
			this.currentSelectedLabel.tileInfo = T.tileInfo;
			var hW = T.tileInfo.zoom;
			var hU = this.layer.tileCache.getAllData();
			for(var hT in hU) {
				var hS = hU[hT].data;
				if(!hS.label) {
					continue
				}
				this.clearCollisionCache(hS.label)
			}
			this.map.dispatchEvent(new bb("onrefresh"))
		},
		_recoverNormalState: function() {
			this._strategyInfo = null;
			var hU = false;
			var hS = this.map._featureMgr.getLabelData();
			if(this.currentSelectedLabel) {
				var T = this.currentSelectedLabel.guid;
				this.clearCollisionCache(this.getTileByLabelUid(T));
				var hR = this.layer.tileCache.getAllData();
				for(var hQ in hR) {
					var hT = hR[hQ].data;
					if(!hT.label) {
						continue
					}
					this.clearCollisionCache(hT.label)
				}
				this.currentSelectedLabel.tempRank = null;
				this.currentSelectedLabel = null;
				hU = true
			}
			hS = this.collisionTest(hS);
			this.updateLabels(hS);
			var e = this.fixDataFormat(hS);
			var i = this.map._featureMgr;
			i.setOverlayData(e[0], 2);
			i.setOverlayData(e[1], 3);
			i.setOverlayData([], 4);
			this.map.dispatchEvent(new bb("onrefresh"));
			if(hU) {
				this.curSpotAdded = false;
				this._refreshSpotData()
			}
		},
		loadIconImages: function(hR, h2) {
			var hU = hR.label;
			var hS = hR.tileInfo.style;
			var T = hU.fixedLabel;
			var hZ = hU.indoorLabel;
			var h3 = T.length + hZ.length;
			var hW = this;
			var hQ = 0;
			var h1 = 200;
			for(var hT = 0; hT < h3; hT++) {
				var hV;
				if(hT < T.length) {
					hV = T[hT]
				} else {
					hV = hZ[hT - T.length]
				}
				if(!hV.iconPos) {
					continue
				}
				var hY = hV.iconPos.iconType;
				var h0 = hS + "_" + hY;
				hQ++;
				if(this.iconCache[h0]) {
					if(this.iconCache[h0].loaded) {
						h2(hR)
					}
					continue
				}
				var hX = new Image();
				hX.id = h0;
				hX.crossOrigin = "anonymous";
				hX.onload = function() {
					hW.iconCache[this.id].loaded = true;
					hW._addToIconTexture(this);
					if(hW._iconLoadTimer === null) {
						hW._iconLoadTimer = setTimeout(function() {
							h2();
							hW._iconLoadTimer = null
						}, h1)
					}
					this.onload = null
				};
				hX.onerror = function() {
					if(!hW._iconLoadTimer) {
						hW._iconLoadTimer = setTimeout(function() {
							h2();
							hW._iconLoadTimer = null
						}, h1)
					}
					hW.iconCache[this.id] = null;
					this.onerror = null
				};
				var e = e3.getIconSetPath(this.map.config.style) + hY + ".png";
				hX.src = e;
				this.iconCache[h0] = {
					loaded: false,
					image: hX
				}
			}
			return hQ
		},
		_addToIconTexture: function(hS) {
			if(!this.map._webglMapScene) {
				return
			}
			var hU = this.map._webglMapScene._painter;
			var e = hU._iconTextureAtlas.addTexture(hS);
			hU._iconTextureAtlasOffset[hS.id] = e;
			var hX = 0 * hS.width / 1024 + e.width;
			var hR = 0 * hS.height / 1024 + e.height;
			var hW = hS.width / 1024 + e.width;
			var hQ = hR;
			var hV = hW;
			var T = hS.height / 1024 + e.height;
			var hT = hX;
			var i = T;
			hU._iconTextureAtlasCoords[hS.id] = [hX, hR, hW, hQ, hV, T, hX, hR, hV, T, hT, i]
		},
		loadImgByStr: function(hQ, hR, hS) {
			if(!hQ && !hR) {
				hS && hS(null, null);
				return
			}
			if(typeof hQ === "object" && typeof hR === "object") {
				hS(hQ, hR);
				return
			}
			var i = 0;
			var T = null;
			var e = null;
			if(hQ) {
				i++;
				T = new Image();
				T.onload = function() {
					i--;
					if(i === 0) {
						hS && hS(this, e)
					}
					this.onload = null
				};
				T.src = hQ
			}
			if(hR) {
				i++;
				e = new Image();
				e.onload = function() {
					i--;
					if(i === 0) {
						hS && hS(T, this)
					}
					this.onload = null
				};
				e.src = hR
			}
		},
		collisionTest: function(hX, iD, ig) {
			if(this.map.viewAnimationTime) {
				return []
			}
			if(!hX) {
				return []
			}
			var h7 = this.map;
			var io = h7.getHeading();
			io = this.calcLoopHeading(io);
			var iy = h7.height;
			var iu = this.allLabels;
			iu.length = 0;
			hX.sort(function(iF, i) {
				var iH = iF.tileInfo;
				var iG = i.tileInfo;
				if(iH.col * iH.row < iG.col * iG.row) {
					return -1
				} else {
					return 1
				}
			});
			var hY = hX.labelZoom;
			var h8 = h7.getTilt();
			var h0 = h7.getZoom();
			var it;
			if(ig) {
				it = ig
			} else {
				it = this.getZoomStep()
			}
			for(var iB = 0, iz = hX.length; iB < iz; iB++) {
				var ib = hX[iB];
				var hV = ib.tileInfo;
				var hS = hV.zoom;
				var ir = hV.loopOffsetX / Math.pow(2, 18 - hS);
				if(!io && !h8) {
					if(ib.unnecessaryCollisionTest && ib.unnecessaryCollisionTest[ig]) {
						continue
					}
				}
				var ij = ib.fixedLabel || [];
				for(var iA = 0, id = ij.length; iA < id; iA++) {
					var hT = ij[iA];
					hT.zoom = hS;
					if(iD === -1 && hT.isDel) {
						continue
					}
					if(!cq(hT, hV.useZoom, h0)) {
						hT.isDel = true;
						continue
					}
					this.calcCollisionBounds(hT, it, ir, iy);
					iu.push(hT)
				}
				var ii = ib.indoorLabel || [];
				for(var iA = 0, id = ii.length; iA < id; iA++) {
					var hT = ii[iA];
					hT.zoom = hS;
					if(iD === -1 && hT.isDel) {
						continue
					}
					if(!cq(hT, hV.useZoom)) {
						hT.isDel = true;
						continue
					}
					this.calcCollisionBounds(hT, it, ir, iy);
					iu.push(hT)
				}
				var hU = ib.lineLabel || [];
				for(var iA = 0, id = hU.length; iA < id; iA++) {
					var hT = hU[iA];
					if(iD === -1 && hT.isDel) {
						continue
					}
					if(!cq(hT, hV.useZoom)) {
						hT.isDel = true;
						continue
					}
					var iE = hT.pt;
					var ie = h7.pointToPixelIn(iE, {
						zoom: it,
						useRound: this._useRound
					});
					var ic = ie.x + ir;
					var ia = iy - ie.y;
					var ih = hT.bds;
					var ix = ih[0];
					var iv = ih[1];
					var h5 = ih[2];
					var h4 = ih[3];
					var ip = ix;
					var im = iv;
					var h3 = h5;
					var h2 = h4;
					if((io >= 0 && io < 45) || (io >= 315 && io < 360)) {
						ip = ix;
						im = iv;
						h3 = h5;
						h2 = h4
					} else {
						if(io >= 45 && io < 135) {
							ip = iv;
							im = -h5;
							h3 = h4;
							h2 = -ix
						} else {
							if(io >= 135 && io < 225) {
								ip = -h5;
								im = -h4;
								h3 = -ix;
								h2 = -iv
							} else {
								if(io >= 225 && io < 315) {
									ip = -h4;
									im = ix;
									h3 = -iv;
									h2 = h5
								}
							}
						}
					}
					hT._tempBds = [ic + ip, ia + im, ic + h3, ia + h2];
					var hW = h7.pixelToPointIn(new ej(hT._tempBds[0], ie.y + im), {
						zoom: it
					});
					var hQ = h7.pixelToPointIn(new ej(hT._tempBds[2], ie.y + h2), {
						zoom: it
					});
					hT._mcBds = [hW, hQ];
					iu.push(hT)
				}
			}
			var iq = this._strategyInfo;
			if(iq) {
				var h1 = iq.guid;
				var h9 = iq.guidExt;
				var T = false;
				for(var iB = 0, iz = iu.length; iB < iz; iB++) {
					var iw = iu[iB];
					delete iw.tempRank;
					if(!this.layer.isClickableLabel(iw) || (h9 === 1 && !iw.guidExt)) {
						continue
					}
					if(h1 === iw.guid && iq.tilePosStr === iw.tilePosStr) {
						iw.tempRank = this.RANK5;
						T = true
					}
				}
				if(!T && this.currentSelectedLabel) {
					this.currentSelectedLabel.tempRank = this.RANK5;
					var hV = this.currentSelectedLabel.tileInfo;
					var hS = hV.zoom;
					var ir = hV.loopOffsetX / Math.pow(2, 18 - hS);
					this.calcCollisionBounds(this.currentSelectedLabel, it, ir, iy);
					iu.push(this.currentSelectedLabel)
				}
			} else {
				for(var iB = 0, iz = iu.length; iB < iz; iB++) {
					var iw = iu[iB];
					if(iw.type === "line" || !iw.iconPos) {
						continue
					}
					delete iw.tempRank
				}
			}
			iu.sort(function(iG, iF) {
				var iH = iG.tempRank ? iG.tempRank : iG.rank;
				var i = iF.tempRank ? iF.tempRank : iF.rank;
				return i - iH || iG.startZoom - iF.startZoom || iF.pt.lng - iG.pt.lng || iF.pt.lat - iG.pt.lat
			});
			var hR = 0;
			if(h8 > 0) {
				hR = 6
			}
			var h0 = h7.getZoom();
			if(h0 >= 8 && h0 < 9) {
				h0 < 8.5 ? (hR = 6) : (hR = 3)
			}
			if(h7._displayOptions.labelMargin > 0) {
				hR = h7._displayOptions.labelMargin
			}
			var e = 2;
			if(h0 < 6 && h0 >= 5) {
				e = -1
			}
			for(var iB = 0, iz = iu.length; iB < iz; iB++) {
				var il = iu[iB];
				var hZ = il._tempBds;
				il.isDel = false;
				il._intersectIdx = [];
				for(iA = iB + 1; iA < iz; iA++) {
					var h6 = iu[iA];
					var iC = h6._tempBds;
					if(!(hZ[2] + hR + e < iC[0] - hR || hZ[0] - hR > iC[2] + hR + e || hZ[3] + hR + e < iC[1] - hR || hZ[1] - hR > iC[3] + hR + e)) {
						il._intersectIdx.push(iA)
					}
				}
			}
			for(var iB = 0, iz = iu.length; iB < iz; iB++) {
				var iw = iu[iB];
				if(iw.isDel === false) {
					var ik = iw._intersectIdx;
					for(var iA = 0, id = ik.length; iA < id; iA++) {
						iu[ik[iA]].isDel = true
					}
				}
			}
			return hX
		},
		calcCollisionBounds: function(hW, hU, i, hV) {
			var hS = hW.pt;
			var hQ = this.map;
			var hR = hQ.pointToPixelIn(hS, {
				zoom: hU,
				useRound: this._useRound
			});
			var T = hR.x + i;
			var hY = hV - hR.y;
			var e = hW.bds;
			hW._tempBds = [T + e[0], hY + e[1], T + e[2], hY + e[3]];
			var hT = hQ.pixelToPointIn(new ej(hW._tempBds[0], hR.y + e[1]), {
				zoom: hU
			});
			var hX = hQ.pixelToPointIn(new ej(hW._tempBds[2], hR.y + e[3]), {
				zoom: hU
			});
			hW._mcBds = [hT, hX]
		},
		getZoomStep: function() {
			var T = this.map.getZoom();
			var e = Math.floor(T);
			var i = T - e >= 0.5 ? e + 0.5 : e;
			return i
		},
		clearCollisionCache: function(e) {
			if(!e) {
				return
			}
			e.cacheState = null;
			e.unnecessaryCollisionTest = null
		},
		getCachedLabels: function(e) {
			e = e || [];
			var T = this.getZoomStep();
			var hR = [];
			var hT = false;
			for(var hQ = 0; hQ < e.length; hQ++) {
				var hS = e[hQ];
				if(!hS.cacheState || !hS.cacheState[T]) {
					hT = true;
					break
				}
				if(hS.hasNewData) {
					hT = true;
					break
				}
			}
			if(hT) {
				this.calcLabelsCollision(e)
			}
			return e
		},
		calcLabelsCollision: function(T) {
			var hR = this.getZoomStep();
			var hS = {};
			var hV;
			var hQ;
			T = this.collisionTest(T, undefined, hR);
			bJ.addLabelIntoAreaSpots(T);
			for(var hU = 0; hU < T.length; hU++) {
				hV = T[hU];
				hQ = hV.tileInfo;
				var hZ = hQ.col + "," + hQ.row;
				hS[hZ] = 1
			}
			var e = {};
			for(var hU = 0; hU < T.length; hU++) {
				hV = T[hU];
				if(!hV.cacheState) {
					hV.cacheState = {}
				}
				hQ = hV.tileInfo;
				var hY = hQ.col;
				var hW = hQ.row;
				hZ = hY + "," + hW;
				if(hV.cacheState[hR] === "stable") {
					e[hZ] = 1;
					if(!hV.hasNewData) {
						continue
					}
				}
				for(var hT = 0; hT < hV.fixedLabel.length; hT++) {
					var hX = hV.fixedLabel[hT];
					if(!hX.cachedIsDel) {
						hX.cachedIsDel = {}
					}
					hX.cachedIsDel[hR] = hX.isDel
				}
				for(var hT = 0; hT < hV.indoorLabel.length; hT++) {
					var hX = hV.indoorLabel[hT];
					if(!hX.cachedIsDel) {
						hX.cachedIsDel = {}
					}
					hX.cachedIsDel[hR] = hX.isDel
				}
				for(var hT = 0; hT < hV.lineLabel.length; hT++) {
					var hX = hV.lineLabel[hT];
					if(!hX.cachedIsDel) {
						hX.cachedIsDel = {}
					}
					hX.cachedIsDel[hR] = hX.isDel
				}
				if(hS[(hY - 1) + "," + (hW - 1)] && hS[(hY - 1) + "," + hW] && hS[(hY - 1) + "," + (hW + 1)] && hS[hY + "," + (hW - 1)] && hS[hY + "," + (hW + 1)] && hS[(hY + 1) + "," + (hW - 1)] && hS[(hY + 1) + "," + hW] && hS[(hY + 1) + "," + (hW + 1)]) {
					hV.cacheState[hR] = "stable";
					e[hZ] = 1
				} else {
					if(!hV.cacheState[hR]) {
						hV.cacheState[hR] = "unstable"
					}
				}
			}
			for(var hU = 0; hU < T.length; hU++) {
				var hV = T[hU];
				hQ = hV.tileInfo;
				var hZ = hQ.col + "," + hQ.row;
				var hY = +hQ.col;
				var hW = +hQ.row;
				if(e[(hY - 1) + "," + (hW - 1)] && e[(hY - 1) + "," + hW] && e[(hY - 1) + "," + (hW + 1)] && e[hY + "," + (hW - 1)] && e[hY + "," + (hW + 1)] && e[(hY + 1) + "," + (hW - 1)] && e[(hY + 1) + "," + hW] && e[(hY + 1) + "," + (hW + 1)]) {
					if(!hV.unnecessaryCollisionTest) {
						hV.unnecessaryCollisionTest = {}
					}
					hV.unnecessaryCollisionTest[hR] = 1
				}
			}
			T.hasNewData = false
		},
		updateLabels: function(hQ) {
			var e = this.map;
			var hW = e.getZoom();
			var hY = e.getHeading();
			hY = this.calcLoopHeading(hY);
			var hX = e.getTilt();
			var hR = this.getZoomStep();
			for(var hV = 0, hS = hQ.length; hV < hS; hV++) {
				var hU = hQ[hV];
				var T = hU.tileInfo;
				var hT = T.loopOffsetX || 0;
				this.updateFixedLabel(hU.fixedLabel, hX, hY, hU, hR, hW, hT);
				this.updateFixedLabel(hU.indoorLabel, hX, hY, hU, hR, hW, 0);
				this.updateLineLabel(hU.lineLabel, hX, hY, hU, hR)
			}
		},
		updateFixedLabel: function(hV, hX, i, hZ, hR, e, hQ) {
			if(hV.length === 1) {}
			for(var h0 = 0, hS = hV.length; h0 < hS; h0++) {
				var hW = hV[h0];
				if(!hW.cachedIsDel) {
					continue
				}
				if(!hX && !i && hZ.cacheState && hZ.cacheState[hR]) {
					hW.isDel = hW.cachedIsDel[hR];
					if(typeof hW.isDel === "undefined") {
						hW.isDel = hW.cachedIsDel[hR] = true
					}
				}
				if(hW.startScale > e) {
					hW.isDel = true
				}
				if(hW.isDel) {
					continue
				}
				var h2 = hW.pt;
				var T = hW.iconPos;
				if(T && T.texcoord) {
					if(!T.rtVertex) {
						T.rtVertex = [];
						var h4 = T.vertex;
						var hT = aF(h2.lng);
						var h1 = aF(h2.lat);
						T.rtVertex = [hT[0], h1[0], hT[1], h1[1], 0, h4[0], h4[1], 0, 0, T.texcoord[0], T.texcoord[1], hT[0], h1[0], hT[1], h1[1], 0, h4[2], h4[3], 0, 0, T.texcoord[2], T.texcoord[3], hT[0], h1[0], hT[1], h1[1], 0, h4[4], h4[5], 0, 0, T.texcoord[4], T.texcoord[5], hT[0], h1[0], hT[1], h1[1], 0, h4[6], h4[7], 0, 0, T.texcoord[6], T.texcoord[7], hT[0], h1[0], hT[1], h1[1], 0, h4[8], h4[9], 0, 0, T.texcoord[8], T.texcoord[9], hT[0], h1[0], hT[1], h1[1], 0, h4[10], h4[11], 0, 0, T.texcoord[10], T.texcoord[11]]
					}
				}
				var h3 = hW.textPos;
				if(h3) {
					if(!h3.rtVertex) {
						h3.rtVertex = [];
						var h4 = h3.vertex;
						var hU = h3.rtVertex;
						var hT = aF(h2.lng);
						var h1 = aF(h2.lat);
						var h6 = aF(hQ);
						for(var hY = 0, h5 = h4.length; hY < h5; hY += 12) {
							hU.push(hT[0], h1[0], hT[1], h1[1], 0, h4[hY], h4[hY + 1], h6[0], h6[1], h3.texcoord[0], h3.texcoord[1]);
							hU.push(hT[0], h1[0], hT[1], h1[1], 0, h4[hY + 2], h4[hY + 3], h6[0], h6[1], h3.texcoord[2], h3.texcoord[3]);
							hU.push(hT[0], h1[0], hT[1], h1[1], 0, h4[hY + 4], h4[hY + 5], h6[0], h6[1], h3.texcoord[4], h3.texcoord[5]);
							hU.push(hT[0], h1[0], hT[1], h1[1], 0, h4[hY + 6], h4[hY + 7], h6[0], h6[1], h3.texcoord[6], h3.texcoord[7]);
							hU.push(hT[0], h1[0], hT[1], h1[1], 0, h4[hY + 8], h4[hY + 9], h6[0], h6[1], h3.texcoord[8], h3.texcoord[9]);
							hU.push(hT[0], h1[0], hT[1], h1[1], 0, h4[hY + 10], h4[hY + 11], h6[0], h6[1], h3.texcoord[10], h3.texcoord[11])
						}
					}
				}
			}
		},
		updateLineLabel: function(hV, ir, ig, ia, ib) {
			hV = hV || [];
			var h5 = this.map;
			var hY = h5.getZoomUnits();
			for(var iq = 0, io = hV.length; iq < io; iq++) {
				var hU = hV[iq];
				if(!hU.cachedIsDel) {
					continue
				}
				if(!ir && !ig && ia.cacheState && ia.cacheState[ib]) {
					hU.isDel = hU.cachedIsDel[ib];
					if(typeof hU.isDel === "undefined") {
						hU.isDel = hU.cachedIsDel[ib] = true
					}
				}
				if(hU.isDel) {
					continue
				}
				if(!hU.styleText || hU.styleText.length === 0) {
					continue
				}
				var hW = hU.mcInTile;
				var ij = hW.x;
				var ih = hW.y;
				var h9 = hU.wordsInfo;
				var h7 = hU.labelAngle;
				var h3 = false;
				var ii = 0;
				if(ig !== 0) {
					var h4 = h9[0].angle;
					var im = this.calcLoopHeading(h4 - ig);
					var h1 = this.calcLoopHeading(h7 - ig);
					if(im > 45 && im < 315) {
						if(im > 45 && im <= 135) {
							ii = 270
						} else {
							if(im > 135 && im <= 225) {
								ii = 180
							} else {
								if(im > 225 && im < 315) {
									ii = 90
								}
							}
						}
						if(h7 > 225 && h7 <= 315 && ii <= 180) {
							h3 = true
						} else {
							if((h7 >= 0 && h7 <= 45 || h7 >= 315 && h7 < 360) && ii >= 180) {
								h3 = true
							}
						}
					}
				}
				for(var ip = 0, hZ = h9.length; ip < hZ; ip++) {
					var il = h9[ip];
					var h2 = il.calcInfo;
					var ie = il.offset[0];
					var ic = il.offset[1];
					if(!il.size) {
						continue
					}
					var e = il.size[0];
					var T = il.size[1];
					var h0 = il.angle;
					if(!h2) {
						h2 = {}
					}
					if(ig !== h2.mapHeading || hY !== h2.zoomUnits) {
						h2.mapHeading = ig;
						h2.zoomUnits = hY;
						if(h3) {
							var h6 = h9[hZ - 1 - ip];
							ie = h6.offset[0];
							ic = h6.offset[1];
							h0 = h6.angle
						}
						var hR = ij + ie * hY;
						var hQ = ih + ic * hY;
						h2.rotationCenter = {
							lng: hR,
							lat: hQ
						};
						h2.calcHeading = ii;
						h2.angle = h0;
						h2.offsetX = ie;
						h2.offsetY = ic;
						il.calcInfo = h2
					}
					if(!il.rtVertex) {
						il.rtVertex = []
					}
					il.rtVertex.length = 0;
					var h8 = h2.calcHeading + h2.angle;
					var hS = h2.rotationCenter;
					ie = h2.offsetX;
					ic = h2.offsetY;
					var hT = Math.round(ie - e / 2);
					var ik = Math.round(ie + e / 2);
					var id = Math.round(ic + T / 2);
					var hX = Math.round(ic - T / 2);
					il.rtVertex.push(ij, ih, il.z, hT, hX, hS.lng, hS.lat, h8, il.texcoord[0], il.texcoord[1], ij, ih, il.z, ik, hX, hS.lng, hS.lat, h8, il.texcoord[2], il.texcoord[3], ij, ih, il.z, ik, id, hS.lng, hS.lat, h8, il.texcoord[4], il.texcoord[5], ij, ih, il.z, hT, hX, hS.lng, hS.lat, h8, il.texcoord[6], il.texcoord[7], ij, ih, il.z, ik, id, hS.lng, hS.lat, h8, il.texcoord[8], il.texcoord[9], ij, ih, il.z, hT, id, hS.lng, hS.lat, h8, il.texcoord[10], il.texcoord[11])
				}
			}
		},
		calcLoopHeading: function(e) {
			while(e >= 360) {
				e -= 360
			}
			while(e < 0) {
				e += 360
			}
			return e
		},
		fixDataFormat: function(hY) {
			var hQ = this.fixedLabelData;
			var e = this.lineLabelData;
			var T = this.highlightLabelData;
			var h5 = 0;
			var hU = 0;
			var h3 = 0;
			var h4;
			if(this.currentSelectedLabel) {
				var hT = this.getLabelByUid(this.currentSelectedLabel.guid, this.currentSelectedLabel.tilePosStr);
				if(!hT || hT.isDel) {
					hQ[h5] = this.currentSelectedLabel.formatedData;
					h5++;
					T[h3] = this.currentSelectedLabel.formatedData;
					h3++
				}
			}
			for(var h2 = 0; h2 < hY.length; h2++) {
				var hW = hY[h2];
				var hV = hW.fixedLabel;
				var hR = hW.indoorLabel;
				var h1 = hW.lineLabel;
				h4 = this.fixFixedLabelDataFormat(hV, hW, hQ, h5, T, h3);
				h5 = h4[0];
				h3 = h4[1];
				h4 = this.fixFixedLabelDataFormat(hR, hW, hQ, h5, T, h3, true);
				h5 = h4[0];
				h3 = h4[1];
				e[hU] = {
					tileInfo: hW.tileInfo,
					lineLabels: []
				};
				for(var h0 = 0; h0 < h1.length; h0++) {
					if(h1[h0].isDel) {
						continue
					}
					var hX = h1[h0].wordsInfo;
					if(hX) {
						for(var hZ = 0; hZ < hX.length; hZ++) {
							if(!hX[hZ].rtVertex) {
								continue
							}
							var hS = hX[hZ].formatedData;
							if(!hS) {
								hS = {
									textureSource: hW.textureSources[h1[h0].processedInZoom],
									textureHeight: hW.textureHeights[h1[h0].processedInZoom],
									renderData: {
										vertex: hX[hZ].rtVertex,
										textureCoord: hX[hZ].texcoord
									}
								};
								hX[hZ].formatedData = hS
							}
							e[hU].lineLabels.push(hS)
						}
					}
				}
				hU++
			}
			hQ.length = h5;
			e.length = hU;
			T.length = h3;
			return [e, hQ, T]
		},
		fixFixedLabelDataFormat: function(hT, hW, hX, hU, hR, e, hV) {
			for(var i = 0; i < hT.length; i++) {
				if(hT[i].isDel) {
					continue
				}
				var hS = hT[i].textPos;
				var hQ = hT[i].iconPos;
				var T = null;
				if(hS && hS.rtVertex) {
					if(!hT[i].formatedData) {
						T = {
							guid: hT[i].guid,
							guidExt: hT[i].guidExt,
							tilePosStr: hT[i].tilePosStr,
							zoom: hT[i].zoom,
							tempRank: hT[i].tempRank,
							textureSource: hW.textureSources[hT[i].processedInZoom],
							textureHeight: hW.textureHeights[hT[i].processedInZoom],
							renderData: {
								vertex: hS.rtVertex,
								textureCoord: hS.texcoord
							}
						};
						if(hV && hT[i].onDefaultFloor === false) {
							T.textureSource = hW.indoorTextureSources[hT[i].processedInZoom];
							T.textureHeight = hW.indoorTextureHeights[hT[i].processedInZoom]
						}
						hT[i].formatedData = T
					} else {
						T = hT[i].formatedData;
						T.tempRank = hT[i].tempRank
					}
					if(this.currentSelectedLabel && T.guid === this.currentSelectedLabel.guid && T.tilePosStr === this.currentSelectedLabel.tilePosStr) {
						hR[e] = T;
						e++
					}
				}
				if(hQ && hQ.rtVertex) {
					if(T) {
						if(!T.iconRenderData) {
							T.iconRenderData = {
								vertex: hQ.rtVertex,
								textureCoord: hQ.texcoord
							}
						}
					} else {
						T = {
							guid: hT[i].guid,
							guidExt: hT[i].guidExt,
							zoom: hT[i].zoom,
							tempRank: hT[i].tempRank,
							iconRenderData: {
								vertex: hQ.rtVertex,
								textureCoord: hQ.texcoord
							}
						};
						hT[i].formatedData = T
					}
				}
				hX[hU] = T;
				hU++
			}
			return [hU, e]
		},
		_refreshSpotData: function() {
			this._spotData.length = 0;
			var hV = this.map;
			var hT = Math.floor(hV.getZoom());
			var T = this.map._featureMgr.getLabelData();
			if(T) {
				for(var hR = 0, hQ = T.length; hR < hQ; hR++) {
					this._addFixedSpotData(T[hR].fixedLabel, hT);
					this._addFixedSpotData(T[hR].indoorLabel, hT)
				}
			}
			var hW = this.currentSelectedLabel;
			if(hW && !this.getTileByLabelUid(hW.guid, hW.tilePosStr)) {
				var hS = this._getSpotDataFromLabel(this.currentSelectedLabel);
				if(hS) {
					this._spotData.push(hS)
				}
			}
			var hU = new bb("onspotsdataready");
			hU.spots = this._spotData;
			hV._spotDataOnCanvas = this._spotData;
			hV.dispatchEvent(hU)
		},
		_addFixedSpotData: function(hR, hQ) {
			for(var e = 0; e < hR.length; e++) {
				var T = hR[e];
				if(!this.layer.isClickableLabel(T) || (T.guidExt === 1 && T.startScale > hQ)) {
					continue
				}
				var i = hR[e].spot || this._getSpotDataFromLabel(hR[e]);
				if(i) {
					this._spotData.push(i)
				}
			}
		},
		_getSpotDataFromLabel: function(T) {
			var hS = this.map;
			if(!T.bds) {
				return null
			}
			var e = T.bds.slice(0);
			var hQ = null;
			if(T.iconPos) {
				hQ = new hr(T.pt.lng, T.pt.lat)
			}
			var i = T.name ? T.name.replace("\\\\", "<br>") : "";
			if(T.iconPos && T.iconPos.iconType.indexOf("ditie") > -1 && hS.getZoom() > 14) {
				i = ""
			}
			var hR = {
				n: i,
				pt: new hr(T.pt.lng, T.pt.lat),
				userdata: {
					iconPoint: hQ,
					uid: T.guid,
					name: i,
					mapPoi: true,
					type: T.iconPos ? T.iconPos.iconType : "",
					rank: T.rank,
					zoom: T.zoom,
					tilePosStr: T.tilePosStr
				},
				bd: e,
				tag: "MAP_SPOT_INFO"
			};
			T.spot = hR;
			return hR
		},
		drawLabelsOnCanvas: function(i, e) {
			if(this._labelTextCanvas) {
				this._labelTextCanvas.drawLabelsOnCanvas(i, e)
			}
		}
	});

	function fT(e) {
		this._map = e;
		this.virtualTile = {
			custom: true,
			label: {
				fixedLabel: [],
				indoorLabel: [],
				lineLabel: [],
				textureHeights: [],
				status: "ready"
			},
			tileInfo: {
				col: 0,
				row: 0,
				zoom: 0,
				useZoom: 0,
				loopOffsetX: 0
			},
			status: "ready"
		};
		this.virtualTile.label.tileInfo = this.virtualTile.tileInfo;
		this.init()
	}
	fT.prototype.init = function() {
		var T = this._map;
		var i = this;

		function e() {
			i.updateLabels()
		}
		T.addEventListener("add_tile_labels", e);
		T.addEventListener("onremove_tile_labels", e);
		T.addEventListener("onclear_labels", e)
	};
	fT.prototype.updateLabels = function() {
		var i = this._map.tileMgr.getLabelTextCanvas();
		var T = this._map;
		var e = this;
		i.drawCustomLabelsOnCanvas(T._customTileLabels, function(hR) {
			var hQ = e.virtualTile;
			if(hR) {
				hQ.label.textureHeights[0] = [hR.height]
			}
			hQ.label.fixedLabel = T._customTileLabels;
			var hS = new bb("oncustom_labels_ready");
			hS.virtualTile = hQ;
			hS.labelCanvas = hR;
			hS.imgKey = bo.getGUID("custom_labels_");
			T.dispatchEvent(hS)
		})
	};
	bo.register(function(e) {
		e._customLabelMgr = new fT(e)
	});
	var aM = "\x31\x2e\x30\x2e\x32",
		aA = function(h7, h6) {
			var h5 = {
				"\x65\x78\x78\x78\x64": function(h8, e) {
					return h8 < e
				},
				"\x63\x61\x78\x78\x61": function(h8, e) {
					return h8(e)
				},
				"\x78\x65\x61\x61\x65": function(h8, e, h9) {
					return h8(e, h9)
				},
				"\x65\x61\x69\x64\x61": function(h8, e) {
					return h8(e)
				},
				"\x68\x68\x65\x6d\x61": "\x43\x68\x61\x72",
				"\x78\x6c\x63\x65\x68": function(h8, e) {
					return h8 + e
				}
			};

			function h0(ib, ia) {
				var h9 = ib["\x6c\x65\x6e\x67\x74\x68"];
				var h8 = [];
				for(var e = 0; h5["\x65\x78\x78\x78\x64"](e, h9); e++) {
					var ic = h5["\x63\x61\x78\x78\x61"](ia, ib[e]);
					h8["\x70\x75\x73\x68"](ic)
				}
				return h8
			}
			var hU, h4, h3, h2, h1, hZ = decodeURIComponent,
				hY = h5["\x68\x68\x65\x6d\x61"],
				hX = "";
			var hW = [aA];
			hU = "\x64\x65";
			h4 = "\x66\x72";
			h3 = "\x6f";
			h1 = h4 + h3 + "\x6d";
			h2 = h5["\x78\x6c\x63\x65\x68"]("\x43\x6f", hU);
			var hV = function(e) {
				return(e + hX)["\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f\x72"][h1 + hY + h2](e)
			};
			var hT = function(e) {
				return h5["\x78\x65\x61\x61\x65"](h0, e, function(h8) {
					return hV(h8)
				})
			};
			var hS = hT["\x63\x61\x6c\x6c"](hV, [39, 34, 37, 96, 60, 120, 97, 65, 98, 66, 99, 67, 100, 68, 101, 69, 102, 70, 103, 110, 109, 111, 112, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
			var hR = h0([28782, 27702, 26416, 25167, 24183], function(e) {
				return h5["\x63\x61\x78\x78\x61"](hZ, e)
			});
			var hQ = hT["\x63\x61\x6c\x6c"](hR, [22354, 22749, 24415, 23346, 22257, 22688, 24306, 25174, 23595, 25547, 22984, 25690, 22212, 27547, 21594, 27210, 23090, 29193, 22394, 29368, 29532, 29459, 29530, 24146, 24500, 26352, 27441, 28788, 29370, 27673, 26925, 25249, 24430]),
				T = {};
			hR = hT(hR);
			var i = new RegExp(hR["\x6a\x6f\x69\x6e"]("\x7c"));
			for(var hU = 0; hU < hS["\x6c\x65\x6e\x67\x74\x68"]; hU++) {
				T[hQ[hU]] = hS[hU]
			}
			h6 = h0(h6["\x73\x70\x6c\x69\x74"](hX), function(e) {
				return T[e] || e
			})["\x6a\x6f\x69\x6e"](hX);
			return h0(h6["\x73\x70\x6c\x69\x74"](i), function(e) {
				return h5["\x65\x61\x69\x64\x61"](hZ, e)
			})
		}(this, "\x6c\u545a\x68\u5ef2\u5ef2\u706e\u59c8\x75\x73\x74\u7313\u735c\x4d\u5ef2\u735a\x53\x74\x79\x6c\u545a\u5e77\u545a\u5ef2\u735c\x6c\u5ef2\u706e\u59c8\u545a\u5ef2\x6c\u56c4\u6c36\x6c\u735c\u5ef2\u56c4\u59c8\u624f\u735a\u7313\x73\x74\x4d\u545a\x73\x73\u5ef2\u577a\u545a\u6730\u59c8\x69\u56c4\x69\u58a0\u5e77\u735c\u5ef2\u5ef2\u735c\u56c4\u706e\x69\u72b8\u56c4\u545a\u58a0\x4f\u5a32\u706e\u59c8\u735c\x69\u56c4\u59c8\u6730\x6c\u735c\u59c8\u545a\x69\u706e\x68\u5ef2\u5ef2\x6c\u545a\u624f\u59c8\x68\u5ef2\u59c8\x6c\u706e\u577a\u545a\x74\x4d\u5ef2\u735a\x53\x74\x79\x6c\u545a\x49\u56c4\u624f\u5ef2\u59c8\u735c\u58a0\x68\u5e77\x73\x74\x72\x69\u72b8\u577a\x69\u5a32\x79\u6c36\u59c8\x6c\u545a\u735c\u56c4\u706e\u545a\x68\x69\u5ef2\x69\u5e77\u5ef2\u545a\x6c\u5ef2\u5ef2\u6c36\u5ef2\u5ef2\u5ef2\u545a\x6c\u624f\u58a0\x69\u545a\u545a\u5ef2\u6730\u59c8\u5ef2\u5ef2\u58a0\u58a0\u5e77\u735c\u56c4\u545a\u5ef2\u58a0\u5e77\x68\x68\u545a\u624f\x6c\u545a\u59c8\u6730\u56c4\u545a\x68\x6c\u59c8\u6730\u5ef2\u5ef2\u59c8\u6730\x68\x6c\x69\u58a0\u5ef2\u6730\u645a\x75\x73\x74\u7313\u735c\u624f\x6c\u545a\u545a\u58a0\u59c8\u6730\u545a\u59c8\u58a0\u58a0\u59c8\u624f\u735c\u5ef2\u735a\x53\x74\x79\x6c\u545a\x49\u56c4\u706e\u59c8\x75\x73\x74\u7313\u735c\x53\x74\x79\x6c\u545a\x49\u72b8\u5a32\u7313\u624f\x6c\u58a0\u59c8\u5ef2\u56c4\u706e\x68\u545a\u59c8\u5ef2\u5ef2\u5e77\u5ef2\u545a\u5ef2\u5ef2\x6c\u706e\x69\u59c8\u7313\u72b8\x49\u72b8\u5a32\u7313\u624f\x5f\u735a\u5ef2\x72\x73\x69\u72b8\u577a\x54\x69\x6c\u545a\x49\u72b8\u5a32\u7313\u6730\u59c8\u5ef2\x68\u6c36\u735a\x72\u7313\x74\u7313\x74\x79\u735a\u545a\u624f\x69\u72b8\x4d\u5ef2\u735a\x48\u7313\x73\x74\u6c36\u7313\u72b8\u545a\x72\x72\u7313\x72\u6c36\u735a\x72\u545a\x76\u545a\u72b8\x74\u6b9b\u545a\u5a32\u5ef2\x75\x6c\x74\u6c36\u58a0\x6c\u545a\x68\x6c\u706e\u5ef2\x68\u58a0\u706e\u58a0\u545a\u5ef2\x68\u706e\u5f5f\u66f0\u66f0\x29\u5f5f\u6b31\u63cb\u624f\u5ef2\u735c\u56c4\u706e\u545a\u545a\u5ef2\u545a\x69\u6730\x69\u735c\u735a\u7313\x72\x74\x53\u59c8\x72\x69\u735a\x74\x73\x28\u5f5f\u66f0\u66f0\u706e\u58a0\x69\u545a\u59c8\u56c4\u706e\u5ef2\u735a\u735a\x6c\x69\u59c8\u5ef2\x74\x69\u7313\u72b8\u5f5f\u66f0\u7209\x6a\u5ef2\x76\u5ef2\x73\u59c8\x72\x69\u735a\x74\u6c36\u63cb\x6c\u7313\u5c2b\u63cb\x75\x69\x6c\u56c4\u545a\x72\u6730\x57\u545a\u5c2b\x4b\x69\x74\u63cb\x6c\u7313\u5c2b\u63cb\x75\x69\x6c\u56c4\u545a\x72\u624f\x4d\u7313\x7a\u63cb\x6c\u7313\u5c2b\u63cb\x75\x69\x6c\u56c4\u545a\x72\u6730\u5ef2\u735a\u735a\u545a\u72b8\u56c4\u5e77\u577a\u545a\x74\u63cb\x6c\u7313\u5c2b\u5e77\u735c\x69\u735c\u59c8\u58a0\u5e77\x55\x52\x4c\u6c36\x77\u545a\u5c2b\x6b\x69\x74\x55\x52\x4c\u5e77\u59c8\x72\u545a\u5ef2\x74\u545a\x4f\u5c2b\x6a\u545a\u59c8\x74\x55\x52\x4c\u706e\u545a\u56c4\x68\u624f\u59c8\x68\u59c8\u56c4\u58a0\u6c36\x69\u72b8\x69\x74\u5e77\u545a\u5ef2\u545a\u6c36\u59c8\u59c8\x6c\u6730\u5ef2\u5ef2\u5ef2\x69\u5e77\u5ef2\u5ef2\u56c4\u706e\x6c\u735c\x69\u5e77\u545a\x68\u545a\u5e77\x69\u5ef2\u545a\u5e77\u545a\x68\x69\u624f\u59c8\x68\u545a\u5e77\u5ef2\u545a\u58a0\u624f\u5ef2\u56c4\u58a0\u6c36\u56c4\u58a0\u545a\x68\u6c36\x69\x6c\u545a\u6c36\u545a\u58a0\u5ef2\u6c36\u545a\u5ef2\u58a0\u5ef2\u5e77\u5ef2\u59c8\u59c8\u624f\u545a\u56c4\u545a\u706e\u56c4\u545a\u5ef2\u706e\u56c4\u5ef2\u545a\u706e\x68\u5ef2\u545a\u6730\u545a\u5ef2\u56c4\u624f\u59c8\u5ef2\u545a\u6c36\u5ef2\u545a\x6c\u5e77\u58a0\x68\x69\u624f\u5ef2\u56c4\u545a\u5e77\u59c8\u735c\u545a\u5e77\u7313\u72b8\x73\x74\x79\x6c\u545a\x7a\u7313\u7313\u735c\x75\u735a\u56c4\u5ef2\x74\u545a\u624f\u735c\u5ef2\u735a\u6730\x68\u5ef2\x72\u56c4\x77\u5ef2\x72\u545a\u645a\u7313\u72b8\u59c8\x75\x72\x72\u545a\u72b8\u59c8\x79\u6730\u545a\u545a\u5ef2\u545a\u5ef2\u624f\u5ef2\x72\x72\x57\u7313\x72\x6b\u545a\x72\u5e77\x72\u5ef2\x74\x69\u7313\u6c36\x77\u7313\x72\u56c4\x53\u735a\u5ef2\u59c8\u545a\x52\u5ef2\x74\x69\u7313\u6730\x74\u545a\u58a0\x74\x53\x69\x7a\u545a\x52\u5ef2\x74\x69\u7313\u706e\u59c8\u5ef2\u72b8\x55\x73\u545a\x57\u545a\u5c2b\u6256\x73\x73\u545a\u735c\u5c2b\x6c\x79\u6730\u735c\u5ef2\u735c\u58a0\u5ef2\u706e\x69\u56c4\u545a\u6c36\x69\x68\x69\x69\u545a\u6c36\u545a\x68\u59c8\u5e77\x69\u5ef2\u545a\u545a\u59c8\u6730\u545a\u56c4\x6c\u6c36\x69\x69\u5ef2\u5ef2\u56c4\u6730\u545a\x68\x6c\u5e77\x73\x68\x69\u5a32\x74\u5e77\u5ef2\x6c\u5ef2\u58a0\x68\u5e77\u735c\x69\u58a0\u59c8\u56c4\u6c36\x73\u7313\x75\x72\u59c8\u545a\u706e\u545a\u5ef2\x68\u5ef2\x6c\u6c36\u56c4\u545a\u545a\u5e77\x5f\u59c8\u5c2b\x6b\u5e77\u56c4\u5ef2\x74\u5ef2\u6730\u58a0\u59c8\u5ef2\u56c4\u5ef2\u624f\u735c\u545a\u545a\x6c\u58a0\u6c36\x6c\u7313\u5ef2\u56c4\x54\x69\x6c\u545a\u6b9b\u5ef2\x74\u5ef2\u624f\x75\x72\x6c\u706e\x74\x69\x6c\u545a\x49\u72b8\u5a32\u7313\u706e\x74\x69\x6c\u545a\x4b\u545a\x79\u5e77\u56c4\x6c\u58a0\u5ef2\u56c4\u706e\x68\u545a\x68\u735c\u59c8\u6c36\u545a\u5ef2\u58a0\u5ef2\u5ef2\u6730\u5ef2\x72\x72\x50\u545a\u72b8\u56c4\x69\u72b8\u577a\u6b9b\u5ef2\x74\u5ef2\u6730\x6c\u545a\u72b8\u577a\x74\x68\u6730\x68\u56c4\u5ef2\u545a\x69\u6c36\u59c8\u58a0\u735c\x6c\u735c\u6c36\x5f\x69\x73\u63cb\x75\x73\x79\u5e77\u59c8\u5c2b\x6b\u5e77\x68\x69\u59c8\u5ef2\x69\u5e77\x68\x68\x68\u56c4\u735c\u6730\x5f\u735a\u5ef2\x72\x73\x69\u72b8\u577a\x54\x69\x6c\u545a\x4b\u545a\x79\u6c36\x69\u5ef2\u5ef2\u624f\x6c\u735c\x6c\u59c8\x69\u6730\u58a0\x69\u5ef2\u545a\u58a0\u624f\u545a\x69\u5ef2\u5ef2\u5ef2\u6730\u545a\u545a\u58a0\x6c\u545a\u706e\x6c\u735c\u5ef2\u5ef2\u58a0\u706e\u59c8\x68\u56c4\x6c\u58a0\u6c36\u735c\x69\u72b8\u6730\x6c\u545a\u56c4\u5ef2\u545a\u5e77\u7313\u72b8\x73\x74\x79\x6c\u545a\x5f\x6c\u7313\u5ef2\u56c4\u545a\u56c4\u6730\u59c8\x68\u735c\x6c\u5ef2\u6c36\u5ef2\u58a0\u545a\u5ef2\u706e\x68\u545a\u56c4\u58a0\u56c4\u624f\u59c8\u7313\u72b8\u5a32\x69\u577a\u6730\x73\x74\x79\x6c\u545a\u706e\x73\x74\x72\x69\u72b8\u577a\u624f\u545a\u59c8\u545a\x69\x69\u6c36\x69\u58a0\u545a\x68\x69\u5e77\x69\x73\x53\u545a\u72b8\u56c4\u7209\x53\u706e\u735c\u56c4\u5ef2\u706e\x73\x74\x72\x69\u72b8\u577a\x69\u5a32\x69\u545a\u56c4\u645a\x75\x73\x74\u7313\u735c\x53\x74\x79\x6c\u545a\x49\u72b8\u5a32\u7313\x5a\u7313\u7313\u735c\u706e\x68\u5ef2\u735c\u59c8\x6c\u624f\u735c\x68\u56c4\u545a\u5ef2\u624f\u56c4\x68\x6c\x6c\u5e77\u58a0\u59c8\u545a\x68\u58a0\u6730\u56c4\u545a\x69\u59c8\u735c\u6c36\x73\x74\x72\x69\u72b8\u577a\x69\u5a32\x69\u545a\u56c4\u645a\x75\x73\x74\u7313\u735c\x53\x74\x79\x6c\u545a\x49\u72b8\u5a32\u7313\u706e\u5ef2\u59c8\u5ef2\u706e\u56c4\u545a\x73\x74\x72\u7313\x79\u706e\x74\u545a\x72\u735c\x69\u72b8\u5ef2\x74\u545a\u624f\x69\u56c4\x5f\u5e77\u735c\u545a\u5ef2\u735c\u5ef2\u5e77\x74\x69\x6c\u545a\x54\x79\u735a\u545a\x4e\u5ef2\u735c\u545a\u624f\u735c\u5ef2\u735c\u56c4\x6c\u6c36\u59c8\x6c\u5ef2\u545a\u5ef2\u706e\x72\u7313\x77\u706e\x7a\u7313\u7313\u735c\u624f\u735a\x75\x73\x68\u624f\u735c\u5ef2\u5ef2\u5e77\u58a0\u545a\x69\u624f\x73\x74\x72\x69\u72b8\u577a\x69\u5a32\x69\u545a\u56c4\u7209\u545a\u5ef2\x74\x75\x72\u545a\x53\x74\x79\x6c\u545a\u5e77\x68\x6c\u58a0\u706e\u59c8\u56c4\u5ef2\u706e\u58a0\u5ef2\u5ef2\u6c36\u5ef2\u58a0\u545a\u624f\u56c4\x68\u56c4\u624f\x73\x74\x72\x69\u72b8\u577a\x69\u5a32\x69\u545a\u56c4\x49\u59c8\u7313\u72b8\x53\u545a\x74\x49\u72b8\u5a32\u7313\u6730\u58a0\u735c\u5ef2\u706e\u735c\u5ef2\x69\u6730\x68\x6c\x69\u624f\u735c\x68\u56c4\u5e77\u5ef2\u58a0\x68\u706e\u7209\u545a\u5ef2\x74\x75\x72\u545a\x53\x74\x79\x6c\u545a\u706e\u545a\u545a\x6c\u624f\u59c8\u545a\x6c\u706e\u56c4\u5ef2\u56c4\u6730\u59c8\x69\u58a0\u6730\u5ef2\x68\u735c\u624f\x6c\x6c\u59c8\u5e77\u5ef2\u545a\u56c4\u706e\u5ef2\u545a\u735c\u6c36\x69\u59c8\u7313\u72b8\x53\u545a\x74\x49\u72b8\u5a32\u7313\u6730\u577a\u545a\x74\x49\u56c4\x6c\u545a\x57\u7313\x72\x6b\u545a\x72\u706e\u545a\u735c\u5ef2\x6c\u735c\u706e\x69\u545a\u5ef2\u545a\u6c36\x68\u5ef2\u5ef2\u545a\x69\u6c36\x69\u59c8\u735c\u58a0\u545a\u6c36\u59c8\u545a\x69\u545a\x69\u5e77\u5ef2\x6c\x6c\u5e77\u5ef2\u545a\u545a\u56c4\u58a0\u5e77\u5ef2\u56c4\u56c4\u6c36\x73\x74\x72\x69\u72b8\u577a\x69\u5a32\x69\u545a\u56c4\x49\u72b8\u56c4\u7313\u7313\x72\x53\x74\x79\x6c\u545a\u6730\x68\u545a\u58a0\u59c8\u5ef2");
	(function(hQ, T) {
		var i = function(e) {
			while(--e) {
				hQ.push(hQ.shift())
			}
		};
		i(++T)
	}(aA, 246));
	var ax = function(hQ, T) {
		hQ = hQ - 0;
		var i = aA[hQ];
		return i
	};

	function eM(hS) {
		var hR = {
			"\x78\x6c\x65\x68\x6c": function(i, e) {
				return i(e)
			}
		};
		var hQ = null;
		try {
			if(dw[ax("0x0")]) {
				hQ = new Worker(hS);
				hQ[ax("0x1")] = function(e) {
					e[ax("0x2")]();
					hQ = t(hS)
				}
			} else {
				hQ = t(hS)
			}
		} catch(T) {
			hQ = hR[ax("0x3")](t, T)
		}
		return hQ
	}

	function t(hR) {
		var hQ = {
			"\x6c\x61\x78\x6c\x64": ax("0x4"),
			"\x65\x69\x61\x6c\x65": ax("0x5"),
			"\x65\x65\x61\x65\x69": function(hY, hX) {
				return hY + hX
			},
			"\x78\x69\x65\x63\x64": ax("0x6"),
			"\x6d\x69\x6d\x63\x78": "\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74",
			"\x63\x68\x63\x64\x78": "\x65\x64\x68"
		};
		var T = hQ["\x6c\x61\x78\x6c\x64"];
		while(T !== hQ["\x65\x69\x61\x6c\x65"]) {
			switch(T) {
				case ax("0x7"):
					try {
						var i;
						try {
							i = new Blob([hQ[ax("0x8")](ax("0x9"), hR) + hQ[ax("0xa")]], {
								type: ax("0xb")
							})
						} catch(e) {
							var hW = new(window[(ax("0xc"))] || window[(ax("0xd"))] || window[(ax("0xe"))])();
							hW[ax("0xf")](ax("0x9") + hR + hQ[ax("0xa")]);
							i = hW[ax("0x10")](hQ[ax("0x11")])
						}
						var hV = window[ax("0x12")] || window[ax("0x13")];
						var hU = hV[ax("0x14")](i);
						hS = new Worker(hU)
					} catch(hT) {}
					T = ax("0x15");
					break;
				case ax("0x4"):
					var hS = null;
					T = ax("0x7");
					break;
				case hQ[ax("0x16")]:
					return hS
			}
		}
	}

	function f8(e) {
		this[ax("0x17")](e)
	}
	var bf = {
		"\x69\x6e\x69\x74": function(hQ) {
			var T = {
				"\x69\x69\x61\x61\x64": function(hR, hS) {
					return hR !== hS
				},
				"\x61\x6c\x61\x78\x68": ax("0x18"),
				"\x69\x65\x63\x6d\x68": ax("0x19"),
				"\x6d\x69\x78\x63\x64": ax("0x1a"),
				"\x65\x61\x68\x61\x6c": "\x77\x6f\x72\x6b\x65\x72\x6d\x67\x72",
				"\x78\x63\x61\x64\x61": "\x69\x61\x61",
				"\x6d\x65\x65\x6c\x78": ax("0x1b"),
				"\x64\x6c\x78\x61\x64": ax("0x1c"),
				"\x68\x65\x68\x6d\x63": ax("0x1d"),
				"\x65\x61\x78\x61\x61": ax("0x1e"),
				"\x68\x64\x61\x65\x69": "\x64\x65\x65",
				"\x63\x78\x6d\x6c\x6d": ax("0x1f"),
				"\x68\x69\x63\x61\x69": ax("0x20"),
				"\x65\x61\x6d\x6d\x63": ax("0x21"),
				"\x68\x68\x68\x64\x6d": ax("0x22"),
				"\x6d\x61\x6d\x78\x61": ax("0x23"),
				"\x69\x68\x69\x69\x65": ax("0x24"),
				"\x69\x61\x65\x65\x63": function(hS, hR) {
					return hS(hR)
				},
				"\x6c\x6d\x6c\x63\x69": ax("0x25"),
				"\x78\x69\x61\x65\x78": ax("0x26"),
				"\x65\x69\x61\x61\x61": ax("0x27"),
				"\x65\x65\x78\x6c\x65": ax("0x28"),
				"\x6c\x6d\x61\x61\x78": ax("0x29"),
				"\x65\x65\x68\x6d\x63": ax("0x2a"),
				"\x63\x68\x64\x6c\x78": function(hS, hR) {
					return hS < hR
				},
				"\x6c\x65\x64\x61\x65": ax("0x2b"),
				"\x69\x6c\x68\x61\x64": window.location.protocol + "//api.map.baidu.com/res/webgl/10/worker_wasm_kcp3uy.js",
				"\x63\x6c\x64\x61\x61": ax("0x2c"),
				"\x63\x68\x6d\x6c\x61": function(hS, hR) {
					return hS !== hR
				},
				"\x68\x65\x64\x78\x64": ax("0x2d"),
				"\x65\x63\x65\x69\x69": ax("0x2e"),
				"\x69\x78\x65\x68\x69": function(hS, hR) {
					return hS < hR
				},
				"\x6d\x68\x64\x65\x61": "\x61\x63\x61",
				"\x64\x65\x69\x63\x6d": function(hS, hR) {
					return hS !== hR
				},
				"\x78\x63\x65\x68\x78": ax("0x2f"),
				"\x65\x65\x6d\x64\x65": ax("0x30"),
				"\x6d\x65\x65\x63\x68": ax("0x31"),
				"\x65\x65\x61\x65\x61": function(hR) {
					return hR()
				},
				"\x68\x61\x6d\x63\x6c": ax("0x32")
			};
			var i = this;
			this[ax("0x33")] = hQ;
			this["\x61\x72\x72\x50\x65\x6e\x64\x69\x6e\x67\x44\x61\x74\x61"] = [];
			var e = navigator[ax("0x34")] || 4;
			if((T[ax("0x35")](f4) || C["\x42\x72\x6f\x77\x73\x65\x72"]["\x69\x65"]) && e > 2) {
				e = 2
			}
			this[ax("0x36")] = [];
			this[ax("0x37")] = a6();
			this[ax("0x38")] = this[ax("0x37")];
			if(this[ax("0x37")] > 1) {
				this[ax("0x39")] = 2
			} else {
				this[ax("0x39")] = 1
			}
			c0[ax("0x3a")](function(hY) {
				var hX = ax("0x28");
				while(hX !== T[ax("0x3b")]) {
					switch(hX) {
						case ax("0x3c"):
							hR = window.location.protocol + "//api.map.baidu.com/res/webgl/10/worker_asm_maed2p.js";
							hX = T[ax("0x3d")];
							break;
						case ax("0x24"):
							for(var hW = 0; hW < e; hW++) {
								var hV = ax("0x3e");
								while(hV !== ax("0x26")) {
									switch(hV) {
										case ax("0x3e"):
											var hU = T[ax("0x3f")](eM, hR);
											hV = ax("0x40");
											break;
										case ax("0x40"):
											hU["\x6f\x6e\x6d\x65\x73\x73\x61\x67\x65"] = function hZ(h2) {
												var h1 = "\x64\x61\x65";
												while(T[ax("0x41")](h1, "\x61\x61\x61\x69")) {
													switch(h1) {
														case ax("0x42"):
															var h0 = i["\x61\x72\x72\x50\x65\x6e\x64\x69\x6e\x67\x44\x61\x74\x61"][ax("0x43")]();
															h1 = T[ax("0x44")];
															break;
														case T["\x69\x65\x63\x6d\x68"]:
															hQ["\x66\x69\x72\x65"](h3);
															h1 = T[ax("0x45")];
															break;
														case ax("0x22"):
															h3[ax("0x46")] = T[ax("0x47")];
															h1 = ax("0x19");
															break;
														case ax("0x48"):
															this[ax("0x49")] && this[ax("0x49")](h2[ax("0x4a")], this["\x5f\x70\x61\x72\x73\x69\x6e\x67\x54\x69\x6c\x65\x4b\x65\x79"]);
															h1 = T[ax("0x4b")];
															break;
														case T[ax("0x4c")]:
															i[ax("0x4d")](h0[ax("0x4e")], h0[ax("0x4f")], h0[ax("0x50")], h4);
															h1 = ax("0x21");
															break;
														case T[ax("0x51")]:
															this["\x5f\x63\x62\x6b"] = null;
															h1 = T[ax("0x52")];
															break;
														case T[ax("0x53")]:
															if(i[ax("0x54")][ax("0x55")] > 0) {
																h1 = ax("0x42");
																break
															}
															h1 = ax("0x21");
															break;
														case ax("0x2a"):
															h1 = h2["\x64\x61\x74\x61"] ? T[ax("0x56")] : T[ax("0x57")];
															break;
														case T[ax("0x4b")]:
															this[ax("0x58")] = ![];
															h1 = ax("0x1c");
															break;
														case T[ax("0x44")]:
															var h4 = h0[ax("0x59")];
															h1 = "\x61\x61\x64";
															break;
														case ax("0x1d"):
															this["\x5f\x70\x61\x72\x73\x69\x6e\x67\x54\x69\x6c\x65\x49\x6e\x66\x6f"] = null;
															h1 = T[ax("0x5a")];
															break;
														case T["\x65\x61\x6d\x6d\x63"]:
															var h3 = new bb("\x6f\x6e\x72\x65\x66\x72\x65\x73\x68");
															h1 = T[ax("0x5b")];
															break;
														case T["\x63\x78\x6d\x6c\x6d"]:
															this[ax("0x49")] && this[ax("0x49")](null, this[ax("0x5c")]);
															h1 = ax("0x5d");
															break;
														case ax("0x20"):
															this[ax("0x5c")] = null;
															h1 = T[ax("0x53")];
															break
													}
												}
											};
											hV = T[ax("0x5e")];
											break;
										case ax("0x25"):
											i[ax("0x36")]["\x70\x75\x73\x68"](hU);
											hV = T[ax("0x5f")];
											break
									}
								}
							}
							hX = T[ax("0x60")];
							break;
						case T[ax("0x61")]:
							var hR;
							hX = T[ax("0x62")];
							break;
						case T["\x65\x65\x68\x6d\x63"]:
							for(var hT = 0; T[ax("0x63")](hT, Math[ax("0x64")](i["\x61\x72\x72\x50\x65\x6e\x64\x69\x6e\x67\x44\x61\x74\x61"]["\x6c\x65\x6e\x67\x74\x68"], e)); hT++) {
								var hS = i["\x61\x72\x72\x50\x65\x6e\x64\x69\x6e\x67\x44\x61\x74\x61"][ax("0x43")]();
								i[ax("0x4d")](hS["\x75\x72\x6c"], hS[ax("0x4f")], hS[ax("0x50")], hS["\x63\x62\x6b"])
							}
							hX = T[ax("0x3b")];
							break;
						case ax("0x29"):
							hX = hY ? T[ax("0x65")] : "\x69\x64\x65";
							break;
						case T[ax("0x65")]:
							hR = T["\x69\x6c\x68\x61\x64"];
							hX = ax("0x24");
							break;
						case "\x61\x63\x63":
							if(i[ax("0x54")]["\x6c\x65\x6e\x67\x74\x68"] > 0) {
								hX = ax("0x2a");
								break
							}
							hX = ax("0x23");
							break
					}
				}
			});
			hQ["\x6f\x6e"](ax("0x66"), function() {
				var hR = T["\x63\x6c\x64\x61\x61"];
				while(T[ax("0x67")](hR, ax("0x68"))) {
					switch(hR) {
						case T[ax("0x69")]:
							if(typeof this[ax("0x6a")][ax("0x6b")] !== ax("0x6c")) {
								hR = T[ax("0x6d")];
								break
							}
							hR = "\x61\x78\x65\x61";
							break;
						case ax("0x2c"):
							for(var hT = 0, hS = i[ax("0x36")][ax("0x55")]; T[ax("0x6e")](hT, hS); hT++) {
								i[ax("0x36")][hT][ax("0x6f")] = ![]
							}
							hR = T[ax("0x69")];
							break;
						case ax("0x70"):
							f8[ax("0x71")] = [];
							hR = ax("0x68");
							break;
						case "\x61\x65\x6c":
							f8["\x73\x74\x72\x69\x6e\x67\x69\x66\x69\x65\x64\x43\x75\x73\x74\x6f\x6d\x53\x74\x79\x6c\x65\x49\x6e\x66\x6f"] = null;
							hR = ax("0x70");
							break
					}
				}
			});
			hQ["\x6f\x6e"](T[ax("0x72")], function() {
				var hT = T[ax("0x73")];
				while(T["\x64\x65\x69\x63\x6d"](hT, ax("0x74"))) {
					switch(hT) {
						case T[ax("0x75")]:
							if(T[ax("0x76")](typeof this[ax("0x6a")][ax("0x6b")], ax("0x6c"))) {
								hT = "\x61\x64\x65";
								break
							}
							hT = ax("0x74");
							break;
						case T["\x65\x65\x6d\x64\x65"]:
							f8[ax("0x77")] = null;
							hT = ax("0x31");
							break;
						case T["\x6d\x65\x65\x63\x68"]:
							f8["\x73\x74\x72\x69\x6e\x67\x69\x66\x69\x65\x64\x43\x75\x73\x74\x6f\x6d\x53\x74\x79\x6c\x65\x49\x6e\x66\x6f\x5a\x6f\x6f\x6d"] = [];
							hT = ax("0x74");
							break;
						case ax("0x78"):
							for(var hS = 0, hR = i["\x61\x72\x72\x57\x6f\x72\x6b\x65\x72"][ax("0x55")]; hS < hR; hS++) {
								i[ax("0x36")][hS][ax("0x6f")] = ![]
							}
							hT = T[ax("0x75")];
							break
					}
				}
			});
			hQ["\x6f\x6e"](ax("0x79"), function() {
				for(var hR = 0; T[ax("0x6e")](hR, i[ax("0x36")][ax("0x55")]); hR++) {
					if(i[ax("0x36")][hR]) {
						i[ax("0x36")][hR][ax("0x7a")]()
					}
				}
				i[ax("0x36")][ax("0x55")] = 0
			})
		},
		"\x67\x65\x74\x49\x64\x6c\x65\x57\x6f\x72\x6b\x65\x72": function() {
			for(var e = 0, T = this[ax("0x36")][ax("0x55")]; e < T; e++) {
				var i = this[ax("0x36")][e];
				if(!i[ax("0x58")]) {
					i[ax("0x58")] = !![];
					return i
				}
			}
			return null
		},
		"\x72\x65\x6c\x65\x61\x73\x65\x50\x65\x6e\x64\x69\x6e\x67\x44\x61\x74\x61": function(hQ) {
			var i = {
				"\x6d\x65\x61\x6d\x61": function(hW, hV) {
					return hW !== hV
				},
				"\x6d\x61\x6d\x64\x6c": function(hW, hV) {
					return hW + hV
				},
				"\x63\x6c\x61\x65\x61": ax("0x7b")
			};
			var e = [];
			var hU = this[ax("0x54")];
			for(var hT = hU[ax("0x55")] - 1; hT >= 0; hT--) {
				var hS = hU[hT];
				var hR = hS[ax("0x4f")];
				if(i[ax("0x7c")](hQ[ax("0x7d")], hR[ax("0x7d")])) {
					continue
				}
				var T = i["\x6d\x61\x6d\x64\x6c"](i[ax("0x7e")](i[ax("0x7f")], hR["\x63\x6f\x6c"]), "\x5f") + hR[ax("0x80")] + "\x5f" + hR[ax("0x81")];
				if(!hQ[T]) {
					hU["\x73\x70\x6c\x69\x63\x65"](hT, 1);
					e[ax("0x82")](hR)
				}
			}
			return e
		},
		"\x6c\x6f\x61\x64\x54\x69\x6c\x65\x44\x61\x74\x61": function(hY, hX, hV, hT) {
			var hR = {
				"\x65\x6d\x61\x6c\x6d": ax("0x83"),
				"\x61\x63\x63\x63\x63": function(hZ, h0) {
					return hZ !== h0
				},
				"\x68\x61\x61\x65\x69": ax("0x84"),
				"\x69\x63\x6d\x78\x65": ax("0x85"),
				"\x63\x65\x69\x65\x69": ax("0x86"),
				"\x61\x65\x65\x64\x78": ax("0x87"),
				"\x68\x65\x78\x63\x61": ax("0x88"),
				"\x6c\x65\x68\x61\x61": ax("0x89"),
				"\x65\x61\x6d\x6c\x61": "\x68\x68\x65",
				"\x63\x65\x61\x6c\x64": ax("0x8a"),
				"\x6c\x6d\x61\x64\x63": ax("0x2b"),
				"\x63\x69\x64\x69\x78": ax("0x8b"),
				"\x6d\x61\x61\x6d\x64": function(h0, hZ) {
					return h0 === hZ
				},
				"\x63\x6d\x69\x64\x63": ax("0x8c"),
				"\x6c\x6d\x63\x65\x69": ax("0x8d"),
				"\x68\x61\x61\x6c\x65": ax("0x8e"),
				"\x63\x68\x61\x63\x6c": ax("0x8f"),
				"\x68\x61\x6c\x65\x64": ax("0x90"),
				"\x61\x63\x6d\x78\x68": "\x61\x61\x63",
				"\x63\x6c\x65\x6d\x64": ax("0x91"),
				"\x65\x68\x69\x61\x69": function(h0, hZ) {
					return h0 + hZ
				},
				"\x61\x65\x6c\x61\x61": ax("0x92"),
				"\x61\x61\x61\x65\x6c": ax("0x93"),
				"\x78\x69\x65\x65\x61": ax("0x94"),
				"\x63\x61\x61\x78\x78": ax("0x95"),
				"\x6d\x64\x65\x61\x78": ax("0x96"),
				"\x64\x65\x68\x6c\x63": "\x69\x61\x63",
				"\x68\x6c\x69\x78\x61": ax("0x1d"),
				"\x6c\x65\x65\x78\x63": ax("0x97"),
				"\x65\x63\x78\x78\x63": ax("0x98"),
				"\x6c\x78\x63\x61\x64": ax("0x99"),
				"\x68\x65\x63\x61\x61": function(hZ, h0) {
					return hZ + h0
				},
				"\x61\x65\x61\x61\x6c": ax("0x9a")
			};
			var hW = this[ax("0x9b")]();
			if(hW) {
				var hU = hR[ax("0x9c")];
				while(hR["\x61\x63\x63\x63\x63"](hU, ax("0x9d"))) {
					switch(hU) {
						case hR[ax("0x9e")]:
							hS["\x66\x65\x61\x74\x75\x72\x65\x53\x74\x79\x6c\x65"] = f8[hR[ax("0x9f")] + T];
							hU = hR[ax("0xa0")];
							break;
						case ax("0xa1"):
							hW[ax("0x5c")] = hV;
							hU = hR[ax("0xa2")];
							break;
						case ax("0xa3"):
							hS["\x69\x6e\x64\x6f\x6f\x72\x53\x74\x79\x6c\x65"] = f8[ax("0xa4")];
							hU = hR[ax("0xa5")];
							break;
						case hR[ax("0xa6")]:
							hS[ax("0xa7")] = f8["\x73\x74\x72\x69\x6e\x67\x69\x66\x69\x65\x64\x43\x75\x73\x74\x6f\x6d\x53\x74\x79\x6c\x65\x49\x6e\x66\x6f"];
							hU = hR[ax("0xa8")];
							break;
						case ax("0x87"):
							var hS = {
								"\x61\x63\x74\x69\x6f\x6e": ax("0x4d"),
								"\x75\x72\x6c": hY,
								"\x74\x69\x6c\x65\x49\x6e\x66\x6f": hX,
								"\x74\x69\x6c\x65\x4b\x65\x79": hV
							};
							hU = hR[ax("0xa9")];
							break;
						case hR[ax("0xaa")]:
							hW[ax("0xab")](hS);
							hU = "\x69\x65\x61\x65";
							break;
						case hR[ax("0xa0")]:
							hS[ax("0x9a")] = f8[hR[ax("0xac")] + i];
							hU = ax("0xa3");
							break;
						case ax("0x90"):
							var hQ = !!hR[ax("0xad")](T[ax("0xae")]("\x63\x75\x73\x74\x6f\x6d"), 0);
							hU = hR[ax("0xaf")];
							break;
						case hR[ax("0xb0")]:
							if(!f8["\x73\x74\x72\x69\x6e\x67\x69\x66\x69\x65\x64\x49\x6e\x64\x6f\x6f\x72\x53\x74\x79\x6c\x65"]) {
								hU = hR[ax("0xb1")];
								break
							}
							hU = hR[ax("0xb2")];
							break;
						case hR[ax("0xa9")]:
							var T = this["\x6d\x61\x70"][ax("0xb3")]();
							hU = hR["\x68\x61\x6c\x65\x64"];
							break;
						case hR[ax("0xb4")]:
							f8[ax("0x85") + T] = JSON[ax("0xb5")](bo[hR[ax("0xb6")] + T]);
							hU = ax("0x1d");
							break;
						case ax("0x1d"):
							if(!f8[hR[ax("0xb7")](hR[ax("0xac")], i)]) {
								hU = hR[ax("0xb8")];
								break
							}
							hU = ax("0x8d");
							break;
						case hR[ax("0x9c")]:
							hW[ax("0x49")] = hT;
							hU = hR[ax("0xb9")];
							break;
						case hR[ax("0xba")]:
							if(hQ) {
								hU = hR[ax("0xbb")];
								break
							}
							hU = hR[ax("0xbc")];
							break;
						case "\x78\x61\x61":
							if(hQ && f8[ax("0x77")]) {
								hU = hR[ax("0xa6")];
								break
							}
							hU = ax("0xbd");
							break;
						case ax("0xbe"):
							if(f8[hR[ax("0xb7")](ax("0x85"), T)]) {
								hU = ax("0x84");
								break
							}
							hU = hR[ax("0xa0")];
							break;
						case hR[ax("0xbf")]:
							if(!f8[ax("0x85") + T] && bo[hR["\x65\x68\x69\x61\x69"](hR[ax("0xb6")], T)]) {
								hU = ax("0xc0");
								break
							}
							hU = hR[ax("0xc1")];
							break;
						case hR[ax("0xbb")]:
							i = ax("0xc2");
							hU = ax("0x96");
							break;
						case hR[ax("0xc3")]:
							hW[ax("0x6f")] = !![];
							hU = hR["\x6c\x6d\x61\x64\x63"];
							break;
						case hR["\x6d\x64\x65\x61\x78"]:
							if(!hW["\x69\x73\x53\x65\x6e\x64\x46\x53"]) {
								hU = hR[ax("0xbf")];
								break
							}
							hU = hR[ax("0xaa")];
							break;
						case ax("0x8e"):
							f8[ax("0xa4")] = JSON[ax("0xb5")](bo["\x69\x6e\x64\x6f\x6f\x72\x53\x74\x79\x6c\x65"]);
							hU = ax("0x8f");
							break;
						case ax("0x8c"):
							var i = T;
							hU = ax("0x94");
							break;
						case hR[ax("0xc4")]:
							hS[ax("0xc5")] = T;
							hU = hR[ax("0xc3")];
							break;
						case ax("0x8f"):
							if(hQ && bo[ax("0xc6")]) {
								hU = hR[ax("0xc7")];
								break
							}
							hU = ax("0xbe");
							break;
						case ax("0x92"):
							f8[hR[ax("0xb7")](ax("0x8b"), i)] = JSON[ax("0xb5")](bo[hR[ax("0xc8")](hR[ax("0xc9")], i)]);
							hU = hR[ax("0xb0")];
							break;
						case hR[ax("0xa8")]:
							hS[ax("0xca")] = {
								"\x77\x6f\x72\x64\x53\x70\x61\x63\x65\x52\x61\x74\x69\x6f": this[ax("0x38")],
								"\x74\x65\x78\x74\x53\x69\x7a\x65\x52\x61\x74\x69\x6f": this[ax("0x39")]
							};
							hU = ax("0x98");
							break;
						case hR[ax("0xb9")]:
							hW[ax("0xcb")] = hX;
							hU = "\x61\x6c\x6c";
							break;
						case ax("0x99"):
							if(!f8["\x73\x74\x72\x69\x6e\x67\x69\x66\x69\x65\x64\x43\x75\x73\x74\x6f\x6d\x53\x74\x79\x6c\x65\x49\x6e\x66\x6f"]) {
								hU = ax("0xcc");
								break
							}
							hU = ax("0xbe");
							break;
						case ax("0xcc"):
							f8[ax("0x77")] = JSON[ax("0xb5")](bo["\x63\x75\x73\x74\x6f\x6d\x53\x74\x79\x6c\x65\x49\x6e\x66\x6f"]);
							hU = "\x6c\x65\x63";
							break
					}
				}
			} else {
				var e = {
					"\x75\x72\x6c": hY,
					"\x74\x69\x6c\x65\x49\x6e\x66\x6f": hX,
					"\x74\x69\x6c\x65\x4b\x65\x79": hV,
					"\x63\x62\x6b": hT
				};
				this[ax("0x54")][ax("0x82")](e)
			}
		}
	};
	C["\x65\x78\x74\x65\x6e\x64"](f8[ax("0xcd")], bf);

	function dT(i) {
		this.tileLayers = [];
		this.map = i;
		var e = this.config = b6[this.map.mapType];
		this.errorUrl = e.errorUrl;
		this.tileSize = e.tileSize;
		this.baseUnits = e.baseUnits;
		this.baseZoomLevel = e.zoomLevelBase;
		this.tileURLs = e.tileUrls;
		this.tilesInfoCache = {};
		this.loadDelay = 10;
		this._labelTextCanvas = null
	}
	bo.register(function(i) {
		if(i._renderType !== "webgl") {
			return
		}
		var e = i.tileMgr = new dT(i);
		i.addEventListener("addtilelayer", function(hQ) {
			e.addWebGLLayer(hQ.target)
		});
		i.addEventListener("removetilelayer", function(hQ) {
			e.removeWebGLLayer(hQ.target)
		});
		i.on("update", function T(hQ) {
			if(!bo["FeatureStyle" + this.config.style] && !bo.customStyleLoaded) {
				return
			}
			e.loadLayersData({
				zoomChanged: hQ.changedStatus.onzoom_changed ? true : false
			})
		});
		i.on("style_changed", function() {
			e.loadLayersData()
		})
	});
	C.extend(dT.prototype, {
		addWebGLLayer: function(hQ) {
			this.tileLayers.push(hQ);
			hQ.initDrawData();
			if(this.tileLayers.length > 1) {
				for(var T = 1; T < this.tileLayers.length; T++) {
					if(this.tileLayers[T].isFlat) {
						this.map.setDisplayOptions({
							isFlat: true
						});
						break
					}
				}
			}
			var e = this.map.config.style;
			if(bo["FeatureStyle" + e]) {
				this.loadLayersData()
			} else {
				var hR = this;
				this.map.loadMapStyleFiles(function() {
					hR.loadLayersData()
				})
			}
		},
		removeWebGLLayer: function(hS) {
			var hT = false;
			for(var hR = 0, hQ = this.tileLayers.length; hR < hQ; hR++) {
				if(hS === this.tileLayers[hR]) {
					hT = true;
					this.tileLayers.splice(hR, 1);
					break
				}
			}
			if(hT === false) {
				return
			}
			hS.destroyDrawData();
			if(bo["FeatureStyle" + this.map.config.style]) {
				this.loadLayersData()
			}
			if(this.tileLayers.length === 1) {
				this.map.setDisplayOptions({
					isFlat: false
				})
			} else {
				var e = false;
				for(var hR = 1; hR < this.tileLayers.length; hR++) {
					if(this.tileLayers[hR].isFlat) {
						e = true;
						break
					}
				}
				this.map.setDisplayOptions({
					isFlat: e
				})
			}
			var T = new bb("onrefresh");
			T.source = "removewebgllayer";
			this.map.fire(T)
		},
		getLabelTextCanvas: function() {
			if(!this._labelTextCanvas) {
				this._labelTextCanvas = new v(this.map)
			}
			return this._labelTextCanvas
		},
		loadLayersData: function(i) {
			if(this.map.suspendLoad) {
				return
			}
			var hQ = this;
			i = i || {};
			var T = !!i.zoomChanged;
			var e = (T === true || this.map.getTilt() > 50);
			if(!e) {
				if(!this.syncLoadTimer) {
					this.syncLoadTimer = setTimeout(function() {
						hQ._loadLayersFromCache(T);
						hQ.syncLoadTimer = null
					}, 40)
				}
			} else {
				this._loadLayersFromCache(T)
			}
			if(!hQ.map.viewAnimationTime) {
				this.timer && window.clearTimeout(this.timer)
			}
			this.timer = window.setTimeout(function() {
				if(hQ.map.viewAnimationTime) {
					if(new Date().getTime() - hQ.map.viewAnimationTime < 1000) {
						return
					}
					hQ.map.viewAnimationTime = new Date().getTime()
				}
				var hS = hQ.tileLayers.length;
				hQ.tilesInfoCache = {};
				for(var hT = 0; hT < hS; hT++) {
					var hV = hQ.tileLayers[hT];
					var hU = hV.tileType;
					var hR = null;
					if(hQ.tilesInfoCache[hU.getName()]) {
						hR = hQ.tilesInfoCache[hU.getName()]
					} else {
						hR = hQ.calcTilesInfo(hU);
						hQ.tilesInfoCache[hU.getName()] = hR
					}
					hV.loadLayerData(hR, false, T)
				}
				hQ.timer = null
			}, this.loadDelay);
			if((f4() || C.Browser.ie) && T) {
				this.loadDelay = 200
			} else {
				this.loadDelay = 80
			}
		},
		_loadLayersFromCache: function(hR) {
			this.map._featureMgr.clearData();
			var hU = this.tileLayers;
			hU.sort(function(hV, i) {
				return hV.zIndex - i.zIndex > 0
			});
			var T = hU.length;
			this.tilesInfoCache = {};
			for(var hQ = 0; hQ < T; hQ++) {
				var hT = hU[hQ];
				var hS = hT.tileType;
				var e = null;
				if(this.tilesInfoCache[hS.getName()]) {
					e = this.tilesInfoCache[hS.getName()]
				} else {
					e = this.calcTilesInfo(hS);
					this.tilesInfoCache[hS.getName()] = e
				}
				hT.loadLayerData(e, true, hR)
			}
		},
		calcTilesInfo: function(h2) {
			var ig = this.map;
			var im = ig.getMapType();
			var ih = b6[im];
			var h9 = ig.getZoom();
			var e = Math.floor(h9);
			var hT = h2.getDataZoom(h9);
			var iy = h2.getName();
			hT = fF(hT, ih.minDataZoom, ih.maxDataZoom);
			var iq = e;
			if(h2._name === "web") {
				iq = hT
			} else {
				if(iq < 3) {
					iq = 3
				}
			}
			var ie = h2.getTileSize(h9);
			var hS = h2.getBaseTileSize(h9);
			var h6 = h2.getMercatorSize(h9, hT);
			var h5;
			var io;
			var ic;
			var it;
			var ii = ig.getCenterIn();
			if(im !== BMAP_SATELLITE_MAP) {
				ii = d4.calcLoopCenterPoint(ii)
			}
			var ia = Math.floor(ii.lng / h6);
			var hV = Math.floor(ii.lat / h6);
			var ib = ig.getBoundsIn();
			var ik = 0;
			var hQ = 0;
			ib = d4.calcLoopMapBounds(ib, ig.getCenter());
			if(ib.ne.lng > d4._mc180X) {
				var h0 = d4.getSpaceDistanceInPixel(hT);
				ik = Math.ceil(h0 / hS)
			}
			if(ib.sw.lng < d4._mcM180X) {
				var h0 = d4.getSpaceDistanceInPixel(hT);
				hQ = Math.ceil(h0 / hS)
			}
			if(ib.ne.lat > 19505879.362428114 || ib.sw.lat < -15949096.637571886) {
				ib.ne.lat = 19505879.362428114;
				ib.sw.lat = -15949096.637571886
			}
			var hX = [Math.floor(ib.sw.lng / h6) - hQ, Math.floor(ib.sw.lat / h6)];
			var iw = [Math.floor(ib.ne.lng / h6) + ik, Math.floor(ib.ne.lat / h6)];
			h5 = hX[0];
			io = iw[0] + 1;
			ic = hX[1];
			it = iw[1] + 1;
			var h1 = [];
			for(var hY = h5; hY < io; hY++) {
				if(d4.isTileBlank(hY, hT, hS) === true) {
					continue
				}
				for(var h3 = ic; h3 < it; h3++) {
					var hZ = {
						col: hY,
						row: h3,
						zoom: hT,
						useZoom: iq,
						tileTypeName: iy,
						loopOffsetX: 0,
						tileSize: ie,
						baseTileSize: hS,
						mercatorSize: h6
					};
					h1.push(hZ);
					var il = "id_" + hY + "_" + h3 + "_" + hT;
					h1[il] = true
				}
			}
			if(im !== BMAP_SATELLITE_MAP) {
				h1 = d4.calcLoopTiles(h1, hT, hS, h6)
			}
			if(hT === 3) {
				for(var iv = 0, iu = h1.length; iv < iu; iv++) {
					var hY = h1[iv].col;
					var h3 = h1[iv].row;
					var ip = d4.calcLoopParam(hY, hT);
					var hU = ip.T;
					var h7 = hY >= 0 ? hY - hU : hY + hU;
					var h8 = "id_" + h7 + "_" + h3 + "_" + hT;
					if(!h1[h8]) {
						var hZ = {
							col: h7,
							row: h3,
							zoom: hT,
							useZoom: iq,
							loopOffsetX: 0,
							tileSize: ie,
							baseTileSize: hS,
							mercatorSize: h6
						};
						h1.push(hZ);
						h1[h8] = true
					}
				}
			}
			if(this.map._tilt > 0) {
				for(var iv = 0; iv < h1.length; iv++) {
					var hW = h1[iv];
					var ir = hW.col;
					var ix = hW.row;
					var ij = [];
					ij.minX = ir * h6;
					ij.maxX = (ir + 1) * h6;
					ij.minY = ix * h6;
					ij.maxY = (ix + 1) * h6;
					var hR = new hr(0, 0);
					hR.lng = (ij.minX + ij.maxX) / 2;
					hR.lat = (ij.minY + ij.maxY) / 2;
					var h4 = ig.pointToPixelIn(hR);
					if(h4.x > 0 && h4.x < this.map.width && h4.y > 0 && h4.y < this.map.height) {
						continue
					}
					if(ij.minX < ii.lng && ij.maxX > ii.lng && ij.minY < ii.lat && ij.maxY > ii.lat) {
						continue
					}
					if(!this.ifTileInMapBounds(ij, ib, ir, ix)) {
						h1.splice(iv, 1);
						iv--
					}
				}
			}
			h1.sort((function(i) {
				return function(T, id) {
					return((0.4 * Math.abs(T.col - i[0]) + 0.6 * Math.abs(T.row - i[1])) - (0.4 * Math.abs(id.col - i[0]) + 0.6 * Math.abs(id.row - i[1])))
				}
			})([ia, hV]));
			h1.zoom = hT;
			h1.tileTypeName = iy;
			return h1
		},
		getCurrentViewTilesInfo: function(i) {
			var e = this.tilesInfoCache[i.getName()];
			if(!e) {
				return this.calcTilesInfo(i)
			}
			return e
		},
		ifTileInMapBounds: function(e, hS, T, hR) {
			var i = hS.normalizedBottomLeft;
			var h3 = hS.normalizedTopRight;
			var hV = hS.normalizedTopLeft;
			var hT = hS.normalizedBottomRight;
			var hQ = false;
			var h2 = new hr(e.minX, e.minY);
			var hZ = new hr(e.maxX, e.maxY);
			var hU = new hr(hZ.lng, h2.lat);
			var h0 = new hr(h2.lng, hZ.lat);
			var hX = [h0, hZ, hU, h2];
			for(var h1 = 0, hW = hX.length; h1 < hW; h1++) {
				var hY = h1 + 1;
				if(hY === hW) {
					hY = 0
				}
				var h4 = h1;
				var h5 = gw(hX[hY], hX[h4], hV, i);
				if(h5) {
					hQ = true;
					break
				}
				h5 = gw(hX[hY], hX[h4], hT, h3);
				if(h5) {
					hQ = true;
					break
				}
				h5 = gw(hX[hY], hX[h4], h3, hV);
				if(h5) {
					hQ = true;
					break
				}
				h5 = gw(hX[hY], hX[h4], i, hT);
				if(h5) {
					hQ = true;
					break
				}
			}
			return hQ
		},
		getTileLayer: function(hR) {
			for(var hQ = 0, e = this.tileLayers.length; hQ < e; hQ++) {
				var T = this.tileLayers[hQ];
				if(T.mapType === hR) {
					return T
				}
			}
			return null
		}
	});

	function aS(e) {
		this._map = e;
		this._spotsId = null;
		this._init()
	}
	aS.prototype._init = function() {
		var e = this._map;
		e.addEventListener("onspotsdataready", function(T) {
			var i = T.spots;
			if(this._spotsId) {
				e.removeSpots(this._spotsId)
			}
			this._spotsId = e.addSpots(i)
		})
	};
	bo.register(function(e) {
		if(!e.config.enableIconClick) {
			return
		}
		e._mapIcon = new aS(e)
	});

	function aV(e) {
		this._indoorData = {};
		this._map = e;
		this.currentUid = null;
		this.currentFloor = null;
		this._indoorControl = null;
		this.enterMethod = null;
		this.showMask = false;
		this._isMobile = f4();
		this._autoEnterZoom = 19;
		if(this._isMobile) {
			this._autoEnterZoom = 17
		}
		this._init(e);
		window._indoorMgr = this
	}
	aV.prototype._init = function(i) {
		var e = this;
		i.on("indoor_status_changed", function(hT) {
			var T = hT.uid;
			var hR = hT.floor;
			if(T === null) {
				T = e.currentUid;
				if(e._indoorData[T]) {
					hR = e._indoorData[T].defaultFloor
				}
				if(e._indoorControl) {
					e._indoorControl.hide()
				}
				e.currentUid = null;
				e.currentFloor = null;
				e.enterMethod = null
			} else {
				if(e._indoorData[T]) {
					var hS = e._indoorData[T];
					hR = (typeof hR === "number") ? hR : hS.defaultFloor;
					if(!e._indoorControl) {
						if(i.config.showControls && i._displayOptions.indoor) {
							e._indoorControl = new gA(i, hS)
						}
					} else {
						e._indoorControl.setInfo(hS);
						e._indoorControl.show()
					}
					e.currentUid = T;
					e.currentFloor = hR
				}
			}
			if(!e._indoorData || !e._indoorData[T] || e._indoorData[T].currentFloor === hR) {
				this.fire(new bb("onrefresh"));
				return
			}
			var hQ = new bb("onindoor_data_refresh");
			hQ.uid = T;
			hQ.floor = hR;
			hQ.tileKey = e._indoorData[T].tileKey;
			e._indoorData[T].currentFloor = hR;
			e.currentFloor = hR;
			this.fire(hQ)
		});
		i.on("spotclick", function(hQ) {
			var T = null;
			if(hQ.curAreaSpot && this.areaSpots[hQ.curAreaSpot]) {
				T = this.areaSpots[hQ.curAreaSpot].userData.uid
			}
			if(T === e.currentUid) {
				if(hQ.curAreaSpot) {
					e.enterMethod = "byClick"
				}
				return
			}
			if(T === null) {
				if(e.currentUid && e.enterMethod === "byClick") {
					i.showIndoor(null);
					e.enterMethod = null
				}
			} else {
				e.enterMethod = "byClick";
				if(e.currentUid) {
					i.showIndoor(e.currentUid, e._indoorData[e.currentUid].defaultFloor)
				}
				i.showIndoor(T, e._indoorData[T].defaultFloor)
			}
		});
		i.on("moveend", function() {
			if(this.getZoom() >= e._autoEnterZoom) {
				e._checkIndoorByMove()
			}
		});
		i.on("zoomend", function() {
			if(this.getZoom() >= e._autoEnterZoom) {
				e._checkIndoorByMove()
			} else {
				if(e.enterMethod !== "byClick" && e.currentUid !== null) {
					this.showIndoor(null)
				}
			}
		})
	};
	aV.prototype._checkIndoorByMove = function() {
		var T = this._map;
		var hW = T.getSize();
		var h1 = {
			x: hW.width / 2,
			y: hW.height / 2
		};
		var h0 = Math.max(hW.width, hW.height);
		var h2 = [];
		for(var hX in this._indoorData) {
			var e = this._indoorData[hX].center;
			var hQ = T.pointToPixelIn(new bo.Point(e[0], e[1]));
			var hT = gV(h1, hQ);
			h2.push({
				uid: hX,
				distance: hT
			})
		}
		if(h2.length === 0) {
			return
		}
		h2.sort(function(h3, i) {
			return h3.distance - i.distance
		});
		var hS = h2[0];
		var hY = T.getCenterIn();
		var hR = false;
		for(var hV = 0; hV < this._indoorData[hS.uid].contour.length; hV++) {
			if(dg([hY.lng, hY.lat], this._indoorData[hS.uid].contour[hV])) {
				hR = true;
				break
			}
		}
		if(hR === false && hS.uid === "e96b44200baa3b4082288acc") {
			var hU = this._indoorData[hS.uid].boundsMin;
			var hZ = this._indoorData[hS.uid].boundsMax;
			if(hY.lng > hU[0] && hY.lat > hU[1] && hY.lng < hZ[0] && hY.lat < hZ[1]) {
				hR = true
			}
		}
		if(hR) {
			if(this.enterMethod !== "byClick") {
				if(this.currentUid !== null && this.currentUid !== hS.uid) {
					this._map.showIndoor(this.currentUid, this._indoorData[this.currentUid].defaultFloor)
				}
				if(this.currentUid !== hS.uid) {
					this._map.showIndoor(hS.uid, this._indoorData[hS.uid].defaultFloor)
				}
				this.enterMethod = "byMove"
			}
		} else {
			if(this.enterMethod !== "byClick") {
				this._map.showIndoor(null)
			}
		}
	};
	aV.prototype.setData = function(hQ) {
		if(hQ === null) {
			return
		}
		for(var T in hQ) {
			if(T === "tileInfo") {
				continue
			}
			var hR = hQ[T].tileKey;
			if(this._indoorData[T]) {
				if(!this._indoorData[T][hR]) {
					this._indoorData[T].tileKeys.push(hR);
					this._indoorData[T][hR] = true
				}
			} else {
				this._indoorData[T] = hQ[T];
				this._indoorData[T].tileKeys = [hQ[T].tileKey];
				this._indoorData[T][hR] = true;
				for(var e = 0; e < this._indoorData[T].contour.length; e++) {
					this._map.addAreaSpot(this._indoorData[T].contour[e], {
						id: T + e,
						userData: {
							uid: T
						}
					})
				}
			}
		}
		if(this._map.getZoom() >= this._autoEnterZoom) {
			this._checkIndoorByMove()
		}
	};
	aV.prototype.removeData = function(T, hR) {
		if(!this._indoorData[T]) {
			return
		}
		var hQ = this._indoorData[T];
		for(var e = 0; e < hQ.tileKeys.length; e++) {
			if(hQ.tileKeys[e] === hR) {
				hQ.tileKeys.splice(e, 1);
				break
			}
		}
		delete hQ[hR];
		if(hQ.tileKeys.length === 0) {
			delete this._indoorData[T]
		}
	};
	aV.prototype.getIndoorData = function(e) {
		return this._indoorData[e] || null
	};
	aV.prototype.getData = function() {
		return this._indoorData
	};
	bo.register(function(e) {
		e._indoorMgr = new aV(e)
	});
	var el = (function() {
		var hQ = {};
		var hZ = {};
		var hV = {};

		function hX(h1) {
			if(Object.prototype.toString.call(h1) === "[object Object]") {
				for(var h0 in h1) {
					return false
				}
				return true
			} else {
				return false
			}
		}

		function hW(h7, h8, ib, h4, ia) {
			var h0 = h0 || null;
			h4 = h4 || h0;
			var h2;
			if(h4) {
				h2 = hY(h7, h8, ib, h4)
			} else {
				h2 = T(h7, h8, ib, ia)
			}
			var h6 = h2.drawId;
			var h1 = h2.style;
			var h9 = h2.styleUpdate;
			var ic = [];
			if(!h6) {
				return ic
			}
			for(var h3 = 0; h3 < h6.length; h3++) {
				var h5 = h9[h6[h3]] || h1[h6[h3]];
				if(h5) {
					switch(h8) {
						case "polygon":
							h5 = hR(h5, h7);
							break;
						case "line":
							h5 = hU(h5, h7);
							break;
						case "pointText":
							h5 = hS(h5, h7);
							break;
						case "point":
							h5 = e(h5, h7);
							break;
						case "polygon3d":
							h5 = hT(h5, h7);
							break
					}
					if(h5) {
						h5.did = h6[h3];
						ic[ic.length] = h5
					}
				}
			}
			return ic
		}

		function hY(h1, h3, h4, h0) {
			var h2 = h0[2];
			switch(h3) {
				case "point":
					h2 = h2[0];
					break;
				case "pointText":
					h2 = h2[1];
					break;
				case "line":
					h2 = h2[3];
					break;
				case "polygon":
					h2 = h2[4];
					break;
				case "polygon3d":
					h2 = h2[5];
					break
			}
			var h6 = h4 - 1;
			if(h3 === "line" && h4 === 12) {
				h6 = h4
			}
			var h7 = h0[1][h6][0];
			var h5 = h7[h1];
			if(!h5) {
				if(h3 === "point" || h3 === "pointText") {
					h7 = h0[1][h4][0];
					h5 = h7[h1]
				}
			}
			return {
				drawId: h5,
				style: h2,
				styleUpdate: []
			}
		}

		function T(h4, h5, h8, h7) {
			if(!h7) {
				return {
					drawId: null,
					style: [],
					styleUpdate: []
				}
			}
			var h6;
			var h2 = h7.baseFs;
			h6 = h7.StyleBody || [];
			h6 = h7.zoomStyleBody[h8] || [];
			var h1 = h2[2];
			switch(h5) {
				case "point":
					h1 = h1[0];
					h6 = h6[0] || {};
					break;
				case "pointText":
					h1 = h1[1];
					h6 = h6[1] || {};
					break;
				case "line":
					h1 = h1[3];
					h6 = h6[3] || {};
					break;
				case "polygon":
					h1 = h1[4];
					h6 = h6[4] || {};
					break;
				case "polygon3d":
					h1 = h1[5];
					h6 = h6[5] || {};
					break
			}
			var h0 = h2[1][h8 - 1][0];
			var h3 = h0[h4];
			return {
				drawId: h3,
				style: h1,
				styleUpdate: h6
			}
		}

		function hS(h1, h0) {
			if(!h1 || h1.length === 0) {
				return null
			}
			return {
				sid: h0,
				fontRgba: i(h1[0]),
				haloRgba: i(h1[1]),
				backRgba: i(h1[2]),
				fontSize: h1[3],
				haloSize: h1[4],
				fontWeight: h1[5],
				fontStyle: h1[6],
				density: h1[7]
			}
		}

		function e(h1, h0) {
			return {
				sid: h0,
				rank: h1[0],
				ucflag: h1[1],
				icon: h1[2],
				iconType: h1[3],
				nineGG: h1[4],
				density: h1[5],
				zoom: h1[6]
			}
		}

		function hU(h1, h0) {
			return {
				sid: h0,
				borderRgba: i(h1[0]),
				fillRgba: i(h1[1]),
				borderWidth: h1[2],
				fillWidth: h1[3],
				borderCap: h1[4],
				fillCap: h1[5],
				haveBorderLine: h1[6],
				haveBorderTexture: h1[7],
				haveFillTexture: h1[8],
				isUseBorderRgba: h1[9],
				isUseFillRgba: h1[10],
				borderTexture: h1[11],
				fillTexture: h1[12],
				borderTextureType: h1[13],
				fillTextureType: h1[14],
				isRealWidth: h1[15],
				haveArrow: h1[16],
				needRound: h1[17],
				realBorderWidth: h1[18]
			}
		}

		function hR(h1, h0) {
			if(h0 === 2532) {}
			return {
				sid: h0,
				fillRgba: i(h1[0]),
				borderRgba: i(h1[1]),
				borderWidth: h1[2],
				borderTexture: h1[3],
				borderTextureType: h1[4],
				waterStyle: h1[5],
				haloStyle: h1[6],
				textureStyle: h1[7],
				thickRgba: i(h1[8])
			}
		}

		function hT(h1, h0) {
			return {
				sid: h0,
				filter: h1[0],
				ratio: h1[1],
				haveBorder: h1[2],
				borderWidth: h1[3],
				borderRgba: i(h1[4]),
				fillTop: i(h1[5]),
				fillSide: i(h1[6]),
				polyTexture: h1[7]
			}
		}

		function i(h5) {
			var h4 = h5;
			if(hV[h4]) {
				return hV[h4]
			}
			h5 = h5 >>> 0;
			var h3 = (h5) & 255;
			var h2 = (h5 >> 8) & 255;
			var h0 = (h5 >> 16) & 255;
			var h1 = (h5 >> 24) & 255;
			hV[h4] = [h3, h2, h0, h1];
			return hV[h4]
		}
		return {
			getStyleFromCache: function(h7, h2, h5, h6, h1, h4, h0) {
				h7 = h7 || "default";
				var h3 = h7 + "-" + h2 + "-" + h5 + "-" + h6;
				if(h4) {
					h3 += "-indoor"
				}
				if(h1) {
					if(!hZ[h3]) {
						hZ[h3] = hW(h2, h5, h6, h1)
					}
					return hZ[h3]
				}
				if(!hQ[h3]) {
					hQ[h3] = hW(h2, h5, h6, h1, h0)
				}
				return hQ[h3]
			}
		}
	})();
	bo.register(function(i) {
		var e = new dG(i)
	});

	function dG(e) {
		e.container.appendChild(this.render());
		this.bind(e)
	}
	dG.prototype.render = function() {
		var i = document.createElement("div");
		i.className = "click-ripple-container";
		var e = document.createElement("div");
		e.className = "click-ripple";
		i.appendChild(e);
		this._div = i;
		this._ripple = e;
		return i
	};
	dG.prototype.bind = function(i) {
		var e = this;
		i.addEventListener("spotclick", function(T) {
			if(!T.spots || T.spots.length === 0) {
				return
			}
			e._div.style.left = T.pixel.x + "px";
			e._div.style.top = T.pixel.y + "px";
			C.ac(e._ripple, "ripple-playing")
		});
		C.on(e._ripple, "transitionend", function() {
			C.rc(e._ripple, "ripple-playing")
		})
	};

	function f1(e) {
		ed.call(this);
		if(!e) {
			return
		}
		this._opts = {};
		this._map = e;
		this._maxLat = 84.6;
		this._minLat = -80.6;
		this._maxLatMC = en.convertLL2MC(new c4(this._maxLat, 0)).lat;
		this._minLatMC = en.convertLL2MC(new c4(this._minLat, 0)).lat
	}
	f1.inherits(ed, "ToolbarItem");
	C.extend(f1.prototype, {
		open: function() {
			if(this._isOpen == true) {
				return true
			}
			if(this._map._toolInUse) {
				return false
			}
			this._map._toolInUse = true;
			this._isOpen = true;
			return true
		},
		close: function() {
			if(!this._isOpen) {
				return
			}
			this._map._toolInUse = false;
			this._isOpen = false
		},
		_checkStr: function(e) {
			if(!e) {
				return ""
			}
			return e.replace(/</g, "&lt;").replace(/>/g, "&gt;")
		}
	});

	function gK(T, i) {
		f1.call(this, T);
		i = i || {};
		this._opts = C.extend(C.extend(this._opts || {}, {
			autoClear: false,
			tips: "测距",
			followText: "单击确定起点，双击结束绘制",
			unit: "metric",
			showResult: true,
			lineColor: "blue",
			lineStroke: 2,
			opacity: 1,
			lineStyle: "solid",
			cursor: e3.distCursor,
			styleCodes: {
				lnCode: 0,
				spCode: 0,
				slCode: 0,
				tlCode: 0
			},
			enableMassClear: true
		}), i);
		if(this._opts.showResult === false) {
			if(typeof i.tips === "undefined") {
				this._opts.tips = "绘制折线"
			}
			if(!i.cursor) {
				this._opts.cursor = "crosshair"
			}
		}
		if(this._opts.lineStroke <= 0) {
			this._opts.lineStroke = 2
		}
		if(this._opts.opacity > 1) {
			this._opts.opacity = 1
		} else {
			if(this._opts.opacity < 0) {
				this._opts.opacity = 0
			}
		}
		if(this._opts.lineStyle !== "solid" && this._opts.lineStyle !== "dashed") {
			this._opts.lineStyle = "solid"
		}
		this._checked = false;
		this._drawing = null;
		this.followTitle = null;
		this._totalDis = {};
		this._points = [];
		this._paths = [];
		this._dots = [];
		this._segDistance = [];
		this._overlays = [];
		this._units = {
			metric: {
				name: "metric",
				conv: 1,
				incon: 1000,
				u1: "米",
				u2: "公里"
			},
			us: {
				name: "us",
				conv: 3.2808,
				incon: 5279.856,
				u1: "英尺",
				u2: "英里"
			}
		};
		if(!this._units[this._opts.unit]) {
			this._opts.unit = "metric"
		}
		this._dLineColor = "#ff6319";
		this._dLineStroke = 3;
		this._dOpacity = 0.8;
		this._dLineStyle = "solid";
		this._dCursor = e3.distCursor;
		if(this._opts.showResult) {
			this._opts.followText = "单击确定起点"
		}
		this._followTextM = "单击确定地点，双击结束";
		this._sectionMarkerTip = "单击可删除此点，拖拽可调整位置";
		this._movingTimerId = null;
		if(this._opts.showResult) {
			this.text = "测距"
		} else {
			this.text = "绘线"
		}
		this._isOpen = false;
		var e = this;
		ea.load("tools", function() {
			e._draw()
		})
	}
	gK.inherits(f1, "PolylineTItem");
	C.extend(gK.prototype, {
		setLineColor: function(e) {
			this._opts.lineColor = e
		},
		setLineStroke: function(e) {
			if(Math.round(e) > 0) {
				this._opts.lineStroke = Math.round(e)
			}
		},
		setOpacity: function(e) {
			if(e >= 0 && e <= 1) {
				this._opts.opacity = e
			}
		},
		setLineStyle: function(e) {
			if(e === "solid" || e === "dashed") {
				this._opts.lineStyle = e
			}
		},
		clear: function() {
			for(var T = 0, e = this._overlays.length; T < e; T++) {
				if(this._overlays[T]) {
					this._map.removeOverlay(this._overlays[T])
				}
			}
			this._overlays.length = 0;
			for(var T = 0, e = this._dots.length; T < e; T++) {
				if(this._dots[T] && this._dots[T].parentNode) {
					this._dots[T].parentNode.removeChild(this._dots[T])
				}
			}
			this._dots.length = 0
		},
		setCursor: function(e) {
			if(this._opts.showResult === true) {
				return
			}
			this._opts.cursor = e
		},
		getCursor: function() {
			if(this._opts.showResult === true) {
				return this._dCursor
			}
			var e = this._opts.cursor.match(/^url\((.+)\)(,.*)?/);
			if(e !== null) {
				return e[1]
			} else {
				return this._opts.cursor
			}
		},
		showResult: function(e) {
			this._opts.showResult = !!e
		}
	});

	function cu() {
		var hR = 3;
		var hY = 256;
		var hQ = Math.pow(2, 18 - hR) * hY;
		var hZ = 2;
		var hX = (hZ + 1) * hQ;
		var T = en.convertLL2MC(new hr(180, 0));
		var hV = T.lng;
		var hT = hX - hV;
		var hW = -3;
		var e = hW * hQ;
		var hS = en.convertLL2MC(new hr(-180, 0));
		var hU = hS.lng;
		var i = hU - e;
		this._validPixels = hV / Math.pow(2, 18 - hR);
		this._mc180X = hV;
		this._mcM180X = hU;
		this._loopOffset = hT + i;
		this._mcTSpan = hV - hU;
		this._spaceDistance = hT;
		this._mSpaceDistance = i
	}
	cu.prototype = {
		calcLoopParam: function(hQ, i, hX) {
			hX = hX || 256;
			var hU = 0;
			var hR = 3;
			var hT = 6;
			var hS = hT * Math.pow(2, (i - hR)) * 256 / hX;
			var hW = hS / 2 - 1;
			var hV = -hS / 2;
			while(hQ > hW) {
				hQ -= hS;
				hU -= this._loopOffset
			}
			while(hQ < hV) {
				hQ += hS;
				hU += this._loopOffset
			}
			var e = hU;
			hU = Math.round(hU / Math.pow(2, 18 - i));
			return {
				offsetX: hU,
				geoOffsetX: e,
				col: hQ,
				T: hS,
				maxCol: hW,
				minCol: hV
			}
		},
		calcLoopCenterPoint: function(i) {
			var e = i.lng;
			while(e > this._mc180X) {
				e -= this._mcTSpan
			}
			while(e < this._mcM180X) {
				e += this._mcTSpan
			}
			i.lng = e;
			return i
		},
		calcLoopMapBounds: function(T, hQ) {
			var i = hQ || T.getCenter();
			var e = T.sw.lng;
			var hR = T.ne.lng;
			while(i.lng > this._mc180X) {
				i.lng -= this._mcTSpan;
				e -= this._mcTSpan;
				hR -= this._mcTSpan
			}
			while(i.lng < this._mcM180X) {
				i.lng += this._mcTSpan;
				e += this._mcTSpan;
				hR += this._mcTSpan
			}
			T.sw.lng = e;
			T.ne.lng = hR;
			if(T.pointBottomLeft) {
				T.pointBottomLeft = this.calcLoopCenterPoint(T.pointBottomLeft);
				T.pointTopLeft = this.calcLoopCenterPoint(T.pointTopLeft);
				T.pointTopRight = this.calcLoopCenterPoint(T.pointTopRight);
				T.pointBottomRight = this.calcLoopCenterPoint(T.pointBottomRight)
			}
			return T
		},
		calcLoopTiles: function(hY, e, h2, hV) {
			h2 = h2 || 256;
			var hR = hV || Math.pow(2, 18 - e) * h2;
			var hX = Math.floor(this._mc180X / hR);
			var hT = Math.floor(this._mcM180X / hR);
			var hZ = Math.floor(this._loopOffset / hR);
			var h0 = [];
			for(var hU = 0; hU < hY.length; hU++) {
				var h1 = hY[hU];
				var hQ = h1[0];
				var h3 = h1[1];
				if(hQ >= hX) {
					var hW = hQ + hZ;
					if(this.isTileBlank(hW, e, h2) === true) {
						continue
					}
					var T = "id_" + hW + "_" + h3 + "_" + e;
					if(!hY[T]) {
						hY[T] = true;
						h0.push([hW, h3, e, 0])
					}
				} else {
					if(hQ <= hT) {
						var hW = hQ - hZ;
						if(this.isTileBlank(hW, e, h2) === true) {
							continue
						}
						var T = "id_" + hW + "_" + h3 + "_" + e;
						if(!hY[T]) {
							hY[T] = true;
							h0.push([hW, h3, e, 0])
						}
					}
				}
			}
			for(var hU = 0, hS = h0.length; hU < hS; hU++) {
				hY.push(h0[hU])
			}
			for(var hU = hY.length - 1; hU >= 0; hU--) {
				var hQ = hY[hU][0];
				if(this.isTileBlank(hQ, e, h2)) {
					hY.splice(hU, 1)
				}
			}
			return hY
		},
		isTileBlank: function(T, hR, e) {
			var hS = Math.pow(2, hR - 3);
			var i = Math.round(this._validPixels * hS);
			var hQ = 6 * hS * 256 / e;
			while(T > hQ / 2 - 1) {
				T -= hQ
			}
			while(T < -(hQ / 2)) {
				T += hQ
			}
			if(T > 0 && T * e > i) {
				return true
			}
			if(T < 0 && Math.abs((T + 1) * e) > i) {
				return true
			}
			return false
		},
		isAddWidth: function(e, i) {
			return e < this._mcM180X || i > this._mc180X
		},
		getSpaceDistanceInPixel: function(i) {
			var e = Math.round((this._spaceDistance + this._mSpaceDistance) / Math.pow(2, 18 - i));
			return e
		}
	};
	var d4 = new cu();
	var ce = (function() {
		var i = true;
		var hR = 256;
		var e = true;
		var hT = aD("ditu", "normalTraffic");
		var hQ = hT.udt;
		var hU = "//its.map.baidu.com/traffic/";
		var hS = [
			[2, "79,210,125,1", 3, 2, 0, [], 0, 0],
			[2, "79,210,125,1", 3, 2, 0, [], 0, 0],
			[2, "79,210,125,1", 4, 2, 0, [], 0, 0],
			[2, "79,210,125,1", 5, 2, 0, [], 0, 0],
			[2, "79,210,125,1", 6, 2, 0, [], 0, 0],
			[2, "255,208,69,1", 3, 2, 0, [], 0, 0],
			[2, "255,208,69,1", 3, 2, 0, [], 0, 0],
			[2, "255,208,69,1", 4, 2, 0, [], 0, 0],
			[2, "255,208,69,1", 5, 2, 0, [], 0, 0],
			[2, "255,208,69,1", 6, 2, 0, [], 0, 0],
			[2, "232,14,14,1", 3, 2, 0, [], 0, 0],
			[2, "232,14,14,1", 3, 2, 0, [], 0, 0],
			[2, "232,14,14,1", 4, 2, 0, [], 0, 0],
			[2, "232,14,14,1", 5, 2, 0, [], 0, 0],
			[2, "232,14,14,1", 6, 2, 0, [], 0, 0],
			[2, "181,0,0,1", 3, 2, 0, [], 0, 0],
			[2, "181,0,0,1", 3, 2, 0, [], 0, 0],
			[2, "181,0,0,1", 4, 2, 0, [], 0, 0],
			[2, "181,0,0,1", 5, 2, 0, [], 0, 0],
			[2, "181,0,0,1", 6, 2, 0, [], 0, 0],
			[2, "255,255,255,1", 4, 0, 0, [], 0, 0],
			[2, "255,255,255,1", 5.5, 0, 0, [], 0, 0],
			[2, "255,255,255,1", 7, 0, 0, [], 0, 0],
			[2, "255,255,255,1", 8.5, 0, 0, [], 0, 0],
			[2, "255,255,255,1", 10, 0, 0, [], 0, 0]
		];
		var T = new cR({
			transparentPng: true,
			dataType: 2,
			cacheSize: 256,
			clipTile: true
		});
		T.zIndex = 2;
		T.getTilesUrl = function(hX, hY) {
			if(!hX || hY < 7) {
				return null
			}
			var hW = hX.x;
			var hZ = hX.y;
			var hV = hU + "?qt=vtraffic&z=" + hY + "&x=" + hW + "&y=" + hZ + "&udt=" + hQ;
			return hV
		};
		T.setColors = function(hV) {
			for(var hY = 0; hY < hS.length; hY++) {
				var hX = Math.floor(hY / 5);
				var hW = hV[hX];
				if(hW) {
					if(Object.prototype.toString.call(hW) === "[object String]") {
						hW = gZ.parseCSSColor(hW)
					}
					hS[hY][1] = [hW[0], hW[1], hW[2], hW[3] / 255].join(",")
				}
			}
		};
		T.setEdge = function(hV) {
			e = !!hV
		};
		T.processData = function(hY) {
			var h2 = hY.content;
			var h0 = 10;
			if(typeof hY.precision === "number") {
				h0 = hY.precision * 10
			}
			var h9 = {
				road: [
					[],
					[]
				]
			};
			if(!h2) {
				return h9
			}
			var h7 = h2.tf;
			if(!h7) {
				return h9
			}
			for(var hZ = 0; hZ < h7.length; hZ++) {
				var h8 = h7[hZ][1];
				var h6 = [];
				var h4 = 0;
				var h3 = 0;
				var h5 = hS[h7[hZ][3]];
				for(var hX = 0, hV = h8.length; hX < hV / 2; hX++) {
					h4 += h8[hX * 2] / h0;
					h3 += h8[hX * 2 + 1] / h0;
					h6.push(h4, 256 - h3)
				}
				var hW = h5[1].split(",");
				hW[3] = hW[3] * 255;
				var h1 = h5[2] / 2;
				if(e) {
					h9.road[0].push([h6, 1, 2, [255, 255, 255, 255], h1 + 2])
				}
				h9.road[1].push([h6, 1, 2, hW, h1])
			}
			return h9
		};
		return T
	})();
	bo.register(function(i) {
		if(i.config && i.config.isOverviewMap) {
			return
		}
		if(i.isLoaded()) {
			fC(i)
		} else {
			i.addEventListener("load", function() {
				fC(this)
			})
		}
		i.cityName = "中国";
		i.cCode = "1";
		var e = {};
		e.enableRequest = true;
		e.request = function() {
			if(e.enableRequest) {
				e.enableRequest = false;
				setTimeout(function() {
					e._request()
				}, 500)
			}
		};
		e._request = function() {
			var hQ = i.getBoundsIn();
			var hS = i.getZoom();
			var T = hQ.getSouthWest();
			var hR = hQ.getNorthEast();
			cB.request(function(hW) {
				if(hW.current_city["code"] >= 9000 && hW.current_city["code"] <= 9378) {
					hW.current_city["name"] = "台湾省"
				}
				if(hW.current_city["code"] >= 20000 && hW.current_city["code"] <= 20499) {
					hW.current_city["name"] = "新加坡"
				}
				if(hW.current_city["code"] >= 20500 && hW.current_city["code"] <= 25999) {
					hW.current_city["name"] = "泰国"
				}
				if(hW.current_city["code"] >= 26000 && hW.current_city["code"] <= 29999) {
					hW.current_city["name"] = "日本"
				}
				if(hW.current_city["code"] >= 30000 && hW.current_city["code"] <= 30999) {
					hW.current_city["name"] = "韩国"
				}
				if(hW.current_city["code"] >= 31000 && hW.current_city["code"] <= 37000) {
					hW.current_city["name"] = "亚太"
				}
				if(hW.current_city["code"] >= 46609 && hW.current_city["code"] <= 52505) {
					hW.current_city["name"] = "欧洲"
				}
				if(hW.current_city["code"] >= 39509 && hW.current_city["code"] <= 53500) {
					hW.current_city["name"] = "南美洲"
				}
				if(hW.current_city["code"] >= 54000 && hW.current_city["code"] <= 70000) {
					hW.current_city["name"] = "北美洲"
				}
				if(hW.current_city["code"] === 54003 && hW.current_city["code"] >= 60731 && hW.current_city["code"] <= 61123) {
					hW.current_city["name"] = "美国"
				}
				if(hW.current_city["code"] === 54015 || hW.current_city["code"] >= 57970 && hW.current_city["code"] <= 60223) {
					hW.current_city["name"] = "加拿大"
				}
				if(hW.current_city["code"] === 54025 || hW.current_city["code"] >= 54338 && hW.current_city["code"] <= 57374) {
					hW.current_city["name"] = "墨西哥"
				}
				e.enableRequest = true;
				if(hW && hW.current_city) {
					var hV = hW.current_city["name"];
					var hU = hW.current_city["code"];
					if(hU !== i.cCode) {
						var hT = new bb("oncitychange");
						hT.name = hV;
						hT.code = hU;
						i.dispatchEvent(hT)
					}
					i.cityName = hV;
					i.cCode = hU;
					if(!f4()) {
						ev(i)
					}
				}
			}, {
				qt: "cen",
				b: T.lng + "," + T.lat + ";" + hR.lng + "," + hR.lat,
				l: hS
			}, "", "", true)
		};
		i.addEventListener("load", function(T) {
			e.request()
		});
		i.addEventListener("moveend", function(T) {
			e.request()
		});
		i.addEventListener("zoomend", function(T) {
			e.request()
		});
		e.request()
	});

	function fC(i) {
		if(i.temp.copyadded) {
			return
		}
		i.temp.copyadded = true;
		if(!i.cpyCtrl) {
			var hQ = new d9(2, 2);
			i.config.cpyCtrlOffset = hQ;
			if(f4()) {
				hQ.width = 72;
				hQ.height = 0
			}
			var T = new dH({
				offset: hQ,
				printable: true
			});
			i.cpyCtrl = T
		}
		if(!f4()) {
			ev(i);
			i.addEventListener("maptypechange", function() {
				ev(i)
			})
		}
		i.addControl(T);
		var e = new af();
		e._opts = {
			printable: true
		};
		i.logoCtrl = e;
		i.addControl(e);
		i.addEventListener("resize", function() {
			if(this.getSize().width >= 300 && i.getSize().height >= 100) {
				e.show();
				T.setOffset(i.config.cpyCtrlOffset)
			} else {
				e.hide();
				T.setOffset(new d9(4, 2))
			}
		});
		if(i.getSize().width >= 300 && i.getSize().height >= 100) {
			e.show()
		} else {
			e.hide();
			T.setOffset(new d9(4, 2))
		}
		i.addEventListener("oncopyrightoffsetchange", function(hR) {
			i.logoCtrl.setOffset(hR.target.logo);
			i.cpyCtrl.setOffset(hR.target.cpy)
		});
		i.dispatchEvent(new bb("oncopyrightaddend"))
	}

	function ev(h5) {
		if(!h5.cpyCtrl) {
			var id = new d9(2, 2);
			if(f4()) {
				id.width = 72;
				id.height = 0
			}
			var h8 = new dH({
				offset: id,
				printable: true
			});
			h5.cpyCtrl = h8
		}
		var io = h5.cityName || "中国";
		var h6 = h5.getMapType();
		var h7 = ["常州市", "南昌市", "乌鲁木齐市", "无锡市", "福州市", "泉州市", "珠海市", "贵阳市"];
		var hZ = ["北京市", "上海市", "广州市", "深圳市", "宁波市", "石家庄市", "沈阳市", "长春市", "青岛市", "温州市", "台州市", "金华市", "佛山市", "中山市", "昆明市", "南宁市", "苏州市", "西安市", "济南市", "郑州市", "合肥市", "呼和浩特市", "杭州市", "成都市", "武汉市", "长沙市", "天津市", "南京市", "重庆市", "大连市", "东莞市", "厦门市"];
		var h1 = ["香港特别行政区"];
		var hV = ["台湾省"];
		var ie = ["日本"];
		var il = ["韩国"];
		var h9 = ["泰国"];
		var ic = ["亚太"];
		var hW = ["新加坡"];
		var im = ["欧洲"];
		var hQ = ["南美洲"];
		var ii = ["北美洲"];
		var T = ["美国"];
		var ib = ["墨西哥"];
		var hT = ["加拿大"];
		for(var ij in h7) {
			if(h7[ij] === io) {
				var h2 = true;
				break
			}
		}
		for(var ij in hZ) {
			if(hZ[ij] === io) {
				var hR = true;
				break
			}
		}
		for(var ij in h1) {
			if(h1[ij] === io) {
				var iq = true;
				break
			}
		}
		if(hV[0] === io) {
			var ih = true
		}
		if(hW[0] === io) {
			var i = true
		}
		if(ie[0] === io) {
			var hY = true
		}
		if(il[0] === io) {
			var h4 = true
		}
		if(h9[0] === io) {
			var h3 = true
		}
		if(ic[0] === io) {
			var hU = true
		}
		if(im[0] === io) {
			var h0 = true
		}
		if(hQ[0] === io) {
			var hX = true
		}
		if(ii[0] === io) {
			var e = true
		}
		if(T[0] === io) {
			var ik = true
		}
		if(hT[0] === io) {
			var ig = true
		}
		if(ib[0] === io) {
			var hS = true
		}
		var ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "];
		var ia = "rgba(255, 255, 255, 0.701961)";
		if(h5.getZoom() <= 9) {
			ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
		} else {
			if(ih) {
				ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
			} else {
				if(hY || h4) {
					ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
				} else {
					if(i || h3) {
						ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
					} else {
						if(hU) {
							ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
						} else {
							if(h0) {
								ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
							} else {
								if(hX) {
									ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
								} else {
									if(e) {
										ip = ["&copy;&nbsp;2021 Baidu - GS(2019)5218号 - 甲测资字1100930 - 京ICP证030173号 - Data &copy; "]
									}
								}
							}
						}
					}
				}
			}
		}
		if(h5.getZoom() <= 9) {
			ip.push("长地万方");
			ip.push(' &amp; <a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>');
			ip.push(' &amp; <a target="_blank" href="http://corporate.navteq.com/supplier_terms.html">HERE</a>');
			if(h6 === BMAP_SATELLITE_MAP || h6 === BMAP_HYBRID_MAP) {
				ip.push(' &amp; <a target="_blank" href="http://www.eso.org/public/">ESO</a>');
				ia = "rgba(0,0,0,.7)"
			}
		} else {
			if(hY || h4) {
				ip.push('<a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>')
			} else {
				if(i || h3) {
					ip.push('<a target="_blank" href="http://corporate.navteq.com/supplier_terms.html">HERE</a>')
				} else {
					if(hU) {
						ip.push('<a target="_blank" href="http://corporate.navteq.com/supplier_terms.html">HERE</a>');
						ip.push(' &amp; <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>')
					} else {
						if(h0) {
							ip.push('<a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>');
							ip.push(' &amp; <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>')
						} else {
							if(hX) {
								ip.push('<a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>');
								ip.push(' &amp; <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>')
							} else {
								if(ik || hS || ig) {
									ip.push('<a target="_blank" href="http://corporate.navteq.com/supplier_terms.html">HERE</a>');
									ip.push(' &amp; <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>')
								} else {
									if(e) {
										ip.push('<a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>');
										ip.push(' &amp; <a target="_blank" href="https://www.mapbox.com/">Mapbox</a>')
									} else {
										ip.push("长地万方");
										if(h2) {
											ip.push(' &amp; <a target="_blank" href="http://www.palmcity.cn/palmcity/">PalmCity</a>')
										}
										if(iq) {
											ip.push(' &amp; <a target="_blank" href="http://www.mapking.com/HongKong/eng/home/MapKing_Webmap.html">MapKing</a>')
										}
										if(ih) {
											ip.push(' &amp; <a target="_blank" href="http://corporate.navteq.com/supplier_terms.html">HERE</a>');
											ip.push(' &amp; <a target="_blank" href="http://www.localking.com.tw/about/localking.aspx">樂客LocalKing</a>')
										}
										if(h6 === BMAP_SATELLITE_MAP || h6 === BMAP_HYBRID_MAP) {
											ia = "rgba(0,0,0,.7)"
										}
									}
								}
							}
						}
					}
				}
			}
		}
		ip.unshift('<span style="background: ' + ia + ';padding: 0px 1px;line-height: 16px;display: inline;height: 16px;">');
		ip.push("</span>");
		ip = ip.join("");
		h5.cpyCtrl.addCopyright({
			id: 1,
			content: ip
		})
	}
	window.BMAP_STATUS_SUCCESS = 0;
	window.BMAP_STATUS_CITY_LIST = 1;
	window.BMAP_STATUS_UNKNOWN_LOCATION = 2;
	window.BMAP_STATUS_UNKNOWN_ROUTE = 3;
	window.BMAP_STATUS_INVALID_KEY = 4;
	window.BMAP_STATUS_INVALID_REQUEST = 5;
	window.BMAP_STATUS_PERMISSION_DENIED = 6;
	window.BMAP_STATUS_SERVICE_UNAVAILABLE = 7;
	window.BMAP_STATUS_TIMEOUT = 8;
	window.BMAP_ROUTE_TYPE_WALKING = 2;
	window.BMAP_ROUTE_TYPE_DRIVING = 3;
	window.BMAP_ROUTE_TYPE_RIDING = 6;
	window.BMAP_ROUTE_STATUS_NORMAL = 0;
	window.BMAP_ROUTE_STATUS_EMPTY = 1;
	window.BMAP_ROUTE_STATUS_ADDRESS = 2;
	var eF = "cur";
	var b2 = "cen";
	var em = "s";
	var P = "con";
	var dM = "bd";
	var gc = "nb";
	var hH = "bt";
	var cP = "nav";
	var ek = "walk";
	var hD = "gc";
	var fL = "rgc";
	var ex = "dec";
	var fb = "bse";
	var fm = "nse";
	var g = "bl";
	var bc = "bsl";
	var bp = "bda";
	var X = "sa";
	var az = "nba";
	var bZ = "drag";
	var H = "ext";
	var aP = "hip";
	var R = "ride";
	var fQ = "drct";
	var go = 2;
	var fN = 4;
	var g6 = 7;
	var g4 = 11;
	var fx = 12;
	var hB = 14;
	var bQ = 15;
	var dJ = 18;
	var fe = 20;
	var cI = 21;
	var co = 19;
	var e8 = 23;
	var ci = 26;
	var ao = 28;
	var ei = 31;
	var cF = 35;
	var gg = 44;
	var hO = 45;
	var eI = 46;
	var cD = 47;
	var gx = -1;
	var gW = 0;
	var hb = 1;
	var cm = 2;
	var b8 = 3;
	window.BMAP_POI_TYPE_NORMAL = 0;
	var Q = 1;
	var cc = 2;
	BMapGL.I = C.I;
	var O = {};
	O.removeHtml = function(e) {
		e = e.replace(/<\/?[^>]*>/g, "");
		e = e.replace(/[ | ]* /g, " ");
		return e
	};
	O.parseGeoExtReg1 = function(e) {
		return e.replace(/([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g, "$1,$2;")
	};
	O.parseGeoExtReg2 = function(i, e) {
		var T = new RegExp("(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){" + e + "}", "ig");
		return i.replace(T, "$1")
	};
	var fv = 0;
	var cH = 1;
	var g7 = 2;
	O.unique = function(T) {
		var hS = false;
		var hR = [];
		var hT = {};
		for(var hQ = 0, e = T.length; hQ < e; hQ++) {
			if(!hT[T[hQ]]) {
				hT[T[hQ]] = true;
				hR.push(T[hQ])
			}
		}
		return hR
	};
	O.getBestLevel = function(T, i) {
		if(i) {
			var e = Math.min(i.width / 1100, i.height / 660);
			T = Math.round(T + (Math.log(e) / Math.log(2)))
		}
		if(T < 1) {
			T = 1
		}
		if(T > 21) {
			T = 21
		}
		return T
	};
	O.parseGeo = function(hT, hW) {
		if(typeof hT != "string" || !hT) {
			return
		}
		var hY = hT.split("|");
		var e;
		var hR;
		var T;
		if(hY.length == 1) {
			e = f9(hT)
		} else {
			e = f9(hY[2]);
			hR = f9(hY[0]);
			T = f9(hY[1]);
			if(!hW) {
				return e
			}
		}
		var hU = {
			type: e.geoType
		};
		if(hW) {
			switch(hU.type) {
				case g7:
					var hV = new hr(e.geo[0][0], e.geo[0][1]);
					var hX = en.convertMC2LL(hV);
					hU.point = hX;
					hU.points = [hX];
					break;
				case cH:
					hU.points = [];
					var hZ = e.geo[0];
					for(var hS = 0, hQ = hZ.length - 1; hS < hQ; hS += 2) {
						var h0 = new hr(hZ[hS], hZ[hS + 1]);
						h0 = en.convertMC2LL(h0);
						hU.points.push(h0)
					}
					hR = new hr(hR.geo[0][0], hR.geo[0][1]);
					T = new hr(T.geo[0][0], T.geo[0][1]);
					hR = en.convertMC2LL(hR);
					T = en.convertMC2LL(T);
					hU.bounds = new dS(hR, T);
					break;
				default:
					break
			}
		}
		return hU
	};
	O.parseGeoExt = function(h9, h0) {
		if(!h0) {
			h0 = 0
		} else {
			if(h0 < 0.25) {
				h0 = 0
			} else {
				if(h0 > 0.25 && h0 < 1) {
					h0 = 1
				} else {
					if(h0 > 32) {
						h0 = 32
					}
				}
			}
		}
		var hV = h9.split("|");
		if(hV.length == 1) {
			var hQ = f9(hV[0]);
			return {
				type: hQ.type,
				bound: "",
				points: hQ.geo.join(",")
			}
		} else {
			if(hV.length > 1) {
				var h1 = h9.split(";.=");
				var hX = [];
				var hR = [];
				var h2 = 0;
				var h6 = h1.length;
				for(var h3 = 0; h3 < h6; h3++) {
					var h8 = h1[h3];
					if(h6 > 1) {
						if(h3 == 0) {
							h8 = h8 + ";"
						}
						if(h3 > 0 && h3 < h6 - 1) {
							h8 = ".=" + h8 + ";"
						}
						if(h3 == h6 - 1) {
							h8 = ".=" + h8
						}
					}
					var hS = h8.split("|");
					var h5 = f9(hS[0]);
					var h4 = f9(hS[1]);
					hX.push(h5.geo.join(","));
					hX.push(h4.geo.join(","));
					var hQ = f9(hS[2]);
					h2 = hQ.type;
					var h7 = hQ.geo.join(",");
					h7 = O.parseGeoExtReg1(h7);
					if(h0 > 0) {
						h7 = O.parseGeoExtReg2(h7, h0)
					}
					hR.push(h7)
				}
				if(h6 <= 1) {
					hR = hR.join(";")
				}
				if(h6 == 2) {
					var T = hR[0] + ";" + hR[1];
					var hT = T.split(";");
					var e = [];
					for(var h3 = 0; h3 < hT.length; h3++) {
						var hW = hT[h3].split(",")[0];
						var hU = hT[h3].split(",")[1];
						var hY = new hr(hW, hU);
						var hZ = en.convertMC2LL(hY);
						e.push(hZ)
					}
					hR = e
				}
				return {
					type: h2,
					bound: hX.join(";"),
					points: hR
				}
			}
		}
	};
	O.getPoiPoint = function(e) {
		var T = [];
		var i = null;
		if(e.toString() == "Point") {
			i = e
		} else {
			if(typeof e == "string") {
				T = C.trim(e).split(",");
				if(T.length < 2) {
					return
				}
				T[0] = parseFloat(C.trim(T[0]));
				T[1] = parseFloat(C.trim(T[1]))
			} else {
				T = e.slice(0);
				if(T.length < 2) {
					return
				}
			}
			i = new BMap.Point(T[0], T[1])
		}
		return i
	};
	O.parseGeoStr = function(T) {
		var i = T.split(",");
		var e = new hr(i[0], i[1]);
		return en.convertMC2LL(e)
	};
	O.level = {
		country: 4,
		province: 11,
		city: 12,
		area: 13
	};
	var hI = ["=", ".", "-", "*"];
	var f3 = 1 << 23;

	function f9(hW) {
		var hV = a9(hW.charAt(0));
		var T = hW.substr(1);
		var hY = 0;
		var e = T.length;
		var hZ = [];
		var hT = [];
		var hU = [];
		while(hY < e) {
			if(T.charAt(hY) == hI[0]) {
				if((e - hY) < 13) {
					return 0
				}
				hU = aL(T.substr(hY, 13), hZ);
				if(hU < 0) {
					return 0
				}
				hY += 13
			} else {
				if(T.charAt(hY) == ";") {
					hT.push(hZ.slice(0));
					hZ.length = 0;
					++hY
				} else {
					if((e - hY) < 8) {
						return 0
					}
					hU = c6(T.substr(hY, 8), hZ);
					if(hU < 0) {
						return 0
					}
					hY += 8
				}
			}
		}
		for(var hS = 0, hQ = hT.length; hS < hQ; hS++) {
			for(var hR = 0, hX = hT[hS].length; hR < hX; hR++) {
				hT[hS][hR] /= 100
			}
		}
		return {
			geoType: hV,
			geo: hT
		}
	}

	function a9(i) {
		var e = -1;
		if(i == hI[1]) {
			e = g7
		} else {
			if(i == hI[2]) {
				e = cH
			} else {
				if(i == hI[3]) {
					e = fv
				}
			}
		}
		return e
	}

	function aL(hR, T) {
		var e = 0;
		var hT = 0;
		var hS = 0;
		for(var hQ = 0; hQ < 6; hQ++) {
			hS = cO(hR.substr(1 + hQ, 1));
			if(hS < 0) {
				return -1 - hQ
			}
			e += hS << (6 * hQ);
			hS = cO(hR.substr(7 + hQ, 1));
			if(hS < 0) {
				return -7 - hQ
			}
			hT += hS << (6 * hQ)
		}
		T.push(e);
		T.push(hT);
		return 0
	}

	function c6(hS, hQ) {
		var T = hQ.length;
		if(T < 2) {
			return -1
		}
		var e = 0;
		var hU = 0;
		var hT = 0;
		for(var hR = 0; hR < 4; hR++) {
			hT = cO(hS.substr(hR, 1));
			if(hT < 0) {
				return -1 - hR
			}
			e += hT << (6 * hR);
			hT = cO(hS.substr(4 + hR, 1));
			if(hT < 0) {
				return -5 - hR
			}
			hU += hT << (6 * hR)
		}
		if(e > f3) {
			e = f3 - e
		}
		if(hU > f3) {
			hU = f3 - hU
		}
		hQ.push(hQ[T - 2] + e);
		hQ.push(hQ[T - 1] + hU);
		return 0
	}

	function cO(i) {
		var e = i.charCodeAt(0);
		if(i >= "A" && i <= "Z") {
			return e - "A".charCodeAt(0)
		} else {
			if(i >= "a" && i <= "z") {
				return(26 + e - "a".charCodeAt(0))
			} else {
				if(i >= "0" && i <= "9") {
					return(52 + e - "0".charCodeAt(0))
				} else {
					if(i == "+") {
						return 62
					} else {
						if(i == "/") {
							return 63
						}
					}
				}
			}
		}
		return -1
	}
	O.pathToPoints = function(hS) {
		var hQ = [];
		if(typeof hS !== "string") {
			return hQ
		} else {
			var hR = hS.split(";");
			for(var T = 0; T < hR.length; T++) {
				var e = hR[T].split(",");
				hQ.push(new hr(e[0], e[1]))
			}
		}
		return hQ
	};
	window.BMAP_POI_TYPE_NORMAL = 0;
	window.BMAP_POI_TYPE_BUSSTOP = 1;
	window.BMAP_POI_TYPE_BUSLINE = 2;
	window.BMAP_POI_TYPE_SUBSTOP = 3;
	window.BMAP_POI_TYPE_SUBLINE = 4;
	var hu = 0;
	var fW = 1;
	var c3 = {};
	window.APIPack = c3;

	function fA(i, e) {
		ed.call(this);
		this._loc = {};
		this.setLocation(i);
		e = e || {};
		e.renderOptions = e.renderOptions || {};
		this._opts = {
			renderOptions: {
				panel: e.renderOptions.panel || null,
				map: e.renderOptions.map || null,
				autoViewport: e.renderOptions.autoViewport || true,
				selectFirstResult: e.renderOptions.selectFirstResult,
				highlightMode: e.renderOptions.highlightMode,
				enableDragging: e.renderOptions.enableDragging || false
			},
			onSearchComplete: e.onSearchComplete || function() {},
			onMarkersSet: e.onMarkersSet || function() {},
			onInfoHtmlSet: e.onInfoHtmlSet || function() {},
			onResultsHtmlSet: e.onResultsHtmlSet || function() {},
			onGetBusListComplete: e.onGetBusListComplete || function() {},
			onGetBusLineComplete: e.onGetBusLineComplete || function() {},
			onBusListHtmlSet: e.onBusListHtmlSet || function() {},
			onBusLineHtmlSet: e.onBusLineHtmlSet || function() {},
			onPolylinesSet: e.onPolylinesSet || function() {},
			reqFrom: e.reqFrom || ""
		};
		if(typeof e != "undefined" && typeof e.renderOptions != "undefined" && typeof e.renderOptions["autoViewport"] != "undefined") {
			this._opts.renderOptions.autoViewport = e.renderOptions["autoViewport"]
		} else {
			this._opts.renderOptions.autoViewport = true
		}
		this._opts.renderOptions.panel = C.G(this._opts.renderOptions.panel)
	}
	fA.inherits(ed, "BaseSearch");
	C.extend(fA.prototype, {
		getResults: function() {
			if(!this._isMultiKey) {
				return this._results
			} else {
				return this._arrResults
			}
		},
		enableAutoViewport: function() {
			this._opts.renderOptions.autoViewport = true
		},
		disableAutoViewport: function() {
			this._opts.renderOptions.autoViewport = false
		},
		setLocation: function(e) {
			if(!e) {
				return
			}
			this._loc.src = e
		},
		setSearchCompleteCallback: function(e) {
			this._opts.onSearchComplete = e || function() {}
		},
		setMarkersSetCallback: function(e) {
			this._opts.onMarkersSet = e || function() {}
		},
		setPolylinesSetCallback: function(e) {
			this._opts.onPolylinesSet = e || function() {}
		},
		setInfoHtmlSetCallback: function(e) {
			this._opts.onInfoHtmlSet = e || function() {}
		},
		setResultsHtmlSetCallback: function(e) {
			this._opts.onResultsHtmlSet = e || function() {}
		},
		getStatus: function() {
			return this._status
		}
	});
	var dN = function(T, i) {
		fA.call(this, T, i);
		i = i || {};
		i.renderOptions = i.renderOptions || {};
		this.setPageCapacity(i.pageCapacity);
		if(typeof i.renderOptions["selectFirstResult"] != "undefined" && !i.renderOptions["selectFirstResult"]) {
			this.disableFirstResultSelection()
		} else {
			this.enableFirstResultSelection()
		}
		this._overlays = [];
		this._arrPois = [];
		this._curIndex = -1;
		this._queryList = [];
		var e = this;
		ea.load("localSearch", function() {
			e._check()
		}, true)
	};
	dN.inherits(fA, "LocalSearch");
	dN.DEFAULT_PAGE_CAPACITY = 10;
	dN.MIN_PAGE_CAPACITY = 1;
	dN.MAX_PAGE_CAPACITY = 100;
	dN.DEFAULT_RADIUS = 2000;
	dN.MAX_RADIUS = 100000;
	C.extend(dN.prototype, {
		search: function(e, i) {
			this._queryList.push({
				method: "search",
				arguments: [e, i]
			})
		},
		searchInBounds: function(e, T, i) {
			this._queryList.push({
				method: "searchInBounds",
				arguments: [e, T, i]
			})
		},
		searchNearby: function(T, i, e, hQ) {
			this._queryList.push({
				method: "searchNearby",
				arguments: [T, i, e, hQ]
			})
		},
		clearResults: function() {
			delete this._json;
			delete this._status;
			delete this._results;
			delete this._ud;
			this._curIndex = -1;
			this._setStatus();
			if(this._opts.renderOptions.panel) {
				this._opts.renderOptions.panel.innerHTML = ""
			}
		},
		gotoPage: function() {},
		enableFirstResultSelection: function() {
			this._opts.renderOptions.selectFirstResult = true
		},
		disableFirstResultSelection: function() {
			this._opts.renderOptions.selectFirstResult = false
		},
		setPageCapacity: function(e) {
			if(typeof e == "number" && !isNaN(e)) {
				this._opts.pageCapacity = e < 1 ? dN.DEFAULT_PAGE_CAPACITY : (e > dN.MAX_PAGE_CAPACITY ? dN.DEFAULT_PAGE_CAPACITY : e)
			} else {
				this._opts.pageCapacity = dN.DEFAULT_PAGE_CAPACITY
			}
		},
		getPageCapacity: function() {
			return this._opts.pageCapacity
		},
		toString: function() {
			return "LocalSearch"
		}
	});

	function V(i) {
		this._opts = {};
		C.extend(this._opts, i);
		this._queryList = [];
		var e = this;
		ea.load("otherSearch", function() {
			e._asyncSearch()
		})
	}
	V.inherits(ed, "Geocoder");
	C.extend(V.prototype, {
		getPoint: function(e, T, i) {
			this._queryList.push({
				method: "getPoint",
				arguments: [e, T, i]
			})
		},
		getLocation: function(e, T, i) {
			this._queryList.push({
				method: "getLocation",
				arguments: [e, T, i]
			})
		},
		toString: function() {
			return "Geocoder"
		}
	});

	function cS(e) {
		e = e || {};
		this.config = {
			timeout: e.timeout || 1000 * 10,
			maximumAge: e.maximumAge || 0,
			enableHighAccuracy: e.enableHighAccuracy || false,
			SDKLocation: e.SDKLocation || false
		};
		this._pendingCalls = [];
		var i = this;
		ea.load("otherSearch", function() {
			var T = i._pendingCalls.length;
			for(var hQ = 0; hQ < T; hQ++) {
				var hR = i._pendingCalls[hQ];
				i[hR.method].apply(i, hR.arguments)
			}
		})
	}
	C.extend(cS.prototype, {
		getCurrentPosition: function(e, i) {
			this._pendingCalls.push({
				method: "getCurrentPosition",
				arguments: arguments
			})
		},
		getStatus: function() {
			return BMAP_STATUS_UNKNOWN_LOCATION
		},
		enableSDKLocation: function() {
			if(f4()) {
				this.config.SDKLocation = true
			}
		},
		disableSDKLocation: function() {
			this.config.SDKLocation = false
		}
	});

	function gy() {
		this._queryList = [];
		var e = this;
		ea.load("otherSearch", function() {
			e._asyncSearch()
		})
	}
	gy.inherits(ed, "Boundary");
	C.extend(gy.prototype, {
		get: function(i, e) {
			this._queryList.push({
				method: "get",
				arguments: [i, e]
			})
		},
		toString: function() {
			return "Boundary"
		}
	});

	function W(i) {
		i = i || {};
		i.renderOptions = i.renderOptions || {};
		this._opts = {
			renderOptions: {
				map: i.renderOptions.map || null
			}
		};
		this._queryList = [];
		var e = this;
		ea.load("otherSearch", function() {
			e._asyncSearch()
		})
	}
	W.inherits(ed, "LocalCity");
	C.extend(W.prototype, {
		get: function(e) {
			this._queryList.push({
				method: "get",
				arguments: [e]
			})
		},
		toString: function() {
			return "LocalCity"
		}
	});

	function cN(e, T) {
		ed.call(this);
		this.markersList = [];
		this.destList = [];
		this.pointsList = [];
		this._opts = T;
		this.json = e;
		this.map = this._opts.renderOptions.map || null;
		this.sType = this._opts.sType;
		this.infoWindow = null;
		this.curPointIndex = 0;
		this.startName = "";
		this.endIndex = 1;
		this.endName = "";
		this.resCity = [0, 0, 0, 0, 0, 0, 0];
		this.locPois = [];
		this.curPageIndex = [1, 1, 1, 1, 1, 1, 1];
		this.totalPage = [1, 1, 1, 1, 1, 1, 1];
		this.resCount = [0, 0, 0, 0, 0, 0, 0];
		this.resType = [0, 0, 0, 0, 0, 0, 0];
		this.qInfo = [{
			n: "",
			c: 0,
			u: 0,
			x: 0,
			y: 0,
			t: -1
		}, {
			n: "",
			c: 0,
			u: 0,
			x: 0,
			y: 0,
			t: -1
		}, {
			n: "",
			c: 0,
			u: 0,
			x: 0,
			y: 0,
			t: -1
		}, {
			n: "",
			c: 0,
			u: 0,
			x: 0,
			y: 0,
			t: -1
		}, {
			n: "",
			c: 0,
			u: 0,
			x: 0,
			y: 0,
			t: -1
		}, {
			n: "",
			c: 0,
			u: 0,
			x: 0,
			y: 0,
			t: -1
		}, {
			n: "",
			c: 0,
			u: 0,
			x: 0,
			y: 0,
			t: -1
		}];
		this.curSelectedIndex = -1;
		this.tpList = [];
		this.tpListInMap = [];
		var i = this;
		ea.load("route", function() {})
	}
	cN.inherits(ed, "RouteAddr");

	function d2(T, i) {
		fA.call(this, T, i);
		this.QUERY_TYPE_BUSLIST = g;
		this.RETURN_TYPE_BUSLIST = bQ;
		this.QUERY_TYPE_BUSLINE = bc;
		this.RETURN_TYPE_BUSLINE = dJ;
		this._queryList = [];
		var e = this;
		ea.load("buslineSearch", function() {
			e._asyncSearch()
		})
	}
	var bn = e3.staticHost + "/wolfman/static/common/images/";
	d2._iconOpen = e3.apiIMG + "/iw_plus.gif";
	d2._iconClose = e3.apiIMG + "/iw_minus.gif";
	d2._stopUrl = bn + "new/bus-stop-1x_ddd4723.png";
	d2.inherits(fA, "BusLineSearch");
	C.extend(d2.prototype, {
		getBusList: function(e) {
			this._queryList.push({
				method: "getBusList",
				arguments: [e]
			})
		},
		getBusLine: function(e) {
			this._queryList.push({
				method: "getBusLine",
				arguments: [e]
			})
		},
		setGetBusListCompleteCallback: function(e) {
			this._opts.onGetBusListComplete = e || function() {}
		},
		setGetBusLineCompleteCallback: function(e) {
			this._opts.onGetBusLineComplete = e || function() {}
		},
		setBusListHtmlSetCallback: function(e) {
			this._opts.onBusListHtmlSet = e || function() {}
		},
		setBusLineHtmlSetCallback: function(e) {
			this._opts.onBusLineHtmlSet = e || function() {}
		},
		setPolylinesSetCallback: function(e) {
			this._opts.onPolylinesSet = e || function() {}
		}
	});

	function g1(i) {
		fA.call(this, i);
		i = i || {};
		this._options = {
			input: i.input || null,
			baseDom: i.baseDom || null,
			types: i.types || [],
			onSearchComplete: i.onSearchComplete || function() {}
		};
		this._loc.src = i.location || "全国";
		this._word = "";
		this._show = false;
		this._suggestion = null;
		this._inputValue = "";
		this._initialize();
		var e = this;
		ea.load("autocomplete", function() {
			e._asyncSearch()
		}, true)
	}
	g1.inherits(fA, "Autocomplete");
	C.extend(g1.prototype, {
		_initialize: function() {},
		show: function() {
			this._show = true
		},
		hide: function() {
			this._show = false
		},
		setTypes: function(e) {
			this._options.types = e
		},
		setLocation: function(e) {
			this._loc.src = e
		},
		search: function(e) {
			this._word = e
		},
		setInputValue: function(e) {
			this._inputValue = e
		},
		setSearchCompleteCallback: function(e) {
			this._options.onSearchComplete = e
		}
	});
	var he = function(i, e) {
		fA.call(this, i, e)
	};
	C.inherit(he, fA, "BaseRoute");
	C.extend(he.prototype, {
		clearResults: function() {}
	});
	window.BMAP_TRANSIT_POLICY_RECOMMEND = 0;
	window.BMAP_TRANSIT_POLICY_LEAST_TIME = 4;
	window.BMAP_TRANSIT_POLICY_LEAST_TRANSFER = 1;
	window.BMAP_TRANSIT_POLICY_LEAST_WALKING = 2;
	window.BMAP_TRANSIT_POLICY_AVOID_SUBWAYS = 3;
	window.BMAP_TRANSIT_POLICY_FIRST_SUBWAYS = 5;
	window.BMAP_LINE_TYPE_BUS = 0;
	window.BMAP_LINE_TYPE_SUBWAY = 1;
	window.BMAP_LINE_TYPE_FERRY = 2;
	window.BMAP_LINE_TYPE_TRAIN = 3;
	window.BMAP_LINE_TYPE_AIRPLANE = 4;
	window.BMAP_LINE_TYPE_COACH = 5;
	var dk = 3;
	var fj = 4;
	var hx = 1;
	var dZ = 2;
	var gO = 5;
	var g5 = 6;
	window.BMAP_TRANSIT_TYPE_IN_CITY = 0;
	window.BMAP_TRANSIT_TYPE_CROSS_CITY = 1;
	window.BMAP_TRANSIT_PLAN_TYPE_ROUTE = 0;
	window.BMAP_TRANSIT_PLAN_TYPE_LINE = 1;
	window.BMAP_TRANSIT_TYPE_POLICY_TRAIN = 0;
	window.BMAP_TRANSIT_TYPE_POLICY_AIRPLANE = 1;
	window.BMAP_TRANSIT_TYPE_POLICY_COACH = 2;
	window.BMAP_INTERCITY_POLICY_LEAST_TIME = 0;
	window.BMAP_INTERCITY_POLICY_EARLY_START = 1;
	window.BMAP_INTERCITY_POLICY_CHEAP_PRICE = 2;

	function bI(T, i) {
		he.call(this, T, i);
		i = i || {};
		this.setPolicy(i.policy);
		this.setIntercityPolicy(i.intercityPolicy);
		this.setTransitTypePolicy(i.transitTypePolicy);
		this.setPageCapacity(i.pageCapacity);
		this.QUERY_TYPE = hH;
		this.RETURN_TYPE = hB;
		this.ROUTE_TYPE = fW;
		this._overlays = [];
		this._curIndex = -1;
		this._opts._enableTraffic = i.enableTraffic || false;
		this._queryList = [];
		var e = this;
		ea.load("route", function() {
			e._asyncSearch()
		}, true)
	}
	bI.MAX_PAGE_CAPACITY = 100;
	bI.LINE_TYPE_MAPPING = [0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1];
	bI.LINE_TYPE_MAPPING_CROSS_CITY = [0, 3, 4, 0, 0, 0, 5];
	C.inherit(bI, he, "TransitRoute");
	C.extend(bI.prototype, {
		setPolicy: function(e) {
			if(e >= BMAP_TRANSIT_POLICY_RECOMMEND && e <= BMAP_TRANSIT_POLICY_FIRST_SUBWAYS) {
				this._opts.policy = e
			} else {
				this._opts.policy = BMAP_TRANSIT_POLICY_RECOMMEND
			}
		},
		setIntercityPolicy: function(e) {
			if(e >= BMAP_INTERCITY_POLICY_LEAST_TIME && e <= BMAP_INTERCITY_POLICY_CHEAP_PRICE) {
				this._opts.intercityPolicy = e
			} else {
				this._opts.intercityPolicy = BMAP_INTERCITY_POLICY_LEAST_TIME
			}
		},
		setTransitTypePolicy: function(e) {
			if(e >= BMAP_TRANSIT_TYPE_POLICY_TRAIN && e <= BMAP_TRANSIT_TYPE_POLICY_COACH) {
				this._opts.transitTypePolicy = e
			} else {
				this._opts.transitTypePolicy = BMAP_TRANSIT_TYPE_POLICY_TRAIN
			}
		},
		_internalSearch: function(i, e) {
			this._queryList.push({
				method: "_internalSearch",
				arguments: [i, e]
			})
		},
		search: function(i, e) {
			this._queryList.push({
				method: "search",
				arguments: [i, e]
			})
		},
		setPageCapacity: function(e) {
			if(typeof e === "string") {
				e = parseInt(e, 10);
				if(isNaN(e)) {
					this._opts.pageCapacity = bI.MAX_PAGE_CAPACITY;
					return
				}
			}
			if(typeof e !== "number") {
				this._opts.pageCapacity = bI.MAX_PAGE_CAPACITY;
				return
			}
			if(e >= 1 && e <= bI.MAX_PAGE_CAPACITY) {
				this._opts.pageCapacity = Math.round(e)
			} else {
				this._opts.pageCapacity = bI.MAX_PAGE_CAPACITY
			}
		},
		toString: function() {
			return "TransitRoute"
		},
		_shortTitle: function(e) {
			return e.replace(/\(.*\)/, "")
		}
	});
	window.BMAP_HIGHLIGHT_STEP = 1;
	window.BMAP_HIGHLIGHT_ROUTE = 2;
	var cK = function(e, hQ) {
		he.call(this, e, hQ);
		this._overlays = [];
		this._curIndex = -1;
		this._queryList = [];
		var T = this;
		var i = this._opts.renderOptions;
		if(i.highlightMode !== BMAP_HIGHLIGHT_STEP && i.highlightMode !== BMAP_HIGHLIGHT_ROUTE) {
			i.highlightMode = BMAP_HIGHLIGHT_STEP
		}
		this._enableDragging = this._opts.renderOptions.enableDragging ? true : false;
		ea.load("route", function() {
			T._asyncSearch()
		}, true);
		if(this.init_d) {
			this.init_d()
		}
	};
	cK.ROAD_TYPE = ["", "环岛", "无属性道路", "主路", "高速连接路", "交叉点内路段", "连接道路", "停车场内部道路", "服务区内部道路", "桥", "步行街", "辅路", "匝道", "全封闭道路", "未定义交通区域", "POI连接路", "隧道", "步行道", "公交专用道", "提前右转道"];
	C.inherit(cK, he, "DWRoute");
	C.extend(cK.prototype, {
		search: function(T, e, i) {
			this._queryList.push({
				method: "search",
				arguments: [T, e, i]
			})
		}
	});
	window.BMAP_DRIVING_POLICY_DEFAULT = 0;
	window.BMAP_DRIVING_POLICY_AVOID_HIGHWAYS = 3;
	window.BMAP_DRIVING_POLICY_FIRST_HIGHWAYS = 4;
	window.BMAP_DRIVING_POLICY_AVOID_CONGESTION = 5;
	window.BMAP_TRAFFICE_STATUS_NONE = 0;
	window.BMAP_TRAFFICE_STATUS_NORMAL = 1;
	window.BMAP_TRAFFICE_STATUS_SLOW = 2;
	window.BMAP_TRAFFICE_STATUS_JAM = 3;

	function fE(e, i) {
		cK.call(this, e, i);
		i = i || {};
		this._opts._enableTraffic = i.enableTraffic || false;
		this.setPolicy(i.policy);
		this.QUERY_TYPE = cP;
		this.RETURN_TYPE = fe;
		this.ROUTE_TYPE = BMAP_ROUTE_TYPE_DRIVING
	}
	C.inherit(fE, cK, "DrivingRoute");
	fE.prototype.setPolicy = function(e) {
		if(e >= BMAP_DRIVING_POLICY_DEFAULT && e <= BMAP_DRIVING_POLICY_AVOID_CONGESTION) {
			this._opts.policy = e
		} else {
			this._opts.policy = BMAP_DRIVING_POLICY_DEFAULT
		}
	};

	function ba(e, i) {
		cK.call(this, e, i);
		this.QUERY_TYPE = ek;
		this.RETURN_TYPE = ei;
		this.ROUTE_TYPE = BMAP_ROUTE_TYPE_WALKING;
		this._enableDragging = false
	}
	C.inherit(ba, cK, "WalkingRoute");

	function bm(e, i) {
		cK.call(this, e, i);
		this.QUERY_TYPE = R;
		this.ROUTE_TYPE = BMAP_ROUTE_TYPE_RIDING;
		this._enableDragging = false
	}
	C.inherit(bm, cK, "RidingRoute");
	window.BMAP_MODE_DRIVING = "driving";
	window.BMAP_MODE_TRANSIT = "transit";
	window.BMAP_MODE_WALKING = "walking";
	window.BMAP_MODE_NAVIGATION = "navigation";
	var be = {
		web: window.location.protocol + "//api.map.baidu.com/direction?",
		android: "bdapp://map/direction?",
		ios: "baidumap://map/direction?"
	};

	function hs(e) {
		this.opts = e || {}
	}
	C.extend(hs.prototype, {
		routeCall: function(hQ, e, T) {
			var i = this;
			ea.load("route", function() {
				i._asyncSearch(hQ, e, T)
			})
		}
	});
	bo.Map = c8;
	bo.MapType = b6;
	bo.Point = hr;
	bo.Pixel = ej;
	bo.Size = d9;
	bo.Bounds = dS;
	bo.TileLayer = cR;
	bo.Copyright = c5;
	bo.Projection = bo.Project = en;
	bo.Convertor = ay;
	bo.RenderTypeUtils = a8;
	bo.Overlay = bl;
	bo.Label = fP;
	bo.Marker = aC;
	bo.Icon = ha;
	bo.Polyline = ak;
	bo.BezierCurve = fn;
	bo.PolylineMultipart = fl;
	bo.Polygon = g3;
	bo.Prism = cg;
	bo.Marker3D = cv;
	bo.GroundOverlay = cp;
	bo.InfoWindow = an;
	bo.SimpleInfoWindow = hG;
	bo.Circle = dF;
	bo.Control = a7;
	bo.NavigationControl = dt;
	bo.NavigationControl3D = eU;
	bo.CopyrightControl = dH;
	bo.ScaleControl = hg;
	bo.CityListControl = eb;
	bo.MapTypeControl = bC;
	bo.ZoomControl = cy;
	bo.LocationControl = bA;
	bo.LogoControl = af;
	bo.DistanceTool = gK;
	bo.ContextMenu = cf;
	bo.MenuItem = fy;
	bo.OperationMask = eh;
	bo.Animation = o;
	bo.ViewAnimation = cM;
	bo.Transitions = cn;
	bo.Event = bb;
	bo.trafficLayer = ce;
	bo.Geolocation = cS;
	bo.Geocoder = V;
	bo.Boundary = gy;
	bo.LocalCity = W;
	bo.LocalSearch = dN;
	bo.Autocomplete = g1;
	bo.BusLineSearch = d2;
	bo.WalkingRoute = ba;
	bo.RidingRoute = bm;
	bo.DrivingRoute = fE;
	bo.TransitRoute = bI;
	bo.RouteSearch = hs;

	function d1(e, i) {
		for(var T in i) {
			e[T] = i[T]
		}
	}
	bo.verify();
	bo.apiLoad();
})(BMapGL, "BMapGL");