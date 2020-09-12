@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-sm-12">
        @include('beranda.box_info')
        </div>


        <div class="col-md-8">
        @include('beranda.map')
        </div>
    
    </div>

    <div class="row">
        <div class="col-md-12">
        
        </div>
    </div>
@endsection
