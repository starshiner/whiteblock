/**
*@description
*街机模式：点击黑块后生成新块行，块底层下移并阶段性线性增速
*@author 光光
*@mail   1148586347@qq.com  
*@date   2015-9-3
**/
;var gameObj = gameObj || {};
gameObj.State_arcade = function(){
    this.preload = function(){
        this.game.stage.backgroundColor = "#fff";
    };
    this.create = function(){
        //定义游戏基本属性
        gameObj.gameMode = "街机模式";
        gameObj.gameModeCode = "arcade";
        gameObj.musicNum = 0;
        gameObj.score = 0;
        gameObj.rdmMusic = this.getRandom(0,3);
        gameObj.nextFloor = 1;
        this.onStartGame = false;
        this.blockLine = 7;
        this.gate = 1;
        this.gateF = 5;
        this.lable_score = this.game.add.text(gameObj.gameWidth/2, 25, 0 , {font: "45px Arial",fill: "#f00"});
        this.lable_score.anchor.set(0.5);
        this.groundV = 200;
        this.groundI = 10;
        this.ground = this.game.add.sprite(0,526,'check_line');
        this.game.physics.enable([this.ground], Phaser.Physics.ARCADE);
        gameObj.blockArr = new Array();
        this.initGame();
    };
    this.update = function(){     
        //检测触底块属性，清除出界块  
        if(this.onStartGame){
            this.ground.body.velocity.y = this.groundV;
            if(gameObj.score >= this.gateF*this.gate){
                this.gate++;
                this.groundV += this.groundI;
            }
            for (var m = 0; m < gameObj.blockArr.length; m++) {
                if(gameObj.blockArr[m].previousPosition.y > gameObj.gameHeight - 50){
                    if(gameObj.blockArr[m].live){
                        gameObj.blockArr[m].play('out');
                        gameObj.music(4,this.game);
                        this.game.paused = true;
                        setTimeout(function(){
                            gameObj.game.paused = false;
                            gameObj.gameResult = true;
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
        this.lable_score.text = gameObj.score;
        this.game.world.bringToTop(this.lable_score);
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
        //定义块属性
        var obj = this.game.make.sprite(46+91*x,-(66+131*y),name);
        obj.live = true;
        obj.anchor.set(0.5);
        this.ground.addChild(obj);
        obj.animations.add("live",[0],1,false);
        obj.animations.add("dead",[1],1,false);
        if(name == "black_block"){
            gameObj.blockArr[gameObj.blockArr.length] = obj;
            obj.animations.add("out",[2],1,false);
        }
        obj.floor = y;
        obj.animations.play("live");
        obj.inputEnabled = true;
        //添加块的点击检测
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
    };
    //=================================================
    //点击黑块触发函数
    //=================================================
    this.clickBlack = function(){
        this.addBlock();
        gameObj.score++;
    };
    //=================================================
    //点击白块触发函数
    //=================================================
    this.clickWhite = function(){
        this.game.paused = true;
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