var game={
	data:null,//保存二位数组,其中保存游戏所有格子的数据
	RN:4,//行数
	CN:4,//列数
    score:0,//保存分数
    state:1,//保存游戏的状态
    GAMEOVER:0,//游戏结束
	RUNNING:1,//游戏运行中
    CELLSIZE:100,//每个格子的宽度
    OFFSET:16,//间距
    top:0,

    init:function(){//初始化游戏的格子div
	   //r从0开始，到<RN结束，同时声明空数组arr
	   for(var r=0,arr=[];r<this.RN;r++){
	      //c从0开始，到<CN结束
		  for(var c=0;c<this.CN;c++){
		       //向arr中压入:""+r+c
		    arr.push(""+r+c);
		  }
	   }
	   //设置id为gridPanel的div的内容为：
        gridPanel.innerHTML='<div id="g'+
            arr.join('" class="grid"></div><div id="g')+
           '" class="grid"></div>';
        //向gridPanel的内容中追加:
        gridPanel.innerHTML+='<div id="c'+
            arr.join('" class="cell"></div><div id="c')+
           '" class="cell"></div>';
       //计算gridPanel的宽度,保存在变量width中:
       var width= this.CELLSIZE*this.CN+this.OFFSET*(this.CN+1);
        //设置gridPanel的style的width为width+"px"
        gridPanel.style.width=width+"px";
        //计算gridPanel的高度,保存在变量height中:
        var height= this.CELLSIZE*this.RN+this.OFFSET*(this.RN+1)
        //设置gridPanel的style的height为height+"px"
        gridPanel.style.height=height+"px";
	},

	start:function(){//启动游戏
         //读取cookie中的最高分
        if(document.cookie.trim()!=""){
              this.top=parseInt(document.cookie.slice(4));
        };
		console.log("初始值"+this.top);
		this.init();//动态生成单元格div
        this.state=this.RUNNING;//初始化游戏状态为运行中
        this.score=0;//分数清零
		 //初始化二维数组
		 //创建空数组，保存在当前对象的data属性中
		this.data=[];
		//r从0开始，到<RN结束，每次增1
		for(var r=0;r<this.RN;r++){
			this.data[r]=[];//先向data中压入一个空数组
			//c从0开始，到<CN结束，每次增1
			for(var c=0;c<this.CN;c++){
				this.data[r][c]=0;//向data中r行压入一个0
			}
		}//(遍历结束)
       //生成2个随机数
        this.randomNum();
        this.randomNum();
		this.updateView();
        var me=this;//留住this
		console.log("san"+me.top);
        //响应键盘事件
        document.onkeydown=function(e){//this->document
           //e保存了事件发生时的信息
          switch(e.keyCode){//获得按键号
              case 37: me.moveLeft(); break;
              case 38: me.moveUp(); break;
              case 39: me.moveRight(); break;
              case 40: me.moveDown(); break;
          }
        }
	},
	randomNum:function(){//只负责生成一个随机数
     //反复执行
	   while(true){
		//在0~RN-1之间随机生成一个行号r
		var r=parseInt(Math.random()*this.RN);
		//在0~CN-1之间随机生成一个列号c
		var c=parseInt(Math.random()*this.CN);
		//如果data中r行c列为0
		if(this.data[r][c]==0){
		      //声明变量n,再生成一个随机数,如果<0.5,就n赋值为2,否则赋值为4
			//将n保存在data中r行c列的位置
			this.data[r][c]=Math.random()<0.5?n=2:n=4;
			break;//退出循环
		   }
	    }
	},
	updateView:function(){//专门将data中的元素，更新到页面
	 //遍历data中每个元素
     for(var r=0;r<this.RN;r++){
       for(var c=0;c<this.CN;c++){
         //用id找到当前元素对应的前景格，保存在div中
          var div=document.getElementById("c"+r+c);
          if(this.data[r][c]==0){//如果当前元素等于0
             div.innerHTML="";//设置div的内容为""
             div.className="cell";//设置div的class属性为cell
          }else{//否则
            //设置div的内容为当前元素的值
             div.innerHTML=this.data[r][c];
             //设置div的class属性为"cell n"+当前元素值
             div.className="cell n"+this.data[r][c];
          }
        }
     }
    //设置id为score的元素内容为当前对象的score属性
    score.innerHTML=this.score;
	console.log("第二部赋值"+this.top);
    top1.innerHTML=this.top;//显示最高分
    //设置id为finalScore的span内容为当前对象的score
    finalScore.innerHTML=this.score;
    //设置id为gameOver的div的display属性：
      //如果当前游戏的状态为GAMEOVER,就改为"block"
      //否则就改为"none"
    gameOver.style.display=
      this.state==this.GAMEOVER?"block":"none";
	},
    isGameOver:function(){
     for(var r=0;r<this.RN;r++){//遍历data中每个元素
       for(var c=0;c<this.CN;c++){
        //如果当前元素是0，就返回false
        if(this.data[r][c]==0){return false}
        else if(c<this.CN-1
              &&this.data[r][c]==this.data[r][c+1]){
        //否则,如果c<CN-1,且当前值等于右侧值
          return false;//就返回false
        }else if(r<this.RN-1
              &&this.data[r][c]==this.data[r+1][c]){
        //否则,如果r<RN-1,且当前值等于下方值
          return false;//就返回false
        }
      }
     }//(遍历结束)
     return true;//返回true
    },
	moveUpInCol:function(c){//上移第C列
	   //r从0开始，到RN-1结束，每次增1
	   for(r=0;r<this.RN-1;r++){
	       //查找r行c列下方下一个不为0的数的位置，保存在nextr中
           
		   var nextr=this.getDownInCol(r,c);
		   if(nextr==-1){break;}//如果没找到，就退出循环
		   else if(this.data[r][c]==0){//否则，如果data中r行c列的值等于0
		      //将data中nextr行C列的值替换给r行c列的元素
			  this.data[r][c]=this.data[nextr][c];
			  this.data[nextr][c]=0;//将data中nextr行c列位置为0
			  r--;//让r留在原地
		   }else if(this.data[r][c]==this.data[nextr][c]){
		      //将data中
			  this.data[r][c]*=2;
			  this.score+=this.data[r][c];
			  this.data[nextr][c]=0;
		   }
	   }
	},
	getDownInCol:function(r,c){   
	   for(var nextr=r+1;nextr<this.RN;nextr++){
	      if(this.data[nextr][c]!=0){
		    return nextr;
		  }	   
	   }
	   return -1;	
	},
    moveDownInCol:function(c){
	  for(var r=this.RN-1;r>0;r--){
      var prevr=this.getUpInCol(r,c);
      if(prevr==-1){break;}
      else if(this.data[r][c]==0){
        this.data[r][c]=this.data[prevr][c];
        this.data[prevr][c]=0;
        r++;
      }else if(this.data[r][c]==this.data[prevr][c]){
        this.score+=(this.data[r][c]*=2);
        this.data[prevr][c]=0;
        //将当前元素的值累加到score上
      }
    }
	},
	getUpInCol:function(r,c){
	   for(var prevr=r-1;prevr>=0;prevr--){
          if(this.data[prevr][c]!=0){
             return prevr;
          }
       }
       return -1;
	},	
	moveRightInRow:function(r){//右移第r行
	   for(var c=this.CN-1;c>0;c--){
	     var prevc=this.getPrevInRow(r,c);
         if(prevc==-1){break;}
         else if(this.data[r][c]==0){
		    this.data[r][c]=this.data[r][prevc]; 
            this.data[r][prevc]=0;
            c++;
		 }else if(this.data[r][c]==this.data[r][prevc]){
		    this.data[r][c]*=2;	//将当前元素的值*2；
			this.score+=this.data[r][c];
			this.data[r][prevc]=0;//将data中r行nextc列的值重置为0
		 }
	  }
	},
	getPrevInRow:function(r,c){//找r行c列左侧前一个不为0的位置
	   for(var prevc=c-1;prevc>=0;prevc--){
	       if(this.data[r][prevc]!=0){
			  return prevc;  
		   }
	   }
        return -1;
	},	 
	moveLeftInRow:function(r){//负责左移动第r行
	 
	  //c从0开始，到<CN-1结束，每次增1
	  for(c=0;c<(this.CN-1);c++){
	     //查找data中r行c列之后下一个不为0的数位置，保存在变量nextc中
		 var nextc=this.getNextInRow(r,c);
		 //如果没找到，就直接退出循环
		 if(nextc==-1){break;}
		 else if(this.data[r][c]==0){//否则，如果当前元素等于0
		    //将data中r行nextc列中的值替换为当前元素
            this.data[r][c]=this.data[r][nextc];
			//将data中r行nextc列的值重置为0
            this.data[r][nextc]=0;
			//让c留在原地
			c++;
		 }else if(this.data[r][c]==this.data[r][nextc]){//否则，如果当前元素等于nextc列的元素值
		    this.data[r][c]*=2;	//将当前元素的值*2；
			this.score+=this.data[r][c];
			this.data[r][nextc]=0;//将data中r行nextc列的值重置为0
		    
		 }
       }
	},
	//在r行之后找到c列之后不为0的位置，找到返回下标，没找到返回-1
    getNextInRow:function(r,c){
	  //nextc从c+1开始，到<CN结束，每次增1
	  for(var nextc=c+1;nextc<this.CN;nextc++){
	     //如果data中r行nextc列的值不等于0
		 if(this.data[r][nextc]!=0){
		     //返回nextc
	         return nextc;
		 }//遍历结束
	  }
	  return -1; //返回-1
	},
	move:function(fun){
	   var before=String(this.data);
       /*window.*/fun();//fun中的this->window
       var after=String(this.data);
	   if(before!=after){
		      this.randomNum();
              //如果游戏结束，就设置游戏的状态为GAMEOVER
              if(this.isGameOver()){
				    console.log("dd");
                    this.state=this.GAMEOVER;
					console.log("aa");
					console.log(this.top);
					 console.log(this.score);
                    if(this.score>this.top){
		                   console.log("cc");
                           var date=new Date("2020/01/01");
                           document.cookie="top="+this.score+";expires="+date.toGMTString();
                    }
              };
              this.updateView();
	    }
	},
	//往左移动
    moveLeft:function(){
	  var me=this;
      this.move(function(){//希望this->game
         for(var r=0;r<me.RN;r++){//r从0开始，到<RN结束，每次增1
           me.moveLeftInRow(r);//调用moveLeftInRow,传入r作为参数
         }//(遍历结束)
      });
	},
	//往右移动
	moveRight:function(){//右移所有行
		var me=this;
        this.move(function(){ 
			for(r=0;r<me.RN;r++){
		     me.moveRightInRow(r);
		    }
		});
	},
	//往上移动
	moveUp:function(){
	   var me=this;
	   this.move(function(){
		   for(var c=0;c<me.CN;c++){ //c从0开始，到<CN结束，每次增1
	          //上移第c列
		    me.moveUpInCol(c);
	       }
	    }); 
	},
	//往下移动
	moveDown:function(){
	    var me=this;
        this.move(function(){
          for(var c=0;c<me.CN;c++){//c从0开始，到<CN结束，每次增1
           me.moveDownInCol(c);//上移第c列
          }
        });
	},
}
window.onload=function(){
	game.start();
}