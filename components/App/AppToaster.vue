<!-- front/components/App/AppToaster.vue -->
<template>
  <v-snackbar
    v-model="setSnackbar"
    app
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.msg }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        text
        :color="toast.color"
        @click="resetToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    toast () {
      return this.$store.state.toast
    },
    setSnackbar: {
      get () { return !!this.toast.msg },
      set (val) { return this.resetToast() && val }
    }
  },
  beforeDestroy () {
    // Vueインスタンスが破棄される直前にVuexのtoast.msgを削除する(timeoutに-1が渡された場合無期限に表示されてしまうための対策)
    this.resetToast()
  },
  methods: {
    // Vuexのtoast.msgの値を変更する
    resetToast () {
      return this.$store.dispatch('getToast', { msg: null })
    }
  }
}
</script>
