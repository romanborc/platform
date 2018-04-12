<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'lastname', 'email', 'password', 'regions_id', 'positions_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles () {
        return $this->belongsTo('App\Models\Role');
    }

    public function positions () {
        return $this->belongsTo('App\Models\Position');
    }

    public function regions () {
        return $this->belongsTo('App\Models\Region');
    }
}
