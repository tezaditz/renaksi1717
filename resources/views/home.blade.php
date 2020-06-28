@extends('layouts.master')

@section('content')
<div class="row">
    @foreach($data['posts'] as $postingan)
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <div class="card-head-row">
                    <div class="card-title">
                        {{ $postingan->title }}
                    </div>
                    
                </div>
            </div>
            <div class="card-body">
                <?php echo $postingan->body ?>
                
            </div>
        </div>
    </div>
    @endforeach
</div>
@endsection
