<template>
  <v-data-table
    :headers="headers"
    :items="invoices"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase">Invoices</v-toolbar-title>
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
    <template v-slot:[`item.isPaid`]="{ item }">
      <v-chip
        :color="getColor(item.isPaid)"
        class="white--text"
        @click="confirmPaid(item)"
        >{{ item.isPaid }}</v-chip
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
        .get("/booking-manager/invoices")
        .then((invoices) => (this.invoices = invoices.data));
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
          value: "order.fullName",
        },
        {
          text: "Email",
          value: "order.email",
        },
        {
          text: "Phone Number",
          value: "order.phoneNumber",
        },
        {
          text: "Address",
          value: "order.address",
        },
        {
          text: "Quantity",
          value: "order.quantity",
        },
        {
          text: "Total ($)",
          value: "order.totalPrice",
        },
        {
          text: "Tour",
          value: "order.tour.name",
        },
        {
          text: "Payment?",
          value: "isPaid",
        }
      ],
      invoices: [],
      name: "",
      search: "",
    };
  },
  methods: {
    getColor(booking) {
      if (booking) return "green";
      else return "red";
    },
    confirmPaid(invoice) {
      if (!invoice.isPaid) {
        this.$swal
          .fire({
            title: "Confirm payment",
            text: "This booking is made payment?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .patch(`/booking-manager/invoices/${invoice.id}`)
                .then(() => this.$fetch());
              this.$swal.fire("", "Confirm deposit successfully!", "success");
            }
          });
      }
      else {
        this.$swal
          .fire({
            title: "Undo",
            text: "This booking is not made payment?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .patch(`/booking-manager/invoices/${invoice.id}`)
                .then(() => this.$fetch());
              this.$swal.fire("", "Undo successfully!", "success");
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
