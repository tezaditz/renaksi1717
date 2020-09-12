<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', 'DashboardController@getindex');
// Route::get('/bbo', 'DashboardController@getindex');
// Route::get('/bbo/cpn' , 'DashboardController@getindex2')->name('DashboardsControllerGetIndex');
Route::get('/bbo/page/show/{id?}' , 'AdminPageController@showPage')->name('showPage');
Route::get('/bbo/registrasi' , 'AdminCompanyController@getReg')->name('registration');
Route::post('/bbo/registrasi' , 'AdminCompanyController@postReg')->name('PostRegistration');
Route::get('/bbo/forum/{id?}/view' , 'AdminDiskusiController@show')->name('forum.view');
Route::get('/bbo/detail_pelaporan/detail/{id?}' , 'AdminDetailPelaporanController@getDetail')->name('DetailPelaporan');
Route::get('/bbo/getDataMap' , 'DashboardController@getDataMap');

Route::get('/bbo/{idPelaporan}/target_hilirisasi/add' , 'AdminTargetHilirisasiController@getAdd')->name('AddTargetHilirisasi');
Route::get('/bbo/pelaporan/addRoadmapMaster/{id?}' , 'AdminPelaporanController@addMasterRoadmap')->name('AddMasterRoadMap');
Route::post('/bbo/roadmap/save' , 'AdminDetailRoadmap28Controller@simpanRoadmap')->name('simpanRoadmap');

Route::get('/bbo/profile/perusahaan' , 'AdminPageController@getprofileperusahaan')->name('profile.perusahaan');
Route::get('/bbo/pelaporan/approval' , 'AdminPelaporanController@getapproval')->name('pelaporan.approval');
Route::get('/bbo/pelaporan/{id?}/evaluasi' , 'AdminPelaporanController@getevaluasi')->name('pelaporan.evaluasi');
Route::get('/bbo/pelaporan/{id?}/genforum' , 'AdminPelaporanController@genForum')->name('pelaporan.genforum');
Route::get('/bbo/pelaporan/{id?}/getforum' , 'AdminPelaporanController@getforum')->name('pelaporan.forum');
Route::post('/bbo/pelaporan/simpan/chat' , 'AdminPelaporanController@simpanchat')->name('pelaporan.forum.save');
Route::get('/bbo/pelaporan/delete/chat/{id?}' , 'AdminPelaporanController@deletechat')->name('pelaporan.chat.delete');
