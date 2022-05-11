<template>
  <div class="tours-page">
    <div class="contain">
      <v-parallax
        :src="require('~/assets/images/tour-image-header.jpg')"
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
        tours for you
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
                <v-col cols="12" md="9">
                  <all-tours :order-by="orderBy.byDestination"/>
                </v-col>
                <v-col cols="12" md="3">
                  <search-tour />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="12" md="9">
                  <all-tours :order-by="orderBy.byPriceAsc" />
                </v-col>
                <v-col cols="12" md="3">
                  <search-tour />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="12" md="9">
                  <all-tours :order-by="orderBy.byPriceDesc" />
                </v-col>
                <v-col cols="12" md="3">
                  <search-tour />
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
import AllTours from "../../components/userComponents/tours/AllTours.vue";
import SearchTour from "../../components/userComponents/tours/SearchTour.vue";
export default {
  components: {
    AllTours,
    SearchTour,
  },
  data() {
    return {
      tabs: [
        { title: "by destination", icon: "mdi-calendar-range" },
        { title: "price low to high", icon: "mdi-upload" },
        { title: "price high to low", icon: "mdi-download" },
      ],
      tab: null,
      orderBy: {
        byDestination: '',
        byPriceAsc: '/price-asc',
        byPriceDesc: '/price-desc',
      }
    };
  },
};
</script>

<style>
.v-tab--active .v-icon {
  color: #4dd0e1;
}
</style>
