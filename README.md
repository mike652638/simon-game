# SIMON-GAME

This small game was inspired by a classic game named <a href="https://en.wikipedia.org/wiki/Simon_(game)">Simon</a>, under the guidence of <a href="https://www.freecodecamp.cn/challenges/build-a-simon-game">the Last Task on FreeCodeCamp for Front-end Development</a>. 

Main Functions/Features:

1. The game interface was round with fan-shape sectors (similar with Lottery Turntables as we often see), which was achieved mainly by using CSS3 features such as rotate, skew and animations;

2. There are 8 sectors on the plate, correspondingly 8 piano pitches (do re me fa so, etc) were added to each sector by using HTML5 audio;

3. The game can be run in both "FREE MODE"(a creation by myself) and "MEMORY MODE". In Free Mode(when the button in control pannel is "OFF"), either hover(/touch) on the sectors or keypress on keyboards will trigger relative piano sound playing, at the same time the active sector will be highlighted, moreover, random input are also supported in the input box below the plate, the input value will be transformed to numbers 0-7 and the corresponding sounds will be played in sequence when the button "PLAY" is clicked;

4. By clicking the ON/OFF button in odd times, the game will be turned to Memory Mode, by which the random input box will be hidden, the keyboard events will be disabled, and tips will appear on the control pannel indicates Game Instructions, Count Down and Game Levels. The Memory Mode is simple as the instructions indicates, the game will starts from level 1 when a random sector would be highlighted and a coordinated sound would be played, after which you just need to click/touch the sectors in the right sequence same as the program did, the game level will be increased if you recall the sequence right, otherwise, the previous sequence will be played again for your further recalling;

5. The demo has been applied with Bootstrap Frame and CSS3 media query to achieve responsive designs in most platforms and different size of screens, which have been simulated and tested in Chrome developer tools. 

6. Due to poor compatibility with many CSS3 features for browsers kernel under IE9, this demo was inbuilt with code snippets detecting browsers version, a warning message(instead of a mess layout) will appear in browsers kernel under IE9;

Currently Known Issues:
There seemed to be significant delay in Memory Mode when played on Mobile Phone Browsers, this might be due to inproper applications of setTimeout functions, a replacement of features like promise/deferred will be considered in the following practice.

This Demo is very simple since it's one of my practicing projects when learning Front-end Developments from scratch, it can be viewed @ <a href="https://www.mike652638.com/demo/simon.html">My Website Demo Page-Simon</a>. Any issues or bugs report are always welcome, helpful commits will be much appreciated :)

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# 我爱记音符

这个小游戏仿自一款经典的电子游戏-<a href="http://baike.baidu.com/link?url=TQPuMti9mee3TBdpOVdBItN6mvhC-bP1WYir6qd3-Mrsb6Zsu9qLqdANGkwXoVVzNgWNDheDhnzRDR-cz8XcDCZ2VbBhtB_4G2IVUSwiG56MQZImImbhxpaarBRY4Ao1">"西蒙游戏"</a>, 基于<a href="https://www.freecodecamp.cn/challenges/build-a-simon-game">FreecodeCamp前端部分最后一个任务</a>来实现;

主要功能/特色:

1. 游戏界面是一个由扇形区组成的圆盘(类似我们通常那个所见到的"抽奖转盘"), 这种布局主要是通过CSS3的新特性(比如rotate, skew 和 animations等)来实现的;

2. 圆盘上有8个扇形区, 每个扇形区通过HTML5的audio对象绑定了一种钢琴音效(哆喏咪发嗦等);

3. 这个游戏存在两种模式: 自由模式(个人创意)和记忆模式。在自由模式下(控制面板中开关为关闭状态), 点击/触摸任一扇形区或者按下键盘数字或字母键可以点亮相应区域, 同时播放对应音效; 另外, 圆盘下方的输入框中可以输入任意字符, 点击"演奏"按钮后, 输入框中的内容会被转换为0-7之间的数字并依次点亮对应区域和播放音效;

4. 点击控制面板中的开关键(奇数次), 游戏会进入记忆模式, 此时圆盘下方的输入框会被隐藏, 键盘按下事件会被屏蔽, 同时控制面板屏幕区会显示相应提示, 倒计时和游戏关卡等。正如游戏提示的那样, 记忆模式规则很简单: 从第一关开始, 程序会随机点亮一个扇形区并播放相应音效, 随后你可以回忆扇形区亮灯顺序并重复这一过程, 如果顺序正确, 会进入下一关卡; 如果顺序错误, 程序会重复之前的顺序, 随后你可以进行重试;

5. 这个小游戏应用了BootStrap框架和CSS3媒体查询功能, 尽可能做到对不同平台不同尺寸屏幕的兼容(已在Chrome浏览器的开发者模式中模拟测试);

6. 由于IE9以下内核浏览器对CSS3的很多新特性兼容存在问题, 这个小游戏内置了浏览器内核判断函数, 在IE9以下内核的浏览器中, 不会显示糟糕的界面, 而是升级至最新版Chrome或Firefox浏览器的温馨提示(希望能对前端界做出点微薄的贡献→ →)

目前已知问题:
在手机端浏览器下, 该游戏的记忆模式似乎存在明显延迟, 这可能跟setTimeout的不当应用有关, 后续实践中会考虑替换成promise/deferred等函数。

这个小页面是我自学前端时实践的一个小项目, 实现起来并不难, 您可以进入<a href="https://www.mike652638.com/demo/simon.html">我的网站DEMO展示页-我爱记音符</a>查看在线效果, 随时欢迎您提出任何问题, 建议或反馈 :) 

<a target="_blank" href = "https://www.mike652638.com/demo/simon.html"><img src="https://www.mike652638.com/demo/simon/scrShts/simonScrSht-pc.png" alt="simon-game-screenshot" /></a>
