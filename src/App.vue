<template>

  <v-app class="grey lighten-4">
    <!-- <Navbar v-if="isAuthenticated" /> -->
    <Navbar v-if="$store.state.isAuthenticated" />
    <!-- <Navbar/> -->

    <v-main class="mx-4 mb-4">      
      <router-view></router-view>
    </v-main>
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: { Navbar},
  name: 'App',
  data: () => ({
      isAuthenticated: false
  }),
  methods: {
  }, 
  created() {
      const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"))
      if (isAuthenticated === true){
          this.$store.commit("setAuthenticatedTrue")
      }else {
          this.$store.commit("setAuthenticatedFalse")
      }
  }

}
</script>
