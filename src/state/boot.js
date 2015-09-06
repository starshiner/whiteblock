/**
*@description
*游戏启动模块：检测游戏平台，localstorage
*@author 光光
*@mail   1148586347@qq.com  
*@date   2015-9-3
**/
;var gameObj = gameObj || {};
gameObj.State_boot = function(){
	this.preload = function(){
        //检测游戏平台
		if (!this.game.device.desktop) {
            //使用拉伸适应全屏模式
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forcePortrait = true;
            this.scale.refresh();
        } else {
            //桌面浏览器居中显示
            this.game.scale.pageAlignVertically = true;
            this.game.scale.pageAlignHorizontally = true;
        }
        //检测localstorage
        if (window.localStorage) {
            if (localStorage.getItem("username_1")) {
                gameObj.username = localStorage.getItem("username_1");
            } else {
                gameObj.username = Date.parse(new Date());
                localStorage.setItem("username_1", gameObj.username);
                localStorage.setItem("gameData_classic", 0);
                localStorage.setItem("gameData_arcade", 0);
                localStorage.setItem("gameData_zen", 0);
                localStorage.setItem("gameData_relay", 0);
            }
        } else {
            alert("您的浏览器不支持localStorage,请升级浏览器");

        }
        //初始背景色
        this.game.stage.backgroundColor = '#fff';
        this.game.load.image('loading', 'assets/preloader.gif');
	};
	this.create = function(){
        //启动加载游戏资源
		this.game.state.start('preload');
	};
};