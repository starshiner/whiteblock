/**
*@description
*接力模式：固定时间，点击黑块到达阶段性数量后加时间
*@author 光光
*@mail   1148586347@qq.com  
*@date   2015-9-3
**/
;var gameObj = gameObj || {};
gameObj.State_relay = function(){
    this.preload = function(){
        this.game.stage.backgroundColor = "#fff";
    };
    this.create = function(){
        //定义游戏基本属性
        gameObj.gameMode = "接力模式";
        gameObj.gameModeCode = "relay";
        gameObj.musicNum = 0;
        gameObj.score = 0;
        gameObj.rdmMusic = this.getRandom(0,3);
        gameObj.nextFloor = 1;
        this.onStartGame = false;
        this.blockLine = 7;
        this.endTime = 10000;
        this.blockI = 30;
        this.blockA = 10;
        this.timeI = 10000;
        this.gate = 1;
        this.blockC = 0;

        this.lable_score = this.game.add.text(150, 30, 0 , {font: "45px Arial",fill: "#f00"});
        this.lable_rate = this.game.add.sprite(0, 0, 'rate_line');
        this.lable_rate.scale.x = 0;
        this.ground = this.game.add.sprite(0,526,'check_line');
        this.game.physics.enable([this.ground], Phaser.Physics.ARCADE);
        gameObj.blockArr = new Array();
        this.initGame();
    };
    this.update = function(){       
        //检测触底块属性，清除出界块  
        if(this.onStartGame){
            if((this.endTime-(this.game.time.prevTime-this.startTime)) > 0 ){
                this.lable_score.text = (this.endTime-(this.game.time.prevTime-this.startTime))/1000;
            }else{
                this.lable_score.text = 0;
            }
            this.lable_rate.scale.x = (gameObj.score-this.blockC)/(this.blockI+this.blockA*(this.gate-1));
            if((gameObj.score-this.blockC) >= (this.blockI+this.blockA*(this.gate-1))){
                this.endTime += this.timeI;
                this.gate++;
                this.blockC = this.blockC + this.blockA*(this.gate + 1);
            }
            if(this.endTime-(this.game.time.prevTime-this.startTime) <= 0.001){
                gameObj.gameResult = true;
                gameObj.gameScore = gameObj.score;
                gameObj.game.state.start('gameover');
            }
            for (var m = 0; m < gameObj.blockArr.length; m++) {
                if(gameObj.blockArr[m].previousPosition.y > gameObj.gameHeight - 50){
                    if(gameObj.blockArr[m].live){
                        gameObj.blockArr[m].play('out');
                        gameObj.music(4,this.game);
                        this.game.paused = true;
                        setTimeout(function(){
                            gameObj.game.paused = false;
                            gameObj.gameResult = false;
                            gameObj.gameScore = gameObj.score;
                            gameObj.game.state.start('gameover');
                        },200);
                    }else{
                        if(gameObj.blockArr[m].previousPosition.y > gameObj.gameHeight+70){
                            gameObj.blockArr[m].kill();
                            gameObj.blockArr.splice(m,1);
                        }
                    }
                }
            };
        }
        this.game.world.bringToTop(this.lable_score);
        this.game.world.bringToTop(this.lable_rate);
    };
    //===============================================
    //初始化函数
    //===============================================
    this.initGame = function(){
        var rdm1 = this.getRandom(0,3);
        var rdm2 = this.getRandom(0,3);
        var rdm3 = this.getRandom(0,3);
        var rdm4 = this.getRandom(0,3);
        var rdm5 = this.getRandom(0,3);
        var rdm6 = this.getRandom(0,3);
        for(var i = 0;i < 4;i++){
            this.addOneBlock("yellow_block",i,0);
        }
        this.addOneBlock("start_block",rdm1,1);
        for (var i = 0; i < 4; i++) {
            if(i != rdm1){
                this.addOneBlock("white_block",i,1);
            }       
        };
        for(var i=2;i<7;i++){
            this.addOneLineBlock(i);
        }
    };
    //================================================
    //添加一个块
    //@param {string} name 块名称
    //@param {number} x 块x位置
    //@param {number} y 块y位置
    //================================================
    this.addOneBlock = function(name,x,y){  
        var obj = this.game.make.sprite(46+91*x,-(66+131*y),name);
        obj.live = true;
        obj.anchor.set(0.5);
        obj.floor = y;
        this.ground.addChild(obj);
        obj.animations.add("live",[0],1,false);
        obj.animations.add("dead",[1],1,false);
        if(name == "black_block"){
            gameObj.blockArr[gameObj.blockArr.length] = obj;
            obj.animations.add("out",[2],1,false);
        }
        obj.animations.play("live");
        obj.inputEnabled = true;
        obj.events.onInputDown.removeAll();
        obj.events.onInputDown.add(function(){
            if(obj.floor == gameObj.nextFloor){
                if(name == "black_block"){
                //点击黑块响应
                    if(this.onStartGame && obj.live){
                        obj.live = false;
                        gameObj.music(gameObj.rdmMusic,this.game);
                        obj.animations.play("dead");
                        obj.scale.set(0.85);
                        this.game.add.tween(obj.scale).to( { x: 1, y: 1 }, 200, null, true, 0, 0, false);
                        this.clickBlack();
                    }
                }else if(name == "white_block"){
                    //点击白块响应
                    if(this.onStartGame){
                        gameObj.music(4,this.game);
                        obj.animations.play("dead");
                        this.clickWhite();
                    }
                }else if(name == "start_block"){
                    //触发游戏开始
                    if(!this.onStartGame){
                        gameObj.music(gameObj.rdmMusic,this.game);
                        obj.animations.play("dead");
                        obj.scale.set(0.85);
                        this.game.add.tween(obj.scale).to( { x: 1, y: 1 }, 200, null, true, 0, 0, false);
                        this.startTime = this.game.time.prevTime;
                        this.onStartGame = true;
                        this.startGame();
                    }
                }
                gameObj.nextFloor++;
            }
        }, this);
    };  
    //=================================================
    //添加一块组
    //=================================================
    this.addBlock = function(){
        this.addOneLineBlock(this.blockLine++);
    };
    //=================================================
    //添加一整行块
    //@param {number} y 行数
    //=================================================
    this.addOneLineBlock = function(y){
        var rdm = this.getRandom(0,3);
        this.addOneBlock("black_block",rdm,y);
        for (var i = 0; i < 4; i++) {
            if(i != rdm){
                this.addOneBlock("white_block",i,y);
            }       
        };
    };
    //=================================================
    //点击开始块触发函数
    //=================================================
    this.startGame = function(){ 
        gameObj.score++;
        var tmpy = this.ground.y + 131;
        this.game.add.tween(this.ground).to( {  y : tmpy }, 200, null, true, 0, 0, false);          
    };
    //=================================================
    //点击黑块触发函数
    //=================================================
    this.clickBlack = function(){
        this.addBlock();
        gameObj.score++;
        var gy = this.ground.y;
        if((gy - 526)%131 != 0){
            var gy = (Math.floor((gy-526)/131)+1)*131+526;
        }
        var tmpy = gy + 131;
        this.game.add.tween(this.ground).to( {  y : tmpy }, 200, null, true, 0, 0, false);
        
    };
    //=================================================
    //点击白块触发函数
    //=================================================
    this.clickWhite = function(){
        this.game.paused = true;
        gameObj.music(4,this.game);
        setTimeout(function(){
            gameObj.game.paused = false;
            gameObj.gameResult = true;
            gameObj.gameScore = gameObj.score;
            gameObj.game.state.start('gameover');
        },200);
    };
    //=================================================
    //获取a-b之间的随机数
    //=================================================
    this.getRandom = function(a,b){
        return Math.floor(Math.random()*(b+1))+a;
    };
};