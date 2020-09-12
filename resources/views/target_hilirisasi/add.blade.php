@extends('layouts.app')

@section('content')
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

<div class='form-group header-group-0 ' id='form-group-zat_aktif_id' style="">
    <label class='control-label col-sm-2'>Zat Aktif
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

    <div class="col-sm-10">
            <input type='hidden' title="zat_aktif_id" readonly
                   required    class='form-control' name="zat_aktif_id" id="zat_aktif_id"
                   value='{{ $zat_aktif_id }}'/>
            <input type='text' title="zat_aktif_nama" readonly
                   required    class='form-control' name="zat_aktif_nama" id="zat_aktif_nama"
                   value='{{ $zat_aktif_nama }}'/>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>

    <!-- <div class='form-group header-group-0 ' id='form-group-perusahaan_id' style="">
    <label class='control-label col-sm-2'>Perusahaan
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

    <div class="col-sm-10">
    <input type='hidden' title="perusahaan_id" readonly
                   required    class='form-control' name="perusahaan_id" id="perusahaan_id"
                   value='{{ $perusahaan_id }}'/>
            <input type='text' title="perusahaan_nama" readonly
                   required    class='form-control' name="perusahaan_nama" id="perusahaan_nama"
                   value='{{ $perusahaan_nama }}'/>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div> -->
<div class='form-group header-group-0 ' id='form-group-tahun_id' style="">
    <label class='control-label col-sm-2'>Tahun
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

    <div class="col-sm-10">
        <select class='form-control' id="tahun_id" data-value='' required    name="tahun_id">
            <option value=''>** Please select a Tahun</option>
            @foreach($tahun as $data_tahun)
                <option value='{{ $data_tahun->id }}'>{{ $data_tahun->thn }}</option>
            @endforeach
            </select>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>
    <div class='form-group header-group-0 ' id='form-group-bulan_id' style="">
    <label class='control-label col-sm-2'>Bulan
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

    <div class="col-sm-9">
        <select class='form-control' id="bulan_id" data-value='' required    name="bulan_id">
            <option value=''>** Please select a Bulan</option>
            @foreach($bulan as $data_bulan)
            <option value='{{ $data_bulan->id }}'>{{ $data_bulan->uraian }}</option>
            @endforeach
            </select>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>
                                            </div><!-- /.box-body -->

                    <div class="box-footer" style="background: #F5F5F5">

                        <div class="form-group">
                            <label class="control-label col-sm-2"></label>
                            <div class="col-sm-10">
                                                                                                            <a href='http://127.0.0.1:8000/bbo/target_hilirisasi' class='btn btn-default'><i
                                                    class='fa fa-chevron-circle-left'></i> Back</a>
                                                                                                    

                                    
                                                                            <input type="submit" name="submit" value='Save' class='btn btn-success'>
                                    
                                                            </div>
                        </div>


                    </div><!-- /.box-footer-->

                </form>
    </div>
</div>

@endsection