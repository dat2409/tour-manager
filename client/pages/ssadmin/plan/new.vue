<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">New Plan</span>
    </v-card-title>
    <v-form @submit.prevent="createPlan">
      <v-card-text>
        <v-text-field label="Name" v-model="name" />
        <v-select
          v-model="selectedDestination"
          :items="destinations"
          item-text="name"
          label="Destination"
          persistent-hint
          return-object
          single-line
        />
        <v-divider></v-divider>
        <v-container
          v-for="(dayPlan, index) in dayPlans"
          :key="index"
          class="border-day-plan"
        >
          <v-text-field
            label="Day"
            v-model="dayPlan.day"
            type="number"
            :name="`workExperiences[${index}][day]`"
          />
          <v-text-field
            label="Title"
            v-model="dayPlan.title"
            :name="`workExperiences[${index}][title]`"
          />
          <v-textarea
            label="Description"
            v-model="dayPlan.desc"
            :name="`workExperiences[${index}][desc]`"
          />
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              @click="deleteDayPlan(index)"
              class="bg-gradient-warning ma-3 overline"
              dark
              fab
              >Delete</v-btn
            ></v-row
          >
        </v-container>
        <v-btn @click="addDayPlan" class="bg-gradient-primary" dark fab
          >Add</v-btn
        >
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="bg-gradient-primary" dark type="submit">
          Create plan
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      dayPlans: [
        {
          day: null,
          title: "",
          desc: "",
        },
      ],
      name: "",
      destinations: [],
      selectedDestination: {},
    };
  },
  fetch() {
    try {
      this.$axios.get("/destinations").then((destinations) => {
        this.destinations = destinations.data;
      });
    } catch (err) {
      return err;
    }
  },
  methods: {
    addDayPlan() {
      this.dayPlans.push({
        day: "",
        title: "",
        desc: "",
      });
    },
    deleteDayPlan(index) {
      this.dayPlans.splice(index, 1);
    },
    createPlan() {
      const plan = {
        name: this.name,
        destinationId: this.selectedDestination.id,
        dayPlans: this.dayPlans,
      };
      this.$axios
        .post("/plans", plan)
        .then(() => this.$router.push("/ssadmin/plan"));
    },
  },
};
</script>

<style>
</style>
