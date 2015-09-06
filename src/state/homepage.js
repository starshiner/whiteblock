/**
*@description
*游戏主菜单：游戏模式选择，查看排行榜，游戏音效设置
*@author 光光
*@mail   1148586347@qq.com	
*@date   2015-9-3
**/
;var gameObj = gameObj || {};
gameObj.State_homepage = function(){
	this.preload = function(){
        this.game.stage.backgroundColor = "#fff";
    };
	this.create = function(){
		//添加游戏按钮
		this.addMenuBtn(0,0,'black_bg','经典','classic');
		this.addMenuBtn(184,0,'white_bg','街机','arcade');
		this.addMenuBtn(0,176,'white_bg','禅','zen');
		this.addMenuBtn(184,176,'black_bg','接力','relay');
		if(gameObj.musicSwitch){
			this.addMenuBtn(0,352,'black_bg','音效开','music');
		}else{
			this.addMenuBtn(0,352,'black_bg','音效关','music');
		}
		this.addMenuBtn(184,352,'white_bg','排行榜','showrank');
	};
	//=================================================
	//添加按钮函数
	//@param {number} x    按钮x位置
	//@param {number} y    按钮y位置
	//@param {string} bg   按钮背景
	//@param {string} name 按钮名称
	//@param {string} to   按钮链接
	//=================================================
	this.addMenuBtn = function(x,y,bg,name,to){
		var color = null;
		if(bg == 'black_bg'){
			color = '#fff';
		}else{
			color = '#000';
		}
		var objBtn = new Array();
		objBtn[to] = this.game.add.sprite(x, y, bg);
		objBtn[to].inputEnabled = true;
		objBtn[to].objText =  this.game.add.text(x+91,y+87, name , {font: "35px Arial ",fill: color});
		objBtn[to].objText.anchor.set(0.5);
        objBtn[to].events.onInputDown.add(function(){
        	if(to != 'music'){
        		gameObj.game.state.start(to);
        	}else{
        		if(gameObj.musicSwitch){
        			objBtn['music'].objText.text = "音效关";
        			gameObj.musicSwitch = false;
        		}else{
        			objBtn['music'].objText.text = "音效开";
        			gameObj.musicSwitch = true;
        		}
        	}
		},this);
	};
};