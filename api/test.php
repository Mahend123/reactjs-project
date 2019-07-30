<?php 
header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Origin: http://localhost:3000");
$json = file_get_contents('php://input');
$jsonObj = json_decode($json);

echo "{name:'John'}"; ?>