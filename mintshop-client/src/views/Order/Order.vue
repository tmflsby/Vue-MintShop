<template>
    <div>
        <section class="order">
            <HeaderTop title="订单列表"></HeaderTop>
            <section class="order_no_login" v-if="!userInfo._id">
                <img src="./images/order/person.png" alt="">
                <h3>登陆后查看外卖订单</h3>
                <router-link to="/login" tag="button">立即登录</router-link>
            </section>
            <section class="order_login" v-else>
                OrderLists 待开发
            </section>
        </section>
    </div>
</template>

<script>
import HeaderTop from '@/components/HeaderTop/HeaderTop'
import { mapState } from "vuex";
export default {
    name: 'Order',
    components: {
        HeaderTop
    },
    computed: {
      ...mapState(['userInfo'])
    }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/mixins.styl"
  .order  //订单
    width 100%
    .header //头部公共css
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .iconfont
          font-size 22px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 30%
        color #fff
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
    .order_login
      position relative

</style>
