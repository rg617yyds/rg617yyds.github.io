//顶部栏修改
// 返回顶部 显示网页阅读进度
window.onscroll = percent;// 执行函数
// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
        result = Math.round(a / b * 100), // 计算百分比
        btn = document.querySelector("#percent"); // 获取图标

        result<=99||(result=99),btn.innerHTML=result
}

document.getElementById("page-name").innerText=document.title.split(" | 十七")[0];


// 评论弹幕
function switchCommentBarrage(){
    let commentBarrage = document.querySelector('.comment-barrage');
    if(commentBarrage){
        $(commentBarrage).toggle()
    }
}


//评论放大修改
// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
// 表情放大
function owoBig() {
    let flag = 1, // 设置节流阀
        owo_time = '', // 设置计时器
        m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div'),
        body = document.querySelector('body');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    body.appendChild(div)

    // 构造observer
    let observer = new MutationObserver(mutations => {

        for (let i = 0; i < mutations.length; i++) {
            let dom = mutations[i].addedNodes,
                owo_body = '';
            if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
            // 如果需要在评论内容中启用此功能请解除下面的注释
            // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
            else continue;
            
            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
            // 鼠标移入
            owo_body.onmouseover = (e) => {
                    if (flag && e.target.tagName == 'IMG') {
                        flag = 0;
                        // 移入300毫秒后显示盒子
                        owo_time = setTimeout(() => {
                            let height = e.path[0].clientHeight * m, // 盒子高
                                width = e.path[0].clientWidth * m, // 盒子宽
                                left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
                                top = e.y - e.offsetY; // 盒子与屏幕顶部距离

                            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
                            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
                            // 设置盒子样式
                            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                            // 在盒子中插入图片
                            div.innerHTML = `<img src="${e.target.src}">`
                        }, 300);
                    }
                };
            // 鼠标移出隐藏盒子
            owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
        }

    })
    observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }) // 监听的 元素 和 配置项
}

