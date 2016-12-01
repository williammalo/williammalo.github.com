<?php
error_reporting(0);

require_once('../Connections/justhefaxx.php');

list($vin, $reports) = explode(",", $_REQUEST['vin']);

if(strlen($vin) === 17) {

	//conection:
	$link = mysqli_connect($hostname_justhefaxx, $username_justhefaxx, $password_justhefaxx, $database_justhefaxx) or die("Connection Error " . mysqli_error($link));

	if($reports == 'all') {
		//consultation (Both PASS & FAIL):
		$query = "SELECT * FROM vehicles WHERE location_id<>'99' AND vin='".$vin."'ORDER BY id DESC LIMIT 1" or die("Error in the consult.." . mysqli_error($link));
	} else {
		//consultation (Only PASS):
		$query = "SELECT * FROM vehicles WHERE mfstructural_specs='PASS' AND location_id<>'99' AND vin='".$vin."'ORDER BY id DESC LIMIT 1" or die("Error in the consult.." . mysqli_error($link));
	}

	//execute the query.
	$result = $link->query($query);

	//number of results:
	$row_cnt = $result->num_rows;

	//display information:
	if($row_cnt === 1) {

		while($row = mysqli_fetch_array($result)) {
			$id = $row['id'];
			$pass_fail = $row['mfstructural_specs'];
			$len = strlen((string) $id);
		 	$special_code = substr($vin, 2, 7 - $len) . $id;
			$url = "http://admin.trueframereport.com/rlink.php?rep=".md5($special_code);
			if($pass_fail == 'PASS') {
				echo '<a href="'.$url.'" title="See this vehicles report by TrueFrame" target="_blank"><img src="http://admin.trueframereport.com/images/trueframereport_embed_pass.jpg" border="0" alt="TrueFrame Report" /></a>';
			} elseif($pass_fail == 'FAIL') {
				echo '<a href="'.$url.'" title="See this vehicles report by TrueFrame" target="_blank"><img src="http://admin.trueframereport.com/images/trueframereport_embed_fail.jpg" border="0" alt="TrueFrame Report" /></a>';
			}
		}
	} else {
		echo '<!-- No report found -->';
	}

} else {
	 header('Location: http://www.trueframereport.com');
}

?>
