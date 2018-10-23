//-------------------------------------------------------------------
//---------------------  SHOW PIXELS FUNCTIONS ----------------------
//-------------------------------------------------------------------
var glob_x_left_top = null;
var glob_y_left_top = null;
var glob_pg_main_color = null;
var glob_showing_scale_div = false;
var glob_scale_div = null;

function whenClickedOnCanvas(e)
{
			
	evt = (e) ? e : event;   
	if(evt.button == 0) 
	{
		
		var x = e.offsetX==undefined?e.layerX:e.offsetX;
		var y = e.offsetY==undefined?e.layerY:e.offsetY;
		
		glob_x_left_top = x;
		glob_y_left_top = y;
						
		var context = e.target.getContext("2d");
		var imageData = context.getImageData(x,y,1,1);
			
		global_pg_main_color = ""+imageData.data[0]+","+imageData.data[1]+","+imageData.data[2]+","+imageData.data[3];
		
		showScaleDiv(e.target,x,y);
		redrawPixels_main(context, x,y);
		
	}
			
}	
		
function setEventListenersOnPixels()
		{
			var pcnv = document.getElementById("pixels");
			pcnv.onclick = function(e)
			{
				//var el = document.getElementById("fixed");
				//if(el.innerHTML == ' FIXED ')
				{
					e = (e) ? e : event;   
					if(e.button == 2) return;
						
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
					glob_x_left_top += n;
					glob_y_left_top += m;
					
					redrawPixels_main(document.getElementById("canvas0").getContext("2d"),  glob_x_left_top, glob_y_left_top );
				//	updatePatternProps();
					
				}
			}
		
			pcnv.onmousemove = function(e)
			{
					e = (e) ? e : event;   
								
					var x = e.offsetX==undefined?e.layerX:e.offsetX;
					var y = e.offsetY==undefined?e.layerY:e.offsetY;
					var n = (x/10|0)-7;
					var m = (y/10|0)-7;
					
				//	updatePatternProps(x_left_top + n, y_left_top + m);
				
				
			}
		}
		
		
		
function initModPixels()
{
	var scale_div = document.getElementById('scale_div');
	scale_div.style.visibility = 'hidden'; //visible
		
	setEventListenersOnTri_Btns();
	setEventListenersOnPixels();
}		
		
function showScaleDiv(target,x,y)
{
	
	var el = document.getElementById('scale_div');
	el.style.border = "";
    el.style.visibility='visible';
	el.style.display="inline-block";
	document.getElementById('canvas_width_height').style.display="none";
	document.getElementById('canvas_width_height').innerHTML = ""+document.getElementById('canvas0').width+" x "+document.getElementById('canvas0').height+ " ";
	//el.style.position='fixed';
	//el.style.left="200px";
	//el.style.top="200px";
	document.getElementById('selected_x_y').style.display="none";
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
	// var el = document.getElementById('btn_pixels_clean');
	// el.style.border = "";
    // el.style.visibility='visible';
	// el.style.display="inline-block";
	
	
	
	setEventListenersOnTri_Btns()
}



