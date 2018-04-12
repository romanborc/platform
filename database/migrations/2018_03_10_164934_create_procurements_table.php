<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcurementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('procurements', function (Blueprint $table) {
            $table->increments('id');
            $table->string('customer', 255);
            $table->string('id_procurement', 25)->unique();
            $table->dateTime('offers_period_end');
            $table->datetime('auction_period_end');
            $table->float('amount', 15, 2);
            $table->string('identifier', 8)->nullable();
            $table->text('description')->nullable();

            $table->unsignedInteger('users_id')->nullable();
            $table->unsignedInteger('statuses_id')->default(1);
            $table->unsignedInteger('subjects_id');
            $table->unsignedInteger('types_id');
            


            $table->foreign('users_id')->references('id')->on('users');
            $table->foreign('subjects_id')->references('id')->on('subjects');
            $table->foreign('statuses_id')->references('id')->on('statuses');
            $table->foreign('types_id')->references('id')->on('types');
            
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('procurements');
    }
}
