/**开头声明所有变量**/
var rangeArr = [0, 1, 2, 3, 4, 5, 6, 7], //对应八种钢琴音
    randomArr = [], //八种钢琴音的随机组合及顺序
    sndArr; //八种钢琴音加载SRC的随机组合及顺序
var gameLvl = 1, //游戏第几关, 对应钢琴音播放的次数
    bkGameLvl = 1, //在gameLvl递减前保存其值, 重玩游戏时回到原关
    pt = -1, //playSnd函数中播放次数(playTime)累加的参数
    num, //playSnd函数中对应randomArr的序号
    liEle, //playSnd函数中对应扇形的li元素
    //滑过或点击之前扇形区的背景颜色, 方便恢复
    drkBgClrArr = ["#1387CE", "#418576", "#E30278", "#019447", "#2E2C7D", "#024327", "#A93B7B", "#54B34B"];
var checkStus, //"自由模式"和"记忆模式"状态切换
    rightClk = 0, //"记忆模式"中鼠标正确点击的次数
    //"记忆模式"中鼠标点击的结果, 默认为"非错误", 记为"错误"后randomArr保持上一次的不变
    memoClkResult = "notWrong";
var timer1, //记忆模式下定时(setTimeout)依次执行的事件
    timer2,
    timer3,
    timer4,
    timer5,
    timer6,
    timer7,
    timer8,
    timer9,
    timer10,
    timer11,
    timer12;
var kyDnCode, //自由模式下绑定键盘keydown事件得到的keyCode
    kyDnNum, //自由模式下绑定键盘keydown事件得到的扇形区域
    userDvc; //识别用户访问该网页时所用的设备

//在页面首次打开时即执行一次
window.onload = function() {
    checkBrowser();
    ajustHeight();
    ctrlEaseIn();
    hoverPlaySnd();
};

function checkBrowser() {
    //识别用户访问该网页时所用的设备是否为手机或平板
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "iPad"];
    var devices = ["安卓手机", "苹果手机", "iPad平板"];
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            userDvc = devices[v];
        }
    }
    if (userDvc) {
        $(".dvcTip").css({
            "display": "block"
        });
        $("#userDvc").html(userDvc);
        $("#clsTip").click(function() {
            $(".dvcTip").css("display", "none");
        });
    }

    //判断用户浏览器内核版本是否低于IE9, 参考
    //http://stackoverflow.com/questions/5574842/
    //best-way-to-check-for-ie-less-than-9-in-javascript-without-library
    if (document.addEventListener) {
        return;
    } else {
        document.getElementById("container").style.display = "none";
        document.getElementById("tipsForIE9").style.display = "block";
        //$(".container").css("display", "none");
        //$(".tipsForIE9").css("display", "block");
    }
}

//监听浏览器窗口窗口大小变化，窗口宽度变化时单元格高度也跟着变化
window.onresize = function() {
    ajustHeight();
};

//应用Bootstrap响应式布局(宽度自适应)的同时，规定高度等于宽度
function ajustHeight() {
    $(".main").css("height", $(".main").css("width"));
    $(".ctrl").css("height", $(".ctrl").css("width"));
    $("#fans li").css("height", $("#fans li").css("width"));
    $("#screen").css("fontSize", parseInt($(".ctrl").css("width")) * 0.1);
}

function ctrlEaseIn() {
    setTimeout(function() {
        $("#ctrl").animate({
            opacity: 1
        }, 2000);
    }, 1000);
}

//鼠标滑过或点击时播放特定音效且背景高亮
function fansEnter() {
    $("#pianoSnd audio")[num].play();
    liEle.css({
        "color": "#000",
        "backgroundColor": "#FDF76B",
        "box-shadow": "5px 10px 20px #48e0d3"
    });
    setTimeout(bkToNormal, 1000);
}

//鼠标滑出或结束点击后音效停止且背景颜色恢复
function bkToNormal() {
    for (var i in drkBgClrArr) {
        $("#item" + i).css("backgroundColor", drkBgClrArr[i]);
    }
    $("#fans li").css({
        "color": "#fff",
        "box-shadow": "0 0 0 #000"
    });

    if ($("#pianoSnd audio")[num]) {
        $("#pianoSnd audio")[num].pause();
    }
}

//鼠标滑过任意扇形区时播放相应音效及颜色变化
function hoverPlaySnd() {
    $("#fans li").mouseenter(function() {
        //在第二次鼠标滑过时先立即停止上一次的音效播放和背景高亮, 改善延迟
        if (num) {
            bkToNormal();
        }
        //在第二次鼠标滑过时先立即停止上一次的音效播放和背景高亮, 改善延迟
        num = $(this).index();
        liEle = $(this);
    });

    $("#fans li").on("mouseenter.Hack", fansEnter);
    $("#fans li").on("mouseleave.Hack", bkToNormal);

}

