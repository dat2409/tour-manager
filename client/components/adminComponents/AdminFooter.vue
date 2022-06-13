<template>
      <v-footer
      :absolute="!fixed"
      app
      class="bg-gradient-primary"
    >
      <span>&copy;DatSoict</span>
    </v-footer>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    }
  }
}
</script>

<style>

</style>
