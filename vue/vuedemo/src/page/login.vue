<template>
  <div class="login">
    <div>
      <input type="text" v-model='tel' placeholder='输入手机号'>
    </div>
    <div>
      <input type="text" v-model='code' placeholder='输入验证码'>
      <button v-if='setInt'>{{countDown}}秒后可重发</button>
      <button v-else v-on:click='send'>发送手机验证码</button>
    </div>
    <div>
      <button v-on:click='signIn'>登录</button>
    </div>
    <div>
      <button v-on:click='register'>注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      tel: 13767060145,
      code: 123,
      setInt: false,
      countDown: 60
    };
  },
  methods: {
    send() {
      let that = this;
      let re = /^1[0-9]{10}$/; //验证手机号的正则表达式
      if (re.test(that.tel)) {
        that.setInt = true;
        clearInterval(time01);
        that.countDown = 60;
        let time01 = setInterval(function() {
          that.countDown = that.countDown - 1;
          if (that.countDown <= 0) {
            clearInterval(time01);
            that.setInt = false;
          }
        }, 100);
      } else {
        alert("手机号错误");
      }
    },
    signIn() {
      if (this.code == 123) {
        localStorage.setItem("indexUrlwangzheng", !this.remember); //记住是否需要自动登录
        sessionStorage.setItem("logingwangzheng", true); //记住本次已经登录
        this.$router.push("/rou/index");
      } else {
        alert("验证码错误");
      }
    },
    register() {
      console.log("注册");
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  text-align: center;
  input {
    width: 70%;
    padding: 5px 0;
    border: 1px solid #333;
    margin: 10px;
  }
  button {
    width: 70%;
    border-radius: 0.05rem;
    padding: 5px;
    margin: 0.1rem;
  }
}
</style>
