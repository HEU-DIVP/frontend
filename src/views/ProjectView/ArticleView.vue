<template>
  <el-col>
    <div style="margin-top:20px;margin-left:20px;width: 800px;display: flex;align-items: baseline;">
      <el-button type="success" round @click="gotoAddArticleView">添加文章</el-button>
      <el-button type="info" icon="el-icon-refresh" circle @click="x_refresh"></el-button>
      <span style="margin-left:20px;width: 90px;">搜索文章: </span>
      <el-input placeholder="输入文章标题" v-model="input" clearable style="width:200px"></el-input>
      <el-button icon="el-icon-search" circle style="margin-left:20px" @click="searchCustomer"></el-button>
      <el-select v-model="cate_name" placeholder="请选择文章来源" style="margin-left:20px">
        <el-option label="全部" @click.native="req_category(0, 1)"></el-option>
        <el-option v-for="(cate, index) in categoryData" :key="index" :label="cate.name" :value="cate.cid"
          @click.native="req_category(cate.cid, 1)"></el-option>
      </el-select>
    </div>
    <div>
      <el-table v-loading="loading" :data="articleData" border lazy stripe :cell-style="cellStyle"
        style="width: auto;margin: 10px;">
        <el-table-column type="index" label="序号" width="150" header-align="center"></el-table-column>
        <el-table-column prop="create_time" label="发布时间" width="150" header-align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="300" header-align="center"></el-table-column>
        <el-table-column prop="click_count" label="点击量" width="100" header-align="center"></el-table-column>
        <el-table-column prop="source.name" label="来源" width="200" header-align="center"></el-table-column>
        <el-table-column prop="opt" label="操作" width="200" header-align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-view" circle @click="optRedirect(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="gotoEditArticleView(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="optDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="cur_page"
        :page-sizes="[20, 30, 40, 50]" :page-size="cur_size" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="网页预览" :visible.sync="dialogVisible" width="80%">
        <div style="width:1450px;height:800px;overflow:hidden;transform-origin:top left;transform:scale(0.8)">
          <iframe :src="url" frameborder="0" class="ifr"></iframe>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </el-col>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      articleData: [],
      categoryData: [],
      input: '',
      loading: true,
      total: 0,
      cate_name: '',
      cur_cid: 0,
      cur_size: 20,
      cur_page: 1,
      dialogVisible: false,
      dialogEditVisible: false,
      url: ''
    }
  },
  mounted() {
    this.req_category(0, 1)
    this.getCategoryData()
  },
  methods: {
    gotoAddArticleView() {
      this.$router.push("/addarticle");
    },
    gotoEditArticleView(row) {
      this.$router.push("/editarticle?aid=" + row.aid);
    },
    cellStyle() {
      return "text-align:center"
    },
    x_refresh() {
      location.reload()
    },
    getCategoryData() {
      axios.request({
        method: 'GET',
        url: 'api/article/category',
      }).then((res) => {
        this.categoryData = res.data
      })
    },
    req_category(cate_id, req_page) {
      axios.request({
        method: 'GET',
        url: 'api/article/lists',
        params: {
          page_start: this.cur_size * (req_page - 1),
          page_end: this.cur_size * req_page - 1,
          category_id: cate_id
        }
      }).then((res) => {
        this.articleData = res.data
        this.loading = false
        this.cur_cid = cate_id
        this.req_total(cate_id)
        console.log(1)
        console.log(this.total)
      })
    },
    req_total(cate_id) {
      axios.request({
        method: 'GET',
        url: 'api/article/count',
        params: {
          category_id: cate_id
        }
      }).then((res) => {
        this.total = res.data.total
        console.log(2)
        console.log(res.data.total)
      })
    },
    handleSizeChange(val) {
      if (this.cur_size == val) {
        return;
      }
      this.cur_size = val
      this.req_category(this.cur_cid, 1)
    },
    handleCurrentChange(val) {
      this.req_category(this.cur_cid, val)
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
    optRedirect(row) {
      this.url = row.url
      this.dialogVisible = true
    },
    optDelete(row) {
      axios.request({
        method: 'DELETE',
        url: 'api/article/list',
        data: {
          aid: row.aid
        }
      }).then((res) => {
        this.x_refresh()
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
.ifr {
  width: 100%;
  height: 100%;
}
</style>