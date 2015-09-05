
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $scope.lcursor = '/';
  $scope.hcursor = '/';
  $scope.lcurrentFsl = '/';
  $scope.lcurrentFtl = 'DIRECTORY';
  $scope.hcurrentFsh = '/';
  $scope.hcurrentFth = 'DIRECTORY';
  
  
  
  //initial page load request
  $http.get("PHP/gethdfsfilelist.php?option=listStatus").success(function (response) {$scope.hPath = response.FileStatuses.FileStatus;});
  $http.get("PHP/getlocalfilelist.php?option=listStatus").success(function (response) {$scope.lPath = response.FileStatus;});
 
  console.log("Current selection: file:"+$scope.lcurrentFsl+" & Directory: "+$scope.lcurrentFtl);


//HDFS click operation Start Here 
  $scope.clickoperationh = function(operation) {
	
	
	switch(operation){
	
	case 'createfile':
		if($scope.hfilename != undefined)
		{
			if(confirm("Are you sure to create file as "+$scope.hfilename+"|"+$scope.hcurrentFsh))
			{
			$http.get("PHP/gethdfsfilelist.php?option=createfile&fname="+$scope.hfilename+"&dir="+$scope.hcurrentFsh).success(function (response) {
				$scope.ajaxresponce = response; 
				if(response.responce)
				{
				//alert(response.result);
				$http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+$scope.hcurrentFsh).success(function (response) {$scope.hcursor = $scope.hcurrentFsh+'/';$scope.hPath = response.FileStatuses.FileStatus;$scope.hfilename = ''});
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert="">'+response.result+'<a class="close" href="#">×</a></div>');
				$('#smess').delay(3000).fadeOut('slow');
				$('#globalmessase').append('<div class="alert-box info radius" id="imess" data-alert=""><b>Local Command : </b>'+response.commands+'<a class="close" href="#">×</a></div>');
				$('#imess').delay(10000).fadeOut('slow');
				
				}else{
				alert(response.result);
				}
				});
			}
		}else{
			alert('Please give me valid file name');
		}
	break;
	
	case 'copyfile':
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully Copied '+$scope.hcurrentFth+' from HDFS</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(2000).fadeOut('slow');
	
	break;
	
	case 'pastefile':
	
	if($scope.lcurrentFsl != '/')
	{
		val = $scope.lcurrentFsl;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to paste "+$scope.lcurrentFtl+" as "+res[c]+" from local to hdfs"))
		{
			$http.get("PHP/gethdfsfilelist.php?option=copyfromlocal&dir="+$scope.lcurrentFsl+"&hdir="+$scope.hcurrentFsh+"&ldir="+$scope.lcurrentFsl+"&fname="+res[c]).success(function (response) {
				if(response.responce)
				{
				
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+' '+res[c]+'</b><a class="close" href="#">×</a></div>');
				$('#smess').delay(2000).fadeOut('slow');
				$http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+$scope.hcurrentFsh).success(function (response) {$scope.hcursor = $scope.hcurrentFsh+'/';$scope.hPath = response.FileStatuses.FileStatus;});
				}
				else{
				alert(response.result);
				}
				});
		}
	}else{
	//alert("Please select any file from HDFS");
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from Local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	
	break;
	
	case 'removefile':
	if($scope.hcurrentFsh != '/')
	{
		
		val = $scope.hcurrentFsh;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to Delete ?"))
		{
		var finalstring = '';
		for( i=0; i < (res.length - 2); i++ )
		{
			finalstring += res[i]+'/';
		}
		$http.get("PHP/gethdfsfilelist.php?option=removefile&dir="+$scope.hcurrentFsh).success(function (response) {
			
			if(response.responce)
			{
				$('#smess').remove();
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully Copied '+response.result+'</b><a class="close" href="#">×</a></div>');
				$('#smess').delay(2000).fadeOut('slow');
			}else{
				alert(response.error);}
		});
		
		$http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+finalstring).success(function (response) {$scope.hcursor = $scope.hcurrentFsh+'/';$scope.hPath = response.FileStatuses.FileStatus;$scope.hfilename = ''});
		}
	}else{
	
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from HDFS</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	
	break;
	
	case 'propertiesfile':
		if($scope.hcurrentFsh != '/')
		{
			val = $scope.hcurrentFsh;
			var res = val.split("/");
			var c = res.length - 1;
			$http.get("PHP/gethdfsfilelist.php?option=propertiesfile&dir="+$scope.hcurrentFsh).success(function (response) {
				
				$('#myModal').contents().remove();
				$('#myModal').append('<b>Message : '+res[c]+' file last modified Time '+response.FileStatus.modificationTime+'</b><br/><b>Message : '+res[c]+' file '+response.FileStatus.length+' bytes</b><br/><b>Message : '+res[c]+' file owner is '+response.FileStatus.owner+'</b><br/><b>Message : '+res[c]+' file group is '+response.FileStatus.group+'</b><br/>');
				$('#myModal').foundation('reveal', 'open');
				$('#smess').delay(3000).fadeOut('slow');
				
	});
		}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from HDFS</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
	
	
	
	break;
	
	//Starting Directory operation
	
	case 'createdirectory':
		if($scope.hdfilename != undefined)
		{
			if(confirm("Are you sure to create file as "+$scope.hdfilename+" in path "+$scope.hcurrentFsh))
			{
			$http.get("PHP/gethdfsfilelist.php?option=createdirectory&fname="+$scope.hdfilename+"&dir="+$scope.hcurrentFsh).success(function (response) {
				$scope.ajaxresponce = response; 
				if(response.responce)
				{
				//alert(response.result);
				$http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+$scope.hcurrentFsh).success(function (response) {$scope.hcursor = $scope.hcurrentFsh+'/';$scope.hPath = response.FileStatuses.FileStatus;$scope.hfilename = ''});
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert="">'+response.result+'<a class="close" href="#">×</a></div>');
				$('#smess').delay(3000).fadeOut('slow');
				$('#globalmessase').append('<div class="alert-box info radius" id="imess" data-alert=""><b>Local Command : </b>'+response.commands+'<a class="close" href="#">×</a></div>');
				$('#imess').delay(10000).fadeOut('slow');
				
				}else{
				alert(response.result);
				}
				});
			}
		}else{
			$('#smess').remove();
				$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Message : Please give me valid folder name </b><a class="close" href="#">×</a></div>');
				$('#smess').delay(3000).fadeOut('slow');
		}
	break;
	
	
	case 'pastedirectory':
	
	if($scope.lcurrentFsl != '/')
	{
		val = $scope.lcurrentFsl;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to paste "+$scope.lcurrentFtl+" as "+res[c]+" from local to hdfs"))
		{
			$http.get("PHP/gethdfsfilelist.php?option=pastedirectory&dir="+$scope.lcurrentFsl+"&hdir="+$scope.hcurrentFsh+"&ldir="+$scope.lcurrentFsl+"&fname="+res[c]).success(function (response) {
				if(response.responce)
				{
				
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+' '+res[c]+'</b><a class="close" href="#">×</a></div>');
				$('#smess').delay(2000).fadeOut('slow');
				$http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+$scope.hcurrentFsh).success(function (response) {$scope.hcursor = $scope.hcurrentFsh+'/';$scope.hPath = response.FileStatuses.FileStatus;});
				}
				else{
				alert(response.result);
				}
				});
		}
	}else{
	//alert("Please select any file from HDFS");
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from Local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	
	break;
	
	case 'removedirectory':
	if($scope.hcurrentFsh != '/')
	{
		
		val = $scope.hcurrentFsh;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to Delete ?"))
		{
		var finalstring = '';
		for( i=0; i < (res.length - 1); i++ )
		{
			finalstring += res[i]+'/';
		}
		$http.get("PHP/gethdfsfilelist.php?option=removedirectory&dir="+$scope.hcurrentFsh).success(function (response) {
			
			if(response.responce)
			{
				$('#smess').remove();
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully Copied '+response.result+'</b><a class="close" href="#">×</a></div>');
				$('#smess').delay(2000).fadeOut('slow');
			}else{
				alert(response.error);}
		});
		
		$http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+finalstring).success(function (response) {$scope.hcursor = $scope.hcurrentFsh+'/';$scope.hPath = response.FileStatuses.FileStatus;$scope.hfilename = ''});
		}
	}else{
	
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from HDFS</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	
	break;
	
	case 'propertiesdirectory':
		if($scope.hcurrentFsh != '/')
		{
			val = $scope.hcurrentFsh;
			var res = val.split("/");
			var c = res.length - 1;
			$http.get("PHP/gethdfsfilelist.php?option=propertiesdirectory&dir="+$scope.hcurrentFsh).success(function (response) {
				
				$('#myModal').contents().remove();
				$('#myModal').append('<b>Message : '+res[c]+' file last modified Time '+response.FileStatus.modificationTime+'</b><br/><b>Message : '+res[c]+' file '+response.FileStatus.length+' bytes</b><br/><b>Message : '+res[c]+' file owner is '+response.FileStatus.owner+'</b><br/><b>Message : '+res[c]+' file group is '+response.FileStatus.group+'</b><br/>');
				$('#myModal').foundation('reveal', 'open');
				$('#smess').delay(3000).fadeOut('slow');
				
	});
		}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from HDFS</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
	
	
	
	break;
	
	case 'sethfdpermission':
	
		
			if($scope.hcurrentFsh != '/')
			{
				if(confirm("Are you change permission ?"))
		{
				$http.get("PHP/gethdfsfilelist.php?option=sethfdpermission&dir="+$scope.hcurrentFsh+"&per="+$scope.hfdpermission).success(function (response) {
				
					$('#smess').remove();
					$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+'</b><a class="close" href="#">×</a></div>');
					$('#smess').delay(2000).fadeOut('slow');
					});
				}
			}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file/folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
		
	break;
	
	case 'sethfduser':
	
		
			if($scope.hcurrentFsh != '/')
			{
				if(confirm("Are you change user ?"))
		{
				$http.get("PHP/gethdfsfilelist.php?option=sethfduser&dir="+$scope.hcurrentFsh+"&user="+$scope.hfduser).success(function (response) {
				
					$('#smess').remove();
					$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+'</b><a class="close" href="#">×</a></div>');
					$('#smess').delay(2000).fadeOut('slow');
					});
				}
			}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file/folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
		
	break;
	
	case 'sethfdgroup':
	
		
			if($scope.hcurrentFsh != '/')
			{
				if(confirm("Are you change group ?"))
		{
				$http.get("PHP/gethdfsfilelist.php?option=sethfdgroup&dir="+$scope.hcurrentFsh+"&group="+$scope.hfdgroup).success(function (response) {
				
					$('#smess').remove();
					$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+'</b><a class="close" href="#">×</a></div>');
					$('#smess').delay(2000).fadeOut('slow');
					});
				}
			}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file/folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
		
	break;
	
	default:
	alert("Oops..!!, Something went wrong...");
	break;
	}
	
  }
 
