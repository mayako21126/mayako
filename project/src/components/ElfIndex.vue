<template>
  <div style="width:100%;height:100%">
    <div class="col-xs-12 col-md-12 yg-header">
      <div class="row middle-xs middle-md">
        <div class="col-xs-4">
          <span class="am-icon-map-marker am-icon-sm"></span><span v-text="City"></span>
        </div>
        <div class="col-xs-4">
          <span class="devSta" v-if="OnOff==1&&Del==0">设备已连接</span>
          <span class="devSta" v-else>设备未连接</span>
        </div>
        <div class="col-xs-4">
          <div id="div1" class="open1">
            <div id="div2" class="open2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-nav">
      <div class="row middle-xs middle-md">
        <div class="col-xs-6">
          <span>室外pm2.5:</span><span class="yellow" v-text="outpm25"></span>
        </div>
        <div class="col-xs-6">
          <span><span class="am-icon-skyatlas am-icon-sm"></span>天气:<span v-text="TianQi"></span></span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-content-top" style="">
      <img src="../assets/i/w.png" alt="" width="150%" style="position: absolute;bottom:51%;z-index: -1"
           class="animated fadeInRight daoying" id="bg" v-if="pmw">
      <img src="../assets/i/w2.png" alt="" width="150%" style="position: absolute;bottom:51%;z-index: -1"
           class="animated fadeInRight daoying" id="bg" v-else>

      <div class="row bottomEnd">
        <div class="col-xs-6 yg-content-top__left  zIndex999 paddingB30">
          <span style="display: inline-block;margin-left: -20px;width: 2em;text-align: center;" v-text="PM25"></span>

          <div><span id="weatherSta" v-bind:class="pmcolor" v-text="pmstate"></span>
            <span id="temp">ug/m3</span></div>
          <div class="yg-content-top__left__bottom "><span class="am-icon-tint"></span><span>室内pm2.5</span></div>

        </div>
        <div class="col-xs-6 zIndex999 text--right  paddingB30">
          <!--<img src="../assets/i/小精灵.png" alt="" width="120rem">-->
        </div>
        <div class="col-xs-12 " v-bind:class="pmmake" style="height: 15%;">

        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-content-bottom">
      <div class="row top-md top-xs middle-xs middle-md" style="padding-top: 0px">
        <div class="col-xs-6">
          <span class="yg-center-span" v-text="WenDu"></span><span style="font-size: 1em">℃</span>

          <div><img src="../assets/i/wd.png" width="8%">&nbsp;<span>温度</span></div>
        </div>
        <div class="col-xs-6">
          <span class="yg-center-span" v-text="ShiDu"></span><span style="font-size: 1em">%rh</span>

          <div><img src="../assets/i/sd.png" width="16%">&nbsp;<span>湿度</span></div>

        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-footer">
      <div class="row middle-xs middle-md" style="justify-content: space-between">


      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-footer-b">

    </div>
  </div>
</template>
<script>
//  引入模块
  import { apis, getViewport } from '../assets/js/app'
  var data = {}
  let int = ''
