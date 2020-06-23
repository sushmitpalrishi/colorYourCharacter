<?php 


$img = $_POST['imgBase64'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);

$fi = new FilesystemIterator('userskeches', FilesystemIterator::SKIP_DOTS);
$count = iterator_count($fi)+1;
//$date = getdate();
$fileName = 'userskeches/skech'.$count.'.jpg';

if(file_put_contents($fileName, $fileData)){
	echo $count;
}else{
	echo "false";
}
