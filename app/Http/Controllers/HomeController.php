<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Auth;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data['menu']  = DB::table('menu_items')
        ->Join('menus' , 'menus.id' , 'menu_items.menu_id')
        ->where('menus.name' , 'guest')
        ->whereNull('menu_items.parent_id')
        ->select('menu_items.id as id' , 'menu_items.url as url' , 'menu_items.title as title')
        ->get();
        $data['menuChild']  = DB::table('menu_items')
                ->Join('menus' , 'menus.id' , 'menu_items.menu_id')
                ->where('menus.name' , 'guest')
                ->whereNotNull('menu_items.parent_id')
                ->select('menu_items.id as id' , 'menu_items.url as url' , 'menu_items.title as title' , 'menu_items.parent_id as parent_id')
                ->get();

        $data['posts'] = DB::table('posts')->where('status' , 'PUBLISHED')->OrderBy('created_at' , 'desc')->get();


        return view('welcome' , compact('data'));
    }

    public function homepage(){

        
        $data['menu']  = DB::table('menu_items')
                           ->Join('menus' , 'menus.id' , 'menu_items.menu_id')
                           ->where('menus.name' , 'guest')
                           ->whereNull('menu_items.parent_id')
                           ->select('menu_items.id as id' , 'menu_items.url as url' , 'menu_items.title as title')
                           ->get();
        $data['menuChild']  = DB::table('menu_items')
                           ->Join('menus' , 'menus.id' , 'menu_items.menu_id')
                           ->where('menus.name' , 'guest')
                           ->whereNotNull('menu_items.parent_id')
                           ->select('menu_items.id as id' , 'menu_items.url as url' , 'menu_items.title as title' , 'menu_items.parent_id as parent_id')
                           ->get();
        
        $data['posts'] = DB::table('posts')->where('status' , 'PUBLISHED')->OrderBy('created_at' , 'desc')->get();
        
 
        return view('welcome' , compact('data'));
    }
}
