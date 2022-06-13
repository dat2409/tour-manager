<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase"
          >Staffs/Managers</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <NuxtLink class="text-decoration-none" to="/ssadmin/staff/new"
          ><v-btn
            color="primary"
            dark
            class="mb-2 bg-gradient-primary"
          >
            Add new staff
          </v-btn>
        </NuxtLink>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="deleteItemConfirm(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:[`item.role`]="{ item }">
      <v-chip
        :color="getColor(item)"
        class="white--text"
        @click="confirmPromotion(item)"
        >{{ item.role }}</v-chip
      >
    </template>
    <template v-slot:[`item.dob`]="{ item }">
      <span>{{ formatDate(item.dob) }}</span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  layout: "admin",
  fetch() {
    try {
      this.$axios.get("/users/").then((users) => (this.users = users.data));
    } catch (err) {
      return err;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Full Name",
          align: "start",
          value: "fullName",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Phone Number",
          value: "phoneNumber",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Gender",
          value: "gender",
        },
        {
          text: "Birthday",
          value: "dob",
          width: "10%",
        },
        {
          text: "Identity Number",
          value: "identityNumber",
        },
        {
          text: "Role",
          value: "role",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      name: "",
      search: "",
      dialog: false,
    };
  },
  methods: {
    viewUser(item) {
      this.$router.push(`/ssadmin/user/${item.id}`);
    },
    getColor(user) {
      if (user.role === "STAFF") return "grey";
      else return "purple";
    },
    confirmPromotion(staff) {
      if (staff.role === "STAFF") {
        this.$swal
          .fire({
            title: "Confirm promotion",
            text: "Promote this staff to manager? This action can't revert!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .patch(`/users/role/${staff.id}`)
                .then(() => this.$fetch());
              this.$swal.fire("", "Promote successfully!", "success");
            }
          });
      }
    },
    deleteItemConfirm(staff) {
      if (staff.role === "MANAGER") {
        this.$swal.fire("", "You can't delete another manager!", "error");
      } else {
        this.$swal
          .fire({
            title: "Confirm delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .delete(`/users/${staff.id}`)
                .then(() => this.$fetch());
              this.$swal.fire(
                "Deleted!",
                "The user has been deleted.",
                "success"
              );
            }
          });
      }
    },
    formatDate(dob) {
      return dob.split("T")[0].split("-").reverse().join("-");
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
