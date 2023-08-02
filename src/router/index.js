import Vue from 'vue'
import Router from 'vue-router'

import MainView from '../views/HomeView/MainView.vue'

import LoginView from '../views/LoginView/LoginView.vue'

import ArticleView from '../views/ProjectView/ArticleView.vue'
import AddArticleView from '../views/ProjectView/AddArticleView.vue'

import ProjectView from '../views/SystemView/ProjectView.vue'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      meta: {
        title: "首页",
        needLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: "登录"
      }
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView,
      meta: {
        title: "文章管理",
        needLogin: true
      }
    },
    {
      path: '/addarticle',
      name: 'addarticle',
      component: AddArticleView,
      meta: {
        title: "添加文章",
        needLogin: true
      }
    },
    {
      path: '/project',
      name: 'projcet',
      component: ProjectView,
      meta: {
        title: "项目简介",
        needLogin: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log('1')
  console.log(to.meta.needLogin)
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    console.log('2')
    let token = localStorage.getItem('token')
    console.log(token)
    if (token) { // 判断是否已经登录
      console.log('y')
      next()
    }
    else {
      console.log('n')
      next({ path: '/login' }) //跳转到登录页
    }
  }
  else {
    next()
  }
})

router.afterEach(to => {
  console.log('jb')
  // 设置title
  document.title = to.meta.title;
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
