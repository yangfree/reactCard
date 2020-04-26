<template>
  <div class="home">
    <!-- <h2>杨洁个人网站后台管理系统</h2> -->
    <MyHeader />
    <MyNav />
    <MyFooter />
  </div>
</template>

<script>
import MyNav from '../components/MyNav';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';

export default {
  name: 'Home',
  components: {
    MyNav,   
    MyHeader,
    MyFooter 
  }
}
</script>
<style lang="less" scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
