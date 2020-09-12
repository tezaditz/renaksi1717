@extends('layouts.app')

@section('content')
@foreach($forum as $frm)
<div class="panel panel-default">
    <div class="panel-body">
        <div class="panel-title">
            <h4><strong>{{ $frm->judul }}</strong></h4>
        </div>
        <p><small>posted by nama , 1 year ago</small></p>
        <hr>
        <div class="panel-body">
            {{ $frm->konten }}
            <hr>
            <ul class="list-group">
            @foreach($komentar as $komen)
                <li class="list-group-item">
                    {{ $komen->judul }}
                </li>
            @endforeach
            </ul>
        </div>
    </div>
</div>
@endforeach
@endsection