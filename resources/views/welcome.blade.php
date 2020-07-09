@extends('layouts.app')

@section('content')
{{CRUDBooster::sidebarMenu()}}
@include('posts.list')

@endsection