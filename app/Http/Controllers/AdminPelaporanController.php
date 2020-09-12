<?php namespace App\Http\Controllers;

	use Session;
	use Request;
	use DB;
	use CRUDBooster;
	use Carbon\carbon;

	class AdminPelaporanController extends \crocodicstudio\crudbooster\controllers\CBController {

	    public function cbInit() {

			# START CONFIGURATION DO NOT REMOVE THIS LINE
			$this->title_field = "id";
			$this->limit = "20";
			$this->orderby = "created_at,asc";
			$this->global_privilege = false;
			$this->button_table_action = true;
			$this->button_bulk_action = true;
			$this->button_action_style = "button_icon";
			$this->button_add = true;
			$this->button_edit = true;
			$this->button_delete = true;
			$this->button_detail = true;
			$this->button_show = true;
			$this->button_filter = true;
			$this->button_import = false;
			$this->button_export = false;
			$this->table = "pelaporan";
			# END CONFIGURATION DO NOT REMOVE THIS LINE

			# START COLUMNS DO NOT REMOVE THIS LINE
			$this->col = [];
			$this->col[] = ["label"=>"Zat Aktif","name"=>"zat_aktif_id","join"=>"zat_aktif,nama"];
			$this->col[] = ["label"=>"Target Flag","name"=>"target_flag",'visible'=>false];
			$this->col[] = ["label"=>"Target Flag","name"=>"roadmap_flag",'visible'=>false];
			$this->col[] = ["label"=>"Zat Aktif","name"=>"zat_aktif_id","join"=>"zat_aktif,nama"];
			# END COLUMNS DO NOT REMOVE THIS LINE

			# START FORM DO NOT REMOVE THIS LINE
			$this->form = [];
			$this->form[] = ['label'=>'Zat Aktif','name'=>'zat_aktif_id','type'=>'select','validation'=>'required|integer|min:0','width'=>'col-sm-10','datatable'=>'zat_aktif,id','datatable_format'=>'nama'];
			# END FORM DO NOT REMOVE THIS LINE

			# OLD START FORM
			//$this->form = [];
			//$this->form[] = ['label'=>'Zat Aktif','name'=>'zat_aktif_id','type'=>'select','validation'=>'required|integer|min:0','width'=>'col-sm-10','datatable'=>'zat_aktif,id','datatable_format'=>'nama'];
			# OLD END FORM

			/* 
	        | ---------------------------------------------------------------------- 
	        | Sub Module
	        | ----------------------------------------------------------------------     
			| @label          = Label of action 
			| @path           = Path of sub module
			| @foreign_key 	  = foreign key of sub table/module
			| @button_color   = Bootstrap Class (primary,success,warning,danger)
			| @button_icon    = Font Awesome Class  
			| @parent_columns = Sparate with comma, e.g : name,created_at
	        | 
	        */
	        $this->sub_module = array();
			$this->sub_module[] = ['label'=>'Pelaporan','path'=>'detail_pelaporan','parent_columns'=>'zat_aktif_nama','foreign_key'=>'pelaporan_id','button_color'=>'success','button_icon'=>'fa fa-bars'];

	        /* 
	        | ---------------------------------------------------------------------- 
	        | Add More Action Button / Menu
	        | ----------------------------------------------------------------------     
	        | @label       = Label of action 
	        | @url         = Target URL, you can use field alias. e.g : [id], [name], [title], etc
	        | @icon        = Font awesome class icon. e.g : fa fa-bars
	        | @color 	   = Default is primary. (primary, warning, succecss, info)     
	        | @showIf 	   = If condition when action show. Use field alias. e.g : [id] == 1
	        | 
	        */
			$this->addaction = array();
			$this->addaction[] = ['label'=>'Target Hilirisasi','url'=>'/bbo/[id]/target_hilirisasi/add','icon'=>'fa fa-globe','color'=>'danger','showIf'=>'[target_flag] == 0'];
			$this->addaction[] = ['label'=>'Roadmap Bahan Baku','url'=>'/bbo/pelaporan/addRoadmapMaster/[id]','icon'=>'fa fa-map','color'=>'warning','showIf'=>'[roadmap_flag] == 0'];
			// $this->addaction[] = ['label'=>'Pelaporan','url'=>'/bbo/detail_pelaporan/detail/[id]','target'=>'_blank','icon'=>'fa fa-check','color'=>'success'];

	        /* 
	        | ---------------------------------------------------------------------- 
	        | Add More Button Selected
	        | ----------------------------------------------------------------------     
	        | @label       = Label of action 
	        | @icon 	   = Icon from fontawesome
	        | @name 	   = Name of button 
	        | Then about the action, you should code at actionButtonSelected method 
	        | 
	        */
	        $this->button_selected = array();

	                
	        /* 
	        | ---------------------------------------------------------------------- 
	        | Add alert message to this module at overheader
	        | ----------------------------------------------------------------------     
	        | @message = Text of message 
	        | @type    = warning,success,danger,info        
	        | 
	        */
	        $this->alert        = array();
	                

	        
	        /* 
	        | ---------------------------------------------------------------------- 
	        | Add more button to header button 
	        | ----------------------------------------------------------------------     
	        | @label = Name of button 
	        | @url   = URL Target
	        | @icon  = Icon from Awesome.
	        | 
	        */
	        $this->index_button = array();



	        /* 
	        | ---------------------------------------------------------------------- 
	        | Customize Table Row Color
	        | ----------------------------------------------------------------------     
	        | @condition = If condition. You may use field alias. E.g : [id] == 1
	        | @color = Default is none. You can use bootstrap success,info,warning,danger,primary.        
	        | 
	        */
	        $this->table_row_color = array();     	          

	        
	        /*
	        | ---------------------------------------------------------------------- 
	        | You may use this bellow array to add statistic at dashboard 
	        | ---------------------------------------------------------------------- 
	        | @label, @count, @icon, @color 
	        |
	        */
	        $this->index_statistic = array();



	        /*
	        | ---------------------------------------------------------------------- 
	        | Add javascript at body 
	        | ---------------------------------------------------------------------- 
	        | javascript code in the variable 
	        | $this->script_js = "function() { ... }";
	        |
	        */
	        $this->script_js = NULL;


            /*
	        | ---------------------------------------------------------------------- 
	        | Include HTML Code before index table 
	        | ---------------------------------------------------------------------- 
	        | html code to display it before index table
	        | $this->pre_index_html = "<p>test</p>";
	        |
	        */
	        $this->pre_index_html = null;
	        
	        
	        
	        /*
	        | ---------------------------------------------------------------------- 
	        | Include HTML Code after index table 
	        | ---------------------------------------------------------------------- 
	        | html code to display it after index table
	        | $this->post_index_html = "<p>test</p>";
	        |
	        */
	        $this->post_index_html = null;
	        
	        
	        
	        /*
	        | ---------------------------------------------------------------------- 
	        | Include Javascript File 
	        | ---------------------------------------------------------------------- 
	        | URL of your javascript each array 
	        | $this->load_js[] = asset("myfile.js");
	        |
	        */
	        $this->load_js = array();
	        
	        
	        
	        /*
	        | ---------------------------------------------------------------------- 
	        | Add css style at body 
	        | ---------------------------------------------------------------------- 
	        | css code in the variable 
	        | $this->style_css = ".style{....}";
	        |
	        */
	        $this->style_css = NULL;
	        
	        
	        
	        /*
	        | ---------------------------------------------------------------------- 
	        | Include css File 
	        | ---------------------------------------------------------------------- 
	        | URL of your css each array 
	        | $this->load_css[] = asset("myfile.css");
	        |
	        */
	        $this->load_css = array();
	        
	        
	    }


	    /*
	    | ---------------------------------------------------------------------- 
	    | Hook for button selected
	    | ---------------------------------------------------------------------- 
	    | @id_selected = the id selected
	    | @button_name = the name of button
	    |
	    */
	    public function actionButtonSelected($id_selected,$button_name) {
	        //Your code here
	            
	    }


	    /*
	    | ---------------------------------------------------------------------- 
	    | Hook for manipulate query of index result 
	    | ---------------------------------------------------------------------- 
	    | @query = current sql query 
	    |
	    */
	    public function hook_query_index(&$query) {
			//Your code here
			$query->where('id_cms_users' , CRUDBooster::myId());

	    }

	    /*
	    | ---------------------------------------------------------------------- 
	    | Hook for manipulate row of index table html 
	    | ---------------------------------------------------------------------- 
	    |
	    */    
	    public function hook_row_index($column_index,&$column_value) {	        
	    	//Your code here
	    }

	    /*
	    | ---------------------------------------------------------------------- 
	    | Hook for manipulate data input before add data is execute
	    | ---------------------------------------------------------------------- 
	    | @arr
	    |
	    */
	    public function hook_before_add(&$postdata) {        
	        //Your code here
			if(CRUDBooster::myPrivilegeId() == 3){
				
				$a = DB::table('zat_aktif')->where('id' , $postdata['zat_aktif_id'])->first();

				$postdata['id_cms_users'] 	= CRUDBooster::myId();
				$postdata['zat_aktif_nama']	= $a->nama;
			}
	    }

	    /* 
	    | ---------------------------------------------------------------------- 
	    | Hook for execute command after add public static function called 
	    | ---------------------------------------------------------------------- 
	    | @id = last insert id
	    | 
	    */
	    public function hook_after_add($id) {        
	        //Your code here

	    }

	    /* 
	    | ---------------------------------------------------------------------- 
	    | Hook for manipulate data input before update data is execute
	    | ---------------------------------------------------------------------- 
	    | @postdata = input post data 
	    | @id       = current id 
	    | 
	    */
	    public function hook_before_edit(&$postdata,$id) {        
	        //Your code here

	    }

	    /* 
	    | ---------------------------------------------------------------------- 
	    | Hook for execute command after edit public static function called
	    | ----------------------------------------------------------------------     
	    | @id       = current id 
	    | 
	    */
	    public function hook_after_edit($id) {
	        //Your code here 

	    }

	    /* 
	    | ---------------------------------------------------------------------- 
	    | Hook for execute command before delete public static function called
	    | ----------------------------------------------------------------------     
	    | @id       = current id 
	    | 
	    */
	    public function hook_before_delete($id) {
	        //Your code here

	    }

	    /* 
	    | ---------------------------------------------------------------------- 
	    | Hook for execute command after delete public static function called
	    | ----------------------------------------------------------------------     
	    | @id       = current id 
	    | 
	    */
	    public function hook_after_delete($id) {
	        //Your code here

		}
		
		public function addMasterRoadmap($id){
			$a = DB::table('pelaporan')->where('id' , $id)->first();
			$b = DB::table('master_roadmap')->where('zat_aktif_id' , $a->zat_aktif_id)->where('id_cms_users' , CRUDBooster::myId())->get();
			if(Count($b) == 0){
				$insert = [];
				$insert['zat_aktif_id'] 	= $a->zat_aktif_id;
				$insert['id_cms_users']		= CRUDBooster::myId();

				DB::table('master_roadmap')->insert($insert);
			}

			Session::put('zataktifid' , $a->zat_aktif_id);
			Session::put('perusahaanid' , CRUDBooster::myId());
			

			CRUDBooster::redirect('/bbo/master_roadmap' , 'Silahkan Masukan Detail Roadmap' , 'info');
		}

		public function getapproval(){
			$data = [];
			$data['page_title'] = 'Approval Pelaporan';
			$data['pelaporan'] = DB::table('detail_pelaporan')
								->join('pelaporan' , 'pelaporan.id' , 'detail_pelaporan.pelaporan_id')
								->join('perusahaan' , 'pelaporan.id_cms_users' , 'perusahaan.id_cms_users')
								->join('zat_aktif' , 'pelaporan.zat_aktif_id','zat_aktif.id')
								->join('status' , 'status.id' , 'detail_pelaporan.status_id')
								->select(
									'detail_pelaporan.id as Id',
									'perusahaan.nama as NmPerusahaan' ,
									'zat_aktif.nama as NmZatAktif' , 
									'detail_pelaporan.tanggal as tanggal',
									'status.id as idStatus',
									'status.uraian as Status',
									)
								->get()->toArray();
			
			// return Count($data['pelaporan']);

			$this->cbView('pelaporan.evaluator.index' , $data);
		}

		public function getevaluasi($id){

			if(!CRUDBooster::myId()){
				return redirect('/');
			}

			$data = [];
			$data['page_title'] = 'Approval Pelaporan';
			$DB					= DB::table('detail_pelaporan')
								->join('pelaporan' , 'pelaporan.id' , 'detail_pelaporan.pelaporan_id')
								->join('perusahaan' , 'pelaporan.id_cms_users' , 'perusahaan.id_cms_users')
								->join('zat_aktif' , 'pelaporan.zat_aktif_id','zat_aktif.id')
								->join('status' , 'status.id' , 'detail_pelaporan.status_id')
								->select(
									'detail_pelaporan.id as Id',
									'perusahaan.nama as NmPerusahaan' ,
									'zat_aktif.nama as NmZatAktif' , 
									'detail_pelaporan.tanggal as tanggal',
									'status.id as idStatus',
									'status.uraian as Status',
									'detail_pelaporan.capaian as Capaian',
									'detail_pelaporan.masalah as Masalah',
									'detail_pelaporan.rencana_tindaklanjut as rencanaTL',
									)
									->where('detail_pelaporan.id' , $id)
								->first();
			
			$data['NamaPerusahaan'] 		= $DB->NmPerusahaan;
			$data['NamaZatAktif'] 			= $DB->NmZatAktif;
			$data['TglPelaporan'] 			= $DB->tanggal;
			$data['capaian']		 		= $DB->Capaian;
			$data['masalah']		 		= $DB->Masalah;
			$data['rencana_tindaklanjut'] 	= $DB->rencanaTL;
			$data['ID']						= $id;
			// return Count($data['pelaporan']);

			$this->cbView('pelaporan.evaluator.evaluasi' , $data);
		}

		public function genForum($id){
			$a = DB::table('detail_pelaporan')->where('id' , $id)->first();
			$b = DB::table('pelaporan')->where('id' , $a->pelaporan_id)->first();
			$c = DB::table('zat_aktif')->where('id' , $b->zat_aktif_id)->first();
			$d = DB::table('perusahaan')->where('id_cms_users' , $b->id_cms_users)->first();

			// update status detail pelaporan
				DB::table('detail_pelaporan')->where('id' , $id)->update(['status_id' => 60]);
			// end update status detail pelaporan

			$e = DB::table('forum')->where('detail_pelaporan_id' , $id)->get();
			if(Count($e) == 0){
				$insert = [];
				$insert['detail_pelaporan_id'] 	= $id;
				$insert['judul']				= "Diskusi dengan ". $d->nama ." terkait ". $c->nama;
				$insert['konten']				= "";
				$insert['status_id']			= 92;
				DB::table('forum')->insert($insert);

				
			}
			$e = DB::table('forum')->where('detail_pelaporan_id' , $id)->first();
			


				return redirect('/bbo/pelaporan/'.$e->id.'/getforum');
			

			
		}

		public function getforum($id){

			if(!CRUDBooster::myId()){
				return redirect('/');
			}
			
			$a = DB::table('forum')->where('id' , $id)->first();

			$data = [];
			$data['page_title'] = 'Forum Diskusi';
			$DB					= DB::table('detail_pelaporan')
								->join('pelaporan' , 'pelaporan.id' , 'detail_pelaporan.pelaporan_id')
								->join('perusahaan' , 'pelaporan.id_cms_users' , 'perusahaan.id_cms_users')
								->join('zat_aktif' , 'pelaporan.zat_aktif_id','zat_aktif.id')
								->join('status' , 'status.id' , 'detail_pelaporan.status_id')
								->select(
									'detail_pelaporan.id as Id',
									'perusahaan.nama as NmPerusahaan' ,
									'zat_aktif.nama as NmZatAktif' , 
									'detail_pelaporan.tanggal as tanggal',
									'status.id as idStatus',
									'status.uraian as Status',
									'detail_pelaporan.capaian as Capaian',
									'detail_pelaporan.masalah as Masalah',
									'detail_pelaporan.rencana_tindaklanjut as rencanaTL',
									)
									->where('detail_pelaporan.id' , $a->detail_pelaporan_id)
								->first();
			
			$data['NamaPerusahaan'] 		= $DB->NmPerusahaan;
			$data['NamaZatAktif'] 			= $DB->NmZatAktif;
			$data['TglPelaporan'] 			= $DB->tanggal;
			$data['capaian']		 		= $DB->Capaian;
			$data['masalah']		 		= $DB->Masalah;
			$data['rencana_tindaklanjut'] 	= $DB->rencanaTL;
			$data['ID']						= $id;
			$data['Judul_Forum']			= $a->judul;

			$b = DB::table('isi_forum')
			->join('cms_users' , 'isi_forum.id_cms_users' , 'cms_users.id')
			->select('isi_forum.id as contentID' ,
					 'isi_forum.forum_id as forum_id' ,
					 'isi_forum.content as content' , 
					 'cms_users.photo as foto' , 
					 'isi_forum.id_cms_users as id_cms_users',
					 'cms_users.name as nama',
					 'isi_forum.created_at as tgl')
			->where('forum_id' , $id)->get();
			// dd($b);
			$data['chat'] = $b;


			// return Count($data['pelaporan']);
									
			$this->cbView('forum.detail_forum.index' , $data);
			
		}

		public function simpanchat()
		{
			$data = Request::all();

			if($data){
				$insert = [];
				$insert['forum_id'] 		= $data['forum_id'];
				$insert['content']			= $data['message'];
				$insert['id_cms_users'] 	= CRUDBooster::myid();
				$insert['created_at'] 		= Carbon::now();

				DB::table('isi_forum')->insert($insert);
			}
				$a = DB::table('forum')->where('id' , $data['forum_id'])->first();
			if(CRUDBooster::myPrivilegeId() == 4) // Evaluator kirim ke Perusahaan
			{
				$b = DB::table('detail_pelaporan')->where('id' , $a->detail_pelaporan_id)->first();
				$c = DB::table('pelaporan')->where('id' , $b->pelaporan_id)->first();
				$d = $c->id_cms_users;
			}
			elseif(CRUDBooster::myPrivilegeId() == 3){
				$d = 11;
			}

			$config['content'] = $a->judul;
			$config['to'] = '/bbo/pelaporan/'. $data['forum_id'] . "/getforum";
			$config['id_cms_users'] = [$d]; //This is an array of id users
			CRUDBooster::sendNotification($config);

			return redirect()->back();
		}

		public function deletechat($id){
			DB::table('isi_forum')->where('id' , $id)->delete();

			return redirect()->back();
		}




	    //By the way, you can still create your own method in here... :) 


	}