<template>
  <div>
    <!-- <h1 class="main-title">
      <i class="fa fa-envira" style="color:green"></i>
      中医妇科临床流调数据中心
    </h1> -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>


export default {
  computed: {

  },
  methods: {

}
}
</script>
<style lang="scss" scoped>
  // .main-title {
  //   text-align: center;
  //   margin: 0px auto;
  //   // margin: 150px 20px 20px 20px;
  //   // font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", sans-serif;
  //   font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  //   font-size: 28px;
  //   font-weight: lighter;
  //   color:black;
  //   background-color:aliceblue
  // }
</style>
