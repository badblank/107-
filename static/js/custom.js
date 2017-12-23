!function(t) {
    "use strict";
    t(function() {
        t.support.transition = function() {
            var t = function() {
                var t, e = document.createElement("bootstrap"),
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (t in i) if (void 0 !== e.style[t]) return i[t]
            } ();
            return t && {
                end: t
            }
        } ()
    })
} (window.jQuery),
!function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e),
        this.options = i,
        this.options.slide && this.slide(this.options.slide),
        "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.prototype = {
        cycle: function() {
            return this.options.interval && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)),
            this
        },
        to: function(e) {
            var i = this.$element.find(".active"),
            s = i.parent().children(),
            n = s.index(i),
            o = this;
            return e > s.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid",
            function() {
                o.to(e)
            }) : n == e ? this.pause().cycle() : this.slide(e > n ? "next": "prev", t(s[e]))
        },
        pause: function() {
            return clearInterval(this.interval),
            this.interval = null,
            this
        },
        next: function() {
            return this.sliding ? void 0 : this.slide("next")
        },
        prev: function() {
            return this.sliding ? void 0 : this.slide("prev")
        },
        slide: function(e, i) { ! t.support.transition && this.$element.hasClass("slide") && this.$element.find(".item").stop(!0, !0);
            var s = this.$element.find(".active"),
            n = i || s[e](),
            o = this.interval,
            a = "next" == e ? "left": "right",
            r = "next" == e ? "first": "last",
            l = this,
            d = t.Event("slide");
            if (this.sliding = !0, o && this.pause(), n = n.length ? n: this.$element.find(".item")[r](), !n.hasClass("active")) {
                if (t.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(d), d.isDefaultPrevented()) return;
                    n.addClass(e),
                    n[0].offsetWidth,
                    s.addClass(a),
                    0 == s.length && n.removeClass(e).addClass("active").css({
                        left: 0
                    }),
                    this.$element.one(t.support.transition.end,
                    function() {
                        n.removeClass(e).addClass("active").css({
                            left: 0
                        }),
                        n.attr("style", ""),
                        s.removeClass(["active", a].join(" ")),
                        l.sliding = !1,
                        setTimeout(function() {
                            l.$element.trigger("slid")
                        },
                        0)
                    })
                } else {
                    if (this.$element.trigger(d), d.isDefaultPrevented()) return;
                    n.removeClass("right" == a ? "prev": "next").css({
                        left: "right" == a ? "-100%": "100%",
                        display: "block",
                        position: "absolute",
                        top: "-100%"
                    }),
                    s.animate({
                        top: 0,
                        left: "right" == a ? "100%": "-100%"
                    },
                    300, "easeInOutExpo",
                    function() {
                        s.removeClass(["left", "right", "active"].join(" ")).css({
                            display: "none",
                            position: "relative"
                        }),
                        s.css({
                            display: "none"
                        })
                    }),
                    setTimeout(function() {
                        n.css({
                            position: "relative",
                            top: 0
                        }),
                        n.animate({
                            left: "0",
                            display: "block"
                        },
                        300, "easeInOutExpo",
                        function() {
                            n.addClass("active").removeClass(["right" == a ? "prev": "next", a].join(" "))
                        })
                    },
                    350),
                    this.sliding = !1,
                    this.$element.trigger("slid")
                }
                return o && this.cycle(),
                this
            }
        }
    },
    t.fn.carousel = function(i) {
        return this.each(function() {
            var s = t(this),
            n = s.data("carousel"),
            o = t.extend({},
            t.fn.carousel.defaults, "object" == typeof i && i);
            n || s.data("carousel", n = new e(this, o)),
            "number" == typeof i ? n.to(i) : "string" == typeof i || (i = o.slide) ? n[i]() : o.interval && n.cycle()
        })
    },
    t.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    },
    t.fn.carousel.Constructor = e,
    t(function() {
        t("body").on("click.carousel.data-api", "[data-slide]",
        function(e) {
            var i, s = t(this),
            n = t(s.attr("data-target") || (i = s.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")),
            o = !n.data("modal") && t.extend({},
            n.data(), s.data());
            n.carousel(o),
            e.preventDefault()
        })
    })
} (window.jQuery);
function adjustOffsetData() {
    $(window).width() > 480 ? $(".anchorClass").height($(window).height()) : $("#aboutus").css({
        height: 480
    }),
    i = 0,
    $("body").find(".anchorClass").each(function() {
        offsetArray[i] = $(this).offset(),
        i++
    })
}
function processAmount() {
    var i = $("#pricing").find(".computers").first().children(".value").text(),
    t = $("#pricing").find(".users").first().children(".value").text(),
    e = $("#pricing").find(".servers").first().children(".value").text(),
    n = 0;
    $("#pricing").find("#emails").first().attr("checked") && (n = 25 + 10 * t);
    var o = 0;
    $("#pricing").find("#antivirus").first().attr("checked") && (o = 10 * e + 5 * i);
    var s = 0;
    $("#pricing").find("#cloud").first().attr("checked") && (s = 25);
    var a = 0;
    $("#pricing").find("#webhost").first().attr("checked") && (a = 25);
    var r = 25 * i + 25 * t + 100 * e + n + o + s + a;
    $("#pricing").find(".total").first().find(".amount").first().find(".price").text(r)
}
function doCheck() {
    $(this).hasClass("checked") ? ($(this).removeClass("checked"), $(this).parent().addClass("unckecked"), $(this).parent().removeClass("checked"), $(this).children("input:checkbox").removeAttr("checked")) : ($(this).addClass("checked"), $(this).parent().removeClass("unckecked"), $(this).parent().addClass("checked"), $(this).children("input:checkbox").attr("checked", "checked")),
    processAmount()
}
function doDown() {
    $(this).addClass("clicked")
}
function doUp() {
    $(this).removeClass("clicked")
}
function hashChangeListener() {
    var i = ($("html").attr("lang").substr(0, 2), window.location.hash);
    anchor = $("a[href$='" + i + "']").data("anchor"),
    null != anchor && "" != anchor && (position = $("#" + anchor).index()),
    setTimeout(function() {
        scrollPage(!1)
    },
    200)
}
function scrollPage(i) {
    if ($(window).width() > 480) {
        if ($("#workflow, #features, #options").each(function() {
            $(this).find(".next-slide").first().css({
                right: $(window).width() > 1300 ? "-100px": "-56px"
            }),
            $(this).find(".prev-slide").first().css({
                left: $(window).width() > 1300 ? "-100px": "-56px"
            })
        }), prev_position = position, !$.browser.msie || $.browser.msie && 7 != parseInt($.browser.version, 10)) {
            var t = $("nav").find("ul").first().find("li:nth-child(" + (position + 1) + ")").first().find("a");
            if (t.attr("href")) {
                var e = t.attr("href");
                document.title = t.data("page-title") ? t.data("page-title") + " - \u718A\u732B\u5DE5\u4F5C\u5BA4": "\u718A\u732B\u5DE5\u4F5C\u5BA4",
                "undefined" != typeof history.pushState && history.replaceState(null, t.data("page-title") + " - \u718A\u732B\u5DE5\u4F5C\u5BA4", e)
            }
        }
        $(".main-content").animate({
            scrollTop: offsetArray[position].top
        },
        800, "easeInOutExpo",
        function() {
            position >= 2 && 4 >= position && (2 == position ? ($("#workflow").find(".pager .active").index() > 0 && showLeftArrow($("#workflow").find(".prev-slide").first()), $("#workflow").find(".pager .active").index() < $("#workflow").find(".pager").find("li").length - 1 && showRightArrow($("#workflow").find(".next-slide").first())) : 3 == position ? ($("#features").find(".pager .active").index() > 0 && showLeftArrow($("#features").find(".prev-slide").first()), $("#features").find(".pager .active").index() < $("#workflow").find(".pager").find("li").length - 1 && showRightArrow($("#features").find(".next-slide").first())) : 4 == position && ($("#options").find(".pager .active").index() > 0 && showLeftArrow($("#options").find(".prev-slide").first()), $("#options").find(".pager .active").index() < $("#workflow").find(".pager").find("li").length - 1 && showRightArrow($("#options").find(".next-slide").first()))),
            motion = !0,
            i && $(".sliding").each(function() {
                changeSlide($(this).attr("id"), 1)
            })
        }),
        adjustNavigation()
    } else if (2 > position) {
        var n = -1 == prev_position ? 480 : position > prev_position ? 480 : 0;
        $(".main-content").animate({
            scrollTop: n
        },
        800, "easeInOutExpo",
        function() {
            prev_position = position,
            motion = !0
        })
    }
}
function setSwipe() {
    null != navigator.userAgent.match(/iPad/i) ? ($(".sliding").swipe({
        swipe: function(i, t) {
            if ("up" == t || "down" == t) position += "up" == t ? 1 : -1,
            scrollPage(!1);
            else {
                var e = $(this).find(".pager:first").find("li.active").index() + ("left" == t ? 2 : 0);
                e > 0 && e < $(this).find(".pager:first").find("li").length + 1 ? changeSlide($(this).attr("id"), e) : (position += "left" == t ? 1 : -1, scrollPage(!1))
            }
        },
        threshold: 150
    }), $(".anchorClass").swipe({
        swipeUp: function() {
            position < $(".anchorClass").length - 1 && (position += 1, scrollPage(!1))
        },
        swipeDown: function() {
            position > 0 && (position -= 1, scrollPage(!1))
        },
        threshold: 150
    })) : (disableSwipe($(".sliding")), disableSwipe($(".anchorclass")))
}
function adjustNavigation() {
    $("nav ul li a").each(function() {
        $(this).removeClass("active")
    }),
    $list_item = $("nav ul li:nth-child(" + (position + 1) + ")"),
    $("#langswitch").attr("href", $list_item.find("a").attr("rel")),
    $("#back_active").animate({
        left: $list_item.offset().left - $("nav ul").offset().left
    },
    500, "easeInOutExpo",
    function() {
        $list_item.find("a").attr("class", "active")
    })
}
function positionWhatBackground() {
    if ($(window).width() > 480) {
        var i = ($(window).width() > 1300 ? -1480 : -1280) + ($(window).width() / 2 + ($(window).width() > 1300 ? 530 : 465));
        $("#aboutus").css({
            backgroundPosition: (i > 0 ? 0 : i) + "px 25%"
        })
    } else $("#aboutus").css({
        backgroundPosition: ($(window).width() > 320 ? "86px": "23px") + " 291px"
    })
}
function changeSlide(i, t) {
    if (0 == sliding) {
        sliding = !0,
        sliderPosition = t;
        var e = $("#" + i),
        n = e.find(".carousel").first(),
        o = e.attr("data-position");
        if (t != o) {
            var s = t > e.attr("data-position") ? "left": "right",
            a = t > e.attr("data-position") ? "next": "prev";
            n.find(".item:nth-child(" + o + ")").addClass(s),
            n.find(".item:nth-child(" + t + ")").addClass(a),
            setTimeout(function() {
                n.carousel(t - 1),
                setTimeout(function() {
                    sliding = !1,
                    motion = !0
                },
                700)
            },
            100),
            e.attr("data-position", sliderPosition)
        } else motion = !0,
        sliding = !1;
        n.carousel("pause"),
        slidePager(e, t),
        adjustSlider(e, n, t)
    }
}
function slidePager(i, t) {
    var e = i.find(".pager").first();
    e.find("li").each(function() {
        $(this).removeClass("active")
    }),
    e.find("li:nth-child(" + t + ")").addClass("active")
}
function hideLeftArrow(i) {
    i.animate({
        left: $(window).width() < 1300 ? "-70px": "-100px",
        display: "hidden"
    },
    200, "easeInOutExpo",
    function() {})
}
function hideRightArrow(i) {
    i.animate({
        right: $(window).width() < 1300 ? "-70px": "-100px",
        display: "show"
    },
    200, "easeInOutExpo",
    function() {})
}
function showLeftArrow(i) {
    i.animate({
        left: $(window).width() < 1300 ? 0 : 0,
        display: "show"
    },
    200, "easeInOutExpo",
    function() {})
}
function showRightArrow(i) {
    i.animate({
        right: $(window).width() < 1300 ? 0 : 0,
        display: "show"
    },
    200, "easeInOutExpo",
    function() {})
}
function positionPager() {
    var i = 0;
    $(".sliding:first").find(".carousel-inner:first").children().each(function() {
        i = $(window).width() >= 1300 ? $("#workflow #w_carousel .carousel-inner .item:first").offset().left + 452 : 458
    }),
    $(".sliding").each(function() {
        $(this).find(".pager:first").css({
            left: i
        })
    }),
    $(".pager").css("visibility", "visible")
}
function adjustSlider(i, t, e) {
    e > 1 ? showLeftArrow(i.find(".prev-slide").first()) : hideLeftArrow(i.find(".prev-slide").first()),
    e < t.children().children(".item").length ? showRightArrow(i.find(".next-slide").first()) : hideRightArrow(i.find(".next-slide").first())
}
jQuery.extend(jQuery.easing, {
    easeInOutExpo: function(i, t, e, n, o) {
        return 0 == t ? e: t == o ? e + n: (t /= o / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + e: n / 2 * ( - Math.pow(2, -10 * --t) + 2) + e
    }
}),
function(i) {
    jQuery.browser.mobile = /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(i) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(i.substr(0, 4))
} (navigator.userAgent || navigator.vendor || window.opera);
var offsetArray = new Array,
motion = !0,
position = 0,
prev_position = -1,
sliderPosition = 0,
coordY = 0,
coordX = 0,
sliding = !1,
touchMove = !1;
function disableSwipe(i) {
    i.swipe({
        swipe: function(i) {
            i.preventDefault()
        }
    }),
    i.children().each(function() {
        disableSwipe($(this))
    })
}
var rtime = new Date(1, 1, 2e3, 12, 0, 0),
timeout = !1,
delta = 400;
$(document).ready(function() {
    function i() {
        if (new Date - rtime < delta) setTimeout(i, delta);
        else {
            timeout = !1,
            positionWhatBackground(),
            $(".main-content").scrollTop(0);
            var e = $(window).height();
            $(".main-content").height(e),
            adjustOffsetData(),
            positionPager(),
            setTimeout(function() {
                scrollPage(!1),
                $(".sliding").each(function() {
                    var i = $(this).find(".carousel:first").find(".carousel-inner:first").find(".pager:first").find("li.active").index(),
                    e = $(this).find(".carousel").first();
                    adjustSlider($(this), e, i)
                })
            },
            300)
        }
    }
    $("#pricing .contact_next").disableSelection(),
    $(".main-content").height($(window).height()),
    $(window).width() > 480 && $(".main-content, .main-content .wrap").css({
        overflow: "hidden"
    }),
    $(".next").bind("touchstart",
    function() {
        $(this).click()
    }),
    $(".next").bind("click",
    function() {
        position++,
        scrollPage(!1)
    }),
    $(".next-slide, .prev-slide").bind("touchstart",
    function() {
        $(this).click()
    }),
    $(".pager").find("ul").find("li").each(function() {
        $(this).find("a").bind("touchstart",
        function() {
            $(this).click()
        })
    }),
    disableSwipe($("#orientation")),
    disableSwipe($("#header")),
    setSwipe(),
    $(document).keydown(function(i) {
        if (motion && (37 == i.keyCode || 38 == i.keyCode || 39 == i.keyCode || 40 == i.keyCode)) {
            motion = !1;
            var e = $(".inner-wrap").children("div:nth-child(" + (position + 1) + ")");
            return 38 == i.keyCode || 40 == i.keyCode ? (40 == i.keyCode ? (position++, position > 6 && (position = 6)) : (position--, 0 > position && (position = 0)), 0 == position && -1 == prev_position && position++, position != prev_position ? scrollPage(!1) : motion = !0) : e.hasClass("sliding") ? (sliderPosition = e.attr("data-position"), 39 == i.keyCode ? (sliderPosition++, sliderPosition > e.find(".carousel-inner").children("div").length ? (position++, e.attr("data-position", sliderPosition - 1), scrollPage(!1)) : changeSlide(e.attr("id"), sliderPosition)) : (sliderPosition--, 1 > sliderPosition ? (position--, e.attr("data-position", 1), scrollPage(!1)) : changeSlide(e.attr("id"), sliderPosition))) : motion = !0,
            !1
        }
    }),
    $(".next-slide").each(function() {
        $(this).live("click",
        function() {
            var i = $(this).parent().parent().attr("id"),
            e = $(this).parent().find(".pager").first().find("li.active").index() + 2;
            motion && changeSlide(i, e)
        })
    }),
    $(".prev-slide").each(function() {
        $(this).live("click",
        function() {
            var i = $(this).parent().parent().attr("id"),
            e = $(this).parent().parent().find(".pager").first().find("li.active").index();
            motion && changeSlide(i, e)
        })
    }),
    $("#pricing").find(".others").first().find("li").each(function() {
        $(this).find("input[type=checkbox]").each(function() {
            var i = $('<span class="' + $(this).attr("type") + '"></span>').click(doCheck).mousedown(doDown).mouseup(doUp);
            $(this).is(":checked") && i.addClass("checked"),
            $(this).wrap(i).hide(),
            $(this).change(processAmount)
        }),
        $(this).bind("touchstart",
        function() {
            $(this).find("input[type=checkbox]").first().click()
        }),
        $(this).find("label").bind("click",
        function() {
            $(this).parent().find("input[type=checkbox]").first().click()
        })
    }),
    $("#slider-range-computer").slider({
        range: "min",
        value: 1,
        min: 1,
        max: 50,
        slide: function(i, e) {
            $("#slider-range-computer").parent().find(".value").first().text(e.value)
        },
        change: processAmount
    }),
    $("#slider-range-user").slider({
        range: "min",
        value: 1,
        min: 1,
        max: 50,
        slide: function(i, e) {
            $("#slider-range-user").parent().find(".value").first().text(e.value)
        },
        change: processAmount
    }),
    $("#slider-range-server").slider({
        range: "min",
        value: 1,
        min: 1,
        max: 10,
        slide: function(i, e) {
            $("#slider-range-server").parent().find(".value").first().text(e.value)
        },
        change: processAmount
    }),
    processAmount(),
    $("#logo").live("click",
    function() {
        position = 0,
        scrollPage(!0)
    }),
    $("#header").find("nav").first().find("ul").find("li").each(function() {
        $(this).each(function() {
            $(this).find("a").click(function(i) {
                i.preventDefault(),
                position = $(this).parent().index(),
                scrollPage(!0)
            })
        })
    }),
    window.addEventListener ? window.addEventListener("hashchange", hashChangeListener, !1) : window.attachEvent("onhashchange", hashChangeListener),
    $(window).resize(function() {
        rtime = new Date,
        timeout === !1 && (timeout = !0, setTimeout(i, delta))
    }),
    adjustOffsetData(),
    $("#b_carousel").carousel({
        interval: !1
    }),
    $("#b_carousel").carousel("pause"),
    $("#b_carousel").carousel("next"),
    $("#w_carousel").carousel({
        interval: !1
    }),
    $("#w_carousel").carousel("next"),
    $("#w_carousel").carousel("pause"),
    $("#o_carousel").carousel({
        interval: !1
    }),
    $("#o_carousel").carousel("next"),
    $("#o_carousel").carousel("pause"),
    $(".anchorClass").mousewheel(function(i, e, t, n) {
        if (motion) if (motion = !1, i.preventDefault(), $(this).hasClass("sliding")) {
            var o = $(this);
            sliderPosition = o.attr("data-position"),
            0 > n ? (sliderPosition++, sliderPosition > o.find(".carousel-inner").children("div").length ? (position++, o.attr("data-position", sliderPosition - 1), scrollPage(!1)) : changeSlide(o.attr("id"), sliderPosition)) : n > 0 ? (sliderPosition--, 1 > sliderPosition ? (position--, o.attr("data-position", 1), scrollPage(!1)) : changeSlide(o.attr("id"), sliderPosition)) : motion = !0
        } else 0 > n ? (position++, position >= 6 && (position = 5)) : n > 0 && (position--, 0 > position && (position = 0)),
        0 == position && -1 == prev_position && position++,
        position != prev_position ? scrollPage(!1) : motion = !0
    }),
    $(window).width() > 480 && (setTimeout(function() {
        var i = window.location.hash;
        anchor = $("a[href$='" + i + "']").data("anchor"),
        null != anchor && "" != anchor && (position = $("#" + anchor).index()),
        scrollPage(!1),
        adjustNavigation()
    },
    300), setTimeout(function() {
        positionPager()
    },
    1e3))
}); !
function(e) {
    function t(t) {
        var n = t || window.event,
        i = [].slice.call(arguments, 1),
        l = 0,
        s = 0,
        o = 0;
        return t = e.event.fix(n),
        t.type = "mousewheel",
        n.wheelDelta && (l = n.wheelDelta / 120),
        n.detail && (l = -n.detail / 3),
        o = l,
        void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (o = 0, s = -1 * l),
        void 0 !== n.wheelDeltaY && (o = n.wheelDeltaY / 120),
        void 0 !== n.wheelDeltaX && (s = -1 * n.wheelDeltaX / 120),
        i.unshift(t, l, s, o),
        (e.event.dispatch || e.event.handle).apply(this, i)
    }
    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks) for (var i = n.length; i;) e.event.fixHooks[n[--i]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
            else this.onmousewheel = t
        },
        teardown: function() {
            if (this.removeEventListener) for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
            else this.onmousewheel = null
        }
    },
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
} (jQuery); !
function(e) {
    function t(t) {
        return ! t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = o),
        t || (t = {}),
        t = e.extend({},
        e.fn.swipe.defaults, t),
        this.each(function() {
            var a = e(this),
            i = a.data(b);
            i || (i = new n(this, t), a.data(b, i))
        })
    }
    function n(t, n) {
        function y(t) {
            if (! (_() || e(t.target).closest(n.excludedElements, et).length > 0)) {
                t = t.originalEvent;
                var a, i = S ? t.touches[0] : t;
                return tt = f,
                S ? nt = t.touches.length: t.preventDefault(),
                z = 0,
                G = null,
                $ = null,
                Z = 0,
                B = 0,
                J = 0,
                K = 1,
                at = C(),
                !S || nt === n.fingers || n.fingers === d || X() ? (at[0].start.x = at[0].end.x = i.pageX, at[0].start.y = at[0].end.y = i.pageY, it = H(), 2 == nt && (at[1].start.x = at[1].end.x = t.touches[1].pageX, at[1].start.y = at[1].end.y = t.touches[1].pageY, B = J = k(at[0].start, at[1].start)), (n.swipeStatus || n.pinchStatus) && (a = m(t, tt))) : (T(t), a = !1),
                a === !1 ? (tt = v, m(t, tt), a) : (j(!0), et.bind(F, x), void et.bind(V, E))
            }
        }
        function x(e) {
            if (e = e.originalEvent, tt !== g && tt !== v) {
                var t, a = S ? e.touches[0] : e;
                if (at[0].end.x = S ? e.touches[0].pageX: a.pageX, at[0].end.y = S ? e.touches[0].pageY: a.pageY, rt = H(), G = R(at[0].start, at[0].end), S && (nt = e.touches.length), tt = w, 2 == nt && (0 == B ? (at[1].start.x = e.touches[1].pageX, at[1].start.y = e.touches[1].pageY, B = J = k(at[0].start, at[1].start)) : (at[1].end.x = e.touches[1].pageX, at[1].end.y = e.touches[1].pageY, J = k(at[0].end, at[1].end), $ = L(at[0].end, at[1].end)), K = A(B, J)), nt !== n.fingers && n.fingers !== d && S) tt = v,
                m(e, tt);
                else if (P(e, G), z = N(at[0].start, at[0].end), Z = D(at[0].start, at[0].end), (n.swipeStatus || n.pinchStatus) && (t = m(e, tt)), !n.triggerOnTouchEnd) {
                    var i = !M();
                    O() === !0 ? (tt = g, t = m(e, tt)) : i && (tt = v, m(e, tt))
                }
                t === !1 && (tt = v, m(e, tt))
            }
        }
        function E(e) {
            if (e = e.originalEvent, e.touches && e.touches.length > 0) return ! 0;
            if (e.preventDefault(), rt = H(), 0 != B && (J = k(at[0].end, at[1].end), K = A(B, J), $ = L(at[0].end, at[1].end)), z = N(at[0].start, at[0].end), G = R(at[0].start, at[0].end), Z = D(), n.triggerOnTouchEnd || n.triggerOnTouchEnd === !1 && tt === w) {
                tt = g;
                var t = Y() || !X(),
                a = nt === n.fingers || n.fingers === d || !S,
                i = 0 !== at[0].end.x,
                r = a && i && t;
                if (r) {
                    var l = M(),
                    u = O();
                    u !== !0 && null !== u || !l ? l && u !== !1 || (tt = v, m(e, tt)) : m(e, tt)
                } else tt = v,
                m(e, tt)
            } else tt === w && (tt = v, m(e, tt));
            et.unbind(F, x, !1),
            et.unbind(V, E, !1),
            j(!1)
        }
        function T() {
            nt = 0,
            rt = 0,
            it = 0,
            B = 0,
            J = 0,
            K = 1,
            j(!1)
        }
        function m(e, t) {
            var o = void 0;
            if (n.swipeStatus && (o = n.swipeStatus.call(et, e, t, G || null, z || 0, Z || 0, nt)), n.pinchStatus && Y() && (o = n.pinchStatus.call(et, e, t, $ || null, J || 0, Z || 0, nt, K)), t === v && (!n.click || 1 !== nt && S || !isNaN(z) && 0 !== z || (o = n.click.call(et, e, e.target))), t == g) {
                switch (n.swipe && (o = n.swipe.call(et, e, G, z, Z, nt)), G) {
                case a:
                    n.swipeLeft && (o = n.swipeLeft.call(et, e, G, z, Z, nt));
                    break;
                case i:
                    n.swipeRight && (o = n.swipeRight.call(et, e, G, z, Z, nt));
                    break;
                case r:
                    n.swipeUp && (o = n.swipeUp.call(et, e, G, z, Z, nt));
                    break;
                case l:
                    n.swipeDown && (o = n.swipeDown.call(et, e, G, z, Z, nt))
                }
                switch ($) {
                case u:
                    n.pinchIn && (o = n.pinchIn.call(et, e, $ || null, J || 0, Z || 0, nt, K));
                    break;
                case s:
                    n.pinchOut && (o = n.pinchOut.call(et, e, $ || null, J || 0, Z || 0, nt, K))
                }
            }
            return (t === v || t === g) && T(e),
            o
        }
        function O() {
            return null !== n.threshold ? z >= n.threshold: null
        }
        function M() {
            var e;
            return e = n.maxTimeThreshold && Z >= n.maxTimeThreshold ? !1 : !0
        }
        function P(e, t) {
            if (n.allowPageScroll === o || X()) e.preventDefault();
            else {
                var u = n.allowPageScroll === c;
                switch (t) {
                case a:
                    (n.swipeLeft && u || !u && n.allowPageScroll != p) && e.preventDefault();
                    break;
                case i:
                    (n.swipeRight && u || !u && n.allowPageScroll != p) && e.preventDefault();
                    break;
                case r:
                    (n.swipeUp && u || !u && n.allowPageScroll != h) && e.preventDefault();
                    break;
                case l:
                    (n.swipeDown && u || !u && n.allowPageScroll != h) && e.preventDefault()
                }
            }
        }
        function D() {
            return rt - it
        }
        function k(e, t) {
            var n = Math.abs(e.x - t.x),
            a = Math.abs(e.y - t.y);
            return Math.round(Math.sqrt(n * n + a * a))
        }
        function A(e, t) {
            var n = t / e * 1;
            return n.toFixed(2)
        }
        function L() {
            return 1 > K ? s: u
        }
        function N(e, t) {
            return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
        }
        function I(e, t) {
            var n = e.x - t.x,
            a = t.y - e.y,
            i = Math.atan2(a, n),
            r = Math.round(180 * i / Math.PI);
            return 0 > r && (r = 360 - Math.abs(r)),
            r
        }
        function R(e, t) {
            var n = I(e, t);
            return 45 >= n && n >= 0 ? a: 360 >= n && n >= 315 ? a: n >= 135 && 225 >= n ? i: n > 45 && 135 > n ? l: r
        }
        function H() {
            var e = new Date;
            return e.getTime()
        }
        function U() {
            et.unbind(q, y),
            et.unbind(W, T),
            et.unbind(F, x),
            et.unbind(V, E),
            j(!1)
        }
        function X() {
            return n.pinchStatus || n.pinchIn || n.pinchOut
        }
        function Y() {
            return $ && X()
        }
        function _() {
            return et.data(b + "_intouch") === !0 ? !0 : !1
        }
        function j(e) {
            e = e === !0 ? !0 : !1,
            et.data(b + "_intouch", e)
        }
        function C() {
            for (var e = [], t = 0; 5 >= t; t++) e.push({
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                },
                delta: {
                    x: 0,
                    y: 0
                }
            });
            return e
        }
        var Q = S || !n.fallbackToMouseEvents,
        q = Q ? "touchstart": "mousedown",
        F = Q ? "touchmove": "mousemove",
        V = Q ? "touchend": "mouseup",
        W = "touchcancel",
        z = 0,
        G = null,
        Z = 0,
        B = 0,
        J = 0,
        K = 1,
        $ = 0,
        et = e(t),
        tt = "start",
        nt = 0,
        at = null,
        it = 0,
        rt = 0;
        try {
            et.bind(q, y),
            et.bind(W, T)
        } catch(lt) {
            e.error("events not supported " + q + "," + W + " on jQuery.swipe")
        }
        this.enable = function() {
            return et.bind(q, y),
            et.bind(W, T),
            et
        },
        this.disable = function() {
            return U(),
            et
        },
        this.destroy = function() {
            return U(),
            et.data(b, null),
            et
        }
    }
    var a = "left",
    i = "right",
    r = "up",
    l = "down",
    u = "in",
    s = "out",
    o = "none",
    c = "auto",
    p = "horizontal",
    h = "vertical",
    d = "all",
    f = "start",
    w = "move",
    g = "end",
    v = "cancel",
    S = "ontouchstart" in window,
    b = "TouchSwipe",
    y = {
        fingers: 1,
        threshold: 75,
        maxTimeThreshold: null,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        triggerOnTouchEnd: !0,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: "button, input, select, textarea, a, .noSwipe"
    };
    e.fn.swipe = function(n) {
        var a = e(this),
        i = a.data(b);
        if (i && "string" == typeof n) {
            if (i[n]) return i[n].apply(this, Array.prototype.slice.call(arguments, 1));
            e.error("Method " + n + " does not exist on jQuery.swipe")
        } else if (! (i || "object" != typeof n && n)) return t.apply(this, arguments);
        return a
    },
    e.fn.swipe.defaults = y,
    e.fn.swipe.phases = {
        PHASE_START: f,
        PHASE_MOVE: w,
        PHASE_END: g,
        PHASE_CANCEL: v
    },
    e.fn.swipe.directions = {
        LEFT: a,
        RIGHT: i,
        UP: r,
        DOWN: l,
        IN: u,
        OUT: s
    },
    e.fn.swipe.pageScroll = {
        NONE: o,
        HORIZONTAL: p,
        VERTICAL: h,
        AUTO: c
    },
    e.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: d
    }
} (jQuery);
$(function() {
    $('.services').hover(function() {
        $('.services').stop().animate({
            right: '0px'
        },
        200)
    },
    function() {
        $('.services').stop().animate({
            right: '-150px'
        },
        200)
    })
});
document.addEventListener('visibilitychange',function() {
    document.title = document.hidden ? '小婊砸还不回来！': '舍得回来啦？'
});