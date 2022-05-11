<template>
  <div class="tour-reviews">
    <v-card class="transparent" outlined>
      <v-card-title class="display-1 font-weight-bold mb-3"
        >Reviews Scores and Score Breakdown</v-card-title
      >
      <v-card-subtitle
        >Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
        Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
        imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
        ultricies
      </v-card-subtitle>
      <v-card-text class="mt-16">
        <v-row>
          <v-col cols="12" md="3" align="center">
            <span class="display-3 font-weight-bold black--text">{{
              tour.star
            }}</span>
            <v-icon large color="userColor">mdi-star-david</v-icon>
          </v-col>
          <v-col
            cols="12"
            md="9"
            align="center"
            justify="center"
            class="my-auto"
          >
            <v-progress-linear
              :buffer-value="`${tour.star * 20}`"
              stream
              height="15"
              color="userColor"
              rounded
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-for="(review, index) in reviews" :key="index">
        <v-divider></v-divider>
        <v-row class="my-16">
          <v-col cols="12" md="2">
            <v-avatar size="80">
              <v-img :src="avatarImg"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="10">
            <v-card>
              <v-card-title>
                {{ review.name }}
              </v-card-title>
              <v-card-subtitle>
                <v-rating
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half-full"
                  color="userColor2"
                  background-color="userColor2"
                  readonly
                  size="16"
                  class="ml-n2"
                  v-model="review.star"
                ></v-rating>
              </v-card-subtitle>
              <v-card-text>
                <p>{{ review.comment }}</p>
                <p class="font-weight-bold">{{ review.createdAt }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card class="userColor2 py-10" dark>
        <v-card-title class="display-1 font-weight-bold"
          >Post a Review</v-card-title
        >
        <v-form @submit.prevent="review">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="2" class="body-1 mb-3">Rating</v-col>
              <v-col cols="12" md="3"
                ><v-rating
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half-full"
                  color="white"
                  background-color="white"
                  size="16"
                  class="mt-n1"
                  v-model="star"
                ></v-rating
              ></v-col>
            </v-row>
            <v-textarea
              v-model="comment"
              outlined
              label="Comment"
              prepend-inner-icon="mdi-chat"
              background-color="userColorLighter"
            />
            <v-row class="mt-n5">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
                  outlined
                  label="Email"
                  prepend-inner-icon="mdi-email-outline"
                  background-color="userColorLighter"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="name"
                  outlined
                  label="Name"
                  prepend-inner-icon="mdi-account"
                  background-color="userColorLighter"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-container
              ><v-btn
                block
                class="white black--text"
                height="50"
                text
                type="submit"
                >Submit</v-btn
              ></v-container
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["selectedTour"]),
  data() {
    return {
      avatarImg: require("~/assets/images/avatarSample.png"),
      tour: {},
      reviews: [],
      email: "",
      name: "",
      star: 5,
      comment: "",
    };
  },
  fetch() {
    this.$axios
      .get(`/tours/${this.selectedTour.id}`)
      .then((tour) => (this.tour = tour.data));

    this.$axios.get(`/reviews/${this.selectedTour.id}`).then((reviews) => {
      this.reviews = reviews.data;
    });
  },
  methods: {
    review() {
      const review = {
        email: this.email,
        name: this.name,
        star: this.star,
        comment: this.comment,
        tourId: this.tour.id,
      };

      this.$axios.post('/reviews', review)
      .then(result => {
        if (result.status === 202) {
          this.$swal.fire('Failed', 'Maybe you have not finish this tour or you reviewed before!', 'warning');
        }
        else {
          this.$swal.fire('Successful', '', 'success');
          this.$fetch();
        }
      })
    },
  },
};
</script>

<style>
</style>
