<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/4
 * Time: 上午11:03
 */

header("Content-Type:text/html;charset=utf-8");

if (isset($_POST['submit'])) {
    echo "<pre>";
    echo htmlspecialchars($_POST["markdown"]);
    echo "<br/><br/>";
    echo htmlspecialchars($_POST["html"]);
    echo "</pre>";
}