<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text class="d-flex">
      <v-avatar rounded size="120" class="me-6">
        <v-img :src="avatarImg"></v-img>
      </v-avatar>

      <div>
        <v-btn color="primary" class="me-3 mt-5 bg-gradient-primary" dark>
          Upload new photo
        </v-btn>
        <p class="text-sm mt-5">Allowed JPG, GIF or PNG. Max size of 800K</p>
      </div>
    </v-card-text>

    <v-card-text>
      <v-form class="mt-6" @submit.prevent="updateInfo">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field
              v-model="currentUser.fullName"
              label="Full Name"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field
              v-model="currentUser.email"
              label="Email"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.phoneNumber"
              label="Phone Number"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.role"
              disabled
              dense
              label="Role"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="currentUser.gender"
              dense
              outlined
              label="Gender"
              :items="genders"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.address"
              dense
              outlined
              label="Address"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dob"
                  label="Birthday"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dob"
                @input="menu = false"
                dateFormat="MM-DD-YYYY"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="currentUser.identityNumber"
              dense
              outlined
              label="Identity Number"
            >{{dob}}</v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="primary" class="me-3 mt-5 bg-gradient-primary" type="submit" dark>
              Save changes
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    let user = {...this.$auth.user}
    return {
      avatarImg: require("~/assets/images/avatarSample.png"),
      genders: ["Male", "Female", "Don't know"],
      menu: false,
      currentUser: {...this.$auth.user},
      dob: this.formatDate(user.dob),
      fullName: ''
    }
  },
  methods: {
    formatDate(date) {
      return date.split("T")[0]
    },
    updateInfo() {
      this.currentUser.dob = this.dob;
      this.$axios.patch(`/users/profile/${this.currentUser.id}`, this.currentUser)
      .then(() => {
        this.$swal.fire('Update profile successfully!', '', 'success');
      })
    },
  },
};
</script>

<style>
</style>
