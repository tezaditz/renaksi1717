@extends('layouts.app')

@section('content')
<ul class="nav nav-tabs nav-justified">
  <li class="active"><a data-toggle="tab" href="#tab1">Data Umum</a></li>
  <li><a data-toggle="tab" href="#tab2">Input Progress</a></li>
</ul>
<div class="tab-content">
    <div id="tab1" class="tab-pane fade in active">
    <br>
        <div class="row">
            <div class="col-xs-4">
                @include('pelaporan.bahan_baku')
            </div>
            <div class="col-xs-4">
            @include('beranda.perusahaan.data_umum')
            </div>
            <div class="col-xs-4">
            @include('pelaporan.target_hilirisasi')
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 ">
                
            @include('pelaporan.roadmap')
            </div>
        </div>
    </div>
    <div id="tab2" class="tab-pane fade">
      <br>
        <div class="row">
            <div class="col-xs-12">
            @include('pelaporan.form_input')
            </div>
        </div>
    </div>
  </div>


    

@endsection