// 初始化
  export default {
    route: {
      canDeactivate: function (transition) {
        clearInterval(int)
        transition.next()
      }
    },
    data: function () {
      let data = {
        pmstate: '优秀',
        pmbg: {
          'index-bg-b': true,
          'index-bg-y': false
        },
        pmmake: {
          'make2': true,
          'make2-y': false
        },
        pmcolor: {
          'pmColor-g': true,
          'pmColor-y': false,
          'pmColor-r': false
        },
        pmw: true
      }
      return data
    },
    ready: function () {
      sessionStorage.setItem("state", 1);
      this.update(1);
      let vm = this
      int = self.setInterval(function () {
        vm.update(0);
      }, 30000)
    },
    methods: {
//      更新数据/初始化数据
      update: function (ns) {
        this.$http.post(apis + "/api_user.aspx/", {
          type: 112, careNotice: ns
        }).then(function (res) {
          console.log(res)
          res = JSON.parse(res.body)
          if (res.data[0].Del == 0) {
            var div2 = document.getElementById("div2");
            var div1 = document.getElementById("div1");
            div2.onclick = function () {
              div1.className = (div1.className == "close1") ? "open1" : "close1";
              div2.className = (div2.className == "close2") ? "open2" : "close2";
            }
            if (res.data[0].OnOff == 0 && ns == 1) {
              div1.className = (div1.className == "close1") ? "open1" : "close1";
              div2.className = (div2.className == "close2") ? "open2" : "close2";
            }
          } else {
            if (ns == 1) {
              alert('请添加设备!')
            }
          }
          if (res.errorCode == "1") {
            res.data[0].pmstate = '优秀'
            res.data[0].pmbg = {
              'index-bg-b': true,
              'index-bg-y': false
            }
            res.data[0].pmmake = {
              'make2': true,
              'make2-y': false
            }
            res.data[0].pmcolor = {
              'pmColor-g': true,
              'pmColor-y': false,
              'pmColor-r': false
            }
            res.data[0].pmw = true
            res.data[0].PM25S = res.data[0].PM25
            delete res.data[0].PM25
            data = res.data[0];
            console.log(data)
            console.log(this.$data)
            this.$data = data;
            this.PM25 = res.data[0].PM25S
            localStorage.setItem('NickName', data.NickName)
            localStorage.setItem('headimgurl', data.headimgurl)
          }
        });
      },
      share: function () {
        shareButton();
      }
    },
    computed: {
//      PM2.5的计算属性 因一开始设计稿的问题,导致不得不操作body的dom
      PM25: {
        get: function () {
          return this.PM25S
        },
        set: function (newValue) {
          this.PM25S = newValue
          if (newValue >= 0) {
            this.pmstate = '优秀'
            this.pmbg = {
              'index-bg-b': true,
              'index-bg-y': false
            }
            this.pmmake = {
              'make2': true,
              'make2-y': false
            }
            this.pmcolor = {
              'pmColor-g': true,
              'pmColor-y': false,
              'pmColor-r': false
            }
            this.pmw = true
            document.querySelector('#body').setAttribute("class", 'index-html index-bg-b');
            localStorage.setItem('class', 'index-bg-b')
          }
          if (newValue >= 35) {
            this.pmstate = '良好'
            this.pmbg = {
              'index-bg-b': true,
              'index-bg-y': false
            }
            this.pmmake = {
              'make2': true,
              'make2-y': false
            }
            this.pmcolor = {
              'pmColor-g': true,
              'pmColor-y': false,
              'pmColor-r': false
            }
            this.pmw = true
            document.querySelector('#body').setAttribute("class", 'index-html index-bg-b');
            localStorage.setItem('class', 'index-bg-b')
          }
          if (newValue >= 75) {
            this.pmstate = '轻度污染'
            this.pmbg = {
              'index-bg-b': false,
              'index-bg-y': true
            }
            this.pmmake = {
              'make2': false,
              'make2-y': true
            }
            this.pmcolor = {
              'pmColor-g': false,
              'pmColor-y': true,
              'pmColor-r': false
            }
            this.pmw = false
            document.querySelector('#body').setAttribute("class", 'index-html index-bg-y');
            localStorage.setItem('class', 'index-bg-y')
          }
          if (newValue >= 115) {
            this.pmstate = '中度污染'
            this.pmbg = {
              'index-bg-b': false,
              'index-bg-y': true
            }
            this.pmmake = {
              'make2': false,
              'make2-y': true
            }
            this.pmcolor = {
              'pmColor-g': false,
              'pmColor-y': true,
              'pmColor-r': false
            }
            this.pmw = false
            document.querySelector('#body').setAttribute("class", 'index-html index-bg-y');
            localStorage.setItem('class', 'index-bg-y')
          }
          if (newValue >= 150) {
            this.pmstate = '重度污染'
            this.pmbg = {
              'index-bg-b': false,
              'index-bg-y': true
            }
            this.pmmake = {
              'make2': false,
              'make2-y': true
            }
            this.pmcolor = {
              'pmColor-g': false,
              'pmColor-y': false,
              'pmColor-r': true
            }
            this.pmw = false
            document.querySelector('#body').setAttribute("class", 'index-html index-bg-y');
            localStorage.setItem('class', 'index-bg-y')
          }
          if (newValue >= 200) {
            this.pmstate = '严重污染'
            this.pmbg = {
              'index-bg-b': false,
              'index-bg-y': true
            }
            this.pmmake = {
              'make2': false,
              'make2-y': true
            }
            this.pmcolor = {
              'pmColor-g': false,
              'pmColor-y': false,
              'pmColor-r': true
            }
            this.pmw = false
            document.querySelector('#body').setAttribute("class", 'index-html index-bg-y');
            localStorage.setItem('class', 'index-bg-y')
          }
        }
      }
    }
  }

</script>

