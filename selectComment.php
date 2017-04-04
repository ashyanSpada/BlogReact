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
	$id=$_GET['id'];
	$con=new connect('localhost','root','zqr3344');
	$s='comment'.$id;
	$sql="SELECT * FROM `$s` WHERE `type`=1";
	$response=$con->query($sql,'blog');
	while($row=mysql_fetch_array($response)){
  		echo '<a>'.$row['number'].'</a>';
  		echo '<p>'.$row['comment'].'</p>';  
  	}
  	$sql="UPDATE `$s` SET `type`=0";
  	$con->query($sql,'blog');
?>
