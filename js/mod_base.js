function rename()
{
//always create new json
	var filename=prompt("Enter unique name for your own base");
	if(filename==null) return;
	
	var folder_name=prompt("Enter your folder name for your bases");
	if(folder_name==null) return;
	
	var pswd=prompt("Enter your password for your folder");
	if(pswd==null) return;
	
	create_new_base(pswd, filename, folder_name, document.getElementById('canvas0'), whenRenamed, whenErrorRenamed);
	
	
//always save png as file on server with new_linked_json_name

}

function whenRenamed()
{
	
	//reloading created json
	
	
	
	
}

function whenErrorRenamed()
{
}



function create_new_base( pswd, filename, folder_name, canvas, onsuccess, onerror  )
{
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', 'php/check_errors.php?folder_name='+folder_name+'&password='+pswd+'&filename='+filename);
	xhr2.onload = function ()
	{
		if (xhr2.status != 200) 
		{
			alert('mod_base:create_new_base(...): unknown error ' + xhr2.status + ': ' + xhr2.statusText);
			console.log('mod_base:create_new_base(...): unknown error ' + xhr2.status + ': ' + xhr2.statusText);
			if( onerror)  onerror();
		}
		else
		{
			if((""+xhr2.response).indexOf("check_errors.php:error:")!=-1)
			{
				alert(xhr2.response);
				console.log(xhr2.response);
			}
			else
			{
			
				var imageStr = canvas.toDataURL(); //  = "data:image/png...."
			
				var formData = new FormData();
	
				formData.append( "password", pswd );	
				formData.append( "folder_name", folder_name );
				formData.append( "filename", filename );
				formData.append( "img0", imageStr );
				
				// отослать
						
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "php/create_new_base.php");
				xhr.onload = function()
				{
							
					console.log("#4 " + xhr.response);
							
					if((""+xhr.response).indexOf("create_new_base.php::error")!=-1)
					{
						alert("was error on server");
						console.log('mod_base:create_new_base(...): unknown error ' + xhr.status + ': ' + xhr.statusText);
					}
					else
					{
					
						console.log("ok\n " + xhr.response);
						
						onsuccess(xhr.responseText);
							
					}
							
				}
				xhr.send(formData);
			}	
			
			
		}
	}
	
	xhr2.send();
	
	
}




function keys()
{
//if json not exist return
//else add keys as removed clusters and new base name
}