<template>
    <div class="msite">
        <HeaderTop :title="address.name">
            <router-link slot="left" to="/search" class="header_search">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link slot="right" :to="userInfo._id ? '/userinfo' : '/login'" class="header_login">
                <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                <!-- 如果已经登录则显示一个icon -->
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-yonghuming"></i>
                </span>
            </router-link>
        </HeaderTop>
        <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
                <swiper class="swiper-wrapper" :options="swiperOption" v-if="categorysArr.length > 0">
                    <!-- slides -->
                    <swiper-slide class="swiper-slide" v-for="(pages, index) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(item, index) in pages" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl + item.image_url" alt="">
                            </div>
                            <span>{{item.title}}</span>
                        </a>
                    </swiper-slide>

                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination" v-if="categorysArr.length > 1"></div>
                </swiper>
            </div>
            <img src="./images/msite_back.svg" alt="" v-else>
        </nav>
        <div class="msite_shop_list">
            <div class="shop_header">
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
        </div>
    </div>
</template>

<script>
import HeaderTop from '@/components/HeaderTop/HeaderTop'
import ShopList from '@/components/ShopList/ShopList'
import { mapState } from 'vuex'
export default {
    name: 'Msite',
    components: {
        HeaderTop,
        ShopList
    },
    data() {
        return {
            baseImageUrl: 'https://fuss10.elemecdn.com',
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: true,
                loop: true
            }
        }
    },
    computed: {
        ...mapState(['address', 'categorys', 'userInfo']),
        /**
         * 根据categorys一维数组生成一个2维数组,小数组中的元素个数最大是8
         */
        // categorysArr () {
        //     const { categorys } = this;
        //     const arr = [];
        //     let minArr = [];
        //     categorys.forEach(data => {
        //         if (minArr.length === 8) {
        //             minArr = []
        //         }
        //         if (minArr.length === 0) {
        //             arr.push(minArr)
        //         }
        //         minArr.push(data)
        //     });
        //     return arr
        // },
        categorysArr () {
            const { categorys } = this;
            const arr = [];
            for (let i = 0; i < categorys.length; i += 8) {
                arr.push(categorys.slice(i, i + 8));
            }
                return arr;
        }
    },
    mounted() {
        this.$store.dispatch('getCategorys');
        this.$store.dispatch('getShops');
    }
}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .header
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
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>
