<div class="panel panel-default">
    <div class="panel-heading">
        <h3> 
            &nbsp; 
            <i class="fa fa-globe"></i> Target Hilirisasi
        </h3>
    </div>
    <div class="panel-body">
    @foreach($target_hilirisasi as $data)
        <div>
            Tahun : <strong>{{ $data->Tahun }}</strong>
        </div>
        <div>
            Bulan : <strong>{{ $data->Bulan }}</strong>
        </div>
    @endforeach
    </div>
</div>
    <!-- /.content -->
    <div class="clearfix"></div>