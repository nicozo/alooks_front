<script>
export default {
  name: 'LogoutPage',
  async middleware ({ $auth, redirect }) {
    await $auth.logout()
    return redirect('/login')
  }
}
</script>
