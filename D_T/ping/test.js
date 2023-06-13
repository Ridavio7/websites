(function() {
	function toJSONString( form ) {
		var obj = {};
		var elements = form.querySelectorAll( "input" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;

			if( name ) {
				obj[ name ] = value;
			}
		}

		return JSON.stringify( obj );
	}

	document.addEventListener( "DOMContentLoaded", function() {
		var form = document.getElementById( "test1" );
		var output = document.getElementById( "output1" );
		form.addEventListener( "submit", function( e ) {
			e.preventDefault();
			var json = toJSONString( this );
			output.innerHTML = json;

		}, false);

	});

	document.addEventListener( "DOMContentLoaded", function() {
		var form = document.getElementById( "test2" );
		var output = document.getElementById( "output2" );
		form.addEventListener( "submit", function( e ) {
			e.preventDefault();
			var json = toJSONString( this );
			output.innerHTML = json;

		}, false);

	});

	document.addEventListener( "DOMContentLoaded", function() {
		var form = document.getElementById( "test3" );
		var output = document.getElementById( "output3" );
		form.addEventListener( "submit", function( e ) {
			e.preventDefault();
			var json = toJSONString( this );
			output.innerHTML = json;

		}, false);

	});

})();