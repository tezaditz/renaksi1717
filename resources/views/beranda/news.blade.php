<div class="panel panel-default">
    <div class="panel-heading">
        <h4>BERITA TERBARU</h4>
    </div>
    <div class="panel-body">

    @if(Count($berita) != 0)
        @foreach($berita as $beritas)
            <div class="panel panel-default">
                <div class="panel-heading">
                   <h4>
                    <strong>{{ $beritas->title }}</strong>
                   </h4> 
                   <h6>                    
                        <small>
                            <p class="text-muted">{{ $beritas->created_by }} , {{ date('d-M-Y H:i:s' , strtotime($beritas->created_at)) }}</p>
                        </small>
                    </h6>
                </div>
                <div class="panel-body">
                    <?php echo $beritas->content ?>
                </div>
            </div>
        @endforeach        
    @endif
        
        
    </div>
</div>
