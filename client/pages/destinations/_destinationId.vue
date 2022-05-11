<template>
  <div class="destination-detail" v-if="destination.images">
    <div class="contain">
      <v-parallax :src="destination.images[1].url"> </v-parallax>
      <div class="text-image-header display-1 white--text">
        <p class="text-image-header-satisfy text-center text-capitalize">
          Wonderful destination
        </p>
        <p class="font-weight-bold display-2 text-uppercase">
          {{ destination.name }}
        </p>
      </div>
    </div>

    <v-container class="mt-n16">
      <v-card>
        <v-row>
          <v-col cols="12" md="8">
            <v-card-title class="headline font-weight-bold">{{
              destination.name
            }}</v-card-title>
            <v-card-subtitle class="subtitle-1">{{
              destination.address
            }}</v-card-subtitle>
            <v-card-text class="font-italic">{{
              destination.desc
            }}</v-card-text>
          </v-col>
        </v-row>
        <v-row class="pb-16 pt-10">
          <v-col
            cols="12"
            md="6"
            v-for="(image, index) in destination.images"
            :key="index"
          >
            <v-dialog>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="image.url"
                  v-bind="attrs"
                  v-on="on"
                  max-height=348
                ></v-img>
              </template>
              <v-card>
                <v-img :src="image.url" :aspect-ratio="16/9"></v-img>
              </v-card>
            </v-dialog>
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
      destination: {},
    };
  },
  created() {
    this.$axios
      .get(`/destinations/${this.$route.params.destinationId}`)
      .then((destination) => {
        this.destination = destination.data;
      });
  },
};
</script>

<style>
</style>
