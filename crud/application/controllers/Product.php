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

class Product extends REST_Controller {
	
	function __construct() {
        parent::__construct();
        $this->load->model('Product_model', 'pm');
    }
	
	function products_get() {
        $result = $this->pm->get_products_list();
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 200);
        }
    }

    function product_get() {
        if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }
        $result = $this->pm->get_product($this->get('id'));
        if ($result) {
            $this->response($result, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }
	
	function add_product_post() {
         header('Access-Control-Allow-Origin: *');
        $data['user_id']      = $this->post('user_id');
        $data['product_name'] = $this->post('product_name');
        $data['hsn']          = $this->post('hsn');
        $data['pcode1']       = $this->post('pcode1');
        $data['pcode2']       = $this->post('pcode2');
        $data['category']     = $this->post('category');
        $data['price']        = $this->post('price');
        $data['quantity']     = $this->post('quantity');
        $data['description']  = $this->post('description');
        $data['created']      = date('Y-m-d H:i:s', time());
        $data['modify']       = date('Y-m-d H:i:s', time());
       
        $result = $this->pm->product_add($data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function update_product_put() {
       header('Access-Control-Allow-Origin: *'); 
        $id = $this->put('id');
        $data['user_id']      = $this->put('user_id');
        $data['product_name'] = $this->put('product_name');
        $data['hsn']          = $this->put('hsn');
        $data['pcode1']       = $this->put('pcode1');
        $data['pcode2']       = $this->put('pcode2');
        $data['category']     = $this->put('category');
        $data['price']        = $this->put('price');
        $data['quantity']     = $this->put('quantity');
        $data['description']  = $this->put('description');
        
        $data['modify']       = date('Y-m-d H:i:s', time());

        $result = $this->pm->update_product($id, $data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

     public function deleteProduct_post()
      { 
        header("Access-Control-Allow-Origin: *");

        $productId = $this->input->post('productId');

        $cat = $this->pm->delete_Product($productId);

        $response = array(
          'message' => 'Product deleted successfully.'
        );

        $this->output
          ->set_content_type('application/json')
          ->set_output(json_encode($response));
      }


    function add_category_post() {
         header('Access-Control-Allow-Origin: *');
        $data['user_id']     = $this->post('user_id');
        $data['category']    = $this->post('category');
        $data['create_date']= date('Y-m-d H:i:s', time());
        $data['modify_date'] = date('Y-m-d H:i:s', time());
       
        $result = $this->pm->category_add($data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function categorys_get() {
        $result = $this->pm->get_category_list();
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 200);
        }
    }

    function category_get() {
        if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }
        $result = $this->pm->get_category($this->get('id'));
        if ($result) {
            $this->response($result, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }


    function update_category_put() {
       header('Access-Control-Allow-Origin: *'); 
        $id = $this->put('id');
        $data['user_id'] = $this->put('user_id');
        $data['category'] = $this->put('category');
        $data['create_date']= date('Y-m-d H:i:s', time());
        $data['modify_date'] = date('Y-m-d H:i:s', time());

        $result = $this->pm->update_category($id, $data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }


    public function deleteCategory_post()
      { 
        header("Access-Control-Allow-Origin: *");

        $catId = $this->input->post('catId');

        $cat = $this->pm->delete_Category($catId);

        $response = array(
          'message' => 'Product deleted successfully.'
        );

        $this->output
          ->set_content_type('application/json')
          ->set_output(json_encode($response));
      }





      //*******************PDF Section***********************//

      function add_pdfpage_post() {
         header('Access-Control-Allow-Origin: *');
        $data['user_id']      = $this->post('user_id');
        $data['address']      = $this->post('address');
        $data['telephone']    = $this->post('telephone');
        $data['gstno']        = $this->post('gstno');
        $data['bankdetail']   = $this->post('bankdetail');
        $data['acno']         = $this->post('acno');
        $data['ifsc']         = $this->post('ifsc');
        $data['branch']       = $this->post('branch');
        $data['distributor']  = $this->post('distributor');
        $data['terms']        = $this->post('terms');
               
        $data['create_date']  = date('Y-m-d H:i:s', time());
        $data['modify_date']  = date('Y-m-d H:i:s', time());
       
        $result = $this->pm->pdfpage_add($data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function pdfpages_get() {
        $result = $this->pm->get_pdfpages_list();
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 200);
        }
    }

    function pdfpage_get() {
        if (!$this->get('user_id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }
        $result = $this->pm->get_pdfpage($this->get('user_id'));
        if ($result) {
            $this->response($result, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }


    function update_pdfpage_put() {
       header('Access-Control-Allow-Origin: *'); 
        $id = $this->put('id');
        $data['user_id']      = $this->put('user_id');
        $data['address']      = $this->put('address');
        $data['telephone']    = $this->put('telephone');
        $data['gstno']        = $this->put('gstno');
        $data['bankdetail']   = $this->put('bankdetail');
        $data['acno']         = $this->put('acno');
        $data['ifsc']         = $this->put('ifsc');
        $data['branch']       = $this->put('branch');
        $data['distributor']  = $this->put('distributor');
        $data['terms']        = $this->put('terms');
        
        $data['modify_date']       = date('Y-m-d H:i:s', time());

        $result = $this->pm->update_pdfpage($id, $data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    //**************************BILLING SECTION**********************************//

    function billprducts_get() {
        $result = $this->pm->get_billprducts_list();
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 200);
        }
    }



          function add_billprduct_post() {
         header('Access-Control-Allow-Origin: *');
        $data['invoiceno']    = $this->post('invoiceno');
        $data['customername'] = $this->post('customername');
        $data['contactno']    = $this->post('contactno');
        $data['address']      = $this->post('address');

        $data['gst_number']   = $this->post('gst_number');
        $data['trans']        = $this->post('trans');
        $data['product']      = $this->post('product');
        $data['quantity']      = $this->post('quantity');
        $data['size']         = $this->post('size');

        $data['price']        = $this->post('price');
        $data['total']        = $this->post('total');
        $data['dis']          = $this->post('dis');
        $data['disval']       = $this->post('disval');
        $data['fright']       = $this->post('fright');

        $data['gstinsert']    = $this->post('gstinsert');
        $data['gstvalue']     = $this->post('gstvalue');
        $data['igstins']      = $this->post('igstins');
        $data['igstinsval']   = $this->post('igstinsval');
        $data['grandtotal']   = $this->post('grandtotal');
       
        $data['create_date']  = date('Y-m-d H:i:s', time());
       
        $result = $this->pm->billprduct_add($data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function allbill_list_get() {
        $result = $this->pm->get_allbill_list();
        if ($result) {
            $this->response($result, 200);
        } else {
            $this->response(array(), 200);
        }
    }

    public function deletebill_post()
      { 
        header("Access-Control-Allow-Origin: *");

        $billId = $this->input->post('billId');

        $cat = $this->pm->delete_bill($billId);

        $response = array(
          'message' => 'Product deleted successfully.'
        );

        $this->output
          ->set_content_type('application/json')
          ->set_output(json_encode($response));
      }

    public function getbillone_get(){
       if (!$this->get('id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }
        $result = $this->pm->get_billone($this->get('id'));
        if ($result) {
            $this->response($result, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }             
    }

    //**********************Image Name Save Database****************************//  
    
    public function photo_get() {
        if (!$this->get('user_id')) { //query parameter, example, websites?id=1
            $this->response(NULL, 400);
        }
        $result = $this->pm->get_photo($this->get('user_id'));
        if ($result) {
            $this->response($result, 200); // 200 being the HTTP response code
        } else {
            $this->response(array(), 500);
        }
    }



    public function add_photos_post() {
         header('Access-Control-Allow-Origin: *');
        $data['user_id']= $this->post('user_id');
        $data['deal1']  = $this->post('imageUrl1');
        $data['deal2']  = $this->post('imageUrl2');
        $data['deal3']  = $this->post('imageUrl3');
        $data['deal4']  = $this->post('imageUrl4');
        $data['deal5']  = $this->post('imageUrl5');
        $data['deal6']  = $this->post('imageUrl6');
        
        $data['create_date'] = date('Y-m-d H:i:s', time());
        $data['modify_date']       = date('Y-m-d H:i:s', time());
        $result = $this->pm->Image_add($data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }


    function update_photos_put() {
       header('Access-Control-Allow-Origin: *'); 
        $id = $this->put('id');
        $data['user_id']= $this->put('user_id');

        $re = $this->pm->get_allphotosrecord($id);
           
           $image1  = $this->put('imageUrl1');
           if (!empty($image1)) {
                $data['deal1'] = $image1;
           }else{
                $data['deal1'] = $re->deal1;
           }

           $image2  = $this->put('imageUrl2');
           if (!empty($image2)) {
                $data['deal2'] = $image2;
           }else{
                $data['deal2'] = $re->deal2;
           }

           $image3  = $this->put('imageUrl3');
           if (!empty($image3)) {
                $data['deal3'] = $image3;
           }else{
                $data['deal3'] = $re->deal3;
           }

           $image4  = $this->put('imageUrl4');
           if (!empty($image4)) {
                $data['deal4'] = $image4;
           }else{
                $data['deal4'] = $re->deal4;
           }

           $image5  = $this->put('imageUrl5');
           if (!empty($image5)) {
                $data['deal5'] = $image5;
           }else{
                $data['deal5'] = $re->deal5;
           }

           $image6  = $this->put('imageUrl6');
           if (!empty($image6)) {
                $data['deal6'] = $image6;
           }else{
                $data['deal6'] = $re->deal6;
           }
        
        $data['modify_date'] = date('Y-m-d H:i:s', time());

        $result = $this->pm->update_photos($id, $data);
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    public function excelfile_post(){
         header('Access-Control-Allow-Origin: *');
        $filename  = $this->post('imageUrl1');
        if(!empty($filename)){

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

                $data_excel[$i - 1]['user_id'] = $sheets['cells'][$i][1];
                 $user_id  = $data_excel[$i - 1]['user_id'];

                $data_excel[$i - 1]['product_name'] = $sheets['cells'][$i][2];
                      $product_name  = $data_excel[$i - 1]['product_name'];

                $data_excel[$i - 1]['hsn'] = $sheets['cells'][$i][3];
                                  $hsn =  $data_excel[$i - 1]['hsn'];


                
                $data_excel[$i - 1]['pcode1'] = $sheets['cells'][$i][4];
              $pcode1=  $data_excel[$i - 1]['pcode1'];
                
                $data_excel[$i - 1]['pcode2'] = $sheets['cells'][$i][4];
              $pcode2 = $data_excel[$i - 1]['pcode2'];
                
                $data_excel[$i - 1]['category'] = $sheets['cells'][$i][6];
               $category =$data_excel[$i - 1]['category'];
                
                $data_excel[$i - 1]['price'] = $sheets['cells'][$i][7];
               $price = $data_excel[$i - 1]['price'];
                
                $data_excel[$i - 1]['quantity'] = $sheets['cells'][$i][8];
             $quantity = $data_excel[$i - 1]['quantity'];
                
                $data_excel[$i - 1]['description'] = $sheets['cells'][$i][9];
            $description = $data_excel[$i - 1]['description'];
              }
                    
                 $dataa = array(
                                'user_id'=>$user_id, 'product_name'=>$product_name, 'hsn'=>$hsn, 'pcode1'=>$pcode1, 'pcode2'=>$pcode2,
                                'category'=>$category, 'price'=>$price, 'quantity'=>$quantity, 'description'=>$description);

                    $dataa['created']  = date('Y-m-d H:i:s', time());
                     $dataa['modify']  = date('Y-m-d H:i:s', time());

        $result = $this->pm->insert_excelfile($dataa);
        
        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
       } 
    }

}
