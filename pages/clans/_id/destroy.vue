<script>
export default {
  name: 'ClanDestroyPage',
  async middleware ({ $axios, store, redirect, route }) {
    await $axios.$delete(
      `api/v1/clans/${route.params.id}`
    )
    const msg = 'クランを削除しました'
    const color = 'success'
    store.dispatch('getToast', { msg, color })

    return redirect('/clans')
  }
}
</script>
