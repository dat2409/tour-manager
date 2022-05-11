<template>
  <v-container class="mb-16">
    <v-row justify="center">
      <v-avatar size="300">
        <v-img
          :src="require('~/assets/images/hinh-anh-nen-dam-hoa-sen.jpg')"
          style="z-index: 2"
        >
        </v-img>
      </v-avatar>
      <span
        class="my-auto greetings-text greetings-text-gradient"
        style="z-index: 3"
        >Greetings from VietNam
      </span>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.greetings-text {
  font-family: "Satisfy", cursive;
  font-size: 56px;
  margin-left: -100px;
}
</style>
