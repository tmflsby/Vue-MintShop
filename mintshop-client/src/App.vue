<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide'
import {mapActions} from 'vuex';
export default {
  components: {
    FooterGuide
  },
  async mounted() {
    // 通过this.$store.dispatch 方法触发调用Action
    this.$store.dispatch('getAddress')

    // this.getAddress()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getUserInfo'])  
  }
}
</script>

<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
