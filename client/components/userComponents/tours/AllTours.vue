<template>
  <v-card class="transparent" outlined min-height=1000>
    <v-row>
      <v-col cols="12" md="6" v-for="(tour, index) in tours" :key="index">
        <v-card>
          <v-img
            :src="tour.plan.destination.images[index % 4].url"
            max-height="230"
          ></v-img>
          <v-card-title class="font-weight-bold headline mt-4 mb-2">
            {{ tour.name }}
          </v-card-title>

          <v-card-subtitle>
            <p class="tour-description">
              {{ tour.desc }}
            </p>
            <p class="font-weight-black">${{ tour.price }}</p>
          </v-card-subtitle>

          <v-card-actions>
            <NuxtLink :to="`/tours/${tour.id}`" class="text-decoration-none">
              <v-btn
                color="userColorDarker"
                text
                @click="setSelectedTour(tour)"
              >
                Explore
              </v-btn>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tours: [],
    };
  },
  created() {
    this.$axios.get(`/tours/${this.orderBy}`).then((tours) => {
      this.tours = tours.data;
    });
  },
  methods: {
    setSelectedTour(tour) {
      this.$store.dispatch("setSelectedTour", tour);
    },
  },
  props: ["orderBy"],
};
</script>

<style>
</style>
