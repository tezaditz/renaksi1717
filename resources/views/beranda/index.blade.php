@extends('layouts.app')

@section('content')

    

<div class="row content">
    <div class="col-sm-12">
       @include('beranda.box_info')
    </div>
    <div class="col-sm-12">
       @include('beranda.map')
    </div>
</div>
<div class="row content">
    <div class="col-sm-9">
        @include('beranda.news')
    </div>
    <div class="col-sm-3">
    @include('beranda.pengumuman')
    </div>
</div>
@endsection