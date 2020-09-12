<div class="panel panel-default">
    <div class="panel-heading">
        <h3> 
            &nbsp; 
            <i class="fa fa-pencil-square-o"></i> Input Pelaporan
        </h3>
    </div>
    <div class="panel-body" style="padding:20px 0px 0px 0px">
                <?php
                $action = (@$row) ? CRUDBooster::mainpath("edit-save/$row->id") : CRUDBooster::mainpath("add-save");
                $return_url = ($return_url) ?: g('return_url');
                ?>
<form class='form-horizontal' method='post' id="form" enctype="multipart/form-data" action='{{ $action }}'>
<input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type='hidden' name='return_url' value='{{ @$return_url }}'/>
                    <input type='hidden' name='ref_mainpath' value='{{ CRUDBooster::mainpath() }}'/>
                    <input type='hidden' name='ref_parameter' value='{{urldecode(http_build_query(@$_GET))}}'/>
                                        <div class="box-body" id="parent-form-area">

    <div class='form-group form-datepicker header-group-0 ' id='form-group-tanggal'
     style="">
    <label class='control-label col-sm-2'>Tanggal
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

    <div class="col-sm-10">
        <div class="input-group">
            <span class="input-group-addon open-datetimepicker"><a><i class='fa fa-calendar '></i></a></span>
            <input type='hidden' title="pelaporan_id" readonly
                   required    class='' name="pelaporan_id" id="pelaporan_id"
                   value='{{ $pelaporanid }}'/>
            <input type='text' title="Tanggal" readonly
                   required    class='form-control notfocus input_date' name="tanggal" id="tanggal"
                   value='{{ $tanggal_isi}}'/>
        </div>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>
    <div class='form-group header-group-0 ' id='form-group-permasalahan_sebelumnya' style="">
    <label class='control-label col-sm-2'>Permasalahan Sebelumnya
                    <span class='text-danger' title='This field is required'>*</span>
            </label>
    <div class="col-sm-10">
        <textarea name="permasalahan_sebelumnya" id="permasalahan_sebelumnya"
                  required    maxlength=5000 class='form-control'
                  rows='5' disabled = {{ $valuedisable }}></textarea>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>    <div class='form-group header-group-0 ' id='form-group-rekomendasi' style="">
    <label class='control-label col-sm-2'>Rekomendasi / Penyelesaian / Hasil Diskusi
                    <span class='text-danger' title='This field is required'>*</span>
            </label>
    <div class="col-sm-10">
        <textarea name="rekomendasi" id="rekomendasi"
                  required    maxlength=5000 class='form-control' disabled = {{ $valuedisable }}
                  rows='5'></textarea>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>    <div class='form-group header-group-0 ' id='form-group-capaian' style="">
    <label class='control-label col-sm-2'>Capaian
                    <span class='text-danger' title='This field is required'>*</span>
            </label>
    <div class="col-sm-10">
        <textarea name="capaian" id="capaian"
                  required    maxlength=5000 class='form-control'
                  rows='5'></textarea>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>    <div class='form-group header-group-0 ' id='form-group-masalah' style="">
    <label class='control-label col-sm-2'>Masalah
                    <span class='text-danger' title='This field is required'>*</span>
            </label>
    <div class="col-sm-10">
        <textarea name="masalah" id="masalah"
                  required    maxlength=5000 class='form-control'
                  rows='5'></textarea>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>    <div class='form-group header-group-0 ' id='form-group-rencana_tindaklanjut' style="">
    <label class='control-label col-sm-2'>Rencana Tindaklanjut
                    <span class='text-danger' title='This field is required'>*</span>
            </label>
    <div class="col-sm-10">
        <textarea name="rencana_tindaklanjut" id="rencana_tindaklanjut"
                  required    maxlength=5000 class='form-control'
                  rows='5'></textarea>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>                                        </div><!-- /.box-body -->

                    <div class="box-footer" style="background: #F5F5F5">

                        <div class="form-group">
                            <label class="control-label col-sm-2"></label>
                            <div class="col-sm-10">
                                                                
                                    
                                                                            <input type="submit" name="submit" value='Save' class='btn btn-success'>
                                    
                                                            </div>
                        </div>


                    </div><!-- /.box-footer-->

                </form>
    </div>
</div>
