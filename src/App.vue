<template>
  <div id="app">
    <el-header>
      <div style="height:20px;display: flex;justify-content: space-between;">
        <div style="font-size:20px;width: 800px;" @click="gotoMainView">
          标题还没想好，不急
        </div>
        <div style="font-size:20px;margin-left: 100px;">
          <el-dropdown>
            <div style="text-align:right">
              <span>logined user: {{ user }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="gotoMainView">首页</el-dropdown-item>
              <el-dropdown-item @click.native="gotoProjectView">关于</el-dropdown-item>
              <el-dropdown-item @click.native="gotoLogout">注销</el-dropdown-item>
              <el-dropdown-item @click.native="gotoChangePassword">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container style="height: 630px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" >
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-promotion"></i>首页</template>
            <el-menu-item index="1-1" @click="gotoMainView">
              <template slot="title"><i class="el-icon-odometer"></i>仪表盘</template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
            <el-menu-item index="2-1" @click="gotoArticleView">
              <template slot="title"><i class="el-icon-toilet-paper"></i>文章管理</template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>项目信息</template>
            <el-menu-item index="3-1" @click="gotoProjectView">
              <template slot="title"><i class="el-icon-video-pause"></i>项目简介</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
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
</style>

<script>

export default {
  name: "App",
  data() {
    return {
      user: ''
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
    }
  },
}
</script>
