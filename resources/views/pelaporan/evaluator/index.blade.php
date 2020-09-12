@extends('layouts.app')

@section('content')
<div class="box box-default">
    <div class="box-header">
    </div>
    <div class="box-body table-responsive no-padding">
        @include('pelaporan.evaluator.table')  
    </div>
</div>
@endsection