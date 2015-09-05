<?php
//~ print_r($_REQUEST);
//~ exit;
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
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error();
}

mysqli_close($conn);
?> 
