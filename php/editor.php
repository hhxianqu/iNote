<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/11/14
 * Time: 上午12:38
 */

header("Content-Type:text/html;charset=utf-8");

if (isset($_POST['submit'])) {
    echo "<pre>";
    echo htmlspecialchars($_POST["test-editormd-markdown-doc"]);
    echo "<br/><br/>";
    echo htmlspecialchars($_POST["test-editormd-html-code"]);
    echo "</pre>";
}