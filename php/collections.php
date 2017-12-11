<?php
/**
 * 获取用户收藏笔记
 * 无需参数，用户名通过cookie获取
 *
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/10
 * Time: 下午2:28
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

if (isset($_COOKIE['user'])) {
    $username = $_COOKIE['user'];

    $result = array();

    $sql = "select n.*
            from collect c, note n 
            where c.username = '$username' and c.note_id = n.id
            order by c.id desc";

    $res = $db->query($sql);
    if ($res) {
        $i = 0;
        while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
            $result[$i++] = $row;
        }
        echo json_encode($result);
    } else {
        die($db->lastErrorMsg());
    }

} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}