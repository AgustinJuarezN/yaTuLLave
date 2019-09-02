<template>
    <b-navbar toggleable="lg" variant="" fixed="top">
        <img src="https://cdn1.infocasas.com.uy/web/59774ee1a67e6_infocdn__logo_opti.png" alt="" class="logo">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-navbar-brand href="#"><router-link to="/">Home</router-link></b-navbar-brand>
            <b-navbar-brand href="#"><router-link to="/Propertys">Propiedades</router-link></b-navbar-brand>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name:'Navbar',
  created () {
    this.$store.dispatch('propertys/getAllPropertys');
    this.$store.dispatch('propertys/getAllNeighborhood');
  }
}

</script>

<style scoped lang="scss">
    a {
        color:#86aa22;
    }

    a:hover {
        text-decoration: none;
        color:#86aa22;
    }

    .fixed-top {
        background-color:#fcfcfc;
    }

    .logo {
        margin: 0px 20px;
        width: 100px;
    }
</style>
