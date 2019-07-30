<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
    header('Access-Control-Allow-Origin: *');
    if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
      header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
      header('Access-Control-Allow-Headers: Content-Type');
      exit;
    }
    //required for REST API
    require(APPPATH . '/libraries/REST_Controller.php');
    require APPPATH . 'libraries/Format.php';
    use Restserver\Libraries\REST_Controller;

class User extends REST_Controller {
  
  function __construct() {
        parent::__construct();
        $this->load->model('UserModel', 'UM');
        $this->load->helper('url');
    }

     function Userprofile_get() {
        if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }
        $result = $this->UM->get_Userprofile($this->get('id'));
        if ($result) {
            $this->response($result, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }

    

  
  function update_userprofile_put() {
       header('Access-Control-Allow-Origin: *'); 
        $id = $this->put('id');
        $re = $this->UM->get_alluserrecordbyid($id);
       
        $data['name']      = $this->put('name');
        $data['mobile']    = $this->put('mobile');
        $data['shopName']  = $this->put('shopName');
        $data['email']     = $this->put('email');

        // $data['country']  = $this->put('country');
        // $data['state']    = $this->put('state');
        // $data['city']     = $this->put('city');


        $count  = $this->put('country');
           if (!empty($count)) {
                $data['country'] = $count;
           }else{
                $data['country'] = $re->country;
           }

          $stat  = $this->put('state');
           if (!empty($stat)) {
                $data['state'] = $stat;
           }else{
                $data['state'] = $re->state;
           }

         $cit  = $this->put('city');
           if (!empty($cit)) {
                $data['city'] = $cit;
           }else{
                $data['city'] = $re->city;
           }


        $pwd  = $this->put('password');
           if(!empty($pwd)){
              $data['password'] = ($pwd);
           }else{
              $data['password'] = $re->password;
           }     

        $data['address']   = $this->put('address');

        $img1  = $this->put('imageUrl1');
           if (!empty($img1)) {
                $data['image1'] = $img1;
           }else{
                $data['image1'] = $re->image1;
           }

           $img2  = $this->put('imageUrl2');
           if (!empty($img2)) {
                $data['image2'] = $img2;
           }else{
                $data['image2'] = $re->image2;
           }

        $data['modify_date']       = date('Y-m-d H:i:s', time());

        $result = $this->UM->update_userprofile($id, $data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    public function excelfile_get(){
        $data = './uploads/433733-product.xls';
        @chmod($data, 0777);
       
        $this->load->library('Spreadsheet_Excel_Reader');
        $this->spreadsheet_excel_reader->setOutputEncoding('CP1251');

        $this->spreadsheet_excel_reader->read($data);

        error_reporting(E_ALL ^ E_NOTICE);

          $sheets = $this->spreadsheet_excel_reader->sheets[0];   
              
          $data_excel = array();
            for ($i = 1; $i <= $sheets['numRows']; $i++) {
                if($sheets['cells'][$i][1] == '') break;

                $data_excel[$i - 1]['product_name'] = $sheets['cells'][$i][1];
                $data_excel[$i - 1]['hsn'] = $sheets['cells'][$i][2];
                $data_excel[$i - 1]['pcode1'] = $sheets['cells'][$i][3];
                $data_excel[$i - 1]['pcode2'] = $sheets['cells'][$i][4];
                $data_excel[$i - 1]['category'] = $sheets['cells'][$i][4];
                $data_excel[$i - 1]['price'] = $sheets['cells'][$i][6];
                $data_excel[$i - 1]['quantity'] = $sheets['cells'][$i][7];
                $data_excel[$i - 1]['descriptions'] = $sheets['cells'][$i][8];
              }
              echo "<pre>";
              print_r($data_excel);
              die();

    }




 public function excelfiletest_get(){
       $filename  = '315931-mproduct.xls';

       // $data = './uploads/433733-product.xls';

        $data = './uploads/'.$filename;

        @chmod($data, 0777);
       
        $this->load->library('Spreadsheet_Excel_Reader');
        $this->spreadsheet_excel_reader->setOutputEncoding('CP1251');

        $this->spreadsheet_excel_reader->read($data);

        error_reporting(E_ALL ^ E_NOTICE);

          $sheets = $this->spreadsheet_excel_reader->sheets[0];   
              
          $data_excel = array();
            for ($i = 1; $i <= $sheets['numRows']; $i++) {
                if($sheets['cells'][$i][1] == '') break;

                $data_excel[$i - 1]['Product name'] = $sheets['cells'][$i][1];
                $data_excel[$i - 1]['Hsn code'] = $sheets['cells'][$i][2];
                $data_excel[$i - 1]['code1'] = $sheets['cells'][$i][3];
                $data_excel[$i - 1]['code2'] = $sheets['cells'][$i][4];
                $data_excel[$i - 1]['size'] = $sheets['cells'][$i][4];
                $data_excel[$i - 1]['price'] = $sheets['cells'][$i][6];
                $data_excel[$i - 1]['stock'] = $sheets['cells'][$i][7];
                $data_excel[$i - 1]['description'] = $sheets['cells'][$i][8];
                $data_excel[$i - 1]['user_id'] = $sheets['cells'][$i][9];
                
              }
              $data_excel['created']      = date('Y-m-d H:i:s', time());
                $data_excel['modify']       = date('Y-m-d H:i:s', time());

           echo "<pre>";     
            print_r($data_excel);
            die();
    }

 
}



  