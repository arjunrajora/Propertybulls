var a = 0;
$(window).scroll(function() {
	var t = $("#counter").offset().top - window.innerHeight;
	0 == a && $(window).scrollTop() > t && ($(".counter-value").each(function() {
		var t = $(this),
			o = t.attr("data-count");
		$({
			countNum: t.text()
		}).animate({
			countNum: o
		}, {
			duration: 2e3,
			easing: "swing",
			step: function() {
				t.text(Math.floor(this.countNum))
			},
			complete: function() {
				t.text(this.countNum)
			}
		})
	}), a = 1)
}), $(".our_verticlowl").owlCarousel({
	loop: !0,
	margin: 10,
	dots: !1,
	autoplay: !0,
	nav: !1,
	responsiveClass: !0,
	responsive: {
		0: {
			items: 1,
			nav: !1
		},
		643: {
			items: 1,
			nav: !1
		},
		767: {
			items: 1.6,
			nav: !1
		},
		1000: {
			items: 1.6,
			nav: !1,
			loop: !0
		}
	}
}), wow = new WOW({
	animateClass: "animated",
	offset: 100,

}), wow.init()