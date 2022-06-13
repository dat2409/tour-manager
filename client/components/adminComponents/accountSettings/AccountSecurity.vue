<template>
  <v-card>
    <v-form @submit.prevent="changePassword" ref="form">
      <v-card-text>
        <v-row class="mt-5">
          <v-col cols="12" sm="8" md="6" class="my-auto">
            <v-text-field
              :type="isNewPasswordVisible ? 'text' : 'password'"
              :append-icon="
                isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              label="New Password"
              outlined
              dense
              placeholder="******"
              :rules="newPasswordRules"
              v-model="newPassword"
            ></v-text-field>
            <v-text-field
              :type="isConfirmNewPasswordVisible ? 'text' : 'password'"
              :append-icon="
                isConfirmNewPasswordVisible
                  ? 'mdi-eye-off-outline'
                  : 'mdi-eye-outline'
              "
              @click:append="
                isConfirmNewPasswordVisible = !isConfirmNewPasswordVisible
              "
              label="Confirm new Password"
              outlined
              dense
              placeholder="******"
              :rules="confirmNewPasswordRules.concat(confirmNewPasswordValid)"
              v-model="confirmNewPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="6">
            <v-img
              contain
              max-width="170"
              :src="require('~/assets/images/pose.png')"
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-btn class="me-3 mt-5 bg-gradient-primary" type="submit"
          >Save change</v-btn
        >
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isCurrentPasswordVisible: false,
      isNewPasswordVisible: false,
      isConfirmNewPasswordVisible: false,
      user: { ...this.$auth.user },
      newPassword: "",
      confirmNewPassword: "",
      newPasswordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length > 5 || "Minimum length is 6",
      ],
      confirmNewPasswordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length > 5 || "Minimum length is 6",
      ],
    };
  },
  computed: {
    confirmNewPasswordValid() {
      return () =>
        this.newPassword === this.confirmNewPassword ||
        "Confirm new password doesn't match!";
    },
  },
  methods: {
    changePassword() {
      if (this.$refs.form.validate()) {
        const data = {
          newPassword: this.newPassword,
        };
        this.$axios.patch(`/users/${this.user.id}`, data).then(() => {
          this.$swal.fire("Change password successfully!", "", "success");
        });
      }
    },
  },
};
</script>

<style>
</style>
