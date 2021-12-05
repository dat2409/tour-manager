<template>
  <nav>
    <v-app-bar flat app color="grey lighten-3">
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title flat class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="grey"
            text
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-menu-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(link, index) in links"
            :key="index"
            router :to="link.route"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>Log out</span>
        <v-icon right>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      color="deep-purple accent-1"
      width="350"
    >
      <v-row class="mt-5" justify="center">
        <v-avatar size="100">
          <img src="https://i.pinimg.com/originals/2a/92/06/2a9206a4a0d1d23cf92636c42115d054.jpg" alt="">
        </v-avatar>
      </v-row>
      <v-row class="ma-5" justify="center">
        <div class="white--text title">Doan Dat</div>
      </v-row>
      <v-row justify="center" class="mb-3">
        <popup/>
      </v-row>
      <v-list dark>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="ml-2 mr-4">mdi-{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from './Popup.vue';
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "view-dashboard", text: "Dashboard", route: "/" },
        { icon: "folder-open", text: "My projects", route: "/projects" },
        { icon: "account-circle", text: "Team", route: "/team" },
      ],
    };
  },
  components: {
    Popup
  }
};
</script>

<style>
</style>
