<template>
    <ul>
         <div class="owl-carousel owl-theme">
            <li v-bind:key="property.id" v-for="property in propertys">
                <b-card
                    v-bind:title="property.title"
                    v-bind:img-src="property.img[0]"
                    img-alt="Image"
                    img-top>
                    <div class="flexProps">
                      <div><b>Dormitorios:</b> {{ property.bedroom }} |&nbsp; </div>
                      <div><b>Baños:</b> {{ property.bedroom }}</div>
                    </div>
                  <div>{{ property.price | currency }} </div>
                  <div class="flexProps">
                    <router-link :to="{name: 'Property', params: {id: property.id}}" class="btn btn-outline-dark view">Ver Propiedad ></router-link>
                  </div>
                </b-card>
            </li>
        </div>
    </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

 export default {  
    props : ["propertys"],
     mounted() {
      setTimeout(() => {
        this.$nextTick(() => {
          $(this.$el).find('.owl-carousel').owlCarousel({
            items: 4,
            loop: true,
            margin: 20,
            autoplay: 1000, // time for slides changes
            smartSpeed: 1000,
            autoplayHoverPause: true,
            responsiveClass: true,
            nav:false,
            responsive: {
              0: {
                items: 1
              },
              600: {
                items: 2
              },
              1200: {
                items: 5
              }
            }
          });
        });
      }, 0);
     }
 }
</script>

<style scoped>

    ul {
        padding-right: 40px;
        margin:40px 0 20px 0;
    }

    li {
        list-style: none;
    }
    
    h4,.h4 {
        font-size: 1em;
    }

    .owl-carousel .owl-item img {
        height: 190px;
    }

    .flexProps {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 5px 0px;
    }
</style>