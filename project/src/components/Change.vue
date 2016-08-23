<template>
  <div  class="page page-current" v-bind:class="class" transition='animated'>


  <div class="col-xs-12 col-md-12 yg-header">
    <div class="row middle-xs middle-md">
      <div class="col-xs-4">
        <span class="am-icon-map-marker am-icon-arrow-left size3" v-link="{path:'/setting'}"></span>
      </div>
      <div class="col-xs-4">
        <span class="devSta size2">修改昵称</span>
      </div>
      <div class="col-xs-4">

      </div>
    </div>
  </div>
  <div class="col-xs-12 col-md-12 " style="height: 90%">
    <div class="row start-xs start-md">
      <DIV class="am-form am-form-horizontal col-xs-12 col-md-12">
        <div class="am-form-group">

          <div class="am-u-sm-12 col-xs-12 col-md-12">
            <input type="text" class="reg-name" placeholder="昵称" id="name">
            <!--<small>输入你的名字，让我们记住你。</small>-->
          </div>
        </div>

      </DIV>
    </div>
    <div class=" yg-dev-footer">
      <button type="button" class="am-btn am-btn-success" v-on:click="change">确认</button>
    </div>

  </div>
  </div>
</template>

<script>
//  引入apis公共模块变量
  import { apis } from '../assets/js/app'
// 初始化
  export default {
    data: function () {
      return { class: localStorage.getItem('class') }
    },
    methods: {
      change: function (event) {
        this.$http.post(apis + '/api_user.aspx/', {
          type: 103, NickName: document.body.querySelector('#name').value
        }).then(function (res) {
          console.log(res)
          res = JSON.parse(res.body)
          if (res.errorCode === '1') {
            window.alert('修改成功')
            this.$parent.NickName = document.body.querySelector('#name').value //父子组件本应单向流动,改名耦合度比较高,所以逆向传制 有更好的想法会改之
            router.go('/setting')
          }
        })
      }
    }
  }
</script>
