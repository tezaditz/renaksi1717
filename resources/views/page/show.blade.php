@extends('layouts.app')

@section('content')
<div class="panel panel-defaul">
    <div class="panel-body">
    <?php 
    echo $page->content;
    ?>
    </div>
</div>
@endsection