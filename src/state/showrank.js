/**
*@description
*排行榜模块：通过ajax进行数据交互，并读取本地localstorage
*@author 光光
*@mail   1148586347@qq.com	
*@date   2015-9-3
**/
;var gameObj = gameObj || {};
gameObj.State_showrank = function(){
	this.preload = function(){
		this.game.stage.backgroundColor = "#000";
	};
	this.create = function(){
		//添加游戏表格
		gameObj.onShowRank = true;
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 4; j++) {
				this.spt = this.game.add.sprite(92*j+1,88*i+1,'white_bg');
				this.spt.scale.set(0.472);
			};
		};
		//基本文字介绍
		this.lable_score = this.game.add.text(12, 5, "←" , {font: "60px Arial",fill: "#f00"});
		this.lable_score.inputEnabled = true;
		this.lable_score.events.onInputDown.add(function(){
			gameObj.onShowRank = false;
        	gameObj.game.state.start("homepage");
		},this);
		this.game.add.text(110, 15, "排" , {font: "50px Arial",fill: "#000"});
		this.game.add.text(205, 15, "行" , {font: "50px Arial",fill: "#000"});
		this.game.add.text(295, 15, "榜" , {font: "50px Arial",fill: "#000"});
		this.game.add.text(15, 110, "模式" , {font: "30px Arial",fill: "#000"});
		this.game.add.text(115, 105, "个人" , {font: "20px Arial",fill: "#000"});
		this.game.add.text(105, 125, "最高分" , {font: "20px Arial",fill: "#000"});
		this.game.add.text(208, 105, "玩家" , {font: "20px Arial",fill: "#000"});
		this.game.add.text(207, 125, "名次" , {font: "20px Arial",fill: "#000"});
		this.game.add.text(300, 105, "玩家" , {font: "20px Arial",fill: "#000"});
		this.game.add.text(290, 125, "最高分" , {font: "20px Arial",fill: "#000"});
		this.game.add.text(15, 200, "经典" , {font: "30px Arial",fill: "#000"});
		this.game.add.text(15, 290, "街机" , {font: "30px Arial",fill: "#000"});
		this.game.add.text(15, 377, "禅" , {font: "30px Arial",fill: "#000"});
		this.game.add.text(15, 467, "接力" , {font: "30px Arial",fill: "#000"});
		//读取localstorage数据，展示个人最高分
		gameObj.dataArr = new Array();
		this.gameNameArr = ['classic','arcade','zen','relay'];
		for (var i = 0; i < 4; i++) {
			gameObj.dataArr[i] = new Array();
			for (var j = 0; j < 3; j++) {
				gameObj.dataArr[i][j] = this.game.add.text(93*(j+1)+43, 186+89*i+35, "-" , {font: "20px Arial",fill: "#000"});
				gameObj.dataArr[i][j].anchor.set(0.5);
			};
		};
		for (var i = 0; i < this.gameNameArr.length; i++) {
			gameObj.dataArr[i][0].text = localStorage.getItem("gameData_"+this.gameNameArr[i]); 
		};
		//读取服务器数据，展示排名及玩家最高分
		var xhr = new xhrFactory();//实例化
		var pm0 = {},pm1 = {},pm2 = {},pm3 = {};
		var pm = ["pm0","pm1","pm2","pm3"];
		for (var i = 0; i < 4; i++) {
			this.getDate(pm,localStorage.getItem("gameData_"+this.gameNameArr[i]),i,xhr);
		};
	};
	//==============================================
	//获取数据函数
	//@param {object} pm 数据对象
	//@param {number} score 分值
	//@param {number} item 游戏模式
	//@param {object} xhr xhr对象
	//==============================================
	this.getDate = function(pm,score,item,xhr){
		var tmp = {
			name : pm[item],
        	url : "http://xingguang123.sinaapp.com/whiteblock.php",
        	data : {username:gameObj.username , score: score ,item : item },
        	dataType : "jsonp",
        	success : function(data){
				if(gameObj.onShowRank){
					gameObj.dataArr[item][1].text = data[1];
					gameObj.dataArr[item][2].text = data[0];
				}
        	}
        }
        switch(item){
        	case 0: pm0 = tmp;break;
        	case 1: pm1 = tmp;break;
        	case 2: pm2 = tmp;break;
        	case 3: pm3 = tmp;break;
        }
        //执行ajax
        xhr.ajax(tmp);
	};
};