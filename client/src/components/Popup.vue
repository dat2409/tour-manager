<template>
  <v-dialog width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="red lighten-2" dark v-bind="attrs" v-on="on">
        Add a new project
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Add a New Project
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          ></v-text-field>
          <v-textarea
            label="Information"
            v-model="information"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          ></v-textarea>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Due at"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                :rules="[v => !!v || 'Required']"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-btn color="deep-purple accent-1" @click="submit"
            >Add Project</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      information: "",
      date: null,
      menu2: false,
      inputRules: [
        v => v.length >=3 || 'Minimum length is 3 characters.'
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log('ok')
      }
    },
  },
};
</script>

<style>
</style>
