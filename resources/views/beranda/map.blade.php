<div class="panel panel-default">
    <div class="panel-heading">
        <h4>
            <i class="fa fa-map"></i> Persebaran IBBO dan IEBA di Indonesia
        </h4>
    </div>
    <div class="panel-body">
        <div id="container">
        </div>
    </div>
</div>
@push('head')
<script src="{{ asset('js/highmaps.js') }}"></script>
<script src="{{ asset('js/offline-exporting.js') }}"></script>
<script src="{{ asset('js/id-all.js') }}"></script>
<script src="{{ asset('js/map/data.js') }}"></script>
@endpush
@push('bottom')
<script src="{{ asset('/js/map/data.js') }}"></script>
@endpush
