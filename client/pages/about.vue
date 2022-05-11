<template>
  <div class="about-us">
    <div class="contain">
      <v-parallax :src="require('~/assets/images/about-us-title-img-1.jpg')">
      </v-parallax>

      <div class="text-image-header display-1 white--text">
        <p class="text-image-header-satisfy text-center text-capitalize">
          welcome
        </p>
        <p class="font-weight-bold display-2 text-capitalize">about us</p>
      </div>
    </div>
    <v-container class="mt-16">
      <v-row class="py-16">
        <v-col cols="12" md="7">
          <v-card outlined class="transparent">
            <v-card-title class="display-2 font-weight-bold"
              >SetSail Tour Travel</v-card-title
            >
            <v-card-subtitle class="title mt-1 mb-4"
              >“Travel is the main thing you purchase that makes you more
              extravagant”. We, at ‘Organization Name’, swear by this and put
              stock in satisfying travel dreams that make you perpetually rich
              constantly.</v-card-subtitle
            >
            <v-card-text class="body-1"
              >We have been moving excellent encounters for a considerable
              length of time through our cutting-edge planned occasion bundles
              and other fundamental travel administrations. We rouse our clients
              to carry on with a rich life, brimming with extraordinary travel
              encounters.
              <br />
              Through our exceptionally curated occasion bundles, we need to
              take you on an adventure where you personally enjoy the stunning
              magnificence of America and far-off terrains. We need you to
              observe sensational scenes that are a long way past your creative
              ability.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" align="end">
          <v-avatar size="350">
            <v-img
              :src="require('~/assets/images/hoa-sen-about-us.jpg')"
            ></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