//HDFS click operation End Here  

//LOCAL click operation Start Here 
  $scope.clickoperationl = function(operation) {
	
	
	switch(operation){
	
	case 'createfile':
		if($scope.lfilename != undefined)
		{
			if(confirm("Are you sure to create file as "+$scope.lfilename))
			{
			$http.get("PHP/getlocalfilelist.php?option=createfile&fname="+$scope.lfilename+"&dir="+$scope.lcurrentFsl).success(function (response) {
				$scope.ajaxresponce = response; 
				if(response.responce)
				{
				//alert(response.result);
				$http.get("PHP/getlocalfilelist.php?option=getpath&dir="+$scope.lcurrentFsl).success(function (response) {$scope.lcursor = $scope.lcurrentFsl+'/';$scope.lPath = response.FileStatus;$scope.lfilename = ''});
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert="">'+response.result+'<a class="close" href="#">×</a></div>');
				$('#smess').delay(3000).fadeOut('slow');
				$('#globalmessase').append('<div class="alert-box info radius" id="imess" data-alert=""><b>Local Command : </b>'+response.commands+'<a class="close" href="#">×</a></div>');
				$('#imess').delay(10000).fadeOut('slow');
				
				}else{
				alert(response.result);
				}
				});
			}
		}else{
			alert('Please give me valid file name');
		}
	break;
	
	case 'copyfile':
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully Copied '+$scope.lcurrentFtl+' from local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(2000).fadeOut('slow');
	
	break;
	
	case 'pastefile':
	
	if($scope.hcurrentFsh != '/')
	{
		val = $scope.hcurrentFsh;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to paste "+$scope.hcurrentFth+" as "+res[c]+" from hdfs to local"))
		{
			$http.get("PHP/gethdfsfilelist.php?option=pastefile&dir="+$scope.hcurrentFsh+"&hdir="+$scope.hcurrentFsh+"&ldir="+$scope.lcurrentFsl).success(function (response) {alert("Success");});
		}
	}else{
	//alert("Please select any file from HDFS");
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from HDFS</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	
	break;
	
	case 'removefile':
	if($scope.lcurrentFsl != '/')
	{
		
		val = $scope.lcurrentFsl;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to Delete ?"))
		{
		var finalstring = '';
		for( i=0; i < (res.length - 2); i++ )
		{
			finalstring += res[i]+'/';
		}
		$http.get("PHP/getlocalfilelist.php?option=removefile&dir="+$scope.lcurrentFsl).success(function (response) {
			
			if(response.responce)
			{
				$('#smess').remove();
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully Copied '+response.result+'</b><a class="close" href="#">×</a></div>');
				$('#smess').delay(2000).fadeOut('slow');
			}else{
				alert(response.error);}
		});
		
		$http.get("PHP/getlocalfilelist.php?option=getpath&dir="+finalstring).success(function (response) {$scope.lcursor = $scope.lcurrentFsl+'/';$scope.lPath = response.FileStatus;$scope.lfilename = ''});
		}
	}else{
	
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from Local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	
	break;
	
	case 'movefile':
	
	if($scope.lcurrentFsl != '/')
	{
		val = $scope.lcurrentFsl;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to Move "+res[c]+" from local to hdfs path "+$scope.hcurrentFsh))
		{
			
			$http.get("PHP/gethdfsfilelist.php?option=copyfromlocal&dir="+$scope.lcurrentFsl+"&hdir="+$scope.hcurrentFsh+"&ldir="+$scope.lcurrentFsl+"&fname="+res[c]).success(function (response) {
				
				if(response.responce)
				{
				
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully moved '+res[c]+'</b><a class="close" href="#">×</a></div>');
				$('#smess').delay(2000).fadeOut('slow');
				$http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+$scope.hcurrentFsh).success(function (response) {$scope.hcursor = $scope.hcurrentFsh+'/';$scope.hPath = response.FileStatuses.FileStatus;});
				}
				else{
				alert(response.result);
				}
				});
		}
		
	}else{
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from Local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	break;
	
	case 'propertiesfile':
		if($scope.lcurrentFsl != '/')
		{
			val = $scope.lcurrentFsl;
			var res = val.split("/");
			var c = res.length - 1;
			$http.get("PHP/getlocalfilelist.php?option=propertiesfile&dir="+$scope.lcurrentFsl).success(function (response) {
				
				$('#myModal').contents().remove();
				$('#myModal').append('<b>Message : '+res[c]+' file last modified Time '+response.modified+'</b><br/><b>Message : '+res[c]+' file '+response.fsize+' bytes</b><br/><b>Message : '+res[c]+' file owner is '+response.fowner.name+'</b><br/><b>Message : '+res[c]+' file group is '+response.fgroup.name+'</b><br/>');
				$('#myModal').foundation('reveal', 'open');
				$('#smess').delay(3000).fadeOut('slow');
				
	});
		}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
	
	
	
	break;
	
	
	//Directory Opertion for local start here
	
	case 'createdirectory':
		
		if($scope.ldfilename != undefined)
		{
			if(confirm("Are you sure to create folder as "+$scope.ldfilename+" in this path "+$scope.lcurrentFsl))
			{
			$http.get("PHP/getlocalfilelist.php?option=createdirectory&fname="+$scope.ldfilename+"&dir="+$scope.lcurrentFsl).success(function (response) {
				$scope.ajaxresponce = response; 
				if(response.responce)
				{
				//alert(response.result);
				$http.get("PHP/getlocalfilelist.php?option=getpath&dir="+$scope.lcurrentFsl).success(function (response) {$scope.lcursor = $scope.lcurrentFsl+'/';$scope.lPath = response.FileStatuses.FileStatus;$scope.lfilename = ''});
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert="">'+response.result+'<a class="close" href="#">×</a></div>');
				$('#smess').delay(3000).fadeOut('slow');
				$('#globalmessase').append('<div class="alert-box info radius" id="imess" data-alert=""><b>Local Command : </b>'+response.commands+'<a class="close" href="#">×</a></div>');
				$('#imess').delay(10000).fadeOut('slow');
				
				}else{
				alert(response.result);
				}
				});
			}
		}else{
			
				$('#smess').remove();
				$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Message : Please give me valid file name </b><a class="close" href="#">×</a></div>');
				$('#smess').delay(3000).fadeOut('slow');
		}
	break;
	
	case 'copydirectory':
	
	if($scope.lcurrentFsl != '/')
		{

	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully Copied '+$scope.lcurrentFtl+' from local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(2000).fadeOut('slow');
	
	}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
	}
	
	break;
	
	case 'removedirectory':
	if($scope.lcurrentFsl != '/')
	{
		
		val = $scope.lcurrentFsl;
		var res = val.split("/");
		var c = res.length - 1;
		if(confirm("Are you sure to Delete ?"))
		{
		var finalstring = '';
		for( i=0; i < (res.length - 1); i++ )
		{
			finalstring += res[i]+'/';
		}
		$http.get("PHP/getlocalfilelist.php?option=removedirectory&dir="+$scope.lcurrentFsl).success(function (response) {
			
			if(response.responce)
			{
				$('#smess').remove();
				$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+'</b><a class="close" href="#">×</a></div>');
				$('#smess').delay(2000).fadeOut('slow');
			}else{
				alert(response.error);}
		});
		
		$http.get("PHP/getlocalfilelist.php?option=getpath&dir="+finalstring).success(function (response) {$scope.lcursor = $scope.lcurrentFsl+'/';$scope.lPath = response.FileStatus;$scope.lfilename = ''});
		}
	}else{
	
	$('#smess').remove();
	$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any folder from Local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3000).fadeOut('slow');
	}
	
	break;
	
	
	case 'propertiesdirectory':
		if($scope.lcurrentFsl != '/')
		{
			val = $scope.lcurrentFsl;
			var res = val.split("/");
			var c = res.length - 1;
			$http.get("PHP/getlocalfilelist.php?option=propertiesdirectory&dir="+$scope.lcurrentFsl).success(function (response) {
				
				$('#myModal').contents().remove();
				$('#myModal').append('<b>Message : '+res[c]+' file last modified Time '+response.modified+'</b><br/><b>Message : '+res[c]+' file '+response.fsize+' bytes</b><br/><b>Message : '+res[c]+' file owner is '+response.fowner.name+'</b><br/><b>Message : '+res[c]+' file group is '+response.fgroup.name+'</b><br/>');
				$('#myModal').foundation('reveal', 'open');
				$('#smess').delay(3000).fadeOut('slow');
				
	});
		}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
	
	
	
	break;
	
	case 'setlfdpermission':
	
		
			if($scope.lcurrentFsl != '/')
			{
				if(confirm("Are you change permission ?"))
		{
				$http.get("PHP/getlocalfilelist.php?option=setlfdpermission&dir="+$scope.lcurrentFsl+"&per="+$scope.lfdpermission).success(function (response) {
				
					$('#smess').remove();
					$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+'</b><a class="close" href="#">×</a></div>');
					$('#smess').delay(2000).fadeOut('slow');
					});
				}
			}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file/folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
		
	break;
	
	case 'setlfduser':
	
	
			if($scope.lcurrentFsl != '/')
			{
						if(confirm("Are you change user ?"))
		{
				$http.get("PHP/getlocalfilelist.php?option=setlfduser&dir="+$scope.lcurrentFsl+"&user="+$scope.lfduser).success(function (response) {
				
					$('#smess').remove();
					$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+'</b><a class="close" href="#">×</a></div>');
					$('#smess').delay(2000).fadeOut('slow');
					});
				}
			}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file/folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
		
	break;
	
	case 'setlfdgroup':
	
	
			if($scope.lcurrentFsl != '/')
			{
						if(confirm("Are you change group ?"))
		{
				$http.get("PHP/getlocalfilelist.php?option=setlfdgroup&dir="+$scope.lcurrentFsl+"&group="+$scope.lfdgroup).success(function (response) {
				
					$('#smess').remove();
					$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+response.result+'</b><a class="close" href="#">×</a></div>');
					$('#smess').delay(2000).fadeOut('slow');
					});
				}
			}else{
		
			$('#smess').remove();
			$('#globalmessase').append('<div class="alert-box alert radius" id="smess" data-alert=""><b>Please select any file/folder from Local</b><a class="close" href="#">×</a></div>');
			$('#smess').delay(3000).fadeOut('slow');
		
		}
		
	break;
	
	default:
	alert("Oops..!!, Something went wrong...");
	break;
	}
	
  }
  
