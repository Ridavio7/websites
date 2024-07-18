function updateUdpStatus(t, e, s) {
	[...t.querySelectorAll("span.udp-button")].forEach((t, s) => {
		1 == e[s] ? t.style.backgroundColor = 'blue' : t.style.backgroundColor = 'grey';
	}),
		[...t.querySelectorAll("span.udp-led")].forEach((t, s) => {
			1 == e[s] ? t.style.backgroundColor = 'green' : t.style.backgroundColor = 'grey';;
		});
}
setInterval(() => {
	fetch("api/getValues.api")
		.then((t) => t.json())
		.then((t) => {
			let e = t.UDP,
				s = document.getElementsByTagName("main")[0];
			updateUdpStatus(s.children[0], e[0].buttons, e[0].leds),
				updateUdpStatus(s.children[1], e[1].buttons, e[1].leds);
		});
}, 500);
class Values {
	constructor(t) {
		this.UDP = t;
	}
}
class UdpValues {
	constructor(t, e) {
		(this.buttons = t), (this.leds = e);
	}
}
