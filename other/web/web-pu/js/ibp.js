setInterval(() => {
	fetch("api/getValues.api")
		.then((t) => t.json())
		.then((t) => {
			let o = t.UPS;
			for (var i in o) {
				console.log(i,":",o[i])
				document.getElementById(i).textContent = Math.round(o[i] * 100) / 100;
			}
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
