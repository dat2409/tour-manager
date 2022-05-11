<template>
  <v-card class="transparent mt-3" outlined>
    <v-card-title>
      <h2>{{ selectedTour.name }}</h2>
      <span class="userColor2--text mt-2 ml-5 mr-1 font-weight-bold"
        >${{ selectedTour.price }}</span
      >
      <span class="mt-2 subtitle-1"> / per person</span>
    </v-card-title>
    <v-card-subtitle>
      <v-rating
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half-full"
        color="userColor2"
        background-color="userColor2"
        readonly
        size="26"
        class="mt-5 ml-n2"
        v-model="selectedTour.star"
        half-increments
      ></v-rating>
    </v-card-subtitle>
    <v-card-text>
      <p class="body-2 black--text mt-8 font-italic">{{ selectedTour.desc }}</p>
      <v-row class="mt-10 mb-3">
        <v-col cols=12 md=3 class="font-weight-bold black--text body-1">Destination</v-col>
        <v-col cols=12 md=3 class="body-1 black--text"><NuxtLink :to="`/destinations/${selectedTour.plan.destination.id}`" class="text-decoration-none userColor2--text">{{ selectedTour.plan.destination.name }}</NuxtLink></v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col cols=12 md=3 class="font-weight-bold black--text body-1">Departure</v-col>
        <v-col cols=12 md=3 class="body-1 black--text">{{ selectedTour.departure }}</v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col cols=12 md=3 class="font-weight-bold black--text body-1">Departure Time</v-col>
        <v-col cols=12 md=3 class="body-1 black--text">{{ selectedTour.departureTime.split("T")[0].split("-").reverse().join("-") }}</v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col cols=12 md=3 class="font-weight-bold black--text body-1">Max People</v-col>
        <v-col cols=12 md=3 class="body-1 black--text">{{ selectedTour.maxPeople }}</v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col cols=12 md=3 class="font-weight-bold black--text body-1">Sold</v-col>
        <v-col cols=12 md=3 class="body-1 black--text">{{ selectedTour.sold }}</v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col cols=12 md=3 class="font-weight-bold black--text body-1">Services</v-col>
        <v-col cols=12 md=9 class="body-1 black--text">
          <span v-for="(service, index) in selectedTour.services" :key="index"><v-chip color="userColor2" text-color="white" class="mr-2 mt-n1">{{ service.service.name }}</v-chip></span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["selectedTour"]),
  data() {
    return {
    }
  }
};
</script>

<style>
</style>
