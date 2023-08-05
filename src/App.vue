<template>
  <div id="app">
    <el-header height="40px">
      <div style="height:20px;display: flex;justify-content: space-between;line-height:2;">
        <div style="font-size:20px;width: 800px;" @click="gotoMainView">
          实习项目 | CRUD与数据可视化
        </div>
        <div style="font-size:20px;margin-left: 100px;">
          <el-dropdown>
            <div style="text-alxign:right">
              <span>logined user: {{ user }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="gotoMainView">首页</el-dropdown-item>
              <el-dropdown-item @click.native="gotoProjectView">关于</el-dropdown-item>
              <el-dropdown-item @click.native="gotoChangePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="gotoLogout">退出登录</el-dropdown-item>
              <el-dropdown-item @click.native="DeleteAccount">注销账户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-promotion"></i>首页</template>
            <el-menu-item index="1-1" @click="gotoMainView">
              <template slot="title"><i class="el-icon-odometer"></i>仪表盘</template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>本地数据管理</template>
            <el-menu-item index="2-1" @click="gotoArticleView">
              <template slot="title"><i class="el-icon-toilet-paper"></i>文章管理</template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>在线数据爬取</template>
            <el-menu-item index="3-1" @click="gotoProjectView">
              <template slot="title"><i class="el-icon-video-pause"></i>Codeforces</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
    <el-dialog title="注销账户" :visible.sync="dialogDeleteVisible" width="30%" :before-close="handleClose">
      <el-input v-model="password" placeholder="请输入密码以注销账户" :value="password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="SubmitDeleteRequest">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
.el-header {
  background-color: #87afe4;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<script>
import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
      user: '',
      dialogDeleteVisible: false,
      password: ''
    };
  },
  mounted() {
    this.getUserName()
  },
  methods: {
    gotoMainView() {
      this.$router.push("/");
    },
    gotoArticleView() {
      this.$router.push("/article");
    },
    gotoProjectView() {
      this.$router.push("/project");
    },
    gotoLogout() {
      this.$store.commit("$_removeStorage");
      this.$store.commit("$_removeUsername");
      location.reload()
      this.$router.push("/login");
    },
    getUserName() {
      this.user = localStorage.getItem('username');
    },
    gotoChangePassword() {
      this.$router.push("/changepassword");
    },
    DeleteAccount() {
      this.dialogDeleteVisible = true
    },
    SubmitDeleteRequest() {
      axios.request({
        method: 'DELETE',
        url: 'api/user/login',
        data: {
          username: localStorage.getItem('username'),
          password: this.password,
        }
      }).then((res) => {
        this.dialogDeleteVisible = false
        this.$store.commit('$_removetoken')
        this.$router.push('/login/')
      })
    }
  },
}
</script>
