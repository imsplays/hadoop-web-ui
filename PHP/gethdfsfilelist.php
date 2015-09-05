<?php

require_once __DIR__ . '/WebHDFS.php';


$hdfs = new WebHDFS('localhost', '50070', 'www-data');


//$s = $hdfs->create('user/hduser/file.txt', '/var/www/php-WebHDFS-master/README.md');
$opt = $_REQUEST['option'];
$val = $_REQUEST['dir'];
$path = $_REQUEST['dir'];
switch($opt)
{
case "listStatus":
echo $s = $hdfs->listStatus('/');
break;

case "getpath":
echo $s = $hdfs->listStatus($val);
break;

case "createfile":
$fname = $_REQUEST['fname'];
$fname_tmp = "/tmp/".$_REQUEST['fname'];
$commands = "touch ".$fname_tmp;

$sudo_commands = "echo '' | sudo -S ".$commands;
shell_exec($sudo_commands);

$s = $hdfs->create($path."/".$fname,$fname_tmp);

if ($s){
$result['commands'] = "hadoop fs -put $fname_tmp $path/$fname";
$result['result']   = "Successfully created new file";
$result['responce'] = true;
}else{
$result['commands'] = $commands;
$result['error'] = "Error : Check permission";
$result['responce'] = false;
}

echo json_encode($result);
break;

case 'pastefile':
$lpath = $_REQUEST['ldir'];
$hpath = $_REQUEST['hdir'];

$commands = "hadoop fs -copyToLocal $hpath $lpath";
echo $sudo_commands = "echo '' | sudo -u hduser ".$commands;
shell_exec($sudo_commands);
break;

case 'copyfromlocal':
$lpath = $_REQUEST['ldir'];
$hpath = $_REQUEST['hdir'];
$fname = $_REQUEST['fname'];
$commands = "hadoop fs -copyFromLocal $lpath $hpath";
$s = $hdfs->create($hpath.'/'.$fname,$lpath);
if ($s){
$result['commands'] = $commands ;
$result['result']   = "Successfully Copied";
$result['responce'] = true;
echo json_encode($result);
}else{
$result['commands'] = $commands;
$result['error'] = "Error : Check permission";
$result['responce'] = false;
echo json_encode($result);
}
break;

case 'removefile':
	$commands = "hadoop fs -rm ".$path;
	$s = $hdfs->delete($path);
	if ($s){
	$result['commands'] = $commands;
	$result['result'] = "Successfully Deleted file";
	$result['responce'] = true;
	echo json_encode($result);
	}else{
	$result['commands'] = $commands;
	$result['error'] = "Error : Check permission";
	$result['responce'] = false;
	echo json_encode($result);
	}
break;


case 'propertiesfile':
{
	$s = $hdfs->getFileStatus($path);
	print_r($s);
}
break;



case "createdirectory":

$fname = $_REQUEST['fname'];
$s = $hdfs->mkdirs($path."/".$fname);

if ($s){
$result['commands'] = "hadoop fs -mkdir $path/$fname";
$result['result']   = "Successfully created new folder";
$result['responce'] = true;
}else{
$result['commands'] = $commands;
$result['error'] = "Error : Check permission";
$result['responce'] = false;
}

echo json_encode($result);
break;


case 'pastedirectory':
echo $lpath = $_REQUEST['ldir'];

echo $hpath = $_REQUEST['hdir'];
exit;
$fname = $_REQUEST['fname'];
$commands = "hadoop fs -copyFromLocal $lpath $hpath";
$s = $hdfs->create($hpath,$lpath);
if ($s){
$result['commands'] = $commands ;
$result['result']   = "Successfully Copied";
$result['responce'] = true;
echo json_encode($result);
}else{
$result['commands'] = $commands;
$result['error'] = "Error : Check permission";
$result['responce'] = false;
echo json_encode($result);
}
break;


case 'removedirectory':
	$commands = "hadoop fs -rm rf ".$path;
	$s = $hdfs->delete($path);
	if ($s){
	$result['commands'] = $commands;
	$result['result'] = "Successfully Deleted file";
	$result['responce'] = true;
	echo json_encode($result);
	}else{
	$result['commands'] = $commands;
	$result['error'] = "Error : Check permission";
	$result['responce'] = false;
	echo json_encode($result);
	}
break;

case 'propertiesdirectory':
{
	$s = $hdfs->getFileStatus($path);
	print_r($s);
}
break;


case 'sethfdpermission':
	$per = $_REQUEST['per'];
	$s = $hdfs->setPermission($path,$per);
	if ($s){
	$result['commands'] = "hadoop fs -chmod ".$per." ".$path ;
	$result['result']   = "Successfully permission assigned";
	$result['responce'] = true;
	echo json_encode($result);
	}else{
	$result['commands'] = $commands;
	$result['error'] = "Error : Check permission";
	$result['responce'] = false;
	echo json_encode($result);
	}
	
break;

case 'sethfduser':
	$user = $_REQUEST['user'];
	$s = $hdfs->setOwner($path,$user);
	if ($s){
	$result['commands'] = "hadoop fs -chown ".$user." ".$path ;
	$result['result']   = "Successfully changed user assigned";
	$result['responce'] = true;
	echo json_encode($result);
	}else{
	$result['commands'] = $commands;
	$result['error'] = "Error : Check permission";
	$result['responce'] = false;
	echo json_encode($result);
	}
break;	

case 'sethfdgroup':
	$group = $_REQUEST['group'];
	$s = $hdfs->setOwner($path,$user);
	if ($s){
	$result['commands'] = "hadoop fs -chown ".$group." ".$path ;
	$result['result']   = "Successfully changed group assigned";
	$result['responce'] = true;
	echo json_encode($result);
	}else{
	$result['commands'] = $commands;
	$result['error'] = "Error : Check permission";
	$result['responce'] = false;
	echo json_encode($result);
	}
	
break;

default:
print_r($_POST);
echo "Something Went wrong";
break;
}

?>
