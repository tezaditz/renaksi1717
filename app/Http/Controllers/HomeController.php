<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['berita'] = DB::table('posts')->where('category_id' , 4)
                                            ->where('show_in_dashboard' , 'Yes')
                                            ->orderby('created_at' , 'desc')
                                            ->get();

        $data['pengumuman'] = DB::table('posts')->where('category_id' , 5)
                                            ->where('show_in_dashboard' , 'Yes')
                                            ->orderby('created_at' , 'desc')
                                            ->get();
        
        $data['menu']   = DB::table('menu')
        ->join('cms_menus' , 'menu.cms_menu_id' , 'cms_menus.id')
        ->get();
        $idParent = [];
        foreach ($data['menu'] as $key => $value) {
            $idParent[] = $value->id;
        }

        $data['menu_child'] = DB::table('cms_menus')->wherein('parent_id' , $idParent)->get();
        // return Count($data['berita']);
        return view('welcome' , compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function welcome(){

        $post = DB::table('posts')->where('status' , 'PUBLISHED')->paginate(3);

        return view('welcome' , compact('post'));
    }
}
