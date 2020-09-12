@extends('layouts.app')

@section('content')
@foreach($forum as $frm)
<div class="panel panel-default">
    <div class="panel-body">
        <div class="panel-title">
        <a href="{{ route('forum.view' , $frm->id ) }}">
        <h4><strong>{{ $frm->judul }}</strong></h4>
        </a>
           
        </div>
        <p><small>posted by Admin, {{ \Carbon\Carbon::parse($frm->created_at)->diffForHumans() }}</small></p>
    </div>
</div>
@endforeach
@endsection