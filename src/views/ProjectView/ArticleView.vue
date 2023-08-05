<template>
  <el-col>
    <div style="margin-top:20px;margin-left:20px;width: 800px;display: flex;align-items: baseline;">
      <el-button type="success" round @click="gotoAddArticleView">添加文章</el-button>
      <el-button type="info" icon="el-icon-refresh" circle @click="x_refresh"></el-button>
      <span style="margin-left:20px;width: 90px;">搜索文章: </span>
      <el-input placeholder="输入文章标题" v-model="key_word" clearable style="width:200px" :value="key_word"></el-input>
      <el-button icon="el-icon-search" circle style="margin-left:20px" @click="req_keyword(cur_cid, 1)"></el-button>
      <el-select v-model="cate_name" placeholder="请选择文章来源" style="margin-left:20px">
        <el-option label="全部" @click.native="req_category(0, 1)"></el-option>
        <el-option v-for="(cate, index) in categoryData" :key="index" :label="cate.name" :value="cate.cid"
          @click.native="req_category(cate.cid, 1)"></el-option>
      </el-select>
      <el-button icon="el-icon-plus" circle style="margin-left:20px" @click="AddCategory"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle @click="DeleteCategory"></el-button>
    </div>
    <div>
      <el-table v-loading="loading" :data="articleData" height="540px" border style="width:100%;margin-top:20px">
        <el-table-column type="index" label="序号" width="60" header-align="center"></el-table-column>
        <el-table-column prop="create_time" label="发布时间" width="150" header-align="center"></el-table-column>
        <el-table-column prop="title" label="标题" header-align="center"></el-table-column>
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
    <div>
      <el-dialog title="添加来源" :visible.sync="dialogAddVisible" width="30%" :before-close="handleClose">
        <el-input v-model="new_category" placeholder="请输入来源" :value="new_category"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SubmitNewCategory">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="删除来源" :visible.sync="dialogDeleteVisible" width="20%" :before-close="handleClose">
        <el-select v-model="delete_category_name" placeholder="请选择文章来源" style="margin-left:20px">
          <el-option v-for="(cate, index) in categoryData" :key="index" :label="cate.name" :value="cate.cid"
            @click.native="choose_del_category(cate.cid, cate.name)"></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SubmitDeleteCategory">确 定</el-button>
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
      dialogAddVisible: false,
      dialogDeleteVisible: false,
      url: '',
      new_category: '',
      delete_category: 0,
      delete_category_name: '',
      key_word: '',
      if_filter: false
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
        this.req_total(cate_id, false)
      })
    },
    req_total(cate_id, need_keyword) {
      let p_keyword = null
      if (need_keyword == true) {
        p_keyword = this.key_word
      }
      axios.request({
        method: 'GET',
        url: 'api/article/count',
        params: {
          category_id: cate_id,
          keyword: p_keyword
        }
      }).then((res) => {
        this.total = res.data.total
      })
    },
    req_keyword(cate_id, req_page) {
      if (this.key_word == '') {
        this.req_category(0, 1)
        return
      }
      axios.request({
        method: 'GET',
        url: 'api/article/lists',
        params: {
          page_start: this.cur_size * (req_page - 1),
          page_end: this.cur_size * req_page - 1,
          category_id: cate_id,
          keyword: this.key_word
        }
      }).then((res) => {
        this.articleData = res.data
        this.req_total(this.cur_cid, true)
        this.if_filter = true
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
      if (this.if_filter == true) {
        this.req_keyword(this.cur_cid, this.cur_page)
      }
      else {
        this.req_category(this.cur_cid, val)
      }
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
        this.req_category(0, 1)
      })
    },
    AddCategory() {
      this.dialogAddVisible = true
    },
    SubmitNewCategory() {
      axios.request({
        method: 'POST',
        url: 'api/article/category',
        data: {
          name: this.new_category
        }
      }).then((res) => {
        this.dialogAddVisible = false
        this.getCategoryData()
      })
    },
    DeleteCategory() {
      this.getCategoryData()
      this.dialogDeleteVisible = true
    },
    choose_del_category(del_id, del_name) {
      this.delete_category = del_id
      this.delete_category_name = del_name
    },
    SubmitDeleteCategory() {
      if (this.delete_category == 0) {
        this.dialogDeleteVisible = false
        return
      }
      axios.request({
        method: 'DELETE',
        url: 'api/article/category',
        data: {
          cid: this.delete_category
        }
      }).then((res) => {
        this.dialogDeleteVisible = false
        this.getCategoryData()
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