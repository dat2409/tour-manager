import Vue from 'vue'

export default function({ store, redirect }) {
  if (!store.state.auth.loggedIn) {
    return redirect("/ssadmin/login");
  }
}
