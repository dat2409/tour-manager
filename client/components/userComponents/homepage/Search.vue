<template>
  <div class="home-page">
    <v-container class="mt-n10">
      <v-row no-gutters>
        <v-col cols="12" md="4" align="center">
          <v-text-field
            v-model="whereTo"
            placeholder="Where to?"
            prepend-inner-icon="mdi-compass"
            outlined
            class="white rounded-0 font-weight-bold search-text"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3" align="center">
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
                placeholder="From"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                class="white rounded-0 font-weight-bold search-text"
                prepend-inner-icon="mdi-calendar-arrow-right"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="from"
              @input="menuFrom = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3" align="center">
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
                placeholder="To"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                class="white rounded-0 font-weight-bold search-text"
                prepend-inner-icon="mdi-calendar-arrow-left"
              ></v-text-field>
            </template>
            <v-date-picker v-model="to" @input="menuTo = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="2" align="center">
          <v-btn
            class="rounded-0 box-shadow white--text font-weight-black bg-gradient-primary"
            color="#76FF03"
            block
            height="56"
            @click="search()"
            depressed
            >Find now</v-btn
          >
        </v-col>
      </v-row></v-container
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      whereTo: "",
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
        query: { from: this.from, to: this.to, destinationName: this.whereTo },
      });
    },
  },
};
</script>

<style>
.search-text fieldset {
  color: white !important;
  box-shadow: 0px 1px 0px #b990fe;
}

.box-shadow {
  box-shadow: 0px 1px 0px #b990fe;
}

</style>

