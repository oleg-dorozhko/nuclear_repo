function whenUserClickOnRemoveClusterButton(e,callback)
{
	
	//////////////////////////
	// update_table_of_zapret();
	//////////////////////////
	
	//if(global_ramka==true)
	//{
	//	setTimeout( function(e2){ return function(){whenUserClickOnCanvas(e2);}(e), 100 } );
	//	return;
	//}
			
	var x = e.offsetX==undefined?e.layerX:e.offsetX;
	var y = e.offsetY==undefined?e.layerY:e.offsetY;
	
	global_cell_size = Number( document.getElementById("cell_size").value );
	
	var n=global_cell_size;
	var nnn=0;
	var mmm=0;
	var nnn4 = x % n;
	if(nnn4==0) nnn=x/n; else nnn=(x-nnn4)/n;
	var mmm4 = y % n;
	if(mmm4==0) mmm=y/n; else mmm=(y-mmm4)/n;
	x=nnn*n;
	y=mmm*n;
		
		
	var canvas2 = document.getElementById("canvas0");
	var context2 = canvas2.getContext("2d");
	global_snake_image_data = context2.getImageData(0,0,canvas2.width,canvas2.height);
	var _color = getColorArrayFromImageData(global_snake_image_data, x, y );
	var r = __whenUserClickOnRemoveClusterButton(x,y);
	
	if(callback)  callback(r); 
	else return r;
}


	
	
var global_cluster_number = null;

