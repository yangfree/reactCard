<template>
  <div class="home">
    <h2>This is a home page.</h2>
    <myNav></myNav>
  </div>
</template>

<script>
import myNav from '../components/myNav';

export default {
  name: 'Home',
  components: {
    myNav,    
  }
}
</script>
<style lang="less" scoped>

</style>
