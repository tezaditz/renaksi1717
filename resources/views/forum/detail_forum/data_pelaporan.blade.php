<div class="modal fade" id="myModal" role="dialog">
    <!-- modal-dialog modal-lg -->
    <div class="modal-dialog modal-lg">    
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Laporan</h4>
            </div>
            <div class="modal-body">
                <form class='form-horizontal'>
                    <div class="box-body" id="parent-form-area">
                        <div class='form-group header-group-0 ' id='form-group-permasalahan_sebelumnya' style="">
                            <label class='control-label col-sm-2'>Permasalahan Sebelumnya
                                <span class='text-danger' title='This field is required'>*</span>
                            </label>
                            <div class="col-sm-10">
                                <textarea name="permasalahan_sebelumnya" id="permasalahan_sebelumnya" required maxlength=5000 class='form-control' rows='5' disabled = {{ $valuedisable }}></textarea>
                                <div class="text-danger">
                                </div>
                                <p class='help-block'></p>
                            </div>
                        </div>    
                        <div class='form-group header-group-0 ' id='form-group-rekomendasi' style="">
                            <label class='control-label col-sm-2'>Rekomendasi / Penyelesaian / Hasil Diskusi
                                <span class='text-danger' title='This field is required'>*</span>
                            </label>
                            <div class="col-sm-10">
                                <textarea name="rekomendasi" id="rekomendasi" required    maxlength=5000 class='form-control' disabled = {{ $valuedisable }} rows='5'></textarea>
                                <div class="text-danger"></div>
                                <p class='help-block'></p>
                            </div>
                        </div>    
                        <div class='form-group header-group-0 ' id='form-group-capaian' style="">
                            <label class='control-label col-sm-2'>Capaian
                                <span class='text-danger' title='This field is required'>*</span>
                            </label>
                            <div class="col-sm-10">
                                <textarea name="capaian" id="capaian" required  readonly  maxlength=5000 class='form-control' rows='5'>{{ $capaian }}</textarea>
                                <div class="text-danger"></div>
                                <p class='help-block'></p>
                            </div>
                        </div>
                        <div class='form-group header-group-0 ' id='form-group-masalah' style="">
                            <label class='control-label col-sm-2'>Masalah
                                <span class='text-danger' title='This field is required'>*</span>
                            </label>
                            <div class="col-sm-10">
                                <textarea name="masalah" id="masalah" required  readonly  maxlength=5000 class='form-control' rows='5'>{{ $masalah }}</textarea>
                                <div class="text-danger"></div>
                                <p class='help-block'></p>
                            </div>
                        </div>
                        <div class='form-group header-group-0 ' id='form-group-rencana_tindaklanjut' style="">
                            <label class='control-label col-sm-2'>Rencana Tindaklanjut
                                <span class='text-danger' title='This field is required'>*</span>
                            </label>
                            <div class="col-sm-10">
                                <textarea name="rencana_tindaklanjut" id="rencana_tindaklanjut" required  readonly  maxlength=5000 class='form-control' rows='5'>{{ $rencana_tindaklanjut }}</textarea>
                                <div class="text-danger"></div>
                                <p class='help-block'></p>
                            </div>                                        
                        </div>
                    </div>
                </form> 
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
    <!-- end modal-dialog modal-lg -->
  </div>