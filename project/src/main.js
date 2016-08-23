import Vue from 'vue'
import Main from './Mains'
import VueRouter from 'vue-router'
import elf from './components/ElfIndex.vue'
import line from './components/Line.vue'
import setting from './components/Setting.vue'
import change from './components/Change.vue'
import myDev from './components/MyDev.vue'
import myDevCh from './components/MyDevCh.vue'
import fed from './components/Fed.vue'
import info from './components/Info.vue'
import changeName from './components/ChangeName.vue'
import VueResource from 'vue-resource'
//引入组件并使用2个模块
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.emulateJSON = true

var AppS = Main
//hash路由开启
var router = new VueRouter({
  hashbang: true
})
//map映射
router.map({
  '/home': {
    component: elf
  },
  '/line': {
    component: line
  },
  '/setting': {
    component: setting,
    subRoutes: {
      '/change': {
        component: change
      },
      '/fed': {
        component: fed
      },
      '/info': {
        component: info
      },
      '/myDev': {
        component: myDev,
        subRoutes: {
          '/myDevCh': {
            component: myDevCh,
            subRoutes: {
              '/changeName': {
                component: changeName
              }
            }
          },
          '/changeName': {
            component: changeName
          }
        }
      }
    }
  }
})
//设置初始页面
router.redirect({
  '/': '/home'
})
//路由切换前后钩子函数
router.beforeEach(function (transition) {
  var toPath = transition.to.path
  console.info()
  if (toPath.replace(/[^/]/g, '').length > 1) {
    router.app.isIndex = false
  } else {
    router.app.isIndex = true
  }
  transition.next()
})

router.afterEach(function (transition) {
  console.log('成功浏览到: ' + transition.to.path)
})

router.start(AppS, '#main')

window.router = router
