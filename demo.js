    class All extends React.Component{
    	constructor(props){
    		super(props);
    		this.state={
    			style:''
    		};
    	}
    	componentDidMount(){
    		var b=this;
    		var request=new XMLHttpRequest();
    		request.responseType='json';
    		request.open('GET','style.json');
    		request.onreadystatechange=function(){
    			if(this.readyState===4&&this.status===200){
					b.setState({
						style:this.response
					});
					console.log(b.state.style);
    			}
    		}
    		request.setRequestHeader('Content-Type','application/json');
    		request.send();
    	}
    	render(){
    		return(
				<div>
					<Header style={this.state.style}/>
					<Body style={this.state.style} />
					<Footer style={this.state.style} />
				</div>
    		);
    	}
    }
	class Header extends React.Component{
		constructor(props){
			super(props);				
		}
		render(){
			return (
				<div className={'header'} style={this.props.style.header}>
					<a className={'a_1'} style={this.props.style.a_1} href={'demo.html'}>首页</a>
					<a className={'a_2'} style={this.props.style.a_2} href={'b.html'}>写博客</a>
					<a className={'a_3'} style={this.props.style.a_3} href={'c.html'}> 管理</a>
				</div>
			);
		}
	}
	class Body extends React.Component{
		constructor(props){
			super(props);
			this.state={
				number:''
			};
			this.handleChange=this.handleChange.bind(this);
		}
		handleChange(number){
			this.setState({number:number});
			console.log(this.state.number); 
		}
		render(){
			return <Detail style={this.props.style}/>;
		}
	}
	class Detail extends React.Component{
		constructor(props){
			super(props);
			this.state={
				a:'',
				p:'',
				article:'',
				type:true,
				title:'',
				article_1:'',
				number:'',
				numberBefore:'',
				numberNow:'',
			};
			this.getDetail=this.getDetail.bind(this);
		}
		getDetail(){
			var id=event.target.dataset.id;
			var request=new XMLHttpRequest();
			var b=this;	
			request.responseType='document';
			request.open('GET','select.php?q='+id);
			request.onreadystatechange=function(){
				if(this.readyState===4&&this.status===200){
					var title=request.response.querySelector('p');
					var article=request.response.querySelector('article');
					b.setState({
						title:title,
						article_1:article,
						type:false,
						number:id,
						numberBefore:b.state.numberNow,
						numberNow:id
					});
				}
			};
			request.setRequestHeader('Content-Type','text/html');
			request.send();
			
		}
		componentDidMount(){
			var request=new XMLHttpRequest();
			var b=this;	
			request.responseType='document';
			request.open('GET','select.php');
			request.onreadystatechange=function(){
				if(this.readyState===4&&this.status===200){
					var a=request.response.querySelectorAll('a');
					var p=request.response.querySelectorAll('p');
					var article=request.response.querySelectorAll('article');
					b.setState({
						a:a,
						p:p,
						article:article
					});
				}
			};
			request.setRequestHeader('Content-Type','text/html');
			request.send();
				
		}
		render(){
			var arr=[];
			var brr=[];
			for(let i=0;i<this.state.a.length;i++){
				var node=<div style={this.props.style.div}>
							<a href={'javascript:void(0)'} data-id={this['state']['a'][i].innerHTML} style={this.props.style.font_a} onClick={this.getDetail}>{this['state']['p'][i].innerHTML}</a>
							<article style={this.props.style.font_b}>{this['state']['article'][i].innerHTML}</article>
				         </div>;
				var node_1=<div style={this.props.style.div_1}>
								<a href={'javascript:void(0)'} data-id={this['state']['a'][i].innerHTML} style={this.props.style.font_a} onClick={this.getDetail}>{this['state']['p'][i].innerHTML}</a>
							</div>;
				arr.push(node);
				brr.push(node_1);
			}
			return <div style={this.props.style.bodyFather}>
						<div style={this.props.style.body}>
							<div style={this.props.style.left}><p style={{'fontSize':'15px','fontWeight':'bold'}}>最近文章</p>{brr}</div>
							<div style={this.props.style.right}>
								{this.state.type ? arr : <div><p style={this.props.style.title}>{this.state.title.innerHTML}</p><article style={this.props.style.article}>{this.state.article_1.innerHTML}</article></div>}
							</div>
						</div>
						{this.state.number!=='' ? <CommentBox style={this.props.style} number={this.state.number}/> : ''}
						{this.state.number!=='' ? <Barrage style={this.props.style} number={this.state.number} /> : ''}
					</div>;
		}
	}
	class CommentBox extends React.Component{
		constructor(props){
			super(props);
			this.state={
				comment:'',
				title:'',
				clear:false
			};
			this.handleChange=this.handleChange.bind(this);
			this.update=this.update.bind(this);
		}
		handleChange(){
			this.setState({
				comment:event.target.value
			});
		}
		componentWillReceiveProps(nextProps){
			if(this.props.number!==nextProps.number){
				this.setState({
					title:'呵呵'
				});
			}else{
				this.setState({
					title:'么么'
				});
			}
		}
		update(){
            var request=new XMLHttpRequest();
            request.responseType='json';
            request.open('GET','insertComment.php?q='+this.state.comment+'&id='+this.props.number);
            request.onreadystatechange=function(){
            	if(this.readyState===4&&this.status===200){
            		alert('回复成功');
            	}
            };
            request.setRequestHeader('Content-Type','application/json');
            request.send();
            this.setState({
            	clear:true
            });
		}
		render(){
			return <div style={this.props.style.commentBox}>
						<p style={this.props.style.commentP}>回复</p>
						<textarea style={this.props.style.textarea} onChange={this.handleChange}></textarea>
						<button style={this.props.style.button} onClick={this.update}>回复</button>
			       </div>;
		}
	}
	class Barrage extends React.Component{
		constructor(props){
			super(props);
			this.state={
				comment:''
			};
		}
		componentWillMount(){
			function request(url){
				var request=new XMLHttpRequest();
				request.responseType='document';
				request.open('GET',url);
				request.onreadystatechange=function(){
					if(this.readyState===4&&this.status===200){
						var response=request.response;
                    	b.setState({
                    		comment:response.querySelectorAll('p')
                    	});
                	}
				};
				request.setRequestHeader('Content-Type','text/html');
				request.send();
			}
			var b=this;
			this.timer=setInterval(function(){
				request('selectComment.php?id='+b.props.number);
				console.log(b.state.comment);		
			},4000);
		
		}
		componentWillReceiveProps(nextProps){
			function request(url){
				var request=new XMLHttpRequest();
				request.responseType='document';
				request.open('GET',url);
				request.onreadystatechange=function(){
					if(this.readyState===4&&this.status===200){
						var response=request.response;
                    	b.setState({
                    		comment:response.querySelectorAll('p')
                    	});
                	}
				};
				request.setRequestHeader('Content-Type','text/html');
				request.send();
			}
			var b=this;
			if(this.props.number!==nextProps.number){
				if(this.timer){
					clearInterval(this.timer);
				}
				this.timer=setInterval(function(){
					request('selectComment.php?id='+nextProps.number);
				},2000);			
			}
			console.log(this.state.comment);
		}
		render(){
			var arr=[];
			for(let i=0;i<this.state.comment.length;i++){
				var node=<Fly comment={this['state']['comment'][i].innerHTML} />;
				arr.push(node);
			}
			return <div style={this.props.style.barrageDiv}>{arr}</div> ;
		}
	}
	class Fly extends React.Component{
		constructor(props){
			super(props);
			this.state={
				timer:0,
			};
		}
		componentWillMount(){
			var b=this;
			var i=0;
			this.timer=setInterval(function(){
				if(i<800){
					b.setState({
						timer:i++
					});
					console.log(i);
				}else{
					clearInterval(b.timer);
				}				
			},2);
		}
		render(){
			return <div>{this.state.timer < 790 ?<p style={{'color':'red','position':'relative','right':this.state.timer+'px'}}>{this.props.comment}</p> : ''}</div>;
		}
	}
	class Footer extends React.Component{
		constructor(props){
			super(props);
		}
		render(){
			return <div style={this.props.style.footer}><p>Powerd by Osar</p></div>;
		}
	}
	ReactDOM.render(<All />,document.querySelector('#example'));