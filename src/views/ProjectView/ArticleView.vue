<template>
  <el-col>
      <div style="margin-top:20px;margin-left:20px;width: 800px;display: flex;align-items: baseline;">
          <el-button type="success" round @click="gotoAddArticleView">添加文章</el-button>
          <el-button type="info" icon="el-icon-refresh" circle @click="x_refresh"></el-button>
          <span style="margin-left:20px;width: 90px;">搜索文章: </span>
          <el-input placeholder="输入文章标题" v-model="input" clearable style="width:200px"></el-input>
          <el-button icon="el-icon-search" circle style="margin-left:20px" @click="searchCustomer"></el-button>
      </div>
      <el-row type="flex">
          <div>
              <el-table v-loading="loading" :data="articleData" height="525" border stripe :cell-style="cellStyle"
                  style="width: 900px;margin-top: 30px;margin-left: 20px;">
                  <el-table-column prop="index" label="序号" min-width="10" header-align="center"></el-table-column>
                  <el-table-column prop="create_time" label="发布时间" min-width="15" header-align="center"></el-table-column>
                  <el-table-column prop="title" label="标题" min-width="50" header-align="center"></el-table-column>
                  <el-table-column prop="click_count" label="点击量" min-width="10" header-align="center"></el-table-column>
                  <el-table-column prop="source.name" label="来源" min-width="20" header-align="center"></el-table-column>
                  <el-table-column prop="opt" label="操作" min-width="20" header-align="center">
                      <template slot-scope="scope">
                          <el-button type="primary" icon="el-icon-edit" circle @click="optEditDialog(scope.row)"></el-button>
                          <el-button type="danger" icon="el-icon-delete" circle @click="open(scope.row)"></el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <div style="margin-top: 30px;height: 525px;">
              <iframe src="https://www.taobao.com" frameborder="0" height="525px" width="500px"></iframe>
          </div>
      </el-row>
  </el-col>
</template>

<script>
import axios from 'axios'
export default {
  data() {
      return {
          articleData: [],
          input: '',
          loading: true
      }
  },
  mounted() {
      this.getCustomerData()
  },
  methods: {
      gotoAddArticleView() {
          this.$router.push("/addarticle");
      },
      cellStyle() {
          return "text-align:center"
      },
      x_refresh() {
          location.reload()
      },
      open(row) {
          this.$confirm('是否确认删除该文章？', '确认信息', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.dialogFormVisible = false
              axios.request({
                  method: 'DELETE',
                  url: 'api/customer/customer',
                  data: {
                      uid: row.uid
                  }
              }).then((res) => {
                  this.$message({
                      message: res.data.detail,
                      type: 'success'
                  })
              })
          }).catch(action => {
              this.$message({
                  type: 'info',
                  message: '取消'
              })
          });
      },
      optEditDialog(row) {
          this.form1.name = row.name
          this.form1.gender = row.gender
          this.form1.age = row.age
          this.form1.phone_num = row.phone_num
          this.form1.email = row.email
          this.form1.level = row.level.name
          this.form1.uid = row.uid
          this.dialogFormVisible1 = true
      },
      getCustomerData() {
          axios.request({
              method: 'GET',
              url: 'api/article/list',
              params: {
                  is_empty: 0
              }
          }).then((res) => {
              this.articleData = res.data
              this.loading = false
          })
      },
      searchCustomer() {
          axios.request({
              method: 'GET',
              url: 'api/customer/customers',
              params: {
                  is_empty: 1,
                  name_or_phone_num: this.input
              }
          }).then((res) => {
              this.customerData = res.data,
                  this.$message({
                      message: 'ok',
                      type: 'success'
                  })
          })
      },
      addCustomer() {
          axios.request({
              method: 'POST',
              url: 'api/customer/customer',
              data: {
                  name: this.form.name,
                  age: this.form.age,
                  gender: this.form.gender,
                  phone_num: this.form.phone_num,
                  email: this.form.email,
                  level: this.form.level
              }
          }).then((res) => {
              this.dialogFormVisible = false
              this.$message({
                  message: res.data.detail,
                  type: 'success'
              })
          })
      },
      modifyCustomer() {
          if (this.form1.gender == '男') {
              this.form1.gender_choice = 1
          } else if (this.form1.gender == '女') {
              this.form1.gender_choice = 2
          } else if (this.form1.gender == '未指定') {
              this.form1.gender_choice = 0
          }
          if (this.form1.level == '普通会员') {
              this.form1.level_choice = 1
          } else if (this.form1.level == '超级会员') {
              this.form1.level_choice = 2
          } else if (this.level == '至尊会员') {
              this.form1.level_choice = 3
          }
          axios.request({
              method: 'POST',
              url: 'api/customer/customer',
              data: {
                  uid: this.form1.uid,
                  name: this.form1.name,
                  age: this.form1.age,
                  gender: this.form1.gender_choice,
                  phone_num: this.form1.phone_num,
                  email: this.form1.email,
                  level: this.form1.level_choice
              }
          }).then((res) => {
              this.dialogFormVisible1 = false
              this.$message({
                  message: res.data.detail,
                  type: 'success'
              })
          })
      }
  }
}
</script>

<style>
  .top20 {
      
  }
</style>