<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Khill\Lavacharts\Lavacharts;

class peta extends Model
{
    protected $fillable = ['country' , 'ibbo', 'iot' , 'ieba'];
    protected $table = "peta";


}
