<template>
  <div class="mt-3">
    <v-row class="mb-2">
      <h1 class="text-gradient text-capitalize">plans for every destination</h1>
      <v-spacer></v-spacer>
      <NuxtLink to="/ssadmin/plan/new" class="text-decoration-none">
        <v-btn class="bg-gradient-primary" dark>Create new plan</v-btn>
      </NuxtLink>
    </v-row>

    <v-row>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(destination, index) in destinations"
          :key="index"
        >
          <v-expansion-panel-header>{{
            destination.name
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(plan, index) in destination.plans"
                :key="index"
              >
                <v-expansion-panel-header>{{
                  plan.name
                }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card
                    v-for="(dayplan, index) in plan.dayplans"
                    :key="index"
                  >
                    <v-card-title>Day {{ dayplan.day }}</v-card-title>
                    <v-card-subtitle>{{ dayplan.title }}</v-card-subtitle>
                    <v-card-text>{{ dayplan.desc }}</v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "IndexPlan",
  layout: "admin",
  data() {
    return {
      plans: [],
      destinations: [],
    };
  },
  fetch() {
    try {
      this.$axios
        .get("/destinations")
        .then((destinations) => (this.destinations = destinations.data));
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
</style>
