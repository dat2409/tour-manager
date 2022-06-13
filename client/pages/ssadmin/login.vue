<template>
  <v-app>
    <v-card class="ma-auto" width="450">
      <v-card-title class="d-flex align-center justify-center py-7">
        <h2 class="heading mainstream--text">SetSail</h2>
      </v-card-title>
      <v-card-text>
        <p class="d-flex align-center justify-center mb-2 title">
          Welcome to SetSail! 👋🏻
        </p>
        <p class="d-flex align-center justify-center mb-2">
          Please login to your account and start your work
        </p>
      </v-card-text>

      <v-card-text>
        <v-form ref="form" @submit.prevent="login">
          <v-text-field
            label="Email"
            prepend-icon="mdi-email-fast-outline"
            placeholder="abc@example.com"
            v-model="email"
            :rules="emailRules"
          />
          <v-text-field
            label="Password"
            prepend-icon="mdi-lock-outline"
            placeholder="********"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-icon="
              isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            @click:append="isPasswordVisible = !isPasswordVisible"
            v-model="password"
            :rules="passwordRules"
          />
          <v-btn
            type="submit"
            block
            class="my-6 bg-gradient-primary"
            >Login</v-btn
          >
        </v-form>
      </v-card-text>

      <v-card-text class="d-flex align-center">
        <v-divider></v-divider>
        <span class="mx-3">or</span>
        <v-divider></v-divider>
      </v-card-text>

      <!-- social links -->
      <v-card-actions class="d-flex justify-center">
        <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
          <v-icon :color="link.color">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  layout: "emptyLayout",
  data() {
    return {
      error: '',
      isPasswordVisible: false,
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
      socialLink: [
        {
          icon: 'mdi-facebook',
          color: "#4267b2",
        },
        {
          icon: 'mdi-twitter',
          color: "#1da1f2",
        },
        {
          icon: 'mdi-github',
          color: "#272727",
        },
        {
          icon: 'mdi-google',
          color: "#db4437",
        },
      ],
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/ssadmin');
      } catch (err) {
        this.error = err.response.data.message
      }
    }
  },
};
</script>

<style>
</style>
