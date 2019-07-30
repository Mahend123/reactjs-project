<?php
defined('BASEPATH') or exit('No direct script access allowed');

class UploadImage extends CI_Controller
{
 function __construct() {
        parent::__construct();
        $this->load->library('upload');
    }

  
  public function image_upload1()
  {
    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");

    $response = array();
    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
    $server_url = 'http://localhost/react-demo/crud/uploads/';



    if ($_FILES['avatar']) {
      $avatar_name = $_FILES["avatar"]["name"];
      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
      $error = $_FILES["avatar"]["error"];

      if ($error > 0) {
        $response = array(
          "status" => "error",
          "error" => true,
          "message" => "Error uploading the file!"
        );
      } else {
        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
        $uploadedName = strtolower($random_name);
        $upload_name = $upload_dir . strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
          $response = array(
            "status" => "success",
            "error" => false,
            "message" => "File uploaded successfully",
            "name" => $uploadedName
          );
        } else {
          $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
          );
        }
      }
    } else {
      $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
      );
    }

    echo json_encode($response);
  }

   public function image_upload2()
  {
    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");

    $response = array();
    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
    $server_url = 'http://localhost/react-demo/crud/uploads/';



    if ($_FILES['avatar']) {
      $avatar_name = $_FILES["avatar"]["name"];
      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
      $error = $_FILES["avatar"]["error"];

      if ($error > 0) {
        $response = array(
          "status" => "error",
          "error" => true,
          "message" => "Error uploading the file!"
        );
      } else {
        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
        $uploadedName = strtolower($random_name);
        $upload_name = $upload_dir . strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
          $response = array(
            "status" => "success",
            "error" => false,
            "message" => "File uploaded successfully",
            "name" => $uploadedName
          );
        } else {
          $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
          );
        }
      }
    } else {
      $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
      );
    }

    echo json_encode($response);
  }

	public function image_upload3()
	  {
	    header('Content-Type: application/json; charset=utf-8');
	    header("Access-Control-Allow-Origin: *");
	    header("Access-Control-Allow-Methods: PUT, GET, POST");

	    $response = array();
	    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
	    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
	    $server_url = 'http://localhost/react-demo/crud/uploads/';



	    if ($_FILES['avatar']) {
	      $avatar_name = $_FILES["avatar"]["name"];
	      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
	      $error = $_FILES["avatar"]["error"];

	      if ($error > 0) {
	        $response = array(
	          "status" => "error",
	          "error" => true,
	          "message" => "Error uploading the file!"
	        );
	      } else {
	        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
	        $uploadedName = strtolower($random_name);
	        $upload_name = $upload_dir . strtolower($random_name);
	        $upload_name = preg_replace('/\s+/', '-', $upload_name);

	        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
	          $response = array(
	            "status" => "success",
	            "error" => false,
	            "message" => "File uploaded successfully",
	            "name" => $uploadedName
	          );
	        } else {
	          $response = array(
	            "status" => "error",
	            "error" => true,
	            "message" => "Error uploading the file!"
	          );
	        }
	      }
	    } else {
	      $response = array(
	        "status" => "error",
	        "error" => true,
	        "message" => "No file was sent!"
	      );
	    }

	    echo json_encode($response);
	  }

	public function image_upload4()
	  {
	    header('Content-Type: application/json; charset=utf-8');
	    header("Access-Control-Allow-Origin: *");
	    header("Access-Control-Allow-Methods: PUT, GET, POST");

	    $response = array();
	    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
	    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
	    $server_url = 'http://localhost/react-demo/crud/uploads/';



	    if ($_FILES['avatar']) {
	      $avatar_name = $_FILES["avatar"]["name"];
	      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
	      $error = $_FILES["avatar"]["error"];

	      if ($error > 0) {
	        $response = array(
	          "status" => "error",
	          "error" => true,
	          "message" => "Error uploading the file!"
	        );
	      } else {
	        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
	        $uploadedName = strtolower($random_name);
	        $upload_name = $upload_dir . strtolower($random_name);
	        $upload_name = preg_replace('/\s+/', '-', $upload_name);

	        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
	          $response = array(
	            "status" => "success",
	            "error" => false,
	            "message" => "File uploaded successfully",
	            "name" => $uploadedName
	          );
	        } else {
	          $response = array(
	            "status" => "error",
	            "error" => true,
	            "message" => "Error uploading the file!"
	          );
	        }
	      }
	    } else {
	      $response = array(
	        "status" => "error",
	        "error" => true,
	        "message" => "No file was sent!"
	      );
	    }

	    echo json_encode($response);
	  }

	  public function image_upload5()
	  {
	    header('Content-Type: application/json; charset=utf-8');
	    header("Access-Control-Allow-Origin: *");
	    header("Access-Control-Allow-Methods: PUT, GET, POST");

	    $response = array();
	    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
	    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
	    $server_url = 'http://localhost/react-demo/crud/uploads/';



	    if ($_FILES['avatar']) {
	      $avatar_name = $_FILES["avatar"]["name"];
	      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
	      $error = $_FILES["avatar"]["error"];

	      if ($error > 0) {
	        $response = array(
	          "status" => "error",
	          "error" => true,
	          "message" => "Error uploading the file!"
	        );
	      } else {
	        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
	        $uploadedName = strtolower($random_name);
	        $upload_name = $upload_dir . strtolower($random_name);
	        $upload_name = preg_replace('/\s+/', '-', $upload_name);

	        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
	          $response = array(
	            "status" => "success",
	            "error" => false,
	            "message" => "File uploaded successfully",
	            "name" => $uploadedName
	          );
	        } else {
	          $response = array(
	            "status" => "error",
	            "error" => true,
	            "message" => "Error uploading the file!"
	          );
	        }
	      }
	    } else {
	      $response = array(
	        "status" => "error",
	        "error" => true,
	        "message" => "No file was sent!"
	      );
	    }

	    echo json_encode($response);
	  }

	public function image_upload6()
	  {
	    header('Content-Type: application/json; charset=utf-8');
	    header("Access-Control-Allow-Origin: *");
	    header("Access-Control-Allow-Methods: PUT, GET, POST");

	    $response = array();
	    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
	    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
	    $server_url = 'http://localhost/react-demo/crud/uploads/';



	    if ($_FILES['avatar']) {
	      $avatar_name = $_FILES["avatar"]["name"];
	      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
	      $error = $_FILES["avatar"]["error"];

	      if ($error > 0) {
	        $response = array(
	          "status" => "error",
	          "error" => true,
	          "message" => "Error uploading the file!"
	        );
	      } else {
	        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
	        $uploadedName = strtolower($random_name);
	        $upload_name = $upload_dir . strtolower($random_name);
	        $upload_name = preg_replace('/\s+/', '-', $upload_name);

	        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
	          $response = array(
	            "status" => "success",
	            "error" => false,
	            "message" => "File uploaded successfully",
	            "name" => $uploadedName
	          );
	        } else {
	          $response = array(
	            "status" => "error",
	            "error" => true,
	            "message" => "Error uploading the file!"
	          );
	        }
	      }
	    } else {
	      $response = array(
	        "status" => "error",
	        "error" => true,
	        "message" => "No file was sent!"
	      );
	    }

	    echo json_encode($response);
	  }



	  public function profile_image()
	  {
	    header('Content-Type: application/json; charset=utf-8');
	    header("Access-Control-Allow-Origin: *");
	    header("Access-Control-Allow-Methods: PUT, GET, POST");

	    $response = array();
	    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
	    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
	    $server_url = 'http://localhost/react-demo/crud/uploads/';



	    if ($_FILES['avatar']) {
	      $avatar_name = $_FILES["avatar"]["name"];
	      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
	      $error = $_FILES["avatar"]["error"];

	      if ($error > 0) {
	        $response = array(
	          "status" => "error",
	          "error" => true,
	          "message" => "Error uploading the file!"
	        );
	      } else {
	        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
	        $uploadedName = strtolower($random_name);
	        $upload_name = $upload_dir . strtolower($random_name);
	        $upload_name = preg_replace('/\s+/', '-', $upload_name);

	        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
	          $response = array(
	            "status" => "success",
	            "error" => false,
	            "message" => "File uploaded successfully",
	            "name" => $uploadedName
	          );
	        } else {
	          $response = array(
	            "status" => "error",
	            "error" => true,
	            "message" => "Error uploading the file!"
	          );
	        }
	      }
	    } else {
	      $response = array(
	        "status" => "error",
	        "error" => true,
	        "message" => "No file was sent!"
	      );
	    }

	    echo json_encode($response);
	  }

	  

	  public function logo_image()
	  {
	    header('Content-Type: application/json; charset=utf-8');
	    header("Access-Control-Allow-Origin: *");
	    header("Access-Control-Allow-Methods: PUT, GET, POST");

	    $response = array();
	    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
	    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
	    $server_url = 'http://localhost/react-demo/crud/uploads/';



	    if ($_FILES['avatar']) {
	      $avatar_name = $_FILES["avatar"]["name"];
	      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
	      $error = $_FILES["avatar"]["error"];

	      if ($error > 0) {
	        $response = array(
	          "status" => "error",
	          "error" => true,
	          "message" => "Error uploading the file!"
	        );
	      } else {
	        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
	        $uploadedName = strtolower($random_name);
	        $upload_name = $upload_dir . strtolower($random_name);
	        $upload_name = preg_replace('/\s+/', '-', $upload_name);

	        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
	          $response = array(
	            "status" => "success",
	            "error" => false,
	            "message" => "File uploaded successfully",
	            "name" => $uploadedName
	          );
	        } else {
	          $response = array(
	            "status" => "error",
	            "error" => true,
	            "message" => "Error uploading the file!"
	          );
	        }
	      }
	    } else {
	      $response = array(
	        "status" => "error",
	        "error" => true,
	        "message" => "No file was sent!"
	      );
	    }

	    echo json_encode($response);
	  }


	  

	   public function uploadexcel()
	  {
	    header('Content-Type: application/json; charset=utf-8');
	    header("Access-Control-Allow-Origin: *");
	    header("Access-Control-Allow-Methods: PUT, GET, POST");

	    $response = array();
	    //$upload_dir = 'D:\xampp\htdocs/react-demo/src/uploads/';
	    $upload_dir = 'D:\xampp\htdocs/react-demo/crud/uploads/';
	    $server_url = 'http://localhost/react-demo/crud/uploads/';



	    if ($_FILES['avatar']) {
	      $avatar_name = $_FILES["avatar"]["name"];
	      $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
	      $error = $_FILES["avatar"]["error"];

	      if ($error > 0) {
	        $response = array(
	          "status" => "error",
	          "error" => true,
	          "message" => "Error uploading the file!"
	        );
	      } else {
	        $random_name = rand(1000, 1000000) . "-" . $avatar_name;
	        $uploadedName = strtolower($random_name);
	        $upload_name = $upload_dir . strtolower($random_name);
	        $upload_name = preg_replace('/\s+/', '-', $upload_name);

	        if (move_uploaded_file($avatar_tmp_name, $upload_name)) {
	          $response = array(
	            "status" => "success",
	            "error" => false,
	            "message" => "File uploaded successfully",
	            "name" => $uploadedName
	          );
	        } else {
	          $response = array(
	            "status" => "error",
	            "error" => true,
	            "message" => "Error uploading the file!"
	          );
	        }
	      }
	    } else {
	      $response = array(
	        "status" => "error",
	        "error" => true,
	        "message" => "No file was sent!"
	      );
	    }

	    echo json_encode($response);
	  }

}  