// 切换壁纸
// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: 'var(--leonus-blue)',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    <h2 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)" class="pimgbox" onclick="changeBg('url(https\://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-1.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-1.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-2.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-2.jpg)')"></a>
    // <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-3.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-3.jpg)')"></a>
    // <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-4.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-4.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-5.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-5.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-6.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-6.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-7.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-7.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-8.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-8.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/ph/ph-9.jpg)" class="pimgbox" onclick="changeBg('url(/img/ph/ph-9.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-12.jpg)" class="pimgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-12.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-14.jpg)" class="pimgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-14.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-15.jpg)" class="pimgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-15.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-16.jpg)" class="pimgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-16.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-13.jpg)" class="pimgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/ph-13.jpg)')"></a>
    </div>
    
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/header1.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/header1.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/bj/bj-58.jpg)" class="imgbox" onclick="changeBg('url(/img/bj/bj-58.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/bj/bj-56.jpg)" class="imgbox" onclick="changeBg('url(/img/bj/bj-56.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/bj/bj-57.jpg)" class="imgbox" onclick="changeBg('url(/img/bj/bj-57.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/bj/bj-59.jpg)" class="imgbox" onclick="changeBg('url(/img/bj/bj-59.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/bj/bj-60.jpg)" class="imgbox" onclick="changeBg('url(/img/bj/bj-60.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/bj/bj-67.jpg)" class="imgbox" onclick="changeBg('url(/img/bj/bj-67.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/bj/bj-62.jpg)" class="imgbox" onclick="changeBg('url(/img/bj/bj-62.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-79.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-79.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-81.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-81.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-49.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-49.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-84.png)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-84.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-82.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-82.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-42.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-42.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-39.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-39.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-35.jpg)" class="imgbox" onclick="changeBg('url(https://cdn.staticaly.com/gh/rg617yyds/lcl-img@master/urllcl/bj-35.jpg)')"></a>
    </div>
    
    
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #78ffd6, #a8ff78)" onclick="changeBg('linear-gradient(to right, #78ffd6, #a8ff78)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #C6FFDD, #fbd786,#f7797d)" onclick="changeBg('linear-gradient(to right, #C6FFDD, #fbd786,#f7797d)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #0A6EDE, #fffde4)" onclick="changeBg('linear-gradient(to right, #0A6EDE, #fffde4)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #59C173, #a17fe0, #5D26C1)" onclick="changeBg('linear-gradient(to right, #59C173, #a17fe0, #5D26C1)')"></a>
    </div>
    
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow"  class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a>
    <a href="javascript:;" rel="noopener external nofollow"  class="box" style="background: #0A6EDE" onclick="changeBg('#0A6EDE')"></a>
    <a href="javascript:;" rel="noopener external nofollow"  class="box" style="background: #a17fe0" onclick="changeBg('#a17fe0')"></a>
    <a href="javascript:;" rel="noopener external nofollow"  class="box" style="background: #59C173" onclick="changeBg('#59C173')"></a>
    <a href="javascript:;" rel="noopener external nofollow"  class="box" style="background: #40E0D0" onclick="changeBg('#40E0D0')"></a>
    <a href="javascript:;" rel="noopener external nofollow"  class="box" style="background: #5D26C1" onclick="changeBg('#5D26C1')"></a>
    <a href="javascript:;" rel="noopener external nofollow"  class="box" style="background: #F16529" onclick="changeBg('#F16529')"></a>
    </div>
`;
}

// 适应窗口大小
function winResize() {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}


/* 复制提醒 */
// document.querySelector('body').addEventListener("copy",function(e){
//     new Vue({
//         data:function(){
//             this.$notify({
//                 title:"哟西！复制成功",
//                 message:"✨我宣布你的剪切板已经被我填满了",
//                 position: 'bottom-right',
//                 offset: 50,
//                 showClose: false,
//                 type:"success"
//             });
//             return{visible:false}
//         }
//     })
// })


/** 监听copy事件 */
document.addEventListener("copy",function(e){
  //复制的内容
  btf.snackbarShow('复制成功，请遵循GPL协议', false, 3000)
})

// 检测按键
window.onkeydown = function (e) {
  if (e.keyCode === 123) {
    btf.snackbarShow('开发者模式已打开，请遵循GPL协议', false, 3000)
  }
}



function catalogActive () {
    let $list = document.getElementById('catalog-list')
    if ($list) {
      // 鼠标滚轮滚动
      $list.addEventListener('mousewheel', function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2
        // 阻止浏览器默认方法
        e.preventDefault()
      }, false)
  
      // 高亮当前页面对应的分类或标签
      let $catalog = document.getElementById(decodeURIComponent(window.location.pathname))
      $catalog.classList.add('selected')
  
      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = ($catalog.offsetLeft - $list.offsetLeft) - ($list.offsetWidth - $catalog.offsetWidth) / 2
    }
  }
  catalogActive()

// 切换热评
// function switchCommentBarrage () {
//     let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
//     document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
//     // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
//     window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
//   }



// 即可短文
var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (e) {
    if (e == "undefined" || e == "null") e = "好棒！";
    var n = document.getElementsByClassName("el-textarea__inner")[0],
      t = document.createEvent("HTMLEvents");
    if (!n) return;
    t.initEvent("input", !0, !0);
    var o = replaceAll(e, "\n", "\n> ");
    (n.value = "> " + o + "\n\n"), n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
      n.focus(),
      n.setSelectionRange(-1, -1),
      document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show");
  },
  initIndexEssay: function () {
    setTimeout(() => {
      let essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
        passiveListeners: true,
        direction: "vertical",
        loop: true,
        autoplay: {
          disableOnInteraction: true,
          delay: 3000,
        },
        mousewheel: true,
      });

      let essay_bar_comtainer = document.getElementById("bbtalk");
      if (essay_bar_comtainer !== null) {
        essay_bar_comtainer.onmouseenter = function () {
          essay_bar_swiper.autoplay.stop();
        };
        essay_bar_comtainer.onmouseleave = function () {
          essay_bar_swiper.autoplay.start();
        };
      }
    }, 100);
  },
};

anzhiyu.initIndexEssay();
anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();
