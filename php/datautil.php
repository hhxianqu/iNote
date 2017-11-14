<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/11/13
 * Time: 上午12:25
 */

$db = new SQLite3('../data/inote.db');

//$sql = <<<EOF
//    select * from test;
//EOF;
//
//$ret = $db->query($sql);
//while ($row = $ret->fetchArray(SQLITE3_ASSOC)) {
//    echo "id = " . $row['id'] . "\n";
//    echo "name = " . $row['name'] . "\n";
//    echo "\n";
//}
//
//$db->close();