import Vue from 'vue'
import Router from 'vue-router'

import MainView from '../views/HomeView/MainView.vue'

import LoginView from '../views/LoginView/LoginView.vue'
import ChangePasswordView from '../views/LoginView/ChangePasswordView.vue'
import RegisterView from '../views/LoginView/RegisterView.vue'

import ArticleView from '../views/ProjectView/ArticleView.vue'
import AddArticleView from '../views/ProjectView/AddArticleView.vue'
import EditArticleView from '../views/ProjectView/EditArticleView.vue'

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
      path: '/changepassword',
      name: 'changepassword',
      component: ChangePasswordView,
      meta: {
        title: "修改密码",
        needLogin: true
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
      path: '/editarticle',
      name: 'editarticle',
      component: EditArticleView,
      meta: {
        title: "修改信息",
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
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: "注册新账号",
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    let token = localStorage.getItem('token')
    if (token) { // 判断是否已经登录
      next()
    }
    else {
      next({ path: '/login' }) //跳转到登录页
    }
  }
  else {
    next()
  }
})

router.afterEach(to => {
  // 设置title
  document.title = to.meta.title;
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
