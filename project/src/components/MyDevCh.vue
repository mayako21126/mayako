<template>
  <div class="page page-current " transition='animated' v-bind:class="class">
    <div class="col-xs-12 col-md-12 yg-header">
      <div class="row middle-xs middle-md">
        <div class="col-xs-4">
          <span class="am-icon-map-marker am-icon-arrow-left size3" v-link="{path:'/setting/myDev'}"></span>
        </div>
        <div class="col-xs-4">
          <span class="devSta size2">我的设备</span>
        </div>
        <div class="col-xs-4">
          <span class="am-icon-home size3"  v-link="{path:'/setting'}"></span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-dev-content">
      <div class="row start-xs start-md">
        <div class="am-tabs yg-dev-tabs" id="doc-tab-demo-1">
          <div class="am-tabs-bd">
            <div class="am-tab-panel am-active" v-cloak>
              <div class="row middle-xs middle-md kqc-dev" v-for="win of wins" name="{{win.MID}}" v-if="win.Del!=1">
                <div class="col-xs-10">
                  <div class="am-progress">
                    <div class="am-progress-bar text--right"
                         v-bind:style="{ width:parseInt(((win.LifeLength-win.days)/win.LifeLength)*100)+'%'}">
                                            <span class="tag">
                                            <div class="arrow">
                                                <em></em>
                                            </div>
                                             {{parseInt(((win.LifeLength-win.days)/win.LifeLength)*100)}}%
                                        </span>
                    </div>
                  </div>
                </div>
                <div class="col-xs-2 text--right whiteT255">
                  消耗
                </div>
                <div class="col-xs-10 text--right whiteT255">
                  <span class="nameSpan" v-text="win.GoodName">空气窗</span>
                  <span><img class="changeSpan--c-img" src="../assets/i/change.png" alt="" data-goodid="{{win.GoodID}}"
                             v-on:click="changeName($event, $index)"></span>
                  <span><img class="changeSpan--c-img" src="../assets/i/del.png" alt="" data-index="{{$index}}"
                             data-goodid="{{win.GoodID}}" v-on:click="del"></span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <div class=" yg-dev-footer">
        <button type="button" class="am-btn am-btn-success" v-on:click='qr'>添加</button>
      </div>
    </div>
  </div>
  <router-view :mid="mid" :goodid="goodid" :winindex="winindex" :itemtype="itemtype" :nickname='nickname'
               transition='animated'></router-view>
</template>
<style>
  @import '../assets/js/need/layer.css';
</style>
<script>
  import { apis, getViewport, wxready } from '../assets/js/app'
  import wx from 'weixin-js-sdk'
  var data = {};

  export default {
    data: function () {
      return {goodid: '', winindex: '', itemtype: 1, class: localStorage.getItem('class'), nickname: ''}
    },
    props: {
      height: null,
      width: null,
      mid: null
    },
    ready: function () {
      document.body.querySelectorAll('.am-tabs-bd')[1].style.height = (getViewport()[1] * 0.77) + 'px'
      document.body.querySelectorAll('.am-tab-panel')[1].style.minHeight = (getViewport()[1] * 0.77) + 'px'
      var mid = this.mid
      this.$http.post(apis + "/api_user.aspx/", {
        type: 102, FatherMID: mid
      }).then(function (res) {
        data.class = localStorage.getItem('class')
        console.log(res)
        res = JSON.parse(res.body)
        if (res.errorCode == "1") {
          data.wins = res.data;
          data.progress = 0;
          this.$data = data;
          wxready(wx, this)
        }
      })
    },
    methods: {
      qr: function () {
        console.log(data.wins);
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            var mid = getQueryString("mid");
            Vue.http.post(apis + "/api_user.aspx/", {
              type: 111, FatherMID: mid, Mid: result
            }).then(function (res) {
              console.log(res);
              var x = data.wins.length;
              res = JSON.parse(res.body);
              if (res.errorCode == "1") {
                if (res.data[0].has == 1) {
                  vm.wins.$set(x, {
                    'LifeLength': res.data[0].LifeLength,
                    'GoodID': res.data[0].GoodID,
                    'GoodName': res.data[0].GoodName,
                    'MID': res.data[0].MID,
                    'days': res.data[0].days,
                    'Del': res.data[0].Del,
                    'FatherMID': res.data[0].FatherMID
                  })
                  alert("添加成功")
                }
                if (res.data[0].has == 0) {
                  alert("你已经添加过")
                }
                if (res.data[0].has == -1) {
                  alert("该产品序号不合法")
                }
              } else {
                alert("添加失败")
              }
            });
          }
        });
      },
      changeName: function (event, index) {
        this.goodid = event.target.getAttribute('data-goodid')
        this.winindex = index
        this.nickname = this.wins[index].GoodName
        console.log(this.nickname)
        this.itemtype = 1
        router.go('/setting/myDev/myDevCh/changeName')
      },
      del: function (event) {
        var index = event.target.getAttribute('data-index')
        index = Number(index)
        layer.open({
          type: 2,
          content: '删除中..',
          shade: true,
          shadeClose: false,
          anim: true
        });
        this.$http.post(apis + "/api_user.aspx/", {
          type: 108, GoodID: event.target.getAttribute('data-goodid')
        }).then(function (res) {
          layer.closeAll()
          console.log(res)
          res = JSON.parse(res.body)
          if (res.errorCode == "1") {
            data.wins.splice(index, 1)
            alert("删除成功")
          } else {
            alert("删除失败")
          }
        })
      }
    },
    computed: {
      b: {
        get: function () {
          return this.progress
        }, set: function (x) {
          // `this` 指向 vm 实例
          this.progress = (((170 - x) / 170) * 100 + '%');
          return this.progress
        }
      }
    }
  }
</script>
