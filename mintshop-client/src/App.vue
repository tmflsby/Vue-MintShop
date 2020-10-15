<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex';
export default {
  components: {
    FooterGuide
  },
  mounted() {
    //触发调用Action方法的方式

    //第一种方法： 通过this.$store.dispatch
    this.$store.dispatch('getAddress');
    // this.$store.dispatch('getUserInfo');

    // 第二种方法：mapActions 语法糖
    // this.getAddress();
    this.getUserInfo();

  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  }
}
</script>

<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
