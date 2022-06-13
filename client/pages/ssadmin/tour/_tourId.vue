<template>
  <v-card>
    <v-card-title>
      <v-row justify="center" class="text-gradient display-1 font-weight-black"
        >Tour Detail</v-row
      >
    </v-card-title>
    <v-form @submit.prevent="updateTour">
      <v-card-text>
        <v-text-field v-model="tour.name" label="Name" outlined/>
        <v-select
          v-if="plan.destination"
          v-model="plan"
          :items="plans"
          :item-text="(plan) => plan.name + ' - ' + plan.destination.name"
          item-value="plan"
          label="Plan"
          return-object
          outlined
        />
        <v-text-field v-model="tour.departure" label="Departure" outlined/>
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
              outlined
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
              outlined
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
          v-model="tour.price"
          label="Price"
          append-icon="mdi-currency-usd"
          type="number"
          outlined
        />
        <v-textarea v-model="tour.desc" label="Description" outlined />
        <v-text-field
          v-model="tour.maxPeople"
          label="Max People"
          type="number"
          outlined
        />
        <v-text-field v-model="tour.sold" label="Sold" disabled outlined/>
        <v-text-field v-model="tour.flight" label="Flight" outlined/>
        <v-select
          v-model="selectedServices"
          :items="services"
          item-text="name"
          label="Service"
          return-object
          multiple
          outlined
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="deleteTour" class="bg-gradient-warning" dark
          >Delete</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn type="submit" class="bg-gradient-primary" dark>Update</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      tour: {},
      menu: false,
      menu2: false,
      departureDay: "",
      departureTime: "",
      plans: [],
      plan: {},
      services: [],
      selectedServices: [],
    };
  },
  fetch() {
    try {
      this.$axios.get(`/tours/${this.$route.params.tourId}`).then((tour) => {
        this.tour = tour.data;
        this.plan = tour.data.plan;
        this.selectedServices = tour.data.services.map((a) => a.service);
        this.departureDay = this.tour.departureTime.split("T")[0];
        this.departureTime = this.tour.departureTime.split("T")[1].substr(0, 5);
      });
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
  methods: {
    updateTour() {
      const updatedServices = this.selectedServices.map(
        (service) => service.name
      );
      const updatedTour = {
        name: this.tour.name,
        departure: this.tour.departure,
        departureDay: this.departureDay,
        departureTimeReq: this.departureTime,
        price: parseFloat(this.tour.price),
        desc: this.tour.desc,
        maxPeople: parseInt(this.tour.maxPeople),
        flight: this.tour.flight,
        planId: this.plan.id,
        services: updatedServices,
      };

      try {
        this.$axios
          .patch(`/tours/${this.$route.params.tourId}`, updatedTour)
          .then(() => {
            this.$fetch();
            this.$swal.fire(
              "Successful!",
              "You've already updated tour!",
              "success"
            );
          });
      } catch (error) {
        console.log(error);
      }
    },
    deleteTour() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios
              .delete(`/tours/${this.$route.params.tourId}`)
              .then(() => {
                this.$swal.fire(
                  "Deleted!",
                  "This tour has been deleted.",
                  "success"
                );
                this.$router.push("/ssadmin/tour");
              });
          }
        });
    },
  },
};
</script>

<style>
</style>
