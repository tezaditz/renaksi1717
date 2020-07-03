<!DOCTYPE html>
<html lang="en">
<!-- Head -->
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>RENAKSI1717</title>
	<meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
	<link rel="icon" href="{{ asset('/img/renaksi1717/favicon.ico') }}" type="image/x-icon"/>

	<!-- Fonts and icons -->
	<script src="{{ asset('/js/plugin/webfont/webfont.min.js') }}"></script>
	<script>
		WebFont.load({
			google: {"families":["Lato:300,400,700,900"]},
			custom: {"families":["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands", "simple-line-icons"], urls: ['{{ asset("/css/fonts.min.css") }}']},
			active: function() {
				sessionStorage.fonts = true;
			}
		});
	</script>

	<!-- CSS Files -->
	<link rel="stylesheet" href="{{ asset('/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('/css/atlantis.css') }}">

	<!-- CSS Just for demo purpose, don't include it in your project -->
	<!-- <link rel="stylesheet" href="{{ asset('/css/demo.css') }}"> -->
</head>
<!-- Head -->
@yield('content')
@include('layouts.plugin')
</html>