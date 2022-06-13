<template>
  <v-card>
    <v-tabs v-model="tab" show-arrows>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="tab in tabs" :key="tab.icon">
        <v-icon size="20" class="me-3">{{ tab.icon }}</v-icon>
        <span>{{ tab.title }}</span>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <account-info/>
      </v-tab-item>
      <v-tab-item>
        <account-security/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import AccountInfo from '~/components/adminComponents/accountSettings/AccountInfo.vue'
import AccountSecurity from '~/components/adminComponents/accountSettings/AccountSecurity.vue'
export default {
  data() {
    return {
      tabs: [
        { title: "Account", icon: "mdi-account-settings-outline" },
        { title: "Security", icon: "mdi-lock-open-outline" },
      ],
      tab: null
    };
  },
  layout: "admin",
  middleware: ["isAuthenticated"],
  components: {
    AccountInfo,
    AccountSecurity
  }
};
</script>

<style>
</style>
