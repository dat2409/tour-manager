<template>
  <div>
    <div class="contain">
      <v-parallax :src="require('~/assets/images/tour-image-header.jpg')">
      </v-parallax>
      <div
        class="
          text-image-header
          font-weight-bold
          display-3
          white--text
          text-uppercase
        "
      >
        tours for you
      </div>
    </div>
    <v-container class="mt-n16">
      <v-card min-height="1000" class="pa-16">
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
                <NuxtLink
                  :to="`/tours/${tour.id}`"
                  class="text-decoration-none"
                >
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
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tours: [],
    };
  },
  created() {
    this.$axios
      .get(`/tours/search/`, {
        params: {
          from: this.$route.query.from,
          to: this.$route.query.to,
          destinationName: this.$route.query.destinationName,
          tourName: this.$route.query.tourName
        },
      })
      .then(tours => {
        this.tours = tours.data;
        if (this.tours.length === 0) {
          this.$swal.fire('', `We haven't found any tours match your criteria`, 'info')
        }
      });
  },
};
</script>

<style>
</style>
