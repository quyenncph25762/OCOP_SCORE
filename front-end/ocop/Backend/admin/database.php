<?php
    Class Database{
        public $host = DB_HOST;
        public $user = DB_USER;
        public $pass = DB_PASS;
        public $dbname = DB_NAME;

        public $link;
        public $error;

        public function __construct(){
            $this->connectDB();
        }

        private function connectDB(){
            $this->link = mysqli_connect($this->host, $this->user, $this->pass, $this->dbname);
            if(!$this->link){
                $this->error = "Connection fail: " . mysqli_connect_error();
                return; // Không trả về false, chỉ đặt giá trị $this->error và kết thúc hàm
            }
        }
        

        //Select or read data
        public function select($query){
            $result = $this->link->query($query) or die($this->link->error.__LINE__);
            if($result->num_rows > 0){
                return $result;
            } else{
                return false;
            }
        }

        //insert data
        public function insert($query){
            $insert_row = $this->link->query($query) or die($this->link->error.__LINE__);
            if($insert_row){
                return $insert_row;
            } else{
                return false;
            }
        }

        //Update data
        public function update($query){
            $update_row = $this->link->query($query) or die($this->link->error.__LINE__);
            if($update_row){
                return $update_row;
            } else{
                return false;
            }
        }

        //Delate data
        public function delete($query){
            $delete_row = $this->link->query($query) or die($this->link->error.__LINE__);
            if($delete_row){
                return $delete_row;
            } else{
                return false;
            }
        }
    }
?>