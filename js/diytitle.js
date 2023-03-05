//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = 'w(ﾟДﾟ)w 不要走！再看看嘛！';
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = '♪(^∇^*)欢迎肥来！' + OriginTitile;
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});


var lcl_musicPlaying = false;
var lcl_musicStretch = false;
var lcl_musicFirst = false;
var navMusicEl = document.getElementById("nav-music");
var lcl = {
  //切换音乐播放状态
  musicToggle: function (changePaly = true) {
    if (!lcl_musicFirst) {
      musicBindEvent();
      lcl_musicFirst = true;
    }
    let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>'; // 此處可以更改為你想要顯示的文字
    let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>'; // 同上，但兩處均不建議更改
    if (lcl_musicPlaying) {
      navMusicEl.classList.remove("playing");
      // 修改右键菜单文案为播放
      // document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      // document.querySelector("#consoleMusic").classList.remove("on");
      lcl_musicPlaying = false;
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("playing");
      // 修改右键菜单文案为暂停
      // document.getElementById("menu-music-toggle").innerHTML = msgPause;
      // document.querySelector("#consoleMusic").classList.add("on");
      lcl_musicPlaying = true;
      navMusicEl.classList.add("stretch");
    }
    if (changePaly) document.querySelector("#nav-music meting-js").aplayer.toggle();
  },
  // 音乐伸缩
  musicTelescopic: function () {
    if (navMusicEl.classList.contains("stretch")) {
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("stretch");
    }
  },

  //音乐上一曲
  musicSkipBack: function () {
    document.querySelector("#nav-music meting-js").aplayer.skipBack();
  },

  //音乐下一曲
  musicSkipForward: function () {
    document.querySelector("#nav-music meting-js").aplayer.skipForward();
  },

  //获取音乐中的名称
  musicGetName: function () {
    var x = $(".aplayer-title");
    var arr = [];
    for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText;
    }
    return arr[0];
  },
};

// 如果有右键事件 可以在这里写。
addRightMenuClickEvent();

// 音乐绑定事件
function musicBindEvent() {
  document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
    anzhiyu.musicTelescopic();
  });
  document.querySelector("#nav-music .aplayer-button").addEventListener("click", function () {
    anzhiyu.musicToggle(false);
  });
}