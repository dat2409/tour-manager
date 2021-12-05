<template>
  <div class="dashboard">
    <v-row class="ma-5">
      <v-col cols="12" sm="6" md="3" v-for="member in team" :key="member.name">
        <v-card>
          <v-row justify="center" class="pt-6">
            <v-avatar size="100">
              <img src="https://i.pinimg.com/originals/2a/92/06/2a9206a4a0d1d23cf92636c42115d054.jpg" alt="alt">
            </v-avatar>
          </v-row>

          <v-card-text class="text-center my-5">
            <div class="headline">{{ member.name }}</div>
            <div class="subtitle-1">{{ member.role }}</div>
          </v-card-text>
          <v-card-actions>
            <v-icon>mdi-message-bulleted</v-icon>
            <span class="ml-3 text-uppercase">message</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        { name: 'The Net Ninja', role: 'Web developer' },
        { name: 'Ryu', role: 'Graphic designer' },
        { name: 'Chun Li', role: 'Web developer' },
        { name: 'Gouken', role: 'Social media maverick' },
        { name: 'Yoshi', role: 'Sales guru'}
      ]
    }
  }
}
</script>

<style>

</style>
