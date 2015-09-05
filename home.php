<?php
session_start();

if(!isset($_SESSION['username']))
{
	header('Location:index.php');
}
?>
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title>Foundation | Welcome</title>
    <link rel="stylesheet" href="css/foundation.css" />
    
    <link rel="stylesheet" href="css/app.css" />
    <script src="js/vendor/modernizr.js"></script>
  </head>
  <body>
             
 <div class="row">
        <div class="large-3 columns">
          <h1><img src="img/logo_INTERFACE.jpg"/></h1>
        </div>
        <div class="large-9 columns">
          <ul class="right button-group">
          <li><a href="index.html" class="button">Hello, <?=$_SESSION['username']?></a></li>
          <li><a href="logout.php" class="button">Logout</a></li>
          </ul>
         </div>
       </div>
     
        <br/>
     <br/>
     <br/>
     
     
       
     
      <div class="row"> 
        <div class="large-12 columns columns_borders" role="content">
     
     <ul class="tabs" data-tab role="tablist"> 
     <li class="tab-title active" role="presentation">
		 <a href="#panel2-1" role="tab" tabindex="0" aria-selected="true" aria-controls="panel2-1">File Explorer</a>
	</li> 
	 <li class="tab-title" role="presentation">
		 <a href="#panel2-2" role="tab" tabindex="0" aria-selected="false" aria-controls="panel2-2">Terminal</a>
	</li> </ul> <div class="tabs-content">
	
<br/>
<div id="globalmessase">
<!--
<div data-alert class="alert-box success radius">
  Sucessfully Created Directory 
  <a href="#" class="close">&times;</a>
</div>

<div data-alert class="alert-box info radius">
  <b>Query : </b> Hadoop fs -mkdir sample-output /
  <a href="#" class="close">&times;</a>
</div>
-->
</div>
	<section role="tabpanel" aria-hidden="false" class="content active" id="panel2-1" ng-app="myApp" ng-controller="customersCtrl"> 
		<h2>File Explore:-</h2> 
		<div class="example large-3">
			<h4>Local Files</h4>
			<div id="fileTreeDemo_1" class="demo">
			<ul class="jqueryFileTree">
			  <li class = "DIRECTORY"  ng-dblclick="getlocalMinus($event)" data = "{{lcursor+'..'}}">
				..
			  </li>
			  <li ng-repeat="x in lPath" ng-class = "x.type" data-type="{{x.type}}"  ng-dblclick="getlocal($event)" ng-click="currentFsl($event);" data = "{{lcursor+x.pathSuffix }}">
				{{ x.pathSuffix + ', ' + x.type }}
			  </li>
			</ul></div>
		</div>
		<div class="example large-3">
			<h4>HDFS Files</h4>
			<div> 
			<div id="fileTreeDemo_1" class="demo">
			<ul class="jqueryFileTree">
			 <li class = "DIRECTORY"  ng-dblclick="gethdfsMinus($event)" data = "{{hcursor+'..'}}">
				 ..
			  </li>
			  <li ng-repeat="x in hPath" ng-class = "x.type" data-type="{{x.type}}"   ng-dblclick="gethdfs($event)" ng-click="currentFsh($event)" data = "{{hcursor+x.pathSuffix }}">
				{{ x.pathSuffix + ', ' + x.type }}
			  </li>
			</ul>
