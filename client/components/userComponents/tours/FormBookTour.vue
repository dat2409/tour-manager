<template>
  <div>
    <v-card class="userColor2" dark>
      <v-card-title class="text-capitalize">book this tour</v-card-title>
      <v-card-subtitle class="white--text mb-3"
        >Arrange your trip in advance - book this tour now!</v-card-subtitle
      >

      <v-form @submit.prevent="bookTour" ref="form">
        <v-card-text>
          <v-text-field
            v-model="fullName"
            label="Full Name"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
            :rules="nameRules"
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
            :rules="emailRules"
          >
          </v-text-field>
          <v-text-field
            v-model="confirmEmail"
            label="Confirm Email"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
            :rules="confirmEmailRules.concat(confirmEmailValid)"
          >
          </v-text-field>
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
            :rules="phoneNumberRules"
          >
          </v-text-field>
          <v-text-field
            v-model="address"
            label="Address"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
          >
          </v-text-field>
          <v-textarea
            v-model="note"
            label="Note"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
          >
          </v-textarea>
          <v-text-field
            v-model="quantity"
            label="Quantity"
            type="number"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
            :rules="quantityRules"
          >
          </v-text-field>

          <v-btn block class="mt-5 mb-2 white black--text">
            <span>Total</span>
            <v-spacer></v-spacer>
            <v-icon>mdi-currency-usd</v-icon>
            <span>{{ countTotalPrice }}</span>
          </v-btn>
          <v-btn block class="white black--text" type="submit">book now</v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    let tour = this.$store.state.selectedTour;
    return {
      fullName: "",
      email: "",
      confirmEmail: "",
      phoneNumber: "",
      address: "",
      note: "",
      quantity: 0,
      totalPrice: null,
      selectedTour: this.$store.state.selectedTour,
      nameRules: [(v) => !!v || "Name is required!"],
      emailRules: [
        (v) => !!v || "E-mail is required!",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      confirmEmailRules: [
        (v) => !!v || "Confirm E-mail is required!",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneNumberRules: [(v) => !!v || "Phone number is required!"],
      quantityRules: [
        (v) => !!v || "Quantity is required!",
        v => parseInt(v) + tour.sold <= tour.maxPeople || "Exceed the maximum number of people "
      ],
    };
  },
  computed: {
    countTotalPrice() {
      this.totalPrice = this.quantity * this.selectedTour.price;
      return this.totalPrice;
    },
    confirmEmailValid() {
      return () =>
        this.email === this.confirmEmail || "Confirm email doesn't match!";
    },
  },
  methods: {
    bookTour() {
      if (this.$refs.form.validate()) {
        const formBooking = {
          fullName: this.fullName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          quantity: this.quantity,
          address: this.address,
          note: this.note,
          totalPrice: this.totalPrice,
        };
        this.$axios
          .post(`/booking/${this.selectedTour.id}`, formBooking, {
            params: {
              tourName: this.selectedTour.name
            }
          })
          .then(() => this.$swal.fire("Book tour successfully.", "Please check your email for the information and perform the payment!", "success"));
      }
    },
  },
};
</script>

<style>
</style>