//LOCAL click operation END Here 

//LOCAL onclick call Start Here 
  $scope.currentFsl = function(a_number) {
	val = a_number.target.attributes.data.value;
	type = a_number.target.attributes['data-type'].value;
    
    $scope.lcurrentFsl = val;
    $scope.lcurrentFtl = type;
    $('#smess').remove();
    if($scope.lcurrentFtl == 'DIRECTORY')
    {
	$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+$scope.lcurrentFsl+' directory selected from local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(2000).fadeOut('slow');
	}else{
	$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+$scope.lcurrentFsl+' file selected from local</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(2000).fadeOut('slow');
	}

    console.log("Current selection: file:"+$scope.lcurrentFsl+" & Directory: "+$scope.lcurrentFtl);
  }
 
//LOCAL onclick call End Here  

//HDFS onclick call Start Here 
  $scope.currentFsh = function(a_number) {
	val = a_number.target.attributes.data.value;
	type = a_number.target.attributes['data-type'].value;
    
    $scope.hcurrentFsh = val;
    $scope.hcurrentFth = type;
    
     $('#smess').remove();
    if($scope.hcurrentFth == 'DIRECTORY')
    {
	$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+$scope.hcurrentFsh+' directory selected from hdfs</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3500).fadeOut('slow');
	}else{
	$('#globalmessase').append('<div class="alert-box success radius" id="smess" data-alert=""><b>Message : '+$scope.hcurrentFsh+' file selected from hdfs</b><a class="close" href="#">×</a></div>');
	$('#smess').delay(3500).fadeOut('slow');
	}
    
    console.log("Current selection: file:"+$scope.hcurrentFsh+" & Directory: "+$scope.hcurrentFth);
  }

