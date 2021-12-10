<template>
  <div class="header">
    <v-app-bar flat class="black white--text" height="45px">
      <div class="information body-2 font-weight-normal">
        <span class="mr-3">
          <v-icon class="mr-1 main--text">mdi-email-edit-outline</v-icon>
          thaidoandat1@gmail.com
        </span>
        <span class="mr-3">
          <v-icon class="mr-1 main--text">mdi-phone</v-icon>
          0963825779
        </span>
        <span>
          <v-icon class="mr-1 main--text">mdi-map-marker-outline</v-icon>
          Hanoi, VietNam
        </span>
      </div>
      <v-spacer></v-spacer>
      <div class="social">
        <v-icon class="white--text subtitle-2 mx-2">mdi-twitter</v-icon>
        <v-icon class="white--text subtitle-2 mx-2">mdi-pinterest</v-icon>
        <v-icon class="white--text subtitle-2 mx-2">mdi-facebook</v-icon>
        <v-icon class="white--text subtitle-2 mx-2">mdi-instagram</v-icon>
        <v-btn color="main white--text" icon x-large>
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-app-bar height="80px" color="white black--text">
      <v-container fluid>
        <v-row justify="space-between">
          <v-col cols="2"><v-img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/logo-vertical.png" contain height="50px"></v-img></v-col>
          <v-col cols="1" ></v-col>
          <v-col cols="2" align-self="center">Home</v-col>
          <v-col cols="2" align-self="center">Pages</v-col>
          <v-col cols="2" align-self="center">Destination</v-col>
          <v-col cols="2" align-self="center">Tours</v-col>
          <v-col cols="1"  align-self="center">
            <v-icon>mdi-map-search</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
