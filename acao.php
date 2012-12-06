<?php
header("Access-Control-Allow-Origin: https://itunes.apple.com");
echo file_get_contents('http://getdeeplink.linksynergy.com/createcustomlink.shtml?'.rawurldecode($_GET['u']));
