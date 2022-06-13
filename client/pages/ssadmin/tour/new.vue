<template>
  <v-card>
    <v-card-title>
      <v-row justify="center" class="text-gradient display-1 font-weight-black"
        >New Tour</v-row
      >
    </v-card-title>
    <v-form @submit.prevent="createTour">
      <v-card-text>
        <v-text-field v-model="name" label="Name" />
        <v-select
          v-model="selectedPlan"
          :items="plans"
          :item-text="(plan) => renderPlan(plan)"
          item-value="plan"
          label="Plan"
          return-object
        />
        <v-text-field v-model="departure" label="Departure" />
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="departureDay"
              label="Departure day"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="departureDay"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="departureTime"
              label="Departure time"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="departureTime"
            full-width
            format="24hr"
            @click:minute="$refs.menu.save(departureTime)"
          ></v-time-picker>
        </v-menu>
        <v-text-field
          v-model="price"
          label="Price"
          append-icon="mdi-currency-usd"
          type="number"
        />
        <v-textarea v-model="desc" label="Description" outlined />
        <v-text-field v-model="maxPeople" label="Max People" type="number"/>
        <v-text-field v-model="flight" label="Flight" />
        <v-select
          v-model="selectedServices"
          :items="services"
          item-text="name"
          label="Service"
          return-object
          multiple
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" class="bg-gradient-primary" dark>Create</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      name: "",
      departure: "",
      departureDay: "",
      departureTimeReq: "",
      price: "",
      desc: "",
      maxPeople: "",
      flight: "",
      menu: false,
      menu2: false,
      departureDay: "",
      departureTime: "",
      plans: [],
      selectedPlan: {},
      services: [],
      selectedServices: [],
    };
  },
  fetch() {
    try {
      this.$axios.get("/plans").then((plans) => {
        this.plans = plans.data;
      });
      this.$axios.get("/services").then((services) => {
        this.services = services.data;
      });
    } catch (error) {
      console.log(error);
    }
  },
  computed: {},
  methods: {
    renderPlan(plan) {
      if (plan.destination) {
        return plan.name + " - " + plan.destination.name;
      }
    },
    createTour() {
      const services = this.selectedServices.map(
        (service) => service.name
      );
      const tourCreated = {
        name: this.name,
        departure: this.departure,
        departureDay: this.departureDay,
        departureTimeReq: this.departureTime,
        price: parseFloat(this.price),
        desc: this.desc,
        maxPeople: parseInt(this.maxPeople),
        flight: this.flight,
        planId: this.selectedPlan.id,
        services,
      };

      try {
        this.$axios
          .post(`/tours`, tourCreated)
          .then(() => {
            this.$fetch();
            this.$swal.fire(
              "Successful!",
              "You've already created new tour!",
              "success"
            );
            this.$router.push('/ssadmin/tour');
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
