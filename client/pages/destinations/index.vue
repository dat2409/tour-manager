<template>
  <div class="destination-page">
    <div class="contain">
      <v-parallax
        :src="require('~/assets/images/destination-image-header.jpg')"
      >
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
        destinations
      </div>
    </div>

    <v-container class="mt-n16">
      <v-card outlined>
      <v-row class="my-3 py-16">
        <v-col
          cols="12"
          md="4"
          sm="6"
          v-for="(destination, index) in destinations"
          :key="index"
          align="center"
        >
          <NuxtLink :to="`/destinations/${destination.id}`" class="text-decoration-none"
            ><v-avatar size="350">
              <v-img :src="`${destination.images[2].url}`">
                <v-row
                  align="center"
                  justify="center"
                  class="destination-text-image"
                >
                  {{ destination.name }}
                </v-row>
              </v-img>
            </v-avatar></NuxtLink
          >
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
      destinations: [],
    };
  },
  created() {
    this.$axios
      .get("/destinations")
      .then((destinations) => (this.destinations = destinations.data));
  },
};
</script>

<style>
</style>
