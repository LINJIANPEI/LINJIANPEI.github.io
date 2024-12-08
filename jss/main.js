// btf.snackbarShow("<div>欢迎来到林林的博客</div>");
// Snackbar.show({
//   width: "auto", //知的宽度。用于根据需要缩小/扩展窗口。
//   text: "欢迎来到林林的博客", //要在通知中拆分的文本。
//   textColor: "#FFFFFF", //通知文本的文本颜色。默认值为白色。
//   showAction: false, //布尔值来显示操作 buton 或不显示。
//   actionText: "关闭", //要显示为操作按钮的文本。
//   actionTextAria: "关闭", //屏幕阅读器的文本。
//   alertScreenReader: false, //确定屏幕阅读器是否会宣布弹窗消息。
//   actionTextColor: "#4CAF50", //操作按钮的文本颜色。
//   showSecondButton: false,
//   secondButtonText: "",
//   secondButtonAria: "Description for Screen Readers",
//   secondButtonTextColor: "#4CAF50",
//   backgroundColor: "#323232", //通知窗口的背景色。
//   pos: "top-right", //通知将显示的位置。有关可能的位置，请参阅上面的示例。
//   duration: 5000, //显示通知的时间（以毫秒为单位）。
//   customClass: "", //将自定义类添加到通知中以进行自定义样式设置。
//   onActionClick: function (element) {}, //默认操作关闭通知。
//   onSecondButtonClick: function (element) {},
//   onClose: function (element) {}, //在通知已关闭时触发。
// });

// const fntime = [
//   { greeting: "晚安😴", startTime: 0, endTime: 5 },
//   { greeting: "早上好鸭👋, 祝你一天好心情！", startTime: 6, endTime: 9 },
//   { greeting: "上午好👋, 状态很好，鼓励一下～", startTime: 10, endTime: 10 },
//   { greeting: "11点多啦, 在坚持一下就吃饭啦～", startTime: 11, endTime: 11 },
//   { greeting: "午安👋, 宝贝", startTime: 12, endTime: 14 },
//   { greeting: "🌈充实的一天辛苦啦！", startTime: 14, endTime: 18 },
//   { greeting: "19点喽, 奖励一顿丰盛的大餐吧🍔。", startTime: 19, endTime: 19 },
//   {
//     greeting: "晚上好👋, 在属于自己的时间好好放松😌~",
//     startTime: 20,
//     endTime: 24,
//   },
// ];

// const fntimeStr = fntime
//   .map(
//     (item) => `
//   case ${item.startTime}:
//     btf.snackbarShow('<h2 style="text-align:center;width:100%;">欢迎来到林林的博客</h2><p style="text-align:center;width:100%;">${item.greeting}</p>',false,2000)
//     break;
//   `
//   )
//   .join("");

// const fn = new Function(
//   "times",
//   `switch(times) {
//   ${fntimeStr}
//   default:
//     btf.snackbarShow('<h2 style="text-align:center;width:100%;">欢迎来到林林的博客</h2><p style="text-align:center;width:100%;">一起来摸鱼吧啦～</p>',false,2000)
//   }`
// );
// let date = new Date();
// let dateIntegralPoint = new Date();
// dateIntegralPoint.setHours(date.getHours() + 1);
// dateIntegralPoint.setMinutes(0);
// dateIntegralPoint.setSeconds(0);
// let setTimeouts = setTimeout(function () {
//   const now = new Date();
//   fn(now.getHours());
//   setInterval(() => {
//     const nows = new Date();
//     fn(nows.getHours());
//   }, 60 * 60 * 1000);
//   clearTimeout(setTimeouts);
// }, dateIntegralPoint - date);

// const fntimeStrs = fntime
//   .map(
//     (item) => `
//   case ${item.startTime} <= times && ${item.endTime} > times:
//     btf.snackbarShow('<h2 style="text-align:center;width:100%;">欢迎来到林林的博客</h2><p style="text-align:center;width:100%;">${item.greeting}</p>',false,2000)
//     break;
//   `
//   )
//   .join("");

// const fns = new Function(
//   "times",
//   `switch(true) {
//   ${fntimeStrs}
//   default:
//     btf.snackbarShow('<h2 style="text-align:center;width:100%;">欢迎来到林林的博客</h2><p style="text-align:center;width:100%;">一起来摸鱼吧啦～</p>',false,2000)
// }`
// );
// fns(date.getHours());

const snackbarShows = (text, showAction = false, duration = 2000) => {
  const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar;
  const bg =
    document.documentElement.getAttribute("data-theme") === "light"
      ? bgLight
      : bgDark;
  Snackbar.show({
    text,
    backgroundColor: bg,
    showAction,
    duration,
    pos: position,
    customClass: "snackBar",
    actionText: "关闭", //要显示为操作按钮的文本。
    actionTextAria: "关闭", //屏幕阅读器的文本。
    secondButtonText: "关闭",
  });
};

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "hidden") {
    normal_title = document.title;
    document.title = "林林爱你，别走好吗...";
  } else document.title = normal_title;
});

const ws = new WebSocket(
  `${window.location.protocol === "https:" ? "wss://" : "ws://"}${
    window.location.hostname
  }:${window.location.port}`
);

ws.onopen = () => {
  ws.send(JSON.stringify({ data: "init" }));
};
ws.onclose = () => {};
ws.onmessage = (message) => {
  message = JSON.parse(message.data);
  switch (message.data) {
    case "close":
      ws.close();
      break;
    default:
      snackbarShows(
        `<h2 style="text-align:center;width:100%;">${
          !!message.data.h ? message.data.h : ""
        }</h2><p style="text-align:center;width:100%;">${
          !!message.data.p ? message.data.p : ""
        }</p>`,
        true,
        5000
      );
    // ws.send(`Server received: ${message}`);
  }
};
