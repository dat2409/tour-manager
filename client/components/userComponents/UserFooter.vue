<template>
  <v-footer height="500" class="black">
    <v-row>
      <v-container>
        <v-row class="white--text">
          <v-col cols="12" md="4">
            <v-img :src="require('~/assets/images/logo.png')"></v-img>
            <p class="my-4 font-italic">
              Welcome to SetSail Travel Website. Be careful to choose the best
              tour for your holiday!!!
            </p>
            <div v-for="item in info" :key="item.icon" class="mt-2">
              <v-icon class="white--text mr-4">{{ item.icon }}</v-icon>
              <span>{{ item.value }}</span>
            </div>
          </v-col>
          <v-col cols="12" md="4" align="center">
            <v-card class="transparent mt-5">
              <v-card-title
                class="
                  text-capitalize
                  white--text
                  display-3
                  mb-10
                  font-weight-bold
                "
              >
                <v-row justify="center">our policy</v-row>
              </v-card-title>
              <v-card-text class="white--text font-italic subtitle-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
                doloribus harum provident, culpa ea modi illo possimus sit vero
                quasi nesciunt cupiditate id rerum facilis sed quidem ratione
                architecto! Aliquid.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="transparent mt-5">
              <v-card-title
                class="
                  text-capitalize
                  white--text
                  display-3
                  mb-10
                  font-weight-bold
                "
              >
                <v-row justify="center">socials</v-row>
              </v-card-title>
              <v-card-text class="white--text subtitle-1 ml-15">
                <div v-for="social in socials" :key="social.icon" class="my-2">
                  <a
                    :href="'https://www.' + social.link"
                    class="text-decoration-none"
                  >
                    <v-icon class="white--text mr-4">{{ social.icon }}</v-icon>
                    <span class="font-italic white--text">{{
                      social.link
                    }}</span></a
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-col cols="12" class="text-center white--text mb-n16 mt-10"
        >&copy;<span class="grey--text mx-1">2022</span>DatSoict</v-col
      >
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      info: [
        { icon: "mdi-email-outline", value: "thaidoandat1@gmail.com" },
        { icon: "mdi-phone-outline", value: "0963825779" },
        { icon: "mdi-map-marker-outline", value: "Đô Lương, Nghệ An" },
      ],
      socials: [
        { icon: "mdi-twitter", link: "twitter.com/doandat2409/" },
        { icon: "mdi-pinterest", link: "pinterest.com/doandat2409/" },
        { icon: "mdi-instagram", link: "instagram.com/dat_thaidoan/" },
        { icon: "mdi-facebook", link: "facebook.com/doandat2409/" },
      ],
    };
  },
};
</script>

<style>
</style>
