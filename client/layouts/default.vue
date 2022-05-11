<template>
  <v-app dark>
    <user-header />
    <v-main>
      <Nuxt />
    </v-main>
    <user-footer />
  </v-app>
</template>

<script>
import UserFooter from "../components/userComponents/UserFooter.vue";
import UserHeader from "../components/userComponents/UserHeader.vue";
export default {
  name: "default",
  components: {
    UserHeader,
    UserFooter,
  },
};