function setEventListenersOnTri_Btns()
{
		// var btn = document.getElementById("btn_lt");
		// btn.onclick = function()
		// {
			
			// server_crop(glob_x_left_top,glob_y_left_top,1);
			// //document.getElementById("scale_div").style.border = '';
			// document.getElementById("scale_div").style.visibility = 'hidden';
			
			
		// }
		
		// btn = document.getElementById("btn_rb");
		// btn.onclick = function()
		// {
			
			// server_crop(glob_x_left_top,glob_y_left_top,2);
			// //document.getElementById("scale_div").style.border = '';
			// document.getElementById("scale_div").style.visibility = 'hidden';
			
		// }
		
		// var btn = document.getElementById("btn_catch_it");
		// btn.onclick = function()
		// {
			// //document.getElementById("scale_div").style.border = '';
			
			// gcombo_catch_it(glob_x_left_top,glob_y_left_top);
			// redrawPixels_main(document.getElementById("canvas0").getContext("2d"), glob_x_left_top,glob_y_left_top);
			// //document.getElementById("scale_div").style.visibility = 'hidden'; //visible
			// s_gcombo();
		// }
		
		var btn = document.getElementById("btn_pixels_close");
		btn.onclick = function()
		{
			// //document.getElementById("scale_div").style.border = '';
			
			// _ctrlz();
			document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
			
			
			var el = document.getElementById('btn_pixels_clean');
	el.style.border = "";
    el.style.visibility='hidden';
	el.style.display="none";
	document.getElementById("scale_div").style.visibility = 'hidden'; //visible
			global_do_work=false;
		}
		var btn = document.getElementById("btn_pixels_save");
		btn.onclick = function()
		{
			save();
			
			
		}
		var btn = document.getElementById("btn_pixels_wiz");
		btn.onclick = function()
		{
			wizardry();
			
			
		}
		
		var btn = document.getElementById("btn_pixels_clean");
		btn.onclick = btn_pixels_clean;

}


 function btn_pixels_clean()
		{
			glob_little_belly_pressed=false;
			
			var num_dif_colors =0;
			//var num_dif_colors = countDifferColorsOn();
			
			if((num_dif_colors>0)||(document.getElementById("collected_div").childNodes.length<3))
			{
				alert('Collect all magik stones before. ...and wiz');
				//alert('Collect all plutonium before. Beware!\n...and tickle my little belly. Do not forget.');
				return;
			}
			
			
			 get_neighbours(glob_x_left_top,glob_y_left_top, function( colors ) {
			
				
			
						//console.log('glob_x_left_top='+glob_x_left_top);
						//console.log('glob_y_left_top='+glob_y_left_top);
						//alert('Solve my puzzle before! It will be opened in new tab.');
						//var session_number_seed=(new Data()).getTime();
						
					//	_ctrlz();
					if(colors.length==0)
					{						
					var canvas7 = document.getElementById("canvas0");
					var context7 = canvas7.getContext("2d");
					var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);
					var bgcolor = getColorArrayFromImageData(imgData7, glob_x_left_top, glob_y_left_top);
						console.log(bgcolor);
						
					imgData7=fillRectangleFast(imgData7,glob_x_left_top,glob_y_left_top,1,1,[255,255,255,255]);
					context7.putImageData(imgData7,0,0);
						
						
						
					// context7.strokeStyle='rgba(255,0,0,1.0)';
					// context7.strokeRect(glob_x_left_top-1,glob_y_left_top-1,3,3);
					//context7.beginPath();
					//context7.arc(glob_x_left_top,glob_y_left_top,.5,0,2*Math.PI);
					//context7.stroke();
					}
						
						
						
						document.getElementById("canvas0").onclick = whenBrakabakaEventOccurs;
						var el = document.getElementById('btn_pixels_clean');
						el.style.border = "";
						el.style.visibility='hidden';
						el.style.display="none";
						document.getElementById("scale_div").style.visibility = 'hidden';
						
						//window.open("http://s954447o.bget.ru/labirint");
						//location.href='http://s954447o.bget.ru/labirint';//?url_for_winner=http://localhost/colors555?session='+md5(session_number_seed);
						
						doLeftClick(glob_x_left_top,glob_y_left_top, function() {
						
						send_to_server_changed_canvas( function(){//and collected stones to treasure
							
							
								free_prev_labirint( function() {
									
																//	window.location.search = 'reloaded';
get_last_version_of_pattern( function() { global_do_work=false; 	} );	
																
																//global_do_work=false;
																//setTimeout(	processing_click, 100);
													});
								
									
									
									
									
									
							});
							
					});
						
			});
			
		}





function white(color2)
{
	var color=[255,255,255,255];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}
function red(color2)
{
	var color=[255,0,0,255];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}
