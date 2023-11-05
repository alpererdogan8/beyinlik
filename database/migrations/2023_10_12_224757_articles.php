<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {

        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('category_id');
            $table->foreignId('authors_id');
            $table->string('title');
            $table->string('image');
            $table->longText('content');
            $table->integer('hit')->default(0);
            $table->integer('status')->default(0)->comment('0:pasif-1:aktif');
            $table->string('slug');
            $table->softDeletes();
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('authors_id')->references('id')->on('authors');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
