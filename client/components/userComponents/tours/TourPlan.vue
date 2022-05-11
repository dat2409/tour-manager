<template>
  <v-card class="transparent" outlined>
    <v-card-title class="text-capitalize">
      <h2>tour plan</h2>
    </v-card-title>
    <v-card-text>
      <v-timeline align-top dense>
        <v-timeline-item
          color="userColor"
          v-for="(dayplan, index) in selectedTour.plan.dayplans"
          :key="index"
          icon="mdi-star"
          fill-dot
        >
          <v-card color="userColor" dark class="mb-5">
            <v-card-title class="text-h6"
              >Day {{ dayplan.day }}: {{ dayplan.title }}</v-card-title
            >
            <v-card-text class="white text--primary pt-5">
              <p>
                {{ dayplan.desc }}
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["selectedTour"]),
};
</script>

<style>
</style>
