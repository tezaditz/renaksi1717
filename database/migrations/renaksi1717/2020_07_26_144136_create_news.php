<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->string("uuid");
            $table->string("title");
            $table->longText("content");
            $table->boolean("is_active")->default(1);
            $table->foreignId('category_id')->constrained("category")->onDelete('cascade');
            $table->timestamps();

            $table->primary("uuid");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
}
