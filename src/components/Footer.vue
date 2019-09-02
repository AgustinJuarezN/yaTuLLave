<template>
  <div class="footer">
    <div class="container row">
      <div class="col-lg-12 col-md-12 col-sm-12">© Copyright 2019. All rights reserved.</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'footer'
}
</script>

<style lang="scss">
    .footer {
        background-color:#293462;
        bottom: 0;
        left: 0;
        width: 100%;
        color:white;
        text-align: center;
        min-height: 50px;
        .container {
            width: 100%;
            height: 100%;
            text-align: center;
            margin:auto;
            padding-top:15px;
            z-index:9999;

        }
    }
</style>
