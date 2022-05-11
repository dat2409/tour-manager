<template>
  <v-carousel hide-delimiters cycle interval="4000">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
      <v-row class="fill-height" align="center" justify="center">
        <h1 class="new-font">{{ item.title }}</h1>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: require("~/assets/images/slider/carousel2.jpg"),
          title: `Come with us`,
          subtitle: `Explore and Travel`,
        },
        {
          src: require("~/assets/images/slider/carousel3.jpg"),
          title: `Let's go now`,
          subtitle: `Relax and Enjoy`,
        },
        {
          src: require("~/assets/images/slider/carousel4.jpg"),
          title: `Viet Nam is wonderful`,
          subtitle: `Explore and Travel`,
        },
        {
          src: require("~/assets/images/slider/carousel1.jpg"),
          title: `Enjoy this moment`,
          subtitle: `Relax and Enjoy`,
        },
      ],
    };
  },
};
</script>

<style>
.new-font {
  font-family: "Moon Dance", cursive;
  color: white;
  font-size: 72px;
  font-weight: 500;
}
</style>
