/**
*@description
*游戏结束模块：显示游戏成功或失败，及分值
*@author 光光
*@mail   1148586347@qq.com	
*@date   2015-9-3
**/
;var gameObj = gameObj || {};
gameObj.State_gameover = function(){
	this.preload = function(){
		//根据游戏结果定义背景色
		if(gameObj.gameResult){
			this.game.stage.backgroundColor = '#53D769';
		}else{
			this.game.stage.backgroundColor = '#FC3E39';
		}
	};
	this.create = function(){
		//游戏模式
		this.label_mode = this.game.add.text(gameObj.gameWidth/2,115, gameObj.gameMode , {font: "45px 黑体 ",fill: "#fff"});
		this.label_mode.anchor.set(0.5);
		//判断游戏结果是否超过最高分，显示分值
		if(gameObj.gameResult){
			this.label_score = this.game.add.text(gameObj.gameWidth/2,235, gameObj.gameScore , {font: "55px Arial ",fill: "#000"});
       		this.label_score.anchor.set(0.5);
       		var tmp = localStorage.getItem("gameData_"+gameObj.gameModeCode);
       		if(gameObj.gameMode == '经典模式'){
       			if(tmp > gameObj.gameScore || tmp == 0){
					this.label_jl = this.game.add.text(gameObj.gameWidth/2,300, "新纪录" , {font: "40px Arial ",fill: "#f00"});
					this.label_jl.anchor.set(0.5);
					localStorage.setItem("gameData_"+gameObj.gameModeCode , gameObj.gameScore);
				}
       		}else{
       			if(tmp < gameObj.gameScore){
					this.label_jl = this.game.add.text(gameObj.gameWidth/2,300, "新纪录" , {font: "40px Arial ",fill: "#f00"});
					this.label_jl.anchor.set(0.5);
					localStorage.setItem("gameData_"+gameObj.gameModeCode , gameObj.gameScore);
				}
       		}
		}else{
			gameObj.gameScore = 0;
			this.label_score = this.game.add.text(gameObj.gameWidth/2,235, "失败了" , {font: "55px Arial ",fill: "#000"});
      		this.label_score.anchor.set(0.5);
		}
		//返回键
		this.label_home = this.game.add.text(gameObj.gameWidth/2-50,410, "返回" , {font: "35px Arial ",fill: "#fff"});
        this.label_home.anchor.set(0.5);
        this.label_home.inputEnabled = true;
        this.label_home.events.onInputDown.add(function(){
			gameObj.game.state.start('homepage');
		},this)
        //重玩键
		this.label_restart = this.game.add.text(gameObj.gameWidth/2+50,410, "重玩" , {font: "35px Arial ",fill: "#fff"});
        this.label_restart.anchor.set(0.5);
        this.label_restart.inputEnabled = true;
        this.label_restart.events.onInputDown.add(function(){
			gameObj.game.state.start(gameObj.gameModeCode);
		},this);
	};
};