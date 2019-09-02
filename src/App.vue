<template>
  <div id="initApp">
    <b-navbar toggleable="md" type="dark" variant="">
      <b-navbar-toggle target="nav_collapse" id="buttonToggle"></b-navbar-toggle>
      <b-navbar-brand to="/"><img src="./assets/logo.png" width="80px" alt=""></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/Propertys">Propiedades</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right  v-if="activeUser">
            <!-- Using 'button-content' slot -->
              <template slot="button-content"><em>{{activeUser.name}}</em></template>
              <b-dropdown-item href="#" to="/posts-manager">Mis Propiedades</b-dropdown-item>
              <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item right v-if="!activeUser" @click.prevent="login">Iniciar Sesión</b-nav-item>
        </b-navbar-nav>
        
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Footer from './components/Footer'
export default {
  name: 'App',
  data () {
    return {
      activeUser: null
    }
  },
  components: {
    Footer
  },
  async mounted()  {
    await this.refreshActiveUser()
    await this.$store.dispatch('propertys/getAllPropertys');
    await this.$store.dispatch('propertys/getAllNeighborhood');
    await this.$store.dispatch('propertys/getAllTypes');
    await this.$store.dispatch('propertys/getAllModes');
  },
  watch: {
    // everytime a route is changed refresh the activeUser
    '$route': 'refreshActiveUser'
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
    },
    async logout () {
      await this.$auth.logout()
      await this.refreshActiveUser()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">

#buttonToggle {
  background-color: #293462;
}

#initApp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#f2f4f2;
  height: 100%;
}

#nav_collapse li a{
  color: black;
}

body {
  background-color:#f2f4f2 !important;
  min-height: 100vh;
}
</style>
