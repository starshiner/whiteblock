/**
*@description  ajax类
*@param {string}   name       对象名，【使用 jsonp时需设置】
*@param {string}   url        文件路径【必须】
*@param {object}   data       数据，默认为null【可选】
*@param {boolean}  async      处理方式，默认为true异步【可选】
*@param {number}   timeout    请求超时时间，默认为20000【可选】
*@param {string}   type       请求方式，默认为get【可选】
*@param {string}   dataType   数据格式，默认为json【跨域时设置为jsonp】
*@param {function} complete   请求发送成功函数【可选】
*@param {function} success    响应成功函数【可选】
*@param {function} timeoutFnc 请求超时函数【可选】
*@param {function} error      错误处理函数【可选】
*@mail 1148586347@qq.com
*@author 光光
*@date 2015-8-25
**/
var xhrFactory = function () {
    this.init.apply(this, arguments);
};
xhrFactory.prototype = {
    init: function () {
        this.xhr = this.create();
    },
    create: function () {
        var xhr = null;
        try {
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Msxml2.Xmlhttp");
            }
        }
        catch (err) {
            xhr = new ActiveXObject("Microsoft.Xmlhttp");
        }
        return xhr;
    },
    para: function (data) {
        var datastr = "";
        if (data && Object.prototype.toString.call(data) == "[object Object]") {
            for (var a in data) {
                datastr += encodeURIComponent(a) + "=" + encodeURIComponent(data[a]) + "&";
            }
        }
        return datastr;
    },
    ajax: function(obj){
        this.url = obj.url;
        this.data = obj.data || null;
        this.async = (typeof async === 'undefined') ? true : async; 
        this.timeout = obj.timeout || 20000;
        this.type = obj.type || "get";
        this.dataType = obj.dataType || "json";
        this.complete = obj.complete || function(){};
        this.success = obj.success || function(){};
        this.timeoutFnc = obj.timeoutFnc || function(){};
        this.error = obj.error || function(){};
        if(this.dataType == "jsonp"){
            var datastr = this.para(this.data);
            var script = document.createElement("script");
            script.src = this.url+"?"+datastr+"callback="+obj.name+".success";
            document.body.insertBefore(script,document.body.firstChild);
        }else{
            if(this.type == "post"){
                this.post();
            }else{
                this.get();
            }
        }
    },
    post : function(){
        try{
            this.readystate(this.complete,this.success,this.timeoutFnc,this.timeout);
            var newurl = this.url;
            var datastr = this.para(this.data);
            this.xhr.open("post", newurl, this.async);
            this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.xhr.send(!datastr ? null : datastr);
        }catch(e){
            this.error(e);
        }
    },
    get : function(){
        try{
            this.readystate(this.complete,this.success,this.timeoutFnc,this.timeout);
            var newurl = this.url;
            var datastr = this.para(this.data);
            newurl = this.url + "?" + datastr;
            this.xhr.open("get", newurl, this.async);
            this.xhr.send(null);
        }catch(e){
            this.error(e);
        }
    },
    readystate: function (complete,success,timeoutFnc,timeout) {
        this.xhr.onreadystatechange = function () {
            if (this.readyState == 2) {
                complete();
            }
            if (this.readyState == 4 && this.status == 200) {
                success(eval("(" + this.responseText + ")"));
                clearTimeout(timer);
            }
        };
        var timer = setTimeout(function () {
               timeoutFnc();
        }, timeout);
    }
};