<template>
  <div class="page page-current " transition='animated' v-bind:class="class" >
    <div class="col-xs-12 col-md-12 yg-header">
      <div class="row middle-xs middle-md">
        <div class="col-xs-4">
          <span class="am-icon-map-marker am-icon-arrow-left size3" v-link="{path:'/setting'}"></span>
        </div>
        <div class="col-xs-4">
          <span class="devSta size2">反馈信息</span>
        </div>
        <div class="col-xs-4">

        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-12 " style="height: 90%;overflow: hidden;">
      <div class="row start-xs start-md">
        <div class="am-form am-form-horizontal col-xs-12 col-md-12">
          <div class="am-form-group" style="padding-top: 10px">

            <div class="title"><span>服务态度</span>
              <input id="input-id" type="number" class="rating" min=0 max=5 step=0.5 data-size="sm">
            </div>
            <div class="title"><span>服务态度</span>
              <input id="input-id2" type="number" class="rating" min=0 max=5 step=0.5 data-size="sm">
            </div>

            <div class="am-u-sm-12 col-xs-12 col-md-12">
              <textarea name="" cols="30" rows="10" id="fedArea" class="fedArea" maxlength="500"></textarea>
              <span class="fedCount" id="show"><var class="word">200</var>/200</span>
            </div>
          </div>

        </div>
      </div>
      <div class=" yg-dev-footer">
        <button type="button" class="am-btn am-btn-success" v-on:click="fed">提交</button>
      </div>

    </div>

  </div>
</template>
<style>
  @import '../assets/css/star.css';
</style>
<script>
//  引入jquery和插件
  import $ from 'jquery'
  import { star } from '../assets/js/star'
  import { statInputNum, apis } from '../assets/js/app'

  export default {
    data: function () {
      return { class: localStorage.getItem('class') }
    },
    ready: function () {
      window.$ = $
      star($)
      $("#input-id").rating();
      $("#input-id2").rating();
      statInputNum($('#fedArea'), $('.word'));
    },
    methods: {
//      这页因插件兼容原因,未做绑定
      fed: function (event) {
        this.$http.post(apis + "/api_user.aspx/", {
          type: 104,
          FuWuStar: document.body.querySelector('#input-id').value,
          AnZhuangStar: document.body.querySelector('#input-id2').value,
          Info: document.body.querySelector('#fedArea').value,
          InfoType: 2
        }).then(function (res) {
          console.log(res)
          res = JSON.parse(res.body)
          if (res.errorCode == "1") {
            alert("提交成功")
            router.go('/setting')
          }
        })
      }
    }
  }
</script>
