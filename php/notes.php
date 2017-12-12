<?php
/**
 * 获取用户笔记列表
 * 用户名通过cookie获取
 * 可选参数 notebook 指定笔记本名称，获取该笔记本中笔记
 *
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/5
 * Time: 下午4:24
 */

header("Content-Type:application/json;charset=utf-8");

require ('datautil.php');

if (isset($_COOKIE["user"])) {
    $username = $_COOKIE['user'];
    $notebookName = null;

    if (isset($_POST["id"])) {
        $notebookId = $_POST["id"];
        $sql = "select name, username from notebook where id = $notebookId";
        $res = $db->querySingle($sql, true);
        $username = $res["username"];
        $notebookName = $res["name"];
    }

    $result = array();

    $sql = "select n.*, count(c.id) as collection
            from note n 
            left join collect c 
            on n.id = c.note_id 
            where n.username = '$username' ";

    if ($notebookName !== null) {
        $sql .= " and n.notebook = '$notebookName' ";
    }

    $sql .= "group by n.id ";
    $sql .= "order by n.time desc;";

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
} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "您尚未登录";
}
