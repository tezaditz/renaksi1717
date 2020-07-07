<div class="row">
    <div class="col-md-8">
        <div class="panel panel-default">
            <div class="panel-heading">
                <strong>Berita</strong>
            </div>
            <div class="panel-body">
                @foreach($post as $data)
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            {{ $data->title }}
                        </div>
                        <div class="panel-body">
                            <?php
                                echo $data->body
                            ?>
                        </div>

                    </div>
                @endforeach
            </div>
            <div class="panel-footer">
                {{ $post->links() }}
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="panel panel-default">
            <div class="panel-heading">
                <strong>Pengumuman</strong>
            </div>
            <div class="panel-body">
            
            
            
            
            
            
            </div>
        </div>
    </div>
</div>