function getRandomArr() {
    //根据当前关卡数生成相应数量的随机数组(0~7)
    bkGameLvl = gameLvl;
    //randomArr = [];
    if (memoClkResult !== "Wrong") {
        for (gameLvl; gameLvl > 0; gameLvl--) {
            var randomNum = Math.floor(8 * Math.random());
            randomArr.push(rangeArr[randomNum]);
        }
    } else {
        memoClkResult = "notWrong";
    }
    console.trace("getRandomArr randomArr = " + randomArr);
}

function getSndArr() {
    sndArr = [];
    //将上方随机数组应用到audio src, 分别构造随机播放的音效序列
    for (var k = 0, arrLen = randomArr.length; k < arrLen; k++) {
        sndArr.push(new Audio("simon/snd/" + randomArr[k] + ".mp3"));
    }
}

function sndQueue() {
    pt++;
    num = randomArr[pt];
    if (pt < sndArr.length) {
        sndArr[pt].addEventListener('ended', sndQueue);
        sndArr[pt].play();
        colorChg();
        console.trace(num);
    } else {
        pt = -1;
        return;
    }
}

//播放音效时相应扇形区高亮, 1秒后恢复, 供playSnd调用
function colorChg() {
    liEle = $("#fans").children().eq(num);
    liEle.css({
        "color": "#000",
        "backgroundColor": "#FDF76B",
        "box-shadow": "5px 10px 20px #48e0d3"
    });
    setTimeout(bkToNormal, 1000);
}

function playSnd() {
    getRandomArr();
    getSndArr();
    sndQueue();
}

