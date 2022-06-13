<template>
  <v-app dark>
    <v-main class="adminBackground">
      <admin-nav-bar />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <admin-footer />
  </v-app>
</template>

<script>
import AdminFooter from '../components/adminComponents/AdminFooter.vue'
import AdminNavBar from '../components/adminComponents/AdminNavBar.vue'

export default {
  name: 'admin',
  components: {
    AdminFooter,
    AdminNavBar
  }
}
</script>
