<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
      class="adminBackground"
    >
      <v-list>
        <v-list-item-group
          v-model="choose"
          active-class="bg-gradient-primary border-circle-right white--text"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            class="#546E7A--text"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app class="adminBackground">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          >mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon
        >
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-spacer />
      <admin-nav-user />
    </v-app-bar>
  </nav>
</template>

<script>
import AdminNavUser from "./AdminNavUser.vue";
export default {
  components: { AdminNavUser },
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: "mdi-view-dashboard-edit-outline",
          title: "Dashboard",
          to: "/ssadmin",
        },
        {
          icon: "mdi-fireplace",
          title: "Destination",
          to: "/ssadmin/destination",
        },
        {
          icon: "mdi-notebook-outline",
          title: "Plan",
          to: "/ssadmin/plan",
        },
        {
          icon: "mdi-room-service-outline",
          title: "Service",
          to: "/ssadmin/service",
        },
        {
          icon: "mdi-train-car",
          title: "Tour",
          to: "/ssadmin/tour",
        },
        {
          icon: "mdi-book-arrow-left-outline",
          title: "Booking",
          to: "/ssadmin/booking",
        },
        {
          icon: "mdi-receipt",
          title: "Invoice",
          to: "/ssadmin/invoice",
        },
        {
          icon: "mdi-account-group-outline",
          title: "Staff",
          to: "/ssadmin/staff",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      choose: true,
    };
  },
};
</script>

<style>
</style>
