/**
*@description
*游戏资源加载模块：加载全部游戏资源，声明游戏音效变量
*@author 光光
*@mail   1148586347@qq.com	
*@date   2015-9-3
**/
;var gameObj = gameObj || {};
gameObj.State_preload = function(){
	this.preload = function(){
		//游戏加载进度条
		this.lable = this.game.add.text(gameObj.gameWidth/2, 170, "loading..." , {font: "30px Arial",fill: "#000"});
        this.lable.anchor.set(0.5);
		this.preloadSprite = this.game.add.sprite(70, 200, 'loading');
		this.game.load.setPreloadSprite(this.preloadSprite);
		//加载图片
		this.game.load.spritesheet('white_block', 'assets/whiteblock.png',92,132,2);
		this.game.load.spritesheet('black_block', 'assets/blackblock.png',92,132,3);
		this.game.load.spritesheet('start_block', 'assets/startblock.png',92,132,2);
		this.game.load.spritesheet('yellow_block', 'assets/yellowblock.png',92,132,2);
		this.game.load.spritesheet('green_block', 'assets/greenblock.png',92,132,2);
		this.game.load.image('check_line', 'assets/checkline.png');
		this.game.load.image('rate_line', 'assets/rate.jpg');
		this.game.load.image('black_bg', 'assets/blackbg.png');
		this.game.load.image('white_bg', 'assets/whitebg.png');
		//加载音效
		this.game.load.audio('m0', 'assets/0.ogg');
		this.game.load.audio('m1', 'assets/1.ogg');
		this.game.load.audio('m2', 'assets/2.ogg');
		this.game.load.audio('m3', 'assets/3.ogg');
		this.game.load.audio('m4', 'assets/4.ogg');
		this.game.load.audio('m5', 'assets/5.ogg');
		this.game.load.audio('m6', 'assets/6.ogg');
		this.game.load.audio('mf', 'assets/f.ogg');
		this.game.load.audio('over', 'assets/success.wav');
	};
	this.create = function(){
		gameObj.musicI = new Array();
		gameObj.musicI[0] = this.game.add.audio('m0');
		gameObj.musicI[1] = this.game.add.audio('m1');
		gameObj.musicI[2] = this.game.add.audio('m2');
		gameObj.musicI[3] = this.game.add.audio('m3');
		gameObj.musicI[4] = this.game.add.audio('m4');
		gameObj.musicI[5] = this.game.add.audio('m5');
		gameObj.musicI[6] = this.game.add.audio('m6');
		gameObj.musicI[8] = this.game.add.audio('mf');
		gameObj.musicI[9] = this.game.add.audio('over');
		this.game.state.start('homepage');
	};
};