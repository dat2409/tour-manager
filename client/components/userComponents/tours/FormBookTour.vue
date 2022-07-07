<template>
  <div>
    <v-card class="userColor2" dark>
      <v-card-title class="text-capitalize">book this tour</v-card-title>
      <v-card-subtitle class="white--text mb-3"
        >Arrange your trip in advance - book this tour now!</v-card-subtitle
      >

      <v-form ref="form">
        <v-card-text>
          <v-select
            v-model="tourType"
            :items="tourTypes"
            label="Choose your tour type"
            outlined
            class="rounded-0 font-weight-bold"
            background-color="userColorLighter"
          ></v-select>
          <div v-if="!tourType">
            <v-list dense class="userBg" disabled>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#BDBDBD">mdi-bullseye-arrow</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="grey--text text--darken-1">
                    Company tour: If you want to book this tour for your company
                    trip (corporation),please leave your information below and
                    our staff will contact you.
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#BDBDBD">mdi-bullseye-arrow</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="grey--text text--darken-1">
                    Personal tour: For you, or couple, group of members like
                    family, friends,... that not are corporation.
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
          <div v-if="tourType === 'Personal Tour'">
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
            <v-btn
              block
              class="white black--text"
              @click="bookTour"
              name="anything-except-submit"
              >book now</v-btn
            >
          </div>
          <div v-if="tourType === 'Company Tour'">
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
            <v-btn
              block
              class="white black--text"
              @click="bookTour"
              name="anything-except-submit"
              >book now</v-btn
            >
          </div>
          <!-- <div>
            <vue-recaptcha
              ref="invisibleRecaptcha"
              :loadRecaptchaScript="true"
              sitekey="6Le_E74gAAAAAGZqCQdfUvHkM0bfKHLrykaYmM3j"
            >
              <button>Click me</button>
            </vue-recaptcha>
          </div> -->
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script>
// import VueRecaptcha from "vue-recaptcha";
export default {
  data() {
    let tour = this.$store.state.selectedTour;
    return {
      fullName: "",
      email: "",
      confirmEmail: "",
      phoneNumber: "",
      note: "",
      quantity: 0,
      totalPrice: null,
      selectedTour: this.$store.state.selectedTour,
      tourType: null,
      tourTypes: ["Company Tour", "Personal Tour"],
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
        (v) => {
          if (this.tourType === "Personal Tour") {
            return !!v || "Quantity is required!";
          }
        },
        (v) =>
          parseInt(v) + tour.sold <= tour.maxPeople ||
          "Exceed the maximum number of people ",
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
          teamLeadName: this.fullName,
          teamLeadEmail: this.email,
          teamLeadPhoneNumber: this.phoneNumber,
          quantity: parseInt(this.quantity),
          note: this.note,
          totalPrice: parseInt(this.totalPrice),
          isCompanyTour: this.tourType === "Company Tour"
        };
        this.$axios
          .post(`/booking/${this.selectedTour.id}`, formBooking, {
            params: {
              tourName: this.selectedTour.name,
            },
          })
          .then(() =>
            this.$swal.fire(
              "Book tour successfully.",
              "Please check your email for the information and perform the payment!",
              "success"
            )
          );
      }
    },
    // onEvent() {
    //   this.$refs.recaptcha.execute();
    // },
    // onSubmit: function (e) {
    //   e.preventDefault();
    //   console.log("abc", this.$refs.invisibleRecaptcha);
    //   this.$refs.invisibleRecaptcha.execute();
    // },
    // onVerify: function (response) {
    //   console.log("Verify: " + response);
    // },
    // onExpired: function () {
    //   console.log("Expired");
    // },
  },
  // components: { VueRecaptcha },
};
</script>

<style></style>
