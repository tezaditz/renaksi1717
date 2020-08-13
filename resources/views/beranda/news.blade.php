<div class="panel panel-default">
    <div class="panel-heading">
        <h4>BERITA TERBARU</h4>
    </div>
    <div class="panel-body">
    @if(Count($data['berita']) != 0)
        @foreach($data['berita'] as $berita)
            <div class="panel panel-default">
                <div class="panel-heading">
                   <h4>
                    <strong>{{ $berita->title }}</strong>
                   </h4> 
                   <h6>                    
                        <small>
                            <p class="text-muted">{{ $berita->created_by }} , {{ date('d-M-Y H:i:s' , strtotime($berita->created_at)) }}</p>
                        </small>
                    </h6>
                </div>
                <div class="panel-body">
                    <?php echo $berita->content ?>
                </div>
            </div>
        @endforeach        
    @endif
        
        
    </div>
</div>
