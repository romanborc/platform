<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $fillable = [
    	'results',
    	'amount',
    	'procurements_id',
    	'users_id',
    	'status_winners_id',
        'participants_id' 	
    ];


    public function users()
    {
        return $this->belongsTo('App\User');
    }

    public function procurements()
    {
        return $this->belongsTo('App\Models\Procurement');
    }

    public function status_winners()
    {
        return $this->belongsTo('App\Models\Status_winner');
    }

    public function participants()
    {
        return $this->belongsTo('App\Models\Participant');
    }
}