</div>
			</div>
		</div>
		<div class="example large-4">
			
			<ul class="accordion" data-accordion> 
			
				<li class="accordion-navigation"> <a href="#panel1a">Files Operations</a> 
					<div id="panel1a" class="content"> 
					
					<ul class="tabs" data-tab> 
					
						<li class="tab-title active"><a href="#panel1">Local</a></li> 
						<li class="tab-title"><a href="#panel2">HDFS</a></li> 
						</ul> 
						<div class="tabs-content"> 
							<div class="content active" id="panel1"> 
							
								<h4>Local Files Operations</h4>
								<div class="row">
								<div class="row example large-3">
									<input type="text" name="" placeholder="File name"  ng-model="lfilename" />
								</div>
								&nbsp&nbsp&nbsp
									<div class="row example large-1">
									<button class="small" ng-click="clickoperationl('createfile')">Create File</button>
									</div>
								
								</div>
								<div class="row">
								<button class="small" ng-click="clickoperationl('copyfile')">Copy</button>
								<button class="small" ng-click="clickoperationl('pastefile')">Paste</button>
								<button class="small" ng-click="clickoperationl('movefile')">Move</button>
								<button class="small" ng-click="clickoperationl('removefile')">Remove</button>
								<button class="small" ng-click="clickoperationl('propertiesfile')">properties</button>
								</div>
							
							</div> 
							<div class="reveal-modal" data-reveal aria-labelledby="firstModalTitle" aria-hidden="true" role="dialog" style="display: none" id="myModal">
							
							</div>
							<div class="content" id="panel2"> 
									<h4>HDFS Files Operations</h4>
								<div class="row">
								<div class="row example large-3">
									<input type="text" name="" placeholder="File name" ng-model="hfilename"/>
								</div>
								&nbsp&nbsp&nbsp
									<div class="row example large-1">
									<button class="small" ng-click="clickoperationh('createfile')">Create File</button>
									</div>
								
								</div>
								<div class="row">
								<button class="small" ng-click="clickoperationh('copyfile')">Copy</button>
								<button class="small" ng-click="clickoperationh('pastefile')">Paste</button>
								<button class="small">Move</button>
								<button class="small" ng-click="clickoperationh('removefile')">Remove</button>
								<button class="small" ng-click="clickoperationh('propertiesfile')">properties</button>
								</div>
								
							
							</div> 
							</div>
					
							
						
					</div> 
				</li> 
				<li class="accordion-navigation"> <a href="#panel2a">Directory Operations</a> 
				<div id="panel2a" class="content"> 
						<ul class="tabs" data-tab> 
					
						<li class="tab-title active"><a href="#panel1">Local</a></li> 
						<li class="tab-title"><a href="#panel2">HDFS</a></li> 
						</ul> 
						<div class="tabs-content"> 
							<div class="content active" id="panel1"> 
							
								<h5>Local Directory Operations</h5>
								<div class="row">
								<div class="row example large-3">
									<input type="text" name="" placeholder="File name" ng-model="ldfilename"/>
								</div>
								&nbsp&nbsp&nbsp
									<div class="row example large-1">
									<button class="small" ng-click="clickoperationl('createdirectory')">Create Directory</button>
									</div>
								
								</div>
								<div class="row">
								<button class="small" ng-click="clickoperationl('copydirectory')">Copy</button>
								<button class="small" ng-click="clickoperationl('pastedirectory')">Paste</button>
								<button class="small">Move</button>
								<button class="small" ng-click="clickoperationl('removedirectory')">Remove</button>
								<button class="small" ng-click="clickoperationl('propertiesdirectory')">properties</button>
								</div>
							
							</div> 
							<div class="content" id="panel2"> 
									<h5>HDFS Directory Operations</h5>
								<div class="row">
								<div class="row example large-3">
									<input type="text" name="" placeholder="File name" ng-model="hdfilename"/>
								</div>
								&nbsp&nbsp&nbsp
									<div class="row example large-1">
									<button class="small" ng-click="clickoperationh('createdirectory')">Create Directory</button>
									</div>
								
								</div>
								<div class="row">
								<button class="small">Copy</button>
								<button class="small" ng-click="clickoperationh('pastedirectory')">Paste</button>
								<button class="small">Move</button>
								<button class="small" ng-click="clickoperationh('removedirectory')">Remove</button>
								<button class="small" ng-click="clickoperationh('propertiesdirectory')">properties</button>
								</div>
								
							
							</div> 
							</div>
					
							
						
				
				</div> 
				</li> 
				<li class="accordion-navigation"> <a href="#panel3a">Other File System Operations</a> 
				<div id="panel3a" class="content">
					
					<ul class="tabs" data-tab> 
					
						<li class="tab-title active"><a href="#panel1">Local</a></li> 
						<li class="tab-title"><a href="#panel2">HDFS</a></li> 
						</ul> 
						<div class="tabs-content"> 
							<div class="content active" id="panel1"> 
							
								<h5>Other LOCAL System Operations</h5>
							<div class="row">
							<div class="row example large-3">
								<input type="text" name="" placeholder="0755/0644" ng-model="lfdpermission" />
							</div>
							&nbsp&nbsp&nbsp
								<div class="row example large-1">
								<button class="small" ng-click="clickoperationl('setlfdpermission')">Set Permission</button>
								</div>
							
							</div>
							<div class="row">
							<div class="row example large-3">
								<input type="text" name="" placeholder="User of file/Directory" ng-model="lfduser" />
							</div>
							&nbsp&nbsp&nbsp
								<div class="row example large-1">
								<button class="small" ng-click="clickoperationl('setlfduser')">Set User</button>
								</div>
							
							</div>
							<div class="row">
							<div class="row example large-3">
								<input type="text" name="" placeholder="Group of file/Directory" ng-model="lfdgroup"/>
							</div>
							&nbsp&nbsp&nbsp
								<div class="row example large-1">
								<button class="small" ng-click="clickoperationl('setlfdgroup')">Set Group</button>
								</div>
							
							</div>
							
							</div> 
							<div class="content" id="panel2"> 
									<h5>Other HDFS System Operations</h5>
							<div class="row">
							<div class="row example large-3">
								<input type="text" name="" placeholder="0755/0644" ng-model="hfdpermission"/>
							</div>
							&nbsp&nbsp&nbsp
								<div class="row example large-1">
								<button class="small" ng-click="clickoperationh('sethfdpermission')">Set Permission</button>
								</div>
							
							</div>
							<div class="row">
							<div class="row example large-3">
								<input type="text" name="" placeholder="User of file/Directory" ng-model="hfduser" />
							</div>
							&nbsp&nbsp&nbsp
								<div class="row example large-1">
								<button class="small" ng-click="clickoperationh('sethfduser')">Set User</button>
								</div>
							
							</div>
							<div class="row">
							<div class="row example large-3">
								<input type="text" name="" placeholder="Group of file/Directory" ng-model="hfdgroup"/>
							</div>
							&nbsp&nbsp&nbsp
								<div class="row example large-1">
								<button class="small" ng-click="clickoperationh('sethfdgroup')">Set Group</button>
								</div>
							
							</div>
					
							
									
		
				</div> 
				</li> 
				</ul>
			
			
			
		</div>
	
	</section> <section role="tabpanel" aria-hidden="true" class="content" id="panel2-2"> 
		<h2>Commands content goes here...</h2>
		<iframe src="phpterm.php" height="500" width="800"></iframe>
	</section> 
	 </div>
     
     
     
        </div> 
      </div>
     
       
     
     
       
     
      <footer class="row">
        <div class="large-12 columns">
          <hr/>
          <div class="row">
            <div class="large-6 columns">
              <p>© Manikandan.</p>
            </div>
            <div class="large-6 columns">
              <ul class="inline-list right">
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
                <li><a href="#">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    
    
    
    <script src="js/vendor/jquery.js"></script>
    <script src="js/foundation.min.js"></script>
    <script src="js/jquery.easing.js" type="text/javascript"></script>
	<script src="js/jqueryFileTree.js" type="text/javascript"></script>
	<script src="js/angular.min.js" type="text/javascript"></script>
	<link href="css/jqueryFileTree.css" rel="stylesheet" type="text/css" media="screen" />
    <script>
      $(document).foundation();
      $('#myTabs').on('toggled', function (event, tab) {
		console.log(tab);
	});
	$(document).ready( function() {
/*
				
				$('#fileTreeDemo_1').fileTree({ root: '/', script: 'connectors/jqueryFileTree.php' }, function(file) { 
					alert(file);
				});
*/

				
			});
    </script>
    
<script src="js/myScript.js"></script>
  </body>
</html>
