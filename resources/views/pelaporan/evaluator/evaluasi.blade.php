@extends('layouts.app')

@section('content')
<div class="panel panel-default">
    <div class="panel-heading">
    <h3> 
            &nbsp; 
            <i class="fa fa-text-o"></i> Data Master
        </h3>
    </div>
    <div class="panel-body">
       <table class="table">
            <tbody>
                <tr>
                    <td>Nama Perusahaan</td>
                    <td>:</td>
                    <td>{{ $NamaPerusahaan }}</td>
                </tr>
                <tr>
                    <td>Nama Zat Aktif</td>
                    <td>:</td>
                    <td>{{ $NamaZatAktif }}</td>
                </tr>
                <tr>
                    <td>Tanggal Pelaporan</td>
                    <td>:</td>
                    <td>{{ $TglPelaporan }}</td>
                </tr>
            </tbody>
       </table>        
    </div>

</div>
<div class="panel panel-default">
    <div class="panel-heading">
        <h3> 
            &nbsp; 
            <i class="fa fa-pencil-square-o"></i> Input Pelaporan
        </h3>
    </div>
    <div class="panel-body" style="padding:20px 0px 0px 0px">
        
        <form class='form-horizontal' method='post' id="form" enctype="multipart/form-data" action='{{ $action }}'>
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="box-body" id="parent-form-area">


            <div class='form-group header-group-0 ' id='form-group-permasalahan_sebelumnya' style="">
                <label class='control-label col-sm-2'>Permasalahan Sebelumnya
                        <span class='text-danger' title='This field is required'>*</span>
                </label>
                <div class="col-sm-10">
                    <textarea name="permasalahan_sebelumnya" id="permasalahan_sebelumnya"
                            required    maxlength=5000 class='form-control'
                            rows='5' disabled = {{ $valuedisable }}>
                    </textarea>
                <div class="text-danger"></div>
                <p class='help-block'></p>
                </div>
            </div>    
            <div class='form-group header-group-0 ' id='form-group-rekomendasi' style="">
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
            </div>    
            <div class='form-group header-group-0 ' id='form-group-capaian' style="">
                <label class='control-label col-sm-2'>Capaian
                                <span class='text-danger' title='This field is required'>*</span>
                        </label>
                <div class="col-sm-10">
                    <textarea name="capaian" id="capaian"
                            required  readonly  maxlength=5000 class='form-control'
                            rows='5'>{{ $capaian }}</textarea>
                    <div class="text-danger"></div>
                    <p class='help-block'></p>
                </div>
            </div>
            <div class='form-group header-group-0 ' id='form-group-masalah' style="">
                <label class='control-label col-sm-2'>Masalah
                            <span class='text-danger' title='This field is required'>*</span>
                    </label>
                <div class="col-sm-10">
                    <textarea name="masalah" id="masalah"
                            required  readonly  maxlength=5000 class='form-control'
                            rows='5'>{{ $masalah }}</textarea>
                    <div class="text-danger"></div>
                    <p class='help-block'></p>
                </div>
            </div>
            <div class='form-group header-group-0 ' id='form-group-rencana_tindaklanjut' style="">
                <label class='control-label col-sm-2'>Rencana Tindaklanjut
                                <span class='text-danger' title='This field is required'>*</span>
                        </label>
                <div class="col-sm-10">
                    <textarea name="rencana_tindaklanjut" id="rencana_tindaklanjut"
                            required  readonly  maxlength=5000 class='form-control'
                            rows='5'>{{ $rencana_tindaklanjut }}</textarea>
                    <div class="text-danger"></div>
                    <p class='help-block'></p>
                </div>                                        
            </div>

            <div class="box-footer" style="background: #F5F5F5">

                <div class="form-group">
                    <label class="control-label col-sm-2"></label>
                    <div class="col-sm-10">
                        <a href="#" class="btn btn-md btn-success" id="btnForum">
                            <i class="fa fa-comments"></i>
                            Forum Diskusi
                        </a>
                            
                                                    </div>
                </div>


            </div>

        </form>
    </div>
</div>

@endsection
@push('bottom')
<script>
    $('#btnForum').on('click' , function(){
        swal({   
				title: "Membuka Forum Diskusi ?",
				showCancelButton: true, 
				confirmButtonText: "Ya",  
				cancelButtonText: "Tidak"}, function(){
                    window.open(
                        '{{ route("pelaporan.genforum" , $ID) }}' , "_self"
                    );
                });
    });
</script>
@endpush