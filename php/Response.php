<?php
/**
 * Created by PhpStorm.
 * User: huangxiao
 * Date: 2017/12/4
 * Time: 下午2:47
 */

class Response
{
    public $isNormal;          // 是否正常
    public $message;           // 提示信息

    /**
     * Response constructor.
     * @param $isNormal
     * @param $message
     */
    public function __construct($isNormal, $message)
    {
        $this->isNormal = $isNormal;
        $this->message = $message;
    }

    /**
     * Response对象转JSON
     * @return string
     */
    public function toJson()
    {
        return json_encode($this);
    }

}