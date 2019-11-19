<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="iconfont icon-removecircleoutline" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
        </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <div class="iconfont icon-addcircle" @click.stop="updateFoodCount(true)"></div>
    </div>
</template>

<script>
export default {
    name: 'CartControl',
    props: {
        food: Object
    },
    methods: {
        updateFoodCount(isAdd) {
            // 这里不能直接处理food.count因为food是在good里的数据对象
            // 应该通过vuex触发action来管理数据 并把当前的food对象参数传递过去
            this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
            // console.log(this.food);
        }
    },
}
</script>

<style lang="stylus" scoped>
 @import "../../assets/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-removecircleoutline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-addcircle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>