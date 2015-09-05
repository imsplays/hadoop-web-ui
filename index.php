<?php
session_start();

if(isset($_REQUEST['signup']))
{
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "andal";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO users (username, email, password) VALUES ('".$_REQUEST['username']."', '".$_REQUEST['email']."', '".$_REQUEST['password']."')";
//$sql = "INSERT INTO `users` (`username`, `email`, `password`) VALUES ('mani', 'manikdans@gmail.om', 'dadsada');";
if (mysqli_query($conn, $sql)) {
    $msg = "New record created successfully";
} else {
    $msg = "Error: " . $sql . "<br>" . mysqli_error();
}

mysqli_close($conn);

}

if(isset($_REQUEST['login'])){
	
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "andal";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
	
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

//$sql = "INSERT INTO users (username, email, password) VALUES ('".$_REQUEST['username']."', '".$_REQUEST['email']."', '".$_REQUEST['password']."')";
$sql = "SELECT * FROM `users` WHERE `username` LIKE '".$_REQUEST['username']."' and `password` LIKE '".$_REQUEST['username']."'";
//$sql = "INSERT INTO `users` (`username`, `email`, `password`) VALUES ('mani', 'manikdans@gmail.om', 'dadsada');";
$res = mysqli_query($conn, $sql);
$rowcount=mysqli_num_rows($res);
if ($rowcount >= 1) {
    $_SESSION['username'] = $_REQUEST['username'];
    header('Location:home.php');
} else {
    $msg = "Please check your username and password";
    echo '<script>alert("Please check your username and password");</script>';
}

mysqli_close($conn);


}

?>
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          <li><a href="index.html" class="button">Home</a></li>
          <li><a href="index.html" class="button">Login</a></li>
          <li><a href="index.html" class="button">Registration</a></li>
          <li><a href="contact-us.html" class="button">Contact Us</a></li>
          </ul>
         </div>
       </div>
      
     
     
     
     
    
      <div class="row">
        <div class="large-12 columns">
        <div id="slider">
          <img src="img/home-slide1.png"/>
        </div>
          <div class="row">
        <div class="large-12 columns">
			<p>The WI (web interface) is primarily a tool for obtaining seismic waveforms. As the name suggests, it offers an easy interactive point-and-click interface which is convenient for when you are exploring the available data, or for smaller requests. But it can be used in a few interesting additional ways too.</p>
		</div>
	</div>
        <hr/>
        </div>
      </div>
      
     
     
      <div class="row">
		  <?php
     
     if($msg)
     {
		?>
	  
	  
	  <div class="alert-box success radius" id="smess" data-alert=""><b>Message : Successfully registered . please login now </b><a class="close" href="#">×</a></div>
	  <?php
	  }
     
     ?>
        <div class="large-6 columns ">
          <h3><u>For Registration:-</u></h3>
          
          <br/>
          <br/>
          <br/>
          <form method="post">
       <div class="row">
         <div class="large-6 large-centered columns">
             <input type="text" name="username" placeholder="Username" />
         </div>
       </div>
       <div class="row">
         <div class="large-6 large-centered columns">
             <input type="text" name="email" placeholder="Email ID" />
         </div>
       </div>
      <div class="row">
         <div class="large-6 large-centered columns">
             <input type="password" name="password" placeholder="Password" />
         </div>
      </div>
      <div class="row">
        <div class="large-4 large-centered columns">
          <input type="submit" class="button expand" name="signup" value="Sign Up"/>
        </div>
      </div>
    </form>
          <br/>
          <br/>
          <br/>
        </div>
        
        <div class="large-6 columns verticalLine">
          <h3><u>For Login:-</u></h3>
           
          <br/>
          <br/>
          <br/>
          <form method="post">
       <div class="row">
         <div class="large-6 large-centered columns">
             <input type="text" name="username" placeholder="Username" />
         </div>
       </div>
      <div class="row">
         <div class="large-6 large-centered columns">
             <input type="password" name="password" placeholder="Password" />
         </div>
      </div>
      <div class="row">
        <div class="large-4 large-centered columns">
          <input type="submit" class="button expand" name="login" value="Log in"/>
        </div>
      </div>
    </form>
          <br/>
          <br/>
          <br/>
        </div>
        
        
        </div>
        
     
    <div class="row">
        <div class="large-12 columns">
        <p>
<ol class="panel">
			<li>Event based - for exploring a catalog of seismic events (earthquakes), or for when you are looking for waveforms recorded near the time of one or more specific events. You can select events by multiple criteria, then pick from channels available at those times.
</li>
<li>Station-based - to explore inventory to see what stations/streams are available and their parameters.
</li>
<li>Time-span based - e.g. for obtaining station metadata over fixed periods of interest. 
</li>
<li>To examine the status of your requests. There is some on-line help available as pop-ups in the box at the top right of each box in the web interface. Clicking on this takes you to the appropriate part of the help page. Also you can click on the link in the top right corner to see the whole help page</li>
</ol></p>
          <div class="panel">
            <h4>Get in touch!</h4>
                
            <div class="row">
              <div class="large-9 columns">
                <p>We'd love to hear from you, you attractive person you.</p>
              </div>
              <div class="large-3 columns">
                <a href="#" class="radius button right">Contact Us</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
     
       
      
      <footer class="row">
        <div class="large-12 columns">
          <hr/>
          <div class="row">
            <div class="large-6 columns">
              <p>© manikandan.</p>
            </div>
            <div class="large-6 columns">
                 <ul class="inline-list right">
                <li><a href="index.html">Home</a></li>
                <li><a href="index.html">Login</a></li>
                <li><a href="index.html">Registration</a></li>
                <li><a href="contact-us.html">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div> 
      </footer>
    
    
    <script src="js/vendor/jquery.js"></script>
    <script src="js/foundation.min.js"></script>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>
