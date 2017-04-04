<?php 
  	class connect{
		protected $servername;
		protected $username;
		protected $password;
		public function __construct($servername,$username,$password){
			$this->servername=$servername;
			$this->username=$username;
			$this->password=$password;
		}
		public function query($sql,$dbname){
			$con=mysql_connect($this->servername,$this->username,$this->password);
			mysql_query("set names 'utf8'");
			mysql_selectdb($dbname,$con);
			$response=mysql_query($sql);
			return $response;
		}
	}
	$q=$_GET['q'];
	$id=$_GET['id'];
	$number=mt_rand(1000,9999);
	echo '<a>'.$q.'</a>';
	$con=new connect('localhost','root','zqr3344');
	$s='comment'.$id;
	$sql="INSERT INTO `$s` (`number`, `comment`,`type`) VALUES ('$number', '$q',1)";
	$con->query($sql,'blog');
 ?>