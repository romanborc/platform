<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Procurement extends Model
{
    public $timestamps = false;
    protected $fillable = [
    	'customer',
    	'id_procurement',
    	'offers_period_end',
    	'auction_period_end',
    	'amount',
    	'description',
    	'statuses_id',
    	'subjects_id',
    	'types_id',
        'users_id',
        'identifier'
    ];

    protected $dates = [
    	'offers_period_end',
    	'auction_period_end'
    ];

    public function profiles () {
        return $this->belongsTo('App\Models\Profile');
    }

    public function subjects()
    {
        return $this->belongsTo('App\Models\Subject');
    }

    public function statuses()
    {
        return $this->belongsTo('App\Models\Status');
    }

    public function types()
    {
        return $this->belongsTo('App\Models\Type');
    }

    public function users()
    {
        return $this->belongsTo('App\User');
    }


}
