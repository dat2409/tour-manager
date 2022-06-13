<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9">
        <line-chart
          :chartData="chartData"
          :options="chartOptions"
          class="line-chart"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title class="headline font-weight-light">Total Earning</v-card-title>
          <v-card-text class="display-1 font-weight-bold">$25,603</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" class="body-1">Statistics about Number of Guests and Total Money</v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "../../components/chartComponents/LineChart.vue";
export default {
  components: { LineChart },
  name: "IndexAdmin",
  layout: "admin",
  middleware: "isAuthenticated",
  data() {
    return {
      chartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dev",
        ],
        datasets: [
          {
            label: "Guests",
            borderColor: "rgb(163, 162, 252)",
            borderWidth: 3,
            pointBackgroundColor: "#FFFFFF",
            pointRadius: 4,
            pointHoverRadius: 8,
            backgroundColor: "rgb(163, 162, 252, 0.2)",
            data: [120, 220, 300, 150, 420, 340, 510, 290, 320, 330, 420, 240],
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          backgroundColor: "#424242",
          xPadding: 20,
          position: "nearest",
          mode: "nearest",
          // intersect: 0,
          bodySpacing: 4,
        },
      },
    };
  },
};
</script>

<style>
.line-chart {
  height: 70vh;
}
</style>
