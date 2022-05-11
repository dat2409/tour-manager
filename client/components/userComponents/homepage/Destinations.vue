<template>
<div class="userBg">
  <v-container class="my-16 py-16">
    <v-card outlined color="transparent" max-width="635" class="mx-auto">
      <v-card-title>
        <v-row
          justify="center"
          class="text-capitalize destination-title userColor--text my-5"
        >
          choose your
        </v-row>
      </v-card-title>
      <v-card-subtitle>
        <v-row
          justify="center"
          class="
            text-capitalize
            destination-subtitle
            font-weight-bold
            black--text
            my-4
          "
        >
          perfect destination
        </v-row>
      </v-card-subtitle>
      <v-card-text>
        <v-row justify="center" class="destination-text my-3">
          Identify the purpose of your trip. It is important to know what you
          expect from your holidays before choosing a travel destination.
        </v-row>
      </v-card-text>
    </v-card>
    <v-row class="mt-3">
      <v-col
        cols="12"
        md="4"
        sm="6"
        v-for="(destination, index) in destinations"
        :key="index"
        align="center"
      >
        <NuxtLink :to="`/destinations/${destination.id}`" class="text-decoration-none"><v-avatar size="350">
          <v-img
            :src="`${destination.images[index].url}`">
            <v-row align="center" justify="center" class="destination-text-image">
              {{ destination.name}}
            </v-row>
          </v-img>
        </v-avatar></NuxtLink>
      </v-col>
    </v-row>
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
    try {
      this.$axios.get("/destinations/display").then((destinations) => {
        this.destinations = destinations.data;
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
.destination-title {
  font-family: "Moon Dance", cursive;
  font-size: 54px;
  font-weight: 600;
}

.destination-subtitle {
  font-size: 65px;
}

.destination-text {
  font-size: 18px;
  text-align: center;
  font-weight: 400;
}

.destination-text-image {
  font-family: "Moon Dance", cursive;
  color: white;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
}
</style>
