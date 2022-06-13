<template>
  <v-card max-width="900px" class="mx-auto">
    <v-card-title>
      <v-row justify="center" class="text-gradient display-1 font-weight-black"
        >New staff</v-row
      >
    </v-card-title>
    <v-form @submit.prevent="createStaff">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-select v-model="role" :items="roles" label="Role" />
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field v-model="fullName" label="Full Name" />
          </v-col>
        </v-row>
        <v-text-field v-model="email" label="Email" :rules="emailRules" />
        <v-text-field
          label="Password"
          placeholder="******"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-icon="
            isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          @click:append="isPasswordVisible = !isPasswordVisible"
          v-model="password"
          :rules="passwordRules"
        />
        <v-text-field
          label="Confirm Password"
          placeholder="******"
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="confirmPassword"
          :rules="confirmPasswordRules.concat(confirmPasswordValid)"
          :append-icon="
            isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          @click:append="isPasswordVisible = !isPasswordVisible"
        />
        <v-row>
          <v-col cols="12" md="3">
            <v-select v-model="gender" :items="genders" label="Gender" />
          </v-col>
          <v-col cols="12" md="9">
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
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dob"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-text-field v-model="address" label="Address" />
        <v-row
          ><v-col cols="12" md="6"
            ><v-text-field v-model="identityNumber" label="Identity Number"
          /></v-col>
          <v-col cols="12" md="6"
            ><v-text-field v-model="phoneNumber" label="Phone Number"
          /></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" class="bg-gradient-primary" dark>Create</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      role: "",
      dob: "",
      address: "",
      menu: false,
      menu2: false,
      identityNumber: "",
      roles: ["STAFF", "MANAGER"],
      genders: ["Male", "Female", "Don't know"],
      passwordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length > 5 || "Minimum length is 6",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length > 5 || "Minimum length is 6",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      isPasswordVisible: false,
    };
  },
  computed: {
    confirmPasswordValid() {
      return () =>
        this.password === this.confirmPassword ||
        "Confirm password doesn't match!";
    },
  },
  methods: {
    createStaff() {
      const staffCreated = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        gender: this.gender,
        role: this.role,
        dob: this.dob,
        address: this.address,
        identityNumber: this.identityNumber,
      };

      try {
        this.$axios.post(`/users`, staffCreated).then(() => {
          this.$swal.fire(
            "Successful!",
            "You've already created new tour!",
            "success"
          );
          this.$router.push('/ssadmin/staff');
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