function __whenUserClickOnRemoveClusterButton(x,y,callback)
{

		
	var sele0 = findClusterIndexByPoint([x,y]);//findSelectedClusterIndexes();
	if(sele0==null) return -1;
	
	global_cluster_number = sele0;
	
		ddraw();
		redrawPixels_main(null, x,y);
	
	if(global_ordered=='ordered')
	{
		
		var p1 = global_table_of_clusters[global_cluster_number].points.length;
	
		var max_points=0;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			//if(i==global_cluster_number) continue;
			if(global_table_of_clusters[i]==null) continue;
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(max_points<mp) 
								max_points=mp;
				
		}
	
		var min_points=max_points;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			//if(i==global_cluster_number) continue;
			if(global_table_of_clusters[i]==null) continue;
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(min_points>mp) 
								min_points=mp;
				
		}
		
		if(p1>min_points)
		{
			
			
			return -161;
			
		}
	
	}
	
	// post_bubabu(global_table_of_clusters[global_cluster_number].points,[0,0,100,255]);
	
	// return 1;
	
	
	//какие цвета окружают кластер?
	var colors = getColorsAroundCluster(global_cluster_number);
	/////////////////////////////////
	if(colors==-1)
	{
		global_table_of_clusters[global_cluster_number].in_use = get_level_for_removed_LC();
		
	}
	else if((global_game_mode==true)&&(colors.length==1)&&(colors[0].clusters.length==1))
	{
		var cluster_0 = cloneCluster(global_table_of_clusters[colors[0].clusters[0]]);
		
		var pts = global_table_of_clusters[global_cluster_number].points;
		for(var j=0;j<pts.length;j++) cluster_0.points.push([pts[j][0],pts[j][1]]); 
	
		cluster_0.zzz = [global_cluster_number,colors[0].clusters[0]];
						cluster_0.in_use=get_current_level();
						cluster_0.selected=false;
						global_table_of_clusters.push(cluster_0);
					global_table_of_clusters[global_cluster_number].in_use = get_level_for_removed_LC();
						/////////////////////////////////////////////
						//global_table_of_clusters[colors[0].clusters[0]].in_use = get_global_level_counter();	
						// or  //
						global_table_of_clusters.splice(colors[0].clusters[0],1);
						////////////////////////////////////////////////////	
						
						
						
	//	draw();

	//	post_bubabu(cluster_0.points,inverse(cluster_0.color));
							


	}
	//var clusters = getNearClustersFor(global_cluster_number);
	//if(clusters==null) return;
	else if((global_game_mode==false)&&(colors.length>0))
	{
		var cluster_0 = cloneCluster(global_table_of_clusters[colors[0].clusters[0]]);
		
		var pts = global_table_of_clusters[global_cluster_number].points;
		for(var j=0;j<pts.length;j++) cluster_0.points.push([pts[j][0],pts[j][1]]); 
	
		cluster_0.zzz = [global_cluster_number,colors[0].clusters[0]];
						cluster_0.in_use=get_current_level();
						cluster_0.selected=false;
						global_table_of_clusters.push(cluster_0);
					global_table_of_clusters[global_cluster_number].in_use = get_level_for_removed_LC();
						/////////////////////////////////////////////
						//global_table_of_clusters[colors[0].clusters[0]].in_use = get_global_level_counter();	
						// or  //
						global_table_of_clusters.splice(colors[0].clusters[0],1);
						////////////////////////////////////////////////////	
						
						
						
	//	draw();

	//	post_bubabu(cluster_0.points,inverse(cluster_0.color));
							


	}
	
	/**
	var colors = [];
	var _clusters = [];
	
		for(var i=0;i<clusters.length;i++)
		{
			var ind = getColorIndex(colors,global_table_of_clusters[clusters[i]].color);
			if(ind == null)
			{
				colors.push(global_table_of_clusters[clusters[i]].color);
				_clusters.push([clusters[i]]);
			}
			else
			{
				_clusters[ind].push(clusters[i]);
			}
		}

	
	if(clusters.length>1)
	{
	/*
	showAbsoluteDivWith( "choose_one_colors_div.html","choose_one_color",  function(modal_window_id) 
	{
			
		//var list = document.getElementById(modal_window_id).childNodes;
			//var myNode = document.getElementById(modal_window_id);
			//while (myNode.firstChild) {
			//	myNode.removeChild(myNode.firstChild);
			//}		
			
				var div2 = document.getElementById("colors_div");
				
				for(var i=0;i<colors.length;i++)
				{
					var canvas=document.createElement("canvas");
					canvas.id="canvas_"+colors[i].join("_");
					canvas.width=100;
					canvas.height=100;
					var context = canvas.getContext("2d");
					context.fillStyle='rgba('+colors[i][0]+','+colors[i][1]+','+colors[i][2]+',255)'; 
					context.fillRect(0,0,canvas.width, canvas.height);
					
					canvas.onclick = function()
					{
						var color = this.id.replace('canvas_','').split("_");
						
						color[0]=Number(color[0]);
						color[1]=Number(color[1]);
						color[2]=Number(color[2]);
						color[3]=Number(color[3]);
						
						document.body.removeChild(document.getElementById("modal_window_choose_one_color"));
						
						var ind=getIndexOfColor(colors,color);
						
						global_table_of_clusters[global_cluster_number].color=color;
						
						ddraw();
						
						return 1;
		
						
					}
					
					div2.appendChild(canvas);
				

						
		
		
		
		
				}
			
		});
			
			*/


	
	ddraw();
	redrawPixels_main(null, x,y);
	
	return 1;
	
	/*
	
	else if(clusters.length>1)
	{
		
		var max_index=0;
		var colors = []
		var _clusters = [];
		for(var i=0;i<clusters.length;i++)
		{
			var ind = getColorIndex(colors,global_table_of_clusters[clusters[i]].color);
			if(ind == null)
			{
				colors.push(global_table_of_clusters[clusters[i]].color);
				_clusters.push([clusters[i]]);
			}
			else
			{
				_clusters[ind].push(clusters[i]);
			}
		}

		console.log('_clusters'+_clusters);
		
		var max_mp=0;
		for(var i=0;i<_clusters.length;i++)
		{
			var mp=0;
			var arr = _clusters[i];
			for(var j=0;j<arr.length;j++)
			{
				mp += global_table_of_clusters[arr[j]].points.length;
			}
			
			if(max_mp<mp)
			{
				max_index=i;
				max_mp=mp;
			}
			
		}
		
		var rpt=[];
		for(var i=0;i< _clusters[max_index].length;i++)
		{
			
			var pts = global_table_of_clusters[_clusters[max_index][i]].points;
			
			for(var j=0;j<pts.length;j++) rpt.push([pts[j][0],pts[j][1]]); 
			
			
			
			
		}
		
		var cluster = {};
		cluster.color = cloneColor( colors[max_index]);
		cluster.points = clonePoints(rpt);
        cluster.zzz = JSON.parse(JSON.stringify(_clusters[max_index]));		
		cluster.in_use=1;
		cluster.selected=false;
		
		
		var cluster_0 = cloneCluster(cluster);
		var pts = global_table_of_clusters[global_cluster_number].points;
		for(var j=0;j<pts.length;j++) cluster_0.points.push([pts[j][0],pts[j][1]]); 
	
		cluster_0.zzz.push(global_cluster_number);
						cluster_0.in_use=1;
						cluster_0.selected=false;
						//global_table_of_clusters.push(cluster_0);
					

					
		for(var i=0;i< _clusters[max_index].length;i++)
		{
						global_table_of_clusters[_clusters[max_index][i]].in_use++;		
						
		}
		
		global_table_of_clusters[global_cluster_number].in_use++;
		draw();
			
						post_bubabu(cluster_0.points,inverse(cluster_0.color));//[255,255,0,255]
							
		return 1;
	}
	
	
	else if(clusters.length==0)
	{
		alert("The end");
		return -4;
	}
	
	
	
	return 1;
	
	
	*/
}










