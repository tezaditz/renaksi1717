<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Validator,Redirect,Response;
Use App\User;
use Auth;
use Illuminate\Support\Facades\Hash;
use Session;
use DB;

class AuthController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }  
 
    public function register()
    {
        return view('register');
    }
     
    public function postLogin(Request $request)
    {

        $validator = Validator::make($request->all(), [
            // 'email' => 'required|email|exists:'.config('crudbooster.USER_TABLE'),
            'name'=> 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $message = $validator->errors()->all();

            return redirect()->back()->with(['message' => implode(', ', $message), 'message_type' => 'danger']);
        }

        $name = $request->input("name");
        $password = $request->input("password");
        // $year = Request::input("year");
        // $users = DB::table(config('crudbooster.USER_TABLE'))->where("email", $email)->first();
        $users = DB::table('users')->where("name", $name)->first();

        $credentials = $request->only('name', 'password');
        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return redirect()->intended('/');
        }

        // if (\Hash::check($password, $users->password)) {
                       

        //     // return redirect('/');
        //     return 'OK';
        // } else {
        //     // return redirect()->route('getLogin')->with('message', trans('crudbooster.alert_password_wrong'));
        //     return 'NOT OK';
        // }
    }
 
    public function postRegister(Request $request)
    {  
        request()->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
        ]);
         
        $data = $request->all();
 
        $check = $this->create($data);
       
        return Redirect::to("dashboard")->withSuccess('Great! You have Successfully loggedin');
    }
     
    public function dashboard()
    {
 
      if(Auth::check()){
        return view('dashboard');
      }
       return Redirect::to("login")->withSuccess('Opps! You do not have access');
    }
 
    public function create(array $data)
    {
      return User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password'])
      ]);
    }
     
    public function logout() {
        Session::flush();
        Auth::logout();
        return Redirect('/');
    }
}
?>