<template>
  <v-data-table
    :headers="headers"
    :items="tours"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase">Tours</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by name"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
          <v-btn color="primary" @click="newTour" dark class="mb-2 bg-gradient-primary">
            New tour
          </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="viewTour(item)"> mdi-eye-outline </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: "admin",
  fetch() {
    try {
      this.$axios.get("/tours").then((tours) => (this.tours = tours.data));
    } catch (err) {
      return err;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {
          text: "Departure",
          value: "departure",
        },
        {
          text: "Max People",
          value: "maxPeople",
        },
        {
          text: "Sold",
          value: "sold",
        },
        {
          text: "Flight",
          value: "flight",
        },
        {
          text: "Price ($)",
          value: "price",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      tours: [],
      name: "",
      search: "",
    };
  },
  methods: {
    viewTour(item) {
      this.$router.push(`/ssadmin/tour/${item.id}`)
    },
    newTour() {
      if (this.$store.getters.isManager) {
        this.$router.push('/ssadmin/tour/new')
      }
      else {
        this.$swal.fire("No Permission!", "Only manager can do this action!", "warning");
      }
    }
  },
  middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
