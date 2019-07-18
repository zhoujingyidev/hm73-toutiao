<template>
  <div class="container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="small"
          @click="dialogVisible = true"
          style="float:right"
          type="success"
        >添加素材</el-button>
      </div>
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span
              @click="toggleFav(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        v-if="total>reqParams.per_page"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
    <!-- 上传素材对话框-->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <span>
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers="headers"
          name="image"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { async } from 'q';
export default {
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 12
      },
      //素材列表
      images: [],
      //分页
      total: 0,
      // 添加素材
      dialogVisible: false,
      //预览
      imageUrl: null,
      //请求头
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(window.sessionStorage.getItem("hm73-toutiao")).token
      },
      loading: false
    };
  },
  created() {
    // 获取素材列表
    this.getImages();
  },
  methods: {
    //上传成功后的处理函数
    handleAvatarSuccess(res) {
      //预览
      this.imageUrl = res.data.url;
      this.$message.success("上传成功");
      //关闭对话框 更新列表
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
        this.imageUrl = null;
      }, 1500);
    },
    search() {
      this.reqParams.page = 1;
      this.getImages();
    },
    async getImages() {
      this.loading = true;
      const {
        data: { data }
      } = await this.$http.get("user/images", { params: this.reqParams });
      this.images = data.results;
      this.total = data.total_count;
      this.loading = false;
    },
    //收藏 取消收藏
    async toggleFav(item) {
      const {
        data: { data }
      } = await this.$http.put("user/images/" + item.id, {
        collect: !item.is_collected
      });
      this.$message.success("操作成功");
      item.is_collected = data.collect;
    },
    //删除素材
    delImage(id) {
      this.$confirm('此操作将永久删除该图片，是否继续？','温馨提示',{
        confirmButtonText:'确定',
        concelButtonText:'取消',
        type:'warning'
      }).then ( async () => {
        await this.$http.delete('user/images/' + id)
        //删除成功
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
    },
    // 切换页码
    changePager(newPager) {
      this.reqParams.page = newPager;
      this.getImages();
    }
  }
};
</script>

<style scoped lang='less'>
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    position: relative;
    width: 180px;
    height: 180px;
    float: left;
    border: 1px dashed #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
