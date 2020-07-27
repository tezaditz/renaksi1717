<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = "menu";

    protected $fillable = [
        "title",
        "description",
        "url",
        "parent_id",
        "order",
        "article_id",
    ];
}
