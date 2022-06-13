<template>
  <v-card>
    <v-card-title>
      <v-row justify="center" class="text-gradient display-1 font-weight-black my-3"
        >Destination Detail</v-row
      >
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="destination.name" label="Name" outlined />
      <v-text-field v-model="destination.address" label="Address" outlined />
      <v-textarea
        v-model="destination.desc"
        label="Description"
        outlined
        auto-grow
        dense
      />
      <v-row class="pb-16 pt-10">
        <v-col
          cols="12"
          md="6"
          v-for="(image, index) in destination.images"
          :key="index"
        >
          <v-dialog>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                :src="image.url"
                v-bind="attrs"
                v-on="on"
                max-height="348"
              ></v-img>
            </template>
            <v-card>
              <v-img :src="image.url" :aspect-ratio="16 / 9"></v-img>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      destination: {},
    };
  },
  fetch() {
    this.$axios
      .get(`/destinations/${this.$route.params.destinationId}`)
      .then((destination) => {
        this.destination = destination.data;
      });
  },
};
</script>

<style>
</style>
