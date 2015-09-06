/**
*@description 
*别踩白块儿游戏入口，定义游戏基本参数以及音效模块
*游戏简介：
*1.游戏分为四个模式：经典，街机，禅，接力；
*2.经典模式：移动有限块，分值为时间
*  街机模式：无限块自动下落，分值为准确点中的块数
*  禅模式：有限时间，分值为准确点中的块数
*  接力模式：有限时间内得到阶段性分值增加游戏时间
*3.音效模块：可开启关闭音效
*4.排行榜模块：可查看响应模式个人最高分，个人排名，玩家中的最高分，使用ajax交互游戏数据
*5.缓存模块：游戏第一次载入后即可缓存到本地浏览器，缓存后可离线游戏
*6.state : 
*   boot     => 启动游戏，
*	preload  => 加载游戏资源，
*	homepage => 游戏菜单，
*	showrank => 排行榜界面，
*	classic  => 经典模式，
*	arcade   => 街机模式，
*	zen      => 禅模式，
*	relay    => 接力模式，
*	gameover => 游戏结束界面，
*@param {object} gameObj 游戏对象 
*@author 光光
*@mail   1148586347@qq.com	
*@date   2015-9-3
**/
//游戏对象
;var gameObj = gameObj || {};
//游戏宽高
gameObj.gameWidth = 365;
gameObj.gameHeight = 525;
//游戏开始状态字
gameObj.onStartGame = false;
//游戏分值计量
gameObj.score = 0;
//音乐开关
gameObj.musicSwitch = true;
//音符进行位置
gameObj.musicNum = 0;
//音乐库数组
gameObj.musicArr = new Array();
//音乐乐谱数组
gameObj.musicArr[0] = [1,2,3,1,1,2,3,1,3,4,5,3,4,5,5,6,5,4,3,1,5,6,5,4,3,1,2,5,1,0,2,5,1,0];
gameObj.musicArr[1] = [3,5,2,1,5,4,3,3,3,4,5,6,5,3,5,2,1,5,4,3,5,5,6,0,1,0,1,2,5,5,0,6,5,3,5,1,6,1,2,1,0,5,3,5,2,1,5,4,3,5,5,6,0,1,1,0];
gameObj.musicArr[2] = [5,1,0,1,5,5,1,0,1,5,5,1,0,1,1,1,6,6,5,5,1,0,1,5,5,3,2,2,1,5,1,0,1,6,6,6,1,6,5];
gameObj.musicArr[3] = [3,5,1,5,6,6,5,3,3,5,5,3,5,6,1,2,1,5,3,2,5,3,3,5,1,5,6,1,2,1,5,3,5,1,6,3,2,3,5,3,2,1,1];
gameObj.musicArr[4] = [8,8,8,8];
gameObj.musicArr[5] = [9,9,9,9];
//==================================================
//音乐模块主函数，触发后执行对应曲谱递增音符
//@param {number} i 音符指针
//@param {object} game 游戏对象
//==================================================
gameObj.music = function(i,game){
    if(gameObj.musicSwitch){
        var musicA = gameObj.musicArr[i];
        game.sound.stopAll();
        gameObj.musicI[musicA[(gameObj.musicNum++)%musicA.length]].play();
    }
};
//定义游戏状态变量
gameObj.game = new Phaser.Game(gameObj.gameWidth, gameObj.gameHeight, Phaser.AUTO, 'canvas');
gameObj.game.state.add('boot', gameObj.State_boot);
gameObj.game.state.add('preload', gameObj.State_preload);
gameObj.game.state.add('homepage', gameObj.State_homepage);
gameObj.game.state.add('showrank', gameObj.State_showrank);
gameObj.game.state.add('classic', gameObj.State_classic);
gameObj.game.state.add('arcade', gameObj.State_arcade);
gameObj.game.state.add('zen', gameObj.State_zen);
gameObj.game.state.add('relay', gameObj.State_relay);
gameObj.game.state.add('gameover', gameObj.State_gameover);
//启动游戏
gameObj.game.state.start('boot');