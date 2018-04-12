<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Result;
use App\Models\Status_winner;
use App\Models\Participant;
use Auth; 

class ResultsController extends Controller
{
     
	public function __construct()
    {
        if(!Auth::check()){
            return response()->json(false);
        }
    }

    public function one($id)
    {
        $results = Result::with('users', 'procurements', 'status_winners', 'participants')->find($id);
        
        return response()->json($results);
    }

	public function list() {
		$results = Result::with('users.positions', 'users.regions', 'procurements', 'status_winners', 'participants')->get();
    	return response()->json($results);
	}

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'results' => 'required',
            'amount' => 'required',
            'procurements_id' => 'required|unique:results',            
            'status_winners_id' => 'required',
            'users_id' => 'required',
            'participants_id' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()]);
        }
        else{
            $data = $request->json()->all();
            Result::create($data);
            return response()->json($data);
        }
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'results' => 'required',
            'amount' => 'required',
            'procurements_id' => 'required',            
            'status_winners_id' => 'required',
            'users_id' => 'required',
            'participants_id' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()]);
        }
        else{
            $data = $request->json()->all();
            Result::find($data['id'])->update($data);            
            return response()->json($data);
        }
    }

    public function delete($id)
    {
        Result::find($id)->delete();
    }

    public function status_winner()
    {
        $status_winners = Status_winner::all();
        return response()->json($status_winners);
    }

    public function participants()
    {
        $participants = Participant::all();
        return response()->json($participants);
    }
}
