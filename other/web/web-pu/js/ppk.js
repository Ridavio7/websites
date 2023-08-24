function updateIndicatorValues(e, a) {
	e.forEach((e, t) => {
		switch (a[t]) {
			case 0:
				e.style.backgroundColor = '';
				break;
			case 1:
				e.style.backgroundColor = 'red';
				break;
			case 2:
				e.style.backgroundColor = 'orange';
				break;
			case 3:
				e.style.backgroundColor = 'green';
				break;
			case 4:
				e.style.backgroundColor = 'blue';
				break;
		}
	});
}
setInterval(() => {
	fetch("/api/getValues.api")
		.then((e) => e.json())
		.then((e) => {
			let a = e.PPK;
			updateIndicatorValues(document.querySelectorAll("div.goa span"), a.GOA),
				updateIndicatorValues(
					document.querySelectorAll("div.fire-plume span"),
					a.Fire
				),
				updateIndicatorValues(
					document.querySelectorAll("div.notification span"),
					a.OP
				),
				updateIndicatorValues(
					document.querySelectorAll("div.doors span"),
					a.Doors
				),
				console.log(a.OTO),
				updateIndicatorValues(
					document.querySelectorAll("div.tech-equip span"),
					a.OTO
				);
		});
}, 1e3);
