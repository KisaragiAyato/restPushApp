let startTime = 0;
let keikaTime = 0;
let isKyuukeiNow = false;
let setteiTime = [45,15];

function $(_id){
  return document.getElementById(_id);
}

window.onload = function() {
  $("setteiInput1").value = setteiTime[0];
  $("setteiInput2").value = setteiTime[1];

  //Notification.requestPermission();
  //notifyMeのコピー元→　https://developer.mozilla.org/ja/docs/Web/API/Notification/permission_static
  function notifyMe() {
    if (!("Notification" in window)) {
      // ブラウザーが通知に対応しているかどうかをチェックする
      alert("このブラウザーはデスクトップ通知に対応していません。");
    } else if (Notification.permission === "granted") {
      // 通知の許可が既に得られているかどうかをチェックする
      // それならば、通知を作成する
      const notification = new Notification("こんにちは！");
      // …
    } else if (Notification.permission !== "denied") {
      // そうでなければ、ユーザーに許可を求める必要がある
      Notification.requestPermission().then((permission) => {
        // ユーザーが許可したら、通知を作成する
        if (permission === "granted") {
          const notification = new Notification("こんにちは！");
          // …
        }
      });
    }
    notifyMe();

};

const onlyNumbers = n => {
  return n.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248)).replace(/\D/g, '');
}

function setteiOnclick(){
  
    setteiTime[0] = $("setteiInput1").value;
    setteiTime[1] = $("setteiInput2").value;
    window.alert("設定しました");
}

let intervalFunc;

function kaishiOnclick(){
  if(startTime != 0)return;
  let con = window.confirm("開始します");
  if(con == false)return;
  
  let nowTime = new Date();
  //startTime = nowTime.getTime();
  staerTime = 1;
  
  intervalFunc = setInterval(checkTime,60000);
  
  function checkTime(){
    //const currentTime = new Date();
    //keikaTime = Math.round( (currentTime.getTime() - startTime)/1000 );
    keikaTime++;
    if(isKyuukeiNow == false){
      if(keikaTime >= setteiTime[0]){
        isKyuukeiNow = true;
        const notification = new Notification("休憩の時間です")
      }
    }else if(isKyuukeiNow == true){
      if(kikaTime >= setteiTime[0] + setteiTime[1]){
        isKyuukeiNow = false;
        startTime = new Date().getTime(); //開始時間の更新
        keikaTime = 0;
        const notification = new Notification("休憩時間終了です")
      }
    }
    let keikaHours = Math.floor(keikaTime / 60);
    if(keikaHours < 10)kikaHours = "0" + keikaHours;
    let keikaMinutes = keikaTime % 60;
    if (keikaMinutes < 10) kikaMinutes = "0" + keikaMinutes;
    $("keikaSpan").value = keikaHours + ":" + keikaMinutes ;
  }
}

function tyuushiOnclick(){
  if(startTime == 0)return;
  let con = window.confirm("中止しますか?");
  if(con == false)return;
  clearInterval(intervalFunc);
  startTime = 0;
  keikaTime = 0;
  $("keikaSpan").value = "00:00";
}
