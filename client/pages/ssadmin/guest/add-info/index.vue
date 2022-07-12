<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add Guests Information</span>
    </v-card-title>
    <v-row>
      <v-col cols="12" md="3"
        ><v-text-field
          label="Booking ID"
          v-model="bookingId"
          disabled
          outlined
          class="ml-7"
          hide-details
      /></v-col>
      <v-col cols="12" md="9"
        ><v-file-input
          label="Upload a file of guests information"
          @change="onChange"
          outlined
          hide-details
          show-size
          class="mr-7"
      /></v-col>
    </v-row>

    <v-form @submit.prevent="saveGuestsInfo" ref="form">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-data-table
              v-if="guestsInfoFromFile"
              :headers="headers"
              :items="guestsInfoFromFile"
              class="elevation-1"
            >
              <template v-slot:[`item.image`]="{ item }">
                <a :href="item.image" target="_blank">View</a>
              </template>
            </v-data-table></v-col
          >
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="guestsInfoFromFile"
          class="bg-gradient-primary"
          dark
          type="submit"
        >
          Save information
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
const keys = [
  "fullName",
  "email",
  "phoneNumber",
  "identityNumber",
  "insuranceCardNumber",
  "image",
];
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
      guestsInfoFromFile: null,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "fullName",
        },
        { text: "Email", value: "email" },
        {
          text: "Phone Number",
          value: "phoneNumber",
          filterable: false,
        },
        { text: "Identity Number", value: "identityNumber" },
        { text: "Insurance Card", value: "insuranceCardNumber" },
        { text: "Avatar", value: "image" },
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
      } else {
        this.$refs.form.reset();
      }
    },
    onChange(file) {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = (e) => {
          const content = e.target.result;
          const guestsInfo = content
            .split("\n")
            .filter((e) => !!e)
            .map((e) => e.trim())
            .map((e) => e.split(",").map((e) => e.trim()));
          this.guestsInfoFromFile = this.formatData(keys, guestsInfo);
        };
      }
    },
    saveGuestsInfo() {
      const guestsInfo = JSON.parse(JSON.stringify(this.guestsInfoFromFile))
      guestsInfo.push({
        bookingId: +this.bookingId
      })
      this.$axios.post("/guestsInfo", guestsInfo).then(() => {
        this.$swal.fire("Save guests information successfully.", "", "success");
      });
    },
    formatData(keys, guests) {
      guests.shift();
      const formattedData = guests.map((item) => {
        item.shift();
        const guest = [];
        item.map((value, index) => {
          guest.push([keys[index], value]);
        });
        return Object.fromEntries(guest);
      });
      return formattedData;
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style></style>
