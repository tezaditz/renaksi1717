<div class="panel panel-default">
    <div class="panel-heading">
        <h4>PENGUMUMAN</h4>
    </div>
    <div class="panel-body">
    @if(Count($data['pengumuman']) != 0)
        @foreach($data['pengumuman'] as $pengumuman)
            <div class="panel panel-default">
                <div class="panel-heading">
                   <h4>
                    <strong>{{ $pengumuman->title }}</strong>
                   </h4> 
                   <h6>                    
                        <small>
                            <p class="text-muted">{{ $pengumuman->created_by }} , {{ date('d-M-Y H:i:s' , strtotime($pengumuman->created_at)) }}</p>
                        </small>
                    </h6>
                </div>
                <div class="panel-body">
                    <?php echo $pengumuman->content ?>
                </div>
            </div>
        @endforeach        
    @endif
        
        
    </div>
</div>
