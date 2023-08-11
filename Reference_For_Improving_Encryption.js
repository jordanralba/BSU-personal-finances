!(function (t) {
    var e, i, n, s, o, a, r, h, l, c, u, d, p, m, g, f, w, b, v, S, y, x, C, P, A, T, k, E, I, M, R, F, D, _, B, L, U, N, z, O, W, H, V, X, Y, G, q;
    !(function (t) {
        (t.isCommandOrCtrl = function (t) {
            return 17 == t || 224 == t || 91 == t || 93 == t;
        }),
            (t.isShift = function (t) {
                return 16 == t;
            });
    })(e || (e = {})),
        (function (t) {
            function e(t) {
                return "undefined" == typeof csrfToken ? t : t + (t.indexOf("?") < 0 ? "?" : "&") + csrfToken.name + "=" + csrfToken.value;
            }
            (t.csrf = e),
                (t.ajax = function (t) {
                    if ("undefined" != typeof csrfToken) {
                        "GET" != (t.method || t.type || "GET").toUpperCase() && (t.url = e(t.url || ""));
                    }
                    return $.ajax(t);
                });
        })(i || (i = {})),
        (function (t) {
            const e = /(''|[^']|^){(\d+)}/g,
                n = /(''|[^']|^){(\d+),plural,\s*(one\s*{([^}]*)})?\s*(few\s*{([^}]*)})?\s*other\s*{([^}]*)}\s*}/g;
            let s;
            (t.s = function (t, ...s) {
                if (0 == t.length) return "";
                const o = t;
                for (var a = t.length, r = 0; r < a && o.charCodeAt(r) <= 32; ) r++;
                for (; r < a && o.charCodeAt(a - 1) <= 32; ) a--;
                const h = 0 == r ? "" : o.substring(0, r);
                t = 0 == r && a == o.length ? o : o.substring(r, a);
                const l = a == o.length ? "" : o.substring(a, o.length);
                var c = window.I18nPhrases[t];
                return (
                    void 0 === c &&
                        (!(function (t, e) {
                            if (((window.I18nPhrases[t] = t), !window.I18nPhrases.__translations_disabled__)) {
                                const s = { en: t, args: e };
                                i.ajax({ url: "/logMissingI18nPhrase", method: "POST", dataType: "json", contentType: "application/json; charset=UTF-8", data: JSON.stringify(s) });
                                const o = window.I18nPhrases || {};
                                for (var n in o) o.hasOwnProperty(n);
                            }
                        })(t, s),
                        (c = t)),
                    s.length > 0 &&
                        (c = (c = c.replace(e, function (t, e, i) {
                            return "''" == e && (e = "'"), e + s[parseInt(i, 10)];
                        })).replace(n, function (t, e, i, n, o, a, r, h) {
                            "''" == e && (e = "'");
                            const l = s[parseInt(i, 10)];
                            return (
                                e +
                                ((function (t, e, i) {
                                    switch (GlobalsShared.locale.split("-")[0]) {
                                        case "zh":
                                        case "ja":
                                        case "ko":
                                        case "tr":
                                        case "th":
                                        case "id":
                                            return;
                                        case "ru":
                                            return t % 10 == 1 && t % 100 != 11 ? e : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? i : void 0;
                                        case "po":
                                            return 1 == t ? e : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? i : void 0;
                                        case "fr":
                                        case "pt":
                                            return t > 1 ? e : void 0;
                                        default:
                                            return 1 == t ? e : void 0;
                                    }
                                })(parseInt(l), o, r) || h)
                            );
                        })),
                    h && (c = h + c),
                    l && (c += l),
                    c
                );
            }),
                (t.commaList = function (t) {
                    return t.join(", ");
                }),
                (function (t) {
                    t.format = function (t) {
                        return "$" + t.toFixed(2);
                    };
                })(s || (s = {}));
            class o {
                constructor(t) {
                    this.currency = t;
                }
                format(t) {
                    return this.currency + t.toFixed(2);
                }
            }
            const a = {};
            function r(t, e, i = GlobalsShared.locale) {
                const n = i + "-" + t,
                    r =
                        a[n] ||
                        (a[n] = (function (t, e) {
                            try {
                                return new Intl.NumberFormat(e, { style: "currency", currency: t });
                            } catch (e) {
                                return "USD" == t ? s : new o(t);
                            }
                        })(t, i));
                return r.format(e / 100);
            }
            let h;
            (t.dollars = function (t, e = GlobalsShared.locale) {
                return r("USD", t, e);
            }),
                (t.currencyAmount = r),
                (function (t) {
                    t.format = function (t) {
                        return (100 * t).toFixed(0) + "%";
                    };
                })(h || (h = {}));
            const l = {};
            t.percent = function (t, e = GlobalsShared.locale) {
                return (
                    l[e] ||
                    (l[e] = (function (t) {
                        try {
                            return new Intl.NumberFormat(t, { style: "percent", minimumFractionDigits: 0 });
                        } catch (t) {
                            return h;
                        }
                    })(e))
                ).format(t / 100);
            };
        })(n || (n = {})),
        (function (t) {
            function e(t, e) {
                return t[e];
            }
            (t.get = e),
                (t.getOrElse = function (t, i, n) {
                    var s = e(t, i);
                    return void 0 === s ? n : s;
                }),
                (t.set = function (t, e, i) {
                    return (t[e] = i);
                }),
                (t.cast = function (t) {
                    return t;
                });
        })(s || (s = {})),
        (function (t) {
            const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                i = [],
                n = new Uint8Array(256);
            for (var o = 0; o < e.length; o++) (i[o] = e.charAt(o)), (n[e.charCodeAt(o)] = o);
            function a(t, e) {
                return n[0 | t.charCodeAt(e)];
            }
            function r(t) {
                return i[63 & t];
            }
            (n["-".charCodeAt(0)] = 62),
                (n["_".charCodeAt(0)] = 63),
                (t.decode = function (t) {
                    if (t.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4. ");
                    var e,
                        i,
                        n = t.length,
                        s = "=" === t.charAt(n - 2) ? 2 : "=" === t.charAt(n - 1) ? 1 : 0,
                        o = new Uint8Array((3 * t.length) / 4 - s),
                        r = s > 0 ? t.length - 4 : t.length,
                        h = 0;
                    function l(t) {
                        o[h++] = 255 & t;
                    }
                    for (e = 0; e < r; e += 4) l((i = (a(t, e) << 18) | (a(t, e + 1) << 12) | (a(t, e + 2) << 6) | a(t, e + 3)) >> 16), l(i >> 8), l(i);
                    return 2 === s ? l((i = (a(t, e) << 2) | (a(t, e + 1) >> 4))) : 1 === s && (l((i = (a(t, e) << 10) | (a(t, e + 1) << 4) | (a(t, e + 2) >> 2)) >> 8), l(i)), o;
                }),
                (t.decodeString = function (t, e) {
                    try {
                        return atob(t);
                    } catch (t) {}
                    return e;
                }),
                (t.encode = function (t, e) {
                    if (t instanceof Uint8Array) {
                        const s = (e = e || t.length) % 3;
                        var i,
                            n = "";
                        const a = e - s;
                        for (var o = 0; o < a; o += 3) (n += r((i = (t[o] << 16) + (t[o + 1] << 8) + t[o + 2]) >> 18)), (n += r(i >> 12)), (n += r(i >> 6)), (n += r(i));
                        return 1 == s ? ((n += r((i = t[a]) >> 2)), (n += r(i << 4)), (n += "==")) : 2 == s && ((n += r((i = (t[a] << 8) + t[a + 1]) >> 10)), (n += r(i >> 4)), (n += r(i << 2)), (n += "=")), n.replace(/\!/, "!");
                    }
                    return btoa(s.cast(t));
                });
        })(o || (o = {})),
        (function (t) {
            (t.MaxMaxNumMegapixels = 1),
                (t.MaxMaxNumPixels = 1048576),
                (t.MaxOutputWidth = 1e4),
                (t.BrowserChromeUrl = "https://www.google.com/chrome/"),
                (t.BrowserFirefoxUrl = "https://www.mozilla.org/en-US/firefox/new/"),
                (t.BrowserMicrosoftEdgeUrl = "https://www.microsoft.com/en-us/edge"),
                (t.MinNumLicensesInPurchase = 1),
                (t.MaxNumLicensesInPurchase = 20);
        })(z || (z = {}));
    class j {
        constructor(t) {
            this._css = t;
        }
        css() {
            return this._css;
        }
        $(t) {
            return (!t && this._cache) || (this._cache = $(this._css));
        }
        join(t, e) {
            return new j(this._css + e + t._css);
        }
        or(t) {
            return this.join(t, ", ");
        }
        and(t) {
            return this.join(t, "");
        }
        anscestorOf(t) {
            return this.join(t, " ");
        }
        parentOf(t) {
            return this.join(t, ">");
        }
        followedBy(t) {
            return this.join(t, "~");
        }
        immediatelyFollowedBy(t) {
            return this.join(t, "+");
        }
        exists(t) {
            return this.$(t).length > 0;
        }
        addClass(t) {
            return this.$().addClass(t.name()), this;
        }
        removeClass(t) {
            return this.$().removeClass(t.name()), this;
        }
        removeClasses(...t) {
            const e = t.map((t) => t.name()).join(" ");
            return this.$().removeClass(e), this;
        }
        setClasses(...t) {
            const e = t.map((t) => t.name()).join(" ");
            return this.$().attr("class", e), this;
        }
        toggleClass(t, e) {
            return this.$().toggleClass(t.name(), e), this;
        }
        hasClass(t) {
            return this.$().hasClass(t.name());
        }
        addAttr(t) {
            return this.$().attr(t, t), this;
        }
        toggleAttr(t, e) {
            return e ? this.$().attr(t, t) : this.$().removeAttr(t), this;
        }
        removeAttr(t) {
            return this.$().removeAttr(t), this;
        }
    }
    class Z extends j {
        tag() {
            return this.css();
        }
        constructor(t) {
            super(t);
        }
    }
    class Q extends j {
        name() {
            return this._name;
        }
        constructor(t) {
            super("." + t), (this._name = t);
        }
        elements() {
            return document.querySelectorAll(this.css());
        }
    }
    class J extends j {
        name() {
            return this._name;
        }
        constructor(t) {
            super("#" + t), (this._name = t);
        }
        el() {
            return document.getElementById(this._name);
        }
    }
    class K {
        constructor(t) {
            (this.key = t), (this.caseSensitive = !0);
        }
        caseInsensitive() {
            return (this.caseSensitive = !1), this;
        }
        exists() {
            return new j("[" + this.key + "]");
        }
        build(t, e) {
            return new j("[" + this.key + t + '"' + e + '"' + (this.caseSensitive ? "" : " i") + "]");
        }
        equals(t) {
            return this.build("=", t);
        }
        containsWhitespaceSeparatedToken(t) {
            return this.build("~=", t);
        }
        equalsOrPlusDashStartsWith(t) {
            return this.build("|=", t);
        }
        startsWith(t) {
            return this.build("^=", t);
        }
        endsWidth(t) {
            return this.build("$=", t);
        }
        contains(t) {
            return this.build("*=", t);
        }
    }
    !(function (t) {
        function e(t) {
            return new K(t);
        }
        (t.empty = new j("")),
            (t.html = new j("html")),
            (t.body = new j("body")),
            (t.htmlBody = new j("html, body")),
            (t.$window = $(window)),
            (t.data = function (t) {
                return e("data-" + t);
            }),
            (t.attr = e),
            (t.id = function (t) {
                return new J(t);
            }),
            (t.c = function (t) {
                return new Q(t);
            }),
            (t.tag = function (t) {
                return new Z(t);
            });
    })(r || (r = {})),
        (function (t) {
            t.active = new Q("active");
        })(a || (a = {})),
        (function (t) {
            let e, i, n, s, o, a, r, h, l;
            (t.cannot_run_app = t.c("cannot_run_app")),
                (t.canvas_container = t.c("canvas_container")),
                (t.dark_checker = t.c("dark_checker")),
                (t.drop_ready = t.c("drop_ready")),
                (t.dropdown_auto = t.c("dropdown_auto")),
                (t.eyedropper_tool = t.c("eyedropper_tool")),
                (t.grab_closed = t.c("grab_closed")),
                (t.grab_open = t.c("grab_open")),
                (t.jsNotInitializedYet = t.c("jsNotInitializedYet")),
                (t.modern_menu = t.c("modern_menu")),
                (t.noselect = t.c("noselect")),
                (function (e) {
                    let i, n, s, o, a;
                    (e.App = t.id("App-App")),
                        (e.ModernizrAlert = t.id("App-ModernizrAlert")),
                        (e.ProgressLightbox = t.id("App-ProgressLightbox")),
                        (e.ProgressLightboxBar = t.id("App-ProgressLightboxBar")),
                        (e.RemoveBackgroundDialog = t.id("App-RemoveBackgroundDialog")),
                        (e.SaveAndExitLightbox = t.id("App-SaveAndExitLightbox")),
                        (e.SpinnerLightbox = t.id("App-SpinnerLightbox")),
                        (e.cancel_upload = t.c("App-cancel_upload")),
                        (e.exit_app = t.c("App-exit_app")),
                        (e.flex_horizontal_section = t.c("App-flex_horizontal_section")),
                        (e.force_exit = t.c("App-force_exit")),
                        (e.new_from_url_link = t.c("App-new_from_url_link")),
                        (e.resume_link = t.c("App-resume_link")),
                        (e.starter = t.c("App-starter")),
                        (e.subapp_sidebar = t.c("App-subapp_sidebar")),
                        (function (e) {
                            (e.Lightbox = t.id("App-ContextMenu-Lightbox")), (e.ToolbarSegEdit = t.id("App-ContextMenu-ToolbarSegEdit")), (e.toolbar = t.c("App-ContextMenu-toolbar"));
                        })((i = e.ContextMenu || (e.ContextMenu = {}))),
                        (function (e) {
                            (e.CanvasContainer = t.id("App-ImageView-CanvasContainer")),
                                (e.DontEditTooMuchNotification = t.id("App-ImageView-DontEditTooMuchNotification")),
                                (e.LeftCanvas = t.id("App-ImageView-LeftCanvas")),
                                (e.RightCanvas = t.id("App-ImageView-RightCanvas")),
                                (e.ShrunkNotification = t.id("App-ImageView-ShrunkNotification")),
                                (e.TransparencyNotification = t.id("App-ImageView-TransparencyNotification")),
                                (e.notification = t.c("App-ImageView-notification")),
                                (e.single_pane = t.c("App-ImageView-single_pane")),
                                (e.vertical_mode = t.c("App-ImageView-vertical_mode"));
                        })((n = e.ImageView || (e.ImageView = {}))),
                        (function (e) {
                            let i, n, s, o, a, r, h, l, c, u, d, p, m, g, f;
                            (e.BackButton = t.id("App-Sidebar-BackButton")),
                                (e.NextButton = t.id("App-Sidebar-NextButton")),
                                (e.OuterPane = t.id("App-Sidebar-OuterPane")),
                                (e.bottom_mode = t.c("App-Sidebar-bottom_mode")),
                                (e.content_pane = t.c("App-Sidebar-content_pane")),
                                (e.job_failed_message = t.c("App-Sidebar-job_failed_message")),
                                (function (e) {
                                    (e.is_recommended = t.c("App-Sidebar-BigButton-is_recommended")), (e.pane = t.c("App-Sidebar-BigButton-pane"));
                                })((i = e.BigButton || (e.BigButton = {}))),
                                (function (e) {
                                    (e.EditSegmentation = t.id("App-Sidebar-ClassificationFailed-EditSegmentation")),
                                        (e.HandPickSettings = t.id("App-Sidebar-ClassificationFailed-HandPickSettings")),
                                        (e.Pane = t.id("App-Sidebar-ClassificationFailed-Pane")),
                                        (e.Retry = t.id("App-Sidebar-ClassificationFailed-Retry"));
                                })(n || (n = {})),
                                (e.ClassificationFailed = n),
                                (function (e) {
                                    (e.EditSegmentation = t.id("App-Sidebar-FetchingSegmentationFailed-EditSegmentation")),
                                        (e.HandPickSettings = t.id("App-Sidebar-FetchingSegmentationFailed-HandPickSettings")),
                                        (e.Pane = t.id("App-Sidebar-FetchingSegmentationFailed-Pane")),
                                        (e.Retry = t.id("App-Sidebar-FetchingSegmentationFailed-Retry"));
                                })(s || (s = {})),
                                (e.FetchingSegmentationFailed = s),
                                (function (e) {
                                    (e.high = t.c("App-Sidebar-ImageComplexity-high")), (e.low = t.c("App-Sidebar-ImageComplexity-low")), (e.medium = t.c("App-Sidebar-ImageComplexity-medium"));
                                })((o = e.ImageComplexity || (e.ImageComplexity = {}))),
                                (function (e) {
                                    (e.Loupe = t.id("App-Sidebar-ImageComplexityLogo-Loupe")), (e.Pane = t.id("App-Sidebar-ImageComplexityLogo-Pane"));
                                })((a = e.ImageComplexityLogo || (e.ImageComplexityLogo = {}))),
                                (function (e) {
                                    (e.Loupe = t.id("App-Sidebar-ImageComplexityLogoAa-Loupe")), (e.Pane = t.id("App-Sidebar-ImageComplexityLogoAa-Pane"));
                                })((r = e.ImageComplexityLogoAa || (e.ImageComplexityLogoAa = {}))),
                                (function (e) {
                                    e.Pane = t.id("App-Sidebar-ImageComplexityPhoto-Pane");
                                })((h = e.ImageComplexityPhoto || (e.ImageComplexityPhoto = {}))),
                                (function (e) {
                                    (e.Logo = t.id("App-Sidebar-ImageType-Logo")),
                                        (e.LogoAA = t.id("App-Sidebar-ImageType-LogoAA")),
                                        (e.Loupe = t.id("App-Sidebar-ImageType-Loupe")),
                                        (e.Pane = t.id("App-Sidebar-ImageType-Pane")),
                                        (e.Photo = t.id("App-Sidebar-ImageType-Photo"));
                                })((l = e.ImageType || (e.ImageType = {}))),
                                (function (e) {
                                    (e.AddCustomColor = t.id("App-Sidebar-PaletteContents-AddCustomColor")),
                                        (e.CustomColor0 = t.id("App-Sidebar-PaletteContents-CustomColor0")),
                                        (e.CustomColor1 = t.id("App-Sidebar-PaletteContents-CustomColor1")),
                                        (e.CustomColor10 = t.id("App-Sidebar-PaletteContents-CustomColor10")),
                                        (e.CustomColor11 = t.id("App-Sidebar-PaletteContents-CustomColor11")),
                                        (e.CustomColor2 = t.id("App-Sidebar-PaletteContents-CustomColor2")),
                                        (e.CustomColor3 = t.id("App-Sidebar-PaletteContents-CustomColor3")),
                                        (e.CustomColor4 = t.id("App-Sidebar-PaletteContents-CustomColor4")),
                                        (e.CustomColor5 = t.id("App-Sidebar-PaletteContents-CustomColor5")),
                                        (e.CustomColor6 = t.id("App-Sidebar-PaletteContents-CustomColor6")),
                                        (e.CustomColor7 = t.id("App-Sidebar-PaletteContents-CustomColor7")),
                                        (e.CustomColor8 = t.id("App-Sidebar-PaletteContents-CustomColor8")),
                                        (e.CustomColor9 = t.id("App-Sidebar-PaletteContents-CustomColor9")),
                                        (e.CustomColorsList = t.id("App-Sidebar-PaletteContents-CustomColorsList")),
                                        (e.EyeDropper0 = t.id("App-Sidebar-PaletteContents-EyeDropper0")),
                                        (e.EyeDropper1 = t.id("App-Sidebar-PaletteContents-EyeDropper1")),
                                        (e.P10 = t.id("App-Sidebar-PaletteContents-P10")),
                                        (e.P11 = t.id("App-Sidebar-PaletteContents-P11")),
                                        (e.P12 = t.id("App-Sidebar-PaletteContents-P12")),
                                        (e.P2 = t.id("App-Sidebar-PaletteContents-P2")),
                                        (e.P3 = t.id("App-Sidebar-PaletteContents-P3")),
                                        (e.P4 = t.id("App-Sidebar-PaletteContents-P4")),
                                        (e.P5 = t.id("App-Sidebar-PaletteContents-P5")),
                                        (e.P6 = t.id("App-Sidebar-PaletteContents-P6")),
                                        (e.P7 = t.id("App-Sidebar-PaletteContents-P7")),
                                        (e.P8 = t.id("App-Sidebar-PaletteContents-P8")),
                                        (e.P9 = t.id("App-Sidebar-PaletteContents-P9")),
                                        (e.Pane = t.id("App-Sidebar-PaletteContents-Pane")),
                                        (e.can_delete = t.c("App-Sidebar-PaletteContents-can_delete")),
                                        (e.custom_colors_item = t.c("App-Sidebar-PaletteContents-custom_colors_item")),
                                        (e.custom_swatch = t.c("App-Sidebar-PaletteContents-custom_swatch")),
                                        (e.delete_color = t.c("App-Sidebar-PaletteContents-delete_color")),
                                        (e.eye_dropper_swatch = t.c("App-Sidebar-PaletteContents-eye_dropper_swatch")),
                                        (e.recommended_palette = t.c("App-Sidebar-PaletteContents-recommended_palette")),
                                        (e.suggested_palettes_item = t.c("App-Sidebar-PaletteContents-suggested_palettes_item")),
                                        (e.suggested_swatch = t.c("App-Sidebar-PaletteContents-suggested_swatch"));
                                })((c = e.PaletteContents || (e.PaletteContents = {}))),
                                (function (e) {
                                    (e.CustomColors = t.id("App-Sidebar-PaletteYesNo-CustomColors")), (e.Pane = t.id("App-Sidebar-PaletteYesNo-Pane")), (e.UnlimitedColors = t.id("App-Sidebar-PaletteYesNo-UnlimitedColors"));
                                })((u = e.PaletteYesNo || (e.PaletteYesNo = {}))),
                                (function (e) {
                                    let i, n, s;
                                    (e.FullyAutomaticContainer = t.id("App-Sidebar-Progress-FullyAutomaticContainer")),
                                        (e.Pane = t.id("App-Sidebar-Progress-Pane")),
                                        (e.bar = t.c("App-Sidebar-Progress-bar")),
                                        (e.progress = t.c("App-Sidebar-Progress-progress")),
                                        (function (e) {
                                            (e.Bar = t.id("App-Sidebar-Progress-Classify-Bar")), (e.Pane = t.id("App-Sidebar-Progress-Classify-Pane"));
                                        })(i || (i = {})),
                                        (e.Classify = i),
                                        (function (e) {
                                            (e.Bar = t.id("App-Sidebar-Progress-Upload-Bar")), (e.Pane = t.id("App-Sidebar-Progress-Upload-Pane"));
                                        })(n || (n = {})),
                                        (e.Upload = n),
                                        (function (e) {
                                            (e.Bar = t.id("App-Sidebar-Progress-Vectorize-Bar")), (e.Pane = t.id("App-Sidebar-Progress-Vectorize-Pane"));
                                        })(s || (s = {})),
                                        (e.Vectorize = s);
                                })((d = e.Progress || (e.Progress = {}))),
                                (function (e) {
                                    (e.ChangeCustomPaletteContainer = t.id("App-Sidebar-ReviewResult-ChangeCustomPaletteContainer")),
                                        (e.CustomColors = t.id("App-Sidebar-ReviewResult-CustomColors")),
                                        (e.CustomPaletteContainer = t.id("App-Sidebar-ReviewResult-CustomPaletteContainer")),
                                        (e.DetailHigh = t.id("App-Sidebar-ReviewResult-DetailHigh")),
                                        (e.DetailLow = t.id("App-Sidebar-ReviewResult-DetailLow")),
                                        (e.DetailMedium = t.id("App-Sidebar-ReviewResult-DetailMedium")),
                                        (e.Download = t.id("App-Sidebar-ReviewResult-Download")),
                                        (e.EditResult = t.id("App-Sidebar-ReviewResult-EditResult")),
                                        (e.HandPickSettings = t.id("App-Sidebar-ReviewResult-HandPickSettings")),
                                        (e.JaggedEdgesContainer = t.id("App-Sidebar-ReviewResult-JaggedEdgesContainer")),
                                        (e.Pane = t.id("App-Sidebar-ReviewResult-Pane")),
                                        (e.ProcessAsLogoAaWithCustomColorsButton = t.id("App-Sidebar-ReviewResult-ProcessAsLogoAaWithCustomColorsButton")),
                                        (e.RemoveBackground = t.id("App-Sidebar-ReviewResult-RemoveBackground")),
                                        (e.ScanOrDrawingContainer = t.id("App-Sidebar-ReviewResult-ScanOrDrawingContainer")),
                                        (e.SpotsBetweenEdgesContainer = t.id("App-Sidebar-ReviewResult-SpotsBetweenEdgesContainer")),
                                        (e.UnlimitedColors = t.id("App-Sidebar-ReviewResult-UnlimitedColors")),
                                        (e.WithBlendingButton = t.id("App-Sidebar-ReviewResult-WithBlendingButton")),
                                        (e.WithoutBlendingButton = t.id("App-Sidebar-ReviewResult-WithoutBlendingButton")),
                                        (e.custom_colors = t.c("App-Sidebar-ReviewResult-custom_colors")),
                                        (e.custom_palette_swatch = t.c("App-Sidebar-ReviewResult-custom_palette_swatch")),
                                        (e.detail_button = t.c("App-Sidebar-ReviewResult-detail_button")),
                                        (e.palette_button = t.c("App-Sidebar-ReviewResult-palette_button"));
                                })((p = e.ReviewResult || (e.ReviewResult = {}))),
                                (function (e) {
                                    e.Pane = t.id("App-Sidebar-SegEdit-Pane");
                                })((m = e.SegEdit || (e.SegEdit = {}))),
                                (function (e) {
                                    e.Pane = t.id("App-Sidebar-StateMachineBug-Pane");
                                })((g = e.StateMachineBug || (e.StateMachineBug = {}))),
                                (function (e) {
                                    (e.EditSegmentation = t.id("App-Sidebar-VectorizationFailed-EditSegmentation")),
                                        (e.HandPickSettings = t.id("App-Sidebar-VectorizationFailed-HandPickSettings")),
                                        (e.Pane = t.id("App-Sidebar-VectorizationFailed-Pane")),
                                        (e.Retry = t.id("App-Sidebar-VectorizationFailed-Retry"));
                                })(f || (f = {})),
                                (e.VectorizationFailed = f);
                        })((s = e.Sidebar || (e.Sidebar = {}))),
                        (function (e) {
                            (e.Lightbox = t.id("App-StickySettings-Lightbox")),
                                (e.fully_automatic = t.c("App-StickySettings-fully_automatic")),
                                (e.pre_crop_enabled_checkbox = t.c("App-StickySettings-pre_crop_enabled_checkbox")),
                                (e.show = t.c("App-StickySettings-show"));
                        })((o = e.StickySettings || (e.StickySettings = {}))),
                        (function (e) {
                            (e.ColorPicker = t.id("App-Toolbar-ColorPicker")),
                                (e.ColorSwatch0 = t.id("App-Toolbar-ColorSwatch0")),
                                (e.ColorSwatch1 = t.id("App-Toolbar-ColorSwatch1")),
                                (e.Exit = t.id("App-Toolbar-Exit")),
                                (e.Fill = t.id("App-Toolbar-Fill")),
                                (e.Finder = t.id("App-Toolbar-Finder")),
                                (e.NumPanesGroup = t.id("App-Toolbar-NumPanesGroup")),
                                (e.Pan = t.id("App-Toolbar-Pan")),
                                (e.Pixel = t.id("App-Toolbar-Pixel")),
                                (e.Redo = t.id("App-Toolbar-Redo")),
                                (e.Reset = t.id("App-Toolbar-Reset")),
                                (e.ResultReview = t.id("App-Toolbar-ResultReview")),
                                (e.Revert = t.id("App-Toolbar-Revert")),
                                (e.RevertMenu = t.id("App-Toolbar-RevertMenu")),
                                (e.SegEditViewBitmap = t.id("App-Toolbar-SegEditViewBitmap")),
                                (e.SegEditViewVector = t.id("App-Toolbar-SegEditViewVector")),
                                (e.SegEditor = t.id("App-Toolbar-SegEditor")),
                                (e.Undo = t.id("App-Toolbar-Undo")),
                                (e.ViewBitmap = t.id("App-Toolbar-ViewBitmap")),
                                (e.ViewSingle = t.id("App-Toolbar-ViewSingle")),
                                (e.ViewSplit = t.id("App-Toolbar-ViewSplit")),
                                (e.Zap = t.id("App-Toolbar-Zap")),
                                (e.Zoom1To1 = t.id("App-Toolbar-Zoom1To1")),
                                (e.ZoomIn = t.id("App-Toolbar-ZoomIn")),
                                (e.ZoomOut = t.id("App-Toolbar-ZoomOut")),
                                (e.ZoomToFit = t.id("App-Toolbar-ZoomToFit")),
                                (e.fill_tool = t.c("App-Toolbar-fill_tool")),
                                (e.pixel_tool = t.c("App-Toolbar-pixel_tool")),
                                (e.revert_link = t.c("App-Toolbar-revert_link")),
                                (e.revert_swatch = t.c("App-Toolbar-revert_swatch")),
                                (e.tool_button = t.c("App-Toolbar-tool_button")),
                                (e.zap_tool = t.c("App-Toolbar-zap_tool"));
                        })((a = e.Toolbar || (e.Toolbar = {})));
                })((e = t.App || (t.App = {}))),
                (function (e) {
                    (e.Dialog = t.id("FatalError-Dialog")), (e.Message = t.id("FatalError-Message"));
                })((i = t.FatalError || (t.FatalError = {}))),
                (function (e) {
                    let i;
                    (e.Field = t.id("FileInput-Field")),
                        (e.PasteTarget = t.id("FileInput-PasteTarget")),
                        (e.click_to_upload = t.c("FileInput-click_to_upload")),
                        (function (e) {
                            (e.Dialog = t.id("FileInput-UploadFromWeb-Dialog")),
                                (e.DialogButton = t.id("FileInput-UploadFromWeb-DialogButton")),
                                (e.DialogInput = t.id("FileInput-UploadFromWeb-DialogInput")),
                                (e.MainButton = t.id("FileInput-UploadFromWeb-MainButton")),
                                (e.MainInput = t.id("FileInput-UploadFromWeb-MainInput")),
                                (e.show_dialog = t.c("FileInput-UploadFromWeb-show_dialog"));
                        })((i = e.UploadFromWeb || (e.UploadFromWeb = {})));
                })((n = t.FileInput || (t.FileInput = {}))),
                (function (e) {
                    (e.Id = t.id("Hurricane-Id")),
                        (e.Labels = t.id("Hurricane-Labels")),
                        (e.Line = t.id("Hurricane-Line")),
                        (e.Outlines = t.id("Hurricane-Outlines")),
                        (e.Shapes = t.id("Hurricane-Shapes")),
                        (e.transformable = t.c("Hurricane-transformable"));
                })(s || (s = {})),
                (t.Hurricane = s),
                (function (e) {
                    let i;
                    (e.App = t.id("PreCrop-App")),
                        (e.ViewContainer = t.id("PreCrop-ViewContainer")),
                        (function (e) {
                            let i;
                            (e.cancel_button = t.c("PreCrop-Sidebar-cancel_button")),
                                (e.crop_button = t.c("PreCrop-Sidebar-crop_button")),
                                (e.cropped_image_aspect_ratio_display = t.c("PreCrop-Sidebar-cropped_image_aspect_ratio_display")),
                                (e.cropped_image_megapixels_display = t.c("PreCrop-Sidebar-cropped_image_megapixels_display")),
                                (e.cropped_image_size_display = t.c("PreCrop-Sidebar-cropped_image_size_display")),
                                (e.cropped_image_success = t.c("PreCrop-Sidebar-cropped_image_success")),
                                (e.cropped_image_warning = t.c("PreCrop-Sidebar-cropped_image_warning")),
                                (e.input_image_aspect_ratio_display = t.c("PreCrop-Sidebar-input_image_aspect_ratio_display")),
                                (e.input_image_megapixels_display = t.c("PreCrop-Sidebar-input_image_megapixels_display")),
                                (e.input_image_size_display = t.c("PreCrop-Sidebar-input_image_size_display")),
                                (e.lock_aspect_ratio_button = t.c("PreCrop-Sidebar-lock_aspect_ratio_button")),
                                (function (e) {
                                    (e.container = t.c("PreCrop-Sidebar-MaxNumMegapixels-container")),
                                        (e.decrease = t.c("PreCrop-Sidebar-MaxNumMegapixels-decrease")),
                                        (e.display = t.c("PreCrop-Sidebar-MaxNumMegapixels-display")),
                                        (e.increase = t.c("PreCrop-Sidebar-MaxNumMegapixels-increase")),
                                        (e.reset = t.c("PreCrop-Sidebar-MaxNumMegapixels-reset"));
                                })(i || (i = {})),
                                (e.MaxNumMegapixels = i);
                        })((i = e.Sidebar || (e.Sidebar = {})));
                })((o = t.PreCrop || (t.PreCrop = {}))),
                (function (e) {
                    (e.NumLicenses = t.id("ProjectMerchant-NumLicenses")), (e.Total = t.id("ProjectMerchant-Total")), (e.VmdeTotal = t.id("ProjectMerchant-VmdeTotal"));
                })((a = t.ProjectMerchant || (t.ProjectMerchant = {}))),
                (function (e) {
                    (e.Body = t.id("RetryDialog-Body")), (e.Countdown = t.id("RetryDialog-Countdown")), (e.Dialog = t.id("RetryDialog-Dialog")), (e.RetryNowButton = t.id("RetryDialog-RetryNowButton"));
                })((r = t.RetryDialog || (t.RetryDialog = {}))),
                (function (e) {
                    (e.Dialog = t.id("Signon-Dialog")),
                        (e.Header = t.id("Signon-Header")),
                        (e.IframeContainer = t.id("Signon-IframeContainer")),
                        (e.LoadingIndicator = t.id("Signon-LoadingIndicator")),
                        (e.preload = t.c("Signon-preload")),
                        (e.trigger = t.c("Signon-trigger"));
                })((h = t.Signon || (t.Signon = {}))),
                (function (e) {
                    (e.AcceptTerms = t.id("merchant-AcceptTerms")),
                        (e.AcceptTermsWrapper = t.id("merchant-AcceptTermsWrapper")),
                        (e.BraintreeDropinContainer = t.id("merchant-BraintreeDropinContainer")),
                        (e.Cents = t.id("merchant-Cents")),
                        (e.CreditCardProcessorForm = t.id("merchant-CreditCardProcessorForm")),
                        (e.DefaultPaymentMethod = t.id("merchant-DefaultPaymentMethod")),
                        (e.FailedToLoadPaymentBackendJs = t.id("merchant-FailedToLoadPaymentBackendJs")),
                        (e.InitializingIndicator = t.id("merchant-InitializingIndicator")),
                        (e.PaymentError = t.id("merchant-PaymentError")),
                        (e.PaymentForm = t.id("merchant-PaymentForm")),
                        (e.PaymentMethodForm = t.id("merchant-PaymentMethodForm")),
                        (e.PaymentMethodFormSubmit = t.id("merchant-PaymentMethodFormSubmit")),
                        (e.RadioBraintree = t.id("paymentMethod_braintree")),
                        (e.RadioStripe = t.id("paymentMethod_stripe")),
                        (e.ShowWhenCreatingPm = t.id("merchant-ShowWhenCreatingPm")),
                        (e.ShowWhenMinibrowsing = t.id("merchant-ShowWhenMinibrowsing")),
                        (e.ShowWhenSubmitting = t.id("merchant-ShowWhenSubmitting")),
                        (e.StreamlexPaymentToken = t.id("merchant-StreamlexPaymentToken")),
                        (e.StripeCardElement = t.id("merchant-StripeCardElement")),
                        (e.StripeCardErrors = t.id("merchant-StripeCardErrors")),
                        (e.StripeNameElement = t.id("merchant-StripeNameElement")),
                        (e.StripeNameErrors = t.id("merchant-StripeNameErrors")),
                        (e.StripePaymentError = t.id("merchant-StripePaymentError")),
                        (e.SubmitSection = t.id("merchant-SubmitSection")),
                        (e.TaxLocationPostalCode = t.id("merchant-TaxLocationPostalCode")),
                        (e.TaxPostalCode = t.id("merchant-TaxPostalCode")),
                        (e.TaxPostalCodeFormGroup = t.id("merchant-TaxPostalCodeFormGroup")),
                        (e.TaxSection = t.id("merchant-TaxSection")),
                        (e.has_error = t.c("has-error")),
                        (e.radio_paymentMethod = t.c("radio_paymentMethod"));
                })((l = t.merchant || (t.merchant = {})));
        })(r || (r = {})),
        (function (t) {
            const e = [0];
            function i(t, e) {
                return t.toFixed(e).replace(/\.?0+$/, "");
            }
            function n(t, e) {
                "use strict";
                if (null == t) throw new TypeError("can't convert " + t + " to object");
                if (((e = +e) != e && (e = 0), e < 0)) throw new RangeError("repeat count must be non-negative");
                if (e == 1 / 0) throw new RangeError("repeat count must be less than infinity");
                if (((e = Math.floor(e)), 0 == t.length || 0 == e)) return "";
                if (t.length * e >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");
                for (var i = "", n = 0; n < e; n++) i += t;
                return i;
            }
            function a(t, e) {
                return ((t % e) + e) % e;
            }
            function r(t, e) {
                return ((t % e) - e) % e;
            }
            function h(t) {
                if (!t) return null;
                const e = t.match(/data:(.*?)(;base64)?,(.*)/);
                if (!e) return null;
                const i = e[1] || "text/plain",
                    n = !!e[2],
                    s = decodeURIComponent(e[3].trim());
                if (n) {
                    const t = o.decode(s);
                    let e = new Blob([t], { type: i });
                    return e.size != t.length && (e = new Blob([t.buffer], { type: i })), e;
                }
                return new Blob([s], { type: i });
            }
            function l(t, e, i) {
                const n = t;
                return (n.name = e), s.set(n, "lastModifiedDate", i || Date.now()), s.cast(n);
            }
            (t.tic = function () {
                e.push(Date.now());
            }),
                (t.toc = function (t) {
                    Date.now(), e.pop();
                }),
                (t.toFixed = i),
                (t.formatAspectRatio = function (t) {
                    return i(t.w, 3) + ":" + i(t.h, 3);
                }),
                (t.hex = function (t, e) {
                    return ("000000000" + t.toString(16)).substr(-e);
                }),
                (t.fuzzyAspectRatioEx = function (t, e) {
                    for (var i = t.w / t.h, n = 0; n < e.length; n++) {
                        var s = e[n],
                            o = s.w / s.h;
                        if (Math.abs((i - o) / o) < 0.01) return s;
                    }
                    return t.w > t.h ? { w: t.w / t.h, h: 1 } : { w: 1, h: t.h / t.w };
                }),
                (t.roundTo = function (t, e) {
                    return parseFloat(t.toFixed(e));
                }),
                (t.empty = function () {}),
                (t.sign = function (t) {
                    return 0 == t ? 0 : t > 0 ? 1 : -1;
                }),
                (t.clamp = function (t, e, i) {
                    return Math.max(e, Math.min(t, i));
                }),
                (t.log10 = function (t) {
                    return Math.log(t) / Math.LN10;
                }),
                (t.parseIntWithAlt = function (t, e, i) {
                    const n = parseInt(t, e);
                    return isNaN(n) ? i : n;
                }),
                (t.padStart = function (t, e, i) {
                    return (e >>= 0), (i = String(void 0 !== i ? i : " ")), t.length > e ? String(t) : ((e -= t.length) > i.length && (i += n(i, e / i.length)), i.slice(0, e) + String(t));
                }),
                (t.repeat = n),
                (t.posMod = a),
                (t.negMod = r),
                (t.minMod = function (t, e) {
                    var i = a(t, e),
                        n = r(t, e);
                    return Math.abs(i) <= Math.abs(n) ? i : n;
                }),
                (t.startsWith = function (t, e) {
                    return 0 == t.lastIndexOf(e, 0);
                }),
                (t.endsWith = function (t, e) {
                    return t.indexOf(e, t.length - e.length) >= 0;
                }),
                (t.blobToArrayBuffer = function (t, e, i) {
                    var n = new FileReader();
                    (n.onerror = n.onabort = i),
                        (n.onloadend = function (t) {
                            e(s.cast(n.result));
                        }),
                        n.readAsArrayBuffer(t);
                }),
                (t.blobToString = function (t, e, i) {
                    var n = new FileReader();
                    (n.onerror = n.onabort = i),
                        (n.onloadend = function (t) {
                            e(s.cast(n.result));
                        }),
                        n.readAsText(t);
                }),
                (t.dataUrlToBlob = h),
                (t.dataUrlToFile = function (t, e) {
                    return l(h(t), e);
                }),
                (t.blobToFile = l),
                (t.svgStringToDataUrl = function (t) {
                    return "data:image/svg+xml;base64," + btoa(t);
                }),
                (t.toDataUrl = function (t, e) {
                    return "data:" + e + ";base64," + o.encode(t);
                }),
                (t.min = function (t) {
                    return Math.min.apply(null, t);
                }),
                (t.max = function (t) {
                    return Math.max.apply(null, t);
                }),
                (t.minBy = function (t, e) {
                    if (0 != t.length) {
                        let i = 0,
                            n = t[0],
                            s = e(n);
                        for (let o = 1; o < t.length; o++) {
                            let a = t[o],
                                r = e(a);
                            r < s && ((n = a), (s = r), (i = o));
                        }
                        return { min: n, value: s, index: i };
                    }
                }),
                (t.maxBy = function (t, e) {
                    if (0 != t.length) {
                        let i = 0,
                            n = t[0],
                            s = e(n);
                        for (let o = 1; o < t.length; o++) {
                            let a = t[o],
                                r = e(a);
                            r > s && ((n = a), (s = r), (i = o));
                        }
                        return { max: n, value: s, index: i };
                    }
                }),
                (t.signedNumber = function (t) {
                    return 0 == t ? "0" : t > 0 ? "+" + t : "" + t;
                }),
                (t.splitExtensionFromFilename = function (t) {
                    let e = t.lastIndexOf(".");
                    return e >= 0 ? { base: t.substr(0, e), extension: t.substr(e + 1) } : { base: t, extension: "" };
                }),
                (t.dropExtension = function (t) {
                    let e = t.lastIndexOf(".");
                    return e >= 0 ? t.substr(0, e) : t;
                }),
                (t.getExtensionWithDot = function (t) {
                    let e = t.lastIndexOf(".");
                    return e >= 0 ? t.substr(e) : "";
                }),
                (t.getExtensionNoDot = function (t) {
                    let e = t.lastIndexOf(".");
                    return e >= 0 ? t.substr(e + 1) : "";
                }),
                (t.parsePx = function (t) {
                    try {
                        return parseInt(t);
                    } catch (t) {
                        return 0;
                    }
                }),
                (t.colorBytesToRgbaCss = function (t) {
                    return "rgba(" + t.join(",") + ")";
                }),
                (t.colorBytesToAbgr32 = function (t) {
                    return (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0];
                }),
                (t.colorBytesToRgba32 = function (t) {
                    return (t[0] << 24) | (t[1] << 16) | (t[2] << 8) | t[3];
                }),
                (t.spliterate = function (t, e, i) {
                    for (var n, s = 0; (n = t.indexOf(e, s)) >= 0; ) i(t.substring(s, n)), (s = n + e.length);
                    s < t.length - 1 && i(t.substring(s, t.length));
                }),
                (t.stringify = function (t) {
                    if (void 0 === t) return "undefined";
                    if (null == t) return "null";
                    if (t.hasOwnProperty("message")) return t.message || "[No message]";
                    if ("string" == typeof t) return t;
                    try {
                        return JSON.stringify(t);
                    } catch (e) {
                        return t.toString();
                    }
                }),
                (t.join16 = function (t, e) {
                    return t.map((t) => (0 | t).toString(16)).join(e);
                }),
                (t.uint8ArrayToString = function (t) {
                    for (var e = "", i = 0; i < t.byteLength; i++) e += String.fromCharCode(t[i]);
                    return e;
                }),
                (t.randomInt = function (t) {
                    return Math.floor(Math.random() * t);
                }),
                (t.randomInt2 = function (t, e) {
                    return Math.floor(Math.random() * (e - t) + t);
                }),
                (t.centerElide = function (t, e) {
                    if (t && t.length >= e) {
                        let i = Math.floor((e - 4) / 2);
                        return t.substring(0, i) + "..." + t.substring(t.length - i);
                    }
                    return t;
                }),
                (t.elide = function (t, e) {
                    return t && t.length >= e ? t.substring(0, e - 3) + "..." : t;
                }),
                (t.sqr = function (t) {
                    return t * t;
                }),
                (t.cube = function (t) {
                    return t * t * t;
                }),
                (t.safeDiv = function (t, e, i = 0) {
                    return 0 == e ? i : t / e;
                }),
                (t.find = function (t, e) {
                    for (var i = 0; i < t.length; i++) if (e(t[i])) return t[i];
                    return null;
                });
        })(f || (f = {}));
    class tt {
        constructor(t) {
            (this.data = new Uint8Array(t)), (this.offsetCount = 0);
        }
        length() {
            return this.data.length;
        }
        hasMore() {
            return this.offsetCount < this.data.length;
        }
        skip(t) {
            this.offsetCount += t;
        }
        nonEmpty() {
            return this.data.length > 0;
        }
        readInt8() {
            return this.data[this.offsetCount++];
        }
        readInt8s(t) {
            var e = this.data.slice(this.offsetCount, this.offsetCount + t);
            return (this.offsetCount += t), e;
        }
        readInt16() {
            return 256 * this.data[this.offsetCount++] + this.data[this.offsetCount++];
        }
        readInt24() {
            return 256 * this.data[this.offsetCount++] * 256 + 256 * this.data[this.offsetCount++] + this.data[this.offsetCount++];
        }
        readInt32() {
            return 256 * this.data[this.offsetCount++] * 256 * 256 + 256 * this.data[this.offsetCount++] * 256 + 256 * this.data[this.offsetCount++] + this.data[this.offsetCount++];
        }
        readSignedInt16() {
            var t = this.readInt16();
            return t >= 32768 && (t -= 65536), t;
        }
    }
    !(function (t) {
        const e = {
                36864: "ExifVersion",
                40960: "FlashpixVersion",
                40961: "ColorSpace",
                40962: "PixelXDimension",
                40963: "PixelYDimension",
                37121: "ComponentsConfiguration",
                37122: "CompressedBitsPerPixel",
                37500: "MakerNote",
                37510: "UserComment",
                40964: "RelatedSoundFile",
                36867: "DateTimeOriginal",
                36868: "DateTimeDigitized",
                37520: "SubsecTime",
                37521: "SubsecTimeOriginal",
                37522: "SubsecTimeDigitized",
                33434: "ExposureTime",
                33437: "FNumber",
                34850: "ExposureProgram",
                34852: "SpectralSensitivity",
                34855: "ISOSpeedRatings",
                34856: "OECF",
                37377: "ShutterSpeedValue",
                37378: "ApertureValue",
                37379: "BrightnessValue",
                37380: "ExposureBias",
                37381: "MaxApertureValue",
                37382: "SubjectDistance",
                37383: "MeteringMode",
                37384: "LightSource",
                37385: "Flash",
                37396: "SubjectArea",
                37386: "FocalLength",
                41483: "FlashEnergy",
                41484: "SpatialFrequencyResponse",
                41486: "FocalPlaneXResolution",
                41487: "FocalPlaneYResolution",
                41488: "FocalPlaneResolutionUnit",
                41492: "SubjectLocation",
                41493: "ExposureIndex",
                41495: "SensingMethod",
                41728: "FileSource",
                41729: "SceneType",
                41730: "CFAPattern",
                41985: "CustomRendered",
                41986: "ExposureMode",
                41987: "WhiteBalance",
                41988: "DigitalZoomRation",
                41989: "FocalLengthIn35mmFilm",
                41990: "SceneCaptureType",
                41991: "GainControl",
                41992: "Contrast",
                41993: "Saturation",
                41994: "Sharpness",
                41995: "DeviceSettingDescription",
                41996: "SubjectDistanceRange",
                40965: "InteroperabilityIFDPointer",
                42016: "ImageUniqueID",
            },
            i = {
                256: "ImageWidth",
                257: "ImageHeight",
                34665: "ExifIFDPointer",
                34853: "GPSInfoIFDPointer",
                40965: "InteroperabilityIFDPointer",
                258: "BitsPerSample",
                259: "Compression",
                262: "PhotometricInterpretation",
                274: "Orientation",
                277: "SamplesPerPixel",
                284: "PlanarConfiguration",
                530: "YCbCrSubSampling",
                531: "YCbCrPositioning",
                282: "XResolution",
                283: "YResolution",
                296: "ResolutionUnit",
                273: "StripOffsets",
                278: "RowsPerStrip",
                279: "StripByteCounts",
                513: "JPEGInterchangeFormat",
                514: "JPEGInterchangeFormatLength",
                301: "TransferFunction",
                318: "WhitePoint",
                319: "PrimaryChromaticities",
                529: "YCbCrCoefficients",
                532: "ReferenceBlackWhite",
                306: "DateTime",
                270: "ImageDescription",
                271: "Make",
                272: "Model",
                305: "Software",
                315: "Artist",
                33432: "Copyright",
            },
            n = {
                0: "GPSVersionID",
                1: "GPSLatitudeRef",
                2: "GPSLatitude",
                3: "GPSLongitudeRef",
                4: "GPSLongitude",
                5: "GPSAltitudeRef",
                6: "GPSAltitude",
                7: "GPSTimeStamp",
                8: "GPSSatellites",
                9: "GPSStatus",
                10: "GPSMeasureMode",
                11: "GPSDOP",
                12: "GPSSpeedRef",
                13: "GPSSpeed",
                14: "GPSTrackRef",
                15: "GPSTrack",
                16: "GPSImgDirectionRef",
                17: "GPSImgDirection",
                18: "GPSMapDatum",
                19: "GPSDestLatitudeRef",
                20: "GPSDestLatitude",
                21: "GPSDestLongitudeRef",
                22: "GPSDestLongitude",
                23: "GPSDestBearingRef",
                24: "GPSDestBearing",
                25: "GPSDestDistanceRef",
                26: "GPSDestDistance",
                27: "GPSProcessingMethod",
                28: "GPSAreaInformation",
                29: "GPSDateStamp",
                30: "GPSDifferential",
            },
            s = {
                ExposureProgram: { 0: "Not defined", 1: "Manual", 2: "Normal program", 3: "Aperture priority", 4: "Shutter priority", 5: "Creative program", 6: "Action program", 7: "Portrait mode", 8: "Landscape mode" },
                MeteringMode: { 0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other" },
                LightSource: {
                    0: "Unknown",
                    1: "Daylight",
                    2: "Fluorescent",
                    3: "Tungsten (incandescent light)",
                    4: "Flash",
                    9: "Fine weather",
                    10: "Cloudy weather",
                    11: "Shade",
                    12: "Daylight fluorescent (D 5700 - 7100K)",
                    13: "Day white fluorescent (N 4600 - 5400K)",
                    14: "Cool white fluorescent (W 3900 - 4500K)",
                    15: "White fluorescent (WW 3200 - 3700K)",
                    17: "Standard light A",
                    18: "Standard light B",
                    19: "Standard light C",
                    20: "D55",
                    21: "D65",
                    22: "D75",
                    23: "D50",
                    24: "ISO studio tungsten",
                    255: "Other",
                },
                Flash: {
                    0: "Flash did not fire",
                    1: "Flash fired",
                    5: "Strobe return light not detected",
                    7: "Strobe return light detected",
                    9: "Flash fired, compulsory flash mode",
                    13: "Flash fired, compulsory flash mode, return light not detected",
                    15: "Flash fired, compulsory flash mode, return light detected",
                    16: "Flash did not fire, compulsory flash mode",
                    24: "Flash did not fire, auto mode",
                    25: "Flash fired, auto mode",
                    29: "Flash fired, auto mode, return light not detected",
                    31: "Flash fired, auto mode, return light detected",
                    32: "No flash function",
                    65: "Flash fired, red-eye reduction mode",
                    69: "Flash fired, red-eye reduction mode, return light not detected",
                    71: "Flash fired, red-eye reduction mode, return light detected",
                    73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                    77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                    79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                    89: "Flash fired, auto mode, red-eye reduction mode",
                    93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                    95: "Flash fired, auto mode, return light detected, red-eye reduction mode",
                },
                SensingMethod: {
                    1: "Not defined",
                    2: "One-chip color area sensor",
                    3: "Two-chip color area sensor",
                    4: "Three-chip color area sensor",
                    5: "Color sequential area sensor",
                    7: "Trilinear sensor",
                    8: "Color sequential linear sensor",
                },
                SceneCaptureType: { 0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene" },
                SceneType: { 1: "Directly photographed" },
                CustomRendered: { 0: "Normal process", 1: "Custom process" },
                WhiteBalance: { 0: "Auto white balance", 1: "Manual white balance" },
                GainControl: { 0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down" },
                Contrast: { 0: "Normal", 1: "Soft", 2: "Hard" },
                Saturation: { 0: "Normal", 1: "Low saturation", 2: "High saturation" },
                Sharpness: { 0: "Normal", 1: "Soft", 2: "Hard" },
                SubjectDistanceRange: { 0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view" },
                FileSource: { 3: "DSC" },
                Components: { 0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B" },
            };
        const o = { 120: "caption", 110: "credit", 25: "keywords", 55: "dateCreated", 80: "byline", 85: "bylineTitle", 122: "captionWriter", 105: "headline", 116: "copyright", 15: "category" };
        function a(t, e, i) {
            for (var n, s, a, r, h = new DataView(t), c = {}, u = e; u < e + i; )
                28 === h.getUint8(u) &&
                    2 === h.getUint8(u + 1) &&
                    (r = h.getUint8(u + 2)) in o &&
                    ((a = h.getInt16(u + 3)) + 5, (s = o[r]), (n = l(h, u + 5, a)), c.hasOwnProperty(s) ? (c[s] instanceof Array ? c[s].push(n) : (c[s] = [c[s], n])) : (c[s] = n)),
                    u++;
            return c;
        }
        function r(t, e, i, n, s) {
            var o,
                a,
                r = t.getUint16(i, !s),
                l = {};
            for (a = 0; a < r; a++) (o = i + 12 * a + 2), (l[n[t.getUint16(o, !s)]] = h(t, o, e, i, s));
            return l;
        }
        function h(t, e, i, n, s) {
            var o,
                a,
                r,
                h,
                c,
                u,
                d = t.getUint16(e + 2, !s),
                p = t.getUint32(e + 4, !s),
                m = t.getUint32(e + 8, !s) + i;
            switch (d) {
                case 1:
                case 7:
                    if (1 == p) return t.getUint8(e + 8);
                    for (o = p > 4 ? m : e + 8, a = [], h = 0; h < p; h++) a[h] = t.getUint8(o + h);
                    return a;
                case 2:
                    return l(t, (o = p > 4 ? m : e + 8), p - 1);
                case 3:
                    if (1 == p) return t.getUint16(e + 8, !s);
                    for (o = p > 2 ? m : e + 8, a = [], h = 0; h < p; h++) a[h] = t.getUint16(o + 2 * h, !s);
                    return a;
                case 4:
                    if (1 == p) return t.getUint32(e + 8, !s);
                    for (a = [], h = 0; h < p; h++) a[h] = t.getUint32(m + 4 * h, !s);
                    return a;
                case 5:
                    if (1 == p) return (c = t.getUint32(m, !s)), (u = t.getUint32(m + 4, !s)), ((r = new Number(c / u)).numerator = c), (r.denominator = u), r;
                    for (a = [], h = 0; h < p; h++) (c = t.getUint32(m + 8 * h, !s)), (u = t.getUint32(m + 4 + 8 * h, !s)), (a[h] = new Number(c / u)), (a[h].numerator = c), (a[h].denominator = u);
                    return a;
                case 9:
                    if (1 == p) return t.getInt32(e + 8, !s);
                    for (a = [], h = 0; h < p; h++) a[h] = t.getInt32(m + 4 * h, !s);
                    return a;
                case 10:
                    if (1 == p) return t.getInt32(m, !s) / t.getInt32(m + 4, !s);
                    for (a = [], h = 0; h < p; h++) a[h] = t.getInt32(m + 8 * h, !s) / t.getInt32(m + 4 + 8 * h, !s);
                    return a;
            }
        }
        function l(t, e, i) {
            for (var n = "", s = e; s < e + i; s++) n += String.fromCharCode(t.getUint8(s));
            return n;
        }
        function c(t, o, a) {
            if ("Exif" != l(t, o, 4)) return !1;
            var h,
                c,
                u,
                d,
                p,
                m = o + 6;
            if (18761 == t.getUint16(m)) h = !1;
            else {
                if (19789 != t.getUint16(m)) return !1;
                h = !0;
            }
            if (42 != t.getUint16(m + 2, !h)) return !1;
            var g = t.getUint32(m + 4, !h);
            if (g < 8) return !1;
            if ((c = r(t, m, m + g, i, h)).ExifIFDPointer)
                for (u in (d = r(t, m, m + c.ExifIFDPointer, e, h))) {
                    switch (u) {
                        case "LightSource":
                        case "Flash":
                        case "MeteringMode":
                        case "ExposureProgram":
                        case "SensingMethod":
                        case "SceneCaptureType":
                        case "SceneType":
                        case "CustomRendered":
                        case "WhiteBalance":
                        case "GainControl":
                        case "Contrast":
                        case "Saturation":
                        case "Sharpness":
                        case "SubjectDistanceRange":
                        case "FileSource":
                            d[u] = s[u][d[u]];
                            break;
                        case "ExifVersion":
                        case "FlashpixVersion":
                            d[u] = String.fromCharCode(d[u][0], d[u][1], d[u][2], d[u][3]);
                            break;
                        case "ComponentsConfiguration":
                            d[u] = s.Components[d[u][0]] + s.Components[d[u][1]] + s.Components[d[u][2]] + s.Components[d[u][3]];
                    }
                    c[u] = d[u];
                }
            if (c.GPSInfoIFDPointer)
                for (u in (p = r(t, m, m + c.GPSInfoIFDPointer, n, h))) {
                    if ("GPSVersionID" === u) p[u] = p[u][0] + "." + p[u][1] + "." + p[u][2] + "." + p[u][3];
                    c[u] = p[u];
                }
            return c;
        }
        t.readFromBinaryFile = function (t) {
            const e = (function (t) {
                    var e = new DataView(t);
                    if (255 != e.getUint8(0) || 216 != e.getUint8(1)) return !1;
                    for (
                        var i = 2,
                            n = t.byteLength,
                            s = function (t, e) {
                                return 56 === t.getUint8(e) && 66 === t.getUint8(e + 1) && 73 === t.getUint8(e + 2) && 77 === t.getUint8(e + 3) && 4 === t.getUint8(e + 4) && 4 === t.getUint8(e + 5);
                            };
                        i < n;

                    ) {
                        if (s(e, i)) {
                            var o = e.getUint8(i + 7);
                            return o % 2 != 0 && (o += 1), 0 === o && (o = 4), a(t, i + 8 + o, e.getUint16(i + 6 + o));
                        }
                        i++;
                    }
                })(t),
                i = (function (t) {
                    var e = new DataView(t);
                    if (255 != e.getUint8(0) || 216 != e.getUint8(1)) return !1;
                    for (var i = 2, n = t.byteLength; i < n; ) {
                        if (255 != e.getUint8(i)) return !1;
                        if (225 == e.getUint8(i + 1)) return c(e, i + 4, e.getUint16(i + 2));
                        i += 2 + e.getUint16(i + 2);
                    }
                })(t);
            return { iptc: e, exif: i };
        };
    })(h || (h = {})),
        (function (t) {
            (t[(t.Undefined = 0)] = "Undefined"), (t[(t.R0 = 1)] = "R0"), (t[(t.R90 = 2)] = "R90"), (t[(t.R180 = 3)] = "R180"), (t[(t.R270 = 4)] = "R270");
        })(l || (l = {})),
        (function (t) {
            (t[(t.Undefined = 0)] = "Undefined"), (t[(t.Uncalibrated = 1)] = "Uncalibrated"), (t[(t.sRgb = 2)] = "sRgb"), (t[(t.adobeRgb = 3)] = "adobeRgb");
        })(c || (c = {})),
        (function (t) {
            (t[(t.Success = 0)] = "Success"), (t[(t.ErrorFileReader = 1)] = "ErrorFileReader"), (t[(t.ErrorParse = 2)] = "ErrorParse"), (t[(t.ErrorException = 3)] = "ErrorException");
        })(u || (u = {})),
        (function (t) {
            (t[(t.Undefined = 0)] = "Undefined"), (t[(t.None = 1)] = "None"), (t[(t.Inch = 2)] = "Inch"), (t[(t.Centimeter = 3)] = "Centimeter"), (t[(t.Meter = 4)] = "Meter");
        })(d || (d = {}));
    class et {
        constructor(t, e, i, n, s, o, a, r) {
            (this.statusCode = t), (this.width = e), (this.height = i), (this.orientation = n), (this.resolutionUnits = s), (this.resolutionX = o), (this.resolutionY = a), (this.colorSpace = r);
        }
    }
    !(function (t) {
        const e = [137, 80, 78, 71, 13, 10, 26, 10],
            i = new Number(0);
        function n(t) {
            return new et(t, 0, 0, l.Undefined, d.Undefined, 0, 0, c.Undefined);
        }
        (t.inverseOrientation = function (t) {
            switch (t) {
                default:
                case l.Undefined:
                    return l.Undefined;
                case l.R0:
                    return l.R0;
                case l.R90:
                    return l.R270;
                case l.R180:
                    return l.R180;
                case l.R270:
                    return l.R90;
            }
        }),
            (t.get = function (t, o) {
                f.blobToArrayBuffer(
                    t,
                    function (a) {
                        try {
                            let r = new tt(a);
                            switch (t.type) {
                                case "image/png":
                                    o(
                                        (function (t) {
                                            for (let i = 0; i < e.length && t.hasMore(); i++) if (e[i] != t.readInt8()) return n(u.ErrorParse);
                                            let i = 0,
                                                s = 0,
                                                o = 0,
                                                a = 0,
                                                r = d.Undefined,
                                                h = c.Undefined,
                                                p = l.Undefined;
                                            for (; t.hasMore(); ) {
                                                let e = t.readInt32(),
                                                    n = f.uint8ArrayToString(t.readInt8s(4));
                                                if ("pHYs" == n) {
                                                    (i = t.readInt32()), (s = t.readInt32());
                                                    let e = t.readInt8();
                                                    r = 0 == e ? d.None : 1 == e ? d.Meter : d.Undefined;
                                                } else if ("IHDR" == n) {
                                                    let i = t.offsetCount;
                                                    (o = t.readInt32()), (a = t.readInt32()), (t.offsetCount = i), t.readInt8s(e);
                                                } else if ("iCCP" == n) {
                                                    let i = t.offsetCount,
                                                        n = "",
                                                        s = t.readInt8(),
                                                        o = 0;
                                                    for (; 0 != s && o < 79; ) (n += String.fromCharCode(s)), (s = t.readInt8()), o++;
                                                    t.readInt8s(e - (t.offsetCount - i));
                                                } else t.readInt8s(e);
                                                t.readInt32();
                                            }
                                            return new et(u.Success, o, a, p, r, i, s, h);
                                        })(r)
                                    );
                                    break;
                                case "image/jpg":
                                case "image/jpeg":
                                    o(
                                        (function (t) {
                                            let e = i,
                                                n = i,
                                                o = 0,
                                                a = 0,
                                                r = d.Undefined,
                                                p = c.Undefined,
                                                m = l.Undefined,
                                                g = h.readFromBinaryFile(t.data.buffer);
                                            if (g.exif) {
                                                (e = s.getOrElse(g.exif, "XResolution", i)), (n = s.getOrElse(g.exif, "YResolution", i)), (o = s.getOrElse(g.exif, "ImageWidth", 0)), (a = s.getOrElse(g.exif, "ImageHeight", 0));
                                                let t = s.getOrElse(g.exif, "ResolutionUnit", 0);
                                                r = 3 == t ? d.Centimeter : 2 == t ? d.Inch : 1 == t ? d.None : d.Undefined;
                                                let h = s.getOrElse(g.exif, "ColorSpace", 0);
                                                p = 65535 == h ? c.Uncalibrated : 1 == h ? c.sRgb : c.Undefined;
                                                let u = s.getOrElse(g.exif, "Orientation", 0);
                                                m = 1 == u ? l.R0 : 3 == u ? l.R180 : 6 == u ? l.R90 : 8 == u ? l.R270 : l.Undefined;
                                            }
                                            return new et(u.Success, o, a, m, r, e, n, p);
                                        })(r)
                                    );
                                    break;
                                default:
                                    o(n(u.ErrorParse));
                            }
                        } catch (t) {
                            o(n(u.ErrorException));
                        }
                    },
                    function (t) {
                        o(n(u.ErrorFileReader));
                    }
                );
            });
    })(p || (p = {}));
    class it {
        constructor(t, e) {
            (this.x = t), (this.y = e);
        }
        static empty() {
            return new it(0, 0);
        }
        static zero() {
            return new it(0, 0);
        }
        static nan() {
            return new it(Number.NaN, Number.NaN);
        }
        static from(t) {
            return new it(t.x, t.y);
        }
        toString() {
            return "(" + this.x + ", " + this.y + ")";
        }
        inFinite() {
            return this.isFinite();
        }
        isFinite() {
            return isFinite(this.x) && isFinite(this.y);
        }
        isNaN() {
            return isNaN(this.x) || isNaN(this.y);
        }
        interpolate(t, e) {
            return new it(this.x * (1 - e) + t.x * e, this.y * (1 - e) + t.y * e);
        }
        setInterpolated(t, e, i) {
            return this.setXy(t.x * (1 - i) + e.x * i, t.y * (1 - i) + e.y * i);
        }
        distanceSqrTo(t) {
            let e = this.x - t.x,
                i = this.y - t.y;
            return e * e + i * i;
        }
        distanceTo(t) {
            return Math.sqrt(this.distanceSqrTo(t));
        }
        offset(t, e) {
            return new it(this.x + t, this.y + e);
        }
        set(t) {
            return (this.x = t.x), (this.y = t.y), this;
        }
        setXy(t, e) {
            return (this.x = t), (this.y = e), this;
        }
        setNan() {
            return this.setXy(Number.NaN, Number.NaN);
        }
        round() {
            return new it(Math.round(this.x), Math.round(this.y));
        }
        floor() {
            return new it(Math.floor(this.x), Math.floor(this.y));
        }
        snap(t = 0.5, e = 0.5) {
            return new it(Math.floor(this.x) + t, Math.floor(this.y) + e);
        }
        rotateInPlace(t, e) {
            const i = Math.sin(t),
                n = Math.cos(t),
                s = this.x - e.x,
                o = this.y - e.y;
            return this.setXy(e.x + n * s - i * o, e.y + i * s + n * o), this;
        }
        rotateInto(t, e, i, n, s) {
            const o = this.x - i,
                a = this.y - n;
            s.setXy(i + t * o - e * a, n + e * o + t * a);
        }
        rotate(t, e) {
            const i = Math.sin(t),
                n = Math.cos(t),
                s = this.x - e.x,
                o = this.y - e.y;
            return new it(e.x + n * s - i * o, e.y + i * s + n * o);
        }
        plusEquals(t) {
            return (this.x += t.x), (this.y += t.y), this;
        }
        plusEqualsXy(t, e) {
            return (this.x += t), (this.y += e), this;
        }
        plusEqualsScaled(t, e) {
            return (this.x += t * e.x), (this.y += t * e.y), this;
        }
        equals(t) {
            return t && this.x == t.x && this.y == t.y;
        }
        notEquals(t) {
            return !this.equals(t);
        }
        minusEquals(t) {
            return (this.x -= t.x), (this.y -= t.y), this;
        }
        minusXyEquals(t, e) {
            return (this.x -= t), (this.y -= e), this;
        }
        minus(t) {
            return new it(this.x - t.x, this.y - t.y);
        }
        plus(t) {
            return new it(this.x + t.x, this.y + t.y);
        }
        times(t) {
            return new it(t * this.x, t * this.y);
        }
        timesEquals(t) {
            return (this.x *= t), (this.y *= t), this;
        }
        cross(t) {
            return this.x * t.y - this.y * t.x;
        }
        ortho() {
            return new it(this.y, -this.x);
        }
        dot(t) {
            return this.x * t.x + this.y * t.y;
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        lengthSqr() {
            return this.x * this.x + this.y * this.y;
        }
        normalize() {
            var t = this.length();
            return 0 != t && ((this.x /= t), (this.y /= t)), this;
        }
        capLength(t) {
            let e = this.length();
            return e > t && this.timesEquals(t / e), this;
        }
        dup() {
            return it.from(this);
        }
    }
    !(function (t) {
        (t[(t.TopLeft = 0)] = "TopLeft"),
            (t[(t.Top = 1)] = "Top"),
            (t[(t.TopRight = 2)] = "TopRight"),
            (t[(t.Right = 3)] = "Right"),
            (t[(t.BottomRight = 4)] = "BottomRight"),
            (t[(t.Bottom = 5)] = "Bottom"),
            (t[(t.BottomLeft = 6)] = "BottomLeft"),
            (t[(t.Left = 7)] = "Left"),
            (t[(t.Center = 8)] = "Center");
    })(m || (m = {})),
        (function (t) {
            (t.opposite = function (e) {
                switch (e) {
                    case t.TopLeft:
                        return t.BottomRight;
                    case t.Top:
                        return t.Bottom;
                    case t.TopRight:
                        return t.BottomLeft;
                    case t.Right:
                        return t.Left;
                    case t.BottomRight:
                        return t.TopLeft;
                    case t.Bottom:
                        return t.Top;
                    case t.BottomLeft:
                        return t.TopRight;
                    case t.Left:
                        return t.Right;
                    case t.Center:
                        return t.Center;
                }
                return t.Center;
            }),
                (t.flipX = function (e) {
                    switch (e) {
                        case t.TopLeft:
                            return t.TopRight;
                        case t.Top:
                            return t.Top;
                        case t.TopRight:
                            return t.TopLeft;
                        case t.Right:
                            return t.Left;
                        case t.BottomRight:
                            return t.BottomLeft;
                        case t.Bottom:
                            return t.Bottom;
                        case t.BottomLeft:
                            return t.BottomRight;
                        case t.Left:
                            return t.Right;
                        case t.Center:
                            return t.Center;
                    }
                    return t.Center;
                }),
                (t.flipY = function (e) {
                    switch (e) {
                        case t.TopLeft:
                            return t.BottomLeft;
                        case t.Top:
                            return t.Bottom;
                        case t.TopRight:
                            return t.BottomRight;
                        case t.Right:
                            return t.Right;
                        case t.BottomRight:
                            return t.TopRight;
                        case t.Bottom:
                            return t.Top;
                        case t.BottomLeft:
                            return t.TopLeft;
                        case t.Left:
                            return t.Left;
                        case t.Center:
                            return t.Center;
                    }
                    return t.Center;
                }),
                (t.interpolationCoefficientsFor = function (e) {
                    switch (e) {
                        case t.TopLeft:
                            return { tx: 0, ty: 0 };
                        case t.Top:
                            return { tx: 0.5, ty: 0 };
                        case t.TopRight:
                            return { tx: 1, ty: 0 };
                        case t.Right:
                            return { tx: 1, ty: 0.5 };
                        case t.BottomRight:
                            return { tx: 1, ty: 1 };
                        case t.Bottom:
                            return { tx: 0.5, ty: 1 };
                        case t.BottomLeft:
                            return { tx: 0, ty: 1 };
                        case t.Left:
                            return { tx: 0, ty: 0.5 };
                        case t.Center:
                            return { tx: 0.5, ty: 0.5 };
                    }
                    return { tx: 0.5, ty: 0.5 };
                });
        })(m || (m = {}));
    class nt {
        constructor(t, e, i, n) {
            (this.p0 = t), (this.p1 = e), (this.p2 = i), (this.p3 = n), (this.points = []), this.points.push(t, e, i, n);
        }
        static empty() {
            return new nt(it.empty(), it.empty(), it.empty(), it.empty());
        }
        set(t) {
            return this.p0.set(t.p0), this.p1.set(t.p1), this.p2.set(t.p2), this.p3.set(t.p3), this;
        }
        dup() {
            return new nt(this.p0.dup(), this.p1.dup(), this.p2.dup(), this.p3.dup());
        }
        contains(t, e) {
            var i = !1;
            const n = this.points.length;
            for (var s = 0; s < n; s++) {
                var o = this.points[s],
                    a = this.points[(s + 1) % n];
                ((a.y < e && o.y >= e) || (o.y < e && a.y >= e)) && a.x + ((e - a.y) / (o.y - a.y)) * (o.x - a.x) < t && (i = !i);
            }
            return i;
        }
        isConvex() {
            function t(t) {
                return t < 0 ? -1 : t > 0 ? 1 : 0;
            }
            var e = this.p1.minus(this.p0),
                i = this.p2.minus(this.p1),
                n = this.p3.minus(this.p2),
                s = this.p0.minus(this.p3),
                o = t(e.cross(i)),
                a = t(i.cross(n)),
                r = t(n.cross(s)),
                h = t(s.cross(e));
            return o == a && o == r && o == h;
        }
        rotateInPlace(t, e) {
            return this.p0.rotateInPlace(t, e), this.p1.rotateInPlace(t, e), this.p2.rotateInPlace(t, e), this.p3.rotateInPlace(t, e), this;
        }
        rotate(t, e) {
            return this.dup().rotateInPlace(t, e);
        }
    }
    class st {
        constructor(t, e, i, n) {
            (this.left = t), (this.top = e), (this.right = i), (this.bottom = n);
        }
        static empty() {
            return new st(0, 0, 0, 0);
        }
        static unit() {
            return new st(0, 0, 1, 1);
        }
        static fromBoundingRect(t) {
            return new st(t[0], t[1], t[2], t[3]);
        }
        static fromCropRect(t) {
            return new st(t.left0, t.top0, t.right0, t.bottom0);
        }
        static fromPoints(t) {
            if (0 == t.length) return null;
            for (var e = t[0], i = new st(e.x, e.y, e.x, e.y), n = 1; n < t.length; n++) i.addPoint(t[n]);
            return i;
        }
        static fromQuad(t) {
            return st.fromPoints(t.points);
        }
        dup() {
            return new st(this.left, this.top, this.right, this.bottom);
        }
        setNull() {
            return this.set(null, null, null, null);
        }
        setFrom(t) {
            return (this.left = t.left), (this.top = t.top), (this.right = t.right), (this.bottom = t.bottom), this;
        }
        set(t, e, i, n) {
            return (this.left = t), (this.top = e), (this.right = i), (this.bottom = n), this;
        }
        fromCropRect(t) {
            return this.set(t.left0, t.top0, t.right0, t.bottom0);
        }
        containsPoint(t) {
            return this.left <= t.x && t.x <= this.right && this.top <= t.y && t.y <= this.bottom;
        }
        intersectionWith(t) {
            return (this.left = Math.max(this.left, t.left)), (this.top = Math.max(this.top, t.top)), (this.right = Math.min(this.right, t.right)), (this.bottom = Math.min(this.bottom, t.bottom)), this;
        }
        leftCenter() {
            return new it(this.left, 0.5 * (this.top + this.bottom));
        }
        topLeft() {
            return new it(this.left, this.top);
        }
        topCenter() {
            return new it(0.5 * (this.left + this.right), this.top);
        }
        topRight() {
            return new it(this.right, this.top);
        }
        rightCenter() {
            return new it(this.right, 0.5 * (this.top + this.bottom));
        }
        bottomLeft() {
            return new it(this.left, this.bottom);
        }
        bottomCenter() {
            return new it(0.5 * (this.left + this.right), this.bottom);
        }
        bottomRight() {
            return new it(this.right, this.bottom);
        }
        center() {
            return new it(0.5 * (this.left + this.right), 0.5 * (this.top + this.bottom));
        }
        translate(t, e) {
            return (this.top += e), (this.bottom += e), (this.left += t), (this.right += t), this;
        }
        point(t) {
            switch (t) {
                case m.TopLeft:
                    return this.interpolate(0, 0);
                case m.Top:
                    return this.interpolate(0.5, 0);
                case m.TopRight:
                    return this.interpolate(1, 0);
                case m.Right:
                    return this.interpolate(1, 0.5);
                case m.BottomRight:
                    return this.interpolate(1, 1);
                case m.Bottom:
                    return this.interpolate(0.5, 1);
                case m.BottomLeft:
                    return this.interpolate(0, 1);
                case m.Left:
                    return this.interpolate(0, 0.5);
                case m.Center:
                    return this.interpolate(0.5, 0.5);
            }
            return this.interpolate(0.5, 0.5);
        }
        setAnchorPoint(t, e) {
            switch (t) {
                case m.TopLeft:
                    (this.left = e.x), (this.top = e.y);
                    break;
                case m.Top:
                    this.top = e.y;
                    break;
                case m.TopRight:
                    (this.top = e.y), (this.right = e.x);
                    break;
                case m.Right:
                    this.right = e.x;
                    break;
                case m.BottomRight:
                    (this.right = e.x), (this.bottom = e.y);
                    break;
                case m.Bottom:
                    this.bottom = e.y;
                    break;
                case m.BottomLeft:
                    (this.left = e.x), (this.bottom = e.y);
                    break;
                case m.Left:
                    this.left = e.x;
                case m.Center:
            }
            return this;
        }
        moveAnchorTo(t, e) {
            let i = this.point(t);
            return this.translate(e.x - i.x, e.y - i.y), this;
        }
        moveAnchor(t, e) {
            switch (t) {
                case m.TopLeft:
                    (this.left = Math.min(this.left + e.x, this.right)), (this.top = Math.min(this.top + e.y, this.bottom));
                    break;
                case m.Top:
                    this.top = Math.min(this.top + e.y, this.bottom);
                    break;
                case m.TopRight:
                    (this.top = Math.min(this.top + e.y, this.bottom)), (this.right = Math.max(this.right + e.x, this.left));
                    break;
                case m.Right:
                    this.right = Math.max(this.right + e.x, this.left);
                    break;
                case m.BottomRight:
                    (this.right = Math.max(this.right + e.x, this.left)), (this.bottom = Math.max(this.bottom + e.y, this.top));
                    break;
                case m.Bottom:
                    this.bottom = Math.max(this.bottom + e.y, this.top);
                    break;
                case m.BottomLeft:
                    (this.left = Math.min(this.left + e.x, this.right)), (this.bottom = Math.max(this.bottom + e.y, this.top));
                    break;
                case m.Left:
                    this.left = Math.min(this.left + e.x, this.right);
                    break;
                case m.Center:
                    (this.left += e.x), (this.top += e.y), (this.right += e.x), (this.bottom += e.y);
            }
            return this;
        }
        moveAnchorToMinSize(t, e, i) {
            var n = Math.max(0, e - this.width()),
                s = Math.max(0, i - this.height());
            switch (t) {
                case m.TopLeft:
                    (this.left -= n), (this.top -= s);
                    break;
                case m.Top:
                    this.top -= s;
                    break;
                case m.TopRight:
                    (this.top -= s), (this.right += n);
                    break;
                case m.Right:
                    this.right += n;
                    break;
                case m.BottomRight:
                    (this.right += n), (this.bottom += s);
                    break;
                case m.Bottom:
                    this.bottom += s;
                    break;
                case m.BottomLeft:
                    (this.left -= n), (this.bottom += s);
                    break;
                case m.Left:
                    this.left -= n;
                    break;
                case m.Center:
                    (n *= 0.5), (s *= 0.5), (this.left -= n), (this.right += n), (this.top -= s), (this.bottom += s);
            }
            return this;
        }
        forceAspectRatio(t, e) {
            const i = t * this.width();
            var n = 0,
                s = 0;
            e == m.TopLeft || e == m.TopRight || e == m.BottomRight || e == m.BottomLeft
                ? i > this.height()
                    ? (n = i - this.height())
                    : (s = this.height() / t - this.width())
                : e == m.Top || e == m.Bottom
                ? (s = this.height() / t - this.width())
                : (n = i - this.height());
            const o = 0.5 * s,
                a = 0.5 * n;
            switch (e) {
                case m.Top:
                    (this.bottom += n), (this.left -= o), (this.right += o);
                    break;
                case m.Left:
                    (this.right += s), (this.top -= a), (this.bottom += a);
                    break;
                case m.Bottom:
                    (this.top -= n), (this.left -= o), (this.right += o);
                    break;
                case m.Right:
                    (this.left -= s), (this.top -= a), (this.bottom += a);
                    break;
                case m.TopLeft:
                    (this.bottom += n), (this.right += s);
                    break;
                case m.TopRight:
                    (this.bottom += n), (this.left -= s);
                    break;
                case m.BottomRight:
                    (this.top -= n), (this.left -= s);
                    break;
                case m.BottomLeft:
                    (this.top -= n), (this.right += s);
                    break;
                case m.Center:
                    (this.top -= a), (this.bottom += a), (this.left -= o), (this.right += o);
            }
            return this;
        }
        interpolate(t, e) {
            return new it(this.left * (1 - t) + t * this.right, this.top * (1 - e) + e * this.bottom);
        }
        transform(t, e) {
            return new it(e.left + ((t.x - this.left) / this.width()) * e.width(), e.top + ((t.y - this.top) / this.height()) * e.height());
        }
        sampleGrid(t, e) {
            for (var i = [], n = 0; n < e; n++) for (var s = n / (e - 1), o = 0; o < t; o++) i.push(this.interpolate(o / (t - 1), s));
            return i;
        }
        setHorizontal(t) {
            return (this.left = t.left), (this.right = t.right), this;
        }
        padToFit(t) {
            var e = 0,
                i = 0;
            return (
                (e = Math.max(e, this.left - t.left)),
                (e = Math.max(e, t.right - this.right)),
                (i = Math.max(i, this.top - t.top)),
                (i = Math.max(i, t.bottom - this.bottom)),
                (this.left -= e),
                (this.right += e),
                (this.top = Math.min(this.top, t.top)),
                (this.bottom = Math.max(this.bottom, t.bottom)),
                this
            );
        }
        addRect(t) {
            return (this.left = Math.min(this.left, t.left)), (this.right = Math.max(this.right, t.right)), (this.top = Math.min(this.top, t.top)), (this.bottom = Math.max(this.bottom, t.bottom)), this;
        }
        addPoint(t) {
            (this.left = Math.min(this.left, t.x)), (this.top = Math.min(this.top, t.y)), (this.right = Math.max(this.right, t.x)), (this.bottom = Math.max(this.bottom, t.y));
        }
        addPointSafe(t) {
            t && (null == this.left ? ((this.left = t.x), (this.top = t.y), (this.right = t.x), (this.bottom = t.y)) : this.addPoint(t));
        }
        width() {
            return this.right - this.left;
        }
        height() {
            return this.bottom - this.top;
        }
        pad(t, e, i, n) {
            return null == e && (e = t), null == i && (i = t), null == n && (n = e), (this.left -= t), (this.top -= e), (this.right += i), (this.bottom += n), this;
        }
        padBottom(t) {
            return (this.bottom += t), this;
        }
        toQuad() {
            return new nt(this.topLeft(), this.topRight(), this.bottomRight(), this.bottomLeft());
        }
        snap() {
            return (this.left = Math.floor(this.left)), (this.top = Math.floor(this.top)), (this.right = Math.ceil(this.right)), (this.bottom = Math.ceil(this.bottom)), this;
        }
        round() {
            return (this.left = Math.round(this.left)), (this.top = Math.round(this.top)), (this.right = Math.round(this.right)), (this.bottom = Math.round(this.bottom)), this;
        }
        normalize() {
            var t = Math.min(this.left, this.right),
                e = Math.max(this.left, this.right),
                i = Math.min(this.top, this.bottom),
                n = Math.max(this.top, this.bottom);
            return (this.left = t), (this.right = e), (this.top = i), (this.bottom = n), this;
        }
    }
    !(function (t) {
        let e = !1,
            i = new Image();
        (i.src =
            "data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAIAAwMBEQACEQEDEQH/xABRAAEAAAAAAAAAAAAAAAAAAAAKEAEBAQADAQEAAAAAAAAAAAAGBQQDCAkCBwEBAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AG8T9NfSMEVMhQvoP3fFiRZ+MTHDifa/95OFSZU5OzRzxkyejv8ciEfhSceSXGjS8eSdLnZc2HDm4M3BxcXwH/9k="),
            (i.onload = function () {
                e = 2 == i.width && 3 == i.height;
            }),
            (t.BrowserRotates = function () {
                return e;
            });
    })(g || (g = {})),
        (function (t) {
            t.RecodeJpegQuality = 0.95;
            const e = new Set(["image/png", "image/jpeg"]);
            function i(e, i, n, s) {
                p.get(e, function (o) {
                    f.loadImageFromBlob(e, n, (e) => {
                        if (o.statusCode != u.Success || o.orientation == l.R0 || o.orientation == l.Undefined || g.BrowserRotates()) {
                            const n = t.imageToCanvasEx(e, i);
                            (n.wasRotated = !1), s(n);
                        } else {
                            const n = t.rotateImageToCanvasEx(e, o.orientation, i);
                            (n.wasRotated = !0), s(n);
                        }
                    });
                });
            }
            function n(t, e) {
                const i = t.naturalWidth,
                    n = t.naturalHeight;
                let s = new at(i, n);
                return (s.wasShrunk = !1), s.context().setGlobalAlpha(1), e && (s.context().setFillStyle("rgb(255,255,255)"), s.context().fillRect(0, 0, i, n)), s.context().context.drawImage(t, 0, 0, i, n), s;
            }
            function s(t) {
                return n(t, !0);
            }
            function o(t, e, i) {
                const n = t.naturalWidth,
                    o = t.naturalHeight;
                let a = n,
                    r = o,
                    h = 0;
                switch (e) {
                    case l.Undefined:
                    case l.R0:
                        return s(t);
                    case l.R90:
                        (a = o), (r = n), (h = 0.5 * Math.PI);
                        break;
                    case l.R180:
                        h = Math.PI;
                        break;
                    case l.R270:
                        (a = o), (r = n), (h = 0.5 * -Math.PI);
                }
                let c = new at(a, r);
                return (
                    (c.wasShrunk = !1),
                    c.context().setGlobalAlpha(1),
                    i && (c.context().setFillStyle("rgb(255,255,255)"), c.context().fillRect(0, 0, a, r)),
                    c.context().save(),
                    c.context().translate(0.5 * a, 0.5 * r),
                    c.context().rotate(h),
                    c.context().context.drawImage(t, 0.5 * -n, 0.5 * -o, n, o),
                    c.context().restore(),
                    c
                );
            }
            (t.DefaultFontFamily = (function () {
                try {
                    return window.getComputedStyle(document.querySelector("body")).fontFamily;
                } catch (t) {
                    return "sans-serif";
                }
            })()),
                (t.needsReencoding = function (t) {
                    return !e.has(t);
                }),
                (t.recodeCanvasFile = function (e, i) {
                    return (
                        (n = e.type),
                        f.endsWith(n, "jpeg") ||
                        f.endsWith(n, "jpg") ||
                        f.endsWith(n, "webp") ||
                        f.endsWith(n, "jp2") ||
                        f.endsWith(n, "cr2") ||
                        f.endsWith(n, "nef") ||
                        f.endsWith(n, "dng") ||
                        f.endsWith(n, "jps") ||
                        f.startsWith(n, "image/heif") ||
                        f.startsWith(n, "image/avif")
                            ? i.toFile("image/jpeg", t.RecodeJpegQuality, f.dropExtension(e.name) + ".jpeg")
                            : i.toFile("image/png", 1, f.dropExtension(e.name) + ".png")
                    );
                    var n;
                }),
                (t.loadCheckRotateImage = i),
                (t.loadCheckRotateFlattenImage = function (t, e, n) {
                    i(t, !0, e, n);
                }),
                (t.imageToCanvasEx = n),
                (t.flattenImage = s),
                (t.rotateImageToCanvasEx = o),
                (t.rotateAndFlattenImage = function (t, e) {
                    return o(t, e, !0);
                });
        })(F || (F = {}));
    class ot {
        constructor(t, e) {
            (this.canvas = t), (this.context = e), this.toggleImageSmoothing(!1);
        }
        toggleImageSmoothing(t) {
            (this.context.mozImageSmoothingEnabled = t), (this.context.webkitImageSmoothingEnabled = t), (this.context.imageSmoothingEnabled = t);
        }
        width() {
            return this.context.canvas.width;
        }
        height() {
            return this.context.canvas.height;
        }
        logicalWidth() {
            return this.canvas.logicalWidth();
        }
        logicalHeight() {
            return this.canvas.logicalHeight();
        }
        createPattern(t, e) {
            return this.context.createPattern(t, e);
        }
        setStrokeStyle(t) {
            this.context.strokeStyle = t;
        }
        setLineDash(t) {
            this.context.setLineDash(t);
        }
        setLineWidth(t) {
            this.context.lineWidth = t;
        }
        setLineJoin(t) {
            this.context.lineJoin = t;
        }
        setLineCap(t) {
            this.context.lineCap = t;
        }
        strokeText(t, e, i) {
            this.context.strokeText(t, e, i);
        }
        fillText(t, e, i) {
            this.context.fillText(t, e, i);
        }
        measureText(t) {
            return this.context.measureText(t);
        }
        setFont(t) {
            this.context.font = t;
        }
        save() {
            this.context.save();
        }
        stroke() {
            this.context.stroke();
        }
        strokeRect(t, e, i, n) {
            this.context.strokeRect(t, e, i, n);
        }
        createRadialGradient(t, e, i, n, s, o) {
            return this.context.createRadialGradient(t, e, i, n, s, o);
        }
        createLinearGradient(t, e, i, n) {
            return this.context.createLinearGradient(t, e, i, n);
        }
        scale(t, e) {
            this.context.scale(t, e);
        }
        translate(t, e) {
            this.context.translate(t, e);
        }
        setRectToRectTransform(t, e) {
            let i = e.width() / t.width(),
                n = e.height() / t.height();
            this.context.setTransform(i, 0, 0, n, e.left - t.left * i, e.top - t.top * n);
        }
        moveTo(t, e) {
            this.context.moveTo(t, e);
        }
        lineTo(t, e) {
            this.context.lineTo(t, e);
        }
        quadraticCurveTo(t, e, i, n) {
            this.context.quadraticCurveTo(t, e, i, n);
        }
        bezierCurveTo(t, e, i, n, s, o) {
            this.context.bezierCurveTo(t, e, i, n, s, o);
        }
        rotate(t) {
            this.context.rotate(t);
        }
        beginPath() {
            this.context.beginPath();
        }
        closePath() {
            this.context.closePath();
        }
        arc(t, e, i, n, s, o) {
            this.context.arc(t, e, i, n, s, o);
        }
        rect(t, e, i, n) {
            this.context.rect(t, e, i, n);
        }
        rectTo(t, e, i, n, s) {
            let o = t + i,
                a = e + n;
            this.moveTo(t, e), s ? (this.lineTo(o, e), this.lineTo(o, a), this.lineTo(t, a)) : (this.lineTo(t, a), this.lineTo(o, a), this.lineTo(o, e)), this.lineTo(t, e), this.closePath();
        }
        clip() {
            this.context.clip();
        }
        clipBlock(t, e, i, n, s, o) {
            t ? (this.save(), this.beginPath(), this.rect(e, i, n - e, s - i), this.clip(), o(), this.restore()) : o();
        }
        rotatedFrame(t, e, i) {
            0 != t ? (this.save(), this.translate(e.x, e.y), this.rotate(t), this.translate(-e.x, -e.y), i(), this.restore()) : i();
        }
        restore() {
            this.context.restore();
        }
        setFillStyle(t) {
            this.context.fillStyle = t;
        }
        clearShadow() {
            (this.context.shadowOffsetX = 0), (this.context.shadowOffsetY = 0), (this.context.shadowBlur = 0), (this.context.shadowColor = void 0);
        }
        setShadow(t, e, i, n) {
            (this.context.shadowOffsetX = t), (this.context.shadowOffsetY = e), (this.context.shadowBlur = i), (this.context.shadowColor = n);
        }
        setGlobalAlpha(t) {
            this.context.globalAlpha = t;
        }
        withGlobalAlpha(t, e) {
            let i = this.context.globalAlpha;
            this.setGlobalAlpha(t), e(), this.setGlobalAlpha(i);
        }
        clearRect(t, e, i, n) {
            this.context.clearRect(t, e, i, n);
        }
        clearAll() {
            this.clearRect(0, 0, this.logicalWidth(), this.logicalHeight());
        }
        createImageData(t, e) {
            return this.context.createImageData(t, e);
        }
        getImageData(t, e, i, n) {
            return this.context.getImageData(t, e, i, n);
        }
        getImageDataFull() {
            return this.context.getImageData(0, 0, this.width(), this.height());
        }
        putImageData(t, e, i) {
            this.context.putImageData(t, e, i);
        }
        putImageData2(t, e, i, n, s, o, a) {
            this.context.putImageData(t, e, i, n, s, o, a);
        }
        fillRect(t, e, i, n) {
            this.context.fillRect(t, e, i, n);
        }
        roundedRect(t, e, i, n, s) {
            i < 2 * s && (s = i / 2),
                n < 2 * s && (s = n / 2),
                this.beginPath(),
                this.moveTo(t + s, e),
                this.context.arcTo(t + i, e, t + i, e + n, s),
                this.context.arcTo(t + i, e + n, t, e + n, s),
                this.context.arcTo(t, e + n, t, e, s),
                this.context.arcTo(t, e, t + i, e, s),
                this.closePath();
        }
        fillRoundedRect(t, e, i, n, s) {
            this.roundedRect(t, e, i, n, s), this.context.fill();
        }
        drawImage(t, e, i) {
            this.context.drawImage(t, e, i);
        }
        drawImage2(t, e, i, n, s) {
            this.context.drawImage(t, e, i, n, s);
        }
        drawImage3(t, e, i, n, s, o, a, r, h) {
            this.context.drawImage(t, e, i, n, s, o, a, r, h);
        }
        drawCanvasEx(t, e, i) {
            this.context.drawImage(t.element, e, i);
        }
        drawCanvasEx2(t, e, i, n, s) {
            this.context.drawImage(t.element, e, i, n, s);
        }
        drawCanvasEx3(t, e, i, n, s, o, a, r, h) {
            this.context.drawImage(t.element, e, i, n, s, o, a, r, h);
        }
        circle(t, e, i) {
            this.context.beginPath(), this.context.arc(t, e, i, 0, 2 * Math.PI, !0);
        }
        fillCircle(t, e, i, n) {
            n && (this.context.fillStyle = n), this.circle(t, e, i), this.context.fill();
        }
        fillSquare(t, e, i, n) {
            n && (this.context.fillStyle = n), this.context.fillRect(t - i, e - i, 2 * i, 2 * i);
        }
        strokeSquare(t, e, i, n) {
            n && (this.context.strokeStyle = n), this.context.strokeRect(t - i, e - i, 2 * i, 2 * i);
        }
        strokeCircle(t, e, i, n) {
            n && (this.context.strokeStyle = n), this.circle(t, e, i), this.context.stroke();
        }
        strokeLine(t, e, i, n, s, o) {
            s && (this.context.lineWidth = s), o && (this.context.strokeStyle = o), this.context.beginPath(), this.context.moveTo(t, e), this.context.lineTo(i, n), this.context.stroke();
        }
        strokePolyline(...t) {
            if (t.length > 1) {
                this.context.beginPath(), this.context.moveTo(t[0].x, t[0].y);
                for (let e = 1; e < t.length; e++) this.context.lineTo(t[e].x, t[e].y);
                this.context.stroke();
            }
        }
        triangle(t, e, i, n, s, o) {
            var a = (120 * Math.PI) / 180;
            (s = s || n),
                (o = o || s),
                this.context.moveTo(t + n * Math.cos(i), e + n * Math.sin(i)),
                this.context.lineTo(t + s * Math.cos(i + a), e + s * Math.sin(i + a)),
                this.context.lineTo(t + o * Math.cos(i + 2 * a), e + o * Math.sin(i + 2 * a)),
                this.context.closePath();
        }
        strokeEx(t, e, i, n) {
            i && (this.context.lineJoin = i), n && (this.context.lineCap = n), (this.context.lineWidth = t), (this.context.strokeStyle = e), this.context.stroke();
        }
        fillEx(t) {
            (this.context.fillStyle = t), this.context.fill();
        }
        drawCenteredText(t, e) {
            var i = t;
            const n = t.length;
            this.setGlobalAlpha(1), this.setFont(this.canvas.largeFont);
            let s = 18;
            var o = this.measureText(t).width;
            const a = this.canvas.logicalWidth();
            var r = a - 20;
            o > r &&
                (this.setFont(this.canvas.smallFont),
                (s = 12),
                (o = this.measureText(t).width) > r &&
                    ((t = f.centerElide(i, 0.75 * n)), (o = this.measureText(t).width) > r && ((t = f.centerElide(i, 0.5 * n)), (o = this.measureText(t).width) > r && ((t = f.centerElide(i, 0.25 * n)), (o = this.measureText(t).width)))));
            let h = (a - o) / 2,
                l = s + 4,
                c = 0.25 * s + 1;
            this.setGlobalAlpha(0.4), this.setFillStyle("#fff"), this.fillRoundedRect(h - 4, e - l + c, o + 8, l, 0.4 * l), this.setGlobalAlpha(1), this.setFillStyle("#000"), this.fillText(t, h, e);
        }
    }
    class at {
        static fromHTMLImageElement(t, e = 1) {
            let i = t.naturalWidth * e,
                n = t.naturalHeight * e,
                s = new at(i, n);
            return s.context().drawImage2(t, 0, 0, i, n), s;
        }
        constructor(t, e, i = 1) {
            (this.w = t),
                (this.h = e),
                (this.highDpiRatio = 1),
                (this.largeFont = "20px " + F.DefaultFontFamily),
                (this.smallFont = "14px " + F.DefaultFontFamily),
                (this.element = document.createElement("canvas")),
                (this.$element = $(this.element)),
                this.setSize(t, e, i),
                (this.wasShrunk = !1),
                (this.contextCache = null);
        }
        empty() {}
        width() {
            return this.w;
        }
        height() {
            return this.h;
        }
        snapStrokeCenterToDevice(t, e) {
            let i = t * this.highDpiRatio,
                n = e * this.highDpiRatio;
            return n == Math.round(n) ? (n % 2 == 0 ? Math.round(i) / this.highDpiRatio : (Math.floor(i) + 0.5) / this.highDpiRatio) : t;
        }
        logicalWidth() {
            return this.wLogical;
        }
        logicalHeight() {
            return this.hLogical;
        }
        boundsRect() {
            return new st(0, 0, this.width(), this.height());
        }
        size() {
            return this.w * this.h;
        }
        isInBounds(t, e) {
            return 0 <= t && t < this.width() && 0 <= e && e < this.height();
        }
        byteLength() {
            return 4 * this.size();
        }
        dup() {
            let t = new at(this.width(), this.height());
            return t.context().drawCanvasEx(this, 0, 0), t;
        }
        crop(t, e, i, n) {
            let s = new at(i, n);
            return s.context().drawCanvasEx(this, -t, -e), s;
        }
        isOpaque() {
            let t = this.context().getImageDataFull().data,
                e = t.length / 4;
            if (e > 0)
                for (let i = 0; i < e; i++) {
                    if (t[4 * i + 3] < 255) return !1;
                }
            return !0;
        }
        hasTransparency() {
            return !this.isOpaque();
        }
        computeMeanRgba(t, e, i, n) {
            if (null != t && null != e && null != i && null != n) {
                let s = this.context().getImageData(t, e, i, n).data,
                    o = s.length / 4;
                if (o > 0) {
                    let t = new Float64Array(4);
                    for (let e = 0, i = 0; e < o; e++) (t[0] += s[i++]), (t[1] += s[i++]), (t[2] += s[i++]), (t[3] += s[i++]);
                    let e = new Uint8ClampedArray(4);
                    return (e[0] = t[0] / o), (e[1] = t[1] / o), (e[2] = t[2] / o), (e[3] = t[3] / o), e;
                }
            }
        }
        scale(t) {
            let e = new at(Math.round(this.width() * t), Math.round(this.height() * t));
            return e.context().drawCanvasEx2(this, 0, 0, e.width(), e.height()), e;
        }
        context() {
            return null == this.contextCache && ((this.contextCache = new ot(this, this.element.getContext("2d"))), 1 != this.highDpiRatio && this.contextCache.scale(this.highDpiRatio, this.highDpiRatio)), this.contextCache;
        }
        checkSetSize(t, e, i = 1) {
            return (this.w != t || this.h != e || this.highDpiRatio != i) && (this.setSize(t, e, i), !0);
        }
        setSize(t, e, i = 1) {
            t > 0 &&
                e > 0 &&
                ((this.highDpiRatio = i),
                (this.wLogical = t),
                (this.hLogical = e),
                (this.w = t * this.highDpiRatio),
                (this.h = e * this.highDpiRatio),
                (this.element.style.width = t + "px"),
                (this.element.style.height = e + "px"),
                (this.element.width = this.w),
                (this.element.height = this.h),
                (this.contextCache = null));
        }
        clearAll() {
            this.context().clearRect(0, 0, this.width(), this.height());
        }
        toImage() {
            let t = document.createElement("img");
            return (t.src = this.toDataURL()), t;
        }
        toDataURL(t, e) {
            return this.element.toDataURL(t, e);
        }
        toBlob(t, e) {
            return f.dataUrlToBlob(this.toDataURL(t, e));
        }
        toBlobAsync(t, e, i) {
            this.element.toBlob(t);
        }
        toFile(t, e, i) {
            return f.blobToFile(this.toBlob(t, e), i);
        }
        fillAliasedCircle(t, e, i, n) {
            if (!(i <= 0)) {
                for (
                    var s = this.context().getImageData(0, 0, this.width(), this.height()),
                        o = i * i,
                        a = Math.max(0, Math.floor(t - i)),
                        r = Math.min(this.width() - 1, Math.ceil(t + i)),
                        h = Math.max(0, Math.floor(e - i)),
                        l = Math.min(this.height() - 1, Math.ceil(e + i)),
                        c = h;
                    c <= l;
                    c++
                )
                    for (var u = a; u <= r; u++)
                        if ((u + 0.5 - t) * (u + 0.5 - t) + (c + 0.5 - e) * (c + 0.5 - e) <= o) {
                            var d = 4 * (c * this.width() + u);
                            (s.data[d] = n[0]), (s.data[d + 1] = n[1]), (s.data[d + 2] = n[2]), (s.data[d + 3] = n[3]);
                        }
                this.context().putImageData(s, 0, 0);
            }
        }
    }
    !(function (t) {
        t.copyTextToClipboard = function (t, e, i) {
            window.navigator && window.navigator.clipboard && window.navigator.clipboard.writeText
                ? window.navigator.clipboard.writeText(t).then(
                      () => {
                          e();
                      },
                      () => {
                          i();
                      }
                  )
                : i();
        };
        const e = new RegExp("mobile|ip(hone|od|ad)|android|blackberry|iemobile|kindle|netfront|silk-accelerated|(hpw|web)os|fennec|minimo|opera m(obi|ini)|blazer|dolfin|dolphin|skyfire|zune");
        function i(t, e, i) {
            navigator.clipboard && navigator.clipboard.write
                ? navigator.clipboard.write([new ClipboardItem({ [t.type]: t })]).then(
                      () => {
                          e();
                      },
                      (t) => {
                          i();
                      }
                  )
                : setTimeout(i, 0);
        }
        (t.copyImageToClipboard = function (t, e, n) {
            at.fromHTMLImageElement(t).toBlobAsync((t) => i(t, e, n));
        }),
            (t.copyImageBlobToClipboard = i),
            (t.isMobile = function () {
                return !!(navigator && navigator.userAgent && navigator.userAgent.length > 0) && e.test(navigator.userAgent.toLowerCase());
            });
        const s = /\<svg[^\>]+viewBox\s*=\s*"\s*([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)\s*"/,
            o = /\<svg[^\>]+width\s*=\s*"\s*([\d\.]+)/,
            a = /\<svg[^\>]+height\s*=\s*"\s*([\d\.]+)/;
        function r(t, e, i) {
            let n = new Image();
            (n.onload = function () {
                URL.revokeObjectURL(n.src), i(n);
            }),
                (n.onerror = e),
                (n.src = t);
        }
        (t.loadImageFromSvgString = function (e, i, n) {
            r(
                t.svgStringToDataUrl(
                    (function (t) {
                        let e = o.exec(t),
                            i = a.exec(t);
                        if (e && 2 == e.length && isFinite(parseInt(e[1])) && i && 2 == i.length && isFinite(parseInt(i[1]))) return t;
                        {
                            let e = s.exec(t);
                            if (5 == e.length) {
                                parseInt(e[1]), parseInt(e[2]);
                                let i = parseInt(e[3]),
                                    n = parseInt(e[4]);
                                if (isFinite(i) && isFinite(n)) {
                                    let e = 150,
                                        s = Math.ceil((n / i) * e);
                                    return t.replace("<svg", `<svg width="${e}" height="${s}"`);
                                }
                            }
                        }
                        return t;
                    })(e)
                ),
                i,
                n
            );
        }),
            (t.loadImageFromDataUrl = r),
            (t.loadImageFromUrl = function (t, e, i) {
                let n = new Image();
                (n.onload = () => i(n)), (n.onerror = e), (n.src = t);
            }),
            (t.loadImageFromBlob = function (t, e, i) {
                r(URL.createObjectURL(t), e, i);
            }),
            (t.loadFileFromUrl = function (e, i, n) {
                let s = new XMLHttpRequest();
                s.open("GET", e, !0),
                    (s.responseType = "blob"),
                    (s.onload = function (s) {
                        if (200 == this.status) {
                            let s = this.response,
                                o = e.split("/");
                            i || (i = o[o.length - 1]), n(t.blobToFile(s, i));
                        }
                    }),
                    s.send();
            }),
            (t.gaTrack = function (t, e, i, n) {
                "gtag" in window ? gtag("event", e, { event_category: t, event_label: i, value: n, non_interaction: !0 }) : ga("send", "event", t, e, i, n, { nonInteraction: !0 });
            }),
            (t.gaSetPageAndSendPageview = function (t) {
                ga("set", "page", t || location.pathname), ga("send", "pageview");
            }),
            (t.modal = function (t, e = !1, i = !1) {
                var n = "string" == typeof t ? $(t) : t.$();
                e ? n.modal({ backdrop: !i, keyboard: !0 }) : n.modal({ backdrop: "static", keyboard: !1 });
                var s = $(".modal-backdrop"),
                    o = 1040 + 2 * (s.length - 1);
                s.last().css("z-index", o), n.css("z-index", o + 1);
            }),
            (t.blink = function (t, e = 200, i = 3) {
                var n = "string" == typeof t ? $(t) : t.$();
                function s() {
                    n.fadeIn(e, o);
                }
                function o() {
                    --i > 0 && n.fadeOut(e, s);
                }
                n.fadeOut(e, s);
            }),
            (t.makeElement = function (t, e) {
                var i = $(document.createElement(t));
                return i.text(e), i;
            }),
            (t.formatXhrError = function (e, i) {
                const s = e.responseURL || "[Unknown URL]";
                if ((t.gaTrack("XhrError", s, e.status + ", " + (i || "[unknown]")), 0 === e.status)) return n.s("Failed to connect to the server.") + "\n" + n.s("Please verify your network connection.") + "\n";
                {
                    const s = t.elide(e.responseText.toString(), 200);
                    return e.status < 200 || 299 < e.status
                        ? e.statusText + " [" + e.status + "]\n" + s
                        : "parsererror" === i
                        ? n.s("Failed to parse JSON response.") + " [" + i + "]\n" + s
                        : "timeout" === i
                        ? n.s("Request time out.") + " [" + i + "]"
                        : "abort" === i
                        ? n.s("Request aborted by the server.") + " [" + i + "]"
                        : "empty" === i
                        ? n.s("Server gave an empty response.")
                        : n.s("Unknown error.") + "\n" + s;
                }
            });
    })(f || (f = {})),
        (function (t) {
            function e(e) {
                r.FatalError.Message.$().text(e), t.modal(r.FatalError.Dialog), t.gaTrack("ErrorShown", "Fatal", e);
            }
            function i(e) {
                e ? t.modal(r.App.SpinnerLightbox) : r.App.SpinnerLightbox.$().modal("hide");
            }
            function n(e) {
                e ? t.modal(r.App.ProgressLightbox) : r.App.ProgressLightbox.$().modal("hide");
            }
            (t.countInstances = function (t, e) {
                const i = e.charCodeAt(0);
                for (var n = 0, s = 0; s < t.length; s++) t.charCodeAt(s) == i && n++;
                return n;
            }),
                (t.whilePressing = function (t, e, i) {
                    function n() {
                        window.removeEventListener("touchend", n), window.removeEventListener("mouseup", n), i();
                    }
                    function s() {
                        window.addEventListener("touchend", n), window.addEventListener("mouseup", n), e();
                    }
                    t.$().each(function (t, e) {
                        e.addEventListener("touchstart", s), e.addEventListener("mousedown", s);
                    });
                }),
                (t.radioButton = function (t, e, i) {
                    let n = t.$();
                    n.click((t) => {
                        t.preventDefault(), t.stopPropagation(), !n.hasClass(a.active.name()) ? e() : i();
                    });
                }),
                (t.blurActiveElement = function () {
                    document.activeElement instanceof HTMLElement ? document.activeElement.blur() : window.focus();
                }),
                (t.progressBar = function (t, e) {
                    t.Bar.$().css({ width: e + "%" });
                }),
                (t.fatalError = function (s) {
                    i(!1), n(!1), e(t.stringify(s));
                }),
                (t.fatalErrorStr = e),
                (t.spinner = i),
                (t.progress = n),
                (t.progressUpdate = function (t) {
                    r.App.ProgressLightboxBar.$().attr("style", "width:" + t + "%");
                }),
                (t.saveAndExit = function (e) {
                    e ? t.modal(r.App.SaveAndExitLightbox) : r.App.SaveAndExitLightbox.$().modal("hide");
                });
        })(f || (f = {})),
        (function (t) {
            (t.attachToLink = function (t, e) {
                t.off("dragstart.DragUrl").on("dragstart.DragUrl", function (t) {
                    const i = e();
                    i && t.originalEvent.dataTransfer.setData("DownloadURL", i + ":" + this.href);
                });
            }),
                (t.attachDecorated = function () {
                    $("a[data-dragurl]").on("dragstart", function (t) {
                        const e = $(this).data("dragurl");
                        e && t.originalEvent.dataTransfer.setData("DownloadURL", e);
                    });
                });
        })(w || (w = {})),
        (function (t) {
            const e = ".FileDropper";
            var i,
                o = !0;
            let a, r;
            !(function (t) {
                (t[(t.Dropped = 0)] = "Dropped"), (t[(t.Picked = 1)] = "Picked"), (t[(t.Pasted = 2)] = "Pasted"), (t[(t.Url = 3)] = "Url");
            })((a = t.InputMethod || (t.InputMethod = {}))),
                (function (t) {
                    (t[(t.NoBrowserSupport = 0)] = "NoBrowserSupport"), (t[(t.NonFileInput = 1)] = "NonFileInput"), (t[(t.NonImageInput = 2)] = "NonImageInput");
                })((r = t.ErrorCode || (t.ErrorCode = {}))),
                (t.initialize = function (t) {
                    var s = !1,
                        h = $.extend({}, { hover_class_on: t.monitor_drag, focusPasteOnCtrlV: !!t.monitor_paste, afterPaste: (t) => {} }, t);
                    function l(t, e, i) {
                        h.afterPaste(!1), h.error(t, e, i);
                    }
                    function c() {
                        (o = !1),
                            h.monitor_drag && h.hover_class_on && h.hover_class && h.monitor_drag.$().off(e),
                            h.monitor_file_input && h.monitor_file_input.$().off(e),
                            h.monitor_paste && h.monitor_paste.$().off(e),
                            h.focusPasteOnCtrlV && $(window).off(e);
                    }
                    function u(t, e, i) {
                        o &&
                            (t && t.length > 0
                                ? ("Pasted" == e && h.afterPaste(!0),
                                  h.beforeDrop && h.beforeDrop(),
                                  i == a.Dropped && h.hideDurationMs
                                      ? setTimeout(() => {
                                            h.drop.call(this, t, i), h.dropOnce && c();
                                        }, h.hideDurationMs)
                                      : (h.drop.call(this, t, i), h.dropOnce && c()))
                                : l(n.s(e + " a non-file input"), i, r.NonFileInput));
                    }
                    function d(t, e) {
                        clearTimeout(i), t.stopImmediatePropagation(), t.preventDefault();
                        let n = !1;
                        try {
                            let e = t.originalEvent.dataTransfer;
                            if (e) {
                                let t = e.types;
                                for (let e = 0; e < t.length; e++) {
                                    if ("Files" == t[e]) {
                                        n = !0;
                                        break;
                                    }
                                }
                            }
                        } catch (t) {
                            n = !0;
                        }
                        let s = h.hover_class_on.$().hasClass(h.hover_class.name()),
                            o = e && n;
                        return (
                            s && !o
                                ? (h.beforeHide && h.beforeHide(),
                                  h.hideDurationMs ? setTimeout(() => h.hover_class_on.$().removeClass(h.hover_class.name()), h.hideDurationMs) : h.hover_class_on.$().removeClass(h.hover_class.name()),
                                  h.afterHide && h.afterHide())
                                : !s && o && (h.beforeShow && h.beforeShow(), h.hover_class_on.$().addClass(h.hover_class.name())),
                            n
                        );
                    }
                    function p() {
                        h.pastedUrl ? l(n.s("Pasted something that wasn't an image or URL?"), a.Pasted, r.NonImageInput) : l(n.s("Pasted something that wasn't an image?"), a.Pasted, r.NonImageInput);
                    }
                    function m(t) {
                        let e = new Blob([t], { type: t.type });
                        return (
                            (e.lastModified = t.lastModified),
                            (e.name = (function () {
                                function t(t) {
                                    return ("0" + t).slice(-2);
                                }
                                let e = new Date();
                                return "Pasted-" + e.getFullYear() + t(e.getMonth() + 1) + t(e.getDate()) + "-" + t(e.getHours()) + t(e.getMinutes()) + t(e.getSeconds());
                            })()),
                            e
                        );
                    }
                    return (
                        h.monitor_drag &&
                            h.hover_class_on &&
                            h.hover_class &&
                            h.monitor_drag
                                .$()
                                .on("drop" + e, function (t) {
                                    return d(t, !1) && u(t.originalEvent.dataTransfer.files, "Dropped", a.Dropped), !1;
                                })
                                .on("dragenter" + e, function (t) {
                                    d(t, !0), h.onDragEnter && h.onDragEnter(t);
                                })
                                .on("dragover" + e, function (t) {
                                    let e = d(t, !0);
                                    (t.originalEvent.dataTransfer.dropEffect = o && e ? "copy" : "none"), h.onDragOver && h.onDragOver(t);
                                })
                                .on("dragleave" + e, function (t) {
                                    i = setTimeout(() => {
                                        d(t, !1), h.onDragLeave && h.onDragLeave(t);
                                    }, 100);
                                }),
                        h.monitor_file_input &&
                            h.monitor_file_input.$().on("change" + e, (t) => {
                                let e = t.originalEvent.target;
                                return u(e.files, "Picked", a.Picked), (e.value = null), !1;
                            }),
                        h.monitor_paste &&
                            (h.monitor_paste.$().on("paste" + e, function (t) {
                                if (!o) return;
                                const e = t.originalEvent.clipboardData;
                                if (e && e.files && e.files.length > 0) 1 == e.files.length && "image.png" == e.files[0].name ? u([m(e.files[0])], "Pasted", a.Pasted) : u(e.files, "Pasted", a.Pasted);
                                else if (e && !e.items)
                                    l(
                                        n.s("Terribly sorry, it seems like your browser doesn't fully support pasting of images yet?") + "\n\n" + n.s("Paste should work in at least Chrome, Firefox, and Microsoft Edge. "),
                                        a.Pasted,
                                        r.NoBrowserSupport
                                    );
                                else if (e && e.items && e.items.length > 0 && e.types && e.types.length == e.items.length) {
                                    const t = [];
                                    let i = !1,
                                        n = 0;
                                    for (let s = 0; s < e.items.length; s++)
                                        if ("Files" == e.types[s]) {
                                            let i = e.items[s].getAsFile();
                                            i && ((t[n] = m(i)), n++);
                                        } else
                                            "text/plain" == e.types[s] &&
                                                h.pastedUrl &&
                                                ((i = !0),
                                                e.items[s].getAsString(function (t) {
                                                    (t = t.trim()).length > 5e3 || t.length <= 4 || t.indexOf("\n") >= 0 || t.indexOf("\r") >= 0 || t.indexOf(" ") >= 0 || t.indexOf(".") < 0 ? p() : h.pastedUrl(t);
                                                }));
                                    n > 0 ? u(t, "Pasted", a.Pasted) : i || p();
                                } else p();
                                s && ((s = !1), h.monitor_paste.$().blur()), t.preventDefault();
                            }),
                            h.focusPasteOnCtrlV &&
                                $(window).on("keydown" + e, (t) => {
                                    (t.ctrlKey || t.metaKey) && 86 == t.keyCode && ($(document.activeElement).is("input") || (h.monitor_paste.$().focus(), (s = !0)));
                                })),
                        { disable: c }
                    );
                });
            try {
                XMLHttpRequest.prototype.hasOwnProperty("sendAsBinary") ||
                    s.set(XMLHttpRequest.prototype, "sendAsBinary", function (t) {
                        var e = Array.prototype.map.call(t, function (t) {
                                return 255 & t.charCodeAt(0);
                            }),
                            i = new Uint8Array(e);
                        this.send(i.buffer);
                    });
            } catch (t) {}
        })(b || (b = {})),
        (function (t) {
            (t[(t.Trying = 0)] = "Trying"), (t[(t.Success = 1)] = "Success"), (t[(t.FailureSilent = 2)] = "FailureSilent"), (t[(t.FailureShown = 3)] = "FailureShown"), (t[(t.Stopped = 4)] = "Stopped");
        })(v || (v = {}));
    class rt {
        constructor(t) {
            (this.opts = t),
                (this.tries = 0),
                (this.triesEver = 0),
                (this.lastErrorMessage = ""),
                (this.isTrying = !1),
                (this.state = v.Trying),
                (this.timeout = 0),
                (this.executionStopped = () => {
                    (this.state = v.Stopped), (this.isTrying = !1), (this.tries = 0), (this.lastErrorMessage = ""), S.deregister(this);
                }),
                (this.executionSuccess = () => {
                    (this.state = v.Success), (this.isTrying = !1), (this.tries = 0), (this.lastErrorMessage = ""), this.opts.success(), S.deregister(this);
                }),
                (this.executionError = (t) => {
                    (this.isTrying = !1),
                        (this.lastErrorMessage = t.substr(0, 200)),
                        this.tries < this.opts.numberOfSilentRetriesBeforeShowingErrorToUser
                            ? ((this.state = v.FailureSilent), this.clearTimeout(), (this.timeout = setTimeout(this.tryExecute, this.opts.millisBetweenSilentRetries)))
                            : this.opts.giveUpAfterSilentRetries
                            ? (this.state = v.FailureSilent)
                            : ((this.state = v.FailureShown), S.register(this));
                }),
                (this.executionPunt = () => {
                    (this.isTrying = !1), (this.state = v.FailureSilent), this.clearTimeout(), (this.timeout = setTimeout(this.tryExecute, 100));
                }),
                (this.tryExecute = () => {
                    if ((this.clearTimeout(), !this.isTrying)) {
                        (this.state = v.Trying), (this.isTrying = !0), (this.tries += 1), (this.triesEver += 1);
                        try {
                            this.opts.execute(this.executionSuccess, this.executionError);
                        } catch (t) {
                            (this.tries = Math.max(this.tries, this.opts.numberOfSilentRetriesBeforeShowingErrorToUser)),
                                setTimeout(() => {
                                    this.executionError(t.toString());
                                }, 0);
                        }
                        return !0;
                    }
                    return !1;
                });
        }
        start() {
            return this.tryExecute(), this;
        }
        clearTimeout() {
            this.timeout && (clearTimeout(this.timeout), (this.timeout = 0));
        }
        makeHtmlRow() {
            let t = $(document.createElement("tr"));
            return t.append(f.makeElement("td", this.opts.label)), t.append(f.makeElement("td", this.lastErrorMessage)), t;
        }
        toString() {
            return `RetryInstance(${this.opts.label}, tries: ${this.tries} (${this.triesEver}), err: '${this.lastErrorMessage}', isTrying: ${this.isTrying}, state: ${v[this.state]})`;
        }
    }
    function ht(t, e) {
        if (e)
            try {
                self.postMessage(t, e);
            } catch (e) {
                self.postMessage(t);
            }
        else self.postMessage(t);
    }
    !(function (t) {
        setTimeout(function () {
            !0;
        }, 0);
        var e = [],
            i = 5e3,
            s = 36e5,
            o = null,
            a = 0,
            h = i,
            l = !1;
        function c() {
            var t = r.RetryDialog.Body.$();
            t.empty();
            var i = $(document.createElement("tr"));
            i.append(f.makeElement("th", n.s("Task"))), i.append(f.makeElement("th", n.s("Error"))), t.append(i);
            for (var s = 0; s < e.length; s++) t.append(e[s].makeHtmlRow());
        }
        function u() {
            (a = Date.now()), null != o && (clearInterval(o), (o = null)), (h *= 2) > s && (h = s), r.RetryDialog.Countdown.$().text(n.s("Retrying now..."));
            for (var t = 0; t < e.length; t++) e[t].tryExecute();
        }
        function d() {
            var t = Date.now(),
                e = Math.round((a + h - t) / 1e3);
            e <= 0 ? u() : r.RetryDialog.Countdown.$().text(n.s("Retrying in {0} {0,plural,one{second}other{seconds}}...", e)), c();
        }
        (t.register = function (t) {
            e.indexOf(t) < 0 && (f.gaTrack("ErrorShown", t.opts.label, t.lastErrorMessage, null), e.push(t), c()), f.modal(r.RetryDialog.Dialog.css()), (l = !0), null == o && ((a = Date.now()), (o = setInterval(d, 1e3)));
        }),
            (t.deregister = function (t) {
                var n = e.indexOf(t);
                n >= 0 && (e.splice(n, 1), c()), (h = i), (a = Date.now()), 0 == e.length && l && r.RetryDialog.Dialog.$().modal("hide");
            }),
            $(() => {
                r.RetryDialog.RetryNowButton.$().click(() => {
                    u(), (h = i);
                });
            });
    })(S || (S = {})),
        (function (t) {
            let e = { label: "Unknown", url: "", tries: 3, paramname: "file", withCredentials: !1, data: {}, headers: {}, progress: (t) => {}, success: () => {}, giveUpAfterSilentRetries: !1, timeout: 3e4 };
            function i(t, i, n) {
                let s = $.extend({}, e, i),
                    o = new XMLHttpRequest(),
                    a = o.upload,
                    r = new FormData();
                function h() {
                    o.abort();
                }
                $.each(s.headers, function (t, e) {
                    o.setRequestHeader(t, e);
                }),
                    $.each(s.data, function (t, e) {
                        r.append(t, e);
                    }),
                    r.append(s.paramname, t);
                let l = setTimeout(h, s.timeout),
                    c = 0;
                (a.onprogress = function (t) {
                    if ((clearTimeout(l), (l = setTimeout(h, s.timeout)), t.lengthComputable)) {
                        let e = Math.round((100 * t.loaded) / t.total);
                        c !== e && ((c = e), s.progress(c));
                    }
                }),
                    (a.onerror = function (t) {
                        n.errorHandler(f.formatXhrError(o, void 0));
                    }),
                    (a.onabort = function (t) {
                        n.errorHandler(f.formatXhrError(o, "abort"));
                    }),
                    (a.onloadend = function (t) {
                        clearTimeout(l);
                    }),
                    (o.onload = function () {
                        clearTimeout(l),
                            o.responseText ? (o.status < 200 || o.status > 299 ? n.errorHandler(f.formatXhrError(o, "onload")) : (s.progress(100), n.successHandler(o.responseText))) : n.errorHandler(f.formatXhrError(o, "empty"));
                    }),
                    (o.withCredentials = !!s.withCredentials),
                    o.open("POST", s.url, !0),
                    o.send(r);
            }
            function s(t, s, o) {
                const a = o.url,
                    r = o.backupUrl;
                let h = "",
                    l = $.extend({}, e, o);
                const c = t.size > s.maxBytes;
                return new rt({
                    label: l.label,
                    execute: function (e, o) {
                        c
                            ? o(n.s("The file is too large to upload. ") + n.s("Please pick a file smaller than {0} {0,plural,one{byte}other{bytes}}. ", s.maxBytes))
                            : ((l.url = h = h == a && r ? r : a),
                              (function (t, e, n, s) {
                                  (n.data = {
                                      acl: e.acl || "private",
                                      key: e.key,
                                      policy: e.policy,
                                      success_action_status: 201,
                                      "x-amz-algorithm": "AWS4-HMAC-SHA256",
                                      "x-amz-credential": e.credential,
                                      "x-amz-date": e.date,
                                      "x-amz-signature": e.signature,
                                      "Content-Type": t.type,
                                      "Cache-Control": n.maxAge ? "max-age=" + n.maxAge : "no-cache",
                                  }),
                                      e.token && (n.data["x-amz-security-token"] = e.token),
                                      i(t, n, s);
                              })(t, s, l, { errorHandler: o, successHandler: e }));
                    },
                    success: function () {
                        l.success();
                    },
                    numberOfSilentRetriesBeforeShowingErrorToUser: c ? 0 : l.tries,
                    millisBetweenSilentRetries: 1e3,
                    giveUpAfterSilentRetries: l.giveUpAfterSilentRetries,
                }).start();
            }
            (t.uploadRaw = i),
                (t.uploadS3WithRetry = s),
                (t.uploadS3JsonWithRetry = function (t, e, i) {
                    return s(new Blob([JSON.stringify(t)], { type: "application/json" }), e, i);
                });
        })(y || (y = {})),
        (function (t) {
            t.initialize = function (t, e) {
                t.$().click(function () {
                    let t = prompt(n.s("Please enter the image URL to upload:"));
                    return t && ((t = t.trim()), t.length > 4 && e(t)), !1;
                });
            };
        })(x || (x = {})),
        (function (t) {
            t.list = function () {
                var t = [];
                function e(e, i) {
                    e || t.push(i);
                }
                function i(t, i) {
                    try {
                        e(t(), i);
                    } catch (t) {
                        e(!1, i);
                    }
                }
                return (
                    i(function () {
                        var t = document.createElement("canvas");
                        return !(!t.getContext || !t.getContext("2d"));
                    }, "HTML5 Canvas"),
                    e("undefined" != typeof WebSocket, "WebSockets"),
                    i(function () {
                        var t = document.createElement("div");
                        return "draggable" in t || ("ondragstart" in t && "ondrop" in t);
                    }, "HTML5 Drag-and-Drop"),
                    e("undefined" != typeof URL, "window.URL Support"),
                    e("undefined" != typeof XMLHttpRequest, "XML Http Requests"),
                    i(function () {
                        return "undefined" != typeof Uint32Array && "undefined" != typeof Uint8Array && void 0 !== new Uint8Array(2).set;
                    }, "Native Type Arrays"),
                    i(function () {
                        var t = document.createElement("canvas");
                        (t.width = 1), (t.height = 1);
                        var e = t.getContext("2d").getImageData(0, 0, 1, 1).data;
                        return new Int32Array(e.buffer).length > 0;
                    }, "ImageData.data is not a Uint8ClampedArray"),
                    e(!(!window.history || !window.history.pushState), "HTML5 History"),
                    e("undefined" != typeof Worker, "Web Workers"),
                    e(!!Date.now, "Date.now()"),
                    i(function () {
                        return !!new Blob();
                    }, "Blob and/or Blob Constructor"),
                    t.sort(),
                    t
                );
            };
        })(C || (C = {})),
        (function (t) {
            (t.shareUrl = function (t, e) {
                return "/images/" + t + "/" + e;
            }),
                (t.fetchUrl = function (t) {
                    return "/api/fetchUrl?url=" + encodeURIComponent(t);
                });
        })(P || (P = {})),
        (function (t) {
            var e = /%([0-9A-Fa-f]{2})/g,
                i = /[^\x20-\x7e\xa0-\xff]/g,
                n = /\\([\u0000-\u007f])/g,
                s = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g,
                o = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+\-\.^_`|~])+)$/,
                a = /^([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *(?:$|;)/;
            function r(t) {
                var n = o.exec(t);
                if (!n) throw new TypeError("invalid extended field value");
                var s,
                    a = n[1].toLowerCase(),
                    r = n[2].replace(e, h);
                switch (a) {
                    case "iso-8859-1":
                        s = String(r).replace(i, "?");
                        break;
                    case "utf-8":
                        s = decodeURIComponent(escape(r));
                        break;
                    default:
                        throw new TypeError("unsupported charset in extended field");
                }
                return s;
            }
            function h(t, e) {
                return String.fromCharCode(parseInt(e, 16));
            }
            t.parse = function (t) {
                if (t && "string" == typeof t) {
                    var e = a.exec(t);
                    if (e) {
                        var i,
                            o,
                            h = e[0].length,
                            l = (e[1].toLowerCase(), []),
                            c = {};
                        try {
                            for (h = s.lastIndex = ";" === e[0].substr(-1) ? h - 1 : h; (e = s.exec(t)); ) {
                                if (e.index !== h) throw new TypeError("invalid parameter format");
                                if (((h += e[0].length), (i = e[1].toLowerCase()), (o = e[2]), -1 !== l.indexOf(i))) throw new TypeError("invalid duplicate parameter");
                                l.push(i), i.indexOf("*") + 1 !== i.length ? "string" != typeof c[i] && ('"' === o[0] && (o = o.substr(1, o.length - 2).replace(n, "$1")), (c[i] = o)) : ((i = i.slice(0, -1)), (o = r(o)), (c[i] = o));
                            }
                            if (-1 !== h && h !== t.length) throw new TypeError("invalid parameter format");
                        } catch (t) {}
                        return c.filename;
                    }
                }
            };
        })(A || (A = {})),
        (function (t) {
            const e = { url: "", progress: f.empty, error: f.empty, success: f.empty, withCredentials: !1, contentType: null };
            function i(t, e) {
                return f.blobToFile(t, e || "FetchedFromUrl_" + Date.now());
            }
            t.download = function (t) {
                let s = $.extend({}, e, t),
                    o = f.dataUrlToBlob(s.url) || f.dataUrlToBlob(s.displayUrl);
                if (o)
                    setTimeout(function () {
                        s.success(i(o));
                    }, 0);
                else {
                    let t = new XMLHttpRequest(),
                        e = 0;
                    s.progress != f.empty &&
                        (t.onprogress = (t) => {
                            if (t.lengthComputable) {
                                let i = Math.round((100 * t.loaded) / t.total);
                                e !== i && ((e = i), s.progress(e));
                            }
                        }),
                        (t.onerror = (e) => {
                            s.error(f.formatXhrError(t, void 0));
                        }),
                        (t.onabort = (e) => {
                            s.error(f.formatXhrError(t, "abort"));
                        }),
                        (t.withCredentials = !!s.withCredentials),
                        (t.onload = (e) => {
                            if (t.response)
                                if (t.status < 200 || t.status > 299) {
                                    let e = String.fromCharCode.apply(null, new Uint8Array(t.response));
                                    s.error(n.s('Failed to fetch "{0}"', s.displayUrl || s.url) + "\n" + e);
                                } else {
                                    let e = s.contentType || t.getResponseHeader("Content-Type"),
                                        n = A.parse(t.getResponseHeader("Content-Disposition")),
                                        o = t.response,
                                        a = i(new Blob([o], { type: e }), n);
                                    s.success(a);
                                }
                        }),
                        t.open("GET", s.url, !0),
                        (t.responseType = "arraybuffer"),
                        t.send();
                }
            };
        })(T || (T = {}));
    class lt {
        constructor(t, e = null, i = null, n = null) {
            (this.name = t), (this.scriptUrls = e), (this.workerFunction = i), (this.messageListener = n), (this.myMessageListener = (t) => (this.messageListener ? this.messageListener(t) : void 0));
        }
        static getBasics() {
            return ht.toString();
        }
        ensureWorker() {
            if (!this.worker) {
                let t = "'use strict';\n";
                if (((t += lt.getBasics() + ";\n"), this.scriptUrls && this.scriptUrls.length > 0)) {
                    let e = this.scriptUrls.map(function (t) {
                        return t.length > 1 && "/" == t[0] && "/" == t[1] ? "https:" + t : t.length > 0 && "/" == t[0] ? location.protocol + "//" + location.host + t : t;
                    });
                    t += "importScripts(\n  '" + e.join("',\n  '") + "');\n";
                }
                this.workerFunction && (t += "(" + this.workerFunction.toString() + ")();\n");
                let e = new Blob([t], { type: "text/javascript" }),
                    i = URL.createObjectURL(e);
                (this.worker = new Worker(i)),
                    this.worker.addEventListener("error", (t) => {
                        f.gaTrack("YoWorker", "Error", t.filename + ":" + t.lineno + ":" + t.colno + ", '" + t.message + "', '" + t.error + "'");
                    }),
                    this.worker.addEventListener("message", this.myMessageListener);
            }
            return this.worker;
        }
        setMessageListener(t) {
            this.messageListener = t;
        }
        postMessage(t, e) {
            try {
                try {
                    this.ensureWorker().postMessage(t, e);
                } catch (e) {
                    this.worker.postMessage(t);
                }
            } catch (t) {
                throw (f.gaTrack("YoWorker", "Exception", this.name + ": '" + t + "', '" + t.stack + "'"), t);
            }
        }
        terminate() {
            this.worker && (this.worker.terminate(), (this.worker = null));
        }
    }
    class ct {
        constructor(t) {
            if (((this.store = {}), t))
                for (var e in t) {
                    let i = e.toString();
                    t.hasOwnProperty(i) && this.put(s.cast(i), t[i]);
                }
        }
        static from(t) {
            for (var e = new ct(), i = 0; i < t.length; i++) {
                var n = t[i];
                if (2 == n.length) {
                    var s = n[0],
                        o = n[1];
                    e.put(s, o);
                }
            }
            return e;
        }
        getOrElse(t, e) {
            return this.contains(t) ? this.get(t) : e;
        }
        get(t) {
            return this.store[t.toString()];
        }
        put(t, e) {
            return (this.store[t.toString()] = e);
        }
        contains(t) {
            return this.store.hasOwnProperty(t.toString());
        }
        remove(t) {
            return !!this.contains(t) && (delete this.store[t.toString()], !0);
        }
        clear() {
            this.store = {};
        }
    }
    class ut {
        constructor(t) {
            if (((this.store = {}), (this.size_ = 0), t)) for (var e = 0; e < t.length; e++) this.add(t[e]);
        }
        size() {
            return this.size_;
        }
        add(t) {
            return !this.contains(t) && (this.size_++, (this.store[t.toString()] = !0));
        }
        addAll(t) {
            let e = !0;
            for (let i = 0; i < t.length; i++) e = e && this.add(t[i]);
            return e;
        }
        remove(t) {
            return !!this.contains(t) && (delete this.store[t.toString()], this.size_--, !0);
        }
        contains(t) {
            return this.store.hasOwnProperty(t.toString());
        }
    }
    function dt() {
        class t {
            constructor(t, e, i, n, s) {
                (this.dataIn = t), (this.wIn = e), (this.hIn = i), (this.wOut = n), (this.hOut = s), (this.dataOut = new Uint8ClampedArray(n * s * 4)), (this.outToInX = this.wIn / this.wOut), (this.outToInY = this.hIn / this.hOut);
                let o = t.length,
                    a = !1;
                for (let e = 3; e < o; e += 4) {
                    if (t[e] < 255) {
                        a = !0;
                        break;
                    }
                }
                (this.hasTransparency = a), (this.accumulate = this.hasTransparency ? this.accumulateRgba : this.accumulateRgb);
            }
            reset() {
                (this.aSum = 0), (this.rSum = 0), (this.gSum = 0), (this.bSum = 0), (this.wSum = 0);
            }
            accumulateRgb(t, e, i) {
                const n = 4 * (t + this.wIn * e);
                (this.rSum += this.dataIn[n + 0] * i), (this.gSum += this.dataIn[n + 1] * i), (this.bSum += this.dataIn[n + 2] * i), (this.wSum += i);
            }
            accumulateRgba(t, e, i) {
                const n = 4 * (t + this.wIn * e);
                let s = (this.dataIn[n + 3] / 255 + 1e-12) * i;
                (this.aSum += s), (this.rSum += this.dataIn[n + 0] * s), (this.gSum += this.dataIn[n + 1] * s), (this.bSum += this.dataIn[n + 2] * s), (this.wSum += i);
            }
            populate(t, e) {
                this.reset();
                const i = t * this.outToInX,
                    n = e * this.outToInY,
                    s = Math.min(i + this.outToInX, this.wIn),
                    o = Math.min(n + this.outToInY, this.hIn),
                    a = Math.floor(i),
                    r = Math.floor(n),
                    h = Math.ceil(s) - 1,
                    l = Math.ceil(o) - 1,
                    c = Math.ceil(i),
                    u = Math.ceil(n),
                    d = h,
                    p = l,
                    m = c - i,
                    g = u - n,
                    f = s - d,
                    w = o - p;
                this.accumulate(a, r, m * g), this.accumulate(a, l, m * w);
                for (var b = c; b < d; b++) this.accumulate(b, r, g), this.accumulate(b, l, w);
                this.accumulate(h, r, f * g), this.accumulate(h, l, f * w);
                for (var v = u; v < p; v++) {
                    this.accumulate(a, v, m);
                    for (b = c; b < d; b++) this.accumulate(b, v, 1);
                    this.accumulate(h, v, f);
                }
                const S = 4 * (t + e * this.wOut);
                this.hasTransparency
                    ? ((this.dataOut[S + 0] = this.rSum / this.aSum), (this.dataOut[S + 1] = this.gSum / this.aSum), (this.dataOut[S + 2] = this.bSum / this.aSum), (this.dataOut[S + 3] = (this.aSum / this.wSum) * 255))
                    : ((this.dataOut[S + 0] = this.rSum / this.wSum), (this.dataOut[S + 1] = this.gSum / this.wSum), (this.dataOut[S + 2] = this.bSum / this.wSum), (this.dataOut[S + 3] = 255));
            }
            shrink() {
                for (var t = 0, e = 0; t < this.hOut; t++) for (var i = 0; i < this.wOut; i++, e++) this.populate(i, t);
                return this.dataOut;
            }
        }
        var e = [];
        function i(i) {
            e.push(Date.now());
            const n = ((s = i.dataIn), (o = i.wIn), (a = i.hIn), (r = i.wOut), (h = i.hOut), new t(s, o, a, r, h).shrink());
            var s, o, a, r, h;
            return Date.now(), e.pop(), n;
        }
        self.addEventListener("message", (t) => {
            try {
                var e = t.data;
                const n = i(e);
                ht({ canvasId: e.canvasId, success: !0, wOut: e.wOut, hOut: e.hOut, dataOut: n }, [n.buffer]);
            } catch (t) {
                ht({ canvasId: e.canvasId, success: !1, wOut: 0, hOut: 0, dataOut: null });
            }
        });
    }
    !(function (t) {
        let e = !0,
            i = 0;
        const n = new ct();
        t.ThumbnailJpegQuality = 0.7;
        class s {
            constructor(t, e) {
                if (((this.canvasId = t), (this.spec = e), (this.failSafeTimeout = void 0), (this.croppedCanvas = this.spec.inputCanvas), this.spec.crop)) {
                    const t = this.spec.crop,
                        e = t.right - t.left,
                        i = t.bottom - t.top;
                    if (0 != t.top || 0 != t.left || e != this.spec.inputCanvas.width() || i != this.spec.inputCanvas.height()) {
                        const n = new at(e, i);
                        n.context().drawCanvasEx3(this.spec.inputCanvas, t.left, t.top, n.width(), n.height(), 0, 0, n.width(), n.height()), (this.croppedCanvas = n), (this.croppedCanvas.wasCropped = !0);
                    }
                }
                let i = this.croppedCanvas.width(),
                    n = this.croppedCanvas.height();
                (this.wOut = i), (this.hOut = n);
                if (i * n > this.spec.maxNumPixels) {
                    const t = Math.sqrt(this.spec.maxNumPixels / (i * n));
                    if (i < n) {
                        for (this.wOut = Math.max(1, 0 | Math.round(i * t)), this.hOut = 0 | Math.round((n * this.wOut) / i); this.wOut * this.hOut > this.spec.maxNumPixels && this.wOut > 1; )
                            this.wOut--, (this.hOut = 0 | Math.round((n * this.wOut) / i));
                        1 == this.wOut && this.hOut > this.spec.maxNumPixels && (this.hOut = this.spec.maxNumPixels);
                    } else {
                        for (this.hOut = Math.max(1, 0 | Math.round(n * t)), this.wOut = 0 | Math.round((i * this.hOut) / n); this.wOut * this.hOut > this.spec.maxNumPixels && this.hOut > 1; )
                            this.hOut--, (this.wOut = 0 | Math.round((i * this.hOut) / n));
                        1 == this.hOut && this.wOut > this.spec.maxNumPixels && (this.wOut = this.spec.maxNumPixels);
                    }
                }
            }
            shrinkingNeeded() {
                return this.wOut != this.croppedCanvas.width() || this.hOut != this.croppedCanvas.height();
            }
            createOutputCanvas() {
                return new at(this.wOut, this.hOut);
            }
            shrinkWithWorker() {
                try {
                    const t = this.croppedCanvas.context().getImageData(0, 0, this.croppedCanvas.width(), this.croppedCanvas.height()).data,
                        e = { canvasId: this.canvasId, wIn: this.croppedCanvas.width(), hIn: this.croppedCanvas.height(), dataIn: t, wOut: this.wOut, hOut: this.hOut };
                    (this.failSafeTimeout = setTimeout(() => this.shrinkWithWorkerFailSafe("fail-safe timeout reached"), 1e4)), this.spec.worker.setMessageListener(o), this.spec.worker.postMessage(e, [t.buffer]);
                } catch (t) {
                    this.shrinkWithWorkerFailSafe("exception in spawning worker or sending work message");
                }
            }
            shrinkWithWorkerResultHandler(t) {
                if (t.success && t.wOut == this.wOut && t.hOut == this.hOut && null != t.dataOut && t.dataOut.length > 0) {
                    f.gaTrack("WebWorker", "Downsample", "Succeeded", 1);
                    const e = this.createOutputCanvas(),
                        i = e.context().createImageData(e.width(), e.height());
                    i.data.set(t.dataOut), e.context().putImageData(i, 0, 0), (e.wasShrunk = !0), (e.wasCropped = this.croppedCanvas.wasCropped), this.completed(e);
                } else this.shrinkWithWorkerFailSafe("Worker reports failure");
            }
            shrinkWithWorkerFailSafe(t) {
                f.gaTrack("WebWorker", "Downsample", "Failed", 0), (e = !1), this.shrinkWithoutWorker();
            }
            shrinkWithoutWorker() {
                var t = this.createOutputCanvas();
                t.context().drawCanvasEx2(this.croppedCanvas, 0, 0, t.width(), t.height()), (t.wasShrunk = !0), (t.wasCropped = this.croppedCanvas.wasCropped), this.completed(t);
            }
            produceThumbnail(e) {
                if (this.spec.thumbnailSize) {
                    const i = this.spec.thumbnailSize.w,
                        n = this.spec.thumbnailSize.h,
                        s = new at(i, n);
                    s.context().setFillStyle("rgb(255,255,255)"), s.context().fillRect(0, 0, i, n);
                    const o = Math.min(i / e.width(), n / e.height());
                    return s.context().context.drawImage(e.element, (i - e.width() * o) / 2, (n - e.height() * o) / 2, e.width() * o, e.height() * o), s.toBlob("image/jpeg", t.ThumbnailJpegQuality);
                }
                return null;
            }
            completed(t) {
                clearTimeout(this.failSafeTimeout), (this.failSafeTimeout = void 0), n.remove(this.canvasId), this.spec.completed(t, t.wasShrunk || t.wasCropped, () => this.produceThumbnail(t));
            }
            process() {
                this.shrinkingNeeded() ? (e && this.spec.worker ? this.shrinkWithWorker() : this.shrinkWithoutWorker()) : this.completed(this.croppedCanvas);
            }
        }
        function o(t) {
            const e = t.data;
            n.contains(e.canvasId) && n.get(e.canvasId).shrinkWithWorkerResultHandler(e);
        }
        t.process = function (t) {
            const e = new s("cs_" + i++, t);
            n.put(e.canvasId, e), e.process();
        };
    })(k || (k = {})),
        (function (t) {
            let e;
            (t.isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0),
                (t.zoomDelta = function (t, e = 1.2, i = !0) {
                    let n = i ? t.deltaY : (t.deltaY * t.deltaFactor) / 100;
                    return Math.pow(e, n);
                }),
                (function (t) {
                    (t[(t.CanvasEnter = 0)] = "CanvasEnter"),
                        (t[(t.CanvasLeave = 1)] = "CanvasLeave"),
                        (t[(t.Hover = 2)] = "Hover"),
                        (t[(t.Tap = 3)] = "Tap"),
                        (t[(t.ActionStart = 4)] = "ActionStart"),
                        (t[(t.ActionMove = 5)] = "ActionMove"),
                        (t[(t.ActionEnd = 6)] = "ActionEnd"),
                        (t[(t.PanZoom = 7)] = "PanZoom"),
                        (t[(t.DoubleClick = 8)] = "DoubleClick"),
                        (t[(t.MomentumTranslate = 9)] = "MomentumTranslate");
                })((e = t.InteractionType || (t.InteractionType = {})));
            class i {
                constructor(t, e, i, n, s, o, a, r, h) {
                    (this.type = t),
                        (this.interactionIdentifier = e),
                        (this.referenceInteraction = i),
                        (this.pageX = n),
                        (this.pageY = s),
                        (this.zoomTo = o),
                        (this.canvas = a),
                        (this.isTouch = r),
                        (this.isFirstPan = h),
                        (this.numTouches = 0),
                        i || (this.referenceInteraction = this),
                        (this.timestamp = Date.now());
                }
                dup(t) {
                    return new i(t, this.interactionIdentifier, this.referenceInteraction, this.pageX, this.pageY, this.zoomTo, this.canvas, this.isTouch, this.isFirstPan);
                }
                getReferenceBefore(t) {
                    let e = this.timestamp - t,
                        i = this.referenceInteraction;
                    for (; i.referenceInteraction.timestamp > e && i != i.referenceInteraction; ) i = i.referenceInteraction;
                    return i;
                }
                getMostRecentTwoTouch(t) {
                    let e = this.timestamp - t,
                        i = this.referenceInteraction;
                    for (; i.numTouches < 2 && i.referenceInteraction.timestamp > e && i != i.referenceInteraction; ) i = i.referenceInteraction;
                    return 2 == i.numTouches ? i : void 0;
                }
                isMousePanEnd() {
                    return this.type == e.ActionEnd && this.referenceInteraction.type == e.ActionMove;
                }
                shouldStopMouseMomentumPan() {
                    return this.type == e.ActionStart || this.type == e.ActionMove || this.type == e.DoubleClick || this.type == e.Tap || this.type == e.PanZoom;
                }
                isTouchPanEnd() {
                    return !!!this.getMostRecentTwoTouch(500) && this.type == e.CanvasLeave && this.referenceInteraction.type == e.PanZoom;
                }
                shouldStopTouchMomentumPan() {
                    return this.type == e.ActionStart || this.type == e.ActionMove || this.type == e.DoubleClick || this.type == e.Tap || this.type == e.CanvasEnter;
                }
            }
            t.Interaction = i;
            class n {
                constructor(t, e, i) {
                    (this.identifier = t), (this.pageX = e), (this.pageY = i);
                }
                static from(t) {
                    return new n(t.identifier, t.pageX, t.pageY);
                }
                find(t) {
                    for (let e = 0; e < t.length; e++) {
                        const i = t.item(e);
                        if (i.identifier == this.identifier) return i;
                    }
                    return null;
                }
                distanceSqrTo(t) {
                    const e = this.pageX - t.pageX,
                        i = this.pageY - t.pageY;
                    return e * e + i * i;
                }
                distanceTo(t) {
                    return Math.max(1, Math.sqrt(this.distanceSqrTo(t)));
                }
                isNull() {
                    return this == t.NullTouch;
                }
            }
            (t.YoTouch = n),
                (t.TouchSpaceRadiusPx = 10),
                (t.TouchSpaceRadiusSqrPx = t.TouchSpaceRadiusPx * t.TouchSpaceRadiusPx),
                (t.TouchTimeBoxMs = 300),
                (t.DoubleTapRadiusPx = 20),
                (t.DoubleTapTimeMs = 300),
                (t.NullTouch = new n(null, 0, 0));
            let s = !1;
            try {
                let t = Object.defineProperty({}, "passive", {
                    get: function () {
                        s = !0;
                    },
                });
                window.addEventListener("test", null, t);
            } catch (t) {}
            t.AddEventListenerThirdArgForTouch = !!s && { passive: !1 };
        })(E || (E = {})),
        (function (t) {
            t.Mega = 1048576;
            const e = 10,
                i = 100,
                n = 20,
                s = 18;
            t.initialized = !1;
            var o = null;
            (t.lockAspectRatio = !1), (t.maxNumMegapixels = 4);
            var a = 0,
                h = 0;
            const l = it.empty();
            var c = 1,
                u = null,
                d = null,
                p = 0,
                g = 0,
                w = 0,
                b = 0;
            const v = st.empty();
            var S = 1,
                y = 1,
                x = 0,
                C = 0;
            const P = it.empty(),
                A = it.empty(),
                T = it.empty(),
                k = it.empty();
            var I = !1;
            const M = it.empty(),
                R = st.empty(),
                F = st.empty();
            class D {
                constructor(t, e) {
                    (this.key = t), (this.anchor = e), (this.oppositeAnchor = m.opposite(this.anchor));
                }
            }
            var _ = null;
            const B = new D("resize-top", m.Top),
                L = new D("resize-top-right", m.TopRight),
                U = new D("resize-right", m.Right),
                N = new D("resize-bottom-right", m.BottomRight),
                z = new D("resize-bottom", m.Bottom),
                O = new D("resize-bottom-left", m.BottomLeft),
                W = new D("resize-left", m.Left),
                H = new D("resize-top-left", m.TopLeft),
                V = new D("resize-move", m.Center);
            let X = !1;
            function Y(e, i, n, s, a) {
                n.$().text(e.toFixed(0) + " x " + i.toFixed(0) + " px"), s.$().text(f.formatAspectRatio(f.fuzzyAspectRatioEx({ w: e, h: i }, o.aspectRatios))), a.$().text(((e * i) / t.Mega).toFixed(1));
            }
            function G() {
                r.PreCrop.Sidebar.MaxNumMegapixels.display.$().text(t.maxNumMegapixels + " megapixels"),
                    Y(Math.round(F.width()), Math.round(F.height()), r.PreCrop.Sidebar.cropped_image_size_display, r.PreCrop.Sidebar.cropped_image_aspect_ratio_display, r.PreCrop.Sidebar.cropped_image_megapixels_display),
                    r.PreCrop.Sidebar.lock_aspect_ratio_button.$().prop("checked", t.lockAspectRatio);
                const e = (F.width() * F.height()) / t.Mega > t.maxNumMegapixels;
                r.PreCrop.Sidebar.cropped_image_warning.$().toggle(e), r.PreCrop.Sidebar.cropped_image_success.$().toggle(!e), r.PreCrop.Sidebar.cropped_image_megapixels_display.$().attr("style", e ? "color:red;" : "");
            }
            function q() {
                (t.lockAspectRatio = !t.lockAspectRatio), ct(), G();
            }
            function j() {
                (t.maxNumMegapixels = Math.min(t.maxNumMegapixels + 1, o.maxMaxNumMegapixels)), G();
            }
            function Z() {
                (t.maxNumMegapixels = Math.max(1, t.maxNumMegapixels - 1)), G();
            }
            function Q() {
                $(window).off("beforeunload"), location.reload();
            }
            function J() {
                const t = F.width(),
                    e = F.height();
                t > 0 && e > 0 && null != o.completed && (o.completed(F), r.PreCrop.App.$().hide(), X || r.body.$().removeClass("modal-open"));
            }
            function K(t, e) {
                if (null != t && null != e) {
                    P.set(T), A.set(k);
                    var i = $(d.element).offset();
                    return T.setXy(t - i.left, e - i.top), (n = T), k.setXy((n.x - v.left) * y, (n.y - v.top) * y), P.notEquals(T) || A.notEquals(k);
                }
                var n;
                return !1;
            }
            function tt() {
                const t = 20 * y,
                    e = Math.abs(k.x - F.left) < t,
                    i = Math.abs(k.y - F.top) < t,
                    n = Math.abs(k.x - F.right) < t,
                    s = Math.abs(k.y - F.bottom) < t,
                    o = F.center(),
                    a = Math.abs(k.x - o.x) < t && Math.abs(k.y - o.y) < t;
                var r = null;
                k.x > F.left - t && k.x < F.right + t && k.y > F.top - t && k.y < F.bottom + t && (e ? (r = i ? H : s ? O : W) : n ? (r = i ? L : s ? N : U) : i ? (r = B) : s ? (r = z) : a && (r = V)), et(r);
            }
            function et(t) {
                (_ = t), null == t ? $(d.element).attr("class", "canvas-view") : $(d.element).attr("class", _.key + "-tool canvas-view"), xt();
            }
            function nt(t) {
                const e = t.touches.item(0);
                lt(e.pageX, e.pageY), dt(e.pageX, e.pageY), t.preventDefault();
            }
            function ot(t) {
                const e = t.touches.item(0);
                lt(e.pageX, e.pageY), t.preventDefault();
            }
            function rt(t) {
                mt(-1e5, -1e5), t.preventDefault();
            }
            function ht(t) {
                lt(t.pageX, t.pageY);
            }
            function lt(t, e) {
                const n = K(t, e);
                if (I) {
                    if (null != _ && n) {
                        F.setFrom(R), F.moveAnchor(_.anchor, k.minus(M)), F.normalize(), (F.left = Math.max(F.left, 0)), (F.top = Math.max(F.top, 0)), (F.right = Math.min(F.right, a)), (F.bottom = Math.min(F.bottom, h)), F.round();
                        Math.round(Math.max(0, i - F.width())), Math.round(Math.max(0, i - F.height()));
                        F.moveAnchorToMinSize(_.anchor, i, i), F.round(), ct(), G(), xt();
                    }
                } else tt();
            }
            function ct() {
                if (t.lockAspectRatio) {
                    var e = m.Center;
                    if ((null != _ && (e = _.oppositeAnchor), F.forceAspectRatio(c, e), F.width() > a || F.height() > h)) F.set(0, 0, a, h);
                    else {
                        const t = Math.max(0, -F.left) + Math.min(0, a - F.right),
                            e = Math.max(0, -F.top) + Math.min(0, h - F.bottom);
                        F.translate(t, e);
                    }
                    F.round(), xt();
                }
            }
            function ut(t) {
                dt(t.pageX, t.pageY), $(window).on("mouseup", pt), $(window).on("mousemove", ht);
            }
            function dt(t, e) {
                (I = !0), M.set(k), R.setFrom(F), K(t, e);
            }
            function pt(t) {
                mt(t.pageX, t.pageY), $(window).off("mouseup", pt), $(window).off("mousemove", ht);
            }
            function mt(t, e) {
                (I = !1), $(window).off("mouseup", pt), $(window).off("mousemove", ht), K(t, e), tt();
            }
            function gt(t) {
                I || et(null);
            }
            function ft(t) {
                I || (K(t.pageX, t.pageY), tt());
            }
            function wt() {
                null != u &&
                    null != d &&
                    ((p = u.outerWidth()),
                    (g = u.outerHeight()),
                    (d.width() == p && d.height() == g) || d.setSize(p, g),
                    (b = g - 20) / (w = p - 20) > h / a ? ((v.left = e), (C = (h / a) * (x = w)), (v.top = e + 0.5 * (b - C))) : ((v.top = e), (x = (a / h) * (C = b)), (v.left = e + 0.5 * (w - x))),
                    (v.right = v.left + x),
                    (v.bottom = v.top + C),
                    (y = 1 / (S = x / a))),
                    G(),
                    xt();
            }
            function bt(t) {
                return new it(v.left + t.x * S, v.top + t.y * S);
            }
            function vt(t, e, i, o, a) {
                const r = _ == a,
                    h = bt(e);
                t.setFillStyle("#ffffff"),
                    t.fillRect(h.x + i, h.y + o, i * n, 6 * o),
                    t.fillRect(h.x + i, h.y + o, 6 * i, o * n),
                    t.setFillStyle(r ? "#ff0000" : "#000000"),
                    t.fillRect(h.x + 2 * i, h.y + 2 * o, i * s, 4 * o),
                    t.fillRect(h.x + 2 * i, h.y + 2 * o, 4 * i, o * s);
            }
            function St(t, e, i, o) {
                const a = _ == o,
                    r = bt(e);
                t.setFillStyle("#ffffff"), t.fillRect(r.x + i, r.y - 10, 6 * i, n), t.setFillStyle(a ? "#ff0000" : "#000000"), t.fillRect(r.x + 2 * i, r.y - 9, 4 * i, s);
            }
            function yt(t, e, i, o) {
                const a = _ == o,
                    r = bt(e);
                t.setFillStyle("#ffffff"), t.fillRect(r.x - 10, r.y + i, n, 6 * i), t.setFillStyle(a ? "#ff0000" : "#000000"), t.fillRect(r.x - 9, r.y + 2 * i, s, 4 * i);
            }
            function xt() {
                if (null != o.inputCanvas && null != d && 0 != p && 0 != g) {
                    const i = d.context();
                    i.clearRect(0, 0, p, g), i.drawCanvasEx2(o.inputCanvas, v.left, v.top, x, C), i.setStrokeStyle("#000000"), i.setGlobalAlpha(0.4), i.setLineWidth(1);
                    const n = Math.round(((e = F.left), v.left + e * S)) + 0.5,
                        s = Math.round(((t = F.top), v.top + t * S)) + 0.5,
                        a = Math.round(F.width() * S) - 1,
                        r = Math.round(F.height() * S) - 1;
                    i.strokeRect(n, s, a, r),
                        i.setGlobalAlpha(1),
                        vt(i, F.topLeft(), 1, 1, H),
                        vt(i, F.topRight(), -1, 1, L),
                        vt(i, F.bottomRight(), -1, -1, N),
                        vt(i, F.bottomLeft(), 1, -1, O),
                        St(i, F.leftCenter(), 1, W),
                        St(i, F.rightCenter(), -1, U),
                        yt(i, F.topCenter(), 1, B),
                        yt(i, F.bottomCenter(), -1, z),
                        (function (t, e, i) {
                            var n = 17.5,
                                s = _ == i ? "#ff0000" : "#000000";
                            const o = bt(e);
                            t.beginPath(),
                                t.triangle(o.x, o.y - n, -Math.PI / 2, 2, 5),
                                t.triangle(o.x, o.y + n, Math.PI / 2, 2, 5),
                                t.triangle(o.x - n, o.y, Math.PI, 2, 5),
                                t.triangle(o.x + n, o.y, 0, 2, 5),
                                t.strokeEx(2, "#FFF"),
                                t.fillEx(s),
                                t.fillCircle(o.x, o.y, 12, "#FFFFFF"),
                                t.fillCircle(o.x, o.y, 11, s);
                        })(i, F.center(), V);
                }
                var t, e;
            }
            t.show = function (e) {
                (a = (o = e).inputCanvas.width()),
                    (h = o.inputCanvas.height()),
                    l.setXy(0.5 * a, 0.5 * h),
                    F.set(0, 0, a, h),
                    (c = h / a),
                    (t.lockAspectRatio = !!o.lockAspectRatio),
                    (t.maxNumMegapixels = o.maxNumMegapixels),
                    t.initialized ||
                        ((t.initialized = !0),
                        (u = r.PreCrop.ViewContainer.$()),
                        (d = new at(u.outerWidth(), u.outerHeight())),
                        u.append(d.element),
                        $(d.element).mousedown(ut).mouseup(pt).mousemove(ht).hover(ft, gt),
                        d.element.addEventListener("touchstart", nt, E.AddEventListenerThirdArgForTouch),
                        d.element.addEventListener("touchmove", ot, E.AddEventListenerThirdArgForTouch),
                        d.element.addEventListener("touchend", rt, E.AddEventListenerThirdArgForTouch),
                        r.PreCrop.Sidebar.crop_button.$().click(J),
                        r.PreCrop.Sidebar.cancel_button.$().click(Q),
                        r.PreCrop.Sidebar.lock_aspect_ratio_button.$().click(q),
                        o.maxMaxNumMegapixels
                            ? (r.PreCrop.Sidebar.MaxNumMegapixels.decrease.$().click(Z), r.PreCrop.Sidebar.MaxNumMegapixels.increase.$().click(j))
                            : (r.PreCrop.Sidebar.MaxNumMegapixels.decrease.$().hide(), r.PreCrop.Sidebar.MaxNumMegapixels.increase.$().hide()),
                        $(window).resize(wt)),
                    Y(a, h, r.PreCrop.Sidebar.input_image_size_display, r.PreCrop.Sidebar.input_image_aspect_ratio_display, r.PreCrop.Sidebar.input_image_megapixels_display),
                    G(),
                    r.PreCrop.App.$().show(),
                    (X = r.body.$().hasClass("modal-open")),
                    X || r.body.$().addClass("modal-open"),
                    setTimeout(wt, 0);
            };
        })(I || (I = {})),
        (function (t) {
            function e(t) {
                return function (e, i, n) {
                    t(f.formatXhrError(e, i));
                };
            }
            function n(t, e) {
                return function (i, n, s) {
                    i.error ? t(i.error) : e(i);
                };
            }
            (t.createUserImageSpec = function (t, s, o, a, r, h) {
                const l = {
                    originalFilename: o.name,
                    contentType: o.type,
                    w: a.width(),
                    h: a.height(),
                    sizePixels: a.width() * a.height(),
                    sizeBytes: o.size,
                    originalW: t.w,
                    originalH: t.h,
                    originalSizePixels: t.sizePixels,
                    originalSizeBytes: t.sizeBytes,
                    originalDpiOpt: t.dpi,
                    wasShrunk: a.wasShrunk,
                    wasTransparent: t.transparent,
                    isGifImage: s,
                };
                i.ajax({ url: "/api/images", cache: !1, data: l, dataType: "json", error: e(r), success: n(r, h), type: "POST" });
            }),
                (t.readUserImageSpec = function (t, i, s, o) {
                    $.ajax("/api/images/" + t + "/" + i, { cache: !1, dataType: "json", error: e(s), success: n(s, o), type: "GET" });
                }),
                (t.setStickySettings = function (t, s, o) {
                    i.ajax({ url: "/api/setStickySettings?stickySettings=" + encodeURIComponent(JSON.stringify(t)), cache: !1, data: {}, dataType: "json", error: e(s), success: n(s, o), type: "POST" });
                }),
                (t.getWorkerUrl = function (t, e) {
                    let i = ("http:" == location.protocol ? "ws:" : "wss:") + "//" + location.host + t + "?" + window.GlobalsEx.LocaleParameter;
                    for (let t in e) e.hasOwnProperty(t) && (i += "&" + t + "=" + e[t]);
                    return i;
                });
        })(M || (M = {})),
        (function (t) {
            const e = "stickySettings";
            var i = null;
            function n() {
                window.GlobalsEx.email &&
                    M.setStickySettings(
                        i,
                        function (t) {},
                        function (t) {}
                    );
                try {
                    window.localStorage[e] = JSON.stringify(i);
                } catch (t) {}
            }
            (t.initialize = function () {
                if (!(i = window.GlobalsEx.stickySettings))
                    try {
                        i = JSON.parse(window.localStorage[e]);
                    } catch (t) {
                        i = {};
                    }
            }),
                (t.fullyAutomatic = function (t) {
                    return void 0 === t ? 0 != i.fullyAutomatic : ((i.fullyAutomatic = t), n(), t);
                }),
                (t.preCropEnabled = function (t) {
                    return void 0 === t ? 1 == i.preCropEnabled : ((i.preCropEnabled = t), n(), t);
                }),
                (t.splitView = function (t) {
                    return void 0 === t ? 0 != i.splitView : ((i.splitView = t), n(), t);
                });
        })(R || (R = {})),
        (function (t) {
            const e = new lt("Downsampler", [], dt);
            t.loadImageShrinkAndThumbnail = function (i, n, s, o) {
                t.loadCheckRotateFlattenImage(i, n, (n) => {
                    let a = z.MaxMaxNumPixels;
                    const r = n.width() * n.height(),
                        h = r > a,
                        l = { w: n.width(), h: n.height(), sizePixels: r, sizeBytes: i.size, transparent: !1 };
                    function c(r) {
                        k.process({
                            inputCanvas: n,
                            crop: r,
                            maxNumPixels: a,
                            thumbnailSize: void 0,
                            worker: o ? e : void 0,
                            completed: function (e, n, o) {
                                if (n || t.needsReencoding(i.type)) {
                                    let n = t.recodeCanvasFile(i, e);
                                    s(l, n, e);
                                } else s(l, i, e);
                            },
                        });
                    }
                    h && R.preCropEnabled()
                        ? I.show({
                              inputFile: i,
                              inputCanvas: n,
                              lockAspectRatio: void 0,
                              maxNumMegapixels: z.MaxMaxNumMegapixels,
                              maxMaxNumMegapixels: z.MaxMaxNumMegapixels,
                              aspectRatios: [],
                              completed: (t) => {
                                  (a = 1024 * I.maxNumMegapixels * 1024), c(t);
                              },
                          })
                        : c();
                });
            };
        })(F || (F = {}));
    class pt {
        constructor(t, e, i, n, s, o) {
            (this.btn = t),
                (this.action = e),
                (this.delay = i),
                (this.firstDelayMultiplier = n),
                (this.ondown = s),
                (this.onup = o),
                (this.t = void 0),
                (this.repeat = () => {
                    this.action(), (this.t = setTimeout(this.repeat, this.delay));
                }),
                (this.startHandler = (t) => {
                    this.btn.on("mouseup mouseout", this.endHandler), this.ondown && this.ondown(), this.action(), (this.t = setTimeout(this.repeat, this.delay * this.firstDelayMultiplier)), t.preventDefault();
                }),
                (this.endHandler = (t) => {
                    this.btn.off("mouseup mouseout", this.endHandler), this.onup && this.onup(), clearTimeout(this.t), (this.t = void 0), t.preventDefault();
                }),
                t.on("touchstart mousedown", this.startHandler),
                t.on("touchend", this.endHandler);
        }
    }
    class mt {
        static empty() {
            return new mt(0, 0, 0, wt.empty());
        }
        constructor(t, e, i, n, s) {
            (this.imageTypeE = t), (this.imageComplexityE = e), (this.usePalette = i), (this.palette = n), (this.segmentationEdits = s);
        }
        getImageTypeE() {
            return this.imageTypeE;
        }
        getImageComplexityE() {
            return this.imageComplexityE;
        }
        getUsePalette() {
            return 1 == this.usePalette;
        }
        getPalette() {
            return this.palette;
        }
        getSegmentationEdits() {
            return this.segmentationEdits;
        }
        equals(t) {
            return (
                this.imageTypeE == t.imageTypeE && this.imageComplexityE == t.imageComplexityE && this.usePalette == t.usePalette && (1 != this.usePalette || this.palette.equals(t.palette)) && this.segmentationEdits == t.segmentationEdits
            );
        }
        equalsIgnoringSegEdits(t) {
            return this.imageTypeE == t.imageTypeE && this.imageComplexityE == t.imageComplexityE && this.usePalette == t.usePalette && (1 != this.usePalette || this.palette.equals(t.palette));
        }
        isEmpty() {
            return 0 == this.imageTypeE;
        }
        addClass(t) {
            return this.imageTypeCss().$().addClass(t), this.imageComplexityCss().$().addClass(t), this.usePaletteCss().$().addClass(t), this;
        }
        removeClass(t) {
            return this.imageTypeCss().$().removeClass(t), this.imageComplexityCss().$().removeClass(t), this.usePaletteCss().$().removeClass(t), this;
        }
        imageTypeCss() {
            switch (this.imageTypeE) {
                case 1:
                    return r.App.Sidebar.ImageType.Photo;
                case 2:
                    return r.App.Sidebar.ImageType.LogoAA;
                case 3:
                    return r.App.Sidebar.ImageType.Logo;
                default:
                    return r.empty;
            }
        }
        imageComplexityCss() {
            switch (this.imageComplexityE) {
                case 3:
                    return r.App.Sidebar.ImageComplexity.high;
                case 2:
                    return r.App.Sidebar.ImageComplexity.medium;
                case 1:
                    return r.App.Sidebar.ImageComplexity.low;
                default:
                    return r.empty;
            }
        }
        usePaletteCss() {
            switch (this.usePalette) {
                case 1:
                    return r.App.Sidebar.PaletteYesNo.CustomColors;
                case 2:
                    return r.App.Sidebar.PaletteYesNo.UnlimitedColors;
                default:
                    return r.empty;
            }
        }
        toCommand(t) {
            return { jobId: t, imageTypeE: this.imageTypeE, imageComplexityE: this.imageComplexityE, paletteS: 1 == this.usePalette ? this.palette.getPaletteString() : void 0, segmentationEdits: this.segmentationEdits };
        }
        name() {
            const t = 1 == this.usePalette ? this.palette.getPaletteString() : "unlimited";
            return "vc_" + this.imageTypeE + "_" + this.imageComplexityE + "_" + this.usePalette + "_" + t + "_" + (this.segmentationEdits || "unedited");
        }
        getNewPalette(t, e, i) {
            const n = i.getPaletteList(this.imageTypeE, this.imageComplexityE).getBestPalette();
            return this.palette.isEmpty() || this.palette.equals(n) ? i.getPaletteList(t, e).getBestPalette() : this.palette;
        }
        withImageType(t, e) {
            const i = this.getNewPalette(t, this.imageComplexityE, e);
            return new mt(t, this.imageComplexityE, this.usePalette, i, void 0);
        }
        withImageComplexity(t, e) {
            const i = this.getNewPalette(this.imageTypeE, t, e);
            return new mt(this.imageTypeE, t, this.usePalette, i, void 0);
        }
        withUsePalette(t, e) {
            return new mt(this.imageTypeE, this.imageComplexityE, t, this.palette, void 0);
        }
        withDefaultPalette(t) {
            const e = t.getPaletteList(this.imageTypeE, this.imageComplexityE).getBestPalette();
            return e.equals(this.getPalette()) ? this : new mt(this.imageTypeE, this.imageComplexityE, this.usePalette, e, this.segmentationEdits);
        }
        withPalette(t, e) {
            const i = e.getPaletteList(this.imageTypeE, this.imageComplexityE).getPalette(t);
            return i.equals(this.getPalette()) ? this : new mt(this.imageTypeE, this.imageComplexityE, this.usePalette, i, void 0);
        }
        withoutColor(t) {
            const e = this.palette.withoutColor(t);
            return new mt(this.imageTypeE, this.imageComplexityE, this.usePalette, e, void 0);
        }
        withNewColor(t) {
            const e = this.palette.withNewColor(t);
            return new mt(this.imageTypeE, this.imageComplexityE, this.usePalette, e, void 0);
        }
        withColor(t, e) {
            const i = this.palette.withColor(t, e);
            return new mt(this.imageTypeE, this.imageComplexityE, this.usePalette, i, void 0);
        }
        withSegEdits(t) {
            return new mt(this.imageTypeE, this.imageComplexityE, this.usePalette, this.palette, t);
        }
    }
    class gt {
        constructor(t) {
            (this.palette_with_score_string_list = t),
                (this.paletteWithScores = t
                    .trim()
                    .split("\n")
                    .map(function (t) {
                        return new ft(t);
                    }));
        }
        equals(t) {
            return this.palette_with_score_string_list == t.palette_with_score_string_list;
        }
        getPalette(t) {
            return this.paletteWithScores[t].palette;
        }
        getBestPalette() {
            if (!this.best) {
                this.best = this.paletteWithScores[0];
                for (var t = 1; t < this.paletteWithScores.length; t++) this.best.score > this.paletteWithScores[t].score && (this.best = this.paletteWithScores[t]);
            }
            return this.best.palette;
        }
    }
    class ft {
        constructor(t) {
            this.scorePaletteS = t;
            const e = t.trim().split(";", 2);
            (this.score = parseFloat(e[0])), (this.palette = new wt(e[1]));
        }
    }
    class wt {
        static empty() {
            return new wt("");
        }
        constructor(t) {
            this.paletteS = t;
            const e = t.trim().split(",");
            this.colors =
                e.length > 1
                    ? e[1]
                          .trim()
                          .split(" ")
                          .map(function (t) {
                              return t.length < 6 ? "000000".substr(t.length) + t : t;
                          })
                    : [];
        }
        isEmpty() {
            return this.colors.length < 2;
        }
        getNumColors() {
            return this.colors.length;
        }
        getCssColor(t) {
            let e = this.colors[t];
            return e.length > 6 && (e = e.substr(e.length - 6, 6)), "#" + e;
        }
        getSwatchesHtml(t) {
            for (var e = "", i = 0; i < this.colors.length; i++) e += `<div class="${t.name()}" style="background:${this.getCssColor(i)}"></div>`;
            return e;
        }
        getPaletteString() {
            return this.paletteS;
        }
        equals(t) {
            return this.paletteS == t.paletteS;
        }
        static fromColors(t) {
            return new wt(t.length + "," + t.join(" "));
        }
        withoutColor(t) {
            const e = this.colors.slice();
            return e.splice(t, 1), wt.fromColors(e);
        }
        withNewColor(t) {
            const e = this.colors.slice();
            return e.push(t), wt.fromColors(e);
        }
        withColor(t, e) {
            const i = this.colors.slice();
            return (i[t] = e), wt.fromColors(i);
        }
        contains(t) {
            return this.colors.indexOf(t) >= 0;
        }
    }
    class bt {
        constructor(t) {
            (this.spec = t), (this.paletteLists = {});
        }
        failed() {
            return 1 == this.spec.classificationStateE;
        }
        getPaletteString(t, e) {
            switch (t) {
                default:
                case 0:
                case 1:
                case 2:
                    return this.spec.pfPhoto;
                case 3:
                    return this.spec.pfLogo;
            }
        }
        getPaletteList(t, e) {
            const i = "k" + t + "_" + e;
            return this.paletteLists[i] || (this.paletteLists[i] = new gt(this.getPaletteString(t, e)));
        }
        getConfiguration() {
            var t = this.getPaletteList(this.spec.imageTypeE, this.spec.imageComplexityE).getBestPalette();
            return new mt(this.spec.imageTypeE, this.spec.imageComplexityE, this.spec.usePaletteE, t, void 0);
        }
    }
    class vt {
        constructor(t) {
            this.spec = t;
        }
        id() {
            return this.spec.id;
        }
        getVectorizationState() {
            return this.spec.vectorizationStateE;
        }
        getConfiguration() {
            return new mt(this.spec.imageTypeE, this.spec.imageComplexityE, this.spec.paletteS ? 1 : 2, this.spec.paletteS ? new wt(this.spec.paletteS) : wt.empty(), this.spec.segmentationEdits);
        }
        getSegmentationUrl() {
            return this.spec.segmentationUrl;
        }
    }
    class St {
        constructor(t) {
            (this.spec = t),
                (this.vectorizations = t.vectorizations.map((e) => {
                    let i = new vt(e);
                    return i.id() == t.vectorizationRecordId && (this.currentVectorization = i), i;
                })),
                (this.segmentationEdits = t.segmentationEdits ? new vt(t.segmentationEdits) : null),
                (this.classification = t.classification ? new bt(t.classification) : null);
        }
        id() {
            return this.spec.id;
        }
        secret() {
            return this.spec.secret;
        }
        meta() {
            return this.spec.meta;
        }
        setHasImage() {
            this.spec.meta.hasImage = !0;
        }
        hasSuccessfulClassification() {
            return this.classification && !this.classification.failed();
        }
        getUserImageState() {
            if (!this.spec.meta.hasImage) return 0;
            if (!this.classification) return 1;
            if (this.classification.failed()) return 3;
            {
                const t = this.getResult();
                if (!t) return 2;
                switch (t.getVectorizationState()) {
                    case 0:
                    case 1:
                        return 6;
                    case 2:
                    case 4:
                        return 4;
                    case 3:
                        return 5;
                }
            }
            throw "UserImage.getUserImageState - bad state!?";
        }
        getResult() {
            switch (this.spec.imageResultE) {
                case 2:
                    return this.segmentationEdits;
                case 3:
                    return this.currentVectorization;
                default:
                    return;
            }
        }
        hasResult() {
            return null != this.getResult();
        }
        getConfiguration() {
            switch (this.spec.imageResultE) {
                case 1:
                case 2:
                    return this.segmentationEdits.getConfiguration();
                case 3:
                    return this.currentVectorization.getConfiguration();
                default:
                    return mt.empty();
            }
        }
        getConfigurationsWithResult() {
            return this.vectorizations
                .filter(function (t) {
                    return 2 == t.getVectorizationState() || 4 == t.getVectorizationState();
                })
                .map(function (t) {
                    return t.getConfiguration();
                });
        }
        getSegEditConfiguration() {
            if (this.segmentationEdits) return this.segmentationEdits.getConfiguration();
        }
        getSegmentationUrl() {
            switch (this.spec.imageResultE) {
                case 1:
                case 2:
                    for (var t of this.vectorizations) if (t.getConfiguration().equalsIgnoringSegEdits(this.segmentationEdits.getConfiguration())) return t.getSegmentationUrl();
                    return;
                case 3:
                    return this.currentVectorization.getSegmentationUrl();
                default:
                    return;
            }
        }
    }
    !(function (t) {
        (t[(t.Disconnected = 0)] = "Disconnected"), (t[(t.Connecting = 1)] = "Connecting"), (t[(t.Connected = 2)] = "Connected"), (t[(t.Error = 3)] = "Error");
    })(D || (D = {}));
    class yt {
        constructor(t) {
            (this.state = D.Disconnected),
                (this.websocket = null),
                (this.arraybuffer = null),
                (this.hasReceivedMessage = !1),
                (this.closeReason = null),
                (this.lastDebugUrl = "unknown"),
                (this.opts = $.extend({ numberOfSilentRetriesBeforeShowingErrorToUser: 3, millisBetweenSilentRetries: 1e3 }, t)),
                (this.eventHandlers = {
                    open: (t) => {
                        this.onOpen();
                    },
                    close: (t) => {
                        this.onClose(t);
                    },
                    message: (t) => {
                        this.onMessage(t);
                    },
                    heartbeater: () => {
                        this.opts.heartbeat && null != this.websocket && this.websocket.readyState == WebSocket.OPEN && this.doSend(this.opts.heartbeat.message);
                    },
                }),
                (this.retryable = new rt({
                    label: this.opts.label,
                    execute: (t, e) => {
                        this.clearWebSocket(D.Connecting), (this.hasReceivedMessage = !1), (this.closeReason = null);
                        let i = this.opts.url();
                        (this.lastDebugUrl = i.split("?")[0]),
                            (this.websocket = new WebSocket(i)),
                            (this.websocket.binaryType = "arraybuffer"),
                            this.websocket.addEventListener("open", this.eventHandlers.open),
                            this.websocket.addEventListener("close", this.eventHandlers.close),
                            this.websocket.addEventListener("message", this.eventHandlers.message);
                    },
                    success: () => {
                        this.opts.connectedToNewServer();
                    },
                    numberOfSilentRetriesBeforeShowingErrorToUser: this.opts.numberOfSilentRetriesBeforeShowingErrorToUser,
                    millisBetweenSilentRetries: this.opts.millisBetweenSilentRetries,
                }).start());
        }
        clearWebSocket(t) {
            (this.state = t),
                null != this.websocket &&
                    (this.websocket.removeEventListener("open", this.eventHandlers.open),
                    this.websocket.removeEventListener("close", this.eventHandlers.close),
                    this.websocket.removeEventListener("message", this.eventHandlers.message),
                    this.websocket.close(),
                    (this.websocket = null)),
                (this.arraybuffer = null),
                this.heartbeatTimer && (clearTimeout(this.heartbeatTimer), (this.heartbeatTimer = void 0));
        }
        onOpen() {
            f.gaTrack("WebSocket", this.lastDebugUrl, "connected", 1),
                this.opts.heartbeat && this.opts.heartbeat.millis > 0 && (this.heartbeatTimer = setInterval(this.eventHandlers.heartbeater, this.opts.heartbeat.millis)),
                this.opts.sendOnOpen ? this.doSend(this.opts.sendOnOpen) : this.eventHandlers.heartbeater();
        }
        onClose(t) {
            this.clearWebSocket(D.Disconnected);
            let e = t.reason;
            if ((this.closeReason && !e && (e = this.closeReason.code.toString()), e)) {
                if (this.opts.puntOnCloseReason && this.opts.puntOnCloseReason(e)) return void this.retryable.executionPunt();
                {
                    let t = this.opts.closeReasonToMessage(e);
                    if (t) return this.onError(t);
                }
            } else if (!this.hasReceivedMessage) return this.onError(this.opts.unableToConnectMessage);
            this.opts.disconnectedFromServer() ? this.onError(this.opts.unexpectedCloseMessage) : this.retryable.executionStopped();
        }
        onError(t) {
            f.gaTrack("WebSocket", this.lastDebugUrl, "error: " + t, 0), (this.opts.customOnError && !this.opts.customOnError(t)) || this.retryable.executionError(t);
        }
        onMessage(t) {
            if ("string" == typeof t.data) {
                const e = JSON.parse(t.data);
                if (e.closeReason) return (this.closeReason = e.closeReason), void this.websocket.close();
                !this.hasReceivedMessage && this.doSend(this.opts.heartbeat.message) && ((this.hasReceivedMessage = !0), (this.state = D.Connected), this.retryable.executionSuccess()),
                    null != this.arraybuffer && ((e.arraybuffer = this.arraybuffer), (this.arraybuffer = null)),
                    this.opts.newMessageFromServer(e);
            } else this.arraybuffer = t.data;
        }
        doSend(t, e = !1) {
            try {
                let i = e ? t : JSON.stringify(t);
                return this.websocket.send(i), !0;
            } catch (t) {
                return this.clearWebSocket(D.Error), this.onError(this.opts.sendFailedMessage + "Error: " + t), !1;
            }
        }
        send0(t, e) {
            return null == this.websocket || this.websocket.readyState != WebSocket.OPEN ? (null == this.websocket && this.retryable.tryExecute(), !1) : this.doSend(t, e);
        }
        send(t) {
            return this.send0(t, !1);
        }
        sendBinary(t) {
            return this.send0(t, !0);
        }
        getState() {
            return this.state;
        }
        forceClose() {
            this.clearWebSocket(D.Disconnected);
        }
    }
    !(function (t) {
        var e,
            i = 0;
        (t.isConnected = function () {
            return e.getState() == D.Connected;
        }),
            (t.initialize = function (t) {
                e = new yt({
                    url: function () {
                        return M.getWorkerUrl("/api/websocket", { imageId: t.imageId, secret: t.secret, priority: i.toString() });
                    },
                    connectedToNewServer: function () {
                        (i = 0), t.connectedToNewServer();
                    },
                    disconnectedFromServer: t.disconnectedFromServer,
                    newMessageFromServer: t.newMessageFromServer,
                    heartbeat: { millis: 2e4, message: { index: 0, command: 0 } },
                    label: n.s("Connect to worker"),
                    puntOnCloseReason: function (t) {
                        return "-3" == t && i++ < window.Globals.NumPuntsWhenWorkersBusy;
                    },
                    closeReasonToMessage: function (t) {
                        switch (t) {
                            case "2":
                                return n.s("Unknown image - it may have been deleted, or you may not have the necessary credentials to access it");
                            case "-3":
                                return n.s("Workers overloaded. Additional workers should be online in a couple of minutes. ");
                            case "-4":
                                return;
                            default:
                                return t;
                        }
                    },
                    unableToConnectMessage: n.s("Unable to connect to the worker. Is your firewall or proxy blocking WebSockets?"),
                    unexpectedCloseMessage: n.s("Unexpected worker disconnection. "),
                    sendFailedMessage: n.s("Failed to send message to worker. "),
                });
            }),
            (t.send = function (t) {
                return e.send(t);
            });
    })(_ || (_ = {})),
        (function (t) {
            let e = null;
            function i() {
                return location.href.split("#")[0];
            }
            function n(t) {
                const n = t.originalEvent;
                if (n.state) {
                    const t = n.state;
                    q.resumeUserImage(t.id, t.secret);
                } else q.hasRun && e != i() && (location.replace(location.href), location.href.indexOf("#") >= 0 && location.reload());
                e = i();
            }
            (t.exitHref = "/"),
                (t.initialize = function () {
                    (e = i()), r.$window.on("popstate", n);
                }),
                (t.goTo = function (n) {
                    const s = location,
                        o = s.pathname,
                        a = "/images/" + n.id + "/edit/" + n.secret,
                        r = 0 === o.lastIndexOf(a, 0);
                    (document.title = n.originalFilename + " - Vector Magic"), r ? (t.exitHref = s.protocol + "//" + s.host) : ((t.exitHref = s.href), history.pushState(n, "", a), f.gaSetPageAndSendPageview("/images/edit"), (e = i()));
                }),
                (t.exit = function () {
                    const e = i();
                    (location.href = t.exitHref), t.exitHref.indexOf("#") >= 0 && f.startsWith(t.exitHref, e) && location.reload();
                });
        })(B || (B = {}));
    class xt {
        constructor(t, e) {
            (this.color = t), (this.lenghts = e);
        }
    }
    class Ct {
        constructor(t, e) {
            (this.shapes = t), (this.floats = e), (this.hasPaths = !1);
            let i = 0;
            try {
                let t = 0;
                for (var n of this.shapes) {
                    let e = new Path2D();
                    for (var s of n.lenghts) {
                        for (t += s, e.moveTo(this.floats[i++], this.floats[i++]); i < t; ) e.bezierCurveTo(this.floats[i++], this.floats[i++], this.floats[i++], this.floats[i++], this.floats[i++], this.floats[i++]);
                        e.closePath();
                    }
                    n.path = e;
                }
                this.hasPaths = !0;
            } catch (t) {
                this.hasPaths = !1;
            }
        }
        static from(t) {
            const e = new Float32Array(t.arraybuffer),
                i = t.shapes.map(function (t) {
                    return new xt(t.color, t.lengths);
                });
            return new Ct(i, e);
        }
        drawTo(t, e, i) {
            if (this.hasPaths) for (var n of this.shapes) e ? ((t.fillStyle = n.color), t.fill(n.path)) : (i && (t.strokeStyle = n.color), t.stroke(n.path));
            else {
                let o = 0,
                    a = 0;
                for (var n of this.shapes) {
                    for (var s of (t.beginPath(), n.lenghts)) {
                        for (a += s, t.moveTo(this.floats[o++], this.floats[o++]); o < a; ) t.bezierCurveTo(this.floats[o++], this.floats[o++], this.floats[o++], this.floats[o++], this.floats[o++], this.floats[o++]);
                        t.closePath();
                    }
                    e ? ((t.fillStyle = n.color), t.fill()) : (i && (t.strokeStyle = n.color), t.stroke());
                }
            }
        }
    }
    class Pt {
        constructor(t, e, i) {
            (this.name = t), (this.imageWidth = e), (this.imageHeight = i), (this.pieces = []);
        }
        numPoints() {
            let t = 0;
            for (var e of this.pieces) t += e.floats.length;
            return t;
        }
        append(t) {
            this.pieces.push(t);
        }
        drawTo(t) {
            for (var e of ((t.lineJoin = "bevel"), (t.lineWidth = 1), t.beginPath(), t.rect(0, 0, this.imageWidth, this.imageHeight), t.clip(), [!1, !0])) for (var i of this.pieces) i.drawTo(t, e, !0);
        }
        drawOutlinesTo(t, e) {
            t.lineJoin = "bevel";
            let i = 1;
            for (var n of (e > 4 && (i = 1 + 2 * f.clamp((e - 4) / 12, 0, 1)), (t.lineWidth = i / e), (t.strokeStyle = "#0FF"), this.pieces)) n.drawTo(t, !1, !1);
        }
    }
    !(function (t) {
        const e = "RESET";
        var i,
            s,
            o,
            a,
            r,
            h,
            l = [],
            c = [],
            u = !1,
            d = 0;
        function p() {
            o && (o.removeEventListener("load", m), o.removeEventListener("error", g)), (o = void 0);
        }
        function m() {
            (a = F.flattenImage(o)), p(), (r = a.context().getImageDataFull()), (h = a.context().getImageDataFull()), w(), W.segmentationSetDefaultColor(Ot.fromImageData(r, 0, 0));
        }
        function g(t) {
            p(), U.failedToLoadSegmentation();
        }
        function w() {
            for (var t of (h.data.set(r.data), l)) t.doEdit(h);
            b();
        }
        function b() {
            a.context().context.putImageData(h, 0, 0), W.segmentationNode().setSegmentation(a), P(!1), W.segmentationSetEnabled(l.length > 0, c.length > 0, S());
        }
        function v() {
            var t = "";
            for (var e of l) t = e.concatenateOpString(t);
            return 0 == t.length ? void 0 : t;
        }
        function S() {
            return l.length > 0 && l[l.length - 1].opString() != e;
        }
        function y(t) {
            t.isInside(h) && t.wantsEdit(h) && (c.length > 0 && (c = []), l.push(t), l.length > 300 && W.segmentationDontEditTooMuch(), t.doEdit(h), b());
        }
        function x(t, e, i) {
            const n = 4 * (e + i * t.width);
            return (t.data[n + 3] << 24) | (t.data[n] << 16) | (t.data[n + 1] << 8) | t.data[n + 2];
        }
        function C(t, e) {
            return (e *= 4), (t.data[e + 3] << 24) | (t.data[e] << 16) | (t.data[e + 1] << 8) | t.data[e + 2];
        }
        function P(e) {
            u ? (e ? T() : d || (d = setTimeout(T, 500))) : t.pinchPoints.length > 0 && ((t.pinchPoints.length = 0), A());
        }
        function A() {
            W.segmentationNode().finder.invalidate();
        }
        function T() {
            if ((d && (clearTimeout(d), (d = 0)), !h)) return;
            f.tic(), (t.pinchPoints.length = 0);
            const e = h;
            for (var i, n, s, o, a = 0; a < e.height - 1 && t.pinchPoints.length < 200; a++) {
                (n = x(e, 0, a)), (o = x(e, 0, a + 1));
                for (var r = 1; r < e.width; r++) (i = n), (s = o), (n = x(e, r, a)), (o = x(e, r, a + 1)), i == s || n == o || (i != o && s != n) || t.pinchPoints.push(new it(r, a + 1));
            }
            f.toc("SegEditor.computePinchPoints"), A();
        }
        (t.pinchPoints = []),
            (t.ensureInitialized = function (t, e, u) {
                (i = t),
                    (e == s && u == v()) ||
                        ((l = []),
                        (c = []),
                        (function (t) {
                            if (t) {
                                const e = t.split("\n");
                                for (; e.length > 0; ) {
                                    const t = e.shift();
                                    if (t.length > 0) {
                                        const e = k.factory(t);
                                        e && l.push(e);
                                    }
                                }
                            }
                        })(u)),
                    e != s && ((s = e), p(), (a = void 0), (r = void 0), (h = void 0)),
                    s
                        ? a
                            ? w()
                            : (W.segmentationNode().setProgress(50), ((o = new Image()).crossOrigin = "anonymous"), o.addEventListener("load", m), o.addEventListener("error", g), (o.src = s))
                        : (f.gaTrack("ErrorShown", "SegEditor", "No segmentationUrl"), alert(n.s("Terribly sorry, but we seem to have a bug preventing the segmentation editor from initializing.")));
            }),
            (t.getSegmentationEdits = v),
            (t.zap = function (t, e, i) {
                y(new R(t, e, i));
            }),
            (t.fill = function (t, e, i) {
                y(new M(t, e, i));
            }),
            (t.pixel = function (t, e, i) {
                y(new I(t, e, i));
            }),
            (t.color = function (t, e) {
                return Ot.fromImageData(h, t, e);
            }),
            (t.isInside = function (t, e) {
                return 0 <= t && t < h.width && 0 <= e && e < h.height;
            }),
            (t.reset = function () {
                S() && y(new E());
            }),
            (t.undo = function () {
                if (l.length > 0) {
                    const t = l.pop();
                    c.push(t), w();
                }
            }),
            (t.redo = function () {
                if (c.length > 0) {
                    const t = c.pop();
                    l.push(t), t.doEdit(h), b();
                }
            }),
            (t.toggleFinder = function () {
                (u = !u), P(!0);
            }),
            (t.getShowPinchPoints = function () {
                return u;
            });
        class k {
            constructor(t, e, i) {
                (this.x = t), (this.y = e), (this.color = i), (this.x = 0 | t), (this.y = 0 | e);
            }
            isInside(t) {
                return 0 <= this.x && this.x < t.width && 0 <= this.y && this.y < t.height;
            }
            concatenateOpString(t) {
                return t + this.toString() + "\n";
            }
            toString() {
                return this.opString() + "," + this.color.toHex() + "," + this.x + "," + this.y;
            }
            static factory(t) {
                var e = t.split(","),
                    i = e.shift(),
                    n = Ot.fromHex(e.shift()),
                    s = parseInt(e.shift()),
                    o = parseInt(e.shift());
                if (!isNaN(s) && !isNaN(o))
                    switch (i) {
                        case "p":
                            return new I(s, o, n);
                        case "f":
                            return new M(s, o, n);
                        case "d":
                            return new R(s, o, n);
                    }
            }
        }
        class E extends k {
            constructor() {
                super(0, 0, Ot.black);
            }
            opString() {
                return e;
            }
            concatenateOpString(t) {
                return "";
            }
            wantsEdit(t) {
                return !0;
            }
            doEdit(t) {
                t.data.set(r.data);
            }
        }
        class I extends k {
            opString() {
                return "p";
            }
            wantsEdit(t) {
                return !this.color.isAtImageData(t, this.x, this.y);
            }
            doEdit(t) {
                this.color.writeToImageData(t, this.x, this.y);
            }
        }
        class M extends k {
            opString() {
                return "f";
            }
            wantsEdit(t) {
                return !this.color.isAtImageData(t, this.x, this.y);
            }
            doEdit(t) {
                f.tic();
                const e = t.width,
                    i = t.height;
                var n = this.x + this.y * t.width;
                const s = this.color.toArgb(),
                    o = C(t, n);
                if (o != s) {
                    const s = [];
                    for (s.push(n); s.length > 0; ) {
                        const n = s.pop(),
                            l = n / e,
                            c = n - (n % e),
                            u = c + e,
                            d = l > 0,
                            p = l < i - 1;
                        for (var a = !0, r = !0, h = n; h < u && C(t, h) == o; h++) {
                            if ((this.color.writeToImageDataK(t, h), d)) {
                                const i = h - e;
                                a ? C(t, i) == o && (s.push(i), (a = !1)) : (a = C(t, i) != o);
                            }
                            if (p) {
                                const i = h + e;
                                r ? C(t, i) == o && (s.push(i), (r = !1)) : (r = C(t, i) != o);
                            }
                        }
                        (a = !0), (r = !0);
                        for (h = n - 1; h >= c && C(t, h) == o; h--) {
                            if ((this.color.writeToImageDataK(t, h), d)) {
                                const i = h - e;
                                a ? C(t, i) == o && (s.push(i), (a = !1)) : (a = C(t, i) != o);
                            }
                            if (p) {
                                const i = h + e;
                                r ? C(t, i) == o && (s.push(i), (r = !1)) : (r = C(t, i) != o);
                            }
                        }
                    }
                }
                f.toc("FloodFillEdit.doEdit");
            }
        }
        class R extends k {
            constructor() {
                super(...arguments), (this.pixelsX = []), (this.pixelsY = []), (this.neighborColors = []), (this.initialized = !1);
            }
            opString() {
                return "d";
            }
            wantsEdit(t) {
                return !0;
            }
            doEdit(t) {
                this.initialized || this.initialize(t), this.neighborColors.length > 0 ? this.divide(t) : this.fill(t);
            }
            initialize(t) {
                this.color = Ot.fromImageData(t, this.x, this.y);
                const e = this.color.toArgb(),
                    i = new ut([0]),
                    n = new Ot(0, 0, 0, 127),
                    s = n.toArgb();
                var o, a, r;
                this.pixelsX.push(this.x), this.pixelsY.push(this.y), n.writeToImageData(t, this.x, this.y);
                for (var h = 0; h < this.pixelsX.length; h++) {
                    let c = this.pixelsX[h],
                        u = this.pixelsY[h];
                    for (var l = 0; l < 4; l++) {
                        switch (l) {
                            case 0:
                                (o = c - 1), (a = u);
                                break;
                            case 1:
                                (o = c + 1), (a = u);
                                break;
                            case 2:
                                (o = c), (a = u - 1);
                                break;
                            case 3:
                                (o = c), (a = u + 1);
                        }
                        0 <= o &&
                            o < t.width &&
                            0 <= a &&
                            a < t.height &&
                            ((r = x(t, o, a)) == e ? (this.pixelsX.push(o), this.pixelsY.push(a), n.writeToImageData(t, o, a)) : r == s || (i.add(r) && this.neighborColors.push(Ot.fromImageData(t, o, a))));
                    }
                }
                this.initialized = !0;
            }
            getClosestNeighborColor(t) {
                for (var e = this.neighborColors[0], i = t.distanceSqr(e), n = 1; n < this.neighborColors.length; n++) {
                    const s = this.neighborColors[n],
                        o = t.distanceSqr(s);
                    o < i && ((e = s), (i = o));
                }
                return e;
            }
            divide(t) {
                const e = i.context().getImageDataFull();
                for (var n, s, o = 0; o < this.pixelsX.length; o++) {
                    (n = this.pixelsX[o]), (s = this.pixelsY[o]);
                    let i = Ot.fromImageData(e, n, s);
                    (i = this.getClosestNeighborColor(i)), i.writeToImageData(t, n, s);
                }
            }
            fill(t) {
                for (var e, i, n = 0; n < this.pixelsX.length; n++) (e = this.pixelsX[n]), (i = this.pixelsY[n]), this.color.writeToImageData(t, e, i);
            }
        }
    })(L || (L = {}));
    class At {
        showState() {}
        takeAction() {}
        disconnectedFromServer() {}
        needsConnection() {
            return !1;
        }
        goBack() {}
        goNext() {}
        canBack() {
            return !1;
        }
        canNext() {
            return !1;
        }
        cannotExit() {}
    }
    !(function (t) {
        var e,
            i,
            s,
            o,
            a,
            h = 0,
            l = 0,
            c = 1;
        const u = {};
        var d, p, m;
        let g;
        function w(t, e) {
            (i = t),
                v(e),
                s.meta().wasShrunk && r.App.ImageView.ShrunkNotification.$().show(),
                s.meta().wasTransparent && r.App.ImageView.TransparencyNotification.$().show(),
                W.imageUpdated(i, e.originalFilename),
                $(window).on("beforeunload", C),
                B.goTo(e),
                r.App.force_exit.$().click(A),
                r.App.exit_app.$().click(T).removeAttr("disabled"),
                r.App.Sidebar.ReviewResult.Download.$().attr("href", P.shareUrl(e.id, e.secret));
        }
        !(function (t) {
            t.Uploading = new (class extends At {
                showState() {
                    W.showProgress(0, 0);
                }
                cannotExit() {
                    return n.s("Please wait for your image to finish uploading before exiting. ");
                }
            })();
            t.Uploaded = new (class extends At {
                showState() {
                    W.showProgress(0, 100), W.showProgress(1, 5);
                }
                takeAction() {
                    D(3, { jobId: k() });
                }
                needsConnection() {
                    return !0;
                }
            })();
            t.Classifying = new (class extends At {
                showState() {
                    W.showProgress(1, 5);
                }
                disconnectedFromServer() {
                    H();
                }
                cannotExit() {
                    return n.s("Please wait for your job to finish before exiting. ");
                }
            })();
            t.Classified = new (class extends At {
                showState() {
                    W.showProgress(1, 100);
                }
                takeAction() {
                    R.fullyAutomatic() ? E(t.Configured) : E(t.ImageTypeSelection);
                }
                needsConnection() {
                    return !0;
                }
            })();
            t.ClassificationFailed = new (class extends At {
                showState() {
                    W.setAppState(11);
                }
                goNext() {
                    H();
                }
                canNext() {
                    return !0;
                }
            })();
            t.ImageTypeSelection = new (class extends At {
                showState() {
                    W.setAppState(3);
                }
                goBack() {
                    this.canBack() && E(t.ReviewResult);
                }
                goNext() {
                    E(t.ImageComplexitySelection);
                }
                canBack() {
                    return I();
                }
                canNext() {
                    return !0;
                }
            })();
            t.ImageComplexitySelection = new (class extends At {
                showState() {
                    switch (a.getImageTypeE()) {
                        default:
                        case 1:
                            W.setAppState(4);
                            break;
                        case 2:
                            W.setAppState(5);
                            break;
                        case 3:
                            W.setAppState(6);
                    }
                }
                goBack() {
                    E(t.ImageTypeSelection);
                }
                goNext() {
                    E(t.PaletteYesNoSelection);
                }
                canBack() {
                    return !0;
                }
                canNext() {
                    return !0;
                }
            })();
            t.PaletteYesNoSelection = new (class extends At {
                showState() {
                    W.setAppState(7);
                }
                goBack() {
                    E(t.ImageComplexitySelection);
                }
                goNext() {
                    a.getUsePalette() ? E(t.PickPaletteContents) : E(t.Configured);
                }
                canBack() {
                    return !0;
                }
                canNext() {
                    return !0;
                }
            })();
            t.PickPaletteContents = new (class extends At {
                showState() {
                    W.setAppState(8);
                }
                goBack() {
                    E(t.PaletteYesNoSelection);
                }
                goNext() {
                    E(t.Configured);
                }
                canBack() {
                    return !0;
                }
                canNext() {
                    return !0;
                }
            })();
            t.Configured = new (class extends At {
                showState() {
                    W.showProgress(2, 5);
                }
                takeAction() {
                    if (I()) E(t.ReviewResult);
                    else {
                        d = a.name();
                        D(4, { version: 0, vectorize: !0, sendResult: !(p = u[d]), configuration: a.toCommand(k()) });
                    }
                }
                needsConnection() {
                    return !0;
                }
            })();
            t.Vectorizing = new (class extends At {
                showState() {
                    W.showProgress(2, 5);
                }
                disconnectedFromServer() {
                    V();
                }
                cannotExit() {
                    return n.s("Please wait for your job to finish before exiting. ");
                }
            })();
            t.VectorizationFailed = new (class extends At {
                showState() {
                    r.App.Sidebar.VectorizationFailed.EditSegmentation.$().toggle(!!a.getSegmentationEdits()), W.setAppState(12);
                }
                goBack() {
                    X();
                }
                goNext() {
                    V();
                }
                canBack() {
                    return !0;
                }
                canNext() {
                    return !0;
                }
            })();
            t.FetchingResult = new (class extends At {
                showState() {
                    W.setAppState(9);
                }
                disconnectedFromServer() {
                    V();
                }
            })();
            t.ReviewResult = new (class extends At {
                showState() {
                    W.setAppState(9);
                }
                goBack() {
                    a.getUsePalette() ? E(t.PickPaletteContents) : E(t.PaletteYesNoSelection);
                }
                goNext() {}
                canBack() {
                    return !0;
                }
                canNext() {
                    return !1;
                }
            })();
            t.SegEditing = new (class extends At {
                showState() {
                    r.App.ImageView.ShrunkNotification.$().hide(), r.App.ImageView.TransparencyNotification.$().hide(), L.ensureInitialized(i, s.getSegmentationUrl(), a.getSegmentationEdits()), W.setAppState(10);
                }
                goBack() {
                    r.App.ImageView.DontEditTooMuchNotification.$().hide(), 5 == s.getUserImageState() ? E(t.VectorizationFailed) : E(t.ReviewResult);
                }
                goNext() {
                    r.App.ImageView.DontEditTooMuchNotification.$().hide(), x(a.withSegEdits(L.getSegmentationEdits()));
                }
                canBack() {
                    return !0;
                }
                canNext() {
                    return !0;
                }
                cannotExit() {
                    return a.getSegmentationEdits() != L.getSegmentationEdits() ? n.s("Your segmentation edits have not been saved. Be sure to click Next before exiting to save your changes. ") : void 0;
                }
            })();
            t.FetchingSegmentationFailed = new (class extends At {
                showState() {
                    W.setAppState(13);
                }
            })();
        })(g || (g = {})),
            (t.create = function (t, e, i, o) {
                y.uploadS3WithRetry(t, i.image, {
                    url: window.Globals.s3_url,
                    backupUrl: window.Globals.s3_backup_url,
                    label: n.s("Uploading original image"),
                    maxAge: 31536e3,
                    success: () => {
                        s.setHasImage(), F(), E(g.Uploaded);
                    },
                    progress: (t) => {
                        W.showProgress(0, t);
                    },
                }),
                    w(e, i),
                    E(g.Uploading);
            }),
            (t.resume = function (t, e) {
                w(t, e);
                const i = n.s("Unknown error. ");
                switch ((W.setErrorMessage(i), s.getUserImageState())) {
                    case 0:
                        throw "Illegal starting state";
                    case 1:
                        E(g.Uploaded);
                        break;
                    case 2:
                        E(g.Classified);
                        break;
                    case 3:
                        E(g.ClassificationFailed);
                        break;
                    case 4:
                        E(g.Configured);
                        break;
                    case 5:
                        W.resultFailedToLoad(i), E(g.VectorizationFailed);
                        break;
                    case 6:
                        E(g.SegEditing);
                }
            });
        var b = !1;
        function v(t) {
            (s = new St(t)), (o = $.extend({}, s.meta())), W.setClassification(s.classification), W.setConfigurations(s);
            var e = s.getConfiguration();
            e.isEmpty() && s.hasSuccessfulClassification() && (e = s.classification.getConfiguration()), S(e);
        }
        function S(t) {
            t.getPalette().isEmpty() && s.hasSuccessfulClassification() && (t = t.withDefaultPalette(s.classification)), (a = t), W.setConfiguration(a);
        }
        function x(t) {
            S(t), V();
        }
        function C(t) {
            let i = e.cannotExit();
            return !i && M() && (i = n.s("Synchronizing state with server, please wait before exiting. ")), i && (t.returnValue = i), i;
        }
        function A() {
            return $(window).off("beforeunload"), B.exit(), !1;
        }
        function T() {
            return e == g.SegEditing ? e.goBack() : B.exit(), !1;
        }
        function k() {
            return ++c;
        }
        function E(t) {
            (e = t), W.setBackAndNext(e.canBack(), e.canNext()), e.showState(), e.takeAction();
        }
        function I() {
            return m && s.getConfiguration().equals(a) && m.name == a.name();
        }
        function M() {
            return !o.hasImage && s.meta().hasImage;
        }
        function F() {
            M() && D(2, s.meta());
        }
        function D(t, e) {
            const i = { index: ++l, command: t, body: e };
            b || ((b = !0), _.initialize({ imageId: s.id(), secret: s.secret(), newMessageFromServer: N, connectedToNewServer: z, disconnectedFromServer: O })), _.send(i);
        }
        function U() {
            (u[p.name] = p), W.resultUpdated(p), (m = p), E(g.ReviewResult);
        }
        function N(t) {
            const s = t;
            if (!s.body || !s.body.jobId || s.body.jobId == c) {
                switch ((s.body && (s.body.arraybuffer = t.arraybuffer), s.command)) {
                    case 1:
                        break;
                    case 11:
                        const t = s.body;
                        f.gaTrack("ErrorShown", "Panic", t.message), alert(n.s("Terribly sorry, but an unrecoverable server error has occurred:") + "\n\n" + t.message + "\n\n" + n.s("Please try again, or try another image.")), A();
                        break;
                    case 3:
                        E(g.Classifying);
                        break;
                    case 4:
                        const o = s.body;
                        o.version, o.vectorize && E(g.Vectorizing);
                        break;
                    case 5:
                        const a = s.body,
                            r = 5 + (95 * a.progress) / 100;
                        switch (e) {
                            case g.Classifying:
                                W.showProgress(1, r), a.finished && (v(a.userImage), a.errorMessageTr ? (W.setErrorMessage(a.errorMessageTr), E(g.ClassificationFailed)) : E(g.Classified));
                                break;
                            case g.Vectorizing:
                                W.showProgress(2, r),
                                    a.finished && (v(a.userImage), a.errorMessageTr ? (W.setErrorMessage(a.errorMessageTr), W.resultFailedToLoad(a.errorMessageTr), E(g.VectorizationFailed)) : p ? U() : E(g.FetchingResult));
                        }
                        break;
                    case 7:
                        (p = new Pt(d, i.width(), i.height())), W.resultProgress(1);
                        break;
                    case 8:
                        const h = s.body;
                        W.resultProgress(h.progress), p.append(Ct.from(h));
                        break;
                    case 9:
                        U();
                        break;
                    case 10:
                        W.setErrorMessage(n.s("Failed to fetch the vectorization result. ")), E(g.VectorizationFailed);
                        break;
                    default:
                        f.fatalErrorStr(n.s('Received unknown server response: "{0}".', "" + s.body));
                }
                h = s.index;
            }
        }
        function z() {
            F(), e.takeAction();
        }
        function O() {
            return e.disconnectedFromServer(), l != h || M() || e.needsConnection();
        }
        function H() {
            E(g.Uploaded);
        }
        function V() {
            E(g.Configured);
        }
        function X() {
            E(g.ImageTypeSelection);
        }
        (t.setConfigurationAndGo = x),
            (t.setImageType = function (t, e) {
                S(a.withImageType(t, s.classification)), E(e ? g.Configured : g.ImageComplexitySelection);
            }),
            (t.setImageComplexity = function (t, e) {
                S(a.withImageComplexity(t, s.classification)), E(e ? g.Configured : g.PaletteYesNoSelection);
            }),
            (t.setPaletteYesNo = function (t) {
                S(a.withUsePalette(t, s.classification)), E(1 == t ? g.PickPaletteContents : g.Configured);
            }),
            (t.pickSuggestedPalette = function (t, e) {
                const i = a.withPalette(t, s.classification);
                i != a && S(i), e && E(g.Configured);
            }),
            (t.paletteWithoutColor = function (t) {
                S(a.withoutColor(t));
            }),
            (t.paletteWithNewColor = function (t) {
                S(a.withNewColor(t.toHex()));
            }),
            (t.paletteWithColor = function (t, e) {
                const i = e.toHex();
                a.getPalette().contains(i) || S(a.withColor(t, i));
            }),
            (t.retryClassification = H),
            (t.retryVectorization = V),
            (t.startSegEditing = function () {
                E(g.SegEditing);
            }),
            (t.handPickSettings = X),
            (t.goBack = function () {
                e.goBack();
            }),
            (t.goNext = function () {
                e.goNext();
            }),
            (t.failedToLoadSegmentation = function () {
                E(g.FetchingSegmentationFailed);
            });
    })(U || (U = {})),
        (function (t) {
            (t.MinScaleFactor = 1 / 16),
                (t.MaxScaleFactor = 16),
                (t.zoomStep = 1.2),
                (t.zoomToFitBackOff = 0.95),
                (t.configure = function (e) {
                    e.MinScaleFactor && (t.MinScaleFactor = e.MinScaleFactor),
                        e.MaxScaleFactor && (t.MaxScaleFactor = e.MaxScaleFactor),
                        e.zoomStep && (t.zoomStep = e.zoomStep),
                        e.zoomToFitBackOff && (t.zoomToFitBackOff = e.zoomToFitBackOff);
                }),
                (t.buttonFor = function (t) {
                    return 1 == (1 & t.buttons) ? "left" : 2 == (2 & t.buttons) ? "right" : 4 == (4 & t.buttons) ? "middle" : "none";
                }),
                (t.addMovement = function (t, e, i) {
                    (t.dx = e), (t.dy = i);
                });
        })(N || (N = {}));
    class Tt {
        constructor(t, e, i, n, s, o, a) {
            (this.pointerEvent = t), (this.x = e), (this.y = i), (this.type = n), (this.numTouches = s), (this.down = o), (this.root = a), (this.button = N.buttonFor(this.pointerEvent)), (this.timestamp = Date.now());
        }
        getPoint() {
            return new it(this.x, this.y);
        }
        getRoot() {
            return this.root || this;
        }
        sameXyAs(t) {
            return this.x == t.x && this.y == t.y;
        }
    }
    class kt {
        constructor(t) {
            (this.owner = t), (this.dx = 0), (this.dy = 0), (this.scale = 1);
        }
        constrainTranslation() {}
        constrainScale(t) {
            return t;
        }
        quantizeOffset() {
            (this.dx = Math.round(this.dx)), (this.dy = Math.round(this.dy));
        }
        translateBy(t, e, i = !0) {
            (0 == t && 0 == e) || ((this.dx += t), (this.dy += e), i && this.constrainTranslation(), this.owner.invalidate());
        }
        setScaleAndOffset(t, e, i) {
            (this.scale = t), (this.dx = e), (this.dy = i), this.owner.invalidate();
        }
        zoomBy(t) {
            1 != t && this.zoomTo(this.scale * t);
        }
        zoomTo(t) {
            this.scale != t && ((this.scale = this.constrainScale(t)), this.owner.invalidate());
        }
        zoomAboutBy(t, e, i) {
            this.zoomAboutTo(t, e, this.scale * i);
        }
        zoomAboutTo(t, e, i) {
            const n = (i = this.constrainScale(i)) / this.scale;
            (this.dx = t - (t - this.dx) * n), (this.dy = e - (e - this.dy) * n), (this.scale = i), this.constrainTranslation(), this.owner.invalidate();
        }
        transformEvent(t, e) {
            const i = t.getRoot(),
                n = e ? i : t;
            return new Tt(t.pointerEvent, (n.x - this.dx) / this.scale, (n.y - this.dy) / this.scale, n.type, n.numTouches, t.down ? this.transformEvent(t.down, e) : void 0, i);
        }
        transformContext(t, e) {
            e ? t.context.setTransform(this.scale, 0, 0, this.scale, this.dx, this.dy) : t.context.transform(this.scale, 0, 0, this.scale, this.dx, this.dy);
        }
        transformPoint(t) {
            return new it(this.scale * t.x + this.dx, this.scale * t.y + this.dy);
        }
        transformRect(t) {
            return new st(this.scale * t.left + this.dx, this.scale * t.top + this.dy, this.scale * t.right + this.dx, this.scale * t.bottom + this.dy);
        }
        inverseTransformPoint(t) {
            return new it((t.x - this.dx) / this.scale, (t.y - this.dy) / this.scale);
        }
        inverseTransformRect(t) {
            return new st((t.left - this.dx) / this.scale, (t.top - this.dy) / this.scale, (t.right - this.dx) / this.scale, (t.bottom - this.dy) / this.scale);
        }
        snapPointToCanvasPixels(t, e = 0.5, i = 0.5) {
            return this.inverseTransformPoint(this.transformPoint(t).snap(e, i));
        }
        getScale() {
            return this.scale;
        }
        getDxDy() {
            return new it(this.dx, this.dy);
        }
        getDx() {
            return this.dx;
        }
        getDy() {
            return this.dy;
        }
    }
    class Et extends kt {
        constructor(t = 1, e = 1) {
            super(void 0), (this.imageWidth = t), (this.imageHeight = e), (this.views = []), (this.canvasPad = st.empty()), (this.stickyZoom = 0), (this.owner = this);
        }
        constrainTranslation() {
            this.stickyZoom = 0;
            const t = 0 * this.scale + this.dx,
                e = this.imageWidth * this.scale + this.dx,
                i = this.canvasWidth / 2;
            t > i ? (this.dx -= t - i) : e < i && (this.dx -= e - i);
            const n = 0 * this.scale + this.dy,
                s = this.imageHeight * this.scale + this.dy,
                o = this.canvasHeight / 2;
            n > o ? (this.dy -= n - o) : s < o && (this.dy -= s - o);
        }
        getState() {
            return { dx: this.dx, dy: this.dy, scale: this.scale, stickyZoom: this.stickyZoom };
        }
        setState(t) {
            (this.dx = t.dx), (this.dy = t.dy), (this.scale = t.scale), (this.stickyZoom = t.stickyZoom), this.owner.invalidate();
        }
        constrainScale(t) {
            return (this.stickyZoom = 0), f.clamp(t, N.MinScaleFactor, N.MaxScaleFactor);
        }
        setCanvasPad(t, e, i, n) {
            this.canvasPad.set(t, e, i, n);
        }
        canvasWidthInterior() {
            return this.canvasWidth - this.canvasPad.left - this.canvasPad.right;
        }
        canvasHeightInterior() {
            return this.canvasHeight - this.canvasPad.top - this.canvasPad.bottom;
        }
        canvasCenterX() {
            return this.canvasPad.left + 0.5 * this.canvasWidthInterior();
        }
        canvasCenterY() {
            return this.canvasPad.top + 0.5 * this.canvasHeightInterior();
        }
        canvasCenter() {
            return new it(this.canvasCenterX(), this.canvasCenterY());
        }
        stopAllPanAnimations() {
            for (let t of this.views) t.stopPanAnimation();
        }
        zoomTo(t) {
            this.zoomAboutTo(this.canvasCenterX(), this.canvasCenterY(), t);
        }
        centerImagePoint(t, e, i = !0) {
            (this.dx = this.canvasCenterX() - t * this.scale), (this.dy = this.canvasCenterY() - e * this.scale), i && this.quantizeOffset(), this.invalidate();
        }
        center() {
            this.centerImagePoint(0.5 * this.imageWidth, 0.5 * this.imageHeight);
        }
        zoomToFit() {
            const t = Math.min(this.canvasHeightInterior() / this.imageHeight, this.canvasWidthInterior() / this.imageWidth) * N.zoomToFitBackOff;
            (this.scale = this.constrainScale(t)), this.center(), (this.stickyZoom = 1);
        }
        fitRect(t) {
            const e = Math.min(this.canvasHeightInterior() / t.height(), this.canvasWidthInterior() / t.width()) * N.zoomToFitBackOff;
            this.scale = this.constrainScale(e);
            let i = t.center();
            this.centerImagePoint(i.x, i.y), (this.stickyZoom = 0);
        }
        zoom1To1() {
            (this.scale = 1), this.center(), (this.stickyZoom = 2);
        }
        dblClick() {
            switch (this.stickyZoom) {
                case 0:
                case 2:
                    this.zoomToFit();
                    break;
                case 1:
                    this.zoom1To1();
            }
        }
        register(t) {
            this.views.push(t);
        }
        setCanvasSize(t, e, i) {
            if (t != this.canvasWidth || e != this.canvasHeight || i) {
                switch ((this.canvasWidth > 0 && ((this.dx += 0.5 * (t - this.canvasWidth)), (this.dy += 0.5 * (e - this.canvasHeight))), (this.canvasWidth = t), (this.canvasHeight = e), this.stickyZoom)) {
                    case 0:
                        this.constrainTranslation();
                        break;
                    case 1:
                        this.zoomToFit();
                        break;
                    case 2:
                        this.zoom1To1();
                }
                this.invalidate(!0);
            }
        }
        setImageSize(t, e) {
            if (t != this.imageWidth || e != this.imageHeight) {
                switch (((this.imageWidth = t), (this.imageHeight = e), this.stickyZoom)) {
                    case 0:
                        this.constrainTranslation();
                        break;
                    case 1:
                        this.zoomToFit();
                        break;
                    case 2:
                        this.zoom1To1();
                }
                this.invalidate(!0);
            }
        }
        invalidate(t) {
            for (let e of this.views) e.invalidate(t);
        }
    }
    class It {
        constructor(...t) {
            (this.children = []), (this.transform = new kt(this)), (this.visible = !0), (this.fixedCoordinates = !1), (this.handler = void 0), this.add(...t);
        }
        setView(t) {
            this.view = t;
            for (let e of this.children) e.setView(t);
        }
        add(...t) {
            this.children || (this.children = []), this.children.push(...t);
            for (let e of t) (e.parent = this), e.setView(this.view);
            return this;
        }
        getPropagatedScale() {
            let t = this.transform.getScale();
            return this.parent && (t *= this.parent.getPropagatedScale()), t;
        }
        getScale() {
            return this.view.getScale();
        }
        transformEvent(t) {
            return this.transform.transformEvent(t, this.fixedCoordinates);
        }
        transformEventWithAncestors(t) {
            return this.parent && (t = this.parent.transformEventWithAncestors(t)), this.transformEvent(t);
        }
        transformContext(t) {
            this.transform.transformContext(t, this.fixedCoordinates);
        }
        inFixedCoordinates(t, e) {
            t.context.save(), this.transform.transformContext(t, !0), e(), t.context.restore();
        }
        inCanvasCoordinates(t, e) {
            t.context.save(), t.context.resetTransform(), e(), t.context.restore();
        }
        drawTo(t) {
            if (this.visible) {
                t.context.save(), this.transformContext(t), this.drawInner(t);
                for (let e of this.children) e.drawTo(t);
                this.drawInnerAfterChildren(t), t.context.restore();
            }
        }
        invalidate(t) {
            this.visible && this.view && this.view.invalidate(t);
        }
        drawInner(t) {}
        drawInnerAfterChildren(t) {}
        moveHandlerWithPropagation(t) {
            const e = this.transformEvent(t);
            if (this.children.length > 0)
                for (let t = this.children.length - 1; t >= 0; t--) {
                    const i = this.children[t];
                    if (i.visible) {
                        const t = i.moveHandlerWithPropagation(e);
                        if (t) return t;
                    }
                }
            return this.moveHandler(e);
        }
        dblClick(t) {
            return !0;
        }
        moveHandler(t) {
            if (this.handler && this.handler.moveHandler(t)) return this;
        }
        mouseCursor(t) {
            if (this.handler) return this.handler.mouseCursor(t);
        }
    }
    class Mt extends It {
        moveHandlerWithPropagation(t) {}
        moveHandler(t) {}
        mouseCursor(t) {}
    }
    class Rt extends It {
        constructor(t) {
            super(),
                (this.camera = t),
                (this.eventHistory = []),
                (this.panPxPerMs = it.zero()),
                (this.panAnimationFrame = () => {
                    if (!this.hasPanSpeed()) return;
                    this.timerId = void 0;
                    let t = Date.now(),
                        e = t - this.lastPanFrameAt;
                    if (((this.lastPanFrameAt = t), this.camera.translateBy(this.panPxPerMs.x * e, this.panPxPerMs.y * e), t - this.lastPanInteraction.timestamp > 150)) {
                        let t = (0.003 * e) / this.panPxPerMs.length();
                        t >= 1 ? (this.panPxPerMs.setXy(0, 0), this.camera.invalidate()) : (this.panPxPerMs.plusEqualsScaled(-t, this.panPxPerMs), this.triggerPanAnimation());
                    } else this.triggerPanAnimation();
                });
        }
        clearDeltaMoveEvent() {
            this.deltaMoveEvent = void 0;
        }
        moveHandler(t) {
            if (1 == t.type) "left" == t.button && this.camera.stopAllPanAnimations();
            else if (2 == t.type)
                if ((this.camera.stopAllPanAnimations(), t.down && "left" == t.button)) {
                    const e = t.getRoot();
                    this.deltaMoveEvent && this.camera.translateBy(e.x - this.deltaMoveEvent.x, e.y - this.deltaMoveEvent.y), (this.deltaMoveEvent = e);
                } else this.deltaMoveEvent = void 0;
            else 3 == t.type && (this.tryStartPanAnimation(t), (this.deltaMoveEvent = void 0));
            return this.addEventToHistory(t), this;
        }
        mouseCursor(t) {
            return t ? r.grab_closed : r.grab_open;
        }
        stopPanAnimation() {
            this.timerId && (clearTimeout(this.timerId), (this.timerId = void 0), (this.lastPanFrameAt = void 0), this.panPxPerMs.setXy(0, 0), (this.lastPanInteraction = void 0), this.camera.invalidate());
        }
        tryStartPanAnimation(t) {
            if (((this.lastPanInteraction = t), Date.now() - this.lastPinchZoomAt < 500)) return;
            let e = this.panAnimationReferenceEvent(t.timestamp - 100);
            if (e) {
                let i = Math.max(10, t.timestamp - e.timestamp);
                if (i < 500) {
                    let n = 1;
                    if ((this.panPxPerMs.setXy((t.x - e.x) / i, (t.y - e.y) / i).capLength(1.75 * Math.sqrt(n)), this.hasPanSpeed())) return (this.lastPanFrameAt = Date.now()), void this.triggerPanAnimation();
                }
            }
        }
        triggerPanAnimation() {
            this.timerId || (this.timerId = setTimeout(this.panAnimationFrame, 10));
        }
        hasPanSpeed() {
            return 0 != this.panPxPerMs.lengthSqr();
        }
        panAnimationReferenceEvent(t) {
            let e = this.eventHistory,
                i = e[e.length - 1];
            if (2 == i.type) {
                for (let n = e.length - 1; n >= 0; n--) {
                    let s = e[n];
                    if (2 != s.type) return i;
                    if (((i = s), i.timestamp < t)) return i;
                }
                return i;
            }
        }
        addEventToHistory(t) {
            let e = t.timestamp;
            for (this.eventHistory.push(t); this.eventHistory[0] && e - this.eventHistory[0].timestamp > 1e3; ) this.eventHistory.shift();
        }
    }
    class Ft {
        constructor(t, e, i) {
            (this.pointerId = t), (this.pageX = e), (this.pageY = i), (this.pageXy = new it(this.pageX, this.pageY));
        }
    }
    class $t {
        constructor(t, e) {
            (this.imageView = t), (this.isParent = e), (this.touchPointsMap = new Map()), (this.startPinchZoom = void 0);
        }
        numTouches() {
            return this.touchPointsMap.size;
        }
        dup() {
            let t = new $t(this.imageView, !1);
            for (let e of this.touchPointsMap.values()) t.addOrUpdate(e);
            return (t.pinchPageCenter = this.pinchPageCenter.dup()), (t.pinchWidth = this.pinchWidth), (t.pinchScale = this.pinchScale), (t.pinchDxDy = this.pinchDxDy.dup()), t;
        }
        addOrUpdate(t) {
            let e = this.numTouches();
            this.touchPointsMap.set(t.pointerId, t);
            let i = this.numTouches();
            if (2 == i) {
                this.pinchPageCenter = it.zero();
                for (let t of this.touchPointsMap.values()) this.pinchPageCenter.plusEquals(t.pageXy);
                this.pinchPageCenter.timesEquals(0.5), (this.pinchWidth = 0);
                for (let t of this.touchPointsMap.values()) this.pinchWidth += this.pinchPageCenter.distanceTo(t.pageXy);
                (this.pinchWidth *= 0.5), (this.pinchScale = this.imageView.getCamera().getScale()), (this.pinchDxDy = this.imageView.getCamera().getDxDy());
            }
            this.isParent && 1 == e && 2 == i && (this.startPinchZoom = this.dup());
        }
        remove(t) {
            this.touchPointsMap.delete(t), this.numTouches() < 2 && this.startPinchZoom && (this.startPinchZoom = void 0);
        }
    }
    class Dt {
        constructor(t, e, i, n, o) {
            (this.camera = t),
                (this.root = e),
                (this.canvas = i),
                (this.topText = n),
                (this.bottomText = o),
                (this.visible = !1),
                (this.redrawTimeout = void 0),
                (this.lastRedrawAt = 0),
                (this.redrawRequestedAt = 0),
                (this.highDpiRatio = 1),
                (this.countWheelDeltaMod120IsZero = void 0),
                (this.countDeltaYisNotInteger = void 0),
                (this.isDiscreteDevice = !0),
                (this.mightBeDiscreteDevice = !0),
                (this.lastX = 0),
                (this.lastY = 0),
                (this.touchPointList = new $t(this, !0)),
                (this.topTextMargin = 20),
                (this.mouseWheel = (t) => {
                    let e = s.cast(t.originalEvent);
                    this.updateIsDiscrete(e);
                    const i = E.zoomDelta(t, N.zoomStep, this.isDiscreteDevice),
                        n = this.canvasXyFromPageXy(t);
                    this.camera.stopAllPanAnimations(), this.camera.zoomAboutBy(n.canvasX, n.canvasY, i);
                    let o = this.getStaticLastPointerEvent();
                    o && this.moveHandler(o), t.preventDefault();
                }),
                (this.pointerDown = (t) => {
                    this.checkAddDxDy(t),
                        this.touchPointList.addOrUpdate(new Ft(t.pointerId, t.pageX, t.pageY)),
                        1 == this.touchPointList.numTouches() && this.downHandler(t),
                        t.isPrimary && (this.lastPrimaryPointerEvent = t),
                        t.stopPropagation();
                }),
                (this.pointerMove = (t) => {
                    this.checkAddDxDy(t), this.touchPointList.addOrUpdate(new Ft(t.pointerId, t.pageX, t.pageY));
                    let e = this.touchPointList.numTouches();
                    if (e <= 1) this.moveHandler(t), t.isPrimary && (this.lastPrimaryPointerEvent = t);
                    else if (2 == e) {
                        let t = this.touchPointList.startPinchZoom.pinchPageCenter,
                            e = this.canvasPointFromPagePoint(t),
                            i = this.touchPointList.startPinchZoom.pinchWidth,
                            n = this.touchPointList.startPinchZoom.pinchScale,
                            s = this.touchPointList.pinchPageCenter,
                            o = (this.canvasPointFromPagePoint(s), (n * this.touchPointList.pinchWidth) / i);
                        this.getCamera().zoomAboutTo(e.x, e.y, o), this.clearLastPrimaryPointerEvent(), (this.grabLayer.lastPinchZoomAt = Date.now());
                    }
                    t.stopPropagation();
                }),
                (this.pointerUp = (t) => {
                    this.checkAddDxDy(t),
                        this.touchPointList.remove(t.pointerId),
                        0 == this.touchPointList.numTouches() && this.upHandler(t),
                        1 == this.touchPointList.numTouches() && this.clearLastPrimaryPointerEvent(),
                        t.stopPropagation();
                }),
                (this.pointerCancel = this.pointerUp),
                (this.pointerLeave = this.pointerUp),
                (this.contextMenu = (t) => {
                    t.preventDefault(), t.stopPropagation();
                }),
                (this.dblClick = (t) => {
                    let e = !0;
                    if (this.lastMoveEvent) {
                        let t = this.hit(this.lastMoveEvent);
                        if (t) {
                            let i = t.transformEventWithAncestors(this.lastMoveEvent);
                            e = t.dblClick(i);
                        }
                    }
                    e && this.camera.dblClick();
                }),
                (this.draw = () => {
                    if (((this.redrawTimeout = void 0), (this.lastRedrawAt = Date.now()), !this.visible)) return;
                    const t = this.canvas.context();
                    t.clearAll(), this.root.drawTo(t), this.topText && t.drawCenteredText(this.topText, this.topTextMargin), this.bottomText && t.drawCenteredText(this.bottomText, this.canvas.logicalHeight() - 20);
                }),
                this.register(),
                (this.grabLayer = new Rt(t)),
                this.grabLayer.setView(this),
                e.setView(this),
                t.register(this),
                (e.transform = t),
                this.canvas.element.setAttribute("touch-action", "none");
        }
        getCamera() {
            return this.camera;
        }
        isDown() {
            return !!this.downNode;
        }
        getScale() {
            return this.camera.getScale();
        }
        canvasWidth() {
            return this.canvas.width();
        }
        canvasHeight() {
            return this.canvas.height();
        }
        canvasWidthLogical() {
            return this.canvas.logicalWidth();
        }
        canvasHeightLogical() {
            return this.canvas.logicalHeight();
        }
        canvasRect() {
            return new st(0, 0, this.canvasWidth(), this.canvasHeight());
        }
        canvasRectLogical() {
            return new st(0, 0, this.canvasWidthLogical(), this.canvasHeightLogical());
        }
        setIsDark(t) {
            this.canvas.$element.parent().toggleClass(r.dark_checker.name(), t);
        }
        setCanvasPad(t, e, i, n) {
            this.camera.setCanvasPad(t, e, i, n);
        }
        deregister() {
            this.canvas.$element.off("mousewheel"),
                this.canvas.element.removeEventListener("pointerdown", this.pointerDown),
                this.canvas.element.removeEventListener("pointermove", this.pointerMove),
                this.canvas.element.removeEventListener("pointerup", this.pointerUp),
                this.canvas.element.removeEventListener("pointercancel", this.pointerCancel),
                this.canvas.element.removeEventListener("pointerleave", this.pointerLeave),
                this.canvas.element.removeEventListener("contextmenu", this.contextMenu),
                this.canvas.element.removeEventListener("dblclick", this.dblClick);
        }
        register() {
            this.canvas.$element.mousewheel(this.mouseWheel),
                this.canvas.element.addEventListener("pointerdown", this.pointerDown),
                this.canvas.element.addEventListener("pointermove", this.pointerMove),
                this.canvas.element.addEventListener("pointerup", this.pointerUp),
                this.canvas.element.addEventListener("pointercancel", this.pointerCancel),
                this.canvas.element.addEventListener("pointerleave", this.pointerLeave),
                this.canvas.element.addEventListener("contextmenu", this.contextMenu),
                this.canvas.element.addEventListener("dblclick", this.dblClick);
        }
        getStaticLastPointerEvent() {
            if (this.lastPrimaryPointerEvent) {
                let t = $.extend(!0, {}, this.lastPrimaryPointerEvent);
                return N.addMovement(t, 0, 0), t;
            }
        }
        getLastMoveEvent() {
            return this.lastMoveEvent;
        }
        stopPanAnimation() {
            this.grabLayer.stopPanAnimation();
        }
        simulateMoveEvent(t) {
            (this.lastMoveEvent = void 0), (this.lastPrimaryPointerEvent = void 0), this.checkAddMoveClass(this.hit(t)), (this.lastMoveEvent = t), (this.lastPrimaryPointerEvent = t.pointerEvent);
        }
        canvasXyFromPageXy(t) {
            const e = this.canvas.$element.offset();
            return { canvasX: t.pageX - e.left, canvasY: t.pageY - e.top };
        }
        canvasPointFromPagePoint(t) {
            const e = this.canvas.$element.offset();
            return new it(t.x - e.left, t.y - e.top);
        }
        sceneMoveEvent(t, e, i) {
            const n = this.canvas.$element.offset();
            return new Tt(t, t.pageX - n.left, t.pageY - n.top, e, this.touchPointList.numTouches(), i);
        }
        updateIsDiscrete(t) {
            let e = t.wheelDelta || t.wheelDeltaY || t.wheelDeltaX,
                i = t.deltaY || t.deltaX || t.deltaZ,
                n = t.deltaMode;
            if (void 0 !== i) {
                let t = !Number.isInteger(i);
                void 0 === this.countDeltaYisNotInteger ? (this.countDeltaYisNotInteger = t ? Dt.ThreshDeltaIsNotInteger : 0) : t ? this.countDeltaYisNotInteger++ : (this.countDeltaYisNotInteger = 0);
            }
            if (void 0 === e) {
                let t = 0 === n;
                this.mightBeDiscreteDevice = this.isDiscreteDevice = !t;
            } else {
                let t = Math.abs(e) % 120 == 0;
                void 0 === this.countWheelDeltaMod120IsZero ? (this.countWheelDeltaMod120IsZero = t ? Dt.ThreshWheelDeltaMod120IsZero : 0) : t ? this.countWheelDeltaMod120IsZero++ : (this.countWheelDeltaMod120IsZero = 0),
                    this.countWheelDeltaMod120IsZero >= Dt.ThreshWheelDeltaMod120IsZero
                        ? (this.mightBeDiscreteDevice = this.isDiscreteDevice = !0)
                        : E.isMac
                        ? (this.mightBeDiscreteDevice = this.isDiscreteDevice = this.countDeltaYisNotInteger >= Dt.ThreshDeltaIsNotInteger)
                        : ((this.isDiscreteDevice = !1), (this.mightBeDiscreteDevice = t));
            }
        }
        checkAddDxDy(t) {
            this.lastPrimaryPointerEvent ? N.addMovement(t, t.pageX - this.lastPrimaryPointerEvent.pageX, t.pageY - this.lastPrimaryPointerEvent.pageY) : N.addMovement(t, t.movementX || 0, t.movementY || 0);
        }
        clearLastPrimaryPointerEvent() {
            (this.lastPrimaryPointerEvent = void 0), this.grabLayer.clearDeltaMoveEvent();
        }
        hit(t) {
            return (this.hitNode = this.root.moveHandlerWithPropagation(t) || this.grabLayer.moveHandler(t));
        }
        checkAddClass(t) {
            t && this.canvas.$element.addClass(t.name());
        }
        checkRemoveClass(t) {
            t && this.canvas.$element.removeClass(t.name());
        }
        removeMoveClass() {
            this.checkRemoveClass(this.moveClass), (this.moveClass = void 0);
        }
        checkAddMoveClass(t) {
            let e;
            t && (e = t.mouseCursor(!1)), this.moveClass != e && (this.removeMoveClass(), this.checkAddClass((this.moveClass = e)));
        }
        downHandler(t) {
            if ((this.moveHandler(t), (this.downNode = this.hitNode), this.downNode)) {
                this.canvas.element.setPointerCapture(t.pointerId), (this.downEvent = this.sceneMoveEvent(t, 1));
                let e = this.sceneMoveEvent(t, 1, this.downEvent);
                (e = this.downNode.transformEventWithAncestors(e)),
                    this.downNode.moveHandler(e),
                    r.body.$().addClass(r.noselect.name()),
                    this.removeMoveClass(),
                    (this.downClass = this.downNode.mouseCursor(!0)),
                    this.downClass && r.body.$().addClass(this.downClass.name());
            }
        }
        moveHandler(t) {
            if (((this.lastX = t.pageX), (this.lastY = t.pageY), this.downNode)) {
                let e = this.sceneMoveEvent(t, 2, this.downEvent);
                (e = this.downNode.transformEventWithAncestors(e)), this.downNode.moveHandler(e);
            } else (this.lastMoveEvent = this.sceneMoveEvent(t, 0)), this.checkAddMoveClass(this.hit(this.lastMoveEvent));
        }
        upHandler(t) {
            if (this.downNode) {
                this.canvas.element.releasePointerCapture(t.pointerId),
                    r.body.$().removeClass(r.noselect.name()),
                    this.downClass && r.body.$().removeClass(this.downClass.name()),
                    (this.downEvent = void 0),
                    (this.downNode = void 0),
                    (this.downClass = void 0);
                const e = this.sceneMoveEvent(t, 3);
                this.checkAddMoveClass(this.hit(e));
            } else this.moveHandler(t);
        }
        invalidate(t) {
            this.visible && (t ? (clearTimeout(this.redrawTimeout), this.draw()) : this.redrawTimeout || ((this.redrawRequestedAt = Date.now()), (this.redrawTimeout = window.requestAnimationFrame(this.draw))));
        }
        invalidateMouseCursor() {
            if (this.visible)
                if (this.downNode) {
                    const t = this.downNode.mouseCursor(!0);
                    t != this.downClass && (this.downClass && r.body.$().removeClass(this.downClass.name()), (this.downClass = t), this.downClass && r.body.$().addClass(this.downClass.name()));
                } else this.lastMoveEvent && this.checkAddMoveClass(this.hit(this.lastMoveEvent));
        }
        show() {
            this.visible || ((this.visible = !0), this.invalidate(), this.canvas.$element.show());
        }
        checkSetSize(t, e) {
            this.highDpiRatio = window.devicePixelRatio || 1;
            const i = this.canvas.checkSetSize(t, e, this.highDpiRatio);
            this.camera.setCanvasSize(t, e, i);
        }
        hide() {
            (this.visible = !1), this.canvas.$element.hide();
        }
        directDraw(t, e) {
            t.save(), t.context.setTransform(this.highDpiRatio, 0, 0, this.highDpiRatio, 0, 0), e(t), t.restore();
        }
    }
    (Dt.ThreshWheelDeltaMod120IsZero = 3),
        (Dt.ThreshDeltaIsNotInteger = 3),
        (function (t) {
            (t.BigImageCutoffPoints = 5e3), (t.BigImageSizeMegapixels = 2), (t.BigImageMaxScaleFactor = 4), (t.BigImageScaleTimeoutMillis = 150);
        })(z || (z = {}));
    class _t extends It {
        constructor(t, e) {
            super(), (this.imageCanvas = t), (this.handler = e);
        }
        setImageCanvas(t) {
            (this.imageCanvas = t), this.invalidate();
        }
        drawInner(t) {
            this.imageCanvas && t.drawCanvasEx(this.imageCanvas, 0, 0);
        }
    }
    class Bt extends It {
        constructor() {
            super(...arguments), (this.progress0to100 = 0), (this.errorMessageTr = void 0);
        }
        setProgress(t) {
            (this.errorMessageTr = void 0), (this.progress0to100 = t), (this.fixedCoordinates = !0), this.invalidate();
        }
        setFailedToLoad(t) {
            (this.errorMessageTr = t), (this.fixedCoordinates = !0), this.invalidate();
        }
        drawProgress(t) {
            const e = t.context.canvas.width,
                i = t.context.canvas.height,
                n = Math.min(125, e / 2),
                s = Math.floor(0.5 * (i - 10)),
                o = Math.floor(0.5 * (e - n));
            this.errorMessageTr
                ? t.drawCenteredText(this.errorMessageTr, i / 2)
                : (t.setLineWidth(2),
                  t.setLineCap("round"),
                  t.setStrokeStyle("#265a88"),
                  t.strokeRect(o, s, n, 10),
                  t.setFillStyle("#FFF"),
                  t.fillRect(o, s, n, 10),
                  t.setFillStyle("#337ab7"),
                  t.fillRect(o, s, (n * this.progress0to100 * 0.5) / 100, 10));
        }
    }
    class Lt extends Bt {
        constructor(t, e) {
            super(),
                (this.result = t),
                (this.imageCanvas = e),
                (this.showBitmapAndOutlines = !1),
                (this.needsVectorRedraw = !1),
                (this.lastScale = 0),
                (this.scaleTimeout = void 0),
                (this.useBigImage = !1),
                (this.inv = () => {
                    this.invalidate();
                });
        }
        setResult(t) {
            (this.result = t),
                (this.useBigImage = this.result.numPoints() > z.BigImageCutoffPoints),
                (this.bigImage = void 0),
                (this.lastScale = 0),
                (this.needsVectorRedraw = !1),
                clearTimeout(this.scaleTimeout),
                (this.scaleTimeout = void 0),
                (this.fixedCoordinates = !1),
                this.invalidate();
        }
        setProgress(t) {
            (this.result = void 0), super.setProgress(t);
        }
        setShowBitmapAndOutlines(t) {
            (this.showBitmapAndOutlines = t), this.invalidate();
        }
        moveHandler(t) {
            !t.down && this.needsVectorRedraw && this.invalidate();
        }
        getBigImage() {
            if (!this.bigImage) {
                let t = this.imageCanvas.width() * this.imageCanvas.height();
                this.bigImageScaleFactor = Math.min(Math.sqrt((1024 * z.BigImageSizeMegapixels * 1024) / t), z.BigImageMaxScaleFactor);
                let e = Math.round(this.bigImageScaleFactor * this.imageCanvas.width()),
                    i = Math.round(this.bigImageScaleFactor * this.imageCanvas.height());
                this.bigImage = new at(e, i);
                let n = this.bigImage.context();
                n.context.scale(this.bigImageScaleFactor, this.bigImageScaleFactor), this.result.drawTo(n.context);
            }
            return this.bigImage;
        }
        drawInner(t) {
            if (this.result)
                if (this.showBitmapAndOutlines) t.drawCanvasEx(this.imageCanvas, 0, 0), this.result.drawOutlinesTo(t.context, this.getPropagatedScale());
                else if (this.useBigImage) {
                    let e = this.getPropagatedScale(),
                        i = e != this.lastScale;
                    this.lastScale = e;
                    let n = this.getBigImage();
                    if (e < this.bigImageScaleFactor || this.view.isDown() || i) {
                        this.needsVectorRedraw = e >= this.bigImageScaleFactor;
                        let i = this.imageCanvas;
                        t.drawCanvasEx3(n, 0, 0, n.width(), n.height(), 0, 0, i.width(), i.height());
                    } else (this.needsVectorRedraw = !1), this.result.drawTo(t.context);
                    clearTimeout(this.scaleTimeout), (this.scaleTimeout = void 0), !this.view.isDown() && i && this.needsVectorRedraw && (this.scaleTimeout = setTimeout(this.inv, z.BigImageScaleTimeoutMillis));
                } else this.result.drawTo(t.context);
            else this.drawProgress(t);
        }
    }
    class Ut extends Bt {
        constructor() {
            super(), (this.finder = new Nt()), this.add(this.finder);
        }
        setSegmentation(t) {
            (this.segmentation = t), (this.fixedCoordinates = !1), this.invalidate();
        }
        setProgress(t) {
            (this.segmentation = void 0), super.setProgress(t);
        }
        drawInner(t) {
            this.segmentation ? t.drawImage(this.segmentation.element, 0, 0) : this.drawProgress(t);
        }
    }
    class Nt extends Mt {
        constructor() {
            super(...arguments), (this.offset0 = new it(5, 5)), (this.offset1 = new it(20, 20)), (this.len0 = this.offset0.length()), (this.len1 = this.offset1.length());
        }
        drawPinchPoint(t, e, i) {
            t.beginPath(), t.moveTo(e.x - this.offset0.x / i, e.y - this.offset0.y / i), t.lineTo(e.x - this.offset1.x / i, e.y - this.offset1.y / i), t.setLineWidth(4 / i), t.setStrokeStyle("#000"), t.stroke(), t.setLineWidth(2 / i);
            const n = t.createRadialGradient(e.x, e.y, this.len0 / i, e.x, e.y, this.len1 / i);
            n.addColorStop(0, "#F00"), n.addColorStop(0.2, "#FF0"), t.setStrokeStyle(n), t.stroke();
        }
        drawInner(t) {
            const e = this.getPropagatedScale();
            for (var i of (t.setLineCap("round"), L.pinchPoints)) this.drawPinchPoint(t, i, e);
        }
    }
    class zt extends It {
        constructor(t, e, i) {
            super(t, e, i),
                (this.bitmap = t),
                (this.vector = e),
                (this.segmentation = i),
                (this.showBitmap = () => {
                    (this.view.topText = n.s("Original Image")), this.setVisible(!1, !0, !1), this.vector.setShowBitmapAndOutlines(!0);
                }),
                (this.showVector = () => {
                    (this.view.topText = n.s("Vectorized Result")), this.setVisible(!1, !0, !1), this.vector.setShowBitmapAndOutlines(!1);
                }),
                (this.showSegmentation = () => {
                    (this.view.topText = n.s("Edit Segmentation")), this.setVisible(!1, !1, !0);
                });
        }
        setVisible(t, e, i) {
            (this.bitmap.visible = t), (this.vector.visible = e), (this.segmentation.visible = i), this.invalidate();
        }
    }
    class Ot {
        constructor(t, e, i, n) {
            (this.r255 = t), (this.g255 = e), (this.b255 = i), (this.a255 = n), (this.r255 = 255 & t), (this.g255 = 255 & e), (this.b255 = 255 & i), (this.a255 = 255 & n);
        }
        static fromCanvasContext(t, e, i) {
            return Ot.fromImageData(t.getImageData(0 | e, 0 | i, 1, 1), 0, 0);
        }
        static fromImageData(t, e, i) {
            const n = 4 * ((0 | e) + (0 | i) * t.width);
            return new Ot(t.data[n], t.data[n + 1], t.data[n + 2], t.data[n + 3]);
        }
        static fromHex(t) {
            const e = parseInt(t, 16);
            return new Ot(e >> 16, e >> 8, e, 255);
        }
        static fromCss(t) {
            return Ot.fromHex(t.substr(1));
        }
        static fromRgb(t) {
            return new Ot(t >> 16, t >> 8, t, 255);
        }
        equals(t) {
            return this.r255 == t.r255 && this.g255 == t.g255 && this.b255 == t.b255 && this.a255 == t.a255;
        }
        distanceSqr(t) {
            const e = this.r255 - t.r255,
                i = this.g255 - t.g255,
                n = this.b255 - t.b255;
            return e * e + i * i + n * n;
        }
        distance(t) {
            return Math.sqrt(this.distanceSqr(t));
        }
        isAtImageData(t, e, i) {
            return this.isAtImageDataK(t, (0 | e) + (0 | i) * t.width);
        }
        isAtImageDataK(t, e) {
            return (e *= 4), t.data[e] == this.r255 && t.data[e + 1] == this.g255 && t.data[e + 2] == this.b255 && t.data[e + 3] == this.a255;
        }
        writeToImageData(t, e, i) {
            this.writeToImageDataK(t, (0 | e) + (0 | i) * t.width);
        }
        writeToImageDataK(t, e) {
            (e *= 4), (t.data[e] = this.r255), (t.data[e + 1] = this.g255), (t.data[e + 2] = this.b255), (t.data[e + 3] = this.a255);
        }
        toRgb() {
            return (this.r255 << 16) | (this.g255 << 8) | this.b255;
        }
        toArgb() {
            return (this.a255 << 24) | (this.r255 << 16) | (this.g255 << 8) | this.b255;
        }
        toHex() {
            return f.hex(this.toRgb(), 6);
        }
        toCss() {
            return "#" + this.toHex();
        }
        toCssRgba() {
            return "rgba(" + this.r255 + "," + this.g255 + "," + this.b255 + "," + this.a255 / 255 + ")";
        }
    }
    (Ot.black = new Ot(0, 0, 0, 255)),
        (Ot.white = new Ot(255, 255, 255, 255)),
        (function (t) {
            function e(t, e) {
                const i = (function (t) {
                        switch (t) {
                            default:
                            case 1:
                                return n.s("Photo");
                            case 2:
                                return n.s("Anti-aliased artwork");
                            case 3:
                                return n.s("Artwork");
                        }
                    })(t.getImageTypeE()),
                    s = (function (t) {
                        switch (t) {
                            default:
                            case 3:
                                return n.s("High");
                            case 2:
                                return n.s("Medium");
                            case 1:
                                return n.s("Low");
                        }
                    })(t.getImageComplexityE());
                return t.getSegmentationEdits() ? n.s("{0}, {1}, {2}, Edited", i, s, e) : n.s("{0}, {1}, {2}", i, s, e);
            }
            (t.localizedConfigurationString = function (t) {
                return e(t, t.getUsePalette() ? n.s("Custom colors") : n.s("Unlimited colors"));
            }),
                (t.renderConfiguration = function (t, i, s, o) {
                    let a = `<li${i ? " class='active'" : ""}><a class="${o.name()}" href='#' data-index='${s}'>`;
                    return (a += e(t, t.getUsePalette() ? t.getPalette().getSwatchesHtml(r.App.Toolbar.revert_swatch) : n.s("Unlimited colors"))), (a += "</a></li>\n"), a;
                }),
                (t.renderEmptyConfiguration = function () {
                    return "<li class='disabled'><a href='#'>No vectorization results available yet. </a></li>";
                });
        })(O || (O = {})),
        (function (t) {
            var e,
                i,
                o,
                h,
                l,
                c,
                u,
                d,
                p,
                m,
                g,
                w,
                b = !1;
            function v(t) {
                if (
                    (11 == (e = t) && (b = !0),
                    r.App.Sidebar.content_pane.$().hide(),
                    (function (t) {
                        switch (e) {
                            case 2:
                                return r.App.Sidebar.Progress.Pane;
                            case 3:
                                return r.App.Sidebar.ImageType.Pane;
                            case 4:
                                return r.App.Sidebar.ImageComplexityPhoto.Pane;
                            case 5:
                                return r.App.Sidebar.ImageComplexityLogoAa.Pane;
                            case 6:
                                return r.App.Sidebar.ImageComplexityLogo.Pane;
                            case 7:
                                return r.App.Sidebar.PaletteYesNo.Pane;
                            case 8:
                                return r.App.Sidebar.PaletteContents.Pane;
                            case 9:
                                return r.App.Sidebar.ReviewResult.Pane;
                            case 10:
                                return r.App.Sidebar.SegEdit.Pane;
                            case 11:
                                return r.App.Sidebar.ClassificationFailed.Pane;
                            case 12:
                                return r.App.Sidebar.VectorizationFailed.Pane;
                            case 13:
                                return r.App.Sidebar.FetchingSegmentationFailed.Pane;
                        }
                        return r.App.Sidebar.StateMachineBug.Pane;
                    })()
                        .$()
                        .show(),
                    p)
                )
                    switch (e) {
                        default:
                            p.handler = void 0;
                            break;
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            (p.handler = I), I.drawLoupeInternal();
                            break;
                        case 8:
                            p.handler = M;
                    }
                switch (e) {
                    default:
                        r.App.Toolbar.ResultReview.$().hide(), r.App.Toolbar.SegEditor.$().hide();
                        break;
                    case 10:
                        F.initialize(), r.App.Toolbar.ResultReview.$().hide(), r.App.Toolbar.SegEditor.$().show();
                        break;
                    case 9:
                        g.showVector(), r.App.Toolbar.ResultReview.$().show(), r.App.Toolbar.SegEditor.$().hide();
                }
                E();
            }
            (t.segmentationNode = function () {
                return g.segmentation;
            }),
                (t.segmentationSetDefaultColor = function (t) {
                    F.setDefaultColor(t);
                }),
                (t.segmentationSetEnabled = function (t, e, i) {
                    F.segmentationSetEnabled(t, e, i);
                }),
                (t.segmentationDontEditTooMuch = function () {
                    F.segmentationDontEditTooMuch();
                }),
                (t.setAppState = v),
                (t.setErrorMessage = function (t) {
                    r.App.Sidebar.job_failed_message.$().html(t);
                });
            var S = !1;
            function y() {
                S && r.App.Sidebar.Progress.Vectorize.Pane.$().toggle(R.fullyAutomatic() || l == r.App.Sidebar.Progress.Vectorize);
            }
            function x() {
                return o && !o.failed();
            }
            function C(t) {
                R.splitView(t), E();
            }
            function P(t, e) {
                r.App.Toolbar.ViewBitmap.$().toggleClass(a.active.name(), t), r.App.Toolbar.SegEditViewBitmap.$().toggleClass(a.active.name(), t), r.App.Toolbar.SegEditViewVector.$().toggleClass(a.active.name(), e);
            }
            function A() {
                g.showBitmap(), P(!0, !1);
            }
            function T() {
                g.showVector(), P(!1, !0);
            }
            function k() {
                g.showSegmentation(), P(!1, !1);
            }
            function E() {
                let t = $("body");
                t.removeClass(r.App.Sidebar.bottom_mode.name());
                let n = r.App.flex_horizontal_section.$().outerWidth(),
                    s = r.App.Sidebar.OuterPane.$().outerWidth() > 0.5 * n;
                if ((t.toggleClass(r.App.Sidebar.bottom_mode.name(), s), i)) {
                    const n = r.App.ImageView.CanvasContainer.$().outerWidth(),
                        s = r.App.ImageView.CanvasContainer.$().outerHeight();
                    let o = (function (t, e) {
                        function n(t) {
                            return Math.min(8e3, Math.max(100, 0 | t));
                        }
                        let s = n(e - 88),
                            o = n(t),
                            a = o / 2 / s,
                            r = o / (s / 2),
                            h = n(i.height()),
                            l = n(i.width()) / h;
                        return Math.abs(l - a) <= Math.abs(l - r);
                    })(n, s);
                    switch ((t.toggleClass(r.App.ImageView.vertical_mode.name(), !o), e)) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 11:
                        case 12:
                        default:
                            m.show(), w.hide(), m.checkSetSize(n, s);
                            break;
                        case 9:
                            R.splitView() && $(window).innerWidth() > 768
                                ? (r.App.Toolbar.ViewSplit.$().addClass("active"),
                                  r.App.Toolbar.ViewSingle.$().removeClass("active"),
                                  m.show(),
                                  w.show(),
                                  o ? (m.checkSetSize(Math.floor(n / 2), s), w.checkSetSize(Math.ceil(n / 2), s)) : (m.checkSetSize(n, Math.floor(s / 2)), w.checkSetSize(n, Math.ceil(s / 2))))
                                : (r.App.Toolbar.ViewSplit.$().removeClass("active"), r.App.Toolbar.ViewSingle.$().addClass("active"), m.hide(), w.show(), w.checkSetSize(n, s));
                            break;
                        case 10:
                            m.hide(), w.show(), w.checkSetSize(n, s);
                    }
                }
            }
            let I, M, F;
            function D(t) {
                if (10 != e || !F.keyDownHandler(t))
                    switch (t.keyCode) {
                        case 49:
                            C(!1);
                            break;
                        case 50:
                            C(!0);
                            break;
                        case 66:
                            A();
                            break;
                        case 86:
                            T();
                            break;
                        case 36:
                            d.zoomToFit();
                            break;
                        case 35:
                            d.zoom1To1();
                            break;
                        case 33:
                            d.zoomBy(1.2);
                            break;
                        case 34:
                            d.zoomBy(1 / 1.2);
                    }
            }
            function _(t) {
                if (10 != e || !F.keyUpHandler(t))
                    switch (t.keyCode) {
                        case 66:
                        case 86:
                            10 == e ? k() : T();
                    }
            }
            (t.showProgress = function (t, i) {
                2 != e && ((S = 0 == t), r.App.Sidebar.Progress.progress.$().toggle(S), r.App.Sidebar.Progress.FullyAutomaticContainer.$().toggle(S), y()),
                    b && r.App.Sidebar.Progress.Upload.Pane.$().hide(),
                    v(2),
                    (l = (function (t) {
                        switch (t) {
                            case 0:
                                return r.App.Sidebar.Progress.Upload;
                            case 1:
                                return r.App.Sidebar.Progress.Classify;
                            default:
                                return r.App.Sidebar.Progress.Vectorize;
                        }
                    })(t)),
                    r.App.Sidebar.Progress.bar.$().removeClass("active"),
                    l.Bar.$().addClass("active"),
                    l.Pane.$().show(),
                    f.progressBar(l, i);
            }),
                (t.checkShowVectorizeProgressBar = y),
                (t.setClassification = function (t) {
                    const e = r.App.Sidebar.BigButton.is_recommended.name();
                    r.App.Sidebar.BigButton.pane.$().removeClass(e), (o = t), x() && o.getConfiguration().addClass(e);
                }),
                (t.setConfiguration = function (t) {
                    h = t;
                    const e = "active";
                    if ((r.App.Sidebar.BigButton.pane.$().removeClass(e), t)) {
                        t.addClass(e);
                        const i = "active";
                        if (x()) {
                            const t = o.getConfiguration();
                            r.App.Sidebar.ReviewResult.ScanOrDrawingContainer.$().toggle(1 == t.getImageTypeE() && 1 == h.getImageTypeE()),
                                r.App.Sidebar.ReviewResult.SpotsBetweenEdgesContainer.$().toggle(2 == t.getImageTypeE() && 3 == h.getImageTypeE()),
                                r.App.Sidebar.ReviewResult.JaggedEdgesContainer.$().toggle(3 == t.getImageTypeE() && 2 == h.getImageTypeE());
                        }
                        switch ((r.App.Sidebar.ReviewResult.detail_button.$().removeClass(i), t.getImageComplexityE())) {
                            case 3:
                                r.App.Sidebar.ReviewResult.DetailHigh.$().addClass(i);
                                break;
                            case 2:
                                r.App.Sidebar.ReviewResult.DetailMedium.$().addClass(i);
                                break;
                            default:
                                r.App.Sidebar.ReviewResult.DetailLow.$().addClass(i);
                        }
                        t.getUsePalette()
                            ? (r.App.Sidebar.ReviewResult.UnlimitedColors.$().removeClass(i), r.App.Sidebar.ReviewResult.CustomColors.$().addClass(i), r.App.Sidebar.ReviewResult.ChangeCustomPaletteContainer.$().show())
                            : (r.App.Sidebar.ReviewResult.UnlimitedColors.$().addClass(i), r.App.Sidebar.ReviewResult.CustomColors.$().removeClass(i), r.App.Sidebar.ReviewResult.ChangeCustomPaletteContainer.$().hide()),
                            r.App.Sidebar.ReviewResult.CustomPaletteContainer.$().html(t.getPalette().getSwatchesHtml(r.App.Sidebar.ReviewResult.custom_palette_swatch)),
                            M.updatePalette(),
                            w && (w.bottomText = O.localizedConfigurationString(t));
                    }
                }),
                (t.setBackAndNext = function (t, e) {
                    r.App.Sidebar.BackButton.$().toggleClass("disabled", !t), r.App.Sidebar.NextButton.$().toggleClass("disabled", !e);
                }),
                (t.setConfigurations = function (t) {
                    var e = "";
                    const i = t.getConfiguration();
                    var n = 0;
                    const s = t.getConfigurationsWithResult();
                    for (let t of s) e += O.renderConfiguration(t, i.equals(t), n++, r.App.Toolbar.revert_link);
                    const o = t.getSegEditConfiguration();
                    o && ((e += "<li class='divider'></li>\n"), (e += O.renderConfiguration(o, i.equals(o), -1, r.App.Toolbar.revert_link))),
                        e || (e = O.renderEmptyConfiguration()),
                        r.App.Toolbar.revert_link.$().off("click"),
                        r.App.Toolbar.RevertMenu.$().html(e),
                        r.App.Toolbar.revert_link.$(!0).click(function (t) {
                            const e = 0 | parseInt($(this).data("index"));
                            e < 0 ? U.setConfigurationAndGo(o) : e < s.length && U.setConfigurationAndGo(s[e]), t.preventDefault();
                        });
                }),
                (t.imageUpdated = function (t, s) {
                    i = t;
                    const o = new at(1, 1),
                        a = new at(1, 1);
                    (o.element.id = r.App.ImageView.LeftCanvas.name()),
                        (a.element.id = r.App.ImageView.RightCanvas.name()),
                        r.App.ImageView.CanvasContainer.$().append(o.element, a.element),
                        (u = s + ` (${i.width()} x ${i.height()} px)`),
                        (d = new Et(i.width(), i.height())),
                        (p = new _t(i, I)),
                        (m = new Dt(d, p, o, n.s("Original Image"), u)),
                        (g = new zt(new _t(i), new Lt(c, i), new Ut())),
                        (w = new Dt(d, g, a, void 0, u)),
                        E(),
                        $(window).resize(() => {
                            E();
                        }),
                        setTimeout(function () {
                            d.zoomToFit();
                        }, 0),
                        r.App.Sidebar.ImageType.Photo.$().click(function () {
                            U.setImageType(1, !1);
                        }),
                        r.App.Sidebar.ImageType.LogoAA.$().click(function () {
                            U.setImageType(2, !1);
                        }),
                        r.App.Sidebar.ImageType.Logo.$().click(function () {
                            U.setImageType(3, !1);
                        }),
                        r.App.Sidebar.ImageComplexity.high.$().click(function () {
                            U.setImageComplexity(3, !1);
                        }),
                        r.App.Sidebar.ImageComplexity.medium.$().click(function () {
                            U.setImageComplexity(2, !1);
                        }),
                        r.App.Sidebar.ImageComplexity.low.$().click(function () {
                            U.setImageComplexity(1, !1);
                        }),
                        r.App.Sidebar.PaletteYesNo.UnlimitedColors.$().click(function () {
                            U.setPaletteYesNo(2);
                        }),
                        r.App.Sidebar.PaletteYesNo.CustomColors.$().click(function () {
                            U.setPaletteYesNo(1);
                        }),
                        M.initialize(),
                        r.App.Sidebar.ReviewResult.ProcessAsLogoAaWithCustomColorsButton.$().click(function () {
                            U.setImageType(2, !1), U.setPaletteYesNo(1);
                        }),
                        r.App.Sidebar.ReviewResult.WithBlendingButton.$().click(function () {
                            U.setImageType(2, !0);
                        }),
                        r.App.Sidebar.ReviewResult.JaggedEdgesContainer.$().click(function () {
                            U.setImageType(3, !0);
                        }),
                        r.App.Sidebar.ReviewResult.DetailHigh.$().click(function () {
                            U.setImageComplexity(3, !0);
                        }),
                        r.App.Sidebar.ReviewResult.DetailMedium.$().click(function () {
                            U.setImageComplexity(2, !0);
                        }),
                        r.App.Sidebar.ReviewResult.DetailLow.$().click(function () {
                            U.setImageComplexity(1, !0);
                        }),
                        r.App.Sidebar.ReviewResult.UnlimitedColors.$().click(function () {
                            U.setPaletteYesNo(2);
                        }),
                        r.App.Sidebar.ReviewResult.custom_colors.$().click(function () {
                            U.setPaletteYesNo(1);
                        }),
                        r.App.Sidebar.ReviewResult.EditResult.$().click(() => {
                            k(), U.startSegEditing();
                        }),
                        r.App.Sidebar.ReviewResult.RemoveBackground.$().click(function () {
                            f.modal(r.App.RemoveBackgroundDialog);
                        }),
                        r.App.Sidebar.ReviewResult.HandPickSettings.$().click(U.handPickSettings),
                        r.App.Sidebar.VectorizationFailed.HandPickSettings.$().click(U.handPickSettings),
                        r.App.Sidebar.VectorizationFailed.EditSegmentation.$().click(U.startSegEditing),
                        r.App.Sidebar.BackButton.$().click(function () {
                            U.goBack();
                        }),
                        r.App.Sidebar.NextButton.$().click(function () {
                            U.goNext();
                        }),
                        r.App.Sidebar.ClassificationFailed.Retry.$().click(U.retryClassification),
                        r.App.Sidebar.VectorizationFailed.Retry.$().click(U.retryVectorization),
                        r.App.Sidebar.FetchingSegmentationFailed.Retry.$().click(U.startSegEditing),
                        new pt(
                            r.App.Toolbar.ZoomIn.$(),
                            function () {
                                d.zoomBy(N.zoomStep);
                            },
                            50,
                            1
                        ),
                        new pt(
                            r.App.Toolbar.ZoomOut.$(),
                            function () {
                                d.zoomBy(1 / N.zoomStep);
                            },
                            50,
                            1
                        ),
                        r.App.Toolbar.ZoomToFit.$().click(function () {
                            d.zoomToFit();
                        }),
                        r.App.Toolbar.Zoom1To1.$().click(function () {
                            d.zoom1To1();
                        }),
                        r.App.Toolbar.ViewSingle.$().click(function () {
                            C(!1);
                        }),
                        r.App.Toolbar.ViewSplit.$().click(function () {
                            C(!0);
                        }),
                        f.radioButton(r.App.Toolbar.ViewBitmap, A, T),
                        r.App.StickySettings.fully_automatic.$().prop("checked", R.fullyAutomatic()),
                        r.App.StickySettings.fully_automatic.$().click(function () {
                            let t = R.fullyAutomatic(!R.fullyAutomatic());
                            r.App.StickySettings.fully_automatic.$().prop("checked", t), y();
                        }),
                        r.App.StickySettings.pre_crop_enabled_checkbox.$().prop("checked", R.preCropEnabled()),
                        r.App.StickySettings.pre_crop_enabled_checkbox.$().click(function () {
                            let t = R.preCropEnabled(!R.preCropEnabled());
                            r.App.StickySettings.pre_crop_enabled_checkbox.$().prop("checked", t);
                        }),
                        r.App.StickySettings.show.$().click(function () {
                            return f.modal(r.App.StickySettings.Lightbox), !1;
                        }),
                        r.$window.keydown(D),
                        r.$window.keyup(_),
                        (e = 1),
                        $(".navbar").hide(),
                        $(".footer").hide(),
                        $(".container >").hide(),
                        r.App.App.$().show();
                }),
                (t.resultProgress = function (t) {
                    g.vector.setProgress(t);
                }),
                (t.resultUpdated = function (t) {
                    (c = t), g.vector.setResult(t);
                }),
                (t.resultFailedToLoad = function (t) {
                    g.vector.setFailedToLoad(t);
                }),
                (function (t) {
                    var n, o;
                    function a() {
                        var t = (function () {
                            switch (e) {
                                case 3:
                                    return r.App.Sidebar.ImageType.Loupe;
                                case 5:
                                    return r.App.Sidebar.ImageComplexityLogoAa.Loupe;
                                case 6:
                                    return r.App.Sidebar.ImageComplexityLogo.Loupe;
                            }
                        })();
                        if (t) {
                            const e = t.$()[0],
                                a = i.element,
                                r = e.getContext("2d");
                            s.set(r, "msImageSmoothingEnabled", !1), (r.mozImageSmoothingEnabled = !1), (r.webkitImageSmoothingEnabled = !1), (r.imageSmoothingEnabled = !1), r.save();
                            const h = 6,
                                l = e.width / (2 * h),
                                c = e.height / (2 * h),
                                u = a.width,
                                d = a.height,
                                p = f.clamp(n || u / 2, l, u - l),
                                m = f.clamp(o || d / 2, c, d - c);
                            r.scale(6, 6), r.translate(l, c), r.translate(-p, -m), r.drawImage(i.element, 0, 0), r.restore();
                        }
                    }
                    (t.moveHandler = function (t) {
                        return (n = t.x), (o = t.y), requestAnimationFrame(a), !1;
                    }),
                        (t.drawLoupeInternal = a),
                        (t.mouseCursor = function (t) {});
                })(I || (I = {})),
                (function (t) {
                    const e = [
                            r.App.Sidebar.PaletteContents.P2,
                            r.App.Sidebar.PaletteContents.P3,
                            r.App.Sidebar.PaletteContents.P4,
                            r.App.Sidebar.PaletteContents.P5,
                            r.App.Sidebar.PaletteContents.P6,
                            r.App.Sidebar.PaletteContents.P7,
                            r.App.Sidebar.PaletteContents.P8,
                            r.App.Sidebar.PaletteContents.P9,
                            r.App.Sidebar.PaletteContents.P10,
                            r.App.Sidebar.PaletteContents.P11,
                            r.App.Sidebar.PaletteContents.P12,
                        ],
                        n = [
                            r.App.Sidebar.PaletteContents.CustomColor0,
                            r.App.Sidebar.PaletteContents.CustomColor1,
                            r.App.Sidebar.PaletteContents.CustomColor2,
                            r.App.Sidebar.PaletteContents.CustomColor3,
                            r.App.Sidebar.PaletteContents.CustomColor4,
                            r.App.Sidebar.PaletteContents.CustomColor5,
                            r.App.Sidebar.PaletteContents.CustomColor6,
                            r.App.Sidebar.PaletteContents.CustomColor7,
                            r.App.Sidebar.PaletteContents.CustomColor8,
                            r.App.Sidebar.PaletteContents.CustomColor9,
                            r.App.Sidebar.PaletteContents.CustomColor10,
                            r.App.Sidebar.PaletteContents.CustomColor11,
                        ];
                    var s = -1,
                        a = void 0;
                    function l(t) {
                        0 <= s && s < n.length && n[s].$().removeClass("active"),
                            (s = t),
                            h && 0 <= s && s < h.getPalette().getNumColors() && (n[s].$().addClass("active"), r.App.Sidebar.PaletteContents.eye_dropper_swatch.$().css("background", h.getPalette().getCssColor(s)));
                    }
                    (t.moveHandler = function (t) {
                        return (
                            s >= 0 &&
                                (0 <= t.x && t.x < i.width() && 0 <= t.y && t.y < i.height() && ((a = Ot.fromCanvasContext(i.context().context, t.x, t.y)), r.App.Sidebar.PaletteContents.EyeDropper1.$().css("background", a.toCss())),
                                t.down ? a && U.paletteWithColor(s, a) : 3 == t.type && l(-1)),
                            s >= 0
                        );
                    }),
                        (t.mouseCursor = function (t) {
                            if (s >= 0) return r.eyedropper_tool;
                        }),
                        (t.updatePalette = function () {
                            if (x() && h) {
                                var t = h.getPalette();
                                const s = o.getPaletteList(h.getImageTypeE(), h.getImageComplexityE()),
                                    a = s.getBestPalette();
                                var i;
                                for (r.App.Sidebar.PaletteContents.suggested_palettes_item.$().removeClass(r.App.Sidebar.PaletteContents.recommended_palette.name() + " active"), i = 0; i < e.length; i++) {
                                    const n = e[i],
                                        o = s.getPalette(i);
                                    n.$().html(s.getPalette(i).getSwatchesHtml(r.App.Sidebar.PaletteContents.suggested_swatch)),
                                        o.equals(a) && n.$().addClass(r.App.Sidebar.PaletteContents.recommended_palette.name()),
                                        o.equals(t) && n.$().addClass("active");
                                }
                                for (i = 0; i < t.getNumColors(); i++) {
                                    const e = n[i];
                                    e.$().show();
                                    const s = e.css() + " > " + r.App.Sidebar.PaletteContents.custom_swatch.css();
                                    $(s).css("background-color", t.getCssColor(i));
                                }
                                for (; i < n.length; i++) {
                                    n[i].$().hide();
                                }
                                r.App.Sidebar.PaletteContents.AddCustomColor.$().toggle(t.getNumColors() < 12),
                                    r.App.Sidebar.PaletteContents.CustomColorsList.$().toggleClass(r.App.Sidebar.PaletteContents.can_delete.name(), t.getNumColors() > 2);
                            }
                        }),
                        (t.initialize = function () {
                            function t(t) {
                                e[t].$().click(function () {
                                    l(-1), U.pickSuggestedPalette(t, !1);
                                }),
                                    e[t].$().dblclick(function () {
                                        U.pickSuggestedPalette(t, !0);
                                    });
                            }
                            var o;
                            for (o = 0; o < e.length; o++) t(o);
                            function a(t) {
                                const e = n[t];
                                e.$().click(function () {
                                    return l(t), !1;
                                }),
                                    $(e.css() + " " + r.App.Sidebar.PaletteContents.delete_color.css()).click(function () {
                                        return U.paletteWithoutColor(t), t == s ? l(-1) : t < s && l(s - 1), !1;
                                    });
                            }
                            for (o = 0; o < n.length; o++) a(o);
                            r.App.Sidebar.PaletteContents.AddCustomColor.$().click(function () {
                                const t = Ot.fromCanvasContext(i.context().context, 0, 0);
                                U.paletteWithNewColor(t), h && l(h.getPalette().getNumColors() - 1);
                            });
                        });
                })(M || (M = {})),
                (function (t) {
                    var e,
                        i,
                        n,
                        s = !1,
                        o = 0,
                        a = Ot.black,
                        h = Ot.black,
                        l = !1;
                    function c(t) {
                        a.equals(t) || ((a = t), r.App.Toolbar.ColorSwatch0.$().css("background", a.toCss()));
                    }
                    function u(t) {
                        h.equals(t) || ((h = t), r.App.Toolbar.ColorSwatch1.$().css("background", h.toCss()));
                    }
                    function d(t, i) {
                        (o = t), (e = i), r.App.Toolbar.tool_button.$().removeClass("active"), i.$().addClass("active"), w.invalidateMouseCursor();
                    }
                    (t.moveHandler = function (t) {
                        switch (o) {
                            case 1:
                                return 1 == t.type && L.zap(t.x, t.y, a), !0;
                            case 2:
                                return 1 == t.type && L.fill(t.x, t.y, a), !0;
                            case 3:
                                return t.down && L.pixel(t.x, t.y, a), !0;
                            case 4:
                                if (L.isInside(t.x, t.y)) {
                                    const e = L.color(t.x, t.y);
                                    t.down && c(e), u(e);
                                }
                                return !0;
                        }
                        return !1;
                    }),
                        (t.mouseCursor = function (t) {
                            switch (o) {
                                case 1:
                                    return r.App.Toolbar.zap_tool;
                                case 2:
                                    return r.App.Toolbar.fill_tool;
                                case 3:
                                    return r.App.Toolbar.pixel_tool;
                                case 4:
                                    return r.eyedropper_tool;
                            }
                        }),
                        (t.setDefaultColor = function (t) {
                            c(t), u(t);
                        }),
                        (t.segmentationSetEnabled = function (t, e, i) {
                            r.App.Toolbar.Undo.$().prop("disabled", !t), r.App.Toolbar.Redo.$().prop("disabled", !e), r.App.Toolbar.Reset.$().prop("disabled", !i);
                        }),
                        (t.segmentationDontEditTooMuch = function () {
                            l || (r.App.ImageView.DontEditTooMuchNotification.$().show(), (l = !0));
                        }),
                        (t.keyDownHandler = function (t) {
                            switch (t.keyCode) {
                                case 90:
                                    return t.shiftKey ? L.redo() : L.undo(), !0;
                                case 89:
                                    return L.redo(), !0;
                                case 16:
                                    return 0 != o && ((i = o), (n = e), d(0, r.App.Toolbar.Pan)), !0;
                            }
                            return !1;
                        }),
                        (t.keyUpHandler = function (t) {
                            return 16 === t.keyCode && (0 == o && d(i, n), !0);
                        }),
                        (t.initialize = function () {
                            s ||
                                ((s = !0),
                                r.App.Toolbar.Undo.$().click(L.undo),
                                r.App.Toolbar.Redo.$().click(L.redo),
                                r.App.Toolbar.Reset.$().click(L.reset),
                                f.radioButton(r.App.Toolbar.SegEditViewBitmap, A, k),
                                f.radioButton(r.App.Toolbar.SegEditViewVector, T, k),
                                r.App.Toolbar.Finder.$().click(function () {
                                    L.toggleFinder(), r.App.Toolbar.Finder.$().toggleClass("active", L.getShowPinchPoints());
                                }),
                                r.App.Toolbar.Pan.$().click(function () {
                                    d(0, r.App.Toolbar.Pan);
                                }),
                                r.App.Toolbar.Zap.$().click(function () {
                                    d(1, r.App.Toolbar.Zap);
                                }),
                                r.App.Toolbar.Fill.$().click(function () {
                                    d(2, r.App.Toolbar.Fill);
                                }),
                                r.App.Toolbar.Pixel.$().click(function () {
                                    d(3, r.App.Toolbar.Pixel);
                                }),
                                r.App.Toolbar.ColorPicker.$().click(function () {
                                    d(4, r.App.Toolbar.ColorPicker);
                                }),
                                (g.segmentation.handler = t),
                                r.App.Toolbar.Pan.$().click()),
                                g.showSegmentation();
                        });
                })(F || (F = {}));
        })(W || (W = {})),
        (function (t) {
            let e;
            !(function (t) {
                (t[(t.paypal = 0)] = "paypal"), (t[(t.fake = 1)] = "fake");
            })(e || (e = {}));
            function i(t) {
                let e = [];
                function i(t, i) {
                    e.push(encodeURIComponent(t) + "=" + encodeURIComponent(i));
                }
                function n(t, e) {
                    if ($.isArray(e))
                        $.each(e, function (e, i) {
                            n(t + "[" + e + "]", i);
                        });
                    else if ("object" == $.type(e)) for (let i in e) e.hasOwnProperty(i) && n(t + "." + i, e[i]);
                    else i(t, e);
                }
                i(GlobalsShared.localeQueryParameter, GlobalsShared.locale);
                for (let e in t) t.hasOwnProperty(e) && n(e, t[e]);
                return e.join("&").replace(" ", "+");
            }
            function s(t) {
                return function (e, i, n) {
                    t({ error: { message: o(e, i) } });
                };
            }
            function o(t, e) {
                if (0 === t.status) return n.s("Failed to connect to the server.") + "\n" + n.s("Please verify your network connection.") + "\n";
                {
                    const i = t.responseText.toString().substring(0, 200);
                    return t.status < 200 || 299 < t.status
                        ? t.statusText + " [" + t.status + "]\n" + i
                        : "parsererror" === e
                        ? n.s("Failed to parse JSON response.") + " [" + e + "]\n" + i
                        : "timeout" === e
                        ? n.s("Request time out.") + " [" + e + "]"
                        : "abort" === e
                        ? n.s("Request aborted by the server.") + " [" + e + "]"
                        : n.s("Unknown error.") + "\n" + i;
                }
            }
            function a() {
                return merchantJs.settings.host + "/payments/v0/preapprovals/" + merchantJs.settings.wud + "/";
            }
            function h(t, e) {
                let n = a() + "payment_method?" + i(t);
                $.ajax(n, {
                    dataType: "jsonp",
                    timeout: 3e4,
                    success: function (t) {
                        e(t);
                    },
                    error: s(e),
                });
            }
            let l, c, u, d;
            !(function (t) {
                let n = null,
                    o = null;
                function r() {
                    n && (o && (clearInterval(o), (o = null)), n.close(), (n = null));
                }
                function l(t, o, h) {
                    r(), (n = window.open("", "_blank")), n.document.write("<h3>Loading...</h3>");
                    var l = a() + e[t] + "?" + i(o);
                    $.ajax(l, {
                        dataType: "jsonp",
                        timeout: 3e4,
                        success: function (t) {
                            h(t);
                        },
                        error: s(h),
                    });
                }
                t.handler = function (t) {
                    return function (e, i, s) {
                        l(t, e, function (t) {
                            var e, a;
                            !t || t.error
                                ? (r(), i(t))
                                : ((e = t.preapproval.processorToken.url),
                                  (a = function () {
                                      s(), h(t.preapproval, i);
                                  }),
                                  n &&
                                      ((n.location.href = e),
                                      n.focus(),
                                      (o = setInterval(function () {
                                          n.closed && (clearInterval(o), (o = null), a());
                                      }, 100))));
                        });
                    };
                };
            })(l || (l = {})),
                (function (t) {
                    (t.initialize = function () {
                        return !0;
                    }),
                        (t.pay = function (t) {
                            t({ error: { message: "Unavailable" } });
                        }),
                        (t.radioButton = function () {
                            return new J("__unavailable_payment_processor__");
                        }),
                        (t.name = function () {
                            return "unavailable";
                        });
                })(c || (c = {})),
                (function (t) {
                    let e, i, n;
                    (t.initialize = function () {
                        return (
                            "undefined" != typeof Stripe &&
                            ((e = Stripe(merchantJs.settings.stripePublishableKey)),
                            (i = e.elements({ locale: GlobalsShared.locale })),
                            (n = i.create("card", { style: { base: { lineHeight: "1.429" } } })),
                            n.mount(r.merchant.StripeCardElement.css()),
                            n.on("change", function (t) {
                                t && t.error ? r.merchant.StripeCardErrors.$().text(t.error.message) : r.merchant.StripeCardErrors.$().text("");
                            }),
                            n.on("focus", function () {
                                r.merchant.StripeCardElement.$().addClass("focus");
                            }),
                            n.on("blur", function () {
                                r.merchant.StripeCardElement.$().removeClass("focus");
                            }),
                            !0)
                        );
                    }),
                        (t.pay = function (t) {
                            g(),
                                e.createToken(n, { name: r.merchant.StripeNameElement.$().val() }).then(function (e) {
                                    if (e.error) t({ error: { message: e.error.message } });
                                    else {
                                        b();
                                        const i = e.token;
                                        h({ processor: "stripe", processorToken: { id: i.id, card: i.card }, preapprovalSpec: merchantJs.preapprovalSpec }, t);
                                    }
                                });
                        }),
                        (t.radioButton = function () {
                            return r.merchant.RadioStripe;
                        }),
                        (t.name = function () {
                            return "stripe";
                        });
                })(u || (u = {})),
                (function (t) {
                    let e;
                    (t.initialize = function () {
                        if ("undefined" != typeof braintree) {
                            let t = !0;
                            return (
                                braintree.dropin
                                    .create({
                                        authorization: merchantJs.settings.braintreeTokenizationKey,
                                        container: r.merchant.BraintreeDropinContainer.css(),
                                        locale: GlobalsShared.locale.replace("-", "_"),
                                        card: { cardholderName: !0 },
                                        dataCollector: { kount: !0 },
                                    })
                                    .then(function (t) {
                                        e = t;
                                    })
                                    .catch(function (e) {
                                        (t = !1), g(), r.merchant.PaymentError.$().text(e.message).show();
                                    }),
                                t
                            );
                        }
                        return !1;
                    }),
                        (t.pay = function (t) {
                            g(),
                                e.requestPaymentMethod(function (i, n) {
                                    if (i) e.clearSelectedPaymentMethod(), t({ error: i });
                                    else {
                                        b();
                                        h({ processor: "braintree", processorToken: n, preapprovalSpec: merchantJs.preapprovalSpec }, function (i) {
                                            i.error && e.clearSelectedPaymentMethod(), t(i);
                                        });
                                    }
                                });
                        }),
                        (t.radioButton = function () {
                            return r.merchant.RadioBraintree;
                        }),
                        (t.name = function () {
                            return "braintree";
                        });
                })(d || (d = {}));
            const p = l.handler(e.paypal),
                m = l.handler(e.fake);
            function g() {
                r.merchant.PaymentError.$().hide(), r.merchant.StripePaymentError.$().hide(), r.merchant.PaymentMethodFormSubmit.$().attr("disabled", "disabled");
            }
            function f() {
                r.merchant.PaymentMethodFormSubmit.$().removeAttr("disabled");
            }
            function w(t) {
                r.merchant.PaymentError.$()
                    .html("<p>" + t)
                    .show(),
                    f();
            }
            function b() {
                r.merchant.ShowWhenMinibrowsing.$().modal("hide"), r.merchant.ShowWhenCreatingPm.$().modal("show");
            }
            function v(t) {
                r.merchant.ShowWhenMinibrowsing.$().modal("hide"),
                    r.merchant.ShowWhenCreatingPm.$().modal("hide"),
                    null === t
                        ? w("Got a null response from the server")
                        : t.error
                        ? w(t.error.message)
                        : (r.merchant.ShowWhenSubmitting.$().modal("show"), y({ streamlexPaymentToken: t.paymentMethod.streamlexPaymentToken, defaultPaymentMethod: S }));
            }
            let S = "stripe",
                y = null;
            $(function () {
                "undefined" != typeof merchantJs &&
                    (!(function (t) {
                        y = t;
                        let e = !1,
                            i = !1;
                        merchantJs.settings.braintreePrimary
                            ? merchantJs.settings.canBraintree
                                ? (e = !0)
                                : merchantJs.settings.canStripe && (i = !0)
                            : merchantJs.settings.canStripe
                            ? (i = !0)
                            : merchantJs.settings.canBraintree && (e = !0);
                        const n = e ? d : i ? u : c,
                            s = n.initialize(),
                            o = s && (merchantJs.settings.canBraintree || merchantJs.settings.canStripe || merchantJs.settings.canPaypal);
                        S = n.name();
                        const a = $("input[type=radio][name=paymentMethod]");
                        let h = null,
                            l = !1;
                        a.change(function () {
                            var t;
                            r.merchant.CreditCardProcessorForm.$().toggle(n.radioButton().$().prop("checked")),
                                (h = $(this)),
                                (l = merchantJs.needZipCode && ("paypal" == (t = h.data("processor") || h.val()) || "fake" == t)),
                                r.merchant.TaxSection.$().toggle(l);
                        }),
                            $("#paymentMethod_" + merchantJs.defaultPaymentMethod)
                                .prop("checked", !0)
                                .change(),
                            r.merchant.AcceptTermsWrapper.$().removeClass(r.merchant.has_error.name()),
                            r.merchant.InitializingIndicator.$().hide(),
                            r.merchant.SubmitSection.$().show(),
                            r.merchant.PaymentMethodForm.$().submit(function () {
                                S = (h && h.val()) || n.name();
                                let e = !1;
                                if (l) {
                                    let t = /^\d{5}$/,
                                        i = ("" + r.merchant.TaxPostalCode.$().val()).trim();
                                    t.test(i)
                                        ? (r.merchant.TaxPostalCodeFormGroup.removeClass(r.merchant.has_error), r.merchant.TaxLocationPostalCode.$().val(i))
                                        : (r.merchant.TaxPostalCodeFormGroup.addClass(r.merchant.has_error), (e = !0));
                                }
                                if ((r.merchant.AcceptTerms.$().prop("checked") ? r.merchant.AcceptTermsWrapper.removeClass(r.merchant.has_error) : (r.merchant.AcceptTermsWrapper.addClass(r.merchant.has_error), (e = !0)), e)) return !1;
                                switch ((g(), S)) {
                                    case "stripe":
                                        u.pay(v);
                                        break;
                                    case "braintree":
                                        d.pay(v);
                                        break;
                                    case "paypal":
                                        r.merchant.ShowWhenMinibrowsing.$().modal("show"), p(merchantJs.preapprovalSpec, v, b);
                                        break;
                                    case "fake":
                                        merchantJs.settings.isTesting && (r.merchant.ShowWhenMinibrowsing.$().modal("show"), m(merchantJs.preapprovalSpec, v, b));
                                        break;
                                    default:
                                        r.merchant.ShowWhenSubmitting.$().modal("show"), t({ streamlexPaymentToken: S, defaultPaymentMethod: S });
                                }
                                return !1;
                            }),
                            o ? f() : (g(), s || r.merchant.FailedToLoadPaymentBackendJs.$().show());
                    })(function (t) {
                        r.merchant.StreamlexPaymentToken.$().val(t.streamlexPaymentToken), r.merchant.DefaultPaymentMethod.$().val(t.defaultPaymentMethod), r.merchant.PaymentForm.$().submit();
                    }),
                    $(window).on("load", function () {
                        new Image().src = "https://www.paypal.com/home";
                    }));
            });
        })(H || (H = {})),
        (function (t) {
            function e() {
                const t = merchantJs.preapprovalSpec.currency,
                    e = f.clamp(f.parseIntWithAlt(r.ProjectMerchant.NumLicenses.$().val(), 10, z.MinNumLicensesInPurchase), z.MinNumLicensesInPurchase, z.MaxNumLicensesInPurchase),
                    i = e * productPurchaseJs.centsPerLicense,
                    s = i - productPurchaseJs.vmdeCreditCents,
                    o = n.currencyAmount(t, s);
                (merchantJs.preapprovalSpec.cents = s),
                    r.ProjectMerchant.NumLicenses.$().val("" + e),
                    r.ProjectMerchant.VmdeTotal.$().html(n.currencyAmount(t, i)),
                    r.ProjectMerchant.Total.$().html(o),
                    r.merchant.Cents.$().val("" + s),
                    merchantJs.maybeCollectSalesTax
                        ? r.merchant.PaymentMethodFormSubmit.$().html(n.s("Buy {0} {0,plural,one{license}other{licenses}} for {1} + tax<sup>*</sup> &raquo;", e, o))
                        : r.merchant.PaymentMethodFormSubmit.$().html(n.s("Buy {0} {0,plural,one{license}other{licenses}} for {1} &raquo;", e, o));
            }
            $(document).ready(function () {
                r.ProjectMerchant.NumLicenses.exists() && "undefined" != typeof productPurchaseJs && "undefined" != typeof merchantJs && (r.ProjectMerchant.NumLicenses.$().on("input", e), e());
            });
        })(V || (V = {})),
        (function (t) {
            let e = !1,
                i = [];
            function n() {
                if (0 == i.length) (e = !1), r.$window.off(".SvgAnimation");
                else {
                    const t = $(document).scrollTop(),
                        e = r.$window.height(),
                        n = t + e,
                        s = t + 0.5 * e;
                    let a = [];
                    for (let t of i) {
                        const e = t.Id.$().offset().top,
                            i = e + t.Id.$().height();
                        (s > e || n > i) && a.push(t);
                    }
                    for (let t of a) i.splice(i.indexOf(t), 1), o(t);
                }
            }
            t.register = function (t) {
                t.Id.$().length > 0 && (e || ((e = !0), r.$window.on("resize.SvgAnimation scroll.SvgAnimation", n)), i.push(t), n());
            };
            const s = 1.5;
            function o(t) {
                let e = new TimelineLite(),
                    i = +t.Id.$().data("zoom-to-x-min") || 0,
                    n = +t.Id.$().data("zoom-to-x-max") || 0,
                    r = +t.Id.$().data("zoom-to-y-min") || 0,
                    l = +t.Id.$().data("zoom-to-y-max") || 0,
                    c = f.randomInt2(i, n),
                    u = f.randomInt2(r, l),
                    d = +t.Id.$().data("zoom-to-scale") || 1;
                e
                    .delay(1)
                    .to(t.transformable.$(), s, { svgOrigin: c + " " + u, scale: d })
                    .to(t.Outlines.$(), s, { attr: { x: "0%" } })
                    .to(t.Shapes.$(), s, { attr: { x: "0%" } }, "+=0.25")
                    .to(t.Outlines.$(), 0, { attr: { x: "-100%" } })
                    .to(t.Shapes.$(), 0.75, { attr: { x: "50%" } }, "+=0.25")
                    .to(t.Line.$(), 0, { display: "inline", attr: { x1: "50%", x2: "50%" } })
                    .to(t.Labels.$(), 0, { display: "block" })
                    .eventCallback("onComplete", h, [t, !0]),
                    (function (t, e) {
                        t.Id.$()
                            .off("click")
                            .click(function () {
                                h(t, !1), a(t, 0.5), TweenLite.to(t.Shapes.$(), 0, { attr: { x: "100%" } }), e.seek(0), e.kill(), o(t);
                            });
                    })(t, e);
            }
            function a(t, e) {
                let i = (100 * e).toFixed(2) + "%";
                TweenLite.to(t.Shapes.$(), 0, { attr: { x: i } }), TweenLite.to(t.Line.$(), 0, { attr: { x1: i, x2: i } });
            }
            function h(t, e) {
                e
                    ? t.Id.$()
                          .off("mousemove mouseleave")
                          .mousemove(function (e) {
                              let i = (e.pageX - t.Id.$().offset().left) / t.Id.$().width();
                              a(t, i);
                          })
                          .mouseleave(function () {
                              a(t, 0.5);
                          })
                    : t.Id.$().off("mousemove mouseleave");
            }
        })(X || (X = {})),
        (function (t) {
            const e = r.Signon.Dialog.anscestorOf(new Q("modal-header")),
                i = "message.signup",
                n = [];
            let s = null;
            function o(t) {
                const e = t.originalEvent,
                    i = (function (t) {
                        for (let e of n) if (e.contentWindow == t) return e;
                        return null;
                    })(e.source);
                if (i) {
                    let t = parseInt(e.data);
                    t > 10 && (i.height = t + "px"), i.hasLoaded || ((i.hasLoaded = !0), l());
                }
            }
            function a() {
                h($(this));
            }
            function h(t) {
                const e = t.data("url");
                if (null == s || s.src != e) {
                    (s =
                        (function (t) {
                            for (let e of n) if (e.src == t) return e;
                            return null;
                        })(e) ||
                        (function (t) {
                            let e = document.createElement("iframe");
                            return (
                                e.setAttribute("seamless", "seamless"),
                                (e.frameBorder = "0"),
                                (e.width = "100%"),
                                (e.height = "650px"),
                                (e.style.backgroundColor = "#fff"),
                                (e.hasLoaded = !1),
                                (e.onload = function (t) {
                                    (e.hasLoaded = !0), l();
                                }),
                                (e.src = t),
                                n.push(e),
                                r.Signon.IframeContainer.$().prepend(e),
                                e
                            );
                        })(e)),
                        (s.style.display = "block");
                    for (let t of n) t != s && (t.style.display = "none");
                }
                l();
            }
            function l() {
                r.Signon.LoadingIndicator.$().toggle(!(s && s.hasLoaded));
            }
            function c() {
                const t = $(this);
                h(t), r.$window.on(i, o);
                const n = t.data("header");
                return n ? (r.Signon.Header.$().text(n).show(), e.$().css("border-bottom", "")) : (r.Signon.Header.$().hide(), e.$().css("border-bottom", "none")), r.Signon.Dialog.$().modal(), !1;
            }
            t.checkInit = function () {
                r.Signon.Dialog.$().length > 0 &&
                    r.Signon.trigger.$().length > 0 &&
                    (r.Signon.Dialog.$().on("hide.bs.modal", function () {
                        r.$window.off(i);
                    }),
                    r.Signon.trigger.elements().forEach((t) => {
                        t.addEventListener("touchstart", a, { passive: !0 }), t.addEventListener("mouseover", a, { passive: !0 });
                    }),
                    r.Signon.trigger.$().click(c),
                    r.Signon.preload.$().each(a));
            };
        })(Y || (Y = {}));
    for (let t of __jqdeferred) $(t);
    (__jqdeferred.length = 0),
        (function (t) {
            var e;
            (e = () => {
                window.addEventListener(
                    "message",
                    (t) => {
                        if (t.data)
                            if ("ping" == t.data) t.source.postMessage("pong", "*");
                            else if ("pong" == t.data) for (let e = 0; e < a.length; e++) a[e].checkPong(t) && (a.splice(e, 1), e--);
                            else if (t.data.file || t.data.blob) {
                                let e = t.data.file || t.data.blob;
                                if (window.hasOwnProperty("chrome"))
                                    try {
                                        let t = new FileReader();
                                        (t.onload = function () {
                                            s(new File([t.result], e.name, { type: e.type, lastModified: e.lastModified }));
                                        }),
                                            t.readAsArrayBuffer(e);
                                    } catch (t) {}
                                else s(e);
                            }
                    },
                    !1
                );
            }),
                "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e);
            let i,
                n = [];
            function s(t) {
                i ? i(t) : n.push(t);
            }
            t.setFileReceiver = function (t) {
                (i = t),
                    setTimeout(() => {
                        for (let t = 0; t < n.length; t++) i(n[t]);
                        n = [];
                    }, 1);
            };
            class o {
                constructor(t, e, i) {
                    (this.onOpen = i),
                        (this.targetWindow = window.open(t, e)),
                        this.targetWindow.postMessage("ping", "*"),
                        (this.pingIntervalId = setInterval(() => {
                            this.targetWindow.postMessage("ping", "*");
                        }, 30));
                }
                checkPong(t) {
                    return t.source == this.targetWindow && (clearInterval(this.pingIntervalId), this.onOpen(), !0);
                }
            }
            let a = [],
                r = {};
            t.sendFile = function (t, e, i, n) {
                e || (e = Date.now() + "-" + Math.random());
                let s = r[e];
                function h() {
                    setTimeout(() => {
                        (n ? s : window).focus(), s.postMessage({ file: i }, "*");
                    }, 1);
                }
                !s || s.closed
                    ? (s = (function (t, e, i) {
                          let n = new o(t, e, i);
                          return a.push(n), (r[e] = n.targetWindow), n.targetWindow;
                      })(t, e, h))
                    : h();
            };
        })(G || (G = {})),
        (function (t) {
            let e = null,
                i = !1;
            function o() {
                return $(window).off("beforeunload"), location.reload(), !1;
            }
            function a(e, s) {
                if (!i || t.hasRun) return;
                let o = e.type.toLowerCase().split(";")[0];
                f.spinner(!0),
                    F.loadImageShrinkAndThumbnail(
                        e,
                        (t) => {
                            f.gaTrack("image", "loadFailed", "Type: " + o + ", Ext: " + f.getExtensionWithDot(e.name).toLowerCase()), f.fatalErrorStr(n.s('Failed to read image file with name: "{0}", and type: "{1}".', e.name, e.type));
                        },
                        (e, i, n) => {
                            f.gaTrack("image", "uploaded", o),
                                M.createUserImageSpec(e, "image/gif" == o, i, n, f.fatalError, (e) => {
                                    f.spinner(!1), (t.hasRun = !0), U.create(i, n, e, s);
                                });
                        },
                        !0
                    );
            }
            function h(e, n, o) {
                if (!i || t.hasRun) return;
                f.gaTrack("image", "fromUrl", e), f.progress(!0);
                let r = null;
                T.download({
                    url: e,
                    displayUrl: o,
                    progress: f.progressUpdate,
                    error: f.fatalErrorStr,
                    success: (t) => {
                        n && s.set(t, "name", n), (r = t), f.progress(!1), a(r, true);
                    },
                });
            }
            function l(e, n) {
                i &&
                    !t.hasRun &&
                    (f.gaTrack("image", "resumed"),
                    f.progress(!0),
                    M.readUserImageSpec(e, n, f.fatalError, (e) => {
                        T.download({
                            url: e.image.url,
                            progress: f.progressUpdate,
                            error: f.fatalErrorStr,
                            success: (i) => {
                                let n = f.blobToFile(i, e.originalFilename);
                                F.loadCheckRotateFlattenImage(n, f.fatalError, (i) => {
                                    f.progress(!1), (t.hasRun = !0), U.resume(i, e);
                                });
                            },
                        });
                    }));
            }
            (t.hasRun = !1),
                (t.resumeUserImage = l),
                $(document).ready(function () {
                    r.jsNotInitializedYet.removeClass(r.jsNotInitializedYet),
                        (i = (function () {
                            if (null == e) {
                                if (((e = C.list()), e.length > 0)) {
                                    let t = "<h1>" + n.s("Unsupported Browser") + "</h1><p>" + n.s("Terribly sorry, but your browser appears to be missing key feature(s) required to use this website:") + "</p><ul>";
                                    for (let i = 0; i < e.length; i++) t += "<li>" + e[i] + "</li>";
                                    (t += "</ul>"),
                                        (t +=
                                            "<div>" +
                                            n.s(
                                                "Please try the latest version of one of these browsers instead: <b>{0}, {1}, {2}</b>.",
                                                '<a href="' + z.BrowserChromeUrl + '">Chrome</a>',
                                                '<a href="' + z.BrowserFirefoxUrl + '">Firefox</a>',
                                                '<a href="' + z.BrowserMicrosoftEdgeUrl + '">Microsoft Edge</a>'
                                            ) +
                                            "</div>"),
                                        r.App.ModernizrAlert.$().html(t).slideDown(500);
                                }
                                e.length > 0 &&
                                    (r.body.$().addClass(r.cannot_run_app.name()),
                                    r.App.starter.$().attr("disabled", "disabled").addClass("disabled"),
                                    r.App.starter.anscestorOf(new Z("button")).$().attr("disabled", "disabled").addClass("disabled"));
                            } else e.length > 0 && (r.htmlBody.$().scrollTop(0), f.blink(r.App.ModernizrAlert));
                            return 0 == e.length && r.App.App.$().length > 0;
                        })()),
                        i &&
                            (R.initialize(),
                            r.App.cancel_upload.$().click(o),
                            b.initialize({
                                monitor_file_input: r.FileInput.Field,
                                monitor_paste: r.FileInput.PasteTarget,
                                monitor_drag: r.body,
                                hover_class: r.drop_ready,
                                error: (t) => {
                                    alert(t);
                                },
                                drop: (t) => {
                                    a(t[0], !0);
                                },
                                pastedUrl: function (t) {
                                    h(P.fetchUrl(t), void 0, t);
                                },
                                dropOnce: !0,
                            }),
                            B.initialize(),
                            void 0 !== window.ResumeImage && l(window.ResumeImage.id, window.ResumeImage.secret),
                            x.initialize(r.FileInput.UploadFromWeb.show_dialog, function (t) {
                                h(P.fetchUrl(t), void 0, t);
                            }),
                            r.App.resume_link.$().click(function (t) {
                                if (0 == t.button) {
                                    let t = $(this);
                                    return l(t.data("id"), t.data("secret")), !1;
                                }
                                return !0;
                            }),
                            r.App.new_from_url_link.$().click(function (t) {
                                if (0 == t.button) {
                                    let t = $(this);
                                    return h(t.data("url"), t.data("filename")), !1;
                                }
                                return !0;
                            }),
                            r.FileInput.click_to_upload.$().click(function () {
                                let t = r.FileInput.Field.el();
                                (t.value = null), t.click();
                            }),
                            G.setFileReceiver((t) => {
                                a(t, !0);
                            })),
                        w.attachDecorated(),
                        X.register(r.Hurricane),
                        Y.checkInit();
                });
        })(q || (q = {}));
})("undefined" == typeof MainExport ? (MainExport = {}) : MainExport);
