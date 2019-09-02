<template>
    <div class="flexCards">    
          <b-img v-if="property.imgPortada" :src="property.imgPortada" fluid alt="Fluid image"></b-img>
          <h2>{{property.title}}</h2>

          <div class="flexDescription">
            <div class="imgsProperty">
              <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="4000"
                controls
                indicators
                background="#ababab"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <b-carousel-slide class="slideItem"
                  v-for="item in property.img"
                  :key="item.id"
                  :caption="item.text"
                >
                <img
                    slot="img"
                    class="d-block img-fluid w-100"
                    :src="item"
                    alt="image slot"
                  >
                </b-carousel-slide>
              </b-carousel>
            </div>    
             <div class="description">
                <div class="caract">
                  <h3>Características</h3>
                  <div class="contentIcon">
                    <p>{{property.bathroom}}</p>
                    <i class="material-icons">local_laundry_service</i>
                  </div>
                  <div class="contentIcon">
                    <p>{{property.bedroom}}</p>
                    <i class="material-icons">local_hotel</i>
                  </div> 
                  <div class="contentIcon">
                    <p>{{property.capacity}} m²</p>
                    <i class="material-icons">person_pin_circle</i>
                  </div>  
               </div>
              <div class="map">
                <GmapMap
                  :center="{lat:property.lat, lng:property.lng}"
                  :zoom="20"
                  map-type-id="terrain"
                  style="width: 500px; height: 300px"
                >
                </GmapMap>
              </div>
            </div>       
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
   props: ['id'],
   computed: mapState({
        property(state) {
            return state.propertys.all[this.id]
        }
   }),
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
}

</script>

<style scoped lang="scss">

.w-100 {
  height: 400px;
  
  @media (max-width: 700px) {
    height: 300px;
  }
}


h2 {
  padding: 20px 0 0 0;
  margin: 0;
}

h3 {
  padding:0 10px 20px 0;
}

.contentIcon {
  display: flex;
  justify-content: center;
  flex-direction: row;

  p {
    padding-right:5px;
    font-size: 20px;
  }

  i {
    font-size: 28px;
  }
}

@media (max-width: 800px) {
  h2 {
    font-size:25px;
    padding: 20px 0;
  }
}

.map {
  width: 100%;
}
.slideItem {
  width: 100%;
}
.flexCards {
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:row;
  flex-wrap: wrap;
}

.imgsProperty {
  width: 50%;
  padding: 0 20px;
  @media (max-width: 800px) {
     width: 100%;
  }
}

.flexDescription {
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 0 20px 0;

  @media (max-width: 800px) {
    flex-direction: column;
  }
}

.description {
    display:flex;
    flex-direction:row;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #293462;
    width: 70%;
    min-height: 400px;
    border-radius: 10px;
    margin:20px;
    padding:20px;
    color:white;

    @media (max-width: 800px) {
      flex-direction: column;
      width: 100%;
    }
    .caract {
      width: 40%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      @media (max-width: 800px) {
        width: 100%;
      }
    }
  }

.cardContent {
  justify-content:center;
  align-items:center;
  width:20%;
  display: inline-block;
  padding:0px;
  max-height:600px;
}

@media (max-width: 600px) {
  .cardContent {width:100%;}
}

@media only screen and (max-width: 1300px) and (min-width: 601px)  {
  .cardContent {width:33%;}
}

.card img {
  height:200px;
}

.flex {
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-direction:row;
  width:100%;
}

</style>