let tn = document.getElementById("trainNumber"),
	sn = document.getElementById("sectionNumber"),
	tt = document.getElementById("trainType"),
	sc = document.getElementById("sectionsCount"),
	dc = document.getElementById("displayCount"),
	gt = document.getElementById("timeToGoaActivation"),
	bc = document.getElementById("brsCount"),
	t = document.getElementById("time");

function UpdateSetting() {
	setTimeout(() =>
		fetch("/api/getSettings.api")
		.then((e) => e.json())
		.then((e) => {
			tn.value = e.trainN;
			tt.value = e.trainType;
			sn.value = e.SectionN;
			sc.value = e.CountOfSection;
			dc.value = e.CountOfTC;
			gt.value = e.ActivationTime;
			bc.value = e.CountOfBRS;
			t.value = new Date(e.time * 1000).toISOString().substring(0, 16);
		}), 300
	);
}
fetch("/api/getSettings.api")
	.then((e) => e.json())
	.then((e) => {
		tn.value = e.trainN;
		tt.value = e.trainType;
		sn.value = e.SectionN;
		sc.value = e.CountOfSection;
		dc.value = e.CountOfTC;
		gt.value = e.ActivationTime;
		bc.value = e.CountOfBRS;
		t.value = new Date(e.time * 1000).toISOString().substring(0, 16);

		(tn.onchange = () => {
			fetch("/api/setValues.api?id=settings.train.number&value=" + tn.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		}),
		(sn.onchange = () => {
			if(sn.value > 4)
			{
				sn.value = 4;
			}
			if(sn.value < 1)
			{
				sn.value = 1;
			}
			if(sn.value > sc.value)
			{
				sn.value = sc.value;
			}
			fetch("/api/setValues.api?id=settings.section.number&value=" + sn.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		});
		(tt.onchange = () => {
			console.log("tt.value: ",tt.value)
			if(tt.value == 2)
			{
				sc.value = 4;
			}
			if(tt.value == 3)
			{
				sc.value = 3;
			}
			if(sn.value > sc.value)
			{
				sn.value = sc.value;
				fetch("/api/setValues.api?id=settings.section.number&value=" + sn.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			}
			fetch("/api/setValues.api?id=settings.train.type&value=" + tt.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			fetch("/api/setValues.api?id=settings.section.count&value=" + sc.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		});
		(sc.onchange = () => {
			if(sc.value > 4)
			{
				sc.value = 4;
			}
			if(sc.value < 1)
			{
				sc.value = 1;
			}
			if(tt.value == 2)
			{
				sc.value = 4;
			}
			if(tt.value == 3)
			{
				sc.value = 3;
			}
			fetch("/api/setValues.api?id=settings.train.type&value=" + tt.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			fetch("/api/setValues.api?id=settings.section.count&value=" + sc.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		});
		(dc.onchange = () => {
			fetch("/api/setValues.api?id=settings.display.count&value=" + dc.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		});

		(gt.onchange = () => {
			fetch("/api/setValues.api?id=settings.goa.acttime&value=" + gt.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		});
		(bc.onchange = () => {
			fetch("/api/setValues.api?id=settings.brs.count&value=" + bc.value)
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		});

		(t.onchange = () => {
			//console.log(t.value);
			//console.log(Math.floor(t.getTime() / 1000));
			console.log(t.valueAsNumber);
			fetch("/api/setValues.api?id=settings.dt&value=" + Math.floor(t.valueAsNumber / 1000))
				.then((e) => e.json())
				.then((e) => {
					console.log(e);
				});
			UpdateSetting();
		});
});


/*
t.onchange = function() {myFunction()};

function myFunction() {
  var x = document.getElementById("fname");
  x.value = x.value.toUpperCase();
}
*/

/*
	(t.onclick = () => {
	(e.style.display = "block"), (n.style.display = "block");
}),
	(n.onclick = () => {
		(e.style.display = "none"), (n.style.display = "none");
	}),
	[...document.getElementsByTagName("a")].forEach((e) => {
		e.onclick = (t) => {
			(document.getElementsByTagName("iframe")[0].src = e.href),
				t.preventDefault();
		};
	});
*/