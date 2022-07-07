<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add Guests Information</span>
    </v-card-title>
        <v-text-field label="Booking ID" v-model="bookingId" disabled outlined class="mx-7"/>

    <v-form @submit.prevent="updateGuestsInfo" ref="form">
      <v-card-text>
        <v-divider></v-divider>
        <v-container
          v-for="(guest, index) in guests"
          :key="index"
          class="border-day-plan"
        >
          <v-row>
            <v-col cols="12" md="4"
              ><v-text-field
                ref="inputRef"
                label="Full name"
                v-model="guest.fullName"
                outlined
                hide-details
            /></v-col>
            <v-col cols="12" md="4"
              ><v-text-field
                label="Email"
                v-model="guest.email"
                outlined
                hide-details
            /></v-col>
            <v-col cols="12" md="4"
              ><v-file-input
                label="Avatar"
                v-model="guest.image"
                outlined
                hide-details
                show-size
            /></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4"
              ><v-text-field
                label="Phone number"
                v-model="guest.phoneNumber"
                outlined
                hide-details
            /></v-col>
            <v-col cols="12" md="4"
              ><v-text-field
                label="Identity Number"
                v-model="guest.identityNumber"
                outlined
                hide-details
            /></v-col>
            <v-col cols="12" md="4"
              ><v-text-field
                label="Insurance Card Number"
                v-model="guest.insuranceCardNumber"
                outlined
                hide-details
            /></v-col>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              @click="deleteGuest(index)"
              class="bg-gradient-warning ma-3 overline"
              dark
              icon
              >x</v-btn
            ></v-row
          >
        </v-container>
        <v-btn @click="addGuest" class="bg-gradient-primary" dark icon>+</v-btn>
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
      bookingId: this.$route.query.bookingId,
      guests: [
        {
          fullName: "",
          email: "",
          phoneNumber: "",
          identityNumber: "",
          insuranceCardNumber: "",
          image: [],
        },
      ],
    };
  },
  methods: {
    addGuest() {
      this.guests.push({
        fullName: "",
        email: "",
        phoneNumber: "",
        identityNumber: "",
        insuranceCardNumber: "",
        image: [],
      });
    },
    deleteGuest(index) {
      if (this.guests.length > 1) {
        this.guests.splice(index, 1);
      }
      else {
        this.$refs.form.reset()
      }
    },
    updateGuestsInfo() {
      console.log(this.guests);
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style></style>
