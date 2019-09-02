<template>
  <div class="contentFlex">
    <div class="Bannerfilters">
        <div class="filter">
          <div>
              <b-form-select v-model="typeSelected" :options="this.types" class="mb-3">
                <template slot="first">
                  <option :value="null">Todos los tipos</option>
                </template>
              </b-form-select>
          </div>
          <div>
              <b-form-select v-model="modeSelected" :options="this.modes" class="mb-3">
                <option :value="1">Todos los modelos</option>
              </b-form-select>
          </div>
          <div>
              <b-form-select v-model="neighborhoodSelected" :options="this.neighborhoods" class="mb-3">
                <option :value="null">Todos los barrios</option>
              </b-form-select>
          </div>
            <router-link id="search" :to="{name: 'Propertys', params: {type: typeSelected,mode: modeSelected, neighborhood: neighborhoodSelected}}" class="btn btn-outline-light view">Buscar</router-link>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeSelected: null,
        modeSelected:1,
        neighborhoodSelected:null
      }
    },
    methods: {
      
    },
    computed: {
      modes () {
        return this.$store.state.propertys.modes;
      },
       types () {
         return this.$store.state.propertys.types;
       },
       neighborhoods () {
         return this.$store.state.propertys.neighborhoods;
       }
    }
  }
</script>
<style scoped lang="scss">

#search {
  color: white;
  text-decoration: none;
  margin: 5px 15px 0 0;
}

#search:hover{
  color: black;
}
.contentFlex {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: black;
  background-image: url("./../assets/slide4.jpg");
  background-size:cover;
  background-repeat: no-repeat;
  background-position: center;

  .Bannerfilters {
    width: 60%;
    height: 15%;
    background-color: #0000009c;
    border-radius: 10px;
    .filter {
      display:flex;
      justify-content: center;
      flex-direction:row;
      align-items: center;
    }
    .filter div {
      width: 30%;
      padding:23px 20px 0 20px;

    }

    .filter button {
      margin-right: 20px;
      margin-top:8px;
    }
  }
}

@media (max-width: 1200px) {
  .contentFlex {
    height:400px;
    .Bannerfilters {
      width: 90%;
      height: 75%;
       .filter {
         flex-direction: column;
         div {
           width: 80%;
         }
         button {
           margin-right: 0;
         }
       }
    }
  }
}
</style>