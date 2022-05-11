<template>
  <v-container class="mt-16 py-16">
    <v-row>
      <v-col cols="12" md="3" v-for="(tourItem, index) in tourItems" :key="index" align="center">
        <v-card outlined color="transparent">
          <v-img :src="tourItem.image" width="76" height="78"></v-img>
          <v-card-title><v-row justify="center" class="mt-3">{{ tourItem.name }}</v-row></v-card-title>
          <v-card-text><v-row justify="center" class="my-3 font-font-font-weight-regular body-1">{{ tourItem.desc }}</v-row></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tourItems: [
        {
          image: require("~/assets/images/tourItem/item1.png"),
          name: "Restaurants",
          desc: "Aenean commodo ligula eget dolor. Lorem ipsum",
        },
        {
          image: require("~/assets/images/tourItem/item2.png"),
          name: "Shops & Boutiques",
          desc: "Aenean commodo ligula eget dolor. Lorem ipsum",
        },
        {
          image: require("~/assets/images/tourItem/item3.png"),
          name: "Sightseeing",
          desc: "Aenean commodo ligula eget dolor. Lorem ipsum",
        },
        {
          image: require("~/assets/images/tourItem/item4.png"),
          name: "Where to Stay",
          desc: "Aenean commodo ligula eget dolor. Lorem ipsum",
        },
      ],
    };
  },
};
</script>

<style>
</style>
