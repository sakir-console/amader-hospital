<?php

namespace Pion;

class Pion{
    public static bool $again = false;
    use Job, Job\Basic;
    public static function run(array $cmd){
        /**
         * First load the configurations
         */
        Config::load();

        if(!isset($cmd[0])){
            /**
             * No commnad specified, let's turn on the live mode
             */
            self::$again = true;
            self::readCmd();
            return;
        }
        self::runCmd($cmd);
    }

    public static function runCmd(array $cmd){
        $fn = $cmd[0];
        if($fn == 'help' || $fn == '-help'){
            self::help();
            if(self::$again){
                return self::readCmd();
            }else{
                return;
            }
        }
        
        $fn = ltrim($fn, '-');
        $obj = new Pion;
        if(!method_exists($obj, $fn)){
            echo 'Invalid command '.$cmd[0].'! Run `help` to see the menu!'.PHP_EOL;

            if(self::$again){
                return self::readCmd();
            }else{
                return;
            }
        }
        
        array_shift($cmd);
        try {
            call_user_func([$obj, $fn], $cmd);
        } catch (\Throwable $th) {
            Color::red();
            echo $th->getMessage();
            Color::reset();
            echo "\n".$th->getTraceAsString();   
        }
        if(self::$again){
            echo PHP_EOL;
            self::readCmd();
        }
    }

    public static function help(){
        echo PHP_EOL;
        echo '---------------------------------------------------------------------------'.PHP_EOL.PHP_EOL;
        echo '-help                         Show help menu'.PHP_EOL;
        echo '-url <base url>               Set the base url'.PHP_EOL;
        echo '-channel <channel>            Change or add new channel'.PHP_EOL;
        echo '-config [key, val]            See or set config'.PHP_EOL;

        echo '-login                        Login to the server.'.PHP_EOL;

        
        echo '-req <url> [key, val, ...]    Post Reguest to an url.'.PHP_EOL;

        echo '-ls <path>                    List files of specified directory'.PHP_EOL;
        echo '-ren <old> <new> [--dir]      Rename a file '.PHP_EOL;
        echo '                              add -dir to rename whole path'.PHP_EOL;
        echo '-upload <to_dir> <files>      Upload specified file(if not exists.PHP_EOL;.'.PHP_EOL;
        echo '-rm <file> [--dir]            Remove a file'.PHP_EOL;
        echo '                              --dir if path is a directory'.PHP_EOL;

        echo '-query                        Goto query mode'.PHP_EOL;

        echo '-push                         Push to remote site'.PHP_EOL;
        echo '-push -d <dir>                Push all files of that directory'.PHP_EOL;
        echo '-push -f <file1> <fil2> ...   Push specific files'.PHP_EOL;
        echo '                              -y to skip confirming each files'.PHP_EOL;
        echo '                              -s to upload files one by one'.PHP_EOL;
        
        echo PHP_EOL.PHP_EOL;
    }

    
    public function exit(){
        self::$again = false;
    }

    public static function clear(int $length = 0){
        echo "\r";
        for($i = 0; $i < $length; $i++){
            echo ' ';
        }
        echo "\r";
    }
}