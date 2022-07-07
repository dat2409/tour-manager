<template>
  <v-card>
    <v-card-title>
      <v-row justify="center" class="text-gradient display-1 font-weight-black"
        >New Tour</v-row
      >
    </v-card-title>
    <v-form @submit.prevent="createTour">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="12">
            <v-radio-group v-model="isSold" row>
              <span
                class="subtitle-1 font-weight-medium mr-5 grey--text text--darken-1"
                >Sell this tour?</span
              >
              <v-radio label="Yes" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="12">
            <v-radio-group v-model="isPublic" row>
              <span
                class="subtitle-1 font-weight-medium mr-5 grey--text text--darken-1"
                >Public this tour?</span
              >
              <v-radio label="Yes" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field v-model="name" label="Name" outlined
          /></v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedPlan"
              :items="plans"
              :item-text="(plan) => renderPlan(plan)"
              item-value="plan"
              label="Plan"
              return-object
              outlined
            >
              <template v-slot:item="{ item }">
                <v-hover v-slot="{ hover }">
                  <v-card v-if="hover" class="transparent" outlined>
                    <v-card-title class="text-capitalize">
                      <h3>{{ item.name + " - " + item.destination.name }}</h3>
                    </v-card-title>
                    <v-card-text>
                      <v-timeline align-top dense>
                        <v-timeline-item
                          small
                          v-for="(dayplan, index) in item.dayplans"
                          :key="index"
                          icon="mdi-star"
                          fill-dot
                        >
                          <v-card>
                            <v-card-title class="indigo lighten-5"
                              >Day {{ dayplan.day }}:
                              {{ dayplan.title }}</v-card-title
                            >
                            <v-card-text class="white text--primary">
                              <p>
                                {{ dayplan.desc }}
                              </p>
                            </v-card-text>
                          </v-card>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                  </v-card>
                  <span v-else>{{
                    item.name + " - " + item.destination.name
                  }}</span>
                </v-hover>
              </template>
            </v-select></v-col
          >
          <v-col cols="12" md="4">
            <v-text-field
              v-model="price"
              label="Price"
              append-icon="mdi-currency-usd"
              type="number"
              outlined
          /></v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="6"
            ><v-text-field v-model="departure" label="Departure" outlined
          /></v-col>
          <v-col cols="12" md="3"
            ><v-menu
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
              ></v-date-picker> </v-menu
          ></v-col>
          <v-col cols="12" md="3"
            ><v-menu
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
              ></v-time-picker> </v-menu
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-textarea v-model="desc" label="Description" outlined /></v-col
        ></v-row>
        <v-row dense>
          <v-col cols="12" md="2">
            <v-text-field
              v-model="maxPeople"
              label="Max People"
              type="number"
              outlined
          /></v-col>
          <v-col cols="12" md="5">
            <v-text-field v-model="flight" label="Flight" outlined
          /></v-col>
          <v-col cols="12" md="5">
            <v-select
              v-model="selectedServices"
              :items="services"
              item-text="name"
              label="Service"
              return-object
              multiple
              outlined
          /></v-col>
        </v-row>
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
      isSold: Boolean,
      isPublic: Boolean,
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
      const services = this.selectedServices.map((service) => service.name);
      const tourCreated = {
        name: this.name,
        departure: this.departure,
        departureDay: this.departureDay,
        departureTimeReq: this.departureTime,
        price: parseFloat(this.price),
        desc: this.desc,
        maxPeople: parseInt(this.maxPeople),
        flight: this.flight,
        isPublic: this.isPublic,
        isSold: this.isSold,
        plan: this.selectedPlan,
        services,
      };

      console.log(tourCreated)

      try {
        this.$axios.post(`/tours`, tourCreated).then(() => {
          this.$fetch();
          this.$swal.fire(
            "Successful!",
            "You've already created new tour!",
            "success"
          );
          this.$router.push("/ssadmin/tour");
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.v-menu__content {
  max-height: 600px !important;
}
</style>
