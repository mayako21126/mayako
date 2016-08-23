<template>
  <div class="page page-current " transition='animated' v-bind:class="class">


  <div class="col-xs-12 col-md-12 yg-header">
    <div class="row middle-xs middle-md">
      <div class="col-xs-4">
        <span class="am-icon-map-marker am-icon-arrow-left size3" v-on:click="historyBack"></span>
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
            <input type="text" class="reg-name" placeholder="昵称" id="name" maxlength="10" value="{{nickname}}">
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
  import { apis } from '../assets/js/app'

  export default {
    data: function () {
      return { class: localStorage.getItem('class') }
    },
    props: {
      height: null,
      width: null,
      mid: null,
      goodid: null,
      winindex: null,
      itemtype: null,
      nickname: null
    },
    methods: {
      change: function (event) {
        var goodid = this.goodid
        this.$http.post(apis + '/api_user.aspx/', {
          type: 107, newName: document.body.querySelector('#name').value, GoodID: goodid
        }).then(function (res) {
          console.log(res)
          res = JSON.parse(res.body)
          if (res.errorCode == '1') {
            if (this.itemtype == 1) {
              this.$parent.wins[Number(this.winindex)].GoodName = document.body.querySelector('#name').value
              window.alert('修改成功!')
              router.go('/setting/myDev/myDevCh')
            } else {
              this.$parent.elfs[Number(this.winindex)].GoodName = document.body.querySelector('#name').value
              window.alert('修改成功!')
              router.go('/setting/myDev')
            }
          }
        })
      },
      historyBack: function () {
        if (this.itemtype == 1) {
          router.go('/setting/myDev/myDevCh')
        } else {
          router.go('/setting/myDev')
        }
      }
    }
  }
</script>
