<?php

namespace Pion;

use Pion\Job\Pusher;

trait Job{
    public static function readCmd(){
        $line = trim(readline('$ '));
        if(!$line){
            self::readCmd();
        }else{
            $cmd = explode(' ', $line);
            self::runCmd($cmd);
        }
    }


    public function login(){
        Http::login();
    }

    public function get(array $url){
        $url = $url[0]??'';
        if(!$url){
            $url = readline('Enter url: ');
        }
        echo Http::get($url);
    }


    public function channel($cmd){
        Config::channel($cmd[0]??false);
    }

    public function push(array $cmd){
        (new Pusher())->push($cmd);
    }

}