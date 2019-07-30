<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReactApi extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
    $this->load->model('reactapi_model');
    $this->load->database(); 
  	$this->load->helper('text');
  }
  
  public function products()
  { 
    header("Access-Control-Allow-Origin: *");

    $products = $this->reactapi_model->get_products();

    $this->output
      ->set_content_type('application/json')
      ->set_output(json_encode($products));
  }



  public function AddKyc()
  { 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");

    $formdata = json_decode(file_get_contents('php://input'), true);

    if( ! empty($formdata)) {

      $identity = $formdata['identity'];
      $addressProof = $formdata['addressProof'];
      $identityno = $formdata['identityno'];
      $addressno = $formdata['addressno'];

      
      //$id = $formdata['id'];
      $productData = array(
        'identity' => $identity,
        'addressProof' => $addressProof,
        'identityno' => $identityno,
        'addressno' => $addressno,
        //'id' => $id,
        'create_date' => date('Y-m-d H:i:s', time())
      );
        
      $id = $this->reactapi_model->insert_product($productData);

      $response = array(
        'status' => 'success',
        'message' => 'You KYC successfully'
      );
    }
    else {
      $response = array(
        'status' => 'error'
      );
    }

    $this->output
      ->set_content_type('application/json')
      ->set_output(json_encode($response));
  }

  public function getProduct()
  { 
    header("Access-Control-Allow-Origin: *");

    $productId = $this->input->post('productId');

    $product = $this->reactapi_model->get_product($productId);

    $productData = array(
      'id' => $product->id,
      'aadharno' => $product->aadharno,
      'panno' => $product->panno
      
    );
    $this->output
      ->set_content_type('application/json')
      ->set_output(json_encode($productData));
  }
}
?>