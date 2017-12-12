<?php
/**
 * Created by IntelliJ IDEA.
 * User: apple
 * Date: 2017/12/12
 * Time: 18:14
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "select * from notebook where id = $id";
    $res = $db->querySingle($sql, true);
    if ($res) {
        echo json_encode($res);
    } else {
        echo json_encode($db->lastErrorMsg());
    }
} else {
    die("参数错误");
}
