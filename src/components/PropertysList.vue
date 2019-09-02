<template>
  <div class="properties">
    <div class="filters">
        <div class="filter">
            <b-form-input type="text" v-model="search" placeholder="Buscar propiedad" v-on:keyup="filterPropertys();filtersAll()"></b-form-input>
        </div>
        <div class="filter">
          <p>FILTROS AVANZADOS</p>
          <div class="buttonsFilter"> 
            <button class="btn"
              v-for="(entry, index) in filterList"
              :item="entry"
              :key="index"
              @click="filter = entry; active = index;"
              :class="{ active: entry == filter }"
            >
              {{ entry == '1'?'Alquiler':entry=='2'?'Venta':'Todas' }}
            </button>
          </div>
          <div>
              <b-form-select v-model="selected" :options="this.neighborhoods" class="mb-3">
                <option :value="null">Todos los barrios</option>
              </b-form-select>
          </div>

          <div class="selectedType">
              <multiselect v-model="value" :options="options" :show-labels="true" :searchable="false" :close-on-select="false" label="text" placeholder="Todos los tipos" selectedLabel="Seleccionado" selectLabel="Seleccionar" deselectLabel="Eliminar"></multiselect>
          </div>

          <div>
             <b-button  variant="info" id="search" v-on:click="filtersAll()">Filtrar</b-button>
          </div>
        </div>
    </div>
    <div class="flexCards">
        <div v-bind:key="property.id" v-for="property in propertysFiltered" class="cardContent">
            <b-card 
              v-bind:img-src="property.img[0]"
              img-alt="Image"
              img-top>
              <div class="flexProps">
                <div><b>Dormitorios:</b> {{ property.bedroom }} |&nbsp; </div>
                <div><b>Barrio:</b> {{ getNeighborhood(property.neighborhoodId) }}</div>
              </div>
              <div>{{ property.price | currency }} </div>
              <div class="flexProps">
                <router-link :to="{name: 'Property', params: {id: property.id}}" class="btn btn-outline-dark view">Ver Propiedad ></router-link>
              </div>
            </b-card>
        </div>
        <div v-if="noResults" class="noResults">
          <p>No se encontraron resultados</p>
        </div>
    </div>
</div>
</template>

<script>
import { intersection } from './../utils/arrayIntersection'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data: function() {
    return {
      value: [
        { text: 'Todos los tipos', value: 'all' }
      ],
      options: [],
      allSelected: false,
      search: '',
      // general filtered array
      propertysFiltered: [],

      filterList: ["Todas","1", "2"], //1, 2 are Ids from CONSTANT mode -> realState.js(line 21)
      filter: "Todas",

      // arrays of filters
      filterByMode : [],
      filterBySearch : [],
      filterByNeighborhoods:[],
      filterByTypes: [],
      noResults:false,
      selected: null
    }
  },
  computed: {
    propertys () {
      return this.$store.state.propertys.all;
    },
    neighborhoods () {
      return this.$store.state.propertys.neighborhoods;
    },
    propertysTypes () {
      return this.$store.state.propertys.types;
    }
  },
  created () {

     this.$route.params.mode != undefined
    ? this.filterByMode = this.propertys.filter(property => property.mode == this.$route.params.mode)
    : this.filterByMode = this.propertys
    
    this.filterBySearch = this.propertys;

     this.$route.params.neighborhood != undefined
    ? this.filterByNeighborhoods = this.propertys.filter(property => property.neighborhoodId == this.$route.params.neighborhood)
    : this.filterByNeighborhoods = this.propertys

    this.$route.params.type != undefined
    ? this.filterByTypes = this.propertys.filter(property => property.type == this.$route.params.type)
    : this.filterByTypes = this.propertys

    this.propertysFiltered = intersection([this.filterByMode,this.filterBySearch,this.propertys,this.filterByNeighborhoods,this.filterByTypes]);
    this.options = this.$store.state.propertys.types;
    // this.options.push(this.value[0])
  },
  methods: {
     filterPropertys() {
       this.filterBySearch = this.propertys.filter(property => {
         return property.title.toLowerCase().includes(this.search.toLowerCase())
      });
    },
    filtersAll() {
      this.propertysFiltered = intersection([this.filterByMode,this.filterBySearch,this.propertys,this.filterByNeighborhoods,this.filterByTypes]);
    },
    getNeighborhood(id) {
      return this.neighborhoods.filter(neighborhood => neighborhood.value == id )[0].text
    },
    toggleAll(checked) {
      this.selected = checked ? this.propertysTypes.slice() : []
    }
  },
  watch: {
    filter: function(val, oldVal) {
      this.filterByMode =
        val != "Todas"
          ? this.propertys.filter(property => property.mode === val)
          : this.propertys;
    },
    propertysFiltered: function(val, oldVal) {
      val.length == 0
        ? this.noResults = true
        : this.noResults = false
    },
    selected: function(val,oldVal) {
      val == null 
        ? this.filterByNeighborhoods = this.propertys
        : this.filterByNeighborhoods =  this.propertys.filter(property => {
            return property.neighborhoodId==val
          });
    },
     value: function(val,oldVal) {
      val != null
      ? val.value == 'all'
        ? this.filterByTypes = this.propertys
        : this.filterByTypes = this.propertys.filter(prop => prop.type == val.value)
      : this.filterByTypes = this.propertys
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.buttonsFilter {
  padding: 10px;
}

.filter {
  border-bottom:solid 1px #efefef;
  padding: 10px;
  p{
    color: white;
  }
}

.selectedType {
  color: white;
  text-align: left;
  padding:10px 0;
}

.btn,.btn:hover {
  color: white;
}

 .active:hover {
  color: #000 !important;
}

.flexProps {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 5px 0px;
}

.btn-info,.btn-info:hover,.btn-info:after {
  background-color: #95adbe !important;
  border-color:#95adbe  !important;
  color: white;
}

.card {
  height: 100%;
  padding: 20px;
  margin:  0 10px 10px 10px;
  border-radius: 10px;
  background-color:#f2f4f2;
}

.noResults {
  width: 100%;
  text-align: center;
}

input {
  width: 100%;
  text-align: center;
  margin: 10px 0px;
}

.properties {
  padding-top:10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #e0d5e654;
}

.filters {
  display:flex;
  justify-content:flex-start;
  align-items:space-between;
  flex-direction:column;
  flex-wrap: wrap;
  width: 20%;
  margin: 10px 20px 20px 20px;
  background-color:#293462;
  padding: 0 10px 10px 10px;
  border-radius: 10px;
}

.active {
  background-color:#dff0ea;
  color: #000;
}

p {
  color:#505050;
}

.flexCards {
  width:80%;
  display:flex;
  justify-content:flex-start;
  align-items:space-between;
  flex-direction:row;
  flex-wrap: wrap;
}

.cardContent {
  justify-content:center;
  align-items:center;
  width:33%;
  display: inline-block;
  padding:10px 0;
  max-height:600px;
}

@media (max-width: 700px) {
  .cardContent {width:100%;}
  .properties {flex-direction: column;}
  .filters {width: 100%;margin:0 0 10px 0;}
  .flexCards{width: 100%;}
}

@media only screen and (max-width: 1300px) and (min-width: 701px)  {
  .cardContent {width:50%;}
  .properties {flex-direction: column;}
  .filters {width: 100%;margin:0 0 10px 0;}
  .flexCards{width: 100%;}
}

.card img {
  max-height:200px;
  width:100%;
}

.flex {
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-direction:row;
  width:100%;
}

.view {
  color:black !important;
  margin:5px;
}

</style>