<template>
  <v-data-table
    :headers="headers"
    :items="bookings"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase">Bookings</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="deleteItemConfirm(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:[`item.isDeposited`]="{ item }">
      <v-chip
        :color="getColor(item.isDeposited)"
        class="white--text"
        @click="confirmDeposit(item)"
        >{{ item.isDeposited }}</v-chip
      >
    </template>
  </v-data-table>
</template>

<script>
export default {
  layout: "admin",
  fetch() {
    try {
      this.$axios
        .get("/booking-manager/orders")
        .then((bookings) => (this.bookings = bookings.data));
    } catch (err) {
      return err;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Full Name",
          align: "start",
          value: "fullName",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Phone Number",
          value: "phoneNumber",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Note",
          value: "note",
        },
        {
          text: "Quantity",
          value: "quantity",
        },
        {
          text: "Total ($)",
          value: "totalPrice",
        },
        {
          text: "Tour",
          value: "tour.name",
        },
        {
          text: "Deposited?",
          value: "isDeposited",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      bookings: [],
      name: "",
      search: "",
    };
  },
  methods: {
    viewBooking(item) {
      this.$router.push(`/ssadmin/booking/${item.id}`);
    },
    getColor(deposit) {
      if (deposit) return "green";
      else return "red";
    },
    confirmDeposit(booking) {
      if (!booking.isDeposited) {
        this.$swal
          .fire({
            title: "Confirm deposited?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .post(`/booking-manager/invoices/${booking.id}`)
                .then(() => this.$fetch());
              this.$swal.fire("", "Confirm deposit successfully!", "success");
            }
          });
      }
    },
    deleteItemConfirm(booking) {
      if (booking.isDeposited) {
        this.$swal.fire("", "You can't delete deposited booking!", "error");
      } else {
        this.$swal
          .fire({
            title: "Confirm delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .delete(`/booking-manager/orders/${booking.id}`)
                .then(() => this.$fetch());
              this.$swal.fire(
                "Deleted!",
                "The booking has been deleted.",
                "success"
              );
            }
          });
      }
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
