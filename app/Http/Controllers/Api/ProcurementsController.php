<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Procurement;
use App\Models\Result;
use App\Models\Subject;
use App\Models\Type;
use App\Models\Status;
use App\User;
use Auth; 
use App\Mail\ProcurementSend;
use App\Mail\ProcurementEditSend;
use Carbon\Carbon;
class ProcurementsController extends Controller
{
	public function __construct()
	{
		if(!Auth::check()){
			return response()->json(false);
		}
	}

	public function one($id)
	{
		$procurement = Procurement::with('users', 'subjects', 'statuses')->find($id);
		return response()->json($procurement);
	}

    public function list()
    {
    	$procurements = Procurement::with('users', 'statuses', 'subjects', 'types')->get();
    	$countProcToDay = Procurement::whereDate('auction_period_end', '=', Carbon::toDay())->count();
    	$procListToDay = Procurement::whereDate('auction_period_end', '=', Carbon::toDay())->get();

        $currentMonth = Carbon::now()->formatLocalized('%B %Y');

        $countAllProc = Procurement::all()->count();
        $countWinProc = Result::where('status_winners_id', '1', Carbon::now()->startOfMonth())->count();
        $countFalseProc = Result::where('status_winners_id', '2', Carbon::now()->startOfMonth())->count();
        $sumPerMonth = Result::where('created_at', '>=', Carbon::now()->startOfMonth())->where('status_winners_id', 1)->sum('amount');
        

		return response()->json(
			[
				'procurements' => $procurements,
				'countProcToDay' => $countProcToDay, 
				'procListToDay' => $procListToDay,
                'countAllProc' => $countAllProc,
                'countWinProc' => $countWinProc,
                'countFalseProc' => $countFalseProc,
                'currentMonth' => $currentMonth,
                'sumPerMonth' => $sumPerMonth
			]
		);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'customer' => 'required',
            'offers_period_end' => 'date|required',
            'id_procurement' => 'required|unique:procurements',
            'auction_period_end' => 'date|required',
            'users_id' => 'required',
            'amount' => 'required',
            'subjects_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()]);
        }
        else{
            $data = $request->json()->all();
            Procurement::create($data);
            $user = User::find($data['users_id']);
            \Mail::to($user)->send(new ProcurementSend($data));
            return response()->json([
                'data' => $data,
                'success' => 'Письмо успешно отправлено'
            ]);
        }
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer' => 'required',
            'id_procurement' => 'required',
            'offers_period_end' => 'date|required',            
            'auction_period_end' => 'date|required',
            'amount' => 'required',
            'users_id' => 'required',
            'subjects_id' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()]);
        }
        else{
            $data = $request->json()->all();
            Procurement::find($data['id'])->update($data);  
            /*$user = User::find($data['users_id']);
            \Mail::to($user)->send(new ProcurementEditSend($data)); */         
            return response()->json($data);
        }
    }


    public function delete($id)
    {
        Procurement::find($id)->delete();
    }

    public function subject()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function status()
    {
        $statuses = Status::all();
        return response()->json($statuses);
    }

    public function type()
    {
        $types = Type::all();
        return response()->json($types);
    }
}
