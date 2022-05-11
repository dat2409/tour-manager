import Vue from 'vue'

export default function ({ store, redirect }) {
  if (store.state.auth.user.role !== "MANAGER") {
    Vue.notify({
      group: 'foo',
      title: 'No permission',
      text: 'Must be a manager to do this action!',
    })
    return redirect("/ssadmin");
  }
}