//HDFS onclick call END Here 

//local ondblclick call Start Here 
  $scope.getlocal = function(a_number) {
	val = a_number.target.attributes.data.value;
	type = a_number.target.attributes['data-type'].value;
    console.log(val);
    if(type == 'DIRECTORY')
    $http.get("PHP/getlocalfilelist.php?option=getpath&dir="+val).success(function (response) {$scope.lcursor = val+'/';$scope.lPath = response.FileStatus;});
  }
//local ondblclick call End Here 

//local back click call Start Here 
  $scope.getlocalMinus = function(a_number) {
	val = a_number.target.attributes.data.value;
	var res = val.split("/");
	var finalstring = '';
	for( i=0; i < (res.length - 2); i++ )
	{
		finalstring += res[i]+'/';
	}
    alert(finalstring);
    $http.get("PHP/getlocalfilelist.php?option=getpath&dir="+finalstring).success(function (response) {$scope.lcursor = finalstring;$scope.lPath = response.FileStatus;});
  }

//local back click call End Here 

//HDFS ondblclick call Start Here 
  $scope.gethdfs = function(a_number) {
	val = a_number.target.attributes.data.value;
	type = a_number.target.attributes['data-type'].value;
    console.log(val);
    if(type == 'DIRECTORY')
    $http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+val).success(function (response) {$scope.hcursor = val+'/';$scope.hPath = response.FileStatuses.FileStatus;});
  }
//HDFS ondblclick call Start Here 

//HDFS back call Start Here  

  $scope.gethdfsMinus = function(a_number) {
	val = a_number.target.attributes.data.value;
    var res = val.split("/");
	var finalstring = '';
	for( i=0; i < (res.length - 2); i++ )
	{
		finalstring += res[i]+'/';
	}
    console.log(finalstring);
    $http.get("PHP/gethdfsfilelist.php?option=getpath&dir="+finalstring).success(function (response) {$scope.hcursor = finalstring;$scope.hPath = response.FileStatuses.FileStatus;});
  }
 //HDFS back call End Here   
});
