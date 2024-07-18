function download(text, name, type)
{
	console.log('download');
	var a = document.getElementById("file");
	var file = new Blob([text], {type: type});
	a.href = URL.createObjectURL(file);
	a.download = name;
}
