<template>
  <div class="home">
    <BannerFilter />
    <div class="subtitle">
      <div class="flex">
         <p>Destacados</p>
         <i class="material-icons">star_border</i>
      </div>
    </div>
    <CarouselCards :propertys = "this.propertys"/>
  </div>
</template>

<script>
import BannerFilter from './../components/BannerFilter'
import CarouselCards from './../components/CarouselCards'

export default {
  name: 'home',
  components: {
    BannerFilter,
    CarouselCards
  },
  computed: {
    propertys () {
      return this.$store.state.propertys.all;
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  background-color: #f4f4f4;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  width: 100%;
}
.subtitle {
  padding: 20px;
  background-color:#293462;
  color: white;
  min-width: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-direction:row;
  div {
    width:40%;
    background-color:#293462;
    border-radius:10px;
    p {
      font-size:30px;
      color: #f4f4f4;
      font-family: 'Barlow', sans-serif;
      font-weight: 700;
      margin-bottom: 0;
      padding:0;
    }
    i {
      color: #be9cd0;
      margin: 0;
      font-size: 40px;
    }
  }
}

</style>
