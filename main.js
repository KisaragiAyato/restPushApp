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

  Notification.requestPermission();
  
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
