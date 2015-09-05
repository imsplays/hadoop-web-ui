<?php

$opt = $_REQUEST['option'];
$path = $_REQUEST['dir'];


switch($opt)
{
case "listStatus":

$result = listAllFolderFiles('/');
print_r(json_encode($result));
break;

case "getpath":
$result = listAllFolderFiles($path);
print_r(json_encode($result));
break;

case "createfile":
$fname = $_REQUEST['fname'];
$commands = "touch ".$path."/".$fname;
$sudo_commands = "echo '' | sudo -S ".$commands;
shell_exec($sudo_commands);

if (file_exists($path."/".$fname)){
$result['commands'] = $commands;
$result['result'] = "Successfully created new file";
$result['responce'] = true;
//echo json_encode($result);
}else{
$result['commands'] = $commands;
$result['error'] = "Error : Check permission";
$result['responce'] = false;
//echo json_encode($result);
}


echo json_encode($result);
break;

case 'removefile':
	$commands = "rm -rf ".$path;
	$sudo_commands = "echo '' | sudo -S ".$commands;
	shell_exec($sudo_commands);
	if (!file_exists($path."/".$fname)){
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
	$data['modified'] = date ("F d Y H:i:s.", filemtime($path));
	$data['fsize'] = filesize($path);
	$data['fowner'] = posix_getpwuid(fileowner($path));
	$data['fgroup'] = posix_getpwuid(filegroup($path));
	//$data['stat'] = stat($path);
	
	$result['commands'] = $commands;
	
	$result['responce'] = true;
	echo json_encode($data);

}
break;


case "createdirectory":
$fname = $_REQUEST['fname'];
$commands = "mkdir ".$path."/".$fname;
$sudo_commands = "echo '' | sudo -S ".$commands;
shell_exec($sudo_commands);

if (file_exists($path."/".$fname)){
$result['result'] = "Successfully created new folder";
$result['commands'] = $commands;
$result['responce'] = true;
//echo json_encode($result);
}else{
$result['commands'] = $commands;
$result['error'] = "Error : Check permission";
$result['responce'] = false;
//echo json_encode($result);
}


echo json_encode($result);
break;

case 'removedirectory':
	$commands = "rm -rf ".$path;
	$sudo_commands = "echo '' | sudo -S ".$commands;
	shell_exec($sudo_commands);
	if (!file_exists($path."/".$fname)){
	$result['commands'] = $commands;
	$result['result'] = "Successfully Deleted folder";
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
	
	$stat = stat($path);
	$data['modified'] =  $stat['mtime'];
	$data['fsize'] =  $stat['size'];
	$data['fowner'] = posix_getpwuid($stat['uid']);
	$data['fgroup'] = posix_getpwuid($stat['gid']);
	
	$result['commands'] = $commands;
	
	$result['responce'] = true;
	echo json_encode($data);

}
break;

case 'setlfdpermission':
	$per = $_REQUEST['per'];
	$commands = "sudo chmod -R ".$per." ".$path;
	$sudo_commands = "echo '' | sudo -S ".$commands;
	shell_exec($sudo_commands);
	$result['commands'] = $commands;
	$result['result'] = "Successfully permission assigned";
	$result['responce'] = true;
	echo json_encode($result);
	
break;

case 'setlfduser':
	$user = $_REQUEST['user'];
	$commands = "sudo chown -R ".$user." ".$path;
	$sudo_commands = "echo '' | sudo -S ".$commands;
	shell_exec($sudo_commands);
	$result['commands'] = $commands;
	$result['result'] = "Successfully changed user";
	$result['responce'] = true;
	echo json_encode($result);
	
break;

case 'setlfdgroup':
	$group = $_REQUEST['group'];
	$commands = "sudo chown -R :".$group." ".$path;
	$sudo_commands = "echo '' | sudo -S ".$commands;
	shell_exec($sudo_commands);
	$result['commands'] = $commands;
	$result['result'] = "Successfully changed group";
	$result['responce'] = true;
	echo json_encode($result);
	
break;
default:
print_r($_POST);
echo "Something Went wrong";
break;
}



$data = array();
$c = 0;
function listAllFolderFiles($dir){
    $ffs = scandir($dir);
    $c = 0;
    foreach($ffs as $ff){
        if($ff != '.' && $ff != '..'){
            if(is_dir($dir.'/'.$ff)){
				$data['FileStatus'][$c]['pathSuffix'] = htmlentities($ff);
				$data['FileStatus'][$c]['type'] = 'DIRECTORY';
				}else{
				$data['FileStatus'][$c]['pathSuffix'] = htmlentities($ff);
				$data['FileStatus'][$c]['type'] = 'FILE';
					}
            
        } $c++;
    }
    return $data;
}




?>
