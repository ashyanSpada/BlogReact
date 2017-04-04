
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
	$con=new connect('localhost','root','zqr3344');
	$Id=$_GET['q'];
	if(!$Id){
		$sql="SELECT * FROM `blog`";
	}
	else{
		$sql="SELECT * FROM `blog` WHERE Id='$Id'";
	}
	$response=$con->query($sql,'blog');
	while($row=mysql_fetch_array($response)){
  		echo '<a>'.$row['Id'].'</a>';
  		echo '<p>'.$row['Title'].'</p>';  
  		echo '<article>'.$row['Article'].'</article>';	
  	}
?>
