class t {
	constructor(t, e) {
		(this.headers = t), (this.rows = e);
	}
}
class e {
	constructor(t) {
		this.columns = t;
	}
}
const a = new (class {
	getTableData(e) {
		return fetch("/api/getValues.api")
			.then((t) => t.json())
			.then((e) => {
				let a = Array(),
					r = e.versions;
					a.push(this.createRowFromRawData("ПУ", r.PU)),
					a.push(this.createRowFromRawData("ППК", r.PPK)),
					a.push(this.createRowFromRawData("ИБП", r.UPS));
					let o = r.UDP;
					a.push(this.createRowFromRawData("УДП1", o[0])),
					a.push(this.createRowFromRawData("УДП2", o[1]));
					let n = r.TC;
				return (
					a.push(this.createRowFromRawData("ТС1", n[0])),
					a.push(this.createRowFromRawData("ТС2", n[1])),
					a.push(this.createRowFromRawData("БРС", r.BRS)),
					new t(
						[
							"Устройство",
							"Версия программного обеспечения",
							"Версия аппаратного обеспечения",
						],
						a
					)
				);
			});
	}
	createRowFromRawData(t, a) {
		return new e([t, a[0].toString(), a[1].toString()]);
	}
})();
console.log("Databinder"),
	[...document.querySelectorAll("table[data-bind]")].forEach((t) => {
		console.log(t),
			a.getTableData(t.getAttribute("data-bind")).then((e) => {
				let a = document.createElement("tr");
				e.headers.forEach((t) => {
					let e = document.createElement("th");
					(e.textContent = t), a.appendChild(e);
				}),
					t.appendChild(a),
					e.rows.forEach((e) => {
						let a = document.createElement("tr");
						e.columns.forEach((t) => {
							let e = document.createElement("td");
							(e.textContent = t), a.appendChild(e);
						}),
							t.appendChild(a);
					});
			});
	});