function __whenUserRightClickOnCanvas(e)
{

	var xy = getExactXY(e);
	var x = xy[0];
	var y = xy[1];
	
	var sele0 = findClusterIndexByPoint([x,y]);//findSelectedClusterIndexes();
	if(sele0==null) return -1;
	
	global_cluster_number = sele0;
	
		ddraw();
		redrawPixels_main(null, x,y);
	
	if(global_ordered=='ordered')
	{
		
		var p1 = global_table_of_clusters[global_cluster_number].points.length;
	
		var max_points=0;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			//if(i==global_cluster_number) continue;
			if(global_table_of_clusters[i]==null) continue;
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(max_points<mp) 
								max_points=mp;
				
		}
	
		var min_points=max_points;
		for(var i=0;i<global_table_of_clusters.length;i++)
		{
			//if(i==global_cluster_number) continue;
			if(global_table_of_clusters[i]==null) continue;
			if(global_table_of_clusters[i].in_use==false) continue;
			
			var mp = global_table_of_clusters[i].points.length;
			
			if(min_points>mp) 
								min_points=mp;
				
		}
		
		if(p1>min_points)
		{
			
			
			return -161;
			
		}
	
	}
	
	//какие цвета окружают кластер?
	var colors = getColorsAroundCluster(global_cluster_number);
	/////////////////////////////////
	if(colors==-1)
	{
		global_table_of_clusters[global_cluster_number].in_use = get_level_for_removed_RC();
		
	}
	else if((global_game_mode==true)&&(colors.length==1)&&(colors[0].clusters.length==1))
	{
		var cluster_0 = cloneCluster(global_table_of_clusters[colors[0].clusters[0]]);
		
		var pts = global_table_of_clusters[global_cluster_number].points;
		for(var j=0;j<pts.length;j++) cluster_0.points.push([pts[j][0],pts[j][1]]); 
	
		cluster_0.zzz = [global_cluster_number,colors[0].clusters[0]];
						cluster_0.in_use=get_current_level();
						cluster_0.selected=false;
						global_table_of_clusters.push(cluster_0);
					global_table_of_clusters[global_cluster_number].in_use = get_level_for_removed_LC();
						/////////////////////////////////////////////
						//global_table_of_clusters[colors[0].clusters[0]].in_use = get_global_level_counter();	
						// or  //
						global_table_of_clusters.splice(colors[0].clusters[0],1);
						////////////////////////////////////////////////////	
						
						
						
	//	draw();

	//	post_bubabu(cluster_0.points,inverse(cluster_0.color));
							


	}
	//var clusters = getNearClustersFor(global_cluster_number);
	//if(clusters==null) return;
	else if((global_game_mode==false)&&(colors.length>0))
	{
		var cluster_0 = cloneCluster(global_table_of_clusters[colors[0].clusters[0]]);
		
		var pts = global_table_of_clusters[global_cluster_number].points;
		for(var j=0;j<pts.length;j++) cluster_0.points.push([pts[j][0],pts[j][1]]); 
	
		cluster_0.zzz = [global_cluster_number,colors[0].clusters[0]];
						cluster_0.in_use=get_current_level();
						cluster_0.selected=false;
						global_table_of_clusters.push(cluster_0);
					global_table_of_clusters[global_cluster_number].in_use = get_level_for_removed_RC();
						/////////////////////////////////////////////
						//global_table_of_clusters[colors[0].clusters[0]].in_use = get_global_level_counter();	
						// or  //
						global_table_of_clusters.splice(colors[0].clusters[0],1);
						////////////////////////////////////////////////////	
						
							


	}
	
	

	
	ddraw();
	redrawPixels_main(null, x,y);
	
	return 1;
	
	
}








