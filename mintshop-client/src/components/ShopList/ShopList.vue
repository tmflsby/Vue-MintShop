<template>
    <div class="shop_container">
        <ul class="shop_list" v-if="shops.length">
            <li @click="$router.push('/shop')" class="shop_li border-1px" v-for="(shop, index) in shops" :key="index">
                <a href="javascript:">
                    <div class="shop_left">
                        <img :src="baseImgUrl + shop.image_path" alt="" class="shop_img">
                    </div>
                    <div class="shop_right">
                        <section class="shop_detail_header">
                            <h4 class="shop_title ellipsis">{{shop.name}}</h4>
                            <ul class="shop_detail_ul" v-for="item in shop.supports" :key="item._id">
                                <li class="supports">{{item.icon_name}}</li>
                            </ul>
                        </section>
                        <section class="shop_rating_order">
                            <section class="shop_rating_order_left">
                                <Star :score='shop.rating' :size='24'></Star>
                                <div class="rating_section">{{shop.rating}}</div>
                                <div class="order_section">月售{{shop.recent_order_num}}单</div>
                            </section>
                            <section class="shop_rating_order_right">
                                <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                            </section>
                        </section>
                        <section class="shop_distance">
                            <p class="shop_delivery_msg">
                                <span>¥{{shop.float_minimum_order_amount}}起送</span>
                                <span class="segmentation">/</span>
                                <span>{{shop.piecewise_agent_fee.tips}}</span>
                            </p>
                        </section>
                    </div>
                </a>
            </li>
        </ul>
        <ul v-else>
            <li v-for="item in 6" :key="item">
                <img src="./images/shop_back.svg" alt="back">
            </li>
        </ul>
    </div>
</template>

<script>
import Star from '@/components/Star/Star'
import { mapState } from 'vuex'
export default {
    name: 'ShopList',
    data() {
        return {
            baseImgUrl: './images/'
        }
    },
    computed: {
        ...mapState(['shops'])
    },
    components: {
        Star
    }

}
</script>

<style lang="stylus" scoped>
@import "../../assets/stylus/mixins.styl"
  .shop_container
    margin-bottom 50px
    .shop_list
    .shop_li
      bottom-border-1px(#f1f1f1)
      width 100%
      >a
        clearFix()
        display block
        box-sizing border-box
        padding 15px 8px
        width 100%
        .shop_left
          float left
          box-sizing border-box
          width 23%
          height 75px
          padding-right 10px
          .shop_img
            display block
            width 100%
            height 100%
        .shop_right
          float right
          width 77%
          .shop_detail_header
            clearFix()
            width 100%
            .shop_title
              float left
              width 200px
              color #333
              font-size 16px
              line-height 16px
              font-weight 700
              &::before
                content '品牌'
                display inline-block
                font-size 11px
                line-height 11px
                color #333
                background-color #ffd930
                padding 2px 2px
                border-radius 2px
                margin-right 5px
            .shop_detail_ul
              float right
              margin-top 3px
              .supports
                float left
                font-size 10px
                color #999
                border 1px solid #f1f1f1
                padding 0 2px
                border-radius 2px
          .shop_rating_order
            clearFix()
            width 100%
            margin-top 18px
            margin-bottom 8px
            .shop_rating_order_left
              float left
              color #ff9a0d
              .rating_section
                float left
                font-size 10px
                color #ff6000
                margin-left 4px
              .order_section
                float left
                font-size 10px
                color #666
                transform scale(.8)
            .shop_rating_order_right
              float right
              font-size 0
              .delivery_style
                transform-origin 35px 0
                transform scale(.7)
                display inline-block
                font-size 12px
                padding 1px
                border-radius 2px
              .delivery_left
                color #fff
                margin-right -10px
                background-color #02a774
                border 1px solid #02a774
              .delivery_right
                color #02a774
                border 1px solid #02a774
          .shop_distance
            clearFix()
            width 100%
            font-size 12px
            .shop_delivery_msg
              float left
              transform-origin 0
              transform scale(.9)
              color #666
            .segmentation
              color #ccc
</style>
