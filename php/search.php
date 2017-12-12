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
$result['note'] = array();
$result['notebook'] = array();

// 获取笔记
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
        $result['note'][$i++] = $row;
    }
} else {
    die($db->lastErrorMsg());
}

// 获取笔记本
$sql = "select notebook.*, count(note.id) as number
            from notebook
              left join note
                on notebook.username = note.username and notebook.name = note.notebook
            where notebook.name like '%$keywords%'
            group by notebook.id
            order by number desc;";

$res = $db->query($sql);
$i = 0;
if ($res) {
    while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
        $result['notebook'][$i++] = $row;
    }
} else {
    die($db->lastErrorMsg());
}

echo json_encode($result);
