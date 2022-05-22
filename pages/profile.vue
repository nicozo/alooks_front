<template>
  <div>
    {{ user }}
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  layout: 'loggedIn',
  data () {
    return {
      user: {
        name: '',
        self_introduction: '',
        date_of_birth: null,
        sex: null,
        game_id: ''
      }
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    }
  },
  created () {
    this.user = Object.assign({}, this.authUser)
  }
}
</script>
