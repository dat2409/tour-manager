<template>
  <v-data-table :headers="headers" :items="services" class="elevation-1" :search="search">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase">Services</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search by name"
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
              New Service
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">New Service</span>
            </v-card-title>
            <v-form @submit.prevent="createService">
              <v-card-text>
                <v-container>
                  <v-text-field label="Name" v-model="name" />
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
        <v-dialog v-model="dialogDelete" max-width="550px">
          <v-card>
            <v-card-title>
              <h3 class="text-center">Are you sure you want to delete this service?</h3>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItem()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogEdit" width="500">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Service</span>
            </v-card-title>
            <v-form @submit.prevent="updateService">
              <v-card-text>
                <v-container>
                  <v-text-field label="Name" v-model="serviceEdit.name" />
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEdit">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text type="submit"> Update </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItemConfirm(item)"> mdi-delete </v-icon>
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      services: [],
      dialog: false,
      name: "",
      dialogDelete: false,
      dialogEdit: false,
      serviceDelete: null,
      search: "",
      serviceEdit: {
        id: null,
        name: null
      },

    };
  },
  fetch() {
    try {
      this.$axios
        .get("/services")
        .then((services) => (this.services = services.data));
    } catch (err) {
      return err;
    }
  },
  methods: {
    createService() {
      try {
        const newService = {
        name: this.name
      }
      this.$axios.post('/services', newService)
        .then(() => {
          this.$fetch();
          this.close();
        })
      } catch (error) {
        console.log(error);
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    close() {
      this.dialog = false;
    },
    editItem(item) {
      this.dialogEdit = true;
      this.serviceEdit = item;
    },
    updateService() {
      this.$axios
        .patch(`/services/${this.serviceEdit.id}`, this.serviceEdit)
        .then(() => {
          this.$fetch();
          this.closeEdit();
        })
    },
    closeEdit() {
      this.dialogEdit = false;
    },
    deleteItem() {
      this.$axios
        .delete(`/services/${this.serviceDelete.id}`)
        .then(() => {
          this.$fetch();
          this.closeDelete();
        });
    },
    deleteItemConfirm(item) {
      this.dialogDelete = true;
      this.serviceDelete = item;
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
