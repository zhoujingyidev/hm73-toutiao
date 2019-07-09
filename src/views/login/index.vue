<template>
  <div class="login-container">
    <!-- 卡片 -->
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" />
     
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" style="margin:0 10px 0 20px"></el-checkbox>
          我已阅读并同意 
          <el-link class="login-link" type="primary" :underline="false">用户协议</el-link> 和 
          <el-link class="login-link" type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 450px;
    height: 350px;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto 30px;
    }
  }
}
.login-link{
  display: inline-block;
  height: 44px;
}
</style>
