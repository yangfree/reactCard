<template>
  <div>
      <h3 class="my-font">患者扫码自行填写数据</h3>
      <ul class="my-ul">
          <li class="my-li">
              患者扫描下面的二维码,在医生指导下录入数据
          </li>
          <li class="my-li">
              医生登录系统，审核该数据，补充其他信息
          </li>
      </ul>
      <div >
          <img src="@/assets/QRcode002.png" style="width: 195px;height: 195px;" alt="">
      </div>
  </div>
</template>

<script>

export default {
  name:'QRcode',
  computed: {

  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>
  .my-font {
    font-size: 15px;
    font-weight: lighter;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .my-ul {
    padding-left:0px;
    list-style-type:none;
    .my-li {
      margin-top: 9px;
      margin-bottom: 9px;
    }
  }
    .my-font {
    color:#99CC99;
    font-size: 20px;
    font-weight: 500;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>