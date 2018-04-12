<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\User;
use App\Models\Result;
use App\Models\Procurement;
use App\Models\Position;
use App\Models\Region;
use Auth;
use DB;

class UsersController extends Controller
{
    public function __construct()
    {
        if(!Auth::check()){
            return response()->json(false);
        }
    }
    
    public function one($id)
    {
    	$user = User::with('positions', 'regions', 'roles')->find($id);
        return response()->json($user);
    }

    public function list() {
        $users = User::all();
        return response()->json($users);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'lastname' => 'required',
            'email' => 'required',            
            'regions_id' => 'required',
            'positions_id' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()]);
        }
        else{
            $data = $request->json()->all();
            User::find($data['id'])->update($data);            
            return response()->json($data);
        }
    }


    public function positions() {
        $positions = Position::all();
        return response()->json($positions);
    }

    public function regions() {
        $regions = Region::all();
        return response()->json($regions);
    }

    public function usersResultList () {        
        $users = User::with('positions', 'regions')->get();

        $countProc = DB::select('
            SELECT ifnull(procurements.count, 0) as count
            from users
            left join (
                select procurements.users_id, count(procurements.users_id) as count
                from procurements
            group by procurements.users_id
            ) procurements ON users.id = procurements.users_id
        ');

        $countDoneProc = DB::select('
            SELECT ifnull(procurements.count, 0) as count
            from users
            left join (
                select procurements.users_id, count(procurements.users_id) as count
                from procurements
                where (statuses_id = 2)
            group by procurements.users_id
            ) procurements ON users.id = procurements.users_id
        ');        
        

        $countWinProc = DB::select('
            SELECT ifnull(results.count, 0) as count
            from users
            left join (
                select results.users_id, count(results.users_id) as count
                from results
                where (status_winners_id = 1)
                group by results.users_id 
            ) results ON users.id = results.users_id
        ');

        $sumWinProc = DB::select('
            SELECT ifnull(results.sum, 0) as sum
            from users
            left join (
                select results.users_id, sum(results.amount) as sum
                from results
            group by results.users_id
            ) results ON users.id = results.users_id
        ');

        $statUser = DB::select('
            SELECT u.name, proc.amount, res.result
            FROM users u
                LEFT JOIN (
                SELECT users_id,
                SUM(amount) as amount
                FROM PRocurements as proc
            GROUP BY users_id
            ) proc ON u.id = proc.users_id
            LEFT JOIN (
                SELECT users_id,
                SUM(amount) as result
                FROM results as res
                WHERE (res.status_winners_id = 1)
            GROUP BY users_id
            ) res ON u.id = res.users_id
        ');      

        return response()->json([
            'users' => $users,
            'countProc' => $countProc,
            'countDoneProc' => $countDoneProc,
            'countWinProc' => $countWinProc,
            'sumWinProc' => $sumWinProc,
            'statUser' => $statUser
        ]);
    }
}
