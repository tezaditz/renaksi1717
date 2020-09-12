<div class="panel panel-default">
    <div class="panel-heading">
        <div class="pull-left">
            <h3> 
            &nbsp; 
            <i class="fa fa-pencil-square-o"></i> Diskusi
            </h3>
        </div>
        <!-- <div class="pull-right">
            <h3> 
                <button type="button" class="btn btn-success btn-sm"  data-toggle="modal" data-target="#comments">
                   comment
                </button>
            </h3>

        </div> -->
        <br style="clear:both"/>
    </div>
    <div class="panel-body">
        <!-- chat -->
        <div class="row">
            <div class="col-md-12">
                <div class="box box-default">

                    <!-- /.box-header -->
                    <div class="box-body">
                        <!-- Conversations are loaded here -->
                        <div class="">
                            @if($chat)
                              @foreach($chat as $chats)
                                @if($chats->id_cms_users == CRUDBooster::myId())
                                  <div class="direct-chat-msg right">
                                  <div class="direct-chat-info clearfix">
                                  <span class="direct-chat-name pull-right">{{ $chats->nama }}</span>
                                  <span class="direct-chat-timestamp pull-left">{{ $chats->tgl }}</span>
                                  </div>
                                  <!-- /.direct-chat-info -->
                                  <img class="direct-chat-img" src="{{ asset($chats->foto) }}" alt="message user image">
                                  <!-- /.direct-chat-img -->
                                  <div class="direct-chat-text">
                                  {{ $chats->content }}
                                  <a href="{{ route('pelaporan.chat.delete' , $chats->contentID) }}" class="btn btn-xs pull-right">
                                    <i class="fa fa-close"></i>
                                  </a>
                                  </div>
                                  <!-- /.direct-chat-text -->
                                </div>
                                @else
                                <!-- Message. Default to the left -->
                              <div class="direct-chat-msg">
                                  <div class="direct-chat-info clearfix">
                                  <span class="direct-chat-name pull-left">{{ $chats->nama }}</span>
                                  <span class="direct-chat-timestamp pull-right">{{ $chats->tgl }}</span>
                                  </div>
                                  <!-- /.direct-chat-info -->
                                  <img class="direct-chat-img" src="{{ asset($chats->foto) }}" alt="message user image">
                                  <!-- /.direct-chat-img -->
                                  <div class="direct-chat-text">
                                  {{ $chats->content }}
                                  </div>
                                  <!-- /.direct-chat-text -->
                              </div>
                                @endif
                              @endforeach
                            @endif
                        </div>
                        <!--/.direct-chat-messages-->

                       
                        <!-- /.direct-chat-pane -->
                    </div>
                    <!-- /.box-body -->
                    <div class="box-footer">
                        <form action="{{ route('pelaporan.forum.save') }}" method="post" enctype="multipart/form-data">
                        <div class="input-group">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="forum_id" value="{{ $ID }}">
                            <input type="text" name="message" placeholder="Type Message ..." class="form-control" required>
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-warning btn-flat">Send</button>
                                </span>
                        </div>
                        </form>
                    </div>
                    <!-- /.box-footer-->
                </div>
            </div>
        </div>
        <!-- end chat -->
    </div>
</div>