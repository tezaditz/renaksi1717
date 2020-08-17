<div class="panel panel-default">
    <div class="panel-heading">
        <h4>PENGUMUMAN</h4>
    </div>
    <div class="panel-body">
    @if(Count($pengumuman) != 0)
        @foreach($pengumuman as $pengumumans)
            <div class="panel panel-default">
                <div class="panel-heading">
                   <h4>
                    <strong>{{ $pengumumans->title }}</strong>
                   </h4> 
                   <h6>                    
                        <small>
                            <p class="text-muted">{{ $pengumumans->created_by }} , {{ date('d-M-Y H:i:s' , strtotime($pengumumans->created_at)) }}</p>
                        </small>
                    </h6>
                </div>
                <div class="panel-body">
                    <?php echo $pengumumans->content ?>
                </div>
            </div>
        @endforeach        
    @endif
        
        
    </div>
</div>
