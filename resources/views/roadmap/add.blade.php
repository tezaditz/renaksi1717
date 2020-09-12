@extends('layouts.app')

@section('content')
<div class="panel panel-default">
    <div class="panel-heading">
        <h3> 
            &nbsp; 
            <i class="fa fa-pencil-square-o"></i> Input Roadmap Bahan Baku
        </h3>
    </div>
    <div class="panel-body" style="padding:20px 0px 0px 0px">
                <?php
                $action = (@$row) ? CRUDBooster::mainpath("edit-save/$row->id") : CRUDBooster::mainpath("add-save");
                $return_url = ($return_url) ?: g('return_url');
                ?>
<form class='form-horizontal' method='post' id="form" enctype="multipart/form-data" action='{{ Route("simpanRoadmap" , $idPelaporan) }}'>
<input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type='hidden' name='return_url' value='{{ @$return_url }}'/>
                    <input type='hidden' name='ref_mainpath' value='{{ CRUDBooster::mainpath() }}'/>
                    <input type='hidden' name='ref_parameter' value='{{urldecode(http_build_query(@$_GET))}}'/>
                    <div class="box-body" id="parent-form-area">


    <div class='form-group header-group-0 ' id='form-group-tahun_id' style="">
            <label class='control-label col-sm-2'>Tahun
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

            <div class="col-sm-10">
            <input type='hidden' title="master_roadmap_id" readonly
                   required    class='form-control' name="master_roadmap_id" id="master_roadmap_id"
                   value='{{ $master_roadmap_id }}'/>
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

    <div class='form-group header-group-0 ' id='form-group-triwulan_id' style="">
    <label class='control-label col-sm-2'>Triwulan Id
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

    <div class="col-sm-10">
        <select style='width:100%' class='form-control' id="triwulan_id"   required    name="triwulan_id"  >
            
                    <option value=''>** Please select a Triwulan</option>
                    @foreach($triwulan as $data_tw)
                        <option value='{{ $data_tw->id }}'>{{ $data_tw->uraian }}</option>
                    @endforeach
                    </select>
        <div class="text-danger">
            
        </div><!--end-text-danger-->
        <p class='help-block'></p>

    </div>
</div>
    <div class='form-group header-group-0 ' id='form-group-ringkasan' style="">
    <label class='control-label col-sm-2'>
        Ringkasan
                    <span class='text-danger' title='This field is required'>*</span>
            </label>

    <div class="col-sm-10">
        <input type='text' title="Ringkasan"
               required    maxlength=255 class='form-control'
               name="ringkasan" id="ringkasan" value=''/>

        <div class="text-danger"></div>
        <p class='help-block'></p>

    </div>
</div>    <div class='form-group header-group-0 ' id='form-group-uraian' style="">
    <label class='control-label col-sm-2'>Uraian
                    <span class='text-danger' title='This field is required'>*</span>
            </label>
    <div class="col-sm-10">
        <textarea name="uraian" id="uraian"
                  required    maxlength=5000 class='form-control'
                  rows='5'></textarea>
        <div class="text-danger"></div>
        <p class='help-block'></p>
    </div>
</div>                                            </div><!-- /.box-body -->

                    <div class="box-footer" style="background: #F5F5F5">

                        <div class="form-group">
                            <label class="control-label col-sm-2"></label>
                            <div class="col-sm-10">
                                                                                                            <!-- <a href='http://127.0.0.1:8000/bbo/detail_roadmap?' class='btn btn-default'><i
                                                    class='fa fa-chevron-circle-left'></i> Back</a> -->
                                                                                                    
                                                                            
                                    
                                                                            <input type="submit" name="submit" value='Save' class='btn btn-success'>
                                    
                                                            </div>
                        </div>


                    </div><!-- /.box-footer-->

                </form>
    </div>
</div>

@endsection