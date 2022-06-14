function cache() {
  let before = document.getElementById("typeBox").value;
  setTimeout(() => {
    let after = document.getElementById("typeBox").value;
    if (before != after) {
      radio = document.getElementById("form");
      if (isEnglish(after)) {
        radio[7].checked = true;
      } else {
        radio[0].checked = true;
      }
    }
    cache();
  }, 1000);
}
function getValue() {
  let radio = document.getElementsByName("search");
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      return radio[i].value;
    }
  }
}
function isEnglish(typeBox) {
  for (let i = 0; i < typeBox.length; i++) {
    if (
      !(typeBox[i] >= "a" && typeBox[i] <= "z") &&
      !(typeBox[i] >= "A" && typeBox[i] <= "Z")
    ) {
      return false;
    }
  }
  return true;
}
function go() {
  let typeBox = document.getElementById("typeBox").value;
  let url;
  if (getValue() == "others") {
    window.open(document.getElementById("othersValue").value + typeBox);
  } else {
    window.open(getValue() + typeBox);
  }
}
function turnOther() {
  radio = document.getElementById("form");
  radio[9].checked = true;
}
window.onkeydown = function (event) {
  if (event.keyCode == 13) {
    go();
  }
  if (event.keyCode == 83 && openSearch) {
    search();
  }
};
cache();
function getDayTime() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dayTime = year + "-" + this.addZero(month) + "-" + this.addZero(day);
  return dayTime;
}
function getSecondTime() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let secondTime =
    this.addZero(hour) +
    ":" +
    this.addZero(minute) +
    ":" +
    this.addZero(second);
  return secondTime;
}
function time() {
  document.getElementById("day").innerHTML = getDayTime();
  document.getElementById("time").innerHTML = getSecondTime();
  let now = new Date();
  let open =
    window.localStorage.getItem("day") +
    " " +
    window.localStorage.getItem("time");
  open = new Date(open.replace(/-/g, "/"));
  document.getElementById("toNow").innerHTML =
    "已开机：" + getDifference(now, open);
  let clock = new Date((getDayTime() + " " + clockTime).replace(/-/g, "/"));
  if (getDifference(now, clock) >= "00:" + addZero(clockSpan) + ":00") {
    clockTime = getSecondTime();
    document.getElementById("audio").play();
  }
  window.localStorage.setItem(getDayTime(), [
    " 开机时间: " + window.localStorage.getItem("time") + " ",
    " 关机时间: " + getSecondTime() + " ",
    " 使用时长: " + getDifference(now, open),
  ]);
  setTimeout(() => {
    time();
  }, 1000);
}
function addZero(time) {
  time = Number(time);
  return time < 10 ? "0" + time : time;
}
function getDifference(timea, timeb) {
  let times = timea.getTime() - timeb.getTime();
  let h = parseInt(times / (3600 * 1000));
  let m = parseInt((times % (3600 * 1000)) / (60 * 1000));
  let s = parseInt(((times % (3600 * 1000)) % (60 * 1000)) / 1000);
  return addZero(h) + ":" + addZero(m) + ":" + addZero(s);
}
function list() {
  openSearch = true;
  let date = document.createElement("div");
  date.id = "date";
  date.className = "list";
  date.style = "margin-top: 10px";
  let text = document.createElement("div");
  text.id = "text";
  text.className = "list";
  let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  let inA = document.createElement("input");
  inA.id = "inA";
  inA.style = "width: 30px";
  inA.value = yesterday.getFullYear();
  let p1 = document.createElement("p1");
  p1.style = "margin-left: 8px; font-size: medium;";
  p1.innerHTML = "年";
  let inB = document.createElement("input");
  inB.id = "inB";
  inB.style = "margin-left: 8px; width: 15px";
  inB.value = addZero(yesterday.getMonth() + 1);
  let p2 = document.createElement("p1");
  p2.style = "margin-left: 8px; font-size: medium;";
  p2.innerHTML = "月";
  let inC = document.createElement("input");
  inC.id = "inC";
  inC.style = "margin-left: 8px; width: 15px";
  inC.value = addZero(yesterday.getDate());
  let p3 = document.createElement("p1");
  p3.style = "margin-left: 8px; font-size: medium";
  p3.innerHTML = "日";
  let ok = document.createElement("p1");
  ok.innerHTML = "按 S键 查询";
  ok.style = "font-size: x-small";
  document.getElementById("body").appendChild(date);
  document.getElementById("body").appendChild(text);
  document.getElementById("date").appendChild(inA);
  document.getElementById("date").appendChild(p1);
  document.getElementById("date").appendChild(inB);
  document.getElementById("date").appendChild(p2);
  document.getElementById("date").appendChild(inC);
  document.getElementById("date").appendChild(p3);
  document.getElementById("text").appendChild(ok);
}
function search() {
  openSearch = false;
  let searchDay =
    document.getElementById("inA").value +
    "-" +
    addZero(document.getElementById("inB").value) +
    "-" +
    addZero(document.getElementById("inC").value);
  window.confirm(window.localStorage.getItem(searchDay));
  document.getElementById("body").removeChild(document.getElementById("date"));
  document.getElementById("body").removeChild(document.getElementById("text"));
}
if (window.localStorage.getItem("day") != getDayTime()) {
  window.localStorage.setItem("day", getDayTime());
  window.localStorage.setItem("time", getSecondTime());
}
let clockTime = getSecondTime(),
  clockSpan = 30,
  openSearch = false;
time();
document.getElementById("open").innerHTML =
  "今日开机时间：" + window.localStorage.getItem("time");
