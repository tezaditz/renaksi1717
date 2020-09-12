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
                <tr>
                <td></td>
                <td></td>
                    <td>
                    <button type="button" class="btn btn-success btn-xs"  data-toggle="modal" data-target="#myModal">Lihat Laporan</button>
                    </td>
                </tr>
            </tbody>
       </table>        
    </div>

</div>




