<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {
            $table->increments('id');
            $table->string('results');
            $table->float('amount', 15, 2);
            $table->timestamps();

            $table->unsignedInteger('procurements_id')->unique();
            $table->unsignedInteger('users_id');
            $table->unsignedInteger('status_winners_id');
            $table->unsignedInteger('participants_id');
            
            $table->foreign('procurements_id')->references('id')->on('procurements')->onDelete('cascade');
            $table->foreign('users_id')->references('id')->on('users');
            $table->foreign('status_winners_id')->references('id')->on('status_winners');
            $table->foreign('participants_id')->references('id')->on('participants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('results');
    }
}
