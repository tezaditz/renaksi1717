

<table class="table table-bordered">
    <thead>
        <tr class="active">
            <th>Nama Perusahaan</th>
            <th>Nama Zat Aktif</th>
            <th>Tanggal Pelaporan</th>
            <th>Status Pelaporan</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    @if($pelaporan)
        @foreach($pelaporan as $data)
        <tr>
            <td>{{ $data->NmPerusahaan }}</td>
            <td>{{ $data->NmZatAktif }}</td>
            <td>{{ $data->tanggal }}</td>
            <td>{{ $data->Status }}</td>
            <td>
                @if($data->idStatus == 80)
                <a href="{{ route('pelaporan.evaluasi' , $data->Id) }}" class="btn btn-xs btn-info" title="Lihat Pelaporan"><i class="fa fa-eye"></i> </a>
                @endif
            </td>
        </tr>
        @endforeach
    @endif
    </tbody>
</table>