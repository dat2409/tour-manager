<template>
  <div>
    <v-card class="userColor2" dark>
      <v-card-title class="text-capitalize">plan your trip</v-card-title>
      <v-card-subtitle class="white--text"
        >It's time to plan just the perfect vacation!</v-card-subtitle
      >
      <v-form @submit.prevent="search">
        <v-card-text>
          <v-text-field
            v-model="tourName"
            label="Search Tour"
            prepend-inner-icon="mdi-compass"
            outlined
            class="white--text rounded-0 font-weight-bold"
            background-color="userColorLighter"
          >
          </v-text-field>
          <v-text-field
            v-model="destinationName"
            label="Where to?"
            prepend-inner-icon="mdi-magnify"
            outlined
            class="white--text rounded-0 font-weight-bold my-n6"
            background-color="userColorLighter"
          >
          </v-text-field>
          <v-menu
            v-model="menuFrom"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="from"
                label="From"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                class="white--text rounded-0 font-weight-bold my-n6"
                background-color="userColorLighter"
                prepend-inner-icon="mdi-calendar-arrow-right"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="from"
              @input="menuFrom = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="menuTo"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="to"
                label="To"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                class="white--text rounded-0 font-weight-bold my-n6"
                background-color="userColorLighter"
                prepend-inner-icon="mdi-calendar-arrow-left"
              ></v-text-field>
            </template>
            <v-date-picker v-model="to" @input="menuTo = false"></v-date-picker>
          </v-menu>
          <v-btn block class="white black--text mt-2" type="submit">Find</v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      destinationName: "",
      tourName: "",
      from: "",
      to: "",
      menuFrom: false,
      menuTo: false,
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: "tours/searchResult",
        query: {
          from: this.from,
          to: this.to,
          destinationName: this.whereTo,
          tourName: this.tourName,
        },
      });
    },
  },
};
</script>

<style>
</style>
