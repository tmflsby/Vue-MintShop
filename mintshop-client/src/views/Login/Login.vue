<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">Mint外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:" :class="{on: loginWay}" @click="SMSVerification">短信验证</a>
                    <a href="javascript:" :class="{on: !loginWay}" @click="PasswordVerification">密码验证</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on: loginWay}">
                        <section class="login_message">
                            <label>
                                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            </label>
                            <button :disabled='!rightPhone' class="get_verification"
                                    :class="{right_phone: rightPhone}" @click.prevent="getCode"
                            >
                                {{computedTime > 0 ? `(${computedTime}s)已发送` : '获取验证码'}}
                            </button>
                        </section>
                        <section class="login_verification">
                            <label>
                                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                            </label>
                        </section>
                        <section class="login_hint">
                          温馨提示：未注册Mint外卖帐号的手机号，登录时将自动注册，且代表已同意
                          <a href="javascript:">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !loginWay}">
                        <section>
                            <section class="login_message">
                                <label>
                                    <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                                </label>
                            </section>
                            <section class="login_verification">
                                <label v-if="showPwd">
                                    <input type="text" maxlength="8" placeholder="密码" v-model="pwd">
                                </label>
                                <label v-else>
                                    <input type="password" maxlength="8" placeholder="密码" v-model="pwd">
                                </label>
                                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="isShowPwd">
                                    <div class="switch_circle" :class="{right: showPwd}"></div>
                                    <span class="switch_text">{{showPwd ? '显示' : '隐藏'}}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <label>
                                    <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                                </label>
                                <img src="http://localhost:4000/captcha" alt="captcha"
                                     class="get_verification" @click="getCaptcha" ref="captcha"
                                >
                            </section>
                      </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
              <i class="iconfont icon-arrow-left"></i>
            </a>
        </div>
        <AlertTip :alertText='alertText' v-show="alertShow" @closeTip='closeTip'></AlertTip>
    </div>
</template>

<script>
import AlertTip from '@/components/AlertTip/AlertTip';
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '@/api';
export default {
    name: 'Login',
    components: {
      AlertTip
    },
    computed: {
      rightPhone () {
        // 利用正则对手机号进行匹配，返回布尔值
        return /^1\d{10}$/.test(this.phone)
      }
    },
    data() {
        return {
            loginWay: false,  // true代表短信登陆, false代表密码
            phone: '',        // 手机号
            computedTime: 0,
            showPwd: false, // 是否显示密码
            pwd: '',
            name: '',       // 用户名
            code: '',       // 短信验证码
            captcha: '',    // 图形验证码
            alertText: '',    //提示文本
            alertShow: false  //是否显示警告
        }
    },
    methods: {
      SMSVerification () {
        this.loginWay = true
      },
      PasswordVerification () {
        this.loginWay = false
      },
      isShowPwd () {
        this.showPwd = !this.showPwd
      },
      showAlert (alertText) {
        this.alertShow = true;
        this.alertText = alertText
      },
      closeTip () {
        this.alertShow = false;
        this.alertText = ''
      },
      getCaptcha () {
        //每次指定的src要不一样
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time' + Date.now()
      },
      async getCode () {
        // 如果当前没有计时!this.computeTime等于this.computeTime === 0
        if(!this.computedTime) {
          //启动倒计时
          this.computedTime = 30;
          this.intervalId = setInterval(() => {
            this.computedTime--;
            if(this.computedTime <= 0) {
              //停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)
        }
        // 发送ajax请求（向指定手机号发送验证码短信）
        const result = await reqSendCode(this.phone);
        console.log(result);
        if(result.code === 1) {  //手机号验证失败
          //显示提示
          this.showAlert(result.msg);
          //停止计时
          if(this.computedTime) {
            this.computedTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined
          }
        }
      },
      async login () {
        let result;  // 保存登录成功后返回的数据

        if(this.loginWay) { //短信登录
          const {phone, code} = this;
          if(!this.rightPhone) {   //手机号不正确
            this.showAlert('手机号不正确');
            return
          } else if(!/^\d{6}$/.test(code)) {  //验证必须是6位数字
            this.showAlert('验证必须是6位数字');
            return
          }
          //发送ajax请求短信登录
          result = await reqSmsLogin(phone, code)
        } else { //密码登录
          const {name, pwd, captcha} = this;
          if(!this.name) {
            //用户名必须指定
            this.showAlert('用户名必须指定');
            return
          } else if(!this.pwd) {
            //密码必须指定
            this.showAlert('密码必须指定');
            return
          } else if(!this.captcha) {
            //验证码必须指定
            this.showAlert('验证码必须指定');
            return
          }
          result = await reqPwdLogin(name, pwd, captcha)
        }

        //停止计时
        if(this.computedTime) {
          this.computedTime = 0;
          clearInterval(this.intervalId);
          this.intervalId = undefined
        }

        // console.log(result);
        // 根据结果数据处理
        if(result.code === 0) {
          const user = result.data;
          // 将user保存到vuex的state
          this.$store.dispatch('recordUser', user);
          //去个人中心界面
          this.$router.replace('/profile')
        } else {
          // 显示新的图片验证码
          this.getCaptcha();
          //显示警告
          const msg = result.msg;
          this.showAlert(msg)
        }

      }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color orange
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
