<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午10:36
 */

header("Content-Type:application/json;charset=utf-8");

require ("datautil.php");

$keywords = $_GET["keywords"];

$result = array();

$sql = "select n.*, count(c.id) as collection
        from note n 
          left join collect c 
            on n.id = c.note_id 
        where n.title like '%$keywords%' 
        group by n.id 
        order by time desc;";

$res = $db->query($sql);

$i = 0;
if ($res) {
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
        $result[$i++] = $row;
    }
    echo json_encode($result);

} else {
    die($db->lastErrorMsg());
}
