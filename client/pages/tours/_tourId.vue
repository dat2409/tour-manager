<template>
  <div class="tour-detail">
    <div class="contain">
      <v-parallax
        :src="require('~/assets/images/tour-image-header.jpg')"
      >
      </v-parallax>

      <div class="text-image-header display-1 white--text">
        <p class="text-image-header-satisfy text-center text-capitalize">amazing tour</p>
        <p class="font-weight-bold display-2 text-uppercase">{{ tour.name }}</p>
      </div>
    </div>
    <v-container class="mt-n16">
      <v-card>
        <v-tabs
          fixed-tabs
          v-model="tab"
          show-arrows
          height="100"
          background-color="userBg"
        >
          <v-tabs-slider color="userColor"></v-tabs-slider>
          <v-tab v-for="tab in tabs" :key="tab.icon">
            <v-icon size="20" class="me-3">{{ tab.icon }}</v-icon>
            <span>{{ tab.title }}</span>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="mt-10">
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="12" md="8">
                  <tour-info />
                </v-col>
                <v-col cols="12" md="4">
                  <form-book-tour />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="12" md="8">
                  <tour-plan />
                </v-col>
                <v-col cols="12" md="4">
                  <form-book-tour />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="12" md="8">
                  <tour-reviews />
                </v-col>
                <v-col cols="12" md="4">
                  <form-book-tour />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FormBookTour from '../../components/userComponents/tours/FormBookTour.vue';
import TourInfo from '../../components/userComponents/tours/TourInfo.vue';
import TourPlan from '../../components/userComponents/tours/TourPlan.vue';
import TourReviews from '../../components/userComponents/tours/TourReviews.vue';

export default {
  components: {
    TourInfo,
    TourPlan,
    FormBookTour,
    TourReviews
  },
  data() {
    return {
      tour: {},
      tabs: [
        { title: "information", icon: "mdi-file-document-multiple-outline" },
        { title: "tour plan", icon: "mdi-calendar-blank-multiple" },
        { title: "reviews", icon: "mdi-chat-outline" },
      ],
      tab: null,
    };
  },
  created() {
    this.$axios.get(`/tours/${this.$route.params.tourId}`).then((tour) => {
      this.tour = tour.data;
    });
  },
};
</script>

<style>
.v-tab--active .v-icon {
  color: #4dd0e1;
}
</style>