$(document).ready(function() {
    checkStus = $("#myonoffswitch")[0].checked;

    $("#iptPlay").click(function() {
        var iptStr = $("#ipt").val();
        var iptArr = iptStr.split("");
        for (var k in iptArr) {
            var x = iptArr[k] - 0;
            if (isNaN(x) || x > 7 || iptArr[k] === " ") {
                iptArr[k] = Math.floor(8 * Math.random());
            }
        }
        $("#ipt").val(iptArr.join(""));
        randomArr = iptArr;
        getSndArr();
        sndQueue();
    });

    $("#iptClear").click(function() {
        $("#ipt").val("");
    });

    $("#myonoffswitch").click(function() {
        if (checkStus === true) {
            checkStus = false;
            $("#msgBox").css("color", "#33C5C5");
            $("#fans li").on("mouseenter.Hack", fansEnter);
            $("#fans li").on("mouseleave.Hack", bkToNormal);
            $("body").on("keydown.snd", keydownFuncs);
            $(".iptPannel").css("display", "block");
            $(".showGameLvl").css("display", "none");
            $("#fans li").off("click.memoCheck");
            randomArr = [];
            endTimeoutFuncs();
            $("#msgBox").css({
                "fontSize": parseInt($(".ctrl").css("width")) * 0.1,
                "marginTop": "0"
            });
            $("#msgBox").text('当前为"自由模式"');
        } else if (checkStus === false) {
            checkStus = true;
            $("#msgBox").text('已开启"记忆模式"');
            $("#msgBox").css("color", "#D9534F");
            $(".iptPannel").css("display", "none");
            $(".showBtnTip").css("display", "none");
            $(".showGameLvl").css("display", "block");
            $("#fans li").off("mouseenter.Hack");
            $("#fans li").off("mouseleave.Hack");
            $("body").off("keydown.snd", keydownFuncs);
            gameLvl = bkGameLvl;
            memoGame();
        }
    });

    function memoGameTips() {
        timer1 = setTimeout(function() {
            $("#msgBox").text('请记住音符出现顺序');
        }, 2000);
        if (gameLvl === 1) {
            timer2 = setTimeout(function() {
                $("#msgBox").text('准备好了么?');
            }, 3000);
            timer3 = setTimeout(function() {
                $("#msgBox").text('3');
                $("#msgBox").animate({
                    "fontSize": parseInt($(".ctrl").css("width")) * 0.2,
                    "marginTop": "-10%"
                }, 1000);
            }, 4000);
            timer4 = setTimeout(function() {
                $("#msgBox").text('2');
            }, 5000);
            timer5 = setTimeout(function() {
                $("#msgBox").text('1');
            }, 6000);
            timer6 = setTimeout(function() {
                $("#msgBox").text('开始 !');
                $("#msgBox").animate({
                    "fontSize": parseInt($(".ctrl").css("width")) * 0.1,
                    "marginTop": "0"
                }, 2000);
            }, 7000);
        }
    }

    function memoGame() {
        memoGameTips();
        if (gameLvl === 1) {
            timer7 = setTimeout(playSnd, 9000);
            timer8 = setTimeout(function() {
                $("#msgBox").text('请重复音符顺序');
            }, 10000);
            timer9 = setTimeout(memoCheck, 10000);
        } else {
            timer10 = setTimeout(playSnd, 3000);
            timer11 = setTimeout(function() {
                $("#msgBox").text('请重复音符顺序');
            }, (1800 * gameLvl + 3000));
            timer12 = setTimeout(memoCheck, (1800 * gameLvl));
        }
    }

    function memoCheck() {
        $("#fans li").on("click.memoCheck", memoCheckClk);
    }

    function memoCheckClk() {
        //在第二次鼠标滑过时先立即停止上一次的音效播放和背景高亮, 改善延迟
        if (num !== undefined) {
            bkToNormal();
        }
        //在第二次鼠标滑过时先立即停止上一次的音效播放和背景高亮, 改善延迟
        num = $(this).index();
        console.trace("memoCheckClk num = " + num);
        liEle = $(this);
        fansEnter();

        if (num === randomArr[rightClk]) {
            rightClk += 1;
        } else {
            setTimeout(function() {
                $("#msgBox").text('顺序不对, 再来一遍');
            }, 1000);
            $("#fans li").off("click.memoCheck");
            memoClkResult = "Wrong";
            rightClk = 0;
            gameLvl = bkGameLvl;
            memoGame();
        }
        console.log("rightClk = " + rightClk + " randomArr.length = " + randomArr.length);
        if (rightClk > 0 && rightClk === randomArr.length) {
            setTimeout(function() {
                $("#msgBox").text('顺序正确, 进入下一关');
            }, 1000);
            $("#fans li").off("click.memoCheck");
            randomArr = [];
            rightClk = 0;
            gameLvl = bkGameLvl;
            gameLvl++;
            bkGameLvl = gameLvl;
            setTimeout(function() {
                $("#getGameLvl").text(gameLvl);
            }, 2000);
            memoGame();
        }
    }

    function endTimeoutFuncs() {
        //typeof(timer1)="number", 故无法用for循环
        window.clearTimeout(timer1);
        window.clearTimeout(timer2);
        window.clearTimeout(timer3);
        window.clearTimeout(timer4);
        window.clearTimeout(timer5);
        window.clearTimeout(timer6);
        window.clearTimeout(timer7);
        window.clearTimeout(timer8);
        window.clearTimeout(timer9);
        window.clearTimeout(timer10);
        window.clearTimeout(timer11);
        window.clearTimeout(timer12);
    }

    function keydownFuncs(event) {
        if (kyDnNum) {
            bkToNormal();
        }
        kyDnCode = event.keyCode;
        if (kyDnCode >= 48 && kyDnCode <= 55) {
            kyDnNum = String.fromCharCode(kyDnCode) - 0;
        } else if (kyDnCode >= 65 && kyDnCode <= 72) {
            kyDnNum = String.fromCharCode(kyDnCode - 17) - 0;
        } else if (kyDnCode >= 73 && kyDnCode <= 80) {
            kyDnNum = String.fromCharCode(kyDnCode - 25) - 0;
        } else if (kyDnCode >= 81 && kyDnCode <= 88) {
            kyDnNum = String.fromCharCode(kyDnCode - 33) - 0;
        } else if (kyDnCode >= 89 && kyDnCode <= 90) {
            kyDnNum = String.fromCharCode(kyDnCode - 41) - 0;
        } else if (kyDnCode >= 96 && kyDnCode <= 103) {
            kyDnNum = String.fromCharCode(kyDnCode - 48) - 0;
        } else if (kyDnCode >= 104 && kyDnCode <= 105) {
            kyDnNum = String.fromCharCode(kyDnCode - 56) - 0;
        }
        if (kyDnNum) {
            $("#pianoSnd audio")[kyDnNum].play();
            liEle = $("#item" + kyDnNum);
            liEle.css("color", "#000");
            liEle.css("backgroundColor", "#FDF76B");
            liEle.css("box-shadow", "5px 10px 20px #48e0d3");
            setTimeout(bkToNormal, 1000);
        }

        //空格键全响全亮
        if (kyDnCode === 32) {
            for (var m = 0; m < 8; m++) {
                $("#pianoSnd audio")[m].play();
                $("#item" + m).css("color", "#000");
                $("#item" + m).css("backgroundColor", "#FDF76B");
                $("#item" + m).css("box-shadow", "5px 10px 20px #48e0d3");
            }
            setTimeout(bkToNormal, 1000);
        }
    }
    $("body").on("keydown.snd", keydownFuncs);
});