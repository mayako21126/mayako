<template>
  <div class="page page-current " transition='animated' v-bind:class="class">
    <div class="col-xs-12 col-md-12 yg-header">
      <div class="row middle-xs middle-md">
        <div class="col-xs-4">
          <span class="am-icon-map-marker am-icon-arrow-left size3"
                v-link="{path:'/setting'}"></span>
        </div>
        <div class="col-xs-4">
          <span class="devSta size2">我的设备</span>
        </div>
        <div class="col-xs-4">
          <span class="am-icon-home size3"  v-link="{path:'/home'}"></span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-dev-content">
      <div class="row start-xs start-md">
        <div class="am-tabs yg-dev-tabs" id="doc-tab-demo-1">
          <div class="am-tabs-bd">
            <div class="am-tab-panel am-active" v-cloak>
              <div class="row middle-xs middle-md elf-dev" style="height: 20rem;" v-for="elf of elfs">
                <div class="col-xs-7 text--center">
                  <img src="../assets/i/elf.png" alt="" style="width: 12rem;">
                  <span class="changeSpan spanCenter" v-on:click="open" name="{{elf.MID}}">查看</span>
                </div>
                <div class="col-xs-5 text--center">
                  <label for="radio-2-6" class="elf-name" v-text="elf.GoodName"></label>
                  <br>

                  <div class="yg-dev-content__elf—right-div">
                    <span><img src="../assets/i/change.png" alt="" data-goodid="{{elf.GoodID}}"  v-on:click="changeName($event, $index)"></span>

                    <span><input type="radio" id="radio-2-6" name="radio-2-set" class="regular-radio big-radio"
                                 data-name="{{elf.MID}}" v-on:click="changeDev"></span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  <router-view  :mid="mid" :goodid="goodid" :itemtype="itemtype" :winindex="winindex" :nickname='nickname' ></router-view>
</template>
<style>
  @import '../assets/js/need/layer.css';
</style>
<script>
//  引入模块
  import { apis, getViewport } from '../assets/js/app'
//  初始化与prop传值
  var data = {}
  export default {
    data: function () {
      return { mid: '', goodid: '', winindex: '', itemtype: 0, nickname: '' }
    },
    props: {
      height: null,
      width: null
    },
    ready: function () {
      document.body.querySelector('.am-tabs-bd').style.height = (getViewport()[1] * 0.77)+'px'
      document.body.querySelector('.am-tab-panel').style.minHeight = (getViewport()[1] * 0.77)+'px'
      this.$http.post(apis + "/api_user.aspx/", {
        type: 102, FatherMID: -1
      }).then(function (res) {
        console.log(res)
        res = JSON.parse(res.body)
        if (res.errorCode == "1") {
          data.elfs = res.data
          data.class = localStorage.getItem('class')
          console.log(data)
          this.$data = data
        }
      })
    },
    methods: {
      open: function (event) {
        this.mid = event.target.getAttribute('name')
        router.go('/setting/myDev/myDevCh')
      },
      changeDev: function (event) {
        layer.open({
          type: 2,
          content: '更新中..',
          shade: true,
          shadeClose: false,
          anim: true
        })
        this.$http.post(apis + "/api_user.aspx/", {
          type: 105, MID: event.target.getAttribute('data-name')
        }).then(function (res) {
          layer.closeAll()
          res = JSON.parse(res.body);
          if (res.errorCode == "1") {
            alert("切换成功")
          }
        })
      },
      changeName: function (event, index) {
        this.goodid = event.target.getAttribute('data-goodid')
        this.winindex = index
        this.nickname = this.elfs[index].GoodName
        this.itemtype = 0
        router.go('/setting/myDev/changeName')
      }
    }
  }
</script>
