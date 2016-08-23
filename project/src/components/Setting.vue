<template>
  <div id="my" style="height: 100%;width:100%">
    <div class="col-xs-12 col-md-12 yg-header">
      <div class="row middle-xs middle-md">
        <div class="col-xs-4">
          <!--<span class="am-icon-map-marker am-icon-arrow-left size3"></span>-->
        </div>
        <div class="col-xs-4">
          <span class="devSta size2">设置</span>
        </div>
        <div class="col-xs-4">

        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-set-content">
      <div class="row start-md start-xs">

        <div class="col-xs-8 selfBaseline" style="height: 20%">
          <img alt="..." class="am-img-thumbnail am-circle userimg" :src= '$data.img'>
          <span>{{NickName}}</span>

        </div>
        <div class="col-xs-4 selfBaseline text--right" v-link="{ path: '/setting/change'}" external>
          <span class="changeSpan mr0"><span class="am-icon-pencil"></span>&nbsp;修改</span>
        </div>
        <div class="col-xs-12 yg-set-content__item" v-link="{ path: '/setting/myDev'}" external>
          <div class="size2">
            <span class="am-icon-home"></span>&nbsp;&nbsp;<span>我的设备</span>
          </div>
          <div>
            <span class="am-icon-angle-right size3"></span>
          </div>
        </div>
        <div class="col-xs-12 yg-set-content__item" v-link="{ path: '/setting/info'}" external>
          <div class="size2">
            <span class="am-icon-home"></span>&nbsp;&nbsp;<span>功能介绍</span>
          </div>
          <div>
            <span class="am-icon-angle-right size3"></span>
          </div>
        </div>
        <div class="col-xs-12 yg-set-content__item" v-link="{ path: '/setting/fed'}" external>
          <div class="size2">
            <span class="am-icon-home"></span>&nbsp;&nbsp;<span>反馈信息</span>
          </div>
          <div>
            <span class="am-icon-angle-right size3"></span>
          </div>
        </div>
        <div class="col-xs-12 yg-set-content__item" v-on:click="call">
          <div class="size2">
            <span class="am-icon-home"></span>&nbsp;&nbsp;<span>客服电话:888888888</span>
          </div>
        </div>
        <div class="col-xs-12 yg-set-content__item" v-on:click="share">
          <div class="size2">
            <span class="am-icon-share-square-o"></span>&nbsp;&nbsp;<span>分享</span>
          </div>
        </div>
        <div class="col-xs-8 " style="height: 5%">

        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 yg-footer-b">

    </div>

  </div>
  <div id="mask" style="display: block;" v-if="mask" v-on:click="maskB" ><img src="../assets/i/share.png"></div>
  <router-view >
  </router-view>
</template>
<script>
//  引入模块
  import { layers } from '../assets/js/layer'
  import { shareButton, wxready } from '../assets/js/app'
  import wx from 'weixin-js-sdk'

  layers()
  export default {
    data: function () {
      return { mask: false, img: localStorage.getItem('headimgurl'), NickName: localStorage.getItem('NickName') }
    },
    ready: function () {
//      初始化wx
      wxready(wx, this)
    },
    methods: {
      NickName: {
        set: function (NickName) {
          localStorage.setItem('NickName', NickName)
        }
      },
      demo: function () {
        layer.open({
          type: 2,
          content: '启动中..',
          shade: true,
          shadeClose: false,
          anim: true
        });
        window.alert('1')
        layer.closeAll()
      },
      share: function () {
          this.mask = true
      },
      maskB: function () {
          this.mask = false
      },
      call: function () {
        window.location.href = 'tel://' + 88888888;
      }
    }
  }
</script>
