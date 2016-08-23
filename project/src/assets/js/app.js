//视图大小初始化模块,用来处理vw vh属性不兼容的情况
export function getViewport() {
  let viewPortWidth
  let viewPortHeight
  if (typeof window.innerWidth !== 'undefined') {
    viewPortWidth = window.innerWidth
    viewPortHeight = window.innerHeight
  } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
    viewPortWidth = document.documentElement.clientWidth
    viewPortHeight = document.documentElement.clientHeight
  } else {
    viewPortWidth = document.getElementsByTagName('body')[0].clientWidth
    viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
  }
  return [viewPortWidth, viewPortHeight]
}
// api公共模块变量 可改为常量
export var apis="http://admin.sundynamictech.com/"

// get取值,不过大部分情况用不到
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
// 计算剩余字数
export function statInputNum(textArea, numItem) {
  var max = numItem.text()
  var curLength
  textArea[0].setAttribute("maxlength", max);
  curLength = textArea.val().length;
  numItem.text(max - curLength);
  textArea.on('input propertychange', function () {
    var _value = $(this).val().replace(/\n/gi, "");
    numItem.text(max - _value.length);
  });
}
// wx初始化函数
export function wxready (wx, vm) {
  var url = location.href.split('#')[0];
  vm.$http.post(apis + "/api_weixin.aspx/", {
    url: url
  }).then(function (res) {
    console.log(res)
    res = res.body
    res = JSON.parse(res);
    wx.config({
      debug: false,
      appId: 'wx714265fedd287d3a',
      timestamp: res.Timestamp,
      nonceStr: res.Noncestr,
      signature: res.Sign,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'onVoicePlayEnd',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
    });
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: '分享标题',
        link: "http://admin.sundynamictech.com/wx/show.html",
        imgUrl: "分享图标的url,以http或https开头"
      });
      wx.onMenuShareAppMessage({
        title: '分享标题',
        desc: "分享描述",
        link: "http://admin.sundynamictech.com/wx/show.html",
        imgUrl: "分享图标的url,以http或https开头",
        type: 'link'
      });
    });
  });
}
//分享函数调用与mask效果
export function shareButton() {
  if (m$('#mask') == null) {
    var node = document.createElement('div')
    node.setAttribute('id', 'mask')
    node.style.display = 'block'
    node.onclick = function () {
      m$('#mask').style.display = 'none'
    }
    var img = document.createElement('img')
    img.setAttribute('src', '../assets/i/share.png')
    node.appendChild(img)
    console.log(m$('body'))
    m$('body').appendChild(node)
  } else {
    m$('#mask').style.display = 'block'
  }
}
// 简易选择器,用来处理少数情况下不得不操作dom的情况
var m$fn = function (selectName) {
  this.selectName = selectName
  this.obj = this.selectElement()
  return this;
}
m$fn.prototype = {
  'selectElement': function () {
    if (typeof this.selectName == 'object') {
      return this.selectName
    } else if (this.selectName.indexOf("#") != -1) {
      return document.querySelector(this.selectName)
    } else if (this.selectName.indexOf(".") != -1) {
      return document.querySelectorAll(this.selectName)
    } else if (this.selectName.indexOf("@") != -1) {
      return document.querySelector(this.selectName)
    } else {
      return document.querySelector(this.selectName)
    }
  }
}
window.m$ = function (selectName) {
  return new m$fn(selectName).obj
};
window.m$eventStack = {};
