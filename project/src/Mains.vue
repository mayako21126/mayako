<template>
  <div class="row main  " style=" z-index: 10;">
    <router-view></router-view>
    <div class="col-xs-12 col-md-12 yg-footer-b" v-if="isIndex"
         style="position: absolute;width:100%;bottom:0px;left:0px">
      <div class="row middle-xs middle-md" style="justify-content: space-between">
        <div class="col-xs bottomx" style="width: 48px;">
          <a class="am-icon-btn am-icon-line-chart" external v-link="{ path: '/line',activeClass: 'active'}"></a>

          <p style="display: block">趋 势</p>
        </div>
        <div class="col-xs bottomx" style="">
          <a class="am-icon-btn am-icon-home" external v-link="{ path: '/home',activeClass: 'active' }"></a>

          <p style="display: block">主 页</p>
        </div>
        <div class="col-xs bottomx" style="width: 48px;">
          <a class="am-icon-btn am-icon-gear" external v-link="{ path: '/setting',activeClass: 'active' }"></a>

          <p style="display: block">设 置</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  引入模块
  import { getViewport } from './assets/js/app'

  document.body.style.height = getViewport()[1] + 'px'
  document.body.style.width = getViewport()[0] + 'px'
//  储存临时状态,后期需要可引入状态机
  sessionStorage.setItem("state", 1);
//  初始mains组件数据
  module.exports = {
    data: function () {
      return {
        authenticating: false,
        isIndex: true,
        height: getViewport()[1],
        width: getViewport()[0]
      }
    }
  }
</script>

<style>
  @import './assets/css/app.css';

  .bgmain {
    background-image: url('../static/i/testbg.png');
    background-size: cover;
    z-index: -1
  }

  .animated-transition {
    display: inline-block;
  }

  .animated-enter {
    animation: fadeInRight 300ms cubic-bezier(0.42, 0, 0.58, 1.0);
  }

  .animated-leave {
    animation: fadeOutRight 300ms cubic-bezier(0.42, 0, 0.58, 1.0);
  }

  @-webkit-keyframes fadeInRight {
    from {
      opacity: 1;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 1;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @-webkit-keyframes fadeOutRight {
    from {
      opacity: 1;
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
  }

  @keyframes fadeOutRight {
    from {
      opacity: 1;
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
