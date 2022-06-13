<template>
  <v-data-table
    :headers="headers"
    :items="destinations"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase">Destinations</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by name or address"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="900">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 bg-gradient-primary"
              v-bind="attrs"
              v-on="on"
            >
              New Destination
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">New Destination</span>
            </v-card-title>
            <v-form @submit.prevent="onUpload">
              <v-card-text>
                <v-container>
                  <v-text-field label="Name" v-model="name" />
                  <v-text-field label="Address" v-model="address" />
                  <v-textarea label="Description" v-model="desc" />
                  <client-only>
                    <v-file-input
                      type="file"
                      name="imagesArray"
                      multiple
                      counter
                      show-size
                      @change="onChange"
                    />
                  </client-only>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text type="submit"> Save </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="showDestination(item)"> mdi-eye </v-icon>
      <v-icon small @click="deleteDestination(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:[`item.desc`]="{ item }">
      <span
      class="d-inline-block text-truncate"
      style="max-width: 500px;"
    >
      {{ item.desc }}
    </span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Address", value: "address" },
        { text: "Description", value: "desc", width: "50%", filterable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      destinations: [],
      dialog: false,
      imagesArray: null,
      name: "",
      address: "",
      desc: "",
      search: "",
    };
  },
  fetch() {
    try {
      this.$axios
        .get("/destinations")
        .then((destinations) => (this.destinations = destinations.data));
    } catch (err) {
      return err;
    }
  },
  methods: {
    onChange(files) {
      this.imagesArray = files;
    },
    onUpload() {
      const formData = new FormData();
      for (const i of Object.keys(this.imagesArray)) {
        formData.append("imagesArray", this.imagesArray[i]);
      }
      formData.append("name", this.name);
      formData.append("address", this.address);
      formData.append("desc", this.desc);

      this.$axios.post("/destinations", formData, {}).then(() => {
        this.$fetch();
        this.close();
      });
    },
    close() {
      this.dialog = false;
    },
    deleteDestination(item) {
      this.$swal
        .fire({
          title: "Are you sure?",
          html: '<span style="color: red">If you delete this destination, you also delete the tour to this place and all relations!</span>',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios.delete(`/destinations/${item.id}`).then(() => {
              this.$fetch();
              this.$swal.fire(
                "Deleted!",
                "Destination has been deleted.",
                "success"
              );
            });
          }
        });
    },
    showDestination(item) {
      this.$router.push(`/ssadmin/destination/${item.id}`);
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