function grey(color2)
{
	var color=[127,127,127,255];
	if(
					(color2[0] == color[0]) &&
					(color2[1] == color[1]) &&
					(color2[2] == color[2]) &&
					(color2[3]== color[3])
					
		) 
			{
				return true;
			}
			return false;

}
function countDifferColorsOn()
{
	var count=0;

		var imgData7 = getinversion(getbuffer());
	var arr = getArrayOfAllColors(imgData7);
	
	var canvas7 = document.getElementById("pixels");
		var context7 = canvas7.getContext("2d");
		var imgData7 = context7.getImageData(0,0,canvas7.width,canvas7.height);
	var arr2 = getArrayOfAllColors(imgData7);
	
	for(var i=0;i<arr2.length;i++)
	{
		if(white(arr2[i])||red(arr2[i])||grey(arr2[i])) continue;
		if(!includesColor(arr, arr2[i])) count++;
			

	}
	
	return count;
	

}

function redrawPixels_main(context, x,y)
{
	var c2 = document.getElementById("pixels");
	c2.width = 150;  //(img_width * m) + (img_width - 1)*p;
	c2.height = 150; //(img_height * m) + (img_height - 1)*p;

	var ctx = c2.getContext("2d");
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,c2.width,c2.height);
	
	for(var i=-7;i<	8;i++)
	{
		for(var j=-7;j<	8;j++)
		{
			
			
			var imageData = context.getImageData(x+i,y+j,1,1);
			
			ctx.fillStyle = "rgba("+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+','+imageData.data[3]+')';
			if(i==0 && j==0) ctx.fillStyle = "red";
			ctx.fillRect((i+7)*10, (j+7)*10, 10, 10);
			
			
		}
	}
	
	document.getElementById('selected_x_y').innerHTML = ""+x+", "+y;
	
}


function crop(x,y,flag)
{
	
	
	var sx,sy,w,h;
	var canvas =  document.getElementById("canvas0");
	
	if(flag == 1)
	{
		sx = x;
		sy = y;
		w = canvas.width - sx;
		h = canvas.height - sy;
	}
	else
	{
		sx = 0;
		sy = 0;
		w = x+1;
		h = y+1;
	}
	
	
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(sx, sy, w, h);
	
	///////
	//var buffer = imageData.data.buffer;  // ArrayBuffer
	//////
	
	canvas.width = w;
	canvas.height = h;
	canvas.getContext("2d").putImageData(imageData,0,0);
	
	/*********
	var imageData = context.createImageData(w, h);
	imageData.data.set(buffer);
	
	var params = [];
			
	params['x']= x;
	params['y']= y;
	params['flag']= flag;
	params['imgdata_base64']= dataurl;
			
	sendPostWithParametersOnServer( params ); 
	*********/
	
}


function sendPostWithParametersOnServer( action, params  )
{
	
				
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', action, true);
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.responseType = "blob";
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText; throw new Error(error);  }

			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
            var blob = xhr.response;
			getImageFromBlob( blob, function( img ) {	imageToCanvas( img, "canvas0" ); } );
			
	}

	xhr.send(params);
	
}


function server_crop(x,y,flag)
{
	
	var canvas =  document.getElementById("canvas0");

	var w = canvas.width;
	var h = canvas.height;
	var params = 'x='+x+'&y='+y+'&w='+w+'&h='+h+'&flag='+flag;		
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/precrop', true);
	//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	xhr.onload = function(e) {  
		
			if (xhr.readyState != 4) return;
			
			if (xhr.status != 200) {  var error = xhr.status + ': ' + xhr.statusText+': '+xhr.response; throw new Error(error);  }

			/*******
    
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8ClampedArray(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) {
                ints[i] = dataview.getUint8(i);
            }
			
			alert(ints[10]);
			
			************/
			
            transform("canvas0",'/crop');
			
	}

	xhr.send(params);
	
	
}

