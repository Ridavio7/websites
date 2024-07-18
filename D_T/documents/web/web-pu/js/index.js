let e = document.getElementById("sideNavigation"),
	t = document.getElementById("sideNavigationOpener"),
	n = document.getElementById("blackBackground");
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
