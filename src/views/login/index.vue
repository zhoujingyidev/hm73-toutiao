<template>
  <div class="login-container">
    <!-- 卡片 -->
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" />

      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code ">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" style="margin:0 10px 0 20px"></el-checkbox>我已阅读并同意
          <el-link class="login-link" type="primary" :underline="false">用户协议</el-link>和
          <el-link class="login-link" type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 校验手机号的
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号格式不对"));
      }
    };
    return {
      //表单对应的对象
      loginForm: {
        mobile: "13911111111",
        code: "246810"
      },
      //表单的校验规则
      loginRules: {
        mobile: [
          //具体校验的规则
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "必须是6位", trigger: "blur" }
        ]
      },
      //默认选中复选框
      checked: true
    };
  },
  methods: {
    login() {
      //整体表单的校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$http.post("authorizations", this.loginForm);
            window.sessionStorage.setItem(
              "hm73-toutiao",
              JSON.stringify(res.data.data)
            );
            this.$router.push("/");
          } catch (err) {
            this.$message.error("用户名或密码错误");
          }
        }
      });
    }
  }
};
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
.login-link {
  display: inline-block;
  height: 44px;
}
</style>
