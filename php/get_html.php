<?php

	$param1 = "";
	$param2 = "";

	
	if( isset($_POST['param1']) && isset($_POST['param2']) )
	{
		if($_POST['param1'] == 'root_content')
		{
		    $param1 = $_POST['param1'];			
			$param2 = $_POST['param2'];
			
			if($param2 == "admin1")
			{
				//podmena mod na adminski i sboku pripeku
				echo file_get_contents("../html/_index.html");
				die();
			}
			else
			{
				//podmena mod na levelski
				echo file_get_contents("../html/_index.html");
				die();
			}				
			
			
		}
	}
		
	print_r($_POST);
	
	var_dump($_POST);

	echo "server:get_html():error: param1=[$param1], param2=[$param2]";

?>