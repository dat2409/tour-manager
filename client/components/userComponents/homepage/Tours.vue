<template>
  <div class="userBg tour-container">
    <v-container>
      <v-card outlined color="transparent" max-width="635" class="mx-auto">
        <v-card-title>
          <v-row
            justify="center"
            class="text-capitalize tour-title userColor--text my-5"
          >
            plan the
          </v-row>
        </v-card-title>
        <v-card-subtitle>
          <v-row
            justify="center"
            class="
              text-capitalize
              tour-subtitle
              font-weight-bold
              black--text
              my-4
            "
          >
            wonderful tour
          </v-row>
        </v-card-subtitle>
        <v-card-text>
          <v-row justify="center" class="tour-text my-3">
            Travel companies offer Vietnam tours at an affordable price, admire
            the beautiful scenery that captivates people's hearts.
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-slide-group class="pa-4" show-arrows>
      <v-slide-item v-for="(tour, index) in tours" :key="index">
        <v-card class="mx-3" max-width="300">
          <v-img
            :src="
              tour.plan.destination.images[Math.floor(Math.random() * 4)].url
            "
            height="200px"
          ></v-img>

          <v-card-title class="font-weight-bold headline mt-2 mb-1">
            {{ tour.name }}
          </v-card-title>

          <v-card-subtitle class="card-subtitle">
            <p class="tour-description">
              {{ tour.desc }}
            </p>
            <p class="font-weight-black">${{ tour.price }}</p>
          </v-card-subtitle>

          <v-card-actions>
            <NuxtLink :to="`/tours/${tour.id}`" class="text-decoration-none">
              <v-btn color="userColorDarker" text> Explore </v-btn>
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-slide-item>
    </v-slide-group>
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
    this.$axios.get("/tours").then((tours) => {
      this.tours = tours.data;
    });
  },
};
</script>

<style>
.tour-container {
  padding-bottom: 150px;
}

.tour-title {
  font-family: "Moon Dance", cursive;
  font-size: 54px;
  font-weight: 600;
}

.tour-subtitle {
  font-size: 65px;
}

.tour-text {
  font-size: 18px;
  text-align: center;
  font-weight: 400;
}

.card-subtitle {
  max-width: 260px;
}

.tour-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-weight: 400;
  font-size: 14px;
}
</style>
