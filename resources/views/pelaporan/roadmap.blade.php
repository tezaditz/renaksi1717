@push('head')
<link href="{{ asset('css/timeline.css') }}" rel="stylesheet" type="text/css"/>
@endpush
<div class="panel panel-default">
    <div class="panel-heading">
        <h3> 
            &nbsp; 
            <i class="fa fa-road"></i> Roadmap
        </h3>
    </div>
    <div class="panel-body">
        <div style="width:100%;">
            <ul class="timeline timeline-horizontal">
            @if(Count($roadmap) != 0)
            @foreach($roadmap as $dataRoadMap)
                <li class="timeline-item">
                    <div class="timeline-badge primary"><i class="glyphicon glyphicon-check"></i></div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 class="timeline-title">{{ $dataRoadMap->Tahun }} <br>{{ $dataRoadMap->Triwulan }}</h4>
                            <!-- <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p> -->
                        </div>
                        <div class="timeline-body">
                            <p>{{ $dataRoadMap->Ringkasan }}</p>
                        </div>
                    </div>
                </li>
            @endforeach
            @endif
            </ul>
        </div>
    </div>
</div>

    <!-- /.content -->
    <div class="clearfix"></div>