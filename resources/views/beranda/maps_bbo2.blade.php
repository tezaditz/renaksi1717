
@push('head')
<link rel="stylesheet" href="{{ asset('css/leaflet.css') }}" />
<script src="{{ asset('js/leaflet.js') }}"></script>
<script type="text/javascript">
var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
});
</script>
@endpush
<div class="panel panel-default">
    <div class="panel-heading">
        <h4>Peta Persebaran IBBO , IEBA , IOT</h4>
    </div>
    <div class="panel-body">
    <div id="Map"></div>

   
    </div>
</div>