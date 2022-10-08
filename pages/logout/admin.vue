<script>
export default {
  name: 'LogoutPage',
  async middleware ({ $auth, redirect }) {
    await $auth.adminLogout()
    return redirect('/login/admin')
  }
}
</script>
