<template>
  <div class="my">
    我的页面
    
  <nav-footr :active='"2"'></nav-footr>
  </div>
</template>

<script>
import Navfootr from '@/components/Nav'
export default {
  name: 'My',
  data () {
    return {
      
      abc:2,
    }
  },
  components: {
    navFootr:Navfootr
  },
}
</script>

<style scoped>
</style>
