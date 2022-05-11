<template>
  <div class="home-page">
    <carousel />
    <search />
    <destinations />
    <tour-item />
    <greetings />
    <tours />
  </div>
</template>

<script>
import Carousel from "../components/userComponents/homepage/Carousel.vue";
import Destinations from "../components/userComponents/homepage/Destinations.vue";
import Greetings from '../components/userComponents/homepage/Greetings.vue';
import Search from "../components/userComponents/homepage/Search.vue";
import TourItem from "../components/userComponents/homepage/TourItem.vue";
import Tours from "../components/userComponents/homepage/Tours.vue";
export default {
  components: {
    Carousel,
    Search,
    Destinations,
    TourItem,
    Tours,
    Greetings,
  },
};
</script>

<style>
</style>
