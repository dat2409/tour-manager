<template>
  <div class="user-header">
    <v-app-bar flat class="black" height="46">
      <span v-for="item in info" :key="item.icon">
        <v-icon class="userColor--text mr-2" small>{{ item.icon }}</v-icon>
        <span class="white--text mr-3 body-2">{{ item.value }}</span>
      </span>
      <v-spacer></v-spacer>
      <span class="mx-2">
        <v-icon
          v-for="social in socials"
          :key="social.icon"
          class="white--text mx-1"
          small
          >{{ social.icon }}</v-icon
        >
      </span>
    </v-app-bar>
    <v-app-bar flat class="white" height="80">
      <v-row>
        <v-col cols="12" md="3">
          <NuxtLink to="/">
            <img
              src="~/assets/images/logo.png"
              height="48"
              alt="Logo"
              class="mt-2"
            />
          </NuxtLink>
        </v-col>

        <v-col cols="12" md="6" align-self="center" class="font-weight-bold">
          <v-list flat>
            <v-list-item-group
              class="d-flex"
              active-class="userColorDarker--text"
            >
              <v-list-item
                v-for="navLink in navLinks"
                :key="navLink.icon"
                router
                exact
                :to="navLink.to"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="navLink.name" align="center" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="2" align-self="center" align="right">
          <v-icon
            v-for="actionIcon in actionIcons"
            :key="actionIcon.icon"
            class="ml-3"
            size="30"
            >{{ actionIcon.icon }}</v-icon
          >
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [
        { icon: "mdi-email-outline", value: "thaidoandat1@gmail.com" },
        { icon: "mdi-phone-outline", value: "0963825779" },
        { icon: "mdi-map-marker-outline", value: "Đô Lương, Nghệ An" },
      ],
      socials: [
        { icon: "mdi-twitter" },
        { icon: "mdi-pinterest" },
        { icon: "mdi-instagram" },
        { icon: "mdi-facebook" },
      ],
      languages: ["English", "Vietnamese", "Korean", "Chinese"],
      navLinks: [
        { name: "Home", to: "/" },
        { name: "Destinations", to: "/destinations" },
        { name: "Tours", to: "/tours" },
        { name: "About", to: "/about" },
      ],
      actionIcons: [
        { icon: "mdi-cart-outline" },
        { icon: "mdi-magnify" },
        { icon: "mdi-menu-open" },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>
