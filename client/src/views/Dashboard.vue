<template>
  <div class="dashboard">
    <v-container class="my-5">
      <v-row class="ma-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text small color="grey" class="mr-3" @click="sortBy('title')">
              <v-icon>mdi-folder</v-icon>
              <span class="caption text-lowercase">by project title</span>
            </v-btn>
          </template>
          <span>Sort project by project title</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text small color="grey" class="mr-3" @click="sortBy('person')">
              <v-icon>mdi-account</v-icon>
              <span class="caption text-lowercase">by person</span>
            </v-btn>
          </template>
          <span>Sort by person</span>
        </v-tooltip>

      </v-row>
      <v-card flat class="pa-3" v-for="project in projects" :key="project.title">
        <v-row :class="`project ${project.status}`">
          <v-col cols="12" xs="12" md="6">
            <div class="caption">Project title</div>
            <div>{{ project.title }}</div>
          </v-col>
          <v-col xs="4" md="2">
            <div class="caption">Author</div>
            <div>{{ project.person }}</div>
          </v-col>
          <v-col xs="4" md="2">
            <div class="caption">Due at</div>
            <div>{{ project.due}}</div>
          </v-col>
          <v-col xs="4" md="2">
            <div class="text-right">
              <v-chip small :color="`${project.status}`" :class="`py-2 white--text ${project.status} caption`">
                {{ project.status }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
        { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      ]
    }
  },
  methods: {
    sortBy(data) {
      this.projects.sort((a, b) => a[data] > b[data] ? 1 : -1)
    }
  }
};
</script>

<style>
.project.complete {
  border-left: solid 4px rgb(30, 189, 91);
}

.project.ongoing {
  border-left: solid 4px rgb(240, 191, 86);
}

.project.overdue {
  border-left: solid 4px rgb(202, 27, 27);
}

.v-chip.complete {
  background-color: rgb(30, 189, 91) !important;
}

.v-chip.ongoing {
  background-color: rgb(240, 191, 86) !important;
}

.v-chip.overdue {
  background-color: rgb(202, 27, 27) !important;
}
</style>
