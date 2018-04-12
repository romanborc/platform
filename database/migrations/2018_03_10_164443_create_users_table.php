<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 30);
            $table->string('lastname', 30)->nullable();
            $table->string('email', 50)->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->unsignedInteger('roles_id')->default(2);
            $table->unsignedInteger('regions_id')->nullable();
            $table->unsignedInteger('positions_id')->nullable();

            $table->foreign('roles_id')->references('id')->on('roles');
            $table->foreign('regions_id')->references('id')->on('regions');
            $table->foreign('positions_id')->references('id')->on('positions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
