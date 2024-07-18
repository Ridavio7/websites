setInterval(() => {
	fetch("api/getAlarms.api")
		.then((t) => t.json())
		.then((t) => {
			tbl = document.getElementById("alarms");
			tbl.innerHTML = ""
			console.log("API ALARMS READY: ", t.length);
			t.forEach(function (cV, index, arr) {
				let tr = document.createElement("tr");
				let td1 = document.createElement("td");
				let td2 = document.createElement("td");

				td1.appendChild(document.createTextNode(index + 1));
				td2.appendChild(document.createTextNode(cV));

				tr.appendChild(td1);
				tr.appendChild(td2);				

				tbl.appendChild(tr);
				console.log(cV);
			});
		});
}, 200);

